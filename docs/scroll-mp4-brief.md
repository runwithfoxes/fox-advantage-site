# Scrolling MP4 brief — wireframe right-side visuals

## Context

We're building the new homepage at `runwithfoxes.com` — a wireframe at `~/projects/fox-advantage-site-repo/wireframe-map.html`. It's a 12-module map of marketing functions, each with a split layout: text on the left, a visual on the right.

Several modules currently use placeholders on the right. We want to replace some of them with 30-second scrolling MP4s of real tools or branded pages — so visitors can see the thing actually being used without leaving the page.

## The skill

Use `/scroll`. It's at `~/.claude/skills/scroll.md`. It takes one argument: the path to a project folder containing an `index.html`, then outputs a 30s smooth-scrolling MP4 at 2880×1800.

**If the target is a live URL (not a local HTML file)**, adapt the `record.js` script:
- Replace `const filePath = 'file://' + path.join(__dirname, 'index.html');` with the URL
- Replace `await page.goto(filePath, ...)` with `await page.goto('https://example.com', { waitUntil: 'networkidle0' })`
- Set up a working project folder (e.g. `mktg-scroll-jobs/`) to hold `record.js` and the output MP4
- All other logic (viewport, scroll easing, frame capture, ffmpeg encoding) stays the same

## Where to save the MP4s

**Final location:** `~/projects/fox-advantage-site-repo/` (same folder as `brand-guidelines-scroll.mp4` — the existing scroll we're already using).

**Naming convention:** `<module-slug>-scroll.mp4`. Match the sub-item or module, e.g.
- `critical-thinking-scroll.mp4`
- `metrics-pyramid-scroll.mp4`
- `growth-dashboard-scroll.mp4`

Once saved there, I can reference them from the wireframe as `public/fox/...` or straight from the folder.

## Candidate scroll videos (pick any, all, or none)

Priority order based on which modules are most complete and have real tools to show:

### Tier 1 — live tools with real UI
1. **`metrics-pyramid-scroll.mp4`** — Module 08A (Measuring your brand metrics)
   - URL: `https://metrics-pyramid.vercel.app`
   - Shows: the 5-level brand metrics pyramid in action

2. **`brand-system-scroll.mp4`** — Module 08B is done with a scroll already, but could be refreshed if needed
   - URL: `https://brand-system-process.vercel.app/`
   - Shows: brand system process tool

3. **`experts-panel-scroll.mp4`** — Module 01A (The experts panel)
   - URL: `https://runwithfoxes.com/experts`
   - Shows: the 4-persona experts tool

4. **`brief-diagnostician-scroll.mp4`** — Module 06 (Creative)
   - URL: `https://runwithfoxes.com/brief-diagnostician`
   - Shows: brief diagnosis in action

### Tier 2 — Paul's dashboard pages (requires localhost:8000 running)
5. **`klara-briefing-scroll.mp4`** — Module 12A (Marketing ops — PM agent)
   - URL: `http://localhost:8000/briefing` (or wherever Klara lives)
   - Shows: the morning priorities view

6. **`growth-manager-scroll.mp4`** — Module 10 (Growth)
   - URL: `http://localhost:8000/campaigns` (Jo's dashboard)
   - Shows: campaign pipeline + metrics

7. **`commercial-director-scroll.mp4`** — Module 12B (Marketing ops — CD agent)
   - URL: `http://localhost:8000/finance` or commercial director dashboard
   - Shows: revenue, pipeline, Plan vs Hope

### Tier 3 — would need a branded page built first
8. **`critical-thinking-scroll.mp4`** — Module 01B (When the team is stuck) — no live UI yet, would need a mock/branded page built from the skill output
9. **`geo-audit-scroll.mp4`** — Module 05A — no live UI yet, needs mock
10. **`research-agent-scroll.mp4`** — Module 05B — no live UI yet, needs mock
11. **`reddit-research-scroll.mp4`** — Module 05C — no live UI yet, needs mock

## Handoff

When you're done, list each MP4 you produced with its file path. I'll pick them up from there and embed into the wireframe's right-side panels.

## Notes

- Smooth scroll = 30s, ease-in-out, top to bottom. That's the whole video.
- Pre-trigger any animations so the visual state is fully-rendered on every frame (the skill already handles common cases)
- Don't commit these MP4s to git — they're large binaries. I'll reference them locally.
