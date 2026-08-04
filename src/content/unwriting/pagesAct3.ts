// src/content/unwriting/pagesAct3.ts
// Act III — The Last Signature. Four identity checks written for Magpie,
// passed by someone else; the text makes that trespass felt. Page 28 is
// not content — it is the certificate (CertificateScreen), the one
// ceremonial surface in the game. Solutions: DESIGN.md, design/act3-pages.html.

import type { PageContent } from '../../models';

export const ACT3_CONTENT: PageContent[] = [
  {
    id: 24,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'THE FIRST LEGIBLE PAGE — A LETTER, UNHIDDEN' },
          {
            kind: 'para',
            text: 'No cipher, no damage she did not undo. A letter in clear handwriting, warm and steady: about the garden, about a bird that kept what shone, about how long she has been writing toward whoever holds this page. It ends: "You kept the drawing. Lay it over my words, as it folds, and answer what I never said aloud." Two small suns mark the corners.',
          },
          {
            kind: 'label',
            text: 'OVERLAY MODE — the drawing (leaf 18) aligns by its paired suns. Laid face-up, the window panes isolate: THE · GLASS · WAS · NEVER · LOCKED · WHY · WOULD · I · LOCK (grammatical noise — wrong lay). Laid AS IT FOLDS — mirrored — the panes isolate: SAY · WHAT · I · CALLED · YOU · WHEN · NO · ONE · HEARD.',
          },
          { kind: 'margin', text: 'the drawing folds face-in. She kept it folded. Lay it as it was kept.' },
        ],
      },
    ],
    answer: { format: 'the name — one word, 6 letters', hash: 'd12e7a63488ece71' },
    restored:
      'You answered. And the page answers back, in text that was under the grille field all along: "…or someone holding her things. I wrote this for both of you. Keep going." She planned for the stranger from the first page. The FIRST SEAL files.',
  },
  {
    id: 25,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'THE BOOK’S ONLY MAP — HAND-DRAWN, UNLABELED' },
          {
            kind: 'para',
            text: 'Streets without names; landmarks in her shorthand — a keyhole, a winding numeral 9, a small pane of glass. Her check, written along the compass rose: "Walk me home. From the house that kept losing its locks, by the way the nine goes, to where the glass stood. Mark where I would stop."',
          },
          {
            kind: 'label',
            text: 'TRACE: the keyhole anchors at the address you proved; the 9 threads the route from the timetable card; the glass sits two bends past the depot-side curve. The timetable’s dots mark every stop she ever used. One stop on the glass’s stretch carries no dot at all — in years of riding.',
          },
          { kind: 'margin', text: 'I ask none of what I want. And then it’s done.' },
        ],
      },
    ],
    answer: { format: 'where the ride stops, for her', hash: '9db8dc9d97d27cfb' },
    restored:
      'Nowhere. She never got off. The mark belongs on the road itself, at the point where the window faces the glass — and marking it, the map blooms: pinprick-faint lines, invisible until now, render the greenhouse as seen from a moving window. She drew her whole home from the one angle she was allowed. The SECOND SEAL files.',
  },
  {
    id: 26,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'THE NIGHT SHE LEFT — ACCOUNT A (VISIBLE INK)' },
          {
            kind: 'para',
            text: 'A clean narrative: papers signed at the courthouse where they married; a taxi at dawn; a kind neighbor; a suitcase of summer clothes; "I left at dawn."',
          },
          { kind: 'label', text: 'Two further accounts underlie this leaf. Her check, in the header: "He believed everything that was written down. Show me you don’t. Name the true account, and the two leaves of this book that convict the others."' },
        ],
      },
      {
        light: 'uv',
        blocks: [
          { kind: 'label', text: 'UV — ACCOUNT B:' },
          {
            kind: 'para',
            text: 'A prouder telling: the anniversary clipping quoted in full — her surname printed complete and correct, every letter — a speech to him at the door; witnesses; "I left at dawn."',
          },
        ],
      },
      {
        light: 'spectral',
        blocks: [
          { kind: 'label', text: 'SPECTRAL — ACCOUNT C, woven through both inks:' },
          {
            kind: 'para',
            text: 'A small telling: no speech, no witnesses, no taxi. A bag she had packed for a year. The registry line she could not dissolve, passed on foot in the dark. "I left at dusk, because the nine runs at night."',
          },
        ],
      },
    ],
    answer: {
      format: 'true account (A, B, or C) + the two leaf numbers that convict the others',
      hash: 'ce8d84aedc7a3448',
      alt: ['d3cac464de0e0ca6'],
    },
    restored:
      'C — convicted by the record itself: A marries her at a courthouse, but leaf 14 restored the registry office, line by bleeding line; B quotes a caption printed whole, but leaf 20 proved the record’s spelling has a hole in it by her own hand. The small, unglamorous account survives cross-examination. "Good. Now you read like an archivist." The THIRD SEAL files.',
  },
  {
    id: 27,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'THE LAST LEAF BEFORE THE ENDPAPERS — BLANK' },
          { kind: 'label', text: 'SURFACE SCAN: nothing. Every instrument reads differently here. Order matters; a wrong sequence dead-ends in noise.' },
        ],
      },
      {
        light: 'raking',
        blocks: [
          { kind: 'label', text: 'RAKING — one embossed line, dry stylus:' },
          { kind: 'figure', text: '"begin with the bird: 1210"' },
        ],
      },
      {
        light: 'uv',
        blocks: [
          { kind: 'label', text: 'UV — the page is ruled into a faint grid of 26 cells, lettered by her measure strip. One cell fluoresces — the cell the bird’s dial names:' },
          { kind: 'figure', text: 'cell L:  "Drawer two. Line three. You have my lessons, my name, and my reasons. Sign the woman, not the cipher."' },
        ],
      },
      {
        light: 'spectral',
        blocks: [
          {
            kind: 'para',
            text: 'Under spectral, the whole page speaks at once, every medium together: "To whoever you are, now that you have come this far: she never came, did she? Finish it — or don’t. You have read enough to choose."',
          },
        ],
      },
    ],
    answer: { format: 'the countersign — two initials', hash: '9074666642266918' },
    restored:
      'Drawer two gave you an E; line three gave you an R — and they are the wrong answer, because the last lesson is the shortest: knowing how is nothing; knowing whom, everything. The woman, not the cipher. The FOURTH SEAL files, and the certificate unseals. Nothing is left but her name, and where to put it.',
  },
];
