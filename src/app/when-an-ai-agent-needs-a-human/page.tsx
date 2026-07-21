import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "What Should an AI Agent Never Do On Its Own? | Run with Foxes",
  description:
    "Two questions decide when an AI marketing agent needs a person: does the job need judgment, and how big a deal is it if it goes wrong.",
};

const faqs = [
  {
    q: "Can an AI agent send emails to my customers on its own?",
    a: "For routine sends it has done many times, yes. A mistake there is no big deal, so it just does it. For anything with bigger consequences, a large campaign, a big spend, or something new, a person checks it first.",
  },
  {
    q: "What decides whether the agent needs a person?",
    a: "Two things. Whether the job needs judgment or is being done for the first time, and how big a deal it would be if it went wrong. Routine, low-stakes jobs run on their own. Judgment calls, new things, and anything with real consequences get a person.",
  },
  {
    q: "Does it do more on its own over time?",
    a: "Yes. It has to get a job right many times, with someone checking, before it runs that job on its own. It doesn't get trusted on day one.",
  },
  {
    q: "What stops it from doing something with big consequences?",
    a: "The bigger the consequence, the surer we are a person has looked before it happens. Public things and serious spends always get a person, and the rules about who can be contacted, and how, are written into the code.",
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

export default function AgentOversightPage() {
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
          <div className="rwf-label">/ how it works</div>
          <h1 className="rwf-h1">What should an AI agent never do on its own?</h1>
          <p className="rwf-standfirst">
            Two questions decide it. Does the job need judgment, and how big a
            deal is it if it goes wrong.
          </p>

          <div className="rwf-body">
            <p>
              People worry that an AI agent will do something on its own they'd
              never have agreed to. Fair enough. You don't want to check every
              single thing it does, that's just a slow way of doing the work
              yourself. And you don't want it loose on the things that matter. So
              you need a simple way to tell those two apart. Two questions do it.
            </p>
          </div>

          <h2 className="rwf-h2">Does the job need judgment, or is it new?</h2>
          <div className="rwf-body">
            <p>
              Anything that needs judgment needs a person. Anything being done for
              the first time needs a person. But a job we've done hundreds of
              times, and got right hundreds of times, can run on its own. The more
              often the agent does something and gets it right, the less it needs
              watching. It has to get a job right over and over, with someone
              checking, before it does that job on its own. It doesn't get trusted
              on day one.
            </p>
          </div>

          <h2 className="rwf-h2">How big a deal is it if it goes wrong?</h2>
          <div className="rwf-body">
            <p>
              Sending a few emails to a list is not a big deal, so the agent just
              does it. Putting something live in front of millions of people, or
              spending a big budget, is a big deal, so a person checks it first. It
              isn't about whether it's an email or a web page. It's about the size
              of the consequences if it's wrong. Small consequences, let it run.
              Big consequences, a person looks first.
            </p>
          </div>

          <h2 className="rwf-h2">The rule</h2>
          <div className="rwf-body">
            <p>
              An agent runs the jobs it has done many times where a mistake would
              be no big deal. A person stays in the loop for anything that needs
              judgment, anything new, and anything where a mistake would cost you.
            </p>
          </div>

          <h2 className="rwf-h2">It's built in</h2>
          <div className="rwf-body">
            <p>
              This isn't a policy we ask you to take on trust. It's how the agents
              are built. The agent runs the routine work on its own, and stops
              before anything with real consequences: something public, something
              that spends serious money, something it hasn't done before. The
              bigger the deal, the surer we are that a person has looked.
            </p>
          </div>

          <h2 className="rwf-h2">Where this leaves you</h2>
          <div className="rwf-body">
            <p>
              The agent does the work. You keep the decisions that would cost you
              something. <Link href="/contact">Get in touch</Link> to see where
              those lines sit on your own campaigns.
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

      <SiteFooter current="/when-an-ai-agent-needs-a-human" />

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
