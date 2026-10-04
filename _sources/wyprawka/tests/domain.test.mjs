import test from 'node:test';
import assert from 'node:assert/strict';
import { items, totals, photosFirst } from '../domain.ts';
test('budżet bez opcjonalnych uwzględnia ilości i obie nieopcjonalne grupy', () => {
  const base = items[0];
  assert.deepEqual(totals([
    {...base, cents:101, quantity:3, priority:'Na start'},
    {...base, cents:200, quantity:2, priority:'Na później', status:'bought'},
    {...base, cents:500, priority:'Opcjonalne'},
    {...base, cents:900, status:'excluded'},
    {...base, cents:1000, archived:true},
    {...base, cents:null},
  ]), {total:1203, withoutOptional:703, estimated:0, estimatedCount:0, missing:1});
});
test('produkty bez zdjęć trafiają na koniec przy zachowaniu kolejności', () => {
  const input = ['a','b','c','d'].map((id,index) => ({...items[0], id, image:index % 2 ? 'https://example.com/photo.jpg' : ''}));
  assert.deepEqual(photosFirst(input).map(item=>item.id), ['b','d','a','c']);
  assert.deepEqual(input.map(item=>item.id), ['a','b','c','d']);
});
