// ================= session =================
var session=null;
function startSRS(mFilter){
  var q=queue(mFilter);
  var cards=q.due.concat(q.learn).concat(q.news);
  if(!cards.length){ go("review"); return; }
  session={mode:"srs",cards:cards,idx:0,flipped:false,done:0,total:cards.length,mFilter:mFilter||null,lastRecall:""};
  go("review");
}
function startCram(mFilter,list,label){
  var cards=shuffle(list || (mFilter?cardsOf(mFilter):allCards()));
  if(!cards.length) return;
  session={mode:"cram",cards:cards,idx:0,flipped:false,done:0,got:0,total:cards.length,mFilter:mFilter||null,label:label||null,lastRecall:""};
  go("review");
}
function diaCards(name){ return allCards().filter(function(c){ return c.dia===name; }); }
function cur(){ return session&&session.cards[session.idx]; }
function flip(){ if(!session||session.flipped) return; var rb=document.getElementById("recallBox"); session.lastRecall=rb?rb.value:""; session.flipped=true; renderToday(); }

function grade(rating){
  var c=cur(); if(!c) return; var now=Date.now();
  if(session.mode==="cram"){
    if(rating==="good"||rating==="easy") session.got++;
    session.done++; session.idx++; session.flipped=false; session.lastRecall=""; renderToday(); return;
  }
  var had=!!stOf(c.id);
  store.byId[c.id]=schedule(stOf(c.id),rating,now);
  var rec=todayRec(); rec.reviews++; if(!had) rec.newIntro++;
  bumpStreak(); prune();
  if(store.byId[c.id].interval<1) session.cards.push(c);
  session.done++; session.idx++; session.flipped=false; session.lastRecall="";
  persist(); renderToday(); renderBadge();
}
function bumpStreak(){
  var k=dkey(); if(store.meta.lastStudy===k) return;
  var y=new Date(); y.setDate(y.getDate()-1);
  store.meta.streak = store.meta.lastStudy===dkey(y) ? (store.meta.streak+1) : 1;
  store.meta.lastStudy=k;
}
function prune(){ var ks=Object.keys(store.meta.perDay); if(ks.length>140){ ks.sort(); ks.slice(0,ks.length-140).forEach(function(k){delete store.meta.perDay[k];}); } }

