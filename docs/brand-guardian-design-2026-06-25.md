# AI Brand Guardian - design

> 25 June 2026. Product #8 in the lineup (`product-lineup-candidates-2026-06-25.md`).
> Looks at any piece of communication - written or visual - and judges whether it is on brand
> or off brand, against the brand's own truth. Built once as a brand-agnostic engine that loads
> a per-brand profile; RWF is the first profile. Handed over to the client to run themselves.

## The core principle

**The Guardian must identify what it is looking at before it checks anything.** The method changes
completely by asset type: a line of copy gets *read*, an ad gets *measured*, a live web page gets its
*code* inspected (you cannot see a hover state in a screenshot). So the architecture is a **router with
specialist checkers behind it**, not a single checker.

## The brand "truth" it loads (the per-brand profile)

- **Positioning** - the position the brand is claiming.
- **Messaging framework** - proposition, pillars, proof, key messages.
- **Voice + tone** - how it sounds + the never-list (em dashes, Title Case, banned words, no rounded corners, etc.).
- **Brand guidelines** - colour palette (hex), typography, logo + clear-space, imagery rules.
- **Distinctive brand assets (DBAs)** - the assets that must appear / be protected.
- **UX/UI guidelines** - components, button states (hover/focus/active), spacing tokens, interaction rules.
- **Per-asset layout specs** - for ads: where every element belongs in each format (the pixel-exact reference).

## Step 1 - Classify the asset

Route on type: raw copy · static image · animated ad (has a layout spec) · deck · live web page (URL + code) · PDF · social image (no spec) · …
This determines which checker(s) run and which method each uses.

## Step 2 - Route to the specialist checkers

| Checker | What it judges | Method | Built on |
|---|---|---|---|
| **Verbal** | voice, never-list, **positioning fit, messaging-pillar alignment** | read text → rules + model judgment | `/voice`, guidelines, messaging framework |
| **Visual fidelity** | pixel-for-pixel: right element, right place, right size, right colour | render → **measure element geometry vs spec/reference** | `/ad-qa` lineage, layout spec |
| **Visual guidelines** | colour, type, logo, clear-space, layout adherence | render → sample + measure + judgment | brand guidelines, DBA audit |
| **Code / UX** | components, button/hover/focus states, spacing tokens, interaction rules | **read the code / DOM**, optionally probe live states | UX/UI guidelines |

## Step 3 - Aggregate

One brand-compliance report: pass/fail per dimension, every flag **located** (where it is) and **actionable** (the fix). For spec-mode visual/UX it certifies; for open-mode (no reference) it flags suspects and grades honestly.

## The honesty rule (measure, don't eyeball)

Where a spec or reference exists, the visual and UX checkers **measure** - deterministic, pixel-exact. A model is never asked "is this on brand?" to catch a 6px misalignment; it samples and judges only the soft stuff. This is the "judgement → ruler → eye" / "measure, never eyeball" discipline already written into the banner machine.

## Build order

1. **✅ BUILT (25 Jun) - Visual fidelity, spec mode, on the ad resizer output.** Engine at `~/.claude/skills/brand-guardian-visual/` (`measure.js` + `capture_spec.js` + `verify_spec.js`, SKILL.md). Drives the ad's 9s loop to each element's settled frame via the renderer's virtual clock, reads `getBoundingClientRect` + computed styles off the live DOM, diffs against a per-size layout spec **captured once from an approved render** (Paul's choice). Reports each flag located (element + px delta + colour/font mismatch); exits 1 on fail = a real CI gate. Proven on the coffee-closers set: 62/62 checks pass deterministically; an injected 24px headline shift + stat recolour were both caught precisely while everything else passed.
2. **✅ BUILT (25 Jun) - Copywriting checker** (the verbal checker). At `~/.claude/skills/brand-guardian-copy/`. Two layers: a deterministic mechanical gate (`check_copy.cjs`, no deps) that flags em dashes, slop words, cliche phrases, generalisations, hedge-filler, staging, Title Case, you-vs-we and flat rhythm - located (line:col) with why + fix, exit 1 on error; plus a Claude judgment pass anchored to the brand `anchor` (positioning + pillars + voice) in `rules/<brand>.json` for voice/positioning/messaging fit. Rules sourced verbatim from the writing-voice spec, site CLAUDE.md, the messaging framework and feedback memory (no invented bans). Proven: clean RWF copy passes 0/0; a slop sample throws 11 errors + 3 warnings, each located.
3. **✅ BUILT (25 Jun) - Visual guidelines (open mode).** At `~/.claude/skills/brand-guardian-guidelines/` (`check_guidelines.js`, profile `profiles/rwf.json`). For assets with no layout spec: measures colour-palette adherence on any image OR HTML (samples rendered pixels, flags off-palette colour with its share + nearest brand colour), plus the CSS never-list (rounded corners, linear gradients, drop shadows) and fonts for HTML. error -> exit 1. Judgment pass (logo/imagery/layout) anchored to the guidelines. Proven: real RWF ad 98.8% (HTML) / 99.8% (GIF) on-palette, clean; an off-brand HTML threw 18 errors (palette + gradient + corners + shadow + Comic Sans).
4. **Code / UX checker** - read a page's code, check components + button states + spacing vs UX/UI guidelines. *(Not built - thin until RWF UX/UI guidelines exist beyond `/branded-page`.)*

**✅ BUILT (25 Jun) - The router** (the front door). At `~/.claude/skills/brand-guardian-router/` (`guardian.js`, skill name `brand-guardian`). Point it at any asset: it classifies (text / image / html) and dispatches - text -> copywriting; image -> guidelines; html -> guidelines + copywriting (on the page's visible text) + fidelity (with `--spec`) - then merges into one VERDICT, exit 1 on any error. Proven: a copy file -> copywriting (11 errors); a real ad GIF -> guidelines (clean); an HTML ad + spec -> all three checkers, one PASS.

**Status: 3 of 4 checkers + the router are built and committed** (`runwithfoxes/claude-skills`). The product is usable as one front-door command today. Remaining: the code/UX checker (then fold into the html route), and the naming decision (let the router own `brand-guardian`; rename the Sabre deck auditor to `sabre-brand-guardian`).

Then the router + report wrap them into one Brand Guardian skill; new brand = new profile, same engine.

## Open questions

1. **Visual-fidelity reference:** when checking a resized ad, does it measure against **the original approved ad** (one size is the truth, others must match its layout logic) or against a **per-size layout spec**? Decides what the engine measures against. *(Needs Paul.)*
2. **Asset intake:** how does the Guardian receive an asset - a file path, a URL, a paste? Likely all three, routed by the classifier.
3. **Skill vs page vs handed-over tool:** is the deliverable a `/brand-guardian` skill (generalised), a product page, or a runnable tool the client gets? (Probably the skill first, then the page.)
4. **UX/UI guidelines source:** do RWF UX/UI guidelines exist yet to test against, or do we define them as part of this build?
