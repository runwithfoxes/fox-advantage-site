# Scroll MP4s produced — 2026-04-17

Two new scrolling MP4s are ready to embed into `wireframe-map.html`. Both live at the project root (same folder as the existing `brand-guidelines-scroll.mp4`) so you can reference them directly.

## 1. messaging-framework-scroll.mp4

**Path:** `~/projects/fox-advantage-site-repo/messaging-framework-scroll.mp4`
**Size:** 2.2 MB
**Duration:** 30 s · 2880×1800 · H.264

**Target module:** Module 03 — Messaging (currently has a `placeholder-visual` in the right column).

**What it shows:** A fully filled-in messaging framework for Run with Foxes, rendered as a dense single-page internal reference document. Six sections flow top to bottom:

1. Core value proposition (one-line, functional, emotional, social)
2. Positioning (full positioning statement + category / audience / difference)
3. Messaging pillars (4-pillar table: claim / proof / competitive contrast)
4. Key messages by pain point ("When the buyer says / You lead with")
5. Messaging hierarchy (hero, headline, tagline)
6. Voice and tone (contrast pairs + never use / never do)

**Source HTML:** `~/projects/fox-advantage-site-repo/messaging-framework/index.html` (kept for future re-renders).

**Wireframe embed suggestion (same pattern as Module 08B):**

```html
<!-- inside #mod3 .module-right -->
<div class="video-container">
  <video autoplay muted loop playsinline>
    <source src="messaging-framework-scroll.mp4" type="video/mp4">
  </video>
  <div class="video-caption">Messaging framework — one locked document, every message built on it</div>
</div>
```

## 2. page-conversion-scroll.mp4

**Path:** `~/projects/fox-advantage-site-repo/page-conversion-scroll.mp4`
**Size:** 9.0 MB
**Duration:** 26 s · 2880×1800 · H.264

**Target module:** whichever module hosts the `/page-conversion` skill output. Likely a new sub-item inside Module 10 (Growth) or a bespoke module. Paul to place.

**What it shows:** A full scroll of the page-conversion audit artefact at `~/projects/clients/rwf/page-conversion-audit/index.html` — 10-section conversion anatomy audit with side-by-side wireframe cards in Run with Foxes branding.

**Wireframe embed suggestion (same pattern):**

```html
<div class="video-container">
  <video autoplay muted loop playsinline>
    <source src="page-conversion-scroll.mp4" type="video/mp4">
  </video>
  <div class="video-caption">Page conversion audit — 10-section anatomy, gaps surfaced, rebuild drafted</div>
</div>
```

## Notes for the wireframe terminal

- Both MP4s loop natively at the set duration. The messaging one is paced for density (more text per second); the page-conversion one is slightly faster because the source page is longer.
- Do not commit either MP4 to git (the brief flags these as large binaries — reference locally).
- If you want either re-rendered at a different duration, the messaging-framework HTML is still in the repo at `messaging-framework/index.html` and the page-conversion source is at `~/projects/clients/rwf/page-conversion-audit/index.html`.

## Still to do (from the original brief)

Tier 1 outstanding: metrics-pyramid, experts-panel, brief-diagnostician.
Tier 2: klara-briefing, growth-manager, commercial-director.
Tier 3: critical-thinking, geo-audit, research-agent, reddit-research (need branded mockups first).

---

# Batch 2 — 2026-04-17

Two new scrolling MP4s landed at the project root. One target (`brief-diagnostician`) could not be captured — the page returns 404. Details below.

## 3. metrics-pyramid-scroll.mp4

**Path:** `~/projects/fox-advantage-site-repo/metrics-pyramid-scroll.mp4`
**Size:** 2.7 MB
**Duration:** 30 s · 2880×1800 · H.264
**Source:** `https://metrics-pyramid.vercel.app`

**Target module:** Module 08A — Measuring your brand metrics.

**What it shows:** A full top-to-bottom scroll of the 5-level brand metrics pyramid tool. Tall page (~7k+ px source height — 30s pacing feels calm against the density). Hero → pyramid levels → metric cards → recommended set-up. No cookie banner, no lazy-load issues.

**Suggested caption:** "The brand metrics pyramid — what to measure, and the level it belongs to"

**Embed pattern:**

```html
<!-- inside #mod8a .module-right -->
<div class="video-container">
  <video autoplay muted loop playsinline>
    <source src="metrics-pyramid-scroll.mp4" type="video/mp4">
  </video>
  <div class="video-caption">The brand metrics pyramid — what to measure, and the level it belongs to</div>
</div>
```

## 4. experts-panel-scroll.mp4

**Path:** `~/projects/fox-advantage-site-repo/experts-panel-scroll.mp4`
**Size:** 913 KB
**Duration:** 26 s · 2880×1800 · H.264
**Source:** `https://runwithfoxes.com/experts`

**Target module:** Module 01A — The experts panel.

**What it shows:** The full expert-critique tool in one slow pan. Hero (“Put your plan through the panel”) → paste box → 4 Marketing Experts (Commercial Manager / Growth Marketing Leader / CMO / Marketing Professor) → 4 Strategy Experts (Strategy Purist / Effectiveness Expert / Consulting Partner / Customer Investigator) → footer.

**⚠️ Flag — short source page.** The page is only 1232px tall (scroll range ~332px against the 900px viewport), so most of the 26s is near-static with a small vertical drift. It's accurate to what the tool looks like, but don't expect cinematic scroll. Options if you want more motion:

1. Accept the current MP4 — it reads as a calm tool overview.
2. Re-render at 18s so the small drift feels less dwelly (below the 24s floor in our feedback memory, but defensible for this page).
3. Swap the visual to an interactive capture: click through each persona and record their response. Outside the "smooth scroll" brief — would need a different script.

**Suggested caption:** "Eight expert personas — paste a plan, pick a critic, no punches pulled"

**Embed pattern:**

```html
<div class="video-container">
  <video autoplay muted loop playsinline>
    <source src="experts-panel-scroll.mp4" type="video/mp4">
  </video>
  <div class="video-caption">Eight expert personas — paste a plan, pick a critic, no punches pulled</div>
</div>
```

## 5. brief-diagnostician-scroll.mp4 — NOT PRODUCED

**Status:** Attempted then abandoned. Deleted the initial capture.
**Reason:** `https://runwithfoxes.com/brief-diagnostician` returns `404: This page could not be found` (Next.js not-found route). The initial MP4 was just a scroll of the 404 page, so it was removed.

**What I tried:** The following URL variants all still go through the Next.js SPA — I couldn't verify them without curl available in this sandbox, but the base route is definitely not live:
- `/brief-diagnostician` → 404 (confirmed via puppeteer)
- `/brief`, `/brief_diagnostician`, `/the-brief`, `/diagnostician`, `/brief-diagnostics`, `/brief-diagnosis`, `/briefcheck` — not probed reliably (no curl in the sandbox)

**What Paul needs to decide:**
- Point me at the correct live URL if the page exists elsewhere, or
- Ship the brief-diagnostician page first, then I'll capture it, or
- Build a branded mock (like the messaging-framework approach) and I'll scroll that instead.

## Notes for batch 2

- Neither live page had a cookie banner in the way. The record script includes a consent-banner dismissal step anyway (looks for common "Accept / Agree / OK" buttons) — no banner was found to click on either.
- Working folder is `~/projects/fox-advantage-site-repo/.scroll-jobs/` (contains `record.js`, `inspect.js`, and debug screenshots). Leaving it in place so the wireframe session/others can reuse the script for Tier 2/3. Delete when the batch is fully done.
- `record.js` is parametric: `node .scroll-jobs/record.js <url> <slug> [duration]` from the repo root. Output MP4 always lands at the repo root as `<slug>-scroll.mp4`.
- Per the `/scroll` skill feedback memory, this script uses `domcontentloaded` instead of `networkidle0` (the default hangs on Google Fonts pages).
