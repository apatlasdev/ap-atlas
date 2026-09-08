"""Convert a downloaded Sketchfab glTF zip (cell model) into the atlas3d packed format (dataset 'cell').
Usage: python3 cellbuild.py path/to/model.zip
Writes cell.bin/cell.json/cell.b64 + cell_block.html
"""
import sys, zipfile, json, gzip, base64, os, re, collections
import numpy as np, trimesh, fast_simplification

zpath = sys.argv[1]
out = '/home/claude/atlas3d/cellsrc'
os.makedirs(out, exist_ok=True)
with zipfile.ZipFile(zpath) as z:
    z.extractall(out)
gl = None
for root, d, files in os.walk(out):
    for f in files:
        if f.endswith('.gltf') or f.endswith('.glb'):
            gl = os.path.join(root, f)
print('gltf:', gl)
sc = trimesh.load(gl, force='scene')
print('geometries:', len(sc.geometry))
# node -> geometry with world transform
items = []
for node in sc.graph.nodes_geometry:
    T, gname = sc.graph[node]
    g = sc.geometry[gname]
    if not isinstance(g, trimesh.Trimesh): continue
    v = np.asarray(g.vertices, dtype=np.float64)
    v = trimesh.transform_points(v, T)
    items.append((node, gname, v, np.asarray(g.faces, dtype=np.int64), g.visual))
tot = sum(len(f) for _, _, _, f, _ in items)
print('nodes:', len(items), 'tris:', tot)
for n, gname, v, f, vis in items:
    col = None
    try:
        mat = vis.material
        col = getattr(mat, 'baseColorFactor', None) or getattr(mat, 'main_color', None)
        col = [int(x) for x in col[:3]] if col is not None else None
    except Exception: pass
    print('%-40s %-30s tris=%7d  color=%s' % (n[:40], gname[:30], len(f), col))
json.dump([{'node': n, 'geom': g, 'tris': int(len(f))} for n, g, v, f, vis in items], open('/home/claude/atlas3d/cell_nodes.json', 'w'), indent=1)

# ---------------- pack ----------------
from PIL import Image
gl_json = json.load(open(gl))
gdir = os.path.dirname(gl)
def tex_avg(mi):
    m = gl_json['materials'][mi]; pbr = m.get('pbrMetallicRoughness', {})
    if 'baseColorFactor' in pbr: return [int(x*255) for x in pbr['baseColorFactor'][:3]]
    if 'baseColorTexture' in pbr:
        ti = pbr['baseColorTexture']['index']; im = gl_json['images'][gl_json['textures'][ti]['source']]['uri']
        img = Image.open(os.path.join(gdir, im)).convert('RGB').resize((64,64))
        px = np.asarray(img, dtype=np.float64).reshape(-1,3)
        return [int(x) for x in px.mean(axis=0)]
    return [160,160,160]
node_mat = {}
for nd in gl_json['nodes']:
    if 'mesh' in nd: node_mat[nd.get('name','')] = gl_json['meshes'][nd['mesh']]['primitives'][0].get('material')
def mat_for(node, gname):
    if node in node_mat: return node_mat[node]
    for k,v in node_mat.items():
        if node.startswith(k) or k.startswith(node): return v
    base = gname.rsplit('_',1)[0]
    for m in gl_json['meshes']:
        if m['name'].startswith(base): return m['primitives'][0].get('material')
    return None
# group definitions: (name, system, [node-name prefixes], cap, desc, extra)
G = [
 ("Plasma membrane","membrane",["Cell_membrane"],14000,"Phospholipid bilayer with embedded proteins, shown as the translucent outer skin. Selectively permeable: gases and lipids diffuse through; ions, glucose and water need channels, carriers or pumps.",{"tr":0.45}),
 ("Cytoplasm (cytosol)","membrane",["Cytoplasm"],8000,"The gel-like interior — water, ions, enzymes, glucose — where glycolysis happens and the organelles sit.",{"tr":0.5}),
 ("Nuclear envelope","nucleus",["Nucelus_outer_membrane","Nucelus_inner_membrane"],12000,"Double membrane (outer + inner) around the nucleus; the outer layer is continuous with the rough ER.",{"c":"#6a49b5"}),
 ("Nuclear pores","nucleus",["porins"],40000,"Protein gateways through both membranes — mRNA and ribosome subunits out, proteins and nucleotides in.",{}),
 ("Nucleoplasm","nucleus",["Nucleoplasm"],12000,"The fluid inside the nucleus, drawn translucent so you can see the chromatin and nucleolus.",{"tr":0.35,"c":"#8f74d6"}),
 ("Chromatin (DNA)","nucleus",["chromatin"],30000,"DNA wound around histone proteins — the instructions. Loose between divisions; condenses into chromosomes for mitosis.",{}),
 ("Nucleolus","nucleus",["nucleolus"],24000,"Dense body where ribosomal RNA is transcribed and ribosome subunits are assembled.",{"c":"#3a2570"}),
 ("Rough endoplasmic reticulum","endomembrane",["Rough_ER"],40000,"Stacked, ribosome-studded membrane sacs continuous with the nuclear envelope. Makes proteins bound for secretion, membranes or lysosomes.",{}),
 ("Ribosomes (bound)","ribosomes",["RER_instancer"],45000,"Ribosomes docked on the rough ER, feeding new proteins straight into the ER lumen.",{}),
 ("Ribosomes (free)","ribosomes",["nucleur_ribosomes"],8000,"Free ribosomes make the proteins that stay inside the cell.",{}),
 ("Smooth endoplasmic reticulum","endomembrane",["Smooth_ER"],8000,"Tubular ER without ribosomes: lipid and steroid synthesis, drug detoxification (liver), calcium storage (muscle).",{}),
 ("Golgi apparatus","endomembrane",["Golgi"],18000,"Stack of curved cisternae: proteins arrive from the ER at the cis face, are modified and sorted, and leave in vesicles from the trans face.",{}),
 ("Mitochondria","energy",["Mitochondria"],28000,"Double-membraned powerhouses: the inner membrane folds into cristae that run the electron-transport chain and make most of the cell's ATP. They carry their own DNA.",{}),
 ("Lysosomes","digestion",["Lysosomes"],14000,"Acidic sacs of hydrolytic enzymes: digest worn-out organelles, engulfed bacteria and debris.",{"c":"#b9a27c"}),
 ("Peroxisomes","digestion",["Peroxisomes"],6000,"Break down fatty acids and detoxify hydrogen peroxide with catalase.",{}),
 ("Centrioles","cytoskeleton",["Centrioles"],16000,"Two barrels of nine microtubule triplets at right angles — the centrosome that organizes microtubules and the mitotic spindle.",{}),
 ("Microtubules","cytoskeleton",["Microtubules"],8000,"Hollow tubulin rods radiating from the centrosome: tracks for motor proteins and the spindle that separates chromosomes.",{}),
 ("Cytoskeleton (filaments)","cytoskeleton",["cytoskeleton"],45000,"Actin microfilaments and intermediate filaments: cell shape, movement, and anchoring the organelles in place.",{}),
]
def weld(v,f):
    m=trimesh.Trimesh(v,f,process=False); m.merge_vertices(); m.remove_unreferenced_vertices(); return np.asarray(m.vertices), np.asarray(m.faces)
def decimate(v,f,cap):
    if len(f)<=cap: return v,f
    v2,f2=fast_simplification.simplify(v.astype(np.float32), f.astype(np.int64), target_reduction=1-cap/len(f), agg=5)
    return np.asarray(v2,dtype=np.float64), np.asarray(f2,dtype=np.int64)
# normalize scale: fit whole model into ~1.7m height, centered
allv=np.concatenate([v for _,_,v,_,_ in items]); mn=allv.min(axis=0); mx=allv.max(axis=0); ctr=(mn+mx)/2; sc=1.6/max(mx-mn)
print('bounds', mn, mx, 'scale', sc)
parts=[]; blob=bytearray(); total=0
for name,sysk,prefs,cap,desc,extra in G:
    sel=[(n,gn,v,f) for n,gn,v,f,_ in items if any(n.startswith(p) for p in prefs)]
    if not sel: print('!! none for',name); continue
    vs=[];fs=[];off=0
    for n,gn,v,f in sel: vs.append(v); fs.append(f+off); off+=len(v)
    v=np.concatenate(vs); f=np.concatenate(fs)
    v=(v-ctr)*sc; v=np.stack([v[:,0], -v[:,2], v[:,1]],axis=1); v[:,1]+=0.8
    v,f=weld(v,f); v,f=decimate(v,f,cap); v,f=weld(v,f)
    while len(v)>65535:
        v,f=decimate(v,f,int(len(f)*0.8)); v,f=weld(v,f)
    mi=mat_for(sel[0][0], sel[0][1]); col=tex_avg(mi) if mi is not None else [160,160,160]
    bmn=v.min(axis=0); bmx=v.max(axis=0); ext=np.maximum(bmx-bmn,1e-6)
    q=np.round((v-bmn)/ext*65535).astype(np.uint16)
    while len(blob)%4: blob.append(0)
    po=len(blob); blob+=q.tobytes()
    while len(blob)%4: blob.append(0)
    io=len(blob); blob+=f.astype(np.uint16).tobytes(); total+=len(f)
    p={'n':name,'s':sysk,'d':desc,'b':[round(float(x),5) for x in bmn]+[round(float(x),5) for x in bmx],'v':int(len(v)),'i':int(len(f)*3),'p':po,'x':io,'c':'#%02x%02x%02x'%tuple(col)}
    p.update(extra); parts.append(p)
    print('%-32s tris=%6d verts=%6d color=%s' % (name,len(f),len(v),p['c']))
man={'parts':parts,'tris':total,'bytes':len(blob),'credit':'Eukaryotic Cell Cross Section by dav169 (Sketchfab), CC BY 4.0'}
gz=gzip.compress(bytes(blob),9); b64=base64.b64encode(gz).decode()
open('/home/claude/atlas3d/cell_block.html','w').write('<script>window.AP3D_CELL_MAN='+json.dumps(man,separators=(",",":"))+';window.AP3D_CELL_B64="'+b64+'";</script>\n')
print('parts',len(parts),'tris',total,'raw MB',len(blob)/1e6,'gz MB',len(gz)/1e6,'b64 MB',len(b64)/1e6)
