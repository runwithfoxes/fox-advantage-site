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
/* ⭐ IMPORTED, NEVER RETYPED. Modules 2 to 6 take their blurb straight from the locked copy
   so a signed-off line cannot exist twice and drift. Module 1's is inline above because it
   predates this. */
import { MODULE_BLURBS } from "./courseCopy";

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
   * ⭐⭐ A FOLDER OF DOCUMENTS, STANDING OPEN IN THE PROSE. Rendered wherever `{{FOLDER}}`
   * appears in `text`, so it sits at the point in the argument that earned it.
   *
   * ⛔⛔ IT REPLACED A BULLETED LIST, AND THE REASON GENERALISES. For an hour this was seven
   * bullets that each opened the window. Paul killed it on sight: "The figure you created in
   * the window itself is good, which means we don't need the list of bullet points. They're
   * duplication. I'm clicking on a bullet point and it's just bringing me down 10 cm to
   * another point." The window already lists every document, so the bullets were the same
   * list twice, and a link that moves you 10cm to the thing you can already see is worse
   * than no link. ⛔ Do not reintroduce a list of the files beside a window that lists them.
   *
   * ⭐ `files` IS IN BUILD ORDER, and that is the lesson rather than a sort: positioning
   * cannot be written until audience, competitors and proof exist, and tone and messaging
   * come after. ⛔ Never sort it.
   *
   * ⛔ NOT A LINK TO `/course/everything`. Module 2 is `built: false`, which is precisely
   * what keeps its files OUT of the public library, so a link there today would land on a
   * page that does not list them. The library fills itself the day the module ships.
   */
  /**
   * ⭐ THE RECORDED SESSION WITH THE WRITER, rendered wherever `{{SESSION}}` appears in
   * `text`. Content is `writerSession.ts`, which is a real run rather than a script.
   * ⛔ There is one session and it belongs to module 2 item 04. If a second module ever wants
   * one, this becomes a name rather than a boolean, and the component takes the name.
   */
  session?: boolean;
  docs?: {
    dir: string;
    folder: string;
    files: string[];
    /**
     * ⭐ HOW THE DOCUMENTS PRESENT, 4 Aug 2026. "window" stands a folder open in the prose
     * at `{{FOLDER}}`. "links" puts them at the FOOT of the item in the additional-reading
     * treatment, on Paul's instruction: "just put them as links like we do links for
     * extended reading."
     *
     * ⭐⭐ THE CHOICE IS ABOUT WHAT THE READER IS MEANT TO DO. Kite's six are EVIDENCE: the
     * lesson is what a finished positioning document looks like, so they have to be readable
     * in place, and a window is the only thing that shows one without letting 3,800 words
     * run away with the section. The writer's three are TAKEAWAYS: nobody needs to read the
     * slop rules on this page, they need to download them. A link does that in one line and
     * a window would be a big object doing a small job.
     */
    as?: "window" | "links";
  };
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
  beats?: {
    text?: string;
    /** A drawn figure from the library. A beat has this OR `image`, never both. */
    figure?: string;
    /**
     * ⭐ A REAL ARTEFACT under /public, added 3 Aug 2026 for the wireframe Paul's own site
     * produced. ⛔ THE DIFFERENCE FROM A FIGURE IS THE WHOLE POINT: a figure DRAWS the move
     * so it is reusable and names nothing; this is EVIDENCE that he really did it, and names
     * everything. His copy says "here is the wireframe I got back", and a drawing cannot
     * carry that sentence.
     * ⚠️ A beat can also be text alone, which is how the article closes.
     */
    image?: { src: string; alt: string };
    placeholder?: boolean;
  }[];
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
  /**
   * ⭐⭐ THE MODULE'S OWN FILES, added 3 Aug 2026 on Paul's ruling: "Just have them all
   * listed connected to module 2."
   *
   * ⛔ THEY HANG OFF THE MODULE, NOT AN ITEM, AND THAT IS THE WHOLE POINT. Module 2 has
   * fourteen documents between the writer and the Kite pack. An item is a lesson, and no
   * single lesson owns fourteen files, so hanging them on item 01 would have made the
   * first thing a learner reads look like a filing cabinet. They belong to the module the
   * way a project's files belong to the project.
   *
   * ⭐ WHY THIS IS A SET OF SETS. The writer files are BLANK, they are what a learner
   * fills in about their own brand. The Kite pack is the SAME SIX DOCUMENTS ALREADY
   * FILLED IN, on a brand that does not exist. Flattening them into one list of fourteen
   * would put a learner's empty template beside a worked answer with nothing saying which
   * is which, and the whole teaching point of the module is that you do the slow part
   * yourself first.
   */
  files?: FileSet[];
};

/**
 * ⭐ A NAMED GROUP OF DOCUMENTS a learner can read or take away.
 *
 * ⚠️ `warn` EXISTS FOR KITE AND IS NOT DECORATION. Paul, 26 Jul 2026: "Never ever ever
 * carry any real examples from my clients or otherwise. That's a hard rule." Kite is
 * invented, and a learner reading a positioning statement with market shares and savings
 * in it will take it for research unless something on the page says otherwise. The
 * warning renders with the set, never in a tooltip and never below the fold of the list.
 */
export type FileSet = {
  title: string;
  /** One line on what the set is for. */
  blurb: string;
  /** Shown with the set when the contents must not be mistaken for real. */
  warn?: string;
  files: CourseFile[];
};

export type CourseFile = {
  /** The filename a learner will recognise, without its extension. */
  name: string;
  /**
   * What it is. ⛔ VERBATIM FROM THE TWO READMEs WRITTEN WITH PAUL ON 26 JUL 2026
   * (`course-build/downloads/README.md` and `course-build/kite/README.md`). These are the
   * descriptions he built with, so nothing here is a paraphrase and nothing is invented.
   */
  what: string;
  /** The readable page. Rendered light-mode HTML, sits beside the markdown. */
  href: string;
  /** The markdown, which is the thing that actually goes into a Claude project. */
  take: string;
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
      /* ⭐ Paul's link, 3 Aug 2026, "for more reading on topic 1", and topic 1 is THIS item.
         Title read off the live page, "Connectors | Claude by Anthropic", trimmed to the
         page's own name.

         ⛔ IT ARRIVED CARRYING ?utm_source=chatgpt.com AND THAT WAS STRIPPED. Left on it
         credits someone else's referrer on every click and tells every reader where Paul
         found the page. Second link today to arrive with that exact parameter.

         ⚠️ IT FIRST WENT ONTO ITEM 02 BY MISTAKE, because item 02 already had a `reading`
         block and item 01 had none, so the nearest one looked like the right one. Check
         which item OWNS a block before appending to it: the `t:` above, not the nearest.

         ⭐ It belongs here: this item's second half is Claude as a technical colleague, "its
         ability to connect with other software and other tools", and this is the page that
         lists what it connects to. */
      reading: [
        {
          title: "Connectors",
          by: "Anthropic",
          url: "https://claude.com/connectors",
        },
      ],
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
        /* ⭐ Paul's link, 3 Aug 2026, "another link for topic 2". Title read off the live
           page. ?utm_source=chatgpt.com stripped, the third today.

           ⭐ HE PUT BACK THE TUTORIAL HE HAD TAKEN OUT, AND THAT IS A DECISION, NOT A SLIP.
           This exact page was item 02's reading link until 2 Aug, when he replaced it with
           the advisor strategy piece because his copy had moved to pairing models rather
           than picking one. Told that on 3 Aug, he ruled: "keep it in." So the item carries
           both, the tutorial for picking and the advisor piece for pairing.
           ⛔ Do not "tidy" this back to one link. It was two before anyone noticed. */
        {
          title: "Choosing the right Claude model: Haiku, Sonnet, Opus, or Fable",
          by: "Anthropic",
          url: "https://claude.com/resources/tutorials/choosing-the-right-claude-model",
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
        /* ⭐⭐ THE PROOF BEAT. Paul, 3 Aug 2026: "I tried this on my own website, and here is
           the wireframe I got back." A real artefact, not a drawing, and that is why the beat
           type gained `image`. Every figure above says how the move works; this one says he
           did it.

           ⭐ PNG RATHER THAN THE HTML, and both existed. The HTML is a fixed 1200px sheet with
           no media queries and global `body` and `*` rules, so inside the article it needs an
           iframe or it restyles the page. The wireframe is also entirely greeked, so live text,
           the only thing HTML would win on, has nothing to offer. The PNG is 2400px wide
           against a 748px column, better than 3x.

           ⚠️ IT IS 2400x5053, so at column width it renders about 1575px tall, taller than the
           window it opens in. That is honest, because it is a whole homepage and his sentence
           is "here is the wireframe I got back", but it is a lot of scrolling. Flagged. */
        {
          text: "I tried this on my own website, and here is the wireframe I got back.",
          image: {
            src: "/course/rwf-homepage-wireframe.png",
            alt: "A greeked wireframe of the Run with Foxes homepage, generated by Claude from the page source",
          },
        },
        /* ⭐ THE CLOSING PASSAGE, and it carries no picture. It points at the Nano Banana link
           in Additional reading directly below it, which is why `figure` had to become
           optional. ⛔ "with a brilliant link below" is copy that DEPENDS ON THE LAYOUT: if the
           reading list ever moves out from under the article, this sentence lies. */
        {
          text: "There is a brilliant link below with wonderful examples of how to generate images using nano banana, with all the prompt included. I've studied this and tried many of them.",
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
      /* ⭐ PAUL'S, 3 Aug 2026: "I'm going to keep in the research which I need to write."
         There was NO research item on the page. Deep research was #5 on his list of nine and
         had nothing behind it, so this is a slot he asked to hold open, not a survivor.
         ⚠️ TITLE AND COPY ARE BOTH HIS TO WRITE. "Deep research" is his own phrase from
         2 Aug, standing in until he names it. ⛔ No figure exists for this lesson either. */
      t: "Deep research",
      /* ⭐⭐ PAUL'S WORDS, VERBATIM. Nothing repaired: no dictation slips in what he sent.

         ⛔⛔ RESTORED 3 Aug 2026 AFTER A REWRITE, ON HIS INSTRUCTION: "change back the copy to
         what I gave you." Another terminal had restructured this item the same afternoon,
         cutting the numbered list, promoting the last paragraph to the spine and adding
         sentences he had not written ("The tools have improved dramatically", "A vague ask
         gets you a vague report"). Its commit is 752b47b if the reasoning is ever wanted.

         ⭐⭐ THE RULE THIS BREAKS IS THE OLDEST ONE IN THE FILE, and it is worth naming rather
         than filing away: HIS WORDS ARE THE ONLY SOURCE OF COURSE CONTENT. A restructure that
         improves an argument is still a rewrite. Diagnose in chat, propose in chat, and let
         him hand back the new version. Do not edit his prose and describe it as his.

         ⭐ THE THREE NUMBERED LINES ARE ONE PARAGRAPH with single newlines, not three
         paragraphs. Body draws a block whose every line is numbered as an <ol>. Split into
         separate paragraphs they take a 30px gap each and stop reading as a list.

         ⚠️ TITLE STILL HIS. "Deep research" is his own phrase from 2 Aug and stands in until
         he names it. His own point 1 notes Claude calls the feature "Research".

         ⚠️ HIS LAST LINE SAYS "some decent websites", PLURAL, and only one prompt website is
         linked. The OpenAI prompt optimizer was cut during the rewrite. Restoring his copy
         puts that plural back without putting the link back. His call. */
      figure: "fig-35",
      text: "A year ago, using AI for research felt risky. Too many hallucinations. Flaky results. I don't feel that way now. The tools have improved dramatically. If you plan it properly, you can get really good results in 20 minutes. It won't replace talking to customers, but can save hours and weeks.\n\nA few things.\n\n1 - Claude, ChatGPT and Gemini all have 'deep research' features. Claude just calls it \"Research\" but it's the same thing.\n2 - You need to write a decent research brief.\n3 - I often run all three in parallel and get them to critique and build on each other.\n\nThe way I get to a good research brief? I ask Claude. So I explain what I want, explain that I plan to click the Research button, and I want it to convert my bad prompt into a rigorous research brief prompt. That's it. There are also some decent websites you can use to help you write better prompts.",
      /* ⭐⭐ THE OPENAI LINK IS GONE, Paul's call, 3 Aug 2026: "lose the chatgpt link." It was
         platform.openai.com, the developer platform rather than ChatGPT, a separate login
         from a ChatGPT subscription that returns 403 to anyone not signed in. He wrote it up
         as being "for anybody with ChatGPT account", so the link would have walled the very
         reader it named. Flagged when it went in, cut when he saw it.

         ⚠️ NOTHING IN THE BODY POINTS HERE ANY MORE. The old last line, "some decent websites
         you can use to help you write better prompts", went with the restructure, so this is
         now a bare offer rather than a promise the copy made. That reads fine, but if a
         second link ever returns, the plural has to come back with it.

         ⭐ Prompt Cowboy title read off the live page. He was explicit that he does not use
         it, "I don't use this one, but it often mentioned", so nothing here implies he does.
         ⚠️ Its own page calls it "#1 prompt generator", which is the site's marketing claim
         and not ours. Recorded as its name because that is the name, but if a self-awarded
         #1 sitting in Paul's course reads as an endorsement, trim it to "Prompt Cowboy". */
      reading: [
        /* ⭐ Paul's link, 3 Aug 2026: "a good link about reserach from Ethan Mollick, who is
           an expert I'd recommend following". FIRST on purpose: it is about research itself,
           where Prompt Cowboy below is a tool.

           ⚠️ TITLE READ OFF og:title, NOT the slug and NOT <title>. Substack serves a useless
           <title> on this page and its <h1> is the publication name, "One Useful Thing", not
           the piece. The slug would have given the same answer here, and that is luck.
           ⛔ ?utm_source=publication-search stripped. Fourth pasted URL today carrying one. */
        {
          title: "Four Singularities for Research",
          by: "Ethan Mollick",
          url: "https://www.oneusefulthing.org/p/four-singularities-for-research",
        },
        {
          title: "Prompt Cowboy",
          by: "promptcowboy.ai",
          url: "https://www.promptcowboy.ai/",
        },
      ],
    },
    {
      /* ⭐⭐ PAUL'S WORDS AND HIS HEADLINE, 3 Aug 2026. The last draft copy in module 1 is
         gone: every item is now his. It replaces "Talk, don't type", written for him in May.

         ⭐ fig-28, "you talk, it types". It has been built and unused since he named this as
         #2 on his list of nine on 2 Aug. Paul, 3 Aug: "there is a figure for this."

         ⚠️ ONE PRODUCT NAME REPAIRED, AND IT MATTERED MORE THAN THE USUAL SLIP. He dictated
         "Monlogue"; the app is Monologue, verified live at monologue.to, "Dictation, voice
         notes, and bot-free meeting notes". Shipping the misspelling would have sent students
         looking for an app that does not exist.
         ⚠️ ONE GRAMMAR SLIP REPAIRED: "more nuanced ways that if you have to think" -> "than
         if". Both his to put back.
         ⚠️ LEFT EXACTLY AS HE SAID IT: "I click a button on laptop", missing a possessive.
         That is spoken register rather than an error, and the voice spec says it stays.

         ⛔ THE PROMPT IS GONE, his call, 3 Aug 2026: "delete this... That was me thinking out
         loud. Turn it into three clear points and a next step. from voice app."

         ⭐ IT WAS FLAGGED WHEN THE NEW COPY WENT IN, and the flag was the right one: his own
         line from the May article, kept because it fitted, cut because his new copy never
         points at it. Item 04 names its button in the prose; this one had a paste block
         nobody had asked the reader to use. It is in git and in the May article if it ever
         earns a sentence pointing at it. */
      t: "Use a Voice App",
      figure: "fig-28",
      text: "I rarely type anymore. I use a voice app. The one I use is Monologue. I click a button on laptop, talk and when finished talking, click the button again. My typing is getting worse but I get through a lot more, using this.\n\nPart of what is good about AI is that you can just chat, and ramble on and rant. So you can express yourself faster and in often more nuanced ways than if you have to think about what to type.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* MODULES 2 TO 6, REGISTERED AND EMPTY                                 */
/* ------------------------------------------------------------------ */

/**
 * ⭐⭐ PAUL, 3 Aug 2026: "I want to follow exact pixels from module 1, colours, hex, line
 * weight, font, decisions on window, figures etc." HE ALREADY HAS THAT AND IT COST NOTHING,
 * which is the only reason these five are eight lines each instead of an evening each.
 * `/course/[n]` has one renderer, `ModuleClient`, so a module cannot look different from
 * module 1 unless someone writes a second renderer. ⛔ Nobody should. The look is not
 * copied here, it is inherited, and that is the difference between five pages that match
 * today and five pages that still match after the next change to module 1.
 *
 * ⭐ WHAT IS ACTUALLY MISSING IS CONTENT, and these say so honestly by carrying `items: []`
 * rather than a plausible-looking placeholder list. An invented item would render exactly
 * like a real one.
 *
 * ⭐ EVERY FIELD BELOW IS ALREADY HIS. Titles and dates are read across from
 * `courseModules.ts`; blurbs are the locked copy in `courseCopy.MODULE_BLURBS`, verbatim,
 * some of it signed off line by line on 19 Jul. ⛔ Nothing here was written for him.
 *
 * ⚠️ NO `titleHl` AND NO `opening` ON ANY OF THEM, deliberately. Both are optional and the
 * type's own comments say modules 2 to 6 are exactly where the fallbacks apply: a plain
 * headline, and the blurb standing in until he writes an opening. A blue word guessed here
 * would be a silent wrong answer, because a headline always renders.
 *
 * ⛔ `built` STAYS FALSE ON ALL FIVE. Registering a module is not building one, and the
 * doctrine on that field is older than this file.
 */
const stub = (
  n: number,
  title: string,
  when: string,
  on: string,
  blurb: string,
): ModuleDef => ({ n, title, when, on, built: false, blurb, items: [] });

/* Titles drop the "(N) " prefix from courseModules.ts for the same reason MODULE_1 does:
   the page eyebrow already reads "Module N of 6", so the prefix printed the number twice. */
/**
 * ⭐⭐ MODULE 2 IS NO LONGER A STUB. Paul, 3 Aug 2026: "do you have the content from original
 * module 2. i spend a lot of time on it. Can we transfer into the proper ux / ui of our
 * module template."
 *
 * ⭐ THE CONTENT CAME FROM THE MARKDOWN, NOT FROM `module-2-proto.html`. The prototype is a
 * 1.3MB standalone page and it is the SECOND COPY that caused the two-places problem this
 * file exists to end. Its markup carries no items to port anyway. What was worth having was
 * always beside it: `module-2-item-01-prose.md`, approved by Paul on 26 Jul and written with
 * him line by line, which is the item below, verbatim and unedited.
 *
 * ⛔ WHAT IS DELIBERATELY NOT HERE, so nobody reads one item as the whole module. The middle
 * of the module, the walkthrough itself, is unwritten: "The brand pack exists, the copy at
 * the end exists, the middle does not." Adding a plausible item for it would put Paul's own
 * build to-do list in front of a learner, which is the exact failure the cut type badge was
 * cut for.
 *
 * ⚠️ IGNORE "THE TEN STEPS" IF YOU MEET IT IN AN OLDER NOTE. Module 2's own handover called
 * the middle "the ten steps of the walkthrough", and `kite/README.md` still says "in ten
 * steps". Paul killed that framing on 26 Jul, the same day: "they're not part one, part two,
 * and part three. They don't go in that order... They're just three things that they're going
 * to do." Nothing may number the walkthrough.
 *
 * ✅ RESOLVED 3 Aug 2026: the seven writer downloads and the Kite pack used to live only in
 * `course-build/`, unreachable from any page. They are in `files` below. Paul's ruling:
 * "Just have them all listed connected to module 2."
 *
 * ⛔ THE FILES THEMSELVES ARE NOT UNDER `public/`, and that is deliberate rather than
 * tidiness. They shipped there first and every one of them answered 200 to anyone with the
 * URL while the page around them was gated, because a static asset is served before any
 * page code runs. They now sit in `course-files/` at the repo root and are served by
 * `api/course-file/[...path]`, which checks the same cookie the module page checks.
 */
export const MODULE_2: ModuleDef = {
  n: 2,
  title: "Slow, then fast",
  when: "Mon 5 Oct",
  on: "2026-10-05",
  built: false,
  blurb: MODULE_BLURBS[2],
  /**
   * ⭐⭐ THE OPENING, MOVED HERE 3 Aug 2026. Paul: "this information is meant to be the top
   * knot in topic one... I did a fair bit of writing for the original one."
   *
   * ⛔ IT WAS WRONG AS AN ITEM AND THAT IS THE WHOLE CORRECTION. It shipped earlier today
   * as item 01, "Why slow, then fast", which made the module's opening argument read as
   * lesson one of one. On the prototype it is the top of the page, above the contents,
   * before anything is numbered. `opening` is the slot that already means exactly that.
   *
   * ⛔⛔ TWO PARAGRAPHS. PAUL CUT IT HIMSELF ON 3 Aug 2026 AND THIS IS THAT VERSION,
   * VERBATIM: "I've cut it back to this". It replaced a three-paragraph version, which had
   * itself replaced a five-paragraph one, all on the same evening. What went in the cut:
   *   - the bad ad line, "A bad ad made in four seconds is still a bad ad, and now there
   *     are four hundred of them", which had opened the piece since 26 Jul
   *   - the list of steps (motivations, positioning) and the list of speed-ups (research,
   *     admin, finding gaps). Both are now one sentence each.
   *   - "Do that as quickly as you can, but do not skip it, do not rush it, and do not
   *     make it sloppy"
   * ⭐ AND ONE THING WAS ADDED, which is the argument the cut was making room for: spend
   * the time upfront, automate later, get the speed without compromising quality. The old
   * version said the slow parts come first; this one says why that pays.
   * ⭐ "an AI Writer", capitalised, is his. It was "a writer" until this version.
   * ⛔ Do not rewrite, tighten or reorder it, and do not restore anything listed above.
   */
  opening:
    "Good marketing still requires doing the marketing. You will not get that from the click of a button. But it is worth thinking about appropriate speed. There are ways to speed up some of the steps. The way I think about this is if we spend the time upfront, and do proper thinking, we can then automate later, and get real speed benefits, without compromising quality.\n\nIn this module I take one example, building an AI Writer, and you will see that all the slow parts come first. It is one example. Every time you make anything, the marketing goes in at the beginning.",
  items: [
    {
      /* ⭐ PAUL'S WORDS, VERBATIM, approved 26 Jul 2026. Five paragraphs, about 170 words,
         cut down from a nine-paragraph draft that made the same argument three times.
         ⛔ Do not edit without him, and do not tighten. Two compressed rewrites of his own
         points were rejected during the drafting: "what moves them" and "where you stand in
         their heads against the alternatives" both lost to the longer, plainer versions
         below. His rule, verbatim: "we're not trying to be clever or off the cuff. I'm
         clinical and plain speaking." */
      /* ⭐⭐ THE NEXT THING ON THE PROTOTYPE AFTER THE OPENING, and it had never reached
         this file. Paul's words, verbatim from `module-2-proto.src.html`, which is the
         page he wrote on 26 Jul.

         ⛔ THIS SLOT USED TO HOLD THE OPENING, WHICH WAS THE BUG. Item 01 was "Why slow,
         then fast" and carried the module's opening argument, so moving that argument to
         `opening` left the same words on the page twice. Restoring what the prototype
         actually has here fixes both at once: the duplicate goes, and two paragraphs of
         his writing that were never ported arrive.

         ⚠️ "Building a writer" IS A SECTION LABEL ON THE PROTOTYPE, sitting above this,
         not a title of its own. It is not reproduced as an item title because the page
         has no section layer, and inventing one to hold two words would be building a
         structure Paul has not seen. FLAGGED TO HIM.

         ⛔ STILL MISSING FROM THIS MODULE, so nobody reads this as the port being done:
         the prototype's SIX figures (fig-11, anim24, fig-01, fig-16, fig-18, anim6), and
         the walkthrough itself, which was never written in any version. */
      /* ⭐⭐ THE AI WRITER FIGURE, Paul 3 Aug 2026: "Added the figure for the AI Writer.
         It's figure 11 in our library." Its own label: "Four blocks you already own
         combine into one writer".

         ⭐ IT IS A LIBRARY FIGURE, WHICH IS WHY THIS IS ONE WORD AND NOT A PORT. The
         prototype carried six drawings lifted out of `module-2-wireframe-v2.html`, and
         that file is not the library, which is exactly why the first port walked past all
         six. fig-11 is the one of them that has since been promoted into
         `course-figures.html`, so the app already holds it and `figure` just names it.
         ⚠️ The other five (anim24, fig-01, fig-16, fig-18, anim6) are NOT the same case.
         fig-01, fig-16 and fig-18 share ids with library figures but were taken from the
         wireframe, so they must be checked against the library before anyone assumes the
         name means the same drawing. Not done. */
      /* ⭐ SWAPPED fig-11 -> fig-12 ON PAUL'S INSTRUCTION, 4 Aug 2026: "The figure we have
         for 01 is static. I want to use the animated one." They are the SAME DRAWING with
         the same label; fig-12 is `anim6`, `animated: true`, and fig-11 is the still of it.
         ⚠️ The 3 Aug session recorded anim6 as having NO library equivalent, which is why
         the port left it out. That was already stale: it is in `figures.generated.ts`. */
      figure: "fig-12",
      /* ⭐⭐ TITLE AND COPY REPLACED WHOLESALE BY PAUL, 4 Aug 2026, dictated. This
         SUPERSEDES the 26 Jul copy that decisions section 6b marked as his and not to be
         rewritten: he wrote that one and he has now replaced it himself.

         ⛔ OUT, and not to be restored: "Once it is built, you open a chat inside the
         writer project...", the three-segment-personas sentence, and the promise of the
         interviewer for anyone without positioning work. That last one matters, because
         26 Jul recorded it as THE ONLY PLACE ON THE PAGE the interviewer was promised.
         It is now promised nowhere. FLAGGED TO PAUL.

         ⭐ The new copy does a different job: it names the objection (AI writes slop),
         concedes it, then lists what a writer has to be given. The title moved from an
         outcome ("What you end up with") to the thing itself ("An AI Writer").

         ⚠️ TWO FIXES, BOTH ON PAUL'S STANDING INSTRUCTION OF 4 Aug: "You can fix grammar
         problems when you see them. Fix them before you put them live."
         1. Dictation slip: "on how want the writer" -> "on how we want the writer".
         2. Number agreement: "Writers need to know... It needs to know" -> "They need to
            know". Fixed on the SECOND sentence so his opening phrase is untouched. */
      t: "An AI Writer",
      text: "I read a lot about how AI writes slop. It does. But it doesn't have to. If you spend time up front. Writers need to know your brand's positioning, your target audience, insights or pain points related to your category. They need to know your brand's messaging, and your tone of voice. On top of that, we need to articulate instructions on how we want the writer to interact with us or our colleagues.\n\nI'll show you the process. It is not hard, and I'll give you the docs you need. We'll work through a fictional example of an insurance brand.",
    },
    {
      /* ⭐ ITEM 02 OPENED BY PAUL, 4 Aug 2026: "The next section is going to be called Kite,
         fictional insurance brand", confirmed as item number two. THE TITLE IS HIS. The
         prose is NOT written yet and is marked `placeholder` so the build view counts it and
         nobody mistakes it for his words.

         ⛔ HE SAID "SECTION" AND THIS IS AN ITEM, because the app has no section layer and
         inventing one has been refused twice before (the prototype's "Building a writer"
         label was left out for exactly this reason). Flagged to him when it was built. If he
         does want a grouping heading, that is a page-structure decision, not this line.

         ⛔⛔ KITE IS FICTIONAL, invented with Paul on 26 Jul 2026, and so are its
         competitors, customers, numbers and quotes. It may never be shown as a real company,
         and its fiction warning already renders ABOVE its file list further down the page. */
      /* ⭐ HIS WORDS, DICTATED 4 Aug 2026, verbatim. Two fixes and nothing else, both under
         his standing instruction to fix problems rather than flag them:
         1. "Okay" -> "Ok". He corrected this himself, mid-dictation: "ok not okay".
         2. "you're gonna need" -> "you're going to need". A dictation artefact rather than
            a word he chose; "gonna" appears nowhere else in his course copy.
         ⛔ NOT touched: "If you've this work done" is correct Hiberno-English and is his
         voice. "All sorts of marketing communications." stays a fragment. "won't come from
         the robots" is his phrase and is the best line in the paragraph.

         ⭐ TWO BULLETS ADDED 4 Aug ON HIS INSTRUCTION, "We can add the competitors and
         proof." His five things covered only four of Kite's six documents, and the two with
         nothing pointing at them were `competitors.md` and `proof.md`. They are not extras:
         `positioning-statement.md` says at the top that it FEEDS ON audience, competitors
         and proof, so a reader who opened positioning saw both named as its inputs and had
         no way to reach either. Placed after the insights line so the chain reads audience,
         competitors, proof, then the messages and tone that come out of them.

         ⛔ "What you can prove" WAS REJECTED THE SAME HOUR. Paul: "We don't say what you can
         prove. This is marketing language, not making up ad stuff." It reads as ad copy
         rather than the name of a document a marketer already owns. Every other line in this
         list is "Your [artefact you have]". ⭐ HIS WORDING IS "Your proof points", given
         immediately after the rejection. Not "Your proof", which I had reached for: proof
         points is what a marketer calls the thing, and the document is a LIST of them.
         ⭐ Generalises: a label in this list NAMES A DOCUMENT in the words its owner would
         use. The moment one starts selling the idea instead, it is wrong.

         ⚠️ STILL UNRESOLVED, HIS CALL: "Your target audiences or segments" and "Insights
         about them or their pain points" BOTH resolve to `audience.md`, whose three segments
         carry their own triggers. Once the bullets are links, the second one will look
         broken. Either they merge into one line, or the second points somewhere else. */
      t: "Kite, fictional insurance brand",
      /* ⛔ BUILD ORDER, NEVER SORTED. Each document feeds the next. It also quietly resolves
         the duplicate that the bullets exposed: "your audiences" and "insights about their
         pain points" were two bullets pointing at one file, and a folder has no such
         problem because `audience.md` is simply one row carrying both. */
      docs: {
        dir: "module-2/kite",
        folder: "kite/",
        files: [
          "audience",
          "competitors",
          "proof",
          "positioning-statement",
          "tone-of-voice",
          "messaging-framework",
        ],
      },
      text: "Ok, so you are the marketing manager responsible for Kite, an insurance brand. And you want to build an AI writer to help you write emails, write copy for the website, write social posts, write training guides. All sorts of marketing communications. You're going to need the following things.\n\n{{FOLDER}}\n\nThis is the slow part. In the sense that decisions on your positioning, your messaging, your tone of voice won't come from the robots. This is the hard work that marketers do. If you've this work done, you're 90% sorted. If not, don't worry, as I'll show you how to speed up this work too. For now, we'll assume Kite has all this information.",
    },
    {
      /* ⭐ ITEM 03 OPENED BY PAUL, 4 Aug 2026. His headline, his figure: "topic three is
         going to use figure 26, which is an animated project. Headline is: Start a new
         Claude Project."

         ⭐⭐ THIS IS THE ONE GENUINELY NEW IDEA IN THE MODULE, and it is why the item exists
         where it does. Item 02 said here is the information you need; this says here is
         where you put it so the writer reads it EVERY time. For a marketer who has only
         ever used a chat box, a project being a FOLDER the model reads on every turn is the
         concept the whole module turns on. It was part three of the five agreed on 26 Jul.

         ⭐ fig-26 is `anim26`, animated, "a strip of three cards: a project with its
         instructions and files". It was in `module-2-proto.html` and never made the port;
         it is in the library now, so this is one word rather than a port.

         ⭐ HIS WORDS, DICTATED 4 Aug, and he asked only for typos: "I think the grammar here
         is fine. Just look for typos." ONE FIX MADE: "drop in your documents into the files"
         -> "drop your documents into the files". A doubled preposition from dictating, not a
         style judgement, and it falls under his standing instruction of the same morning to
         fix problems rather than flag them. ⛔ Nothing else touched. "So" opens both
         paragraphs because that is how he talks, and "etc." stays.

         ⭐⭐ SECOND PARAGRAPH REWRITTEN 4 Aug TO SAY WHAT ACTUALLY HAPPENS. The first
         version promised "two more files" and only one of them was a file: `slop-rules.md`
         existed, but "how you want your AI writer to interact with you" was the "How you
         work" section INSIDE `writer-dna.md`, and `claims-and-sources.md` existed and went
         unmentioned. A learner would have hunted a file that is not there and walked past
         one that is. Paul: "we just say what actually happens, which is we put the writer
         DNA into their instructions... say there are three more files."

         ⭐ AND THE DISTINCTION IS THE TEACHING, not a correction. Two of the three go in the
         files panel; `writer-dna.md` goes in the project INSTRUCTIONS, because it is the
         file that says what every other file is and when to read them. Its own first line is
         "# Instructions for Claude". A reader who drops it into files with the rest has a
         project whose instructions are empty and a writer that reads its own manual as if it
         were brand knowledge.

         ⚠️ ONE WORD ORDER CHANGED FROM HIS DICTATION: he said "Sources and claims", the
         file is `claims-and-sources.md` and that is what the file list on this same page
         prints. Matched to the artefact so a reader is not hunting for the wrong name.
         Trivial to flip back if he prefers his order.

         ⚠️ ONE SENTENCE HERE IS MINE, NOT HIS, written on his invitation ("I'll mention it
         also, or you can mention it also"): "None of these three are Kite's. They are the
         same for every brand, so take them now and use them on any writer you build."
         ⛔ It is the only line in this module not dictated by Paul. Replace it with his
         wording when he has it. */
      /* ⭐⭐ THE SECOND FOLDER ON THE PAGE, AND THE PAIR IS THE POINT. Paul, 4 Aug: "Am I
         right in saying that the AI slop, the writer DNA, the sources and claims are
         documents that users can take because it's not just connected to Kite?... we're
         saying these three documents you can use yourself now. They can be used for any AI
         writer." He is right, and the page already said it at the foot: "the last five are
         the same for every brand." Nothing in these three mentions Kite.

         ⭐ SO ITEM 02'S FOLDER IS `kite/` AND THIS ONE IS `writer/`, and the contrast does
         the teaching that a single flat list could not: one folder is the slow work only
         they can do, the other is what we hand them. That is the same reason the file sets
         at the foot of the page are two lists and not one.

         ⚠️ `writer/` IS HONEST EVEN THOUGH ONE OF THE THREE DOES NOT END UP IN A FILES
         PANEL. It is the folder they DOWNLOAD; the prose says where each one then goes.
         ⛔ Do not retitle it "files", which the copy directly contradicts one line above. */
      figure: "fig-26",
      docs: {
        dir: "module-2/writer",
        folder: "writer/",
        files: ["claims-and-sources", "slop-rules", "writer-dna"],
        as: "links",
      },
      t: "Start a new Claude Project",
      text: "So create a new project in Claude. And drop your documents into the files on the right side of your project page. So these would include your positioning, your messaging framework, tone of voice etc.\n\nThere are three more files, and these ones are specific to AI. One is claims and sources. One is slop rules. Those two go in with the rest. The third is the writer DNA, and that one doesn't go into your files. It goes into your instructions.\n\nNone of these three are Kite's. They are the same for every brand, so take them now and use them on any writer you build.",
    },
    {
      /* ⭐⭐ ITEM 04, THE WRITER WORKING. Paul, 4 Aug: "this is where we actually see a
         question being asked in a chatbot, and we see the user experience based on the DNA on
         how it should work. This is different to what we had before. What we had before was
         just showing the output."

         ⭐ SO IT IS THE ONLY ITEM ABOUT BEHAVIOUR RATHER THAN AN ARTEFACT. Items 01 to 03 show
         finished things: a writer, a folder of documents, a project. This shows what it is
         like to work with the files they have just installed, which is the payoff of doing the
         slow part.

         ⛔ RECORDED, NOT LIVE, on his ruling: "I'm not sure there is huge benefit v risk of
         running it live." One session, the same every time, no API. ⛔ But recorded from a
         REAL run, never written: we hand people the files, so anyone can run it and compare
         within minutes.

         ⚠️ PROSE NOT WRITTEN. The window carries the session; Paul's words around it are
         still to come, which is why this is `placeholder`.

         ⭐ A SECOND WINDOW, 4 Aug 2026, on Paul's ruling: the social post session, run WITH
         the missing-file gap so the writer's refusal to invent a rulebook is real and on
         show. Two windows, not one longer one: each is one recording with its own start
         plate, and the reader chooses to watch the second. Both recordings live in
         `writerSession.ts`; the hover source maps are part of the recordings. */
      t: "Watch it work",
      text: "AWAITING PAUL'S WORDS.\n\n{{SESSION}}\n\n{{SESSION_POST}}",
      session: true,
      placeholder: true,
    },
    {
      /* ⭐ ITEM 05, THE INTERVIEWER, CLOSING THE MODULE. Paul, 4 Aug 2026: "if you don't
         have positioning work and messaging work, I've also built an assistant that you can
         download into your cloud, and it can help you pull out your messaging and everything
         into a messaging framework for you", and his ruling the same evening: make the
         interviewer the closing item. This resolves the 4 Aug flag on item 01: the
         interviewer was promised nowhere on the page after his rewrite. Now it is promised
         here, as the on-ramp for the reader who hit item 02 with none of the slow work done.

         ⭐ DEPTH RULED, 4 Aug: prose plus the file, NOT a third recorded session. A recorded
         interview needs someone to play the learner for twenty turns and lengthens an
         already long module. If the item feels thin later, a recording can be added.

         ⚠️ PROSE NOT WRITTEN, and THE TITLE IS MINE, NOT HIS, a working label so the rail
         reads sensibly until he gives the words. Both await Paul. */
      t: "No positioning done yet?",
      docs: {
        dir: "module-2/writer",
        folder: "writer/",
        files: ["brand-interviewer"],
        as: "links",
      },
      text: "AWAITING PAUL'S WORDS.",
      placeholder: true,
    },
  ],
  /* ⛔ ORDER IS THE LESSON IN BOTH SETS AND NEITHER MAY BE SORTED.
     The writer set runs in install order: the DNA goes in first, the interviewer runs once
     and can then be deleted, and the last five are the same for every brand.
     The Kite set runs in the order the documents were BUILT, because each one feeds the
     next: positioning cannot be written until audience, competitors and proof exist. The
     Kite README says so in as many words: "That order is the lesson, so do not reorder
     them on the page." */
  files: [
    {
      title: "Your writer",
      blurb:
        "Seven files. The first two set it up, the last five are the same for every brand.",
      files: [
        {
          name: "writer-dna",
          what: "The instructions. What every other file is, when to read it, and how the writer behaves.",
          href: "/api/course-file/module-2/writer/writer-dna.html",
          take: "/api/course-file/module-2/writer/writer-dna.md",
        },
        {
          name: "brand-interviewer",
          what: "Interviews the learner and hands back the six brand documents below.",
          href: "/api/course-file/module-2/writer/brand-interviewer.html",
          take: "/api/course-file/module-2/writer/brand-interviewer.md",
        },
        {
          name: "slop-rules",
          what: "Two passes, words then patterns.",
          href: "/api/course-file/module-2/writer/slop-rules.html",
          take: "/api/course-file/module-2/writer/slop-rules.md",
        },
        {
          name: "claims-and-sources",
          what: "The ledger that makes the writer prove things or admit it cannot.",
          href: "/api/course-file/module-2/writer/claims-and-sources.html",
          take: "/api/course-file/module-2/writer/claims-and-sources.md",
        },
        {
          name: "format-email",
          what: "Craft of the format.",
          href: "/api/course-file/module-2/writer/format-email.html",
          take: "/api/course-file/module-2/writer/format-email.md",
        },
        {
          name: "format-blog",
          what: "Craft of the format.",
          href: "/api/course-file/module-2/writer/format-blog.html",
          take: "/api/course-file/module-2/writer/format-blog.md",
        },
        {
          name: "format-web-page",
          what: "Craft of the format.",
          href: "/api/course-file/module-2/writer/format-web-page.html",
          take: "/api/course-file/module-2/writer/format-web-page.md",
        },
      ],
    },
    {
      title: "Kite Insurance, worked",
      blurb:
        "The same six documents, already filled in, so you can see what finished ones look like before you write your own.",
      warn:
        "Kite does not exist. It was invented for this course, and so are its competitors, its customers, its numbers and its quotes. Nothing in these files is research.",
      files: [
        {
          name: "audience",
          what: "Three segments with their share of the market, their trigger, and what we say to each first. Plus the 27% turned down on purpose.",
          href: "/api/course-file/module-2/kite/audience.html",
          take: "/api/course-file/module-2/kite/audience.md",
        },
        {
          name: "competitors",
          what: "Three invented competitors, the claims that are the category entry fee and may not be used, and staying put as the largest competitor of all.",
          href: "/api/course-file/module-2/kite/competitors.html",
          take: "/api/course-file/module-2/kite/competitors.md",
        },
        {
          name: "proof",
          what: "The numbers with their sources, one deliberately marked [unverified], and an honest list of what Kite cannot prove yet.",
          href: "/api/course-file/module-2/kite/proof.html",
          take: "/api/course-file/module-2/kite/proof.md",
        },
        {
          name: "positioning-statement",
          what: "The four slots, the two rejected versions with reasons, and the founder's decision in her own words.",
          href: "/api/course-file/module-2/kite/positioning-statement.html",
          take: "/api/course-file/module-2/kite/positioning-statement.md",
        },
        {
          name: "tone-of-voice",
          what: "Whose voice it is, the five beats, the device, what it never does, and a worked example.",
          href: "/api/course-file/module-2/kite/tone-of-voice.html",
          take: "/api/course-file/module-2/kite/tone-of-voice.md",
        },
        {
          name: "messaging-framework",
          what: "Value proposition, three pillars, the three by three grid, and what we will never say.",
          href: "/api/course-file/module-2/kite/messaging-framework.html",
          take: "/api/course-file/module-2/kite/messaging-framework.md",
        },
        {
          /* ⚠️ NOT IN THE KITE README's numbered list, which stops at six. This file was
             built the same day for the AI Writer agent card and its own header carries the
             provenance: "Written by Paul, 26 July 2026, and this is the approved copy."
             Described from what the file actually contains rather than from the README,
             because the README never described it. */
          name: "segment-emails",
          what: "One email to each of the three segments, written by Paul.",
          href: "/api/course-file/module-2/kite/segment-emails.html",
          take: "/api/course-file/module-2/kite/segment-emails.md",
        },
      ],
    },
  ],
};
export const MODULE_3 = stub(
  3,
  "Create adjacent value",
  "Mon 19 Oct",
  "2026-10-19",
  MODULE_BLURBS[3],
);
export const MODULE_4 = stub(
  4,
  "System thinking",
  "Mon 2 Nov",
  "2026-11-02",
  MODULE_BLURBS[4],
);
export const MODULE_5 = stub(
  5,
  "Building marketing agents",
  "Mon 16 Nov",
  "2026-11-16",
  MODULE_BLURBS[5],
);
export const MODULE_6 = stub(
  6,
  "Tackle difficult problems",
  "Mon 30 Nov",
  "2026-11-30",
  MODULE_BLURBS[6],
);

/** Every module, by number. Adding module 2 = one import and one line here. */
export const MODULES_BY_N: Record<number, ModuleDef> = {
  1: MODULE_1,
  2: MODULE_2,
  3: MODULE_3,
  4: MODULE_4,
  5: MODULE_5,
  6: MODULE_6,
};
