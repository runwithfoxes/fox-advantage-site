/* The ONE file you edit to keep this page live.
   Klara / Jo / Dray: change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "Aubrey McCarthy",
  slug: "aubrey",
  headline: "Website build",
  intro:
    "The working area for the new site. Thomas builds it in Claude Code and deploys on Vercel. Everything we agree lands here: the guide, the brand spec, the messaging framework, and the design directions to react to.",
  lastUpdated: "2026-07-13",
};

/* Note for whoever edits this next: the media files referenced below live in
   public/clients/aubrey/media/. That folder is served statically, so a file in it
   is reachable by anyone who knows the exact URL, even though this PAGE is behind
   the password. Never put anything genuinely private in there. */

/* The tracker (top of the page).
   status: "ready" | "in-progress" | "todo"
   date:   when the item last moved (shown as "Updated")
   target: optional due date. If ANY row sets it, a Target column appears.
   note:   free text for what we said / what's next. */
export const deliverables: Deliverable[] = [
  {
    name: "Training guide",
    detail: "How to build the site in Claude Code and deploy it on Vercel",
    status: "ready",
    date: "2026-07-13",
    target: "",
    note: "Nine phases. Read it end to end before starting. The kit below is the paste-into-Claude-Code companion.",
  },
  {
    name: "The kit",
    detail: "Seven files to paste straight into Claude Code",
    status: "ready",
    date: "2026-07-13",
    target: "",
    note: "Brand extraction prompts, the BRAND and MESSAGING templates, the CLAUDE.md with the audit gate, the build prompts, deploy, and the chatbot.",
  },
  {
    name: "Aesthetic",
    detail: "Ten to fifteen screengrabs of sites Thomas admires",
    status: "todo",
    date: "2026-07-13",
    target: "",
    note: "Phase 1. Thomas collects, we extract the pattern together. Directions land on this page to react to.",
  },
  {
    name: "Pinterest skill",
    detail: "Turn any pin into a picture of Aubrey's site in that aesthetic",
    status: "ready",
    date: "2026-07-13",
    target: "",
    note: "Use it during Phase 1, to choose the direction by looking at it instead of talking about it. Needs Thomas's own Replicate token. About 3 cents an image.",
  },
  {
    name: "Brand spec",
    detail: "docs/BRAND.md - every rule checkable by a script",
    status: "todo",
    date: "2026-07-13",
    target: "",
    note: "Phase 2. Hex codes, numbers, and flat bans. No adjectives.",
  },
  {
    name: "Messaging framework",
    detail: "docs/MESSAGING.md - positioning, pillars, proof, voice",
    status: "todo",
    date: "2026-07-13",
    target: "",
    note: "Phase 3. Paul runs this with Thomas. Never invent a proof point.",
  },
  {
    name: "Build",
    detail: "Next.js and Tailwind, styleguide first, then pages",
    status: "todo",
    date: "2026-07-13",
    target: "",
    note: "Phase 4 to 6. The audit gate goes in before the first page.",
  },
  {
    name: "Deploy",
    detail: "Vercel, live domain, HTTPS",
    status: "todo",
    date: "2026-07-13",
    target: "",
    note: "Phase 7. Preview URLs on branches for review before anything goes live.",
  },
  {
    name: "Chatbot",
    detail: "Custom assistant, in Aubrey's brand, on his content only",
    status: "todo",
    date: "2026-07-13",
    target: "",
    note: "Phase 9, after the site is stable. Forbidden from inventing figures, dates, positions or commitments.",
  },
];

/* The work area. Add a section as work lands. */
export const work: WorkSection[] = [
  {
    title: "The guide and the kit",
    kind: "files",
    status: "ready",
    desc:
      "Two artefacts, for two different readers. The guide is for Thomas: open it in a browser and read it end to end. The kit is for his laptop: seven files he pastes straight into Claude Code, including the CLAUDE.md with the audit gate already written into it.",
    files: [
      {
        name: "Build your own website with Claude Code",
        file: "website-build-guide.html",
        note: "The guide. Nine phases. Open in a browser.",
      },
      {
        name: "The kit",
        file: "website-build-kit.zip",
        note: "Seven markdown files. Unzip into the project and paste as you go.",
      },
    ],
  },
  {
    title: "The pinterest skill",
    kind: "files",
    status: "ready",
    desc:
      "Choosing a look by talking about it is a bad way to choose a look. Everyone nods at \"warm, human, a bit editorial\" and everyone is picturing something different. This skill turns any Pinterest pin into a picture of Aubrey's actual site living in that world, in about two minutes, for about three cents. Use it in Phase 1, while the aesthetic is still open. Read the guide first, then unzip the skill into the project at .claude/skills/pinterest/ and restart Claude Code. It needs Thomas's own Replicate token, because generating an image costs real money and the key has to be his. The guide walks through getting one.",
    files: [
      {
        name: "See the direction before you pick it",
        file: "pinterest-guide.html",
        note: "The guide. Open in a browser. Read this before installing anything.",
      },
      {
        name: "The pinterest skill",
        file: "pinterest-skill.zip",
        note: "Unzip into the project at .claude/skills/ so it lands at .claude/skills/pinterest/",
      },
    ],
  },
  {
    title: "What it produces",
    kind: "compare",
    status: "ready",
    desc:
      "Drag the handle. The same homepage, twice. On one side the live site as it stands today. On the other the identical page, same navigation, same headline, same photograph of Aubrey, re-rendered in the aesthetic of a 1960 Kennedy campaign poster. Nothing was redesigned to make this. The site is untouched. It is a photograph of a possibility, and it took two minutes and about three cents. One honest warning before anyone gets excited: zoom into the body copy and the words are mush. Image models draw the shape of text, they do not write it. This is a picture to argue with, not a page to build from.",
    compare: {
      before: "aubrey-live-homepage.png",
      after: "aubrey-jfk-homepage.png",
      ratio: "16 / 9",
      labelBefore: "The live site",
      labelAfter: "The pin's aesthetic",
      download: true,
    },
  },
  {
    title: "The two directions, to download",
    kind: "gallery",
    status: "ready",
    desc:
      "Two pins, two worlds, the same page underneath. The first pin was the 1960 Kennedy campaign poster: two inks, petrol teal and aged cream, heavy condensed capitals, printed grain. The second was a flat vector illustration, warm green, light on its feet. Neither is a proposal and neither is a design. They are here to be reacted to, because it is far easier to say \"that one, but warmer\" than to answer \"what do you want the site to feel like\". Download them, sit them side by side, and see which one Aubrey wants to be.",
    items: [
      {
        src: "aubrey-jfk-homepage.png",
        cap: "Direction one. The 1960 campaign poster.",
        ratio: "16 / 9",
        w: 420,
        download: true,
      },
      {
        src: "aubrey-flat-illustration-homepage.png",
        cap: "Direction two. Flat illustration, warm green.",
        ratio: "16 / 9",
        w: 420,
        download: true,
      },
    ],
  },
];
