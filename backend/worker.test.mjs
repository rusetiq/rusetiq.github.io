import test from 'node:test';import assert from 'node:assert/strict';import {validateEntry} from './worker.mjs';
const valid={name:'  Visitor ',message:'Nice work!',ink:'#e0dfd5',drawing:{strokes:[[[.1,.2,.5],[.2,.4,.5],[.3,.3,.5]]]}};
test('normalizes a drawn signature and preserves coordinates',()=>{const e=validateEntry(valid);assert.equal(e.name,'visitor');assert.equal(e.message,'nice work!');assert.deepEqual(e.drawing,valid.drawing)});
test('rejects malformed and oversized drawing input',()=>{for(const drawing of [{strokes:[]},{strokes:[[[Infinity,.2,.5]]]},{strokes:[[[2,.2,.5]]]},{strokes:[Array(2201).fill([.1,.2,.5])]}])assert.throws(()=>validateEntry({...valid,drawing}))});
test('supports an accessible typed signature',()=>assert.deepEqual(validateEntry({...valid,drawing:{typed:'  VIsitor '}}).drawing,{typed:'visitor'}));
test('bounds public content and rejects honeypot submissions',()=>{assert.throws(()=>validateEntry({...valid,name:'x'.repeat(33)}));assert.throws(()=>validateEntry({...valid,message:'x'.repeat(121)}));assert.throws(()=>validateEntry({...valid,website:'bot'}))});
