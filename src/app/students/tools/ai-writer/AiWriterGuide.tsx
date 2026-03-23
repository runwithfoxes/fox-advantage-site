"use client";

import Link from "next/link";

interface Step {
  number: number;
  title: string;
  why: string;
  what: string[];
  example?: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: "Positioning",
    why: "If you do not know who you are writing for, what you are competing against, and what makes you different, the AI will produce generic content that sounds like everyone else. Positioning is the foundation. Everything else depends on it.",
    what: [
      "Competitive alternatives: what would customers use if you did not exist?",
      "Distinct capabilities: what can you do that alternatives cannot?",
      "Differentiated value: why does it matter to the customer?",
      "Best-fit customers: who is this actually for (and who is it not for)?",
    ],
    example: "A B2B travel tech company called Waymark starts with a positioning workshop output. Competitive alternatives by capability area, distinct value pillars with proof points, and best-fit account profiles. Without this document, the AI has no idea what makes Waymark different from the market leader.",
  },
  {
    number: 2,
    title: "Brand DNA",
    why: "Brand DNA gives the writer a personality to write from, not just features to write about. Values, mission, and messaging pillars become the lens for every piece of content. The AI reads this before it writes anything.",
    what: [
      "Tagline and brand personality",
      "Who the brand is for (in one line)",
      "Brand values (stated as behaviours, not adjectives)",
      "Messaging pillars: What you do, How you do it, Why it matters",
      "Marketing implications of each value (what it means in practice)",
    ],
    example: "Waymark's brand DNA has three pillars: customer-centricity, openness, and challenger mindset. Under customer-centricity, the marketing implication is specific: 'Lead with customer problems, not Waymark features. Show their pain, then how we solve it.'",
  },
  {
    number: 3,
    title: "Voice framework",
    why: "Voice is not a list of adjectives. It is a set of writing rules specific enough that two different people, or two different AI models, produce content that sounds like the same brand.",
    what: [
      "Define 2-3 voice traits with specific writing instructions for each",
      "Tone calibration by channel (social vs web vs email vs thought leadership)",
      "Hard constraints: things the writer must never do",
      "Banned phrases and word swaps",
      "Rhythm rules to prevent AI-sounding cadence",
      "Construct limits (e.g. max one rhetorical question per section)",
    ],
    example: "Waymark has three voice traits: Infectiously Upbeat, Knowingly Provocative, Endlessly Supportive. Each has a tone dial from low to high, calibrated per channel. Thought leadership is medium across all three. Social is high on upbeat. The constraints are zero-tolerance: no em dashes, no exclamation marks, no passive voice, no fabricated statistics.",
  },
  {
    number: 4,
    title: "Audience-specific messaging",
    why: "Different audiences have different problems, different language, and different competitors. One positioning document is rarely enough. If you sell to enterprise buyers and small businesses, those are two different writers, even if the brand is the same.",
    what: [
      "Separate positioning for each audience segment",
      "Segment-specific competitive alternatives",
      "Segment-specific value pillars and proof points",
      "Language differences (what each audience calls things)",
      "Approved customer quotes per segment",
    ],
    example: "Waymark has two complete positioning documents: one for enterprise buyers, one for mid-market agencies. The competitive landscape is completely different. The value proposition changes. The AI writer asks 'who is this for?' before it reads any positioning material. The wrong document produces the wrong content.",
  },
  {
    number: 5,
    title: "Content-type frameworks",
    why: "An email and a thought leadership piece follow completely different rules, even for the same brand. The tone changes, the structure changes, the depth changes. Each content type needs its own framework layered on top of the core voice.",
    what: [
      "Separate frameworks for each content type (email, web, case study, thought leadership, social)",
      "Tone calibration per type (thought leadership is lower energy than social)",
      "Structure and format rules specific to the type",
      "Character limits and scannability rules for web content",
      "Depth requirements (thought leadership demands a defensible point of view, not assembled facts)",
    ],
    example: "Waymark has four separate writer prompts: Case Study, Email, Web Page, and Thought Leadership. The email writer has subject line formulas and CTA rules. The thought leadership writer has a critical rule: 'TL is not marketing with longer sentences.' Each format gets its own calibration of the three voice traits.",
  },
  {
    number: 6,
    title: "Source protocol",
    why: "The writer must read the positioning before it writes. Not sometimes. Every time. Without a mandatory protocol, the AI drifts toward generic output within a few interactions. The protocol is the seatbelt.",
    what: [
      "Mandatory document review before any writing task",
      "Audience identification as the first step (determines which documents to load)",
      "Protocol confirmation: the writer states what it reviewed before producing output",
      "Source disclosure: every claim traced back to a specific document",
      "Credibility rules: nothing fabricated, everything verifiable",
    ],
    example: "Waymark's master instruction file opens with 'STOP. Do not write a single word of content until you complete these steps.' Step 1: identify the audience. Step 2: review the positioning documents for that audience. Step 3: confirm what you reviewed. This is non-negotiable.",
  },
  {
    number: 7,
    title: "The master instruction file",
    why: "This is the document that ties everything together. It tells the AI what it is, what documents to read, in what order, and what to do with them. It is the operating manual. Without it, the other documents are just files sitting in a folder.",
    what: [
      "Writer identity (what it is, what it values, what it will not do)",
      "Document routing (which files to read based on audience and content type)",
      "Workflow: identify audience, review positioning, confirm protocol, then write",
      "Quality checklist before output is delivered",
      "Error handling: what to do when information is missing",
    ],
    example: "Waymark's master file routes the writer through a decision tree. Enterprise content? Read Brand DNA, Enterprise Positioning, Writer DNA. Agency content? Read Brand DNA, Agency Positioning, Writer DNA. Case study? Also load the case study framework. The writer never has to guess what to read.",
  },
];

export default function AiWriterGuide() {
  return (
    <div
      style={{
        background: "#FAFAF8",
        color: "#1D1B1B",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "0.9375rem",
        fontWeight: 300,
        lineHeight: 1.7,
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <section style={{ padding: "140px 0 60px", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, #d0d0cc 0.8px, transparent 0.8px)",
            backgroundSize: "28px 28px",
            opacity: 0.4,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px", position: "relative" }}>
          <Link
            href="/students"
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#8A8A85",
              textDecoration: "none",
              display: "inline-block",
              marginBottom: 24,
              transition: "color 0.3s ease-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#F47521")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A85")}
          >
            &larr; Back to framework
          </Link>
          <div
            style={{
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#F47521",
              marginBottom: 12,
            }}
          >
            Tools / How to
          </div>
          <h1
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 300,
              letterSpacing: -1,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Building an AI writer
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "#8A8A85", marginTop: 16, maxWidth: 600 }}>
            Seven documents, in this order. The strategic work comes before the tool touches a single word. If the fundamentals are solid, the tool becomes a multiplier. If they are vague, you get mush at speed.
          </p>
        </div>
      </section>

      {/* Pull quote */}
      <section style={{ padding: "20px 0 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ borderLeft: "3px solid #F47521", paddingLeft: 24 }}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(18px, 2.5vw, 24px)",
                fontWeight: 300,
                lineHeight: 1.45,
                color: "#1D1B1B",
                margin: 0,
              }}
            >
              Tools do not fix vague thinking. They just make it faster.
            </p>
            <p style={{ fontSize: "0.75rem", color: "#8A8A85", marginTop: 8 }}>
              <a href="/chapter/ch37-tiktok-writer" style={{ color: "#F47521", textDecoration: "none" }}>
                Chapter 31: TikTok writer
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: "0 0 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                marginBottom: 48,
                paddingBottom: 48,
                borderBottom: step.number < 7 ? "1px solid #E0E0DC" : "none",
              }}
            >
              {/* Step header */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 48,
                    fontWeight: 300,
                    color: "#E0E0DC",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {step.number}
                </span>
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 28,
                    fontWeight: 300,
                    letterSpacing: "-0.5px",
                    margin: 0,
                  }}
                >
                  {step.title}
                </h2>
              </div>

              {/* Why */}
              <p style={{ fontSize: "0.9375rem", color: "#1D1B1B", marginBottom: 20, maxWidth: 640 }}>
                {step.why}
              </p>

              {/* What to include */}
              <div
                style={{
                  border: "1px solid #E0E0DC",
                  padding: "20px 24px",
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 400,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "#F47521",
                    marginBottom: 12,
                  }}
                >
                  What to include
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {step.what.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: "0.8125rem",
                        color: "#1D1B1B",
                        padding: "6px 0",
                        display: "flex",
                        alignItems: "baseline",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: "#F47521", flexShrink: 0 }}>/</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Example */}
              {step.example && (
                <div
                  style={{
                    background: "#355E4C",
                    color: "#F7EAD9",
                    padding: "20px 24px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 400,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: "#F47521",
                      marginBottom: 8,
                    }}
                  >
                    In practice
                  </div>
                  <p style={{ fontSize: "0.8125rem", lineHeight: 1.6, margin: 0 }}>
                    {step.example}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* The order matters */}
      <section
        style={{
          padding: "60px 0",
          background: "#355E4C",
          color: "#F7EAD9",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, #F47521 0.8px, transparent 0.8px)",
            backgroundSize: "28px 28px",
            opacity: 0.08,
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px", position: "relative" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(24px, 3.5vw, 36px)",
              fontWeight: 300,
              letterSpacing: -1,
              lineHeight: 1.2,
              margin: "0 0 24px 0",
            }}
          >
            The order matters
          </h2>
          <p style={{ fontSize: "0.9375rem", color: "rgba(247, 234, 217, 0.85)", maxWidth: 600, marginBottom: 24 }}>
            Each document depends on the one before it. You cannot write a voice framework without positioning, because you would not know who you are talking to or what makes you different. You cannot build content-type frameworks without voice, because you would not know what the brand sounds like.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "rgba(247, 234, 217, 0.85)", maxWidth: 600, marginBottom: 24 }}>
            The prompt the team uses every day can be tiny, because all the strategic thinking is already baked into the documents the writer reads before it starts. They are not prompting their way to a voice. They are pointing the tool at a situation and letting it do the repeatable part.
          </p>
          <p style={{ fontSize: "0.9375rem", color: "rgba(247, 234, 217, 0.85)", maxWidth: 600 }}>
            The judgment is in the documents. The speed is in the tool.
          </p>
        </div>
      </section>

      {/* Related chapters */}
      <section style={{ padding: "60px 0 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 300,
              letterSpacing: "-0.3px",
              margin: "0 0 20px 0",
            }}
          >
            Related chapters
          </h3>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { href: "/chapter/ch37-tiktok-writer", label: "TikTok writer", desc: "How a custom AI writer was built from positioning, voice rules, and customer verbatims" },
              { href: "/chapter/ch38-wrestling-with-a-stubborn-ai-writer", label: "Wrestling with a stubborn AI writer", desc: "Why you need domain expertise to train a writer, and how to know when the output is wrong" },
              { href: "/chapter/ch36-build-the-scaffolding-once", label: "Build the scaffolding once", desc: "If you do the same work twice, build it once. Templates and systems that hold context" },
            ].map((ch) => (
              <a
                key={ch.href}
                href={ch.href}
                style={{
                  display: "block",
                  border: "1px solid #E0E0DC",
                  padding: "16px 24px",
                  textDecoration: "none",
                  color: "#1D1B1B",
                  transition: "background 0.3s ease-out, transform 0.3s ease-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F5F5F0";
                  e.currentTarget.style.transform = "translateX(8px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "none";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div style={{ fontSize: "0.875rem", fontWeight: 400, color: "#F47521", marginBottom: 4 }}>
                  {ch.label}
                </div>
                <div style={{ fontSize: "0.8125rem", color: "#8A8A85" }}>{ch.desc}</div>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 40 }}>
            <Link
              href="/students"
              style={{
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#8A8A85",
                textDecoration: "none",
                transition: "color 0.3s ease-out",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F47521")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8A85")}
            >
              &larr; Back to framework
            </Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          section > div {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
