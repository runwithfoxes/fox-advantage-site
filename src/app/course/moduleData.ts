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
  /** Marks anything Kit wrote standing in for Paul's words. Drives the build layer. */
  placeholder?: boolean;
};

export type ModuleDef = {
  n: number;
  title: string;
  when: string;
  on: string;
  /** ⭐ NOTHING SAYS LIVE UNTIL IT IS LIVE. Same doctrine as courseModules.ts:
   *  a module reads live only when its date has passed AND it is genuinely built.
   *  Never simplify to a date check. */
  built: boolean;
  /** Paul's locked description, verbatim from courseCopy.MODULE_BLURBS. */
  blurb: string;
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
  source: "Paul's own article, 21 May 2026",
  when: "Mon 21 Sep",
  on: "2026-09-21",
  built: false,
  blurb:
    "A small number of habits get you most of the way with AI in marketing work. Talking to it instead of typing. Keeping a campaign in one project instead of scattered chats, showing it the content you liked rather than describing it.",
  items: [
    {
      t: "Check which model you're on",
      /* Replaced 2 Aug 2026. Paul dictated this to Dray to stand in place of the 21 May
         article's version. His words, verbatim, paragraph breaks his. */
      text: "Be intentional about what version of AI model you're on. And switch depending on the task. There is a big difference in quality.\n\nFor example, I use Opus 4.8 (and now Opus 5) on Claude a lot. I find it to be accurate and capable of doing complex tasks. But if you're just asking simple questions, you might switch to their Sonnet.\n\nWhy not stay on Opus all the time? Cost. There is an argument that staying on Opus is cheaper in long run, as you get accuracy faster, in fewer prompts. My main point is be aware, test and be intentional.",
      grab: "The model dropdown, open",
      figure: "fig-14",
    },
    {
      /* ⭐ TITLE IS PAUL'S, 2 Aug 2026. It replaces "Brief it like a person", which he
         rejected because it presupposes the subject: on item 2 of day 1 nobody has yet
         said what prompting is, so "brief it" reads as brief who. His rule, verbatim:
         a title has to name the activity and the lesson. */
      t: "When prompting, give AI context",
      /* ⚠️ TEXT IS DRAY'S, NOT PAUL'S. Marked placeholder so it carries the orange
         marker on the page and stays off the public /course/everything list until he
         records over it. The change it makes: name AI once, then the five lines are in
         the prose rather than hiding in the copy block underneath. Paul's objection to
         the original was that every "it" had no antecedent. */
      placeholder: true,
      /* ⭐ RULE, PAUL, 2 Aug 2026: SAY IT DIRECTLY, DO NOT CLAIM A HABIT HE DOES NOT
         HAVE. This line used to read "So I give it the same five lines every time."
         His words: "the truth is I don't prompt much any more... I'd rather say it
         directly. So 'try using a prompt like this' not what I do or don't do."
         First person is allowed where it is TRUE and earns its place (item 01 is his
         own dictated practice and stays). It is not the default register. */
      text: "Tell AI who the work is for. A report for the CFO is a different thing to a report for your team, and it cannot know which one you meant. Try a prompt like the one below. The last line, what a good one looks like, is the easiest to skip and does the most work.",
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
      /* Paul's words, verbatim, written 2 Aug 2026. Three paragraphs, his breaks. The only
         change made to what he sent is "personal" -> "persona", a dictation slip.

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
      text: "We can use AI to help improve the quality of our marketing. This is different to using AI to get us faster answers. So this is all about quality. One example is using it to see gaps in our thinking or get perspectives from others.\n\nFor example, say you're preparing your marketing plan. You can use AI to get the perspective of a CFO before you send to your CFO. To try this out (1) upload your plan into a Claude chat (2) click on the 'Copy CFO Prompt' button and paste into the same chat and (3) click return.\n\nThe prompt is telling your AI to assume the persona of a CFO with instructions on what to look for. If you haven't done this before, you'll be impressed with the quality of the response.",
      figureFile: "/course/rwf-fig-persona-cfo.svg",
      /* The persona itself, Paul's verbatim copy, pulled from the canonical file by
         scripts/extract-personas.py. Never hand-typed and never edited here. */
      prompt: PERSONAS["cfo-persona"],
      promptLabel: "Copy CFO prompt",
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
      t: "Turn it into your harshest critic",
      text: "Sometimes I want a sparring partner with no manners, so I tell it exactly that. Better it finds the weak spot now than a real critic finds it later.",
      prompt:
        "You're a sceptical buyer and you're not here to help me. Find the weakest line, quote it back to me, and finish with the one question I can't answer yet.",
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
      t: "Turn your best chats into a system",
      text: "A one-off chat forgets everything the moment I close the tab, so the good ones I keep. In Claude they're Projects, in ChatGPT a Project or a Custom GPT, in Gemini a Gem. I load one with my brand guide, three examples and my standard for good, and after that it starts every job already knowing them. I build a narrow one for each job: one that only checks copy against the claims we're allowed to make, one that only preps me for a call. The more narrow the job, the better it does it.",
      grab: "A Project, set up",
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
