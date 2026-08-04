# The Bindery

**Entry One: Unwriting** — an interactive puzzle-journal. You are a
conservator at the Bindery, a digitization lab for rare and expensive books;
the app is your workstation. A water-damaged journal arrives with its
flyleaf name cut out by blade. Restoring it means solving it: every page is
a puzzle the author built, every solved page yields a key a later page
consumes, and the deeper you restore, the clearer it becomes that the
damage was never damage — and that the lock you are picking was built for
someone else.

Brutally hard, no hints, by doctrine. Every page browsable from the start,
like a real book. 28 pages, ~25 distinct puzzle mechanisms, three endings.

THE BINDERY is anthology-shape: engine + screens are series infrastructure,
everything Unwriting is data in `src/content/unwriting`. Entry Two is a
content drop.

- **Doctrine (18 rules) in AGENTS.md** — no hints, open book, maximum
  mechanism variety, the frame is law, fiction-claims-to-see-you but the
  app provably never does.
- **DESIGN.md + design/ are total spoilers** — plot, endings, solutions,
  the dependency graph, the root-page specs, the icon source.
- `test-graph.ts` proves the structural claims (reachability, roots,
  frontier width, letter slots, mechanism uniqueness) on every `npm test`.

## Run

```
npm install
npm run ios        # or: npx expo start
npm test           # pure-module tests incl. the doctrine enforcer
npm run typecheck
npm run lint
```

## Pre-ship TODO

- [x] All 28 page specs (design/*.html + DESIGN.md)
- [x] Page screens + answer hashing (spoilers sealed out of src/,
      enforced by test-content.ts)
- [x] Act I playable end-to-end (pages 01–09; proven by the test-content
      playthrough simulation)
- [x] CI: fleet pipeline + branch protection (bootstrap 2026-08-01)
- [x] Act II + III content transcription (all 28 leaves playable)
- [ ] Interaction upgrades: real rotation UI for the Calibration Plates
      (restores Plate II's counterclockwise trap), overlay mode for p24,
      map trace for p25
- [ ] Spectral render mode (first needed by p17)
- [ ] Art pass: figures replace text-mode scan blocks (logic unchanged)
- [x] Monetization gate placement DECIDED (Simon 2026-08-04): Act I restores
      free, leaves 10–28 need the one-time unlock; browsing all 28 stays free
      (doctrine 10b). Gate is wired and inert until real keys land.
- [ ] RevenueCat project + real API keys (proAccess fails OPEN until then,
      so the gate does nothing in any build shipped before this)
- [ ] App Store Connect app record (Simon — not creatable via the API)
- [ ] Instrument flavor layers on already-solved pages
- [ ] Anomaly beats script (each with its one-sentence explanation, rule 2)
- [ ] Device QA at max Dynamic Type (rule 11) + 60fps scan-viewer gate
- [x] Shipping-build ending behavior: Blank wipes for real, the signature is
      final (src/buildConfig.ts QA_BUILD; test-content asserts it ships false)
- [ ] Store listing: "brutally hard, no hints" positioning (rule 17) —
      copy drafted in design/store-listing.md
