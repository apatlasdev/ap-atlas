import sys, json, re, struct, gzip, base64, fnmatch, subprocess, os
import numpy as np
sys.path.insert(0, '/home/claude/atlas3d')
from config import CFG
import trimesh, fast_simplification

HA = '/home/claude/ha/public/models'
STLDIR = '/home/claude/bp3d/assets/BodyParts3D_data/stl'
atlas = json.load(open(HA + '/atlas.json'))
stl_index = json.load(open('/home/claude/stl_index.json'))
stl_by_name = {}
for r in stl_index:
    stl_by_name.setdefault(r['name'].lower(), []).append(r['id'])
leaf_by_name = {}
for p in atlas['parts']:
    leaf_by_name.setdefault(p['name'].lower(), []).append(p)

# ---- expand config ----
entries = []
for e in CFG:
    if e.get('both') and any('{s}' in m for m in e['matches']):
        for side, tag in (('right', 'R'), ('left', 'L')):
            entries.append(dict(e, name=e['name'].replace('({S})', '(' + tag + ')'), matches=[m.replace('{s}', side) for m in e['matches']]))
    elif any('{s}' in m for m in e['matches']):
        # merge both sides into one part
        entries.append(dict(e, matches=[m.replace('{s}', side) for m in e['matches'] for side in ('right', 'left')]))
    else:
        entries.append(dict(e))

def find(e):
    """return list of ('leaf', part) or ('stl', id)"""
    out = []; missing = []
    for m in e['matches']:
        m = m.lower()
        if e['src'] in ('leaf', 'synth'):
            if '*' in m:
                hits = [p for n, ps in leaf_by_name.items() if fnmatch.fnmatch(n, m) for p in ps]
            else:
                hits = leaf_by_name.get(m, [])
            if not hits: missing.append(m)
            out += [('leaf', p) for p in hits]
        else:
            ids = stl_by_name.get(m, [])
            if not ids: missing.append(m)
            out += [('stl', i) for i in ids]
    return out, missing

resolved = []
allmissing = []
for e in entries:
    hits, missing = find(e)
    if missing: allmissing.append((e['name'], missing))
    if hits: resolved.append((e, hits))
    else: print('!! NO GEOMETRY:', e['name'])
if '--check' in sys.argv:
    for n, m in allmissing: print('missing', n, m)
    print(len(resolved), 'parts resolved;', len(allmissing), 'entries with missing names')
    need = sorted(set(i for e, hits in resolved for k, i in hits if k == 'stl'))
    print(len(need), 'stl files needed')
    open('/home/claude/atlas3d/stl_needed.txt', 'w').write('\n'.join(need))
    sys.exit()

# ---- geometry loading ----
chunks = {}
def chunk(i):
    if i not in chunks:
        chunks[i] = open(HA + '/body-%d.bin' % i, 'rb').read()
    return chunks[i]

def load_leaf(p):
    b = chunk(p['chunk'])
    pos = np.frombuffer(b, dtype=np.float32, count=p['vertexCount'] * 3, offset=p['positions']).reshape(-1, 3).astype(np.float64)
    idx = np.frombuffer(b, dtype=np.uint32, count=p['indexCount'], offset=p['indices']).reshape(-1, 3).astype(np.int64)
    return pos, idx

def load_stl(fid):
    m = trimesh.load(STLDIR + '/' + fid + '.stl', force='mesh')
    v = np.asarray(m.vertices, dtype=np.float64); f = np.asarray(m.faces, dtype=np.int64)
    # mm/Z-up -> m/Y-up, same transform as human-atlas
    x, y, z = v[:, 0], v[:, 1], v[:, 2]
    v2 = np.stack([x * .001, z * .001 + .0781112, -y * .001 - .1], axis=1)
    return v2, f

def merge(meshes):
    vs = []; fs = []; off = 0
    for v, f in meshes:
        vs.append(v); fs.append(f + off); off += len(v)
    return np.concatenate(vs), np.concatenate(fs)

def weld(v, f):
    m = trimesh.Trimesh(v, f, process=False)
    m.merge_vertices()
    m.remove_unreferenced_vertices()
    return np.asarray(m.vertices), np.asarray(m.faces)

def decimate(v, f, cap):
    if len(f) <= cap: return v, f
    red = 1 - cap / len(f)
    v2, f2 = fast_simplification.simplify(v.astype(np.float32), f.astype(np.int64), target_reduction=red, agg=5)
    return np.asarray(v2, dtype=np.float64), np.asarray(f2, dtype=np.int64)

VERT_ORDER = ["atlas","axis","third cervical vertebra","fourth cervical vertebra","fifth cervical vertebra","sixth cervical vertebra","seventh cervical vertebra","first thoracic vertebra","second thoracic vertebra","third thoracic vertebra","fourth thoracic vertebra","fifth thoracic vertebra","sixth thoracic vertebra","seventh thoracic vertebra","eighth thoracic vertebra","ninth thoracic vertebra","tenth thoracic vertebra","eleventh thoracic vertebra","twelfth thoracic vertebra","first lumbar vertebra","second lumbar vertebra"]
def synth_spinal_cord(pos, idx):
    # path: from the medulla down through the vertebral canal to L1/L2 (conus medullaris)
    pts = []
    med = leaf_by_name["medulla oblongata"]
    mv = np.concatenate([load_leaf(p)[0] for p in med])
    top = mv[mv[:,1].argmin()]  # lowest point of the medulla = foramen magnum
    pts.append(np.array([0.0, top[1], top[2]]))
    for i, n in enumerate(VERT_ORDER):
        ps = leaf_by_name.get(n, [])
        if not ps: continue
        v = np.concatenate([load_leaf(p)[0] for p in ps])
        mn, mx = v.min(axis=0), v.max(axis=0)
        cy = (mn[1] + mx[1]) / 2
        depth = mx[2] - mn[2]
        frac = 0.52 if i < 7 else 0.56   # canal sits behind the body: fraction from the posterior edge
        cz = mn[2] + depth * frac
        pts.append(np.array([0.0, cy, cz]))
        if n == "second lumbar vertebra": pts[-1][1] = mx[1] - 0.01  # conus ends at L1/L2
    pts = np.array(pts)
    # resample & smooth
    seg = np.cumsum(np.r_[0, np.linalg.norm(np.diff(pts, axis=0), axis=1)])
    t = np.linspace(0, seg[-1], 90)
    pts = np.stack([np.interp(t, seg, pts[:, k]) for k in range(3)], axis=1)
    for _ in range(4): pts[1:-1] = (pts[:-2] + pts[1:-1] + pts[2:]) / 3
    ring = 14; verts = []; faces = []
    n = len(pts)
    for i, c in enumerate(pts):
        tang = pts[min(i + 1, n - 1)] - pts[max(i - 1, 0)]; tang /= (np.linalg.norm(tang) + 1e-9)
        a = np.cross(tang, [1, 0, 0]); a /= (np.linalg.norm(a) + 1e-9); b = np.cross(tang, a)
        frac = i / (n - 1)
        r = 0.0065
        if 0.05 < frac < 0.22: r = 0.0085   # cervical enlargement
        if 0.68 < frac < 0.85: r = 0.008    # lumbosacral enlargement
        if frac > 0.95: r = 0.0065 * (1 - (frac - 0.95) / 0.05) + 0.001  # conus taper
        for k in range(ring):
            th = 2 * np.pi * k / ring
            verts.append(c + r * (np.cos(th) * a + np.sin(th) * b))
    for i in range(n - 1):
        for k in range(ring):
            a0 = i * ring + k; a1 = i * ring + (k + 1) % ring; b0 = a0 + ring; b1 = a1 + ring
            faces.append([a0, b0, a1]); faces.append([a1, b0, b1])
    # caps
    verts.append(pts[0]); verts.append(pts[-1]); c0 = len(verts) - 2; c1 = len(verts) - 1
    for k in range(ring):
        faces.append([c0, k, (k + 1) % ring]); faces.append([c1, (n - 1) * ring + (k + 1) % ring, (n - 1) * ring + k])
    return np.array(verts), np.array(faces)

parts = []
blob = bytearray()
total_tris = 0
for e, hits in resolved:
    meshes = []
    for k, h in hits:
        meshes.append(load_leaf(h) if k == 'leaf' else load_stl(h))
    v, f = merge(meshes)
    if e['src'] == 'synth':
        v, f = synth_spinal_cord(v, f)
    else:
        v, f = weld(v, f)
        v, f = decimate(v, f, e['cap'])
        v, f = weld(v, f)
    if len(v) > 65535:
        v, f = decimate(v, f, int(len(f) * 60000 / len(v)))
        v, f = weld(v, f)
    assert len(v) <= 65535, e['name']
    mn = v.min(axis=0); mx = v.max(axis=0); ext = np.maximum(mx - mn, 1e-6)
    q = np.round((v - mn) / ext * 65535).astype(np.uint16)
    while len(blob) % 4: blob.append(0)
    po = len(blob); blob += q.tobytes()
    while len(blob) % 4: blob.append(0)
    io = len(blob); blob += f.astype(np.uint16).tobytes()
    total_tris += len(f)
    parts.append({'n': e['name'], 's': e['system'], 'd': e.get('desc') or '', 'b': [round(float(x), 5) for x in mn] + [round(float(x), 5) for x in mx], 'v': int(len(v)), 'i': int(len(f) * 3), 'p': po, 'x': io})
    print('%-42s %-12s tris=%6d verts=%6d' % (e['name'], e['system'], len(f), len(v)))

manifest = {'parts': parts, 'tris': total_tris, 'bytes': len(blob)}
gz = gzip.compress(bytes(blob), 9)
open('/home/claude/atlas3d/atlas3d.bin', 'wb').write(blob)
open('/home/claude/atlas3d/atlas3d.json', 'w').write(json.dumps(manifest, separators=(',', ':')))
b64 = base64.b64encode(gz).decode()
open('/home/claude/atlas3d/atlas3d.b64', 'w').write(b64)
print('parts', len(parts), 'tris', total_tris, 'raw MB', len(blob) / 1e6, 'gz MB', len(gz) / 1e6, 'b64 MB', len(b64) / 1e6)
