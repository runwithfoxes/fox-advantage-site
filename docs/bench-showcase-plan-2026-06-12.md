# /bench Private Showcase Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a private, unlinked, noindex `/bench` page on runwithfoxes.com showing real work for named real clients, framed as "what we're working on", for Paul to open in prospect meetings.

**Architecture:** Content pipeline with two human gates. (1) Audit sweep of client/project folders produces a scored inventory; Paul picks the shortlist. (2) HTML wireframe in `wireframes/` per site convention; Paul approves before build. Then capture assets into `public/bench/`, build a self-contained route at `src/app/bench/page.tsx`, deploy via branch + Vercel preview + merge.

**Tech Stack:** Next.js (app router), existing globals.css conventions (new `bn-` prefix), Playwright for screenshots, ffmpeg for video trims if needed.

**Spec:** `docs/bench-showcase-design-2026-06-12.md` (approved 2026-06-12, framing rules revised same day). The four framing rules are HARD: real clients shown as theirs (named), never invent a client or piece of work, confidential insides masked, present tense.

**Repo guardrails (from CLAUDE.md):** do not touch `hp-nav`, hero video, Isa chatbot, or bottom bar. /bench needs none of them changed: no nav link, no sitemap entry.

---

### Task 1: Audit sweep

Produce the full inventory of showable artefacts so Paul can pick the shortlist.

**Files:**
- Create: `docs/bench-audit-2026-06-12.md`

- [ ] **Step 1: Dispatch parallel Explore agents (model: sonnet)**

Four agents, one per territory. Each agent's prompt:

```
Search [TERRITORY] for SHOWABLE marketing artefacts: finished or near-finished
ads (MP4/GIF/HTML), banner sets, branded pages (HTML), decks (pptx), dashboards,
Excel models (segmentation, 95:5, media budgets), reports, sample letters/emails,
process/skill systems. For each find return: full path, what it is (one line),
which spec category it fits (Ads & banners / Pages & decks / The AI team /
Research & measurement / Analysis & models), client attached (name, or none),
readiness (ready / needs-polish / not-showable), and what a capture
would look like (e.g. "loop the MP4", "screenshot 2 tabs"). Ignore source code,
node_modules, raw data, drafts. Return a markdown table.
```

Territories:
1. `~/paul-hub/clients/` (all client folders, especially sabre/builds, epic, moloco, 123ie, weatherbys, eaton)
2. `~/projects/` excluding `clients/` symlinks and `fox-advantage-site*` (especially moloco-landing-system, moloco-event-cannes, weatherbys-factbook, client-portal, metrics-pyramid, triton-*, fox-ads/approved)
3. `~/paul-hub/clients/*/sessions/` + `~/paul-hub/intelligence/sessions/` scanning ONLY for `files_changed` entries that point at artefacts the folder scan might miss
4. The /ops dashboard: read `~/.claude/skills/ops/` skill files to find what the Brand Operations Dashboard shows and which views are worth screenshotting for the process story

- [ ] **Step 2: Merge into the audit doc**

Combine the four returns into `docs/bench-audit-2026-06-12.md`, de-duplicated by path, grouped by spec category, each row scored. Add a top section "Recommended shortlist" of 10-14 pieces with one line of reasoning each. Include the 10 candidates already named in the spec, rescored against what the sweep found.

- [ ] **Step 3: Commit**

```bash
cd ~/projects/fox-advantage-site
git add docs/bench-audit-2026-06-12.md
git commit -m "Add bench audit inventory"
git push
```

- [ ] **Step 4: GATE - Paul picks the shortlist**

Open the audit doc for Paul (GitHub rendered URL). Paul marks keep/drop. Do not proceed to Task 3 captures until the shortlist is confirmed. (Task 2 wireframes can start in parallel - they need categories, not final pieces.)

---

### Task 2: Wireframes

**Files:**
- Create: `wireframes/wireframe-bench.html`

- [ ] **Step 1: Build the wireframe as one self-contained HTML file**

Follow the site aesthetic exactly (it must feel like runwithfoxes.com): JetBrains Mono, cream `#FAFAF8`, sky blue `#3A7CA5`, orange `#F47521` sparingly, no rounded corners, no em dashes, dot grid background allowed, `\` CTA syntax. Light mode only.

Structure to mock:
1. Header: small "run with foxes" wordmark, title like `\ the bench`, one line: "Work in progress. A few things we're building at the moment." Present tense.
2. Five category sections in spec order (Ads & banners / Pages & decks / The AI team / Research & measurement / Analysis & models), each: thin divider, section label, 2-4 cards.
3. One sample card PER CATEGORY with a real asset where trivially available (e.g. an MP4 from `public/video/`, a screenshot placeholder block otherwise). Card = capture area + client name (where there is one) + two lines: what it is, what it replaces.
4. Footer: nothing but a `\ get in touch -> /contact` line.

Card markup pattern for the wireframe (and later the build):

```html
<div class="bn-card">
  <div class="bn-capture"><!-- <video autoplay loop muted playsinline> or <img> --></div>
  <div class="bn-copy">
    <div class="bn-what">9-size animated banner set, built from one approved ad</div>
    <div class="bn-replaces">Replaces a week of agency resizing. Rendered in minutes.</div>
  </div>
</div>
```

- [ ] **Step 2: Open for Paul**

```bash
open ~/projects/fox-advantage-site/wireframes/wireframe-bench.html
```

- [ ] **Step 3: GATE - Paul approves the wireframe**

Iterate inline until approved. Commit approved version:

```bash
cd ~/projects/fox-advantage-site
git add wireframes/wireframe-bench.html
git commit -m "Add approved bench wireframe"
git push
```

---

### Task 3: Capture & polish (approved shortlist only)

**Files:**
- Create: `public/bench/` assets (one or two files per piece)
- Create: `docs/bench-capture-log.md` (what was captured from where)

- [ ] **Step 1: Create the asset folder and naming convention**

`public/bench/{slug}-{n}.{ext}`, slugs match the card titles, e.g. `banner-set-1.mp4`, `factbook-1.png`, `demand-model-1.png`.

- [ ] **Step 2: Capture per type**

- Video/GIF pieces: copy the existing MP4/GIF; if over ~10MB re-encode `ffmpeg -i in.mp4 -vcodec libx264 -crf 28 -an out.mp4`
- HTML pieces (banner gallery, factbook, dashboards, metrics pyramid): Playwright full-page or element screenshots at 1600px wide; for scrolly pages a 10-15s scroll recording is allowed
- Decks: export 2-3 best slides as PNG (open in PowerPoint, or `libreoffice --headless --convert-to png` per slide if installed; otherwise screenshot)
- Excel models: open the money tabs (scored matrix, Monte Carlo chart), screenshot each at full window
- Letters/emails (AI team section): reproduce 1-2 paragraphs as styled text in the page itself, with recipient names and identifying details removed, NOT a document screenshot

- [ ] **Step 3: Confidentiality check on every capture**

Per the revised spec: the client's brand and name are fine; what must NOT appear is confidential content: results, pricing, strategy data, letter recipients, plus incidental leaks (file paths, browser tabs, email addresses). Re-capture or mask any leaker.

- [ ] **Step 4: Log and commit**

Write `docs/bench-capture-log.md`: table of slug, source path, capture method, leak-check done. Then:

```bash
cd ~/projects/fox-advantage-site
git add public/bench/ docs/bench-capture-log.md
git commit -m "Add bench captures for approved shortlist"
git push
```

---

### Task 4: Build the /bench route

**Files:**
- Create: `src/app/bench/page.tsx`
- Create: `src/app/bench/BenchPage.tsx` (client component, all markup)
- Modify: `src/app/globals.css` (append `bn-` block at end of file)

- [ ] **Step 1: Confirm there is no sitemap to update**

```bash
cd ~/projects/fox-advantage-site
grep -ri "sitemap" src/ next.config.ts package.json --include="*.ts*" -l
```

Expected: no results (no sitemap config). If a sitemap exists, exclude `/bench` from it in the same pattern the file uses.

- [ ] **Step 2: Create the route with noindex metadata**

`src/app/bench/page.tsx`:

```tsx
import type { Metadata } from "next";
import BenchPage from "./BenchPage";

export const metadata: Metadata = {
  title: "The Bench",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <BenchPage />;
}
```

- [ ] **Step 3: Port the approved wireframe into BenchPage.tsx**

Translate `wireframes/wireframe-bench.html` markup to JSX verbatim (same classes), pour in the real captures from `public/bench/` and the approved two-line copy per card. Cards with an "open live" exception (metrics pyramid at minimum) get a plain `<a target="_blank">` under the capture: `\ open live ->`. Styles go in `globals.css` with the `bn-` prefix, appended at the end of the file, touching nothing existing. No nav, no Isa changes, no bottom bar: the page renders standalone with only the small wordmark header from the wireframe.

- [ ] **Step 4: Verify locally**

```bash
cd ~/projects/fox-advantage-site && npm run dev
```

Open `http://localhost:3000/bench`. Check: page loads, every capture renders, videos autoplay muted and loop, no confidential content visible (results, pricing, recipients), `view-source` head contains `noindex`. Check the homepage still renders untouched.

- [ ] **Step 5: Branch, push, Vercel preview**

```bash
cd ~/projects/fox-advantage-site
git checkout -b bench-page
git add src/app/bench/ src/app/globals.css
git commit -m "Add /bench private showcase page"
git push -u origin bench-page
```

Give Paul the Vercel preview URL.

- [ ] **Step 6: GATE - Paul approves the preview, then merge**

```bash
cd ~/projects/fox-advantage-site
git checkout main && git merge bench-page && git push
```

---

### Task 5: Verify live and wrap up

- [ ] **Step 1: Verify production**

Open `https://runwithfoxes.com/bench`. Confirm: loads, assets play, `curl -s https://runwithfoxes.com/bench | grep -i noindex` returns the robots meta, page absent from nav, Google `site:runwithfoxes.com` unaffected (will stay so because of noindex + no links).

- [ ] **Step 2: Update records**

- Repo `CLAUDE.md`: add a `/bench` section (what it is, private, framing rules, where assets live, "do not add to nav without Paul")
- `~/paul-hub/clients/rwf/CONTEXT.md`: entry at top of What's Active Now
- `~/paul-hub/tasks/client-work-showcase.md`: move to `~/paul-hub/archive/` with `completed:` date once Paul confirms done
- Session summary JSON to `~/paul-hub/clients/rwf/sessions/` (topic-first naming)

- [ ] **Step 3: Post-build checklist (per global CLAUDE.md)**

Confirm the live URL works, ask Paul "this is working, commit?" is already satisfied by the merge gate, log files_changed in the session summary.

---

## Out of scope (from spec)

- Public Work page, client naming, permissions
- Bespoke per-prospect demos
- New pieces for active engagements (123ie/SoftCo banner, Moloco email writer): later, additive
- Rebuilding anything already live on runwithfoxes.com
