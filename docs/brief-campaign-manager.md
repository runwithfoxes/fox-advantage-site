# Builder brief - Campaign Manager product page (the BUNDLE)

> 28 Jun 2026. You are a BUILDER terminal. Build ONE page: the **Campaign Manager** - the featured BUNDLE,
> the whole marketing operation run as one, sitting above the a-la-carte products. A coordinator terminal is
> live in parallel and answers questions inline. This product is REAL - we run it on RWF itself - but the real
> data is CONFIDENTIAL. Read the data rule below twice. When unsure, ASK.

## How this works (read first)
1. Run `/website` to load repo context.
2. Read the **reference build**: `cd wireframes && python3 -m http.server 8899`, open
   `localhost:8899/module-ghostwriter.html`. Match its nav, matched Isa, three tabs, animated flow, quality bar.
3. Read `docs/product-ghostwriter.md` + the `/product-page` skill (`~/.claude/skills/product-page/SKILL.md`).
4. **Ask questions in `docs/product-page-build-QA.md` under `## Terminal H - Campaign Manager`** (`Q:` + timestamp),
   keep working, re-read for the coordinator's `A:`. ASK on anything that risks fabrication or exposing real data.
5. When done + screenshot-verified, write "DONE + slug" in the QA file. **Coordinator wires the storefront card.**

## The product (locked with Paul, 28 Jun - do not relitigate)
**Campaign Manager.** The whole marketing operation, run as one always-on system. It plans the campaigns, makes
the work, runs every channel, and watches the budget; you see it all in one place and approve what goes out;
**nothing sends or spends without your yes.** It sits ABOVE the individual products as the "everything, run for
you" tier - the buyer reads the cards as a la carte, the Campaign Manager as the full kitchen.

### NAMING (locked - critical)
- The product and the manager are called **"Campaign Manager"** / "your campaign manager" - **NEVER "Jo"** on the
  page or in Isa. (Jo is our internal name; naming it on the storefront breaks the role-noun naming structure -
  Ad Resizer / Brand Guardian / Outbound Agent / Campaign Manager.) Paul may use "Jo" when selling 1:1; the page
  does not.
- **Do NOT mention "Klara"** anywhere - Klara is a separate Project Manager desk, not part of this product.

## ⚠️ THE DATA RULE (the #1 risk on this page - read twice)
We run the Campaign Manager on RWF ourselves, so the real dashboard is full of **real, confidential** client
names and numbers (a real client name, real revenue, real connection/reply counts, real campaign names, real
spend). **NONE of that goes on the page.** The dashboard/board is the real PRODUCT UI; you **rebuild it with
generic, illustrative content** - made-up campaign names, made-up round numbers, no real client, no real figure.
Same honesty stance as the Brief Coach page ("illustrative, not a real client"). The page proves the *system is
real*, never by showing a real client's confidential operation. If you are unsure whether something is real-and-
confidential vs safe-to-show, ASK. Do NOT copy any number or name off the live demo board.

## The job of THIS page (sell the thinking, not the mechanics)
The buyer's anchor is "an agency retainer" or "a marketing hire". Beat it with the **judgment baked in**:
- **Truth** - the source of truth the operation is built on (positioning, messaging framework, tone, and the
  levels of metrics that matter). Because Truth is loaded, the Campaign Manager can **propose what to do AND do
  it** - it grounds every plan in a real fact or a stated hypothesis, or it asks; it never fabricates a brief.
  THIS is the marketer-in-the-machine: it's not a dashboard, it's a manager that knows your strategy.
- **One operation, one place, your gates.** Not nine tools you wire together yourself - one system that runs them
  on a calendar, with you approving the gates. "Nothing sends or spends without your yes" is part of the sell.

## What's in the bundle (the 9 modules - source: `~/.claude/skills/campaign-manager/campaign-manager-spec.md`)
Marketing calendar (the spine) · Outreach email · LinkedIn outreach · Social media · Advertising · Creative
Director · Website · Newsletter · Intake assistant. Several **standalone products live INSIDE it**: Outbound
Agent (the two outreach modules), Advertising Agent + Ad Resizer (advertising/creative), Ghostwriter/Copywriter
(newsletter/social/articles). Show that the cards a buyer sees individually are modules of this one operation.

## Read the real material before building (don't wing the machine)
- Spec: `~/.claude/skills/campaign-manager/campaign-manager-spec.md` (THE source of truth - the three parts, the
  module format, Truth, the propose->approve->do mechanic, the gates).
- The live demo (serve: `cd ~/projects/campaign-manager-demo && python3 server.py`, port 8765):
  - `home.html` / `home-system.html` - the dashboard/board the MD watches ("one system, everything inside it").
    **This is the structure to rebuild generically for the Experience tab.**
  - `index.html` - the 9-module animated flow map.
  - `wireframes/capabilities-sequence.html` - **THE canonical flow aesthetic** for Behind the scenes (Ben nodes +
    "what it uses" chips). The `/product-page` skill says lift the flow from here.
  - `calendar.html` - the genuinely-live calendar (talk -> it updates). The real talk-to-it mechanic.
- Design trail: `~/paul-hub/clients/rwf/sessions/campaign-manager-2026-06-24-workflow-aesthetic.md`.

## The three tabs
- **Experience** = the **"one system" board, rebuilt with GENERIC data** (real DOM, like the demo, not a
  screenshot of the real one). Show: the Campaign Manager as the single point of contact; a couple of made-up
  campaigns running across channels (e.g. "Summer Demo Push" on email + LinkedIn); the "X waiting on your yes"
  approve state; "nothing sends or spends without your yes". Optionally convey the talk-to-it mechanic ("tell it
  what you want, it does the work, you approve"). All content illustrative.
- **Behind the scenes** = the **propose -> approve -> do** loop with the human GATES, grounded in **Truth**
  (positioning/messaging/tone/metric-levels in, so it can propose and do). Animated (copy `revealFlow`; lift the
  flow look from `capabilities-sequence.html`). Show the gate as a real step ("nothing sends or spends without
  your yes").
- **What it uses** = the bundled products (Outbound Agent, Advertising Agent, Ad Resizer, Ghostwriter, Copywriter)
  + **Truth** (the source of truth) + the real tools the modules drive (Clay, Apify, Smartlead, HeyReach,
  Substack, Vercel, Cal.com). Real tool names; the bundled products by their locked names.

## Build recipe
1. `cp wireframes/module-ghostwriter.html wireframes/module-campaign-manager.html`. It carries the full nav,
   matched Isa, three-tab renderer, animated flow, chips.
2. Swap: `<title>`, H1 = **Campaign Manager**, the header selling block (lead with Truth + one-operation-you-
   approve, end on the honest rail: "we build it around your brand and hand it over; you approve every gate"),
   Isa greeting (name the product "Campaign Manager", offer the call via `cal.com/paul-dervan-mjfd50`), footer H2
   ("Want the Campaign Manager built for you?").
3. Fill the three tabs per above. **All dashboard data generic/illustrative.**
4. **Screenshot all three tabs and LOOK.** Fix. Note DONE + slug in the QA file.

## LOCKED rules (full detail in the `/product-page` skill)
- Sell the THINKING, not the mechanics. Lead with Truth (the strategy baked in), not "it's a dashboard".
- **Real proof only, NEVER invented - AND never real-confidential.** The system is real; the data shown is
  generic/illustrative. No real client name, no real number. If unsure, ASK.
- Show the REAL machine + the human gates ("nothing sends or spends without your yes"). Honest about what's
  automatic vs manual (e.g. LinkedIn/Substack have no publish API - the human posts; be truthful).
- **COPYRIGHT/IP: never name external experts/authors/frameworks** on the page or in Isa.
- Brand is law (cream, JetBrains Mono, sharp corners except flow nodes, sky `#3A7CA5`, fox on cream only). Voice
  is law (no em dashes, sentence case, plain, buyer's words).
- Flows ALWAYS animate. Screenshot + LOOK before saying done.

## Slug / card (coordinator handles - for your awareness)
- Your file: `wireframes/module-campaign-manager.html`. Storefront `MODS` key `campaign-manager` (cat `bundle`,
  it's the FEATURED card above the grid). Coordinator points `PAGES['campaign-manager']` at your file. You do not
  touch the storefront file - just report DONE + slug.
