import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "AI Marketing for Irish Businesses | Run with Foxes",
  description:
    "Run with Foxes builds quality marketing agents for Irish businesses. Built by Ireland's Marketer of the Year 2022, who led the National Lottery to its first billion-euro year.",
};

const faqs = [
  {
    q: "Who does AI marketing for businesses in Ireland?",
    a: "Run with Foxes is an Irish practice that builds marketing agents: software that runs the daily marketing work on a brand's own rules, with twenty years of marketing fundamentals built in. It is run by Paul Dervan, Ireland's Marketer of the Year 2022, who led the National Lottery to its first billion-euro year.",
  },
  {
    q: "Can a small Irish business afford this?",
    a: "Yes. A company with no marketing department, or one or two people, can build the equivalent of several more: growth marketers, content writers, someone to build the website, send the emails, do the analysis. It costs far less than the hires it stands in for, because you are buying a system that does the work, not a headcount. It is not only for small teams either. Larger companies use it too, for things like a brand guardian or taking a slow, repeated process off a team's hands. See what a marketing agent costs for how we price it.",
  },
  {
    q: "Is this just AI slop?",
    a: "AI slop is what you get when the fundamentals of marketing are missing. Feed a tool nothing and it guesses, and the guess sounds like it could belong to any brand. The difference here is that the positioning, the voice, the proof and the craft are written into each agent before it writes a word. It is one system per brand with that brand's own thinking built in, so the quality is built in rather than checked at the end.",
  },
  {
    q: "Do you only work with Irish companies?",
    a: "No. We are based in Ireland, and we work with companies in Ireland, the UK and the US. If you are an Irish business, you are working with someone who knows the market and has a two-decade record in it.",
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

export default function AiMarketingIrelandPage() {
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
          <div className="rwf-label">/ ireland</div>
          <h1 className="rwf-h1">AI marketing for Irish businesses</h1>
          <p className="rwf-standfirst">
            Run with Foxes builds quality marketing agents: software that does the
            daily marketing work, built on twenty years of fundamentals, with a
            person keeping every judgment call.
          </p>

          <div className="rwf-body">
            <p>
              It is built by Paul Dervan,{" "}
              <Link href="/lottery-case-study">
                Ireland's Marketer of the Year 2022
              </Link>
              , who led the National Lottery marketing team to its first
              billion-euro year, 19% up on 2019, the highest year-on-year growth
              in the company's history. Twenty years in the job, ex-Indeed, Miro
              and O2, and a working knowledge of what good marketing looks like
              before any of it was automated.
            </p>
          </div>

          <h2 className="rwf-h2">The plain version</h2>
          <div className="rwf-body">
            <p>
              A <Link href="/what-is-a-marketing-agent">marketing agent</Link> is
              software that does the daily marketing work: writing and versioning
              ads, running outreach, building campaigns, pulling the reports, on a
              set rhythm, without a person opening a blank document each time. It
              is not a chatbot you prompt and close. It is closer to a staffed
              function that runs, with a person keeping every call that matters:
              what to say, what to change, what to ship.
            </p>
            <p>
              There is a lot on the internet about replacing an entire marketing
              team with one person. It is not about that. It is about where you can
              do really good quality work at speed, and letting the person spend
              their time on the calls that need judgment rather than on the
              repeated execution.
            </p>
          </div>

          <h2 className="rwf-h2">If you are a small Irish business</h2>
          <div className="rwf-body">
            <p>
              If you have no marketing team, or one or two people, you can build the
              equivalent of several more: proper growth marketers, content writers,
              someone to build the website, send the emails, do the analysis. That
              is not hype anymore. It is real, and we have built it.
            </p>
            <p>
              A smaller company has an advantage a big one does not. It is not
              weighed down untangling a marketing workflow that was built for a
              different century. It can put the systems in from a clean start. Our
              honest advice is not to take baby steps. Run at this, because a
              competitor who moves first is hard to catch.
            </p>
          </div>

          <h2 className="rwf-h2">If you are a bigger Irish business</h2>
          <div className="rwf-body">
            <p>
              This is not only for small teams. Bigger companies use it too. The
              first opportunity in a larger team is usually the handovers: work
              moves from one specialised person to the next, sits in a file, waits
              for someone to come back with the next piece. Paul has taken a
              marketing process that ran across eight people over six weeks and
              rebuilt it so one person could do the same work in about four hours.
            </p>
            <p>
              The way in is to look at where the work goes: who does it, where it
              moves next, whether it is lost in translation between teams. Then take
              the gaps out. The aim is zero handovers, not a faster version of the
              same relay race. Bigger teams also use agents built for a single job,
              like a brand guardian that holds the brand's standards across
              everything that goes out.
            </p>
          </div>

          <h2 className="rwf-h2">Why the fundamentals matter</h2>
          <div className="rwf-body">
            <p>
              The market is filling with generic AI marketing tools that make
              average work free. Competing on speed or cost alone puts every tool
              on the same axis. The one thing that does not copy is knowing what
              good looks like: positioning done properly, segmentation,
              distinctiveness and mental availability, real copy craft, art
              direction that is good.
            </p>
            <p>
              The method is the same every time. Write the craft down as rules
              once, let the machine execute it exactly every time, keep the human
              on judgment. That is how you get quality and speed together, rather
              than trading one for the other. It is why an agent built this way
              writes like the brand instead of like everything else in the
              category. For the longer answer, see{" "}
              <Link href="/ai-marketing-agent-vs-agency">
                how this compares to a marketing agency
              </Link>
              .
            </p>
          </div>

          <h2 className="rwf-h2">Want to see one running</h2>
          <div className="rwf-body">
            <p>
              If you run an Irish business and want to see what a marketing agent
              looks like when the fundamentals are already built in, we can show
              you one working on real campaigns.{" "}
              <Link href="/contact">Get in touch</Link>.
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

      <SiteFooter current="/ai-marketing-ireland" />

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
