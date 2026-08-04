// src/models.ts
// Pure module: shared types for The Bindery. No expo imports (Node-testable).

/** Restoration keys — the game's only currency. Keys are INGREDIENTS, never
 *  doors (doctrine 10b): every page is browsable from intake; a page is
 *  merely unsolvable until its consumed keys are earned. Consuming never
 *  spends. */
export type KeyId =
  | 'W1' | 'W2' | 'W3' | 'W4' | 'W5' | 'W6' | 'W7' | 'W8'
  | 'RAKING' | 'UV' | 'SPECTRAL'
  | 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6' | 'L7' | 'L8' | 'L9' | 'L10' | 'L11' | 'L12' | 'L13'
  | 'S1' | 'S2' | 'S3' | 'S4';

export type KeyKind = 'word' | 'instrument' | 'letter' | 'seal';

export interface KeyDef {
  kind: KeyKind;
  /** Display label once earned (word keys show their word; letters show
   *  "R → 12"). Letters' labels are assembled from LETTER_SLOTS. */
  label: string;
}

export type Arc = 'intake' | 'recovery' | 'signature';

export interface Page {
  /** 1-28, book order. Page 28 is the signature — a choice, not a puzzle. */
  id: number;
  title: string;
  arc: Arc;
  produces: KeyId[];
  consumes: KeyId[];
  /** One-line mechanism note (design shorthand; the screen renders content,
   *  not this). Doctrine 18: mechanisms never repeat outside chains A/B. */
  mech: string;
  /** Doctrine 13: the sentence of Vera this page reveals. No sentence, no page. */
  story: string;
}

/** The name assembled on the restoration certificate. Page 28 consumes the
 *  thirteen letter KEYS, not this string — guessing it early is useless. */
export const FULL_NAME = 'VERAOSTRANDER';

/** Letter keys carry their slot (1-13). All thirteen assigned (Act II page
 *  design, see design/act2-pages.html); test-graph enforces consistency
 *  with FULL_NAME and that every slot 1-13 appears exactly once. */
export const LETTER_SLOTS: Record<
  Extract<KeyId, `L${number}`>,
  { letter: string; slot: number }
> = {
  L1: { letter: 'V', slot: 1 }, // p10 form field one
  L2: { letter: 'R', slot: 13 }, // p11 REF 13-R, "the last letter is the one they kept"
  L3: { letter: 'R', slot: 8 }, // p12 eighth rim character from the broken tooth
  L4: { letter: 'E', slot: 12 }, // p13 the twelfth trial
  L5: { letter: 'T', slot: 7 }, // p14 line seven would not go
  L6: { letter: 'O', slot: 5 }, // p15 "four cuts spell, the fifth files"
  L7: { letter: 'S', slot: 6 }, // p16 "SIXTH IS S"
  L8: { letter: 'A', slot: 4 }, // p18 Ann, aged 4
  L9: { letter: 'A', slot: 9 }, // p19 Route 9
  L10: { letter: 'N', slot: 10 }, // p20 "^n — the tenth"
  L11: { letter: 'D', slot: 11 }, // p21 "Eleven of thirteen. D. As in done."
  L12: { letter: 'E', slot: 2 }, // p22 Drawer 2
  L13: { letter: 'R', slot: 3 }, // p23 census line 3
};

export type Flag = 'introDone' | 'endingSeen';

/** The three endings, chosen by where the name is entered (p28). */
export type Ending = 'accession' | 'delivery' | 'blank';

/** Uppercase, strip everything but letters/digits/spaces, collapse runs.
 *  Rule 8's quiet half: format mistakes are normalized away, not punished. */
export function normalizeAnswer(raw: string): string {
  return raw
    .toUpperCase()
    .replace(/[^A-Z0-9 ]+/g, ' ')
    .replace(/ +/g, ' ')
    .trim();
}

// ——— scan content (rendered by PageScreen) ———

/** 'plain' always renders. Instrument lights render only when the matching
 *  key is earned. 'confidence' is a workstation view (free), offered only
 *  on pages that declare it. */
export type Light = 'plain' | 'raking' | 'uv' | 'spectral' | 'confidence';

export interface ScanBlock {
  kind: 'heading' | 'para' | 'margin' | 'label' | 'table' | 'figure';
  text?: string;
  rows?: string[][];
}

export interface ScanLayer {
  light: Light;
  blocks: ScanBlock[];
}

export interface PageContent {
  id: number;
  layers: ScanLayer[];
  /** Extra software views this page offers (e.g. OCR confidence). */
  views?: Light[];
  /** Absent on p28 (the choice) and on pages not yet transcribed. */
  answer?: {
    /** Rule 8: the declared shape, shown verbatim ("four-digit year"). */
    format: string;
    /** Salted hash of the normalized answer (engine/hash). Plaintext lives
     *  only in solutions.spoilers.ts, which src/ never imports. */
    hash: string;
  };
  /** The restored passage shown on solve — rule 13's payoff. */
  restored: string;
}
