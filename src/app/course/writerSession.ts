/**
 * ⭐⭐ THE RECORDED SESSION. Module 2, item 04.
 *
 * Paul, 4 Aug 2026, on why this is a recording and not a live chatbot: "I'm not sure there is
 * huge benefit v risk of running it live. There may be benefit of just seeing the prompt and
 * then response getting written in front of them." A thousand learners cannot each get a
 * different answer, because there is no session. There is one session, and this is it.
 *
 * ⛔ IT IS A REAL RUN, NOT A SCRIPT, and the difference matters because we hand people the
 * files. Claude read `writer-dna.md`, `tone-of-voice.md`, `messaging-framework.md`,
 * `format-email.md` and `slop-rules.md` and followed them. Anyone who installs the pack can
 * run the same thing within minutes and compare. ⛔ Never write an invented exchange into
 * this file: a dramatisation that flatters the pack is the one version that can embarrass us.
 *
 * ⚠️ IT IS NOT A RECORDING MADE INSIDE THE CLAUDE PROJECTS UI. Same model, same instructions,
 * different room. Do not label it a screen recording anywhere on the page.
 *
 * ⭐ IT IS THE SECOND RUN. The first produced an email with no greeting, nobody addressed, no
 * occasion and no sign-off, which Paul rejected on sight: "that is not how emails are
 * written." The cause was that the plan named an awareness level and a shape and skipped the
 * REGISTER, which `format-email` calls the decision the rest hangs off. `writer-dna.md` has
 * since gained a register row in its scoring grid so the same miss fails the grid next time.
 *
 * ⭐ RE-RECORDED 4 Aug 2026 under the amended DNA, same three user turns. Paul's question that
 * forced it: "is writer usin kite's positioning?" It was, invisibly, and invisible is a gap
 * when the item's whole job is showing the DNA working. What changed in this run: the plan
 * carries a Positioning line quoting `positioning-statement` and says out loud that the frame
 * slot (car and home insurance) is deliberately dropped in a renewal email to an existing
 * customer; the ledger names `positioning-statement.md`, downgrades €187 from "verified" to
 * "brand file" (claims-and-sources reserves verified for a pasted outside source); and the
 * ledger closes with the source map, which the page renders AS the hover highlights rather
 * than printing it twice. Lines the new instructions do not touch keep the second run's words.
 */

/**
 * ⭐ A SOURCE BEHIND ONE LINE. `file` is the module document as the learner knows it
 * (e.g. "positioning-statement.md"), `quote` is a verbatim line from it. These render as
 * the hover highlights on a finished artefact: the visual proof that the files are driving
 * the writing. They come from the writer's own source map, which writer-dna now makes it
 * close the claims ledger with, so the page shows the map in place instead of printing it
 * as a second block of text.
 * ⛔ A ref is part of the RUN. Never annotate a line after the fact with a file the writer
 * did not name. `scripts/check-sessions.mjs` asserts every quote is really in its file.
 */
export type Ref = { file: string; quote: string };

export type Block =
  | { kind: "p"; text: string }
  | { kind: "plan"; lines: [string, string][] }
  | { kind: "flag"; text: string }
  | {
      kind: "email";
      subject: string;
      body: string[];
      sign: string[];
      /** Index-aligned with `body`. `null` where a line is raw material or plain craft. */
      refs?: (Ref | null)[];
      subjectRef?: Ref | null;
    }
  | {
      kind: "post";
      body: string[];
      /** Index-aligned with `body`, same contract as the email block. */
      refs?: (Ref | null)[];
    }
  | { kind: "audit"; label: string; text: string }
  | {
      kind: "grid";
      title: string;
      rows: [string, number, string][];
    }
  | { kind: "score"; text: string; weakest: string };

export type Turn =
  | { who: "you"; text: string }
  | { who: "writer"; blocks: Block[] };

/** ⛔ Verbatim from the run. Do not tidy, shorten or improve the writer's words. */
export const KITE_SESSION: Turn[] = [
  { who: "you", text: "I need a renewal email for the Payers." },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "Yes. What am I writing from? Renewal dates, last year's numbers, whatever you have.",
      },
    ],
  },
  {
    who: "you",
    text: "Renewals go out in September. Last year 61% of Payers accepted an increase without quoting anywhere else, average €54. We've never contacted them before the letter lands.",
  },
  {
    who: "writer",
    blocks: [
      { kind: "p", text: "Plan, before I write." },
      {
        kind: "plan",
        lines: [
          ["What it is", "One email, from format-email."],
          [
            "Awareness",
            "Feeling the problem. Your 61% is people who noticed and paid anyway.",
          ],
          ["Shape", "Problem, agitate, solution."],
          [
            "Register",
            "A named person speaking for the team. We throughout, Aoife signs it. Not the brand talking, and not a personal note either, because this goes to a whole cohort and a cold personal note reads as performance.",
          ],
          [
            "Segment and pillar",
            "The Payer, at their renewal date. Pillar two, you stop being punished for staying.",
          ],
          [
            "Positioning",
            "Leaning on \"it shops around for you every year and saves €187 on average\", written to the people who dread the renewal letter. One part dropped on purpose: the frame, car and home insurance. An existing customer at renewal knows what we insure.",
          ],
          [
            "Length and takeaway",
            "About 125 words. They leave knowing last year's increase was optional and that this year it is handled.",
          ],
        ],
      },
      {
        kind: "p",
        text: "One question: do they get a renewal date I can put in the email, or is it a batch send with no personalisation?",
      },
    ],
  },
  { who: "you", text: "Personalised. We have the date." },
  {
    who: "writer",
    blocks: [
      {
        kind: "email",
        subject: "Your renewal is due on 14 September",
        subjectRef: {
          file: "format-email.md",
          quote: "Specific beats clever. A date, a number or a name will usually outperform a pun.",
        },
        refs: [
          {
            file: "format-email.md",
            quote: "Name the register in the plan, before writing, and say who signs.",
          },
          {
            file: "positioning-statement.md",
            quote: "because it shops around for you every year",
          },
          null,
          {
            file: "messaging-framework.md",
            quote: "The increase you accepted last year was not the price you had to pay.",
          },
          {
            file: "messaging-framework.md",
            quote: "moves you if there is a better price, and completes the paperwork. You get told what it found and what it chose.",
          },
          {
            file: "proof.md",
            quote: "Average saving the first time we shop around for you: €187.",
          },
          {
            file: "messaging-framework.md",
            quote: "You will not have to do anything, and you will not be overpaying.",
          },
        ],
        body: [
          "Hi Sarah,",
          "Before it renews, we'll quote the market for you.",
          "Last year most people in your position paid the price they were sent. It was a bit higher than the year before, and paying it beat a fortnight of forms and four websites asking the same eleven questions.",
          "That increase was never compulsory. It was the cost of staying put.",
          "So about three weeks before your date we'll check what everyone else would charge for the same cover. If someone is cheaper, we move you and do the paperwork. If nobody is, you stay where you are. Either way you'll get a note saying what we found and what we chose.",
          "The first time we did this, customers saved €187 on average.",
          "Nothing for you to do.",
        ],
        sign: ["Aoife", "Kite"],
      },
      {
        kind: "audit",
        label: "Slop audit, both passes. Three fixes.",
        text: "Cut “seamlessly” from the third paragraph. Cut one em dash that arrived rewriting paragraph two, target zero and it is zero. Broke four near-identical sentence lengths in the middle by letting the four websites line run long.",
      },
      {
        kind: "audit",
        label: "Claims ledger.",
        text: "€187, brand file, proof.md, internal renewal data January 2026. Quoting the market, moving you, the paperwork and the note of what was found, all from messaging-framework.md. The audience and the every-year promise from positioning-statement.md. The €54 increase you gave me is marked internal and stays out. No unverified claim used, nothing marked verified without an outside source. Source map carried on the email, line by line.",
      },
      {
        kind: "grid",
        title: "Against the format (email)",
        rows: [
          [
            "Right shape for their awareness",
            9,
            "Problem, agitate, solution.",
          ],
          [
            "Subject and first line agree",
            9,
            "Subject gives the date, first line acts on it.",
          ],
          [
            "Register named, and carried",
            8,
            "We throughout, one person signs. No title, because the brand does not use them.",
          ],
          ["One idea", 9, "Staying put cost you money, and it is handled."],
          ["Length", 7, "131 words, over the 125 default."],
        ],
      },
      {
        kind: "grid",
        title: "Against the messaging framework",
        rows: [
          ["One segment", 9, "The Payer, at the renewal date."],
          ["One pillar", 8, "Pillar two, with one line of pillar three at the end."],
          ["Proof, with a number", 9, "€187, sourced."],
          [
            "Tone, recognisably",
            7,
            "Dry and flat, and it never celebrates. The device is not used, which is right here.",
          ],
          [
            "Nothing from the never list",
            10,
            "No entry-fee claims, no cheapest.",
          ],
        ],
      },
      {
        kind: "score",
        text: "Format 84% · Framework 86%",
        weakest:
          "Weakest row is length. 131 words, and the middle paragraph could lose a sentence without losing the argument.",
      },
    ],
  },
];

/**
 * ⭐⭐ THE SECOND RECORDING: A SOCIAL POST, AND A GAP IN THE PACK. Recorded 4 Aug 2026,
 * same pack, same amended DNA.
 *
 * ⭐ THE GAP IS THE POINT AND IT IS REAL, NOT STAGED. `tone-of-voice.md` has a specific rule
 * for written posts (second person, added after four first-person drafts died) and its
 * addendum points at `segment-posts.md` for worked examples. That file does not exist in the
 * pack, and neither does a `format-social` craft file. Paul's ruling, 4 Aug: run WITH the gap,
 * because a writer that names what it does not have and refuses to invent the rulebook is the
 * strongest proof the files are driving it. `writer-dna`: "If a file is missing, say which
 * one and what it would have told you. Do not fill the gap yourself."
 *
 * ⛔ Same rules as the first recording: a real run, verbatim, never tidied. The specifics in
 * the spiral (the 61 pages, the Tuesday, the Focus) are Kite's own worked world from
 * `tone-of-voice.md`, not new inventions. Kite is fictional throughout.
 */
export const KITE_POST_SESSION: Turn[] = [
  { who: "you", text: "Now a social post. The renewal letter, for LinkedIn." },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "Yes. What am I writing from? An offer, a date, or just the brand and the letter?",
      },
    ],
  },
  {
    who: "you",
    text: "Nothing to announce. Renewal season starts in September and the letter is the whole subject.",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "flag",
        text: "Two files are missing before I plan. There is no format-social, the file that would hold this format's craft: shapes, lengths, what has to be true before a post is any good. And tone-of-voice points at segment-posts.md for worked examples of written posts, and it is not in the project. I will write from the tone rules I do have. I will not invent the missing rulebook.",
      },
      { kind: "p", text: "Plan, with that said." },
      {
        kind: "plan",
        lines: [
          [
            "What it is",
            "One social post for the feed. No format file exists for it, so no framework is named. The shape is tone-of-voice's five beats, which is a voice spec standing in for a craft file, and I am saying so.",
          ],
          [
            "Register",
            "Second person, the brand narrating your situation back to you, from the tone addendum. Written posts do not get first person: read cold there is no label, so first person reads as nobody.",
          ],
          [
            "Segment and pillar",
            "The Payer, ahead of the September letter. Pillar two, you stop being punished for staying.",
          ],
          [
            "Positioning",
            "All four parts on duty: written to the people who dread the renewal letter, the frame named in the landing, the difference is the whole joke, and €187 carries the proof. Nothing dropped this time, because a feed post is read cold by people who do not know what Kite is.",
          ],
          [
            "Length and takeaway",
            "About 80 words. They leave knowing the renewal increase is optional, and that it can be someone else's job.",
          ],
        ],
      },
    ],
  },
  { who: "you", text: "Go." },
  {
    who: "writer",
    blocks: [
      {
        kind: "post",
        refs: [
          { file: "tone-of-voice.md", quote: "Same car. Same house. Same me." },
          { file: "tone-of-voice.md", quote: "But the price goes up." },
          {
            file: "tone-of-voice.md",
            quote: "A 61-page policy document, a Tuesday, a Ford Focus with 140,000 kilometres on it.",
          },
          {
            file: "tone-of-voice.md",
            quote: "naming the absurd job the category has quietly handed the customer",
          },
          {
            file: "tone-of-voice.md",
            quote: "That's the arrangement. I stay, and I pay more for it.",
          },
          {
            file: "positioning-statement.md",
            quote: "the car and home insurance that renews itself",
          },
          {
            file: "proof.md",
            quote: "Average saving the first time we shop around for you: €187.",
          },
          { file: "tone-of-voice.md", quote: "Kite. It shops around. You don't." },
        ],
        body: [
          "Same car. Same house. Same you.",
          "But the price goes up.",
          "The letter lands on a Tuesday. Sixty-one pages, one number that matters, and the number got bigger. Same Focus in the driveway, same forty minute commute, same nothing-happened.",
          "What are you, a procurement department?",
          "That's the arrangement. You stay put, and it costs you extra.",
          "Kite shops around for your car and home insurance before every renewal. If someone is cheaper, you move. If nobody is, you stay.",
          "Either way you get told what it found. The first time it shopped around, people saved €187 on average.",
          "Kite. It shops around. You don't.",
        ],
      },
      {
        kind: "audit",
        label: "Slop audit, both passes. Two fixes.",
        text: "The spiral's three sentences were landing within five words of each other, so the driveway line now runs long. And searched em dashes again after that rewrite, target zero, it is zero.",
      },
      {
        kind: "audit",
        label: "Claims ledger.",
        text: "€187, brand file, proof.md, internal renewal data January 2026, carried with what makes it true. The 61 pages, the Tuesday and the Focus are Kite's worked world from tone-of-voice.md, not customer claims. No named people, no competitor claims, nothing from the never list. Source map carried on the post, line by line.",
      },
      {
        kind: "p",
        text: "No format grid. I have no format-social file to score against, and a grid against rules I invented would certify nothing. What I checked instead: the addendum's second-person rule carried all the way through, the device used once, the landing flat.",
      },
      {
        kind: "grid",
        title: "Against the messaging framework",
        rows: [
          ["One segment", 9, "The Payer, ahead of the September letter."],
          [
            "One pillar",
            8,
            "Pillar two. The endline touches pillar one, the difference doing its job.",
          ],
          [
            "Proof, with a number",
            9,
            "€187, with what makes it true: shopping around, first time, on average.",
          ],
          [
            "Tone, recognisably",
            8,
            "Five beats, the device once, and the landing does not celebrate.",
          ],
          [
            "Nothing from the never list",
            10,
            "No cheapest, no entry-fee claims, and the automation is not hidden: the post is about it.",
          ],
        ],
      },
      {
        kind: "score",
        text: "Framework 88%",
        weakest:
          "Weakest rows are pillar and tone at eight. The endline is pillar one wearing pillar two's argument, and the spiral gets two lines where the radio version gets five.",
      },
    ],
  },
];

/**
 * ⭐⭐ THE THIRD RECORDING: KITE'S OWN NUMBERS, CHECKED BEFORE THEY ARE BELIEVED.
 * Recorded 5 Aug 2026 for the dataset item. The analyst follows the same discipline the
 * writer follows: claims-and-sources' rule that a number without what makes it true is a
 * boast, applied to a data file instead of a piece of copy.
 *
 * ⛔ A REAL RUN AGAINST THE REAL FILE. `campaigns-2025.csv` was generated first
 * (course-build/build-kite-data.py, fixed seed) and every number in this transcript was then
 * COMPUTED from the file: the duplicate week, the 227/226 row counts, every total, every
 * cost per policy, the March doubling on flat spend, the 59%-spend-9%-volume scale-up, and
 * the 141.6 vs 117.6 halo read. Nothing here was typed from imagination, and re-running the
 * generator reproduces the file byte for byte, so anyone can check the sums.
 *
 * ⭐ THE FILE'S PROBLEMS ARE PLANTED AND THE PLANTING IS DISCLOSED, on the page and in the
 * generator: real files have duplicate imports, demand spikes with outside causes, and
 * channels that flatter themselves. A clean file would teach that checking is a formality.
 *
 * ⚠️ Kite is fictional throughout. Ardline, the letter, the coverage: all inside the
 * fiction, consistent with proof.md, which already names Ardline as the competitor.
 */
export const KITE_DATA_SESSION: Turn[] = [
  {
    who: "you",
    text: "Here's our 2025 campaign file and the notes that go with it. Which channels worked, and where should next year's money go?",
  },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "Before I rank anything I check the file, then I read the year, and then I'll push back a little on the ranking question. Checks first.",
      },
      {
        kind: "flag",
        text: "The file has a fault. The week of 14 July appears twice on social, identical to the cent, 227 rows where the calendar says 226. The notes say the export job was rebuilt at the end of June, and this is what a re-import looks like. Left in, it hands social an extra €1,899 of spend, 89 quotes and 15 policies it never earned. Everything below is totalled on the deduplicated file.",
      },
      {
        kind: "plan",
        lines: [
          [
            "Checks run",
            "Row count against the calendar, duplicate rows, and radio's dark weeks against the changelog's burst dates. One failure, flagged above.",
          ],
          [
            "Denominators",
            "Cost per policy by channel, but not one league table. The notes say each platform counts its own credit, so every channel's number flatters it.",
          ],
          [
            "Outside the file",
            "Anything unusual gets checked against the changelog before a channel takes credit for it. A spike is not a result until its cause is known.",
          ],
        ],
      },
    ],
  },
  { who: "you", text: "Go on." },
  {
    who: "writer",
    blocks: [
      {
        kind: "post",
        refs: [
          {
            file: "campaigns-2025.csv",
            quote: "2025-07-14,social,juggler,1899,89,15",
          },
          {
            file: "data-notes.md",
            quote: "Ardline wrote to its whole book with an average 9% increase",
          },
          {
            file: "campaigns-2025.csv",
            quote: "2025-04-14,price-comparison,switcher,548,67,39",
          },
          {
            file: "campaigns-2025.csv",
            quote: "2025-09-08,radio,payer,4762,23,7",
          },
          {
            file: "audience.md",
            quote: "Car and house, and often a second car or a partner's policy as well.",
          },
          {
            file: "proof.md",
            quote: "Retention looks strong and the book is too young for that to mean much.",
          },
        ],
        body: [
          "The file needed cleaning before it could be believed. One duplicated week on social, removed. Cleaned totals: €308,033 of spend, 5,497 policies across paid.",
          "March was not a marketing result. Quotes doubled on brand-search and on price-comparison in the same four weeks, on flat spend, and the cause is in the changelog: Ardline's increase letter and a week of coverage. The market came to Kite. Neither channel earned the double.",
          "Price-comparison's €10 a policy is real, and it is not a budget instruction. When its spend went up 59% in April and May, volume moved 9%. It harvests Switchers who are already in market. It does not make more of them.",
          "Radio's own line reads terribly: €82,541 for 131 policies, €630 each. But brand-search quotes ran about 20% higher through both bursts on unchanged search spend, so part of search's €34 belongs to radio. How much, this file cannot say.",
          "Social is the dearest working channel at €123 a policy, and the only weight behind Jugglers, who hold several policies per household. Whether €123 is expensive depends on what a Juggler is worth, and their value is not in this file.",
          "And what the file cannot answer at all: whether anyone stays. The proof file says itself that the book is too young to know. I would not move next year's money on acquisition cost while retention is unmeasured.",
        ],
      },
      {
        kind: "audit",
        label: "Checks run.",
        text: "227 rows in the file, 226 after the duplicate came out. Radio absent outside its two bursts, which the changelog says to expect. Cost per policy on the cleaned file: price-comparison €10, brand-search €34, podcast €85, social €123, radio €630.",
      },
      {
        kind: "audit",
        label: "Claims ledger.",
        text: "Every number above is computed from the deduplicated file. The Ardline letter is Kite's own changelog, not coverage I have seen. Platform-credited quotes and policies are read as each platform flattering itself, per the notes, so no figure here is truth to the euro. The pack's €187 and 61% were not needed and were not used. Source map carried on the memo, line by line.",
      },
      {
        kind: "p",
        text: "No ranking table. A league on cost per policy puts radio last and price-comparison first, and both placements would spend next year's money wrongly: comparison cannot absorb another euro, and radio's value is partly sitting in search's column.",
      },
      {
        kind: "grid",
        title: "Against the notes' own rules",
        rows: [
          [
            "Check the file before you believe it",
            9,
            "One duplicate found and removed before anything was totalled.",
          ],
          [
            "One number is not every answer",
            8,
            "Cost per policy reported, then argued with, channel by channel.",
          ],
          [
            "Look outside the file first",
            9,
            "March credited to Ardline's letter, not to the channels that collected it.",
          ],
        ],
      },
      {
        kind: "score",
        text: "File clean after one fix · Six findings, all sourced",
        weakest:
          "Weakest claim is the radio halo: fourteen burst weeks against thirty-four quiet ones is a pattern, not proof. The clean test is one burst off, on purpose, with search watched.",
      },
    ],
  },
  { who: "you", text: "So where does next year's money go?" },
  {
    who: "writer",
    blocks: [
      {
        kind: "p",
        text: "Not far from where it is, yet. Hold price-comparison at its base weight and stop trying to scale it, the April test already paid for that answer. Before touching radio, run one burst dark with search watched: €82,541 a year deserves a real answer instead of a league position. And find out what a Juggler is worth before judging social's €123, because that item decides it. The one move I would refuse is the obvious one, shifting radio's money into price-comparison. The file shows comparison cannot take it, and suggests search's €34 is partly radio wearing different clothes.",
      },
    ],
  },
];
