# Run with Foxes Website

## What this is
The live homepage for runwithfoxes.com. Next.js site deployed on Vercel. The commercial layer was built on 2026-05-29/30, replacing the old module-based layout with an accordion-based system.

## Current state (2026-06-04) - accordion port LIVE
Live and deployed. The homepage was ported from `wireframes/wireframe-accordion-homepage.html` to a single nested accordion and shipped to production (merge `ef84f97..69bae26` -> main, Vercel auto-deploy). Structure now: hero -> bio (magazine wrap) + contact-CTA strip (sequential green dots) -> LIVE Substack carousel -> 7-module nested accordion (L0 row -> L1 intro -> L2 reused rich panels) -> rotating testimonial band -> book block. Single font (JetBrains Mono) across the homepage via `--sans -> mono` on `.hp-root`. Nav is now `/tools` + `/previous`. All copy approved, zero 404s. See "Homepage structure" below (updated) and the session summary `~/paul-hub/clients/rwf/sessions/website-2026-06-04-homepage-accordion-port.json`. Rollback if ever needed: `git revert 69bae26` (or revert the merge) + push.

### Previous state (2026-05-30)
Hero + commercial layer with 6 stacked accordion module sections, 4 inline testimonial bars, book CTA. Superseded by the port above.

## Homepage direction (2026-06-04) - locked, BUILT + LIVE (kept for the decision trail)
A long exploration session worked the problem "the homepage reduces to a list of things." It RULED OUT every floor-plan / department-render / revolving-hero idea and CONFIRMED the accordion is the right answer - the fix was framing, not visuals. The agreed evolution of the current layout:
- **Keep the Tarantino video hero** as-is. Single video, swappable over time. **No revolving/carousel hero.**
- **Keep** bio + photo and the engagement CTAs (`\build it for you` / `\work alongside you` / `\train your team`).
- **Tighten the modules into one compact, nested accordion** so the *tightness itself* reads as "a department," not a vendor menu. Two-level disclosure:
  - L0 - the seven modules as tight rows at a glance, each with a tool count (e.g. "4 tools"). (Today they're full stacked sections; the direction is to collapse them into one scannable index.)
  - L1 - click a module → expands to its tools.
  - L2 - click a tool → its existing rich panel opens inline (pyramid SVG, scorecard, comp map, charts - keep every one).
- **Aesthetic to own:** cinematic video + cute foxes (nobg) + low-fi tech (JetBrains Mono, repo-style rows, thin dividers, "shipped" dots, `\` CTA syntax).
- **Open question:** tool panels open independently (several at once, as today) vs one-at-a-time within a module (tighter). Undecided.
- **Keeper mock:** `wireframes/department-accordion-mock.html`. Full decision trail + rejected ideas: `~/paul-hub/clients/rwf/CONTEXT.md` and `~/paul-hub/clients/rwf/sessions/website-2026-06-04-homepage-department-direction.json`.
- **Build target:** apply to `src/components/HomePage.tsx` - real headline type scale, pour real copy into rows/panels, then decide the open question.

### Working wireframe + deploy spec (2026-06-04, evening)
- **Current working wireframe:** `wireframes/wireframe-accordion-homepage.html` (supersedes the keeper mock for build). Single font throughout (JetBrains Mono, no Space Grotesk). Real module/tool copy pulled from the live `HomePage.tsx`. Sequential green status dots on the contact-CTA strip under the bio. Thought-leadership carousel above the modules, manual rotation, wired to the live Substack feed (`runwithfoxes.substack.com/feed`) with a curated post list. Rotating testimonial band (manual, fixed height) above the book block. Book block mirrors the `/book` hero.
- **DEPLOY GUARDRAIL:** when porting the accordion homepage, do NOT modify the nav or hero-video code (`hp-nav`, `hp-nav-scrolled`, `hp-hero-wrapper`, the landscape + portrait `hp-hero-video` elements, posters, and the nav-over-video overlay). That overlay was hard-won; leave it byte-for-byte. The ONLY permitted change above the fold is the nav dropdown contents.
- **DEPLOY GUARDRAIL (Isa chatbot):** do NOT change the Isa chatbot or its rules. It auto-opens after 5 seconds on first load, shows the welcome message with the book-cover thumbnail and the "free to download" link to `/book#signup`, stays closed for the rest of the visit once dismissed (sessionStorage), and reopens on the next visit. Files: `src/components/chat/ChatWidget.tsx`, `src/components/chat/ChatWidgetLoader.tsx`. Leave as-is (see the "Isa chatbot behaviour" section below).
- **DEPLOY GUARDRAIL (bottom bar):** keep the sliding bottom bar (`hp-bottom-bar`) exactly as-is: `#top`, `#about`, `/book`, `get in touch`. No logo, no content change.
- **Nav dropdown changes (the one allowed top change):**
  - Rename the `/projects` menu to **`/previous`**.
  - Under it, **delete the entire "AI TOOLS" group** (Expert Panel, Brief Diagnostician, Effectiveness Coach, AI Writer, Brand System, Chief of Staff).
  - **Keep only the four case studies:** Millionaire Raffle, Marketer of the Year, 48, Run with Foxes (book 1).
- **Substack section needs:** Paul's Substack URL is `https://runwithfoxes.substack.com/`; build pulls the feed and filters to a curated list (Paul picks which posts surface). Card crop: open question (tidy uniform crop vs never-crop full image).

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

## Homepage structure (top to bottom) - UPDATED for the accordion port (2026-06-04)

The whole page is wrapped in `.hp-root` (sets `--sans -> mono` so the homepage is single-font; does not affect other pages). New section CSS uses the `hpx-` prefix (appended to globals.css, ~line 4717+). The reused L2 tool panels keep their original `cl-` markup/styles verbatim.

1. **Nav** (`hp-nav`, guarded) - logo, **`/tools`** dropdown (7 module anchors), **`/previous`** dropdown (4 case studies only; AI TOOLS group deleted), /book, /contact. Same `/tools`+`/previous` change applied to `BookLanding.tsx`.
2. **Video hero** (`hp-hero-wrapper`, guarded byte-for-byte) - Tarantino trunk video (landscape + portrait) + posters.
3. **Hero text** (`hp-hero-text` + `.hpx-hero-desc`) - h1 "Build an `<span class=hpx-hl>`unfair advantage`</span>` in marketing" (mono, weight 300, clamp max **50px** so it holds one line like the old Space Grotesk version), full-width descriptor.
4. **Bio + contact strip** (`hpx-about`) - magazine wrap: `hpx-bio-photo` floats left, copy wraps then runs full width, `/Paul Dervan` in blue. Then `hpx-metastrip` contact-CTA strip (`\build it for you` / `\work alongside you` / `\train your team`, 14px blue, sequential green `hpx-fdot` status dots, 3s loop). No newsletter link here (moved to carousel). Section carries `id="about"`.
5. **Substack carousel** (`hpx-writing`) - LIVE feed via `src/lib/substack.ts` (`getSubstackPosts`, ISR `revalidate:3600`), server-fetched in `src/app/page.tsx` (now async) and passed as `posts` prop. Plain `<img object-fit:cover>` 16/10 uniform crop. Manual arrows + dots, no auto-advance. 3-up desktop / 1-up mobile. `CURATED_SLUGS` allowlist (empty = latest). `View newsletter ->` link.
6. **Modules intro** (`hpx-intro`) - "Where can `<span hpx-hl>`AI`</span>` be built into marketing?" + intro paragraph.
7. **Nested accordion** (`hpx-mods`) - 7 `hpx-mitem` rows (id = nav anchor: mod-effectiveness, mod-segmentation, mod-brand-strategy, mod-advertising, mod-studio, mod-business-development, mod-research). Each: L0 row (icon + name + grey descriptor + "N examples") -> L1 (`hpx-mintro` real module intro + Examples label) -> L2 `hpx-titem` tool rows whose `hpx-tdetail` holds the ORIGINAL `cl-acc-detail` panel verbatim. Multi-open (Set state, `expanded`/`toggle`/`isOpen`). No module foxes (decision: out). Counts: effectiveness 4, segmentation 4, brand strategy 6, advertising 4, studio 3, business development 1, research 4.
8. **Testimonials** (`hpx-quotes`) - ONE slim rotating band (manual arrows + dots, no auto-advance, fixed 116px body height). 4 quotes: Peter Field, Paul D'Arcy, Damian Devaney, Jonnie Cahill. (Replaced the 4 inline `cl-testimonial-bar` blocks.)
9. **Book block** (`hpx-bookblock`) - mirrors `/book` hero: "The `<span>`Fox`</span>` Advantage" (Fox blue), pitch line, `\ 54 chapters \ 4 parts \ get_the_book ->` (-> /book), fox-book.png right.
10. **Bottom bar** (`hp-bottom-bar`, guarded) - #top, #about, /book, get in touch. Its IntersectionObserver now watches the single consolidated `cl-modules-wrap`.

NOTE: the legacy `cl-mod-section` / `cl-testimonial-bar` / `cl-book-cta` / `EngagementCTAs` markup is no longer rendered (the 7 stacked module sections were replaced by the accordion). Their `cl-` CSS still exists in globals.css but the L2 panel `cl-` styles are the only ones still used.

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
- Hero desc: "We turn repeated marketing work into practical AI systems: brand strategists, ad builders, brand guardians, campaign managers, performance analysts, content engines and reporting systems."
- Modules intro: "Below are the places we most often build AI into marketing work. A marketing team of two or three, with the right systems, can do work that used to need a department."
- Studio intro: "We've spent twenty years running internal studios. We bring AI into them to do three things: improve the quality of the work, get it out faster, and show the ROI."
- Research intro: "We love research, and have helped teams with a range of solutions such as message testing, company intelligence, review analysis, pricing monitors, and agents that call and interview people on their shopping behaviour."

## Isa chatbot behaviour
- Auto-opens after 5 seconds on first page load
- Welcome message shows Fox Advantage book cover thumbnail + "Hi, I'm Isa. The first two sections of Paul's new book are free to download. The rest will be here soon. Or ask me anything about what we do."
- "free to download" links to `/book#signup` (email gate + PDF download)
- Once dismissed (X button), stays closed for the rest of the visit (sessionStorage)
- Reopens on next visit (new browser session)
- Welcome message rendered as custom JSX (not through markdown renderer) to support the book cover image
- Files: `src/components/chat/ChatWidget.tsx`, `src/components/chat/ChatWidgetLoader.tsx`

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
- 2026-06-03/04 (night): Homepage "list problem" exploration. Ruled out floor-plan/department-render/revolving-hero; confirmed and tightened the accordion direction (see "Homepage direction (2026-06-04)" above). Keeper mock added to wireframes/.
- 2026-06-04: **Ported the accordion homepage to production.** Built off `wireframes/PORT-BRIEF.md` (two-terminal flow: this terminal ported, a design terminal answered in `wireframes/PORT-QA.md`). New `src/lib/substack.ts` (live RSS feed, ISR), `page.tsx` async, `HomePage.tsx` rebuilt (panels reused verbatim), `globals.css` `hpx-` block, `BookLanding.tsx` nav. Built on branch `homepage-accordion-port`, Vercel preview, Paul reviewed. Paul tweaks: headline trimmed to one line (mono is wider than the old Space Grotesk so it was wrapping), contact-CTA strip 14px + blue, carousel dates `MAY 28 · PAUL DERVAN`. Resolved questions: foxes OUT of the accordion, tool panels multi-open. Fast-forward merged to main + live. Session: `~/paul-hub/clients/rwf/sessions/website-2026-06-04-homepage-accordion-port.json`.
