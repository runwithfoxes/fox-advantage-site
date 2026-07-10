/* The ONE file you edit to keep this page live.
   Klara / Jo / Dray: change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "Hostelworld",
  slug: "hostelworld",
  headline: "Board session",
  intro: "The presentation for the board session on 27 July, ahead of the day. Have a look and send back your thoughts.",
  lastUpdated: "2026-07-10", // bump this whenever you update the page
};

/* The tracker (top of the page).
   status: "ready" | "in-progress" | "todo"
   date:   when the item last moved (shown as "Updated")
   target: optional due date. If ANY row sets it, a Target column appears.
   note:   free text for what we said / what's next. */
export const deliverables: Deliverable[] = [
  { name: "Board session presentation", detail: "How brands grow - 26 slides, ~40 minute session", status: "ready", date: "2026-07-10", target: "2026-07-27", note: "New visual direction for review", anchor: "cw-s-the-presentation" },
];

/* The work area. Media/file references point at files in
   public/clients/hostelworld/media/. */
export const work: WorkSection[] = [
  { title: "The presentation", kind: "embed", status: "ready",
    desc: "The full deck, live below. Click inside it, then use the arrow keys, space bar, or a click to move through the slides. Full screen is best. Underneath there is a place to approve it or leave comments, and we pick them up from there.",
    embedSrc: "deck/index.html",
    embedHeight: 720,
    feedback: true },
];
