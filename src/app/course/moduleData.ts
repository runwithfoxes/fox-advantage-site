/**
 * THE MODULE FORMAT. Types, plus module 1's items.
 *
 * Built 19 Jul 2026 with Paul, after seven prototypes against his real content.
 * Full spec and the reasoning: ~/paul-hub/intelligence/course-build/module-format-spec.md
 *
 * ⭐ THE ONE IDEA: a module is not a page, it is a LIST OF TYPED ITEMS. Each item says
 * what kind of thing it is; the renderer knows how to draw each kind. Nothing in the
 * layout knows how many items there are, so a module can be three things or twenty.
 *
 * ⭐ WHAT THIS MEANS IN PRACTICE: adding module 2 means writing a new array in this
 * folder. It does NOT mean a new page, a new layout, or a new decision about shape.
 * That is the whole point and it is the thing Paul asked for.
 *
 * ⚠️ NOT LOCKED. Paul, 19 Jul: he likes the structure and format "a lot" and wants to
 * keep it. That is not locked. Nothing here is locked until he says the word.
 *
 * ⚠️ EVERY WORD IN `text` AND `prompt` IS PAUL'S, VERBATIM, from "20 things I do to get
 * more out of AI" (21 May 2026). Do not reword, do not tidy, do not improve. The only
 * things added here are the TYPE of each item and whether it needs a picture.
 * Anything Kit wrote carries `placeholder: true` and must be replaced before this ships.
 */

import { PERSONAS } from "./personas.generated";

export type LinkEntry = {
  title: string;
  by: string;
  url: string;
  /** ⚠️ PAUL'S TO WRITE. Never invent a reason something is worth a marketer's time. */
  why: string;
  /**
   * ⭐ OPTIONAL, AND THE EXCEPTION. Paul, 19 Jul: "most links are going to be just links,
   * not thumbnails." A plain row is the DEFAULT. Add a picture only when a link is worth
   * featuring, because every thumbnail is a capture job he has to do.
   * Captured once and stored, NEVER fetched live: slow, breaks, and it would put a
   * learner's page load through someone else's server.
   */
  thumb?: string;
};

export type Item = {
  /** Title. Imperative where possible. Paul's own headings work as-is. */
  t: string;
  /** His words, verbatim. */
  text: string;
  /** The exact words to paste. Lifted out of his prose into its own block. */
  prompt?: string;
  /**
   * The words on the copy button, for a prompt long enough to be a button rather than a
   * visible block. Names WHAT is being copied, so no surrounding label has to.
   * Paul, 2 Aug 2026: "we can just use the copy button 'Copy CFO prompt'".
   * Ignored for short prompts, which render in full and need no naming.
   */
  promptLabel?: string;
  /** Short description of the screenshot needed. Its presence means the item owes a picture. */
  grab?: string;
  /**
   * ⭐ A DRAWN FIGURE that fills this item's picture slot, by the name the figures page
   * prints, e.g. "fig-14". The figure itself lives in `figures/` and knows nothing about
   * items, so this is a pointer and not a coupling: the layout can change under it.
   * Source: ~/paul-hub/intelligence/course-build/course-figures.html, extracted by
   * `scripts/extract-figures.py`.
   *
   * ⚠️ A figure and a `grab` are not the same thing. A grab is a screenshot of the real
   * product; a figure is a drawing of the move. An item can want both, and the renderer
   * shows the figure when there is one. PAUL'S CALL whether a figure retires the grab.
   */
  figure?: string;
  /**
   * ⭐⭐ THE LONG ARTICLE. A run of BEATS, each one a figure followed by Paul's copy for that
   * figure. Added 3 Aug 2026 for "Break down and rebuild", and it is the SECOND ITEM TYPE the
   * 2 Aug note predicted would be needed once one item carried several moves.
   *
   * ⭐⭐ IT RENDERS ONLY IN THE OPENED WINDOW. Paul, 3 Aug, correcting a first attempt that
   * stacked four figures in the list: "We show one figure only. And then we show them all in
   * the longer article with my copy after each one, as I explain it... You can use the
   * youtube transcript as one we [show] before we click to open window."
   *
   * So an item like this reads twice, differently and on purpose:
   *   in the LIST   `figure` alone, one drawing, plus the short `text`. A teaser.
   *   OPENED        `text`, then every beat in order. The article.
   * ⛔ The item's own `figure` is NOT drawn again inside the window, or the teaser appears
   * twice. Whichever figure is the teaser should also be a beat, in its place in the argument.
   *
   * ⛔ IT IS NOT A GALLERY. This item earns four pictures because its lesson IS the
   * repetition: the same three cards, and only the first and last change, which is the figure
   * system's own founding argument (fig-05's note on the figures page). Four nice drawings
   * that do not share a move do not qualify.
   *
   * ⛔⛔ A BEAT IS PROSE THEN ITS PICTURE, and this REVERSED on 3 Aug 2026 for a reason worth
   * knowing. He first described it as "my copy after each one", which is figure then copy, and
   * it was built that way. He then WROTE the article, and every passage in it is followed by
   * "[figure here]". The artifact beat the description, because a thing he wrote is more
   * reliable evidence than a sentence about the thing. FLAGGED TO HIM either way.
   *
   * ⭐ IT ALSO SETTLES A RULE THAT LOOKED BROKEN. "Put the figures above my writing... like a
   * simple banner and then I explain below" was scoped by his own next words: "FOR WHEN I HAVE
   * JUST ONE FIGURE IN AN ITEM." One figure is a banner over the prose. A long article with
   * several is prose, then the picture of what you just read. The two rules never collided.
   *
   * ⚠️ `text` IS OPTIONAL, and beat one uses that. The item's own `text` is the article's
   * opening passage, so the first figure follows it and carries no prose of its own.
   * ⚠️ EVERY `text` HERE IS PAUL'S TO WRITE. Anything standing in for him is marked.
   */
  beats?: { text?: string; figure: string; placeholder?: boolean }[];
  /**
   * ⭐ A STANDALONE FIGURE FILE under /public, for a figure that is not in
   * `course-figures.html`. Added 2 Aug 2026 for the CFO persona figure.
   *
   * ⛔ WHY NOT `figure`, AND WHY AN <img> RATHER THAN INLINE. Library figures carry
   * their own <style> SCOPED TO THEIR OWN ID. The standalone export deliberately strips
   * that scope (see HANDOVER-fig-persona-2026-08-02.md, warning 1), so inlining it beside
   * another figure would put unscoped `svg{--paper:...}` rules onto every other SVG on the
   * page. An <img> makes the SVG its own document, which isolates the CSS in both
   * directions. Its animation still runs; a web font would not load, so the file falls
   * back to Menlo for its two labels.
   *
   * ⚠️ TEMPORARY BY DESIGN. Paul signed the figure off on 2 Aug, so `add-fig-32.py` will
   * put it in the library. When it lands, switch this item to `figure: "fig-32"` and
   * delete the file from /public, or the same drawing exists in two places and they drift.
   */
  figureFile?: string;
  /** Other people's work. */
  links?: LinkEntry[];
  /**
   * ⭐ FURTHER READING FOR THIS ONE ITEM, added 2 Aug 2026 on Paul's instruction: "Here is
   * a link for reading more on this topic... As a link below my text." Renders under the
   * prose, labelled "More on this".
   *
   * ⛔ NOT `links`, AND THE DIFFERENCE MATTERS. `links` makes the WHOLE ITEM a list of
   * other people's work: kindOf() checks it first, so putting one here would silently flip
   * item 01's type chip from "Show and copy" to "Worth saving" and move it under the wrong
   * filter. This is a footnote on an item that is about something else. kindOf() ignores it
   * on purpose.
   *
   * ⭐ WHY THE SLOT IS NOT CALLED "GUIDE". Paul's opening promises "links to guides", so
   * that name would pay the promise off literally, but this slot will also hold videos,
   * docs and articles across six modules and "guide" would be wrong on those. His call if
   * he wants the tighter word.
   *
   * ⚠️ NO `why` FIELD, DELIBERATELY. LinkEntry has one and it is marked Paul's to write.
   * A one-line reason invented on his behalf is exactly the fabrication the rest of this
   * file bans, so the shape here cannot hold one.
   * ⛔ STRIP TRACKING PARAMETERS BEFORE ADDING A URL. The link below arrived carrying
   * ?utm_source=chatgpt.com, which credits someone else's referrer and tells every reader
   * where Paul found it.
   */
  reading?: { title: string; by: string; url: string }[];
  /** Marks anything Kit wrote standing in for Paul's words. Drives the build layer. */
  placeholder?: boolean;
};

export type ModuleDef = {
  n: number;
  title: string;
  /**
   * ⭐ THE BLUE WORDS IN THE PAGE HEADLINE, PAUL 2 Aug 2026 ("in our page headlines, let's
   * try adding a blue word"). An exact substring of `title`, rendered in Fox blue. The
   * house pattern, already on the homepage as .hpx-hl.
   *
   * ⛔ DECLARED, NEVER DERIVED. The obvious shortcut is a rule like "colour the last word"
   * or "colour after the comma". It breaks immediately across the six: "Slow, then fast"
   * has a comma, "System thinking" has nothing to split on, and "The 80/20 of AI" would
   * give you a two-character highlight from one rule and a number from another. A wrong
   * guess here is silent, because a headline always renders. So each module names its own.
   *
   * Optional. No value means a plain headline, which is where modules 2 to 6 sit.
   * If the string is not found in the title, the headline renders plain rather than
   * throwing: a missing highlight is a cosmetic loss, never a broken page.
   */
  titleHl?: string;
  when: string;
  on: string;
  /** ⭐ NOTHING SAYS LIVE UNTIL IT IS LIVE. Same doctrine as courseModules.ts:
   *  a module reads live only when its date has passed AND it is genuinely built.
   *  Never simplify to a date check. */
  built: boolean;
  /** Paul's locked description, verbatim from courseCopy.MODULE_BLURBS.
   *  ⚠️ STILL LOAD-BEARING EVEN WHEN `opening` REPLACES IT ON THE PAGE: it is the page's
   *  meta description ([n]/page.tsx) and the "what this module is about" line in Isa's
   *  system prompt (api/chat/route.ts). Never delete a blurb to make room for an opening. */
  blurb: string;
  /**
   * ⭐ THE WORDS AT THE TOP OF THE MODULE PAGE, PAUL 2 Aug 2026. Blank line between
   * paragraphs, same convention as an item's `text`.
   *
   * ⭐ WHY IT IS NOT THE BLURB. The blurb is a DESCRIPTION, written for someone deciding
   * whether to open the module, and it is reused on the course index and in metadata. The
   * opening is Paul TALKING TO SOMEONE WHO HAS ALREADY ARRIVED. Different jobs, different
   * register, and merging them would drag the index-card copy into first person.
   *
   * Optional. A module with no opening falls back to rendering its blurb, which is where
   * modules 2 to 6 sit until Paul writes theirs.
   */
  opening?: string;
  /** Where the module's content came from. Optional: only state it when it is a real,
   *  citable thing. Never invent a provenance to fill the meta row. */
  source?: string;
  items: Item[];
};

/** The kinds the renderer knows how to draw. */
export type Kind = "read" | "take" | "steps" | "links";

/**
 * Type is DERIVED from which fields an item has, not declared separately.
 * One less thing to get wrong, and it means Paul's material decides the type
 * rather than someone remembering to set it.
 */
export function kindOf(it: Item): Kind {
  /* ⛔ `reading` IS NOT A KIND AND MUST NEVER BE ADDED HERE. It is a footnote under an
     item's prose, not what the item IS. Checking it would retype every item that carries
     one, and the retype is silent: the chip and the filter would just quietly be wrong. */
  if (it.links) return "links";
  if (it.prompt && it.grab) return "steps";
  if (it.prompt) return "take";
  if (it.grab) return "steps";
  return "read";
}

export const KIND_LABEL: Record<Kind, string> = {
  read: "Read",
  take: "Copy and keep",
  steps: "Show and copy",
  links: "Worth saving",
};

/** Anchor slug for an item. Drives the per-item URL, which is how anything gets shared. */
export function slugOf(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ------------------------------------------------------------------ */
/* MODULE 1                                                            */
/* ------------------------------------------------------------------ */

export const MODULE_1: ModuleDef = {
  n: 1,
  /* No "(1)" prefix: the eyebrow already says "Module 1 of 6", and numbering the title
     put the number on screen twice. Same reasoning that removed the corner "01" from
     the course home cards on 18 Jul. */
  title: "The 80/20 of AI",
  /* Trailing blue, like the reference Paul sent ("The parts, in code"). "AI" is the subject
     and it ends the line. The alternative worth trying if this reads thin is "80/20". */
  titleHl: "AI",
  source: "Paul's own article, 21 May 2026",
  when: "Mon 21 Sep",
  on: "2026-09-21",
  built: false,
  blurb:
    "A small number of habits get you most of the way with AI in marketing work. Talking to it instead of typing. Keeping a campaign in one project instead of scattered chats, showing it the content you liked rather than describing it.",
  /* ⭐ PAUL'S WORDS, VERBATIM, 2 Aug 2026. This replaced the blurb at the top of the page.
     Do not reword, do not tidy, do not merge the paragraphs.

     ⚠️ TWO LINES MAKE CLAIMS ABOUT THE PAGE ITSELF and break if the layout moves. "Isa, my
     assistant chatbot on your left" depends on the rail staying left; "an AI fluency
     question below" depends on the fluency panel staying below this. Both verified true on
     2 Aug. If either moves, this copy is wrong and only Paul can rewrite it. */
  opening:
    "Hello and thank you for signing up to this. Later in this course we get into big things. Building agents, thinking in systems and doing stuff that wasn't possible six months ago.\n\nBut this module is not that. This is a bunch of things that I do, often without even thinking about it. If you already do these too, skip them. I'm not going to show you how to use AI, although will send you links to guides. There's loads available. My focus is marketing, and I care about both quality and speed, so that is the lens for this course.\n\nYou'll see Isa, my assistant chatbot on your left. It can answer questions if you have any. You know how to find me too.\n\nOne request. You'll see an AI fluency question below. I'd love if you can answer it now. And there's another one at the end of Module 6. That way, I can assess how useful this course is, and find ways to improve it.",
  items: [
    {
      /* ⭐ PAUL'S WORDS, VERBATIM, 3 Aug 2026, headline and copy together in one go. It takes
         slot one from "Check which model you're on", which moves down to item 2 rather than
         out: his instruction was that item 1 is no longer the model check but the reason he
         uses Claude, which is a reorder and not a deletion.

         ⭐ THE HEADLINE IS HIS AND IS A STATEMENT, not an activity. Item 2's own note carries
         his rule that a title names the activity and the lesson, and this one deliberately
         does not; it is the argument of the whole module compressed to six words. His to keep.
         He wrote it closing on a full stop. Recorded without one, because no other item title
         in the course carries terminal punctuation and a lone full stop reads as a typo on a
         heading. One character, and his to put back.

         ⚠️ IT MAKES A PROMISE THE COURSE HAS NOT KEPT YET: "More on this later." That is the
         THIRD in this module, after the model item's "I'll show how I train Claude to guess
         what model I want" and the vaguer "(more on that later)" already cut from item 03.
         Nothing in modules 2 to 6 covers how Claude connects to other software today. Either
         it gets a home or the line goes, and both are Paul's call. Written down here so it is
         a decision rather than something noticed the week it ships.

         ⭐ THE BREAK AFTER "technical colleague" IS PAUL'S, 3 Aug: "put a space after
         'technical colleague' so that lands." It was one 86-word paragraph running 7 rendered
         lines, against 4/3/3/2 for item 2, and the claim that carries the whole second half of
         the item was buried in the middle of it. Standing alone it is the shortest paragraph
         in the item and the eye stops on it. Do not merge it back. Paragraph 1 still runs 66
         words at 4 lines, which measures the same as item 2's longest and is his.

         ⚠️ IT CLAIMS THE SITE ITSELF: "This training site and everything on it was built
         through Claude." True on 3 Aug 2026. It is the same class of line as the opening's
         "Isa, my assistant chatbot on your left" - it breaks if the fact behind it changes,
         and only Paul can rewrite it.

         Mis-transcriptions repaired and nothing else touched: "responds will to feedback" to
         "responds well", "the image" to "the images" in the list that already runs plural, and
         the mid-sentence capital in "What I mean by this, It's not" down to "it's" on Paul's
         instruction, 3 Aug. "It is for me" in the last paragraph is left exactly as dictated,
         twice flagged to him and twice kept. */
      t: "Fluency matters more than the tool",
      text: "I use Claude as my main AI. Marketers really like it. It is intuitive, responds well to feedback and writes well. So my examples will mostly be in Claude. But tools will change, evolve and get better. And they will copy each other. What I think matters more than the tool is becoming comfortable with how to use AI, to get speed without losing quality.\n\nThere is a very important other thing to understand about Claude. I use it as a technical colleague.\n\nWhat I mean by this, it's not what Claude can do itself, but its ability to connect with other software and other tools. For example, my entire website was built through Claude. This training site and everything on it was built through Claude. So not just the writing, but the navigation, the tools, the images. If you got my welcome email, that was created, and sent through Claude.\n\nIt's not doing all of this on its own. It connects with other tools. But the point is I'm not going into those tools. It is for me. More on this later.",
      /* ⭐ bp-01, "the middle man", built 2 Aug. A BLUEPRINT rather than a figure, and the
         distinction is the reason it fits here: a figure names nothing so it stays reusable,
         a blueprint names everything so it is evidence. This one names Attio, Klaviyo, Vercel
         and Meta, which are Paul's actual stack, and it draws the two-way runs between them
         and a Claude window. It is the second paragraph of this item, drawn.

         ⚠️ NAMING REAL PRODUCTS DATES like any other specific. The module opens 21 Sep 2026.
         Check the four are still his stack before it ships, and never quietly swap one.

         ✅ FIXED 3 Aug 2026, 07:41. It did not animate for a day, and the cause was one line
         in `scripts/extract-figures.py`: `scope()` prefixed every selector with the figure's
         id without checking whether it was scoped already. Every builder from fig-26 on emits
         its own CSS pre-scoped, because the figures page holds thirty figures in one document,
         so those rules came out as `#animbp01 #animbp01 .m-b1-you` and matched nothing.
         bp-01, bp-02 and fig-26 through fig-32 were all affected; fig-14 was green because it
         predates pre-scoped builders, NOT because it is half of a pair.
         ⭐ `compare-figures.py` now reads 0.000% on all ten across every seek time, and its
         `--control` goes red, so the pass is a real one. */
      figure: "bp-01",
    },
    {
      t: "Check which model you're on",
      /* Paul's words, verbatim, extended 2 Aug 2026 (evening) to four paragraphs, his
         breaks. It replaces his own earlier dictation from the same day, which opened on
         the instruction ("Be intentional about what version of AI model you're on"). This
         one opens on the REASON the instruction exists, that the models do not all behave
         the same, and only then gets to what he does about it.

         ⭐ THE CLOSING LINE IS NOW ITS OWN PARAGRAPH. In the previous version "Anyway, for
         now, my main point is..." was the tail of a 73-word paragraph, over the ~55-word
         slab threshold in the reading spec. Standing alone at 18 words it also lands
         harder. Do not merge it back.
         Measured on the page: 56 / 55 / 50 / 18 words, at 4 / 3 / 3 / 2 lines. All four
         pass the spec's line test; the first is one word over its word proxy, which is
         noise, and the line count is the test that matters.

         ⚠️ IT MAKES A PROMISE THE COURSE HAS NOT KEPT YET: "Later in this course, I'll show
         how I train Claude to guess what model I want so I don't have to ask." Nothing in
         modules 2 to 6 covers that today. Module 1 already lost a vaguer version of the
         same problem, the dangling "(more on that later)" cut from item 03, so this one is
         written down rather than left to be noticed. Either it gets a home or the line
         goes, and both are Paul's call.

         ⚠️ IT NAMES THREE MODELS AND TWO VERSION NUMBERS: Opus 4.8, Opus 5, Sonnet, Fable
         5. Course copy that names live products dates faster than the rest of the page.
         The module opens 21 Sep 2026. Check these are still current before it ships, and
         never quietly update them: a version number is a specific and it is Paul's. */
      text: "An easy but very important thing to understand is that the models don't all behave the same. For example, I use Opus 4.8 (and now Opus 5) on Claude a lot. I find it to be accurate and capable of doing complex tasks. But if I'm just asking simple questions, I'll switch to their Sonnet model.\n\nWhy not stay on Opus all the time? Cost. There is an argument that staying on Opus is cheaper in the long run, as you get accuracy faster, as you're using fewer prompts. Later in this course, I'll show how I train Claude to guess what model I want so I don't have to ask.\n\nCost aside, it's possible we'll start to use different models for different types of tasks. And we'll mix them up and pair them up. I use Fable 5 when I have a project that is clear and I'm comfortable it can work away for hours with little supervision from me.\n\nAnyway, for now, my main point is be aware, test and be intentional on the model you're using.",
      grab: "The model dropdown, open",
      figure: "fig-14",
      /* Paul's link, corrected by him 2 Aug 2026. It replaces the "Choosing the right
         Claude model" tutorial, and the swap tracks the copy: his third paragraph now says
         "we'll mix them up and pair them up", and this piece is specifically about pairing
         a cheap executor model with Opus as an advisor. The old tutorial only covered
         picking one.
         Title and publisher read off the page itself, not guessed from the slug.

         ⚠️ IT IS PITCHED AT DEVELOPERS, not marketers: it talks about the Claude Platform
         API, agentic systems and a SWE-bench score. Flagged to Paul on the day and left in
         on his instruction. If module 1 ever needs a gentler landing for this idea, that is
         a copy decision for him, not a quiet substitution. */
      reading: [
        {
          title: "The advisor strategy: Give agents an intelligence boost",
          by: "Anthropic",
          url: "https://claude.com/blog/the-advisor-strategy",
        },
      ],
    },
    {
      /* ⭐ MOVED TO SLOT 03 ON 3 Aug 2026, on Paul's instruction: "projects is more
         important and ealier than context", then "yes move projects to number item 3".
         It was item 21, near the end. His reason, worth keeping: Projects is where the work
         LIVES, and giving it context is something you do INSIDE one. A technique the reader
         can only use properly once they have somewhere to put it.

         ⭐⭐ PAUL'S WORDS, VERBATIM, 3 Aug 2026, given minutes after the headline. Two
         paragraphs, his break. The draft written for him is gone, so the whole front six is
         now his. Nothing was repaired: no dictation slips in what he sent.

         ⭐ WHAT HIS VERSION DOES THAT THE DRAFT DID NOT, so nobody restores the old one: it
         opens on his own habit ("I almost never open a chat and start working") rather than
         on a fact about chats, and it names what a project HOLDS - instructions, files, your
         outputs going back in. The draft listed the equivalent feature in ChatGPT and Gemini;
         his does not, which matches the CFO item's call to name Claude only.

         ⭐ HIS SECOND PARAGRAPH IS A LESSON NOTHING ELSE IN THE MODULE TEACHES: a project is
         shared with colleagues, "getting you a collective brain". It is the only place in
         module 1 where the reader's team appears at all.

         ⚠️ PARAGRAPH ONE IS 68 WORDS against the reading spec's 25 to 45, so it renders as a
         slab. NOT split: capping his paragraphs is the reflexive fix he has corrected five
         times. Count shown, his call.

         ⭐ THE TITLE IS HIS, 3 Aug: "Headline should be 'Create Projects'". It replaces
         "Turn your best chats into a system", a draft written before he named the thing.
         ⭐ It rhymes with "Create a Red Team" two items down, and that is worth protecting:
         both name an object the reader MAKES AND KEEPS, rather than a move they perform once.
         The PROSE under it is still a draft. Only the headline is his.

         ⭐ FIG-26, "a project and its standing set", a strip, 8s. Paul, 3 Aug: "you have the
         figure in library." ⛔ NOT fig-27: that one is "one file in, a set back", the unfold,
         which is the brand-interviewer lesson and belongs to module 2. The two sit next to
         each other in the library and are easy to confuse by number.

         ⚠️ THE `grab` BELOW IS NOW DORMANT, not deleted. The renderer draws the figure when
         there is one, so "A Project, set up" no longer renders. Whether a figure retires a
         screenshot is Paul's call, per the note on `figure` in the Item type above, so the
         field stays until he says. */
      t: "Create Projects",
      figure: "fig-26",
      text: "I almost never open a chat and start working. I recommend you work in Claude Projects, and start your chats there. When in a project, you can set instructions on how you want Claude to work inside this project. You can add files, and you can add your outputs back into your projects. This gives you speed, and means you don't have to explain prompts over and over.\n\nThe other great advantage is you can work with colleagues in a project, getting you a collective brain.",
      /* Paul's two links, 3 Aug 2026: the video, then "as is a how to guide", the support
         article. ⭐ BOTH TITLES READ OFF THE LIVE PAGES, not guessed and not taken from his
         message: he called the video "Getting started with projects in Claude AI" and it is
         actually "...in Claude.ai". Same discipline as item 01's links. Neither URL carried
         tracking parameters, so nothing was stripped.

         ⭐⭐ THIS SLOT IS NOW A LIST, NOT A FOOTNOTE, AND THE PAGE HAS TO CATCH UP. Paul,
         3 Aug: "I expect that we will give lots of links for every piece. That's part of the
         value... We could easily have five, six, seven, eight, even more links for each
         section." It was designed for ONE link: the "MORE ON THIS" label sits INLINE with
         the first row, so a second row wraps back under the label instead of lining up.
         ⛔ Fix the layout before any item gets a long list.

         ⭐ THE THIRD LINK IS NOT ANTHROPIC, and that settles a question. With two Anthropic
         links the `by` field read as noise repeated twice. Kevin Stratvert is an independent
         tutorial channel, and at eight links "the vendor's own guide" versus "someone else's"
         is the main thing a reader sorts on. KEEP `by`.

         ⚠️ THE MEDIUM IS STILL INVISIBLE and it is the first thing anyone decides: six
         minutes of watching, or a page to skim. Proposed to Paul, not built: derive it from
         the URL HOST rather than write it per link, so it costs nothing at fifty links.
         ⛔ If that is built, derive ONLY from an explicit host list and show NOTHING for an
         unknown host. A guessed medium is the same silent-wrong-answer failure as the type
         badges, which infer from which fields happen to be filled.

         ⚠️ BOTH DOCUMENT A PRODUCT'S INTERFACE, AND MODULE 1 OPENS 21 Sep 2026. The video
         went up 2 Dec 2025. A UI walkthrough is the one kind of link that rots without
         anyone touching it. Same class as the model version numbers in item 02: check both
         before this ships, and never quietly swap one for a different source. */
      reading: [
        {
          title: "Getting started with projects in Claude.ai",
          by: "Anthropic",
          url: "https://www.youtube.com/watch?v=GJ5jTgcbRHA",
        },
        {
          title: "How can I create and manage projects?",
          by: "Anthropic",
          url: "https://support.claude.com/en/articles/9519177-how-can-i-create-and-manage-projects",
        },
        {
          title: "How to Use Claude Projects (Full Tutorial)",
          by: "Kevin Stratvert",
          url: "https://www.youtube.com/watch?v=w7_yWjYyxjE",
        },
      ],
      grab: "A Project, set up",
    },
    {
      /* ⭐ TITLE IS PAUL'S, 2 Aug 2026. It replaces "Brief it like a person", which he
         rejected because it presupposes the subject: on item 2 of day 1 nobody has yet
         said what prompting is, so "brief it" reads as brief who. His rule, verbatim:
         a title has to name the activity and the lesson. */
      t: "When prompting, give AI context",
      /* ⭐ NOW PAUL'S OWN WORDS, VERBATIM, 2 Aug 2026 (evening). `placeholder` is gone with
         them, so the orange marker comes off and this item joins /course/everything.

         ⭐ THE LESSON MOVED. The version this replaces was mine and it taught "say who the
         work is for". His teaches something wider and harder to arrive at on your own: say
         what you are going to DO with the output. The audience is one example of that, not
         the rule itself.

         ⚠️ HIS INSTRUCTION REPLACED THE WHOLE OF THE OLD TEXT, which means two sentences
         went with it: "Try a prompt like the one below." and "The last line, what a good
         one looks like, is the easiest to skip and does the most work." The prompt block
         underneath therefore has no lead-in sentence any more, and the note about the Bar
         line doing the most work is gone. Flagged to Paul on the day. Do not restore them
         quietly: if they come back it is because he said so. */
      text: "Another really useful thing is to explain what you will do with the output you're asking AI for. So instead of asking it to run some research, explain why you want the research. Or if you're preparing a report for your Chief Financial Officer, tell your AI this. You'll get a better response. This is partly what people mean when they say give it context.",
      /* ⚠️ PROMPT REWRITTEN BY DRAY, 2 Aug 2026, AND IT IS NOT MARKED ON THE PAGE.
         `placeholder` only draws the orange marker on the prose, so this block LOOKS
         like Paul's verbatim article text and is not. Two changes he asked for:
         "Format: the shape I want back" was his own line and he rejected it as the
         vaguest thing in the item; and the five slots are filled in rather than
         abstract, so the block is a worked example a marketer can edit instead of a
         template they have to interpret. No invented figures: nothing here states a
         budget, a result or a metric. */
      prompt:
        "Task: write a one-page summary of our campaign results.\nBackground: it is for the quarterly review, and we are being asked whether to keep spending.\nAudience: the CFO. She cares about what we got for the money, not impressions.\nFormat: one page. A short table of numbers, then three lines of plain English.\nBar: she should be able to decide in two minutes without coming back to me.",
    },
    {
      /* ⭐⭐ PAUL'S WORDS, VERBATIM, 3 Aug 2026, title and copy together. The sample copy
         written for him earlier the same day is GONE, and so is the title proposed with it
         ("Run your work past a red team"). His title is "Create a Red Team".

         ⭐⭐ THIS ITEM IS TWO OF HIS NINE, NOT ONE, and that is the thing to understand
         before touching it. Paragraphs one and two are "insist on sources, make it prove it
         read the whole doc", which was #4 on his 2 Aug list and had NOTHING behind it.
         Paragraph three is the red team. He bundled them himself, which answers a question
         that had been open since 2 Aug: his own sort put sources and personas in different
         families ("different reasons"), and he then widened it, "but they are still part of
         what I do... so they can be together if we choose." This is him choosing.

         ⛔ SO DO NOT SPLIT IT to tidy the family spine. The spine serves the page, not the
         other way round. Two families now meet inside one item and that is his call.

         ⭐ IT SITS DIRECTLY BEFORE THE CFO, his instruction twice: "I want this not as 16,
         but number 4", then "This comes before CFO." It reinforces his earlier ruling that
         "getting accuracy should be ahead of cfo. I think this is needed first" - the reader
         learns to distrust the output before being handed a persona to improve their own work.

         ⚠️ ONE WORD REPAIRED, AND IT IS HIS TO PUT BACK. He dictated "I always run a bunch of
         checks as given"; recorded as "as a given", a missing article in a dictated line. Same
         class as the CFO item's "personal" -> "persona". Nothing else was touched.

         ⚠️ TWO SPOKEN CONSTRUCTIONS LEFT EXACTLY AS HE SAID THEM: "a team dedicated to find
         gaps" and "When you get response or answer back from your AI". Both read as dictation
         rather than choice, but repairing a person's grammar is not the same as repairing a
         dropped article, and the voice spec is explicit that spoken register stays. His call.

         ⚠️ PARAGRAPH TWO IS 88 WORDS against the reading spec's 25-45 guide, so it will render
         as a slab. NOT split: the spec says show him the count and let him call it, because
         capping his paragraphs is the reflexive fix he has corrected five times.

         ⭐ NO BUTTON NAME IN THE PROSE, and that is better than the CFO item. He wrote "the
         copy button", generic, so the `promptLabel` below can change without falsifying the
         copy. The CFO item names its button and the two must be changed together.

         ⭐ FIG-33, built and signed off by Paul on 3 Aug by another terminal. Handover:
         HANDOVER-fig-33-redteam-2026-08-03.md. A library figure, so `figure` and not
         `figureFile` - it comes through scripts/extract-figures.py like every other one.

         ⛔⛔ IT IS NOT A SIBLING OF FIG-32 AND MUST NEVER BE CAPTIONED AS ONE. The CFO
         figure is a CONVERGENCE: your own document and the persona meet before they arrive,
         because the CFO reviews what YOU wrote. This one is a HANDOFF with one run in,
         because the red team reviews what the MACHINE just wrote and you paste the persona
         alone. Paul ruled on that fork rather than being handed the wrong drawing. Any copy
         written beside the two has to keep the distinction, or it says they are one move.

         ⚠️ ITS PAYOFF IS A MARKED LIST because the persona's "How to respond" section asks
         for one. Rewrite that section into prose and fig-33 silently goes out of date. */
      t: "Create a Red Team",
      figure: "fig-33",
      text: "The robots still lie. We see fewer hallucinations on the new models, but I never believe what I read. I always run a bunch of checks as a given. It's just a step in the process.\n\nFirstly, I always ask it for sources. Often, I ask for the source of the source. When asking it to search online, I tell it to find credible sources, not vendor-supplied stats and not somebody's blog. When asking it to read something, I don't just ask Claude if it read the full doc. I ask it to prove to me with evidence that it read every single claim. Ask it to summarise each page.\n\nOne way to create a Red Team. So a team dedicated to find gaps, holes, flaws, inaccuracies. You can try it. When you get response or answer back from your AI, paste in the instructions from the button below. Just click on the copy button and paste into your Claude chat.",
      /* Paul's verbatim persona, pulled from copy/red-team-persona.md by
         scripts/extract-personas.py. 410 words, so it renders as one button. */
      prompt: PERSONAS["red-team-persona"],
      promptLabel: "Copy Red Team prompt",
    },
    {
      /* ⭐ NEW ITEM, 2 Aug 2026, on Paul's instruction: "in item 3, we'll give the CFO
         persona thing." It follows item 02 deliberately: 02 tells AI the work is for the
         CFO, 03 hands them the CFO to read it back. Title is Paul's own framing from the
         same conversation, verbatim.

         ⭐ THE PROSE IS NOW PAUL'S, WRITTEN 2 Aug 2026 (evening), replacing his earlier
         dictation. Verbatim, three paragraphs, his breaks. Not tidied.

         ⛔ NOTHING HERE IS LIFTED OUT OF THE FIGURE, and the figure quotes nothing back.
         One legible string in the drawing, "The CFO". The verdict line on the drawn card
         is Paul's to write and he has not written it. Do not invent one. */
      /* ⭐ TITLE, PAUL, 2 Aug 2026 (evening). It replaces his own earlier "Quick hack to
         find the questions your CFO is likely to ask", which he cut for length: ten words
         against five and six on the items either side, and "hack" is a register the rest
         of the course does not use.
         ⭐ WHY THIS WORDING AND NOT A SHORTER PARAPHRASE: it repeats the persona's own
         trigger line, "put this past the CFO", so the title and the thing they paste say
         the same thing. Imperative, like the module's other titles. Do not reword it to
         something that no longer matches the prompt. */
      t: "Run your plan past a CFO",
      /* Paul's words, verbatim. Three paragraphs, his breaks. Written 2 Aug 2026, and
         PARAGRAPHS ONE AND TWO REWRITTEN BY HIM ON 3 Aug once the Red Team item existed.
         Two dictation slips repaired across the two sittings, both his to put back:
         "personal" -> "persona" (2 Aug) and "Note that is this is different" -> "Note that
         this is different" (3 Aug). Nothing else has ever been touched.

         ⭐⭐ IT NOW OPENS BY NAMING THE ITEM BEFORE IT: "You can take the same technique for
         Red Team". ⛔ SO THE ORDER IS LOAD-BEARING IN BOTH DIRECTIONS. Red Team must come
         first or this sentence points at nothing, and his instruction was explicit: "This
         comes before CFO." Moving either card breaks the other. Read both before reordering.

         ⭐ HIS 3 Aug REWRITE SHARPENED THE ARGUMENT, so nobody restores the old opening: it
         was "improve the quality of our marketing... this is all about quality", which said
         quality twice and named no mechanism. The new one names the mechanism, "push us to
         think ourselves and ask better questions", and that is the thread tying this item to
         the Red Team above it. It also drops "One example is using it to see gaps in our
         thinking", which the Red Team item now covers.

         ⚠️ "a CFO before you send to your CFO" became "a Chief Financial Officer before you
         send to your actual CFO". Spelling the role out on first use, then "actual" to mark
         the real person. His, and it fixes a sentence that used one word for two things.

         ⛔ HIS 2 Aug RULING "keep cfo as is for now" IS SUPERSEDED by his own rewrite.

         ⭐ WHAT THE REWRITE FIXED, so nobody restores the old one: it opens on the WHY
         (quality, explicitly separated from speed) before it asks anyone to do anything,
         and it turns the doing into three numbered steps instead of a run-on instruction.
         It also drops the dangling "(more on that later)" promise, which had no home
         anywhere in the course.

         ⛔ PARAGRAPH TWO NAMES A BUTTON. "the 'Copy CFO Prompt' button" is the item's own
         `promptLabel` below. Change one and you must change the other, or the page tells a
         student to click something that is not there.

         ⚠️ IT NAMES CLAUDE ONLY. The version before it listed ChatGPT, CoPilot and Gemini
         so nobody on another tool felt shut out. Paul's call, and the steps are literal
         enough that naming one product is what makes them followable. If it ever needs to
         cover the others, that is a copy decision for him, not a tidy-up. */
      text: "You can take the same technique for Red Team and use it in many ways to improve the quality of our marketing. Note that this is different to simply using AI to get us faster answers. This is about using it to push us to think ourselves and ask better questions or get perspectives from others.\n\nFor example, say you're preparing your marketing plan. You can use AI to get the perspective of a Chief Financial Officer before you send to your actual CFO. To try this out (1) upload your plan into a Claude chat (2) click on the 'Copy CFO Prompt' button and paste into the same chat and (3) click return.\n\nThe prompt is telling your AI to assume the persona of a CFO with instructions on what to look for. If you haven't done this before, you'll be impressed with the quality of the response.",
      figureFile: "/course/rwf-fig-persona-cfo.svg",
      /* The persona itself, Paul's verbatim copy, pulled from the canonical file by
         scripts/extract-personas.py. Never hand-typed and never edited here. */
      prompt: PERSONAS["cfo-persona"],
      promptLabel: "Copy CFO prompt",
    },
    {
      /* ⭐⭐ PAUL'S ITEM, NAMED AND SCOPED BY HIM ON 3 Aug 2026: "i'd like for number 7 to be
         called 'Break down and rebuilt' and this is a longer article that covers the idea
         that AI is really good to deconstruct things, so I can understand them, and then
         rebuild." He corrected the title himself a minute later: "Break down and rebuild
         (not rebuilt)". His words, his title.

         ⭐⭐ IT IS THE SECOND BUNDLE OF THE DAY AND THE BIGGER ONE. He named four things it
         absorbs: image to prompt and back to image, copying what experts say in YouTube
         transcripts, photograph, and website code to create wireframes. Two of those are on
         his 2 Aug list of nine (#8 image, #9 transcript) and one is already an item further
         down (Photograph the mess). The fourth, website source to a wireframe, is new today.

         ⛔ SO "PHOTOGRAPH THE MESS" IS NOW DUPLICATED and Paul has not said to cut it. It
         still stands as its own item lower in the array. Do not delete his content on an
         inference; ask him.

         ⭐⭐ THE FIGURE LIBRARY ALREADY HELD THIS ARGUMENT, WHICH IS WHY IT NEEDS NO NEW
         DRAWING. fig-01/02 decode an image, fig-03/04 a page source into a first-pass
         wireframe, fig-05/06 the same shape for video, fig-31 a YouTube transcript.
         fig-05's own note in course-figures.html says it outright: "The same three cards.
         What changes is only what sits in the first and the last, which is the whole
         argument for having a vocabulary rather than drawing each one." His lesson and the
         figure system's founding insight are the same thing.

         ⛔⛔ AND THAT IS THE PROBLEM THE RENDERER HAS. This item names FOUR decodes and an
         item carries ONE picture. It is the open design question from 25 Jul, arriving with
         a real item behind it for the first time. fig-02 is wired as the flagship, the image
         one, because it is the example he led with. ⚠️ A reader who is shown one decode and
         told about four is being told the picture is an illustration rather than the lesson.
         Paul's call: one figure, a figure per beat, or a strip that pans across all four.

         ⚠️ THE PROSE IS SAMPLE COPY, NOT HIS. He said "this is a longer article", so it is
         his to write and this is short on purpose: something to react to, not a stand-in for
         a long piece. `placeholder: true` marks it. It names ONLY the four things he named
         and invents no example, no statistic and no claim about what he does. */
      t: "Break down and rebuild",
      /* ⭐ THE TEASER, and it is his pick: "You can use the youtube transcript as one we
         [show] before we click to open window." fig-31 alone in the list. */
      figure: "fig-31",
      /* ⭐⭐ THE ARTICLE. All four relevant figures, each with his copy after it, only inside
         the opened window. His instruction, 3 Aug: "I want all of our figures relevant in
         this article", then the correction that fixed the shape: "We show one figure only.
         And then we show them all in the longer article with my copy after each one, as I
         explain it."

         Order: decode a picture, remake it as something new, take a transcript, take a
         page's structure. fig-31 sits second-last rather than first, because it is the
         teaser and a reader who clicked in on it should meet the general move first.

         ⭐ fig-06 IS IMAGE TO VIDEO, not image back to image. Flagged to Paul because his
         phrase was "image to prompt and back to image" and prompt-back-to-image does not
         exist as a drawing. His ruling, 3 Aug: "image to video works." So nothing is missing.

         ⚠️ EVERY BEAT'S COPY BELOW IS A STAND-IN AND IS DELIBERATELY THIN. It says what the
         drawing shows and nothing more, so the shape can be judged without anyone inventing
         Paul's teaching. He writes the real thing: "my copy after each one, as I explain it."

         ⛔ PHOTOGRAPH HAS NO FIGURE. He named it as part of this item and the library has no
         drawing for it. It is the one beat that would need a new one. */
      /* ⭐⭐ THE ORDER IS HIS, 3 Aug 2026, given as a walkthrough of how he will write it:
         "the first thing I'll talk about is using YouTube... Then I'll talk about using an
         image to deconstruct... After image, I'll move to talking about how you can create a
         video from an image. And then after that I'll talk about being able to take the code
         of a website like my website and create a wireframe for it."

         ⭐ SO YOUTUBE LEADS, and that is why fig-31 is also the teaser standing above the
         list. A reader who clicked in on the transcript meets the transcript first.
         ⛔ Do not "improve" this into general-to-specific. He is building from the thing he
         does most often outward, and beat 2 to beat 3 is a deliberate chain: you deconstruct
         a picture, then you make a video out of it.

         ⚠️ OPEN, HIS, NOT BUILT: "I might show a real photograph of something here as well as
         the figure with the prompt beside it" on the image beat. A real photograph beside a
         figure is a new shape and a beat currently holds exactly one drawing. Wait for him. */
      /* Paul's link, 3 Aug 2026: "there is a brilliant link here for awesome nano banana
         images and how to create them". Title and owner verified against the live repo
         (23.4k stars) rather than guessed from the URL.

         ⚠️ HIS URL CARRIES AN ANCHOR, #case-24-movie-storyboardby-geminiapp, so it lands a
         reader in the middle of the page on ONE case. Kept exactly as he sent it, because
         changing a URL somebody pasted is a real change, not a tidy-up. FLAGGED TO HIM: his
         own description is about the whole collection, which is the top of the page.

         ⚠️ IT IS A GITHUB README, a developer surface for an audience of marketers. Same
         flag already standing on item 01's reading link, and the same person's call.

         ⚠️ NANO BANANA IS GOOGLE'S GEMINI IMAGE MODEL, and the beat above names GetImg. Not
         a contradiction, he says "there's many out there", but worth knowing they are
         different tools before anyone edits either. */
      reading: [
        {
          title: "Awesome-Nano-Banana-images",
          by: "PicoTrex",
          url: "https://github.com/PicoTrex/Awesome-Nano-Banana-images/blob/main/README_en.md#case-24-movie-storyboardby-geminiapp",
        },
      ],
      beats: [
        /* Beat one carries NO prose: his article opens with the two paragraphs in `text`
           above, and this figure follows them. */
        { figure: "fig-31" },
        {
          text: "You can deconstruct the prompt for an image. For example, you can take an image from your website, drop it into Claude and ask Claude to write a descriptive prompt that would create this type of image in an image generator. I use an image generator called GetImg, but there's many out there. And when I ask Claude for this prompt, I ask it to stay under a thousand characters. Once I have the prompt, then I can adjust and amend the prompt a little bit to change the details of the image, but keep the same aesthetic as the image. Beware of copyright, and I'm not endorsing that you steal any images or artwork or IP from anybody else.",
          figure: "fig-02",
        },
        {
          text: "And if you have an image, then it's easy to create a video or an animated version of this image. Again, this is just getting Claude to write the prompt for a video based on this image. This is not difficult, but it is interesting because in marketing creating video was always a trade-off: the cost and time to make animation versus the benefits of having video versus images. That trade-off no longer really exists.",
          figure: "fig-06",
        },
        {
          text: "Another great deconstruction is if you're building a website and you want inspiration for wireframes from websites you like. All you need to do is open up a website, right click to view source code, copy it, paste into Claude and ask it to create a wireframe for you.",
          figure: "fig-04",
        },
      ],
      /* ⭐⭐ PAUL'S TEASER COPY, VERBATIM, 3 Aug 2026. The sample written for him is gone.
         Two paragraphs: the move, then the YouTube transcript worked through in full, which
         is why fig-31 is the figure standing above it.
         ⚠️ One dictation slip repaired, his to put back: "I do this for image, videos" ->
         "images". Nothing else touched, including the spaced hyphen, which is his. */
      text: "AI is excellent for deconstructing things and rebuilding them. I do this for image, videos, wireframes, webpages, processes, workflows.\n\nFor example, if I want to learn how something is done, I go to youtube and find an expert explaining their process. The longer and detailed the video the better. I don't watch it. Instead, I find the transcript of the video (found under \"more\") - and copy the entire thing into Claude, and ask Claude to tell what is new, interesting or relevant to me. I also get Claude to check how much is credible.",
    },
    {
      t: "Show it one example of good",
      text: "“Punchy” and “on brand” mean nothing to it. So I paste in one thing that already gets it right. One example does more than a paragraph of description.",
      prompt:
        "Here's an example of the tone I want. Match this, don't improve on it: [paste the example]",
    },
    {
      t: "Ask for a web page, not a document",
      text: "The one I'd tell everybody first. Instead of “write me a report”, I ask for it as a web page. It comes back laid out properly, I can send a link instead of an attachment nobody opens, and in Claude it builds it in front of you as an Artifact.",
      prompt:
        "Make this a single-page HTML report I can open in my browser. Numbers in a table, a simple bar chart, and a button to copy the summary as text.",
      grab: "The report rendering as an Artifact",
    },
    {
      t: "Build the thing, don't describe it",
      text: "I don't ask for a plan for a landing page. I ask it to build the page. In Claude that's an Artifact, in Claude Code it writes the actual files. A few minutes later there's a real page I can click around. It's easier to react to a real thing than to picture one from a description.",
      prompt:
        "Build a working landing page for [thing]. One screen: headline, three benefits, a sign-up box. Keep it clean and modern.",
    },
    {
      t: "Do it once, then a hundred times",
      text: "The first time I get something right, a resized ad, a reformatted report, I don't treat it as one job done. I work the steps out with it once, then hand the repeating over. For me that's the ad resizer: I set it up with Claude Code once, and now one line turns a single ad into nine sizes in about six seconds, using free tools like ffmpeg underneath. The slow part is the first one. After that it's almost free.",
      grab: "The nine sizes, side by side",
    },
    {
      t: "Point it at a spreadsheet",
      text: "I drop a messy sheet straight into Claude or ChatGPT, or use Copilot inside Excel, and ask the same thing. Back come the charts, and usually a pattern I wouldn't have gone looking for. It's the fastest way I know to turn a spreadsheet into a decision.",
      prompt:
        "Three biggest trends in here and the one thing that doesn't fit. Plain English first, then show me the charts.",
    },
    {
      t: "Talk, don't type",
      text: "I say a lot more than I'd type. I hit the voice button in the ChatGPT or Claude app, or use a dictation tool like Superwhisper on my laptop, and talk for two minutes. Rambling is fine. It's better at sorting my mess than I am.",
      prompt: "That was me thinking out loud. Turn it into three clear points and a next step.",
    },
    {
      t: "Photograph the mess",
      text: "It reads images, so I stopped typing things up. A whiteboard covered in my own bad handwriting, a page of a book, a screenshot, a receipt. I photograph it and say “pull the key points out of this” or “put this into a table”. The thing on my desk is usable in one step.",
      prompt: "Pull the key points out of this.",
    },
    {
      t: "Make yourself a throwaway tool",
      text: "When I've a fiddly one-off job, I get it to build me a small tool for exactly that. In Claude that's an Artifact you can use right there in the chat. A page with a few buttons beats doing it by hand.",
      prompt:
        "Build me a little tool where I can drag these twenty items into priority order, then give me the sorted list back.",
      grab: "The little tool, working",
    },
    {
      t: "Connect it to your stuff",
      text: "It gets more useful once it can see your actual work. Claude and ChatGPT both connect to Google Drive, Gmail and Calendar now, and Copilot already sits inside your Microsoft files. Turn those on and you can ask about your real week. One catch: it only sees what you can see. Point it at a messy shared drive and you get messy answers back.",
      prompt: "What did this client send me this week, and what am I on the hook for?",
      grab: "The connectors screen",
    },
    {
      t: "Use it to pressure-test your thinking",
      text: "Not all of this is about making something. Often I hand it a decision I've already half made and tell it not to be nice. Half the time I don't use a word it writes back. I just think more clearly for being pushed.",
      prompt:
        "Don't help me improve this. Tell me what I'm assuming, and what a smart person who disagrees with me would say.",
    },
    {
      t: "Make it find the cause before the fix",
      text: "Ask “our sign-ups are down, what do we do” and back comes the usual shopping list. So I make it slow down. Fewer people arriving, the same people not converting, or a different crowd. Three problems, and the answer to one is the wrong answer to the others.",
      prompt:
        "Before you suggest anything, list the possible causes and what evidence would point to each one.",
    },
    {
      t: "Run a pre-mortem",
      text: "Ask it to assume the thing has already failed. Pretending it's already gone wrong gives everyone permission to say the awkward thing. Most of what comes back is stuff I half-knew and had decided not to look at.",
      prompt: "It's six months from now and this has failed. Write the story of how it happened.",
    },
    {
      t: "Ask it to score its own confidence",
      text: "I get it to grade itself. The lowest score is nearly always the thing my argument is leaning on. A quick way to find the weak point before someone else does.",
      prompt: "Rate your confidence 0 to 100 on every claim you just made, and list the three lowest.",
    },
    {
      t: "Narrow the data before it goes in",
      text: "Tip in four thousand replies and you get a grey average that means nothing. So I cut it down first. The narrower question gives you something useful. The full pile doesn't.",
      prompt: "Just the last ninety days, just the people who cancelled. What's the common thread?",
    },
    {
      t: "The expert panel",
      text: "My favourite one. I take a single document and run it past three readers in one go, each with its own brief. Each catches a different hole. Then I decide, because they never fully agree.",
      prompt:
        "Read this three times. First as Roger Martin, looking for the strategy. Then as a CFO who only cares where the cash is. Then as a red team trying to kill it. Give me three separate verdicts.",
    },
    {
      t: "Do the reps",
      text: "For all of that, I still do plenty by hand. The best coders in the world still write their own code, not because they're quicker than the machine, they just don't want to lose the feel for it. I'm the same about the thinking and the writing. The tool doesn't know what matters in my business. I do, and I only keep knowing it by staying in the work.",
    },
    {
      /* The links type. Demonstrated 19 Jul with the Fable piece, which Paul confirmed
         does NOT belong in module 1. Kept here as the shape only, with placeholders,
         until he decides what actually goes in module 1's list. */
      t: "Worth saving",
      placeholder: true,
      text: "PLACEHOLDER, PAUL TO WRITE. One line on why this collection rather than any other. The curation is the value.",
      links: [
        {
          title: "Placeholder source",
          by: "Who made it",
          url: "https://example.com",
          why: "PAUL TO WRITE.",
        },
        {
          title: "Placeholder source",
          by: "Who made it",
          url: "https://example.com",
          why: "PAUL TO WRITE.",
        },
      ],
    },
  ],
};

/** Every module, by number. Adding module 2 = one import and one line here. */
export const MODULES_BY_N: Record<number, ModuleDef> = {
  1: MODULE_1,
};
