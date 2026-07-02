# Lifecycle Agent - product brief + build spec

> 2 July 2026. Specced with Paul in session (topic: rwf). This turns product #16 on the
> storefront (card live, wireframe at `wireframes/module-lifecycle-agent.html`, benched
> 28 Jun for "proof too thin") into a real, provable system. Companion briefs:
> `brief-outbound-agent.md`, `~/.claude/skills/campaign-manager/campaign-manager-spec.md`.

## What it is

The Lifecycle Agent runs triggered email to people who already know you, across the whole
relationship: onboard, nurture, retain, expand (email jobs 2-5 in
`product-lineup-candidates-2026-06-25.md`). The pair to the Outbound Agent: outbound wins
new, lifecycle keeps and grows. It designs the journey, builds the segments and flows in
the client's ESP, writes every email in the brand's voice, gates everything behind the
client's approval, and reads the numbers back to keep tuning. We build it around a brand,
hand it over, and it runs in their own email platform.

## Decisions locked (2 Jul 2026, Paul)

1. **Proof vehicle: the movement, not a paid course.** Paul is launching a free (or
   near-free) offline + online training movement for marketers in Ireland. Goal is reach
   and momentum, not course revenue. The Lifecycle Agent runs the movement's entire email
   programme. The proof story writes itself: the movement helping Irish marketers thrive
   in an AI world is itself run by an AI lifecycle agent. (Paul handles the fame/media
   side personally; the spec claims only what the system does.)
2. **All five layers, thin.** Journey design, build, write, gate, tune. One journey (the
   movement), four lifecycle stages plus the launch flows, roughly 6-10 core emails, a
   weekly tune pass. Full loop demonstrated end to end rather than one layer built deep.
3. **Approval surface: a board** (option b). Port of the campaign-manager demo board.
   Nothing goes live in Klaviyo without an approval on the board.
4. **Klaviyo first, ESP behind an adapter.** Klaviyo's REST API is open on the free tier
   (confirmed 27 Jun): private API key, full profiles, events, lists, segments, campaigns,
   flows, metrics. HubSpot later is a second adapter, not a rebuild.
5. **Launch shape: C with bits of B.** Membership opens instantly and pays off from day
   one (online layer). In-person days are unlocked by city thresholds: first Dublin day
   at 100 Dublin members, Cork at 100 Cork members, and so on. Each unlock produces a
   fill-the-room proof moment (faces, photos, word of mouth). Thresholds are Paul's to
   set and change; 100 per city is the working number. An invite-only pilot day off the
   list is allowed at any point without calling it the launch.

## The movement (placeholder facts - revisit with Paul)

All of these are working assumptions so the journey can be designed. None are final.

- **Name**: placeholder ("the movement" throughout). Paul to name it.
- **Entry point**: `runwithfoxes.com/training` - a thin page: what this is, email capture,
  city field, live member counter. The form writes a Klaviyo profile + `Joined` event.
- **Cost**: free or near-free. The "sale" at every stage is participation, not money.
- **Audience**: marketers in Ireland, all levels. One persona to start.
- **Online layer**: something useful lands immediately on joining and then on a regular
  rhythm (a lesson, a skill, a prompt - content TBD by Paul; the agent sends it, Paul
  makes it).
- **Offline layer**: city days, unlocked at threshold.

## The journey (reach-shaped, not revenue-shaped)

Four lifecycle stages plus the launch flows. Every email in RWF voice, built on the
messaging framework, fired by trigger not schedule.

| Stage | Who | Trigger | Goal | Example emails |
|-------|-----|---------|------|----------------|
| Onboarding | Just joined | `Joined` event | First value in minutes; feel part of it | Welcome + first lesson; "here's how this works"; city status ("Dublin is at 61/100") |
| Nurture | Joined, not yet participated | Behaviour + time | Get them to their first live moment | Next lesson nudges; "bring one colleague and Dublin unlocks sooner" |
| Retention | Gone quiet | No opens/clicks for N weeks | Re-engage with value, never guilt | "The one thing you missed"; win-back with best recent lesson |
| Expansion | Engaged core | Attended / completed / high engagement | Advocacy: bring colleagues, share, speak | "You were number 61 in Dublin"; referral asks; next city/next event |

**Launch flows (first-class, alongside the four stages):**

- **Milestone flow**: city passes 25 / 50 / 75 / 100 - momentum emails to that city's
  segment ("we just passed 75, one push").
- **Unlock flow**: city hits threshold - the payoff email ("Dublin is on. You were
  number 61; seats go to the early ones first"), then event logistics sequence.
- **Referral engine**: "tell one colleague" asks woven into nurture, tracked via
  per-member referral links or a `Referred by` property (mechanism confirmed in build
  against what Klaviyo supports; no invented tracking claims).

**Frequency cap**: one email per member per [X] days across all flows, enforced in flow
design and stated in `config.yaml`. Number is Paul's call at build time.

## Architecture

Approach locked: skill + board, Klaviyo as system of record and as the always-on runtime.
Klaviyo fires triggered emails 24/7 on its own; the agent is the marketer, working in
sessions. No daemon, no hosting beyond the board.

Six components, all thin:

1. **The skill** - `~/.claude/skills/lifecycle-agent/`. The brain: the five-layer process,
   lifecycle craft (stage definitions, trigger logic, frequency caps, what good looks
   like per stage), routing to the other components. Brand-agnostic. Follows
   `/skill-builder` structure.
2. **Truth folder** - per brand, the single source. RWF's first:
   `journey.md` (stages, triggers, thresholds, emails), `voice.md` + messaging framework
   pointers, `config.yaml` (Klaviyo key, list IDs, send caps, approval rules, kill
   switch), `state.json` (built / live / pending-approval, so a crashed session resumes
   instead of double-building).
3. **Klaviyo adapter** - one Python module wrapping the REST API: profiles, events,
   lists/segments, flows, campaigns, templates, metrics. Everything ESP-shaped goes
   through it. **Day-one verification task**: confirm exactly which flow operations the
   API supports vs which need one-time UI setup; anything needing a click becomes a
   documented setup step, never a hidden failure.
4. **The board** - port of the campaign-manager demo board pattern (local server, later
   publishable to a gated Vercel page for clients). One page: the journey, each flow,
   each email rendered as it will land, live/draft/pending status, member counts per
   city, Approve / Edit per item. Approval here is the only thing that flips anything
   live.
5. **Seeder** - script that fills the account with realistic movement-shaped profiles and
   events (joined, engaged, quiet, attended) so every flow is built and tested before a
   real person joins. Clearly-fake domains only; purged at launch; **hard guard: refuses
   to run against a list containing any non-seed profile**.
6. **`/training` page** - thin page on fox-advantage-site (same pattern as `/productivity`:
   self-contained static app behind a Next route). Copy, email + city capture, live
   counter per city, form posts to Klaviyo. The real top of funnel, live before the
   course content exists.

## The flow, end to end

Paul runs the skill -> it reads Truth -> designs or updates the journey -> creates
segments and draft flows in Klaviyo via the adapter -> writes every email in RWF voice ->
stages the lot -> board shows it -> Paul approves on the board -> agent flips flows live
-> Klaviyo runs 24/7 -> weekly tune session pulls metrics, posts a plain-English read on
the board ("welcome email 2 gets half the clicks of email 1, here's a rewrite") ->
proposed changes go through the same gate.

## Safety rails (the rules that never bend)

- Nothing sends without a board approval. Two-stage where client-facing (staged as draft
  in Klaviyo -> approved on board -> live), per the standing paul-approved rule.
- Send caps in `config.yaml`; adapter refuses a call that would breach them.
- Kill switch: one command pauses every flow.
- Adapter fails loudly; never blind-retries a send-affecting call.
- Seeder guard as above. Seed data uses clearly-fake domains, never real people.
- Fabrication ban applies to email content: no invented member counts, testimonials or
  stats in any email. Counts come from the Klaviyo API at send time or are omitted.

## Klaviyo specifics + cost curve

- Free tier: 250 profiles, 500 email sends/month, full API. Covers build, seed and early
  proof.
- A movement that works blows through free: roughly EUR 20/month at 500 contacts, rising
  with list size. That is the sign it is working, not a problem; stated here so it is
  never a surprise. Architecture unchanged by tier.
- Paul to create the free account at build start (needs a sending domain decision:
  runwithfoxes.com subdomain recommended, e.g. mail.runwithfoxes.com - confirm in build).

## Proof milestones

1. **Demo exists**: seeded account, four stage flows + launch flows live (against seed
   traffic), board demo-able to a prospect.
2. **Real**: `/training` live, seed purged, first real joiners flowing through the same
   flows.
3. **Case study**: first tune cycle completed on real numbers; before/after on at least
   one email. Unbenches the product page ("real proof" requirement met).

## Client packaging (what a client buys)

The skill + their Truth folder + their adapter config + their board, running in their
Claude against their ESP key. The RWF build is the template: journey redesigned around
their business, voice and messaging swapped in Truth, same components. HubSpot = second
adapter behind the same interface (v2, on demand). Pricing per the relationship rule,
not line items.

## Open questions for Paul

1. Movement name (blocks `/training` copy and email sign-off, not the build).
2. What the online layer actually is (the recurring useful thing members get). The agent
   sends it; Paul makes it.
3. Final thresholds and cities (working: 100 per city, Dublin first, then Cork).
4. Frequency cap number.
5. Sending domain.

## File locations

- This spec: `~/projects/fox-advantage-site/docs/brief-lifecycle-agent.md`
- Build: `~/projects/lifecycle-agent/` + symlink at `~/projects/clients/rwf/lifecycle-agent`
- Skill: `~/.claude/skills/lifecycle-agent/`
- RWF Truth: inside the build repo (`truth/rwf/`)
- `/training` page: `~/projects/fox-advantage-site` (same pattern as `/productivity`)
