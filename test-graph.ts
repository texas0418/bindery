// Run with: npx tsx test-graph.ts — proves the doctrine claims the design
// docs make about the Unwriting key graph. If a page edit breaks a claim,
// this fails before a player ever hits the wall.

// @ts-expect-error node builtins have no types under Expo's tsconfig; tsx runs it fine
import assert from 'node:assert/strict';

import { KEYS, PAGES } from './src/content/unwriting/graph';
import { layers, producers, reachable } from './src/engine/graph';
import { FULL_NAME, LETTER_SLOTS } from './src/models';

// ——— shape ———
assert.equal(PAGES.length, 28, '28 pages');
assert.equal(new Set(PAGES.map((p) => p.id)).size, 28, 'unique ids');
for (const p of PAGES) assert.ok(p.story.length > 0, `doctrine 13: page ${p.id} has a story sentence`);

// every key has exactly one producer (throws on duplicates), every consumed key exists
const prod = producers(PAGES);
for (const k of Object.keys(KEYS)) assert.ok(prod.has(k as never), `producer for ${k}`);
for (const p of PAGES)
  for (const k of p.consumes) assert.ok(prod.has(k), `page ${p.id} consumes known key ${k}`);

// ——— reachability + acyclicity ———
const all = reachable(PAGES);
assert.equal(all.size, 28, 'every page reachable');
const depth = layers(PAGES); // throws on cycles
assert.equal(Math.max(...depth.values()), 8, 'critical path is nine pages deep (layers 0..8)');

// ——— doctrine 10b: six roots, scattered (two sit mid/late book) ———
const roots = PAGES.filter((p) => p.consumes.length === 0).map((p) => p.id);
assert.deepEqual(roots, [1, 2, 3, 5, 11, 16], 'six roots incl. mid-book 11 and 16');

// ——— no hard walls: instrument-blocked player still solves 13 pages incl. seal 25 ———
const blocked = reachable(PAGES, new Set([4, 8, 17]));
assert.equal(blocked.size, 13, 'instrument-blocked frontier');
assert.ok(blocked.has(25), 'seal 25 crackable without instruments (deliberate)');

// ——— instruments are single-sourced tier bosses in a strict chain ———
assert.equal(prod.get('RAKING'), 4);
assert.equal(prod.get('UV'), 8);
assert.equal(prod.get('SPECTRAL'), 17);

// ——— the finale consumes the 13 letter KEYS + 4 seals (name string is useless) ———
const finale = PAGES.find((p) => p.id === 28)!;
assert.equal(finale.consumes.length, 17, 'p28: 4 seals + 13 letters');
assert.equal(finale.produces.length, 0, 'p28 is a choice, not a producer');

// ——— letter slots consistent with the name ———
assert.equal(FULL_NAME.length, 13);
for (const [id, slot] of Object.entries(LETTER_SLOTS)) {
  if (!slot) continue;
  assert.equal(
    FULL_NAME[slot.slot - 1],
    slot.letter,
    `${id}: slot ${slot.slot} of ${FULL_NAME} is ${slot.letter}`,
  );
}

// ——— doctrine 18: mechanisms unique outside sanctioned chains A + B ———
const CHAIN_OK = new Set(['delta collation', 'alignment']); // chain B; chain A (both plates align)
const mechRoot = (m: string): string =>
  m.includes('delta collation') ? 'delta collation' : m.includes('alignment') ? 'alignment' : m;
const counts = new Map<string, number>();
for (const p of PAGES) {
  const root = mechRoot(p.mech);
  counts.set(root, (counts.get(root) ?? 0) + 1);
}
for (const [mech, n] of counts)
  if (n > 1) assert.ok(CHAIN_OK.has(mech), `mechanism "${mech}" repeats outside sanctioned chains`);

console.log('test-graph: ok');
