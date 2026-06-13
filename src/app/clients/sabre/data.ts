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
  { name: "Display ad machine (IAB sets)", detail: "Full IAB set per route from swappable copy / photo / animatic", status: "ready", date: "2026-06-12", note: "OPEN and PLATFORM routes ready below. AI route and route 4 to follow." },
  { name: "Presentation builder", detail: "Sabre-branded deck skill in Claude.ai", status: "ready", date: "2026-05-19", note: "Darren iterating independently." },
  { name: "Email writer", detail: "Sabre brand-voice marketing emails", status: "in-progress", date: "2026-06-12", note: "Finalising from Darren's example emails." },
  { name: "Brand blueprint + scorecard", detail: "Brand health and positioning", status: "in-progress", date: "2026-06-12", note: "" },
  { name: "AI in the briefing system", detail: "Build AI into Sabre's briefing process", status: "todo", date: "2026-06-13", target: "2026-07-06", note: "Next brief. Starts the first week of July." },
];

/* Banner sets, grouped by shape. [size, aspect-ratio, display-width-px] */
type Tile = [string, string, number];
const SQUARE: Tile[] = [
  ["1200x1200", "1/1", 280],
  ["640x480", "640/480", 300],
  ["300x250", "300/250", 240],
  ["300x600", "300/600", 150],
  ["160x600", "160/600", 150],
];
const BOARD: Tile[] = [
  ["970x250", "970/250", 560],
  ["728x90", "728/90", 440],
  ["600x100", "600/100", 340],
];
const STRIP: Tile[] = [
  ["320x100", "320/100", 320],
  ["300x50", "300/50", 320],
];

function adGroups(route: string) {
  const mk = (tiles: Tile[]) =>
    tiles.map(([size, ratio, w]) => ({ src: `${route}-${size}.mp4`, ratio, w, cap: size, download: true }));
  return [
    { label: "Square, rectangle and skyscraper", items: mk(SQUARE) },
    { label: "Leaderboard and billboard", items: mk(BOARD) },
    { label: "Strips and mobile", items: mk(STRIP) },
  ];
}

export const work: WorkSection[] = [
  { title: "Display ads - OPEN route", kind: "media", layout: "grouped", badge: "Waiting for feedback",
    desc: "The OPEN route across the full IAB range. Every size at true proportion, animated.",
    groups: adGroups("open") },
  { title: "Display ads - PLATFORM route", kind: "media", layout: "grouped", badge: "Waiting for feedback",
    desc: "The PLATFORM route across the full IAB range. The same machine with swapped copy, photo and motif.",
    groups: adGroups("platform") },
];
