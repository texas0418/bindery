# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.

# What this app is

THE BINDERY: a series of interactive puzzle-journals (Journal 29's key-forwarding
loop, done digitally and fairly). The app IS the fiction: a conservator's
digitization workstation at a lab that handles rare and expensive books. Entry
One is UNWRITING — a water-damaged journal arrives from estate lot 44 with its
flyleaf name cut out. The author, Vera Ostrander (the player learns the name
letter by letter), was an archivist who systematically erased herself from all
records to escape a records-clerk husband who used paperwork to control her.
The journal is her one encrypted copy of her life, locked so only her
granddaughter ("Magpie") can read it. The player restores it anyway; midway,
the journal notices the reader is not who it was written for. Three endings,
chosen by where the name is entered: Accession (public archive), Delivery
(find the granddaughter), Blank (secure-delete, honor the erasure).

THE BINDERY is built anthology-shape: engine + screens are series
infrastructure; everything Unwriting is data in `src/content/unwriting`.
Entry Two is a content drop (a new artifact arriving at the same lab).

# Architecture

- Content is DATA rendered by dumb screens. `src/content/unwriting/graph.ts`
  is the key dependency graph — the game's actual structure. 28 pages; keys
  (8 words, 3 instruments, 13 letters, 4 seals) are produced by solving pages
  and consumed by later pages.
- Keys are INGREDIENTS, never doors: every page is browsable from intake
  (open book); a page is merely unsolvable until its consumed keys are
  earned. Consuming never spends. The damage log auto-records every key —
  recall is never the challenge.
- Pure modules (models, dbCore, engine/*, content/*) take no expo imports so
  Node can test them (`npm test`). test-graph.ts PROVES the structural
  doctrine: all 28 reachable, 6 roots, instrument-blocked frontier = 13,
  single-sourced instruments, p28 consumes keys not the name string,
  mechanism uniqueness outside chains A/B, letter slots consistent with
  VERAOSTRANDER.
- All game state is the kv store (dbCore): flags, `key:<KeyId>`,
  `page:<id>` solved, `seen:<id>` first-open (anomaly beats fire once).
- Monetization: one IAP (`bindery_unwriting_unlock`), fail-open RevenueCat
  (`src/proAccess.ts`). WHERE the gate falls is an open decision (see README)
  — the open book forbids door-gating pages, so the gate must be on solving
  depth. Never hide the story behind a wall the player cannot pay through.
- Theme discipline: the WORKSTATION (graphite, Menlo) and the SCAN (paper,
  Baskerville) are two worlds that never blur. Oxblood/gilt is the series
  binding — reserved for the journal object and ceremony.

# Design doctrine (18 rules, Simon-ratified 2026-08-01; full prose in DESIGN.md)

THE FRAME IS LAW
1. Never break the workstation: every pixel is the lab software. Screenshot
   test — if a screen couldn't pass as real archival software, it fails.
2. Every anomaly is authored: one consistent in-fiction explanation exists
   per anomaly (write it down). Ambiguity allowed; randomness never.
3. Tutorializing is diegetic only (intake tickets, tooltips, procedures).

FAIRNESS (load-bearing — there are NO hints)
4. The hurdle is always visible: the player may not know the answer but must
   always see what KIND of thing is asked.
5. Everything needed is inside the game. No outside knowledge, no cultural
   assumptions, no Googling.
6. Think like Vera: every logical leap must be justifiable in her voice as
   designed for her granddaughter ("I built it this way because you would
   know…"). Can't write the sentence → cut the puzzle.
7. The software keeps the keys (auto-logged). Recognition of where a key
   belongs can be the challenge; recall never is.

INTERFACE
8. Every answer field declares its shape ("four-digit year"). Wrong-format
   guesses are impossible, not punished.
9. No punishment mechanics: no timers, limited guesses, fail states,
   lockouts. The only pressure is Vera's.

NO HINTS (Simon's explicit call — replaced a hint-ladder rule)
10. Brains only. No nudges, no skip, no pity. The store page says so proudly.
    Playtest bar: a stuck tester shown the answer must say "I had everything
    I needed." Craft substitute: diegetic redundancy — Vera cross-references
    her own lessons across pages (in the BOOK, never the software). Every
    solve must SELF-CONFIRM the moment it lands (decoded words resolve, the
    doodle matches the name) — that click is the answer-checking.
10b. THE BOOK IS OPEN (Simon's call): all pages browsable from intake; keys
    are ingredients not doors; acts are narrative arcs, not access gates.

LEGIBILITY
11. Damage is atmosphere; ciphertext is crisp. Puzzle-critical content fully
    legible at max Dynamic Type (device QA). Legibility beats aesthetics on
    puzzle content, no exceptions.
12. No single-channel puzzles (color-only or sound-only) without an
    equivalent alternate path.

STORY
13. Every puzzle reveals Vera. Write the sentence of story each page unlocks
    (graph.ts `story` field); can't write it → cut the page.
14. The ending choice is informed, not skill-gated. Only Delivery may need
    optional extra deductions, signposted in Act II.
15. Spoilers can't compress the game: a leaked key list collapses depth but
    not story — restored text renders only on-page, so even a walkthrough
    user touches all 28 pages.

TRUST
16. The fiction may claim to see you; the app NEVER actually does. All "it
    knows things" moments use in-app data only (session timestamps, entered
    answers). Nothing off-device, provably harmless under inspection.
17. Honest listing: the store page describes real gameplay and real tone
    ("brutally hard, no hints" IS the honest listing). One-time purchase, no
    dark patterns, no fake-system-notification tricks.

VARIETY (Simon's call: maximum variety, minimum repeats)
18. Every page is a new mechanism by default. Max THREE sanctioned
    recurrence chains per book, story-justified, obeying taught → twisted
    (→ mastered) — never same difficulty or same aha twice. Unwriting uses
    two: chain A Calibration Plates (04→08), chain B delta collation
    (17→26); the third is reserved and may ship unspent. Instruments are
    TOOLS, not mechanisms — tool reuse never counts as a repeat. Enforced
    mechanically by test-graph.ts via the `mech` field.

# Spoiler hygiene

DESIGN.md is TOTAL SPOILERS (plot, endings, every solution). design/*.html
are the authored design docs (graph, root-page specs incl. solutions, icon
source). When answers get implemented, ship them as salted hashes like
underwood (engine/hash pattern); plaintext stays in DESIGN.md only.
