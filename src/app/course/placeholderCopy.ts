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

  /* 🔴 NOT SETTLED, AND PROPOSED RATHER THAN DECIDED (director's ruling 4, 19 Jul).
     THE PROBLEM IT IS TRYING TO SOLVE: of the six locked descriptions, only module 3
     answers "why should I do it" - it is about the reader's career rather than the
     work. Everything else, including the hero, says what the course IS. A hero that
     says what a course is but not what it does for the reader is exactly the vagueness
     Paul opened the day complaining about ("it didn't sell the course to me").
     WHAT THIS VERSION DOES: keeps what it is, free, the cadence and the date, and adds
     one clause of the module 3 argument - the work you can take on now that you could
     not before, at a standard worth having.
     ⚠️ IT BORROWS PAUL'S OWN SIGNED-OFF WORDING ON PURPOSE. "A genuinely competent
     standard" is his, verbatim from module 3. Reusing his approved phrase beats a
     terminal inventing a second way to say the same thing, but it does mean the hero
     and card 3 currently rhyme, which he may or may not want. */
  sub: p(
    "terminal",
    "A free course for marketers. The marketing work you can take on now that you could not before, and how to get it to a genuinely competent standard. Six modules, one a fortnight, starting 21 September.",
    "PROPOSED, NOT SETTLED. Paul has approved none of this. It is a version of the open thought from the 19 Jul session: module 3 is the only one of the six that answers WHY SHOULD I DO IT, and the hero carried no version of that argument. The clause \"a genuinely competent standard\" is lifted verbatim from his signed-off module 3 rather than invented, so the hero and card 3 currently rhyme - his call whether that is repetition or reinforcement. Previous version said \"on doing the actual work with AI: the brief, the campaign, the ads\", which named the work but still never said what the reader gets out of it.",
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
  /* ✅ LOCKED BY PAUL, 19 Jul. VARIANT B, 42 words, after seeing both rendered at
     390px: "I'm okay with the number of words... the one with the fewer words is
     good." "And they are not the obvious ones" is dropped - he had already called
     that sentence unnecessary, and the render showed it cost a single line, so it
     was never a layout decision.
     ⚠️ THE TERMINAL IS DELIBERATELY NOT NAMED even though it is in the module. It is
     the single item most likely to make a marketer decide the course is not for
     them, so it gets answered in the questions block rather than met cold here. */
  1: REAL(
    "A small number of habits get you most of the way with AI in marketing work. Talking to it instead of typing. Keeping a campaign in one project instead of scattered chats. Showing it the content you liked rather than describing it.",
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
  /* ✅ LOCKED BY PAUL, 19 Jul. 38 words, opening line his own wording.
     ⭐ THE DISTINCTION FROM MODULE 2, which is what kept earlier drafts vague: module
     2 is ONE part of the puzzle set up properly; module 4 is END TO END, many parts
     joined into a journey.
     NAMING MODULE 3 IN THIS CARD IS DELIBERATE - it makes the ladder explicit, so the
     six read as an order rather than six separate things.
     Deliberately left out: the time trade ("takes time, then saves me time"), which
     is the same promise module 2 makes and would make four read as a repeat of two. */
  4: REAL(
    "Once you can create adjacent value, you can build the whole system. A website, a chatbot, a calendar, the email, the research that lands before a call. Wired together into one experience for the customer, end to end.",
  ),
  /* ✅ LOCKED BY PAUL, 19 Jul. 35 words, largely his own wording.
     ⚠️ THIS IS THE ONLY FIRST-PERSON CARD AND IT IS DELIBERATE. DO NOT NORMALISE IT
     TO MATCH THE OTHERS. The other five describe a subject; this one describes Paul's
     own practice. "Building marketing agents" is the most technical-sounding title of
     the six and the one where a marketer is most likely to think "that is for
     engineers, not me". "I've used" answers that in two words and no impersonal
     version can.
     "Whether that is" is load-bearing - the four are illustrations of a general
     practice, not the module's syllabus. Naming them as JOBS rather than as the named
     agents also keeps distance from the storefront: Outbound Agent, Copywriter and
     Brief Coach are products Paul sells, and a free course page listing them by name
     would read as a shop window. */
  5: REAL(
    "The processes, structures and tools I've used to build agents that do real marketing work, whether that is research, outbound, writing emails or coaching a brief. Getting the workflow right, and getting the quality right.",
  ),
  /* ✅ LOCKED BY PAUL, 19 Jul. 42 words.
     It is a PUSH, not an observation - "some of them might be possible now" was
     rejected as too passive: "now is the time to be ambitious and try and tackle
     difficult problems that are possibly solvable now."
     OPPORTUNITIES sits beside problems on purpose. Problems alone reads as
     firefighting; adding opportunities makes it a choice rather than something you
     are forced into, and keeps the always-positive rule.
     "Even for a big team" carries the scale point WITHOUT "with fewer people", which
     is where the description naturally goes and which trips the rule that AI is never
     framed as replacement. */
  6: REAL(
    "The other modules are about doing your work faster and better. This one is about the marketing problems and opportunities that were never possible at all, even for a big team. Now is the time to be ambitious and take them on.",
  ),
};

/* The line in the card's action slot, pre-launch.
   §3 settled that the click ASKS FOR THE SIGNUP and there is no detail layer, which
   contradicts the wireframe's "What's in it ->" label. Raised as QA-A Q3
   (whats-in-it). Proceeding with a line that names what the click actually does; the
   slot is the same one the real "What's in it ->" takes over post-launch. */
export const CARD_ACTION = "Sign up and we'll email you when it opens";

/* ---------- the ask ---------- */

/* ⭐ SAY EMAIL, NEVER "TELL". Paul, 19 Jul, looking at the 390px render: "I think it
   should say sign up and we'll email you when it opens. My point is we're saying the
   word EMAIL, not tell you."
   It is not a word swap. The journey has to be obvious before anyone types: "we'll
   tell you" is vague about the mechanism and could mean anything, "we'll email you"
   states the medium and sets the expectation. It also matters for consent - someone
   handing over an email address should be told in plain words that email is what they
   get. Applies to every place on the page that describes what happens next, including
   the confirmation states.
   ⚠️ It still never says the COURSE arrives by email. brief:product.access: email is
   the layer that POINTS INTO the course, never the container it arrives in. */
export const ASK = {
  /* NOT "we email it to you" - brief:product.access, and Kit got it wrong once
     already: "email is the layer that POINTS INTO it, not the container the content
     arrives in." The email is a notification; the work happens on the page. */
  cardLine: p(
    "terminal",
    "Lands {when}. Sign up and we'll email you when {title} opens.",
    "Invented. Doctrinally correct (names the module, names the act, does not promise the course by email) but the words are a terminal's.",
  ),
  cardDone: p(
    "terminal",
    "You're in. We'll email you when {title} opens on {when}.",
    "Invented.",
  ),
  footLine: p(
    "terminal",
    "Sign up and we'll email you when it opens.",
    "Invented. Sits beside the repeated pill at the foot of the page.",
  ),
  heroDone: p(
    "terminal",
    "You're in. We'll email you when module one opens.",
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
      "owed",
      "",
      "🔴 PAUL OWES THIS AND IT IS THE MOST CONSEQUENTIAL SENTENCE ON THE PAGE. A terminal had invented an answer here and it was pulled on the director's ruling, 19 Jul: do not invent this one. It is where a marketer decides the course is or is not for them, and it is the question module 1 deliberately does not answer on its face - the terminal is in that module but is kept off the card because it is the single item most likely to put someone off. So this question is carrying that weight on purpose, and the answer has to be Paul's. Canon that constrains it: brief:lesson-1-REVERSED, where he moved the terminal off day one because \"just the work required to get into the terminal is enough to stop them from doing the work.\"",
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
