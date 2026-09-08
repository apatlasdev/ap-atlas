// ================= storage =================
var LS_KEY="ap-atlas-v1";
var DEFMETA={newPerDay:15, perDay:{}, streak:0, lastStudy:null, rot:{1:1,2:1,3:1,4:1,5:1,6:1,7:1,8:1}, done:{}, cur:{lesson:"1-1",step:0}, unlockAll:0, checks:{}};
var store={byId:{}, userCards:[], meta:JSON.parse(JSON.stringify(DEFMETA)), updatedAt:0};
var CARD_LESSON={};
function indexLessons(){ Object.keys(LESSONS).forEach(function(m){ LESSONS[m].forEach(function(L){ L.cards.forEach(function(c){ CARD_LESSON[c]=L.id; }); }); }); }
function lessonDone(id){ return !!(store.meta.done&&store.meta.done[id]); }
function unlockedCard(cid){ if(store.meta.unlockAll) return true; var L=CARD_LESSON[cid]; return !L || lessonDone(L); }
function inRot(m){ return !store.meta.rot || store.meta.rot[m]!==0; }
function toggleRot(m){ if(!store.meta.rot) store.meta.rot={}; store.meta.rot[m]= inRot(m)?0:1; persist(); }
var dbDoc=null, saveTimer=null;

function dkey(d){ d=d||new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function loadLocal(){ try{ var r=localStorage.getItem(LS_KEY); if(r){ var p=JSON.parse(r); if(p&&p.byId){ store.byId=p.byId||{}; store.userCards=p.userCards||[]; store.meta=Object.assign(JSON.parse(JSON.stringify(DEFMETA)),p.meta||{}); store.updatedAt=p.updatedAt||0; } } }catch(e){} }
function saveLocal(){ try{ localStorage.setItem(LS_KEY, JSON.stringify(store)); }catch(e){} }
function persist(){ store.updatedAt=Date.now(); saveLocal();
  if(dbDoc){ clearTimeout(saveTimer); saveTimer=setTimeout(function(){ try{ dbDoc.set(JSON.parse(JSON.stringify(store))).catch(function(){}); }catch(e){} },700); } }
function initDb(){
  if(!(window.claude&&window.claude.use)) return;
  window.claude.use("db").then(function(db){
    if(!db) return;
    dbDoc=db.doc("study/main");
    return dbDoc.get().then(function(snap){
      if(snap&&snap.exists){
        var r=snap.data()||{};
        if((r.updatedAt||0)>(store.updatedAt||0)){
          store.byId=r.byId||{}; store.userCards=r.userCards||[];
          store.meta=Object.assign(JSON.parse(JSON.stringify(DEFMETA)),r.meta||{});
          store.updatedAt=r.updatedAt||0; saveLocal();
        } else if((store.updatedAt||0)>(r.updatedAt||0)){ dbDoc.set(JSON.parse(JSON.stringify(store))).catch(function(){}); }
      } else if(store.updatedAt){ dbDoc.set(JSON.parse(JSON.stringify(store))).catch(function(){}); }
      var el=document.getElementById("syncState"); el.textContent="synced to your account"; el.classList.add("on");
      rerender();
    });
  }).catch(function(){});
}

// ================= scheduler =================
function fresh(){ return {ease:2.5,interval:0,due:0,reps:0,lapses:0,updatedAt:0}; }
function schedule(st,rating,now){
  st=st?Object.assign({},st):fresh();
  var e=st.ease,iv=st.interval,reps=st.reps,lap=st.lapses;
  if(rating==="again"){ e=Math.max(MIN_EASE,e-0.2); if(iv>=1)lap++; return {ease:e,interval:0,due:now+600000,reps:0,lapses:lap,updatedAt:now}; }
  if(iv<1){ if(rating==="easy"){ iv=3; e=Math.min(3.0,e+0.15);} else { iv=1; } }
  else{
    if(rating==="hard"){ iv=Math.max(1,iv*1.2); e=Math.max(MIN_EASE,e-0.15); }
    else if(rating==="good"){ iv=iv*e; }
    else { iv=iv*e*1.3; e=Math.min(3.0,e+0.15); }
  }
  iv=Math.min(iv,365);
  return {ease:e,interval:iv,due:now+Math.round(iv*DAY),reps:reps+1,lapses:lap,updatedAt:now};
}
function fmtIv(st,rating,now){
  if(rating==="again") return "10m";
  var d=schedule(st,rating,now).interval;
  if(d<1) return "1d";
  if(d<30) return Math.round(d)+"d";
  if(d<365) return (Math.round(d/30))+"mo";
  return (Math.round(d/365*10)/10)+"y";
}

// ================= helpers =================
function esc(s){ return String(s).replace(/[&<>"]/g,function(m){return({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[m];}); }
function mod(id){ for(var i=0;i<MODULES.length;i++) if(MODULES[i].id===id) return MODULES[i]; return MODULES[0]; }
function hueAttr(m){ var o=mod(m); return 'class="hued" style="--mh-l:'+o.hl+';--mh-d:'+o.hd+'"'; }
function allCards(){ return CARDS.concat(store.userCards); }
function stOf(id){ return store.byId[id]; }
function cardsOf(m){ return allCards().filter(function(c){ return c.m===m; }); }
function shuffle(a){ a=a.slice(); for(var i=a.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; } return a; }
function todayRec(){ var k=dkey(); if(!store.meta.perDay[k]) store.meta.perDay[k]={reviews:0,newIntro:0}; return store.meta.perDay[k]; }
function reviewsToday(){ var k=dkey(); return (store.meta.perDay[k]&&store.meta.perDay[k].reviews)||0; }
function newToday(){ var k=dkey(); return (store.meta.perDay[k]&&store.meta.perDay[k].newIntro)||0; }
function newLeft(){ return Math.max(0, store.meta.newPerDay-newToday()); }

function queue(mFilter){
  var now=Date.now(), due=[],learn=[],neu=[];
  allCards().forEach(function(c){
    if(mFilter&&c.m!==mFilter) return;
    var st=stOf(c.id);
    if(!st) neu.push(c);
    else if(st.due<=now){ (st.interval<1?learn:due).push(c); }
  });
  due.sort(function(a,b){return stOf(a.id).due-stOf(b.id).due;});
  learn.sort(function(a,b){return stOf(a.id).due-stOf(b.id).due;});
  // new cards are introduced in module order, and only from modules left in rotation
  neu.sort(function(a,b){ return a.m-b.m || (a.id<b.id?-1:1); });
  var avail;
  if(mFilter){ avail=neu; }
  else { avail=neu.filter(function(c){ return inRot(c.m) && unlockedCard(c.id); }).slice(0,newLeft()); }
  return {due:due, learn:learn, news:avail, all:neu, total:due.length+learn.length+avail.length};
}

