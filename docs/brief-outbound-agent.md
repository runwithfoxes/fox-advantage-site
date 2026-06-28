# Builder brief - Outbound Agent product page

> 28 Jun 2026. You are a BUILDER terminal. Build ONE product page: the **Outbound Agent**.
> A coordinator terminal is live in parallel and answers questions inline. This product is REAL and we run it
> ourselves (Jo, the AI Growth Manager). The machine below is mapped from the real skills + scripts - do not
> invent steps, stats or example copy. When unsure, ASK.

## How this works (read first)
1. Run `/website` to load the repo context.
2. Read the **reference build** in the browser: `cd wireframes && python3 -m http.server 8899`, open
   `localhost:8899/module-ghostwriter.html`. Gold standard - match its nav, matched Isa, three tabs, animated
   flow, quality bar exactly.
3. Read `docs/product-ghostwriter.md` and the `/product-page` skill (`~/.claude/skills/product-page/SKILL.md`).
4. **Ask questions in `docs/product-page-build-QA.md` under `## Terminal G - Outbound Agent`** (a `Q:` line +
   timestamp), then keep working. Re-read for the coordinator's `A:` before proceeding on a blocked item. ASK on
   anything that risks fabrication.
5. When done + screenshot-verified, write "DONE + slug" in the QA file. **The coordinator wires the storefront
   card** - you never touch `homepage-storefront-branded.html` or other products' files.

## The product (locked with Paul - do not relitigate)
**Outbound Agent** = cold acquisition (job 1 of the seven jobs of email). It pairs with the Lifecycle Agent
(outbound wins new; lifecycle keeps + grows) and bundles with **Ghostwriter** when LinkedIn is the channel (the
profile can't be barren when a cold message lands). Badge: **Bundled**. Filters: outreach + email.

Canonical description (Paul's words, source `docs/product-lineup-candidates-2026-06-25.md`):
> "It finds the right people and writes each one a real email. Say 'find 100 ICP prospects and email/message
> them' in YOUR Claude -> it finds + writes + sends, every message 100% customised per prospect (not mail-merge),
> multichannel (email + LinkedIn), coordinated. Orchestrates Clay + Apify + Smartlead + HeyReach; runs in their
> Claude, swappable tools (any with an API)."

The honest rail stays: *we build it around your brand and hand it over; it runs in your own Claude.*

## The job of THIS page (sell the thinking, not the mechanics)
The buyer's price anchor is every cold-email SaaS (Apollo, Lemlist, Instantly) and the mail-merge they all do.
**Beat that on the page.** The differentiator is twofold:
1. **Every message is genuinely bespoke, not a template with tokens.** The opening (Beat 1) is Paul's real
   reaction to something the prospect actually said on LinkedIn - welded to a feeling, specific, unborrowable.
   Paul's standard, put it on the page: *"if a line could appear in someone else's email unchanged, it isn't
   done."* The "funny second beat a robot wouldn't write" IS the bar.
2. **It runs the WHOLE pipeline, not just the send** - finds the right people, enriches, writes each one, sends,
   follows up across channels, scans replies, briefs you on who to call. A marketer who did the job for a living,
   made to run. Mail-merge tools do step 9 only.

## The real machine - 12 steps (map source: `~/paul-hub/methodology/bdr-status-2026-06-01.md`)
Read that doc + `~/.claude/skills/growth-manager/SKILL.md` + `~/.claude/skills/thin-marketing-heyreach/SKILL.md`
+ `~/.claude/skills/campaign-manager/campaign-manager-spec.md` (the "EXECUTION MODEL" section). The pipeline:

1. **Brief** - one line of intent ("find 50 Irish CEOs at thin-marketing companies"). `/jo`.
2. **Pull candidates** from the real **49,815-person pipeline** (`~/paul-hub/intelligence/prospects/icp-pipeline.csv`), filtered by geo/role/segment/contact-state. Python, no external call. `/find` `/network`.
3. **Screen / qualify** (thin-marketing play) - headcount + marketing-team size via **Apify**. ~19% pass.
4. **Geography gate** - Ireland/EU -> LinkedIn (HeyReach) only (GDPR/PECR); US -> email permitted; UK restrained.
   **[GATE] Paul approves the prospect slice (who enters, never the words).**
5. **Email enrichment** - name + LinkedIn URL -> work email via **Clay UI waterfall** (~73% hit). `/clay-enrich`.
6. **Gather personalisation signals** - scrape their real LinkedIn posts (**Apify** posts actor) / company
   decision-maker + recent hires (**Clay MCP**). `/clay-intel-light` `/clay-intel`.
7. **Write bespoke copy per person** - a unique email (3 beats) or LinkedIn note per person. Jo IS the writer.
   **[GATE] Paul reviews every message before any send.**
8. **Build the LinkedIn campaign in HeyReach** - list + campaign + sequence + safe caps (25/day), all via API.
9. **Load the email campaign into Smartlead** - each lead carries its own `custom_subject` + `custom_body`,
   resolved at send time (this is what makes it 100% unique, not a token-merge).
   **[GATE] Paul presses Start. Nothing sends before this.**
10. **Send + automated follow-up** - platforms drip within caps (HeyReach sequence; Smartlead drip).
11. **Monitor + reply digest** - a 7am cron pulls stats from both platforms, scans for replies, emails Paul a
    digest (who replied, title, channel, link). Real scripts at `~/paul-hub/scripts/` (`bdr_sync.sh` chain).
12. **Respond + book** - on a positive reply, Jo briefs Paul on the person and drafts a response with the Cal.com
    link; the prospect self-books.

Show this animated (copy `revealFlow` from the reference; opacity-only is a fail). **Show the three human GATES
prominently** - "nothing sends or spends without your yes" is part of the sell. Show the **quality guard**: the
bespoke standard (step 7) + the anti-fabrication verify pass (every factual claim in a message checked against
the real evidence before send).

## Experience tab (REAL proof - read the gaps carefully)
Lead the story: *"say find 100 ICP prospects and write each one -> it does."* Then prove the bespoke claim by
**showing real cold emails side by side so you can SEE each opening is entirely different** (the Beat-1 bridge),
while the credibility close is the only shared part.

- **Real email canon (use this, it's real and approved):**
  `~/.claude/projects/-Users-pauldervan/memory/reference/reference_jo_cold_email_structure.md` - the full 3-beat
  structure + ~7 real approved examples (the "Donna" email is the canonical benchmark). Also
  `~/paul-hub/intelligence/prospects/bdr-email-drafts.md`.
- **Real HeyReach campaigns (showable; redact recipient names):** "Irish marketers - book" (id 416563, 1,144
  real profiles, running) and "Thin Marketing - Book" (id 483574) - the end-to-end proof: 650 companies sourced
  -> $2.34 Apify screening -> 124 qualified -> 120 send-ready -> campaign built + loaded entirely by Jo, Paul
  pressed Start. Source: `~/.claude/skills/thin-marketing-heyreach/SKILL.md` ("Worked example, proven 24 Jun").
- **Real Smartlead campaign:** "free book" (id 3428924), bespoke per-person copy proven end to end.

### MUST ASK before you put these on the page (do NOT decide alone, do NOT fabricate):
- **Q for coordinator: can the real recipient names (Donna etc.) be shown, or replace with `[Name]`?**
- **Q for coordinator: are there real accept/reply rates or meetings-booked numbers we can show?** None are in
  the files. **Do not invent any stat, accept rate, or conversion number.** If we have none cleared, the page
  shows the *craft and the pipeline*, not performance numbers.
- **IP FLAG:** the benchmark emails' credibility beat names an external expert ("trained by Peter Field"). The
  LOCKED no-named-experts rule bans that on a page. **Ask the coordinator** whether to redact the expert name in
  the shown example or show the bridge beats only. Do not publish the expert name without a yes.

## What it uses tab
Chips, full-width, label-left: Skills (`/jo` `/clay-enrich` `/clay-intel` `/thin-marketing-heyreach` `/network`) /
Rules (the bespoke standard + anti-fabrication verify + geography/consent gate) / Tools (Clay, Apify, Smartlead,
HeyReach + their MCP servers) / Data (the prospect pipeline) / Models (Claude Opus 4.8) / Memory (contact-state
tracking per person). Real names only.

## Build recipe
1. `cp wireframes/module-ghostwriter.html wireframes/module-outbound-agent.html`. It carries the full nav, matched
   Isa, three-tab renderer, animated flow, chips.
2. Swap: `<title>`, H1 = **Outbound Agent**, the header selling block (lead with the bespoke-not-mailmerge thinking
   + the whole-pipeline care, end on the honest rail), Isa greeting (name the product, offer the call via
   `cal.com/paul-dervan-mjfd50`), footer H2 ("Want the Outbound Agent built for you?").
3. Fill the three tabs per above.
4. **Screenshot all three tabs and LOOK.** Fix. Note DONE + slug in the QA file.

## LOCKED rules (full detail in the `/product-page` skill)
- Sell the THINKING, not the mechanics. Beat "isn't this just another cold-email tool?" with real, visibly
  bespoke emails.
- **Real proof only. NEVER a draft, NEVER invented. No invented stats.** If unsure, ASK.
- Show the REAL machine + the human gates. Show the quality guard, don't just claim it. Honest distribution.
- **COPYRIGHT/IP: never name external experts/authors/frameworks** on the page or in Isa (see the Peter Field flag above).
- Brand is law (cream, JetBrains Mono, sharp corners except flow nodes, sky `#3A7CA5`, fox on cream only). Voice
  is law (no em dashes, sentence case, plain, buyer's words).
- Flows ALWAYS animate. Screenshot + LOOK before saying done.

## Slug / card (coordinator handles - for your awareness)
- Your file: `wireframes/module-outbound-agent.html`. Storefront `MODS` key is `outreach`; coordinator points
  `PAGES['outreach']` at your file, keeps the **Bundled** badge + outreach/email filters. You do not touch the
  storefront file.
