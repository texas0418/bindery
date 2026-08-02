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

export const PAGE_SOLUTIONS_ACT2: Record<number, string> = {
  10: '3 89 11 87', // the two dates that cannot both be true (footer revision vs effective date); field one falls in the restored text
  11: 'R 13', // REF 13-R; "the last letter is the one they kept"
  12: 'R 8', // 8th rim character from the broken tooth of the reassembled seal
  13: '12 1 E', // the anomalous bar (found under raking), its width, its letter
  14: 'TRINITY REGISTRY OFFICE', // line 7, reconstructed via the JUNE 1974 bleed model
  15: 'O 5', // B-2-4-9-0-5: four cuts sum 15=O, the fifth files slot 5
  16: 'S 6', // due-date intervals spell SIXTH IS S
  17: 'ROOM 214 10', // the provable fact + the leaf that proved it (evidence-bound)
  18: 'ANN HALLORAN 4', // pencil under crayon; "aged 4. Our last summer."
  19: 'A 9', // the orphan rhyme: ARBOR, line 9 — its partner never comes
  20: 'N 10', // "^n — the tenth"; the caption prints OSTRA_DER
  21: 'D 11', // rewoven item 11's WHY: "D. As in done."
  22: 'I FILED MYSELF HERE FIRST', // pinprick positions over the card's type
  23: 'HEAD M 41', // forced by the tallies: 2nd male, aggregate age 93 - 52 = 41, mandatory head
};

export const PAGE_SOLUTIONS_ACT3: Record<number, string> = {
  24: 'MAGPIE', // the overlay demands the name she never said aloud
  25: 'NOWHERE', // she never got off; the mark goes on the road
  26: 'C 14 20', // the true account + the two pages that convict the others
  27: 'V O', // "sign the woman, not the cipher" — not the computed E R
};

/** p28's Delivery line: recipient + where, synthesized from the foreign
 *  rubbing (p12) + the drawing's surname (p18) + the poem's arbor (p19). */
export const DELIVERY_SOLUTION = 'HALLORAN ARBOR LANE';
