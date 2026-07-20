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
  lastUpdated: "2026-07-20",
  feedbackContacts: ["epicinsights.io"],
  hideProgress: true,
  zoneIntros: {
    deliverables: "Everything we're producing for EPIC and where each piece stands.",
    work:
      "The four ads are built and finished, using your final wording from 20 July. Each one is below as it will run: three frames, looping. Every ad comes as an animated GIF, an HTML version for ad servers, an MP4 for LinkedIn, and the three frames as stills, all in the download list at the bottom. Anything you want changed, use the comment box under the ad.",
    feedback: "A running record of all feedback and the replies, kept here so we can both see everything.",
  },
};

export const deliverables: Deliverable[] = [
  {
    name: "Eight-week campaign · four finished banners",
    detail: "Four ads built to your final wording. GIF, HTML, MP4 and stills for each",
    status: "ready",
    statusLabel: "With EPIC for review",
    date: "2026-07-20",
    isNew: true,
    note: "Built from your 20 July wording",
    anchor: "cw-s-weeks-1-2",
  },
  {
    name: "Eight-week campaign · copy sign-off",
    detail: "Four ads, three versions each, for you to choose from",
    status: "complete",
    statusLabel: "Signed off",
    date: "2026-07-20",
    note: "Your wording of 20 July, plus version A for Weeks 3 & 4",
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
    desc: "The finished ad, looping through its three frames: setup, payoff, sign-off. Your wording from 20 July, used exactly as you wrote it. Shown here at full size, exactly as it will run at 1000\u00d7200. The HTML, MP4 and still frames are all in the download list at the bottom of this page.",
    items: [
      { src: "final-w1-2.gif", ratio: "1000/200", w: 1000, cap: "\u201cTest passenger choice before launch\u201d \u2192 \u201cOptimize fares, bundles & revenue\u201d \u2192 \u201cPredicting Value. Powering Decisions.\u201d", download: true },
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
    desc: "The finished ad, looping through its three frames: setup, payoff, sign-off. This is version A, the one you approved here on the page on 20 July. The only change is that the two full stops have come off, so it matches the other three ads, which you wrote without them. Shown here at full size, exactly as it will run at 1000\u00d7200. The HTML, MP4 and still frames are all in the download list at the bottom of this page.",
    items: [
      { src: "final-w3-4.gif", ratio: "1000/200", w: 1000, cap: "\u201cTest the price before you launch\u201d \u2192 \u201cDon't leave revenue behind\u201d \u2192 \u201cPredicting Value. Powering Decisions.\u201d", download: true },
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
    desc: "The finished ad, looping through its three frames: setup, payoff, sign-off. Your wording from 20 July, used exactly as you wrote it. Shown here at full size, exactly as it will run at 1000\u00d7200. The HTML, MP4 and still frames are all in the download list at the bottom of this page.",
    items: [
      { src: "final-w5-6.gif", ratio: "1000/200", w: 1000, cap: "\u201cPredict demand before you commit\u201d \u2192 \u201cPrice every seat with confidence\u201d \u2192 \u201cPredicting Value. Powering Decisions.\u201d", download: true },
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
    desc: "The finished ad, looping through its three frames: setup, payoff, sign-off. Your wording from 20 July, used exactly as you wrote it. Worth a look at the capitals: this pair is in title case while your other three ads are in sentence case. Happy either way, just say if you want them matched up. Shown here at full size, exactly as it will run at 1000\u00d7200. The HTML, MP4 and still frames are all in the download list at the bottom of this page.",
    items: [
      { src: "final-w7-8.gif", ratio: "1000/200", w: 1000, cap: "\u201cPredict Before You Price\u201d \u2192 \u201cFind Hidden Revenue\u201d \u2192 \u201cPredicting Value. Powering Decisions.\u201d", download: true },
    ],
  },
  {
    title: "HTML version · live example",
    kind: "embed",
    zone: "work",
    status: "ready",
    wideDesc: true,
    desc: "Each of the four ads also comes as an HTML file, which is what most ad servers want instead of a GIF. It animates in the browser rather than being a picture of the animation, so the type stays sharp at any screen density and the file is a third of the size. Weeks 1 & 2 is running live below. Everything it needs is inside the one file, so there is nothing to upload alongside it and nothing to break if it is opened offline. All four are in the download list underneath.",
    embedSrc: "final-w1-2.html",
    embedHeight: 200,
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
    desc: "Every file, ready to download. Each of the four ads comes four ways: an animated GIF (works anywhere), an HTML file (what most ad servers want), an MP4 (for LinkedIn and social), and the three frames as stills if you need a static version. The June banners are at the bottom.",
    files: [
      { name: "Weeks 1 & 2 · animated GIF", file: "final-w1-2.gif", note: "1000×200 animated GIF, loops. The all-purpose one", date: "20 July 2026" },
      { name: "Weeks 1 & 2 · HTML", file: "final-w1-2.html", note: "1000×200 HTML5, self-contained. For ad servers", date: "20 July 2026" },
      { name: "Weeks 1 & 2 · MP4", file: "final-w1-2.mp4", note: "1000×200 video. For LinkedIn and social", date: "20 July 2026" },
      { name: "Weeks 1 & 2 · still 1", file: "final-w1-2-frame1.png", note: "1000×200 PNG, frame 1, the setup", date: "20 July 2026" },
      { name: "Weeks 1 & 2 · still 2", file: "final-w1-2-frame2.png", note: "1000×200 PNG, frame 2, the payoff", date: "20 July 2026" },
      { name: "Weeks 1 & 2 · still 3", file: "final-w1-2-frame3.png", note: "1000×200 PNG, frame 3, the sign-off", date: "20 July 2026" },
      { name: "Weeks 3 & 4 · animated GIF", file: "final-w3-4.gif", note: "1000×200 animated GIF, loops. The all-purpose one", date: "20 July 2026" },
      { name: "Weeks 3 & 4 · HTML", file: "final-w3-4.html", note: "1000×200 HTML5, self-contained. For ad servers", date: "20 July 2026" },
      { name: "Weeks 3 & 4 · MP4", file: "final-w3-4.mp4", note: "1000×200 video. For LinkedIn and social", date: "20 July 2026" },
      { name: "Weeks 3 & 4 · still 1", file: "final-w3-4-frame1.png", note: "1000×200 PNG, frame 1, the setup", date: "20 July 2026" },
      { name: "Weeks 3 & 4 · still 2", file: "final-w3-4-frame2.png", note: "1000×200 PNG, frame 2, the payoff", date: "20 July 2026" },
      { name: "Weeks 3 & 4 · still 3", file: "final-w3-4-frame3.png", note: "1000×200 PNG, frame 3, the sign-off", date: "20 July 2026" },
      { name: "Weeks 5 & 6 · animated GIF", file: "final-w5-6.gif", note: "1000×200 animated GIF, loops. The all-purpose one", date: "20 July 2026" },
      { name: "Weeks 5 & 6 · HTML", file: "final-w5-6.html", note: "1000×200 HTML5, self-contained. For ad servers", date: "20 July 2026" },
      { name: "Weeks 5 & 6 · MP4", file: "final-w5-6.mp4", note: "1000×200 video. For LinkedIn and social", date: "20 July 2026" },
      { name: "Weeks 5 & 6 · still 1", file: "final-w5-6-frame1.png", note: "1000×200 PNG, frame 1, the setup", date: "20 July 2026" },
      { name: "Weeks 5 & 6 · still 2", file: "final-w5-6-frame2.png", note: "1000×200 PNG, frame 2, the payoff", date: "20 July 2026" },
      { name: "Weeks 5 & 6 · still 3", file: "final-w5-6-frame3.png", note: "1000×200 PNG, frame 3, the sign-off", date: "20 July 2026" },
      { name: "Weeks 7 & 8 · animated GIF", file: "final-w7-8.gif", note: "1000×200 animated GIF, loops. The all-purpose one", date: "20 July 2026" },
      { name: "Weeks 7 & 8 · HTML", file: "final-w7-8.html", note: "1000×200 HTML5, self-contained. For ad servers", date: "20 July 2026" },
      { name: "Weeks 7 & 8 · MP4", file: "final-w7-8.mp4", note: "1000×200 video. For LinkedIn and social", date: "20 July 2026" },
      { name: "Weeks 7 & 8 · still 1", file: "final-w7-8-frame1.png", note: "1000×200 PNG, frame 1, the setup", date: "20 July 2026" },
      { name: "Weeks 7 & 8 · still 2", file: "final-w7-8-frame2.png", note: "1000×200 PNG, frame 2, the payoff", date: "20 July 2026" },
      { name: "Weeks 7 & 8 · still 3", file: "final-w7-8-frame3.png", note: "1000×200 PNG, frame 3, the sign-off", date: "20 July 2026" },
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
