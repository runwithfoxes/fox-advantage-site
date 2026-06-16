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
  lastUpdated: "2026-06-16",
};

/* First-pass statuses from the Sabre workstreams - confirm before sharing. */
export const deliverables: Deliverable[] = [
  { name: "Display ad machine (IAB sets)", detail: "Full IAB set per route from swappable copy / photo / animatic", status: "ready", date: "2026-06-12", note: "OPEN and PLATFORM routes ready below. AI route and route 4 to follow." },
  { name: "Presentation builder", detail: "Sabre-branded deck skill in Claude.ai", status: "ready", date: "2026-05-19", note: "Darren iterating independently." },
  { name: "Email writer (v2)", detail: "Sabre brand-voice marketing emails, nine types", status: "ready", date: "2026-06-16", note: "v2 ready. Download the Claude skill and three sample emails below." },
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

  { title: "Email Writer v2", kind: "files", status: "ready",
    desc: "v2 of the Sabre email writer, now covering nine email types. Download the skill below and load it into Claude (Customize, then Skills, then Create skill). Three sample emails it produced follow. The writer never invents Sabre's specifics, so anything in [brackets] or {{tokens}} is a gap it has flagged for you to fill before sending. That is the writer working as intended, not an unfinished draft.",
    files: [
      { name: "Sabre Email Writer v2", file: "sabre-email-writer.sabre.zip", note: "Claude skill, zip" },
    ] },

  { title: "Sample: webinar invite", kind: "email", badge: "Sample email",
    prompt: 'Sabre email: webinar invite for "Agentic AI in Action" on 24 July, 2pm GMT. Speaker is Victor Sivira, Product Technology Consultant. Audience is agency tech leads. Goal is to fill seats.',
    from: "Your Sabre team",
    subject: "Most travel AI just talks. See one that works.",
    preheader: "Live, 24 July. Built for the people who build with it.",
    emailBody: [
      { h: "Agentic AI in action" },
      { p: "A live session on putting AI to work across booking, servicing and integration, built for agency tech leads." },
      { note: "Hero image: cinematic travel / motion" },
      { p: "Hi {{Recipient.FirstName}}," },
      { p: "Most AI you have been shown can hold a conversation. Far fewer can do the work, the rebooks, the refunds, the servicing requests that fill your agents' inboxes every morning." },
      { p: "Agentic AI closes that gap. It runs inside real travel workflows and acts, rather than answering questions in a chat window and leaving the doing to your team. On 24 July, Victor Sivira shows what that looks like on an open platform built to work with the stack you already run." },
      { p: "Your expert: Victor Sivira, Product Technology Consultant" },
      { h: "What you'll learn:" },
      { ul: [
        "Automate servicing with Sabre IQ, so email requests, changes and refunds get handled without your agents toggling between screens",
        "Cut integration time with the industry-first MCP server and agentic-ready APIs",
        "Surface bookable offers in real time from the intelligent cache, at sub-second speed",
        "Build your own AI workflows on an open platform, then run them at agency scale",
      ] },
      { p: "Agencies using Sabre's automation have taken 20% out of operating costs and automated 40% of customer email requests. This session shows you how that happens, end to end, with the tools doing the lifting." },
      { p: "Save your spot: 24 July, 2pm GMT" },
      { cta: { label: "Register now →" } },
      { p: "Come with your hardest integration question. Victor would rather work through a real one than walk through slides." },
      { sign: "See you there,\nYour Sabre team" },
    ] },

  { title: "Sample: CEO partner note", kind: "email", badge: "Sample email",
    prompt: "Sabre CEO email from Kurt Ekert to top airline partners, end-of-year, partnership-and-candor tone. Relationship email, not a pitch.",
    from: "Kurt Ekert, President and CEO, Sabre",
    subject: "Thank you for building with us this year",
    preheader: "A candid look back, and where we go together next.",
    emailBody: [
      { h: "A year of building together, and what comes next" },
      { p: "A note from Kurt Ekert, President and CEO, Sabre" },
      { p: "Dear {{Recipient.FirstName}}," },
      { p: "This was not a quiet year for any of us. [Name the specific moment that defined the year for airlines, or for Sabre, here. Gap.] Airlines carried three pressures at once: the pull toward modern retailing, margins under real strain as channels shift, and a technology cycle moving faster than most planning horizons allow for." },
      { p: "I won't pretend we read every turn correctly. We didn't. [If there is a real, approved example of a hard call or a place Sabre fell short, state it plainly here. This one line does more for your credibility than any number. Gap.] What I can tell you is that the questions you raised with us, in QBRs, at forums, in the moments when something broke, shaped what we built more than any roadmap we wrote on our own." },
      { p: "We hold one belief that doesn't move. Your success is the only number that matters to us. That belief is why our platform stays open rather than closed, why you can take one module or many, and why we keep saying out loud that we are not the vendor who locks you in." },
      { p: "This year we [moved agentic AI from blueprint toward production / shipped specific milestones. Confirm the real, approved list. Gap.]. We went deeper with Google and OpenAI so the AI you put in front of travelers is built for travel, not bolted on after the fact. And we kept investing in the parts of the platform you lean on every day, including the ones that never make a headline." },
      { p: "[If there is real, approved year-end business news, debt, refinancing, a results note, state it here in plain terms. The skill's reference example named exactly this kind of thing, and naming it honestly is what separates a CEO note from a press release. Do not invent it. Gap.]" },
      { p: "Next year, the airlines that move first on open, AI-native retailing will set the terms the rest of the market follows. I want that to be you. And I want Sabre to be the reason it felt easier than you expected, with more to show you early in [year]. I would rather show you than tell you." },
      { p: "Thank you for trusting us with a part of your business this year. We don't take it lightly." },
      { cta: { label: "Let's go further →" } },
      { note: "Soft CTA: points to a year-ahead conversation or a partner roadmap preview, not a demo" },
      { sign: "Kurt Ekert\nPresident and CEO, Sabre" },
    ] },

  { title: "Sample: report launch", kind: "email", badge: "Sample email",
    prompt: "Sabre email to launch our new Travel Retail Benchmark report. The single job is to earn the download. Keep it tight.",
    from: "Your Sabre team",
    subject: "How does your retailing compare?",
    preheader: "We benchmarked [XX] carriers. Intent and action are further apart than expected.",
    emailBody: [
      { h: "Most airlines say they're retail-ready. The data says otherwise." },
      { p: "A benchmark of where airline retailing actually stands, and where the gap is widest." },
      { p: "[XX]% of airlines call themselves modern-retailing ready. [XX]% have moved real fare content off the legacy filing." },
      { p: "We benchmarked [XX] carriers across [North America, Europe and APAC], from regional operators to global network airlines, on how far their retailing has actually shifted." },
      { p: "Three findings stood out:" },
      { ul: [
        "[XX]% still file every ancillary through the old fare structure",
        "Carriers running offer optimization reported [XX]% higher ancillary revenue per passenger",
        "[XX]% name integration risk, not budget, as what holds them back",
      ] },
      { p: "See where your retailing sits against the field, and what the leaders do differently." },
      { cta: { label: "See where airlines stand →" } },
      { sign: "Your Sabre team" },
    ] },
];
