# Product lineup - thin-slice candidates

> 25 June 2026. Every item on the live site (~30) and the ops board (~153) run against the
> product test in `product-packaging-research-2026-06-25.md`. These are the slices that pass
> cleanly: one job, a hard edge, a fixed output, and built (or being built).
> Names follow the rubric - role-noun card name, job tagline, outcome one-liner.
> The honest rail "we build it for you and hand it over" sits under every one.

## The shortlist (14)

| # | Product | Tagline | The job → output | Proven by |
|---|---------|---------|------------------|-----------|
| 1 | **AI Ad Resizer** | One ad in, every size out | One approved ad → the full IAB set, each shape re-laid-out not squashed | `/grumpyfox-chart-resizer` `/sabre-banner-resizer` `/banner-machine` |
| 2 | **Ad Maker** | Brief to finished ads, quality first | A line of data or a headline → static, animated, video and brand ads, on-brand | `/fox-html-ads` `/fox-static` `/fox-brand` `/fox-video` `/dray` |
| 3 | **AI Copywriter** (Brand Voice) | Your brand's voice, trained to write | Brand voice + brief → on-brand copy for any channel (ads, email, social, web, sales, direct mail, PR) | `/eaton-direct-mail` `/linkedin-post` voice skills |
| 4 | **The Brand Scorecard** | One page everyone watches | Your metrics → a five-level leadership dashboard with on-track / watch / attention | `/brand-scorecard` `/metrics-audit` |
| 5 | **Segmentation AI** | Segments, with the maths actually run | Segment data → empirical proof of which segments are genuinely different | `/segmentation-*` (7) |
| 6 | **Competitor Positioning Map** | Find the white space | Category + competitors → a plotted map and the ownable space | `/competitor-positioning` |
| 7 | **Distinctive Brand Assets Audit** | What makes you recognisable, scored | Your assets → a Fame x Uniqueness matrix and what to invest in / protect / drop | `/dba-audit` `/dba-analysis` |
| 8 | **Brand Guardian** | Nothing ships off-brand | Any asset → checked against your guidelines, DBAs, tone and visual rules, with a pass/fail and the fixes | `/brand-guardian` (decks) · `/ad-qa` (ads) - **cross-format version to build** |
| 9 | **The AI Research Interviewer** (Isa) | Hundreds of phone interviews a week | A questionnaire → structured calls at scale with longitudinal memory | `/isa-call` |
| 10 | **Company Intelligence** | The dossier before you walk in | A company name → leadership, team shape, open roles, change signals, news | `/clay-intel` |
| 11 | **Review Intelligence** | What every review is really saying | Trustpilot/Amazon/app store → themes and sentiment across you and rivals | `/insights-setup` `/reddit-research` |
| 12 | **Pricing Monitor** | Know the day a competitor moves | Tracked SKUs → daily competitor price watch with undercut alerts | *(no dedicated skill yet - flag)* |
| 13 | **The Outreach Engine** (BDR) | A business-development desk that runs itself | Your pipeline → list, research, outreach, booked calls; you approve who + the yes | `/jo` `/clay-enrich` `/network` |
| 14 | **Page Conversion Audit** | Why the page isn't converting | A URL → a 10-section conversion audit with a fix for each gap | `/page-conversion` |

Coverage: advertising (1, 2) · writing (3) · brand strategy (4 - 8) · research/intelligence (9 - 12) · go-to-market (13) · web (14).

## The bundle: Campaign Manager

These 14 are single products - one job, hand it over, you run it. The **Campaign Manager** sits a level above them: the whole marketing operation as one always-on engine, run by an AI project manager (**Klara**), with several of the products above bundled in as its modules. This is the Every-"Studio" / Designjoy-subscription tier - a different buyer moment (ongoing operation, "work alongside you"), not a one-off tool.

- **What it is:** Klara runs the plan; each module is a thing she does end to end, with you approving the gates. Nothing sends or spends without your yes.
- **Its 9 modules (from the ops board):** Marketing calendar · Outreach email · LinkedIn outreach · Social media · Advertising · Creative Director · Website · Newsletter · Intake assistant.
- **How it relates to the 14:** the bundle *contains* the standalone products (Outreach email/LinkedIn = the Outreach Engine; Advertising/Creative = Ad Maker + Ad Resizer; Website = the page tools; etc.). A client can buy one product, or buy the operation that runs many of them on a calendar.
- **Storefront placement:** featured *above* the product grid as the "everything, run for you" tier - the buyer reads the cards as à la carte, the Campaign Manager as the full kitchen. Pilot = Run with Foxes itself.
- **Source of truth:** `~/.claude/skills/campaign-manager/campaign-manager-spec.md` + the live demo at `~/projects/campaign-manager-demo/`.

## Decisions locked (25 Jun)

- **AI Writer = one card.** All specialist channel writers - direct mail, landing page, email, blog, social, ad, sales, PR, case study, website - live *inside* the one **AI Copywriter** card. In reality Paul builds them per channel; that gets explained to clients later. (The "what is a product" rule in miniature: fold what shares a job.)
- **Mental Availability Tracker dropped.** Honest measurement needs long-term quant research we can't claim as a buyable product yet. Stays a strategy/research service, not a storefront card. (CEP skills still exist for delivery.)
- **Brand Guardian in, and the next build.** Paul wants to build a real AI Brand Guardian - see the build note below.

## Worked one-liners (the four most likely to lead the storefront)

**AI Ad Resizer** - Hand us one approved ad and get the full IAB set back, each shape re-laid-out for its placement rather than squashed to fit. Built around your brand, handed over to run yourselves.

**AI Copywriter** - A writer that knows how your brand sounds and what it never says, ready for ads, email, social, web and sales copy. Not a generic AI you re-brief every session.

**Brand Guardian** - Point it at any asset - a deck, an ad, a page, a line of copy - and it checks it against your guidelines, distinctive assets, tone and visual rules, then tells you what's off and how to fix it before it ships.

**The AI Research Interviewer** - An AI researcher that calls real customers, runs a structured interview, and remembers past conversations - longitudinal insight no human panel reaches at that scale.

## Brand Guardian - build note

What already exists on brand guardianship (raw material):
- **`/brand-guardian`** - audits + rebuilds a Sabre-branded PowerPoint against brand rules (format-specific to decks).
- **`/ad-qa`** - readability QA gate for HTML ads: contrast, font size, edge spacing, copy density; auto-fails an asset that breaks a threshold. Config-driven, brand-agnostic.
- **Brand guidelines** - the "never" list (rounded corners, em dashes, gradients, Title Case, stock photos, drop shadows) + colour/type/logo rules.
- **DBA audit** - the distinctive assets and how they should appear.
- **`/voice`** - writing-voice check against a spec.

What's missing = the **cross-format guardian**: one product that takes ANY asset (deck, ad, page, copy, image) and checks it against a brand's full spec (guidelines + DBAs + tone + the never-list), returning a pass/fail with specific fixes. That's the build.

## Bench (strong runners-up - swap in as needed)

- **The 95:5 Demand Model** - `/95%` - how much of the category is in-market now and what you can capture. Distinctive, but conceptual to sell cold.
- **Landing Page Builder** - `/branded-page` - document → branded scrolling page. Overlaps the website-build service.
- **Messaging Framework** - proposition, pillars, proof. A clear output; more workshop than tool.
- **Marketing Calendar** - `/backplan` - every activity on one page, year to single event. Live tool.
- **Brand on a Page** - the brand house one-pager. Clean output; a strategy deliverable.
- **Brief Coach / Influence Diagnosis** - `/influence-model` - a brief → which of 7 influence models it's actually using. Very thin.
- **Network Map** - `/network` - who you already know in each segment, tier-scored.

## Open decisions for Paul

1. **Which 6 - 8 make the storefront** vs sit on deeper pages. (Storefront wants a tight, scannable set.)
2. **Pricing Monitor (#12)** has no skill yet - keep as a product (build on demand) or move to bench?
3. **Buyer-name vs our wording** - e.g. "AI Research Interviewer" vs "Isa". Card uses the role; the name (Isa) lives in the description.
