# BRIEF: turn the "Where can AI be built into marketing?" list into a connected SYSTEM

**Written:** 24 Jun 2026 (Paul + Claude, in the campaign-manager session)
**For:** a fresh terminal, working in `~/projects/fox-advantage-site-repo`
**Status:** exploration. Build a standalone wireframe FIRST. Do NOT touch the live homepage until Paul approves.

---

## 1. The one-line job

The homepage section **"Where can AI be built into marketing?"** is currently a **long list** of seven
modules (an accordion). Paul wants it to read as a **connected system** instead, so a visitor sees
**how one big thing contains many things, and how they connect** - the way a real marketing department
flows from strategy into everything downstream.

## 2. What Paul actually said (verbatim intent, hold onto this)

- "It feels like a long list of things. I'd like to find a way to show **systems being built**."
- "I like this kind of structure, which might be **the structure of a marketing department**. So you
  have **flows, work going from strategy into other areas**."
- "Make my website more **visual and system-built**."
- "We may find there's **a system for each one of these** things in particular."
- The campaign-manager demo "**might be an interesting place to start**."
- CRUCIAL SCOPE LINE: "**It's not that I want to show the exact workflow step by step. I just want to
  show how one big thing has got lots of other things in it and how they're connected.**"

So: **connectedness and containment, NOT a step-by-step how-to.** This is a map of a system, not an
instruction manual. Don't reproduce a literal numbered "do step 1, then step 2" flow on the homepage.

## 3. The aesthetic to use (this is the part Paul likes)

There is a flow-diagram visual language we have been using and Paul likes it. Two reference files,
both openable in a browser:

- **The seed / closest example:** `~/projects/campaign-manager-demo/how-it-works-flow.html`
  (serve it: `cd ~/projects/campaign-manager-demo && python3 server.py`, then
  `http://localhost:8765/how-it-works-flow.html`)
- **The original it was built from:** `~/paul-hub/clients/eaton/process/ben-icp-outreach-flow.html`

The visual signatures to carry over (RWF-skinned already):
- A vertical spine: **node cards** connected by thin **connectors**.
- **Phase bands** that group nodes into stages (eyebrow + heading).
- **Branching lanes** (the `bridge` / `bridge-join` split into two `lane`s) where a path forks.
- Node card anatomy: header strip + icon + title + sub + optional skill chips.
- Palette: cream bg `#FAFAF8`, sky blue `#3A7CA5`, deep sky `#1A3A4E`, cream accent `#F7EAD9`,
  logo orange `#F47521` used sparingly. Fonts: Space Grotesk (headings) + JetBrains Mono (body).
  Dot-grid background. No rounded-corner ban issues - these cards use a soft radius that Paul has
  accepted on these flow diagrams specifically (confirm if unsure).

BUT adapt it from a *linear top-to-bottom recipe* into a **system map** that shows flow + containment.
The flow page is the aesthetic donor; the homepage job is a different shape (see section 5).

## 4. The real content (the seven modules + their tools, live today)

Source of truth: `src/components/HomePage.tsx` (the `hpx-mods` accordion, ~line 279+). Inventory:

| Module (name) | Descriptor | # | Tools / examples |
|---|---|---|---|
| **Marketing effectiveness** | Which metrics matter, and how they move each other | 4 | Measurement training · Metrics audit · Brand scorecard · Brand/activation split |
| **Segmentation** | Proper segmentation, with the maths actually run | 4 | What segmentation is · What holds up · Similarity analysis · Scatter plots |
| **Brand strategy** | Positioning, messaging, mental availability, assets | 6 | Competitor positioning map · Mental availability · Messaging framework · Distinctive brand assets · Brand on a page · Brand guidelines |
| **Advertising** | Brief to useful options faster, quality first | 4 | Video · Brand ads · Animated ads · Static ads |
| **Studio** | Twenty years of studio craft, with AI inside | 3 | Marketing calendar · Studio measurement · Brief coach |
| **Business development** | AI for sales, outreach and GTM | 1 | Business development rep |
| **Research and insights** | Message testing, intelligence, interviews by phone | 4 | AI research interviewer · Company intelligence · Review intelligence · Pricing intelligence |

Every tool already has a rich inline visual panel (`cl-acc-detail`) in `HomePage.tsx` - pyramid SVGs,
scorecards, a competitor map, charts. **Reuse those panels verbatim** as the deepest layer. Do not
rebuild them.

## 5. The conceptual model to try (a strong starting hypothesis, not a mandate)

A marketing department is not a flat list of seven things - it is a **flow with a feedback loop**.
The seven modules sort naturally into a spine:

```
   EVIDENCE                 THINKING            MAKING                GO-TO-MARKET
   Research & insights  ─┐
   Segmentation         ─┼─►  Brand strategy ─►  Advertising  ─┐
   Marketing            ─┘                        Studio       ─┴─►  Business development
   effectiveness ◄──────────────── (measurement loops back around all of it) ──────────────┘
```

- **Evidence feeds strategy. Strategy feeds the making. The making feeds go-to-market. Measurement
  wraps the whole thing and loops back.** That is "work going from strategy into other areas."
- Each node is **"one big thing with lots of other things in it"**: click/expand a node and its tools
  appear (then a tool opens its existing rich panel). That is the containment Paul wants to show.
- **Campaign manager as the worked example.** Campaign manager is itself a *system that contains many
  connected modules* (radio, LinkedIn outreach, articles, posts, email - all under one named
  campaign, tied to goals and a measurement scorecard). It is the proof that "a system for each one
  of these" is real, not a slogan. Consider featuring it as the exemplar "system" the visitor can
  look inside. The demo lives at `~/projects/campaign-manager-demo/` (board = `home.html`).
  Its object model (USE THIS LANGUAGE): a **campaign = its name** (the identity), a campaign has
  **many modules** (the channels) and can have **multiple goals** (an attribute). Full model in
  `~/.claude/skills/campaign-manager/campaign-manager-spec.md` - search "CAMPAIGN / MODULE / GOAL".

Don't over-fit to this exact diagram. The test is Paul's line: *one big thing, lots of things in it,
and how they connect.* If a cleaner shape says that better, propose it.

## 6. Hard guardrails (do NOT skip)

- **Build a NEW standalone wireframe first** (e.g. `wireframes/system-flow-mock.html`), self-contained,
  openable in a browser. **Do not modify `HomePage.tsx` or any live file** until Paul has seen the mock
  and approved the direction. The live accordion stays exactly as-is in the meantime.
- **The "list problem" has history.** On 4 Jun a session explored this same problem and LOCKED the
  accordion ("fix was framing, not visuals"), ruling out floor-plan / department-render / revolving-hero
  ideas. Paul is deliberately re-opening it with a DIFFERENT idea (connected-system map, not a render).
  Read the decision trail before designing: `~/projects/fox-advantage-site-repo/CLAUDE.md`
  ("Homepage direction (2026-06-04)") and `~/paul-hub/clients/rwf/CONTEXT.md`. Your job is to beat the
  accordion on *clarity*, not just decoration. If the system-map doesn't clearly beat it, say so.
- **Deploy guardrails (from the site CLAUDE.md):** the site deploys from `main`; do NOT touch the
  nav/hero-video code, the Isa chatbot, or the bottom bar. None of that is in scope here anyway.
- **Voice rules (hard):** no generalisations, no "most teams" / criticism of marketers, no salesy
  closers, no "replace" language (opportunity not replacement), "we" not "you", no corporate/AI-hype
  words, **no em dashes**, start specific not with a thesis. Full spec: `~/.claude/skills/writing-voice/`.
- **Quality + speed** are the two themes that run through everything on this site.

## 7. Deliverable + how to present it

1. A standalone `wireframes/system-flow-mock.html` showing the seven modules as a connected system,
   using the flow-diagram aesthetic, with at least one node expanded to show its tools (containment)
   and the flow/feedback-loop legible (connectedness).
2. If useful, a second variant so Paul has a comparison (e.g. vertical spine vs. a left-to-right
   department flow). Two options beats one.
3. Open it in the browser for Paul and walk him through it. Then iterate. Only after he approves does
   anyone go near `HomePage.tsx`.

## 8. Open questions to put to Paul (don't assume)

- Does the system-map **replace** the accordion section, or sit **above** it as the visual entry that
  then drills into the existing accordion detail?
- ~~Vertical spine or left-to-right?~~ **DECIDED (Paul, 24 Jun): VERTICAL spine**, like the flow page.
  Build the system map as a vertical spine, not left-to-right.
- Is **campaign manager** the hero exemplar system, or one node among equals?
- How much motion? (The flow pages use gentle fade-in on scroll. A system map could animate the flow
  along the connectors, but that risks "step-by-step" - which Paul explicitly does NOT want.)
