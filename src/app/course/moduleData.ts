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
  /** Short description of the screenshot needed. Its presence means the item owes a picture. */
  grab?: string;
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
      text: "This matters more than anything else here, and it's the easiest thing to miss. There's a dropdown at the top of Claude or ChatGPT with a list of models in it. Pick the most capable one, the Opus or the top GPT, not whatever your plan opened with. Use that for anything hard, drop to the faster model for quick lookups, and if there's a “thinking” or “extended reasoning” toggle, turn it on for the harder problems. The difference between this year's best model and last year's is bigger than anything you can do with wording.",
      grab: "The model dropdown, open",
    },
    {
      t: "Brief it like a person",
      text: "It knows nothing about my week until I tell it, so I give it what I'd give a good new hire. I use the same five headings every time. The same question with those five lines gets a much better answer.",
      prompt:
        "Task: what I actually want.\nBackground: the context around it.\nAudience: who it's for.\nFormat: the shape I want back.\nBar: what good looks like.",
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
