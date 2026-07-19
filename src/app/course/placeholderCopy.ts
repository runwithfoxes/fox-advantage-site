/**
 * EVERY PIECE OF UNWRITTEN COPY ON /course LIVES IN THIS FILE.
 *
 * BRIEF-A §4: "Every piece of placeholder copy must be unmistakably marked, so it
 * cannot ship believing it is real. The fabrication ban is a hard rule here and it
 * is not limited to images."
 *
 * The marking is STRUCTURAL, not remembered. Placeholder copy reaches the page only
 * through the <Ph> component, which renders it marked. There is no code path that
 * puts an unwritten string on the page unmarked, so this cannot ship by accident -
 * it has to be deliberately deleted from here, which is what "Paul writes the real
 * copy" looks like as a diff.
 *
 * THREE TIERS, because three different things are missing:
 *
 *   "paul"     His own words, from canon, NOT YET WRITTEN AS PAGE COPY. Mostly the
 *              module blurbs, taken from truth/rwf/brief.md SIX-MODULES-TOTAL
 *              .what_each_one_is, where Paul framed all six out loud on 18 Jul.
 *              Real substance, wrong register - it is dictation, not page copy, and
 *              still needs his writing pass. Using it beats inventing six module
 *              descriptions when he has already said what all six are.
 *
 *   "terminal" INVENTED BY A TERMINAL. Sample copy written to a real standard so
 *              Paul can judge rhythm, per §4. None of it is approved. Replace.
 *
 *   "real"     PAUL HAS SIGNED IT OFF. Renders unmarked, not counted. Modules 2 and
 *              3 as of 19 Jul.
 *
 *   "owed"     PAUL OWES THIS AND NOTHING HAS BEEN INVENTED. §4 marks four of these
 *              explicitly (who it is for, what you end with, how long a module
 *              takes) and says do not invent a certificate. The slot renders as an
 *              empty marked slot rather than a plausible sentence, because a
 *              plausible sentence is the failure mode the ban exists to stop.
 *
 * `note` is the hover tooltip: where the words came from, or what is owed.
 */

export type Tier = "real" | "paul" | "terminal" | "owed";

export type Placeholder = {
  tier: Tier;
  text: string;
  note: string;
};

const p = (tier: Tier, text: string, note: string): Placeholder => ({ tier, text, note });

/* COPY PAUL HAS SIGNED OFF. It renders unmarked and is NOT counted as unwritten,
   because it is written. It still lives in this file so that every word on the card
   faces sits in one place and the diff from draft to final is one line. */
const REAL = (text: string): Placeholder => ({ tier: "real", text, note: "" });

/* ---------- hero ---------- */

export const HERO = {
  /* Name is canon: brief:name-SETTLED, Paul 18 Jul, superseding "Advanced AI for
     ambitious marketers". BRIEF-A's wireframe shows the superseded name; raised as
     QA-A Q1 (headline-name) and proceeding on canon until told otherwise. Not a
     placeholder - this is the settled name, so it carries no mark. */
  headline: ["AI fluency for", "ambitious marketers."],

  sub: p(
    "terminal",
    "A free course for marketers on doing the actual work with AI: the brief, the campaign, the ads, the research, the report after it. Six modules, one every fortnight, starting 21 September.",
    "Written by a terminal. REWRITTEN against the marketing-lens directive - the first version read \"a free course for marketers who want to work with AI properly\", which passes if you swap marketer for accountant, and Paul's whole position is that the hook is the marketing, not the AI. The shape is right (what it is, free, the cadence, the date); the words are not Paul's.",
  ),

  /* "free", never "free forever" - brief:positioning.free_principle_amended, Paul
     18 Jul: say free, never bind his future pricing. "Nothing to buy" is canon
     (brief:claims allows "No course to buy, no upsell"), so this line is approved
     claim territory rather than invented copy. */
  freeNote: "Free. Nothing to buy.",
};

/* ---------- the strip ---------- */

/* One line, not a section. The Coursera reassurance device compressed: how big this
   is and how long it runs, before anyone scrolls. Every item is a fact from canon
   (SIX-MODULES-TOTAL, release-model, launch) rather than copy, so the strip itself
   carries no mark. */
export const STRIP = ["6 modules", "one a fortnight", "21 Sep to 30 Nov", "free"];

/* ⭐ BRIEF-A §4: the four formats are "the most concrete fact the course owns and it
   appears on no page anywhere. If one thing survives editing, this."
   Source: truth/rwf/course.md - "Each module ships in four formats: one article
   (the argument), one how-to guide (steps), one downloadable skill where it earns
   its place, one short video walk-through."
   It is identical across all six modules, so it sits once above them rather than
   six times inside them. Raised as QA-A Q4 (four-formats). */
export const FORMATS = p(
  "terminal",
  "Every module has an article that makes the argument, a how-to guide with the steps, a short video walk-through, and, where it earns its place, a skill you can download and run on your own brief.",
  "The FACT is canon (truth/rwf/course.md, approved 4 Jul) and must survive editing. The SENTENCE is a terminal's. Paul's writing pass owed on the wording, not on the substance.",
);

/* ---------- the six modules ---------- */

export const MODULE_BLURBS: Record<number, Placeholder> = {
  /* WRITTEN WITH PAUL BY INTERVIEW, 19 Jul (module-descriptions.md §1). This is
     VARIANT A, 49 words. Still carries a mark because he has NOT signed it off and
     the length is the open question - the cards are uniform, so whatever length
     module 1 lands on is the length all six get. Variant B is his cut, dropping
     "and they are not the obvious ones". */
  1: p(
    "terminal",
    "A small number of habits get you most of the way with AI in marketing work, and they are not the obvious ones. Talking to it instead of typing. Keeping a campaign in one project instead of scattered chats. Showing it the content you liked rather than describing it.",
    "DRAFT written with Paul by interview, 19 Jul - his material, not invented, but NOT SIGNED OFF. Variant A, 49 words. The terminal is deliberately not named here even though it is in the module: it is the single item most likely to make a marketer decide the course is not for them, so it gets answered in the questions block rather than met cold on a card.",
  ),
  /* ✅ SIGNED OFF BY PAUL, 19 Jul. Real copy, so no mark and no entry in the
     not-written-yet count. 41 words.
     Rejected drafts are recorded in module-descriptions.md so nobody re-treads them:
     "Most people open a chat and start writing" (he does not use "most", and it made
     the module about copywriting), "The temptation is to..." (asserts something about
     the reader he will not assert), "Do that once" (the context is living and gets
     revisited), and listing four behaviours (made the module look like only those). */
  2: REAL(
    "An intentional way of setting about marketing work. Techniques for getting clear on what good looks like, for fast research, for building in defences against hallucination. All of it before the work starts, so what follows is quick and consistently good.",
  ),
  /* ✅ SIGNED OFF BY PAUL, 19 Jul. 48 words.
     ⭐ Worth carrying: this is the only module so far that answers "why should I do
     it" - it is about the reader's career rather than the work. The hero paragraph
     carries no version of that argument and probably should. Open with the director. */
  3: REAL(
    "A deep dive into the wide range of marketing capabilities you can now build with AI, and how to get them to a genuinely competent standard. No need to stay specialised as a brand, performance, product or research marketer. You add to what you are already good at.",
  ),
  4: p(
    "paul",
    "Think about the whole system and build every step in it. The signal that starts a campaign, the brief it produces, the work that comes off that, and what happens after it ships.",
    "PAUL'S OWN WORDS, 18 Jul: \"Think about the systems and build ALL THE STEPS in a system.\" The four steps naming a campaign are a terminal's, added against the marketing-lens directive and matched to the Campaign Agent blueprint on this card.",
  ),
  5: p(
    "terminal",
    "Build an agent that does one real piece of marketing work end to end and keeps doing it. The weekly performance read, an outreach sequence, a first draft of every brief that lands.",
    "INVENTED, and this is the one module where canon carries NO framing from Paul at all - only his naming ruling (MARKETING agents, never just \"agents\"). He owes the substance here, not just the wording, so treat the three examples as a terminal guessing at his course.",
  ),
  6: p(
    "paul",
    "Attempt the difficult things. Why customers leave in month two, what the pricing should really be, which half of the media is working. The ones written off as too big to go at.",
    "PAUL'S IDEA, 18 Jul: \"I want people to attempt difficult things.\" He chose TACKLE over solve deliberately - solve promises the outcome, and the module is an invitation to go at things, so a marketer who does not solve it has still done the module. The three examples are a terminal's, added against the marketing-lens directive; the month-two question is the one already drawn into this module's own window.",
  ),
};

/* The line in the card's action slot, pre-launch.
   §3 settled that the click ASKS FOR THE SIGNUP and there is no detail layer, which
   contradicts the wireframe's "What's in it ->" label. Raised as QA-A Q3
   (whats-in-it). Proceeding with a line that names what the click actually does; the
   slot is the same one the real "What's in it ->" takes over post-launch. */
export const CARD_ACTION = "Sign up and we'll tell you when it opens";

/* ---------- the ask ---------- */

export const ASK = {
  /* NOT "we email it to you" - brief:product.access, and Kit got it wrong once
     already: "email is the layer that POINTS INTO it, not the container the content
     arrives in." The email is a notification; the work happens on the page. */
  cardLine: p(
    "terminal",
    "Lands {when}. Sign up and we'll tell you when {title} opens.",
    "Invented. Doctrinally correct (names the module, names the act, does not promise the course by email) but the words are a terminal's.",
  ),
  cardDone: p(
    "terminal",
    "You're in. We'll tell you when {title} opens on {when}.",
    "Invented.",
  ),
  footLine: p(
    "terminal",
    "Sign up and we'll tell you when it opens.",
    "Invented. Sits beside the repeated pill at the foot of the page.",
  ),
  heroDone: p(
    "terminal",
    "You're in. We'll tell you when module one opens.",
    "Invented. Close to the line already on the live page.",
  ),
  /* Error copy. B's route contract, BRIEF-A §5. already:true is a 200 and must read
     as success - the visitor did nothing wrong and must not be told they did. */
  errEmail: p("terminal", "That email address does not look right. Mind checking it?", "Invented."),
  errServer: p("terminal", "Something went wrong at our end. We are on it, try again shortly.", "Invented."),
};

/* ---------- questions ---------- */

export type Question = { q: string; a: Placeholder };

export const QUESTIONS: Question[] = [
  {
    q: "Do I need to be technical?",
    a: p(
      "terminal",
      "No. It starts in the chat window you already have open, on a brief or a campaign you are working on this week. There is a module later on that gets into heavier tooling, and by then you will want it.",
      "Invented, but built on a real canon ruling: brief:lesson-1-REVERSED, Paul 18 Jul, moved the terminal OFF day one because \"just the work required to get into the terminal is enough to stop them from doing the work.\" The answer is right; the words are a terminal's.",
    ),
  },
  {
    q: "Is it really free?",
    a: p(
      "terminal",
      "Yes. There is no course to buy and nothing to upgrade to.",
      "Invented, and deliberately SHORT of a forever promise. brief:positioning.free_principle_amended, Paul 18 Jul: say free, never \"free forever\", never anything that binds his future pricing. Any rewrite has to keep that line.",
    ),
  },
  {
    q: "How much time does each module take?",
    a: p(
      "owed",
      "",
      "PAUL OWES THIS and nothing has been invented. BRIEF-A §4 marks it optional: Anthropic show no time or difficulty anywhere, Coursera do and Paul liked it. Leave the slot, let him decide whether it exists.",
    ),
  },
  {
    q: "What will you email me?",
    a: p(
      "terminal",
      "A note when a module opens, and while you are working through it, one pointer a week. Once you are through, we only write when something has genuinely changed.",
      "Invented, from brief:positioning.email_deal, which specifies the SHAPE and says explicitly that it is a Paul copy pass: \"one pointer a week; once you're through, we only write when something's genuinely changed.\" Restraint promised up front is the point.",
    ),
  },
  {
    q: "Who is it for?",
    a: p(
      "owed",
      "",
      "PAUL OWES THIS. §4 marks it 🔴 explicitly. Canon has only brief:audience - \"Marketers working in Ireland\" - which is a targeting fact, not an answer to who should do this. Not inventing one.",
    ),
  },
  {
    q: "What do I end up with?",
    a: p(
      "owed",
      "",
      "PAUL OWES THIS. §4: \"Their equivalent is a certificate. Do not invent one.\" So nothing is invented here. The question is on the page because §4 lists it as a thing the reader must know by the end; the answer is his.",
    ),
  },
];

/* ---------- bio ---------- */

/* §3: bottom of the page, below the questions, SHORT. Paul's reasoning: it is on the
   homepage already and this is a small website. Do not build it into a feature. */
/* NOT INVENTED, and deliberately so. Paul's bio already exists as APPROVED LIVE COPY
   on the homepage (HomePage.tsx, hpx-bio-body). Writing a second one would have been
   a terminal inventing career history, which is the fabrication ban's oldest rule.
   This is his first paragraph verbatim plus his last line, which is the shortest cut
   that still says who he is and why he can teach this. It carries no placeholder mark
   because it is not placeholder copy - it is live approved copy, trimmed.
   The only decision a terminal made here is WHICH SENTENCES TO KEEP. Paul may want a
   different cut; he cannot want different facts. */
export const BIO_NAME = "/Paul Dervan";
export const BIO_LINES = [
  "Twenty years in brand. Head of brand at O2 Ireland, then CMO at the National Lottery. Head of brand at Indeed and Miro, both global roles. Ireland's Marketer of the Year in 2022.",
  "Run with Foxes is the consultancy. We work with teams to bring twenty years of brand thinking together with AI, so they get faster without losing quality.",
];
