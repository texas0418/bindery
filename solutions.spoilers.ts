// solutions.spoilers.ts — TOTAL SPOILERS. Ground truth for every page
// answer. This file is imported ONLY by tests and scripts/hash_solutions.ts.
// It must never be imported from src/ (test-content.ts enforces this), so
// it ships in no bundle. Edit answers here, re-run
// `npx tsx scripts/hash_solutions.ts`, and paste the emitted hashes into
// src/content/unwriting/pages.ts. Full design rationale: DESIGN.md.

export const PAGE_SOLUTIONS: Record<number, string> = {
  1: '1961', // blade-spared year in the dealer code, proven by the lot scheme
  2: 'MAGPIE', // initials of the six re-inked 100%-confidence words
  3: 'THURSDAY', // falsified-price dates vs "March begins, a Sunday"
  4: '61', // century-dial rim tick; her zero-dot one past the sixth bold
  5: 'GREENHOUSE', // floriography via the sampler, reversals honored
  6: 'JUNE 1974', // ghost caption bounded by the KODAVUE EST. 1968 stamp
  7: 'NIGHTINGALE', // Thursday rows only, kHz to letters via the taped dial
  8: '74 6', // two-ring alignment, outer ring descends clockwise
  9: '14 LARKSPUR', // flower columns mod 26; bird columns sum the door
};
