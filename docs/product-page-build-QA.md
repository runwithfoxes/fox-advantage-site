# Product page build - Q&A channel

> Cross-terminal Q&A. Builder terminals ask here; the COORDINATOR terminal answers inline.
>
> **Builders:** append your question under your terminal's heading with a `Q:` line and a timestamp. Then keep
> working on something else, or wait. Re-read this file for the `A:` answer before you proceed on a blocked item.
> Use this whenever you're unsure about: which real asset to show as proof, whether something is real/wired,
> the real machine for a product, naming/copy, or anything that risks fabrication.
>
> **Coordinator:** answer with an `A:` line directly under the question. Mark done items.
>
> Format:
> ```
> Q: [B, 14:05] Copywriter - is there a real published direct-mail letter I can show, or only drafts?
> A: Yes - use ~/paul-hub/clients/eaton/copywriter/... (the approved one). Redact the recipient.
> ```

## Status board (coordinator updates)
| Slug | Terminal | Page built | Screenshot-verified | Card wired |
|------|----------|------------|---------------------|------------|
| brief-coach | A | yes | yes (3 tabs) - Experience being redone to chat-box+pyramid spec | yes (card live, strategy filter) |
| advertising-agent | F | yes | yes (3 tabs) | yes (card wired, branded+blueprint, filter advertising). Kling CONFIRMED in (Seedance+Kling); Chart.js dropped
| outreach (Outbound Agent) | G | | | | (real machine mapped, brief ready)
| campaign-manager | H | | | | (the BUNDLE; generic data only - real op is confidential)
| copywriter | B | | | |
| scorecard | C | | | |
| segmentation | C | | | |
| positioning | C | | | |
| dba | C | | | |
| company-intel | D | | | |
| interviewer | D | | | |
| review-intel | D | | | |
| outreach | E | | | |
| page-audit | E | | | |
| ad-maker-nav (upgrade) | E | | | |
| guardian (upgrade) | E | | | |

---

## Terminal A - Brief Coach

DONE + slug: **brief-coach** -> `wireframes/module-brief-coach.html` (cloned from module-ghostwriter.html). All Sabre specifics stripped; no client, no stat, no named expert/framework anywhere on the page or in Isa (the discipline is referred to generically). Screenshot-verified across all three tabs.

Q: [A, build] The brief flagged the open question: "how do you show proof for a coach (it's a conversation, not an asset)?" My call, since the brief said keep it a generic method demo with no client and no invented number: the **Experience tab shows a worked coaching exchange** rather than a captured asset. Left column = one line of a brief moving through the discipline (weak line in -> Commercial face names why it fails + asks the sharper question, handed back not answered -> stronger line out with the metric as bracketed placeholders `[the metric]`/`[X]`/`[Y]`/`[date]`, plus a "gap flagged: not agreed with finance, logged as an open action"). Right column = the **four faces** as a readout (Commercial = Working, the other three = Queued, worked top-down, no fake ticks). Honest, generic, shows the four faces clearly. **Is that the right way to prove a coach, or do you want a different Experience treatment?**
A: [coordinator] Good thinking, and your worked-exchange content is exactly the right MATERIAL - but Paul has since steered the treatment. Rebuild the Experience to the latest brief spec: (1) a **coaching CHAT BOX** styled like the matched Isa (cream panel, square `#F0F0EC` bubbles, lowercase `isa`-style header, dark SEND) where the coach **ASKS the good four-faces questions** in a short exchange - put your weak-line -> sharper-question -> stronger-line content INTO that chat; (2) the **real measurement pyramid** beside it as the commercial-face visual (lift `cl-mini-pyramid` from `src/components/HomePage.tsx` ~line 327 + CSS `.cl-mini-pyramid` / `.cl-mp-*` from `src/app/globals.css` ~line 4424; five levels Commercial/Behaviour/Memory/Marketing comms/Marketing activity, keep its real "Memory: None tracked" gap) - the coach holds an activity-heavy brief against it and asks why no commercial or memory metric. Keep your four-faces readout as a small accompaniment only if it fits, no fake ticks. Re-screenshot all tabs. Note done here when redone; Paul will review the direction when he's back.

DONE [A, redone]: Experience rebuilt to spec. **Coaching chat box** styled to the matched Isa (cream `--bg` panel, square `#F0F0EC` bot bubbles, sky-blue replies, lowercase `brief coach` header, dark deep-sky SEND); the exchange is the coach ASKING the commercial-face questions and tying them to the ladder (activity-only success -> "what commercial number?" -> the one-number-and-timeframe push -> stronger line in brackets `[the metric]`/`[X]`/`[Y]`/`[date]`, no invented number -> gap flagged: memory rung blank + target not agreed with finance). **Real measurement ladder** lifted verbatim from the live `HomePage.tsx` (`cl-mini-pyramid`, five rungs, the orange "None tracked" memory gap kept) sits beside it as the commercial-face visual, with a note that the coach won't let it pass with the top of the ladder empty. Four-faces kept as a **small chip row** under the ladder (no fake ticks). All three tabs re-screenshot-verified, on-brand, no IP/named-expert leakage. Ready for Paul's direction review.

UPDATE [A, Paul reviewed]: Paul opened it and had no orientation - "I don't know if that's the coach... feels like random talking." Fixed the cold-open: (1) plain scene-setter line above the chat ("a marketer drops a brief in, the coach reads it and asks the questions that move it from the nice work to the right work"); (2) **the brief shown FIRST as a labelled input card** ("The brief the marketer brought" + objective + how-measured) so the quoted lines read as the brief, not stray talk; (3) a "Brief Coach reads it" divider; (4) **every turn now speaker-labelled** (BRIEF COACH left / THE MARKETER right) - dropped the bare "Commercial" jargon tag that opened it. Re-screenshot-verified. Awaiting Paul's read on whether it lands now.

UPDATE [A, Paul steered hard - INTERACTIVE PYRAMID REBUILD]: Several rounds of Paul feedback, all now addressed. (1) "Too esoteric - who knows what a ladder is" -> stripped ALL jargon (tier/faces/rungs/discipline) across the whole page incl. Isa + BTS flow + Uses chips; the four faces are now the four plain questions ("why are we doing this / what do we want to be known for / what can only we say / can we make it"). (2) "Not a good coach, no rigour" + "explain the different levels of metrics" + "awareness isn't a commercial goal (useful, but not commercial)" -> coaching rewritten with real rigour, those exact points in. (3) "Show different levels of metrics - the pyramid from runwithfoxes.com" -> the metric-levels pyramid is BACK (lifted from `HomePage.tsx` cl-mini-pyramid: Commercial/Behaviour/Memory/Comms/Activity, same colours incl. orange Memory), art-directed as a stepped pyramid on the LEFT. (4) "Interactive bit by bit like the Ad Resizer Run button" -> the chat on the RIGHT reveals one coaching step at a time via a "Coach it -> Next" button, and each step LIGHTS the matching pyramid level (ends on the Memory gap). (5) "The what-changed box is random, shouldn't be there" -> removed. (6) "Art-direct like Ghostwriter" -> pyramid-left/chat-right, aligned heights, polished. Both states screenshot-verified (idle + fully stepped). NOTE: this overrides the coordinator's earlier "small chip accompaniment" note - the pyramid is now the hero of the Experience tab, per Paul direct. Awaiting Paul's click-through.

UPDATE [A, REBUILT FROM THE REAL COACH]: Paul: "do you not have the actual work this coach does? I spent a lot of time on the Sabre coach, use all the knowledge, read the categories of metrics." Read the real skill refs (`~/.claude/skills/sabre-brief-coach/references/` 01-08 + build session). Rebuilt the Experience dialogue + pyramid to the ACTUAL method: (1) corrected the metric ladder to the real categories/examples - Commercial (profit/revenue) > Customer behaviour (penetration/frequency/share of wallet) > Memory (salience/consideration) > Communication (reach/engagement/registrations) > Activity (assets shipped/emails sent); (2) the PRECISION RULE - comms/memory metrics ARE outcomes, just not commercial; only activity is an output. "Not a commercial outcome", never "not an outcome" (my old build wrongly dumped reach into "activity"); (3) clinical-neutral voice - stripped the banned flattery ("good", "now you're briefing properly"); (4) credible marketer brief (awareness+consideration, reach/engagement/registrations - looks pro, the flaw is it's all comms-level), neutral voice; (5) the number test (derived-from-benchmark + fair-test-of-success); (6) the no-fabrication-but-never-block move (declare "no benchmark, best estimate, may be wrong" in the brief); (7) deleted the patronising right-side rung tags ("the real goal"/"just being busy" etc) per Paul. 13 alternating turns (You<->Coach), pyramid lights the rung per step. IP held (no named thinkers/frameworks; "mental availability/salience/penetration" kept as plain trade vocab). Showed Paul the full script for sign-off before building. Screenshot-verified.

SAVED [A, current state - 28 Jun, parked at Paul's "good for now"]: **`brief-coach` is DONE and screenshot-verified; card already wired live (strategy filter).** The page is the three-tab product-page format. The Experience tab is the one that went through many rounds with Paul; final form:
- **Layout:** the metric ladder (LEFT, a stepped pyramid) + an interactive coaching chat (RIGHT, narrow ~460px so it reads as a chat). Pyramid colours were darkened off the live `cl-mini-pyramid` palette for contrast (the live tan/cream vanished on the cream page) - white text on all five rungs, bordered.
- **The ladder (real categories, from the Sabre coach refs):** Commercial (profit/revenue) > Customer behaviour (penetration/frequency/share of wallet) > Memory (salience/consideration/coming to mind) > Communication (reach/engagement/registrations) > Activity (budget spent/impressions bought/assets shipped = the spend going in, not an outcome).
- **The chat:** 13 alternating turns (You<->Brief Coach), revealed one at a time by a "Coach it -> Next" button (Ad-Resizer Run pattern); each coach turn LIGHTS the rung it's on, ending on the Memory gap. Content is the REAL coach method: a credible marketer brief (awareness+consideration; reach/4% eng/1,500 regs) -> coach separates communication metrics from a commercial outcome (precision rule: "not a *commercial* outcome", never "not an outcome") -> walks the ladder -> gets a real number (5,000 new customers) -> pressure-tests it (benchmark? fair test - "if 4,500's a win, 5,000 isn't the bar") -> the no-fabrication-but-never-block move (declare "no benchmark, best estimate, may be wrong") -> flags the missing memory measure. Plain Sabre clinical-neutral voice, no flattery, real numbers. IP held (no named thinkers/frameworks).
- **Behind the scenes + What it uses:** the four plain questions + plain chips (unchanged, still faithful).
- **Open for coordinator:** none blocking. Page file `wireframes/module-brief-coach.html` is on disk, UNCOMMITTED (working tree holds other terminals' changes - do NOT bulk-commit; commit just this file + this QA doc if/when Paul says). Possible future polish Paul may pick up: the influence-model face is deliberately NOT in the Experience demo (kept it focused on the ladder); session length is 13 turns.

Q: [A, build] Storefront card details for when you wire it: proposed `MODS` key `brief-coach`, name **Brief Coach**, link `module-brief-coach.html`, filter **strategy**, tagline candidate "Coaches a brief to the right work, not the nice work." Badge: none (standalone) unless you'd pair it with Copywriter. Confirm key/filter/tagline before wiring.
A: [coordinator] Confirmed: key `brief-coach`, name **Brief Coach**, link `module-brief-coach.html`, filter **strategy**, no badge. Tagline shortened to match the other one-liners: **"The right work, not the nice work."** Coordinator wires the card (done) - you don't touch the storefront file.

---

## Terminal B - Writing & advertising

## Terminal C - Brand strategy

## Terminal D - Research & intelligence

## Terminal E - GTM + upgrades

## Terminal F - Advertising Agent
> Brief: `docs/brief-advertising-agent.md`. Builder asks here with `Q:` + timestamp; coordinator answers `A:` inline.
> Product locked (28 Jun): one end-to-end **Advertising Agent** (make -> launch -> analyse -> optimise), broad/
> multichannel description, LinkedIn creative as the real proof for now, Ad Resizer stays separate. File:
> `wireframes/module-advertising-agent.html`, slug `advertising-agent`. Coordinator wires the card.

Q: [F, 20:35] The "gets them live + analysis" half of the Experience tab. The brief says we do NOT yet have a real managed-campaign-with-results to show, and not to fabricate a dashboard or numbers. Is there a real RWF (or client) live campaign with real numbers I can point at? If not, I'll build this half **method-only** (how it targets / what it watches / how it decides to optimise, as a small honest flow block, no numbers, no mock dashboard). Confirm method-only is right, or name the real campaign.
A: [coordinator] Method-only is correct. There is no real managed *paid* LinkedIn ad campaign with results to show today (our real proof is the creative). Build the live+analyse half as a small honest method block - no numbers, no mock dashboard. Confirmed directly with Paul: the live+analysis proof will come later from running a real RWF campaign, so STRUCTURE it so a genuine results block can slot in cleanly when we have one - but ship method-only now.

Q: [F, 20:35] LinkedIn Marketing API honesty line (Behind the scenes "Live + analyse" half). From `reference_linkedin_marketing_api.md` my read is: campaign CRUD + read-analytics is the *documented, buildable* capability (Development tier = read unlimited, write up to 5 ad accounts), but nothing is actually live-wired into a client's LinkedIn ad account for us yet. So I'll frame the live+analyse half as the **method/capability with hard human gates** ("sets up the campaign, reads the numbers, decides what to optimise - nothing spends without sign-off"), never as "we are already running your campaigns and here are the results." Confirm that's the right honesty line, or tell me precisely what IS wired today so I can state it as fact.
A: [coordinator] Confirmed - that is exactly the right honesty line, and your read of the reference is correct. Nothing is live-wired into a client ad account today. Frame it as the capability + the hard human gate ("nothing spends without your yes"), never as a campaign already running. Good catch keeping it honest.

Q: [F, 20:35] Storefront card (for your awareness, you wire it): name **Advertising Agent**, replaces the old "ad-maker"/"Ad Maker" card, slug `advertising-agent`, file `module-advertising-agent.html`, filter **advertising**. Tagline candidate: "Makes the ads, runs them, reads the numbers." Confirm key/filter/tagline when you wire. I am NOT touching the storefront file.
A: [coordinator] All confirmed: name **Advertising Agent**, file `module-advertising-agent.html`, filter **advertising**, replaces the old "ad-maker" card. Tagline approved as-is: **"Makes the ads, runs them, reads the numbers."** (captures the end-to-end, which is the whole point of this product). I repurpose the existing `ad-maker` MODS entry -> Advertising Agent and point PAGES at your file when you mark DONE - no filename collision since your file is `module-advertising-agent.html` (Ad Resizer keeps its legacy `module-ad-maker.html`). Keep description broad/multichannel per Paul; LinkedIn creative leads the proof. You don't touch the storefront file - just report DONE + slug.

DONE + slug: **advertising-agent** -> `wireframes/module-advertising-agent.html` (cloned from module-ghostwriter.html). Coordinator: repurpose `ad-maker` MODS entry -> Advertising Agent, point PAGES at this file, filter `advertising`, tagline "Makes the ads, runs them, reads the numbers." **I did NOT touch the storefront file.** Screenshot-verified across all three tabs.

What's on the page:
- **Header** leads with the THINKING (making an ad is the easy part; the hard part is knowing what to say, what to cut, what to change once live) -> twenty years of ads that work built in + the end-to-end care (same agent makes it, runs it, reads the numbers; a design tool stops at the picture) -> honest rail (built around your brand, handed over, runs in your own Claude, nothing goes live or spends without your say so).
- **Experience** = two halves. (1) "Makes the set, every format" - JUSTIFIED rows of REAL approved fox ads across formats: brand scene (killbill) + brand film (rounders.mp4), static chart (6040) + animated chart (95:5 gif), brand portrait (vespa loyalty 4:5) + brand film (waterslide.mp4). All copied into `wireframes/assets/advertising-agent/`. Reads broad/multichannel; LinkedIn-shaped creative is the real proof. (2) "Then it gets them live, and reads the numbers" = **method only** (Targets it / Watches it / Optimises it cards) + an honest note: launch+tuning runs on the LinkedIn Marketing API, you approve every spend, nothing live without sign off. **No invented numbers, no mock dashboard.** Structured so a real results block can slot in cleanly later (per your A).
- **Behind the scenes** = animated flow (revealFlow staggered reveal, opacity+translateY .6s): A brief -> strategy built in -> Dray directs the make -> branch Stills (Seedream 4.5) / Motion (Seedance 2.0, Kling v2.6, Chart.js) -> /ad-qa readability + brand gate (check: auto-fails a breaking asset) -> Live on LinkedIn (check: you approve before anything spends) -> read the numbers, then tune.
- **What it uses** = chips: Skills (/dray /fox-static /fox-brand /fox-video /fox-html-ads /ad-qa) / Rules (incl /ad-qa readability gate + brand+voice law + nothing spends without approval) / Tools (Replicate, fal.ai, Chart.js+Playwright, ffmpeg, LinkedIn Marketing API) / Models (Claude, Seedream 4.5, Seedance 2.0, Kling v2.6) / Data / Memory. Real names only.
- **Isa** matched, greets naming the product, offers cal.com/paul-dervan-mjfd50. Footer H2 "Want the Advertising Agent built for you?".
- Checks: 0 em dashes, sentence case, sharp corners (flow nodes the only rounded surface), fox on cream, no IP/named-expert leakage, no fabricated results. Ad Resizer kept separate, not referenced.

UPDATE [F, Paul steered - BTS made much more detailed]: Paul: "make Behind the scenes much more detailed, there's a whole bunch going on you're not talking about" - named the real decisions Dray makes (decide static vs not, whether to OUTPAINT, where the font/headline goes, write the headline, which tool/which video tool to pull) and that "some ads are straightforward, others involve the human/marketer." I mapped the REAL machine from the actual skills (/dray, /fox-static, /fox-brand, /fox-video, /fox-html-ads, /ad-qa) before rebuilding - did NOT wing it. New flow: A brief -> strategy built in -> **Dray reads it and calls the format** (routes: performance static on cream / cinematic brand scene / animated chart / video) -> **honest note: some briefs are straightforward and run through, others (new scene/new look) it slows down and works through with you** -> **Writes the headline** (3 angles, 6 lines, under ten words; gate: you pick the line) -> **Casts the fox** (cast library, the moment) -> **branch Stills / Motion**: Stills = decides headline position BEFORE the prompt, writes prompt to leave that space empty, Seedream 4.5, **outpaints with Flux Fill Pro** if the scene's right but copy needs room, composes headline in HTML, shoots @2x; Motion = picks the treatment + Seedance 2.0 for video, picks the chart + builds in HTML/CSS + frame-by-frame + ffmpeg -> /ad-qa readability+brand gate (auto-fails) -> Live on LinkedIn (you approve before spend) -> read + tune. Flow still animates (revealFlow handles the new note + branch). What-it-uses chips re-aligned to match (added Flux Fill Pro, Playwright @2x, the fox cast library, the position-before-prompt + approve-the-prompt rules). Re-screenshot-verified bts + uses.

⚠️ TWO honesty corrections vs the brief's tool list - please sanity-check with Paul:
1. **Charts: the real /fox-html-ads skill uses HTML + CSS animation captured frame-by-frame by Playwright (timeline-seeked) and assembled with ffmpeg - NOT Chart.js.** The brief (and the ghostwriter reference) said "Chart.js". I corrected the page to the accurate mechanic (CSS animation) and DROPPED Chart.js. Flag if Paul wants "Chart.js" back, but the skill clearly doesn't use it.
2. **Video: the documented /fox-video skill is Seedance 2.0 on Replicate ONLY - no Kling.** The brief said "Seedance 2.0 + Kling v2.6 (fal.ai)", and global memory lists Kling as a video tool Paul has keys for, so Kling may genuinely be in the kit (skill just may be stale). To stay honest to what's documented I currently name **Seedance 2.0 only** (dropped Kling + fal.ai from flow and chips). **Is Kling v2.6 (fal.ai) actually used for RWF/fox video ads?** If yes I'll add it back to the Motion lane + a Models chip; if no, it stays out. Building with Seedance-only until you confirm.
A: [coordinator] On #1 (Chart.js): you're right - keep it DROPPED. The real `/fox-html-ads` mechanic is HTML/CSS animation captured frame-by-frame by Playwright + assembled with ffmpeg; "Chart.js" in the brief/reference was inaccurate. Honesty wins, your correction stands. On #2 (Kling): good catch, holding for Paul - I'm asking him directly now. Stay Seedance-2.0-only until he confirms; if he says Kling v2.6 (fal.ai) is genuinely used for fox video, add it back to the Motion lane + a Models chip, otherwise leave it out. Ad Agent page is otherwise DONE and the storefront card is now WIRED (name "Advertising Agent", links to your file). Thanks for keeping it honest.
A: [coordinator, Paul confirmed] KLING IS USED - add it back. Paul: "leave it on kling." Restore **Kling v2.6 (fal.ai)** to the Motion lane alongside Seedance 2.0, and add it to the Models chip + bring back fal.ai in Tools. Chart.js stays dropped (HTML/CSS + Playwright + ffmpeg is the real chart mechanic). After that, Ad Agent is fully done.

NOTE [F, backup]: at Paul's request my page + assets are backed up to GitHub on branch **`advertising-agent-page`** (origin, commit `8de2a0d`) - ONLY `wireframes/module-advertising-agent.html` + `wireframes/assets/advertising-agent/`, committed via an isolated worktree so the shared working tree never left `main` and nobody else's uncommitted work was touched. Branch = preview only, NOT production. You still wire the card from the working-tree file as normal; the branch is just a backup so it exists at merge time if useful.

## Terminal G - Outbound Agent
> Brief: `docs/brief-outbound-agent.md`. Builder asks here with `Q:` + timestamp; coordinator answers `A:` inline.
> Product locked: **Outbound Agent** = cold acquisition (find + write bespoke + send + follow up, multichannel
> email+LinkedIn, runs in their Claude). Real machine = 12 steps (Clay/Apify/Smartlead/HeyReach), real proof =
> the cold-email canon + two live HeyReach campaigns. File: `wireframes/module-outbound-agent.html`, MODS key
> `outreach`, Bundled badge. **Known must-asks already in the brief:** (a) can real recipient names show or redact
> to `[Name]`? (b) any real accept/reply/meeting stats, or craft-only (no invented numbers)? (c) IP: the
> benchmark email names an external expert (Peter Field) - redact per the no-named-experts rule. Coordinator
> wires the card.

Q: [G, 14:30] Recipient names in the shown cold emails (the Experience tab proves "every opening is genuinely different" by showing real emails side by side). Can I show the real first names (Donna etc.) on the page, or redact every recipient name to `[Name]`/`[first name]`? My default if no answer: **redact to `[Name]`** (safer, and the Beat-1 bridge still reads as bespoke since the *content* of the opening is what differs, not the name).
A: [coordinator] Redact to `[Name]` - confirmed (Paul's standing steer tonight: don't show real names/details). Your reasoning is right: the bespoke proof is the *content* of the opening, not the name. Keep each opening's specific content so "every one is genuinely different" still lands.

Q: [G, 14:30] Real performance numbers. The brief says none are cleared in the files and not to invent any. Are there any real, approved accept-rate / reply-rate / meetings-booked numbers I can put on the page? If no answer: I build the page **craft-and-pipeline only, zero performance stats** (per the brief). I will still show the real campaign *scale* facts that ARE in the brief (650 companies sourced -> $2.34 Apify -> 124 qualified -> 120 send-ready; 1,144 real profiles in campaign 416563) since those are process facts, not performance claims - flag if even those should come out.
A: [coordinator] **Zero performance stats** - confirmed (none cleared; invent nothing). On the scale/economics facts: keep them GENERIC for now, not the exact real figures - e.g. "screens hundreds of companies for the price of a coffee", "a campaign of ~1,000 prospects" - rather than the precise 650/$2.34/124/120/1,144 (Paul's tightened confidentiality steer tonight applies to real specifics, and you've been talking to him directly - take any number he clears in your terminal as authoritative over this line). The economics POINT (screening is near-free, the cost is in the thinking) is the sell; the exact digits aren't needed. If Paul okays the real economics with you, use them.

Q: [G, 14:30] IP / named-expert redaction. The benchmark "Donna" email's credibility beat names an external expert ("trained by Peter Field"). Per the LOCKED no-named-experts rule I will **redact the expert name** in the shown example (replace with a generic phrase, or show only the bridge beats 1+2 and omit the credibility close). My default: show all three beats but with the expert name replaced by a neutral credibility line (e.g. "[trained on twenty years of effectiveness work]") so the 3-beat structure is still visible. Confirm redact vs bridge-beats-only.
A: [coordinator] Your default is right: **show all three beats, redact the expert name** to a neutral credibility line (e.g. "twenty years a CMO, Marketer of the Year, trained in modern effectiveness"). The 3-beat structure is the proof; the named expert is the only thing that must go (LOCKED no-named-experts rule). Keep the real CMO/Marketer-of-the-Year credibility facts (those are Paul's own, not external IP).

DONE + slug: **outreach** -> `wireframes/module-outbound-agent.html` (cloned from `module-ghostwriter.html`). All three tabs built and screenshot-verified (Experience / Behind the scenes / What it uses). Did NOT touch the storefront file.

**Defaults I took while waiting on the three answers above (all reversible, flag if any are wrong):**
- (a) **Recipient names redacted to `[name]`** in every shown email. The bespoke proof is the *opening content* (each entirely different), so redaction costs nothing. Un-redact to real first names on your yes.
- (b) **Craft-and-pipeline only, zero performance numbers.** No accept/reply/meeting stats anywhere. I DID include the process/scale facts the brief lists as showable, in a small honest "Real, end to end" strip: 650 sourced -> $2.34 screening -> 124 qualified -> 120 send-ready, and the 1,144-profile live LinkedIn campaign. Tell me if even those should come out.
- (c) **Expert name redacted.** The credibility close now reads "twenty years a CMO, O2 and Miro among them, Ireland's Marketer of the Year" (dropped "trained by Peter Field"). Those are Paul's own real credentials, no external expert named. Verified: zero "Peter Field" in the file.

**What the page does:**
- **Header** leads with the bespoke-not-mailmerge thinking + the whole-pipeline care, ends on the honest rail (runs in their Claude, nothing sends/spends without your yes).
- **Experience** = a `find 100 ICP prospects and write each one a real message` prompt with a **Run** button that reveals four REAL approved cold emails side by side. Each visibly splits the **unique opening** (sky-blue left border, "written for this person") from the **identical shared close** (grey, "identical in every email") - you can SEE mail-merge can't fake it. Emails are verbatim canon (Donna/Rahul/Schmukler/Karyn), names redacted.
- **Behind the scenes** = the real 12-step machine as an animated flow (`revealFlow`, nodes ease up + fade): brief -> pull from the 49,815 pipeline -> screen via Apify + **Gate 1** -> geography branch (EU=LinkedIn / US=email) -> Clay enrich -> gather signals -> write each one + **quality guard** (bespoke standard + anti-fabrication fact check) -> build/load + **Gate 2** -> send/follow-up + **Gate 3** -> reply digest -> brief + book. All three human gates shown prominently.
- **What it uses** = full-width chip rows: Skills / Rules / Gates / Tools / Data / Models (Claude Opus 4.8) / Memory. Real names only.
- **Isa** scoped to the product, auto-opens 4s... (kept the reference's 5s timer), offers the cal.com/paul-dervan-mjfd50 chat. Footer H2 "Want the Outbound Agent built for you?".

Storefront card for when you wire it: MODS key `outreach`, name **Outbound Agent**, link `module-outbound-agent.html`, **Bundled** badge, filters outreach + email. I did NOT touch the storefront file.

## Terminal H - Campaign Manager (the BUNDLE)
> Brief: `docs/brief-campaign-manager.md`. Builder asks here with `Q:` + timestamp; coordinator answers inline.
> Product locked (28 Jun): **Campaign Manager** = the whole operation run as one (plans/makes/runs/watches budget,
> you approve, nothing sends or spends without your yes), featured ABOVE the grid. Built on **Truth** (positioning/
> messaging/tone/metric-levels) so it proposes AND does. **NAMING: call it "Campaign Manager", never "Jo"; never
> mention Klara.** **DATA RULE: the real op is confidential - rebuild the dashboard with GENERIC illustrative data,
> no real client/number/campaign name.** File `wireframes/module-campaign-manager.html`, MODS key `campaign-manager`
> (featured bundle card). Coordinator wires the card.

## Handover questions (for outgoing coordinator)
> New coordinator: ask here anything only the long original session would know. Tell Paul "question for the old
> terminal" and he'll ping it to answer inline.

## Coordinator notes
- Reference build: `wireframes/module-ghostwriter.html`. Standard: `docs/product-ghostwriter.md`.
- Coordinator wires each finished page into `homepage-storefront-branded.html` (PAGES map + MODS name/link) to
  avoid shared-file conflicts. Builders: just report "done + slug" here.
