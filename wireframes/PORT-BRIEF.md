# PORT BRIEF - accordion homepage → live `HomePage.tsx`

> You (the porting terminal) are recreating the approved wireframe as the real Next.js homepage and deploying it. Read this whole file first. When you have a question or hit a blocker, **write it into `wireframes/PORT-QA.md`** (see "Question relay" at the bottom) - the design terminal is watching that file and will answer there. Do NOT guess on anything marked OPEN.

## 0. Source of truth
- **Visual + behaviour:** `wireframes/wireframe-accordion-homepage.html` (open it in a browser). This is the agreed design. Match it.
- **Direction + guardrails:** `CLAUDE.md` → "Homepage direction (2026-06-04)" and "Working wireframe + deploy spec".
- **Existing code to edit:** `src/components/HomePage.tsx` (the homepage, ~1300 lines) and `src/app/globals.css` (commercial layer styles, `cl-` prefix, from ~line 4207).

## 1. HARD GUARDRAILS - do NOT touch
These are byte-for-byte preserved. Changing them is a failure.
1. **Top nav + hero video overlay + scroll-to-solid behaviour.** Keep `hp-nav`, `hp-nav-scrolled`, the logo, `hp-hero-wrapper`, the landscape + portrait `hp-hero-video` elements, posters, and how the nav overlays the video. The ONLY permitted change up top is the nav **dropdown contents** (section 4).
2. **Isa chatbot.** `src/components/chat/ChatWidget.tsx`, `ChatWidgetLoader.tsx`. 5s auto-open, book-thumbnail welcome, `/book#signup` link, sessionStorage dismiss-for-visit, reopen next visit. Untouched.
3. **Bottom bar** (`hp-bottom-bar`): `#top` · `#about` · `/book` · `get in touch`. No logo. Untouched.

## 2. SAFETY / FALLBACK - read before writing any code
The site auto-deploys to production on push to `main`. So:
1. **Work on a branch:** `git checkout -b homepage-accordion-port`. Never commit the port directly to `main`.
2. **Push the branch** → Vercel builds a **preview deployment** (not production). Get the preview URL.
3. **The design terminal + Paul review the preview URL.** Only after approval does it merge to `main`.
4. **Rollback if needed:** production is recoverable at all times via git history. If a bad merge ever lands, `git revert <merge-sha>` + push restores the previous homepage; Vercel redeploys it.
5. Before editing, note the current good commit SHA in `PORT-QA.md` so we have the known-good reference.
6. `npm run build` must pass clean before any push.

## 3. What to build (the body of `HomePage.tsx` only)
Everything between the hero and the bottom bar gets reworked. Match the wireframe order:

1. **Hero text** (h1 + descriptor) - keep, but: single font (mono), thin weight, full-width descriptor (no narrow cap), and the blue accent word: `Build an <span class="hl">unfair advantage</span> in marketing`.
2. **Bio + photo** - magazine wrap (photo left, copy wraps beside then full width). Remove the inline "View my newsletter" link (it now lives on the carousel).
3. **Contact-CTA strip** (under bio) - `Contact us to  \build it for you · \work alongside you · \train your team`, each with a small green status dot that lights **in sequence** (one at a time, 3s loop). See `.metastrip` / `.fdot` / `@keyframes seq` in the wireframe.
4. **Substack carousel** (NEW, above the modules) - see section 5.
5. **Modules section** - `Where can <span class="hl">AI</span> be built into marketing?` + intro paragraph, then the **nested accordion** (section 6).
6. **Rotating testimonial band** (replaces the 4 inline `cl-testimonial-bar` blocks) - see section 7.
7. **Book block** - mirrors the `/book` hero: `The <span class="hl">Fox</span> Advantage` (Fox in blue), the pitch line, `\ 54 chapters  \ 4 parts  \ get_the_book →` (link `/book`), and `fox-book.png` on the right. Title sized in the section-heading tier (clamp ~26 - 38px), top-aligned with the image.

## 4. Nav dropdown change (the one allowed top change)
- `#unfair_advantage` → relabel **`/tools`**. Dropdown lists the 7 modules, each jumping to its accordion anchor: Marketing effectiveness, Segmentation, Brand strategy, Advertising, Studio, Business development, Research and insights.
- `/projects` → relabel **`/previous`**. Dropdown keeps ONLY the 4 case studies: Millionaire Raffle, Marketer of the Year, 48, Run with Foxes (book 1). **Delete the entire "AI TOOLS" group** (Expert Panel, Brief Diagnostician, Effectiveness Coach, AI Writer, Brand System, Chief of Staff).
- Slash style on both (`/tools`, `/previous`), matching `/book` `/contact`.
- Apply the SAME change to the nav in `BookLanding.tsx` if it shares the markup (check - the book page nav currently has an older module list).

## 5. Substack carousel (live feed)
- **Section sits above the modules.** No heading; a single `View newsletter →` link (→ `https://runwithfoxes.com/book`? NO - → `https://runwithfoxes.substack.com/`).
- **Data: live from the Substack RSS feed** `https://runwithfoxes.substack.com/feed`. Fetch server-side, parse each item's title, link, pubDate, description/excerpt, and image (enclosure or first content `<img>`). Use ISR / periodic revalidation (e.g. `revalidate: 3600`) so it self-updates.
- **Curation:** for now show the latest posts from the feed (the current ~5 are fine). Build it so a curated allowlist of slugs can be dropped in later to pick/order which surface. Leave a clear `CURATED_SLUGS` array (empty = latest).
- **Cards:** image + title (2-line reserve) + 1 - 2 line excerpt (2-line reserve) + `⊟ DATE · Paul Dervan`. Titles reserve 2 lines so the date rows align across cards.
- **CROP the images** (Paul, locked) - `object-fit: cover` in a fixed `16/10` frame. The uniform crop keeps the grid neat. Note: cover can clip text near image edges, so feature feed posts whose cover image keeps its text away from the edges.
- **Rotation: manual only.** Prev/next arrows + dots. **No auto-advance** (it sits below the moving CTA dots; auto motion was rejected). 3 cards visible on desktop, 1 on mobile. Cards link to the post (new tab).

## 6. Nested accordion (the modules)
- **L0:** the 7 modules as tight full-width rows: small square `▸` icon, module name (18px), a one-line grey descriptor, and an example count on the right (`4 examples`). Use the descriptors from the wireframe `MODS` data (short, faithful condensations of the real intros).
- **L1:** click a module → it expands to show the **real module intro paragraph** (from the live `cl-mod-desc`), an `Examples` label, then the tool rows.
- **L2:** click a tool → its **existing rich panel opens inline**. **REUSE THE EXISTING PANEL JSX VERBATIM** from the current `HomePage.tsx` - the pyramid SVG, scorecard table, brand/activation split, segmentation scatter/sim bars, competitor map, mental-availability chart, messaging video, DBA matrix, brand house, brand guidelines, the advertising media galleries, marketing calendar, studio measurement, influence-models grid, BD pipeline, Isa phone, company intel card, review bars, pricing table. Do not rebuild these - move them one level deeper.
- **Keep the two "Read:" Substack links** in their panels (Mental availability, Distinctive Brand Assets).
- **Foxes: OPEN** - the live modules each have a fox (`cl-mod-fox`, 280×280). The wireframe currently has them removed. See OPEN QUESTIONS before deciding where/whether foxes appear in the accordion.
- **No per-module "Contact us to…" line** (removed). The contact CTAs live only in the strip under the bio.
- Modules + counts + foxes + tool lists (exact, from live):
  - Marketing effectiveness (4): Measurement training, Metrics audit, Brand scorecard, Brand / activation split - fox `fox-sideeye-right-nobg.png`
  - Segmentation (4): What segmentation is, What holds up, Similarity analysis, Scatter plots - `fox-facepalm-nobg.png`
  - Brand strategy (6): Competitor positioning map, Mental availability, Messaging framework, Distinctive brand assets, Brand on a page, Brand guidelines - `fox-book.png`
  - Advertising (4): Video, Brand ads, Animated ads, Static ads - `fox-lottery-nobg.png`
  - Studio (3): Marketing calendar, Studio measurement, Brief coach - `fox-pm-nobg.png`
  - Business development (1): Business development rep - `fox-monday-nobg.png`
  - Research and insights (4): AI research interviewer, Company intelligence, Review intelligence, Pricing intelligence - `chapter-fox-sitting-nobg.png`
- **Open UX question (decide with design terminal):** tool panels multi-open (several at once, as live) vs one-at-a-time. Default: keep multi-open (matches live).

## 7. Testimonials (rotating band)
- Replace the 4 inline `cl-testimonial-bar` blocks with ONE slim rotating band placed just above the book block.
- One quote at a time, centred, manual prev/next arrows + dots, **no auto-advance**.
- **Fixed height** so switching quotes does not push the book block down (reserve height for the longest quote; centre shorter ones).
- The 4 real quotes (verbatim, already in the live file): Peter Field, Paul D'Arcy, Damian Devaney, Jonnie Cahill.

## 8. IMAGES - must all carry over correctly
The safest path: **reuse the existing panel JSX**, whose image/video paths are already correct (`/public`-relative, `next/image` or `<img>`/`LazyVideo`). Don't retype paths. Full asset inventory to verify renders (no 404s):
- **Foxes** (`/public/fox/`): fox-sideeye-right-nobg.png, fox-facepalm-nobg.png, fox-book.png (also the book block), fox-lottery-nobg.png, fox-pm-nobg.png, fox-monday-nobg.png, chapter-fox-sitting-nobg.png
- **Bio:** `/Paul_photo.jpg`
- **Ad stills** (`/public/ads/`): brand-killbill.png, brand-vespa.png, brand-rushmore.png, static-arsenal.png, static-6040.png, marketing-calendar-preview.png, studio-measurement.png
- **Videos** (`/public/video/`): hyperspeed.mp4, rounders.mp4, waterslide.mp4, animated-6040-sideeye.mp4, animated-6040-activate.mp4, animated-lottery.mp4, messaging-framework-scroll.mp4 (+ the guarded hero videos/posters - untouched)
- **Substack card images:** remote Substack CDN URLs from the feed. With `next/image`, add `substackcdn.com` and `substack-post-media.s3.amazonaws.com` to `images.remotePatterns` in `next.config`, OR use a plain `<img>` for these. Confirm they load.
- **The wireframe uses `file://` absolute paths** for preview only - in the app every local asset is `/public`-relative. Convert accordingly.
- **VERIFY:** after build, load every section, open the browser Network tab, confirm zero image/video 404s.

## 9. Styling
- **Single font: JetBrains Mono throughout.** Both fonts are loaded; point all heading `font-family: var(--sans)` usages at the mono stack (or set `--sans` to mono) for the homepage, OR scope a wrapper. Confirm no Space Grotesk renders on the homepage. (Do not break other pages that may rely on `--sans`.)
- **Type scale (consistent):** hero h1 clamp(40 - 64) weight 300; section headings clamp(24 - 34); book title clamp(26 - 38); sub-heads (module/card titles) 18; body 15; testimonial quote 16; small (panel copy, descriptors) 13; micro (labels, dates, attributions) 11 - 12.
- **Dot-grid background:** `radial-gradient(circle, rgba(208,208,204,0.45) 0.8px, transparent 0.8px)` at `28px` (matches the existing site texture).
- **Blue accent class** `.hl { color: var(--sky); }` - one accent word per headline: hero "unfair advantage", section "AI", book "Fox".
- **Green sequential CTA dots** - see `.fdot` + `@keyframes seq` + the per-link `animation-delay` in the wireframe.
- No em dashes, no rounded corners, light mode only, fox on cream only.

## 10. Decisions - LOCKED vs OPEN
LOCKED: crop Substack images (object-fit cover, neat uniform grid); curated list = latest-from-feed for now; nav `/tools` + `/previous`; testimonials = bottom rotating band; single font; the type scale; book block mirrors `/book`; per-module CTA removed; "not sure where to start" note removed.
OPEN (ask in `PORT-QA.md` before building these):
- **Foxes in the accordion** - in or out? If in, where (expanded module intro, right side)?
- **Tool panels** - multi-open vs one-at-a-time (default multi-open).

## 11. Pre-merge test checklist
- [ ] `npm run build` passes clean
- [ ] localhost:3000: hero video + nav overlay + scroll-to-solid unchanged
- [ ] Isa chatbot still auto-opens at 5s, behaves as before
- [ ] Bottom bar unchanged
- [ ] Accordion: all 7 modules expand, all tools open their real panels, all visuals render
- [ ] Substack carousel pulls the live feed, images crop neatly to the frame (no 404), manual arrows work
- [ ] Testimonials rotate, band height fixed (book block doesn't move)
- [ ] Nav dropdowns: `/tools` (7 modules), `/previous` (4 case studies only)
- [ ] Zero image/video 404s (Network tab)
- [ ] Mobile pass (single-column carousel, accordion, bio)
- [ ] Preview URL shared and approved BEFORE merge to main

## 12. Question relay
- Write questions / blockers / status into **`wireframes/PORT-QA.md`** under "OPEN QUESTIONS (porter → design)". Number them. The design terminal is watching that file and will answer inline under each. Re-read it for answers before proceeding on any OPEN item.
- Put your known-good starting commit SHA and your branch name + preview URL at the top of `PORT-QA.md` so the design terminal can track and review.
