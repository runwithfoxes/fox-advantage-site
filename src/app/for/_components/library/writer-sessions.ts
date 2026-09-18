// The two writer recordings from course module 2, item 04 "Watch it work",
// lifted verbatim from ~/projects/.rwf-wt-course-modules/src/app/course/
// writerSession.ts on Paul's instruction (8 Aug, late). They are REAL RUNS,
// not scripts: Claude read the Kite pack files and followed them, and every
// ref quote is a real line from its file (the course gate asserts this).
// Never edit an exchange here; re-record instead.
//
// SWAPPABLE PER PROSPECT by design: at assembly time a real prospect's page
// gets recordings made with their own brand pack. This file is the Kite
// (fictional) instance. Paul has a comprehension pass coming on these; do
// not polish them locally.

import type { Turn } from "./chatTypes";

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
 * ⭐⭐ THE THIRD RECORDING: KITE'S OWN NUMBERS, AND AN ANALYST WHOSE JOB IS TO HELP.
 * Recorded 5 Aug 2026. Re-recorded twice the same day on Paul's rulings, and both matter:
 *
 * 1. THE ANALYST HELPS, IT DOES NOT PREACH. It asks what the answer is for, fixes what it
 *    finds instead of announcing it, answers the question it was asked, draws the chart,
 *    and ends on next steps and an offer. Tone: dry, clinical, empirical, never judging
 *    the person or the campaign. It reads from `analyst-dna.md` and `data-rules.md` the
 *    way the writer reads from its DNA.
 *
 * 2. PLAIN ENGLISH THROUGHOUT. Paul, on the first version's closing turn: "this is not
 *    plain", and on the compressed style generally: full sentences, natural word order,
 *    one thought at a time, no trade shorthand ("base weight", "run a burst dark"), no
 *    clipped verdict lines. Explanation over compression, everywhere.
 *
 * ⛔ A REAL RUN AGAINST THE REAL FILES. The dataset was generated first
 * (course-build/build-kite-data.py, fixed seed) and every number here was COMPUTED from
 * it: the duplicate week, the three zero weeks, every total and cost per policy, the 2.0x
 * March quotes on flat spend, the 59%-spend-9%-volume April result, the 20% halo read,
 * and the November and December months where platform claims exceed the policy system's
 * count. Re-running the generator reproduces the files byte for byte.
 *
 * ⭐ THE CHARTS CARRY NO TYPED NUMBERS. A chart block names an entry in
 * `chartData.generated.ts`, which `scripts/build-chart-data.mjs` reads out of the csv.
 *
 * ⚠️ Kite is fictional throughout, and the file's faults are planted on purpose, which
 * the pack's own pages disclose.
 */
