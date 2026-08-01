// scripts/hash_solutions.ts — dev tool. Prints the answer hashes for
// src/content/unwriting/pages.ts from the plaintext ground truth in
// solutions.spoilers.ts. Run: npx tsx scripts/hash_solutions.ts

import { pageHash } from '../src/engine/hash';
import { PAGE_SOLUTIONS } from '../solutions.spoilers';

for (const [pageId, answer] of Object.entries(PAGE_SOLUTIONS)) {
  console.log(`${pageId}: '${pageHash(Number(pageId), answer)}',`);
}
