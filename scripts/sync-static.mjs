import {readFile,writeFile,copyFile,mkdir,readdir,unlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dist=new URL('../dist/',import.meta.url);const root=new URL('../',import.meta.url);let html=await readFile(new URL('index.html',dist),'utf8');
for(const [base,extension] of [['app','js'],['style','css']]){
  const data=await readFile(new URL(`${base}.${extension}`,dist));
  const digest=createHash('sha256').update(data).digest('hex').slice(0,10);
  const name=`${base}.${digest}.${extension}`;
  await writeFile(new URL(name,dist),data);await writeFile(new URL(name,root),data);
  html=html.replace(new RegExp(`${base}(?:\\.[a-f0-9]{10})?\\.${extension}(?:\\?[^\"']*)?`,'g'),name);
  for(const dir of [dist,root])for(const filename of await readdir(dir))if(new RegExp(`^${base}\\.[a-f0-9]{10}\\.${extension}$`).test(filename)&&filename!==name)await unlink(new URL(filename,dir));
}
await writeFile(new URL('index.html',dist),html);await writeFile(new URL('index.html',root),html);
for(const filename of ['app.js','style.css'])await copyFile(new URL(filename,dist),new URL(filename,root));
await mkdir(new URL('assets/',root),{recursive:true});for(const filename of await readdir(new URL('assets/',dist)))await copyFile(new URL(`assets/${filename}`,dist),new URL(`assets/${filename}`,root));
console.log('Static files synchronized with content-versioned URLs.');
