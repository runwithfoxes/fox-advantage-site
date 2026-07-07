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
Where the two disagree is useful (Sabre's own emails use em dashes and exclamation marks
their guidelines ban).

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
Live deliverable this doctrine already produced: Sabre's own shipped webinar set breaks their
brand book three ways (rounded pill CTA, flat white vs cream, Helvetica vs APK Galeria) -
reproduced faithfully in the calibrate, flagged for the Guardian to report to Sabre. That
guidelines-vs-reality report (step 1) is the Guardian's first client-facing output.

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
- **Copy: one rule from done.** Our OWN best-in-class Sabre emails: 8/9 pass clean; the 1
  fail is a single Title Case mis-fire. Calibrate against best work, not shipped work
  (Sabre's shipped emails break their own rules). Title Case is the checker's main false-fail
  source (fires on names/dates/sign-offs) - fix = skip structural non-prose lines.
- **Graphics colour: photo-aware fix scoped.** Open-mode checker wrongly fails 15/24 approved
  Sabre banner frames - all photo scenes (colour is the wrong question for a photo). Reuse
  the banner machine's known photo zones + settled-frame-per-scene.
- **Photo style: proven three ways** - description, look, and a NUMERIC CLIP fingerprint that
  passed a held-back test (unseen Sabre photo 0.15 = inside the family; off-brand fox 0.42 =
  far outside; on STYLE not colour). Visual "Sabre zone" constellation built (map = intuition,
  % = the truth). Profile: `brand-guardian-guidelines/profiles/sabre.photo-style.md`.
- **Assets on hand:** 40 approved display ads (4 routes x 10 sizes), 60-photo imagery library
  + 8 generation prompts (the style, in words), 11 real emails + our 9 best-in-class ones.
- Engines: `~/.claude/skills/brand-guardian-*` (router + copy + guidelines + visual-fidelity).
  Sabre profiles: `brand-guardian-copy/rules/sabre.json`, `guidelines/profiles/sabre.json` + `.photo-style.md`.

## Next
1. Fix the copy Title Case rule (skip structural non-prose lines).
2. Photo-aware colour fix for the guidelines checker (reuse the banner machine's photo zones).
3. Build the numeric CLIP fingerprint into a reusable scorer (proven; test one call first per credit rule).
4. Build the craft/UX checks (fit, density, count, spacing, contrast) - the everyday core.
   Seed from the Match Gate's proven checks + measurement code, don't start from scratch.
5. Wire everything through the router into one graded verdict, output as sha-pinned receipts.
   Converge brand-guardian-visual + the banner-machine verify lineage into one gate toolkit.
6. Run the honest blind test (assemble a mixed sheet, seal the key, blind grader).
7. Turn the whole proven process into a skill, with the failure-log learning loop built in.
   Rename the old Sabre deck auditor to sabre-brand-guardian so the router owns the name.
8. Client deliverable available now: the Sabre guidelines-vs-reality deviations report.
