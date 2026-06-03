# Handover - runwithfoxes.com additions

**Last updated:** 2026-06-03
**Workstream:** Adding capability rows, article links, and visuals to the homepage accordion modules on runwithfoxes.com. A second terminal may continue this - read this file first, then CLAUDE.md (full file map, CSS architecture, voice rules) and CONTEXT.md (state + session history).

---

## Asking questions (ask the originating terminal, not just Paul)

Another Claude terminal that ran the 2026-06-03 session is still open and holds the full context and Paul's intent. **If you hit an ambiguity - which module a row belongs in, what the copy should say, a brand-rule judgement call, anything you'd otherwise stop and ask Paul - ask that terminal instead of blocking on Paul.**

How:

- Append your question to `handover-qa/inbox.md` as a new `### Qn (YYYY-MM-DD HH:MM)` block. Don't edit existing entries.
- The originating terminal watches that file and replies in `handover-qa/answers.md`, matched by number (`### An` answers `### Qn`).
- Watch `handover-qa/answers.md` for your reply, e.g. a background wait: `until grep -q "^### A<n>" handover-qa/answers.md; do sleep 3; done`, then read it and carry on.
- This channel is gitignored (local only) and works while both terminals are open. If no answer lands in a few minutes (that terminal may be closed), fall back to asking Paul.

---

## Deploy flow (important - read before pushing)

- Next.js app, repo `runwithfoxes/fox-advantage-site`, on branch `main`. **Vercel auto-deploys on push to main.**
- Dev server: `npm run dev` on `:3000`. Check it isn't already running: `lsof -ti:3000`. Log at `/tmp/rwf-dev.log`.
- **Before pushing:** run `npm run build` to confirm a clean production build.
- **Commit only the files you changed.** The repo has pre-existing uncommitted files that are NOT ours (`CONTEXT.md`, `src/components/Landing.tsx`, `marketer-of-the-year`, a couple of research/content files). Leave them. `git add` specific paths, never `git add -A`.
- After push, confirm the deploy: `vercel ls --prod` (top row should go `Building` → `Ready`, ~25-30s build).
- Live site: https://runwithfoxes.com . Open at a module with the anchor, e.g. `#mod-studio`.

## Key files

- `src/components/HomePage.tsx` - the entire homepage, all modules and accordion rows (~1200 lines).
- `src/app/globals.css` - all styles, `cl-` prefix for the commercial layer.
- `src/lib/chat-system-prompt.ts` - Isa (chat widget) system prompt. Server-side, so changes are live for new chats on deploy, no client cache.
- `src/components/chat/ChatWidget.tsx` - chat widget; the 5-second auto-open welcome message (book download) is the hardcoded `WELCOME` const here. Leave it.

## How to add an accordion row

Modules are `<div className="cl-mod-section" id="mod-X">`. Rows live inside `cl-acc-rows`. Each row is a toggle div plus a conditional detail block. Pattern:

```jsx
<div className={`cl-acc-row${isOpen('KEY') ? ' expanded' : ''}`} onClick={() => toggle('KEY')}>
  <span className="cl-acc-indicator">+</span>
  <span className="cl-acc-activity">Row label</span>
</div>
{isOpen('KEY') && (
  <div className="cl-acc-detail">
    <div className="cl-acc-detail-split">
      <div className="cl-acc-detail-visual"> {/* SVG, CSS chart, or <img> */} </div>
      <div className="cl-acc-detail-copy">
        <div className="cl-acc-detail-sub">Copy, a couple of sentences.</div>
        {/* optional article link: */}
        <a className="cl-acc-detail-link" href="URL" target="_blank" rel="noopener noreferrer">Read: Title &rarr;</a>
      </div>
    </div>
  </div>
)}
```

- `isOpen('KEY')` keys must be **unique** (e.g. `seg-what`, `studio-cal`). Rows toggle independently.
- A formatter runs after each edit (reflows JSX). Re-Read the region before the next edit if line numbers matter.

## Reusable patterns established this session

- **`cl-acc-detail-link`** - sky-blue mono external/article link with hover underline, opens new tab (in globals.css). Use for article links under a panel's copy.
- **Article links:** pull the exact title from the live page with WebFetch, don't guess it from the URL slug.
- **Images / screenshots:** put them in `public/ads/` (the de-facto screenshots folder - `studio-measurement.png` and `marketing-calendar-preview.png` already live there), reference as `/ads/name.png`, and put `{/* eslint-disable-next-line @next/next/no-img-element */}` directly above any raw `<img>`.
- **Inline visuals:** built as SVG or CSS in brand colours, sized to feel like proper analysis (the existing scatter/cluster/matrix visuals are the bar). No external chart libs.

## Brand / voice rules (hard)

- Colours: navy `#1A3A4E`, sky `#3A7CA5`, cream `#FAFAF8`, logo orange `#F47521` (sparingly). Note: the `--orange` CSS var is actually sky blue; use `--logo-orange` for real orange.
- Fonts: Space Grotesk (`--sans`, headings), JetBrains Mono (`--mono`, body/labels).
- **No em dashes. No rounded corners. No judgement of teams/marketers. "We" not "you". No salesy closers. No invented stats.**
- Visuals should read as strong, robust, technical - that's the point of the panels.

## Modules (top to bottom) and their `mod-` ids

1. `mod-effectiveness` - Marketing effectiveness
2. `mod-segmentation` - Segmentation
3. `mod-brand-strategy` - Brand strategy
4. `mod-advertising` - Advertising
5. `mod-studio` - Studio
6. `mod-research` - Research and insights

(CLAUDE.md has the full row-by-row breakdown of each module.)

## Done in the 2026-06-03 session (all live)

- **Segmentation:** two new rows - "What segmentation is" (cluster-map SVG: navy diamonds / sky circles / orange triangles, boxed, legend outside the plot to the right) and "What holds up" (qualification matrix, types × four tests, filled/hollow squares). Copy reframed to the strategic "who to go after" and de-judged.
- **Newsletter link** under Paul's bio → runwithfoxes.substack.com.
- **Article links** in Brand strategy: Distinctive brand assets → `/p/distinctive-brand-assets-in-an-ai`, Mental availability → `/p/what-is-mental-availability-and-why`.
- **DBA matrix fix:** Fame × Uniqueness quadrant labels now all actions aligned to position (Use or lose / Invest here / Avoid or test / Build fame).
- **Marketing calendar** row added as first item in Studio (preview image + two-sentence copy).
- **Isa:** surfaces the newsletter and a chat/booking more readily across all chats - leads with a useful answer, then a natural clickable aside; scripted book welcome preserved; booking offered to everyone except self-identified students.

Commits: `92dc71b`, `03a5e86`, `ad7bac0`, `5731adc`.

## Open / next

- **More article links and rows to add** - Paul has others not yet specified. For each, get: which module/row, the article title (or fetch it), and the URL.
- **Marketing calendar** sits in Studio for now; may move to its own module later.
- If a new capability doesn't fit the six modules, raise whether it wants a new module before building.
