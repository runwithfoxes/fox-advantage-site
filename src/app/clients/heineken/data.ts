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
  { name: "Component system", detail: "Reusable GreenBlocks shape library",
    status: "ready", date: "2026-06-17", target: "",
    note: "Built. A named set of modular shapes (rounded rectangles, pill, photo cells, name/date blocks, GREENLIGHT strip, venue markers, motifs). Every layout is assembled from these same parts." },
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

  // Reference match - before/after slider proving the recreation is pixel-identical
  { title: "Matched to your reference", kind: "compare", status: "ready",
    desc: "Drag the slider. Left is your original Greenlight ad (Arlo Parks, Toners Pub); right is the same ad rebuilt by the machine. They are pixel-for-pixel the same, so new gigs sit alongside your existing creative as one set.",
    compare: { before: "reference-arlo-original.png", after: "reference-arlo-ours.png", ratio: "16/9", w: 760,
      labelBefore: "Original", labelAfter: "Rebuilt by the machine", download: true } },

  // In context - greyed mockups showing the ad placed in media
  { title: "Seen in context", kind: "gallery", status: "ready",
    desc: "How a Greenlight static sits in the wild: a website ad slot and an Instagram post, with everything around it greyed back so the ad carries the colour. (Illustrative placement only - the gig shown is a made-up example to demonstrate the format, not a real announcement.)",
    items: [
      { src: "mockup-website.png", ratio: "16/10", w: 700, cap: "In a website ad slot", download: true },
      { src: "mockup-instagram.png", ratio: "4/5", w: 360, cap: "As an Instagram post", download: true },
    ] },

  // GreenBlocks shape vocabulary - the system the ads are built from
  { title: "GreenBlocks shape vocabulary", kind: "media", layout: "single", status: "ready",
    desc: "Every Greenlight ad is built from one set of named modular shapes: rounded rectangles (in three greens), the pill, photo cells, the name and date blocks, the vertical GREENLIGHT strip, venue markers, the footer and the line-icon motifs. Each shape is reusable and scales proportionally, so any future layout is assembled from the same parts.",
    item: { src: "greenblocks-vocabulary.png", ratio: "1920/1520", w: 820, cap: "The GreenBlocks shape library", download: true } },
];
