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

- [ ] Act I non-root pages (04, 06, 07, 08, 09) — full specs
- [ ] Act II + III page specs; assign remaining 11 letter slots
- [ ] Page screens + the three instrument render modes (raking/UV/spectral)
- [ ] Answer hashing (underwood pattern) — plaintext leaves src/ before ship
- [ ] Monetization gate placement decision (solving depth; open book forbids
      page-gating) + RevenueCat keys + App Store Connect record
- [ ] Instrument flavor layers on already-solved pages
- [ ] Anomaly beats script (each with its one-sentence explanation, rule 2)
- [ ] Device QA at max Dynamic Type (rule 11) + 60fps scan-viewer gate
- [ ] CI: run `../ci-template/bootstrap-pipeline.sh` + branch protection
- [ ] Store listing: "brutally hard, no hints" positioning (rule 17)
