/* The ONE file you edit to keep this page live.
   Klara / Jo / Dray: change statuses, dates, notes, and add work sections here.
   No React or CSS needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "Eaton Square",
  slug: "eaton-square",
  headline: "Deliverables",
  intro:
    "A live view of the work for Eaton Square. The deliverables and status are below, with the work shown underneath as it lands. Have a look and send back your thoughts.",
  lastUpdated: "2026-06-23",
  zoneIntros: {
    deliverables: "Everything we're producing for Eaton Square and where each piece stands.",
    work: "The work, shown in full here as each piece lands.",
    feedback: "A running record of all feedback and the replies, kept here so we can both see everything.",
  },
};

export const deliverables: Deliverable[] = [
  { name: "AI-run outreach engine", detail: "Claude as your project manager: it finds and enriches companies with the Clay skills, writes and merges personalised messages in your voice, and feeds HeyReach (LinkedIn) and Smartlead (email), so the team spends far less time finding, enriching and sending by hand", status: "in-progress", date: "2026-06-21", note: "Most of the pieces are built. Next is getting the team fluent on them and on Claude, plus clear workflow guides to follow (below). One open item: the email sending setup.", isNew: true },
  { name: "Copywriters for Sarah and Sean", detail: "An AI copywriter in each person's own voice, built from the messaging framework and their own writing", status: "complete", date: "2026-06-21", note: "Built and uploaded as Claude Skills. Format-agnostic: posts, emails, anything, in their own voice." },
  { name: "Content creators for Sarah and Sean", detail: "Turn documents and ideas into branded content", status: "complete", date: "2026-06-21", note: "Skills built and uploaded. Sean is set up via Claude Design with the HR Path brand kit. (Sarah's LinkedIn visuals are a separate item, below.)" },
  { name: "LinkedIn design kit for Sarah", detail: "A branded route for Sarah's LinkedIn visuals, since Claude Design is blocked by the corporate brand team", status: "ready", date: "2026-06-23", note: "Built as a Claude Skill. Paste a point and get one quiet, on-brand LinkedIn graphic (portrait 4:5). Unbranded by design, since the corporate brand team blocks the HR Path kit. Example and setup steps below.", download: { file: "eaton-linkedin-graphic.zip", label: "Download the skill" }, isNew: true },
  { name: "Growth manager (BDR) + campaign calendar", detail: "An agent that watches the pipeline, flags when it runs low, and (once connected) writes and sends campaigns, with a shared calendar it manages", status: "in-progress", date: "2026-06-21", note: "Two pieces are built and below: the shared calendar (v1), and the advisor - ask \"update me on the campaign\" for a read on the numbers, what needs attention and next moves. The advisor works in Claude browser today (paste the numbers; auto-pull as the connectors are added). The send layer (auto write-and-send) needs the connectors plugged in.", isNew: true },
  { name: "Training", detail: "Getting Sarah and Ben fluent on Claude and the new process", status: "in-progress", date: "2026-06-21", note: "One group session done; more to come, focused on real use cases. A self-serve coach skill is also built." },
  { name: "Handover playbook", detail: "A light guide so the team runs everything without us", status: "todo", note: "" },
  { name: "Workflow guides", detail: "Clear step-by-step guides the team follows to run the engine, so the process is repeatable without us", status: "todo", date: "2026-06-21", note: "Coming as documents on this page." },
  { name: "Direct mail", detail: "A Claude skill that writes personalised direct-mail letters in voice", status: "complete", date: "2026-06-21", note: "Added value, beyond the original plan. In use for the Schools Campaign and the PMO campaign." },
  { name: "Change-outreach skill", detail: "A Claude skill that enriches a company, picks the change decision-maker and writes an evidence-only note, using your Clay connector", status: "complete", date: "2026-06-21", note: "Added value, beyond the original plan." },
];

export const work: WorkSection[] = [
  // Work sections land here as we stage the files. Examples in the data-model
  // reference (kinds: media, copy, files, gallery). Letters, decks, charts or
  // copy go here once their files are dropped into
  // public/clients/eaton-square/media/. Give each one zone: "work".

  { title: "The outreach engine - how it works and where it stands", kind: "copy", zone: "work", status: "in-progress",
    desc: "The big goal: run outreach with far less manual time finding companies, enriching them, and sending messages.",
    blocks: [
      { label: "How it works", text: "Claude acts as your project manager.\n\n1. Find and enrich - Claude uses the Clay skills to find companies and pull the right contact and a real signal for each, so nobody does this by hand.\n2. Write and merge - Claude writes and merges the LinkedIn and email messages in your voice, personalised per company.\n3. Send - the messages flow into HeyReach for LinkedIn and Smartlead for email.\n\nThe result: far less manual work for Ben, more volume, and better, more personalised messages." },
      { label: "What's in place", text: "- The Clay find-and-enrich skills\n- The messaging framework, tightened and signed off\n- Writing and merging messages in Claude\n- HeyReach and Smartlead connected\n- A shared calendar Claude helps manage (below)" },
      { label: "What's left to make it smooth", text: "- Email sending: the one real blocker. The accounts are connected, but the team still needs an email address set up (a domain and mailbox, warmed up) before Smartlead can send. Ben owns this.\n- Getting fluent: the pieces are in place, but the team needs a little more time to find a groove on the new process and on Claude.\n- Workflow guides: we will add clear step-by-step guides on this page for the team to follow, so the process is repeatable without us." },
    ] },

  { title: "Campaign calendar", kind: "media", layout: "single", zone: "work", status: "ready",
    desc: "A shared, always-current view of every campaign on one calendar. It runs as a Claude artefact in your own workspace, so the whole team sees the same plan and changes save for everyone.",
    item: { src: "campaign-calendar.png", ratio: "8/5", w: 640, cap: "The campaign calendar, running as a Claude artefact" } },

  { title: "The calendar file", kind: "files", zone: "work", status: "ready",
    desc: "Download this, then follow the steps below to load it into your own Claude.",
    files: [
      { name: "Campaign calendar (v1)", file: "campaign-calendar-v1.html", note: "HTML - open in a browser, or upload to Claude" },
    ] },

  { title: "Set it up in your own Claude", kind: "copy", zone: "work", status: "ready",
    desc: "So the calendar lives in your workspace and saves for the whole team.",
    blocks: [
      { label: "Steps", text: "1. Open a shared Project in your Claude workspace, so the whole team works in one place.\n2. Connect your tools to that Project: HeyReach, Clay, Smartlead, and anything else you run campaigns from.\n3. Upload the calendar file (above) into the Project.\n4. Start a chat and ask Claude to build it as an artifact, using the prompt below.\n5. Publish the artifact and share it within your organisation. That is what lets everyone see the same calendar and saves changes for the team. On a Teams or Enterprise plan the share stays private to your organisation, not a public link.\n6. Check it saved: move an item, then reopen the link in a new tab. If the move held, you are set." },
      { label: "The prompt to paste", mono: true, text: "Create an HTML artifact with exactly the code in this file, with no changes." },
    ] },

  { title: "The campaign advisor", kind: "copy", zone: "work", status: "ready",
    desc: "Ask Claude \"update me on the campaign\" and it reads the numbers, tells you where things stand, flags what needs attention, and recommends the next moves. On demand - nothing runs in the background.",
    blocks: [
      { label: "How to use it", text: "1. Upload the skill (below) into your shared Project in Claude.\n2. Type \"update me on the campaign\".\n3. Claude reports per campaign, flags what needs you (a positive reply, a list running low), and suggests 2-3 next moves.\n\nIt works in the browser today: if a tool connector is there it reads the numbers directly; if not, it asks you to paste them and briefs off that. It never makes a number up." },
    ] },

  { title: "The advisor skill", kind: "files", zone: "work", status: "ready",
    desc: "Upload this into your Claude to add the \"update me on the campaign\" advisor.",
    files: [
      { name: "Campaign advisor skill", file: "eaton-campaign-update.zip", note: "Claude Skill - upload via Customize then Skills, or into a Project" },
    ] },

  { title: "LinkedIn graphic for Sarah", kind: "media", layout: "single", zone: "work", status: "ready",
    desc: "A quiet, unbranded design system for Sarah's LinkedIn graphics, since the corporate brand team blocks the HR Path kit. One idea per image, plain language, a single accent colour used sparingly. This is an example output, not fixed copy.",
    item: { src: "linkedin-graphic-example.png", ratio: "4/5", w: 520, cap: "Example: portrait 4:5 (1080x1350). Paste a point, get a graphic like this." } },

  { title: "The LinkedIn graphic skill", kind: "files", zone: "work", status: "ready",
    desc: "Upload this into your Claude, then paste a point (or a report) and ask for a LinkedIn graphic.",
    files: [
      { name: "LinkedIn graphic skill", file: "eaton-linkedin-graphic.zip", note: "Claude Skill - upload via Customize then Skills, or into a Project" },
    ] },

  { title: "How to use it", kind: "copy", zone: "work", status: "ready",
    desc: "It runs in the browser. No software, no design tools.",
    blocks: [
      { label: "Steps", text: "1. Upload the skill (above) via Customize then Skills, or into your shared Project.\n2. Paste your point, or a report or post to distil, and ask for a LinkedIn graphic.\n3. Claude writes a short headline and lays out one graphic, then checks its own work (word count, the accent used sparingly, no invented numbers, no logos or names).\n4. The graphic opens scaled to fit your screen so you see the whole thing. Click the caption under it to switch to 100%, then take a screenshot to post." },
      { label: "Good to know", text: "- One idea per graphic. Keep the headline short, the richer context goes in your post text.\n- It is unbranded on purpose: no logos, names, photos or hashtags.\n- It never makes a number up. If your point has no figure, the graphic has no figure." },
    ] },

  /* ---- ZONE: feedback - running commentary log. Populated from email. ---- */
  { title: "Feedback & responses", kind: "feedback", zone: "feedback",
    desc: "A running record of all feedback and the replies, kept here so we can both see everything.",
    responder: "Paul", faq: [] },
];
