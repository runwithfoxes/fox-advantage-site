/* The ONE file you edit to keep this page live.
   Klara / Jo / Dray: change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "Eaton Square",
  slug: "eaton-square",
  headline: "Deliverables",
  intro:
    "A live view of the work for Eaton Square. The deliverables and status are below, with the work shown underneath as it lands. Have a look and send back your thoughts.",
  lastUpdated: "2026-06-21",
  zoneIntros: {
    deliverables: "Everything we're producing for Eaton Square and where each piece stands.",
    work: "The work, shown in full here as each piece lands.",
    feedback: "A running record of all feedback and the replies, kept here so we can both see everything.",
  },
};

/* First-pass statuses from the Eaton workstreams - confirm before sharing. */
export const deliverables: Deliverable[] = [
  { name: "Direct mail campaign", detail: "Personalised letters across the verified list (Operating Model Review + Programme Diagnostic)", status: "in-progress", date: "2026-06-11", note: "Two approved letters merging across the list; awaiting Sarah's contact details and recipient picks." },
  { name: "Lead engine", detail: "500-company outreach campaign, HeyReach live", status: "in-progress", date: "2026-06-12", note: "Campaign V2 rebuild." },
  { name: "AI coach for the team", detail: "Interactive Claude training coach", status: "ready", date: "2026-06-05", note: "Built and packaged; team to trial." },
  { name: "Messaging workshop", detail: "Pain points and positioning with Sarah", status: "todo", note: "" },
  { name: "Growth Manager agent", detail: "Autonomous outreach desk for Eaton", status: "todo", note: "" },
  { name: "Campaign calendar", detail: "Shared, always-current view of every campaign, built as a Claude artefact your team runs in its own workspace", status: "in-progress", date: "2026-06-21", note: "A concept to try. Screenshot, the file, and build-it-yourself steps are in the work area below.", isNew: true },
];

export const work: WorkSection[] = [
  // Work sections land here as we stage the files. Examples in the data-model
  // reference (kinds: media, copy, files, gallery). Letters, decks, charts or
  // copy go here once their files are dropped into
  // public/clients/eaton-square/media/. Give each one zone: "work".

  { title: "Campaign calendar", kind: "media", layout: "single", zone: "work", status: "ready",
    desc: "A shared, always-current view of every campaign on one calendar. It runs as a Claude artefact in your own workspace, so the whole team sees the same plan and changes save for everyone.",
    item: { src: "campaign-calendar.png", ratio: "8/5", w: 640, cap: "The campaign calendar, running as a Claude artefact" } },

  { title: "The calendar file", kind: "files", zone: "work", status: "ready",
    desc: "Download this, then follow the steps below to load it into your own Claude.",
    files: [
      { name: "Campaign calendar (v1)", file: "campaign-calendar-v1.html", note: "HTML - open in a browser, or upload to Claude" },
    ] },

  { title: "Set it up in your own Claude", kind: "copy", zone: "work", status: "ready",
    desc: "So the calendar lives in your workspace and saves for the whole team.",
    blocks: [
      { label: "Steps", text: "1. Open a shared Project in your Claude workspace, so the whole team works in one place.\n2. Connect your tools to that Project: HeyReach, Clay, Smartlead, and anything else you run campaigns from.\n3. Upload the calendar file (above) into the Project.\n4. Start a chat and ask Claude to build it as an artifact, using the prompt below.\n5. Publish the artifact and share it within your organisation. That is what lets everyone see the same calendar and saves changes for the team. On a Teams or Enterprise plan the share stays private to your organisation, not a public link.\n6. Check it saved: move an item, then reopen the link in a new tab. If the move held, you are set." },
      { label: "The prompt to paste", mono: true, text: "Create an HTML artifact with exactly the code in this file, with no changes." },
    ] },

  /* ---- ZONE: feedback - running commentary log. Populated from email. ---- */
  { title: "Feedback & responses", kind: "feedback", zone: "feedback",
    desc: "A running record of all feedback and the replies, kept here so we can both see everything.",
    responder: "Paul", faq: [] },
];
