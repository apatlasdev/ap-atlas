// ================= course model =================
var LESSON_ORDER=[]; Object.keys(LESSONS).map(Number).sort(function(a,b){return a-b;}).forEach(function(m){ LESSONS[m].forEach(function(L){ LESSON_ORDER.push(L.id); }); });
function lessonById(id){ for(var m in LESSONS){ for(var i=0;i<LESSONS[m].length;i++) if(LESSONS[m][i].id===id) return LESSONS[m][i]; } return null; }
function lessonModule(id){ return parseInt(id.split("-")[0],10); }
function lessonIndex(id){ return LESSON_ORDER.indexOf(id); }
function nextLessonId(id){ var i=lessonIndex(id); return i>=0&&i<LESSON_ORDER.length-1 ? LESSON_ORDER[i+1] : null; }
function isUnlocked(id){ if(store.meta.unlockAll) return true; var i=lessonIndex(id); if(i<=0) return true; return lessonDone(LESSON_ORDER[i-1]); }
function firstOpenLesson(){ for(var i=0;i<LESSON_ORDER.length;i++){ if(!lessonDone(LESSON_ORDER[i])) return LESSON_ORDER[i]; } return LESSON_ORDER[LESSON_ORDER.length-1]; }
function curLessonId(){ var c=store.meta.cur&&store.meta.cur.lesson; if(c&&lessonById(c)&&!lessonDone(c)&&isUnlocked(c)) return c; return firstOpenLesson(); }
function cardObj(id){ for(var i=0;i<CARDS.length;i++) if(CARDS[i].id===id) return CARDS[i]; return null; }
function lessonCards(L){ return L.cards.map(cardObj).filter(Boolean); }
function drillCards(L){ return lessonCards(L).filter(function(c){ return c.dia; }); }
function textCards(L){ return lessonCards(L).filter(function(c){ return !c.dia; }); }
function stepsFor(L){ var s=["read"]; if(L.dia&&FIGS[L.dia]) s.push("see"); if(has3d(L)) s.push("explore"); s.push("check"); if(drillCards(L).length) s.push("drill"); s.push("done"); return s; }
function curStep(L){ var c=store.meta.cur||{}; return c.lesson===L.id ? Math.min(c.step||0, stepsFor(L).length-1) : 0; }
function setCur(id,step){ store.meta.cur={lesson:id,step:step}; persist(); }
function markDone(id){ if(!store.meta.done) store.meta.done={}; store.meta.done[id]=Date.now(); persist(); }
function moduleProgress(m){ var Ls=LESSONS[m]||[], d=Ls.filter(function(L){return lessonDone(L.id);}).length; return {done:d,total:Ls.length,pct:Ls.length?Math.round(d/Ls.length*100):0}; }
function courseProgress(){ var d=LESSON_ORDER.filter(lessonDone).length; return {done:d,total:LESSON_ORDER.length,pct:Math.round(d/LESSON_ORDER.length*100)}; }
var STEP_LABEL={read:"Read",see:"See the plate",explore:"Explore in 3D",check:"Check yourself",drill:"Drill labels",done:"Complete"};

// ================= routing =================
var route={view:"home",lesson:null,ref:null};
var views={};
function go(view,arg){
  if(view!=="review" && view!=="lesson") session=null;
  if(view==="lesson"){ route.lesson=arg||curLessonId(); }
  if(view==="reference"){ route.ref=arg||"plates"; }
  if(view==="atlas"||view==="joints"){ route.ref=arg||null; }
  route.view=view;
  document.getElementById("side").classList.remove("open"); document.getElementById("scrim").classList.remove("on");
  rerender(); window.scrollTo(0,0);
}
function rerender(){
  kill3d(); renderBadge(); renderOutline();
  Array.prototype.forEach.call(document.querySelectorAll(".navbtn"),function(b){ b.setAttribute("aria-current", b.getAttribute("data-view")===route.view || (route.view==="lesson"&&b.getAttribute("data-view")==="course") ? "true":"false"); });
  var main=document.getElementById("main"); main.innerHTML="";
  var v=document.createElement("div"); v.className="view"; main.appendChild(v);
  ({home:renderHome,course:renderCourse,lesson:renderLesson,review:renderReview,progress:renderProgress,reference:renderReference,atlas:renderAtlas,joints:renderJoints})[route.view](v);
}
function crumb(html){ document.getElementById("crumb").innerHTML=html; }
function renderBadge(){ var t=queue(null).total; var b=document.getElementById("dueBadge"); b.textContent=t; b.style.display=t?"":"none"; }
function renderToday(){ if(session&&session.inLesson){ renderLesson(document.querySelector("#main .view")); } else { rerender(); } }
function hueStyle(m){ var o=mod(m); return 'style="--mh-l:'+o.hl+';--mh-d:'+o.hd+'"'; }

// ================= sidebar outline =================
var openMod=null;
function renderOutline(){
  var host=document.getElementById("outline"); var cur=curLessonId(); var curM=lessonModule(route.lesson||cur);
  if(openMod===null) openMod=curM;
  var h='<div class="eyebrow">Course outline</div>';
  MODULES.forEach(function(m){
    var pr=moduleProgress(m.id);
    h+='<div class="omod hued '+(openMod===m.id?"open":"")+'" '+hueStyle(m.id)+'><button data-om="'+m.id+'"><span class="dot"></span><span>'+esc(m.name)+'</span><span class="pct">'+pr.done+'/'+pr.total+'</span><svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 6l6 6-6 6"/></svg></button><div class="olist">';
    (LESSONS[m.id]||[]).forEach(function(L){
      var done=lessonDone(L.id), unl=isUnlocked(L.id), isCur=(route.view==="lesson"&&route.lesson===L.id);
      h+='<button class="oles '+(done?"done":"")+' '+(L.id===cur&&!done?"cur":"")+' '+(!unl&&!done?"locked":"")+'" data-ol="'+L.id+'" '+(isCur?'aria-current="true"':'')+' '+(!unl&&!done?'disabled':'')+'><span class="st"></span><span>'+esc(L.title.split(" — ")[0])+'</span></button>';
    });
    h+='</div></div>';
  });
  host.innerHTML=h;
  Array.prototype.forEach.call(host.querySelectorAll("[data-om]"),function(b){ b.onclick=function(){ var m=parseInt(b.getAttribute("data-om"),10); openMod = openMod===m ? -1 : m; renderOutline(); }; });
  Array.prototype.forEach.call(host.querySelectorAll("[data-ol]"),function(b){ if(!b.disabled) b.onclick=function(){ go("lesson", b.getAttribute("data-ol")); }; });
}

// ================= HOME =================
function renderHome(v){
  crumb('<b>Home</b>');
  var id=curLessonId(), L=lessonById(id), m=mod(lessonModule(id)), q=queue(null), cp=courseProgress();
  var steps=stepsFor(L), st=curStep(L), started=(store.meta.cur&&store.meta.cur.lesson===id&&st>0);
  var h='<div class="hero hued" '+hueStyle(m.id)+'><span class="ghost">'+String(m.id).padStart(2,"0")+'</span>'+
    '<div class="eyebrow" style="color:var(--mh)">'+(started?"Continue where you left off":(cp.done===0?"Start the course":"Next lesson"))+' · '+esc(m.name)+'</div>'+
    '<h1>'+esc(L.title)+'</h1>'+
    '<p>'+(started?'You are on <b>'+STEP_LABEL[steps[st]]+'</b>. Pick up right there.':'About '+L.mins+' minutes: read the lesson, study the real plate, check yourself, then drill the labels. Its cards enter your daily reviews when you finish.')+'</p>'+
    '<div class="row"><button class="btn primary big" id="hGo">'+(started?"Continue lesson":"Start lesson")+' →</button><button class="btn" id="hCourse">See the whole course</button></div>'+
    '<div class="stepmini">'+steps.map(function(s,i){ return '<i class="'+(i<st?"on":(i===st&&started?"on":""))+'"></i>'; }).join("")+'<span style="margin-left:6px">'+(st+ (started?1:0))+' / '+steps.length+' steps</span></div></div>';
  h+='<div class="grid2">';
  h+='<div class="card"><h3>Today\'s review</h3><p>'+(q.total? '<b>'+q.total+'</b> card'+(q.total===1?"":"s")+' ready — '+q.due.length+' due, '+q.learn.length+' learning, '+q.news.length+' new from lessons you\'ve finished.' : 'Nothing due right now. Finishing a lesson unlocks its cards into this queue.')+'</p><button class="btn '+(q.total?"primary":"")+'" id="hReview" '+(q.total?'':'disabled')+'>Review now</button></div>';
  h+='<div class="card"><h3>Progress</h3><div class="kpi"><div><span class="k">Streak</span><span class="v">'+store.meta.streak+' <small>day'+(store.meta.streak===1?"":"s")+'</small></span></div><div><span class="k">Lessons</span><span class="v">'+cp.done+' <small>/ '+cp.total+'</small></span></div><div><span class="k">Reviews today</span><span class="v">'+reviewsToday()+'</span></div></div><div class="bar" style="margin-top:14px"><i style="width:'+cp.pct+'%"></i></div></div>';
  h+='</div>';
  v.innerHTML=h;
  document.getElementById("hGo").onclick=function(){ go("lesson",id); };
  document.getElementById("hCourse").onclick=function(){ go("course"); };
  var hr=document.getElementById("hReview"); if(!hr.disabled) hr.onclick=function(){ startSRS(null); };
}

// ================= COURSE PATH =================
function renderCourse(v){
  crumb('<b>Course</b> · 8 modules · '+LESSON_ORDER.length+' lessons');
  var cur=curLessonId(), cp=courseProgress();
  var h='<div style="margin-bottom:20px"><div class="eyebrow">The path</div><h1 style="font-size:1.7rem;margin-top:4px">Anatomy &amp; Physiology, in order</h1><p style="color:var(--muted);max-width:66ch;margin:8px 0 0">Lessons unlock one after another, and each one feeds its cards into your daily reviews when you complete it. That is the whole structure: learn it, prove it, then let the schedule keep it alive. '+cp.done+' of '+cp.total+' done.</p></div>';
  MODULES.forEach(function(m){
    var pr=moduleProgress(m.id);
    h+='<div class="pathmod hued" '+hueStyle(m.id)+'><div class="mhead"><span class="num">MODULE '+String(m.id).padStart(2,"0")+'</span><h2>'+esc(m.name)+'</h2><span class="num" style="color:var(--faint)">'+esc(m.ch)+'</span>'+
       (pr.done>0?'<div class="acts"><button class="btn" data-cram="'+m.id+'">Cram module</button><button class="btn" data-quiz="'+m.id+'">Quiz</button></div>':'')+'</div>';
    (LESSONS[m.id]||[]).forEach(function(L,i){
      var done=lessonDone(L.id), unl=isUnlocked(L.id), isCur=(L.id===cur&&!done);
      h+='<div class="lesrow '+(done?"done":"")+' '+(isCur?"cur":"")+' '+(!unl&&!done?"locked":"")+'" data-les="'+L.id+'"><span class="st">'+(done?"✓":(i+1))+'</span><div class="t"><b>'+esc(L.title)+'</b><span>'+L.mins+' min · '+L.cards.length+' cards'+(L.dia?' · plate: '+esc(DIAGRAMS[L.dia].title):'')+'</span></div><span class="go">'+(done?"Review":(isCur?"Continue →":(unl?"Start →":"Locked")))+'</span></div>';
    });
    h+='</div>';
  });
  v.innerHTML=h;
  Array.prototype.forEach.call(v.querySelectorAll(".lesrow:not(.locked)"),function(r){ r.onclick=function(){ go("lesson", r.getAttribute("data-les")); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-cram]"),function(b){ b.onclick=function(e){ e.stopPropagation(); startCram(parseInt(b.getAttribute("data-cram"),10)); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-quiz]"),function(b){ b.onclick=function(e){ e.stopPropagation(); startQuizIn(parseInt(b.getAttribute("data-quiz"),10)); }; });
}

// ================= LESSON PLAYER =================
var check=null;
function renderLesson(v){
  kill3d(); v = v || document.querySelector("#main .view");
  var id=route.lesson||curLessonId(), L=lessonById(id); if(!L){ go("course"); return; }
  if(!isUnlocked(id)&&!lessonDone(id)){ go("course"); return; }
  var m=mod(lessonModule(id)), steps=stepsFor(L), st=curStep(L), step=steps[st], done=lessonDone(id);
  crumb('<b>'+esc(m.name)+'</b> · Lesson '+id+' · '+STEP_LABEL[step]);
  var h='<div class="hued" '+hueStyle(m.id)+'>';
  h+='<div class="stepper">'+steps.map(function(s,i){ return '<div class="step '+(i<st?"done":(i===st?"cur":""))+'"><i></i><span>'+STEP_LABEL[s]+'</span></div>'; }).join("")+'</div>';
  h+='<div class="lhead"><div class="eyebrow" style="color:var(--mh)">Module '+String(m.id).padStart(2,"0")+' · '+esc(m.name)+'</div><h1>'+esc(L.title)+'</h1><div class="meta"><span>'+L.mins+' min read</span><span>'+L.cards.length+' cards</span>'+(done?'<span style="color:var(--good)">completed</span>':'')+'</div></div>';
  var body='';
  if(step==="read"){
    body+='<div class="prose">';
    L.sections.forEach(function(s){ body+='<h2>'+esc(s.h)+'</h2><p>'+s.p+'</p>'; });
    body+='</div><div class="eyebrow" style="margin-top:28px">Key terms</div><div class="terms">'+L.terms.map(function(t){ return '<div class="term"><b>'+esc(t[0])+'</b><span>'+esc(t[1])+'</span></div>'; }).join("")+'</div>';
    body+='<div class="clinical"><div class="eyebrow">Why this matters at the bedside</div><p>'+L.clinical+'</p></div>';
    body+='<div class="lnav"><button class="btn ghost" id="lBack">← Course</button><button class="btn primary big" id="lNext">'+(steps[st+1]==="see"?"See the plate":(steps[st+1]==="explore"?"Explore in 3D":"Check yourself"))+' →</button></div>';
  }
  else if(step==="see"){
    var d=DIAGRAMS[L.dia], f=FIGS[L.dia];
    body+='<p style="color:var(--muted);max-width:66ch;margin:0 0 14px">Study the real plate. Read each label and find it on the figure — say what it does out loud. The drill at the end of this lesson will blank these labels and ask you for them.</p>';
    body+='<div class="see-figwrap"><img src="'+f.src+'" alt="'+esc(f.title)+'"></div><div class="figcap"><b>'+esc(f.title)+'</b><span>OpenStax A&amp;P 2e · '+esc(f.fig)+' · CC BY 4.0</span></div>';
    if(L.dia==="heart" && FIGS.heart_chordae) body+='<div class="see-figwrap" style="margin-top:14px"><img src="'+FIGS.heart_chordae.src+'" alt=""></div><div class="figcap"><b>'+esc(FIGS.heart_chordae.title)+'</b><span>OpenStax A&amp;P 2e · '+esc(FIGS.heart_chordae.fig)+'</span></div>';
    body+='<div class="eyebrow" style="margin-top:18px">Structures you will be asked to name</div><div class="partlist">'+d.parts.map(function(p){ return '<div class="partitem"><b>'+esc(p.label)+'</b><span>'+esc(p.desc)+'</span></div>'; }).join("")+'</div>';
    body+='<button class="schemtoggle" id="schemBtn">Show simplified schematic</button><div class="schem" id="schemBox" hidden>'+diaSVG(L.dia,null,true)+'</div>';
    body+='<div class="lnav"><button class="btn ghost" id="lPrev">← Back to reading</button><button class="btn primary big" id="lNext">'+(steps[st+1]==="explore"?"Explore in 3D":"Check yourself")+' →</button></div>';
  }
  else if(step==="explore"){ body+=render3dStep(L); }
  else if(step==="check"){
    if(!check||check.lesson!==id) check=buildCheck(L);
    body+=renderCheck(L);
  }
  else if(step==="drill"){
    if(!session||session.inLesson!==id){
      var dc=shuffle(drillCards(L));
      session={mode:"cram",cards:dc,idx:0,flipped:false,done:0,got:0,total:dc.length,mFilter:null,label:DIAGRAMS[L.dia]?DIAGRAMS[L.dia].title:"Labels",lastRecall:"",inLesson:id};
    }
    if(session.idx>=session.cards.length){
      body+='<div class="donebox"><div class="big">Labels drilled</div><p>'+session.got+' of '+session.done+' felt solid. Those you missed will come back on schedule once this lesson\'s cards enter your reviews.</p><div class="row"><button class="btn" id="lRedo">Drill again</button><button class="btn primary big" id="lNext">Finish lesson →</button></div></div>';
    } else {
      body+='<p style="color:var(--muted);max-width:66ch;margin:0 0 12px">Practical-exam mode: the plate with every label blanked. Name the highlighted one from memory, then reveal.</p><div id="drillHost"></div>';
    }
  }
  else if(step==="done"){
    if(!done){ markDone(id); }
    var nx=nextLessonId(id), q=queue(null);
    body+='<div class="donebox"><div class="eyebrow" style="color:var(--mh)">Lesson complete</div><div class="big">'+esc(L.title.split(" — ")[0])+'</div><p>'+L.cards.length+' cards from this lesson are now in your daily review rotation. The scheduler will bring each one back right before you would forget it — that is where the real memorization happens.</p>'+
      '<div class="unlock">✓ '+L.cards.length+' cards unlocked · '+q.total+' ready to review now</div>'+
      '<div class="row">'+(q.total?'<button class="btn" id="lReview">Review now</button>':'')+(nx?'<button class="btn primary big" id="lNextLesson">Next: '+esc(lessonById(nx).title.split(" — ")[0])+' →</button>':'<button class="btn primary big" id="lCourseEnd">Back to course</button>')+'</div></div>';
  }
  h+=body+'</div>';
  v.innerHTML=h;
  // bindings
  var b;
  if((b=document.getElementById("lBack"))) b.onclick=function(){ go("course"); };
  if((b=document.getElementById("lPrev"))) b.onclick=function(){ setCur(id,Math.max(0,st-1)); renderLesson(); window.scrollTo(0,0); };
  if((b=document.getElementById("lNext"))) b.onclick=function(){ setCur(id,st+1); check=null; if(steps[st+1]!=="drill") session=null; renderLesson(); window.scrollTo(0,0); };
  if((b=document.getElementById("schemBtn"))) b.onclick=function(){ var el=document.getElementById("schemBox"); el.hidden=!el.hidden; b.textContent=el.hidden?"Show simplified schematic":"Hide schematic"; };
  if((b=document.getElementById("lRedo"))) b.onclick=function(){ session=null; renderLesson(); };
  if((b=document.getElementById("lReview"))) b.onclick=function(){ startSRS(null); };
  if((b=document.getElementById("lNextLesson"))) b.onclick=function(){ setCur(nx,0); check=null; session=null; go("lesson",nx); };
  if((b=document.getElementById("lCourseEnd"))) b.onclick=function(){ go("course"); };
  if(step==="check") bindCheck(L);
  if(step==="explore") after3dRender(L);
  if(step==="drill" && session && session.idx<session.cards.length) renderSessionCard(document.getElementById("drillHost"));
  renderOutline();
}

// ---- check (mini quiz) ----
function buildCheck(L){
  var pool=textCards(L);
  if(pool.length<4){ var extra=cardsOf(lessonModule(L.id)).filter(function(c){ return !c.dia && pool.indexOf(c)<0; }); pool=pool.concat(shuffle(extra).slice(0,4-pool.length)); }
  var picks=shuffle(pool).slice(0,Math.min(5,pool.length));
  var modPool=cardsOf(lessonModule(L.id)).filter(function(c){return !c.dia;});
  var qs=picks.map(function(c){
    var ds=shuffle(modPool.filter(function(x){return x.id!==c.id;})).slice(0,3).map(function(x){return x.a;});
    var opts=shuffle([c.a].concat(ds));
    return {card:c,opts:opts,ans:opts.indexOf(c.a),picked:null};
  });
  return {lesson:L.id,qs:qs,idx:0,score:0,need:Math.ceil(qs.length*0.7)};
}
function renderCheck(L){
  var c=check;
  if(c.idx>=c.qs.length){
    var pass=c.score>=c.need;
    if(pass){ if(!store.meta.checks) store.meta.checks={}; store.meta.checks[L.id]=Math.max(store.meta.checks[L.id]||0,c.score); persist(); }
    return '<div class="donebox"><div class="eyebrow" style="color:'+(pass?"var(--good)":"var(--again)")+'">'+(pass?"Passed":"Not yet")+'</div><div class="big">'+c.score+' of '+c.qs.length+'</div><p>'+(pass?'Good — you\'ve got the core of this lesson. Now drill the labels so the anatomy sticks too.':'You need '+c.need+' to move on. Go back and re-read the parts you missed, then try a fresh set.')+'</p>'+
      '<div class="row">'+(pass?'<button class="btn primary big" id="lNext">'+(stepsFor(L)[curStep(L)+1]==="drill"?"Drill the labels":"Finish lesson")+' →</button>':'<button class="btn" id="ckBack">Re-read lesson</button><button class="btn primary" id="ckRetry">Try again</button>')+'</div></div>';
  }
  var q=c.qs[c.idx];
  var h='<div class="queuebar"><span class="qtag"><b>Question '+(c.idx+1)+'</b> of '+c.qs.length+'</span><span class="sessprog"><span class="mono" style="font-size:.72rem">'+c.score+' correct · need '+c.need+'</span><span class="track"><i style="width:'+(c.idx/c.qs.length*100)+'%"></i></span></span></div>';
  h+='<div class="scard hued"><div class="ctop"><span class="modtag">Check yourself</span><span class="kind">no scheduling — just a check</span></div><div class="body"><div class="qtext">'+esc(q.card.q)+'</div><div class="qopts">';
  q.opts.forEach(function(o,i){ var cls="qopt",dis=""; if(q.picked!==null){ dis=" disabled"; if(i===q.ans) cls+=" correct"; else if(i===q.picked) cls+=" wrong"; } h+='<button class="'+cls+'" data-o="'+i+'"'+dis+'><span class="ltr">'+String.fromCharCode(65+i)+'</span><span>'+esc(o)+'</span></button>'; });
  h+='</div></div><div class="actions">'+(q.picked!==null?'<button class="btn primary" id="ckNext" style="width:100%">'+(c.idx===c.qs.length-1?"See result":"Next")+'</button>':'')+'</div></div>';
  return h;
}
function bindCheck(L){
  var c=check, b;
  Array.prototype.forEach.call(document.querySelectorAll(".qopt"),function(o){ if(o.disabled) return; o.onclick=function(){ var i=parseInt(o.getAttribute("data-o"),10); var q=c.qs[c.idx]; q.picked=i; if(i===q.ans) c.score++; renderLesson(); }; });
  if((b=document.getElementById("ckNext"))) b.onclick=function(){ c.idx++; renderLesson(); window.scrollTo(0,0); };
  if((b=document.getElementById("ckRetry"))) b.onclick=function(){ check=buildCheck(L); renderLesson(); window.scrollTo(0,0); };
  if((b=document.getElementById("ckBack"))) b.onclick=function(){ check=null; setCur(L.id,0); renderLesson(); window.scrollTo(0,0); };
}

// ================= shared study card =================
function rb(r,lab,iv,k){ return '<button class="ratebtn '+r+'" data-r="'+r+'"><span class="lab">'+lab+'</span>'+(iv?'<span class="iv">'+iv+'</span>':'')+'<span class="key">'+k+'</span></button>'; }
function renderSessionCard(host){
  var c=cur(), st=stOf(c.id), m=mod(c.m), stage=c.dia&&hasStage(c.dia,c.part);
  var kind = session.mode==="cram" ? "drill" : (!st?"new":(st.interval<1?"learning":"review"));
  var h='<div class="scard hued" '+hueStyle(m.id)+'><div class="ctop"><span class="modtag">'+esc(m.name)+'</span><span class="kind">'+(c.dia?"label · ":"")+kind+'</span></div><div class="body">';
  if(stage){ var sp=FIGMAP[c.dia].spots[c.part]; h+='<div class="qtext sm">'+(sp.src==="label"?"What belongs on the blank label?":"Identify the highlighted structure.")+'</div>'+figStage(c.dia,c.part,!session.flipped); if(!session.flipped) h+='<div class="stagehint">real textbook plate · every label blanked · leader lines intact</div>'; }
  else if(c.dia){ h+='<div class="qtext sm">'+esc(c.q)+'</div>'+diaSVG(c.dia,c.part,session.flipped,"diacard"); }
  else { h+='<div class="qtext">'+esc(c.q)+'</div>'; }
  if(!session.flipped){ h+='<div class="recall"><label>Answer from memory first</label><textarea id="recallBox" placeholder="Say it out loud or type it — then reveal."></textarea></div>'; }
  else { h+='<div class="divider"></div><div class="atext"><span class="lead">Answer</span>'+esc(c.a)+'</div>'; if((session.lastRecall||"").trim()) h+='<div class="yours"><b>What you wrote</b>'+esc(session.lastRecall.trim())+'</div>'; if(c.dia&&FIGS[c.dia]&&!stage) h+='<div class="figcard">'+figHTML(c.dia)+'</div>'; }
  h+='</div><div class="actions">';
  if(!session.flipped) h+='<button class="showbtn" id="showBtn">Show answer <span class="mono" style="opacity:.65;font-size:.78rem">space</span></button>';
  else if(session.mode==="cram") h+='<div class="rate" style="grid-template-columns:1fr 1fr">'+rb("again","Missed it","","1")+rb("good","Got it","","3")+'</div>';
  else { var now=Date.now(); h+='<div class="rate">'+rb("again","Again",fmtIv(st,"again",now),"1")+rb("hard","Hard",fmtIv(st,"hard",now),"2")+rb("good","Good",fmtIv(st,"good",now),"3")+rb("easy","Easy",fmtIv(st,"easy",now),"4")+'</div>'; }
  h+='</div></div>';
  host.innerHTML=h;
  if(!session.flipped){ document.getElementById("showBtn").onclick=flip; var r=document.getElementById("recallBox"); if(r) r.focus(); }
  else Array.prototype.forEach.call(host.querySelectorAll(".ratebtn"),function(b){ b.onclick=function(){ grade(b.getAttribute("data-r")); }; });
}

// ================= REVIEW (daily SRS) =================
function renderReview(v){
  crumb('<b>Review</b>');
  var q=queue(null);
  var h='';
  if(session && !session.inLesson){
    var pct=Math.round(session.done/Math.max(1,session.total)*100);
    h+='<div class="queuebar"><span class="qtag"><b>'+(session.mode==="cram"?"Cram":"Review")+'</b>'+(session.label?' · '+esc(session.label):(session.mFilter?' · '+esc(mod(session.mFilter).name):''))+'</span><span class="sessprog"><span class="mono" style="font-size:.72rem">'+session.done+' / '+session.total+'</span><span class="track"><i style="width:'+Math.min(100,pct)+'%"></i></span></span></div>';
    if(session.idx>=session.cards.length){
      var d=session.done, wasCram=session.mode==="cram", got=session.got; var again=queue(null).total; session=null;
      h+='<div class="empty"><div class="big">'+(wasCram?"Cram complete":"Session complete")+'</div><p>'+(wasCram?'You drilled <b>'+d+'</b> — <b>'+got+'</b> felt solid. Cram never touches your schedule.':'You reviewed <b>'+d+'</b> card'+(d===1?"":"s")+'. The scheduler takes it from here.')+'</p><div class="row">'+(again?'<button class="btn primary" id="rvMore">Keep going ('+again+')</button>':'')+'<button class="btn" id="rvHome">Home</button></div></div>';
      v.innerHTML=h; var b; if((b=document.getElementById("rvMore"))) b.onclick=function(){ startSRS(null); }; document.getElementById("rvHome").onclick=function(){ go("home"); }; return;
    }
    h+='<div id="cardHost"></div><p class="hint">Retrieve <em>before</em> you flip. "Again" isn\'t failure — it\'s the system finding the gap.</p>';
    v.innerHTML=h; renderSessionCard(document.getElementById("cardHost")); return;
  }
  h+='<div class="queuebar"><span class="qtag due"><span class="d"></span>Due <b>'+q.due.length+'</b></span><span class="qtag learn"><span class="d"></span>Learning <b>'+q.learn.length+'</b></span><span class="qtag new"><span class="d"></span>New <b>'+q.news.length+'</b></span></div>';
  if(q.total){
    var srcM=[]; q.news.forEach(function(c){ if(srcM.indexOf(c.m)<0) srcM.push(c.m); });
    h+='<div class="empty"><div class="big">'+(q.due.length||q.learn.length?"Ready when you are":"First session")+'</div><p><b>'+q.due.length+'</b> coming back today, <b>'+q.learn.length+'</b> still learning, <b>'+q.news.length+'</b> new'+(srcM.length?' from '+esc(srcM.map(function(x){return mod(x).name;}).join(" · ")):'')+'. New cards come only from lessons you\'ve completed.</p><div class="row"><button class="btn primary big" id="rvStart">Start session</button><button class="btn" id="rvCram">Cram everything unlocked</button></div>'+miniStats()+'</div>';
  } else {
    var locked=allCards().filter(function(c){ return !stOf(c.id) && !unlockedCard(c.id); }).length;
    h+='<div class="empty"><div class="big">All caught up</div><p>Nothing is due. '+(locked?locked+' cards are still locked behind lessons you haven\'t finished — the course is how you unlock them.':'Come back tomorrow to keep the streak.')+'</p><p class="mono" style="font-size:.76rem;color:var(--faint)">'+nextDue()+'</p><div class="row"><button class="btn primary" id="rvLesson">Continue the course</button></div>'+miniStats()+'</div>';
  }
  v.innerHTML=h; var b;
  if((b=document.getElementById("rvStart"))) b.onclick=function(){ startSRS(null); };
  if((b=document.getElementById("rvCram"))) b.onclick=function(){ startCram(null, allCards().filter(function(c){return unlockedCard(c.id);}), "Everything unlocked"); };
  if((b=document.getElementById("rvLesson"))) b.onclick=function(){ go("lesson"); };
}
function miniStats(){ var all=allCards(),mast=0,started=0; all.forEach(function(c){ var s=stOf(c.id); if(s){started++; if(s.interval>=21) mast++;} }); return '<div class="mono" style="display:flex;gap:22px;justify-content:center;flex-wrap:wrap;margin-top:20px;padding-top:16px;border-top:1px solid var(--line-soft);font-size:.74rem;color:var(--faint)"><span><b style="color:var(--ink)">'+store.meta.streak+'</b> day streak</span><span><b style="color:var(--ink)">'+started+'</b> / '+all.length+' cards started</span><span><b style="color:var(--ink)">'+mast+'</b> mastered</span></div>'; }
function nextDue(){ var now=Date.now(),min=Infinity; allCards().forEach(function(c){ var s=stOf(c.id); if(s&&s.due>now&&s.due<min) min=s.due; }); if(min===Infinity) return "No cards scheduled yet."; var h=(min-now)/3600000; return h<24?"Next card due in about "+Math.max(1,Math.round(h))+" hour"+(Math.round(h)===1?"":"s")+".":"Next review in about "+Math.round(h/24)+" day"+(Math.round(h/24)===1?"":"s")+"."; }

// module quiz (from course page) — reuse check machinery in review view
var quiz=null;
function startQuizIn(m){
  var pool=cardsOf(m).filter(function(c){return unlockedCard(c.id)||stOf(c.id);}); if(pool.length<4) pool=cardsOf(m);
  var picks=shuffle(pool).slice(0,10);
  var qs=picks.map(function(c){ var dp=(c.dia?allCards().filter(function(x){return x.dia===c.dia&&x.id!==c.id;}):cardsOf(m).filter(function(x){return x.id!==c.id&&!x.dia;})); if(dp.length<3) dp=allCards().filter(function(x){return x.id!==c.id;}); var opts=shuffle([c.a].concat(shuffle(dp).slice(0,3).map(function(x){return x.a;}))); return {card:c,opts:opts,ans:opts.indexOf(c.a),picked:null}; });
  quiz={qs:qs,idx:0,score:0,m:m}; route.view="review"; session=null; renderQuizView();
}
function renderQuizView(){
  var main=document.getElementById("main"); main.innerHTML=""; var v=document.createElement("div"); v.className="view"; main.appendChild(v);
  crumb('<b>Quiz</b> · '+esc(mod(quiz.m).name));
  if(quiz.idx>=quiz.qs.length){
    var missed=quiz.qs.filter(function(q){return q.picked!==q.ans;}), pct=Math.round(quiz.score/quiz.qs.length*100);
    v.innerHTML='<div class="empty"><div class="big">'+quiz.score+' of '+quiz.qs.length+' · '+pct+'%</div><p>'+(pct>=80?"Solid.":"The misses below are exactly what to drill next.")+'</p>'+(missed.length?'<div class="browse" style="text-align:left;margin-top:18px">'+missed.map(function(q){return '<div class="brow"><div class="qq">'+esc(q.card.q)+'</div><div class="aa">'+esc(q.card.a)+'</div></div>';}).join("")+'</div>':'')+'<div class="row">'+(missed.length?'<button class="btn primary" id="qzSend">Send '+missed.length+' missed to review</button>':'')+'<button class="btn" id="qzDone">Back to course</button></div></div>';
    var b; if((b=document.getElementById("qzSend"))) b.onclick=function(){ var now=Date.now(); missed.forEach(function(q){ var s=stOf(q.card.id)||fresh(); store.byId[q.card.id]=Object.assign({},s,{interval:0,due:now,ease:Math.max(MIN_EASE,(s.ease||2.5)-0.15),updatedAt:now}); }); persist(); renderBadge(); b.textContent="Added ✓"; b.disabled=true; };
    document.getElementById("qzDone").onclick=function(){ quiz=null; go("course"); }; return;
  }
  var q=quiz.qs[quiz.idx], m=mod(q.card.m), stage=q.card.dia&&hasStage(q.card.dia,q.card.part);
  var h='<div class="queuebar"><span class="qtag"><b>Question '+(quiz.idx+1)+'</b> of '+quiz.qs.length+'</span><span class="sessprog"><span class="mono" style="font-size:.72rem">'+quiz.score+' correct</span><span class="track"><i style="width:'+(quiz.idx/quiz.qs.length*100)+'%"></i></span></span></div>';
  h+='<div class="scard hued" '+hueStyle(m.id)+'><div class="ctop"><span class="modtag">'+esc(m.name)+'</span><span class="kind">quiz</span></div><div class="body"><div class="qtext'+(q.card.dia?' sm':'')+'">'+(stage?(FIGMAP[q.card.dia].spots[q.card.part].src==="label"?"What belongs on the blank label?":"Identify the highlighted structure."):esc(q.card.q))+'</div>'+(q.card.dia?(stage?figStage(q.card.dia,q.card.part,q.picked===null):diaSVG(q.card.dia,q.card.part,q.picked!==null,"diacard")):'')+'<div class="qopts">';
  q.opts.forEach(function(o,i){ var cls="qopt",dis=""; if(q.picked!==null){ dis=" disabled"; if(i===q.ans) cls+=" correct"; else if(i===q.picked) cls+=" wrong"; } h+='<button class="'+cls+'" data-o="'+i+'"'+dis+'><span class="ltr">'+String.fromCharCode(65+i)+'</span><span>'+esc(o)+'</span></button>'; });
  h+='</div></div><div class="actions">'+(q.picked!==null?'<button class="btn primary" id="qzNext" style="width:100%">'+(quiz.idx===quiz.qs.length-1?"See results":"Next")+'</button>':'')+'</div></div>';
  v.innerHTML=h;
  Array.prototype.forEach.call(v.querySelectorAll(".qopt"),function(o){ if(o.disabled) return; o.onclick=function(){ var i=parseInt(o.getAttribute("data-o"),10); q.picked=i; if(i===q.ans) quiz.score++; renderQuizView(); }; });
  var nb=document.getElementById("qzNext"); if(nb) nb.onclick=function(){ quiz.idx++; renderQuizView(); window.scrollTo(0,0); };
}

// ================= PROGRESS =================
function renderProgress(v){
  crumb('<b>Progress</b>');
  var now=Date.now(), all=allCards(), total=all.length, mast=0, seen=0, neu=0; all.forEach(function(c){ var s=stOf(c.id); if(!s) neu++; else if(s.interval>=21) mast++; else seen++; });
  var cp=courseProgress();
  var h='<h1 style="font-size:1.6rem;margin-bottom:16px">Your progress</h1>';
  h+='<div class="statgrid">'+sbox("Day streak",store.meta.streak,store.meta.streak===1?"day":"days")+sbox("Lessons done",cp.done,'<small>/ '+cp.total+'</small>')+sbox("Cards started",total-neu,'<small>/ '+total+'</small>')+sbox("Mastered",mast,'<small>21d+</small>')+'</div>';
  // heat
  var days=84, end=new Date(); end.setHours(0,0,0,0); var start=new Date(end); start.setDate(start.getDate()-(days-1)); var hh=''; for(var p=0;p<start.getDay();p++) hh+='<i style="visibility:hidden"></i>';
  for(var i=0;i<days;i++){ var d=new Date(start); d.setDate(start.getDate()+i); var rec=store.meta.perDay[dkey(d)], n=rec?rec.reviews:0; var l=n===0?0:n<=5?1:n<=15?2:n<=30?3:4; hh+='<i data-l="'+l+'" title="'+dkey(d)+': '+n+' reviews"></i>'; }
  h+='<div class="panel"><h3>Activity</h3><p class="sub">Every day you studied, last 12 weeks.</p><div class="heat">'+hh+'</div></div>';
  // forecast
  var buckets=new Array(14).fill(0); all.forEach(function(c){ var s=stOf(c.id); if(!s) return; var diff=Math.floor((s.due-now)/DAY); if(s.due<=now) diff=0; if(diff>=0&&diff<14) buckets[diff]++; });
  var ft=buckets.reduce(function(a,b){return a+b;},0), fh='';
  if(ft===0) fh='<p style="color:var(--faint);font-size:.9rem;margin:auto;text-align:center">Nothing scheduled yet — finish a lesson and review its cards.</p>';
  else { var mx=Math.max.apply(null,buckets.concat([1])); buckets.forEach(function(n,i){ var d=new Date(); d.setDate(d.getDate()+i); var lbl=i===0?"today":(i===1?"tmrw":(d.getMonth()+1)+"/"+d.getDate()); fh+='<div class="fbar"><span class="ct">'+(n||"")+'</span><div class="col'+(i===0?" today":"")+'" style="height:'+(n/mx*66+2)+'px"></div><span class="lb">'+(i%2===0||i===1?lbl:"")+'</span></div>'; }); }
  h+='<div class="panel"><h3>Review forecast</h3><p class="sub">What the scheduler has lined up for the next two weeks.</p><div class="forecast">'+fh+'</div></div>';
  // mastery by module
  h+='<div class="panel"><h3>Mastery by module</h3><p class="sub">Solid = mastered (21-day interval+). Faded = seen, still maturing.</p>';
  MODULES.forEach(function(m){ var cs=cardsOf(m.id), t=cs.length||1, ma=0, se=0; cs.forEach(function(c){ var s=stOf(c.id); if(!s) return; if(s.interval>=21) ma++; else se++; }); h+='<div class="mm hued" '+hueStyle(m.id)+'><span class="nm">'+esc(m.name)+'</span><span class="bar"><i style="width:'+(ma/t*100)+'%"></i><i class="seen" style="width:'+(se/t*100)+'%"></i></span><span class="pc">'+Math.round(ma/t*100)+'%</span></div>'; });
  h+='</div>';
  h+='<div class="panel"><h3>Settings</h3><p class="sub">New cards per day, and whether the course gate stays on.</p><div class="segbtns" id="npd"></div><label class="toggle" style="margin-top:16px"><input type="checkbox" id="unlockAll" '+(store.meta.unlockAll?"checked":"")+'> Unlock all lessons and cards now (turns off the guided order)</label><div class="dangerlink" style="margin-top:16px"><button id="resetAll">Reset all progress</button></div></div>';
  v.innerHTML=h;
  var np=document.getElementById("npd"); [5,10,15,20,30].forEach(function(n){ var b=document.createElement("button"); b.className="seg"; b.textContent=n; b.setAttribute("aria-pressed",store.meta.newPerDay===n?"true":"false"); b.onclick=function(){ store.meta.newPerDay=n; persist(); renderProgress(v); renderBadge(); }; np.appendChild(b); });
  document.getElementById("unlockAll").onchange=function(e){ store.meta.unlockAll=e.target.checked?1:0; persist(); renderBadge(); renderOutline(); };
  document.getElementById("resetAll").onclick=function(){ if(!window.confirm("Reset all progress, lessons, streak, and added cards? This cannot be undone.")) return; store={byId:{},userCards:[],meta:JSON.parse(JSON.stringify(DEFMETA)),updatedAt:Date.now()}; persist(); openMod=null; go("home"); };
}
function sbox(k,v,sub){ return '<div class="stat"><div class="k">'+k+'</div><div class="v">'+v+' '+(sub||"")+'</div></div>'; }

// ================= REFERENCE =================
function renderReference(v){
  var r=route.ref||"plates";
  if(r!=="plates"&&r!=="cards"&&DIAGRAMS[r]){
    var d=DIAGRAMS[r], m=mod(d.m), cds=allCards().filter(function(c){return c.dia===r;});
    crumb('<b>Reference</b> · '+esc(d.title));
    v.innerHTML='<button class="backlink" id="rBack">← All plates</button><div class="hued" '+hueStyle(m.id)+'><div class="eyebrow" style="color:var(--mh)">'+esc(m.name)+'</div><h1 style="font-size:1.5rem;margin:4px 0 12px">'+esc(d.title)+'</h1>'+figHTML(r)+figExtras(r)+'<div class="partlist">'+d.parts.map(function(p){return '<div class="partitem"><b>'+esc(p.label)+'</b><span>'+esc(p.desc)+'</span></div>';}).join("")+'</div><div class="lnav"><span class="mono" style="font-size:.74rem;color:var(--faint)">'+cds.length+' label cards</span><button class="btn primary" id="rDrill">Drill this plate</button></div></div>';
    document.getElementById("rBack").onclick=function(){ go("reference","plates"); };
    document.getElementById("rDrill").onclick=function(){ startCram(null,cds,d.title); };
    return;
  }
  crumb('<b>Reference</b>');
  var h='<div style="display:flex;gap:8px;margin-bottom:18px"><button class="seg" aria-pressed="'+(r==="plates")+'" data-r="plates">Plates</button><button class="seg" aria-pressed="'+(r==="cards")+'" data-r="cards">All cards</button></div>';
  if(r==="plates"){
    h+='<p style="color:var(--muted);max-width:66ch;margin:0 0 16px">Every textbook plate in the course, for looking things up. Drilling from here is fine any time — but the lessons are where new cards come from.</p><div class="visgrid">';
    Object.keys(DIAGRAMS).forEach(function(k){ var d=DIAGRAMS[k], m=mod(d.m); h+='<button class="viscard hued" data-d="'+k+'" '+hueStyle(m.id)+'><h3>'+esc(d.title)+'</h3><div class="ch">'+esc(m.name)+' · '+d.parts.length+' labels</div><div class="thumb">'+(FIGS[k]?'<img src="'+FIGS[k].src+'" alt="">':diaSVG(k,null,false))+'</div></button>'; });
    h+='</div>';
  } else {
    var now=Date.now();
    MODULES.forEach(function(m){ var cs=cardsOf(m.id); h+='<div class="hued" '+hueStyle(m.id)+' style="margin-bottom:22px"><div class="eyebrow" style="color:var(--mh);margin-bottom:8px">'+esc(m.name)+' · '+cs.length+'</div><div class="browse">'; cs.forEach(function(c){ var s=stOf(c.id); var lbl=!s?(unlockedCard(c.id)?"new":"locked"):(s.interval>=21?"mastered":(s.due<=now?"due":Math.round(s.interval)+"d")); h+='<div class="brow"><div class="qq">'+(c.dia?"◈ ":"")+esc(c.q)+'</div><div class="aa">'+esc(c.a)+'</div><span class="st">'+lbl+'</span></div>'; }); h+='</div></div>'; });
  }
  v.innerHTML=h;
  Array.prototype.forEach.call(v.querySelectorAll("[data-r]"),function(b){ b.onclick=function(){ go("reference",b.getAttribute("data-r")); }; });
  Array.prototype.forEach.call(v.querySelectorAll("[data-d]"),function(b){ b.onclick=function(){ go("reference",b.getAttribute("data-d")); }; });
}

// ================= 3D ATLAS integration =================
var HEART_SET=["Heart (wall)","Right atrium","Left atrium","Ventricles (wall)","Tricuspid valve","Mitral valve","Pulmonary valve","Aortic valve","Papillary muscles","Right coronary artery","Left coronary artery (LAD + circumflex)","Cardiac veins","Ascending aorta","Aortic arch","Pulmonary trunk & arteries","Superior vena cava","Inferior vena cava","Pulmonary veins (R)","Pulmonary veins (L)"];
var BRAIN_SET=["Frontal lobe (R)","Frontal lobe (L)","Precentral gyrus (R)","Precentral gyrus (L)","Postcentral gyrus (R)","Postcentral gyrus (L)","Parietal lobe (R)","Parietal lobe (L)","Temporal lobe (R)","Temporal lobe (L)","Occipital lobe (R)","Occipital lobe (L)","Insula (R)","Insula (L)","Cingulate gyrus (R)","Cingulate gyrus (L)","Cerebral white matter (R)","Cerebral white matter (L)","Corpus callosum","Basal ganglia (R)","Basal ganglia (L)","Thalamus (R)","Thalamus (L)","Hypothalamus","Hippocampus (R)","Hippocampus (L)","Amygdala (R)","Amygdala (L)","Midbrain","Pons","Medulla oblongata","Cerebellum","Ventricles","Pituitary gland","Pineal gland","Optic nerve & chiasm","Spinal cord"];
var LESSON3D={
  "2-1":{dataset:"cell",only:["Plasma membrane","Cytoplasm (cytosol)","Cytoskeleton (filaments)","Mitochondria","Ribosomes (free)"],view:"front",explode:0,select:"Plasma membrane",
         hint:"The plasma membrane is the translucent outer skin of this cross-section. It is a fluid bilayer — the model shows its shape, not the proteins: picture channels, carriers and pumps studding this whole surface. Turn the other layers on with the chips when you're done.",
         tour:["Plasma membrane","Cytoskeleton (filaments)","Mitochondria"]},
  "2-2":{dataset:"cell",view:"front",explode:0,
         hint:"A real cross-section model of an animal cell (dav169, CC BY). Nucleus cut open to show chromatin and nucleolus, rough ER stacked around it with ribosomes, smooth ER off the edge, Golgi facing the membrane, centrioles with microtubules. Explode to pull it apart, then find each organelle.",
         tour:["Nuclear envelope","Nuclear pores","Nucleolus","Chromatin (DNA)","Rough endoplasmic reticulum","Ribosomes (bound)","Smooth endoplasmic reticulum","Golgi apparatus","Mitochondria","Lysosomes","Peroxisomes","Centrioles","Microtubules","Plasma membrane"]},
  "1-1":{systems:["skin","skeletal","heart","arterial","venous","respiratory","digestive","urinary","nervous","lymphatic","endocrine"],view:"front",explode:0,
         hint:"This is the whole organism, built from real MRI-derived surfaces. Everything you click is an organ — level 5 of the six levels. Turn systems off with the chips to see how the organ systems nest inside each other.",
         tour:["Heart (wall)","Liver","Stomach","Lower lobe of right lung","Kidney (L)","Urinary bladder","Cerebellum","Spleen"]},
  "3-1":{systems:["skin","skeletal"],view:"front",explode:0,hint:"The skin is drawn solid here because it's the subject. Toggle Skeleton off to see it alone, then back on to see how thin the envelope really is over the shins, clavicles and skull — the pressure-injury sites.",tour:["Skin","Clavicle (R)","Sacrum","Calcaneal (Achilles) tendon (R)"],parts:["Calcaneal (Achilles) tendon (R)"]},
  "3-2":{systems:["skeletal"],view:"front",explode:0,select:"Femur (R)",hint:"Zoom into the femur: the shaft is compact bone; the head, neck and condyles are spongy bone under a thin cortex. Neck fractures in osteoporosis happen where the trabeculae thin out.",tour:["Femur (R)","Humerus (R)","Tibia (R)","Hip bone (R)"]},
  "3-3":{lab:"shoulder",systems:["skeletal"],view:"front",explode:0,hint:"The practical below is the real deal: every bone is a separate, clickable object. Use Explode to pull the skeleton apart and see each bone's shape on its own.",
         tour:["Frontal bone","Mandible","Atlas (C1)","Axis (C2)","Manubrium","Body of sternum","Clavicle (R)","Scapula (R)","Humerus (R)","Radius (R)","Ulna (R)","Carpal bones (R)","Hip bone (R)","Sacrum","Femur (R)","Patella (R)","Tibia (R)","Fibula (R)","Tarsal bones (R)"]},
  "4-1":{systems:["muscular","skeletal"],view:"front",explode:0,hint:"Every muscle here is a real surface. Click one and read where it attaches — origin and insertion are the two ends you can see wrapping onto bone.",
         tour:["Deltoid (R)","Pectoralis major (R)","Biceps brachii (R)","Rectus abdominis (R)","External oblique (R)","Sartorius (R)","Rectus femoris (R)","Vastus lateralis (R)","Tibialis anterior (R)"]},
  "4-2":{lab:"knee",systems:["muscular","skeletal"],view:"back",explode:0,hint:"Back view. Find the antagonist pairs: triceps vs biceps, hamstrings vs quads, gastrocnemius vs tibialis anterior. The IM injection sites are here too — deltoid, ventrogluteal (gluteus medius), vastus lateralis.",
         tour:["Trapezius (R)","Latissimus dorsi (R)","Triceps brachii (R)","Erector spinae (R)","Gluteus maximus (R)","Gluteus medius (R)","Biceps femoris (R)","Semitendinosus (R)","Gastrocnemius (R)","Soleus (R)","Diaphragm","Sternocleidomastoid (R)"]},
  "5-1":{only:BRAIN_SET.concat(["Skin"]),view:"left",explode:0,hint:"The central nervous system: brain plus spinal cord, shown with the skin ghosted for scale. The spinal cord ends at L1–L2 — lumbar punctures go in below that. Toggle Skin off to see the CNS alone.",
         tour:["Cerebellum","Spinal cord","Medulla oblongata","Frontal lobe (L)"]},
  "5-4":{only:BRAIN_SET,view:"left",explode:0,hint:"Left side of the brain. Explode to separate the lobes, the deep structures and the brainstem. The three brainstem pieces — midbrain, pons, medulla — are what keep a patient breathing.",
         tour:["Frontal lobe (L)","Precentral gyrus (L)","Postcentral gyrus (L)","Parietal lobe (L)","Temporal lobe (L)","Occipital lobe (L)","Cerebellum","Corpus callosum","Thalamus (L)","Hypothalamus","Midbrain","Pons","Medulla oblongata","Spinal cord","Basal ganglia (L)","Hippocampus (L)"]},
  "6-1":{only:["Hypothalamus","Pituitary gland","Pineal gland","Thalamus (R)","Thalamus (L)","Midbrain","Pons","Medulla oblongata","Optic nerve & chiasm","Sphenoid bone","Cerebral white matter (L)"],view:"left",explode:0,select:"Pituitary gland",
         hint:"The hypothalamus sits directly above the pituitary, which hangs into the sella turcica of the sphenoid bone — the optic chiasm runs right in front of it (why pituitary tumours cause visual field loss).",
         tour:["Hypothalamus","Pituitary gland","Pineal gland","Sphenoid bone","Optic nerve & chiasm"]},
  "6-2":{only:["Adrenal gland (R)","Adrenal gland (L)","Kidney (R)","Kidney (L)","Pancreas","Thymus","Spleen","Duodenum","Abdominal aorta","Inferior vena cava","Thyroid cartilage","Trachea"],view:"front",explode:0,
         hint:"The adrenals sit like caps on the kidneys; the pancreas lies across the back of the abdomen with its head in the C of the duodenum. The thyroid gland itself is not in this dataset — it sits just below the thyroid cartilage, wrapping the trachea.",
         tour:["Adrenal gland (R)","Kidney (R)","Pancreas","Duodenum","Thymus","Thyroid cartilage"]},
  "7-2":{only:HEART_SET,view:"front",explode:0,hint:"Explode the heart to lift the chamber walls and valves out of the muscle. Trace the flow: SVC/IVC → right atrium → tricuspid → right ventricle → pulmonary valve → pulmonary trunk → lungs → pulmonary veins → left atrium → mitral → left ventricle → aortic valve → aorta.",
         tour:["Superior vena cava","Right atrium","Tricuspid valve","Pulmonary valve","Pulmonary trunk & arteries","Pulmonary veins (L)","Left atrium","Mitral valve","Aortic valve","Ascending aorta","Right coronary artery","Left coronary artery (LAD + circumflex)","Cardiac veins"]},
  "7-3":{systems:["heart","arterial","venous","skeletal"],view:"front",explode:0,hint:"Arteries red, veins blue, skeleton for landmarks. Find the pulse points and the venipuncture veins — every one of these is a bedside skill.",
         tour:["Aortic arch","Common carotid artery (R)","Brachial artery (R)","Radial artery (R)","Femoral artery (R)","Popliteal artery (R)","Dorsalis pedis artery (R)","Internal jugular vein (R)","Median cubital vein (R)","Great saphenous vein (R)","Hepatic portal vein","Inferior vena cava"]},
  "7-4":{only:["Spleen","Thymus","Stomach","Kidney (L)","Ribs (L)","Diaphragm","Heart (wall)"],view:"front",explode:0,select:"Spleen",hint:"The spleen tucks under the left ribs 9–11 behind the stomach — which is why it ruptures in left-sided blunt trauma and why a big spleen is felt in the left upper quadrant.",tour:["Spleen","Thymus","Ribs (L)"]},
  "8-1":{only:["Thyroid cartilage","Cricoid cartilage","Arytenoid cartilages","Epiglottis","Hyoid bone","Trachea","Main bronchus (R)","Main bronchus (L)","Bronchial tree (R)","Bronchial tree (L)","Lingular bronchi","Upper lobe of right lung","Middle lobe of right lung","Lower lobe of right lung","Upper lobe of left lung","Lower lobe of left lung","Diaphragm","Heart (wall)","Pulmonary trunk & arteries"],view:"front",explode:0,
         hint:"Explode to pull the lobes off the bronchial tree. Notice the right main bronchus is wider and more vertical — aspirated food and misplaced ET tubes go right. Turn the lobes off to see the whole airway.",
         tour:["Epiglottis","Thyroid cartilage","Cricoid cartilage","Trachea","Main bronchus (R)","Main bronchus (L)","Upper lobe of right lung","Middle lobe of right lung","Lower lobe of left lung","Bronchial tree (R)","Diaphragm"]},
  "8-2":{only:["Kidney (R)","Kidney (L)","Ureter (R)","Ureter (L)","Urinary bladder","Urethra","Prostate","Adrenal gland (R)","Adrenal gland (L)","Renal artery (R)","Renal artery (L)","Renal vein (R)","Renal vein (L)","Abdominal aorta","Inferior vena cava","L1","L2","L3","T12","Ribs (R)","Ribs (L)"],view:"front",explode:0,
         hint:"Kidneys at T12–L3, the left one slightly higher. Renal arteries come straight off the aorta — a fifth of your cardiac output. The ureters run down to enter the bladder from behind.",
         tour:["Kidney (R)","Renal artery (R)","Renal vein (R)","Adrenal gland (R)","Ureter (R)","Urinary bladder","Urethra","Abdominal aorta"]},
  "8-4":{only:["Tongue","Salivary glands","Esophagus","Stomach","Liver","Gallbladder","Bile ducts","Pancreas","Duodenum","Jejunum","Ileum","Appendix","Colon","Rectum","Spleen","Hepatic portal vein","Diaphragm"],view:"front",explode:0,
         hint:"Toggle the liver off to see the stomach and duodenum behind it, then explode to separate the tract into its segments. Follow the hepatic portal vein: everything absorbed goes to the liver first.",
         tour:["Esophagus","Stomach","Liver","Gallbladder","Pancreas","Duodenum","Jejunum","Ileum","Appendix","Colon","Rectum","Hepatic portal vein"]}
};
var viewer3d=null;
function kill3d(){ if(viewer3d){ try{ viewer3d.dispose(); }catch(e){} viewer3d=null; } }
function has3d(L){ return !!(LESSON3D[L.id] && window.Atlas3D && window.AP3D_B64); }
function partCard(p){
  // find a course card that talks about this structure
  var base=p.n.replace(/\s\((R|L)\)$/,"").toLowerCase().replace(/\s*\(.*\)$/,"");
  var key=base.split(" ")[0]; if(key.length<4) key=base;
  var best=null, bestScore=0;
  allCards().forEach(function(c){ var t=(c.q+" "+c.a).toLowerCase(); var s=0; if(t.indexOf(base)>=0) s=3; else if(t.indexOf(key)>=0) s=1; if(s>bestScore){ bestScore=s; best=c; } });
  return bestScore>=1 ? best : null;
}
function partLessonId(p){ var c=partCard(p); return c ? CARD_LESSON[c.id] : null; }
function infoExtra3d(p){
  var c=partCard(p); if(!c) return "";
  var lid=CARD_LESSON[c.id], L=lid&&lessonById(lid);
  return '<button class="a3d-link" data-lesson="'+esc(lid||"")+'"><b>In the course</b>'+esc(c.q)+(L?'<span style="display:block;color:var(--muted);margin-top:3px;font-size:.74rem">Lesson '+esc(lid)+' · '+esc(L.title.split(" — ")[0])+'</span>':'')+'</button>';
}
function bind3dLinks(host){ Array.prototype.forEach.call(host.querySelectorAll(".a3d-link[data-lesson]"),function(b){ b.onclick=function(){ var id=b.getAttribute("data-lesson"); if(id&&(isUnlocked(id)||lessonDone(id))){ kill3d(); setCur(id,0); go("lesson",id); } else if(id){ b.querySelector("b").textContent="Locked until you reach lesson "+id; } }; }); }
function mount3d(host, preset, tour, onDone, dataset){
  kill3d();
  viewer3d=Atlas3D.create(host,{dataset:dataset||"body", preset:preset, tour:tour||null, infoExtra:infoExtra3d, onTourDone:onDone,
    onSelect:function(){ bind3dLinks(host); }});
}
function render3dStep(L){
  var pr=LESSON3D[L.id];
  return '<p style="color:var(--muted);max-width:66ch;margin:0 0 12px">'+esc(pr.hint)+'</p><div id="a3dHost"></div>'+
    (pr.lab?'<div class="labcta"><div><b>Joint lab</b><span>Move a real '+esc(pr.lab)+' — bones, ligaments under live tension, and the exam maneuvers you\'ll be tested on.</span></div><button class="btn primary" id="openLab">Open the joint lab →</button></div>':'')+
    '<div class="a3d-foot"><span class="mono" style="font-size:.72rem;color:var(--faint)">'+(pr.dataset==="cell"?'Cell model: "Eukaryotic Cell Cross Section" by dav169 (Sketchfab), CC BY 4.0 · simplified for the browser':'Model: BodyParts3D © Database Center for Life Science, CC BY 4.0 · '+window.AP3D_MAN.parts.length+' structures')+'</span></div>'+
    '<div class="lnav"><button class="btn ghost" id="lPrev">← Back</button><button class="btn primary big" id="lNext">'+(pr.tour?'Check yourself →':'Check yourself →')+'</button></div>';
}
function after3dRender(L){
  var pr=LESSON3D[L.id], host=document.getElementById("a3dHost"); if(!host) return;
  var preset={systems:pr.systems, only:pr.only, parts:pr.parts, view:pr.view, explode:pr.explode||0, select:pr.select};
  mount3d(host, preset, pr.tour, function(t){ if(!store.meta.tours) store.meta.tours={}; store.meta.tours[L.id]={misses:t.misses,at:Date.now()}; persist(); }, pr.dataset);
  var lb=document.getElementById("openLab"); if(lb) lb.onclick=function(){ go("joints", pr.lab); };
}
// ---- joint lab view ----
function renderJoints(v){
  crumb('<b>Joint Lab</b>');
  v.innerHTML='<div style="margin-bottom:14px"><div class="eyebrow">Joint lab</div><h1 style="font-size:1.7rem;margin-top:4px">How joints move — and how you test them</h1><p style="color:var(--muted);max-width:70ch;margin:8px 0 0">Real bones from the same dataset, hinged at the joint. Drag the sliders to move it; the ligaments and tendons are drawn between their attachment sites and change colour as they slacken or tighten. Every exam maneuver from the physical-assessment lists puts the joint in its test position and shows you which structure it loads.</p></div><div id="a3dHost"></div><div class="a3d-foot"><span class="mono" style="font-size:.72rem;color:var(--faint)">Bones: BodyParts3D © DBCLS, CC BY 4.0. Ligament paths are schematic (drawn between landmark points on the real bones); tension is geometric, not a biomechanical model. For learning, not for diagnosing anyone.</span></div>';
  kill3d(); viewer3d=Atlas3D.createJoint(document.getElementById("a3dHost"),{joint:route.ref||"shoulder"});
}
// ---- standalone atlas view ----
function renderAtlas(v){
  crumb('<b>3D Atlas</b> · '+(window.AP3D_MAN?window.AP3D_MAN.parts.length:0)+' structures');
  var h='<div style="margin-bottom:14px"><div class="eyebrow">Explore</div><h1 style="font-size:1.7rem;margin-top:4px">The body in 3D</h1><p style="color:var(--muted);max-width:70ch;margin:8px 0 0">Real anatomical surfaces from BodyParts3D, curated down to the structures a nursing student needs to know. Click anything to name it; use the chips to layer systems; drag the Explode slider to pull the body apart. Presets below jump to the views the lessons use.</p></div>';
  h+='<div class="a3d-presets">'+[["Whole body","1-1"],["Cell","2-2"],["Skeleton","3-3"],["Muscles (front)","4-1"],["Muscles (back)","4-2"],["Brain","5-4"],["Heart","7-2"],["Vessels","7-3"],["Lungs & airway","8-1"],["Kidneys","8-2"],["Digestive","8-4"]].map(function(x){ return '<button class="seg" data-p3="'+x[1]+'">'+x[0]+'</button>'; }).join("")+'</div>';
  h+='<div class="labcta" style="margin-bottom:14px"><div><b>Joint lab</b><span>Shoulder, knee and ankle hinged on real bones — motion sliders, ligament tension, exam maneuvers.</span></div><button class="btn primary" id="openLab">Open the joint lab →</button></div>';
  h+='<div id="a3dHost"></div><div class="a3d-foot"><span class="mono" style="font-size:.72rem;color:var(--faint)">Body: BodyParts3D © The Database Center for Life Science, CC BY 4.0 (adult male reference anatomy). Cell: "Eukaryotic Cell Cross Section" by dav169 on Sketchfab, CC BY 4.0. Both simplified for the browser. Educational, not clinical.</span></div>';
  v.innerHTML=h;
  var host=document.getElementById("a3dHost");
  function load(id){ var pr=LESSON3D[id]; Array.prototype.forEach.call(v.querySelectorAll("[data-p3]"),function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-p3")===id ? "true":"false"); });
    mount3d(host,{systems:pr.systems, only:pr.only, parts:pr.parts, view:pr.view, explode:0, select:pr.select}, null, null, pr.dataset); }
  Array.prototype.forEach.call(v.querySelectorAll("[data-p3]"),function(b){ b.onclick=function(){ load(b.getAttribute("data-p3")); }; });
  document.getElementById("openLab").onclick=function(){ go("joints"); };
  load(route.ref&&LESSON3D[route.ref]?route.ref:"1-1");
}

// ================= keyboard, chrome, boot =================
document.addEventListener("keydown",function(e){
  if(!session) return;
  if(e.target&&e.target.tagName==="TEXTAREA"&&!session.flipped){ if(e.key==="Enter"&&(e.ctrlKey||e.metaKey)){ e.preventDefault(); flip(); } return; }
  if(!session.flipped){ if(e.code==="Space"){ e.preventDefault(); flip(); } return; }
  if(session.mode==="cram"){ if(e.key==="1") grade("again"); else if(e.key==="3"||e.key==="2") grade("good"); return; }
  if(e.key==="1")grade("again"); else if(e.key==="2")grade("hard"); else if(e.key==="3")grade("good"); else if(e.key==="4")grade("easy");
});
Array.prototype.forEach.call(document.querySelectorAll(".navbtn"),function(b){ b.onclick=function(){ quiz=null; go(b.getAttribute("data-view")); }; });
document.getElementById("menubtn").onclick=function(){ document.getElementById("side").classList.toggle("open"); document.getElementById("scrim").classList.toggle("on"); };
document.getElementById("scrim").onclick=function(){ document.getElementById("side").classList.remove("open"); document.getElementById("scrim").classList.remove("on"); };
var root=document.documentElement; document.getElementById("themebtn").onclick=function(){ var cur=root.getAttribute("data-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"); root.setAttribute("data-theme",cur==="dark"?"light":"dark"); };

CARDS=CARDS.concat(buildDiagramCards());
indexLessons();
loadLocal();
go("home");
initDb();
})();
</script>
