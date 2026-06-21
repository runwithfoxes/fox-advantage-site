/* The ONE file you edit to keep this page live.
   Klara / Jo / Dray: change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";
import { briefExamplesHtml } from "./brief-examples-html";

export const meta: Meta = {
  client: "Sabre",
  slug: "sabre",
  headline: "Deliverables",
  intro:
    "A live view of the work for Sabre. The deliverables and status are below, with the work shown underneath as it lands. Have a look and send back your thoughts.",
  lastUpdated: "2026-06-21",
  // worked one-pager + brief examples added to the brief zone for Darren to validate
  targetDate: "2026-07-06",
  hideProgress: true,
  feedbackContacts: ["sabre.com"],
  zoneIntros: {
    deliverables: "Everything we're producing for Sabre and where each piece stands.",
    brief: "The inputs you've given us that shape the work.",
    work: "The work, the pieces to look at and react to.",
    feedback: "A running record of all feedback and the replies, kept here so we can both see everything.",
  },
};

/* First-pass statuses from the Sabre workstreams - confirm before sharing. */
export const deliverables: Deliverable[] = [
  { name: "AI writer (V1)", detail: "First AI writer, general marketing copy in Sabre brand voice", status: "signed-off", date: "Dec 2025 / Jan 2026", note: "Built, signed off and in use. The starting point for the use-case writers below." },
  { name: "Team interviews + report", detail: "Interviews across Brand, Product and Commercial Marketing, written up with prioritised recommendations", status: "signed-off", date: "Apr 2026", note: "Phase 1 discovery. The write-up that set the priorities.", download: { file: "sabre-team-interviews-report.docx", label: "Download the report" } },
  { name: "Ad versioning", detail: "A process that versions one approved ad into the full IAB set, each size pixel-matched to the original design", status: "paused", statusLabel: "Reviewed and paused by Darren", date: "2026-06-12", note: "Proved out and delivered: three route sets (OPEN, PLATFORM and Route 4) across every IAB size, animated and matched to Darren's designs. Darren reviewed them and chose to pause further ad work while the mid-funnel direction is settled." },
  { name: "Presentation builder", detail: "Sabre-branded deck skill in Claude.ai", status: "paused", statusLabel: "Paused, no days charged against it", date: "2026-05-19", note: "Darren has it and is iterating independently." },
  { name: "Email writer (v2)", detail: "AI writer for Sabre marketing emails, nine types", status: "ready", date: "2026-06-17", note: "Built and on v2, ready for your sign-off. Three sample emails are below, and a changelog is inside the download.", download: { file: "sabre-email-writer-v2.1.sabre.zip", label: "Download the skill" } },
  { name: "Blog writer", detail: "AI writer for blog posts and longer-form content", status: "todo", note: "Next in the set." },
  { name: "Web copy writer", detail: "AI writer for website and landing page copy", status: "todo", note: "" },
  { name: "Paid social writer", detail: "AI writer for paid social copy (LinkedIn, Meta)", status: "todo", note: "" },
  { name: "Organic social writer", detail: "AI writer for organic social posts", status: "todo", note: "" },
  { name: "Brief coach", detail: "AI that takes a rough brief and makes it good, inside Sabre's Claude", status: "in-progress", date: "2026-06-20", target: "2026-07-06", note: "Shaping has started with Darren. Build starts the first week of July." },
  { name: "Marketing calendar", detail: "Shared, always-current event calendar as a live artefact", status: "in-progress", date: "2026-06-21", note: "Concept to react to. Live preview in the work area.", isNew: true },
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
  { title: "Darren's operating model", kind: "embed", zone: "brief", wideDesc: true, badge: "Your flow",
    desc: "Darren's four-station model for how a brief moves through the team, with Claude doing the same job at every station. This is what we are building the brief coach on top of. The brief coach starts at stations 1 and 2, where briefs are born.",
    embedSrc: "brief-coach-flow.html", embedHeight: 600 },

  { title: "Worked examples: a one-pager, and the brief it becomes", kind: "html", zone: "brief", wideDesc: true, isNew: true, badge: "Does this match how Sabre works?",
    desc: "Before we build the brief coach, we need to agree what a good one-pager and a good brief actually look like at Sabre. So we have taken a stab at both, for the same imaginary campaign. The one-pager is the owner's ask; the brief is the marketing craft that answers it. Have a read and tell us: is this the right shape and altitude, or not typical of how Sabre really works? A yes or a no both move us forward.",
    html: briefExamplesHtml },

  { title: "Email writer (v2)", kind: "files", zone: "work", status: "ready", wideDesc: true,
    desc: "The Sabre email writer, covering nine email types. Download the skill below and load it into Claude (Customize, then Skills, then Create skill). Three sample emails it produced follow. The writer never invents Sabre's specifics, so anything in [brackets] or {{tokens}} is a gap it has flagged for you to fill before sending. That is the writer working as intended, not an unfinished draft. Latest version: v2.1 (17 June 2026), which sharpens how it writes headlines. The version and a full changelog are inside the zip, so you can tell a new set of files from one you already have.",
    files: [
      { name: "Sabre Email Writer v2.1", file: "sabre-email-writer-v2.1.sabre.zip", note: "Claude skill, zip, v2.1", date: "2026-06-17" },
    ] },

  { title: "Sample: webinar invite", kind: "email", zone: "work", badge: "Sample email",
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

  { title: "Sample: CEO partner note", kind: "email", zone: "work", badge: "Sample email",
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

  { title: "Sample: report launch", kind: "email", zone: "work", badge: "Sample email",
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

  { title: "Display ads - OPEN route", kind: "media", zone: "work", layout: "grouped", badge: "Reviewed and paused by Darren",
    desc: "The OPEN route across the full IAB range. Every size at true proportion, animated.",
    groups: adGroups("open") },
  { title: "Display ads - PLATFORM route", kind: "media", zone: "work", layout: "grouped", badge: "Reviewed and paused by Darren",
    desc: "The PLATFORM route across the full IAB range. The same process with swapped copy, photo and motif.",
    groups: adGroups("platform") },

  { title: "Brief coach", kind: "files", zone: "work", wideDesc: true, badge: "In design, build starts July",
    desc: "The next build. A coach, inside Sabre's own Claude, that takes a rough brief and makes it good. It plugs into Darren's flow above, at stations one and two, where briefs are born. It leads with a diagnosis: it holds the brief to what good looks like, shows where it falls short, then helps you close the gaps, whether you arrive with a draft to improve or a blank page to work through. It pins the vague bits, holds every brief to a real commercial outcome, and presses for the things a strong brief needs: one clear goal, real numbers, and an insight that names a moment rather than a job title. The standard it measures against is Sabre's own positioning plus our marketing-effectiveness thinking, baked in so it lifts the quality without asking the writer to already know what good looks like. We have started shaping it with Darren around how the team actually works, and the build starts the first week of July.",
    files: [] },

  { title: "Marketing calendar: a shared artefact", kind: "embed", zone: "work", isNew: true, badge: "Concept to react to",
    desc: "A concept to react to, not a finished deliverable. One page the whole marketing team opens inside Sabre's own Claude, always current and edited in the page itself, rather than a calendar that is out of date the moment it is emailed. The event data, RSVP funnels and spend refresh from your source sheet. The human bits, moving an event, changing a status, adding a note, updating a budget line, are done on the page itself and save for everyone on the team. It would live behind Sabre's own login, seen by your team only, the same way the email writer and presentation tools already do. The numbers here are sample data; the real version runs on Sabre's own events. Have a click around the tabs, the status pills and the note, then tell us if it earns a place.",
    embedSrc: "marketing-calendar.html", embedHeight: 820 },

  /* ---- ZONE: feedback - running commentary log. Populated from email. ---- */
  { title: "Feedback & responses", kind: "feedback", zone: "feedback",
    desc: "A running record of all feedback and the replies, kept here so we can both see everything.",
    responder: "Paul", faq: [] },
];
