# Product pages - status snapshot (28 Jun 2026)

> Snapshot written by the outgoing coordinator terminal. Live state lives in `docs/product-page-build-QA.md`
> (the new coordinator owns that). All wireframe on `main`, nothing deployed.

## Built & screenshot-verified
- **Ghostwriter** - the reference build. Done, card live. `wireframes/module-ghostwriter.html`.
- **Brief Coach** (Terminal A) - heavily iterated with Paul, rebuilt from the REAL coach method (read the actual
  `/sabre-brief-coach` references): correct metric levels (Commercial -> Customer behaviour -> Memory ->
  Communication -> Activity), the precision rule ("comms/memory ARE outcomes, just not *commercial*"; only
  activity is an output), clinical-neutral voice, jargon stripped, interactive step-by-step pyramid + chat (lights
  each rung, like the Ad Resizer Run button). Card wired (strategy). **Awaiting Paul's final click-through.**
- **Advertising Agent** (Terminal F) - NEW product, replaces "Ad Maker": one agent that makes -> launches ->
  analyses -> optimises. Real fox ads as proof; live+analyse half is method-only (no fake numbers, structured so a
  real results block slots in later). Backed up on branch `advertising-agent-page`. **Card not wired yet.**
- **Outbound Agent** (Terminal G) - cold acquisition, the real 12-step machine, 3 human gates, four real cold
  emails (names redacted), no performance numbers, external expert redacted for IP. **Card not wired yet.**
- **Ad Resizer** + **Brand Guardian** - built earlier, cards live; still need the full nav (Brand Guardian also the
  matched Isa).

## In progress
- **Campaign Manager** (Terminal H) - the featured bundle. Generic illustrative data only (real op confidential);
  never called "Jo" or "Klara".

## Not built yet
Copywriter, Brand Scorecard, Segmentation, Competitor Positioning Map, DBA Audit, Company Intelligence, Research
Interviewer, Review Intelligence, Page Conversion Audit.

## Decisions waiting on Paul
1. **Brief Coach** - final read.
2. **Advertising Agent honesty flags (Terminal F):**
   (a) the real `/fox-html-ads` uses HTML/CSS + Playwright + ffmpeg, **NOT Chart.js** - F dropped Chart.js; confirm.
   (b) is **Kling v2.6 (fal.ai)** actually used for fox video, or **Seedance 2.0 only**? The skill documents Seedance only.
3. **Outbound Agent (Terminal G) defaults to ratify:** recipient names redacted to `[name]`, zero performance
   stats, but the process/scale facts shown (650 sourced -> 124 qualified -> 120 send-ready; 1,144-profile
   campaign). OK to keep those?

## Cross-cutting correction
The Chart.js flag means the **Ghostwriter reference + the briefs are slightly off** (they say "Chart.js +
Playwright"). If F is right (they checked the skill), correct the reference's What-it-uses to
"HTML/CSS + Playwright + ffmpeg" so the unbuilt pages don't inherit the error.

## The set, reshaped
"Ad Maker" became **Advertising Agent** (end-to-end). New additions this sprint: **Brief Coach**, **Campaign
Manager** (bundle). Still open with Paul: the rest of the priority "make next" order (Copywriter, the strategy
cluster, the research cluster, Page Conversion Audit).
