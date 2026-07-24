import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "What Is a Marketing Agent? | Run with Foxes",
  description:
    "A marketing agent is software that runs the daily marketing work, ads, outreach, reporting, so a person keeps the judgment calls. Not a chatbot.",
};

const faqs = [
  {
    q: "Is a marketing agent a chatbot?",
    a: "No. A chatbot answers when you prompt it and stops when you close the window. A marketing agent runs on a schedule and on triggers, writing ads, sending outreach, pulling reports, whether or not anyone is chatting with it that day. Talking to it is optional. The daily work isn't.",
  },
  {
    q: "Does a marketing agent replace a marketer?",
    a: "No. It replaces the blank page and the repeated execution work, not the judgment. A person still decides what's worth saying, reviews the output and makes the calls that matter: what to say, what to change, what to ship. A good marketing agent gives that person back the time they used to spend on execution.",
  },
  {
    q: "How is this different from the marketing automation software we already use?",
    a: "Automation software moves data and triggers sends off rules a person already wrote. It doesn't write the copy, judge whether a headline works, or check a claim before it ships. A marketing agent does that thinking work too, because the brand's positioning, voice and proof are built into it, not supplied fresh by a person every time.",
  },
  {
    q: "Do small teams actually benefit from this, or is it built for big marketing departments?",
    a: "Small teams tend to benefit the most. A tool doesn't fix unclear thinking, it just makes it faster, so a brand with vague positioning gets vague output at speed either way. But once the fundamentals are actually worked out, the same tool becomes an amplifier: a two or three person team can keep pace with channels that used to need a much bigger one.",
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

export default function WhatIsAMarketingAgentPage() {
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
          <div className="rwf-label">/ explainer</div>
          <h1 className="rwf-h1">What is a marketing agent?</h1>
          <p className="rwf-standfirst">
            A marketing agent is software that does the daily work of marketing,
            running on rules, not waiting for a prompt, so a person can keep the
            judgment calls.
          </p>

          <h2 className="rwf-h2">The plain answer</h2>
          <div className="rwf-body">
            <p>
              A marketing agent is software that does the daily marketing work:
              writing and versioning ads, running outreach, building and
              scheduling campaigns, pulling reports, on a set rhythm, without a
              person opening a blank document each time. It is not a chatbot that
              waits for you to ask it something. It is closer to a staffed function
              that runs, with a person keeping every judgment call: what to say,
              what to change, what to ship.
            </p>
            <p>
              Think of the tasks a marketing coordinator does in a normal week:
              drafting ad copy, sending the outreach sequence, checking last week's
              numbers, putting the report together. A marketing agent takes on that
              execution layer and runs it continuously, on the brand's own rules,
              while a person reviews the output and makes the calls that actually
              need judgment.
            </p>
            <p>
              That last part matters. A marketing agent does not decide the
              strategy or approve the final call. It carries out the daily work
              inside rules a person set, and the person stays in charge of what
              those rules are.
            </p>
          </div>

          <h2 className="rwf-h2">What makes a good one</h2>
          <div className="rwf-body">
            <p>
              Software that writes without any brand fundamentals behind it
              produces a specific, recognisable voice: polished, neutral,
              forgettable, the same structure every time. That is not a flaw in the
              AI. It is a flaw in what it was given. AI amplifies whatever you put
              into it. Feed it nothing and it guesses, and the guess sounds like it
              could belong to any brand in the category. Feed it the fundamentals
              and it writes like the brand.
            </p>
            <p>
              A good marketing agent has those fundamentals built in, not bolted
              on:
            </p>
            <p>
              <strong>A messaging framework.</strong> Positioning, proof points,
              competitive contrast and hard bans in one document, so every piece of
              work is anchored to the same pillars and the same evidence, not a
              fresh guess each time.
            </p>
            <p>
              <strong>A voice framework.</strong> Not adjectives like "bold" or
              "friendly" but instructions the software can actually follow: sentence
              rhythm, tone by channel, and a list of the exact patterns that make AI
              writing sound like AI writing.
            </p>
            <p>
              <strong>A source protocol.</strong> Before anything ships, every claim
              has to trace back to a real source. No invented statistics, no
              fabricated quotes, no guessed data. If there is no source, the agent
              flags the gap instead of filling it with confidence.
            </p>
            <p>
              <strong>Marketing effectiveness, not just marketing activity.</strong>{" "}
              Positioning done properly, segmentation, distinctiveness and mental
              availability, the kind of effectiveness thinking Peter Field has spent
              years proving out, not just faster output.
            </p>
            <p>
              This is the difference between a generic AI agent and a good one. A
              generic agent is one tool built to sound plausible for any brand. A
              good one is one system per brand, with that brand's actual
              fundamentals written into it, so the quality is built in rather than
              checked at the end.
            </p>
            <p>
              Run with Foxes builds this kind of agent. Twenty years of marketing
              fundamentals, positioning, segmentation and effectiveness, plus real
              copy and art craft, built into every one. It is built by Paul Dervan,{" "}
              <Link href="/lottery-case-study">
                Ireland's Marketer of the Year 2022
              </Link>
              , who led the National Lottery to its first billion-euro year, 19% up
              on 2019, the highest year-on-year growth in the company's history.
            </p>
          </div>

          <h2 className="rwf-h2">What it is not</h2>
          <div className="rwf-body">
            <p>
              <strong>Not a chatbot.</strong> A chatbot waits. You open it, type
              something, get an answer, close it. A marketing agent runs on a
              schedule and on triggers: it writes the week's ads, sends the outreach
              sequence, pulls the report, whether or not anyone opened a chat window
              that day. The conversation is optional. The work isn't.
            </p>
            <p>
              <strong>Not generic marketing automation software.</strong> Automation
              platforms move data and trigger sends off rules a person already
              wrote. They are good at that. What they cannot do is write the ad,
              judge whether a headline actually lands, or catch an invented
              statistic before it goes out. A marketing agent does the thinking work
              too, because the fundamentals, positioning, voice, proof, are built
              into it, not left for a person to supply every time.
            </p>
          </div>

          <h2 className="rwf-h2">Where it fits</h2>
          <div className="rwf-body">
            <p>
              This matters most for small teams. A tool does not fix vague thinking.
              It just makes it faster. Feed a mushy, unclear brand into an AI writer
              and you get mush at speed, published on schedule. Feed it a brand with
              the fundamentals actually worked out, and the same tool becomes an
              amplifier: a small team can keep pace with channels that used to need
              a much bigger one, because the strategic thinking is already built into
              the system, and the person's time goes on the calls that need a human,
              not on redoing the groundwork every single time.
            </p>
            <p>
              None of this replaces a marketer's judgment. It replaces the blank
              page and the repeated execution, so the marketer's time goes further.
            </p>
          </div>

          <h2 className="rwf-h2">Want to see one running</h2>
          <div className="rwf-body">
            <p>
              If you want to see what a marketing agent looks like when the
              fundamentals are already built in rather than left to chance, we can
              show you one working on real campaigns.{" "}
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

      <SiteFooter current="/what-is-a-marketing-agent" />

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
