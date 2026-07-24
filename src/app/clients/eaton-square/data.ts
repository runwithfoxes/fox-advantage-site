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
  lastUpdated: "2026-07-20",
  // skills library added 2026-06-23
  zoneIntros: {
    deliverables: "Everything we're producing for Eaton Square and where each piece stands.",
    work: "The work, shown in full here as each piece lands.",
    feedback: "A running record of all feedback and the replies, kept here so we can both see everything.",
  },
};

export const deliverables: Deliverable[] = [
  { name: "The growth desk", detail: "One thing you talk to that runs the outbound and the content as a single job, and writes everything it learns into your own Smartsheet so the whole team can see it", status: "ready", date: "2026-07-20", note: "Ready to set up. The tables are built in your Smartsheet and the two-step setup is below. It replaces having to pick the right skill for each job, and the skills you already use are still here underneath.", isNew: true },
  { name: "AI-run outreach engine", detail: "Claude as your project manager: it finds and enriches companies with the Clay skills, writes and merges personalised messages in your voice, and feeds HeyReach (LinkedIn) and Smartlead (email), so the team spends far less time finding, enriching and sending by hand", status: "in-progress", date: "2026-06-21", note: "Most of the pieces are built. Next is getting the team fluent on them and on Claude, plus clear workflow guides to follow (below). One open item: the email sending setup.", isNew: true },
  { name: "Copywriters for Sarah and Sean", detail: "An AI copywriter in each person's own voice, built from the messaging framework and their own writing", status: "complete", date: "2026-06-21", note: "Built and uploaded as Claude Skills. Format-agnostic: posts, emails, anything, in their own voice." },
  { name: "Content creators for Sarah and Sean", detail: "Turn documents and ideas into branded content", status: "complete", date: "2026-06-21", note: "Skills built and uploaded. Sean is set up via Claude Design with the HR Path brand kit. (Sarah's LinkedIn visuals are a separate item, below.)" },
  { name: "Weekly LinkedIn ideas for Sarah", detail: "A skill that does the finding for Sarah: she brings nothing, it researches the week (competitors, the category, the news), pitches 10 post ideas with a source link and a deep-research prompt on each, then writes the ones she picks in her voice", status: "ready", date: "2026-06-25", note: "Built as a Claude Skill. Her only two actions are 'go' and picking which ideas to write. Setup and how-to are below.", download: { file: "sarah-ideas.zip", label: "Download the skill" }, isNew: true },
  { name: "LinkedIn design kit for Sarah", detail: "A branded route for Sarah's LinkedIn visuals, since Claude Design is blocked by the corporate brand team", status: "ready", date: "2026-06-23", note: "Built as a Claude Skill. Paste a point and get one quiet, on-brand LinkedIn graphic (portrait 4:5). Unbranded by design, since the corporate brand team blocks the HR Path kit. Example and setup steps below.", download: { file: "eaton-linkedin-graphic.zip", label: "Download the skill" }, isNew: true },
  { name: "Growth manager (BDR) + campaign calendar", detail: "An agent that watches the pipeline, flags when it runs low, and (once connected) writes and sends campaigns, with a shared calendar it manages", status: "in-progress", date: "2026-06-21", note: "Two pieces are built and below: the shared calendar (v1), and the advisor - ask \"update me on the campaign\" for a read on the numbers, what needs attention and next moves. The advisor works in Claude browser today (paste the numbers; auto-pull as the connectors are added). The send layer (auto write-and-send) needs the connectors plugged in.", isNew: true },
  { name: "Training", detail: "Getting Sarah and Ben fluent on Claude and the new process", status: "in-progress", date: "2026-06-21", note: "One group session done; more to come, focused on real use cases. A self-serve coach skill is also built." },
  { name: "Handover playbook", detail: "A light guide so the team runs everything without us", status: "todo", note: "" },
  { name: "Workflow guides", detail: "Clear step-by-step guides the team follows to run the engine, so the process is repeatable without us", status: "todo", date: "2026-06-21", note: "Coming as documents on this page." },
  { name: "Direct mail", detail: "A Claude skill that writes personalised direct-mail letters in voice", status: "complete", date: "2026-06-21", note: "Added value, beyond the original plan. In use for the Schools Campaign and the PMO campaign." },
];

export const work: WorkSection[] = [
  // Work sections land here as we stage the files. Examples in the data-model
  // reference (kinds: media, copy, files, gallery). Letters, decks, charts or
  // copy go here once their files are dropped into
  // public/clients/eaton-square/media/. Give each one zone: "work".

  { title: "The growth desk", kind: "copy", zone: "work", status: "ready", isNew: true,
    desc: "Up to now every job had its own skill and you had to know which one to reach for. Nobody wakes up thinking \"I need the content-review skill\", so that was always going to be a filing problem rather than a colleague. The desk replaces it. You talk to one thing, it treats the outbound and the content as the same job, and it writes what it learns into your own Smartsheet so it is still there next week and everyone can see it.",
    blocks: [
      { label: "What it does", text: "It reads the numbers, writes the messages and the posts, and remembers the things people forget. The follow-up nobody sent. The meeting nobody confirmed. The person who said come back in the new year, on the day they meant. It holds the line on the things that matter too: nothing sends without Sarah's approval, no message goes out without real evidence behind the reason for it, and no testimonial gets used until it is cleared." },
      { label: "Where the memory lives", text: "In your Smartsheet, not in Claude. That was deliberate. Claude's own memory is private to each person, so if Sarah wrote a post into it, Ben would never see it. Your Smartsheet is shared, you own it, and the data never leaves your tenant.\n\nThere are thirteen tables set up in the growth workspace: everyone you know, the campaigns and their weekly numbers, the calendar, the content, the meetings and what came of them, the proof library, what clients actually tell us is broken by sector, and the offer catalogue built from Ben's campaign process. They are empty and waiting for the real thing." },
      { label: "Set it up (once)", text: "1. Download the two files below.\n2. In Claude, make a project and call it Growth Desk. Open the instructions file, copy all of it, and paste it into the project's Instructions box.\n3. Unzip the other download and upload the six .md files into the same project as knowledge.\n4. Connect Smartsheet in Claude (Settings, then Customize, then Connectors). Each person connects their own.\n\nThat is it. Then just talk to it." },
      { label: "What to ask it", text: "Sean: show me every campaign by service line. Show me the funnel for the IE campaign, all six steps. Where is the drop-off worst, and is that a targeting problem or a message problem. What came of every meeting we have booked. Is there enough data to call this yet.\n\nSarah: what is waiting for me. Show me the actual words, not a summary. Show me the evidence behind this message before I approve it. Who engaged with our posts, and are any of them already on the list.\n\nBen: what is on today. Who replied and has not been answered. How many leads are left in the campaign. Acceptance is fine but replies are down, which bit is broken. Who said come back later, and is anyone due." },
      { label: "What it will not do", text: "It will not research a company from scratch, quote you an industry benchmark, or forecast next month. It answers from your sheets and from HeyReach, and when the answer is not in there it says so rather than inventing something that sounds right. It also stops at SQL, because past that is Salesforce's job." },
      { label: "What we need from you", text: "Ben's campaign process gave us the real shape and we have built the tables around it, so a few things are our best read rather than confirmed.\n\nThe service lines are set up as Advise, Optimise, Run and Implement with the services underneath. Sean mentioned five, and Ben's file documents four, so tell us if one is missing.\n\nCampaigns are numbered HCM-1 to HCM-12 as Ben has them, with the Health Check running as the IE and UK campaigns underneath it. Say if you would rather they were named another way.\n\nAnd Joe, Gavin and Brian are set up as people who can send, not only own an account. Worth confirming." },
    ] },

  { title: "The growth desk files", kind: "files", zone: "work", status: "ready", isNew: true,
    desc: "Two downloads. The instructions get pasted into the project, the zip holds the seven knowledge files that go in alongside them.",
    files: [
      { name: "The instructions", file: "growth-desk-instructions.md", note: "Open it, copy all of it, paste into the project's Instructions box" },
      { name: "The growth desk files", file: "eaton-growth-desk.zip", note: "Unzip and upload the seven .md files into the project as knowledge. Covers the message rules, how to read the numbers honestly, Sarah's and Sean's voices, the content playbook, the letter structure, and a guide to maintaining the desk over time" },
    ] },

  { title: "ICP outreach, step by step", kind: "embed", zone: "work", status: "ready",
    desc: "The full campaign as a visual flow: get the list, clean, enrich, emails, write the messages, merge, load, monitor. Each stage has its skill to download right there. Open full screen for the best view.",
    embedSrc: "icp-outreach-flow.html", embedHeight: 780 },

  { title: "Finding the HR decision-maker in Clay", kind: "media", layout: "single", zone: "work", status: "ready", isNew: true,
    desc: "A walkthrough of the enrich step done by hand in Clay: import the company list, run Find People with the HR title filters, and land the shortlist of HR leaders per company. The finding part costs no credits. Ben's job at the end is to pick the one most senior person per company. Press play to watch it end to end.",
    item: { src: "clay-enrich-walkthrough.mp4", ratio: "1568/812", w: 720, player: true, cap: "Import to shortlist in Clay: 5 companies to 28 HR leaders, no credits spent", download: true } },

  { title: "Sarah's weekly ideas, how to run it", kind: "copy", zone: "work", status: "ready", isNew: true,
    desc: "The idea is simple: you bring nothing. Each week it does the research, hands you 10 post ideas, and writes the ones you pick in your voice. Two minutes of your time. Download it from \"Weekly LinkedIn ideas for Sarah\" above, or the skills list below.",
    blocks: [
      { label: "What it does", text: "You ask for next week's ideas. It searches the web itself, around the change and transformation space, what the big firms are saying, and the week's news, then pitches 10 ideas. Each one comes with a headline, what the post is about, a real source you can click, and a ready-made \"go deeper\" prompt. You pick the ones you like, and it writes them as finished posts in your voice, ready to paste into LinkedIn." },
      { label: "Set it up (once)", text: "1. Download the skill (the \"Download the skill\" button above).\n2. In Claude, open Settings, then Customize, then Skills, and upload the sarah-ideas.zip file. (Or drop it into our shared Eaton Project.)\n3. Turn web search on in Claude if it isn't already, in Settings. This is what lets it research the week. Without it, it can still give you ideas, but they won't be tied to this week's news." },
      { label: "Run it (every week)", text: "1. Start a new chat and type: \"Run sarah-ideas\" or \"Give me next week's LinkedIn ideas.\"\n2. It researches, then shows you 10 numbered ideas.\n3. Reply with the numbers or the headlines you want, for example \"write 1, 3 and 7\" or \"the governance one.\"\n4. It writes those as finished posts in your voice. Copy and post." },
      { label: "Two extras", text: "To dig deeper on any idea before writing, copy its \"go deeper\" prompt, click Research in Claude, and paste it in.\n\nThe posts are written in your voice already. If you ever want extra polish on one, drop it into your \"Sarah's voice\" skill for a second pass." },
    ] },

  { title: "Training guides", kind: "files", zone: "work", status: "in-progress",
    desc: "A how-to guide for each tool, as a Word document. We're rewriting these properly now, so they'll appear here as they land. The full outreach campaign is covered by the flow above.",
    files: [
      { name: "The campaign calendar", note: "Set up the shared calendar in your own Claude so it saves for the whole team", pending: true },
      { name: "The campaign advisor", note: "Get an honest read on the campaign numbers and the next moves, on demand", pending: true },
      { name: "The LinkedIn graphic", note: "Turn a point into one on-brand LinkedIn graphic, in the browser", pending: true },
      { name: "Handover playbook", note: "A light guide so the team runs everything on its own", pending: true },
    ] },

  { title: "The skills we've built for you", kind: "files", zone: "work", status: "ready",
    desc: "Every skill we've built for the team, in one list to download again. Each is a Claude Skill: download the zip, upload it once in Claude (Customize then Skills, or into your shared Project), then run it by name. The campaign advisor and the LinkedIn graphic have full walkthroughs above.",
    files: [
      { name: "Sarah's voice", file: "sarah-voice.zip", note: "Writes posts, messages, outreach emails and proposal copy as Sarah" },
      { name: "Sean's voice", file: "sean-voice.zip", note: "Writes posts, follow-ups and thought leadership as Sean" },
      { name: "Ben's voice", file: "ben-content.zip", note: "Writes LinkedIn posts as Ben, a practitioner sharing what he's seeing" },
      { name: "Sarah's content engine", file: "sarah-content.zip", note: "Turns an article or doc you paste into a finished Sarah post, or writes one from a theme" },
      { name: "Sarah's weekly ideas", file: "sarah-ideas.zip", note: "Bring nothing: it researches the week (competitors, category, news), pitches 10 post ideas with sourced links and a deep-research prompt each, then writes the ones you pick in your voice" },
      { name: "Sean's content engine", file: "sean-content.zip", note: "Mines raw material, picks the angle, and briefs the post for Sean's voice" },
      { name: "Content calendar builder", file: "content-calendar.zip", note: "Plans a full month of posts from the team's raw material: who, what, when and why" },
      { name: "Content reviewer", file: "content-review.zip", note: "Reads what you posted and how it did, finds the patterns, adjusts the next plan" },
      { name: "Reactive take", file: "reactive-take.zip", note: "Drop in an article and get the team's response, in the voice you choose" },
      { name: "Clean a list", file: "eaton-clean.zip", note: "Dedupes a new list against your client and do-not-contact lists, matching on website so nothing slips through" },
      { name: "Enrich a list", file: "eaton-enrich.zip", note: "Finds the one HR decision-maker per company plus a recent-hire signal, and fills in their details" },
      { name: "Find emails", file: "eaton-email.zip", note: "Adds verified work email addresses to the list you just enriched" },
      { name: "Write your messages", file: "eaton-message-coach.zip", note: "Coaches you through the message sequence one at a time, in your voice, until you sign each one off" },
      { name: "Build the upload files", file: "eaton-merge.zip", note: "Rolls your approved sequence across the whole list and builds the two upload files: HeyReach and SmartLead" },
      { name: "Load into HeyReach", file: "eaton-heyreach-load.zip", note: "Uploads the file into HeyReach, holds, and starts the campaign once the emails are in SmartLead" },
      { name: "Direct mail letters", file: "eaton-direct-mail.zip", note: "Writes a personalised sales letter in Sarah's voice and merges it across a list" },
      { name: "Campaign advisor", file: "eaton-campaign-update.zip", note: "Ask \"update me on the campaign\" for an honest read on the numbers and next moves" },
      { name: "LinkedIn graphic", file: "eaton-linkedin-graphic.zip", note: "Paste a point and get one quiet, on-brand LinkedIn graphic. Unbranded by design" },
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
