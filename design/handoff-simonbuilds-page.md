# Handoff — build simonbuilds.app/bindery/

Paste this whole file into the SimonBuilds.app chat. It is self-contained.

---

## What to build

A game page for **The Bindery: Unwriting** at **`simonbuilds.app/bindery/`**,
plus a card for it on the simonbuilds.app index.

Follow the existing **app** convention — a path, not a subdomain. Precedent:
`/inkwell/`, `/tally/`, `/dundue/`. (Subdomains like `numbernine.` and
`bestiary.` are used for "world" projects; a new subdomain would also need a
manual Cloudflare A record, DNS-only, since DNS moved off SiteGround on
2026-08-07. A path avoids that entirely.)

**IMPORTANT — correct a stale status.** The simonbuilds.app site currently
lists The Bindery as *In Review*. It went **LIVE on the App Store on
2026-08-18**. Update the existing card rather than adding a second one.

---

## Facts (all verified against App Store Connect)

- **Title:** The Bindery: Unwriting
- **Subtitle:** A journal. No hints. Ever.
- **App Store:** https://apps.apple.com/us/app/id6797783492
- **App ID:** 6797783492 · **Bundle:** com.bindery.game
- **Released:** 18 August 2026 · **Version 1.0**, build 2
- **Platform:** iOS 16.4+, iPhone only (no iPad)
- **Age rating:** 9+
- **Price:** Free to download. Act I (leaves 01–09) restores free; a
  **one-time $5.99 unlock** enables restoring leaves 10–28. All 28 leaves are
  *readable* either way — the paywall gates restoring, never reading.
- **Contents:** 28 leaves, 25 distinct puzzle mechanisms, 3 endings
- **Privacy:** no data collected by the developer; no account, no ads, no
  tracking. RevenueCat sees a purchase receipt and an anonymous id.
- **First entry in "The Bindery" anthology** — the series frame is a
  conservator's digitization lab, so later entries can be tapes, maps,
  microfilm, letters. Subtitle pattern is a bare gerund (Unwriting, Unsending).

## Existing pages that already work — link, don't duplicate

- Support: https://texas0418.github.io/bindery/
- Privacy: https://texas0418.github.io/bindery/privacy.html
- **Press kit (finished, with screenshots):**
  https://texas0418.github.io/bindery/press.html

The site page should link to the press kit rather than re-implement it. If you
would rather host the press kit on simonbuilds.app for brand consistency, the
source is `docs/press.html` in the `bindery` repo — but the GitHub Pages
version is live now and used in outreach emails already sent, so **do not
break or redirect those URLs**.

---

## Copy you can use verbatim

**One-liner:**
> A puzzle journal. Twenty-eight leaves. Three endings. No hints.

**The premise (short):**
> You are a conservator restoring a water-damaged journal written by a woman
> who spent four years deliberately erasing herself from every record that
> named her — and the journal was locked so that only her granddaughter could
> open it. You are not her granddaughter. It works that out.

**The four selling points:**
1. *There is no hint button, and that is the product.* No skip, no nudge, no
   pity timer — and equally no timers, no limited guesses, no fail states.
   Every answer field declares the shape of the answer it wants.
2. *Almost nothing repeats.* Twenty-five distinct solving logics across
   twenty-eight leaves. A ledger whose balance is honest and whose prices are
   not; a radio log where one weekday matters; a census sheet whose own
   arithmetic forces the line that was scraped away.
3. *The paywall never hides story.* Every leaf is readable from the first
   minute. The purchase gates the act of restoring.
4. *One ending is permanent.* Where you sign decides what happens to her. One
   of the three really does delete your restoration. The app asks twice.

**Quotable:**
> "There is no hint button, and there never will be one. If you are stuck, you
> are stuck with everything you need — that is the deal, and it is the whole
> game."

**Do NOT publish:** any puzzle answer, any leaf-by-leaf detail, or the
walkthrough link on a player-facing page. The walkthrough exists for press and
App Review only. Spoiler-resistance is a design rule for this project.

---

## Art and palette

Assets live in the `bindery` repo at `docs/press/`:
- `screen-1-no-hints.png`, `screen-2-contents.png`, `screen-3-instruments.png`,
  `screen-4-restored.png`, `screen-5-damage-log.png` — all 1242×2688
- `icon-1024.png` — app icon

Palette (matches the app and the press kit):
- bench `#14161a` · panel `#1d2026` · edge `#32363e`
- text `#e8e6e0` · soft `#a5a29a` · faint `#8b8880`
- gilt `#b8925a` · oxblood `#421313`
- Type: monospace chrome (`ui-monospace, Menlo`) against a serif for the
  book-side voice. The app pairs mono UI with Didot/serif page text.

The icon is "Oxblood & Gilt" — oxblood leather, double gold fillet frame,
gilt Didot "B" monogram. Each Bindery entry recolours the leather and keeps
the frame and monogram.

---

## Deploy notes

- `ssh siteground-simonbuilds`, doc roots under `~/www/`
- **Flush SuperCacher after every deploy**, or the change will not appear
- DNS is on Cloudflare since 2026-08-07 — only relevant if you add a
  subdomain, which this page does not need
- **Heads up:** SSH to SiteGround was timing out on 2026-08-18 from this
  machine (`ssh: connect to host ssh.simonbuilds.app port 18765: Operation
  timed out`). It may be an offshore-uplink issue. Retry; if it persists it is
  a SiteGround-side problem, not the page's.

---

## Definition of done

1. `simonbuilds.app/bindery/` live, theme-aware if the site's other app pages
   are, with a working App Store button.
2. The index card updated from *In Review* to live, linking to the new page.
3. Links to the App Store, support, privacy and press kit all resolve.
4. No puzzle answers anywhere on the page.
5. SuperCacher flushed and the live URL actually checked in a browser.
