# Run with Foxes Website

## What this is
The live homepage for runwithfoxes.com. Next.js site deployed on Vercel. The commercial layer was built on 2026-05-29/30, replacing the old module-based layout with an accordion-based system.

## Client page asset feedback (2026-06-29)
Client pages (`/clients/{slug}`) now let the client approve / flag individual ASSETS and leave comments, with a per-asset reply thread. The deliverables tracker rolls up the approvals read-only. No email, no inbox: the page is the channel.

- **Storage:** one JSON blob per client in Upstash Redis at key `feedback:{slug}` (store: `src/lib/client-feedback-store.ts`, mirrors `conversation-store.ts`; no TTL by design - feedback is a durable record). Shape: `{ slug, assets: { [src]: { decision, thread:[{who,when,text}], updatedAt } } }`. `assetId` is the media `src` filename.
- **Client writes:** auth-guarded `"use server"` actions in `src/app/clients/_components/feedback-actions.ts` (guarded by the existing `{slug}_auth` cookie). Saves live on click; "Not yet" auto-opens the comment box.
- **UI:** `src/app/clients/_components/AssetFeedback.tsx` renders under each media asset; `ClientWorkspace.tsx` gates it on a per-section `feedback: true` flag AND the page passing a `feedback` prop. Strictly opt-in - pages/sections without both render exactly as before. Tracker rollup lives in the existing Status cell (no new column); in-QA sections (`qa: "pending"`) render the control HELD/disabled.
- **Pilot:** SoftCo only, on the "Chart Ad set" section (`src/app/clients/softco/page.tsx` fetches feedback; `data.ts` sets `feedback: true`).

### How Claude reads feedback + posts Paul's replies (admin API)
Route `src/app/api/clients/[slug]/feedback/route.ts`, guarded by the `CLIENT_FEEDBACK_ADMIN_TOKEN` env var (must be set in `.env.local` locally AND in Vercel project env for prod). Token compare is timing-safe; header is `x-admin-token`.
- **Read all feedback for a client** (answer "what's {client}'s feedback?"):
  `curl -s -H "x-admin-token: $CLIENT_FEEDBACK_ADMIN_TOKEN" https://runwithfoxes.com/api/clients/{slug}/feedback`
- **Post Paul's reply** to an asset (appears in the thread stamped "Paul"):
  `curl -s -X POST -H "x-admin-token: $CLIENT_FEEDBACK_ADMIN_TOKEN" -H "content-type: application/json" -d '{"assetId":"<src filename>","action":"reply","text":"..."}' https://runwithfoxes.com/api/clients/{slug}/feedback`
- **Reset an asset's decision** (clears approve/reject, keeps the thread - use after a fix is re-uploaded under the same filename): same POST with `{"assetId":"...","action":"reset"}`. A fix uploaded under a NEW filename resets naturally.

> **DEPLOY GUARDRAIL (branch check): runwithfoxes.com deploys from `main`.** A terminal can open while git is parked on an unfinished feature branch (e.g. `bench-page`, the half-built `/bench` showcase). Committing there strands the change off `main` and it never goes live. BEFORE committing any change meant to ship, run `git branch --show-current` and confirm it's `main`. If it isn't and the change is meant to go live, cherry-pick just that commit onto `main` and push - do NOT merge the whole feature branch (it carries unfinished work). Pushing a feature branch only gives a Vercel preview URL, not production.

## ACTIVE WORK - PRODUCTS STOREFRONT (LIVE since early Jul 2026)

**STATUS CORRECTION (2026-07-04, late):** the storefront and product pages ARE LIVE - the homepage (`src/components/HomePage.tsx`) carries the storefront, and the product pages ship as static files under `public/products/` (e.g. `/products/module-ad-maker.html`) with their own copy of `assets/dayone/`. **Wireframes and `public/products/` are now TWO copies of the same pages - an asset or page fix must land in BOTH** (that's how the live Ad Resizer demo kept the old bar-chart 1080 source ad after the wireframe was fixed; corrected in `9575368` with the dayone donut 1080 from `fox-ads/approved/dayone/`). The paragraphs below predate the port and are kept for the decision trail.

- **Products source of truth:** `docs/product-lineup-candidates-2026-06-25.md` - the lineup, the seven jobs of email, and the LOCKED rules.
- **Naming rule (LOCKED):** Title Case, no "AI", drop leading "The" (e.g. Ad Resizer, Brand Guardian, Outbound Agent, Lifecycle Agent).
- **The storefront wireframes:**
  - `wireframes/homepage-storefront-branded.html` - the full branded homepage with the storefront. **THE one to work on**; the product pages link back here.
  - `wireframes/homepage-blueprint-storefront.html` - the storefront component (keep in sync; same `MODS` shape).
  - Product names + categories live in the `MODS` array, which feeds BOTH the cards and the nav dropdown. A product can be in several filters via `cats:['email','outreach']`. Edit the array, never the rendered HTML.
  - Filter bar: All / Strategy / Advertising / Email / Research / Outreach.
- **Product pages (built, the format reference):** `wireframes/module-ad-maker.html` (Ad Resizer) and `wireframes/module-brand-guardian.html` (Brand Guardian). The Ad Resizer card on the storefront shows a looping mini version of the resize demo.
- **Build new product pages with `/product-page`; workflow diagrams with `/blueprint`.** Both carry LOCKED rules: product pages **sell the thinking, not the mechanics** (the marketer in the machine); workflow flows **must always animate** (reference: the Eaton Square "Ben flow", `public/clients/eaton-square/media/icp-outreach-flow.html`).
- **What's next:** product pages for the unbuilt products (Lifecycle Agent, Copywriter, etc.); decide whether to trim the grid; then PORT the storefront component ONLY into `src/components/HomePage.tsx` (never the hero/nav) on Paul's go.
- Full decision trail + per-session detail: `~/paul-hub/clients/rwf/CONTEXT.md` (27 Jun entries).

## /distinctive page (2026-07-10) - LIVE
Public article-style page at runwithfoxes.com/distinctive: "Distinctive brands have an incredible opportunity with AI". Static HTML at `public/distinctive/index.html` (assets in `public/distinctive/assets/`), served via a `/distinctive` rewrite in next.config.ts (same pattern as /broad-lake). **GOTCHA for every rewrite-served page: asset URLs must be ABSOLUTE (`/distinctive/assets/...`). The page URL has no trailing slash, so relative `assets/...` resolves to `/assets/` and 404s in the browser while direct curl checks of the full path still pass. Verify a deploy by RENDERING the live URL and checking the images paint, not by curling asset paths (b04253f shipped broken this way; fixed ff10cc6).** Content = the Substack DBA essay near-verbatim (National Lottery waterslides/William/Village/Dream Inspector, voice section with Oatly + Isa, grumpy fox engine), first person, byline, CTAs = /contact + chat-with-Isa (homepage). Videos reference the existing `/video/` files; three lottery films are click-to-play YouTube embeds. Built for Amy Mitchell (PT78) to send to a challenger-brand client, but generic. Page rules learned this session are baked into the /branded-page skill: hero headline one line (two max), clamp(32px,3.4vw,48px), hero close under the nav. Shipped b58f06c -> main.

## /essays - Paul's writing, on his own domain first (14 live as of 2 Aug 2026)

**Publishing is a drop-in-a-file job.** Put a markdown file in `src/content/essays/` with
frontmatter (`title`, `date`, `dek`, optional `substack`) and it appears. The index, the
reader and the sitemap all read `src/lib/essays.ts`, so they cannot drift apart. Images live
in `public/essays/{slug}/` numbered in document order (`01.png`, `02.jpeg`, ...). Deliberately
NOT built like `chapters.ts`, which hardcodes its order in a TS array. Do not add one here.

### ⭐ `.essay-embed` - the ONE media primitive. Do not hand-roll another.
`class="essay-embed"` on a bare `<video>` or `<iframe>` is the whole contract: full column
width, no border, no rounded corners. `remark` runs with `sanitize: false`, so the tag passes
through from markdown untouched. First used by `distinctive-brand-assets-in-an-ai-world`.

- ⚠️ **The 16/9 ratio is on `iframe.essay-embed` ONLY, and that split is load-bearing.** An
  iframe has no intrinsic size and collapses without a ratio. A `<video>` HAS one, and
  hard-coding 16/9 over it is a real bug: `animated-6040-activate.mp4` is **1080x1080**, and
  the black bars ran down both sides of a cream ad on a cream page. Let the file say how tall
  it is.
- ⚠️ **Every `<video class="essay-embed">` needs a `poster`.** Chrome paints nothing at all
  until the first frame decodes, so without one it is a blank rectangle mid-essay for as long
  as the network takes. Generate with `ffmpeg -ss <t> -i in.mp4 -frames:v 1 -q:v 3 out.jpg`.

### Importing from Substack - the three traps, all of which have bitten
The ten essays of 24 Jul (`16197cd`) and the four of 2 Aug (`130945f`) both came from the
Substack API: `/api/v1/archive?sort=new&limit=50` lists every post, `/api/v1/posts/{slug}`
returns full `body_html`. There is **no Substack export on Paul's laptop**; do not go looking.

1. ⭐ **FETCH THE `<img src>` EXACTLY AS GIVEN.** It is already the `w_1456` CDN URL, which is
   what the 680px reader column needs at 2x. Unwrapping to the original URL encoded inside it
   pulls the 2500px source: four essays came down at **18MB instead of 3.5MB**.
2. ⭐ **STRIP SUBSTACK'S FURNITURE.** Subscribe/share widgets arrive as bare markdown links
   (seven across four essays). None of the live essays carry them; the foot of a piece already
   has the course note and the Substack credit.
3. ⭐ **Substack puts the leading space INSIDE `<em>`** (`Building<em> DBAs</em>`). Stripping
   it welds words together (`Building*Distinctive*`). Move the space outside the marker.

Substack-hosted videos (`native-video-embed`, identified only by a `mediaUploadId`) cannot be
fetched: the API answers *"Cannot verify mediaUpload belongs to pub"*. Both in the DBA essay
turned out to be files **already on this site**, which `/distinctive` confirms since it was
built from the same essay. Identify them by the sentence each one follows.

### ⚠️ Known gap, and it is not in this repo
`src/app/essays/[slug]/page.tsx` canonicalises to runwithfoxes.com on the stated basis that
the Substack copy points back here. **It does not.** All 14 posts self-canonicalise to
substack.com, so Substack is telling Google it holds the original of every essay. Fixing it is
a setting on Substack, not a code change. Flagged to Paul 2 Aug 2026.

**Overlap with existing pages was measured, not assumed** (2 Aug): `18 things worth knowing
about GEO` shares **24%** of its sentences with `/answer-engine-optimization`, and the DBA
essay shares **18%** with `/distinctive`. That is related writing, not duplicate pages, so all
of them stay. An older commit message called it a straight duplicate; that note was stale.

## Current state (2026-06-04) - accordion port LIVE
Live and deployed. The homepage was ported from `wireframes/wireframe-accordion-homepage.html` to a single nested accordion and shipped to production (merge `ef84f97..69bae26` -> main, Vercel auto-deploy). Structure now: hero -> bio (magazine wrap) + contact-CTA strip (sequential green dots) -> LIVE Substack carousel -> 7-module nested accordion (L0 row -> L1 intro -> L2 reused rich panels) -> rotating testimonial band -> book block. Single font (JetBrains Mono) across the homepage via `--sans -> mono` on `.hp-root`. Nav is now `/tools` + `/previous`. All copy approved, zero 404s. See "Homepage structure" below (updated) and the session summary `~/paul-hub/clients/rwf/sessions/website-2026-06-04-homepage-accordion-port.json`. Rollback if ever needed: `git revert 69bae26` (or revert the merge) + push.

## "Summarise this page" + llms.txt (2026-06-23) - LIVE
A `\summarise this page` link (class `hpx-summary-link`, same `\` family as the contact CTAs) sits in the homepage bio, right after the last bio paragraph and before the `hpx-metastrip` "Contact us to" strip. It opens a **static, pre-approved, branded two-page PDF** in a new tab: `public/downloads/runwithfoxes-summary.pdf`. The PDF is NOT generated live (no serverless, no API, no per-click cost) - it is rendered once from `wireframes/summary-pdf-source.html` and committed. **To regenerate after editing the source:** `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=8000 --print-to-pdf="public/downloads/runwithfoxes-summary.pdf" "file://$(pwd)/wireframes/summary-pdf-source.html"`. Content = headline + the idea, Paul's bio + credibility ladder, a Peter Field quote, the quality-and-speed philosophy, the seven areas with their real substance, the free book, and the contact ask. Date is a low-maintenance "Updated June 2026" (not auto-stamped). Decisions taken: dropped "with AI" from the label (people just want a summary), dropped the ChatGPT/Claude/Perplexity deep-links (AI-friendliness lives in llms.txt instead), no separate `/summary` HTML page (a browser-opened PDF is enough - viewers show their own download/print controls). Also added `public/llms.txt` (served at `/llms.txt`) framing RWF for AI engines = the narrative-control / GEO layer. Shipped on branch `summarise-page-pdf`, ff-merged to main (`fdf2885`).

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
- **DEPLOY GUARDRAIL (Isa chatbot):** do NOT change the Isa chatbot or its rules WITHOUT Paul's explicit say-so. Default behaviour: auto-opens after 5 seconds on first load (DESKTOP ONLY since 2026-07-08, approved by Paul: no auto-open at <=768px where the panel is full-screen - the bubble stays and the visitor taps it), shows the welcome message (as of 2026-07-21 a text-only course welcome with a "Register today" link to `/course`; previously the book-cover thumbnail + "free to download" -> `/book#signup`), stays closed for the rest of the visit once dismissed (sessionStorage), reopens on the next visit. **Contact-page exception (added 2026-06-04, approved by Paul):** on `/contact` ONLY, Isa opens after 2 seconds with a booking-led welcome (cal.com strategy-chat link) instead of the book message, and uses a separate `isa-dismissed-contact` key so a dismissal elsewhere doesn't suppress the contact open. Same personality/knowledge/backend, just the opening message + timing branch on `pathname === "/contact"`. Files: `src/components/chat/ChatWidget.tsx`, `src/components/chat/ChatWidgetLoader.tsx`. Leave the rest as-is (see the "Isa chatbot behaviour" section below).
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
  Both broken again on 6 Sep 2026 by a Research Agent draft that opened "Most research in a marketing team either doesn't get done, or takes a large part of somebody's time... it keeps slipping". Paul: "you're being too negative when you talk about things slipping, and I never say most anything. I don't mind you comparing it to what happens with it, but I don't want this to sound anyway judgmental or look at those, aren't we amazing?" So a comparison to how the work is done today is allowed, a verdict on the reader's team is not, and neither is a line that admires us.
- No salesy closers ("that's where it gets interesting", "that's the bit")
- No salesy openers either, and nothing that talks down to the reader. Paul, 6 Sep 2026, on "the reason people want one is simple": "That just sounds patronizing. Less salesy talk and more pragmatic." And on a first draft that read as a pitch: "I want it written in a plain way so people understand, okay, I understand what this is, and I also feel like there's no real hype. Seems very practical."
- Any written piece shown on the site (a post, an email, a note) reads like a person wrote it: paragraphs of different lengths, one thought carried through, never a run of one-line soundbites. Paul, 5 Sep 2026, on a ghostwriter post of five single lines: "It doesn't feel like the way writing is done. It's too AI. It needs to feel more natural, less one-line soundbite-ish."
- No frivolous benefit lines. State the outcome plainly. Paul, 5 Sep 2026, on "You read one note with your coffee. The research is done, checked and sourced, and it is already with the next agent": "Don't say things like this because it makes the sense frivolous." The fix was "Every company on your list has a researched card in the CRM before the working day starts, with a source on every fact."
- No "replace" language - frame as opportunity, not replacement
- Quality and speed are the two themes running through everything
- "We" not "you" - peer-to-peer, optimistic
- Say that WE BUILD these. Paul, 6 Sep 2026, on the agent pages: "some of my writing is a bit passive and needs to be more clear that we build these for clients." His own fix: "A team of research agents for marketing and sales, working every day, and you are not the bottleneck" became "We build research agents for marketing and sales, working every day, so you're not the bottleneck." An agent is never the only subject on a page; "it is possible to have", "is done", "once it is built" all read as if nobody did the work.
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
- **Opening reply (2026-08-05, approved by Paul):** her FIRST reply in any conversation introduces her, answers the question, and brings Paul in, whatever was asked. She does not wait to be asked about him. Why: attitude was accidentally gated on Paul being the subject. Every tone example in `chat-system-prompt.ts` had Paul as its target, so with him out of the conversation the model had no worked example of what attitude looks like and fell back to bland. Measured on the 42 bare-"hello" replies the health-check cron had logged, only 10 (24%) opened with a Paul tease. Also note she never introduced herself and never had: no such rule has ever existed in the prompt's git history, and the widget welcome (a static string) does not say her name either. Two guardrails came in with it: the joke lands on Paul and NEVER on the visitor or what they asked, and "one dry aside per response, max" was replaced (it read as a cap on personality when what needs capping is comedy for its own sake). Paul's steer, verbatim: "isa can never be rude or make fun of visitors... isa is good when she is playful and endearing and mocking me."
- Auto-opens after 5 seconds on first page load (2 seconds on `/contact`) - DESKTOP ONLY (2026-07-08): no auto-open at <=768px viewports, where the panel is full-screen; on mobile the bubble stays and only opens on tap
- Welcome message (updated 2026-07-21 for the course launch, was the book message): text-only, "Hi, we're launching a new free online training course: AI Fluency for Ambitious Marketers. Register today. Did I mention it is free? Paul asked me to say it was brilliant..."
- "Register today" links to `/course`. (The old book-cover thumbnail + "free to download" -> `/book#signup` welcome was replaced; the book is still a real free offer, just no longer Isa's opening line.)
- Isa's system prompt (`src/lib/chat-system-prompt.ts`) now carries the course as first-class knowledge (six modules, one a fortnight, 21 Sep to 30 Nov 2026, free, links `/course`), so she answers course questions coherently instead of steering to the book. Do NOT teach her a per-module format promise (article/how-to/video/skill) - canon (`src/app/course/courseCopy.ts`) has a ⛔ on it.
- Once dismissed (X button), stays closed for the rest of the visit (sessionStorage)
- Reopens on next visit (new browser session)
- Welcome message rendered as custom JSX (not through markdown renderer); as of 2026-07-21 it is text-only (the course-card image was tried then removed on Paul's call), so the JSX now holds just the paragraph
- **Contact-page variant (2026-06-04):** on `/contact` only, the opening message is booking-led ("You found the contact page... Paul does 30-minute strategy chats: [book one here](https://cal.com/paul-dervan-mjfd50)...") rendered via the normal markdown path (id `welcome-contact`, no book cover). Opens after 2s. The widget lives in the root layout so it doesn't remount on client-side nav; the welcome reacts to `pathname` (swaps only while no user message has been sent, so an active chat is never wiped). Contact uses its own `isa-dismissed-contact` sessionStorage key, so closing Isa on another page doesn't stop her opening on `/contact`; closing her on `/contact` keeps her closed there. After the first message she is standard Isa (scope: opening line only, not a full behaviour override).
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

## /softco (2026-07-23) - BRAND CONSISTENCY DEMONSTRATION, unlisted

Public route `runwithfoxes.com/softco`. An experiment Paul asked for: one page built
entirely out of SoftCo's own brand system, to show that a brand can be held exactly on
the web and not just in ads. **Unlisted by design** - `robots: {index:false, follow:false}`,
absent from `sitemap.ts`, and linked from nowhere on the site. It is NOT the gated client
workspace (that is `/clients/softco`).

- **Files:** `src/app/softco/page.tsx` + `src/app/softco/softco.css` (a plain global CSS
  import, deliberately NOT appended to `globals.css` - that file already has a known
  collision point at its end). Every class is `sft-` prefixed and scoped under `.sft-root`.
- **Isa is suppressed here** via `NO_CHAT_ROUTES` in `ChatWidgetLoader.tsx`. She arrives in
  Run with Foxes' chrome and colours, which breaks the demonstration.
- **Fonts:** Erode (their headline face, self-hosted OTF at `public/fonts/erode/`, taken
  from their own brand pack, free for commercial use) and Plus Jakarta Sans via
  `next/font/google`. Erode was never on this site before.
- **Assets in `public/softco/`:** `hero-animation.mp4` (the 23 Jul animated rebuild of
  SoftCo's still homepage hero, source `~/paul-hub/clients/softco/builds/softco_hero_v1/`),
  its poster, `softco-p2p-flow.jpg` (a real photograph from their brand library,
  `08_Images`), and both logo lockups.
- ⭐ **Every value on the page is sourced and shown.** Colours and type come from
  `clients/softco/memory/softco-brand-spec-for-ads.md`, cross-checked against computed
  styles read off softco.com on 23 Jul 2026. Section copy, the Primark quote and the three
  figures are verbatim from their live homepage. The `sft-src` provenance lines say so.
- ⭐ **The one deliberate departure, argued on the page:** their signed-off ad system puts
  dark `#060d2e` on the orange button; their live site ships white. White on `#f7931e`
  measures 2.3:1, under the 3:1 floor for large text; dark measures 8.3:1. The page uses
  dark and shows both swatches. Do not "fix" this to match the website without reading
  that section first.
- **A top frame bar in Run with Foxes' own mono type** sits above the SoftCo hero so the
  page can never be mistaken for softco.com. Keep it.
