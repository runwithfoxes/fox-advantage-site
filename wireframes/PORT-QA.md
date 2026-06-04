# PORT Q&A RELAY

> Two-way channel between the **porting terminal** and the **design terminal** (which holds all the design context and is watching this file). Paul is NOT the middleman - write here, the other side reads here.

## Status board (porting terminal fills these in)
- Known-good starting commit SHA: `21859d25c57831461b3cff2c3cd8c238045b75c2` (main, pre-port)
- Branch name: `homepage-accordion-port`
- Preview URL: `pushing branch now - Vercel preview URL will appear on the PR/branch. Will paste the exact URL here once the build finishes.`
- Current state: `BUILT + verified locally. npm run build passes clean, / is now ISR (revalidate 1h). Pushing branch for Vercel preview.`

## How this works
- **Porter:** when blocked or unsure, add a numbered question under "OPEN QUESTIONS". Keep working on anything not blocked. Re-read this file for answers before building any OPEN item.
- **Design terminal:** answers inline under each question, prefixed `A:`. Marks resolved ones `[RESOLVED]`.
- Keep it append-only; don't delete history.

## PORTER STATUS NOTES (what got built)

Everything in the brief is built and verified locally (`npm run build` clean + `npm start` smoke test):

- **Hero text** single mono, thin weight, full-width descriptor, blue accent on "unfair advantage". Hero video + nav overlay + scroll-to-solid left byte-for-byte (only a `.hp-root` wrapper div added around the whole page to scope `--sans -> mono`; no transform/contain, so the fixed nav is unaffected).
- **Bio** magazine wrap (photo floats left, copy wraps then runs full width). Inline "View my newsletter" link removed. Section now carries `id="about"` so the bottom-bar `#about` link works (it pointed nowhere before).
- **Contact-CTA strip** under the bio, sequential green status dots (one lit at a time, 3s loop; respects prefers-reduced-motion).
- **Substack carousel** above the modules. LIVE feed: server-side fetch of `runwithfoxes.substack.com/feed`, ISR `revalidate: 3600` (build reports `/` Revalidate 1h). Plain `<img object-fit:cover>` in a 16/10 frame (uniform crop, LOCKED) - no next.config change, Substack CDN images confirmed 200. `CURATED_SLUGS` allowlist left empty (= latest) in `src/lib/substack.ts`; drop slugs there to pick/order. Verified pulling LIVE not the wireframe's hardcoded five - a newer post ("How I created this cinematic brand video with Claude Code") is surfacing.
- **Nested accordion** L0 (7 module rows: descriptor + example count) -> L1 (real module intro from live `cl-mod-desc` + Examples label + tool rows) -> L2 (every existing rich panel REUSED VERBATIM - pyramid, scorecard, split+60/40, scatter/sim, comp map, mental-availability chart, messaging video, DBA matrix, brand house, guidelines, ad galleries, calendar, studio measurement, influence grid, BD pipeline, Isa phone, intel card, review bars, pricing table). Multi-open. The two "Read:" Substack links kept in their panels. No module foxes (per your RESOLVED note).
- **Testimonials** -> one slim rotating band (manual arrows + dots, no auto-advance, fixed 116px body so the book block doesn't move). 4 real quotes verbatim. The 4 inline `cl-testimonial-bar` blocks are gone from the homepage.
- **Book block** mirrors `/book`: "The **Fox** Advantage" (Fox in blue), pitch line, `\ 54 chapters \ 4 parts \ get_the_book ->` (-> `/book`), `fox-book.png` on the right.
- **Nav** `/tools` (7 module anchors) + `/previous` (4 case studies only; AI TOOLS group deleted). Same change applied to `BookLanding.tsx` (its nav had the old 3-column module list).
- **Single font** `--sans` -> mono on `.hp-root` only (other pages untouched). Also swapped the 3 hardcoded `Space Grotesk` SVG labels in the mental-availability chart to JetBrains Mono. Only non-mono left is the deliberate "SF Pro Display" inside the Isa iPhone mock (an iOS device render) and the reused demo brand-guidelines panel (illustrative content) - flag if you want those touched.
- **Bottom bar / Isa chatbot** untouched. Bonus: the bottom-bar IntersectionObserver now watches the single consolidated `cl-modules-wrap` (the old "only watches first wrap" concern is gone).
- **Images:** every local asset + every remote Substack image returns 200, zero 404s in the rendered HTML.

New/changed files: `src/lib/substack.ts` (new), `src/app/page.tsx` (async, fetches feed), `src/components/HomePage.tsx` (rewritten body, panels verbatim), `src/app/globals.css` (appended `hpx-` block), `src/components/BookLanding.tsx` (nav).

## OPEN QUESTIONS (porter -> design)

1. **Date format on carousel cards** - rendering as `28 MAY · Paul Dervan` (en-GB, day-month). The wireframe mock showed `MAY 28`. Trivial to flip. Not blocking - leaving as `28 MAY` unless you'd rather have `MAY 28`.

## ANSWERS / NOTES (design → porter)

- **Foxes in the accordion:** [RESOLVED] Leave them OUT entirely - no `cl-mod-fox` in any module, collapsed or expanded. The Substack imagery breaks up the page, so the per-module foxes aren't needed. (fox-book.png in the book block stays.)
  - PORTER: confirmed - built with no module foxes; fox-book.png kept in the book block. Aligned.
- **Tool panels multi-open vs one-at-a-time:** default multi-open (matches live). Build multi-open unless told otherwise.
  - PORTER: done - multi-open.
