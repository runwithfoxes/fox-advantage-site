# Brief Coach - product page build brief (priority, lead build)

> 28 Jun 2026. Build the **Brief Coach** storefront product page. We already built the bones for Sabre two days
> ago - your job is to STRIP all Sabre specifics and keep the bones, generalising it to any brand.

## Read first
1. `/website` to load the repo.
2. The reference build (clone its shell): `wireframes/module-ghostwriter.html`. Match its nav, the matched
   live-site Isa, the three-tab structure, the animated flow, the quality bar.
3. `docs/product-ghostwriter.md` (what "good" looks like) + the **`/product-page` skill** (format + gotchas).
4. **The source for the substance** (read these to understand the product, do NOT copy Sabre wording):
   - `~/.claude/skills/sabre-brief-coach/SKILL.md` + `references/` - the four faces, the tiers, the stance.
   - `~/projects/fox-advantage-site-repo/public/clients/sabre/media/brief-coach-flow.html` - the flow visual (bones).
   - Session: `~/paul-hub/clients/sabre/sessions/brief-coach-2026-06-25-built-and-shipped.json`.

## What the product IS
**Brief Coach** - coaches a marketing brief or positioning doc to *the right work, not the nice work*. It
interrogates a brief across **four faces - commercial, positioning, insight, operational - by tier**, with
twenty years of brand effectiveness and positioning discipline built in. It is a **standard-holder, not a
judge**: it probes, teaches the discipline, and hands the thinking back. It never writes the brief for you and
never delivers a verdict.

It pulls in the brand's **real commercial metrics, operational metrics, brand positioning and messaging
framework**, so it coaches against the actual strategy, not generic best practice.

## STRIP Sabre, keep the bones
- Remove every Sabre name, person, product, metric, and the Sabre-specific positioning examples.
- Keep: the four faces, the tier routing, the coaching stance, the "right work not nice work" line, the
  brief-in -> stronger-brief-out-with-gaps-flagged shape, the discipline (referred to generically, never named).
- **COPYRIGHT/IP - HARD RULE: do NOT name Field, Rumelt, Dunford or any external expert, author or named
  framework anywhere on the page or in Isa. Refer to the discipline generically** ("twenty years of effectiveness
  and positioning work", "the discipline", "brand best practice"). The named thinkers are in the skill's private
  references only; they never surface in the build.

## The three tabs
- **Experience** = show the coach in action **as a conversation**, because that is what it is. Two parts:
  1. **A chatbot-style coaching box** - reuse the matched Isa/chat styling already in the reference (`.isaw`,
     `.m.bot` / `.m.you`, cream panel, square `#F0F0EC` bubbles, lowercase header, dark SEND). But instead of
     answering, **the coach asks the good, sharp questions** - a short real-feeling exchange that moves across the
     **four faces** (commercial, positioning, insight, operational): it probes, names the gap by the discipline,
     asks the sharper question, hands the thinking back. The questions must be genuinely good coaching questions
     drawn from the skill's discipline - generic, no client, no stat, no named experts.
  2. **The measurement pyramid** as the visual for the **commercial face** - lift `cl-mini-pyramid` from
     `src/components/HomePage.tsx` (~line 327) + CSS `.cl-mini-pyramid` / `.cl-mp-*` in `src/app/globals.css`
     (~line 4424). Five levels **Commercial / Behaviour / Memory / Marketing comms / Marketing activity**, ships
     with a real "Memory: None tracked" gap. The coach holds a weak (activity-heavy) brief against it and asks why
     there's no commercial or memory metric.
  A method demo of the discipline, NOT a claimed client result - invent no client, no stat. If you need a second
  real asset for another face, ASK in the QA file.
- **Behind the scenes** = the four-faces-by-tier flow: route to tier -> interrogate commercial -> positioning ->
  insight -> operational -> hand back stronger with the gaps named. Animated (keep the reference's revealFlow).
  Lift the shape from `brief-coach-flow.html` but generalise it.
- **What it uses** = Skills (`/sabre-brief-coach` generalised, the disciplines), Rules (the four faces, the tier
  routing, never-fabricate-a-specific, clinical-neutral stance, hand-the-thinking-back), Data (the brand's
  loaded positioning + messaging framework + commercial + operational metrics), Memory (the loaded brand profile).

## Sell the thinking, not the mechanics
The defensible 90% = the discipline built in (twenty years of effectiveness and positioning work), the
four-faces rigour, the refusal to accept weak answers. NOT "an AI that reviews your brief." Lead with that.

## LOCKED rules (same as all product pages)
- Real, honest content - never fabricate a brand specific, a stat, or a client.
- Show the quality discipline visibly (the four faces ARE the guard here).
- Brand is law, voice is law (cream, JetBrains Mono, sharp corners except flow nodes, sky #3A7CA5, no em dashes,
  buyer's words, sentence case).
- Flows always animate. Screenshot + LOOK at every tab before saying done.

## Output + reporting
- `cp wireframes/module-ghostwriter.html wireframes/module-brief-coach.html`; build there. Assets (if any) in
  `wireframes/assets/brief-coach/`.
- Ask questions in `docs/product-page-build-QA.md` under "Terminal A - Brief Coach".
- When screenshot-verified, report "done + slug" there. The coordinator wires the storefront card.
