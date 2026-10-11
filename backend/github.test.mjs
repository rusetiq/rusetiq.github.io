import test from 'node:test';import assert from 'node:assert/strict';import {parseDay} from './github.mjs';import {validateEntry} from './worker.mjs';
test('daily activity ignores repos outside the timeline and associates commit links',()=>{
 const html='<a href="/example/noise" data-hovercard-type="repository">noise</a><div id="js-contribution-activity"><a data-hovercard-type="repository" href="/rusetiq/rusetiq.github.io">repo</a><a data-hydro-click="TIMELINE_COMMIT_RANGE" href="/rusetiq/rusetiq.github.io/commits?author=rusetiq&amp;since=2026-10-11">9 commits</a></div>';
 const x=parseDay(html,'2026-10-11');assert.equal(x.repos.length,1);assert.equal(x.repos[0].activity,'9 commits');assert.match(x.repos[0].url,/&since=/);assert.throws(()=>parseDay('blocked','2026-10-11'));
});
const pixels={size:8,palette:['#B9D7EE'],cells:Array(64).fill(-1)};pixels.cells[0]=0;
const base={name:'visitor',message:'pixels',ink:'#e0dfd5',drawing:{pixels}};
test('accepts bounded pixel artwork without changing shared guestbook persistence',()=>assert.equal(validateEntry(base).drawing.pixels.palette[0],'#b9d7ee'));
test('rejects malformed, blank, oversized, or unsafe pixel artwork',()=>{for(const p of [{...pixels,size:100},{...pixels,cells:Array(64).fill(-1)},{...pixels,cells:Array(64).fill(3)},{...pixels,palette:['url(x)']}])assert.throws(()=>validateEntry({...base,drawing:{pixels:p}}))});
