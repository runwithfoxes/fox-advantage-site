# Kite retake, honesty ledger

> The demonstrations-first take, branch `kite-retake`, commit 17e7139.
> What is real, what is demo, and what a real client's page still needs.
> Written 8 Aug 2026 after the build, following the story-first take's
> ledger idea.

## Real and working now

- The page structure, rail (note, bio, free-to-take links), and all nine
  sections render and pass tsc, 1440 and 900, no horizontal overflow.
- Team ascent, blueprint slider, workflow days and fluency map are new
  components, animated play-state-only or pure CSS, so nothing is hidden
  without JavaScript. Totals in the days chart are computed from the stage
  arrays.
- The writer session's source map quotes the brand-pack files verbatim;
  both read from one place in KiteDoc.tsx and a comment says they must
  stay consistent.
- The training and writer sessions play on click, checked by clicking.

## Demo content, would change per client

- Everything in "What we heard" (Kite is fictional).
- The brand pack, both sessions' copy, the fluency map's roles and
  positions, the pricing numbers.
- The workflow stages are generic on purpose and stay generic for real
  clients; only the claim sentence around them gets aimed.

## Not built, named so nobody assumes it

- No photography. The story-first take owns that calibration.
- No pop-out windows with real URLs (native dialog + intercepting routes).
  Half a day when wanted.
- No gift files (red team, AI slop). Needs real content written first.
- No Sabre remake-slider brand exhibit. Needs the real assets and the
  permission check.
- Tracking events for the new section ids not verified against the
  tracking route.

## State at close, 8 Aug night

The page structure Paul built to by direct art direction through the
evening: heard, What Run with Foxes does (figure then copy), then the four
same-level sections in his order: Redesigning workflows (blueprint slider,
his caption owed), Training teams (approved course film at blueprint
width), Building agents (nine sub-exhibits: Writer with the two real
module-2 recordings, Creative Director, Brand Guardian x-ray, the system,
Brief Coach ladder, Outbound window, Lifecycle cascade, Ghostwriter
cascade, Search & GEO cascade with placeholder copy), Designing team AI
adoption (fluency map, rebuild owed from the story terminal), then
recommend, price, library. Rail: photo + /about, /what we do with the
nested agents. Every section: headline, figure, copy.

Owed by Paul: slider caption words, the what-we-do copy rewrite, search
agent copy, comprehension pass on the writer recordings, feedback he
announced at close ("some comments and feedback").
Owed by the story terminal: adoption component, website agent exhibit,
system exhibit ideas.
About ten agents will exist; pages nest the chosen few per buyer.

## 9 Aug

- "How I work" added at 02, between what we heard and what we do. Paul's copy
  verbatim, on the Fidelity page's approved treatment. Photo floats and the copy
  wraps around it; the rail photo came out as a duplicate, and `bio.photo` is now
  optional in ProspectShell.
- Brief Coach swapped its ladder figure for the product page's coaching session,
  played in the house ChatWindow (`library/brief-coach-session.ts`). One click
  plays the lot, same as the two Writer sessions, rather than the product page's
  step-per-press. `LadderFigure` is now UNUSED and parked in the library: the
  coaching names every rung as it climbs, so drawing it as well said it twice.

- Writer cut down to the writing. The folder window, the two recorded sessions
  and everything around them (plan, slop audit, score, claims ledger, composer)
  came off. What is left is the finished email, the finished post, and a dotted
  line on the lines that carry brand. Paul: "we are taking away lots of stuff
  that is too complex when reading cold, and they are seeing a writer and
  seeing it is using brand docs because of the hover."
  ⛔ **The hover names no files.** `positioning-statement.md` read as our filing
  system, not their brand. Four notes only, in `WriterPiece.tsx`: your brand
  positioning, your messaging framework, your approved proof point, your
  approved voice. The email carries voice twice on purpose: the subject, and
  the flat close "Nothing for you to do", which IS the voice.
  Parked, whole and re-addable: `library/kite-pack.ts` (the seven pack files),
  `FolderWindow.tsx`, `writer-sessions.ts` (both recordings), and `WriterPost`
  in `WriterPiece.tsx`. The LinkedIn post came off the same day, Paul: "not
  great writing and don't need it yet."
- Rail is the four things and nothing else. The /about link and the "/on this
  page" pair (What we heard, How I work) came off as "too messy", after the bio
  text on 8 Aug and the photo earlier on 9 Aug. Three cuts, same reason.

- Adoption rebuilt as **WeekGrid**, the exhibit the story terminal owed. One
  scene that changes state, which is the property that makes the blueprint
  slider work and the property `FluencyMap` lacked: fourteen separate readings
  made the reader do the aggregating. A marketing week, 14 people x 10 blocks =
  140 units of work; a year in, 20 turn. The wave sweeps left across the week
  and drifts down the team, the count climbs with it.
  ⭐ **Blocks, not people, is what makes it work at n=14.** A five-bucket fluency
  distribution needs a population to have a shape; Kite is fourteen, which is
  three a bucket and nothing visibly moves. 140 blocks has a shape at fourteen
  people and still has one at a hundred and twenty.
  ⭐ **The numbers are modest on purpose.** 20 of 140, twelve of fourteen moving,
  two moving nothing. Everyone turning blue is the adoption-theatre picture and
  no marketer would believe it. Copy underneath carries the four levers from the
  Sabre research. ⛔ The unverified fear statistics stay OFF the page (see the
  24 Jul Sabre session: four survey figures, no resolvable sources).
  `FluencyMap` parked in the library.

## Candidates taken from the story-first take, not yet built

- The self-rating slider opening the adoption section ("where is your
  team today"), from the course's ModuleArrival pattern.
- A credibility strip (client names) in the rail near the bio.
- The arrival dive as a section transition once client-world photography
  exists.
- The two-pack flip for the writer (3008's device, 8 Aug late): one brief,
  two brand packs, flip and the same email rewrites in the other voice,
  pack files named underneath. A stronger proof that the pack drives the
  writing than a single sourced email.
