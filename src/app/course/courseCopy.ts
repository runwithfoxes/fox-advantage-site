/**
 * EVERY WORD ON /course LIVES IN THIS FILE.
 *
 * Renamed from placeholderCopy.ts on 19 Jul, when the last placeholder came off the
 * page. There is no marking machinery left: no tiers, no dotted underlines, no
 * wireframe banner, no <Ph> component. Nothing here is sample text.
 *
 * WHY THE MARKING WENT. It existed so a page carrying invented copy could not be
 * mistaken for the real thing. Paul then wrote all six module descriptions himself
 * over about two hours, and the questions block that carried the remaining markers
 * was deleted outright. Marking his own copy read as a defect.
 *
 * ⚠️ THE SIX DESCRIPTIONS ARE FIXED. They took two hours with him and were corrected
 * twice against his sign-off. Do not reword them, do not "improve" them, do not
 * normalise module 5 out of the first person. If one ever genuinely looks wrong,
 * RAISE IT RATHER THAN CHANGE IT.
 *
 * Full reasoning, rejected drafts and the rules behind each description live in
 * ~/paul-hub/intelligence/course-build/module-descriptions.md. Read that before
 * touching a syllable.
 *
 * Two strings here are still a terminal's rather than Paul's, and they are marked as
 * such in comments rather than on the page: the hero paragraph (a proposal he has not
 * ruled on) and the ask/confirmation lines. They are flagged in QA-A, not hidden.
 */

/* ---------- hero ---------- */

export const HERO = {
  /* ✅ THE NAME IS SETTLED. Paul, asked directly on 19 Jul: no rename. This closes the
     14 Jul "Advanced AI for ambitious marketers" note that had been sitting unresolved
     in canon and that BRIEF-A's wireframe still showed.
     NO TERMINAL FULL STOP after "marketers" - his call, same conversation. */
  /* ⚠️ ONE STRING, NOT TWO. It used to be a two-part array rendered with a <br>,
     which forced the break rather than letting it wrap - so the "wrap" Paul saw on
     desktop was a hard break I had put there. Paul, 19 Jul: "I don't want the headline
     to go across two lines. It can fit on one." The type size now holds it on one line
     at desktop widths; on a phone it wraps naturally, which is fine and expected. */
  headline: "AI Fluency for Ambitious Marketers",

  /* ✅ NOW PAUL'S OWN WORDING, 20 Jul. He dictated the whole string, so it is no longer
     a terminal's proposal. What he was fixing: the page never said anywhere that this is
     an ONLINE course a marketer does themselves, in their own time.
     Three changes from the 19 Jul version: "online" goes in; "one a fortnight" becomes
     "one released every fortnight" (release schedule, not a pace you have to keep); and
     the two new closing sentences carry the self-paced promise and the full date.
     The middle sentence is unchanged - it was already his structure and he kept it. */
  sub: "A free online course for marketers. How to get both speed and quality, how to create adjacent value, and how to set yourself up to take advantage of AI in your marketing. Six modules, one released every fortnight. Do at your own pace. Starts 21st September 2026.",

  /* ✅ APPROVED BY PAUL, 1 Aug 2026. The plain-category line, and the ONLY reason it
     exists is that search and answer engines had no unambiguous statement anywhere on
     this page of what kind of thing it is. The page said "AI fluency" and "course for
     marketers"; it never once said "AI marketing course", which is the phrase a
     marketer who has not heard of it actually types.

     ⭐ THE TEST IT IS WRITTEN TO PASS: can this one sentence be lifted out whole and
     dropped into someone else's answer and still be true and complete? A search engine
     ranked pages; a model lifts a line. See search-doctrine.md, protocol point 6.

     ⚠️ TWO WORDS TRIMMED FROM WHAT PAUL APPROVED, and this is the flag rather than a
     silent edit. He approved "...a free online AI marketing course, six modules, from
     Paul Dervan." The STRIP two elements below already reads "6 modules · one a
     fortnight · 21 Sep to 30 Nov · free", so "six modules" said it twice within a
     screen. To restore his exact wording, put ", six modules," back after "course".

     ⚠️ IT NAMES PAUL ON PURPOSE. Entity resolution is the job here: the sentence has to
     join the course, the category and the person, because that is the join an engine
     cannot make from three separate elements on a page.

     ⚠️ "ONLINE" IS DELIBERATELY NOT IN THIS SENTENCE, and it is not an oversight. The
     first render put it in, which made this line and the first line of HERO.sub below
     it both read "a free online course" back to back. "Online" stays in HIS line,
     because he put it there on purpose on 20 Jul (the page had never said anywhere
     that this is an online course a marketer does themselves).

     ⚠️ PLACEMENT WAS THE OTHER WAY TO FIX THAT ECHO AND IT WAS REJECTED. Moving this
     line below HERO.sub separates the two, but it drops a line between the selling
     paragraph and the signup pill, and Paul's rule for this hero (19 Jul: "as few
     things on as possible so that people can just see it and sign up") outranks a mild
     echo. If the echo ever bothers him more than the step does, the tighter page is
     ONE category sentence, not two: fold "AI marketing course" into HERO.sub and
     delete this. That needs his ruling, HERO.sub is his dictation. */
  definition:
    "AI Fluency for Ambitious Marketers is a free AI marketing course from Paul Dervan.",

  /* "free", never "free forever" - brief:positioning.free_principle_amended, Paul
     18 Jul: say free, never bind his future pricing. "Nothing to buy" is inside
     brief:claims ("No course to buy, no upsell"). */
  freeNote: "Free. Nothing to buy.",
};

/* ---------- the strip ----------
   One line, not a section. The Coursera reassurance device compressed: how big this is
   and how long it runs, before anyone scrolls. Every item is a fact from canon. */
export const STRIP = ["6 modules", "one a fortnight", "21 Sep to 30 Nov", "free"];

/* ⛔ THE FOUR-FORMATS PARAGRAPH WAS DELETED, 19 Jul, AND MUST NOT COME BACK.
   It read: "an article that makes the argument, a how-to guide with the steps, a short
   video walk-through, and, where it earns its place, a skill you can download and run
   on your own brief."
   Paul: "I'm not going to commit to preciseness like a how-to guide short video
   walkthrough. I'm never going to say where it earns its place and I'm not going to
   commit to skills." It is a format promise he will not make before he has built one.
   The director argued to keep it and was overruled.
   DO NOT REINSTATE IT IN ANOTHER FORM - not shortened, not on the cards, not in a
   footnote. The subhead "The six modules" stays; the paragraph under it does not. */

/* ---------- the six descriptions, Paul's own, FIXED ---------- */

export const MODULE_BLURBS: Record<number, string> = {
  /* ✅ VARIANT B, chosen after seeing both rendered at 390px: "I'm okay with the number
     of words... the one with the fewer words is good."
     ⚠️ CORRECTED 19 Jul against his sign-off: a COMMA before "showing", not a full
     stop. It had drifted to a full stop and he caught it.
     ⚠️ THE TERMINAL IS DELIBERATELY NOT NAMED even though it is in the module - it is
     the item most likely to make a marketer decide the course is not for them. */
  1: "A small number of habits get you most of the way with AI in marketing work. Talking to it instead of typing. Keeping a campaign in one project instead of scattered chats, showing it the content you liked rather than describing it.",

  /* ✅ Signed off 19 Jul.
     ⚠️ CORRECTED 19 Jul: "for the metrics" was RESTORED. Paul added it explicitly in
     the session ("You can also include the metrics"), the module changed shape in a
     later rewrite, and metrics did not survive it. That was an error, not a decision.
     Rejected drafts, recorded so nobody re-treads them: "Most people open a chat and
     start writing" (he does not use "most", and it made the module about copywriting),
     "The temptation is to..." (asserts something about the reader he will not assert),
     "Do that once" (the context is living and gets revisited), and listing four
     behaviours (made the module look like only those four things). */
  2: "An intentional way of setting about marketing work. Techniques for getting clear on what good looks like, for fast research, for the metrics, for building in defences against hallucination. All of it before the work starts, so what follows is quick and consistently good.",

  /* ✅ Signed off 19 Jul. The only one of the six that answers "why should I do it" -
     it is about the reader's career rather than the work. */
  3: "A deep dive into the wide range of marketing capabilities you can now build with AI, and how to get them to a genuinely competent standard. No need to stay specialised as a brand, performance, product or research marketer. You add to what you are already good at.",

  /* ✅ Locked 19 Jul, opening line his own wording.
     ⭐ THE DISTINCTION FROM MODULE 2, which is what kept earlier drafts vague: module 2
     is ONE part of the puzzle set up properly; module 4 is END TO END, many parts
     joined into a journey.
     NAMING MODULE 3 HERE IS DELIBERATE - it makes the ladder explicit, so the six read
     as an order rather than as six separate things.
     Deliberately left out: the time trade ("takes time, then saves me time"), which is
     the same promise module 2 makes and would make four read as a repeat of two. */
  4: "Once you can create adjacent value, you can build the whole system. A website, a chatbot, a calendar, the email, the research that lands before a call. Wired together into one experience for the customer, end to end.",

  /* ✅ Locked 19 Jul, largely his own wording.
     ⚠️ THE ONLY FIRST-PERSON CARD, AND IT IS DELIBERATE. DO NOT NORMALISE IT TO MATCH
     THE OTHERS. The other five describe a subject; this one describes Paul's practice.
     "Building marketing agents" is the most technical-sounding title of the six and the
     one where a marketer is most likely to think "that is for engineers, not me".
     "I've used" answers that in two words and no impersonal version can.
     "Whether that is" is load-bearing - the four are illustrations of a general
     practice, not the module's syllabus. Naming them as JOBS rather than as Outbound
     Agent, Copywriter and Brief Coach also keeps a free course page from reading as a
     shop window for products Paul sells. */
  5: "The processes, structures and tools I've used to build agents that do real marketing work, whether that is research, outbound, writing emails or coaching a brief. Getting the workflow right, and getting the quality right.",

  /* ✅ Locked 19 Jul.
     It is a PUSH, not an observation - "some of them might be possible now" was
     rejected as too passive: "now is the time to be ambitious and try and tackle
     difficult problems that are possibly solvable now."
     OPPORTUNITIES sits beside problems on purpose. Problems alone reads as
     firefighting; adding opportunities makes it a choice rather than something you are
     forced into, and keeps the always-positive rule.
     "Even for a big team" carries the scale point WITHOUT "with fewer people", which is
     where the description naturally goes and which trips the rule that AI is never
     framed as replacement. */
  6: "The other modules are about doing your work faster and better. This one is about the marketing problems and opportunities that were never possible at all, even for a big team. Now is the time to be ambitious and take them on.",
};

/* CARD FACE SELLS, CLICK CONVERTS. The action names what the click actually does. The
   whole card body is the tap target; this line is the visible affordance and the
   keyboard control. */
export const CARD_ACTION = "Sign up and we'll email you when it opens";

/* ---------- the ask ----------
   ⭐ SAY EMAIL, NEVER "TELL". Paul, 19 Jul, on the 390px render: "I think it should say
   sign up and we'll email you when it opens. My point is we're saying the word EMAIL,
   not tell you."
   Not a word swap. The journey has to be obvious before anyone types: "we'll tell you"
   is vague about the mechanism, "we'll email you" states the medium and sets the
   expectation. It also matters for consent - someone handing over an email address
   should be told in plain words that email is what they get.
   ⚠️ It still never says the COURSE arrives by email. brief:product.access: email is
   the layer that POINTS INTO the course, never the container it arrives in.
   These lines are a terminal's wording, doctrinally correct but not Paul's. */
export const ASK = {
  cardLine: "Lands {when}. Sign up and we'll email you when {title} opens.",
  cardDone: "You're in. We'll email you when {title} opens on {when}.",
  footLine: "Sign up and we'll email you when it opens.",
  heroDone: "You're in. We'll email you when module one opens.",
  /* B's route contract. already:true is a 200 and must read as SUCCESS - the visitor
     did nothing wrong and must not be told they did. */
  errEmail: "That email address does not look right. Mind checking it?",
  errServer: "Something went wrong at our end. We are on it, try again shortly.",
};

/* ---------- sharing ----------
   Added 20 Jul. ⚠️ EVERY STRING HERE IS A TERMINAL'S PROPOSAL, NOT PAUL'S, and is
   flagged to him rather than treated as settled. Same status as the ASK lines above.

   The constraints they were written against:
   - the page never begs. "Know someone" is an offer, not a request, and it is only ever
     shown to somebody who has already signed up;
   - no salesy closer, no "spread the word", no exclamation;
   - `text` is what the native share sheet pre-fills into WhatsApp or Messages, so it has
     to read as a sentence a person would actually send, not as ad copy. */
export const SHARE = {
  /* ✅ PAUL'S OWN WORDING, 20 Jul. He replaced the terminal's proposal outright.
     What he cut: "Know someone who would get something out of it?" It asks a question
     the reader has to answer before doing anything, and "get something out of it" is
     hedged and faintly apologetic about the course.
     His version is an instruction, not a question, and it flatters the person being
     sent it rather than the course being sent. */
  lead: "Share with brilliant marketers you know",
  /* shown on a module card, where the context is already on screen */
  cardLead: "Pass this module on",
  linkedin: "Share on LinkedIn",
  native: "Share",
  copy: "Copy link",
  copied: "Link copied",
  /* the native sheet's own fields */
  title: "AI Fluency for Ambitious Marketers",
  text: "A free online course for marketers, six modules, starts 21 September.",
};

/* ⚠️ ABSOLUTE, AND HARDCODED ON PURPOSE. A share target cannot resolve a relative URL,
   and window.location is not available when the component first renders on the server.
   This is the canonical address of the page; if the route ever moves, this moves with it
   and so does `alternates.canonical` in page.tsx. */
export const COURSE_URL = "https://runwithfoxes.com/course";

/* ⛔ THE QUESTIONS BLOCK WAS DELETED IN FULL, 19 Jul, including its three unanswered
   slots. The reasoning, recorded so it does not creep back:
   - time per module is a number Paul does not have and will not invent;
   - who it is for belongs in the hero as a line, not buried in an accordion;
   - "do I need to be technical" only matters if the page mentions the terminal, and
     this page does not.
   If real questions arrive from real signups, it gets rebuilt from their actual
   wording rather than from a terminal guessing what people will ask. */

/* ---------- bio ----------
   Bottom of the page and SHORT. Paul's reasoning: it is on the homepage already and
   this is not a big website. Do not build it into a feature.
   NOT INVENTED. This is his approved homepage bio (HomePage.tsx, hpx-bio-body),
   trimmed. Writing a second one would have been a terminal inventing career history.
   The only decision taken here is WHICH SENTENCES TO KEEP. */
export const BIO_NAME = "/Paul Dervan";
export const BIO_LINES = [
  "Twenty years in brand. Head of brand at O2 Ireland, then CMO at the National Lottery. Head of brand at Indeed and Miro, both global roles. Ireland's Marketer of the Year in 2022.",
  "Run with Foxes is the consultancy. We work with teams to bring twenty years of brand thinking together with AI, so they get faster without losing quality.",
];
