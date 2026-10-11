const ALLOWED = new Set(['https://rusetiq.dev','https://www.rusetiq.dev','https://rusetiq.github.io','https://quiet-portfolio-1010.rusetiq.chatgpt.site','http://127.0.0.1:4173','http://localhost:4173']);
const INKS = new Set(['#e0dfd5','#b6c5a5','#c9b88d']);
const encoder = new TextEncoder();
async function hash(value) { return [...new Uint8Array(await crypto.subtle.digest('SHA-256',encoder.encode(value)))].map(x=>x.toString(16).padStart(2,'0')).join(''); }
function response(data,status,origin) { return new Response(JSON.stringify(data), {status,headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Access-Control-Allow-Origin':origin||'https://rusetiq.dev','Vary':'Origin'}}); }
export function validateEntry(data) {
  if (!data || typeof data!=='object' || data.website) throw new Error('please try again.');
  const name=typeof data.name==='string'?data.name.trim().toLowerCase():'';
  const message=typeof data.message==='string'?data.message.trim().toLowerCase():'';
  if (!name || name.length>32 || message.length>120) throw new Error('a name (up to 32 characters) and a short note, please.');
  if (!INKS.has(data.ink)) throw new Error('choose an ink color.');
  let drawing;
  if (typeof data.drawing?.typed==='string') {
    const typed=data.drawing.typed.trim().toLowerCase();if(!typed||typed.length>32)throw new Error('add your signature.');drawing={typed};
  } else {
    const strokes=data.drawing?.strokes;
    if(!Array.isArray(strokes)||!strokes.length||strokes.length>80)throw new Error('draw your signature first.');
    let points=0;
    const clean=strokes.map(s=>{
      if(!Array.isArray(s)||!s.length)throw new Error('invalid signature.');points+=s.length;
      return s.map(p=>{if(!Array.isArray(p)||p.length!==3||p.some(x=>!Number.isFinite(x))||p[0]<0||p[0]>1||p[1]<0||p[1]>1||p[2]<0||p[2]>1)throw new Error('invalid signature.');return p.map(x=>Math.round(x*10000)/10000)});
    });
    if(points<3||points>2200)throw new Error('keep your signature short.');drawing={strokes:clean};
  }
  return {name,message,drawing,ink:data.ink};
}
export default {
 async fetch(request,env) {
  const origin=request.headers.get('Origin');const url=new URL(request.url);
  if(origin&&!ALLOWED.has(origin))return response({error:'this guestbook lives on rusetiq.dev.'},403,null);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{'Access-Control-Allow-Origin':origin||'https://rusetiq.dev','Access-Control-Allow-Methods':'GET, POST, DELETE, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Access-Control-Max-Age':'86400','Vary':'Origin'}});
  if(url.pathname!=='/entries')return response({error:'not found.'},404,origin);
  try {
   if(request.method==='GET') {
    const limit=Math.min(24,Math.max(1,Number(url.searchParams.get('limit'))||6));const offset=Math.min(10000,Math.max(0,Number(url.searchParams.get('offset'))||0));
    const [rows,count]=await env.DB.batch([env.DB.prepare('SELECT id,name,message,drawing,ink,created_at FROM signatures ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?').bind(limit,offset),env.DB.prepare('SELECT COUNT(*) AS total FROM signatures')]);
    const total=count.results[0].total;return response({entries:rows.results.map(r=>({...r,drawing:JSON.parse(r.drawing)})),total,next:offset+rows.results.length<total?offset+rows.results.length:null},200,origin);
   }
   if(!origin||!ALLOWED.has(origin))return response({error:'open the guestbook on rusetiq.dev to sign.'},403,origin);
   if(!request.headers.get('Content-Type')?.includes('application/json'))return response({error:'json required.'},415,origin);
   if(Number(request.headers.get('Content-Length'))>60000)return response({error:'signature is too large.'},413,origin);
   const raw=await request.text();if(raw.length>60000)return response({error:'signature is too large.'},413,origin);
   let data;try{data=JSON.parse(raw)}catch{return response({error:'invalid request.'},400,origin)}
   if(request.method==='POST') {
    let entry;try{entry=validateEntry(data)}catch(e){return response({error:e.message},400,origin)}
    const rateKey=await hash((env.RATE_SECRET||'local-preview')+':'+(request.headers.get('CF-Connecting-IP')||'local'));
    const recent=await env.DB.prepare('SELECT COUNT(*) AS total, MAX(created_at) AS latest FROM signatures WHERE rate_key=? AND created_at>?').bind(rateKey,Date.now()-86400000).first();
    if(recent.total>=6||(recent.latest&&Date.now()-recent.latest<60000))return response({error:'give the ink a minute to dry. try again soon.'},429,origin);
    const id=crypto.randomUUID(),deleteToken=crypto.randomUUID()+crypto.randomUUID();const timestamp=Date.now();
    await env.DB.prepare('INSERT INTO signatures (id,name,message,drawing,ink,created_at,delete_hash,rate_key) VALUES (?,?,?,?,?,?,?,?)').bind(id,entry.name,entry.message,JSON.stringify(entry.drawing),entry.ink,timestamp,await hash(deleteToken),rateKey).run();
    return response({entry:{id,...entry,created_at:timestamp},deleteToken},201,origin);
   }
   if(request.method==='DELETE') {
    if(typeof data.id!=='string'||typeof data.deleteToken!=='string'||data.deleteToken.length>100)return response({error:'invalid removal request.'},400,origin);
    const result=await env.DB.prepare('DELETE FROM signatures WHERE id=? AND delete_hash=?').bind(data.id,await hash(data.deleteToken)).run();
    return result.meta.changes?response({ok:true},200,origin):response({error:'you can only remove your own signature.'},403,origin);
   }
   return response({error:'method not allowed.'},405,origin);
  } catch {return response({error:'the guestbook is resting. please try again in a moment.'},503,origin)}
 }
};
