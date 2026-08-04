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

import {
  DELIVERY_ALT_HASHES,
  DELIVERY_HASH,
  KEYS,
  keyLabel,
  PAGES,
} from './src/content/unwriting/graph';
import { PAGE_CONTENT } from './src/content/unwriting/pages';
import { pageHash } from './src/engine/hash';
import { isAttackable } from './src/engine/graph';
import type { KeyId } from './src/models';
import {
  DELIVERY_ALT_SOLUTIONS,
  DELIVERY_SOLUTION,
  PAGE_ALT_SOLUTIONS,
  PAGE_SOLUTIONS,
  PAGE_SOLUTIONS_ACT2,
  PAGE_SOLUTIONS_ACT3,
} from './solutions.spoilers';

const ALL_SOLUTIONS: Record<number, string> = {
  ...PAGE_SOLUTIONS,
  ...PAGE_SOLUTIONS_ACT2,
  ...PAGE_SOLUTIONS_ACT3,
};
const contentIds = new Set(PAGE_CONTENT.map((p) => p.id));

// 1. TRUE
for (const c of PAGE_CONTENT) {
  if (!c.answer) continue;
  const truth = ALL_SOLUTIONS[c.id];
  assert.ok(truth, `spoilers entry for page ${c.id}`);
  assert.equal(
    c.answer.hash,
    pageHash(c.id, truth),
    `page ${c.id}: shipped hash matches spoilers (re-run scripts/hash_solutions.ts)`,
  );
  assert.deepEqual(
    c.answer.alt ?? [],
    (PAGE_ALT_SOLUTIONS[c.id] ?? []).map((a) => pageHash(c.id, a)),
    `page ${c.id}: shipped alt hashes match spoilers' alternate phrasings`,
  );
}
for (const id of Object.keys(ALL_SOLUTIONS).map(Number))
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
for (let id = 1; id <= 27; id += 1) assert.ok(solved.has(id), `page ${id} solvable in playthrough`);
const EXPECTED: KeyId[] = [
  'W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8',
  'RAKING', 'UV', 'SPECTRAL',
  'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10', 'L11', 'L12', 'L13',
  'S1', 'S2', 'S3', 'S4',
];
for (const k of EXPECTED)
  assert.ok(earned.has(k), `playthrough earns ${k} (${KEYS[k].label})`);
// the certificate unseals at the end of the full playthrough, and its
// Delivery line matches the spoilers (the breadcrumb synthesis)
{
  const p28 = PAGES.find((p) => p.id === 28)!;
  assert.ok(isAttackable(p28, earned), 'p28 attackable after full playthrough');
  assert.equal(DELIVERY_HASH, pageHash(28, DELIVERY_SOLUTION), 'delivery hash matches spoilers');
  assert.deepEqual(
    DELIVERY_ALT_HASHES,
    DELIVERY_ALT_SOLUTIONS.map((a) => pageHash(28, a)),
    'delivery alt hashes match the spoilers\' alternate phrasings',
  );
}

// 2b. DERIVABLE: every part of the Delivery line is rendered somewhere a
// player can read it (Simon's run 2026-08-04: the rubbing was named only in
// p12's restored text and the street type appeared nowhere, leaving the
// warmest ending half-underivable). Each word of the canonical answer must
// appear in some page's scan content — and NOT all on one page, or the
// synthesis that earns the ending collapses into a single read.
// Player-visible text includes the restored passage: a word masked in the
// scan (p18 prints "A▒N HALLORA▒" — check 8 forbids its own answer verbatim)
// still reaches the player when that page is solved.
{
  const pageText = (c: (typeof PAGE_CONTENT)[number]): string =>
    [
      ...c.layers
        .flatMap((l) => l.blocks)
        .flatMap((b) => [b.text ?? '', ...(b.rows ?? []).flat()]),
      c.restored,
    ]
      .join('\n')
      .toUpperCase();
  const carriers = new Map<string, number[]>();
  for (const w of DELIVERY_SOLUTION.split(' ')) {
    const found = PAGE_CONTENT.filter((c) => pageText(c).includes(w)).map((c) => c.id);
    assert.ok(found.length > 0, `delivery word "${w}" is rendered on some page`);
    carriers.set(w, found);
  }
  const shared = [...carriers.values()].reduce((a, b) => a.filter((id) => b.includes(id)));
  assert.equal(shared.length, 0, 'no single page renders the whole Delivery line');
}

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
  const truth = ALL_SOLUTIONS[c.id];
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
