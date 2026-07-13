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
];
