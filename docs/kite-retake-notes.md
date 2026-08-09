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

- Adoption rebuilt as **WorkGrid**, the exhibit the story terminal owed. One
  scene that changes state, which is the property that makes the blueprint
  slider work and the one `FluencyMap` lacked: fourteen separate readings made
  the reader do the aggregating. `FluencyMap` parked in the library.
  ⭐ **Rows are AREAS OF WORK, never people or roles.** Paul: "roles are going to
  change, so it has to be by task or use case... in reality some of those roles
  are going to change and disappear." A grid of job titles dates itself and
  invites an argument with the org chart. Go-to-market, studio, events and
  research are still there in three years.
  ⭐ **Today is not zero.** Seven of the 140 blocks are already done a different
  way before anyone is hired, because every team has a few people quietly doing
  it, and they are SCATTERED across the columns: a tidy first-column stripe
  reads as a designed chart rather than a team.
  ⭐ **Four quarters, animated, and the quarters ARE the mechanism.** Each stop's
  line names what was done that quarter, so the run teaches the four levers from
  the Sabre research instead of a paragraph listing them. 7 → 13 → 21 → 29 → 36.
  Plays itself once on scroll-in, every stop clickable, replay in the bar.
  ⭐ **Blocks, not people, is what makes it work at n=14.** A five-bucket fluency
  distribution needs a population to have a shape; Kite is fourteen, three a
  bucket, nothing visibly moves. 140 blocks reads at fourteen people and at a
  hundred and twenty.
  ⭐ **AND WHAT THAT BOUGHT, under the grid, on the same run.** The grid measures
  a BEHAVIOUR (did the work change); speed, cost and scale are the rung above it
  on the metric ladder and they are what the buyer buys. Three questions in
  Paul's own words, with numbers because "if we're faster, we need to measure by
  how much faster... it is not a yes or no answer": 42% faster (12 days brief to
  done, now 7), 30% cheaper (EUR 1,850 a piece, now 1,290), 11 a quarter that
  used to not happen at all.
  ⛔ **THE FIRST CUT USED BARS AND THEY WERE UNREADABLE.** Paul: "i didn't
  understand the movement of these blue bars. Wasn't clear what direction they
  are going or what is going on with them?" Three faults: a bar that SHRINKS to
  mean better is backwards because longer reads as more; the third measure had no
  baseline outline so it was not the same kind of picture; and none of them showed
  movement, they arrived at a new width. Now each row is a five-point line over
  the same quarters, drawn only as far as the run has got, leaving a dashed
  baseline with the gap shaded. **The shaded area is the benefit.** Days and cost
  fall from a baseline at the top, new work climbs from one at the bottom, one
  formula, and nobody has to work out which way is good. ⭐ The axis runs from
  ZERO: the only honest way to make a 42% fall legible is more pixels, never a
  truncated baseline.
  ⭐ **Nothing moves in Q1**, because Q1 is champions and setup, and a curve that
  pays in month one is the version nobody believes. **And the grid is the ceiling
  on all three**: only changed work can move them, which is why it is one exhibit
  and one run rather than two charts.
  ⛔ The unverified fear statistics stay OFF the page (24 Jul Sabre session: four
  survey figures, no resolvable sources).
  ⚠️ Trap that cost a render: the on-colour was gated on a `-after` root class
  carried over from the two-state cut. Every cell stayed grey while the count
  read 36, and `tsc` and the DOM class count both passed.

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
