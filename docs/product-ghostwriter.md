# Ghostwriter - product source of truth

> Locked with Paul, 28 Jun 2026. The reference build for the storefront product pages.
> Page: `wireframes/module-ghostwriter.html`. Renamed from "LinkedIn Content Engine".

## The name
**Ghostwriter.** A role-noun, sits beside Copywriter / Outbound Agent / Research Interviewer.
The hook: *most ghostwriters put words in your mouth; this one only ever uses yours.*
(Rejected: "LinkedIn Content Engine" - too narrow, it's article + LinkedIn + email; "Content Engine" - "content" is the tired frame the essay half-rejects.)

## The one belief everything hangs off
**The thinking is theirs. Their ideas, their point of view, their voice. Ghostwriter never supplies the thinking.**
It removes the two things that keep expertise trapped in the building:
1. **Time** - writing well is slow, and the people who know most have the least room in the day.
2. **The curse of knowing it cold** - the jargon feels normal, you stop seeing what the reader is missing.
They have ideas. They don't have time. That is the whole sell. Positioning canon = Paul's essay "The expertise that never leaves the building" (`~/paul-hub/book/substack/` family; the published voice, not a draft).

## Boundary vs Copywriter
- **Copywriter** = you bring a brief, it writes (reactive, any channel).
- **Ghostwriter** = it brings/captures the thinking, weekly, and carries it to finished posts + media + distribution (proactive, organic thought leadership).

## The build work (per client, the foundation)
1. A **messaging framework** - position, tone, customer ICP.
2. From that + their real posts, a **trained voice** (reference-trained + self-audit, NOT a fine-tuned model - say "trained on your posts", never "a model of your voice").

## Two ways the thinking gets in
- **Talk it out** - speak it by voice through the **Monologue app** (walk, car, between meetings). Transcript becomes the article in their words.
- **Ten ideas** - "give me 10 ideas this week"; Claude's own web search across their category + rivals + news, filtered to their POV, each idea sourced (sourced-or-drop, never invent a hook).

## The real machine (Behind the scenes - show the wiring, never hand-wave)
Claude Code orchestrates skills, calls real APIs via scripts, hard human gates throughout:
- **Write in voice** -> voice skills (`/sarah-voice` etc.) + the slop guard (`ai-slop.md` self-audit, checked against the loved-posts standard).
- **Images** -> `/dray` routes to `/fox-static` / `/fox-brand` -> **Seedream 4.5 on Replicate** (composed in HTML, Playwright @2x).
- **Charts** -> **Chart.js** -> **Playwright + ffmpeg** (frame-by-frame).
- **Short video** -> `/fox-video` -> **Seedance 2.0 (Replicate)** and **Kling v2.6 (fal.ai)**.
- **Articles / pages** -> `/branded-page`, `/substack`.

## Distribution (LOCKED - this is the honest model)
- The client **posts to LinkedIn themselves** (uploads the charts).
- The client **posts the article to Substack themselves**.
- **Because it's on Substack, Substack then emails the subscribers AND syndicates to the website, automatically.**
- **NO ESP, NO Smartlead** (Smartlead is the Outbound Agent's tool, for cold outbound - nothing to do with Ghostwriter). No auto-posting to LinkedIn. The human posts; Substack auto-distributes the email + website.

## The proof (real, on the page)
The **95:5 Rule + the Day One list** case study, end to end and live:
- Paul spoke it by voice (Monologue) -> Ghostwriter wrote it in his voice -> made the charts in his brand.
- Experience tab: big Substack article (links to the live post) + the same piece on LinkedIn (he posted), Email newsletter (Substack auto), Website (Substack auto). All real screenshots.
- Live links: Substack `https://runwithfoxes.substack.com/p/the-955-rule-the-day-one-list` ; LinkedIn `https://www.linkedin.com/posts/pauldervan_most-of-your-target-customers-are-not-buying-activity-7470936174715494401-DAH4`
- Assets: `wireframes/assets/ghostwriter/` (substack.png, linkedin.png, email.png, website.png, 95-5-5pct.gif, day-one.png). Source charts: `~/projects/fox-ads/approved/95-5-day-one/`.

## Hard lessons baked into the build (now in the /product-page skill)
- **Real proof only - never an unreviewed draft.** A `status: draft` file can carry the exact slop the voice spec bans.
- **When Paul pastes/links the published piece, use THAT text verbatim** - not a same-named disk file (the `substack-95-5-rule.md` disk file diverged from the published article).
- **Show the slop/quality guard**, don't just claim it (a voice+slop check in Behind the scenes + the slop guide in What it uses).
- **Show the REAL machinery** in Behind the scenes (Dray/Seedream, Chart.js, Seedance/Kling), not a conceptual story.

## Storefront card
- `MODS` key `linkedin-content`, name **Ghostwriter**, links to `module-ghostwriter.html`. Tagline: "Your expertise, published in your voice." Badge: Bundled (pairs with Outbound Agent). Filter: advertising/writing.

## Open / parked (minor)
- Header is 3 paragraphs (trim to 2 if wanted).
- The essay's `[Paul: a real moment you saw]` anecdote is not on the page (in or out, Paul's call).
- Short video shown as a named format (no real short-video asset for this piece yet).
- A few dead CSS blocks from earlier Experience drafts still in the file (strip on finalise).
