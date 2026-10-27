(()=>{"use strict";const TOTAL=30;let level=1,pos=0,points=0,qs=[],activeLine=null;const E=id=>document.getElementById(id);
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1}function red(n,d){let g=gcd(n,d);return{n:n/g,d:d/g}}function key(r){r=red(r.n,r.d);return r.n+"/"+r.d}
function F(n,d){return `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`}function V(r){r=red(r.n,r.d);if(r.d===1)return""+r.n;if(r.n>r.d){let w=Math.floor(r.n/r.d),m=r.n%r.d;return m?w+" "+F(m,r.d):""+w}return F(r.n,r.d)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}function parse(s){s=s.trim().replace(/\s+/g," ");let m=s.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);if(m){let w=+m[1],n=+m[2],d=+m[3];return d?red(w*d+n,d):null}m=s.match(/^(\d+)\s*\/\s*(\d+)$/);if(m)return +m[2]?red(+m[1],+m[2]):null;m=s.match(/^(\d+)$/);return m?{n:+m[1],d:1}:null}
function make(){let q={story:"",showExpr:true};if(level<=2){let w=pick([2,3,4,5,6,7,8]),d=pick([2,3,4,5,6,8,10]);q.right={n:w*d,d:1};q.expr=`${w} ÷ ${F(1,d)}`;q.solution=`${w} ÷ ${F(1,d)} = ${w} × ${d} = ${w*d}.`;if(level===2){q.showExpr=false;q.story=pick([
`Du har ${w} liter saft. Du häller ${1}/${d} liter i varje flaska. Hur många flaskor kan du fylla?`,
`Du har ${w} meter snöre. Varje bit ska vara ${1}/${d} meter lång. Hur många bitar kan du dela snöret i?`,
`Du har ${w} meter tyg. Varje tygbit ska vara ${1}/${d} meter lång. Hur många tygbitar kan du klippa ut?`,
`Du har ${w} kilogram deg. Till varje bröd går det åt ${1}/${d} kilogram deg. Hur många bröd räcker degen till?`,
`En sträcka är ${w} kilometer lång. Varje etapp är ${1}/${d} kilometer. Hur många etapper består sträckan av?`
])}}
else if(level===3){let n=pick([2,3,4,5,6,7,8,9]),d=pick([2,3,4,5,6,7,8,9,10]);while(n===d)n=pick([2,3,4,5,6,7,8,9]);q.right=red(d,n);q.expr=`Vilket är det inverterade talet till ${F(n,d)}?`;q.solution=`Byt plats på täljare och nämnare: ${F(n,d)} → ${V(q.right)}.`}
else{let A=Math.random()<.45?{n:pick([2,3,4,5,6]),d:1}:red(pick([1,2,3,4,5]),pick([4,5,6,8,9,10,12]));if(A.n>=A.d&&A.d!==1)A=red(1,A.d);let B=red(pick([1,2,3,4,5]),pick([3,4,5,6,8,10]));while(B.n>=B.d)B=red(1,pick([3,4,5,6,8,10]));q.right=red(A.n*B.d,A.d*B.n);q.expr=`${V(A)} ÷ ${V(B)}`;q.solution=`Invertera det andra bråket: ${V(B)} → ${F(B.d,B.n)}. ${V(A)} ÷ ${V(B)} = ${V(A)} × ${F(B.d,B.n)} = ${V(q.right)}.`;if(level===5){q.showExpr=false;q.story=pick([`Du har ${V(A)} liter saft. Varje flaska rymmer ${V(B)} liter. Hur många flaskor motsvarar mängden?`,`Ett band är ${V(A)} meter långt. Varje bit ska vara ${V(B)} meter. Hur många sådana bitar motsvarar bandets längd?`,`Du har ${V(A)} kilogram deg. Till varje portion går ${V(B)} kilogram. Hur många portioner motsvarar mängden?`])}}return q}
function build(){qs=[];for(let i=0;i<TOTAL;i++)qs.push(make())}
function addLine(){let line=document.createElement("div");line.className="math-line";line.addEventListener("click",()=>activeLine=line);E("mathWork").appendChild(line);activeLine=line;return line}
function insert(type){
 if(!activeLine) addLine();
 if(type==="frac"){
   const f=document.createElement("span");
   f.className="math-frac";
   const num=document.createElement("input");
   const den=document.createElement("input");
   num.className="mn"; den.className="md";
   num.inputMode="numeric"; den.inputMode="numeric";
   num.placeholder="täljare"; den.placeholder="nämnare";
   num.setAttribute("aria-label","Täljare");
   den.setAttribute("aria-label","Nämnare");
   f.appendChild(num); f.appendChild(den); activeLine.appendChild(f);
   num.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key==="ArrowDown"){e.preventDefault();den.focus();}});
   den.addEventListener("keydown",e=>{if(e.key==="ArrowUp"){e.preventDefault();num.focus();}});
   num.focus();
 }else{
   const t=document.createElement("span");t.className="opToken";t.textContent=type;activeLine.appendChild(t);
 }
}
function resetWork(){E("mathWork").innerHTML="";addLine()}function undoWork(){
 const lines=[...E("mathWork").querySelectorAll(".math-line")];
 let line=activeLine&&E("mathWork").contains(activeLine)?activeLine:lines[lines.length-1];
 if(!line)return;
 const last=line.lastElementChild;
 if(last){last.remove();line.focus?.();return}
 if(lines.length>1){line.remove();activeLine=lines[lines.length-2]}
}
function start(l){level=l;pos=0;points=0;build();E("menu").classList.add("hidden");E("result").classList.add("hidden");E("game").classList.remove("hidden");show()}
function show(){let q=qs[pos];E("progress").textContent=`Uppgift ${pos+1} av ${TOTAL}`;E("score").textContent=`Rätt: ${points}`;E("fill").style.width=`${pos/TOTAL*100}%`;E("story").innerHTML=q.story;E("question").innerHTML=q.showExpr?q.expr:"";E("feedback").textContent="";E("solution").innerHTML="";E("next").classList.add("hidden");E("answer").value="";E("answer").disabled=false;E("check").disabled=false;let work=level>=4;E("workArea").classList.toggle("hidden",!work);if(work)resetWork();
E("instruction").textContent=level===1?"Dividera heltalet med stambråket. Skriv ditt svar.":level===2?"Läs texten och räkna ut svaret.":level===3?"Skriv det inverterade talet.":level===4?"Använd det inverterade talet när du räknar. Använd gärna kladdytan för dina mellanled.":"Läs textuppgiften och avgör vilken beräkning som behövs. Visa din uträkning i kladdytan. Skriv sedan ditt svar i svarsrutan.";setTimeout(()=>E("answer").focus(),0)}
function check(){let r=parse(E("answer").value),q=qs[pos];if(!r){E("feedback").textContent="Skriv svaret som ett heltal, ett bråk eller i blandad form.";return}E("answer").disabled=true;E("check").disabled=true;if(key(r)===key(q.right)){points++;E("feedback").textContent="✅ Rätt!"}else{E("feedback").innerHTML=`❌ Rätt svar: ${V(q.right)}`;E("solution").innerHTML=q.solution}E("score").textContent=`Rätt: ${points}`;E("next").classList.remove("hidden")}
function next(){if(++pos>=TOTAL){E("game").classList.add("hidden");E("result").classList.remove("hidden");E("final").textContent=`${points} av ${TOTAL} rätt`}else show()}function home(){E("game").classList.add("hidden");E("result").classList.add("hidden");E("menu").classList.remove("hidden")}
document.querySelectorAll("[data-level]").forEach(b=>b.addEventListener("click",()=>start(+b.dataset.level)));document.querySelectorAll("[data-insert]").forEach(b=>b.addEventListener("click",()=>insert(b.dataset.insert)));E("newLine").addEventListener("click",addLine);E("undoWork").addEventListener("click",undoWork);E("clearWork").addEventListener("click",resetWork);E("check").addEventListener("click",check);E("answer").addEventListener("keydown",e=>{if(e.key==="Enter"&&!E("check").disabled)check()});E("next").addEventListener("click",next);E("home").addEventListener("click",home);E("resultHome").addEventListener("click",home);E("again").addEventListener("click",()=>start(level));
})();