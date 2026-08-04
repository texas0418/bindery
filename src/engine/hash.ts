// src/engine/hash.ts
// Pure module. Page answers ship ONLY as salted hashes so a curious player
// poking the bundle reads no solutions. This is spoiler-resistance, not
// cryptography: the answer space is finite, so a determined datamine wins
// eventually — the point is that nothing readable leaks (rule 15's floor).
// Plaintext ground truth lives in solutions.spoilers.ts (repo only, never
// imported by app code — test-content.ts enforces the hashes match it).

import { normalizeAnswer } from '../models';

const SALT = 'bindery-lot44-vo';

function fnv1a(input: string, seed: number): number {
  let h = seed >>> 0;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

const hex = (n: number): string => n.toString(16).padStart(8, '0');

export function saltedHash(...parts: string[]): string {
  const s = `${SALT}|${parts.join('|')}`;
  return hex(fnv1a(s, 0x811c9dc5)) + hex(fnv1a(s, 0x01000193));
}

/** Hash for a page's accepted answer. */
export const pageHash = (pageId: number, answer: string): string =>
  saltedHash(String(pageId), normalizeAnswer(answer));

export const checkAnswer = (
  pageId: number,
  raw: string,
  accepted: string | readonly string[],
): boolean => {
  const h = pageHash(pageId, raw);
  return typeof accepted === 'string' ? h === accepted : accepted.includes(h);
};
