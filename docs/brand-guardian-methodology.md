# Brand Guardian - the methodology (how we build a Guardian for any brand)

> Worked out with Paul over 6-7 Jul 2026, refined live and proven on Sabre. This is the
> durable spec AND the client-facing explanation. The product is NOT a Guardian for one
> brand. It is the repeatable PROCESS for building one for any brand. Once proven, it
> becomes a skill. The goal is the best AI brand guardian that exists: senior, not junior.

## The idea in one line
We translate your brand into code, then check everything you make against it. What we
can measure, we measure. What we can't, we judge against your own body of work. What
we're unsure of, we hand back to a person.

## The role - a development COACH, not a final inspector
The Guardian works at the EARLY stage, on work in progress, not as a compliance audit of
finished or live material. Its job is to help make the work better while it's being made.
- Output is formative: "here's what's off, here's the fix, here's how close you are."
- "Borderline, needs a human eye" is the MAIN mode, not a fallback.
- "Reviewing" means "does this look and feel like us yet, and what's holding it back."

## The everyday core - most of the job is stopping work looking ugly
Day to day, the Guardian is a CRAFT and UX quality checker. The high-frequency value is
catching: a headline too big for the space, too many words crammed in, wrong tone, an ad
trying to hold six things, a deck with fifteen logos that looks a mess. Good news: most
"ugly" decomposes into MEASURABLE craft rules - text overflow / line count / font-size vs
box, word count vs format, element and logo COUNT, whitespace and breathing room, spacing,
alignment, contrast/legibility. These are numbers, not opinions, and they are format-aware
(a headline fine on a leaderboard is wrong on a 300x250). The genuine "taste" residual
(the crop is uninspired) is a smaller slice than people assume. RWF's own rules already
work this way ("type needs breathing room ~70-75% width", "text on a photo must hold
contrast", "review at actual size") - craft rules written as code. This is the CENTRE of
the product, not the edge.

## Step 1 - Gather everything (two inputs)
1. Your **guidelines + verbal-identity documents** - the rules you've written down (intent).
2. Your **complete published work** - every ad, email, deck, page and photo (reality).
Where the two disagree is useful (Sabre's brand book locks the tagline as a standalone
lockup, p20; their live emails modify it). CORRECTED 7 Jul: the earlier example here
("their guidelines ban em dashes/exclamations") was wrong - the verbal identity PDF bans
neither and uses em dashes itself; those bans are OUR craft bar, imported via the email
writer. Verification against the actual PDF caught it. Hence the provenance rule below.

## Step 2 - Map every TYPE you make (however many that is)
Categories are few (ads, emails, social, decks, imagery) but inside each are distinct
TYPES, each its own pattern with its own "correct" (a product ad vs a brand ad; a webinar
invite vs a sales follow-up). The total might be 10, 50 or 100. That doesn't matter - this
is where the machine beats a person; a human can't hold a hundred patterns consistently,
the system can, and it sharpens the more you give it. The ONLY requirement is the assets:
enough real, approved examples PER TYPE. Asset-rich type = confident score; asset-poor type
= lean on guidelines + a human eye until the library grows. Before checking, the system
first works out WHICH type an asset is, then checks it against that type's pattern.

## Step 3 - The SCREENGRAB step (capture and compare) - the universal move
Take a **screengrab** of the work, then compare it to reference examples of its type.
Because it's a screengrab, this works on ANYTHING - a photo, a page, a deck slide, an ad,
an email all become a picture, and a picture can be compared. One mechanism covers every
type; we don't need the file, the code or the format. Once captured, compare TWO ways that
back each other up:
1. **The fingerprint (numeric).** Turn the screengrab into numbers (a CLIP embedding) and
   measure its distance to the family. Repeatable, gives a percentage, gate-able. But a
   black box - it can't say WHY.
2. **Vision pattern-recognition (the model looks).** The model looks at the new screengrab
   next to the references and judges "is this like these, and why" - "matches the pattern"
   or "no, the headline's too big and there are five logos where your good ones have one."
   Explainable, semantic, catches content/mood/clutter/defects the number can't. It's a
   judgment, not a fixed measure. (Same native ability that solves a "click the cars"
   captcha: recognising what's in a picture, and whether it's like other pictures.)
One measures, the other understands. Run both: a number you can trust + a reason a person
can act on.
**Judgment protocol (lifted from the fox guide, proven since Feb 2026):** the vision pass
always DESCRIBES FIRST - say what is literally in the picture using no words from the brief
or the brand claim, THEN compare to the references and the brief. Stops the judge seeing
what it expects to see. For motion: sample frames across the loop and review each against
the previous (expression/element drift), per the video-QA scrub rule.

## Step 4 - Translate each type into code (splits by kind)
- **Words (copy).** Analyse all your copy: words used and never used, phrases, rhythm,
  tone. New writing scored on closeness to your standard, each issue located, with a %.
- **Layout & graphics.** Colours, fonts, logo rules and approved designs become code. New
  asset checked to the pixel against the approved version; colours/fonts measured. Plus the
  craft rules above (fit, density, count, spacing, contrast).
- **Imagery (photography) - a STACK of narrow gates, not one score.** Colour is the WRONG
  test for photos (they can be any colour). Each gate catches a different wrong:
  - STYLE (the fingerprint + the style profile in words): does it look like us. Proven on
    Sabre - a held-out photo landed inside the family, an off-brand render far outside, on
    STYLE not colour.
  - CONTENT (vision/description): is it a clear photo of the right thing. Catches "stylish
    nonsense" - a well-styled photo of nothing passes the style test but fails "what is
    this a photo of."
  - MOOD (vision vs the brand mood): an angry face is off-brand for an upbeat brand even if
    the grain and light are perfect. Mostly automatable.
  - DEFECT/INTEGRITY: hallucination artifacts (extra fingers, warped hands, garbled text).
    The HARDEST to catch reliably - machines miss subtle ones too - so this leans hard on a
    human eye. Live risk for brands (like Sabre) whose imagery is AI-generated.
  Honest ceiling: the fingerprint measures BELONGING, not RIGHTNESS. It never decides
  whether this is the right shot for THIS message - that stays a person's call.
- **Web pages.** The convergence case: copy + graphics + imagery at once. A live page is
  CODE, so the measured layer is strongest (exact colours/fonts/spacing off the DOM). But
  the Guardian reviews web IN PROGRESS, so the core question is "does this look and feel
  like a typical [brand] webpage?" - a page-level screengrab fingerprint + vision compare
  against the brand's real pages. Structure/UX (components, spacing scale) is the extra,
  least-built layer; needs the brand to have a body of pages or a design system.

## Step 5 - Grade, don't just pass/fail
- **Breaks a fundamental** - hard, measurable violation. Blocked.
- **Borderline, needs a human eye** - nothing broken but outside the pattern, or a call the
  machine shouldn't make alone. Flagged, not blocked. How it stays honest about the new.
- **Clean** - holds and matches the pattern. Ships.

**Every rule carries PROVENANCE, and the verdict says whose rule it is (added 7 Jul,
vocabulary locked 8 Jul).** FOUR provenance classes, carried through every finding and
printed in the merged verdict ("2 fundamentals: 1 their-book, 1 craft"):
- **their-book** - page-referenced in the client's written guidelines.
- **their-work** - distilled from the client's APPROVED work, not written anywhere: the
  style fingerprint, calibrated palette entries (Sabre's echo grey), voice patterns
  distilled from their materials.
- **our-bar** - the RWF craft standard (em-dash bans, AI-tell rules, rhythm), applied by
  recorded ruling.
- **craft** - measured quality floors (fit, density, contrast, fidelity misses).
Conflating them is how a guardian loses a client's trust ("show me where our book says
that"). Three-tier evidence language for their-book claims: written-rule break >
stated-typical-usage deviation > systemic-pattern deviation (present everywhere in the
book, written nowhere).

**A gate that didn't run can never be CLEAN (8 Jul).** If any applicable checker cannot
run (scorer refuses on a version-pin mismatch, network down), that surfaces as a
could-not-run finding and the merged verdict floors at borderline/human-eye. Silence is
never a pass.

**The verdict is a RECEIPT, not an opinion** (adopted 7 Jul from the Match Gate doctrine,
`~/paul-hub/methodology/dray-calibrate-and-the-match-gate.md`). Every check the Guardian runs
writes a receipt JSON sha-pinned to the exact asset file: every gate run, its measurement, its
tolerance, its result. A stale file voids the receipt. "On-brand" becomes a checkable claim -
the receipt is green or it isn't. Banned phrase: "on-brand on everything that matters." Reds
are reported red. Accepted limits (a client signs off a deviation) are recorded as RULINGS in
the brand profile, never as silently slackened tolerances.

## Step 6 - Prove it on the brand's own work (acceptance test)
Calibrate against approved work, then the HELD-BACK test: hide some of their best pieces
and confirm the system passes the good ones it has never seen and catches the off-brand
ones. Only then trust it. A % is only honest if the reference set spans the type's range.

## The two gates - where the Guardian sits in the production line (7 Jul 2026)
The Match Gate and the Brand Guardian are siblings answering different questions with the same
machinery (render -> measure -> compare to a coded truth -> receipt):
- **Match Gate** (owned by `/banner-machine`, Calibrate mode): "is this the SAME as the
  reference, to the pixel?" For recreating a client's existing work.
- **Brand Gate** (owned by the Guardian): "does this BELONG to the brand?" For all new work.
The handshake: Dray is the front door for ad work; a Calibrate job gates on the Match Gate, a
Produce job and all new creative gate on the Brand Guardian. Nothing is reported "done" to Paul
or a client without a green receipt from the relevant gate. The Guardian is the STANDING gate
at the end of every creative pipeline, not a separate audit someone remembers to run.
Consolidation owed: `brand-guardian-visual` (capture_spec/verify_spec) and the banner-machine
verify lineage are two implementations of the same idea - converge on one shared gate toolkit
so there is a single ruler everything trusts.
Proven techniques to lift into the craft layer: ink-box position measurement (<=3px), median
flat-patch colour sampling (robust to GIF dither), ink-coverage font-weight matching (catches
weight, not just family), containment (nothing clipped - an ugly-catcher in its own right).
Live deliverable this doctrine already produced: Sabre's shipped webinar set deviates from
their brand book TWO ways (flat white scene backgrounds vs the book's stated typical usage
of white as a text colour, p11-12; Helvetica body vs the brand font APK Galeria) - plus a
modified tagline lockup in their live emails. That guidelines-vs-reality report (step 1) is
the Guardian's first client-facing output. CORRECTED 7 Jul: a third claimed deviation
("rounded pill CTA") was OURS, not theirs - Darren's shipped CTA is chamfered (~8-9px
linear 45-degree corner cuts, measured; angular, arguably on-brand); the rounded pill was
our calibrate's build.js. It passed the Match Gate because Gate A measures ink bounding
boxes and corner geometry is invisible to x/y/w/h. CLOSED same night: build.js fixed and
GATE E - SHAPE built into the calibrate's verify.js (per-row corner-inset profiles, all
four corners, tol 2px/row), proven both directions - the chamfer passes, the original
rounded build rebuilt as a regression fails with the curve signature in the receipt. The
whole arc is the methodology working live: verify against the source before a claim ships,
every miss becomes a new gate, the gate proven against the miss that created it.

## The distinctive-asset layer - the recognition gate (added 7 Jul, from Paul's DBA essay)
Everything above answers "is this CONSISTENT with you?" The commercially decisive question is
different: "would someone recognise you in 2-3 seconds, WITHOUT your name?" (Romaniuk's
distinctive brand assets; Paul's proof in market: the unbranded Lottery waterslide - 72%
spontaneous brand attribution; the Dream Inspector - 60% attribution within a year.) An asset
can pass every craft and palette gate and still be generically pleasant work where all the
identification hangs on a logo nobody reaches before they scroll. NAMED FAILURE MODE:
**"consistent but not distinctive"** - the Guardian must see it. This is a rung UP the metric
ladder: memory, not just communication.

**The DBA register.** Each brand profile carries a typed catalogue of its distinctive assets.
The types are NOT just characters (don't confuse the example with the general): colour, logo/
wordmark, shape/pack form/motif, character, tagline/phrase, spokesperson/face, typography,
sonic (jingle/sonic logo/voice), advertising-style grammar, recurring scene/setting. Each
entry: identity spec (features as a checklist), context rules, never-list, reference set,
generation constraints where the asset is AI-made, and measured strength - real fame/
uniqueness scores where /dba fieldwork exists, provisional grades where it doesn't.

**Three checks per piece of work:**
1. **Presence & prominence** - which registered assets appear, how early (inside the 2-3s
   scroll window for video), how large, how central. Detection + geometry + timing.
2. **Rendering fidelity** - is the asset itself right. The check method VARIES BY TYPE:
   colour = exact measurement; logo = geometry, clear space, minimum size, no stretch;
   character = feature-checklist (the fox-guide pattern); tagline = exact string + set
   typography; typography = family + ink-coverage weight; scene/photo style = the style
   fingerprint; ad-style grammar = the calibrated machine's gates; sonic = audio
   fingerprinting (mature tech, NOT yet built here - disclosed gap, on the roadmap).
3. **The masked-logo test (the waterslide test, computable)** - mask the logo and brand name
   out of the screengrab, then run the fingerprint + a blind vision pass: does this still say
   the brand? A pre-flight PROXY for unbranded recognition, run on every asset before it
   ships rather than once a year in a tracker. Calibrate the proxy against /dba fieldwork's
   real in-market scores wherever they exist.

**Context rule (from the fox guide):** asset correctness is contextual, not intrinsic -
"bright settings = grumpy, dark settings = evil; same face, different read." The Guardian
checks the asset IN its context, never in isolation.

**Fresh consistency (from the essay):** assets evolve by building on them, not replacing
them. The register records the core asset AND its permitted evolution; a new execution of a
registered asset is drift to examine and rule on, not an automatic violation.

**Product handshake:** the 7-stage /dba pipeline (audit -> development -> machine ->
questionnaire -> fieldwork -> analysis -> training) DISCOVERS, develops, produces and
MEASURES the assets; the Guardian ENFORCES them in every piece of work, daily, consuming the
register the pipeline produces. Commercially it chains: the audit sells the Guardian, the
Guardian's reports sell the fieldwork.

**Proof this already runs in production (RWF's own systems):**
- The fox guide (`~/projects/fox-ads/docs/FOX_AD_COMPLETE_GUIDE.md`, Feb 2026) is a working
  CHARACTER-asset guardian: written identity spec, expression rules, the describe-first
  blind protocol (describe the work using no words from the brief, THEN compare), per-frame
  drift review, an 85% brief-match gate, no-euphemism verdicts, 21 numbered hard-won
  learnings (the failure log, third independent sighting). Its patterns lift into the
  Guardian's judgment pass wholesale. Also lift verbatim: any AI-generated text visible in
  an image is an automatic flag.
- The banner machine is a working AD-STYLE-GRAMMAR guardian (Match Gate receipts).
- The Sabre photo profile is a working SCENE/STYLE guardian (CLIP fingerprint, held-back test).
The Guardian product is the productization of practice already running - not a spec.

## The learning loop - the difference between a junior guardian and Paul
A junior makes the same mistake forever; a senior learns. This is what makes it best-in-class:
- **Every correction teaches it.** Override it ("that was fine" / "you missed this") and it
  records the ruling and updates calibration, so it never makes that exact mistake twice.
- **The mechanism is the FAILURE LOG -> NEW GATE loop, and it is already proven** (7 Jul,
  Sabre webinar calibrate): Paul caught a clipped wordmark -> containment became a coded gate;
  Paul caught a too-bold weight -> ink-coverage became a coded gate. Every human-caught miss
  becomes a new check in the brand's profile; the gate only gets stricter, converging on
  Paul's eye. The Guardian inherits this mechanism wholesale: a per-brand failure log where
  misses become gates and accepted deviations become recorded rulings.
- **It sharpens with every new approved asset** - the reference sets tighten, patterns get richer.
- **It builds a memory** of your standard, your intent and your edge-case calls, so its
  judgment converges on yours.
- Senior behaviours to build in: PRIORITISE (the one thing that'll sink this, not 20 equal
  flags), COACH (why + how to fix + the stronger idea), know when to BEND (context/type
  aware), be CONFIDENCE-CALIBRATED (loud where sure, defer where not).
- The measure of it becoming YOU rather than a junior: the set of things it must hand to a
  human keeps shrinking, because it has learned what you'd say. That number is watchable.

## The honest line (always say it)
It measures how CONSISTENT something is with you, not whether it's GOOD or the RIGHT choice
for the moment. The system holds the standard; the person keeps the taste.

## What proved out on Sabre (6-7 Jul 2026)
- **Copy: DONE (8 Jul 4622fbc).** Our OWN best-in-class Sabre emails: now 9/9 pass clean
  (was 8/9; the fail was a Title Case mis-fire on a labelled subject line). Fix: skip
  structural non-prose lines (greeting, sign-off + signature block, dates, contact lines,
  placeholders), check content behind Subject:/Preheader: labels, and a per-brand
  properNouns list. Regression file with 3 planted violations still caught. Calibrate
  against best work, not shipped work (Sabre's live emails fall below our craft bar and
  modify their own tagline lockup - see provenance rule).
- **Graphics colour: photo-aware fix scoped.** Open-mode checker wrongly fails 15/24 approved
  Sabre banner frames - all photo scenes (colour is the wrong question for a photo). Reuse
  the banner machine's known photo zones + settled-frame-per-scene.
- **Photo style: proven three ways** - description, look, and a NUMERIC CLIP fingerprint that
  passed a held-back test (unseen Sabre photo 0.15 = inside the family; off-brand fox 0.42 =
  far outside; on STYLE not colour). Visual "Sabre zone" constellation built (map = intuition,
  % = the truth). Profile: `brand-guardian-guidelines/profiles/sabre.photo-style.md`.
- **Assets on hand:** 40 approved display ads (4 routes x 10 sizes), 49-photo imagery library
  (corrected 7 Jul; earlier "60" was wrong) + 8 generation prompts (the style, in words),
  11 real emails + our 9 best-in-class ones (`clients/sabre/notes/email-marketer/Sabre email
  writer - sample emails.docx`).
- Engines: `~/.claude/skills/brand-guardian-*` (router + copy + guidelines + visual-fidelity).
  Sabre profiles: `brand-guardian-copy/rules/sabre.json`, `guidelines/profiles/sabre.json` + `.photo-style.md`.

## Next (status 8 Jul morning)
1. DONE (4622fbc) - copy Title Case fix; 9/9 best Sabre emails, regression proven.
2. DONE (b899b7e) - photo-aware colour; 0/150 approved frames wrongly failing, detector
   validated 99-100% vs LOCK rects, tolerances calibrated from approved work.
3. DONE (1205eca + f5b9c03) - cached CLIP scorer (style_fingerprint.js); version-pinned
   vectors; Sabre family = the 48-photo client canon per Paul's two 8 Jul rulings (Kyoto
   out; our 11 route photos = standing validation set, 7 ON / 4 BORDERLINE / 0 OFF).
   OCR bridge + logo geometry gates moved into step 5's presence gate work.
4. DONE (f3c9484) - brand-guardian-craft, 8 measured checks, calibrated both directions.
   Plus Gate E - SHAPE in the Match Gate (corner profiles, proven vs the rounded-pill bug).
5. IN PROGRESS - DBA register format + presence/prominence gate; RWF register (fox guide =
   the character entry), Sabre register (diamond, wordmark, coral, barcode motif, photo
   style, tagline lockup).
6. DONE (5cfbbf1) - router one-verdict + receipts everywhere; four-class provenance in the
   merged output; could-not-run floor; six acceptance gates green. Convergence = approved
   PLAN only (brand-guardian-router/docs/convergence-plan.md), builds AFTER the blind test.
7. DONE (8 Jul) - blind test PASSED with teeth: 12-item sealed sheet, sha-committed key,
   fresh context-free grader. The product judged all 12 items' ACTUAL content correctly,
   including two sheet-assembly errors by the director (the blind protocol caught the test
   author - a mid-animation frame sealed as genuine, a remade plant sealed unseen). Tools
   alone caught 7/9 defects; the eye pass caught the other two, which became CANDIDATE
   GATES: (a) mark-integrity raster gate (clipped wordmark scored 0.731 just under the
   0.75 template threshold; nothing measures mark-cut-by-frame on rasters), (b) photo-grade
   stats gate (desaturation invisible to CLIP - composition dominates; the fix is family
   saturation/temperature distributions, mean sat 33 vs 96 caught it), (c) graphics-vs-photo
   routing before the fingerprint's error tier (flat endframes all false-pressure the photo
   family bands). Full scoring: clients/rwf/builds/brand-guardian/blind-test/SCORING.md.
   Masked-logo waterslide audition: deferred to the candidate-gate round (sheet had no
   logo-stripped genuine item - add one).
8. DONE (8 Jul, b8e8d5d) - the router owns the brand-guardian name (deck auditor renamed
   sabre-brand-guardian); ONBOARDING.md in the router skill is the stand-up-any-brand
   playbook, proven end-to-end on sabre; the DBA presence leg is wired into the router.
   The three blind-test candidate gates are BUILT and calibrated (a1ad4aa): mark-integrity
   edge scan (overlap NCC, windows hang off the frame, anamorphic sweep = the
   logo-manipulation catch), photo-grade neighbour gate (composition twin speaks alone;
   zero false flags across the family), graphics-vs-photo fingerprint routing. Full blind
   sheet re-run: both tool misses now caught by measurement, all genuine items at honest
   tiers. Still open: gate-toolkit convergence (approved plan, supervised session), motion
   pass, OCR bridge, masked-logo audition, the later-once-alive list.
9. DONE (4e1c563, live) - Sabre brand consistency notes shipped to the client page as
   three neutral rulings for Sabre; report draft in the build folder.

Later, once alive (each auditioned via the blind test before it ships, never on a demo):
stylometry copy fingerprint, pairwise/tournament judging for borderlines, saliency/attention
(Paul leads the thinking), style-specific embeddings, threshold calibration from held-out
sets, sonic-asset checking, brand-drift tracking.
