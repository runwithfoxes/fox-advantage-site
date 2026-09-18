# Brief: Affirm Healthcare prospect page, build 8:00, meeting 10:00

Paul meets **Suzanne Acton** (leads marketing, Affirm Healthcare) at **10:00
on Mon 11 Aug 2026**. He wants to show her the Kite material customised to
her. Start at 8:00, page driveable by 9:15, Paul reviews before he leaves.

## Read first, in this order

1. `~/paul-hub/clients/affirm-healthcare/CONTEXT.md` (who she is, the pain,
   the AI Writer proposal already sent, June)
2. `docs/kite-retake-notes.md` in this worktree (template rules, and the
   10 Aug rule: NO CLEVER TALK, plain English everywhere)
3. `src/app/for/_components/FidelityDoc.tsx` (the freshest example of a
   per-buyer selection; shipped to Peter Berry 10 Aug and Paul passed every
   line of copy)

## What to build

A gated page at `/for/affirm` (register in `src/lib/prospect-pages.ts` and
`_components/docs.ts`, password `affirm26`), assembled from the existing
library. Dev server: this worktree, port 3012. Do NOT deploy without Paul.

The selection, from her recorded pain (content eats the team's time, no
copywriter, voice drift, ~60 artworks per ingredient change, team on
Copilot and finding it weak):

1. Opening section: what this is, plainly, from her situation. Her truth
   only from CONTEXT.md, nothing invented.
2. What we do (Paul's bio section as on Fidelity, links block included).
3. AI Writers, THE LEAD AGENT for her: the Kite email exhibit. Their exact
   pain is no copywriter and voice drift, and Paul already proposed 3-4
   writers for €6,000 in June. Do not show pricing on the page.
4. Training teams (course scroller + Paul's training copy from Fidelity).
5. Designing team AI adoption (WorkGrid).
6. Redesigning workflows (blueprint slider) if it earns its place for a
   small team; her artwork-versioning pain may fit here. Judgement call,
   listed for Paul either way.

## Gates, and they are hard

- ⛔ Names to verify before anything renders: company recorded as Affirm
  Healthcare, consumer brand Cezanne, contact Suzanne Acton. These came
  via voice transcript. Flag them to Paul, do not guess spellings.
- ⛔ Sabre's real work (Brand Guardian slider, Creative Director module)
  went on Fidelity's page under Paul's explicit ruling FOR THAT PAGE. It
  does not carry to Affirm. Default them OFF; list the question for Paul
  at review, one line. The guardian may be highly relevant to her
  packaging pain, so the question is worth asking, but it is his to
  answer.
- ⛔ No unsourced numbers, no invented facts about Affirm, fictional names
  only inside demonstrations, every class prefixed, nothing hidden behind
  a scroll reveal.
- Copy: draft everything marked ⚠️ DRAFT for Paul's pass. Plain English.
  The 10 Aug lesson in kite-retake-notes.md lists the dead clever lines;
  do not write new ones.
- Drive the page with Playwright before showing Paul (cookie
  `for_affirm_auth=1`), 1440 and 900, no overflow, look at every render.

## How to write. Everything, always.

Chat replies, files, plans, summaries, subagent briefs. Not just documents.

If there is a word that can be said more simply, use the simpler one.
This is how Paul writes. Check it word by word, not at the end.

Don't try to sound clever. No rhythm, no rhyme, no line written to be
quoted, no "not X, but Y", no one-line paragraph dropped for effect.

No corporate words: leverage, unlock, ecosystem, delve, comprehensive,
crucial, landscape, game-changing. No em dashes, use a comma or a full stop.

Explain the thing properly. Don't squash it into a phrase that sounds good.
Say what happened first, then say what you think about it.

Answer what was asked, at the length it was asked, then stop. A one-line
question gets a one-line answer. No closing line summing up what you
just said.

In chat, no headings and no bold labels.

Don't make up details Paul didn't give you.
