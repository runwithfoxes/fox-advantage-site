/* The ONE file you edit to keep this page live.
   Klara / Jo / Dray: change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "Sabre",
  slug: "sabre",
  headline: "Deliverables",
  intro:
    "A live view of the work for Sabre. The deliverables and status are below, with the work shown underneath as it lands. Have a look and send back your thoughts.",
  lastUpdated: "2026-06-13",
};

/* First-pass statuses from the Sabre workstreams - confirm before sharing. */
export const deliverables: Deliverable[] = [
  { name: "Display ad machine (IAB sets)", detail: "Full IAB set per route from swappable copy / photo / animatic", status: "ready", date: "2026-06-12", note: "OPEN and PLATFORM routes delivered. AI route and route 4 to follow." },
  { name: "Presentation builder", detail: "Sabre-branded deck skill in Claude.ai", status: "ready", date: "2026-05-19", note: "Darren iterating independently." },
  { name: "Email writer", detail: "Sabre brand-voice marketing emails", status: "in-progress", date: "2026-06-12", note: "Finalising from Darren's example emails." },
  { name: "Brand blueprint + scorecard", detail: "Brand health and positioning", status: "in-progress", date: "2026-06-12", note: "" },
];

export const work: WorkSection[] = [
  // Work sections land here as we stage the files. Examples in the data-model
  // reference (kinds: media, copy, files, gallery). The banner sets, decks and
  // any copy/instructions go here once their files are dropped into
  // public/clients/sabre/media/.
];
