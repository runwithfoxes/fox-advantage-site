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
  lastUpdated: "2026-06-20",
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
];

export const work: WorkSection[] = [
  // Work sections land here as we stage the files. Examples in the data-model
  // reference (kinds: media, copy, files, gallery). Letters, decks, charts or
  // copy go here once their files are dropped into
  // public/clients/eaton-square/media/. Give each one zone: "work".

  /* ---- ZONE: feedback - running commentary log. Populated from email. ---- */
  { title: "Feedback & responses", kind: "feedback", zone: "feedback",
    desc: "A running record of all feedback and the replies, kept here so we can both see everything.",
    responder: "Paul", faq: [] },
];
