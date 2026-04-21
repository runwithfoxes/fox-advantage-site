# Run with Foxes Website Rebuild

## What this is
Homepage wireframe for runwithfoxes.com. Currently a static HTML file (`wireframe-full.html`). Will be ported to the existing Next.js site in this repo.

## Current state (2026-04-21)
The wireframe is structurally complete. All copy written in Paul's voice. Committed and pushed to main.

## Section order (top to bottom)
1. **Nav** — logo (white on video, orange "Run" on scroll), #unfair_advantage mega dropdown, /about, /book, /contact
2. **Video hero** — Tarantino trunk video, "Build an unfair advantage in marketing", function breadcrumb links, "get in touch" CTA aligned right of headline
3. **About/Who** — Paul's full bio (career history, Peter Field, books, consultancy, systems, B2B+FMCG). Sits right after hero, above all modules
4. **Strategy** — Experts panel. Fox aligned to title. "Try the panel yourself" links to runwithfoxes.com/experts
5. Jonnie Cahill testimonial bar (PepsiCo)
6. **Positioning** — Brand equity framing, brand house visual on right
7. **Messaging** — "Messaging flows from positioning", agent-based framework
8. **Research** — Research agent (YouTube, Substack). "We still need to read it ourselves. The robots haven't figured that bit out yet."
9. Book CTA bar — "The Fox Advantage is available for free"
10. **Advertising** — Influence models, brief diagnostician card on right
11. Peter Field testimonial bar
12. **Marketing effectiveness** — Metrics pyramid on right. "You can't manage a brand if you can't measure one"
13. **Brand guardian** — Own section. Brand guidelines scroll video on right
14. **Ad agent engine** — Two square video ads side by side (lottery-ad.mp4, 6040-ad.mp4)
15. Paul D'Arcy testimonial bar (Moloco)
16. **Events** — Event landing page system
17. **Growth team** — AI copywriter + growth exec + content creator. Opportunity for companies without growth teams
18. Damian Devaney testimonial bar
19. **Project manager** — Morning briefing agent, shared briefing board
20. **Close CTA** — "Build an unfair advantage in marketing" + get in touch

## Testimonials (blue bars scattered between sections)
- Jonnie Cahill, SVP CMO International Foods, PepsiCo
- Peter Field, Godfather of Effectiveness
- Paul D'Arcy, CMO Moloco (former Miro, Indeed)
- Damian Devaney, Ex-CMO O2, Chair of Effies Ireland

## Brand
- Sky blue: #3A7CA5
- Deep sky: #1A3A4E
- Cream/bg: #FAFAF8
- Orange: #F47521 (logo "Run" only)
- Fonts: Space Grotesk (headings), JetBrains Mono (body)
- Fox only appears on cream backgrounds, never on colour
- Dot grid background on body and blue bars

## Layout pattern for modules
Every module follows the same structure:
- `module-split` with `align-items: start`
- Left: module-header (title), then module-desc paragraphs, optional CTA button
- Right: fox image OR video OR visual (aligned to title level, not floating below)
- Fox images use `padding-top: 0` to align ears with the title text

## Testimonial bars
Full-width blue bars (`testimonial-bar` class) with left-aligned quote and attribution. Same deep-sky background as mid-CTAs with dot grid overlay.

## Voice rules (hard rules for all copy on this site)
- No generalisations ("most teams", "nobody thinks about")
- No judgement or criticism of teams/marketers
- No salesy closers ("that's where it gets interesting", "that's the bit")
- No "replace" language — frame as opportunity, not replacement
- Quality and speed are the two themes running through everything
- "We" not "you" — peer-to-peer, optimistic
- No corporate words, no AI hype words
- Start specific, not with thesis statements
- See ~/.claude/skills/writing-voice/ for full voice spec

## What's next
1. **Audit existing runwithfoxes.com** — map all current pages and content. Decide what becomes /book, what becomes standalone pages (/experts, /coach, /brand), what gets cut
2. **Events section** — copy not yet rewritten in Paul's voice
3. **Port wireframe to Next.js** — the site already has a Next.js setup in this repo
4. **Build /book page** — current homepage content moves here
5. **Build /run-with-foxes page** — for the first book (published 2020)
6. **Fox images** — project manager needs its own fox, not reusing the strategy fox

## Files
- `wireframe-full.html` — the main wireframe (source of truth)
- `lottery-ad.mp4` / `6040-ad.mp4` — ad engine demo videos
- `public/fox/` — fox photography assets
- `public/Paul_photo.jpg` — Paul's headshot
