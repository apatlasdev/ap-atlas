/* A&P Atlas 3D — BodyParts3D viewer (Three.js r147). Exposes window.Atlas3D. */
(function(){
"use strict";
var T = window.THREE;
var SYS = {
  skin:        {label:"Skin",           color:0xe6c3a5},
  skeletal:    {label:"Skeleton",       color:0xe8e0cc},
  muscular:    {label:"Muscles",        color:0xb4433f},
  nervous:     {label:"Nervous",        color:0xe6bd45},
  endocrine:   {label:"Endocrine",      color:0xb56fd1},
  heart:       {label:"Heart",          color:0xb92f2b},
  arterial:    {label:"Arteries",       color:0xdc4b3b},
  venous:      {label:"Veins",          color:0x3f6fd6},
  lymphatic:   {label:"Lymphatic",      color:0x6fb87a},
  respiratory: {label:"Respiratory",    color:0x86bde0},
  digestive:   {label:"Digestive",      color:0xcf8a58},
  urinary:     {label:"Urinary",        color:0xd9a63a},
  reproductive:{label:"Reproductive",   color:0xc48fb5}
};
var CELL_SYS = {
  membrane:    {label:"Membrane",       color:0xe9b949},
  nucleus:     {label:"Nucleus",        color:0x6c5fc7},
  endomembrane:{label:"ER · Golgi · vesicles", color:0x2a9d8f},
  energy:      {label:"Mitochondria",   color:0xe5673f},
  ribosomes:   {label:"Ribosomes",      color:0x355070},
  cytoskeleton:{label:"Cytoskeleton",   color:0x8d99ae},
  digestion:   {label:"Lysosomes · peroxisomes", color:0xc2185b}
};
Object.keys(CELL_SYS).forEach(function(k){ SYS[k]=CELL_SYS[k]; });
var SYS_ORDER = ["skin","skeletal","muscular","nervous","endocrine","heart","arterial","venous","lymphatic","respiratory","digestive","urinary","reproductive","membrane","nucleus","endomembrane","energy","ribosomes","cytoskeleton","digestion"];
var GHOST = {skin:1};

var DATAS = {}, DATA_P = {};
function b64ToU8(s){ var bin=atob(s), u=new Uint8Array(bin.length); for(var i=0;i<bin.length;i++) u[i]=bin.charCodeAt(i); return u; }
function loadData(ds){
  ds=ds||"body"; if(DATA_P[ds]) return DATA_P[ds];
  DATA_P[ds] = new Promise(function(res, rej){
    try{
      if(typeof DecompressionStream==="undefined") throw new Error("This browser can't decompress the 3D model (needs Chrome 80+, Safari 16.4+, Firefox 113+).");
      var b64 = ds==="cell" ? window.AP3D_CELL_B64 : window.AP3D_B64, man = ds==="cell" ? window.AP3D_CELL_MAN : window.AP3D_MAN;
      if(!b64) throw new Error("This model isn't included in this build.");
      var u8 = b64ToU8(b64);
      var stream = new Blob([u8]).stream().pipeThrough(new DecompressionStream("gzip"));
      new Response(stream).arrayBuffer().then(function(buf){ DATAS[ds] = {buf:buf, man:man}; res(DATAS[ds]); }, rej);
    }catch(e){ rej(e); }
  });
  return DATA_P[ds];
}
var GEO = {body:{}, cell:{}}; var DIMC=new T.Color(0xd9d4cb).convertSRGBToLinear(), SELC=new T.Color(0x3fd6b2).convertSRGBToLinear();
function geometryFor(ds, i){
  if(GEO[ds][i]) return GEO[ds][i];
  var D = DATAS[ds], p = D.man.parts[i], buf = D.buf;
  var q = new Uint16Array(buf, p.p, p.v*3), pos = new Float32Array(p.v*3), b = p.b;
  var ex=b[3]-b[0], ey=b[4]-b[1], ez=b[5]-b[2];
  for(var k=0;k<p.v;k++){ pos[k*3]=b[0]+q[k*3]/65535*ex; pos[k*3+1]=b[1]+q[k*3+1]/65535*ey; pos[k*3+2]=b[2]+q[k*3+2]/65535*ez; }
  var idx = new Uint16Array(buf, p.x, p.i);
  var g = new T.BufferGeometry();
  g.setAttribute("position", new T.BufferAttribute(pos,3));
  g.setIndex(new T.BufferAttribute(new Uint16Array(idx),1));
  g.computeVertexNormals();
  g.computeBoundingSphere();
  GEO[ds][i]=g; return g;
}
function tint(hex, i, sys){
  var c=new T.Color(hex), h={}; c.getHSL(h);
  if(GHOST[sys]) return c.convertSRGBToLinear().getHex();
  var r1=((i*7919)%97)/97-0.5, r2=((i*104729)%89)/89-0.5;
  var spread = sys==="nervous" ? 1.6 : (sys==="heart"||sys==="skeletal") ? 1.0 : 0.6;
  c.setHSL((h.h+r1*0.03*spread+1)%1, Math.max(0,Math.min(1,h.s+r2*0.12*spread)), Math.max(0.15,Math.min(0.92,h.l+r1*0.16*spread)));
  return c.convertSRGBToLinear().getHex();
}
function esc(s){ return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];}); }
function baseName(n){ return n.replace(/\s\((R|L)\)$/,""); }

function makeEnv(renderer){
  var sc=new T.Scene(); var geo=new T.PlaneGeometry(1,1);
  function panel(c,i,x,y,z,rx,ry,sx,sy){ var m=new T.Mesh(geo,new T.MeshBasicMaterial({color:c})); m.material.color.multiplyScalar(i); m.position.set(x,y,z); m.rotation.set(rx,ry,0); m.scale.set(sx,sy,1); sc.add(m); }
  var room=new T.Mesh(new T.BoxGeometry(10,10,10), new T.MeshBasicMaterial({color:0x3a3a3a, side:T.BackSide})); sc.add(room);
  panel(0xffffff,6, 0,4.9,0, Math.PI/2,0, 5,3);
  panel(0xfff1dc,9, 3,2,4.5, 0,Math.PI, 3,2);
  panel(0xdfe9ff,4, -4.9,1,0, 0,Math.PI/2, 3,3);
  panel(0xffffff,2, 4.9,0,-2, 0,-Math.PI/2, 3,3);
  var pm=new T.PMREMGenerator(renderer); var t=pm.fromScene(sc,0.04).texture; pm.dispose(); return t;
}
/* ---------- viewer ---------- */
function Viewer(host, opts){
  var self=this; opts=opts||{};
  this.opts=opts; this.host=host;
  host.classList.add("a3d");
  host.innerHTML =
    '<div class="a3d-top">'+
      '<div class="a3d-search"><input type="search" placeholder="Search a structure…" autocomplete="off"><div class="a3d-results" hidden></div></div>'+
      '<div class="a3d-chips"></div>'+
      '<div class="a3d-tools">'+
        '<label class="a3d-explode"><span>Explode</span><input type="range" min="0" max="100" value="0"></label>'+
        '<button class="a3d-btn" data-act="fit" title="Reset view">Reset</button>'+
        '<button class="a3d-btn" data-act="front" title="Front">Front</button>'+
        '<button class="a3d-btn" data-act="left" title="Left side">Left</button>'+
        '<button class="a3d-btn" data-act="back" title="Back">Back</button>'+
        '<button class="a3d-btn a3d-iso" data-act="iso" title="Show only the selected structure">Isolate</button>'+
      '</div>'+
    '</div>'+
    '<div class="a3d-body"><div class="a3d-stage"><div class="a3d-loading"><div class="a3d-spin"></div><div>Loading 3D anatomy…</div></div><div class="a3d-hover" hidden></div></div>'+
    '<aside class="a3d-info"><div class="a3d-tour" hidden></div><div class="a3d-detail"><div class="a3d-empty">Click any structure to identify it. Drag to rotate, scroll to zoom, right-drag to pan.</div></div></aside></div>';
  this.el = {
    stage: host.querySelector(".a3d-stage"), info: host.querySelector(".a3d-detail"), tour: host.querySelector(".a3d-tour"),
    chips: host.querySelector(".a3d-chips"), search: host.querySelector(".a3d-search input"), results: host.querySelector(".a3d-results"),
    explode: host.querySelector(".a3d-explode input"), hover: host.querySelector(".a3d-hover"), loading: host.querySelector(".a3d-loading"), iso: host.querySelector(".a3d-iso")
  };
  this.meshes=[]; this.byName={}; this.visibleSys={}; this.only=null; this.selected=null; this.hovered=null; this.explodeK=0; this.isolate=false;
  this.tour=null; this.dirty=true; this.disposed=false; this.dimOthers=true;
  SYS_ORDER.forEach(function(s){ self.visibleSys[s]=true; });
  host.querySelectorAll(".a3d-btn").forEach(function(b){ b.addEventListener("click", function(){ self.action(b.getAttribute("data-act")); }); });
  this.el.explode.addEventListener("input", function(){ self.setExplode(parseInt(this.value,10)/100); });
  this.el.search.addEventListener("input", function(){ self.search(this.value); });
  this.el.search.addEventListener("keydown", function(e){ if(e.key==="Enter"){ var f=self.el.results.querySelector("button"); if(f) f.click(); } if(e.key==="Escape"){ self.el.results.hidden=true; } });
  this.ds = opts.dataset==="cell" ? "cell" : "body";
  loadData(this.ds).then(function(d){ if(self.disposed) return; self.build(); }, function(err){ self.el.loading.innerHTML='<div style="max-width:32ch;text-align:center;color:var(--muted)">'+esc(err.message||err)+'</div>'; });
}
Viewer.prototype.build = function(){
  var self=this, ds=this.ds, man=DATAS[ds].man, stage=this.el.stage;
  var r = new T.WebGLRenderer({antialias:true, alpha:true, powerPreference:"high-performance"});
  r.setPixelRatio(Math.min(window.devicePixelRatio||1, 2));
  r.outputEncoding = T.sRGBEncoding;
  r.toneMapping = T.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
  r.shadowMap.enabled = true; r.shadowMap.type = T.PCFSoftShadowMap;
  stage.appendChild(r.domElement);
  this.renderer=r;
  var scene = new T.Scene(); this.scene=scene;
  scene.environment = makeEnv(r);
  scene.add(new T.HemisphereLight(0xffffff, 0x6b625a, 0.35));
  var key = new T.DirectionalLight(0xfff4e6, 1.35); key.position.set(1.6, 2.6, 2.4); key.castShadow=true;
  key.shadow.mapSize.set(2048,2048); key.shadow.bias=-0.0006; key.shadow.normalBias=0.01; key.shadow.radius=3; scene.add(key); scene.add(key.target); this.key=key;
  var fill = new T.DirectionalLight(0xdfe8ff, 0.35); fill.position.set(-2, 0.8, -1.5); scene.add(fill);
  var rim = new T.DirectionalLight(0xffffff, 0.3); rim.position.set(0.5, 1, -3); scene.add(rim);
  this.camera = new T.PerspectiveCamera(32, 1, 0.01, 50);
  this.target = new T.Vector3(0, 0.9, 0);
  this.sph = {r:3.2, theta:0, phi:Math.PI/2};
  this.pickTarget = new T.WebGLRenderTarget(1,1);
  this.pickMats = [];
  var list = man.parts.map(function(p,i){ return {p:p, g:geometryFor(ds,i)}; });
  this.partList = list.map(function(x){ return x.p; });
  list.forEach(function(it, i){
    var p=it.p, g=it.g, sys=SYS[p.s]||SYS.skeletal;
    var base = p.c ? new T.Color(p.c).convertSRGBToLinear().getHex() : tint(sys.color, i, p.s);
    var ghost = !!(GHOST[p.s] || (p.tr && p.tr<0.6));
    var mat = new T.MeshStandardMaterial({color:base, roughness:0.55, metalness:0.0, envMapIntensity:0.55, flatShading:false});
    if(ghost){ mat.transparent=true; mat.opacity=p.tr||0.22; mat.depthWrite=false; mat.side=T.DoubleSide; }
    else if(p.tr){ mat.transparent=true; mat.opacity=p.tr; mat.side=T.DoubleSide; }
    if(p.ds){ mat.side=T.DoubleSide; }
    var m = new T.Mesh(g, mat);
    m.castShadow = !ghost; m.receiveShadow = true;
    m.userData = {i:i, p:p, base:base, ghost:ghost, center:g.boundingSphere.center.clone(), radius:g.boundingSphere.radius};
    m.renderOrder = ghost ? 10 : (p.tr ? 5 : 0);
    m.frustumCulled = true;
    var id=i+1; var pm = new T.MeshBasicMaterial({color:new T.Color(((id>>16)&255)/255, ((id>>8)&255)/255, (id&255)/255), toneMapped:false, fog:false});
    if(ghost||p.ds||p.tr) pm.side=T.DoubleSide;
    self.pickMats.push(pm);
    scene.add(m); self.meshes.push(m); self.byName[p.n]=m;
  });
  this.el.loading.remove();
  this.buildChips();
  this.bindControls();
  this.resizeObs = new ResizeObserver(function(){ self.resize(); }); this.resizeObs.observe(stage);
  this.resize();
  this.applyPreset(this.opts.preset||{});
  if(this.opts.tour) this.startTour(this.opts.tour);
  this.loop();
  if(this.opts.onReady) this.opts.onReady(this);
};
Viewer.prototype.resize = function(){
  var w=this.el.stage.clientWidth||300, h=this.el.stage.clientHeight||300;
  this.renderer.setSize(w,h,false); this.camera.aspect=w/h; this.camera.updateProjectionMatrix(); this.dirty=true;
};
Viewer.prototype.loop = function(){
  var self=this;
  function frame(){
    if(self.disposed) return;
    if(self.animExplode!==undefined){ var d=self.animExplode-self.explodeK; if(Math.abs(d)<0.005){ self.explodeK=self.animExplode; self.animExplode=undefined; self.fitShadow(); } else self.explodeK+=d*0.18; self.applyExplode(); self.dirty=true; }
    if(self.animCam){ var a=self.animCam, t=Math.min(1,(performance.now()-a.t0)/a.dur), e=1-Math.pow(1-t,3);
      self.sph.r=a.r0+(a.r1-a.r0)*e; self.sph.theta=a.th0+(a.th1-a.th0)*e; self.sph.phi=a.ph0+(a.ph1-a.ph0)*e; self.target.lerpVectors(a.c0,a.c1,e); if(t>=1) self.animCam=null; self.dirty=true; }
    if(self.dirty){ self.updateCamera(); self.renderer.render(self.scene, self.camera); self.dirty=false; }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
};
Viewer.prototype.updateCamera = function(){
  var s=this.sph, c=this.camera;
  s.phi=Math.max(0.05, Math.min(Math.PI-0.05, s.phi)); s.r=Math.max(0.08, Math.min(12, s.r));
  c.position.set(this.target.x + s.r*Math.sin(s.phi)*Math.sin(s.theta), this.target.y + s.r*Math.cos(s.phi), this.target.z + s.r*Math.sin(s.phi)*Math.cos(s.theta));
  c.lookAt(this.target); c.near=Math.max(0.005, s.r*0.02); c.far=s.r*20+5; c.updateProjectionMatrix();
};
/* ---- controls ---- */
Viewer.prototype.bindControls = function(){
  var self=this, el=this.renderer.domElement, ptrs={}, last=null, moved=0, downAt=0, pinch=null;
  el.style.touchAction="none";
  el.addEventListener("contextmenu", function(e){ e.preventDefault(); });
  el.addEventListener("pointerdown", function(e){ el.setPointerCapture(e.pointerId); ptrs[e.pointerId]={x:e.clientX,y:e.clientY,b:e.button,shift:e.shiftKey}; moved=0; downAt=performance.now(); last={x:e.clientX,y:e.clientY};
    var ks=Object.keys(ptrs); if(ks.length===2){ var a=ptrs[ks[0]], b=ptrs[ks[1]]; pinch={d:Math.hypot(a.x-b.x,a.y-b.y), cx:(a.x+b.x)/2, cy:(a.y+b.y)/2}; } });
  el.addEventListener("pointermove", function(e){
    if(!ptrs[e.pointerId]){ self.hoverAt(e); return; }
    var p=ptrs[e.pointerId]; var dx=e.clientX-p.x, dy=e.clientY-p.y; p.x=e.clientX; p.y=e.clientY; moved+=Math.abs(dx)+Math.abs(dy);
    var ks=Object.keys(ptrs);
    if(ks.length>=2){ var a=ptrs[ks[0]], b=ptrs[ks[1]]; var d=Math.hypot(a.x-b.x,a.y-b.y), cx=(a.x+b.x)/2, cy=(a.y+b.y)/2;
      if(pinch){ self.sph.r*=pinch.d/Math.max(1,d); self.pan(cx-pinch.cx, cy-pinch.cy); } pinch={d:d,cx:cx,cy:cy}; self.dirty=true; return; }
    if(p.b===2 || p.b===1 || p.shift){ self.pan(dx,dy); }
    else { self.sph.theta-=dx*0.006; self.sph.phi-=dy*0.006; }
    self.animCam=null; self.dirty=true;
  });
  function up(e){ if(!ptrs[e.pointerId]) return; var p=ptrs[e.pointerId]; delete ptrs[e.pointerId]; pinch=null;
    if(moved<6 && performance.now()-downAt<600 && p.b===0){ self.clickAt(e); } }
  el.addEventListener("pointerup", up); el.addEventListener("pointercancel", up);
  el.addEventListener("pointerleave", function(){ self.setHover(null); });
  el.addEventListener("wheel", function(e){ e.preventDefault(); self.sph.r*=Math.exp((e.deltaMode===1?e.deltaY*20:e.deltaY)*0.0012); self.animCam=null; self.dirty=true; }, {passive:false});
  el.addEventListener("dblclick", function(e){ var m=self.pick(e); if(m) self.flyTo(m); });
};
Viewer.prototype.pan = function(dx,dy){
  var c=this.camera, k=this.sph.r*0.0016; var right=new T.Vector3(), up=new T.Vector3();
  c.matrix.extractBasis(right, up, new T.Vector3());
  this.target.addScaledVector(right, -dx*k).addScaledVector(up, dy*k);
};
/* ---- picking ---- */
Viewer.prototype.pick = function(e){
  var el=this.renderer.domElement, rect=el.getBoundingClientRect();
  var x=(e.clientX-rect.left)/rect.width*el.width, y=(e.clientY-rect.top)/rect.height*el.height;
  if(x<0||y<0||x>=el.width||y>=el.height) return null;
  var self=this, others = this.othersVisible();
  this.meshes.forEach(function(m){ m.userData.mat=m.material; var pickable = m.visible && !(m.userData.ghost && others && !self.only);
    m.material=self.pickMats[m.userData.i]; if(m.visible && !pickable){ m.userData.hid=true; m.visible=false; } });
  var cam=this.camera; cam.setViewOffset(el.width, el.height, Math.floor(x), Math.floor(y), 1, 1);
  var r=this.renderer, prevA=r.getClearAlpha(); r.setRenderTarget(this.pickTarget); r.setClearColor(0x000000, 1); r.render(this.scene, cam);
  var px=new Uint8Array(4); r.readRenderTargetPixels(this.pickTarget,0,0,1,1,px); r.setRenderTarget(null); r.setClearColor(0x000000, 0); cam.clearViewOffset();
  this.meshes.forEach(function(m){ m.material=m.userData.mat; if(m.userData.hid){ m.visible=true; m.userData.hid=false; } });
  var id=(px[0]<<16)|(px[1]<<8)|px[2]; if(!id) return null; return this.meshes[id-1]||null;
};
var hoverT=0;
Viewer.prototype.hoverAt = function(e){ var now=performance.now(); if(now-hoverT<50) return; hoverT=now; var m=this.pick(e); this.setHover(m, e); };
Viewer.prototype.setHover = function(m, e){
  if(this.hovered && this.hovered!==m){ this.paint(this.hovered); }
  this.hovered=m;
  if(m){ this.paint(m); var rect=this.el.stage.getBoundingClientRect(); this.el.hover.textContent=m.userData.p.n; this.el.hover.hidden=false; this.el.hover.style.left=(e.clientX-rect.left+14)+"px"; this.el.hover.style.top=(e.clientY-rect.top-10)+"px"; this.el.stage.style.cursor="pointer"; }
  else { this.el.hover.hidden=true; this.el.stage.style.cursor=""; }
  this.dirty=true;
};
Viewer.prototype.paint = function(m){
  var mat=m.material, base=m.userData.base, sel=(m===this.selected), hov=(m===this.hovered);
  var dim = !!(this.selected && !this.isolate && this.dimOthers && !sel);
  mat.color.setHex(base); mat.emissive.setHex(0x000000);
  if(dim) mat.color.lerp(DIMC, 0.62);
  if(hov && !sel){ mat.emissive.setHex(0x2a2a2a); }
  if(sel){ mat.color.setHex(base).lerp(SELC, 0.45); mat.emissive.setHex(0x0d5a48); }
  if(m.userData.ghost){ var solid=this.isolate || !this.othersVisible(); mat.opacity = solid ? 1 : (m.userData.p.tr||0.22); mat.transparent = !solid; mat.depthWrite=solid; }
};
Viewer.prototype.othersVisible = function(){ return this.meshes.some(function(m){ return m.visible && !m.userData.ghost; }); };
Viewer.prototype.clickAt = function(e){ var m=this.pick(e); this.select(m? m.userData.p.n : null, true); };
Viewer.prototype.select = function(name, fromClick){
  var m = name ? this.byName[name] : null; var prev=this.selected; this.selected=m||null;
  if(prev) this.paint(prev); if(m) this.paint(m);
  this.el.iso.classList.toggle("on", false); this.isolate=false;
  this.renderInfo(); this.dirty=true;
  if(m && this.tour) this.tourCheck(m);
  if(this.opts.onSelect) this.opts.onSelect(m? m.userData.p : null, fromClick);
};
Viewer.prototype.renderInfo = function(){
  var m=this.selected, box=this.el.info;
  if(!m){ box.innerHTML='<div class="a3d-empty">Click any structure to identify it. Drag to rotate, scroll to zoom, right-drag to pan.</div>'; return; }
  var p=m.userData.p, sys=SYS[p.s]; var extra = this.opts.infoExtra ? this.opts.infoExtra(p) : "";
  box.innerHTML='<div class="a3d-sys" style="--sc:#'+sys.color.toString(16).padStart(6,"0")+'"><i></i>'+esc(sys.label)+'</div><h3>'+esc(p.n)+'</h3>'+(p.d?'<p>'+esc(p.d)+'</p>':'')+'<div class="a3d-acts"><button class="a3d-btn" data-a="fly">Zoom to it</button><button class="a3d-btn" data-a="iso">Show alone</button><button class="a3d-btn" data-a="clear">Clear</button></div>'+extra;
  var self=this; box.querySelectorAll("[data-a]").forEach(function(b){ b.onclick=function(){ var a=b.getAttribute("data-a"); if(a==="fly") self.flyTo(m); if(a==="iso") self.action("iso"); if(a==="clear") self.select(null); }; });
};
/* ---- visibility / systems ---- */
Viewer.prototype.buildChips = function(){
  var self=this, h='';
  SYS_ORDER.forEach(function(s){ if(!self.meshes.some(function(m){ return m.userData.p.s===s; })) return; h+='<button class="a3d-chip on" data-s="'+s+'" style="--sc:#'+SYS[s].color.toString(16).padStart(6,"0")+'"><i></i>'+SYS[s].label+'</button>'; });
  h+='<button class="a3d-chip a3d-chip-all" data-s="__all">All</button>';
  this.el.chips.innerHTML=h;
  this.el.chips.querySelectorAll(".a3d-chip").forEach(function(b){ b.onclick=function(){ var s=b.getAttribute("data-s");
    if(s==="__all"){ var allOn=SYS_ORDER.every(function(k){ return self.visibleSys[k]!==false; }); SYS_ORDER.forEach(function(k){ self.visibleSys[k]=!allOn; }); if(allOn) self.visibleSys.skeletal=true; }
    else self.visibleSys[s]=!self.visibleSys[s];
    self.only=null; self.applyVisibility(); }; });
};
Viewer.prototype.applyVisibility = function(){
  var self=this;
  this.meshes.forEach(function(m){ var p=m.userData.p; var v = self.only ? self.only[p.n]===true : self.visibleSys[p.s]!==false; if(self.isolate && self.selected) v = (m===self.selected); m.visible=v; self.paint(m); });
  this.el.chips.querySelectorAll(".a3d-chip[data-s]").forEach(function(b){ var s=b.getAttribute("data-s"); if(s==="__all") return; var on = self.only ? self.meshes.some(function(m){ return m.visible && m.userData.p.s===s; }) : self.visibleSys[s]!==false; b.classList.toggle("on", !!on); });
  this.fitShadow();
  if(this.selected && !this.selected.visible) this.select(null);
  if(this.hovered && !this.hovered.visible) this.setHover(null);
  this.computeExplodeDirs(); this.applyExplode(); this.dirty=true;
};
Viewer.prototype.fitShadow = function(){
  if(!this.key) return; var box=this.bounds(true), c=box.getCenter(new T.Vector3()), sz=box.getSize(new T.Vector3()); var rad=Math.max(sz.x,sz.y,sz.z)*0.6+0.05;
  var k=this.key; k.target.position.copy(c); k.position.copy(c).add(new T.Vector3(1.6,2.6,2.4).normalize().multiplyScalar(rad*3));
  var cam=k.shadow.camera; cam.left=-rad; cam.right=rad; cam.top=rad; cam.bottom=-rad; cam.near=rad*0.5; cam.far=rad*6; cam.updateProjectionMatrix(); k.shadow.needsUpdate=true;
};
Viewer.prototype.showSystems = function(list){ var self=this; SYS_ORDER.forEach(function(s){ self.visibleSys[s]=list.indexOf(s)>=0; }); this.only=null; this.applyVisibility(); };
Viewer.prototype.showOnly = function(names){ this.only={}; var self=this; names.forEach(function(n){ self.only[n]=true; }); this.applyVisibility(); };
Viewer.prototype.visibleMeshes = function(){ return this.meshes.filter(function(m){ return m.visible; }); };
Viewer.prototype.bounds = function(exploded){
  var box=new T.Box3(), tmp=new T.Vector3(); var vm=this.visibleMeshes();
  vm.forEach(function(m){ var c=m.userData.center.clone(); if(exploded) c.add(m.position); var r=m.userData.radius; box.expandByPoint(tmp.set(c.x-r,c.y-r,c.z-r)); box.expandByPoint(tmp.set(c.x+r,c.y+r,c.z+r)); });
  if(vm.length===0){ box.set(new T.Vector3(-0.3,0,-0.2), new T.Vector3(0.3,1.75,0.2)); }
  return box;
};
/* ---- explode ---- */
Viewer.prototype.computeExplodeDirs = function(){
  var vm=this.visibleMeshes(); if(!vm.length) return;
  var box=this.bounds(false), c=box.getCenter(new T.Vector3()), size=box.getSize(new T.Vector3());
  var full = this.opts.dataset!=="cell" && size.y>1.2 && vm.length>40; var rads=vm.map(function(m){ return m.userData.radius; }).sort(function(a,b){return a-b;}); var med=rads[Math.floor(rads.length/2)]||0.05;
  var p75=rads[Math.floor(rads.length*0.75)]||med; var scale = full ? 0.55 : Math.max(0.08, Math.min(0.7, p75*3.5));
  vm.forEach(function(m){ var mc=m.userData.center, d=new T.Vector3();
    if(full){ d.set(mc.x, 0, mc.z); if(d.length()<0.02) d.set((m.userData.i%2?1:-1)*0.05,0,0.03); d.normalize(); d.y=(mc.y-c.y)*0.35; }
    else { d.subVectors(mc, c); var k=m.userData.i, ga=k*2.399963, gd=new T.Vector3(Math.cos(ga), ((k*0.618)%1-0.5)*1.4, Math.sin(ga)).normalize();
      if(d.length()<1e-5) d.copy(gd); else { d.normalize().multiplyScalar(0.45).add(gd).normalize(); } }
    if(m.userData.p.s==="membrane") d.set(0,0,0);
    m.userData.dir=d.multiplyScalar(scale); });
};
Viewer.prototype.applyExplode = function(){ var k=this.explodeK; this.meshes.forEach(function(m){ if(m.userData.dir) m.position.copy(m.userData.dir).multiplyScalar(k); else m.position.set(0,0,0); }); };
Viewer.prototype.setExplode = function(k, animate){ k=Math.max(0,Math.min(1,k)); this.el.explode.value=Math.round(k*100); if(animate) this.animExplode=k; else { this.explodeK=k; this.animExplode=undefined; this.applyExplode(); this.fitShadow(); this.dirty=true; } };
/* ---- camera helpers ---- */
Viewer.prototype.fit = function(view, animate){
  var box=this.bounds(true), c=box.getCenter(new T.Vector3()), size=box.getSize(new T.Vector3());
  var rad=Math.max(size.x,size.y,size.z)*0.5*1.15+0.02;
  var r = rad/Math.sin(this.camera.fov*Math.PI/360)/Math.min(1,this.camera.aspect)*0.98;
  var th = view==="left"? Math.PI/2 : view==="right"? -Math.PI/2 : view==="back"? Math.PI : (view===undefined||view===null? this.sph.theta : 0);
  var ph = view==="top"? 0.35 : Math.PI/2 - 0.08;
  this.goTo(c, r, th, ph, animate);
};
Viewer.prototype.goTo = function(center, r, theta, phi, animate){
  if(!animate){ this.target.copy(center); this.sph.r=r; this.sph.theta=theta; this.sph.phi=phi; this.animCam=null; this.dirty=true; return; }
  this.animCam={t0:performance.now(), dur:650, c0:this.target.clone(), c1:center.clone(), r0:this.sph.r, r1:r, th0:this.sph.theta, th1:theta, ph0:this.sph.phi, ph1:phi};
};
Viewer.prototype.flyTo = function(m){ var c=m.userData.center.clone().add(m.position); var r=Math.max(0.12, m.userData.radius*3.2); this.goTo(c, r, this.sph.theta, this.sph.phi, true); };
Viewer.prototype.action = function(a){
  if(a==="fit"){ this.fit("front", true); }
  else if(a==="front"||a==="left"||a==="back"){ this.fit(a, true); }
  else if(a==="iso"){ if(!this.selected) return; this.isolate=!this.isolate; this.el.iso.classList.toggle("on", this.isolate); this.applyVisibility(); if(this.isolate) this.fit(null, true); }
};
/* ---- search ---- */
Viewer.prototype.search = function(q){
  q=(q||"").trim().toLowerCase(); var box=this.el.results; if(!q){ box.hidden=true; return; }
  var hits=this.meshes.filter(function(m){ return m.userData.p.n.toLowerCase().indexOf(q)>=0; }).slice(0,12);
  var self=this; box.innerHTML = hits.length ? hits.map(function(m){ return '<button data-n="'+esc(m.userData.p.n)+'"><i style="background:#'+SYS[m.userData.p.s].color.toString(16).padStart(6,"0")+'"></i>'+esc(m.userData.p.n)+'</button>'; }).join("") : '<div class="a3d-none">No structure matches — this model has '+this.meshes.length+' parts.</div>';
  box.hidden=false;
  box.querySelectorAll("button").forEach(function(b){ b.onclick=function(){ var n=b.getAttribute("data-n"), m=self.byName[n]; box.hidden=true; self.el.search.value=n;
    if(!m.visible){ self.visibleSys[m.userData.p.s]=true; if(self.only) self.only[n]=true; self.isolate=false; self.applyVisibility(); }
    self.select(n); self.flyTo(m); }; });
};
/* ---- presets & tour ---- */
Viewer.prototype.applyPreset = function(pr){
  var self=this;
  if(pr.only && pr.only.length){ this.showOnly(pr.only); }
  else if(pr.systems){ this.showSystems(pr.systems); if(pr.parts){ pr.parts.forEach(function(n){ var m=self.byName[n]; if(m){ m.visible=true; } }); this.computeExplodeDirs(); } }
  else { this.showSystems(SYS_ORDER); }
  this.dimOthers = pr.dimOthers!==false;
  this.setExplode(pr.explode||0);
  this.fit(pr.view||"front", false);
  if(pr.select){ this.select(pr.select); }
};
Viewer.prototype.startTour = function(names){
  var self=this; names=names.filter(function(n){ return !!self.byName[n]; }); if(!names.length) return;
  this.tour={names:names, idx:0, done:{}, misses:0}; this.renderTour();
};
Viewer.prototype.renderTour = function(){
  var t=this.tour, box=this.el.tour; if(!t){ box.hidden=true; return; }
  box.hidden=false; var n=t.names.length, d=Object.keys(t.done).length;
  if(d>=n){ box.innerHTML='<div class="a3d-tourhead"><b>Model practical</b><span>'+n+' / '+n+'</span></div><div class="a3d-tourdone">✓ You found all '+n+' structures'+(t.misses?' ('+t.misses+' miss'+(t.misses===1?'':'es')+')':' — clean run')+'.</div>'; if(this.opts.onTourDone) this.opts.onTourDone(t); return; }
  var cur=t.names[t.idx];
  box.innerHTML='<div class="a3d-tourhead"><b>Model practical</b><span>'+d+' / '+n+'</span></div><div class="a3d-tourq">Find and click: <b>'+esc(cur)+'</b></div>'+(t.msg?'<div class="a3d-tourmsg">'+esc(t.msg)+'</div>':'')+'<div class="a3d-tourlist">'+t.names.map(function(x,i){ return '<span class="'+(t.done[x]?"ok":(i===t.idx?"cur":""))+'">'+esc(baseName(x))+'</span>'; }).join("")+'</div><button class="a3d-btn a3d-skip">Skip this one</button>';
  var self=this; box.querySelector(".a3d-skip").onclick=function(){ t.done[cur]="skip"; self.advanceTour(); };
};
Viewer.prototype.advanceTour = function(){ var t=this.tour; t.msg=""; while(t.idx<t.names.length && t.done[t.names[t.idx]]) t.idx++; if(t.idx>=t.names.length){ t.idx=0; while(t.idx<t.names.length && t.done[t.names[t.idx]]) t.idx++; } this.renderTour(); };
Viewer.prototype.tourCheck = function(m){
  var t=this.tour; if(!t || Object.keys(t.done).length>=t.names.length) return;
  var want=t.names[t.idx], got=m.userData.p.n;
  if(got===want){ t.done[want]=true; t.msg=""; this.advanceTour(); }
  else { t.misses++; t.msg="That's the "+got+". Look again for the "+want+"."; this.renderTour(); }
};
Viewer.prototype.dispose = function(){
  this.disposed=true; if(this.resizeObs) this.resizeObs.disconnect();
  if(this.renderer){ this.renderer.dispose(); this.pickTarget.dispose(); }
  this.meshes.forEach(function(m){ m.material.dispose(); }); this.pickMats.forEach(function(m){ m.dispose(); });
  this.host.innerHTML=""; this.host.classList.remove("a3d");
};

/* ---------- Joint lab: real bones + ligaments + motion + exam maneuvers ---------- */
var V3=function(x,y,z){ return new T.Vector3(x,y,z); };
var JOINTS = {
  shoulder: {
    title:"Shoulder (glenohumeral)", side:"right",
    fixed:["Scapula (R)","Clavicle (R)","Ribs (R)","Manubrium","Body of sternum","Costal cartilages (R)","T1","T2","T3","T4","T5","T6","T7","C7"],
    // the scapula gets its own small rotation (scapulohumeral rhythm)
    scap:["Scapula (R)"],
    chain:{parts:["Humerus (R)"], child:{parts:["Radius (R)","Ulna (R)","Carpal bones (R)","Metacarpals (R)","Phalanges of hand (R)"]}},
    pivot:function(L){ return L.top("Humerus (R)",0.035); },
    radius:0.28, view:"front",
    dofs:[{id:"abd",label:"Abduction",min:0,max:175,val:0,unit:"°"},{id:"flex",label:"Flexion",min:-45,max:175,val:0,unit:"°"},{id:"rot",label:"External rotation",min:-80,max:90,val:0,unit:"°"}],
    pose:function(d){ // returns quaternion for the humerus (right side): abduction about z (negative), flexion about x (+), rotation about the humeral axis
      var q=new T.Quaternion(), t=new T.Quaternion();
      q.setFromAxisAngle(V3(0,0,1), -d.abd*Math.PI/180);
      t.setFromAxisAngle(V3(1,0,0), -d.flex*Math.PI/180); q.multiply(t);
      t.setFromAxisAngle(V3(0,1,0), -d.rot*Math.PI/180); q.multiply(t);
      return q; },
    scapPose:function(d){ var a=Math.max(0,(Math.max(d.abd,d.flex)-30))/3; return new T.Quaternion().setFromAxisAngle(V3(0,0,1), -a*Math.PI/180); },
    ligs:[
      {n:"Coracohumeral ligament",k:"lig",a:["scap",V3(0.022,0.022,0.028)],b:["chain",V3(-0.018,0.008,0.012)],r:0.003,d:"From the coracoid process to the greater tubercle. Limits inferior translation and external rotation with the arm at the side."},
      {n:"Superior glenohumeral ligament",k:"lig",a:["scap",V3(0.022,0.012,0.004)],b:["chain",V3(-0.004,-0.004,0.02)],r:0.0025,d:"Glenoid rim to the lesser tubercle; resists inferior translation with the arm down."},
      {n:"Middle glenohumeral ligament",k:"lig",a:["scap",V3(0.023,0.0,0.008)],b:["chain",V3(-0.006,-0.02,0.02)],r:0.0028,d:"Main anterior restraint at 45° abduction."},
      {n:"Inferior glenohumeral ligament (anterior band)",k:"lig",a:["scap",V3(0.023,-0.014,0.008)],b:["chain",V3(-0.008,-0.03,0.016)],r:0.003,d:"The hammock under the head. The anterior band is the main restraint to anterior dislocation at 90° abduction + external rotation — the classic dislocation position."},
      {n:"Inferior glenohumeral ligament (posterior band)",k:"lig",a:["scap",V3(0.022,-0.014,-0.006)],b:["chain",V3(-0.008,-0.03,-0.012)],r:0.003,d:"Posterior part of the hammock; tightens in flexion + internal rotation."},
      {n:"Supraspinatus tendon",k:"tendon",a:["scap",V3(0.06,0.022,-0.015)],b:["chain",V3(-0.016,0.02,0.002)],r:0.004,d:"Runs under the acromion to the top of the greater tubercle. Initiates abduction; the tendon that gets pinched in impingement and torn in cuff tears."},
      {n:"Infraspinatus tendon",k:"tendon",a:["scap",V3(0.06,-0.02,-0.04)],b:["chain",V3(-0.02,0.006,-0.012)],r:0.0035,d:"Back of the scapula to the greater tubercle; external rotation."},
      {n:"Subscapularis tendon",k:"tendon",a:["scap",V3(0.055,-0.02,0.012)],b:["chain",V3(-0.004,-0.006,0.021)],r:0.0035,d:"Front of the scapula to the lesser tubercle; internal rotation and anterior stability."},
      {n:"Long head of biceps tendon",k:"tendon",a:["scap",V3(0.02,0.02,0.01)],b:["chain",V3(-0.012,-0.04,0.022)],r:0.0025,d:"From the supraglenoid tubercle through the bicipital groove. Speed's test loads it."}
    ],
    tests:[
      {n:"Empty can (Jobe)",pose:{abd:90,flex:30,rot:-60},focus:"Supraspinatus tendon",how:"Arm at 90° in the scapular plane (30° forward), thumb pointing down, patient resists a downward push.",tests:"Supraspinatus — the most commonly torn rotator cuff tendon.",pos:"Weakness or pain = supraspinatus tear or tendinopathy."},
      {n:"Neer impingement",pose:{abd:20,flex:165,rot:-45},focus:"Supraspinatus tendon",how:"Examiner stabilizes the scapula and passively forces the internally rotated arm into full flexion.",tests:"Subacromial impingement — the cuff and bursa get squeezed under the acromion.",pos:"Pain at end range = positive."},
      {n:"Hawkins–Kennedy",pose:{abd:10,flex:90,rot:-70},focus:"Supraspinatus tendon",how:"Arm flexed to 90°, elbow bent, examiner internally rotates the arm.",tests:"Subacromial impingement (same structure as Neer, different angle).",pos:"Pain = positive."},
      {n:"Drop arm",pose:{abd:90,flex:10,rot:0},focus:"Supraspinatus tendon",how:"Passively abduct the arm to 90°, then ask the patient to lower it slowly.",tests:"Full-thickness supraspinatus tear.",pos:"Arm drops suddenly or cannot be lowered smoothly."},
      {n:"Apprehension",pose:{abd:90,flex:0,rot:90},focus:"Inferior glenohumeral ligament (anterior band)",how:"Arm at 90° abduction, examiner externally rotates it — the position the shoulder dislocates in.",tests:"Anterior instability (the anterior band of the IGHL and the labrum).",pos:"Patient looks apprehensive, resists the movement."},
      {n:"External rotation (Patte)",pose:{abd:10,flex:0,rot:60},focus:"Infraspinatus tendon",how:"Elbow at the side, bent 90°; patient rotates the forearm outward against resistance.",tests:"Infraspinatus and teres minor.",pos:"Weakness = posterior cuff tear."},
      {n:"Lift-off (Gerber)",pose:{abd:15,flex:-40,rot:-80},focus:"Subscapularis tendon",how:"Hand behind the back; patient lifts it off the back against resistance.",tests:"Subscapularis.",pos:"Cannot lift the hand off = subscapularis tear."},
      {n:"Speed's",pose:{abd:0,flex:90,rot:60},focus:"Long head of biceps tendon",how:"Arm flexed to 90°, elbow straight, palm up, patient resists a downward push.",tests:"Long head of biceps tendinopathy or SLAP lesion.",pos:"Pain in the bicipital groove."}
    ],
    notes:"Real bones: scapula, clavicle, humerus, forearm. The scapula rotates upward as you raise the arm (2:1 scapulohumeral rhythm) — that is why a frozen scapula limits abduction. Ligaments and tendons are drawn between their real attachment sites; their colour shows tension for the current pose."
  },
  knee: {
    title:"Knee (tibiofemoral + patellofemoral)", side:"right",
    fixed:["Femur (R)","Hip bone (R)"],
    chain:{parts:["Tibia (R)","Fibula (R)"], child:{parts:["Talus (R)","Calcaneus (R)","Tarsal bones (R)","Metatarsals (R)","Phalanges of foot (R)"]}},
    patella:["Patella (R)"],
    pivot:function(L){ var k=L.bottom("Femur (R)",0.03); return k; },
    radius:0.24, view:"left",
    dofs:[{id:"flex",label:"Flexion",min:0,max:140,val:10,unit:"°"},{id:"valgus",label:"Valgus (+) / varus (−) stress",min:-12,max:12,val:0,unit:"°"},{id:"rot",label:"Tibial rotation (ext +)",min:-25,max:25,val:0,unit:"°"},{id:"drawer",label:"Anterior drawer (mm)",min:-10,max:12,val:0,unit:" mm"}],
    pose:function(d){ var q=new T.Quaternion(), t=new T.Quaternion();
      q.setFromAxisAngle(V3(1,0,0), d.flex*Math.PI/180);
      t.setFromAxisAngle(V3(0,0,1), -d.valgus*Math.PI/180); q.multiply(t);
      t.setFromAxisAngle(V3(0,1,0), -d.rot*Math.PI/180); q.multiply(t);
      return q; },
    trans:function(d){ return V3(0,0,d.drawer*0.001); },
    patellaPose:function(d){ return new T.Quaternion().setFromAxisAngle(V3(1,0,0), d.flex*0.55*Math.PI/180); },
    ligs:[
      {n:"Anterior cruciate ligament (ACL)",k:"lig",a:["fixed",V3(-0.009,0.004,-0.012)],b:["chain",V3(0.0,-0.012,0.012)],r:0.0035,d:"Lateral femoral condyle (inner wall) to the anterior tibia. Stops the tibia sliding forward and controls rotation. Torn in pivoting injuries — 'pop', swelling within hours."},
      {n:"Posterior cruciate ligament (PCL)",k:"lig",a:["fixed",V3(0.009,0.003,0.0)],b:["chain",V3(0.0,-0.016,-0.018)],r:0.0038,d:"Medial femoral condyle to the posterior tibia. Stops the tibia sliding backward — dashboard injuries."},
      {n:"Medial collateral ligament (MCL)",k:"lig",a:["fixed",V3(0.03,0.012,0.0)],b:["chain",V3(0.022,-0.06,0.002)],r:0.0035,d:"Medial epicondyle to the medial tibia; a broad band. Resists valgus (knee pushed inward). Most commonly injured knee ligament."},
      {n:"Lateral collateral ligament (LCL)",k:"lig",a:["fixed",V3(-0.032,0.012,-0.004)],b:["chain",V3(-0.036,-0.05,-0.012)],r:0.003,d:"Lateral epicondyle to the fibular head; a cord. Resists varus."},
      {n:"Patellar ligament",k:"tendon",a:["patella",V3(0.0,-0.022,0.0)],b:["chain",V3(0.0,-0.05,0.036)],r:0.005,d:"Patella to the tibial tuberosity — the continuation of the quadriceps tendon. Tapped for the knee-jerk reflex (L2–L4)."},
      {n:"Quadriceps tendon",k:"tendon",a:["fixed",V3(0.0,0.06,0.03)],b:["patella",V3(0.0,0.022,0.0)],r:0.005,d:"Quadriceps to the top of the patella."}
    ],
    tests:[
      {n:"Lachman",pose:{flex:25,valgus:0,rot:0,drawer:10},focus:"Anterior cruciate ligament (ACL)",how:"Knee at 20–30° flexion, one hand on the femur, the other pulls the tibia forward.",tests:"ACL — the most sensitive ACL test.",pos:"Soft or absent end point, excessive forward translation."},
      {n:"Anterior drawer",pose:{flex:90,valgus:0,rot:0,drawer:10},focus:"Anterior cruciate ligament (ACL)",how:"Knee at 90°, foot stabilised, examiner pulls the tibia forward.",tests:"ACL.",pos:"Tibia slides forward more than the other side."},
      {n:"Posterior drawer",pose:{flex:90,valgus:0,rot:0,drawer:-9},focus:"Posterior cruciate ligament (PCL)",how:"Knee at 90°, examiner pushes the tibia backward.",tests:"PCL.",pos:"Posterior sag or excessive backward translation."},
      {n:"Valgus stress",pose:{flex:25,valgus:10,rot:0,drawer:0},focus:"Medial collateral ligament (MCL)",how:"Knee at 0° and 30°, examiner pushes the knee inward while holding the ankle.",tests:"MCL.",pos:"Medial gapping or pain."},
      {n:"Varus stress",pose:{flex:25,valgus:-10,rot:0,drawer:0},focus:"Lateral collateral ligament (LCL)",how:"Knee at 0° and 30°, examiner pushes the knee outward.",tests:"LCL.",pos:"Lateral gapping or pain."},
      {n:"McMurray",pose:{flex:120,valgus:6,rot:20,drawer:0},focus:"Medial collateral ligament (MCL)",how:"Full flexion, then extend the knee while rotating the tibia (external rotation + valgus loads the medial meniscus).",tests:"Meniscal tears (the menisci aren't in this dataset — they sit between femur and tibia on each side).",pos:"Click or pain along the joint line."}
    ],
    notes:"Real femur, tibia, fibula and patella. Flex the knee and watch the patella track down the femoral groove and the cruciates cross. The drawer slider translates the tibia so you can see which cruciate takes the load."
  },
  ankle: {
    title:"Ankle (talocrural + subtalar)", side:"right",
    fixed:["Tibia (R)","Fibula (R)"],
    chain:{parts:["Talus (R)"], child:{parts:["Calcaneus (R)","Tarsal bones (R)","Metatarsals (R)","Phalanges of foot (R)"], sub:true}},
    pivot:function(L){ var m=L.bottom("Tibia (R)",0.02), l=L.bottom("Fibula (R)",0.02); return m.clone().add(l).multiplyScalar(0.5).add(V3(0,-0.01,0)); },
    subPivot:function(L,P){ return P.clone().add(V3(0,-0.02,0.01)); },
    radius:0.14, view:"left",
    dofs:[{id:"pf",label:"Plantarflexion (+) / dorsiflexion (−)",min:-25,max:50,val:0,unit:"°"},{id:"inv",label:"Inversion (+) / eversion (−)",min:-20,max:35,val:0,unit:"°"},{id:"drawer",label:"Anterior drawer (mm)",min:0,max:10,val:0,unit:" mm"}],
    pose:function(d){ return new T.Quaternion().setFromAxisAngle(V3(1,0,0), d.pf*Math.PI/180); },
    trans:function(d){ return V3(0,0,d.drawer*0.001); },
    subPose:function(d){ var ax=V3(0.16,0.68,0.72).normalize(); return new T.Quaternion().setFromAxisAngle(ax, d.inv*Math.PI/180); },
    ligs:[
      {n:"Anterior talofibular ligament (ATFL)",k:"lig",a:["fixed",V3(-0.028,-0.008,0.004)],b:["chain",V3(-0.012,-0.012,0.026)],r:0.003,d:"Lateral malleolus to the neck of the talus. The first and most commonly sprained ligament in an inversion ('rolled') ankle. Tightest in plantarflexion + inversion."},
      {n:"Calcaneofibular ligament (CFL)",k:"lig",a:["fixed",V3(-0.03,-0.01,-0.002)],b:["sub",V3(-0.03,-0.042,-0.006)],r:0.003,d:"Lateral malleolus down to the calcaneus. Second to go in a bad inversion sprain."},
      {n:"Posterior talofibular ligament (PTFL)",k:"lig",a:["fixed",V3(-0.027,-0.008,-0.012)],b:["chain",V3(-0.008,-0.012,-0.024)],r:0.003,d:"Strongest of the lateral three; rarely injured."},
      {n:"Deltoid ligament (tibiocalcaneal)",k:"lig",a:["fixed",V3(0.024,-0.004,0.0)],b:["sub",V3(0.014,-0.036,-0.006)],r:0.0032,d:"The strong medial fan. Resists eversion; more often the medial malleolus fractures before the deltoid tears."},
      {n:"Deltoid ligament (tibionavicular)",k:"lig",a:["fixed",V3(0.024,-0.004,0.004)],b:["sub",V3(0.012,-0.024,0.03)],r:0.0028,d:"Anterior band of the deltoid, to the navicular."},
      {n:"Deltoid ligament (posterior tibiotalar)",k:"lig",a:["fixed",V3(0.022,-0.006,-0.008)],b:["chain",V3(0.01,-0.014,-0.02)],r:0.0028,d:"Posterior band of the deltoid, to the talus."},
      {n:"Anterior tibiofibular ligament (syndesmosis)",k:"lig",a:["fixed",V3(0.006,0.02,0.012)],b:["fixed",V3(-0.022,0.018,0.012)],r:0.003,d:"Ties the tibia and fibula together above the ankle — a 'high ankle sprain'."},
      {n:"Achilles tendon",k:"tendon",a:["fixed",V3(0.0,0.09,-0.038)],b:["sub",V3(0.0,-0.03,-0.046)],r:0.006,d:"Gastrocnemius + soleus to the calcaneus. Squeeze the calf (Thompson test) — no plantarflexion means it is ruptured."}
    ],
    tests:[
      {n:"Anterior drawer",pose:{pf:10,inv:0,drawer:9},focus:"Anterior talofibular ligament (ATFL)",how:"Slight plantarflexion; examiner cups the heel and pulls the foot forward while holding the shin.",tests:"ATFL.",pos:"Talus slides forward, dimple at the anterolateral ankle."},
      {n:"Talar tilt",pose:{pf:0,inv:30,drawer:0},focus:"Calcaneofibular ligament (CFL)",how:"Foot in neutral, examiner inverts the heel.",tests:"CFL (and ATFL).",pos:"Excess tilt or pain compared with the other side."},
      {n:"Inversion sprain mechanism",pose:{pf:40,inv:35,drawer:4},focus:"Anterior talofibular ligament (ATFL)",how:"Not a test — the injury position: plantarflexed and inverted, e.g. landing on someone's foot.",tests:"Shows why the ATFL goes first: it is the tightest ligament in this position.",pos:"ATFL → CFL → PTFL, in that order as the injury gets worse."},
      {n:"Eversion stress",pose:{pf:0,inv:-20,drawer:0},focus:"Deltoid ligament (tibiocalcaneal)",how:"Examiner everts the heel.",tests:"Deltoid ligament / medial malleolus.",pos:"Medial pain or gapping."},
      {n:"Squeeze test",pose:{pf:0,inv:0,drawer:0},focus:"Anterior tibiofibular ligament (syndesmosis)",how:"Squeeze the tibia and fibula together at mid-calf.",tests:"Syndesmosis (high ankle sprain).",pos:"Pain at the ankle, not the calf."},
      {n:"Thompson",pose:{pf:5,inv:0,drawer:0},focus:"Achilles tendon",how:"Patient prone, examiner squeezes the calf.",tests:"Achilles rupture.",pos:"Foot does not plantarflex."}
    ],
    notes:"Real tibia, fibula, talus and foot. Two joints: plantar/dorsiflexion happens at the talocrural joint (talus in the mortise); inversion/eversion happens below it at the subtalar joint. Watch the lateral ligaments tighten as you plantarflex and invert — that is the rolled-ankle position."
  }
};
var TENSION_COLORS = {slack:0x6c8fd6, neutral:0xb9b0a3, taut:0xe0a33a, strained:0xd63a3a};
function tensionState(ratio){ return ratio<0.97 ? "slack" : ratio<1.05 ? "neutral" : ratio<1.14 ? "taut" : "strained"; }

function JointLab(host, opts){
  var self=this; opts=opts||{}; this.opts=opts; this.host=host; this.ds="body";
  host.classList.add("a3d"); host.classList.add("a3d-joint");
  host.innerHTML =
    '<div class="a3d-top"><div class="a3d-jtabs">'+Object.keys(JOINTS).map(function(k){ return '<button class="seg" data-j="'+k+'">'+JOINTS[k].title.split(" (")[0]+'</button>'; }).join("")+'</div>'+
    '<div class="a3d-tools"><button class="a3d-btn" data-act="reset">Neutral pose</button><button class="a3d-btn" data-act="fit">Reset view</button><button class="a3d-btn" data-act="front">Front</button><button class="a3d-btn" data-act="left">Side</button><button class="a3d-btn" data-act="back">Back</button></div></div>'+
    '<div class="a3d-body"><div class="a3d-stage"><div class="a3d-loading"><div class="a3d-spin"></div><div>Loading joint…</div></div><div class="a3d-hover" hidden></div></div>'+
    '<aside class="a3d-info"><div class="a3d-jnotes"></div><div class="a3d-dofs"></div><div class="a3d-ligs"></div><div class="a3d-tests"></div><div class="a3d-detail"></div></aside></div>';
  this.el={stage:host.querySelector(".a3d-stage"), hover:host.querySelector(".a3d-hover"), loading:host.querySelector(".a3d-loading"), info:host.querySelector(".a3d-detail"),
    dofs:host.querySelector(".a3d-dofs"), ligs:host.querySelector(".a3d-ligs"), tests:host.querySelector(".a3d-tests"), notes:host.querySelector(".a3d-jnotes"), tabs:host.querySelector(".a3d-jtabs")};
  this.meshes=[]; this.pickMats=[]; this.selected=null; this.hovered=null; this.dirty=true; this.disposed=false; this.dimOthers=false; this.only=null; this.isolate=false; this.visibleSys={};
  host.querySelectorAll(".a3d-btn").forEach(function(b){ b.addEventListener("click", function(){ self.action(b.getAttribute("data-act")); }); });
  host.querySelectorAll("[data-j]").forEach(function(b){ b.addEventListener("click", function(){ self.load(b.getAttribute("data-j")); }); });
  loadData("body").then(function(){ if(self.disposed) return; self.setup(); self.load(opts.joint||"shoulder"); }, function(err){ self.el.loading.innerHTML='<div style="color:var(--muted)">'+esc(err.message||err)+'</div>'; });
}
JointLab.prototype = Object.create(Viewer.prototype);
JointLab.prototype.setup = function(){
  var self=this, stage=this.el.stage;
  var r=new T.WebGLRenderer({antialias:true, alpha:true, powerPreference:"high-performance"}); r.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  r.outputEncoding=T.sRGBEncoding; r.toneMapping=T.ACESFilmicToneMapping; r.toneMappingExposure=1.05; r.shadowMap.enabled=true; r.shadowMap.type=T.PCFSoftShadowMap;
  stage.appendChild(r.domElement); this.renderer=r;
  var scene=new T.Scene(); this.scene=scene; scene.environment=makeEnv(r);
  scene.add(new T.HemisphereLight(0xffffff,0x6b625a,0.35));
  var key=new T.DirectionalLight(0xfff4e6,1.35); key.position.set(1.6,2.6,2.4); key.castShadow=true; key.shadow.mapSize.set(2048,2048); key.shadow.bias=-0.0006; key.shadow.normalBias=0.01; key.shadow.radius=3; scene.add(key); scene.add(key.target); this.key=key;
  var fill=new T.DirectionalLight(0xdfe8ff,0.35); fill.position.set(-2,0.8,-1.5); scene.add(fill);
  var rim=new T.DirectionalLight(0xffffff,0.3); rim.position.set(0.5,1,-3); scene.add(rim);
  this.camera=new T.PerspectiveCamera(30,1,0.005,50); this.target=V3(0,1,0); this.sph={r:1,theta:0,phi:Math.PI/2};
  this.pickTarget=new T.WebGLRenderTarget(1,1);
  this.root=new T.Group(); scene.add(this.root);
  this.el.loading.remove(); this.bindControls();
  this.resizeObs=new ResizeObserver(function(){ self.resize(); }); this.resizeObs.observe(stage); this.resize();
  this.loop();
};
JointLab.prototype.partIndex = function(name){ var ps=DATAS.body.man.parts; for(var i=0;i<ps.length;i++) if(ps[i].n===name) return i; return -1; };
JointLab.prototype.landmarks = function(){
  var self=this;
  function verts(name){ var i=self.partIndex(name); if(i<0) return null; return geometryFor("body",i).attributes.position; }
  function sel(name, pred){ var p=verts(name); if(!p) return V3(0,0,0); var c=V3(0,0,0), n=0, v=V3(); for(var k=0;k<p.count;k++){ v.fromBufferAttribute(p,k); if(pred(v)){ c.add(v); n++; } } return n? c.multiplyScalar(1/n) : c; }
  function ext(name, axis, sign){ var p=verts(name); var best=sign>0?-1e9:1e9; var v=V3(); for(var k=0;k<p.count;k++){ v.fromBufferAttribute(p,k); var a=v[axis]; if(sign>0? a>best : a<best) best=a; } return best; }
  return {
    top:function(name,h){ var m=ext(name,"y",1); return sel(name,function(v){ return v.y>m-h; }); },
    bottom:function(name,h){ var m=ext(name,"y",-1); return sel(name,function(v){ return v.y<m+h; }); }
  };
};
JointLab.prototype.clear = function(){
  var self=this; this.meshes.forEach(function(m){ m.material.dispose(); }); this.pickMats.forEach(function(m){ m.dispose(); });
  this.meshes=[]; this.pickMats=[]; this.selected=null; this.hovered=null;
  while(this.root.children.length) this.root.remove(this.root.children[0]);
  this.ligMeshes=[];
};
JointLab.prototype.addPart = function(name, group, pivot){
  var i=this.partIndex(name); if(i<0) return null;
  var p=DATAS.body.man.parts[i], g=geometryFor("body",i), sys=SYS[p.s]||SYS.skeletal;
  var mat=new T.MeshStandardMaterial({color:tint(sys.color,i,p.s), roughness:0.55, metalness:0, envMapIntensity:0.55});
  var m=new T.Mesh(g,mat); m.castShadow=true; m.receiveShadow=true;
  m.userData={i:this.meshes.length, p:{n:p.n,s:p.s,d:p.d}, base:mat.color.getHex(), ghost:false, center:g.boundingSphere.center.clone(), radius:g.boundingSphere.radius};
  if(pivot) m.position.copy(pivot).negate();
  this.registerPick(m); group.add(m); return m;
};
JointLab.prototype.registerPick = function(m){
  var id=this.meshes.length+1; var pm=new T.MeshBasicMaterial({color:new T.Color(((id>>16)&255)/255,((id>>8)&255)/255,(id&255)/255), toneMapped:false, fog:false});
  m.userData.i=this.meshes.length; this.pickMats.push(pm); this.meshes.push(m);
};
JointLab.prototype.load = function(key){
  var self=this, J=JOINTS[key]; this.J=J; this.jkey=key;
  this.el.tabs.querySelectorAll("[data-j]").forEach(function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-j")===key?"true":"false"); });
  this.clear();
  var L=this.landmarks(); var P=J.pivot(L); this.pivot=P;
  // fixed bones
  var fixedG=new T.Group(); this.root.add(fixedG); this.fixedG=fixedG;
  J.fixed.forEach(function(n){ if(J.scap && J.scap.indexOf(n)>=0) return; self.addPart(n, fixedG, null); });
  // scapula group (shoulder)
  if(J.scap){ var sc=new T.Group(); var sp=null; J.scap.forEach(function(n){ var i=self.partIndex(n); if(i>=0){ var g=geometryFor("body",i); sp=g.boundingSphere.center.clone(); } }); sc.position.copy(sp); this.root.add(sc); this.scapG=sc; this.scapPivot=sp; J.scap.forEach(function(n){ self.addPart(n, sc, sp); }); }
  // chain
  var chainG=new T.Group(); chainG.position.copy(P); this.root.add(chainG); this.chainG=chainG;
  J.chain.parts.forEach(function(n){ self.addPart(n, chainG, P); });
  if(J.chain.child){
    var sub=J.chain.child; var subP = sub.sub && J.subPivot ? J.subPivot(L,P) : P;
    var childG=new T.Group(); childG.position.copy(subP).sub(P); chainG.add(childG); this.childG=childG; this.subPivot=subP;
    sub.parts.forEach(function(n){ self.addPart(n, childG, subP); });
  }
  if(J.patella){ var pg=new T.Group(); pg.position.copy(P); this.root.add(pg); this.patG=pg; J.patella.forEach(function(n){ self.addPart(n, pg, P); }); }
  // ligaments
  this.ligMeshes=[]; this.ligs=J.ligs.map(function(l){ var mat=new T.MeshStandardMaterial({color:new T.Color(TENSION_COLORS.neutral).convertSRGBToLinear(), roughness:0.5, metalness:0, envMapIntensity:0.5});
    var m=new T.Mesh(new T.BufferGeometry(), mat); m.castShadow=true; m.userData={p:{n:l.n,s:l.k==="tendon"?"muscular":"connective",d:l.d}, base:mat.color.getHex(), ghost:false, center:V3(), radius:0.02, lig:l}; self.registerPick(m); self.root.add(m); self.ligMeshes.push(m); return l; });
  this.dof={}; J.dofs.forEach(function(d){ self.dof[d.id]=d.val; });
  this.applyPose(); this.restLen=null; this.updateLigs(); this.restLen=this.ligMeshes.map(function(m){ return m.userData.len; }); this.updateLigs();
  this.renderPanel(); this.renderInfo(); this.fit(J.view,false); this.fitShadow(); this.dirty=true;
};
JointLab.prototype.bounds = function(){ var r=this.J?this.J.radius:0.3, c=this.pivot||V3(0,1,0); return new T.Box3(c.clone().subScalar(r), c.clone().addScalar(r)); };
JointLab.prototype.applyPose = function(){
  var J=this.J, d=this.dof;
  this.chainG.quaternion.copy(J.pose(d)); if(J.trans) this.chainG.position.copy(this.pivot).add(J.trans(d));
  if(this.childG && J.subPose) this.childG.quaternion.copy(J.subPose(d));
  if(this.scapG && J.scapPose) this.scapG.quaternion.copy(J.scapPose(d));
  if(this.patG && J.patellaPose) this.patG.quaternion.copy(J.patellaPose(d));
  this.root.updateMatrixWorld(true);
};
JointLab.prototype.attachPoint = function(ref){
  var kind=ref[0], off=ref[1], P=this.pivot, w=V3();
  if(kind==="fixed") return P.clone().add(off);
  if(kind==="chain"){ return this.chainG.localToWorld(off.clone()); }
  if(kind==="sub"){ return (this.childG||this.chainG).localToWorld(off.clone().add(this.pivot).sub(this.subPivot||this.pivot)); }
  if(kind==="patella"){ return this.patG.localToWorld(off.clone()); }
  if(kind==="scap"){ return this.scapG ? this.scapG.localToWorld(off.clone().add(this.pivot).sub(this.scapPivot)) : P.clone().add(off); }
  return P.clone();
};
JointLab.prototype.updateLigs = function(){
  var self=this;
  this.ligMeshes.forEach(function(m,i){ var l=m.userData.lig; var a=self.attachPoint(l.a), b=self.attachPoint(l.b);
    var mid=a.clone().add(b).multiplyScalar(0.5); var bow=V3(0,0,0); // slight sag for slack
    var len=a.distanceTo(b); m.userData.len=len;
    var rest=self.restLen? self.restLen[i] : len; var ratio=len/Math.max(1e-6,rest); var st=tensionState(ratio);
    if(ratio<0.97){ var n=b.clone().sub(a).normalize(); var side=V3(0,-1,0).addScaledVector(n, -V3(0,-1,0).dot(n)).normalize(); bow=side.multiplyScalar((0.97-ratio)*len*0.9); }
    var curve=new T.QuadraticBezierCurve3(a, mid.add(bow), b);
    var g=new T.TubeGeometry(curve, 12, l.r*(ratio>1.05?0.85:1), 8, false); g.computeBoundingSphere();
    m.geometry.dispose(); m.geometry=g; m.userData.center=g.boundingSphere.center; m.userData.radius=g.boundingSphere.radius; m.userData.ratio=ratio; m.userData.state=st;
    m.userData.base=new T.Color(TENSION_COLORS[st]).convertSRGBToLinear().getHex(); self.paint(m);
  });
  this.renderLigList();
};
JointLab.prototype.setDof = function(id,val,noRender){ this.dof[id]=val; this.applyPose(); this.updateLigs(); this.dirty=true; if(!noRender) this.syncSliders(); };
JointLab.prototype.syncSliders = function(){ var self=this; this.el.dofs.querySelectorAll("input[type=range]").forEach(function(s){ var id=s.getAttribute("data-dof"); s.value=self.dof[id]; var o=s.parentElement.querySelector(".val"); if(o) o.textContent=Math.round(self.dof[id])+(self.J.dofs.filter(function(d){return d.id===id;})[0].unit); }); };
JointLab.prototype.animateTo = function(target){ var self=this, from={}; Object.keys(this.dof).forEach(function(k){ from[k]=self.dof[k]; }); this.animPose={from:from,to:target,t0:performance.now(),dur:700}; };
JointLab.prototype.loop = function(){
  var self=this;
  function frame(){ if(self.disposed) return;
    if(self.animPose){ var a=self.animPose, t=Math.min(1,(performance.now()-a.t0)/a.dur), e=1-Math.pow(1-t,3); Object.keys(a.to).forEach(function(k){ self.dof[k]=a.from[k]+(a.to[k]-a.from[k])*e; }); self.applyPose(); self.updateLigs(); self.syncSliders(); if(t>=1) self.animPose=null; self.dirty=true; }
    if(self.animCam){ var c=self.animCam, tt=Math.min(1,(performance.now()-c.t0)/c.dur), ee=1-Math.pow(1-tt,3); self.sph.r=c.r0+(c.r1-c.r0)*ee; self.sph.theta=c.th0+(c.th1-c.th0)*ee; self.sph.phi=c.ph0+(c.ph1-c.ph0)*ee; self.target.lerpVectors(c.c0,c.c1,ee); if(tt>=1) self.animCam=null; self.dirty=true; }
    if(self.dirty){ self.updateCamera(); self.renderer.render(self.scene,self.camera); self.dirty=false; }
    requestAnimationFrame(frame); }
  requestAnimationFrame(frame);
};
JointLab.prototype.action = function(a){
  if(a==="reset"){ var t={}; this.J.dofs.forEach(function(d){ t[d.id]=d.val; }); this.animateTo(t); this.select(null); }
  else if(a==="fit"){ this.fit(this.J.view,true); }
  else if(a==="front"||a==="left"||a==="back"){ this.fit(a,true); }
};
JointLab.prototype.fit = function(view, animate){
  var c=this.pivot.clone(), r=this.J.radius; var dist=r/Math.sin(this.camera.fov*Math.PI/360)/Math.min(1,this.camera.aspect)*1.05;
  var side = this.J.side==="right" ? -Math.PI/2 : Math.PI/2;
  var th = view==="left"? side : view==="back"? Math.PI : 0; var ph=Math.PI/2-0.1;
  this.goTo(c, dist, th, ph, animate);
};
JointLab.prototype.othersVisible = function(){ return true; };
JointLab.prototype.visibleMeshes = function(){ return this.meshes; };
JointLab.prototype.clickAt = function(e){ var m=this.pick(e); this.select(m? m.userData.p.n : null); };
JointLab.prototype.select = function(name){
  var self=this; var m=null; this.meshes.forEach(function(x){ if(x.userData.p.n===name) m=x; });
  var prev=this.selected; this.selected=m; if(prev) this.paint(prev); if(m) this.paint(m);
  this.renderInfo(); this.renderLigList(); this.dirty=true;
};
JointLab.prototype.renderInfo = function(){
  var m=this.selected, box=this.el.info;
  if(!m){ box.innerHTML=""; return; }
  var p=m.userData.p, isLig=!!m.userData.lig; var sys=isLig?{label:m.userData.lig.k==="tendon"?"Tendon":"Ligament",color:TENSION_COLORS[m.userData.state]}:SYS[p.s];
  box.innerHTML='<div class="a3d-sys" style="--sc:#'+sys.color.toString(16).padStart(6,"0")+'"><i></i>'+esc(sys.label)+(isLig?' · '+m.userData.state+' ('+Math.round(m.userData.ratio*100)+'% of resting length)':'')+'</div><h3>'+esc(p.n)+'</h3>'+(p.d?'<p>'+esc(p.d)+'</p>':'')+'<div class="a3d-acts"><button class="a3d-btn" data-a="clear">Clear</button></div>';
  var self=this; box.querySelector("[data-a=clear]").onclick=function(){ self.select(null); };
};
JointLab.prototype.renderPanel = function(){
  var self=this, J=this.J;
  this.el.notes.innerHTML='<div class="a3d-tourhead"><b>'+esc(J.title)+'</b></div><p style="margin:0 0 6px">'+esc(J.notes)+'</p>';
  this.el.dofs.innerHTML='<div class="eyebrow" style="margin:10px 0 6px">Move the joint</div>'+J.dofs.map(function(d){ return '<label class="a3d-dof"><span>'+esc(d.label)+'<b class="val">'+d.val+d.unit+'</b></span><input type="range" min="'+d.min+'" max="'+d.max+'" step="1" value="'+d.val+'" data-dof="'+d.id+'"></label>'; }).join("");
  this.el.dofs.querySelectorAll("input[type=range]").forEach(function(s){ s.addEventListener("input", function(){ self.animPose=null; self.setDof(s.getAttribute("data-dof"), parseFloat(s.value)); }); });
  this.el.tests.innerHTML='<div class="eyebrow" style="margin:12px 0 6px">Exam maneuvers</div><div class="a3d-testlist">'+J.tests.map(function(t,i){ return '<button class="a3d-test" data-t="'+i+'">'+esc(t.n)+'</button>'; }).join("")+'</div><div class="a3d-testinfo"></div>';
  this.el.tests.querySelectorAll("[data-t]").forEach(function(b){ b.onclick=function(){ var t=J.tests[parseInt(b.getAttribute("data-t"),10)]; self.el.tests.querySelectorAll("[data-t]").forEach(function(x){ x.classList.toggle("on", x===b); });
    self.animateTo(t.pose); self.select(t.focus);
    self.el.tests.querySelector(".a3d-testinfo").innerHTML='<div class="a3d-testcard"><b>'+esc(t.n)+'</b><div><span>How</span>'+esc(t.how)+'</div><div><span>Tests</span>'+esc(t.tests)+'</div><div><span>Positive</span>'+esc(t.pos)+'</div></div>'; }; });
  this.renderLigList();
};
JointLab.prototype.renderLigList = function(){
  var self=this; if(!this.ligMeshes||!this.ligMeshes.length) return;
  var h='<div class="eyebrow" style="margin:12px 0 6px">Ligaments &amp; tendons — live tension</div>';
  this.ligMeshes.forEach(function(m){ var st=m.userData.state||"neutral", r=m.userData.ratio||1; var w=Math.max(4,Math.min(100,Math.round((r-0.85)/0.35*100)));
    h+='<button class="a3d-lig '+(m===self.selected?"on":"")+'" data-l="'+esc(m.userData.p.n)+'"><span class="nm">'+esc(m.userData.p.n)+'</span><span class="bar"><i style="width:'+w+'%;background:#'+TENSION_COLORS[st].toString(16).padStart(6,"0")+'"></i></span><span class="st">'+st+'</span></button>'; });
  this.el.ligs.innerHTML=h;
  this.el.ligs.querySelectorAll("[data-l]").forEach(function(b){ b.onclick=function(){ self.select(b.getAttribute("data-l")); }; });
};
JointLab.prototype.dispose = function(){ this.disposed=true; if(this.resizeObs) this.resizeObs.disconnect(); if(this.renderer){ this.renderer.dispose(); this.pickTarget.dispose(); } this.clear(); this.host.innerHTML=""; this.host.classList.remove("a3d"); this.host.classList.remove("a3d-joint"); };

window.Atlas3D = { create:function(host, opts){ return new Viewer(host, opts); }, createJoint:function(host, opts){ return new JointLab(host, opts); }, JOINTS:JOINTS, SYS:SYS, SYS_ORDER:SYS_ORDER, preload:loadData, parts:function(ds){ return (ds==="cell"?window.AP3D_CELL_MAN:window.AP3D_MAN).parts; } };
})();
