import TypedNote, { type NoteItem } from "./TypedNote";
import SiteWindow from "./SiteWindow";
import { OutreachWindow, CampaignWindow } from "@/app/for/_components/library/AgentWindows";
import { WriterEmail } from "@/app/for/_components/library/WriterPiece";
import BrandGuardian from "@/app/for/_components/library/BrandGuardian";
import AdMachine from "@/app/for/_components/library/AdMachine";
import "./agents-section.css";

/*
  /agents - replaces the products storefront below the bio (5 Sep 2026).

  One row per agent. Each row is a close-up of the thing that agent hands
  over, at reading size, sitting on the page with the name above it and the
  words around it. Paul, 5 Sep: the figures show what the agent is
  providing, not the pieces of how it does it; the notes are addressed to
  him; the writing is typed; nothing sits on a white plate; sentences run
  the full width.

  The exhibits are the proposal pages' own components where one already
  existed (outreach inbox, the writer's email with sourced lines, the ad
  machine, the brand guardian, the campaign workflow), so the homepage, the
  proposals and the course read as one system.

  Copy is a first draft for Paul to steer. Nothing in it is agreed.
*/

const RESEARCH: NoteItem[] = [
  { kind: "lead", text: "Hi Paul," },
  {
    kind: "p",
    text: "Here's today's research. Five companies, all filed to the CRM. The one to look at first is **Kite Insurance**.",
  },
  {
    kind: "p",
    text: "They've been hiring a performance marketing manager since May and the role is still open. Renewal price rises were in the news last week and their own site says nothing about it. The person to ask is **Niamh Costello**, Head of Marketing, confirmed in a press release in June.",
  },
  { kind: "li", text: "Two of her team registered for the course in August, so there is a **warm way in**." },
  {
    kind: "li",
    text: "“Kite insurance renewal” gets **2,400 searches a month** and they rank fourth. “Car insurance quote” gets 33,100 and they are not in the top 20.",
  },
  { kind: "li", text: "**Three ads live**, all the same offer since March." },
  {
    kind: "p",
    text: "The other four are on their cards, every fact with its source beside it. I've handed all five to the **Outbound Agent**.",
  },
  { kind: "att", text: "kite-insurance-card.pdf · 2 pages" },
];

const REDTEAM: NoteItem[] = [
  { kind: "lead", text: "Hi Paul," },
  {
    kind: "p",
    text: "I checked everything the team made today before it went out. Two things did not pass.",
  },
  {
    kind: "li",
    text: "The Kite research says **Niamh Costello** was confirmed in a press release in June. The release is from June last year. Sent back to the Research Agent to find a source inside twelve months.",
  },
  {
    kind: "li",
    text: "The renewal email quotes a **saving of €187**. I could not find where that number came from. Held until someone shows me.",
  },
  { kind: "p", text: "Everything else passed: 84 messages, 12 ad sizes, the course page change. **Nothing went out with a mistake in it.**" },
];

const OUTBOUND_THREADS = [
  {
    name: "Ciara Walsh",
    company: "Head of Marketing · Kite Insurance",
    message:
      "Hi Ciara - saw the performance marketing role has been open since May. We run that job as an agent for insurers, and I can show you what it does in twenty minutes. Worth a look?",
    reply: "Yes - send me a couple of times next week.",
  },
  {
    name: "Tomás Keane",
    company: "Marketing Director · Slaney Mutual",
    message:
      "Hi Tomás - your renewal note is the same one you sent last year. We write those so they read like a person. Ten minutes on how?",
    reply: "Interesting. Thursday morning suits.",
  },
  {
    name: "Aoife Brennan",
    company: "Growth Lead · Harbour Cover",
    message:
      "Hi Aoife - congratulations on the new role. If you are building the team, it is worth seeing what an agent does before you hire for it.",
    reply: "Happy to chat. Send an invite.",
  },
  {
    name: "David Nolan",
    company: "CMO · Rathmore Life",
    message:
      "Hi David - you wrote about lapsed policies last week. We built the agent that brings them back for a gym; the same shape works for cover. Half an hour?",
    reply: "Go on then. Next week.",
  },
];

const NODES: [
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
  { icon: string; label: string; kind: "trigger" | "step" | "agent" },
] = [
  { icon: "◆", label: "Lid opens, 07:00", kind: "trigger" },
  { icon: "▤", label: "Research Agent", kind: "agent" },
  { icon: "➤", label: "Outbound Agent", kind: "agent" },
  { icon: "✎", label: "Email Agent", kind: "agent" },
  { icon: "✓", label: "Guardian + Red Team", kind: "step" },
];

function Row({
  num,
  when,
  name,
  does,
  gets,
  hands,
  cap,
  children,
}: {
  num: string;
  when: string;
  name: string;
  does: string;
  gets: string;
  hands: string;
  cap?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="ag-row close" id={`agent-${num}`}>
      <div className="ag-body">
        <div className="ag-num">
          {num} &middot; {when}
        </div>
        <h3 className="ag-name">{name}</h3>
        <p>{does}</p>
      </div>
      <div className="ag-plate">{children}</div>
      {cap ? <p className="ag-cap">{cap}</p> : null}
      <div className="ag-body ag-after">
        <p>{gets}</p>
        <div className="ag-hand">
          <span>hands over to</span>
          <span className="arr">&rarr;</span>
          <b>{hands}</b>
        </div>
      </div>
    </div>
  );
}

export default function AgentsSection() {
  return (
    <section className="ag" id="agents">
      <div className="ag-kick">/agents</div>
      <h2 className="ag-head">A team of agents that do the work each day, on their own</h2>
      <p className="ag-stand">
        Each agent has one job. It does that job every morning without being asked, and when it
        finishes it hands the work to the next agent. Here is the team, and what each one hands
        you.
      </p>

      <div className="ag-list">
        <Row
          num="01"
          when="every morning, on its own"
          name="Research Agent"
          does="Every morning it researches the companies you want to win, files a card on each one to the CRM, and writes you a note on what it found."
          gets="You read one note with your coffee. The research is done, checked and sourced, and it is already with the next agent."
          hands="Outbound Agent"
          cap={
            <>
              <span className="slash">/illustrative.</span> Kite Insurance is the made-up insurer
              from our course, and the people are made up too. The note is the shape of the real one.
            </>
          }
        >
          <TypedNote
            title="Research Agent"
            subject="Your research for Monday"
            from="Research Agent"
            avatar="R"
            items={RESEARCH}
          />
        </Row>

        <Row
          num="02"
          when="every day, on its own"
          name="Outbound Agent"
          does="Takes the research, finds the right person at each company, writes to them for real, and keeps the conversation going until there is a meeting in your diary."
          gets="You turn up to the meetings. You never build a list or chase a reply."
          hands="Email Marketing Agent"
          cap={
            <>
              <span className="slash">/illustrative.</span> Every name and company in the inbox is
              invented. The messages are the shape of the ones it sends.
            </>
          }
        >
          <OutreachWindow threads={OUTBOUND_THREADS} title="Outbound Agent" sentLabel="84 sent" width={1104} />
        </Row>

        <Row
          num="03"
          when="whenever a customer needs a word"
          name="Email Marketing Agent"
          does="Writes the emails that keep customers: the renewal note, the welcome, the win-back. Every line comes from your positioning, your messaging and your voice. Hover a dotted line and it tells you which."
          gets="Emails that sound like you, every time, with nothing to rewrite."
          hands="Brand Guardian"
          cap={
            <>
              <span className="slash">/illustrative.</span> Written for Kite Insurance, the made-up
              insurer from our course.
            </>
          }
        >
          <WriterEmail
            subject={{ text: "Your renewal is due on 14 September", note: "voice" }}
            body={[
              { text: "Hi Sarah," },
              { text: "Before it renews, we'll quote the market for you.", note: "positioning" },
              {
                text: "Last year most people in your position paid the price they were sent. It was a bit higher than the year before, and paying it beat a fortnight of forms and four websites asking the same eleven questions.",
              },
              { text: "That increase was never compulsory. It was the cost of staying put.", note: "messaging" },
              {
                text: "So about three weeks before your date we'll check what everyone else would charge for the same cover. If someone is cheaper, we move you and do the paperwork. If nobody is, you stay where you are. Either way you'll get a note saying what we found and what we chose.",
                note: "messaging",
              },
              { text: "The first time we did this, customers saved €187 on average.", note: "proof" },
              { text: "Nothing for you to do.", note: "voice" },
            ]}
            sign={["Aoife", "Kite"]}
          />
        </Row>

        <Row
          num="04"
          when="one sign-off, every size"
          name="Advertising Agent"
          does="You approve one ad. It makes every other size, holding the brand exactly, then runs them and reads the numbers."
          gets="One decision from you becomes a whole campaign's worth of formats, the same afternoon."
          hands="Brand Guardian"
        >
          <AdMachine />
        </Row>

        <Row
          num="05"
          when="before anything ships"
          name="Brand Guardian"
          does="Checks every piece against your brand book before it goes out: the logo size, the colours, the headline, how much of the frame the photograph takes. Passed, or sent back with the fixes named."
          gets="Nothing goes out off brand, and nobody on the team has to be the police."
          hands="Red Team"
        >
          <BrandGuardian />
        </Row>

        <Row
          num="06"
          when="when you ask, in plain words"
          name="Website Agent"
          does="Builds pages and changes them when you tell it what you want, in a sentence. This is our course page, which it built and keeps changing."
          gets="A change to the website is a sentence you say, not a ticket you raise."
          hands="Brand Guardian"
          cap={
            <>
              <span className="slash">/live.</span> The real page, running inside the window.
            </>
          }
        >
          <SiteWindow src="/course" label="Website Agent · runwithfoxes.com/course" />
        </Row>

        <Row
          num="07"
          when="last, every day"
          name="Red Team"
          does="Its only job is to find the mistakes in the other agents' work before you see it. It doubts everything, checks the sources, and sends work back."
          gets="You never have to wonder whether an agent got it wrong. One of them is paid to assume they did."
          hands="You"
          cap={
            <>
              <span className="slash">/illustrative.</span> The note is the shape of the real one.
              The mistakes are made up, and they are the kind it catches.
            </>
          }
        >
          <TypedNote
            title="Red Team"
            subject="Two things did not pass today"
            from="Red Team"
            avatar="RT"
            items={REDTEAM}
          />
        </Row>
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
    </section>
  );
}
