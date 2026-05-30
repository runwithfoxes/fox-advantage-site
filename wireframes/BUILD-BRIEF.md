# Build Brief: Commercial Layer into Next.js Homepage

## What this is

Port the wireframe at `wireframes/wireframe-commercial-layer.html` into the live Next.js homepage at `src/app/page.tsx`. This replaces everything below the hero on the current homepage.

## Source of truth

The wireframe HTML file is the ONLY source of truth. Every piece of copy, every visual, every accordion detail panel, every SVG has been iterated and approved by Paul. Do not rewrite copy. Do not rearrange sections. Do not add things that aren't in the wireframe.

## Session context (what was decided today)

### Structure (top to bottom)

1. **Hero** - KEEP EXISTING. Do not touch nav, video, headline, or function links. The wireframe has a placeholder for this. One addition: a new line sits between the headline and the function links: "We turn repeated marketing work into practical AI systems: briefs, writers, brand guardians, campaign engines, QA tools, studio workflows and reporting systems."
2. **About section** - Paul's photo + bio. Photo placeholder for now, bio text is in the wireframe.
3. **Modules intro** - Heading: "Where can AI be built into marketing?" (with question mark). Paragraph: "Below are the places we most often build AI into marketing work. A marketing team of two or three, with the right systems, can do work that used to need a department." Plus three engagement CTAs that link to `/contact`.
4. **Module 1: Marketing effectiveness** - 4 accordion rows with SVG/HTML visuals (measurement training pyramid, metrics audit mini-pyramid, brand scorecard, brand/activation split). All fully built in wireframe.
5. **Module 2: Segmentation** - 2 accordion rows with SVG visuals (similarity analysis bars, scatter plots). All fully built.
6. **Module 3: Brand strategy** - 6 accordion rows (competitor positioning map, mental availability chart, messaging framework video, distinctive brand assets matrix, brand on a page/brand house, brand guidelines). All fully built.
7. **Module 4: Advertising** - 4 accordion rows (video x3, brand ads x3, animated ads x3, static ads x3). References video/image files.
8. **Module 5: Studio** - Intro: "We've spent twenty years running internal studios. We bring AI into them to do three things: improve the quality of the work, get it out faster, and show the ROI." 2 accordion rows only: Studio measurement (image), Brief coach (influence models grid).
9. **Module 6: Research and insights** - Intro: "We love research, and have helped teams with a range of solutions such as message testing, company intelligence, review analysis, pricing monitors, and agents that call and interview people on their shopping behaviour." 4 accordion rows in this order: AI research interviewer (SVG phone mockup), Company intelligence (HTML card), Review intelligence (sentiment bars), Pricing intelligence (price grid with alert).
10. **Testimonial bar** - Jonnie Cahill quote. Blue bar (deep-sky background with dot grid).
11. **Book CTA** - On cream background, left-aligned, NOT a blue bar. Simple text link style. "The Fox Advantage is available for free." / "The book is almost finished. Pick up a copy." / "Get the book" link.
12. **NO close CTA** - The "Build an unfair advantage / Get in touch" section was deleted. Page ends after book CTA.

### What was deleted (do NOT include)

- Team capabilities section (was module 6)
- Go to market section (was module 8)
- Marketing operations section (was module 9)
- Close CTA section at the very end
- Copywriters accordion row from Studio
- Project managers accordion row from Studio

### Key decisions

- **Accordion interaction**: Click row to expand/collapse. `+` indicator on left turns sky blue when expanded. Only one detail panel visible at a time per section, or independent toggles - check wireframe JS behaviour.
- **Engagement CTAs**: Appear at bottom of every module section. Three links: `\build it for you`, `\work alongside you`, `\train your team`. All link to `/contact`.
- **Visual language**: Clean lines, no coloured blocks, GitHub feel. Sky blue text for interactive elements. `+` indicator on left of accordion rows.
- **Fox images**: One per module section, in the right column of the intro area. Assign from `public/fox/`. Check what's available with `ls public/fox/`. Fox only appears on cream backgrounds.
- **Dot grid background**: Applied to hero text area, about section, and modules accordion area. Pattern: `radial-gradient(circle, rgba(208,208,204,0.4) 0.8px, transparent 0.8px)` at 28px spacing.

## CSS variable names

IMPORTANT: The existing globals.css uses `--color-sky-blue`, `--color-sky-blue-hover`, etc. NOT `--sky-blue`. Check the `:root` block in globals.css before writing any styles. The wireframe uses different variable names (`--sky-blue`, `--deep-sky`, etc.) so you MUST translate them to the correct globals.css names.

Key mappings from wireframe to globals.css:
- `--sky-blue` in wireframe = check globals.css for `--color-sky-blue` (#3A7CA5)
- `--deep-sky` in wireframe = check globals.css for equivalent (#1A3A4E)
- `--bg` = #FAFAF8
- `--text` = #1D1B1B
- `--muted` = #8A8A85
- `--border` = #E0E0DC
- `--mono` = JetBrains Mono
- `--sans` = Space Grotesk
- `--orange` or `--color-orange` = #F47521

READ globals.css `:root` block first to get the exact variable names.

## Files to read before starting

1. `wireframes/wireframe-commercial-layer.html` - THE source of truth (read completely)
2. `src/app/page.tsx` - current homepage (understand structure before replacing)
3. `src/app/globals.css` - existing styles and variable names
4. `src/app/layout.tsx` - app layout wrapper
5. `public/fox/` - available fox images (ls this directory)
6. `CLAUDE.md` - repo context, voice rules, brand details
7. `src/app/contact/page.tsx` - contact page (engagement CTAs link here)

## Video and image assets

The wireframe references these paths. Check if they exist in `public/`:
- `/video/hyperspeed.mp4`, `/video/rounders.mp4`, `/video/waterslide.mp4`
- `/video/animated-6040-sideeye.mp4`, `/video/animated-6040-activate.mp4`, `/video/animated-lottery.mp4`
- `/video/messaging-framework-scroll.mp4`
- `/ads/brand-killbill.png`, `/ads/brand-vespa.png`, `/ads/brand-waterslide.png`
- `/ads/static-arsenal.png`, `/ads/static-6040.png`, `/ads/static-algorithm.png`
- `/ads/studio-measurement.png`

If any don't exist, use a placeholder div matching the wireframe's placeholder style.

## Module pattern (every module follows this)

```
<mod-section>
  <mod-intro>
    <left: title + description paragraph>
    <right: fox image (280x280 area)>
  </mod-intro>
  <examples label>
  <accordion rows>
    <row: + indicator | activity name>
    <detail panel: visual on left | copy on right>
    ...more rows...
  </accordion>
  <engagement CTAs>
</mod-section>
```

## Contact page (already updated)

The contact page at `src/app/contact/page.tsx` has already been updated with three engagement types. The CTAs in the wireframe should link to `/contact`. No query params needed.

## What NOT to do

- Do not rewrite any copy from the wireframe
- Do not add sections that aren't in the wireframe
- Do not change the hero/nav
- Do not use dark backgrounds for any new sections (always light mode)
- Do not use em dashes anywhere
- Do not use rounded corners
- Do not add comments explaining what code does
- Do not create separate component files for each section - keep it simple

## Commit and deploy

When finished, commit with a clear message. Paul wants to deploy tonight so make sure the build passes (`npm run build`).
