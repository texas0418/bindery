// scripts/hash_solutions.ts — dev tool. Prints the answer hashes for
// src/content/unwriting/pages*.ts from the plaintext ground truth in
// solutions.spoilers.ts. Run: npx tsx scripts/hash_solutions.ts

import { pageHash } from '../src/engine/hash';
import {
  PAGE_ALT_SOLUTIONS,
  PAGE_SOLUTIONS,
  PAGE_SOLUTIONS_ACT2,
  PAGE_SOLUTIONS_ACT3,
} from '../solutions.spoilers';

const all = { ...PAGE_SOLUTIONS, ...PAGE_SOLUTIONS_ACT2, ...PAGE_SOLUTIONS_ACT3 };
for (const [pageId, answer] of Object.entries(all)) {
  const id = Number(pageId);
  const alts = (PAGE_ALT_SOLUTIONS[id] ?? []).map((a) => `'${pageHash(id, a)}'`);
  const alt = alts.length ? ` alt: [${alts.join(', ')}],` : '';
  console.log(`${pageId}: '${pageHash(id, answer)}',${alt}`);
}
