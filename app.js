const $=(s,r=document)=>r.querySelector(s),inr=n=>"₹"+n.toLocaleString("en-IN"),esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const S={route:"dashboard",page:0,open:null,chat:[...D.chat],need:null,cal:new Date(2026,9,1),modal:"",li:0};
const NAV=[["dashboard","Dashboard"],["plan/calls","Plan"],["plan/calls","Calls to make",1],["plan/incoming","Incoming",1],["plan/recent","Recent",1],["plan/practice","Practise a call",1],["calendar","Calendar"],["pulse","Pulse"]];
const go=r=>{S.route=r;S.page=0;S.open=null;render()};
const bars=(a,cls,fmt=x=>x)=>{const m=Math.max(...a);return `<div class="bars ${cls}">${a.map(v=>`<div style="height:${v/m*100}%"><span>${fmt(v)}</span></div>`).join("")}</div><div class="lbl">${D.days.map(d=>`<i>${d}</i>`).join("")}</div>`};

function view(){const r=S.route;
if(r=="dashboard")return`<div class="band"><small>Good afternoon 👋</small><h3 style="margin:2px 0">${D.me.name}</h3><small>${D.me.brand}</small></div>
<div class="grid k4">${D.kpi.map(k=>`<div class="card kpi"><b>${k[0]}</b><small>${k[1]}</small> <span class="pill">${k[2]}</span></div>`).join("")}</div>
<div class="grid c2" style="margin-top:10px"><div><div class="prog"><div><b>${D.progress.leads}</b>Leads closed</div><div><b>${D.progress.callbacks}</b>Callbacks</div></div>
<div class="card" style="margin-top:10px"><small class="mu">WHO'S WAITING</small>${D.waiting.map(w=>`<div class="row"><span><b>${w[0]}</b><br><small class="mu">${w[1]}</small></span><span class="pill r">${w[2]}</span></div>`).join("")}</div></div>
<div><div class="card"><small class="mu">MY EARNINGS THIS MONTH</small><h2 style="margin:2px 0">${inr(D.me.earn)}</h2><div class="meter"><i style="width:${D.me.earn/D.me.earnTarget*100}%"></i></div><small class="mu">${inr(D.me.earnTarget-D.me.earn)} to monthly target</small></div>
<div class="tasks" style="margin-top:10px"><b>My Tasks</b><button data-act="leads">📞 ${D.progress.callbacks} callbacks due</button><button data-act="leads">🔥 ${D.progress.hot} hot leads unreached</button><button data-act="leads">🎯 ${D.progress.outcome} outcome to log</button></div></div></div>
<div class="card" style="margin-top:10px"><small class="mu">CALLS HANDLED · LAST 7 DAYS</small>${bars(D.calls7,"")}</div>
<div class="card" style="margin-top:10px"><small class="mu">EFFICIENCY TREND · LAST 7 DAYS</small>${bars(D.eff7,"b",v=>v+"%")}</div>`;
if(r=="plan/calls"){const P=5,L=D.leads.slice(S.page*P,S.page*P+P),n=Math.ceil(D.leads.length/P);
return`<div class="card"><h3 style="margin:0">Planned outgoing calls</h3><small class="mu">Ranked by score — tap a lead for details</small>${L.map((l,i)=>{const id=S.page*P+i;return`<div class="row" style="flex-wrap:wrap"><span><b>${l.n}</b> <small class="mu">${l.p} · ${inr(l.v)}</small></span><span><span class="pill">${l.sc}</span> <button data-open="${id}">${S.open===id?"Hide":"Details"}</button> <button class="go" data-call="${esc(l.n)}">Call</button></span>${S.open===id?`<div class="det" style="width:100%">${l.note}<br>${l.fit}<br><small class="mu">${l.how}</small></div>`:""}</div>`}).join("")}
<div class="pager"><button data-pg="-1" ${S.page<1?"disabled":""}>‹</button>Page ${S.page+1} of ${n}<button data-pg="1" ${S.page>=n-1?"disabled":""}>›</button></div></div>`}
if(r=="plan/incoming")return`<div class="card"><h3 style="margin:0">Missed calls</h3><b>${D.incoming.length}</b> missed · <b>${inr(D.incoming.reduce((a,x)=>a+x[2],0))}</b> expected value</div><div class="card" style="margin-top:10px">${D.incoming.map(x=>`<div class="row"><span><b>${x[0]}</b><br><small class="mu">${x[1]}</small></span><span><b>${x[2]?inr(x[2])+" expected":""}</b> <button class="go" data-call="${esc(x[0])}">Call back</button></span></div>`).join("")}</div>`;
if(r=="plan/recent")return`<div class="card"><h3 style="margin:0">Recent calls</h3>${D.recent.map((x,i)=>`<div class="row" data-rev="${i}" style="cursor:pointer"><span><b>${x[0]}</b><br><small class="mu">${x[1]} · ${x[2]}</small></span><small>${x[3]}</small></div>`).join("")}</div>`;
if(r=="plan/practice")return`<div class="card"><h3 style="margin:0">Practise a call</h3><p class="mu">Rehearse the greeting script with an AI shopper. Uses your mic and speaker.</p><button class="go" data-ai>Start AI practice call</button></div>`;
if(r=="calendar"){const d=S.cal,y=d.getFullYear(),m=d.getMonth(),f=new Date(y,m,1).getDay(),n=new Date(y,m+1,0).getDate(),t=new Date(),c=["S","M","T","W","T","F","S"].map(x=>`<div class="hd">${x}</div>`);
for(let i=0;i<f;i++)c.push("<div></div>");for(let i=1;i<=n;i++){const k=`${y}-${String(m+1).padStart(2,0)}-${String(i).padStart(2,0)}`;c.push(`<div class="d ${t.getFullYear()==y&&t.getMonth()==m&&t.getDate()==i?"t":""} ${D.events[k]?"e":""}" title="${D.events[k]||""}">${i}</div>`)}
return`<div class="card" style="max-width:560px;margin:auto"><div class="row"><b>${d.toLocaleString("en",{month:"long",year:"numeric"})}</b><span><button data-mo="-1">‹</button> <button data-today>Today</button> <button data-mo="1">›</button></span></div><div class="cal">${c.join("")}</div></div>`}
if(r=="pulse")return`<div class="pulsehd"><b>Pulse</b> · The Sleep Company</div><div class="card"><b>Agents</b>${D.agents.map(a=>`<div class="chan"><span>${a[0]}<br><small class="mu">${a[1]}</small></span><b style="margin-left:auto">${a[2]}</b></div>`).join("")}<b>Channels</b><div class="chan" data-chan><span># callcentre-team<br><small class="mu">Priya Iyer · Nearly hitting dispute</small></span></div></div>`;
if(r=="chan")return`<div class="pulsehd"><button data-go="pulse">←</button> <b># callcentre-team</b></div><div class="card" style="padding:0">${S.need===null?`<div class="need"><b>Needs your input</b> <span class="pill r">1</span><p>Confirm the 4:30pm callback</p><button class="go" data-need="Confirmed">Confirmed</button> <button data-need="Reschedule">Reschedule</button><input id="nr" placeholder="Or type your answer"><button data-need="x" style="margin-top:6px">Send</button></div>`:`<div class="need">✅ You answered: <b>${esc(S.need)}</b></div>`}<div class="chat">${S.chat.map(m=>`<div class="msg ${m[0]=="You"?"me":""}"><b>${m[0]=="You"?"":m[0]+" "}</b><small>${m[1]}</small><br>${esc(m[2])}</div>`).join("")}</div><div class="cbar"><input id="mi" placeholder="Message #callcentre-team"><button class="go" data-send>Send</button></div></div>`}

function modal(){if(S.modal=="leads"){const l=D.leads[S.li],n=D.leads.length;return`<div class="ov" data-close><div class="modal"><div class="h"><b>Leads · ${S.li+1} of ${n}</b><button data-x>✕</button></div><div class="b">
<span class="pill">OPEN</span> <b style="font-size:16px">${l.n}</b> <small class="mu">${l.p} · ${inr(l.v)}</small><div class="need" style="margin:8px 0">${l.note}</div>
ICP <b style="float:right">${l.s}%</b><div class="meter"><i style="width:${l.s}%"></i></div>Lead intent score <b style="float:right">0${l.intent}</b>
<details><summary>ICP fit breakdown</summary>${l.fit}</details><details><summary>How we got here</summary>${l.how}</details>
<details open><summary>Where we picked up signals</summary>${l.sig.map(s=>`<div class="det"><b>${s[0]}</b><br><i>${s[1]}</i></div>`).join("")}</details>
${l.missed?`<small style="color:var(--bad)">● Cumulative missed: ${l.missed}</small>`:""}
<div class="pager"><button data-li="-1" ${S.li<1?"disabled":""}>‹ Prev</button><button class="go" data-call="${esc(l.n)}">Call</button><button data-li="1" ${S.li>=n-1?"disabled":""}>Next ›</button></div></div></div></div>`}
if(S.modal=="rev"){const x=D.recent[S.li];return`<div class="ov" data-close><div class="modal"><div class="h"><b>${x[0]}</b><button data-x>✕</button></div><div class="b">${x[1]} · ${x[2]} · ${x[3]}<div class="det">${x[4]}</div></div></div></div>`}
if(S.modal=="call")return`<div class="ov"><div class="modal"><div class="h"><b>Call · ${esc(S.who||"")}</b><button data-x>✕</button></div><div class="b"><p id="st" class="mu">Choose how to call.</p>
<b>Human ↔ human (WebRTC)</b><p class="mu">Your ID: <code id="myid">connecting…</code><br>Open this page in a second tab/device, share the ID, paste it there.</p><div class="cbar" style="padding:0"><input id="pid" placeholder="Peer ID to call"><button class="go" data-p2p>Call</button></div><audio id="au" autoplay></audio>
<hr><b>AI ↔ human (voice)</b><p class="mu">An AI shopper talks to you using browser speech.</p><button class="go" data-ai>Start AI call</button><div class="tr" id="tr"></div><button data-hang style="background:var(--bad);color:#fff">Hang up</button></div></div></div>`;return""}

function render(){const act=S.route.replace("/","\\/");
$("#app").innerHTML=`<div class="shell"><aside><div class="logo">On-Ground.ai</div>${NAV.map(n=>`<a class="${n[2]?"sub":""} ${S.route==n[0]||(n[0]=="pulse"&&S.route=="chan")?(n[1]=="Plan"?"":"on"):""} ${n[1]=="Pulse"?"pulse":""}" tabindex=0 data-go="${n[0]}">${n[1]}</a>`).join("")}</aside>
<div class="main"><div class="top"><b>On-Ground.ai</b><span class="chips"><span>🔴 3</span><span>🔥 ${D.me.streak}</span><span>AR</span></span></div><div class="view">${view()}</div></div></div>
<div class="demo"><small>DEMO</small><button data-call="Demo">In-app call</button><button data-tel>Phone call</button></div>${modal()}`;
if(S.modal=="call"&&Call.id)$("#myid").textContent=Call.id}

// ---------- Calling ----------
const Call={peer:null,id:null,cur:null,stream:null,rec:null,live:false,
init(){try{this.peer=new Peer();this.peer.on("open",i=>{this.id=i;const e=$("#myid");e&&(e.textContent=i)});
this.peer.on("call",async c=>{this.cur=c;S.modal="call";S.who="Incoming";render();const s=await this.mic();c.answer(s);this.wire(c)})}catch(e){console.warn(e)}},
async mic(){return this.stream||(this.stream=await navigator.mediaDevices.getUserMedia({audio:true}))},
wire(c){c.on("stream",s=>{const a=$("#au");a.srcObject=s;this.st("Connected — talking")});c.on("close",()=>this.st("Call ended"))},
st(t){const e=$("#st");e&&(e.textContent=t)},
async p2p(){const id=$("#pid").value.trim();if(!id||!this.peer)return this.st("Enter a peer ID");try{const s=await this.mic();this.st("Ringing…");this.cur=this.peer.call(id,s);this.wire(this.cur)}catch(e){this.st("Mic blocked: "+e.message)}},
say(t){const l=$("#tr");l&&(l.innerHTML+=`<div>${t}</div>`,l.scrollTop=9e9)},
speak(t){return new Promise(r=>{this.say("🤖 "+esc(t));const u=new SpeechSynthesisUtterance(t);u.lang="en-IN";u.onend=r;speechSynthesis.speak(u)})},
listen(){return new Promise(r=>{const R=window.SpeechRecognition||window.webkitSpeechRecognition;if(!R)return r("");this.rec=new R();this.rec.lang="en-IN";this.rec.onresult=e=>r(e.results[0][0].transcript);this.rec.onerror=()=>r("");this.rec.onend=()=>r("");this.rec.start()})},
async ai(){if(S.modal!="call"){S.modal="call";S.who="AI shopper";render()}this.live=true;this.st("AI call in progress");
const script=[["Hello, this is Meera. I enquired about the Ortho GRID mattress yesterday.",0],["Honestly the price feels high. Do you have EMI options?",/emi|finance|month|instal/i],["Okay. And what about warranty and a trial period?",/warrant|trial|night|return/i],["Great, please send me a quote. Thank you!",0]];
for(const[l,re]of script){if(!this.live)break;await this.speak(l);const a=await this.listen();this.say("🧑 "+esc(a||"(no speech heard)"));if(re&&a&&!re.test(a)){await this.speak("Could you tell me a bit more about that?")}}
this.say("— call finished —");this.live=false;this.st("AI call finished")},
hang(){this.live=false;speechSynthesis.cancel();this.rec&&this.rec.abort();this.cur&&this.cur.close();this.st("Call ended")}};

document.addEventListener("click",e=>{const t=e.target,q=s=>t.closest(s),d=(s,k)=>q(`[data-${s}]`)?.dataset[k];
if(t.matches(".ov")||q("[data-x]")){Call.hang();S.modal="";return render()}
if(q("[data-go]"))return go(d("go","go"));
if(q("[data-open]")){const i=+d("open","open");S.open=S.open===i?null:i;return render()}
if(q("[data-pg]")){S.page+=+d("pg","pg");S.open=null;return render()}
if(q("[data-rev]")){S.li=+d("rev","rev");S.modal="rev";return render()}
if(q("[data-act]")){S.li=0;S.modal="leads";return render()}
if(q("[data-li]")){S.li+=+d("li","li");return render()}
if(q("[data-call]")){S.who=d("call","call");S.modal="call";return render()}
if(q("[data-tel]"))return location.href="tel:+917982015371";
if(q("[data-p2p]"))return Call.p2p();
if(q("[data-ai]")){if(S.modal!="call"){S.modal="call";S.who="AI shopper";render()}return Call.ai()}
if(q("[data-hang]"))return Call.hang();
if(q("[data-chan]"))return go("chan");
if(q("[data-need]")){const v=d("need","need"),x=v=="x"?$("#nr").value.trim():v;if(x){S.need=x;S.chat.push(["You","now","Answered: "+x])}return render()}
if(q("[data-send]")){const i=$("#mi"),v=i.value.trim();if(v){S.chat.push(["You",new Date().toLocaleTimeString("en",{hour:"numeric",minute:"2-digit"}),v]);render();$("#mi").focus()}return}
if(q("[data-mo]")){S.cal=new Date(S.cal.getFullYear(),S.cal.getMonth()+ +d("mo","mo"),1);return render()}
if(q("[data-today]")){S.cal=new Date();return render()}});
document.addEventListener("keydown",e=>{if(e.key=="Enter"&&e.target.id=="mi")$("[data-send]").click();if(e.key=="Escape"&&S.modal){Call.hang();S.modal="";render()}});
render();Call.init();
