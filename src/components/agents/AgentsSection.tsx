"use client";

import { useEffect, useRef, useState } from "react";
import TypedNote, { type NoteItem } from "./TypedNote";
import SiteWindow from "./SiteWindow";
import GuardianWindow from "./GuardianWindow";
import SearchAgentWindow from "./SearchAgentWindow";
import { OutreachWindow, CampaignWindow } from "@/app/for/_components/library/AgentWindows";
import { WriterEmail, WriterPost } from "@/app/for/_components/library/WriterPiece";
import AdMachine from "@/app/for/_components/library/AdMachine";
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
  { kind: "p", text: "The other four are on their cards, every fact with its source beside it. I've handed all five to the **Outbound Agent**." },
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
  { icon: "➤", label: "Outbound Agent", kind: "agent" },
  { icon: "✎", label: "Email Agent", kind: "agent" },
  { icon: "✓", label: "Guardian + Red Team", kind: "step" },
];

const ILL = (what: React.ReactNode) => (
  <>
    <span className="slash">/illustrative.</span> {what}
  </>
);

type Agent = {
  key: string;
  num: string;
  when: string;
  name: string;
  short: string;
  does: string;
  gets: string;
  hands: string;
  cap?: React.ReactNode;
  render: () => React.ReactNode;
};

const AGENTS: Agent[] = [
  {
    key: "research", num: "01", when: "every morning", name: "Research Agent", short: "the morning research note",
    does: "Every morning it researches the companies you want to win, files a card on each one to the CRM, and writes you a note on what it found.",
    gets: "Every company on your list has a researched card in the CRM before the working day starts, with a source on every fact.",
    hands: "Outbound Agent",
    cap: ILL(<>Kite Insurance is the made-up insurer from our course, and the people are made up too. The note is the shape of the real one.</>),
    render: () => <TypedNote title="Research Agent" subject="Your research for Monday" from="Research Agent" avatar="R" items={RESEARCH} />,
  },
  {
    key: "outbound", num: "02", when: "every day", name: "Outbound Agent", short: "the messages, the replies, the meetings",
    does: "Takes the research, finds the right person at each company, writes to them for real, and keeps the conversation going until there is a meeting in your diary.",
    gets: "The list, the messages, the follow-ups and the replies are handled. Meetings go into your diary.",
    hands: "Email Marketing Agent",
    cap: ILL(<>Every name and company in the inbox is invented. The messages are the shape of the ones it sends.</>),
    render: () => <OutreachWindow threads={OUTBOUND_THREADS} title="Outbound Agent" sentLabel="84 sent" width={1104} />,
  },
  {
    key: "email", num: "03", when: "when an email is due", name: "Email Marketing Agent", short: "the emails that keep customers",
    does: "Writes the emails that keep customers: the renewal note, the welcome, the win-back. Every line comes from your positioning, your messaging and your voice. Hover a dotted line and it tells you which.",
    gets: "The emails are written from your own positioning and messaging, so they read like your company and need no rewriting.",
    hands: "Brand Guardian",
    cap: ILL(<>Written for Kite Insurance, the made-up insurer from our course.</>),
    render: () => (
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
  },
  {
    key: "ghostwriter", num: "04", when: "three posts a week", name: "Ghostwriter", short: "posts and articles in your voice",
    does: "Turns what you know into posts and articles that sound like you. It works from your own words, a call, a voice note, a rant, and every line can show you which one it came from.",
    gets: "Posts and articles go out in your name each week, written from things you actually said.",
    hands: "Brand Guardian",
    cap: ILL(<>A post written for the founder of Kite Insurance, the made-up insurer from our course.</>),
    render: () => (
      <WriterPost
        title="Ghostwriter · a LinkedIn post"
        body={[
          { text: "I spent last week going through what our customers did at renewal time last year, and I want to share what I found, because I think it says something about how this industry works." },
          { text: "About seven in ten of the people we insure paid the renewal price we sent them without shopping around. When I first saw that number I assumed it meant they were happy with us. I don't think it does. I think it means the alternative was a fortnight of filling in forms on four different websites, answering the same eleven questions each time, and most people have better things to do with their evenings.", note: "proof" },
          { text: "So we've started doing the shopping around for them. About three weeks before a renewal is due, we check what everyone else would charge for the same cover. If someone is cheaper, we tell the customer and move them, and we do the paperwork. If nobody is, they stay where they are. Either way they get a note saying what we found.", note: "positioning" },
          { text: "I know how that sounds coming from an insurer, and it will cost us customers some years. I'd rather that than a business that depends on people not getting around to checking. If you're with an insurer that won't do this for you, it's worth asking them why.", note: "voice" },
        ]}
      />
    ),
  },
  {
    key: "search", num: "05", when: "every day, on the search account", name: "Search Agent", short: "new terms, new ads, live by morning",
    does: "Does your search marketing. Every night it reads what people searched for, finds the long-tail terms worth bidding on, writes the ads for them, and puts them live in the morning with a budget cap.",
    gets: "New terms, new ads and the bids kept in order every day, with a report to you on Friday.",
    hands: "Website Agent",
    cap: ILL(<>Run for Kite Insurance, the made-up insurer from our course. Every term, number and ad is invented. The job is the real one.</>),
    render: () => <SearchAgentWindow />,
  },
  {
    key: "advertising", num: "06", when: "one approved ad, every size", name: "Advertising Agent", short: "one ad in, every size out",
    does: "You approve one ad. It makes every other size, holding the brand exactly, then runs them and reads the numbers.",
    gets: "One approved ad becomes the full set of sizes, on brand, without a designer redrawing each one.",
    hands: "Brand Guardian",
    render: () => <AdMachine />,
  },
  {
    key: "website", num: "07", when: "a site, then changes on request", name: "Website Agent", short: "a site built from your brand",
    does: "Builds a site from your brand and your messaging, then changes it when you tell it what you want, in a sentence. This one is for Tallis, a made-up finance technology company, built to show what it can do.",
    gets: "A site built from your brand and your messaging, and changes made by asking for them in plain words.",
    hands: "Brand Guardian",
    cap: ILL(<>Tallis is made up. The page is real and running inside the window; nothing in it is a real company, customer or number.</>),
    render: () => <SiteWindow src="/agents/tallis/index.html" label="Website Agent · tallis.finance" />,
  },
  {
    key: "guardian", num: "08", when: "before anything ships", name: "Brand Guardian", short: "every file measured against the book",
    does: "Checks every piece against your brand book before it goes out: the logo size, the colours, the headline, how much of the frame the product takes. Passed, or sent back with the fixes named.",
    gets: "Nothing goes out off brand. Every file is measured against the brand book before it ships.",
    hands: "Red Team",
    render: () => <GuardianWindow />,
  },
  {
    key: "pm", num: "09", when: "every morning", name: "Project Manager", short: "where everything stands",
    does: "Keeps the board. Knows what every other agent did overnight, what is late, and what is waiting on you, and tells you in one note.",
    gets: "One note each morning with what moved, what is late and what is waiting on you.",
    hands: "You",
    cap: ILL(<>The projects are invented. The note is the shape of the real one.</>),
    render: () => <TypedNote title="Project Manager" subject="Where everything stands, Monday" from="Project Manager" avatar="PM" items={PM} />,
  },
  {
    key: "redteam", num: "10", when: "last, every day", name: "Red Team", short: "the mistakes, caught before you see them",
    does: "Its only job is to find the mistakes in the other agents' work before you see it. It doubts everything, checks the sources, and sends work back.",
    gets: "Mistakes are found and sent back before the work reaches you.",
    hands: "You",
    cap: ILL(<>The note is the shape of the real one. The mistakes are made up, and they are the kind it catches.</>),
    render: () => <TypedNote title="Red Team" subject="Two things did not pass today" from="Red Team" avatar="RT" items={REDTEAM} />,
  },
];

export default function AgentsSection() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const rowRef = useRef<HTMLDivElement>(null);
  const idx = hover ?? active;

  // the sliding indicator follows the hovered tab, then the chosen one
  useEffect(() => {
    const el = tabRefs.current[idx];
    if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
  }, [idx]);
  // the strip scrolls so the chosen tab is always in view
  useEffect(() => {
    const el = tabRefs.current[active];
    if (el) el.scrollIntoView({ inline: "nearest", block: "nearest", behavior: "smooth" });
  }, [active]);
  useEffect(() => {
    const onResize = () => {
      const el = tabRefs.current[active];
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active]);

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
      <div className="ag-kick">/agents</div>
      <h2 className="ag-head">A team of agents that do the work each day, on their own</h2>
      <p className="ag-stand">
        Each agent has one job. It does that job every morning without being asked, and when it
        finishes it hands the work to the next agent. Pick one to see what it hands you.
      </p>

      <div className="ag-tabs-row">
        <div className="ag-tabs" onMouseLeave={() => setHover(null)}>
          <div className="ag-pill" style={{ left: pill.left, width: pill.width }} />
          {AGENTS.map((ag, i) => (
            <button
              key={ag.key}
              ref={(el) => { tabRefs.current[i] = el; }}
              className={`ag-tab${idx === i ? " on" : ""}`}
              onMouseEnter={() => setHover(i)}
              onClick={() => pick(i)}
              type="button"
            >
              <span className="ag-tab-n">{ag.num}</span>
              {ag.name}
            </button>
          ))}
        </div>
        <button className="ag-menu-btn" type="button" onClick={() => setOpen(true)}>
          the team +
        </button>
      </div>

      <div className="ag-list">
        <div className="ag-row close" id={`agent-${a.num}`} ref={rowRef} key={a.key}>
          <div className="ag-body">
            <div className="ag-num">
              {a.num} &middot; {a.when}
            </div>
            <h3 className="ag-name">{a.name}</h3>
            <p>{a.does}</p>
          </div>
          <div className="ag-plate">{a.render()}</div>
          {a.cap ? <p className="ag-cap">{a.cap}</p> : null}
          <div className="ag-body ag-after">
            <p>{a.gets}</p>
            <div className="ag-hand">
              <span>hands over to</span>
              <span className="arr">&rarr;</span>
              {nextIndex >= 0 ? (
                <button type="button" className="ag-hand-link" onClick={() => pick(nextIndex)}>
                  {a.hands}
                </button>
              ) : (
                <b>{a.hands}</b>
              )}
            </div>
          </div>
        </div>
      </div>

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

      {/* THE FULL-SCREEN MENU: a surface drops, the ten agents rise in staggered */}
      <div className={`ag-overlay${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="ag-overlay-top">
          <span className="ag-overlay-kick">/the team</span>
          <button type="button" className="ag-overlay-close" onClick={() => setOpen(false)}>
            close &#10005;
          </button>
        </div>
        <nav className="ag-overlay-list">
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
