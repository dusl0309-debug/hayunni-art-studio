import { test } from 'node:test';import assert from 'node:assert/strict';
import { activitySchema,progress,curriculum } from '../lib/domain';
test('AI claims and photos never complete unverified steps',()=>{assert.ok(progress([{kind:'coach',text:'0'},{kind:'photo',text:'0'}]).every(s=>!s.done));assert.equal(progress([{kind:'confirmation',text:'0'}])[0].done,true);assert.equal(progress([{kind:'confirmation',text:'0'}])[1].done,false);});
test('reject invalid and excessive activities',()=>{assert.equal(activitySchema.safeParse({kind:'admin',text:'a'}).success,false);assert.equal(activitySchema.safeParse({kind:'message',text:' '}).success,false);assert.equal(activitySchema.safeParse({kind:'message',text:'a'.repeat(2001)}).success,false);});
test('curriculum uses optional interests without requiring historical artwork',()=>{assert.equal(curriculum([]).length,4);assert.match(curriculum([{kind:'idea',text:'바다'}])[0],/바다/);});

test('a new chosen idea starts unverified steps without erasing past records',()=>{assert.ok(progress([{kind:'idea',text:'first'},{kind:'confirmation',text:'0'},{kind:'idea',text:'new'}]).every(s=>!s.done));});
