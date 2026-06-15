/* The ONE file you edit to keep this page live.
   Change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "Coca-Cola",
  slug: "coca-cola",
  headline: "Tesco Retail Media",
  intro:
    "A live view of the Tesco retail media formats and what we can produce for Coca-Cola. The deliverables sit up top, the real in-store references and the full format catalogue underneath. Have a look and send back your thoughts.",
  lastUpdated: "2026-06-15",
};

/* The production machines we'd build, in priority order. First-pass statuses. */
export const deliverables: Deliverable[] = [
  { name: "Format scoping + specs", detail: "Full Tesco format catalogue, shapes and sizes captured", status: "ready", date: "2026-06-15", note: "Screen specs confirmed. Onsite pixel sizes need the Tesco Media spec sheet." },
  { name: "Screen ad machine", detail: "1080x1920 portrait: in-store, Totem and entrance DOOH", status: "todo", date: "2026-06-15", note: "Ready to build. Needs the Coke brand + motion kit and one approved example ad." },
  { name: "Onsite display banner set", detail: "Standard retail-media size set, one master to all shapes", status: "todo", date: "2026-06-15", note: "Exact pixel sizes to come from the Coke Tesco Media account / CitrusAd console." },
  { name: "Onsite video", detail: "Homepage 16:9 + in-browser short-form", status: "todo", date: "2026-06-15", note: "Autoplay, sound-off. Ratio and duration to confirm." },
  { name: "Print POS templates", detail: "MOD shelf fins, goalpost takeovers, pallet wraps", status: "todo", date: "2026-06-15", note: "Separate build (print, not animation). Needs Tesco fixture dimensions." },
];

export const work: WorkSection[] = [
  /* Real Coke retail media, for reference. */
  { title: "Coca-Cola in Tesco today", kind: "gallery", badge: "Reference",
    desc: "Genuine Coca-Cola retail media from the Christmas 2025 Tesco campaign. Four formats, the brand treatment a machine has to feed.",
    items: [
      { src: "coke-tesco-xmas-instore.jpg", cap: "Totem Screen: a portrait digital screen in a branded Coke pillar. The format we'd build first.", w: 360, download: true },
      { src: "coke-tesco-xmas-1.jpg", cap: "Goalpost takeover + pallet stack, front of store.", w: 360, download: true },
      { src: "coke-tesco-xmas-2.jpg", cap: "MOD shelf-edge fin, Clubcard Prices, beside the bottles.", w: 360, download: true },
      { src: "coke-tesco-xmas-vans.jpg", cap: "Wrapped home-delivery van, Available at Tesco.", w: 360, download: true },
    ]},

  /* The full format catalogue: shapes, sizes, motion, what we can build. */
  { title: "What we'd produce: formats, shapes and sizes", kind: "copy", badge: "Format catalogue",
    desc: "Every Tesco retail media format we'd create for, grouped by type. Screen sizes are confirmed; onsite banner sizes are the standard retail-media set (Tesco onsite runs on CitrusAd), with the exact set locked at booking.",
    blocks: [
      { label: "1 / Digital screens: 1080x1920 portrait (CONFIRMED)",
        text:
"One shape covers in-store screens, the Totem and the entrance DOOH.\n" +
"- Size: 1080 x 1920, portrait 9:16\n" +
"- Static image OR motion. UK runs 6s, Ireland 10s (+2s end-frame hold).\n" +
"- Looks like: vertical, full-bleed brand world, one big pack or product hero, a short line (Time for a Coca-Cola), logo, optional Clubcard price flash.\n" +
"- Can we build it? Yes. This is exactly what our HTML-to-MP4 ad engines do." },
      { label: "2 / Onsite display banners: standard retail-media sizes",
        text:
"On tesco.com and the Grocery & Clubcard app. Static OR animated (CitrusAd Banner X supports HTML5 and video).\n" +
"- Homepage hero around 1456 x 180 (wide landscape strip)\n" +
"- Leaderboard / header 728 x 90 (category and aisle headers)\n" +
"- MPU / inline tile 300 x 250 (in-list, basket, search)\n" +
"- Half-page 300 x 600 (side rail)\n" +
"- Mobile square 1080 x 1080 (app homepage tile)\n" +
"- Looks like: a pack or lifestyle shot on a brand-colour field + short headline + Clubcard price or CTA.\n" +
"- Can we build it? Yes. One master creative to the full size set: our resizer pattern." },
      { label: "3 / Onsite video",
        text:
"- Homepage video 16:9 (autoplay, sound-off), roughly 6 to 15 seconds\n" +
"- In-browser / in-aisle short-form, 1:1 or 16:9, roughly 6 to 10 seconds\n" +
"- Can we build it? Yes, the same animated engine rendered to MP4." },
      { label: "4 / In-store print POS",
        text:
"Physical, printed at 150dpi. A different discipline to the digital formats.\n" +
"- MOD shelf fin: tall narrow portrait\n" +
"- Goalpost / aisle takeover: wide landscape header\n" +
"- Pallet / stack wrap: large panels\n" +
"- Can we build it? Yes, but as a separate print-template machine (exports print-ready PDF at fixture size). Needs Tesco's fixture dimensions." },
      { label: "Out of scope",
        text:
"- Sponsored Products / Search / Browse: native, auto-generated from the product feed. No creative to make.\n" +
"- Store wraps and van wraps: bespoke per site or per campaign.\n" +
"- Offsite (TV / social / radio / print / OOH using Clubcard data): each runs its own channel specs." },
    ]},

  /* What we need from Coke to start building. */
  { title: "What we need from you to start", kind: "copy", badge: "Open",
    blocks: [
      { label: "To unlock the build",
        text:
"1. The Coke master brand and motion kit (logos, fonts, colours, pack renders, animation house style).\n" +
"2. The Tesco Media onsite spec sheet (exact banner pixel sizes + onsite video duration and codec). These are held in the CitrusAd / Epsilon advertiser console and the dunnhumby Sphere portal, so they come from your Tesco Media account.\n" +
"3. Which formats you produce the most of, so we build the highest-volume machine first.\n" +
"4. Two or three approved example ads per format to reverse-engineer.\n" +
"5. UK only, or UK and Ireland?" },
    ]},
];
