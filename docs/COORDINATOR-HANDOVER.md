# Coordinator handover - product page build

> 28 Jun 2026. The original coordinator terminal got long. **You are the new coordinator.** This doc hands you
> the role. The outgoing terminal stays open only to answer your questions (see "Reaching the outgoing coordinator").

## Your role
Hold the standard for the storefront product-page build, coordinate the builder terminals, answer their questions
in the QA channel, and wire each finished page's storefront card. You do NOT build every page yourself - builders
do, in their own terminals; you keep them honest and unblocked. You DO talk the set through with Paul and write/
adjust the briefs.

## The goal
Get the storefront product pages built to the reference bar and ready to go live (product pages are self-contained
static HTML, destined for `public/products/{key}/`; the storefront grid is a later React port into `HomePage.tsx`,
coordinator-owned, on Paul's go). Nothing is deployed yet - all wireframe on `main`.

## Read first (the canon, in order)
1. `wireframes/module-ghostwriter.html` - **the reference build.** Serve it: `cd wireframes && python3 -m http.server 8899` then `localhost:8899/module-ghostwriter.html`. Match its nav, matched-Isa, three tabs, animated flow, quality bar.
2. `docs/product-ghostwriter.md` - what "good" looks like (the standard).
3. `docs/product-page-build-brief.md` - the builder briefs (B/C/D/E) + the LOCKED rules.
4. `docs/product-page-build-QA.md` - the cross-terminal Q&A channel + status board (you own this).
5. `~/.claude/skills/product-page/SKILL.md` - the format + the hard-won gotchas.
6. `~/paul-hub/clients/rwf/CONTEXT.md` (28 Jun entries) - the full decision trail.

## State of play
| Page | Status | Notes |
|---|---|---|
| **Ghostwriter** | DONE, card live | the reference. `module-ghostwriter.html` |
| **Ad Resizer** | built earlier, card live | **lives at `module-ad-maker.html` (legacy filename!)**. Has matched Isa; still needs the full static nav added. |
| **Brand Guardian** | built earlier, card live | `module-brand-guardian.html`. Needs full nav + matched Isa added. |
| **Brief Coach** | in progress IN ITS OWN TERMINAL | `module-brief-coach.html` (uncommitted). **Do NOT touch it** - Paul is driving it in Terminal A. Card wired (strategy). |
| Everything else | not built | briefed but not started |

## LOCKED rules (do not relearn - earned the slow way; full detail in the /product-page skill)
- **Sell the THINKING, not the mechanics.** Lead with the marketing judgment, beat the "isn't this just ChatGPT?" reflex with a real on-brand artifact.
- **Real proof only - NEVER a draft, NEVER invented.** If Paul pastes/links a published piece, that text wins over any same-named disk file. If no real asset exists for a product, the builder ASKS - never fabricates.
- **Show the REAL machine** in Behind the scenes (map the actual skills/tools/models, don't wing it). Run a machinery-map subagent if unsure.
- **Show the quality guard, don't claim it.**
- **Honest distribution** - only state what is wired (e.g. Ghostwriter: human posts to LinkedIn + Substack; Substack auto-emails + auto-website; NO ESP).
- **COPYRIGHT/IP: never name external experts or frameworks** on a page or in Isa. Sell the discipline generically.
- Brand + voice are law. Flows always animate. **Screenshot + LOOK before saying done.**

## Coordinator workflow
- Builders report "done + slug" in the QA file; **you wire the card** into BOTH `homepage-storefront-branded.html`
  and `homepage-blueprint-storefront.html` (the `MODS` array name/link + the `PAGES` map) so builders never touch
  the shared storefront file and cause conflicts. Verify the card renders (screenshot).
- Answer builder questions in `docs/product-page-build-QA.md` with `A:` lines. Default any proof-uncertainty to
  "find the real one or ask Paul", never "fabricate".

## THE LIVE THREAD (pick this up with Paul first)
**The product SET is being reshaped and is NOT locked.** Paul said the earlier B-E list "isn't the correct set".
Brief Coach was promoted in as a new #1. **Do not launch B/C/D/E until Paul gives the real priority list.** Talk
it through with him one product at a time (that's what got Ghostwriter and Brief Coach right).

Outgoing coordinator's read on strongest-first (real proof + differentiator): **Outbound Agent** (flagship GTM,
real Jo outputs), **Ad Maker** (mountains of real ads), **Company Intelligence** (real Clay dossiers),
**Page Conversion Audit** (real report + it's the Free lead-magnet). Then the chart-backed strategy ones
(Brand Scorecard / Segmentation / DBA / Positioning - pick the exact real output per page). Trickier/conversational:
Research Interviewer + Review Intelligence. **Copywriter** is real (Eaton letters) and distinct from Ghostwriter
(brief-in vs ideas-out) but NOT built. Dropped: Pricing Monitor. Benched: Lifecycle Agent. Bundle: Campaign Manager
(featured card -> existing demo).

## Known gotchas to fix as you go
- **Filename collision:** Ad Resizer sits at `module-ad-maker.html`. When you build the real **Ad Maker** page
  (key `ad-maker`), you can't reuse that name. Cleanest fix: rename Ad Resizer's file to `module-ad-resizer.html`
  (update its `PAGES` entry `ad-resizer` + any links), freeing `module-ad-maker.html` for Ad Maker. Confirm with Paul.
- The two earlier-built pages (Ad Resizer, Brand Guardian) still need the full static nav (+ Brand Guardian needs
  the matched Isa) to match the reference.

## Reaching the outgoing coordinator (me)
The original terminal stays open to answer your questions. Post them in `docs/product-page-build-QA.md` under a new
heading `## Handover questions (for outgoing coordinator)`, then tell Paul "question for the old terminal" - he
pings it and it answers inline. Use this for anything only the long session's context would know.
