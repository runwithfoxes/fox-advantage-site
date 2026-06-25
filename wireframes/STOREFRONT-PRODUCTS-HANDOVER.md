# Handover: storefront card grid + the product slices

> Written 25 June 2026 for a fresh terminal. Mission: finish the **storefront** (the homepage
> product grid) and build out the **product pages** for the slices we identified today.
> Everything here is WIREFRAME work. Nothing deploys. Read this whole brief before starting.

---

## 1. Mission

Run with Foxes sells **products**: buyer-named systems we build around a client's brand and **hand
over**. The homepage is a **storefront grid of product cards**; click a card and you go to that
product's own page. Two jobs:

1. **Storefront card grid** - get the homepage storefront to the real product lineup (not placeholder
   cards), each card linking to its product page.
2. **Product pages** - build a product page for each slice, using the locked format. Two exist; the
   rest need building.

Both are wireframes in `wireframes/`. They are NOT in the Next.js build, so nothing goes live until
Paul says "port it". Do not touch `src/` or the live site.

---

## 2. Background, read these first (in order)

- `docs/product-lineup-candidates-2026-06-25.md` - the 14 products + the Campaign Manager bundle, the decisions, the bench. **This is the source of truth for the lineup.**
- `docs/product-packaging-research-2026-06-25.md` - how to name + describe a product (the rubric, the description formula).
- `~/paul-hub/clients/rwf/CONTEXT.md` - the 24-25 Jun entries (Products reframe, storefront wireframe, product-page format locked).
- The format reference build: `wireframes/module-ad-maker.html` (the **AI Ad resizer** page) - the verified, locked product-page template.
- The best filled example: `wireframes/module-brand-guardian.html` - shows a rich Experience (forensic audit), a detailed Behind-the-scenes, and a full What-it-uses. Match this depth.
- The `/product-page` skill (`~/.claude/skills/product-page/`) - SKILL.md + `templates/product-page-template.html` + `references/anatomy.md`. **Use this skill to build each page.**
- The storefront wireframe: `wireframes/homepage-blueprint-storefront.html`.

---

## 3. The product lineup (what the storefront sells)

14 single products + 1 bundle. Each card: a buyer-name, a one-line job, a real asset.

| # | Product | Tagline | Product page |
|---|---------|---------|--------------|
| 1 | **AI Ad Resizer** | One ad in, every size out | ✅ `module-ad-maker.html` |
| 2 | **Ad Maker** | Brief to finished ads, quality first | to build |
| 3 | **AI Copywriter** | Your brand's voice, trained to write | to build |
| 4 | **The Brand Scorecard** | One page everyone watches | to build |
| 5 | **Segmentation AI** | Segments, with the maths actually run | to build |
| 6 | **Competitor Positioning Map** | Find the white space | to build |
| 7 | **Distinctive Brand Assets Audit** | What makes you recognisable, scored | to build |
| 8 | **Brand Guardian** | Nothing ships off brand | ✅ `module-brand-guardian.html` |
| 9 | **The AI Research Interviewer** | Hundreds of phone interviews a week | to build |
| 10 | **Company Intelligence** | The dossier before you walk in | to build |
| 11 | **Review Intelligence** | What every review is really saying | to build |
| 12 | **Pricing Monitor** | Know the day a competitor moves | to build (no skill behind it yet, flag) |
| 13 | **The Outreach Engine** | A business-development desk that runs itself | to build |
| 14 | **Page Conversion Audit** | Why the page isn't converting | to build |
| - | **Campaign Manager** (bundle) | The whole operation, run for you | the "everything" tier, sits ABOVE the grid |

Full one-liners, "what it produces", and the skills behind each are in the lineup doc. Decisions
already locked (do not relitigate): AI Writer is **one** card (all channel writers live inside it),
Mental Availability Tracker is **dropped** (needs quant research we can't sell yet), Campaign Manager
is the **bundle**, not a card.

---

## 4. How to build a product page (the pattern)

Use `/product-page`. Each page is `wireframes/module-<slug>.html`, a copy of the template, filled with:

- **Header**: eyebrow `Product`, big H1 in the buyer's words, one **full-width** description line ending
  on the honest rail "We build it for you and hand it over."
- **Three tabs = the interface**: **Experience / Behind the scenes / What it uses**.
  - **Experience**: REAL approved outputs for this product (never mocks). For a transform product
    (resize, generate) show a source + a Run button and the outputs flow in. For a checker/analysis
    product show the real output (a report, a chart, a matrix). See the Brand Guardian page for a
    worked non-transform Experience.
  - **Behind the scenes**: the workflow as a flow (the `capabilities-sequence` node style), with real
    steps. Go granular: sub-steps + a guard/"check + balance" callout per step (Brand Guardian page shows this).
  - **What it uses**: chips, full width, label-left rows (the real skills, rules, tools, data, memory).
- **Footer**: "Want the [product] built for you?" + **Book a chat with Paul** (`cal.com/paul-dervan-mjfd50`).
- **Isa**: scoped to the product, auto-opens after 4s, offers the call. (Mock only; the real per-product
  Isa is a separate build that needs Paul's explicit go-ahead.)

The slow, important part is **content accuracy + real assets**: each product's real flow steps, its
"what it uses", and a real output for the Experience tab. Get them right per product; don't generic-render.

---

## 5. The storefront card grid task

`wireframes/homepage-blueprint-storefront.html` is the card grid. Current state (per CONTEXT, 25 Jun):
the AI Ad resizer card uses the real `dayone` GIF + a "New" badge, cards enlarged to 190px, heading is
just "Products". **The 6 cards shown are PLACEHOLDER** - the real lineup (above) is settled now, so:

1. Set the cards to the **real lineup** (decide with Paul which 6-8 lead the grid vs sit deeper - see open decisions).
2. Each card: buyer-name + one-line tagline + a **real asset** (swap real assets in **one at a time**,
   Paul picks the order; find/confirm each, fit it **contained** on matching cream, screenshot + LOOK, commit).
3. **Link each card to its product page** (`module-<slug>.html`). Two pages exist already (AI Ad Resizer,
   Brand Guardian) so wire those first.
4. Place the **Campaign Manager** as a featured "everything, run for you" block ABOVE the grid, not as a card.

---

## 6. Rules and gotchas (do not relearn)

- **Real assets, never coded mocks** in Experience/cards. Show the whole asset on matching background, never a bad crop.
- **Screenshot every layout change and LOOK before saying it's done** (headless Chrome -> Read the PNG; force `.ad{opacity:1}` so reveal-on-interaction content shows). Reasoning about CSS in your head has shipped broken layouts.
- **One text width per page** - default everything full content width; a centred flow diagram is the only exception.
- **Voice**: no em dashes (a formatter strips them anyway), sentence case, plain, buyer's words, "we" not "you". Run copy past `/voice`.
- **Brand is law**: tokens/fonts/dot-grid/sharp-corners from `/branded-page`; flow nodes are the only rounded surface.
- **Logo** is exactly `/<span>Run</span>withfoxes`, only "Run" orange, no nav border.
- **Isa cal link** is `cal.com/paul-dervan-mjfd50` (the `-mjfd50` one), never invent `cal.com/paul-dervan`.
- **Pricing Monitor (#12)** has no skill behind it yet - treat as build-on-demand, flag it, don't imply it exists.

---

## 7. Suggested order of work

1. **Storefront card grid to the real lineup** + wire the two existing pages (AI Ad Resizer, Brand Guardian). Quick win, makes the storefront real.
2. **AI Copywriter page** - highest-value next product, lots of real output to show (the channel writers).
3. **Brand Scorecard** and **Segmentation AI** - both have strong real visuals (the scorecard, the similarity/scatter charts) already in the ops dashboard / homepage panels to reuse.
4. Then the rest, two or three at a time, each with its real Experience asset.
5. **Campaign Manager** bundle block last (it references several of the others).

Build each on its own, screenshot, show Paul, commit wireframe-only. Don't batch a dozen unseen.

---

## 8. Open decisions for Paul (ask before assuming)

1. **Which 6-8 products lead the storefront grid** vs sit on deeper pages? (A tight grid reads better than 14.)
2. **Storefront replaces the accordion homepage, or sits above it?** (Still undecided.)
3. **Campaign Manager** placement and weight on the storefront.
4. Whether to keep **Pricing Monitor** as a product or move it to the bench.

---

## 9. Deploy guardrail

- ⭐ **PORTING RULE (Paul, 25 Jun): import ONLY the new storefront component.** When the storefront is ported to Next.js, do NOT touch the hero, the nav, or the live headline type scale - the hero "took ages to get right". The wireframe headlines are deliberately oversized for layout review and are **NOT** the port spec; the live `HomePage.tsx` headline sizes stay. You are porting the products storefront section in, nothing above it.
- All work is in `wireframes/` (and `docs/`). Wireframes are **not** in the Next.js build. Nothing deploys.
- Commit wireframe-only on `main`. The repo has unrelated dirty files on `main` - **add only your files explicitly**, never `git add -A`.
- Do NOT touch `src/`, the live homepage, the hero video, or the Isa chatbot without Paul's explicit say-so (see the deploy guardrails in the repo `CLAUDE.md`).

## 10. Done definition

- Storefront grid shows the real lineup, each card linked to a product page, real assets fitted, screenshotted, committed.
- A product page exists for each agreed slice, matching the depth of `module-brand-guardian.html`, each verified by screenshot and reviewed by Paul.
- The lineup doc + RWF CONTEXT updated as pages land.
