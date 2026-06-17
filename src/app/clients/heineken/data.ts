/* The ONE file you edit to keep this page live.
   Klara / Jo / Dray: change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "Heineken",
  slug: "heineken",
  headline: "Greenlight",
  intro: "A live view of the Greenlight ad work. You send four things for a gig, and we return a finished, on-brand static in seconds.",
  lastUpdated: "2026-06-17",
};

/* The tracker (top of the page). */
export const deliverables: Deliverable[] = [
  { name: "Static ad machine", detail: "Greenlight GreenBlocks static. Four inputs in, finished ad out.",
    status: "ready", date: "2026-06-16", target: "",
    note: "Live. Built and matched against the reference ad, then proven on real gigs. About two seconds per ad." },
  { name: "The Cure", detail: "Marley Park, 26.06.26",
    status: "ready", date: "2026-06-16", target: "",
    note: "First real gig produced through the machine. Photo framed, ad below." },
  { name: "Adaptive layout rules", detail: "Name wrap and venue length",
    status: "ready", date: "2026-06-16", target: "",
    note: "Long artist names wrap sensibly, long venue names move to a horizontal bar. Nothing overflows." },
  { name: "Animation (the stretch)", detail: "The 6 second motion version",
    status: "ready", date: "2026-06-17", target: "",
    note: "Live. The same GreenBlocks animate into the Greenlight stretch. Everything moves proportionally so the gaps between shapes stay constant, the photo breathes, and the name block does the two-part Greenlight move." },
  { name: "Component system", detail: "Reusable GreenBlocks",
    status: "in-progress", date: "2026-06-16", target: "",
    note: "Underway, so any future layout is built from the same parts." },
];

/* The work area. */
export const work: WorkSection[] = [
  // How it works - the four inputs
  { title: "How it works", kind: "copy", status: "ready",
    desc: "Send four things for each gig. We do the framing, layout and rendering.",
    blocks: [
      { label: "What you send", text: "1. Artist name\n2. Venue\n3. Date\n4. A photo of the artist" },
      { label: "What we send back", text: "A finished Greenlight static, framed and laid out to match the reference, in about two seconds. Long artist names and long venue names are handled for you, so nothing ever overflows or shrinks to nothing." },
    ]},

  // The Cure - the featured ad (real photo, real gig)
  { title: "The Cure", kind: "media", layout: "single", status: "ready",
    desc: "Inputs: the photo, the artist name (The Cure), the venue (Marley Park) and the date (26.06.26). This is the static that came back.",
    item: { src: "the-cure.png", ratio: "16/9", w: 760, cap: "The Cure, Marley Park, 26.06.26", download: true } },

  // The stretch - the 6s animation, same machine
  { title: "The stretch (animation)", kind: "media", layout: "single", status: "ready",
    desc: "The same gig, animated. The 6 second Greenlight stretch is built from the same blocks: the photo breathes, the GREENLIGHT strip and the pill ride the gaps, and the name block grows wide then settles short. Everything moves together so the spacing never collapses.",
    item: { src: "greenlight-stretch.mp4", ratio: "16/9", w: 760, cap: "The Greenlight stretch, on The Cure", download: true } },

  // The reference ad, rebuilt - shows the machine matches your existing creative
  { title: "Matched to your reference", kind: "media", layout: "single", status: "ready",
    desc: "Your existing Greenlight ad, rebuilt by the machine to the pixel. New gigs run through the same system, so everything sits together as one set.",
    item: { src: "example-arlo-parks.png", ratio: "16/9", w: 760, cap: "Arlo Parks, Toners Pub, 03.05.26", download: true } },
];
