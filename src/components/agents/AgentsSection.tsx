"use client";

import { useEffect, useRef, useState } from "react";
import TypedNote, { type NoteItem } from "./TypedNote";
import SiteWindow from "./SiteWindow";
import GuardianWindow from "./GuardianWindow";
import SearchAgentWindow from "./SearchAgentWindow";
import AdDeskWindow from "./AdDeskWindow";
import { OutreachWindow } from "@/app/for/_components/library/AgentWindows";
import { WriterEmail } from "@/app/for/_components/library/WriterPiece";
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
  { kind: "p", text: "I spent last week going through what our customers did at renewal time last year, and I want to share what I found, because I think it says something about how this industry works.", note: "voice" },
  { kind: "p", text: "About seven in ten of the people we insure paid the renewal price we sent them without shopping around. When I first saw that number I assumed it meant they were happy with us. I don't think it does. I think it means the alternative was a fortnight of filling in forms on four different websites, answering the same eleven questions each time, and most people have better things to do with their evenings.", note: "proof" },
  { kind: "p", text: "So we've started doing the shopping around for them. About three weeks before a renewal is due, we check what everyone else would charge for the same cover. If someone is cheaper, we tell the customer and move them, and we do the paperwork. If nobody is, they stay where they are. Either way they get a note saying what we found.", note: "positioning" },
  { kind: "p", text: "I know how that sounds coming from an insurer, and it will cost us customers some years. I'd rather that than a business that depends on people not getting around to checking. If you're with an insurer that won't do this for you, it's worth asking them why.", note: "messaging" },
];

const OUTBOUND_THREADS = [
  { name: "Ciara Walsh", company: "Head of Marketing · Kite Insurance", message: "Hi Ciara - saw the performance marketing role has been open since May. We run that job as an agent for insurers, and I can show you what it does in twenty minutes. Worth a look?", reply: "Yes - send me a couple of times next week." },
  { name: "Tomás Keane", company: "Marketing Director · Slaney Mutual", message: "Hi Tomás - your renewal note is the same one you sent last year. We write those so they read like a person. Ten minutes on how?", reply: "Interesting. Thursday morning suits." },
  { name: "Aoife Brennan", company: "Growth Lead · Harbour Cover", message: "Hi Aoife - congratulations on the new role. If you are building the team, it is worth seeing what an agent does before you hire for it.", reply: "Happy to chat. Send an invite." },
  { name: "David Nolan", company: "CMO · Rathmore Life", message: "Hi David - you wrote about lapsed policies last week. We built the agent that brings them back for a gym; the same shape works for cover. Half an hour?", reply: "Go on then. Next week." },
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
};

const KITE = ILL(<>Kite Insurance is the made-up insurer from our course, and the people are made up too. The note is the shape of the real one.</>);

const AGENTS: Agent[] = [
  {
    /* Paul's own copy, dictated 6 Sep 2026 and agreed line by line. */
    key: "research", num: "01", when: "every morning", name: "Research Agent", short: "the morning research note",
    dek: "A team of research agents for marketing and sales, working every day, and you are not the bottleneck.",
    body: [
      { p: "Almost all marketing involves research of some sort. Researching products, propositions, the competition, the market. It is a fundamental part of the job. Sometimes that research is deep, a proper piece of work on one question. Sometimes it is ongoing, where we need to keep an eye on what is happening all the time. And sometimes it is triggered by something happening, like a meeting going into the diary." },
      { p: "It is possible to have a team of research agents who find that information for you on their own, every day. They work as a team, and you are not the bottleneck in it. They can research competitors. They can research prices. They can watch the things that change on a regular basis and tell you when they do." },
      { p: "Whatever they find goes somewhere you already work. Into a Google Sheet, into a file you read in the morning, or straight to another agent who takes it on from there. You don't go looking for the research. It is there when you sit down." },
      { p: "You might set up a research agent to research a prospect in advance, so that a salesperson walks into the meeting with good knowledge of the company and the person, and a few insights they would not have had time to find themselves." },
      { fig: () => <TypedNote title="Research Agent" subject="Your research for Monday" from="Research Agent" avatar="R" items={RESEARCH} />, cap: KITE },
      { p: "How you structure your research agents depends on what your goals are. Deep research on a few questions, a standing watch on many, research that fires when something happens, or all three." },
      { p: "A big part of this is that it is an opportunity to get work done that you probably weren't able to get done before." },
    ],
  },
  {
    /* Paul's own copy, dictated 6 Sep 2026 and agreed line by line. The
       dashboard sentences are his from the AXA page. */
    key: "growth", num: "02", when: "every morning", name: "Growth Agent Team", short: "the pipeline, the outbound, the meetings",
    dek: "A team of agents whose job is a meeting with a prospect in your calendar.",
    body: [
      { p: "The Growth Agent Team gets meetings with prospects booked in your calendar. That is the end game, and every task the team does is in service of it. Once it is built, and built carefully, the team is working away every day without you being the bottleneck." },
      { fig: () => <JoNote note={GROWTH_NOTE} />, cap: ILL(<>Every firm and person here is invented. The note is the shape of the real one.</>) },
      { p: "Like any growth team, there are a number of tasks involved. Finding your ideal customer profile, and the right companies within it. Finding the right role or roles inside each company, and their contact details. Then building up what you know about the person and the company. Has anything changed there that might be relevant, a restructure, a new hire, something someone said on LinkedIn or in the media. The point of all of it is a good understanding of whether these people would want what you are selling." },
      { p: "Then there is the outreach itself. The channel depends on your market and your circumstances. It means writing the emails or the LinkedIn messages, scheduling and sequencing them, and tracking every one." },
      { fig: () => <OutreachWindow threads={OUTBOUND_THREADS} title="Growth Agent Team" sentLabel="84 sent" width={806} />, cap: ILL(<>The people and the replies are invented. The messages are the shape of the real ones.</>) },
      { p: "The team moves a prospect the whole way from a first message to a meeting in your calendar, and does the prep research for your salesperson before that meeting starts. It is the single point of contact for updating and tracking the pipeline. For example, it opens the dashboard daily for it and the marketer to review together. It does analysis to help uncover blockers." },
      { fig: () => <PipelineBoard deals={GROWTH_PIPELINE} /> },
      { p: "We connect the team to your CRM and your calendar, so a booked meeting goes into your diary and every prospect's record is kept up to date. A large part of what we do is focused on quality. The quality of the targeting, of the information, of the writing and the outreach, and of the journey from first message to meeting." },
    ],
  },
  {
    /* Paul's own copy, dictated 6 Sep 2026 and agreed line by line. */
    key: "email", num: "03", when: "when an email is due", name: "Email Marketing Agent", short: "the emails that keep customers",
    dek: "The whole of lifecycle email, from writing to improving the journeys, done every day.",
    body: [
      { p: "The Email Marketing Agent does everything in lifecycle email. The writing, the scheduling, the sequencing, the tracking, the reporting, and improving the journeys as it goes. Once it is built, it is working away every day without you being the bottleneck." },
      { p: "The welcome, the renewal, the note to someone who has not been back for a while. The hard work in lifecycle marketing is continuously looking at where people are falling out, and finding ways to improve it. Today a large part of that work is getting in and writing the emails, and the manual work between the sequences." },
      { p: "The agent works inside a tool like Klaviyo. It looks at the numbers, finds where people are dropping off, writes the emails, and proposes the fixes." },
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
        cap: ILL(<>Written for Kite Insurance, the made-up insurer from our course. Hover a dotted line and it says where it came from.</>),
      },
      { p: "The word that matters here is trigger. Our own fluency course runs on trigger emails, sent on what someone did, or did not do, and in what order. Set up properly, with the data in place, that lets you send genuinely personal emails to people at the moment you think they might need them. That kind of precision was possible before, but only with a team of people doing it, and it was very labour intensive. Talk to any lifecycle marketer and it is a full-time role." },
      { p: "Like the others, there are separate tasks in it. Writing the emails. Getting the artwork. Connecting to the tool and sending. Tracking. Making changes and improving every day. Given a goal, set up properly and put on a loop, agents do these well." },
      { p: "The time goes into setting it up and building it properly. Once that is done, what used to be a full-time role becomes a few tasks a week for a generalist on your team." },
    ],
  },
  {
    /* Paul's own copy, dictated 6 Sep 2026 and agreed line by line. */
    key: "ghostwriter", num: "04", when: "three posts a week", name: "Ghostwriter", short: "posts and articles in your voice",
    dek: "A founder's point of view on LinkedIn and in longer articles, every week, in their own words.",
    body: [
      { p: "The Ghostwriter lets a founder or a senior exec get their opinion and their point of view across on LinkedIn, or in deeper articles, on an ongoing basis. It finds the material, structures it and writes it. What the founder does is open their laptop and find a handful of pieces that are ninety percent written. Usually it is a small bit of editing, then approve, and depending on how it is set up, the piece goes live." },
      { p: "It is mainly for B2B brands, and for anyone who needs thought leadership, which usually means founders, execs and people who write on a regular basis. It is for people who already have a point of view and know what they want to say. They are often busy, or they are good at talking and not as good at writing." },
      { p: "The Ghostwriter is two agents. The first is a research agent, which finds recent raw material, a conversation, a stat, a research piece, and puts it in one place. The second is a copywriter agent, which takes that material and writes the piece in the founder's own tone of voice." },
      {
        fig: () => (
          <TypedNote variant="post" title="Ghostwriter" pill="drafted" from="Aoife Byrne" role="Founder, Kite Insurance · 2h" avatar="AB" subject="" items={GHOST_POST} />
        ),
        cap: ILL(<>A post written for the founder of Kite Insurance, the made-up insurer from our course.</>),
      },
      { p: "The important part is done at the very beginning. The brand's positioning, the founder's point of view and the way he or she writes are all worked out and written down before the first piece. That is what stops it reading like AI slop." },
      { p: "The founder's job stays the same as it always was, which is having the opinion and saying yes to the piece." },
    ],
  },
  {
    /* Paul's own copy, dictated 6 Sep 2026 and agreed line by line. */
    key: "search", num: "05", when: "every day, on the search account", name: "Search Agent", short: "new terms, new ads, live by morning",
    dek: "Paid search run every day, the terms, the ads and the bids, without you.",
    body: [
      { p: "The Search Agent takes the daily work of paid search off you. Finding the terms, writing the ads, putting them live, reading the numbers and improving the account. Once it is built, it is working away every day without you being the bottleneck." },
      { p: "Part of the job is search terms. It finds the terms your brand should be found for, or you give it the ones you want, and it looks at the long tail, the hundreds of specific searches that a person does not have time to go through. It finds what each one costs. It can do this every day." },
      { fig: () => <SearchAgentWindow />, cap: ILL(<>Run for Kite Insurance, the made-up insurer from our course. Every term, number and ad is invented. The job is the real one.</>) },
      { p: "Part of the job is tracking. If you have good conversion data, it tells you which keywords are working better and which ads are working better, and it changes the account accordingly. It writes and rewrites individual ads. And if your website is structured for it, it can do some of the work that the GEO agent does as well." },
      { p: "Agents are very good at this because search changes all the time. The terms, the prices and what your competitors are doing move every day, so you can keep watching and keep competing. And there is a lot of good data to work from." },
      { p: "A lot of this is work marketers used to do themselves, and it took up their time. Analysing, writing, putting new ads live, improving them. All of it is a combination of automation and intelligence." },
    ],
  },
  {
    /* Paul's own copy, dictated 6 Sep 2026 and agreed line by line. The
       figure is our own course campaign on Meta: the real ad, the real
       numbers (AdDeskWindow.tsx says where they came from). */
    key: "advertising", num: "06", when: "always on", name: "Advertising Agent", short: "ads written, made, live and remade",
    dek: "Ads written, made, put live, read and remade, inside Meta or whichever tool you use, without you.",
    body: [
      { p: "The Advertising Agent does the work inside Meta, or another advertising tool, that used to be a full-time role or an agency. Once it is set up properly, it is working away every day without you being the bottleneck." },
      { p: "It writes the ads and creates the artwork. It sets each ad up properly in Ads Manager and puts it live. It runs them, tracks them, reports on them and improves them. Then it makes new ads from what it learned and puts those live, and goes round again." },
      { fig: () => <AdDeskWindow />, cap: (<><span className="slash">/real.</span> Our own Meta campaign for the free course, 30 July to 19 August 2026, numbers from Meta. Signups are not shown because the tracking was never connected, so nobody can say how many came from the ads.</>) },
      { p: "What you end up with is an expert that is working around the clock, continually putting new ads live, finding out which ones work, improving them, and going again." },
      { p: "That is a very different way of thinking from putting a campaign live. You go from a campaign to always on, and that is where volume wins, because you keep finding out what works. We always knew this was how it works. It just took a lot of people's time to do, and that meant full-time roles or agencies." },
    ],
  },
  {
    key: "website", num: "07", when: "a site, then changes on request", name: "Website Agent", short: "a site built from your brand",
    dek: "A site built from your brand, changed by asking for it.",
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
            </article>
          </div>
        </div>
      ) : (
        <div className="ag-panel-solo ag-inline">
          {view === "consulting" ? <ConsultingPanel /> : <TrainingPanel />}
        </div>
      )}

      {/* The workflow figure (how the work moves between them) came out on
          Paul's word, 6 Sep: it will be used elsewhere when he routes it out. */}

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
