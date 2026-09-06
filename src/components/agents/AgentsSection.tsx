"use client";

import { useEffect, useRef, useState } from "react";
import TypedNote, { type NoteItem } from "./TypedNote";
import SiteWindow from "./SiteWindow";
import GuardianWindow from "./GuardianWindow";
import SearchAgentWindow from "./SearchAgentWindow";
import { OutreachWindow, CampaignWindow } from "@/app/for/_components/library/AgentWindows";
import { WriterEmail } from "@/app/for/_components/library/WriterPiece";
import AdMachine from "@/app/for/_components/library/AdMachine";
import { ScaledWindow } from "@/app/for/_components/library/AgentWindows";
import { PipelineBoard, JoNote } from "@/app/for/_components/library/GrowthManager";
import WorkGrid from "@/app/for/_components/library/WorkGrid";
import type { Door } from "../AgentsHero";
import "./agents-section.css";

/*
  /agents - replaces the products storefront below the bio (5 Sep 2026).

  One agent on screen at a time. The ten are picked from a tab strip with a
  sliding indicator, or from a full-screen menu that drops down and lets the
  names rise in, staggered: the two moves from the box of tricks
  (rwf-box.vercel.app/rwf/toolkit, nav 01 and 03). Paul, 5 Sep: "can we try
  using this technique to select and filter, we may just have each agent as
  a tab. And we don't get horizontal boxes but as we're doing now." So the
  row keeps its shape: name, what it does, the close-up of what it hands
  over, what you get, and who it hands to, which is also the way to the
  next tab.

  Copy is a first draft for Paul to steer. Nothing in it is agreed.
*/

const RESEARCH: NoteItem[] = [
  { kind: "lead", text: "Hi Paul," },
  { kind: "p", text: "Here's today's research. Five companies, all filed to the CRM. The one to look at first is **Kite Insurance**." },
  { kind: "p", text: "They've been hiring a performance marketing manager since May and the role is still open. Renewal price rises were in the news last week and their own site says nothing about it. The person to ask is **Niamh Costello**, Head of Marketing, confirmed in a press release in June." },
  { kind: "li", text: "Two of her team registered for the course in August, so there is a **warm way in**." },
  { kind: "li", text: "“Kite insurance renewal” gets **2,400 searches a month** and they rank fourth. “Car insurance quote” gets 33,100 and they are not in the top 20." },
  { kind: "li", text: "**Three ads live**, all the same offer since March." },
  { kind: "p", text: "The other four are on their cards, every fact with its source beside it. I've handed all five to the **Growth Agent**." },
  { kind: "att", text: "kite-insurance-card.pdf · 2 pages" },
];

const REDTEAM: NoteItem[] = [
  { kind: "lead", text: "Hi Paul," },
  { kind: "p", text: "I checked everything the team made today before it went out. Two things did not pass." },
  { kind: "li", text: "The Kite research says **Niamh Costello** was confirmed in a press release in June. The release is from June last year. Sent back to the Research Agent to find a source inside twelve months." },
  { kind: "li", text: "The renewal email quotes a **saving of €187**. I could not find where that number came from. Held until someone shows me." },
  { kind: "p", text: "Everything else passed: 84 messages, 12 ad sizes, the course page change. **Nothing went out with a mistake in it.**" },
];

const PM: NoteItem[] = [
  { kind: "lead", text: "Hi Paul," },
  { kind: "p", text: "Where everything stands this morning. Three projects moved, one is waiting on you, nothing is late." },
  { kind: "li", text: "**Kite renewal campaign.** The emails passed the guardian yesterday and go out Thursday. Nothing needed from you." },
  { kind: "li", text: "**The website.** Two pages changed overnight from what you said on Tuesday. The third needs a photograph only you can pick. That is the one waiting on you." },
  { kind: "li", text: "**Harbour Cover proposal.** Drafted from Friday's call, priced, and in your drafts folder to read. It does not go anywhere until you press send." },
  { kind: "p", text: "The board is current. If you do one thing today, pick the photograph." },
];

/* THE GROWTH AGENT'S WORLD. Paul, 5 Sep: "Growth Agent, I want to show Growth
   Agent", pasting the section from the AXA page. The morning note, the board
   and the copy come across as they are there. Every firm and person is
   invented; the note is task-shaped and carries no numbers on purpose. */
const GROWTH_NOTE = [
  "Morning. Overnight: two replies came in and one meeting landed, Thursday at two with Behan Financial Planning.",
  "Three things need you today. The Kilbrannan terms are waiting on your yes. This week's partner list is built and ready for you to prune. And one broker has asked a pricing question I will not answer for you.",
  "Everything else is handled. Follow-ups sent, the board is current, the forecast is unchanged.",
];

const GROWTH_PIPELINE = [
  [
    { firm: "Hyland Mortgage Advisers", person: "Cormac Hyland · Principal", note: "intro sent, two new advisers" },
    { firm: "Ardmore Group", person: "Declan Moore · Reward Manager", note: "benefits review in October" },
    { firm: "Barrow Credit Union", person: "Áine Ronan · Head of Member Services", note: "detail sent, follow-up due" },
  ],
  [
    { firm: "Foyle Comparison", person: "Sinéad Gallagher · Partnerships Lead", note: "Tuesday 11am, panel terms" },
    { firm: "Behan Financial Planning", person: "Ruairí Behan · Director", note: "Thursday 2pm, retention data prepared" },
  ],
  [
    { firm: "Kilbrannan Brokers", person: "Maeve Tobin · Managing Director", note: "waiting on your yes" },
    { firm: "Slaney Union", person: "Peter Rafferty · CEO", note: "follow-up Friday" },
  ],
  [
    { firm: "Tolka Employee Benefits", person: "Onboarding", note: "terms agreed, launch date set" },
    { firm: "Ashfield Brokers", person: "Live", note: "first month, 41 policies written" },
  ],
];

const GHOST_POST: NoteItem[] = [
  { kind: "p", text: "I spent last week going through what our customers did at renewal time last year, and I want to share what I found, because I think it says something about how this industry works." },
  { kind: "p", text: "About seven in ten of the people we insure paid the renewal price we sent them without shopping around. When I first saw that number I assumed it meant they were happy with us. I don't think it does. I think it means the alternative was a fortnight of filling in forms on four different websites, answering the same eleven questions each time, and most people have better things to do with their evenings." },
  { kind: "p", text: "So we've started doing the shopping around for them. About three weeks before a renewal is due, we check what everyone else would charge for the same cover. If someone is cheaper, we tell the customer and move them, and we do the paperwork. If nobody is, they stay where they are. Either way they get a note saying what we found." },
  { kind: "p", text: "I know how that sounds coming from an insurer, and it will cost us customers some years. I'd rather that than a business that depends on people not getting around to checking. If you're with an insurer that won't do this for you, it's worth asking them why." },
];

const OUTBOUND_THREADS = [
  { name: "Ciara Walsh", company: "Head of Marketing · Kite Insurance", message: "Hi Ciara - saw the performance marketing role has been open since May. We run that job as an agent for insurers, and I can show you what it does in twenty minutes. Worth a look?", reply: "Yes - send me a couple of times next week." },
  { name: "Tomás Keane", company: "Marketing Director · Slaney Mutual", message: "Hi Tomás - your renewal note is the same one you sent last year. We write those so they read like a person. Ten minutes on how?", reply: "Interesting. Thursday morning suits." },
  { name: "Aoife Brennan", company: "Growth Lead · Harbour Cover", message: "Hi Aoife - congratulations on the new role. If you are building the team, it is worth seeing what an agent does before you hire for it.", reply: "Happy to chat. Send an invite." },
  { name: "David Nolan", company: "CMO · Rathmore Life", message: "Hi David - you wrote about lapsed policies last week. We built the agent that brings them back for a gym; the same shape works for cover. Half an hour?", reply: "Go on then. Next week." },
];

const NODES: [
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
] = [
  { icon: "◆", label: "07:00, every morning", kind: "trigger" },
  { icon: "▤", label: "Research Agent", kind: "agent" },
  { icon: "➤", label: "Growth Agent", kind: "agent" },
  { icon: "✎", label: "Email Agent", kind: "agent" },
  { icon: "✓", label: "Guardian + Red Team", kind: "step" },
];

const ILL = (what: React.ReactNode) => (
  <>
    <span className="slash">/illustrative.</span> {what}
  </>
);

/*
  Paul, 6 Sep: "for each agent page, it's going to feel more like one of
  these pages https://runwithfoxes.com/essays/the-95-5-rule-the-day-one-list
  in structure. So a page of copy with figures inserted into it. Not as long
  as this page, but to feel like something you'd read. Keeping the rail as
  we currently have."

  So an agent is a short piece in the essay's shape: a meta line, a light
  heading, a dek, then prose at the essay's measure with the figures set into
  it where the copy reaches them. The rail on the left is the way in, and the
  foot of each piece is the way to the next one.

  Copy is Dray's draft for Paul to steer, except where marked as his.
*/

type Block =
  | { p: string }
  | { fig: () => React.ReactNode; cap?: React.ReactNode };

type Agent = {
  key: string;
  num: string;
  when: string;
  name: string;
  short: string;
  dek: string;
  body: Block[];
  hands: string;
};

const KITE = ILL(<>Kite Insurance is the made-up insurer from our course, and the people are made up too. The note is the shape of the real one.</>);

const AGENTS: Agent[] = [
  {
    key: "research", num: "01", when: "every morning", name: "Research Agent", short: "the morning research note",
    dek: "Every company you want to win, researched before you sit down.",
    hands: "Growth Agent",
    body: [
      { p: "Most mornings in a marketing team start with someone opening a browser. Who is this company, what have they said lately, who runs marketing there, have we talked to them before. It takes an hour, and it never gets written down." },
      { p: "The Research Agent does that hour before you arrive. It works from the list of companies you want to win, reads what each one has said and done, finds the person to talk to, and checks whether anyone on your side already knows them. Every fact carries its source." },
      { fig: () => <TypedNote title="Research Agent" subject="Your research for Monday" from="Research Agent" avatar="R" items={RESEARCH} />, cap: KITE },
      { p: "Then it writes you a note. Not a report you have to dig through. A note addressed to you, with the one company to look at first and why." },
      { p: "The five cards go into the CRM, one per company, so nothing it found lives in a chat window. And it hands the list to the Growth Agent, who takes it from there." },
    ],
  },
  {
    /* Paul, 1 Sep: "there is no difference between an outbound agent and a
       growth agent. So leave the growth agent in." The first and third
       paragraphs are his own copy from the AXA page, verbatim. */
    key: "growth", num: "02", when: "every morning", name: "Growth Agent", short: "the pipeline, the outbound, the meetings",
    dek: "The pipeline, the outbound and the meetings, run for you.",
    hands: "Email Marketing Agent",
    body: [
      { p: "We build Growth Agents for teams. The growth agent does a few things. It is the single point of contact for updating and tracking the pipeline. For example, it opens the dashboard daily for it and the marketer to review together. It does analysis to help uncover blockers." },
      { fig: () => <JoNote note={GROWTH_NOTE} />, cap: ILL(<>Every firm and person here is invented. The note is the shape of the real one.</>) },
      { p: "Each morning it tells you what happened overnight and what needs you today, in a note like that one. Nothing in it asks you to open a dashboard to find out." },
      { fig: () => <PipelineBoard deals={GROWTH_PIPELINE} /> },
      { p: "And most importantly, it runs the outbound campaigns, be that email or LinkedIn, running all the steps from list building to writing the messages, sending and analysis." },
      { fig: () => <OutreachWindow threads={OUTBOUND_THREADS} title="Growth Agent" sentLabel="84 sent" width={806} />, cap: ILL(<>The people and the replies are invented. The messages are the shape of the real ones.</>) },
      { p: "The replies come back into the same window, and a meeting that lands goes straight into your diary. When a customer is ready for their first email, it hands over to the Email Marketing Agent." },
    ],
  },
  {
    key: "email", num: "03", when: "when an email is due", name: "Email Marketing Agent", short: "the emails that keep customers",
    dek: "The emails that keep customers, written in your company's voice.",
    hands: "Brand Guardian",
    body: [
      { p: "The renewal note, the welcome, the win-back. These are the emails that decide whether a customer stays, and they are usually the last thing anyone gets to. So they get written in a hurry, from last year's version, and they read like it." },
      { p: "The Email Marketing Agent writes them from your positioning, your messaging and your voice. Every line in the email below comes from one of those three, and if you hover over a dotted line it tells you which." },
      {
        fig: () => (
          <WriterEmail
            subject={{ text: "Your renewal is due on 14 September", note: "voice" }}
            body={[
              { text: "Hi Sarah," },
              { text: "Before it renews, we'll quote the market for you.", note: "positioning" },
              { text: "Last year most people in your position paid the price they were sent. It was a bit higher than the year before, and paying it beat a fortnight of forms and four websites asking the same eleven questions." },
              { text: "That increase was never compulsory. It was the cost of staying put.", note: "messaging" },
              { text: "So about three weeks before your date we'll check what everyone else would charge for the same cover. If someone is cheaper, we move you and do the paperwork. If nobody is, you stay where you are. Either way you'll get a note saying what we found and what we chose.", note: "messaging" },
              { text: "The first time we did this, customers saved €187 on average.", note: "proof" },
              { text: "Nothing for you to do.", note: "voice" },
            ]}
            sign={["Aoife", "Kite"]}
          />
        ),
        cap: ILL(<>Written for Kite Insurance, the made-up insurer from our course.</>),
      },
      { p: "That matters because the email does not need rewriting. It already sounds like your company, and it says the thing your messaging says you stand for, in the sentence where a customer will read it." },
      { p: "Nothing goes out from here on its own. Every email passes to the Brand Guardian first." },
    ],
  },
  {
    key: "ghostwriter", num: "04", when: "three posts a week", name: "Ghostwriter", short: "posts and articles in your voice",
    dek: "Posts and articles in your name, from things you actually said.",
    hands: "Brand Guardian",
    body: [
      { p: "Most founders have plenty to say and no time to write it down. What they have instead is a call last Tuesday where they explained the whole thing in four minutes, and a voice note on the way home." },
      { p: "The Ghostwriter works from that. A call, a voice note, a rant on the drive home. It writes the way you talk, in paragraphs, the way a person writes, and not the way the internet does." },
      {
        fig: () => (
          <TypedNote variant="post" title="Ghostwriter" pill="drafted" from="Aoife Byrne" role="Founder, Kite Insurance · 2h" avatar="AB" subject="" items={GHOST_POST} />
        ),
        cap: ILL(<>A post written for the founder of Kite Insurance, the made-up insurer from our course.</>),
      },
      { p: "Nothing in that post was invented by the agent. The seven in ten, the fortnight of forms, the decision to shop around for customers, all of it came from what she said on the call. The agent's job was the writing." },
      { p: "Three a week, in your name, and each one passes the Brand Guardian before it goes anywhere." },
    ],
  },
  {
    key: "search", num: "05", when: "every day, on the search account", name: "Search Agent", short: "new terms, new ads, live by morning",
    dek: "New terms, new ads, live by morning.",
    hands: "Website Agent",
    body: [
      { p: "Paid search is a job of small decisions made every day. Which terms people actually used, which of them are worth a bid, what the ad for each should say, what cap to put on it. In most teams those decisions get made once a month, when someone finds the time." },
      { p: "The Search Agent makes them every night. It reads what people searched for, finds the long-tail terms worth bidding on, writes the ad for each one, and puts them live in the morning with a budget cap." },
      { fig: () => <SearchAgentWindow />, cap: ILL(<>Run for Kite Insurance, the made-up insurer from our course. Every term, number and ad is invented. The job is the real one.</>) },
      { p: "That is one night's work. The terms it found, why each one is worth a bid, the ad it wrote, and the cap it set. On Friday it sends you a report on the week." },
      { p: "When a term needs a page to land on that does not exist yet, it asks the Website Agent for one." },
    ],
  },
  {
    key: "advertising", num: "06", when: "one approved ad, every size", name: "Advertising Agent", short: "one ad in, every size out",
    dek: "One approved ad in, every size out.",
    hands: "Brand Guardian",
    body: [
      { p: "An ad campaign needs one good idea and then thirty versions of it. The banner, the square, the story, the skyscraper, each with the logo at the right size and the headline still readable. The thirty versions are where a designer's week goes." },
      { p: "The Advertising Agent takes the one ad you approved and makes every other size, holding the brand exactly. Then it runs them and reads the numbers." },
      { fig: () => <AdMachine /> },
      { p: "Every size in that set came from the one you approved. The designer's week goes into the next idea instead." },
      { p: "Every set passes the Brand Guardian before it runs." },
    ],
  },
  {
    key: "website", num: "07", when: "a site, then changes on request", name: "Website Agent", short: "a site built from your brand",
    dek: "A site built from your brand, changed by asking for it.",
    hands: "Brand Guardian",
    body: [
      { p: "This is Tallis, a made-up finance technology company we built to show what the agent does. The page is real and running inside the window, so scroll it." },
      { fig: () => <SiteWindow src="/agents/tallis/index.html" label="Website Agent · tallis.finance" />, cap: ILL(<>Tallis is made up. Nothing in it is a real company, customer or number.</>) },
      { p: "The Website Agent built it from the brand and the messaging, the same two documents everything else on this page works from. That is why it looks like one company rather than a template." },
      { p: "Then it changes the site when you tell it what you want, in a sentence. Move the pricing up. Make the hero calmer. Add a page for the new product. No ticket, and no waiting for Thursday." },
      { p: "Every change goes through the Brand Guardian before it is live." },
    ],
  },
  {
    key: "guardian", num: "08", when: "before anything ships", name: "Brand Guardian", short: "every file measured against the book",
    dek: "Every piece measured against the brand book before it ships.",
    hands: "Red Team",
    body: [
      { p: "Every brand has a book, and every brand has work going out that does not quite match it. The logo a little small, the colour a shade off, the headline a word too long for the box. Nobody meant it. Nobody checked." },
      { p: "The Brand Guardian checks. Every piece the other agents make passes through it before it goes anywhere: the logo size, the colours, the headline, how much of the frame the product takes. Passed, or sent back with the fixes named." },
      { fig: () => <GuardianWindow /> },
      { p: "That is a Tallis ad going through it. Drag the slider and watch the checks run. Everything it measures is written in the brand book, so a fail is never an opinion." },
      { p: "After the Guardian, the Red Team." },
    ],
  },
  {
    key: "pm", num: "09", when: "every morning", name: "Project Manager", short: "where everything stands",
    dek: "Where everything stands, in one note each morning.",
    hands: "You",
    body: [
      { p: "Nine agents working overnight makes a lot of things move. Someone has to know what moved, what is late, and what is stuck waiting on a person." },
      { p: "The Project Manager keeps the board. It reads what every other agent did, and each morning it writes you one note." },
      { fig: () => <TypedNote title="Project Manager" subject="Where everything stands, Monday" from="Project Manager" avatar="PM" items={PM} />, cap: ILL(<>The projects are invented. The note is the shape of the real one.</>) },
      { p: "The note tells you what needs you and what does not, and if you do one thing today, which one. That is the point of it. You read one note rather than nine." },
    ],
  },
  {
    key: "redteam", num: "10", when: "last, every day", name: "Red Team", short: "the mistakes, caught before you see them",
    dek: "The mistakes, caught before you see them.",
    hands: "You",
    body: [
      { p: "Agents make mistakes. A source that turns out to be a year old. A number in an email that nobody can trace. The cost of a mistake is not the mistake. It is that you stop trusting the work." },
      { p: "So one agent has a single job, which is to doubt everything the others made. It checks the sources, it reads the numbers, and it sends work back." },
      { fig: () => <TypedNote title="Red Team" subject="Two things did not pass today" from="Red Team" avatar="RT" items={REDTEAM} />, cap: ILL(<>The note is the shape of the real one. The mistakes are made up, and they are the kind it catches.</>) },
      { p: "Two things did not pass that day, and neither reached you. The rest did, and you can trust it because something tried to break it first." },
    ],
  },
];

/* The consulting and training panels. Paul's own copy, verbatim from the AXA
   page. They appear in two places: inline when the mid-page switch picks
   them, and on the full-screen surface when the hero's door opens. One
   source for each so the two can never drift. */
function ConsultingPanel() {
  return (
          <div className="ag-overlay-panel">
            <div className="ag-num">04</div>
            <h3 className="ag-name">Designing team AI adoption</h3>
            <div className="ag-overlay-plate">
              <WorkGrid />
            </div>
            {/* Paul's own copy, verbatim from the AXA page. */}
            <p className="ag-overlay-copy">
              Not everybody is going to be a builder, and that is fine. I suspect every marketing
              team will soon have at least one person who builds, and who helps the other teams
              with their work. What we measure is simple: pieces of work that are now done a
              different way, not logins or prompt counts.
            </p>
          </div>
  );
}

function TrainingPanel() {
  return (
          <div className="ag-overlay-panel">
            <div className="ag-num">05</div>
            <h3 className="ag-name">Training teams</h3>
            <div className="ag-overlay-plate">
              <ScaledWindow width={940}>
                <div className="ppw-blueprint">
                  <div className="ppw-frame-win">
                    <div className="ppw-tl">
                      <i />
                      <i />
                      <i />
                      <span className="ppw-t">the course, module one</span>
                      <span className="ppw-live-pill">free, live now</span>
                    </div>
                    <video
                      src="/for/training/course-module-1-scroll-web.mp4"
                      poster="/for/training/course-module-1-scroll-poster.jpg"
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ display: "block", width: "100%", height: "auto" }}
                    />
                  </div>
                </div>
              </ScaledWindow>
            </div>
            {/* Paul's own copy, verbatim from the AXA page. */}
            <p className="ag-overlay-copy">
              Firstly, there is a free course,{" "}
              <a href="/course" className="ag-overlay-link">AI Fluency for Ambitious Marketers</a>,
              for anybody on your team. We also run training sessions for marketing, sales and
              go-to-market teams. These range from half a day to full-week sessions. We cover a
              range of topics, from pure productivity hacks to building agents and systems.
              System thinking is a core skill for marketing in an AI world.
            </p>
          </div>
  );
}


export default function AgentsSection() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  // which door the surface is showing: the ten agents, the adoption grid,
  // or the course scroller. The hero's three buttons pick it.
  const [mode, setMode] = useState<Door>("agents");
  // the mid-page switch: which of the three the section shows inline
  const [view, setView] = useState<Door>("agents");
  const rowRef = useRef<HTMLElement>(null);

  // the hero announces a door; this section owns the surface and opens it
  useEffect(() => {
    const onDoor = (e: Event) => {
      setMode((e as CustomEvent<Door>).detail);
      setOpen(true);
    };
    window.addEventListener("rwf:door", onDoor);
    return () => window.removeEventListener("rwf:door", onDoor);
  }, []);

  // the menu locks the page behind it while it is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const pick = (i: number) => {
    setActive(i);
    setView("agents");
    setOpen(false);
    // bring the chosen agent's row to the top of the screen
    requestAnimationFrame(() => {
      const el = rowRef.current;
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  };

  const a = AGENTS[active];
  const nextIndex = AGENTS.findIndex((x) => x.name === a.hands);

  return (
    <section className="ag" id="agents">
      {/* THE ONE SELECTOR ON THE PAGE (Paul, 5 Sep). Three boxed buttons in the
          hero's own style pick what the section shows. The hero's three doors
          open the surface; these swap the panel in place. */}
      <div className="ag-switch" role="tablist">
        {(["agents", "consulting", "training"] as Door[]).map((v) => (
          <button key={v} type="button" role="tab" aria-selected={view === v} className={view === v ? "on" : ""} onClick={() => setView(v)}>
            {v === "agents" ? "AI Agents" : v === "consulting" ? "Consulting" : "Training"}
          </button>
        ))}
      </div>

      {view === "agents" ? (
        <div className="ag-split">
          {/* the reading rail: all ten, grouped in the order the work moves,
              the dot on the one you are reading (toolkit nav 02) */}
          <aside className="ag-rail" aria-label="The team">
            {AGENTS.map((ag, i) => (
              <button key={ag.key} type="button" className={active === i ? "on" : ""} onClick={() => pick(i)}>
                <span className="ag-rail-dot" />
                <span className="ag-rail-n">{ag.num}</span>
                <span>{ag.name}</span>
              </button>
            ))}
          </aside>

          <div className="ag-list">
            <button type="button" className="ag-mobile-pick" onClick={() => { setMode("agents"); setOpen(true); }}>
              <span><span className="ag-rail-n">{a.num}</span> <b>{a.name}</b></span>
              <span className="ag-mobile-pick-arr">pick another &#8964;</span>
            </button>
            <article className="ag-piece" id={`agent-${a.num}`} ref={rowRef} key={a.key}>
              <div className="ag-piece-meta">{a.num} &middot; {a.when}</div>
              <h3 className="ag-piece-title">{a.name}</h3>
              <p className="ag-piece-dek">{a.dek}</p>
              <div className="ag-piece-prose">
                {a.body.map((b, i) =>
                  "p" in b ? (
                    <p key={i}>{b.p}</p>
                  ) : (
                    <figure className="ag-fig" key={i}>
                      {b.fig()}
                      {b.cap ? <figcaption className="ag-cap">{b.cap}</figcaption> : null}
                    </figure>
                  ),
                )}
              </div>
              <div className="ag-piece-foot">
                <span className="ag-piece-foot-label">hands over to</span>
                {nextIndex >= 0 ? (
                  <button type="button" className="ag-piece-next" onClick={() => pick(nextIndex)}>
                    {a.hands} <span className="arr">&rarr;</span>
                  </button>
                ) : (
                  <span className="ag-piece-next end">{a.hands}</span>
                )}
              </div>
            </article>
          </div>
        </div>
      ) : (
        <div className="ag-panel-solo ag-inline">
          {view === "consulting" ? <ConsultingPanel /> : <TrainingPanel />}
        </div>
      )}

      <div className="ag-close">
        <div className="ag-num">the day, end to end</div>
        <h3 className="ag-name">How the work moves between them</h3>
        <div className="ag-body">
          <p>
            One agent does its job and hands the result to the next. Nothing waits on a person
            until the end, when you read what they made.
          </p>
        </div>
        <div className="ag-plate">
          <CampaignWindow
            title="the team"
            crumbLabel="Monday"
            runNumber={41}
            nodes={NODES}
            stats={{ contacted: 84, replied: 12, booked: 3, running: 1 }}
            creditsUsed={41}
            creditsTotal={250}
          />
        </div>
        <p className="ag-cap">
          <span className="slash">/illustrative.</span> The numbers are made up. The order is real.
        </p>
      </div>

      {/* THE FULL-SCREEN SURFACE: it drops, and what rises in depends on the
          door. AI Agents: the ten names, staggered. Consulting: the adoption
          grid from the AXA page, section 04, with Paul's line under it.
          Training: the course scroller from the same page, with his copy.
          The two reading doors sit on cream because the grid and the window
          were drawn for cream; the agents list stays on deep. */}
      <div className={`ag-overlay${open ? " open" : ""}${mode === "agents" ? "" : " paper"}`} aria-hidden={!open}>
        <div className="ag-overlay-top">
          <span className="ag-overlay-kick">
            {mode === "agents" ? "/the team" : mode === "consulting" ? "/consulting" : "/training"}
          </span>
          <button type="button" className="ag-overlay-close" onClick={() => setOpen(false)}>
            close &#10005;
          </button>
        </div>
        {mode === "consulting" ? <ConsultingPanel /> : null}

        {mode === "training" ? <TrainingPanel /> : null}

        <nav className="ag-overlay-list" hidden={mode !== "agents"}>
          {AGENTS.map((ag, i) => (
            <div className="ag-overlay-clip" key={ag.key}>
              <button
                type="button"
                className={`ag-overlay-item${active === i ? " on" : ""}`}
                style={{ transitionDelay: open ? `${0.15 + i * 0.05}s` : "0s" }}
                onClick={() => pick(i)}
              >
                <span className="ag-overlay-n">{ag.num}</span>
                <span className="ag-overlay-name">{ag.name}</span>
                <span className="ag-overlay-short">{ag.short}</span>
              </button>
            </div>
          ))}
        </nav>
      </div>
    </section>
  );
}
