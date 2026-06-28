# Product page build - terminal briefs

> 28 Jun 2026. Goal: build the rest of the storefront product pages today, cloning the locked
> **Ghostwriter** reference. One coordinator terminal (Paul + Claude) holds the standard and answers
> questions; 3-4 builder terminals each own a cluster.

## How to use this (every builder terminal, read first)
1. Run `/website` to load the repo context.
2. Read the **reference build**: `wireframes/module-ghostwriter.html` (open it in the browser via a local
   server: `cd wireframes && python3 -m http.server 8899`, then `localhost:8899/module-ghostwriter.html`).
   This is the gold standard. Match its structure, nav, Isa, and quality bar exactly.
3. Read `docs/product-ghostwriter.md` (what "good" looks like) and the **`/product-page` skill** (it carries
   the format + the hard-won gotchas).
4. Find **your section** below. Build your pages.
5. **Ask questions in `docs/product-page-build-QA.md`** under your terminal's heading. The coordinator watches
   it and answers inline. When you're blocked or unsure about proof, ASK - do not guess.
6. When a page is done and screenshot-verified, note it in the QA file. **The coordinator wires the storefront
   card** (PAGES map + MODS) so you never touch the shared storefront file and cause conflicts.

## LOCKED rules (non-negotiable - these were earned the slow way on Ghostwriter)
- **Sell the THINKING, not the mechanics.** Lead with the marketing judgment baked in (the defensible 90%),
  not the commodity job. Beat the "isn't this just ChatGPT/Canva?" reflex with a real, on-brand artifact.
- **Real proof only. NEVER a draft, NEVER invented.** A `status: draft` file is not proof - it can carry the
  exact slop the voice spec bans. If Paul pastes/links a published piece, use THAT text verbatim, not a
  same-named disk file. **If you cannot find a real, approved asset for a product, ASK in the QA file. Do not
  fabricate a post, a stat, a chart, or a screenshot.**
- **Show the REAL machine in Behind the scenes - map it, do not wing it.** Before writing the flow, read the
  actual skills + reference files and name the real tools/models (e.g. Dray -> Seedream 4.5 on Replicate,
  Chart.js + Playwright, Seedance/Kling via fal.ai). A conceptual story is a fail. (Ask the coordinator to run
  a machinery-map pass for your products if you're unsure - that's how Ghostwriter got it right.)
- **Show the quality guard, don't just claim it.** If the product makes copy/creative, surface the check
  (voice+slop pass / brand spec / measure-vs-spec) in Behind the scenes AND in What it uses.
- **Honest distribution - never overclaim.** Only state what is actually wired. Manual vs automatic must be
  truthful (e.g. Ghostwriter: human posts to LinkedIn + Substack; Substack auto-emails + auto-website; NO ESP).
- **Brand is law + voice is law.** Cream, JetBrains Mono, sharp corners (flow nodes are the only rounded
  surface), sky `#3A7CA5`, fox on cream only. No em dashes, no corporate/AI words, sentence case, buyer's words.
- **Workflow flows ALWAYS animate** (staggered reveal on tab open - it's in the reference's `revealFlow`).
- **Screenshot + LOOK at every layout change before saying done.** Headless Chrome / browser -> read the PNG.

## Clone-the-reference recipe (per page)
1. `cp wireframes/module-ghostwriter.html wireframes/module-<slug>.html`. It already has: full site nav, the
   matched live-site Isa (cream panel, lowercase `isa`, square `#F0F0EC` bubbles, dark SEND, 5s open, clean
   `here` links), the three-tab renderer, the animated flow, the What-it-uses chips.
2. Swap: `<title>`, H1, the header selling block (sell the thinking, end on the honest rail "We build it around
   your brand and hand it over"), Isa's greeting (name the product), the footer H2.
3. **Experience** = real outputs, big and legible. Tell a clear story (Ghostwriter's = one piece, shown big,
   then the same thing across channels). Copy REAL assets into `wireframes/assets/<slug>/`. No mocks, no SVG
   placeholders, no fabrication.
4. **Behind the scenes** = the real machine flow (map it first). Keep the animation.
5. **What it uses** = Skills / Rules / Tools / Data / (Publish if relevant) / Memory, with the REAL tool + model
   names. Show the quality guard in Rules.
6. Screenshot all three tabs + LOOK. Fix. Then note "done" in the QA file with the slug.

---

## Terminal B - Writing & advertising (2 pages)
- **Ad Maker** (`ad-maker`) - brief to finished ads, quality first.
  - Proof: real fox ads in `public/ads/`, `public/video/`, and `~/projects/fox-ads/approved/` (killbill, vespa,
    6040, animated set, the 95:5 set). Show a brief -> finished set across formats (static / animated / brand / video).
  - Machine: `/dray` router -> `/fox-static` `/fox-brand` `/fox-video` `/fox-html-ads` -> Seedream 4.5 + Seedance
    2.0 on Replicate, Kling v2.6 on fal.ai, Chart.js + Playwright + ffmpeg.
- **Copywriter** (`copywriter`) - your brand's voice, trained to write.
  - Proof: real Eaton direct-mail letter (`~/paul-hub/clients/eaton/copywriter/`), real in-voice LinkedIn posts.
    The differentiator: the whole strategic brief built in, not a blank Claude window.
  - Machine: the voice skills + the slop guard (`ai-slop.md`, loved-posts standard) - show it.

## Terminal C - Brand strategy (4 pages)
- **Brand Scorecard** (`scorecard`) - one page everyone watches. Proof: the live ops/metrics dashboard
  (`~/projects/brand-measurement-dashboard/operations.html`, the metrics pyramid). Show the 5-level dashboard.
- **Segmentation** (`segmentation`) - segments with the maths actually run. Proof: real scatter/correlation/
  discriminator charts from the `/segmentation-*` skills.
- **Competitor Positioning Map** (`positioning`) - find the white space. Proof: a real plotted positioning map
  from `/competitor-positioning`.
- **Distinctive Brand Assets Audit** (`dba`) - what makes you recognisable, scored. Proof: a real Fame x
  Uniqueness matrix from the `/dba-*` skills.
- For all four: lead with the THINKING (the marketing science), prove with the real chart/output. If a real
  output doesn't exist for one, ASK before building that page.

## Terminal D - Research & intelligence (3 pages)
- **Company Intelligence** (`company-intel`) - the dossier before you walk in. Proof: a real `/clay-intel`
  dossier, recipient details redacted, brand fine.
- **Research Interviewer** (`interviewer`) - hundreds of phone interviews a week (Isa). Proof: a real
  `/isa-call` interview sample / structured output. Its proof is the least obvious - ASK the coordinator which
  real artifact to show before building.
- **Review Intelligence** (`review-intel`) - what every review is really saying. Proof: a real themes/sentiment
  output (`/insights-setup`, `/reddit-research`). ASK if no clean real output exists.

## Terminal E - GTM + upgrade the two built pages
- **Outbound Agent** (`outreach`) - finds the right people, writes each one for real. Proof: real Jo cold-email
  examples (the canon: `reference_jo_cold_email_structure`), a HeyReach campaign. Differentiator: every message
  100% customised per prospect (not mail-merge), multichannel (email + LinkedIn), runs in their Claude.
  Machine: Clay + Apify + Smartlead + HeyReach. (Smartlead lives HERE, not in Ghostwriter.)
- **Page Conversion Audit** (`page-audit`, badge **Free**) - why the page isn't converting. Proof: a real
  branded `/page-conversion` report (the 20-card audit).
- **Upgrade the two already-built pages to the reference standard:**
  - `module-ad-maker.html` (Ad Resizer) - already has the matched Isa; ADD the full site nav (copy the `.nav`
    block from `module-ghostwriter.html`).
  - `module-brand-guardian.html` (Brand Guardian) - ADD the full site nav AND the matched Isa + clean `here`
    links (copy both from the reference). Screenshot-verify against the reference.

---

## Not building today
- **Pricing Monitor** - no real skill/proof exists. Stays "Page coming". Do not fabricate.
- **Lifecycle Agent** - proof too thin. Benched.
- **Campaign Manager** - the featured bundle card links to the existing demo; coordinator handles separately.
