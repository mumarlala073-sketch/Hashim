

// CURSOR
const cursor=document.getElementById('cursor'),ring=document.getElementById('cursor-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cursor.style.left=mx+'px';cursor.style.top=my+'px'});
(function animRing(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)})();
document.querySelectorAll('a,button,.btn,.btn-sm,.skill-card,.project-card,.service-card,.testi-card,.social-btn').forEach(el=>{
el.addEventListener('mouseenter',()=>{cursor.style.transform='translate(-50%,-50%) scale(2.5)';ring.style.width='60px';ring.style.height='60px'});
el.addEventListener('mouseleave',()=>{cursor.style.transform='translate(-50%,-50%) scale(1)';ring.style.width='36px';ring.style.height='36px'});
});

// SCROLL PROGRESS
window.addEventListener('scroll',()=>{
const p=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
document.getElementById('scroll-progress').style.width=p+'%';
const nav=document.getElementById('navbar');
nav.classList.toggle('scrolled',window.scrollY>50);
});

// LOADER
window.addEventListener('load',()=>{
setTimeout(()=>{document.getElementById('loader').classList.add('hidden')},2200);
});

// HAMBURGER
document.getElementById('hamburger').addEventListener('click',()=>{
document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>{
document.getElementById('navLinks').classList.remove('open');
}));

// PARTICLES
(function(){
const canvas=document.getElementById('particles-canvas');
const ctx=canvas.getContext('2d');
let W=canvas.width=window.innerWidth,H=canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight});
const NUM=80;
const particles=Array.from({length:NUM},()=>({
x:Math.random()*W,y:Math.random()*H,
vx:(Math.random()-0.5)*0.4,vy:(Math.random()-0.5)*0.4,
r:Math.random()*1.5+0.5,
color:`hsl(${Math.random()<0.5?195:270},100%,65%)`
}));
function draw(){
ctx.clearRect(0,0,W,H);
particles.forEach(p=>{
p.x+=p.vx;p.y+=p.vy;
if(p.x<0)p.x=W;if(p.x>W)p.x=0;
if(p.y<0)p.y=H;if(p.y>H)p.y=0;
ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
ctx.fillStyle=p.color;ctx.fill();
});
particles.forEach((a,i)=>{
particles.slice(i+1).forEach(b=>{
const d=Math.hypot(a.x-b.x,a.y-b.y);
if(d<120){
ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
ctx.strokeStyle=`rgba(0,212,255,${0.12*(1-d/120)})`;ctx.lineWidth=0.5;ctx.stroke();
}
});
});
requestAnimationFrame(draw);
}
draw();
})();

// TYPING ANIMATION
(function(){
const texts=["Turning ideas into beautiful websites.","Building responsive, fast web experiences.","Learning. Creating. Growing every day.","Future Full-Stack Developer in progress."];
let ti=0,ci=0,del=false;
const el=document.getElementById('typed-text');
function type(){
const t=texts[ti];
if(!del){
el.textContent=t.slice(0,++ci);
if(ci===t.length){del=true;setTimeout(type,2000);return}
}else{
el.textContent=t.slice(0,--ci);
if(ci===0){del=false;ti=(ti+1)%texts.length}
}
setTimeout(type,del?40:80);
}
setTimeout(type,2400);
})();

// REVEAL
const observer=new IntersectionObserver((entries)=>{
entries.forEach(e=>{
if(e.isIntersecting){
e.target.classList.add('visible');
// Animate skill bars
e.target.querySelectorAll('.skill-bar[data-width]').forEach(bar=>{
bar.style.width=bar.dataset.width+'%';
});
// Animate counters
e.target.querySelectorAll('[data-count]').forEach(el=>{
const target=+el.dataset.count;
let cur=0;
const inc=Math.ceil(target/60);
const timer=setInterval(()=>{
cur=Math.min(cur+inc,target);
el.textContent=cur;
if(cur>=target)clearInterval(timer);
},25);
});
}
});
},{threshold:0.15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// SEND BUTTON
document.getElementById('sendBtn').addEventListener('click',function(){
const inputs=document.querySelectorAll('.form-input,.form-textarea');
let valid=true;
inputs.forEach(i=>{if(!i.value.trim()){i.style.borderColor='rgba(236,72,153,0.6)';valid=false;}else{i.style.borderColor=''}});
if(valid){
this.textContent='✅ Message Sent!';
this.style.background='linear-gradient(135deg,#22c55e,#16a34a)';
setTimeout(()=>{
this.textContent='🚀 Send Message';
this.style.background='';
inputs.forEach(i=>{i.value='';i.style.borderColor=''});
},3000);
}
});
