# runwithfoxes.com - Website Context

## Current state (2026-05-29)

The live site is a Next.js app deployed via Vercel auto-deploy on push to main. Source is in this repo (`fox-advantage-site` / `fox-advantage-site-repo`).

### Live features
- Homepage with video hero (Tarantino trunk shot), Paul bio, 11 module sections, testimonial bars, book CTA
- /book page with 4-part chapter accordion (54 chapters)
- /reflection-coach - Claude Opus-powered coaching tool (built for Bord Bia)
- /experts, /brief-diagnostician, /coach, /ai-writer, /brand, /chief - AI tools
- Case study pages: /millionaire-raffle, /marketer-of-the-year, /48, /run-with-foxes

### Key files
- `src/components/HomePage.tsx` - main homepage component (519 lines)
- `wireframes/wireframe-full.html` - original homepage wireframe (source of truth for current design)
- `wireframes/wireframe-commercial-layer.html` - NEW: commercial layer wireframe (in progress)

---

## Commercial layer project (started 2026-05-28)

### The problem
The site proves capability but does not answer "what can I hire you to do?" There is no commercial layer.

### The solution
Three engagement modes woven into every section of the homepage:
- `\build it for you` - we build it, hand it over, your team runs it
- `\work alongside you` - ongoing, we bring frameworks and AI systems
- `\train your team` - workshops, coaching, more of a one-off

These appear as CTAs under the Paul bio AND at the bottom of every module section. They link to the contact page (or a new page) where fuller descriptions of each mode live.

### Structure change
The homepage modules are being restructured from the current 11 sections (Strategy, Positioning, Messaging, etc.) to use the ops dashboard categories as headings instead. This gives 9 sections (Pricing and Product excluded):

1. **Run metrics audit and build brand scorecard** - Measurement training, Metrics audit, Brand scorecard
2. **Segmentation and targeting** - Strategy diagnosis, 7-stage segmentation audit
3. **Brand strategy** - Positioning (6 items), Mental availability/CEPs (5 items), Messaging, Tone of voice, Journey mapping, DBAs (7 items), Brand on a page, Brand guidelines, Strategy council
4. **Marketing communications** - Media planning (brand/activation split, budget, channels), Brief coach, Influence diagnosis, Creative (direction, animated, video, static, brand ads), Website (build, landing pages, audit), LinkedIn content, Brand guardian, Studio measurement
5. **Physical availability** - Touchpoint mapping, Digital storefront audit, Consumer friction research
6. **Team capabilities** - Team structure diagnosis, Team mapping, AI upskilling, Culture signals, Team interviews
7. **Research and insights** - Insights pipeline, Research database, Reddit scanning, Long-form synthesis, Phone research
8. **Go to market** - Audience definition, ICP identification, Network mapping, Contact enrichment, Engagement parsing
9. **Marketing operations** - Project manager, Back plan, Campaign workspace, Presentation converter, Capacity planning

### Layout pattern per section
Each section follows the same pattern:
1. **Section title** (Space Grotesk, clamp 28-42px, weight 300)
2. **Short paragraph** on the left, **fox placeholder** on the right (split grid)
3. **Accordion rows** below - each row shows `+ Activity name` in sky blue, with a thin border between rows. Clicking expands a detail panel below with visual (left) and copy (right)
4. **Three engagement CTAs** at the bottom: `\build it for you` / `\work alongside you` / `\train your team`

### Design decisions locked
- Hero section stays exactly as-is (video, headline size, function links). Do not touch
- No coloured block headers on accordions. Clean lines, GitHub feel
- `+` indicator on the left of each row (same as /book chapter pattern), text in sky blue
- Thin border lines between accordion rows
- Detail panels use `acc-detail-split` grid: visual left, copy right. No headlines in panels, just body copy at 13px
- Fox placeholders on right side of each section intro (280x280 dashed border for now)
- Engagement CTAs use backslash format: `\build it for you` (backslash tight to first letter, spaces between words)
- Brand scorecard in detail panel matches ops dashboard exactly (grouped by pyramid level with coloured labels)
- Nav dropdown is flat list of modules, no mode grouping labels
- No annotation bars or section-note strips on the page
- No "feeds into" pipeline text in detail panels
- Testimonial bars, book CTA, and close CTA stay as-is

### Modules completed (session 2, 29 May afternoon)
1. **Marketing effectiveness** - copy updated, pyramid SVG flipped (commercial at top), scorecard orange fixed. 3 accordion rows kept (training, audit, scorecard)
2. **Segmentation** - renamed from "Segmentation and targeting". New intro (pseudo-science). Cut to 2 rows: Similarity analysis, Scatter plots. Visuals from ops dashboard
3. **Brand strategy** - new intro. Cut to 6 rows: Competitor positioning map (anonymised from Eaton work), Mental availability (CEP chart), Messaging framework (video), Distinctive brand assets (DBA matrix), Brand on a page (brand house), Brand guidelines (colour/type/logo/nevers). All visuals from ops dashboard
4. **Advertising** - renamed from "Marketing communications". New intro. 4 rows: Video, Brand ads, Animated ads, Static ads. Full-width media panels, no inline text

### Global changes made
- Hero replaced with placeholder (live site hero must not be touched, ever)
- "Examples" label added before accordion rows in modules 1-4
- "Contact us to" added inline before the three engagement CTAs in every module
- Font smoothing (antialiased) added to match live site rendering

### What still needs doing
1. **Modules 5-9** - Physical availability, Team capabilities, Research and insights, Go to market, Marketing operations all need walk-through with Paul (currently have placeholder rows from ops dashboard)
2. **Fox images** - each section needs a fox assigned (currently all placeholders)
3. **Ad assets** - videos and images for Advertising panels need copying to public/ when porting to Next.js
4. **Contact page** - the three engagement CTAs need a destination page
5. **Testimonial placement** - need to decide where to scatter them between sections
6. **Nav update** - the #unfair_advantage dropdown needs to reflect the new section names
7. **Port to Next.js** - keep hero untouched, add commercial layer below it

### Source of truth for content
The ops dashboard at `~/projects/brand-measurement-dashboard/operations.html` is the authoritative source for what goes into each section. Every activity name, description, and detail panel should match what's there.

### Events
Removed from the website. Paul confirmed it's an anomaly.

### Pricing and Product
Excluded. Paul does not offer these as services.
