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
Assigned so far: **L2 = R→13** (Carbon Paper), **L7 = S→6** (Library Slip).
(Design bug caught by test-graph on day one: R was first assigned slot 12,
but slot 12 of VERAOSTRANDER is E — R lives at 3, 8, 13.)
Remaining 11 assigned during Act II page design.

## Root page solutions (full specs in design/root-pages.html)

| p | answer | mechanism | core move |
|---|--------|-----------|-----------|
| 01 | `1961` | catalog cross-reference | prove the one dealer-code scheme consistent across lot 44; the blade spared the year on purpose ("a year alone finds no one") |
| 02 | `MAGPIE` | null cipher | six 100%-OCR-confidence words were re-inked later; they misfit their sentences; initials in page order |
| 03 | `THURSDAY` | ledger anomaly | balance is perfect, prices are falsified; falsified dates share a weekday via "March begins, a Sunday" |
| 05 | `GREENHOUSE` | floriography | sampler key inside back cover; two flowers pressed upside down invert ("a bloom reversed speaks its opposite") |
| 11 | `R→13` | mirror reconstruction | invert+mirror the double-struck carbon; REF 13-R + white-pencil note "the last letter is the one they kept" |
| 16 | `S→6` | date-interval cipher | gaps between due-date stamps, 1–26; eight signal intervals (≤26 days) spell "SIXTH IS S"; long gaps are noise |

Design law learned here: **every solve self-confirms at the moment it
lands** — in a no-hints game, that click is the validation.

## Open design decisions

- Husband: fully mundane vs. one deniable sliver of uncanny (lean mundane —
  the horror is that records really work this way).
- Granddaughter in Delivery: on-page vs. off-page (lean off-page; one reply
  letter, no face).
- Monetization gate placement (solving depth, not page access).
- Remaining 11 letter-slot assignments; instrument flavor layers on
  already-solved pages (candidates: 02 under UV, 05 under raking, 14 under
  spectral); playtest the early-crack path to seal 25.

## Mechanism bench (series inventory — future entries, not waste)

book cipher keyed to the journal's own pages · knitting-chart encoding ·
watermark alignment across leaves · torn-edge matching · fold-mark adjacency ·
shredded-strip reconstruction · microprint at magnification threshold ·
sewn-gathering misordering · recipe-quantity cipher · hymnal-number cipher
