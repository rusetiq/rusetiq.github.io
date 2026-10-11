const HEADERS={'User-Agent':'rusetiq-portfolio/2.0','Accept-Language':'en'};
const fields=['name','full_name','description','html_url','language','stargazers_count','fork','archived','updated_at'];
export function parseDay(html,date){
 const start=html.indexOf('id="js-contribution-activity"');if(start<0)throw new Error('github activity markup unavailable');
 const activity=html.slice(start),repos=new Map();
 for(const match of activity.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)){
  const href=match[1].match(/\bhref="([^"]+)"/)?.[1]?.replaceAll('&amp;','&');if(!href)continue;
  const parts=href.match(/^\/([\w.-]+\/[^/?#]+)(?:\/commits\?|\/pull\/|\/issues\/|$)/);if(!parts)continue;
  const name=parts[1];if(!match[1].includes('TIMELINE_')&&!match[1].includes('data-hovercard-type="repository"'))continue;
  if(!repos.has(name))repos.set(name,{name,url:'https://github.com/'+name,activity:'public activity'});
  const text=match[2].replace(/<[^>]*>/g,'').trim().replace(/\s+/g,' ');
  if(/commits?/.test(text)&&text.length<50){repos.get(name).activity=text;repos.get(name).url='https://github.com'+href}
 }
 return {date,repos:[...repos.values()],source:`https://github.com/rusetiq?tab=overview&from=${date}&to=${date}`};
}
export async function githubData(request,origin,ctx){
 const url=new URL(request.url);if(request.method!=='GET')return new Response(null,{status:405});
 let date=url.searchParams.get('date');
 if(url.pathname==='/github-day'&&(!date||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date||date<'2008-01-01'||date>new Date().toISOString().slice(0,10)))return new Response(JSON.stringify({error:'choose a valid day.'}),{status:400,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':origin||'https://rusetiq.dev'}});
 const key=new Request(url.origin+url.pathname+(url.pathname==='/github-day'?'?date='+date:''));
 const cache=typeof caches==='undefined'?null:caches.default;let result=cache?await cache.match(key):null;
 if(!result){
  let data;
  if(url.pathname==='/repos'){
   const repos=[];let page=1;
   while(page<=20){const r=await fetch(`https://api.github.com/users/rusetiq/repos?per_page=100&sort=updated&page=${page}`,{headers:{...HEADERS,Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(8000)});if(!r.ok)throw new Error('github unavailable');const rows=await r.json();repos.push(...rows.map(r=>Object.fromEntries(fields.map(k=>[k,r[k]]))));if(rows.length<100)break;page++}
   data={repos};
  }else if(url.pathname==='/readme'){
   const r=await fetch('https://api.github.com/repos/rusetiq/rusetiq/readme',{headers:{...HEADERS,Accept:'application/vnd.github.html+json'},signal:AbortSignal.timeout(8000)});if(!r.ok)throw new Error('readme unavailable');data={html:await r.text()};
  }else{
   const r=await fetch(`https://github.com/rusetiq?action=show&controller=profiles&from=${date}&tab=contributions&to=${date}&user_id=rusetiq`,{headers:{...HEADERS,'X-Requested-With':'XMLHttpRequest'},signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('activity unavailable');data=parseDay(await r.text(),date);
  }
  result=new Response(JSON.stringify(data),{headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=3600','X-Content-Type-Options':'nosniff'}});if(cache)ctx.waitUntil(cache.put(key,result.clone()));
 }
 const headers=new Headers(result.headers);headers.set('Access-Control-Allow-Origin',origin||'https://rusetiq.dev');headers.set('Vary','Origin');headers.set('Cache-Control','public, max-age=300');return new Response(result.body,{headers});
}
