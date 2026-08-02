// The content doctrine enforcer. Run with: npx tsx test-content.ts
//
// 1. TRUE: every shipped answer hash matches solutions.spoilers.ts.
// 2. PLAYABLE: simulating a player who solves whatever is attackable,
//    Act I (pages 1-9) completes and yields W1-W7 + RAKING + UV.
// 3. DECLARED: every answerable page states its format (rule 8) and its
//    restored passage (rule 13's payoff).
// 4. LIT: an instrument layer only appears on a page that consumes that
//    instrument — content never renders from a light the graph doesn't gate.
// 5. SELF-CONTAINED: pages that consume word keys hold their locks visibly;
//    every content page's consumed keys are produced by content pages
//    (no Act I dead ends into untranscribed pages).
// 6. SEALED: nothing under src/ imports the spoilers file.

// @ts-expect-error node builtins have no types under Expo's tsconfig; tsx runs it fine
import assert from 'node:assert/strict';
// @ts-expect-error same
import { readdirSync, readFileSync, statSync } from 'node:fs';
// @ts-expect-error same
import { join } from 'node:path';

import { KEYS, keyLabel, PAGES } from './src/content/unwriting/graph';
import { PAGE_CONTENT } from './src/content/unwriting/pages';
import { pageHash } from './src/engine/hash';
import { isAttackable } from './src/engine/graph';
import type { KeyId } from './src/models';
import { PAGE_SOLUTIONS } from './solutions.spoilers';

const contentIds = new Set(PAGE_CONTENT.map((p) => p.id));

// 1. TRUE
for (const c of PAGE_CONTENT) {
  if (!c.answer) continue;
  const truth = PAGE_SOLUTIONS[c.id];
  assert.ok(truth, `spoilers entry for page ${c.id}`);
  assert.equal(
    c.answer.hash,
    pageHash(c.id, truth),
    `page ${c.id}: shipped hash matches spoilers (re-run scripts/hash_solutions.ts)`,
  );
}
for (const id of Object.keys(PAGE_SOLUTIONS).map(Number))
  assert.ok(contentIds.has(id), `spoilers page ${id} has shipped content`);

// 2. PLAYABLE — fixpoint over content pages only
const earned = new Set<KeyId>();
const solved = new Set<number>();
let moved = true;
while (moved) {
  moved = false;
  for (const p of PAGES) {
    if (solved.has(p.id) || !contentIds.has(p.id)) continue;
    if (!isAttackable(p, earned)) continue;
    solved.add(p.id);
    for (const k of p.produces) earned.add(k);
    moved = true;
  }
}
for (let id = 1; id <= 9; id += 1) assert.ok(solved.has(id), `Act I page ${id} solvable`);
for (const k of ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'RAKING', 'UV'] as KeyId[])
  assert.ok(earned.has(k), `Act I playthrough earns ${k} (${KEYS[k].label})`);

// 3. DECLARED
for (const c of PAGE_CONTENT) {
  assert.ok(c.restored.length > 0, `page ${c.id}: restored passage present`);
  if (c.answer) assert.ok(c.answer.format.length > 0, `page ${c.id}: format declared`);
}

// 4. LIT — an instrument layer belongs to a page that consumes that
// instrument (puzzle content) or produces it (the unlock's own reveal).
const INSTRUMENT_OF = { raking: 'RAKING', uv: 'UV', spectral: 'SPECTRAL' } as const;
for (const c of PAGE_CONTENT) {
  const page = PAGES.find((p) => p.id === c.id)!;
  for (const layer of c.layers) {
    const inst = INSTRUMENT_OF[layer.light as keyof typeof INSTRUMENT_OF];
    if (inst)
      assert.ok(
        page.consumes.includes(inst) || page.produces.includes(inst),
        `page ${c.id}: ${layer.light} layer gated`,
      );
  }
}

// 5. SELF-CONTAINED
const producerPage = new Map<string, number>();
for (const p of PAGES) for (const k of p.produces) producerPage.set(k, p.id);
for (const c of PAGE_CONTENT) {
  const page = PAGES.find((p) => p.id === c.id)!;
  for (const k of page.consumes)
    assert.ok(
      contentIds.has(producerPage.get(k)!),
      `page ${c.id} consumes ${k}, produced by a transcribed page`,
    );
}

// 6. SEALED
function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|tsx)$/.test(name)) out.push(p);
  }
  return out;
}
// 7. MASKED: with nothing earned, no key's UI label leaks an answer — word,
// letter, and seal keys mask to their producing page (caught live on device
// 2026-08-01: the bench printed "needs 1961" before page 01 was solved).
const nothingEarned = new Set<never>();
for (const k of Object.keys(KEYS) as (keyof typeof KEYS)[]) {
  const label = keyLabel(k, nothingEarned);
  if (KEYS[k].kind === 'instrument') assert.equal(label, KEYS[k].label);
  else {
    assert.match(label, /^key · p\d\d$/, `${k}: unearned label is masked`);
    assert.notEqual(label, KEYS[k].label, `${k}: unearned label hides the value`);
  }
}
for (const [id, answer] of Object.entries(PAGE_SOLUTIONS)) {
  for (const k of Object.keys(KEYS) as (keyof typeof KEYS)[])
    assert.ok(
      !keyLabel(k, nothingEarned).includes(answer),
      `page ${id} answer never appears in an unearned key label`,
    );
}

// 8. NOT ENUMERABLE: no substantial word of a page's answer appears
// verbatim in that page's own scan content — otherwise the answer can be
// brute-forced from the page's visible inventory (caught live 2026-08-02:
// LARKSPUR sat among p09's own flower doodles, making "14 <each flower>"
// an eight-guess solve). Short numeric parts (house numbers, tick values)
// are exempt: they are legitimately derived data.
for (const c of PAGE_CONTENT) {
  const truth = PAGE_SOLUTIONS[c.id];
  if (!truth) continue;
  const words = truth.split(' ').filter((w) => /^[A-Z]{5,}$/.test(w));
  const haystack = c.layers
    .flatMap((l) => l.blocks)
    .flatMap((b) => [b.text ?? '', ...(b.rows ?? []).flat()])
    .join('\n')
    .toUpperCase();
  for (const w of words)
    assert.ok(
      !haystack.includes(w),
      `page ${c.id}: answer word "${w}" must not appear in the page's own scan content`,
    );
}

const IMPORTS_SPOILERS = /(?:from\s+['"]|require\(\s*['"])[^'"]*solutions\.spoilers/;
for (const file of walk('src'))
  assert.ok(
    !IMPORTS_SPOILERS.test(readFileSync(file, 'utf8')),
    `${file} must not import the spoilers file`,
  );

console.log('test-content: ok');
