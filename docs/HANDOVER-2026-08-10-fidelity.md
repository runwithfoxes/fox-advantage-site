# Handover, 10 Aug 2026, the Fidelity capabilities page

For the fresh terminal taking over the Peter Berry / Fidelity work. Read
these in order before touching anything, they carry the decisions with the
reasons:

1. `~/paul-hub/tasks/fidelity-canada-capabilities-doc-before-12-aug.md`
   (what this deliverable IS: a capabilities document, NOT a proposal, no
   price, due sent by Tue 11 Aug because Paul flies Wed 12)
2. `~/paul-hub/clients/fidelity-canada/meetings/2026-08-07-intro-call-peter-berry-mohd-asher.md`
   (the call record and brief; feed the BRIEF, not the raw transcript)
3. `docs/HANDOVER-2026-08-09.md` and `docs/kite-retake-notes.md` beside this
   file (the Kite template rules this page is built on)

## Where the page is

- Worktree `~/projects/.rwf-wt-kite-retake`, branch `fidelity-v2` (cut off
  `kite-retake` 9 Aug, NOT pushed as of this handover).
- `npm run dev -- -p 3012` (a server is probably already running), then
  localhost:3012/for/fidelity, password `fidelity26`.
- The doc: `src/app/for/_components/FidelityDoc.tsx`, registered in
  `_components/docs.ts`. New library components in
  `_components/library/GrowthManager.tsx` + `growth-manager.css`, case
  blocks in `_components/fidelity-cases.css`.
- The OLD Fidelity page (`/proposals/fidelity`, `fd-` classes) is the copy
  record. Untouched. Do not build on it.

## The page, in order, all agreed with Paul in chat 9-10 Aug

01 What we heard (his agreed copy, their truth, the ONLY place it lives)
02 How I work (Paul's verbatim copy, photo, client names)
03 What Run with Foxes does (four-things figure + placeholder copy)
04 Rethinking the roles (copy only, no exhibit; see the correction below)
05 Designing team AI adoption (WorkGrid + measures)
06 Training teams (course scroller)
07 Redesigning workflows (blueprint slider, kept generic)
08 Building agents: Growth Manager first (Paul's own brief: pipeline board
   with cards that MOVE stage to stage, Jo's morning note that TYPES,
   the 720-wide outreach inbox with five advisor conversations, the
   campaign window in house style with a run playing through it), then
   AI Writers (the Kite email, typing restored in the shared WriterPiece),
   then Brand Guardian
09 The work: Miro, Moloco, Sabre (copy verbatim from the old page)
No close section, no price, no library.

## Paul's rulings this weekend, and they cost rounds - do not relitigate

- **Client names STAY on the page.** His standing practice; all his
  proposals carry them. Eaton Square is the only one he might check.
- **The IP/data/token-cost section is OFF** ("I don't think item 10 is
  needed"). The answer stays ready for the second conversation; the call
  record has Peter calling it "the new unanswerable question".
- **The close band is OFF** ("we've already chatted and they have my
  details").
- ⛔ **ROLES: START WITH THE WORK, NOT THE TEAM.** His words, 10 Aug: "we
  identify the work to be done, not the team. Because part of this is
  removing handovers." A team-first line implies every person keeps a slot
  in the flow, which is the opposite of the point. The section copy
  carries this now; do not drift it back.
- **The Growth Manager is what got Peter's attention** (Elaine described
  the growth engine). It leads the agents. Outreach messages come from a
  fictional TEAM MEMBER, never Peter. Every firm and person is invented,
  advisor-world (Fidelity's B2B runs through independent advisors).
- **Pipeline board is a metaphor, never the real CRM.** No real deal
  names anywhere ("I don't want to see the names").
- **House branding on every window.** The ah- port of the campaign window
  was rejected for exactly this; it is rebuilt with pgm-cw- classes.
- The template lessons from Kite hold: he REMOVES, he rejects anything
  that needs a convention held before the picture reads, no per-person
  rows, no folder windows, no unverified statistics, every class
  prefixed, nothing hidden behind a scroll reveal.

## Gates before this ships (from the task file)

- ⛔ No unsourced numbers. The "Claude 1bn to 19bn" line stays out.
- ⛔ He did not criticise their tools; never write that he did.
- ⛔ Do not state Asher's title or tenure (the transcript contradicts
  itself on both).
- The /illustrative labels on the grid and the growth windows stay.

## Open, in order of urgency (the date is TUESDAY 11 AUG)

1. **Paul's copy passes:** the headline (Kite-pattern placeholder, he owns
   it), the what-we-do paragraph (placeholder, appears twice, marked in
   the file), the roles section (my draft from his call material, marked),
   and the writer section still shows Kite's email with a
   Kite-is-fictional note.
2. **The send email to Peter.** No second meeting is booked, so the email
   holds the thread. A draft is in the chat transcript for Paul's pass;
   nothing is written down elsewhere.
3. **Ship path.** Deploys happen from main. fidelity-v2 is local-only.
   Going live needs: push, merge (or cherry-pick) to main - Paul has not
   ruled which - and `FIDELITY_PASSWORD` set in Vercel, otherwise the
   real gate is the `fidelity26` fallback sitting in the repo. Verify the
   live gate by failing the password once, not by reading the config.
4. **Nothing is committed on fidelity-v2 as of this handover.** Paul was
   asked "commit now?" and has not answered. Never `git add .`; stage the
   explicit paths.
5. Carried for after his trip (back ~24 Aug): the Kite recommend copy and
   Option A still say "fluency map" while that exhibit is parked; the
   "Opus 5 High" badge in ChatWindow's composer names the model on a
   buyer-facing page; the permission checklist is a rule in a doc, not a
   gate.

## How to look at it

Playwright from `~/projects/fox-ads/.venv/bin/python`, cookie
`for_fidelity_auth=1` on `localhost:3012/for/fidelity`. Drive it, don't
read code: watch the board move, the note and the email type, the campaign
run walk its nodes, the grid play its four quarters. 1440 and 900, no
horizontal overflow. A tsc pass proves nothing about the picture.
