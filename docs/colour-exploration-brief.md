# Brand colour exploration brief

## Context

runwithfoxes.com was rebranded from orange (#F47521) to teal (#2C7A7B) on 2026-04-20. The reason was to differentiate from Claude Design's warm terracotta/cream palette. But now that the homepage hero uses cinematic fox photography (Tarantino trunk shots — desert, blue sky, golden light, orange fox in a suit), teal may clash with the warm tones.

## The problem

The website currently feels **muted**. Paul wants it to feel **full of energy and sunshine**.

The fox character is orange-furred, shot against blue skies and desert gold. The photography is warm and cinematic. The brand needs a colour system that works WITH this photography, not against it.

## What to explore

1. **Sky blues and yellows** — colours that complement the fox photography (blue sky, golden desert, orange fox)
2. **Keep orange in the logo only** — the word "Run" in /Runwithfoxes stays orange (#F47521), but UI/UX elements (buttons, links, accents) use a different palette
3. **Does teal work at all?** — or does it fight the photography and make everything feel cold?
4. **Energy, not muted** — the current site feels too restrained. The new palette should feel alive

## Key files to reference

- **Brand guide:** `~/paul-hub/context/brand/runwithfoxes-brand-guide.md`
- **Current CSS:** `~/projects/fox-advantage-site/src/app/globals.css` (has all current colour vars)
- **Hero wireframe:** `~/projects/fox-advantage-site/wireframe-hero-options.html` (the B2 hero with video)
- **Fox photography:** `~/paul-hub/clients/rwf/tarantino-fox-source-frame-1920x1080.png`
- **Branded page skill:** `~/.claude/skills/branded-page/SKILL.md` (has full colour spec)
- **Teal rebrand memory:** `~/.claude/projects/-Users-pauldervan/memory/project_brand_teal_rebrand.md`

## Constraints

- Background stays cream (#FAFAF8)
- Text stays dark (#1D1B1B)
- Fox character stays orange — never change the fox
- Fox only appears on cream backgrounds, never on coloured sections
- Dark sections (close, mid-CTA) need a dark colour — currently night-sea (#1B4D5C)

## Output

Build a simple HTML page showing 3-4 colour palette options side by side, each with:
- The palette swatches
- A mock hero section using that palette (buttons, links, accent text)
- The Tarantino fox image so Paul can see how the colours sit against the photography
- The /Runwithfoxes logo with orange "Run" in each

Save to `~/projects/fox-advantage-site/colour-exploration.html` and open in browser.
