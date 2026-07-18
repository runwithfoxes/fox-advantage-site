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
  lastUpdated: "2026-07-18",
  feedbackContacts: ["epicinsights.io"],
  hideProgress: true,
  zoneIntros: {
    deliverables: "Everything we're producing for EPIC and where each piece stands.",
    work:
      "The four ads for the eight-week campaign are below. A quick note on the copy: at a size people can actually read on a 1000×200 strip, the lines in your email ran into the aircraft, so each one has been tightened. Each ad is shown in full, all three frames, in three versions. Approve the version you want for each of the four ads, or use the comment box to tell us what to change. Nothing gets built into the final banners until you have chosen.",
    feedback: "A running record of all feedback and the replies, kept here so we can both see everything.",
  },
};

export const deliverables: Deliverable[] = [
  {
    name: "Eight-week campaign · copy sign-off",
    detail: "Four ads, three frames each, three versions to choose from",
    status: "ready",
    statusLabel: "Waiting on your pick",
    date: "2026-07-18",
    isNew: true,
    note: "Approve one version per ad",
    anchor: "cw-s-weeks-1-2",
  },
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
    title: "Weeks 1 & 2",
    kind: "gallery",
    zone: "work",
    status: "ready",
    qa: "pass",
    feedback: true,
    wideDesc: true,
    desc: "The full ad, all three frames, as it will animate: setup, payoff, sign-off. Your email said “Simulate passenger choice before launch.” and “Optimize fares, bundles and revenue.” Those run into the aircraft at a readable size on a 1000×200 strip, so each version below is tightened. Approve the version you want and we will build it. If none is right, comment on the closest one.",
    items: [
      { src: "ad-w1-2-a.png", ratio: "1000/616", w: 1000, cap: "Version A · closest to your wording · “See what passengers pick.” → “Then set fares and bundles.”" },
      { src: "ad-w1-2-b.png", ratio: "1000/616", w: 1000, cap: "Version B · “Know what passengers will pick.” → “Then set your fares.”" },
      { src: "ad-w1-2-c.png", ratio: "1000/616", w: 1000, cap: "Version C · “Test the choice, not the booking.” → “Fares and bundles, priced right.”" },
    ],
  },
  {
    title: "Weeks 3 & 4",
    kind: "gallery",
    zone: "work",
    status: "ready",
    qa: "pass",
    feedback: true,
    wideDesc: true,
    desc: "The full ad, all three frames, as it will animate: setup, payoff, sign-off. Your email said “Test propositions & simulate prices before market launch.” and “Don't leave revenue on the table.” Those run into the aircraft at a readable size on a 1000×200 strip, so each version below is tightened. Approve the version you want and we will build it. If none is right, comment on the closest one.",
    items: [
      { src: "ad-w3-4-a.png", ratio: "1000/616", w: 1000, cap: "Version A · closest to your wording · “Test the price before you launch.” → “Don't leave revenue behind.”" },
      { src: "ad-w3-4-b.png", ratio: "1000/616", w: 1000, cap: "Version B · “Try it before you sell it.” → “Leave nothing on the table.”" },
      { src: "ad-w3-4-c.png", ratio: "1000/616", w: 1000, cap: "Version C · “Find the revenue you're missing.” → “Price it right first time.”" },
    ],
  },
  {
    title: "Weeks 5 & 6",
    kind: "gallery",
    zone: "work",
    status: "ready",
    qa: "pass",
    feedback: true,
    wideDesc: true,
    desc: "The full ad, all three frames, as it will animate: setup, payoff, sign-off. Your email said “Predict passenger demand before launch.” and “Optimize fares, bundles and revenue.” Those run into the aircraft at a readable size on a 1000×200 strip, so each version below is tightened. Approve the version you want and we will build it. If none is right, comment on the closest one.",
    items: [
      { src: "ad-w5-6-a.png", ratio: "1000/616", w: 1000, cap: "Version A · closest to your wording · “See demand before you launch.” → “Then price every seat.”" },
      { src: "ad-w5-6-b.png", ratio: "1000/616", w: 1000, cap: "Version B · “Know the demand before you fly.” → “Price every seat with confidence.”" },
      { src: "ad-w5-6-c.png", ratio: "1000/616", w: 1000, cap: "Version C · “See demand before you commit.” → “Fares and bundles that work.”" },
    ],
  },
  {
    title: "Weeks 7 & 8",
    kind: "gallery",
    zone: "work",
    status: "ready",
    qa: "pass",
    feedback: true,
    wideDesc: true,
    desc: "The full ad, all three frames, as it will animate: setup, payoff, sign-off. Your email said “Test airline offers, predict bookings, switching and revenue.” and “Optimize every fare and bundle.” Those run into the aircraft at a readable size on a 1000×200 strip, so each version below is tightened. Approve the version you want and we will build it. If none is right, comment on the closest one.",
    items: [
      { src: "ad-w7-8-a.png", ratio: "1000/616", w: 1000, cap: "Version A · closest to your wording · “Test offers before they fly.” → “Price every fare and bundle.”" },
      { src: "ad-w7-8-b.png", ratio: "1000/616", w: 1000, cap: "Version B · “Know which offer wins.” → “Before a passenger sees it.”" },
      { src: "ad-w7-8-c.png", ratio: "1000/616", w: 1000, cap: "Version C · “See which offer they'd book.” → “Every fare, priced right.”" },
    ],
  },
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
