/* The ONE file you edit to keep this page live.
   Klara / Jo / Dray: change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "Data Intelligence",
  slug: "data-intelligence",
  headline: "Deliverables", // generic, e.g. "Deliverables" / "Programme" / "Workstreams"
  intro: "A live view of the work for Data Intelligence. The deliverables and status are below. Have a look and send back your thoughts.",
  lastUpdated: "2026-07-15", // bump this whenever you update the page
};

/* The tracker (top of the page).
   status: "ready" | "in-progress" | "todo"
   date:   when the item last moved (shown as "Updated")
   target: optional due date. If ANY row sets it, a Target column appears.
   note:   free text for what we said / what's next. */
export const deliverables: Deliverable[] = [
  { name: "Messaging framework", detail: "Positioning, pillars, proof and voice - the source of truth every message anchors to.", status: "in-progress", date: "2026-07-15", target: "", note: "First draft built from our discovery call. In review before we lock it." },
  { name: "Marketing strategy and plan", detail: "Fame-first go-to-market: where to play, budget, creative and messaging, grounded in evidence.", status: "todo", date: "2026-07-15", target: "", note: "Follows the messaging framework." },
  { name: "AI systems to run it", detail: "The systems that execute the plan, built once the plan is set.", status: "todo", date: "2026-07-15", target: "", note: "Scope confirmed after the strategy - Campaign Manager, Ghostwriter, Copywriter, Website Builder and more." },
];

/* The work area. Add a section as work lands. Four kinds, all optional.
   Media/file references point at files in public/clients/data-intelligence/media/.
   Uncomment and adapt the examples you need; delete the rest. */
export const work: WorkSection[] = [
  { title: "Discovery call", kind: "files", status: "ready",
    desc: "Transcript of our strategy session on 15 July, edited for readability. The material the messaging framework was built from.",
    files: [ { name: "Discovery call transcript", file: "discovery-call-2026-07-15.txt", note: "Text - 15 Jul 2026" } ] },

  { title: "Messaging framework", kind: "files", status: "in-progress", isNew: true,
    desc: "The working draft of your messaging framework - core value proposition, positioning, pillars, proof and voice. Still in review: a few lines carry open questions we want your input on. Have a read and send back your thoughts.",
    files: [ { name: "Messaging framework (working draft)", file: "data-intelligence-messaging-framework.xlsx", note: "Excel - 15 Jul 2026" } ] },

  // Further work sections land here as deliverables complete.
  // 1) MEDIA - grouped (sized tiles by shape, e.g. an IAB ad set)
  // { title: "Chart Ad set", kind: "media", layout: "grouped", status: "ready",
  //   desc: "The animated display ad across the full IAB range.",
  //   groups: [
  //     { label: "Square and rectangle", items: [
  //       { src: "chart-1080x1080.mp4", poster: "chart-1080x1080-poster.png", ratio: "1/1", w: 280, cap: "1080x1080", download: true },
  //     ]},
  //   ]},

  // 1b) MEDIA - single (one figure)
  // { title: "Iceberg diagram", kind: "media", layout: "single", status: "ready",
  //   desc: "Animated explainer, square for LinkedIn.",
  //   item: { src: "iceberg-1080.mp4", poster: "iceberg-poster.png", ratio: "1/1", w: 320, cap: "1080x1080 - organic + paid", download: true } },

  // 1c) MEDIA - pair (animated + static per item)
  // { title: "Testimonial cards", kind: "media", layout: "pair", status: "ready",
  //   items: [ { name: "Photo column", src: "testimonial-v1.mp4", img: "testimonial-v1.png" } ] },

  // 2) COPY - text blocks, each with a copy-to-clipboard icon
  // { title: "Writer instructions", kind: "copy", status: "ready",
  //   desc: "Paste this into your Claude project to brief the writer.",
  //   blocks: [
  //     { label: "Writer system prompt", mono: true, text: "You are ..." },
  //     { label: "Subject line variants", text: "1) ...\n2) ...\n3) ..." },
  //   ]},

  // 3) FILES - downloadable assets (process redesign, deck, PDF, zip)
  // { title: "Process redesign", kind: "files", status: "ready",
  //   desc: "The redesigned invoice-approval flow.",
  //   files: [ { name: "Approval flow v2", file: "approval-flow-v2.pdf", note: "PDF - 2 pages" } ] },

  // 4) GALLERY - images / charts with captions, each optionally downloadable
  // { title: "Segmentation charts", kind: "gallery", status: "ready",
  //   items: [ { src: "seg-penetration.png", cap: "Penetration by segment", download: true } ] },
];
