# Builder brief - Advertising Agent product page

> 28 Jun 2026. You are a BUILDER terminal. Build ONE product page: the **Advertising Agent**.
> A coordinator terminal is live in parallel and answers your questions inline. Do not guess on
> anything that risks fabrication - ASK.

## How this works (read first)
1. Run `/website` to load the repo context.
2. Read the **reference build** in the browser: `cd wireframes && python3 -m http.server 8899`, then open
   `localhost:8899/module-ghostwriter.html`. This is the gold standard - match its nav, its matched Isa, its
   three tabs, its animated flow, its quality bar **exactly**.
3. Read `docs/product-ghostwriter.md` (what "good" looks like) and the `/product-page` skill
   (`~/.claude/skills/product-page/SKILL.md` - it carries the format + the hard-won gotchas).
4. **Ask questions in `docs/product-page-build-QA.md` under the heading `## Terminal F - Advertising Agent`.**
   Append a `Q:` line with a timestamp, then keep working on something else. Re-read the file for the
   coordinator's `A:` line before you proceed on any blocked item. ASK whenever you're unsure about: which real
   asset to show, whether something is real/wired, the real machine, naming/copy, or anything that risks
   fabrication.
5. When the page is done and screenshot-verified, write "DONE + slug" in the QA file. **The coordinator wires
   the storefront card** - you never touch `homepage-storefront-branded.html` or any other product's file.

## The product (locked with Paul, 28 Jun - do not relitigate)
**Advertising Agent.** One end-to-end product: it **makes the ads, gets them live, and looks after the analysis
and optimisation.** The whole job a client wants taken off them, not a creative tool plus a separate campaign
tool. (We deliberately collapsed the old "Ad Maker" + a campaign-runner into this single product. This page
REPLACES the old "Ad Maker" card.)

- **Keep the description broad / multichannel.** It is not boxed to one channel - it makes the other formats too
  (brand films, video, display).
- **Proof is LinkedIn creative for now.** Instagram + TikTok are coming as Paul builds them; the page should read
  broad but the real shown work is LinkedIn-shaped creative today. Do NOT invent IG/TikTok examples.
- **Ad Resizer stays a separate product** (one approved ad -> every size). Do not fold it in or reference its
  internals; it sits alongside as the sizing companion.
- The honest rail stays: *we build it around your brand and hand it over; it runs in your own Claude.*

## The job of THIS page (sell the thinking, not the mechanics)
The buyer's price anchor is Canva / a freelancer / "just use ChatGPT for ad copy". Beat that reflex with the
**marketing judgment baked in**: the brief and brand strategy loaded in, the editorial calls (what the message
becomes, what to cut), twenty years of making ads that *work* - and the fact that the same agent that makes them
also **gets them live and reads the numbers**, which a creative tool never does. That end-to-end care IS the
differentiator. Lead with it.

## Experience tab (real outputs only)
Tell a clear story, big and legible:
1. **A brief -> a finished set across formats** using REAL fox ads: static, animated/chart, brand, video.
   Sources: `public/ads/`, `public/video/`, and `~/projects/fox-ads/approved/` (killbill, vespa, 6040, the
   animated set, the 95:5 / Day One set). Copy what you use into `wireframes/assets/advertising-agent/`.
   Use the JUSTIFIED-rows layout from the reference (tall formats become a side rail, never a low-hanging row item).
2. **The "gets them live + analysis" half** - this is the differentiator, but **we do NOT yet have a real
   managed-campaign-with-results to show, and you must not fabricate a dashboard or invent numbers.** Show this
   side as the **method**: how it targets, what it watches, how it decides to optimise. If you think a results
   visual is essential, ASK the coordinator - there may be a real RWF campaign to point at, otherwise it stays
   method-only. Real proof only, never a mock.

## Behind the scenes tab (the REAL machine - map it, do not wing it)
Animated flow (staggered reveal on tab open - copy `revealFlow` from the reference; opacity-only is a fail). It
has two honest halves:
- **Make:** `/dray` (creative director router) -> `/fox-static` `/fox-brand` `/fox-video` `/fox-html-ads` ->
  **Seedream 4.5** (Replicate, images), **Seedance 2.0** (Replicate) + **Kling v2.6** (fal.ai, video),
  **Chart.js + Playwright + ffmpeg** (chart ads). Composed in HTML, Playwright @2x.
- **Quality guard (show it, don't claim it):** `/ad-qa` (readability gate - contrast, font size, edge spacing,
  copy density; auto-fails a breaking asset) and the brand/voice checks. Surface this as a `check` node.
- **Live + analyse:** the **LinkedIn Marketing API** (campaign setup, then read performance, then optimise).
  Map the real capability - if you are unsure exactly what is wired vs aspirational, ASK before stating it as
  fact. (Reference: `memory/reference/reference_linkedin_marketing_api.md`.)
- Hard human gates throughout: nothing spends without approval.

## What it uses tab
Chips, full-width, label-left rows: Skills / Rules (incl. the `/ad-qa` quality guard + brand+voice law) / Tools /
Models (real names above) / Data / Memory. Real names only.

## Build recipe
1. `cp wireframes/module-ghostwriter.html wireframes/module-advertising-agent.html`. It already carries the full
   site nav, the matched live-site Isa (cream panel, lowercase `isa`, square `#F0F0EC` bubbles, dark SEND, clean
   `here` link), the three-tab renderer, the animated flow, the chips.
2. Swap: `<title>`, the eyebrow stays `PRODUCT`, H1 = **Advertising Agent**, the header selling block (lead with
   the thinking + the end-to-end care, end on the honest rail), Isa's greeting (name the product, offer the call
   via `cal.com/paul-dervan-mjfd50`), the footer H2 ("Want the Advertising Agent built for you?").
3. Fill the three tabs per the sections above.
4. **Screenshot all three tabs and LOOK** (headless Chrome -> read the PNG; force reveal content visible). Fix.
   Then note DONE + slug in the QA file.

## LOCKED rules (non-negotiable - full detail in the `/product-page` skill)
- Sell the THINKING, not the mechanics. Beat "isn't this just Canva/ChatGPT?" with a real on-brand artifact.
- **Real proof only. NEVER a draft, NEVER invented.** No fabricated results, no mock dashboard, no invented stat.
  If a real asset doesn't exist, ASK - do not fabricate.
- Show the REAL machine. Show the quality guard, don't just claim it. Honest distribution - only state what is wired.
- **COPYRIGHT/IP: never name external experts, authors or named frameworks** on the page or in Isa. Sell the
  discipline generically.
- Brand is law: cream, JetBrains Mono, sharp corners (flow nodes are the only rounded surface), sky `#3A7CA5`,
  fox on cream only. Voice is law: no em dashes, sentence case, plain, buyer's words.
- Flows ALWAYS animate. Screenshot + LOOK before saying done.

## Slug / card (coordinator handles the card - for your awareness)
- Your file: `wireframes/module-advertising-agent.html`. Slug `advertising-agent`.
- The coordinator will rename the old "Ad Maker" card to **Advertising Agent**, point `PAGES['ad-maker']` (or a
  new `advertising-agent` key) at your file, and fix the legacy `module-ad-maker.html` filename collision
  (Ad Resizer currently squats on that name). **You do not touch the storefront file.**
