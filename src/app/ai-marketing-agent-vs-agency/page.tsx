import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Marketing Agent vs Agency | Run with Foxes",
  description:
    "Built by Ireland's Marketer of the Year 2022, our AI marketing agents carry twenty years of fundamentals, not just speed and lower cost.",
};

const faqs = [
  {
    q: "Is an AI marketing agent actually better than an agency, or just cheaper and faster?",
    a: "Cheaper and faster only matters if the work underneath is good. Ours is built by someone who spent twenty years learning what good marketing looks like, so speed and cost aren't the trade-off, they're what you get on top of the thinking.",
  },
  {
    q: "What stops an AI agent from producing average, forgettable marketing?",
    a: "The marketing knowledge someone builds into it. Ours carries positioning, segmentation and effectiveness principles, and real copy and art craft, the same fundamentals used to take the National Lottery to its first billion-euro year.",
  },
  {
    q: "Do we still need a person involved?",
    a: "Yes, for every judgement call. The agent handles what's repeatable: the daily send, the tracking, the report you'd otherwise write yourself. A person decides who's worth talking to, what gets said, and when something's ready to go out.",
  },
  {
    q: "Can an agent replace our agency relationship entirely?",
    a: "Not always, and we wouldn't claim it should. Where the work needs many specialisms in a room, or people on the ground, an agency is still the right call. Where the work is marketing thinking applied daily, a quality agent can carry that on its own.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function AgentVsAgencyPage() {
  return (
    <div className="contact-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="top-bar">
        <Link href="/" className="logo">
          /<span>Run</span>withfoxes
        </Link>
        <nav>
          <Link href="/#projects">/projects</Link>
          <Link href="/contact">/contact</Link>
          <Link href="/#signup" className="cta-bar">
            /get_the_book
          </Link>
        </nav>
      </header>

      <main className="contact-main">
        <div className="rwf-reading avc-reading">
          <div className="rwf-label">/ compare</div>
          <h1 className="rwf-h1">An AI marketing agent vs hiring a marketing agency</h1>
          <p className="rwf-standfirst">
            An agent is only as good as the marketing thinking built into it. Ours
            carries twenty years of it, from the marketer who led the National
            Lottery to its first billion-euro year.
          </p>

          <div className="rwf-body">
            <p>
              People land on this comparison expecting a story about speed and
              cost. Fair enough, that's the honest search behind it, and we answer
              it properly further down. But it's the wrong first question.
            </p>
            <p>
              An AI marketing agent has no instincts of its own. It has whatever
              marketing thinking someone built into it, and nothing more. A cheap
              agent with no craft behind it turns out forgettable work faster than
              a person could ever type it. That's not a technology problem, it's
              the same old marketing problem, moving quicker.
            </p>
            <p>
              Run with Foxes agents carry twenty years of marketing fundamentals
              into every piece of work they do. They were built by Paul Dervan,{" "}
              <Link href="/lottery-case-study">
                Ireland's Marketer of the Year 2022
              </Link>
              , who led the National Lottery marketing team to its first
              billion-euro year, 19% up on 2019, the highest year-on-year growth in
              the company's history. That's not a line on a slide. It's the
              material the agents are built from.
            </p>
          </div>

          <h2 className="rwf-h2">What's built into ours</h2>
          <div className="rwf-body">
            <p>
              <strong>Positioning done properly.</strong> Not a paragraph
              generated from a prompt. The agents work through who a brand is for
              and why before a word gets written, the same discipline that took the
              Lottery to its record year.
            </p>
            <p>
              <strong>Segmentation and insight.</strong> Before an agent writes to
              anyone, it works out who it's talking to and what they care about. A
              broadcast message, a message for a segment, or one for a single named
              person, depending on what's actually known. A mail-merge with a first
              name swapped in is not that.
            </p>
            <p>
              <strong>Marketing effectiveness.</strong> Distinctiveness over
              difference. Staying visible over one clever burst. A brand that's
              remembered over one merely seen. These are the rules the agents plan
              and write against, the same thinking Paul brought Peter Field in to
              teach the National Lottery team.
            </p>
            <p>
              <strong>Copy craft.</strong> Before the agent writes a headline it
              answers the two questions Paul learned across twenty years of
              direct-response advertising, studying the classics like Ogilvy,
              Caples and Hopkins: what is the strongest benefit to the reader, and
              what would make a stranger stop scrolling. Only then does it write.
            </p>
            <p>
              <strong>Art direction.</strong> Images and artwork chosen and
              directed with judgement, not whatever the model defaults to when
              nobody's looking.
            </p>
            <p>
              <strong>The human keeps the calls that matter.</strong> Which idea
              gets backed, what's worth saying, when something's ready. The agent
              carries the fundamentals into the daily work. It never replaces the
              judgement.
            </p>
          </div>

          <h2 className="rwf-h2">The honest agent-vs-agency comparison</h2>
          <div className="rwf-body">
            <p>
              <strong>Speed.</strong> An agency batches work across clients and
              runs on office hours. An agent works around the clock, so a first
              draft is usually ready before a briefing meeting would even start.
            </p>
            <p>
              <strong>Cost.</strong> An agency carries the overhead of many
              specialist roles, layered into the invoice. An agent doesn't carry
              that structure, so day-to-day production costs less.
            </p>
            <p>
              <strong>Range in the room.</strong> A good agency brings several
              people and real debate before anything ships. An agent works as one
              system. It supports the person who has a point of view, it can't be a
              room.
            </p>
            <p>
              <strong>Consistency.</strong> An agent doesn't have an off day, a
              notice period, or a handover to manage. It applies the same standard
              every time, at any hour.
            </p>
            <p>
              <strong>Judgement.</strong> Both still need a person making the real
              calls. In an agency, that's whoever's in the room. With an agent,
              it's whoever built it, and whoever's using it. This is the one that
              decides everything else on this list.
            </p>
          </div>

          <h2 className="rwf-h2">Where an agency is still the right call</h2>
          <div className="rwf-body">
            <p>
              Genuinely, not as a hedge. Some jobs need many hands and specialisms
              in one place at once: a national shoot, a trade-show stand, a rebrand
              that has to land across physical retail. An agent doesn't put people
              on the ground.
            </p>
            <p>
              There's real value in an outside creative director's independent eye,
              across the table, arguing the brief with you in real time. And where
              compliance or legal sign-off needs a function embedded in the daily
              team, that's an agency job, or a specialist's, not ours pretending
              otherwise.
            </p>
          </div>

          <h2 className="rwf-h2">Where a quality marketing agent wins</h2>
          <div className="rwf-body">
            <p>
              This is the part that used to be the whole pitch. Here it's proof the
              quality above gets delivered properly, day after day.
            </p>
            <p>
              <strong>The morning loop.</strong> Before the working day starts, the
              system checks what happened overnight, tells us who replied, works
              out how much runway each live campaign has left, and lines up the next
              batch of the right people, ready to go.
            </p>
            <p>
              <strong>Nothing moves without a yes.</strong> The words a prospect
              sees are approved once, up front, by a person. After that, the only
              daily decision the system makes is who's ready to enter a sequence,
              never what gets said to them.
            </p>
            <p>
              <strong>Compliance built in, not left to memory.</strong> Who can be
              contacted by email versus LinkedIn, and under which law, is enforced
              in the system itself, built so it can't be got wrong.
            </p>
            <p>
              <strong>Learning that stays on a client's own data.</strong> A
              correction sticks the moment it's made and gets applied from then on.
              What works gets promoted, what doesn't gets logged and avoided, and
              that compounds on a client's market in a way a competitor can't copy.
            </p>
          </div>

          <h2 className="rwf-h2">Where this leaves you</h2>
          <div className="rwf-body">
            <p>
              The "agent vs agency" question was never really the choice. The real
              choice is what's built into whatever you use, and whether the person
              who built it has done the work themselves, for years, before handing
              the judgement to software.
            </p>
            <p>
              Twenty years went into ours. If you want to see what that looks like
              against your own marketing, <Link href="/contact">get in touch</Link>.
            </p>
          </div>

          <h2 className="rwf-h2">Questions people ask</h2>
          <div className="page-faq">
            {faqs.map((f) => (
              <div key={f.q} className="page-faq-item">
                <h3 className="rwf-h3">{f.q}</h3>
                <div className="rwf-body">
                  <p>{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="bottom-bar">
        <Link href="/" className="active">
          ← back
        </Link>
        <Link href="/#projects">/projects</Link>
        <Link href="/contact">/contact</Link>
        <Link href="/#signup" className="cta-bar">
          get the book
        </Link>
      </div>
    </div>
  );
}
