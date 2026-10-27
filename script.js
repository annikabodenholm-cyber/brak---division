(()=>{"use strict";
const TOTAL=30;let level=1,pos=0,points=0,qs=[];const E=id=>document.getElementById(id);
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1}function red(n,d){let g=gcd(n,d);return{n:n/g,d:d/g}}function key(r){r=red(r.n,r.d);return r.n+"/"+r.d}
function F(n,d){return `<span class="frac"><span class="num">${n}</span><span class="den">${d}</span></span>`}function V(r){r=red(r.n,r.d);if(r.d===1)return""+r.n;if(r.n>r.d){let w=Math.floor(r.n/r.d),m=r.n%r.d;return m?w+" "+F(m,r.d):""+w}return F(r.n,r.d)}
function pick(a){return a[Math.floor(Math.random()*a.length)]}
function parse(s){s=s.trim().replace(/\s+/g," ");let m=s.match(/^(\d+)\s+(\d+)\s*\/\s*(\d+)$/);if(m){let w=+m[1],n=+m[2],d=+m[3];return d?red(w*d+n,d):null}m=s.match(/^(\d+)\s*\/\s*(\d+)$/);if(m)return +m[2]?red(+m[1],+m[2]):null;m=s.match(/^(\d+)$/);return m?{n:+m[1],d:1}:null}
function make(ix){let q={story:"",showExpr:true};
 if(level===1||level===2){let whole=pick([2,3,4,5,6,7,8]),den=pick([2,3,4,5,6,8,10]);q.a={n:whole,d:1};q.b={n:1,d:den};q.right=red(whole*den,1);q.expr=`${whole} ÷ ${F(1,den)}`;q.solution=`${whole} ÷ ${F(1,den)} = ${whole} × ${den} = ${q.right.n}.`;if(level===2){q.showExpr=false;let things=pick(["liter saft","meter snöre","meter tyg","kilogram deg"]);let units=things.includes("liter")?"liter":things.includes("kilogram")?"kilogram":"meter";q.story=`Du har ${whole} ${things}. Varje portion eller bit ska vara ${1}/${den} ${units}. Hur många lika stora portioner eller bitar får du?`}}
 else if(level===3){let n=pick([2,3,4,5,6,7,8,9]),d=pick([2,3,4,5,6,7,8,9,10]);while(n===d){n=pick([2,3,4,5,6,7,8,9])}q.a={n,d};q.right=red(d,n);q.expr=`Vilket är det inverterade talet till ${F(n,d)}?`;q.solution=`Det inverterade talet får du genom att byta plats på täljare och nämnare: ${F(n,d)} → ${V(q.right)}.`}
 else {let A,B;if(Math.random()<.45){A={n:pick([2,3,4,5,6]),d:1}}else{let d=pick([3,4,5,6,8,9,10,12]),n=pick([1,2,3,4,5,7]);while(n>=d)n=pick([1,2,3,4,5]);A=red(n,d)}let bd=pick([2,3,4,5,6,8,10]),bn=pick([1,2,3,4,5,7]);while(bn>=bd)bn=pick([1,2,3,4,5]);B=red(bn,bd);q.a=A;q.b=B;q.right=red(A.n*B.d,A.d*B.n);q.expr=`${V(A)} ÷ ${V(B)}`;q.solution=`Invertera det andra bråket: ${V(B)} → ${F(B.d,B.n)}. Då blir ${V(A)} ÷ ${V(B)} = ${V(A)} × ${F(B.d,B.n)} = ${V(q.right)}.`;
 if(level===5){q.showExpr=false;let contexts=[
 `Du har ${V(A)} liter saft. Varje flaska rymmer ${V(B)} liter. Hur många flaskor kan fyllas?`,
 `Ett band är ${V(A)} meter långt. Varje bit ska vara ${V(B)} meter. Hur många sådana bitar motsvarar bandets längd?`,
 `Du har ${V(A)} kilogram deg. Till varje portion går det åt ${V(B)} kilogram. Hur många portioner motsvarar mängden deg?`
 ];q.story=pick(contexts)}}
 return q}
function build(){qs=[];for(let i=0;i<TOTAL;i++)qs.push(make(i))}
function start(l){level=l;pos=0;points=0;build();E("menu").classList.add("hidden");E("result").classList.add("hidden");E("game").classList.remove("hidden");show()}
function show(){let q=qs[pos];E("progress").textContent=`Uppgift ${pos+1} av ${TOTAL}`;E("score").textContent=`Rätt: ${points}`;E("fill").style.width=`${pos/TOTAL*100}%`;E("story").innerHTML=q.story;E("question").innerHTML=q.showExpr?q.expr:"";E("feedback").textContent="";E("solution").innerHTML="";E("next").classList.add("hidden");E("answer").value="";E("answer").disabled=false;E("check").disabled=false;let work=level>=4;E("workArea").classList.toggle("hidden",!work);E("work").value="";
 if(level===1)E("instruction").textContent="Dividera heltalet med stambråket. Skriv ditt svar.";
 if(level===2)E("instruction").textContent="Läs texten och räkna ut svaret.";
 if(level===3)E("instruction").textContent="Skriv det inverterade talet.";
 if(level===4)E("instruction").textContent="Använd det inverterade talet när du räknar. Du kan visa dina mellanled i kladdytan.";
 if(level===5)E("instruction").textContent="Läs textuppgiften och avgör vilken beräkning som behövs. Visa din uträkning i kladdytan. Skriv sedan ditt svar i svarsrutan.";
 setTimeout(()=>E("answer").focus(),0)}
function check(){let r=parse(E("answer").value),q=qs[pos];if(!r){E("feedback").textContent="Skriv svaret som ett heltal, ett bråk eller i blandad form.";return}E("answer").disabled=true;E("check").disabled=true;if(key(r)===key(q.right)){points++;E("feedback").textContent="✅ Rätt!"}else{E("feedback").innerHTML=`❌ Rätt svar: ${V(q.right)}`;E("solution").innerHTML=q.solution}E("score").textContent=`Rätt: ${points}`;E("next").classList.remove("hidden")}
function next(){if(++pos>=TOTAL){E("game").classList.add("hidden");E("result").classList.remove("hidden");E("final").textContent=`${points} av ${TOTAL} rätt`}else show()}
function home(){E("game").classList.add("hidden");E("result").classList.add("hidden");E("menu").classList.remove("hidden")}
document.querySelectorAll("[data-level]").forEach(b=>b.addEventListener("click",()=>start(+b.dataset.level)));E("check").addEventListener("click",check);E("answer").addEventListener("keydown",e=>{if(e.key==="Enter"&&!E("check").disabled)check()});E("next").addEventListener("click",next);E("home").addEventListener("click",home);E("resultHome").addEventListener("click",home);E("again").addEventListener("click",()=>start(level));
})();