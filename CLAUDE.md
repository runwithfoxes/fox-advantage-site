# Run with Foxes Website

## What this is
The live homepage for runwithfoxes.com. Next.js site deployed on Vercel. The commercial layer was built on 2026-05-29/30, replacing the old module-based layout with an accordion-based system.

## Current state (2026-05-30)
Live and deployed. Homepage has hero + commercial layer with 6 accordion module sections. All copy approved by Paul. All assets in place. Mobile responsive pass still needed on accordion detail panels.

## Key files
- `src/components/HomePage.tsx` - the entire homepage (~1120 lines, single component)
- `src/app/globals.css` - all styles including commercial layer (cl- prefix, starts around line 4207)
- `src/app/contact/page.tsx` - contact page with three engagement types
- `src/app/layout.tsx` - app layout (fonts, chat widget)
- `wireframes/wireframe-commercial-layer.html` - the wireframe source of truth for copy and visuals
- `wireframes/BUILD-BRIEF.md` - the handover brief used to port wireframe to Next.js
- `public/fox/` - fox photography assets (18 images)
- `public/ads/` - ad images (killbill, vespa, rushmore, arsenal, 6040, sherlock, professor, studio-measurement)
- `public/video/` - video assets (hyperspeed, rounders, waterslide, animated ads, messaging-framework, tarantino trunk)

## Homepage structure (top to bottom)

1. **Nav** - logo, #unfair_advantage dropdown (6 module anchors), /projects dropdown (case studies + AI tools), /book, /contact
2. **Video hero** - Tarantino trunk video (landscape + portrait), poster images
3. **Hero text** - "Build an unfair advantage in marketing" h1, then descriptive line, then border divider
4. **About** - Photo + 3-paragraph bio + "/Paul Dervan" in blue mono
5. **Modules intro** - "Where can AI be built into marketing?" + engagement CTAs
6. **Module 1: Marketing effectiveness** (id: mod-effectiveness) - 4 accordion rows: measurement training (SVG pyramid), metrics audit (mini pyramid), brand scorecard (full table), brand/activation split (two-column table + bar chart)
7. **Module 2: Segmentation** (id: mod-segmentation) - 2 accordion rows: similarity analysis (bar chart), scatter plots (SVG)
8. **Peter Field testimonial bar**
9. **Module 3: Brand strategy** (id: mod-brand-strategy) - 6 accordion rows: competitor positioning map, mental availability (line chart), messaging framework (video), distinctive brand assets (2x2 matrix), brand on a page (brand house), brand guidelines (swatches/type/nevers)
10. **Module 4: Advertising** (id: mod-advertising) - 4 accordion rows: video (3x), brand ads (3x images), animated ads (3x video), static ads (2x images)
11. **Paul D'Arcy testimonial bar**
12. **Module 5: Studio** (id: mod-studio) - 2 accordion rows: studio measurement (image), brief coach (influence models grid)
13. **Damian Devaney testimonial bar**
14. **Module 6: Research and insights** (id: mod-research) - 4 accordion rows: AI research interviewer (SVG phone), company intelligence (HTML card), review intelligence (sentiment bars), pricing intelligence (price grid + alert)
15. **Jonnie Cahill testimonial bar**
16. **Book CTA** - cream background, left-aligned, links to /book
17. **Bottom bar** - #top, #about, /book, get in touch

## Module pattern
Every module section follows:
- `cl-mod-section` with id for nav anchor
- `cl-mod-intro` grid: left (title + description), right (fox image 220px, max-height 220px)
- `cl-acc-examples` label
- `cl-acc-rows` with expandable `cl-acc-row` items (independent toggle, React state with Set)
- Detail panels (`cl-acc-detail`) with visual left / copy right layout
- `EngagementCTAs` component at bottom (links to /contact)

## Fox assignments
- Marketing effectiveness: fox-sideeye-right-nobg.png
- Segmentation: fox-facepalm-nobg.png
- Brand strategy: fox-book.png (portrait image, capped by max-height)
- Advertising: fox-lottery-nobg.png
- Studio: fox-pm-nobg.png
- Research: chapter-fox-sitting-nobg.png

## Ad assets in use
- Brand ads: brand-killbill.png, brand-vespa.png, brand-rushmore.png (all forced square with cl-media-img-square)
- Static ads: static-arsenal.png, static-6040.png (two only)
- Videos: hyperspeed.mp4, rounders.mp4, waterslide.mp4, animated-6040-sideeye.mp4, animated-6040-activate.mp4, animated-lottery.mp4, messaging-framework-scroll.mp4
- Studio: studio-measurement.png
- Unused in public/ads/: brand-waterslide.png, brand-sherlock.png, static-professor.png, static-sherlock.png

## CSS architecture
- Existing site uses `hp-` prefix for homepage styles (nav, hero, bottom bar, old modules)
- Commercial layer uses `cl-` prefix for all new styles (avoids conflicts)
- Old `hp-` module styles (hp-module-section, hp-about, hp-testimonial-bar etc.) are dead code but left in globals.css
- CSS variables: `--orange` in :root is #3A7CA5 (sky blue, not actual orange). Use `--logo-orange` for #F47521
- Testimonial bars: `cl-testimonial-bar`, thin (24px padding), no dot grid, z-index 2

## Brand
- Sky blue: #3A7CA5
- Deep sky: #1A3A4E
- Cream/bg: #FAFAF8
- Orange: #F47521 (logo "Run" only)
- Fonts: Space Grotesk (headings, var(--sans)), JetBrains Mono (body, var(--mono))
- Fox only appears on cream backgrounds, never on colour
- Dot grid: radial-gradient(circle, rgba(208,208,204,0.4) 0.8px, transparent 0.8px) at 28px spacing

## Testimonials
- Jonnie Cahill, SVP CMO International Foods, PepsiCo
- Peter Field, Godfather of Effectiveness
- Paul D'Arcy, CMO Moloco (former Miro, Indeed)
- Damian Devaney, Ex-CMO O2, Chair of Effies Ireland

## Voice rules (hard rules for all copy on this site)
- No generalisations ("most teams", "nobody thinks about")
- No judgement or criticism of teams/marketers
- No salesy closers ("that's where it gets interesting", "that's the bit")
- No "replace" language - frame as opportunity, not replacement
- Quality and speed are the two themes running through everything
- "We" not "you" - peer-to-peer, optimistic
- No corporate words, no AI hype words
- No em dashes anywhere
- No rounded corners
- Start specific, not with thesis statements
- See ~/.claude/skills/writing-voice/ for full voice spec

## Locked copy (approved by Paul 2026-05-30)
- Hero desc: "We turn repeated marketing work into practical AI systems: briefs, writers, brand guardians, campaign engines, QA tools, studio workflows and reporting systems."
- Modules intro: "Below are the places we most often build AI into marketing work. A marketing team of two or three, with the right systems, can do work that used to need a department."
- Studio intro: "We've spent twenty years running internal studios. We bring AI into them to do three things: improve the quality of the work, get it out faster, and show the ROI."
- Research intro: "We love research, and have helped teams with a range of solutions such as message testing, company intelligence, review analysis, pricing monitors, and agents that call and interview people on their shopping behaviour."

## What's next
1. **Mobile responsive pass** - accordion detail panels (scorecard, pricing table, comp map, brand house) need work on small screens. Panels are collapsed by default so not immediately broken.
2. **Copy pass** - module intro paragraphs for effectiveness, segmentation, brand strategy, and advertising are from wireframe but haven't been specifically reviewed word-by-word this session.
3. **Clean up unused assets** - brand-waterslide.png, brand-sherlock.png, static-professor.png, static-sherlock.png in public/ads/ are no longer used.
4. **Bottom bar observer** - only watches first cl-modules-wrap div. Testimonial bars split modules into 4 separate wraps. May cause bottom bar visibility issues.
5. **Nav dropdown grouping** - currently single column labelled MODULES. Old site had 3 columns (Human leads / AI+Human / AI does it). May want to reconsider.
6. **Dead CSS cleanup** - old hp-module, hp-about, hp-testimonial, hp-mid-cta styles still in globals.css but no longer used.

## Session history
- 2026-05-28: First wireframe session (saved in intelligence/sessions/)
- 2026-05-29 (morning): Wireframe iterated, modules 1-4 built with Paul
- 2026-05-29 (afternoon): Modules 5-6 built, sections cut, structure finalised, BUILD-BRIEF.md written
- 2026-05-30 (night): Ported wireframe to Next.js, iterated with Paul on foxes/ads/testimonials/spacing, deployed to production
