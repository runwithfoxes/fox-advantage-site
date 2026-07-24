import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "What Does a Marketing Agent Cost? | Run with Foxes",
  description:
    "A marketing agent costs less than a few months of the marketer you'd hire to do the same work. A one-off build you own, not a recurring salary.",
};

const faqs = [
  {
    q: "What does a marketing agent cost?",
    a: "It costs less than a few months of a marketer hired to do the same work, and it is a one-off build rather than a recurring salary. The exact figure depends on the job, because it is priced against the work it replaces, not the hours it takes.",
  },
  {
    q: "Is it a monthly subscription or a one-off build?",
    a: "A one-off build you own and run. You pay once to have it made, not a fee every month for access.",
  },
  {
    q: "Do I still need to hire a marketer to run it?",
    a: "You need a person with good judgment to supervise it, but not the expensive specialist. The specialist-grade thinking is built into the agent, so a capable generalist can run what used to need an experienced hire.",
  },
  {
    q: "How can it be so much cheaper than hiring?",
    a: "Because a role becomes a task. Instead of a full-time salary for a function like lifecycle email, that function becomes a task an agent runs, with the fundamentals already built in, supervised by someone you already have.",
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

export default function MarketingAgentCostPage() {
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
        <div className="avc-reading">
          <div className="rwf-label">/ pricing</div>
          <h1 className="rwf-h1">What does a marketing agent cost?</h1>
          <p className="rwf-standfirst">
            Less than a few months of the person you'd hire to do the same work.
            But the cost is the opening line, not the point.
          </p>

          <div className="rwf-body">
            <p>
              The honest answer is: less than a few months of the marketer you'd
              hire to do the same job. Picture a marketing exec running your email
              and lifecycle marketing, doing the analysis, writing the emails,
              optimising the journeys, working the tools. That is a salary
              somewhere around €60,000 a year, every year. A marketing agent that
              does those same jobs is a one-off build, and it costs a fraction of
              that first year.
            </p>
            <p>
              If the whole pitch were "cheaper," we would be underselling it. The
              cost is the easy part to see. What changes underneath it is the
              bigger story.
            </p>
          </div>

          <h2 className="rwf-h2">A build you own, not a salary you rent</h2>
          <div className="rwf-body">
            <p>
              A hire is a cost that comes back every year, and one day hands in
              their notice. An agent is a build. You pay once to have it made and
              it is yours to run. It works around the clock, no off days, no
              sleep. And it compounds: learning is built in, so it optimises on
              your own data and gets better the longer it runs.
            </p>
            <p>
              When a marketer leaves, their learning leaves with them. An agent's
              learning stays with you and keeps building. You are not renting
              knowledge that walks out the door in eighteen months. You are
              accumulating an asset.
            </p>
          </div>

          <h2 className="rwf-h2">A role becomes a task</h2>
          <div className="rwf-body">
            <p>
              Here is the part that matters most. Email marketing still has to
              happen. Lifecycle marketing still has to happen. But they stop being
              full-time roles you hire for, and become tasks an agent runs. Give
              one marketer a few agents and that person has the output of a team,
              not because they got three times faster, but because several roles
              collapsed into tasks they now oversee. A small team can cover ground
              that used to need a department.
            </p>
          </div>

          <h2 className="rwf-h2">Why you don't need the expensive specialist</h2>
          <div className="rwf-body">
            <p>
              This works because the fundamentals are built into the agent up
              front. The specialist-grade thinking, positioning, segmentation,
              effectiveness, real copy craft, lives in the agent, not in the
              person running it. So the work shifts from hiring an experienced
              marketer at €60,000 to a good generalist with judgment supervising
              an agent that already knows what good looks like. That is why the
              cost falls so far. You are not buying a cheaper marketer. You are
              changing what kind of person the work needs.
            </p>
          </div>

          <h2 className="rwf-h2">So what is the actual number?</h2>
          <div className="rwf-body">
            <p>
              It depends on the job, so the figure comes from a conversation, not
              a price list. The shape is simple: a one-off build, priced against
              the work it replaces, not the hours it takes to make. If a task is
              costing you a full-time salary or an agency retainer today, a
              marketing agent is a fraction of that, built once and handed to you
              to run.{" "}
              <Link href="/contact">Tell us what you'd want it to do</Link> and
              we'll tell you what it takes.
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

      <SiteFooter current="/what-does-a-marketing-agent-cost" />

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
