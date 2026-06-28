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
| ad-maker | B | | | |
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

Q: [A, build] Storefront card details for when you wire it: proposed `MODS` key `brief-coach`, name **Brief Coach**, link `module-brief-coach.html`, filter **strategy**, tagline candidate "Coaches a brief to the right work, not the nice work." Badge: none (standalone) unless you'd pair it with Copywriter. Confirm key/filter/tagline before wiring.
A: [coordinator] Confirmed: key `brief-coach`, name **Brief Coach**, link `module-brief-coach.html`, filter **strategy**, no badge. Tagline shortened to match the other one-liners: **"The right work, not the nice work."** Coordinator wires the card (done) - you don't touch the storefront file.

---

## Terminal B - Writing & advertising

## Terminal C - Brand strategy

## Terminal D - Research & intelligence

## Terminal E - GTM + upgrades

## Handover questions (for outgoing coordinator)
> New coordinator: ask here anything only the long original session would know. Tell Paul "question for the old
> terminal" and he'll ping it to answer inline.

## Coordinator notes
- Reference build: `wireframes/module-ghostwriter.html`. Standard: `docs/product-ghostwriter.md`.
- Coordinator wires each finished page into `homepage-storefront-branded.html` (PAGES map + MODS name/link) to
  avoid shared-file conflicts. Builders: just report "done + slug" here.
