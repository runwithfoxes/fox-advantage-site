# Handoff: Run with Foxes Site Rebuild — 2026-04-21

## What was done

Ported wireframe-full.html to Next.js as the new homepage at runwithfoxes.com. The old book-focused homepage moved to /book.

### New files
- `src/components/HomePage.tsx` — new consulting homepage (20 sections)
- `src/components/BookLanding.tsx` — book page (chapters, parts, email gate, no about/projects)
- `src/app/book/page.tsx` — /book route
- `public/video/` — hero videos (landscape + portrait), ad demo videos, scroll videos
- `public/fox/fox-pm-nobg.png` — project manager fox (clipboard + watch)
- `public/video/fox-tarantino-trunk-poster.jpg` — fallback poster for hero
- `public/video/fox-tarantino-trunk-portrait-poster.jpg` — fallback poster for mobile hero

### Changed files
- `src/app/page.tsx` — now renders HomePage instead of Landing
- `src/app/globals.css` — all homepage styles added with `hp-` prefix (from line ~3280)
- `src/app/layout.tsx` — added page-wrapper div for overflow control
- `src/app/contact/page.tsx` — email changed to paul@runwithfoxes.com
- `next.config.ts` — unchanged (reverted a bad image format config)

### Deleted
- `/zoroh` route and Zoroh.tsx component

### Navigation (consistent across all pages)
- Top nav: logo | #unfair_advantage mega dropdown | /projects dropdown | /book | /contact
- Logo: white text over video hero, orange "Run" on cream background after scroll
- Bottom bar: #top | #about | /book | get in touch
- Book page uses same nav in permanent "scrolled" state (no video hero)

### Key design decisions
- Full-bleed sections (testimonials, mid-CTA) moved outside `hp-modules` container to avoid 100vw breakout hack
- Hero video: landscape on desktop, portrait (<768px) on mobile, both play once and hold on last frame
- Portrait video trimmed to 2.8s to remove yellow "Scale your Distinctive Brand Assets" endframe
- PM fox uses `<img>` tag instead of Next.js `<Image>` to preserve PNG transparency
- Function links styled as `\strategy \positioning` etc (backslash, no space, lowercase)

## Two bugs remaining

### 1. Logo doesn't scroll to top on desktop
The logo `<a href="#heroWrapper">` renders correctly in HTML but clicking it does nothing. The `#heroWrapper` element exists with that ID. Tried: plain `<a href="#">`, `<button>` with onClick, `scrollIntoView`, `window.scrollTo`. None work.

**Theory:** Next.js client-side routing is intercepting the anchor click. The bottom bar `<a href="#heroWrapper">#top</a>` has the same issue.

**Debug approach:** Open browser DevTools, click the logo, check if there's a JS error in console. Or check if the `<a>` tag's click event is being prevented by a parent handler. Try adding `onClick={(e) => { e.stopPropagation(); }}` or using `window.location.hash = 'heroWrapper'` directly.

### 2. Horizontal scroll on mobile
The page can be dragged left/right on mobile. `overflow-x: hidden` is set on html, body, and `.page-wrapper` but something still overflows.

**Debug approach:** In Chrome DevTools mobile view, open Console and run:
```js
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    console.log(el.className, el.scrollWidth);
  }
});
```
This will identify exactly which element is wider than the viewport.

## File structure reference

```
src/
  app/
    page.tsx          → renders HomePage
    book/page.tsx     → renders BookLanding
    globals.css       → all styles (hp- prefix for homepage, ~4100 lines)
    layout.tsx        → fonts, page-wrapper, ChatWidget
  components/
    HomePage.tsx      → new consulting homepage
    BookLanding.tsx    → book page (stripped Landing.tsx)
    Landing.tsx       → old homepage (kept for reference, not used)
public/
  video/              → all .mp4 files for the site
  fox/                → all fox PNGs
  Paul_photo.jpg
  event-page-screenshot.png
```

## Brand rules (must follow)
- Sky blue: #3A7CA5, hover: #2F6688, deep sky: #1A3A4E
- Orange #F47521 is ONLY for logo "Run" — nowhere else
- Logo "Run" is white over video/photos, orange on cream background
- Fox only on cream (#FAFAF8) backgrounds, never on coloured sections
- Fonts: Space Grotesk (headings), JetBrains Mono (body)
- Dot grid on body (0.4 opacity) and blue bars (0.12 opacity)
- Transitions: 300ms ease-out, background shifts only, no scale transforms
