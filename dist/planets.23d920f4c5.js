(function(){
const stage=document.querySelector('.planet-scene'),canvas=document.querySelector('#planet-canvas');if(!stage||!canvas)return;
const ctx=canvas.getContext('2d'),reduce=matchMedia('(prefers-reduced-motion: reduce)');
const initial=[{name:'saturn',x:.57,y:.51,r:.185,color:[218,156,104],ring:true},{name:'neptune',x:.23,y:.28,r:.115,color:[126,186,220]},{name:'mars',x:.83,y:.22,r:.057,color:[215,130,101]},{name:'europa',x:.83,y:.76,r:.044,color:[181,199,216]}];
let w=620,h=290,drag=null,visible=true,frame=0,last=0,pointer={x:0,y:0};const planets=initial.map(p=>({...p,vx:0,vy:0}));
function texture(p){
  const size=512,c=document.createElement('canvas');c.width=c.height=size;
  const c2=c.getContext('2d'),im=c2.createImageData(size,size);
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
    const u=(x-size/2)/(size/2-2),v=(y-size/2)/(size/2-2),d=u*u+v*v;
    if(d>1)continue;
    const z=Math.sqrt(1-d);
    const dot=-u*0.50-v*0.55+z*0.67;
    const term=1/(1+Math.exp(-13*(dot-0.08)));
    const ambient=0.16+0.04*(-u*0.2+z*0.3);
    const shade=ambient+term*(0.08+0.92*Math.max(0,dot));
    const rim=Math.pow(1-z,2.6)*Math.max(0,-u*0.50-v*0.55+0.32)*0.48+Math.pow(1-z,3.2)*0.18;
    const lat=Math.asin(Math.max(-1,Math.min(1,v))),lon=Math.atan2(u,z);
    let r,g,b,rimCol;
    if(p.name==='saturn'){
      const b1=Math.sin(lat*32+Math.sin(lon*2+lat*3)*0.15)*0.14;
      const b2=Math.sin(lat*70+Math.cos(lon*3)*0.1)*0.06;
      const b3=Math.sin(lat*14)*0.16;
      const band=b1+b2+b3;
      r=230+band*30;g=190+band*26;b=142+band*20;
      if(Math.abs(lat)>1.05){const pol=(Math.abs(lat)-1.05)/0.5;r-=pol*35;g-=pol*30;b-=pol*18}
      rimCol=[255,235,200];
    }else if(p.name==='neptune'){
      const b1=Math.sin(lat*24+Math.sin(lon*2.5)*0.3)*0.15;
      const b2=Math.sin(lat*52)*0.08;
      const cirrus=Math.pow(Math.max(0,Math.sin(lat*38+lon*2)),5)*0.45;
      const dSpot=Math.sqrt(Math.pow((lon+0.2)*1.6,2)+Math.pow((lat+0.2)*3.2,2));
      const spot=dSpot<0.4?Math.max(0,1-dSpot/0.4)*0.4:0;
      r=65+b1*15+cirrus*130-spot*30;
      g=135+b1*25+b2*15+cirrus*100-spot*25;
      b=232+b1*20+cirrus*25-spot*15;
      rimCol=[140,220,255];
    }else if(p.name==='mars'){
      const n1=Math.sin(lon*3.5+lat*2.2)*Math.cos(lat*3-lon*1.8);
      const n2=Math.sin(lon*7.5-lat*4)*Math.cos(lon*4.2+lat*6)*0.5;
      const terrain=n1+n2;
      const isCap=lat<-1.1+Math.sin(lon*5)*0.07;
      if(isCap){r=245;g=243;b=248}
      else if(terrain>0.15){const dark=Math.min(1,(terrain-0.15)*1.3);r=160-dark*60;g=85-dark*35;b=65-dark*25}
      else{r=218-terrain*20;g=125-terrain*15;b=90-terrain*10}
      rimCol=[245,180,150];
    }else{
      const l1=Math.abs(Math.sin(lon*3.5+Math.sin(lat*4)*1.2+lat*2));
      const l2=Math.abs(Math.sin(lon*5-Math.cos(lat*3.5)*1.5-lat*5+0.8));
      const l3=Math.abs(Math.sin(lon*8+lat*6-1.2));
      const line=Math.min(l1,Math.min(l2,l3));
      const isLine=line<0.13;
      const mottle=Math.sin(lon*11+lat*9)*0.08;
      if(isLine){const depth=(0.13-line)/0.13;r=200-depth*55;g=175-depth*65;b=155-depth*65}
      else{r=228+mottle*15;g=234+mottle*15;b=240+mottle*15}
      rimCol=[220,235,255];
    }
    const idx=(y*size+x)*4;
    im.data[idx]=Math.max(0,Math.min(255,r*shade+rim*rimCol[0]));
    im.data[idx+1]=Math.max(0,Math.min(255,g*shade+rim*rimCol[1]));
    im.data[idx+2]=Math.max(0,Math.min(255,b*shade+rim*rimCol[2]));
    im.data[idx+3]=Math.max(0,Math.min(255,(1-Math.sqrt(d))*(size/2)*255));
  }
  c2.putImageData(im,0,0);
  return c;
}
planets.forEach((p,i)=>{p.texture=texture(p);const b=document.createElement('button');b.className='planet-control';b.type='button';b.setAttribute('aria-label',`move ${p.name}. drag or use arrow keys.`);b.dataset.planet=p.name;b.dataset.tooltip=p.name;b.title=p.name+' · drag to move';document.querySelector('#planet-controls').append(b);p.button=b;b.addEventListener('pointerdown',e=>{if(e.button!==0)return;e.preventDefault();b.setPointerCapture(e.pointerId);const r=stage.getBoundingClientRect();drag={p,id:e.pointerId,x:e.clientX-r.left,y:e.clientY-r.top,dx:p.x*w-(e.clientX-r.left),dy:p.y*h-(e.clientY-r.top)};p.vx=p.vy=0;b.classList.add('dragging');draw(performance.now())});b.addEventListener('pointermove',e=>{if(!drag||drag.p!==p)return;const r=stage.getBoundingClientRect(),nx=(e.clientX-r.left+drag.dx)/w,ny=(e.clientY-r.top+drag.dy)/h;p.vx=(nx-p.x)*.45;p.vy=(ny-p.y)*.45;p.x=nx;p.y=ny;clamp(p);canvas.dataset.moved=String(Number(canvas.dataset.moved||0)+1);draw(performance.now())});function end(e){if(!drag||drag.p!==p)return;drag=null;b.classList.remove('dragging');if(b.hasPointerCapture(e.pointerId))b.releasePointerCapture(e.pointerId);if(typeof playSound==='function')playSound('click');start()}b.addEventListener('pointerup',end);b.addEventListener('pointercancel',end);b.addEventListener('keydown',e=>{const steps={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(steps[e.key]){e.preventDefault();const step=e.shiftKey?15:5;p.x+=steps[e.key][0]*step/w;p.y+=steps[e.key][1]*step/h;p.vx=p.vy=0;clamp(p);canvas.dataset.moved=String(Number(canvas.dataset.moved||0)+1);draw(performance.now())}if(e.key==='Enter'||e.key===' '){e.preventDefault();if(typeof playSound==='function')playSound('click')}})});
function clamp(p){const rx=p.r*h/w*(p.ring?1.6:1),ry=p.r*.8;p.x=Math.max(rx+.02,Math.min(1-rx-.02,p.x));p.y=Math.max(ry+.03,Math.min(1-ry-.03,p.y))}
function ring(p,front){
  const x=p.x*w,y=p.y*h,r=p.r*h;
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(-.36);
  ctx.scale(1,.32);
  const startAngle=front?0:Math.PI,endAngle=front?Math.PI:Math.PI*2;
  // C Ring (inner dusky crepe ring)
  ctx.save();ctx.beginPath();ctx.arc(0,0,r*1.32,startAngle,endAngle);ctx.strokeStyle='#6e5642';ctx.lineWidth=r*0.16;ctx.globalAlpha=front?.45:.28;ctx.stroke();ctx.restore();
  // B Ring (main dense golden-cream ring)
  ctx.save();const gradB=ctx.createLinearGradient(-r*1.9,0,r*1.9,0);gradB.addColorStop(0,'#a57e5a');gradB.addColorStop(.3,'#f2d7b8');gradB.addColorStop(.7,'#edd2b0');gradB.addColorStop(1,'#8f6e52');ctx.beginPath();ctx.arc(0,0,r*1.68,startAngle,endAngle);ctx.strokeStyle=gradB;ctx.lineWidth=r*0.36;ctx.globalAlpha=front?.95:.65;ctx.stroke();ctx.restore();
  // A Ring (outer ring)
  ctx.save();const gradA=ctx.createLinearGradient(-r*2.2,0,r*2.2,0);gradA.addColorStop(0,'#987557');gradA.addColorStop(.5,'#dcbe9c');gradA.addColorStop(1,'#785b46');ctx.beginPath();ctx.arc(0,0,r*2.08,startAngle,endAngle);ctx.strokeStyle=gradA;ctx.lineWidth=r*0.22;ctx.globalAlpha=front?.85:.55;ctx.stroke();ctx.restore();
  // Cassini & fine divisions
  ctx.save();ctx.strokeStyle='#191919';ctx.lineWidth=Math.max(1,r*0.024);ctx.globalAlpha=front?.9:.6;ctx.beginPath();ctx.arc(0,0,r*1.89,startAngle,endAngle);ctx.stroke();ctx.beginPath();ctx.arc(0,0,r*2.12,startAngle,endAngle);ctx.stroke();ctx.beginPath();ctx.arc(0,0,r*1.52,startAngle,endAngle);ctx.stroke();ctx.restore();
  // Planet shadow on back ring
  if(!front){ctx.save();ctx.globalAlpha=.85;ctx.fillStyle='#141414';ctx.beginPath();ctx.arc(0,0,r*2.25,Math.PI*1.52,Math.PI*1.82);ctx.arc(0,0,r*1.22,Math.PI*1.82,Math.PI*1.52,true);ctx.closePath();ctx.fill();ctx.restore()}
  ctx.restore();
}
function draw(now=0){ctx.clearRect(0,0,w,h);const time=reduce.matches?0:now*.00015;ctx.fillStyle='#191919';ctx.fillRect(0,0,w,h);const aura=ctx.createRadialGradient(w*.55,h*.47,0,w*.55,h*.47,w*.5);aura.addColorStop(0,'#a3bdcc09');aura.addColorStop(1,'#19191900');ctx.fillStyle=aura;ctx.fillRect(0,0,w,h);
for(let i=0;i<68;i++){const x=(Math.sin(i*93.91)*43758.55)%1,y=(Math.cos(i*34.7)*2589.4)%1;const brightness=.12+(Math.sin(time+i)*.5+.5)*.28;ctx.fillStyle=`rgba(198,209,224,${brightness})`;ctx.beginPath();ctx.arc(Math.abs(x)*w+pointer.x*2,Math.abs(y)*h+pointer.y*2,i%13===0?1.2:.6,0,Math.PI*2);ctx.fill()}
ctx.save();ctx.translate(w*.53,h*.51);ctx.rotate(-.27);ctx.strokeStyle='#cbd5de0b';ctx.lineWidth=.8;for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(0,0,w*(.22+i*.105),h*(.14+i*.08),0,0,Math.PI*2);ctx.stroke()}ctx.restore();
planets.forEach(p=>{if(!drag||drag.p!==p){if(!reduce.matches){p.x+=p.vx;p.y+=p.vy;p.vx*=.92;p.vy*=.92;clamp(p)}}const x=p.x*w,y=p.y*h,r=p.r*h;if(p.ring)ring(p,false);const glow=ctx.createRadialGradient(x,y,r*.88,x,y,r*1.35);glow.addColorStop(0,`rgba(${p.color.join(',')},0.12)`);glow.addColorStop(0.5,`rgba(${p.color.join(',')},0.04)`);glow.addColorStop(1,`rgba(${p.color.join(',')},0)`);ctx.fillStyle=glow;ctx.fillRect(x-r*1.4,y-r*1.4,r*2.8,r*2.8);ctx.drawImage(p.texture,x-r,y-r,r*2,r*2);if(p.ring){ctx.save();ctx.translate(x,y);ctx.rotate(-.36);ctx.scale(1,.32);ctx.beginPath();ctx.arc(0,-r*0.16,r*1.01,0.1,Math.PI-0.1);ctx.strokeStyle='rgba(16,14,12,0.58)';ctx.lineWidth=r*0.18;ctx.stroke();ctx.restore();ring(p,true)}const b=p.button;b.style.left=(p.x*100)+'%';b.style.top=(p.y*100)+'%';b.style.width=b.style.height=r*2+'px';b.dataset.x=p.x.toFixed(4);b.dataset.y=p.y.toFixed(4)});
canvas.dataset.renderer='canvas-planets';}
function resize(){const r=stage.getBoundingClientRect();w=r.width;h=r.height;const dpr=Math.min(2,devicePixelRatio||1);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw(performance.now())}
function tick(now){frame=0;if(!visible||document.hidden||reduce.matches)return;if(now-last>32){draw(now);last=now}frame=requestAnimationFrame(tick)}function start(){if(!frame&&visible&&!document.hidden&&!reduce.matches)frame=requestAnimationFrame(tick)}
new ResizeObserver(resize).observe(stage);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible&&frame){cancelAnimationFrame(frame);frame=0}else start()}).observe(stage);document.addEventListener('visibilitychange',()=>{if(document.hidden&&frame){cancelAnimationFrame(frame);frame=0}else start()});reduce.addEventListener('change',()=>{if(reduce.matches&&frame){cancelAnimationFrame(frame);frame=0}draw(performance.now());start()});stage.addEventListener('pointermove',e=>{const r=stage.getBoundingClientRect();pointer={x:(e.clientX-r.left)/w-.5,y:(e.clientY-r.top)/h-.5}});stage.addEventListener('pointerleave',()=>pointer={x:0,y:0});document.querySelector('#reset-planets').onclick=()=>{planets.forEach((p,i)=>{p.x=initial[i].x;p.y=initial[i].y;p.vx=p.vy=0});draw(performance.now())};resize();start();
})();
