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
  lastUpdated: "2026-06-24",
  // skills library added 2026-06-23
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

  { title: "Training guides", kind: "files", zone: "work", status: "in-progress",
    desc: "The how-to guides, as Word documents you can download, print or share with the team. Some are still in progress and will appear here as they land.",
    files: [
      { name: "The outreach engine", file: "guide-outreach-engine.docx", note: "How the AI-run outreach works, what's in place, and what's left to make it smooth" },
      { name: "The campaign calendar", file: "guide-campaign-calendar.docx", note: "Set up the shared calendar in your own Claude so it saves for the whole team" },
      { name: "The campaign advisor", file: "guide-campaign-advisor.docx", note: "Get an honest read on the campaign numbers and the next moves, on demand" },
      { name: "The LinkedIn graphic", file: "guide-linkedin-graphic.docx", note: "Turn a point into one quiet, on-brand LinkedIn graphic, in the browser" },
      { name: "Workflow guides", note: "Step-by-step guides to run the whole engine without us", pending: true },
      { name: "Handover playbook", note: "A light guide so the team runs everything on its own", pending: true },
    ] },

  { title: "The skills we've built for you", kind: "files", zone: "work", status: "ready",
    desc: "Every skill we've built for the team, in one list to download again. Each is a Claude Skill: download the zip, upload it once in Claude (Customize then Skills, or into your shared Project), then run it by name. The campaign advisor and the LinkedIn graphic have full walkthroughs above.",
    files: [
      { name: "Sarah's voice", file: "sarah-voice.zip", note: "Writes posts, messages, outreach emails and proposal copy as Sarah" },
      { name: "Sean's voice", file: "sean-voice.zip", note: "Writes posts, follow-ups and thought leadership as Sean" },
      { name: "Ben's voice", file: "ben-content.zip", note: "Writes LinkedIn posts as Ben, a practitioner sharing what he's seeing" },
      { name: "Sarah's content engine", file: "sarah-content.zip", note: "Turns an article or doc you paste into a finished Sarah post, or writes one from a theme" },
      { name: "Sean's content engine", file: "sean-content.zip", note: "Mines raw material, picks the angle, and briefs the post for Sean's voice" },
      { name: "Content calendar builder", file: "content-calendar.zip", note: "Plans a full month of posts from the team's raw material: who, what, when and why" },
      { name: "Content reviewer", file: "content-review.zip", note: "Reads what you posted and how it did, finds the patterns, adjusts the next plan" },
      { name: "Reactive take", file: "reactive-take.zip", note: "Drop in an article and get the team's response, in the voice you choose" },
      { name: "Clean a list", file: "eaton-clean.zip", note: "Dedupes a new list against your client and do-not-contact lists, matching on website so nothing slips through" },
      { name: "Enrich a list", file: "eaton-enrich.zip", note: "Turns a list of companies into a ready-to-message list: HR decision-maker, signal, opener" },
      { name: "Find emails", file: "eaton-email.zip", note: "Adds verified work email addresses to the list you just enriched" },
      { name: "Change-outreach", file: "eaton-change-outreach.zip", note: "Picks the change decision-maker and writes an evidence-only note, nothing invented" },
      { name: "Direct mail letters", file: "eaton-direct-mail.zip", note: "Writes a personalised sales letter in Sarah's voice and merges it across a list" },
      { name: "Campaign advisor", file: "eaton-campaign-update.zip", note: "Ask \"update me on the campaign\" for an honest read on the numbers and next moves" },
      { name: "LinkedIn graphic", file: "eaton-linkedin-graphic.zip", note: "Paste a point and get one quiet, on-brand LinkedIn graphic. Unbranded by design" },
      { name: "Branded page", file: "eaton-branded-page.zip", note: "Turns any document into a scrolling HR Path branded web page" },
      { name: "AI coach", file: "eaton-ai-coach.zip", note: "An interactive coach that teaches the team how to get the most from Claude" },
    ] },

  { title: "Campaign calendar", kind: "media", layout: "single", zone: "work", status: "ready",
    desc: "What the shared campaign calendar looks like, running as a Claude artefact in your own workspace. The setup steps are in the calendar guide above. Download the file to load it into your Claude.",
    item: { src: "campaign-calendar.png", ratio: "8/5", w: 520, cap: "The campaign calendar, running as a Claude artefact" } },

  { title: "The calendar file", kind: "files", zone: "work", status: "ready",
    files: [
      { name: "Campaign calendar (v1)", file: "campaign-calendar-v1.html", note: "HTML, open in a browser or upload to Claude" },
    ] },

  { title: "LinkedIn graphic", kind: "media", layout: "single", zone: "work", status: "ready",
    desc: "An example output: one idea per image, plain language, a single accent colour used sparingly, unbranded by design. How to make one is in the LinkedIn graphic guide above.",
    item: { src: "linkedin-graphic-example.png", ratio: "4/5", w: 420, cap: "Example: portrait 4:5. Paste a point, get a graphic like this." } },

  /* ---- ZONE: feedback - running commentary log. Populated from email. ---- */
  { title: "Feedback & responses", kind: "feedback", zone: "feedback",
    desc: "A running record of all feedback and the replies, kept here so we can both see everything.",
    responder: "Paul", faq: [] },
];
