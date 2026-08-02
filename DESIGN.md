# The Bindery: Unwriting — DESIGN (TOTAL SPOILERS)

Ground truth for Entry One. Everything here is a spoiler: the plot, all three
endings, every designed solution. Interactive versions of the graph and root
specs: `design/key-graph.html`, `design/root-pages.html`.

## Premise

The app is a conservator's workstation at the Bindery, a lab for rare and
expensive books. A water-damaged journal arrives in estate lot 44, flyleaf
name excised. The author — **Vera Ostrander** — was an archivist who erased
herself from every record to escape her husband, a county records clerk who
used the machinery of documentation (licenses, forwarding addresses, key
registries) to hold her. The journal is the one copy of her life she kept,
damaged and enciphered by her own hand into a **restoration protocol**: each
solved page yields a key ("if you understand my life, you may have the next
piece"), keys feed later pages. The lock was built for one reader — her
granddaughter **Magpie**, raised apart for her own safety. The player is not
Magpie. Around the midpoint the software starts noticing: OCR transcribing
words that aren't in the scan, restored pages referencing the player's own
session timestamps (rule 16: in-app data only, provably harmless).

## Acts (narrative arcs, NOT access gates — the book is open)

- **I — Intake** (01–09): routine job; Vera's ordinary surface life; the
  damage revealed as editing. Ends: OCR reads a fully bleached page aloud.
- **II — Recovery** (10–23): the erasure campaign told in REVERSE — the
  deeper the restoration, the further back her life. The husband appears
  only through documents. 13 pages yield the letters of her name.
- **III — The Last Signature** (24–28): the journal addresses the actual
  reader; the checks were written for Magpie and the player passes them
  anyway, feeling the wrongness.

## Endings (p28: entering the name IS the choice — where, not whether)

- **Accession** — file into the public archive: preserved forever, exposed
  forever. Epilogue: one search result where none existed.
- **Delivery** — find the granddaughter, hand it over part-sealed. Warmest,
  hardest to earn (optional Act II deductions, signposted).
- **Blank** — the secure-deletion routine. The library thereafter shows an
  empty slot. The player honors the erasure and is the last to know her.

## The name mechanism

FULL_NAME = VERAOSTRANDER (13 letters, 13 slots). Letter keys log as
letter + slot in scrambled discovery order. p28 consumes the 13 letter KEYS
plus 4 seals — typing a guessed name does nothing (anti-leak, rule 15).
All thirteen slots assigned (test-graph enforces the full bijection):
V1(p10) E2(p22) R3(p23) A4(p18) O5(p15) S6(p16) T7(p14) R8(p12) A9(p19)
N10(p20) D11(p21) E12(p13) R13(p11).
(Design bug caught by test-graph on day one: R was first assigned slot 12,
but slot 12 of VERAOSTRANDER is E — R lives at 3, 8, 13.)

## Canon (set during Act II design)

- **Ostrander is her maiden name, reclaimed** — the census (p23) reveals her
  scraped-out father, R. Ostrander; the name the player assembles is the one
  she was born with, not his. E. is never named, ever, in any act.
- Daughter: **Ann** (Halloran after the adoption; Magpie's mother).
- Timeline: born 1940 · census 1950 (age 10, mother Edith) · archive at 19
  (1959, Drawer 2) · journal begins 1961 · wedding June 1974, Trinity
  Registry Office · Ann born 1976 · drawing 1980 (Ann aged 4) · adoption
  ~1984 · flight to 14 Larkspur ~1985-86 · erasure campaign 1986-89 ·
  Nightingale = E. Nightingale, notary public, the radio friend.
Remaining 11 assigned during Act II page design.

## Root page solutions (full specs in design/root-pages.html)

| p | answer | mechanism | core move |
|---|--------|-----------|-----------|
| 01 | `1961` | catalog cross-reference | prove the one dealer-code scheme consistent across lot 44; the blade spared the year on purpose ("a year alone finds no one") |
| 02 | `MAGPIE` | null cipher | six 100%-OCR-confidence words were re-inked later; they misfit their sentences; initials in page order |
| 03 | `THURSDAY` | ledger anomaly | balance is perfect, prices are falsified; falsified dates share a weekday via "March begins, a Sunday" |
| 05 | `GREENHOUSE` | floriography — paired-opposites selection | sampler stitches each bloom crown-up/crown-down with a word pair; orientation selects the word. Upright-everything reads "remember the STONE house where we were FOUND so gladly" → STONEHOUSE, a 10-letter trap that fits the format and fails. Honoring the two overturned blooms (flax, thistle): "the GLASS house where we were LOST so gladly" → GREENHOUSE. Reversal is load-bearing (Simon 2026-08-02); no letter assembly — that solving arc belongs to p02 (initials) and p07 (mapped letters), and a third use would violate rule 18's spirit (Simon caught an acrostic redesign doing exactly that) |
| 11 | `R→13` | mirror reconstruction | invert+mirror the double-struck carbon; REF 13-R + white-pencil note "the last letter is the one they kept" |
| 16 | `S→6` | date-interval cipher | gaps between due-date stamps, 1–26; eight signal intervals (≤26 days) spell "SIXTH IS S"; long gaps are noise |

Design law learned here: **every solve self-confirms at the moment it
lands** — in a no-hints game, that click is the validation.

## Act I dependent-page solutions (full specs in design/act1-pages.html)

| p | answer | mechanism | core move |
|---|--------|-----------|-----------|
| 04 | rim tick `61` → RAKING | geometric alignment (chain A taught) | rim is a century dial 1900–1999; plate deliberately off-center so symmetry fails; her zero-dot inside tick 61 confirms. Lesson: the figure lies, the marks don't |
| 06 | `JUNE 1974` | impression reading | erased captions survive as embossing under raking light; "V. & E., J-ne 19-4" disambiguated by the KODAVUE corner stamp (EST. 1968) |
| 07 | `NIGHTINGALE` | dial mapping | filter the log to Thursdays (p03 ingredient); taped cipher-dial maps kHz→letters; 3 non-Thursday decoys decode to garbage |
| 08 | `74 (counterclockwise) + 6` → UV | two-ring alignment (chain A twisted) | astrolabe combination keyed to the wedding; outer ring runs BACKWARD (the arrow); Plate-I habit lands on mirror tick 26 and drifts. Foreshadows Act II reverse chronology |
| 09 | `14 LARKSPUR` | modular arithmetic | doodle-headed margin columns; flower columns' totals mod 26 spell LARKSPUR, bird columns sum to 14; instruction parseable only with MAGPIE + GREENHOUSE. LARKSPUR must NEVER appear among the page's doodles (Simon 2026-08-02: a visible larkspur made "14 <each flower>" an 8-guess brute force) — the remainders spell a flower the margins don't show, which is the self-confirm |

Act I invariants: instrument pages self-confirm by prediction-match; decoys
yield garbage, never near-misses; the husband appears only as "E." and is
never named in Act I. Note for implementers: mod 26 with remainder 0 = Z
never occurs in Act I answers (LARKSPUR contains no Z) — if a future page
uses remainder 0, define it explicitly on-page.

## Act II page solutions (full specs in design/act2-pages.html)

| p | yields | mechanism | core move |
|---|--------|-----------|-----------|
| 10 | V→1 + `ROOM 214` | forgery deduction | form footer Rev. 3/89 vs filing date 11/87 = backdated; "he never lied about the little things. Only field one" — field 1 is NAME |
| 12 | R→8 | fragment reassembly + symbol key | seal shards orientable only via expected text NIGHTINGALE; rim reads "E. NIGHTINGALE · NOTARY PUBLIC"; 8th char from the notch |
| 13 | E→12 | redaction metrology | bar widths vs her alphabet pitch strip; 12th bar = one character, mid-phrase "I do not fear ——." |
| 14 | T→7 | ink-bleed physics | diffusion model run backward, parameterized by JUNE 1974; line 7 = TRINITY REGISTRY OFFICE |
| 15 | O→5 | key-bitting code | final key B-2-4-9-0-5; "four cuts spell, the fifth files": 2+4+9+0=15=O, 5th cut = slot 5; reverse bears county key-registry stamps |
| 17 | SPECTRAL | delta collation (chain B taught) | twin entries, 7 deltas; anchor truth with ROOM 214 (visible twin says "post office") to train the ink separator |
| 18 | A→4 | channel-separation tracing | pencil under crayon: ANN HALLORAN, "aged 4. Our last summer." |
| 19 | A→9 | orphan rhyme (prosody anomaly) | REDESIGNED 2026-08-02 (Simon: add a hard poem puzzle, Armillary-inspired): the timetable's verso carries "The Nine" — Vera's only poem, 27 lines, written on the bus. Every end-word rhymes with a partner somewhere in the poem (cross-stanza, uneven groups, slant rhymes count) except ARBOR, line 9 — whose natural partner, harbor, the poem conspicuously never says. Her note: "every line has its partner. one waits." Key: A 9. Timetable front (dots, notes) retained for Act III's route check |
| 20 | N→10 | planted-error harvest | bird-glyph proof-marks sort her seeded errors from misprints; caption prints OSTRA_DER; "^n — the tenth" |
| 21 | D→11 | tri-layer interleave | WHAT visible / WHERE in UV shifted +1 / WHY embossed shifted −1; item 11: the first diary — greenhouse stove — "because it named her" |
| 22 | E→2 | pinprick code | needle holes at plain magnification spell I FILED MYSELF HERE FIRST; DRAWER 2 stamp files the slot |
| 23 | R→3 | census-grid constraint deduction | answer = the full reconstruction HEAD M 41 (forced: 2nd male; aggregate age 93 − 52 = 41; mandatory head) — the margin index "R. O." supplies the letter only after the grid is proven (an unearned "R 3" was free-readable, fixed in content build). Her mother held the blade |

Act II invariants: letter keys are delivered legibly on solve (the page is
the puzzle, the key is the reward — doctrine 7); the mod-26 convention
taught at p09 recurs at p15 as HER convention, not a repeated mechanism (no
chain spent); 13 destroyed things (p21) = 13 letters; reverse chronology
lands the drawing (p18) before the census (p23) so the two gut punches
escalate; the reserved third chain is still unspent entering Act III.

## Act III page solutions (full specs in design/act3-pages.html)

| p | yields | mechanism | core move |
|---|--------|-----------|-----------|
| 24 | S1 | grille overlay | the drawing's window panes over the letter, MIRRORED ("as it folds"); panes read ONLY MY MAGPIE HOLDS BOTH PAGES · SAY THE NAME; after sealing: "…or someone holding her things. I wrote this for both of you." |
| 25 | S2 | cartographic trace | trace Larkspur → Route 9 → the glass; the mark goes ON THE ROAD at the window-view point — she never got off; marking it reveals the greenhouse drawn as seen from a moving window |
| 26 | S3 | delta collation (chain B mastered) | three accounts of the night she left, no anchor; convict two with established record (courthouse vs Trinity line 7; fully-spelled name vs the engineered misprint); true account ends "I left at dusk, because the nine runs at night" |
| 27 | S4 | nested composite | raking → "begin with the bird" + 1210 kHz → dial letter → grid cell on the pitch strip → UV → "Drawer two, line three" → E,R computed but countersign is V.O. ("sign the woman, not the cipher") |
| 28 | ending | choice | certificate assembles VERA OSTRANDER from the 13 keys (never typed); three signature lines = three endings |

## Endings (final mechanics)

- **Accession**: archive-record line. Epilogue: one catalog search result
  where none existed.
- **Delivery**: requires the earned breadcrumb — the FOREIGN OBJECT rubbing
  in p12 (flagged "not part of original binding" on first view) is a deed
  rubbing dated after Vera's last entry: parcel on ARBOR LANE (p19) →
  grantee A. HALLORAN (p18). Synthesis across three pages, never stated.
  Nightingale tucked it in before her own estate was sold — which is why
  the journal was in an estate lot at all. Without it: "recipient unknown"
  (visible, signposted). Epilogue: one reply letter, no face, signed "M." —
  "She taught my mother the flower alphabet. Nobody ever told me why. I am
  learning it now."
- **Blank**: disposal authorization, double-confirmed in procedural voice.
  Epilogue: empty library slot, damage log dims key by key in discovery
  order, final screen is the blank intake ticket.

## Canon closed in Act III

- ANOMALY RESOLUTION (rule 2): every "journal notices you" beat is Vera's
  contingency writing — she wrote branches for Magpie AND for a stranger
  from the start ("I wrote this for both of you"). Nothing uncanny; the
  husband stays fully mundane, never named, never seen. The one physical
  intrusion is Nightingale's rubbing, flagged honestly by the software.
- Granddaughter stays OFF-PAGE: one reply letter, signed M.
- Chain accounting final: chain A (04→08), chain B (17→26), third chain
  SHIPS UNSPENT — 2 chains + 23 one-off mechanisms.
- p27's trap: the steps compute E,R but the countersign is V.O. — the exam
  distinguishes computing from understanding.

## Open design decisions

- Monetization gate placement (solving depth, not page access).
- Instrument flavor layers on already-solved pages (candidates: 02 under
  UV, 05 under raking, 14 under spectral); playtest the early-crack path
  to seal 25.

## Mechanism bench (series inventory — future entries, not waste)

book cipher keyed to the journal's own pages · knitting-chart encoding ·
watermark alignment across leaves · torn-edge matching · fold-mark adjacency ·
shredded-strip reconstruction · microprint at magnification threshold ·
sewn-gathering misordering · recipe-quantity cipher · hymnal-number cipher
