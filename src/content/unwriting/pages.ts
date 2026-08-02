// src/content/unwriting/pages.ts
// Act I scan content — the pages as the workstation renders them, v1
// text-mode transcription (the art pass replaces figures, never the logic).
// Every puzzle must be solvable from what renders here; test-content.ts
// plays Act I through against solutions.spoilers.ts to prove the chain
// holds. Answer hashes come from scripts/hash_solutions.ts. Full solutions
// and rationale: DESIGN.md, design/root-pages.html, design/act1-pages.html.

import type { PageContent } from '../../models';

import { ACT2_CONTENT } from './pagesAct2';

const ACT1_CONTENT: PageContent[] = [
  {
    id: 1,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'FLYLEAF — SCAN 01' },
          {
            kind: 'para',
            text: 'For my ———, when she is old enough to ask.\n\nBelow the inscription, a bookseller’s penciled catalog code, cut through by the same blade that took the name. Surviving fragment:\n\n▮—VI–61',
          },
          { kind: 'label', text: 'INTAKE — ESTATE LOT 44 · CONSIGNOR: ESTATE OF E. N.' },
          {
            kind: 'table',
            rows: [
              ['ITEM', 'DESCRIPTION', 'DEALER CODE'],
              ['Atlas', 'county roads, printed MAR 1948, plate 44', 'D–III–48'],
              ['Ledger', 'household, final entry NOV 1951', 'A–XI–51'],
              ['Hymnal', 'inscribed Christmas, DEC 1958', 'F–XII–58'],
              ['Album', 'photographs removed, last mount JUN 1963', 'B–VI–63'],
              ['Manual', 'wireless receiver, issued SEP 1970', 'C–IX–70'],
              ['Herbal', 'pressings intact, dated MAY 1977', 'E–V–77'],
            ],
          },
          {
            kind: 'label',
            text: 'FIELD FLAGGED: DATE OF FIRST ENTRY — UNVERIFIED. Note: the atlas code could read plate-number; only one scheme fits all six items.',
          },
          { kind: 'margin', text: 'The cut is precise. It stopped short of the digits.' },
        ],
      },
    ],
    answer: { format: 'four-digit year', hash: '7901007c2440a58a' },
    restored:
      'The damage to this book is not damage. It is editing — and the editor knew exactly what information is dangerous. She left the year. A year alone finds no one.',
  },
  {
    id: 2,
    views: ['confidence'],
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'FIRST ENTRY — BLEACH DAMAGE, SEVERE' },
          {
            kind: 'para',
            text: '…the winter was MILD and I ░░░░ not ALWAYS make the GARDEN answer░░ ░░░ still one PROMISE held ░░░ that INK should outlast EVERYTHING ░░░ even ░░░░ hands that ░░░░░ it…',
          },
          { kind: 'margin', text: '(a small ink bird in the corner, wings folded)' },
        ],
      },
      {
        light: 'confidence',
        blocks: [
          { kind: 'label', text: 'OCR CONFIDENCE OVERLAY — TOOLTIP: words shade by transcription certainty. Six words on this page read at 100%; everything around them is degraded. Re-inked later, same hand: the strokes are decades younger than the page.' },
          {
            kind: 'table',
            rows: [
              ['WORD', 'CONFIDENCE', 'GRAMMAR FIT'],
              ['MILD', '100%', 'strained'],
              ['ALWAYS', '100%', 'strained'],
              ['GARDEN', '100%', 'strained'],
              ['PROMISE', '100%', 'strained'],
              ['INK', '100%', 'strained'],
              ['EVERYTHING', '100%', 'strained'],
            ],
          },
        ],
      },
    ],
    answer: { format: 'her name for the reader — one word, 6 letters', hash: '7fb4f8bf95bb8231' },
    restored:
      'The whole book is addressed to someone she calls Magpie — and Vera came back to this ruined page, years later, to make sure the name would keep. The bleach was her second edit.',
  },
  {
    id: 3,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'HOUSEHOLD LEDGER — MARCH' },
          { kind: 'margin', text: 'March begins, a Sunday.' },
          {
            kind: 'table',
            rows: [
              ['DAY', 'ITEM', 'PRICE', 'BALANCE'],
              ['2', 'flour, 5 lb', '.55', '11.45'],
              ['5', 'eggs, 2 doz', '1.10', '10.35'],
              ['9', 'eggs, 1 doz', '.35', '10.00'],
              ['12', 'flour, 5 lb', '1.75', '8.25'],
              ['16', 'soap, 2 bars', '.30', '7.95'],
              ['19', 'soap, 2 bars', '1.20', '6.75'],
              ['23', 'thread, spool', '.25', '6.50'],
              ['26', 'thread, spool', '2.25', '4.25'],
              ['30', 'eggs, 1 doz', '.35', '3.90'],
            ],
          },
          { kind: 'label', text: 'AUDIT: balance verified ✓ · cash out exceeds itemized receipts: 4.85' },
        ],
      },
    ],
    answer: { format: 'day of the week', hash: '9756b8674e6b8f1d' },
    restored:
      'Every falsified price lands on the same weekday. He audited arithmetic, never groceries — and she saved her escape one dishonest egg-price at a time.',
  },
  {
    id: 4,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'FULL-PAGE FIGURE — HAND-DRAWN CALIBRATION PLATE' },
          {
            kind: 'figure',
            text: 'Concentric rings of spokes: 12 · 24 · 36 · 48. A rim of 100 fine ticks, every tenth bold. Registration crosses in the corners. The whole figure sits a hair off the page’s true center — aligning by symmetry always reports drift. Inside one fine tick — one past the sixth bold — a dot no wider than a needle.',
          },
          { kind: 'margin', text: 'for the machine, when it comes' },
          {
            kind: 'label',
            text: 'RAKING LIGHT — CALIBRATION REQUIRED. Reticle reads the rim tick under zero. The rim spans a century.',
          },
        ],
      },
    ],
    answer: { format: 'rim tick under zero (0–99)', hash: '8309ea77ee438775' },
    restored:
      'The reticle snaps to her needle-dot and the ring-trace finds the flaw it was drawn to catch: the 36-ring runs a spoke short. RAKING LIGHT calibrated. She drew a scanner target decades before scanners — this book always expected the machine.',
  },
  {
    id: 5,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'PRESSED FLOWERS — TEN, ARRANGED IN A ROW ON BLACK PAPER' },
          {
            kind: 'table',
            rows: [
              ['POSITION', 'SPECIES', 'ORIENTATION'],
              ['1', 'violet', 'upright'],
              ['2', 'yarrow', 'upright'],
              ['3', 'flax', 'UPSIDE DOWN'],
              ['4', 'ivy', 'upright'],
              ['5', 'rose', 'upright'],
              ['6', 'fern', 'upright'],
              ['7', 'rue', 'upright'],
              ['8', 'thistle', 'UPSIDE DOWN'],
              ['9', 'sage', 'upright'],
              ['10', 'daisy', 'upright'],
            ],
          },
          { kind: 'margin', text: 'mother’s stitching, back cover' },
          {
            kind: 'label',
            text: 'INSIDE BACK COVER — PASTED NEEDLEPOINT SAMPLER (browsable). Each bloom stitched twice, crown-up and crown-down, a word to each crown:',
          },
          {
            kind: 'para',
            text: 'violet: remember / forget,  yarrow: the / a,  flax: stone / glass,  ivy: house / door,  rose: where / when,  fern: we / they,  rue: were / are,  thistle: found / lost,  sage: so / not,  daisy: gladly / sadly',
          },
          { kind: 'margin', text: 'a bloom reversed speaks its opposite crown' },
        ],
      },
    ],
    answer: { format: 'one word, 10 letters', hash: '0c21dca2dac68648' },
    restored:
      'Read upright, the row remembers a stone house where they were found. But two blooms hang crown-down, and their crowns speak: the house was GLASS, and they were LOST there — so gladly. The glass house: the greenhouse, the garden where she and her daughter were happiest. It no longer exists, and its name was never written, only grown.',
  },
  {
    id: 6,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'ALBUM PAGE — PHOTOGRAPHS REMOVED' },
          {
            kind: 'para',
            text: 'Three empty rectangles framed by black photo corners. Caption slits cut clean below each. One corner carries its maker’s embossed stamp: KODAVUE — EST. 1968.',
          },
        ],
      },
      {
        light: 'raking',
        blocks: [
          { kind: 'label', text: 'RAKING LIGHT — surface relief detected. Erased pencil survives as impression.' },
          {
            kind: 'table',
            rows: [
              ['MOUNT', 'GHOST CAPTION (EMBOSSED)'],
              ['first', 'M——, aged f——'],
              ['second', 'the g——h———, our last ——'],
              ['third', 'V. & E., J-ne 19-4'],
            ],
          },
          { kind: 'margin', text: 'The decade digit is crushed flat. Any of 1914–1994 fits the strokes.' },
        ],
      },
    ],
    answer: { format: 'month + four-digit year', hash: '3445c4fdeeb91deb' },
    restored:
      'V. & E., June 1974 — the raking angle lifts and the caption resolves in her own recovered hand. Every photograph was removed by hers; the wedding is the date she erased most carefully and still could not stop recording.',
  },
  {
    id: 7,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'RADIO LOG — TWO MONTHS OF NIGHTS' },
          { kind: 'margin', text: 'our night only. The rest is static.' },
          {
            kind: 'table',
            rows: [
              ['DATE', 'TIME', 'kHz', 'NOTES'],
              ['THU 2 APR', '23:55', '560', 'clear tonight'],
              ['SAT 4 APR', '00:40', '1210', 'storm to the west'],
              ['THU 9 APR', '23:50', '640', 'sang late'],
              ['THU 16 APR', '00:05', '710', 'faint, then sure'],
              ['TUE 21 APR', '01:10', '980', 'nothing kept'],
              ['THU 23 APR', '23:45', '800', 'clear'],
              ['THU 30 APR', '00:15', '880', 'held to the end'],
              ['THU 7 MAY', '23:55', '640', 'again, twice'],
              ['THU 14 MAY', '00:30', '560', 'strongest yet'],
              ['SUN 17 MAY', '02:00', '530', 'static only'],
              ['THU 21 MAY', '23:40', '710', 'gone by two'],
              ['THU 28 MAY', '00:10', '980', 'clear, brief'],
              ['THU 4 JUN', '23:50', '1210', 'song first, then talk'],
              ['THU 11 JUN', '00:20', '1340', 'goodnight, then'],
            ],
          },
          {
            kind: 'label',
            text: 'TAPED BELOW — HAND-DRAWN DIAL ARC. Letters inked at frequencies along the band, transcribed as written, cramped where the arc bends:',
          },
          {
            kind: 'para',
            text: '980 A,  530 R,  1340 E,  640 I,  880 T,  1210 L,  560 N,  800 H,  710 G,  1120 S',
          },
          { kind: 'label', text: 'CADENCE NOTE: 14 rows, 11 on one weekday. Non-pattern rows decode to noise.' },
        ],
      },
    ],
    answer: { format: 'one word, 11 letters', hash: 'eda6f1815f43c783' },
    restored:
      'N-I-G-H-T-I-N-G-A-L-E — the Thursday rows in order, and the bird resolves the moment it lands: a night singer, logged only at night. Reread the Thursday notes and they stop being weather. Nightingale is the one person who still knew she existed.',
  },
  {
    id: 8,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'SECOND CALIBRATION PLATE — HALF-DRAWN' },
          {
            kind: 'figure',
            text: 'The rings again — but spokes end in clean stubs mid-air, half the figure missing. The rim carries two tick rings now: 100 fine (a century), 12 coarse (a year of months). A small inked arrow rides the outer rim: the numbers DESCEND clockwise. Where the first plate counted forward, this one runs backward.',
          },
          { kind: 'margin', text: 'second zero: where we began — and everything ran backward from there' },
          {
            kind: 'label',
            text: 'UV LAMP — TEMPORAL REFERENCE REQUIRED. Set both rings: year tick + month tick. Habit from the first plate lands on the mirror year and drifts.',
          },
        ],
      },
      {
        light: 'uv',
        blocks: [
          { kind: 'label', text: 'UV FLOOD — the missing half fluoresces exactly where the trace predicted the stubs should continue.' },
          { kind: 'para', text: 'In the new ink, one line: “half of everything I wrote is for you alone.”' },
        ],
      },
    ],
    answer: { format: 'two-ring alignment — year tick + month tick', hash: '2ffa4263fbbd3e35' },
    restored:
      'Aligned against the arrow — the wedding, backward — the lamp floods on and the plate finishes itself. Half this book is written in invisible ink, and the marriage is the pivot her whole cipher runs backward from.',
  },
  {
    id: 9,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'MARGIN ARITHMETIC — “WHAT LEAVING COSTS”' },
          {
            kind: 'para',
            text: 'A long entry on house expenses, its margins crowded with small addition columns, each headed by a tiny doodle.',
          },
          {
            kind: 'table',
            rows: [
              ['COLUMN', 'DOODLE', 'TOTAL'],
              ['1', 'violet', '64'],
              ['2', 'wren', '9'],
              ['3', 'rose', '27'],
              ['4', 'thimble', '31'],
              ['5', 'fern', '44'],
              ['6', 'daisy', '37'],
              ['7', 'kettle', '12'],
              ['8', 'thistle', '45'],
              ['9', 'sparrow', '5'],
              ['10', 'pansy', '42'],
              ['11', 'poppy', '47'],
              ['12', 'spool', '19'],
              ['13', 'iris', '70'],
              ['14', 'button', '8'],
              ['15', 'jar', '23'],
            ],
          },
          {
            kind: 'margin',
            text: 'what the magpie keeps buys the door; what the garden grew names the street. Remainders, six-and-twenty, A to Z.',
          },
        ],
      },
    ],
    answer: { format: 'house number + street name', hash: 'eb9d14aaaf210438' },
    restored:
      'The flower columns spell it in remainders and the street is itself a flower — the garden really did name it. The margins are her escape budget, priced to the shilling, and 14 Larkspur is where she went. He read every word she ever wrote and never once read the arithmetic.',
  },
];

export const PAGE_CONTENT: PageContent[] = [...ACT1_CONTENT, ...ACT2_CONTENT];

export const contentFor = (id: number): PageContent | undefined =>
  PAGE_CONTENT.find((p) => p.id === id);
