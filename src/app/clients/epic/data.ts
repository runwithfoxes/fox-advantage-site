/* The ONE file you edit to keep this page live.
   Klara / Jo / Dray: change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "EPIC Insights",
  slug: "epic",
  headline: "Creative deliverables",
  intro:
    "A live view of the creative work for EPIC Insights. The deliverables and where each one stands are below, with the finished pieces shown underneath. Have a look and send back your thoughts.",
  lastUpdated: "2026-06-25",
  feedbackContacts: ["epicinsights.io"],
  hideProgress: true,
  zoneIntros: {
    deliverables: "Everything we're producing for EPIC and where each piece stands.",
    work: "The finished pieces. Have a look and send back your thoughts.",
    feedback: "A running record of all feedback and the replies, kept here so we can both see everything.",
  },
};

export const deliverables: Deliverable[] = [
  {
    name: "Animated display banner (airline)",
    detail: "1000×200, three-frame concept: problem, answer, sign-off",
    status: "ready",
    statusLabel: "With EPIC for review",
    date: "2026-06-25",
  },
  {
    name: "Static email banner (de-risk)",
    detail: "1000×200, single frame for the Substack email",
    status: "ready",
    statusLabel: "With EPIC for review",
    date: "2026-06-25",
  },
];

export const work: WorkSection[] = [
  {
    title: "Animated banner · frame concept",
    kind: "gallery",
    zone: "work",
    status: "ready",
    wideDesc: true,
    desc: "The three-frame sequence for an animated display banner, built from the airline conjoint study. Frame 1 sets the problem, Frame 2 the answer, Frame 3 the EPIC sign-off. Shown here as still frames; the animation moves between them. 1000×200.",
    items: [
      { src: "banner-frame-1.png", ratio: "1000/200", w: 620, cap: "Frame 1 · the problem" },
      { src: "banner-frame-2.png", ratio: "1000/200", w: 620, cap: "Frame 2 · the answer" },
      { src: "banner-frame-3.png", ratio: "1000/200", w: 620, cap: "Frame 3 · sign-off" },
    ],
  },
  {
    title: "Banner frames · PDF",
    kind: "files",
    zone: "work",
    status: "ready",
    desc: "The full frame sequence as a single PDF, ready to share or print.",
    files: [
      { name: "Airline banner frames", file: "airline-banner-frames.pdf", note: "Three-frame sequence, 1000×200", date: "25 June 2026" },
    ],
  },
  {
    title: "Static email banner",
    kind: "gallery",
    zone: "work",
    status: "ready",
    desc: "A single static banner for the Substack email. Colour EPIC logo on the left, one line of copy, sized to stay legible on mobile. 1000×200.",
    items: [
      { src: "email-banner-derisk.png", ratio: "1000/200", w: 620, cap: "1000×200 · static", download: true },
    ],
  },
  {
    title: "Email banner · files",
    kind: "files",
    zone: "work",
    status: "ready",
    desc: "Both formats. The PNG is the sharpest for email; the GIF is the same image as a single frame.",
    files: [
      { name: "Email banner (PNG)", file: "email-banner-derisk.png", note: "Sharpest, recommended for email", date: "25 June 2026" },
      { name: "Email banner (GIF)", file: "email-banner-derisk.gif", note: "Single-frame GIF, 70 KB", date: "25 June 2026" },
    ],
  },
  {
    title: "Earlier tests · animated LinkedIn ads",
    kind: "media",
    zone: "work",
    layout: "grouped",
    badge: "Testing",
    wideDesc: true,
    desc: "Work Paul made while first testing this format. Not part of the current deliverable, but worth seeing. Two animated LinkedIn chart ads built from EPIC studies: each asks a question, answers it with a chart, then closes on the EPIC logo. Square 1080×1080.",
    groups: [
      {
        label: "1080×1080 · square",
        items: [
          { src: "test-snapchat-storage.mp4", poster: "test-snapchat-storage-poster.png", ratio: "1/1", w: 320, cap: "Would Snapchat users pay for storage?" },
          { src: "test-ad-tiers.mp4", poster: "test-ad-tiers-poster.png", ratio: "1/1", w: 320, cap: "Pay more to see fewer ads on social media?" },
        ],
      },
    ],
  },
];
