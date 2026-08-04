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
        text: "€187, verified, proof.md, internal renewal data January 2026. Quoting the market, moving you, the paperwork and the note of what was found, all from messaging-framework.md. The €54 increase you gave me is marked internal and stays out. No unverified claim used.",
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
