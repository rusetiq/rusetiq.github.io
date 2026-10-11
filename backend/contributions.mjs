// Read only calendar cells and numeric tooltips from GitHub's public profile.
export function parseCalendar(html) {
  const attribute=(tag,name)=>tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`,'i'))?.[2];
  const counts=new Map();
  for(const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/gi)) {
    const id=attribute(match[1],'for'), count=match[2].replace(/<[^>]*>/g,'').trim().match(/^(No|[\d,]+)\s+contributions?\b/i);
    if(id&&count)counts.set(id,count[1].toLowerCase()==='no'?0:Number(count[1].replaceAll(',','')));
  }
  const days=new Map();
  for(const match of html.matchAll(/<td\b([^>]*)>/gi)) {
    const date=attribute(match[1],'data-date');if(!date)continue;
    const rawLevel=attribute(match[1],'data-level'),level=Number(rawLevel),count=counts.get(attribute(match[1],'id'));
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||rawLevel===undefined||!Number.isInteger(level)||level<0||level>4||!Number.isSafeInteger(count)||count<0)throw new Error('incomplete github calendar');
    if(days.has(date))throw new Error('duplicate github day');
    days.set(date,{date,count,level});
  }
  const sorted=[...days.values()].sort((a,b)=>a.date.localeCompare(b.date));
  if(!sorted.length)throw new Error('missing github calendar');
  return {username:'rusetiq',total:sorted.reduce((sum,day)=>sum+day.count,0),from:sorted[0].date,to:sorted.at(-1).date,days:sorted};
}

export async function getContributions(request,origin,ctx) {
  if(request.method!=='GET')return new Response(JSON.stringify({error:'method not allowed.'}),{status:405,headers:{'Content-Type':'application/json','Access-Control-Allow-Origin':origin||'https://rusetiq.dev','Vary':'Origin'}});
  const key=new Request(new URL('/contributions',request.url).toString());
  const cache=typeof caches!=='undefined'?caches.default:null;
  let result=cache?await cache.match(key):null;
  if(!result) {
    const upstream=await fetch('https://github.com/users/rusetiq/contributions',{headers:{'Accept':'text/html','Accept-Language':'en','User-Agent':'rusetiq-portfolio/1.0'},signal:AbortSignal.timeout(8000)});
    if(!upstream.ok)throw new Error('github unavailable');
    const html=await upstream.text();if(html.length>1500000)throw new Error('oversized github calendar');
    const calendar=parseCalendar(html);
    if(calendar.days.length<350||calendar.days.length>371)throw new Error('incomplete github year');
    result=new Response(JSON.stringify({...calendar,updated_at:new Date().toISOString()}),{headers:{'Content-Type':'application/json; charset=utf-8','Cache-Control':'public, max-age=3600','X-Content-Type-Options':'nosniff'}});
    if(cache)ctx.waitUntil(cache.put(key,result.clone()));
  }
  const headers=new Headers(result.headers);
  headers.set('Access-Control-Allow-Origin',origin||'https://rusetiq.dev');headers.set('Vary','Origin');headers.set('Cache-Control','public, max-age=300');
  return new Response(result.body,{status:200,headers});
}
