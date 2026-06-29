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
  lastUpdated: "2026-06-27",
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
    detail: "1000×200 animated GIF, three frames: problem, answer, sign-off",
    status: "ready",
    statusLabel: "With EPIC for review",
    date: "2026-06-27",
    note: "Two versions: with website and clean",
  },
  {
    name: "Static email banner (de-risk)",
    detail: "1000×200, single frame for the Substack email",
    status: "ready",
    statusLabel: "With EPIC for review",
    date: "2026-06-27",
    note: "Two versions: with website and clean",
  },
];

export const work: WorkSection[] = [
  {
    title: "Animated display banner",
    kind: "gallery",
    zone: "work",
    status: "ready",
    wideDesc: true,
    desc: "A 1000×200 animated banner built from the airline conjoint study. It loops through three frames: the problem, the answer, and the EPIC sign-off. Two versions below. The one marked website carries epicinsights.io under the logo; the clean one leaves it off for placements that do not need it.",
    items: [
      { src: "airline-animated.gif", ratio: "1000/200", w: 620, cap: "With website (epicinsights.io)", download: true },
      { src: "airline-animated-clean.gif", ratio: "1000/200", w: 620, cap: "Clean, no website", download: true },
    ],
  },
  {
    title: "Static email banner",
    kind: "gallery",
    zone: "work",
    status: "ready",
    wideDesc: true,
    desc: "A single static 1000×200 banner for the Substack email. Same two versions: with the website under the logo, and clean.",
    items: [
      { src: "derisk-static.png", ratio: "1000/200", w: 620, cap: "With website (epicinsights.io)", download: true },
      { src: "derisk-static-clean.png", ratio: "1000/200", w: 620, cap: "Clean, no website", download: true },
    ],
  },
  {
    title: "Download files",
    kind: "files",
    zone: "work",
    status: "ready",
    desc: "Every file, ready to download. The animated banners are GIFs; the email banners are PNG.",
    files: [
      { name: "Animated banner (with website)", file: "airline-animated.gif", note: "1000×200 animated GIF", date: "27 June 2026" },
      { name: "Animated banner (clean)", file: "airline-animated-clean.gif", note: "1000×200 animated GIF", date: "27 June 2026" },
      { name: "Static email banner (with website)", file: "derisk-static.png", note: "1000×200 PNG", date: "27 June 2026" },
      { name: "Static email banner (clean)", file: "derisk-static-clean.png", note: "1000×200 PNG", date: "27 June 2026" },
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
