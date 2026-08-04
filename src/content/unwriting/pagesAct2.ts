// src/content/unwriting/pagesAct2.ts
// Act II — Recovery. The erasure told in reverse; the thirteen letters of
// her name. Authored under the walkthrough doctrines of 2026-08-02: the
// workstation transcribes the artifact faithfully, never organizes it
// helpfully; the letter-assembly arc is spent (p02, p07) and appears
// nowhere here; no answer word (5+ letters) appears in its own page's
// content (test-content check 8). Letter keys enter as "letter + slot"
// (e.g. "R 13") — the page is the puzzle, the key is the reward.
// Solutions and rationale: DESIGN.md, design/act2-pages.html.

import type { PageContent } from '../../models';

export const ACT2_CONTENT: PageContent[] = [
  {
    id: 10,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'COUNTY FORM PS-14 — CHANGE OF ADDRESS' },
          {
            kind: 'para',
            text: 'Blank. Every field empty, the paper unmarked — except the printed frame itself: field numbers 1 through 9, the county crest, and a footer in small type: Rev. 3/89.',
          },
          { kind: 'label', text: 'SURFACE SCAN: no ink detected. Try another light.' },
        ],
      },
      {
        light: 'uv',
        blocks: [
          { kind: 'label', text: 'UV — a full document fluoresces. She traced his forgery in invisible ink, stroke for stroke, as evidence.' },
          {
            kind: 'table',
            rows: [
              ['FIELD', 'PRINTED LABEL', 'TRACED ENTRY'],
              ['1', 'NAME', '(a name, in a hand almost hers)'],
              ['2', 'PRIOR RESIDENCE', '(a street she lived on)'],
              ['3', 'DELIVER ALL POST TO', 'Wexford House, Room 214'],
              ['4', 'EFFECTIVE', '11/87'],
              ['5', 'RELATION TO ADDRESSEE', 'self'],
              ['6', 'CLERK RECEIVING', '(initials, confident)'],
              ['7', 'WITNESS', '(none)'],
              ['8', 'FEE PAID', '.25'],
              ['9', 'SIGNATURE', '(hers — almost)'],
            ],
          },
          {
            kind: 'margin',
            text: 'He never lied about the little things.',
          },
          {
            kind: 'label',
            text: 'Her tracing preserves everything — the entries, the stamps, the small print. The workstation cross-dates what it scans. Something in this document’s own dates does not survive comparison.',
          },
        ],
      },
    ],
    answer: {
      format: 'the two dates that cannot both be true',
      hash: '3b6c8ff603077874',
      alt: ['be4ec2d8bd8bc7ae'],
    },
    restored:
      'Rev. 3/89 against an effective date of 11/87: the form was printed AFTER it was supposedly filed. Backdated — manufactured. And her margin closes the case: beside the verification initials that sit against fields 2 through 9, field one carries none. The county checked everything against its own records except the person. Field one is the lie; the name is forged. The damage log files V → slot 1, from field one, and ROOM 214.',
  },
  {
    id: 11,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'CARBON SHEET — BOUND IN, NEAR-BLACK' },
          {
            kind: 'para',
            text: 'A sheet of used typewriter carbon, shining where the light slides. The scan reads the strike-marks as they lie: reversed, and doubled — two documents went through this sheet, their lines interleaved one for one.',
          },
          {
            kind: 'figure',
            text: 'RAW STRIKE TRANSCRIPTION (alternating lines, as struck):\n\n.eciffO sdroceR ytnuoC eht oT\n.eciffO sdroceR ytnuoC eht oT\nym ni dleh sdrocer lla fo seipoc tseuqer I\nym ni dleh sdrocer lla fo seipoc tseuqer I\n.ecnerefer lanosrep rof ,eman\n.ees nac eh tahw nrael ot ,eman\n\ndetpiecer :pmats — R-31 FER',
          },
          {
            kind: 'label',
            text: 'In white pencil, hand-written across the sheet — legible only when the scan is read the way the carbon remembers it: ".tpek yeht eno eht si rettel tsal eht"',
          },
        ],
      },
    ],
    answer: { format: 'restoration key — letter + slot', hash: 'a4172142bc855200' },
    restored:
      'R, slot thirteen — the last letter, the one they kept. Her request was denied: requester could not be verified. The machinery of documentation no longer believed she existed. He burned letters. Nobody burns the carbon.',
  },
  {
    id: 12,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'EMBOSSED SEAL — SHATTERED. NINE FRAGMENTS, LOOSE.' },
          {
            kind: 'para',
            text: 'A notary’s embossing seal, deliberately broken. The rim carried a ring of text; each fragment holds a few letters of it. One fragment bears the registration notch.',
          },
          {
            kind: 'table',
            rows: [
              ['FRAGMENT', 'RIM LETTERS'],
              ['a', '…GALE·N…'],
              ['b', '…OTAR…'],
              ['c', '…E.NIG…'],
              ['d', '(notch) …ALE·NOT…'],
              ['e', '…HTIN…'],
              ['f', '…PUBLI… (duplicate arc, worn)'],
              ['g', '…C·E.N…'],
              ['h', '…RY·…'],
              ['i', '…GALE·NOTA…'],
            ],
          },
          { kind: 'margin', text: 'count from the broken tooth.' },
          {
            kind: 'label',
            text: 'REASSEMBLY: the rim text repeats around the ring. Order the fragments; the notch is the zero point. Count letters only; the tooth’s own letter counts first. Some fragments are worn duplicates from the same arc — not every piece is needed.',
          },
        ],
      },
    ],
    answer: { format: 'restoration key — letter + slot (8th rim character from the notch)', hash: 'b86f8e379c8729f9' },
    restored:
      'The ring reads E. NIGHTINGALE · NOTARY PUBLIC — the codename was simply her friend’s name, hidden in plain hearing. Eighth character from the broken tooth: R, slot eight. Everything he did to her was notarized. So was everything she did back. Loose in this page: a pencil rubbing of a document corner, flagged by the software — FOREIGN OBJECT, not part of original binding, dated after the last entry.',
  },
  {
    id: 13,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'PRACTICE PAGE — FIFTEEN INK BLACKOUTS' },
          {
            kind: 'para',
            text: 'Fifteen redaction bars in careful ink, various widths, ruled straight — several mid-sentence in practice phrases, one of them: "I do not fear ——." Down the page edge, her measure: the alphabet written at fixed pitch — a calibration strip in her own hand.',
          },
          { kind: 'label', text: 'SURFACE SCAN: pencil labels beneath each bar have been erased. Raking light may recover impressions.' },
        ],
      },
      {
        light: 'raking',
        blocks: [
          { kind: 'label', text: 'RAKING — erased labels rise as embossing. Each bar is captioned with what it hides:' },
          {
            kind: 'para',
            text: '1 "milk bill" · 2 "the blue coat" · 3 "his mother’s ring" · 4 "Thursday" · 5 "the spare key" · 6 "Larkspur" · 7 "the radio hour" · 8 "her school" · 9 "the notary’s fee" · 10 "the ticket south" · 11 "my wages" · 12 (no label — nothing embossed) · 13 "the milkman’s name" · 14 "the old address" · 15 "the garden gate"',
          },
          {
            kind: 'margin',
            text: 'Measured against her strip, every bar matches its label’s length. The twelfth matches nothing — it is exactly one character wide.',
          },
        ],
      },
    ],
    answer: { format: 'the anomalous bar — number, width in characters, letter', hash: '107d1a690fb8bb7f' },
    restored:
      'One character, and the sentence closes itself: "I do not fear E." The only redaction she practiced and could not bring herself to label. She practiced on the small things. The twelfth took her a year. E, slot twelve — the twelfth trial.',
  },
  {
    id: 14,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'MARRIAGE CERTIFICATE — DISSOLVED IN PATCHES' },
          {
            kind: 'para',
            text: 'The certificate, attacked with solvent line by line. Ink has bled outward in halos where entries used to be. The printed frame survives: numbered lines 1 through 9. Line 7 — PLACE OF CEREMONY — is the worst wound on the page.',
          },
          { kind: 'margin', text: 'the first form he ever filed for me.' },
          {
            kind: 'label',
            text: 'BLEED RECONSTRUCTION: the diffusion model can run backward, but must be parameterized by the document’s date (ink and paper era). The restoration record holds it — the album leaf’s recovered caption. Where halos are ambiguous, the model offers candidate letterforms.',
          },
        ],
      },
      {
        light: 'uv',
        blocks: [
          { kind: 'label', text: 'UV — bleach-ghosts fluoresce. Line 7 resolves to stroke families:' },
          { kind: 'figure', text: 'LINE 7 · PLACE OF CEREMONY:\n\n▒R▒N▒▒Y   ▒EG▒ST▒Y   O▒▒▒CE' },
          { kind: 'margin', text: 'I dissolved us line by line. The seventh would not go.' },
        ],
      },
    ],
    answer: { format: 'line 7 in full (three words)', hash: '7293c21171a970e3' },
    restored:
      'June 1974, and line seven comes back whole: the registry office where she stood when she still believed it. A marriage is a form; she learned that on the day she signed it. T, slot seven — the line that would not go.',
  },
  {
    id: 15,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'RECEIPT — CROSS & KEELER LOCKSMITHS' },
          {
            kind: 'table',
            rows: [
              ['DATE', 'WORK', 'KEY CODE'],
              ['FEB', 'full rekey, front and back', 'B-7-2-2-4-1'],
              ['JUN', 'full rekey, front and back', 'B-5-5-1-3-2'],
              ['NOV', 'full rekey, front, back, cellar', 'B-2-4-9-0-5'],
            ],
          },
          {
            kind: 'label',
            text: 'CUSTOMER ADDRESS: water-damaged to "14 L———". PRINTED LEGEND (foot of receipt): five pins per key; digits are cut depths 0–9. REVERSE OF RECEIPT: three county key-registry request stamps, each dated within days of the work above.',
          },
          { kind: 'margin', text: 'four cuts spell, the fifth files.' },
        ],
      },
    ],
    answer: { format: 'restoration key — letter + slot, from the final key code', hash: '73c813866047086c' },
    restored:
      'The last key: 2+4+9+0 — fifteen, six-and-twenty, A to Z — and the fifth cut files it. O, slot five. Three rekeyings in a year, and after each one, a county key-registry request within the week — from the same desk he sat behind. Even her own house obeyed the records, not her.',
  },
  {
    id: 16,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'LIBRARY POCKET — DATE-DUE SLIP, TWELVE STAMPS' },
          {
            kind: 'para',
            text: 'A borrower’s pocket pasted in, its slip stamped: 12 MAR 68 · 31 MAR 68 · 9 APR 68 · 2 MAY 71 · 26 MAY 71 · 15 JUN 71 · 23 JUN 71 · 27 AUG 74 · 5 SEP 74 · 24 SEP 74 · 13 OCT 74 · 10 MAR 85',
          },
          {
            kind: 'label',
            text: 'PENCILED COLUMN (call numbers with faint titles): statutes of privacy · the craft of bookbinding · inks, their chemistry · postal regulation, annotated. CADENCE NOTE: renewal gaps are non-standard. Long silences separate short campaigns; within a campaign, the gaps are small — never larger than the alphabet.',
          },
          { kind: 'margin', text: 'Ruth never asked why I renewed on odd days. She stamped. The stamps remembered.' },
        ],
      },
    ],
    answer: { format: 'restoration key — letter + slot', hash: 'f779d25a2b50f1e0' },
    restored:
      'The gaps between stamps, inside each campaign, counted in days against the alphabet — and the message states itself: the sixth is S. Slot six. Seventeen years of borrowing books on how to disappear, and a librarian who never once reported her overdue.',
  },
  {
    id: 17,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'TWO ENTRIES, ONE DATE — A TUESDAY, WRITTEN TWICE' },
          {
            kind: 'para',
            text: 'The visible entry: an unremarkable day. Errands, weather, the post office in the morning, supper at six, his shirts collected, early to bed.',
          },
          { kind: 'label', text: 'SURFACE SCAN: a second entry underlies this leaf in another ink. Try UV.' },
        ],
      },
      {
        light: 'uv',
        blocks: [
          { kind: 'label', text: 'UV — the twin fluoresces. The same Tuesday, word for word — almost. Seven divergences detected:' },
          {
            kind: 'table',
            rows: [
              ['VISIBLE ENTRY SAYS', 'UV ENTRY SAYS'],
              ['post office in the morning', 'Wexford House, Room 214, in the morning'],
              ['supper at six', 'supper at five, alone'],
              ['his shirts collected', 'his drawer unlocked'],
              ['early to bed', 'late at the radio'],
              ['a quiet street', 'a car twice past'],
              ['nothing in the post', 'her letter, kept'],
              ['slept well', 'did not'],
            ],
          },
          {
            kind: 'label',
            text: 'SPECTRAL SEPARATION — TRAINING REQUIRED: the machine can learn to split these inks page-wide, but must be told which twin is true — with provenance. Of the seven divergences, exactly one has been PROVEN elsewhere in this restoration. State the fact, and the leaf that proved it.',
          },
          { kind: 'margin', text: 'I kept a diary he could find and a diary that was true. The trick of surviving him was remembering which was which.' },
        ],
      },
    ],
    answer: { format: 'the provable fact + the leaf that proved it', hash: '371f7873b1d93b71' },
    restored:
      'Room 214 — proven at the unfiled form, and the machine learns her two voices. SPECTRAL VIEW calibrated. She wrote her whole life twice: one version for his eyes, one for the record. Half this book is testimony disguised as routine.',
  },
  {
    id: 18,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'CHILD’S DRAWING — CRAYON, HEAVY-HANDED, JOYFUL' },
          {
            kind: 'para',
            text: 'A glasshouse in green and white crayon, two stick figures holding hands, an enormous sun with rays like spokes. Unsigned — or so it appears.',
          },
          { kind: 'label', text: 'SURFACE SCAN: graphite strokes interleave with the wax, written and erased beneath the drawing. SPECTRAL separation can isolate the pencil channel.' },
        ],
      },
      {
        light: 'spectral',
        blocks: [
          { kind: 'label', text: 'SPECTRAL — pencil channel isolated. Beneath the crayon, written years later and then erased, stroke fragments:' },
          { kind: 'figure', text: 'A▒N   HALLORA▒\n\nand beneath, in Vera’s hand:  "aged 4. Our last summer."' },
          {
            kind: 'margin',
            text: 'The sun’s rays overdraw the surname’s tail; the glasshouse roofline crosses the first name. The fragments hold enough.',
          },
        ],
      },
    ],
    answer: { format: 'the traced name + the age from the caption', hash: 'a1ee94c1a833ad13' },
    restored:
      'Ann Halloran, aged four. The daughter, given a name he could not follow — the adoption that kept her unfindable, written in pencil under a child’s greenhouse and then erased even there. A, slot four. She could not erase the sun.',
  },
  {
    id: 19,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'TIMETABLE CARD — ROUTE 9, NIGHT SERVICE' },
          {
            kind: 'para',
            text: 'The front: a stops column and times grid, pencil dots against certain runs, her smallest hand in the margins: "listen first, ride second — never before the song ends" · "never the same stop twice running" · "always off before the depot."',
          },
          { kind: 'label', text: 'VERSO — pencil, unpolished, the only verse anywhere in the volume. 27 lines detected. Beneath the title, an epigraph: "for the one who sang me to the glass and back."' },
          {
            kind: 'figure',
            text: 'THE NINE\n\nThe city thins to breath against the glass.\nI pay the same coin, the same fare,\nand watch the windows fill with rain\ntill every streetlight runs to chrome.\nThere is a promise I still keep\nat twenty past, where the road bends slow\nand lamplight crosses pane by pane —\na warm and green and breathing air,\nthe long glass shoulder of the arbor.\n\nI never asked the driver what he’s told\nof women and the gardens where they grew.\nThe nine goes nowhere near my home;\nit only skims the shallow of the deep.\nMy mother’s ring is under stone.\nThe things I know, I do not know\nthe way the sky insists on blue —\nI know them like a seat, alone,\nthe way a stranger lets you pass.\n\nThe vents breathe on my hands; the cold\nclimbs in anyway, climbs through.\nSomeday the route will end its run\nand strangers there will call it own —\nthe glass, the green, the light long flown.\nBut not tonight. Tonight it’s true:\nthe brakes let out their small low moan,\nthe stop arrives, and I ask none\nof what I want. And then it’s done.',
          },
          { kind: 'margin', text: 'every line has its partner. one waits.' },
        ],
      },
    ],
    answer: { format: 'restoration key — letter + line', hash: '02dbaac459e31c8e' },
    restored:
      'Chart the end-rhymes and every line finds its partner somewhere in the poem — across stanzas, in threes and fives — except the ninth. Its word waits for a partner the poem never says. A, line nine, from the one word left unanswered. She rode the nine past the glass for years and never once got off; the poem is the reason, and the missing rhyme is the reason too.',
  },
  {
    id: 20,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'NEWSPAPER CLIPPING — "COUNTY ARCHIVE MARKS FORTY YEARS"' },
          {
            kind: 'para',
            text: 'A staff photograph, one figure half out of frame at the edge. The caption lists the staff; one name is printed VERA OSTRA_DER — a letter simply dropped from the type. The article is cheerful: shelf counts, anniversaries, a quote from the archive’s longest-serving cataloguer.',
          },
          { kind: 'label', text: 'SURFACE SCAN: proof-marks in her ink ride the newsprint. SPECTRAL separates ink from type.' },
        ],
      },
      {
        light: 'spectral',
        blocks: [
          { kind: 'label', text: 'SPECTRAL — her corrections, a proofreader’s hand. Some are flagged with a tiny bird glyph; the rest are unmarked:' },
          {
            kind: 'table',
            rows: [
              ['ERROR IN PRINT', 'HER MARK', 'FLAG'],
              ['"nineteen thirty-nine" (founding year)', 'corrected to thirty-eight', '(bird)'],
              ['"eleven thousand volumes"', 'corrected: fourteen', '(bird)'],
              ['"Mrs." before her name', 'struck out', '(none)'],
              ['a misquote of her one sentence', 'quotation marks struck', '(bird)'],
              ['the dropped letter in the caption', '"^ — count what the type dropped."', '(bird)'],
              ['a smudged column rule', 'redrawn', '(none)'],
            ],
          },
          { kind: 'margin', text: 'the bird marks what I gave them. The rest the printers managed on their own.' },
        ],
      },
    ],
    answer: { format: 'the dropped letter + its count in the printed name', hash: 'b802d1cbc55c93e9' },
    restored:
      'Count the printed name, letter by letter: V-E-R-A-O-S-T-R-A — and the gap falls tenth. The dropped letter is N, and the caret is her own: she seeded the interview with small wrong things and made sure the paper of record misspelled her. A record with a hole in it is a door. N, slot ten.',
  },
  {
    id: 21,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'RULED PAGE — "INVENTORY" — THIRTEEN NUMBERED ROWS' },
          {
            kind: 'para',
            text: 'Only one column visible in ink. WHAT: 1 the letters from before · 2 the photographs · 3 the recital programme · 4 the address book · 5 the hospital band · 6 the pressed corsage · 7 the school reports · 8 the joint passbook · 9 the map of the county · 10 the wedding linen · 11 the diary, the one before this · 12 the milk-teeth tin · 13 the name, everywhere it was',
          },
          { kind: 'label', text: 'Two further columns underlie the page in other media. Raking and UV each hold one; spectral untangles where they cross.' },
        ],
      },
      {
        light: 'uv',
        blocks: [
          { kind: 'label', text: 'UV — a second column between the lines, SHIFTED ONE ROW DOWN from true. WHERE:' },
          {
            kind: 'para',
            text: '· the stove at Larkspur · the county incinerator · left on a train, meant · the river, weighted · the hospital bin · pressed again, then burned · the school’s own files, requested back · closed, notarized · burned with the diary · given to the church sale · the greenhouse stove · buried with her mother’s ring · (the last line is blank)',
          },
        ],
      },
      {
        light: 'raking',
        blocks: [
          { kind: 'label', text: 'RAKING — a third column, written dry, no ink at all, SHIFTED ONE ROW UP from true. WHY IT HURT:' },
          {
            kind: 'para',
            text: '(the first line is blank) · because he read them first · because she sang · because every page was us · because it named the ward · because he pinned it on me · because they praised her hand · because my money was in it · because it showed the way out · because it was a gift · because it named her · because they were hers · because it was mine',
          },
        ],
      },
      {
        light: 'spectral',
        blocks: [
          { kind: 'margin', text: 'What, where, why — never on the same line. I couldn’t bear them touching. When the weave is true, the eleventh gives its initial.' },
        ],
      },
    ],
    answer: { format: 'restoration key — letter + slot', hash: '3b28eb8b0703c435' },
    restored:
      'Rewoven — WHERE up one, WHY down one — the eleventh row assembles: the diary, the one before this — the greenhouse stove — because it named her. The eleventh gives its initial: D. Thirteen destroyed things, thirteen letters: the inventory of the erasure is the same length as the name it protected. D, slot eleven.',
  },
  {
    id: 22,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'CATALOG CARD — COUNTY ARCHIVE, 1959. PRISTINE.' },
          {
            kind: 'para',
            text: 'The oldest thing in the book, kept like a relic. Typed, stamped DRAWER 2, unworn. The card reads:\n\n"ITEM OF INVENTORY, LODGED MAY: A PRACTICAL GUIDE TO GLASSHOUSE CULTIVATION. SHELVED FOR THE COUNTY BY MISS V. O., HER EARLIEST DAY. SHELF TWO, ROW SIX, TIER FOUR, SOUTH STAND."',
          },
          {
            kind: 'label',
            text: 'MAGNIFICATION: the card is pierced. Twenty-one needle-holes, each above a letter of the type. Hole positions, counting letters only, spaces and stops ignored: 1 · 6 · 7 · 16 · 20 · 21 · 22 · 24 · 45 · 51 · 54 · 70 · 74 · 75 · 92 · 93 · 108 · 116 · 121 · 126 · 129',
          },
          { kind: 'margin', text: 'a girl’s game, decades before she learned fear. She pricked herself into the catalog like a name carved in a tree.' },
        ],
      },
    ],
    answer: { format: 'the pricked sentence (five words)', hash: '1c5bcfb7be0fbbcd' },
    restored:
      'The holes, letter by letter, in the card’s own order — a sentence from a nineteen-year-old with nothing to hide. Why she became an archivist: I wanted to be the one who decides what is remembered. The greenhouse thread began on her earliest day, in glass and growing things, before any of it needed to be secret. E, slot two — from Drawer 2.',
  },
  {
    id: 23,
    layers: [
      {
        light: 'plain',
        blocks: [
          { kind: 'heading', text: 'CENSUS SHEET, 1950 — ONE LINE SCRAPED TO FIBER' },
          {
            kind: 'para',
            text: 'A household enumeration sheet bearing a rooming-house stamp: WEXFORD HOUSE 214. Her annotation beside it: "found in his room. Two-fourteen kept everything."',
          },
          {
            kind: 'table',
            rows: [
              ['LINE', 'NAME', 'RELATION', 'SEX', 'AGE', 'NOTES'],
              ['1', 'OSTRANDER, EDITH', 'wife', 'F', '34', 'years married: 12'],
              ['2', '(child)', 'daughter', 'F', '10', 'at school'],
              ['3', '——— scraped to fiber ———', '', '', '', 'surname index margin: "R. O."'],
              ['4', '(child)', 'son', 'M', '6', ''],
              ['5', '(child)', 'daughter', 'F', '2', ''],
            ],
          },
          {
            kind: 'label',
            text: 'SHEET TALLY BOXES (enumerator’s own arithmetic): persons 5 · male 2 · female 3 · aggregate age 93 · one HEAD per household, mandatory. RELATION CODES, printed on the form: every wife implies a head. The scrape is decades older than every other erasure in the volume.',
          },
        ],
      },
    ],
    answer: { format: 'line 3, reconstructed — relation, sex, age', hash: '80a4ea71fe723cab' },
    restored:
      'The grid forces line 3: male, 41, head of household — R. O., her father, scraped out by her mother’s hand when Vera was ten. The sums still balanced. That is the whole of her education, and the name the certificate is assembling is the one she was born with and took back. R, slot three.',
  },
];
