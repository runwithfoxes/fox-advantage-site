"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface NodeItem {
  name: string;
  desc: string;
  links: { tag: string; label: string; href?: string }[];
}

interface Branch {
  id: string;
  title: string;
  subtitle: string;
  note?: string;
  nodes: NodeItem[];
}

const branches: Branch[] = [
  {
    id: "behaviours",
    title: "Behaviours",
    subtitle: "Five habits that make judgment work",
    nodes: [
      {
        name: "Poke",
        desc: "Curiosity treated as a system, not a personality trait. The habit of pressing on the odd thing, following the thread nobody asked you to follow.",
        links: [
          { tag: "chapter", label: "My 8.30am research report", href: "/chapter/ch23-my-830am-research-report" },
          { tag: "chapter", label: "Boardy AI rang me on a Sunday", href: "/chapter/ch24-boardy-ai-rang-me-on-a-sunday" },
          { tag: "chapter", label: "I chaired a meeting between two robots", href: "/chapter/ch25-i-chaired-a-meeting-between-two-robots" },
          { tag: "chapter", label: "Mr Beast", href: "/chapter/ch17-mr-beast" },
        ],
      },
      {
        name: "Skeptically optimistic",
        desc: "AI produces confident output. Confident output feels finished. Finished output does not get questioned. This is the habit of asking where something came from before you build a plan on top of it.",
        links: [
          { tag: "chapter", label: "Start with what", href: "/chapter/ch26-start-with-what" },
          { tag: "chapter", label: "126 years of AIDA", href: "/chapter/ch27-126-years-of-aida" },
          { tag: "chapter", label: "The one number you need to grow", href: "/chapter/ch28-the-one-number-you-need-to-grow" },
          { tag: "chapter", label: "Interview with two dead men", href: "/chapter/ch32-interview-with-two-dead-men" },
          { tag: "chapter", label: "Strong opinions, weakly held", href: "/chapter/ch33-strong-opinions-weakly-held" },
        ],
      },
      {
        name: "Do the reps",
        desc: "Judgment is built from doing the work, not reading about it. If you stop doing the reps, competence drains out of your fingers. AI makes this worse because it hands you a result that feels like you earned it.",
        links: [
          { tag: "chapter", label: "Gotta put in the reps", href: "/chapter/ch20-gotta-put-in-the-reps" },
          { tag: "chapter", label: "Look for the smell", href: "/chapter/ch18-look-for-the-smell" },
          { tag: "chapter", label: "Standards decide what stays", href: "/chapter/ch19-standards-decide-what-stays" },
          { tag: "chapter", label: "Keep the skill in your hands", href: "/chapter/ch35-keep-the-skill-in-your-hands" },
        ],
      },
      {
        name: "Build",
        desc: "The habit of making real things instead of describing real things. A page you can click is worth twenty slides about a page. The tools have made this available to marketers in a way it never was before.",
        links: [
          { tag: "chapter", label: "Build it in front of them", href: "/chapter/ch34-build-it-in-front-of-them" },
          { tag: "chapter", label: "Build the scaffolding once", href: "/chapter/ch36-build-the-scaffolding-once" },
          { tag: "chapter", label: "You don't need permission anymore", href: "/chapter/ch40-you-dont-need-permission-anymore" },
          { tag: "chapter", label: "Don't help, ask me questions", href: "/chapter/ch21-dont-help-ask-me-questions" },
        ],
      },
      {
        name: "Become a multi-tool marketer",
        desc: "Not a generalist who coordinates but cannot make anything. A marketer who can do enough adjacent things to ship without depending on a chain of other people. This is what you become if you do the first four long enough.",
        links: [
          { tag: "chapter", label: "Learn enough to be dangerous", href: "/chapter/ch41-learn-enough-to-be-dangerous" },
          { tag: "chapter", label: "TikTok writer", href: "/chapter/ch37-tiktok-writer" },
          { tag: "chapter", label: "Wrestling with a stubborn AI writer", href: "/chapter/ch38-wrestling-with-a-stubborn-ai-writer" },
          { tag: "chapter", label: "The whole event in an evening", href: "/chapter/ch61-the-whole-event-in-an-evening" },
        ],
      },
    ],
  },
  {
    id: "knowledge",
    title: "Knowledge",
    subtitle: "The marketing fundamentals",
    note: "Examples, not a complete list. This grows as you learn.",
    nodes: [
      {
        name: "How brands grow (Sharp)",
        desc: "Byron Sharp's evidence on reach, mental availability, and physical availability. Why brands grow by reaching more people, not by deepening loyalty among existing ones.",
        links: [
          { tag: "chapter", label: "The fundamentals are the input", href: "/chapter/ch44b-the-fundamentals-are-the-input" },
        ],
      },
      {
        name: "Effectiveness (Binet and Field)",
        desc: "The long and the short of it. Brand building and activation work differently, on different timescales, and you need both. The ratio is not the point. The balance is.",
        links: [
          { tag: "chapter", label: "The fundamentals are the input", href: "/chapter/ch44b-the-fundamentals-are-the-input" },
        ],
      },
      {
        name: "Distinctive assets",
        desc: "Consistent cues people recognise without needing to read the brand name. Colours, shapes, characters, sounds. More powerful with AI because AI can multiply them across formats without dilution, but only if you have them.",
        links: [
          { tag: "chapter", label: "Your eyepatch moment", href: "/chapter/ch44c-your-eyepatch-moment" },
          { tag: "chapter", label: "Marcel", href: "/chapter/ch46-marcel" },
        ],
      },
      {
        name: "Attribution and measurement",
        desc: "Dashboards show what happened, not why. Platform metrics inflate themselves. The skill is knowing what to measure, when to trust the number, and when to override it with judgment.",
        links: [
          { tag: "chapter", label: "Dashboards lie", href: "/chapter/ch48-dashboards-lie" },
          { tag: "chapter", label: "The one number you need to grow", href: "/chapter/ch28-the-one-number-you-need-to-grow" },
        ],
      },
      {
        name: "Customer behaviour",
        desc: "How people actually decide, not how funnels say they decide. Journeys compressed, algorithms shortlisting, decisions in minutes. The gap between what customers say and what they do.",
        links: [
          { tag: "chapter", label: "The listening habit", href: "/chapter/ch49-the-listening-habit" },
          { tag: "chapter", label: "Everything, everywhere, all at once", href: "/chapter/ch06-everything-everywhere-all-at-once" },
          { tag: "chapter", label: "Kill bugs fast", href: "/chapter/ch11-kill-bugs-fast" },
        ],
      },
      {
        name: "What collapsed and why",
        desc: "The structural shift. Algorithms gate visibility, execution costs dropped to zero, average became invisible. Understanding what changed is the foundation for everything else.",
        links: [
          { tag: "chapter", label: "The marketing department autopsy report", href: "/chapter/ch02-the-marketing-department-autopsy-report" },
          { tag: "chapter", label: "The algorithm will see you now", href: "/chapter/ch05-the-algorithm-will-see-you-now" },
          { tag: "chapter", label: "Average is the new invisible", href: "/chapter/ch07-average-is-the-new-invisible" },
        ],
      },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    subtitle: "What you build with",
    note: "Examples, not a complete list. New tools and categories appear constantly.",
    nodes: [
      {
        name: "Building an AI writer",
        desc: "Positioning first, then messaging framework, then voice rules, then training data from real customer language. The prompt stays tiny because the strategic work is baked in. Tools do not fix vague thinking. They just make it faster.",
        links: [
          { tag: "how to", label: "Step-by-step guide", href: "/students/tools/ai-writer" },
          { tag: "chapter", label: "TikTok writer", href: "/chapter/ch37-tiktok-writer" },
          { tag: "chapter", label: "Wrestling with a stubborn AI writer", href: "/chapter/ch38-wrestling-with-a-stubborn-ai-writer" },
        ],
      },
      {
        name: "Channel operations",
        desc: "Meta, Google, TikTok. How ad platforms work, what algorithms optimise for, and when to override them.",
        links: [{ tag: "tools", label: "Tools, platforms, and skills", href: "/students/tools/channel-operations" }],
      },
      {
        name: "Analytics and measurement",
        desc: "Multi-touch attribution, reading across platforms, spotting when numbers lie. Five layers of truth from one campaign.",
        links: [{ tag: "tools", label: "Tools, platforms, and skills", href: "/students/tools/analytics" }],
      },
      {
        name: "Content and creative",
        desc: "High-volume production with AI while keeping a distinctive voice. The difference between scaling content and scaling mush.",
        links: [{ tag: "tools", label: "Tools, platforms, and skills", href: "/students/tools/content-creative" }],
      },
      {
        name: "Audience and targeting",
        desc: "Custom audiences, lookalikes, retargeting. How AI finds audiences for you and when to override it.",
        links: [{ tag: "tools", label: "Tools, platforms, and skills", href: "/students/tools/audience-targeting" }],
      },
      {
        name: "Marketing technology",
        desc: "CRM, automation, tag management. The stack keeps growing. The skill is deciding what matters and simplifying.",
        links: [{ tag: "tools", label: "Tools, platforms, and skills", href: "/students/tools/martech" }],
      },
      {
        name: "Testing and optimisation",
        desc: "A/B tests, holdouts, geo tests. AI runs them faster. You form hypotheses worth testing and know when results are noise.",
        links: [{ tag: "tools", label: "Tools, platforms, and skills", href: "/students/tools/testing" }],
      },
      {
        name: "Planning and budgeting",
        desc: "Turning strategy into decisions with money attached. Tradeoffs, business cases, speaking finance language.",
        links: [{ tag: "tools", label: "Tools, platforms, and skills", href: "/students/tools/planning-budget" }],
      },
      {
        name: "Cross-functional coordination",
        desc: "Working with sales, product, finance, agencies. Influence without authority. Translating marketing into other functions' language.",
        links: [{ tag: "tools", label: "Tools, platforms, and skills", href: "/students/tools/cross-functional" }],
      },
      {
        name: "Commercial fluency",
        desc: "Connecting marketing to revenue. CAC, LTV, payback period. Reading a P&L and defending budgets in language a CFO believes.",
        links: [{ tag: "tools", label: "Tools, platforms, and skills", href: "/students/tools/commercial-fluency" }],
      },
    ],
  },
];

const loops = [
  { dir: "Behaviours \u2192 knowledge", text: "Poke makes you curious enough to learn the fundamentals. Skepticism makes you question whether what you learned is actually true. Do the Reps makes the knowledge stick." },
  { dir: "Behaviours \u2192 tools", text: "Build means you actually pick the tools up. Multi-tool means you learn enough of them to ship without depending on a chain of other people." },
  { dir: "Knowledge \u2192 tools", text: "Knowing positioning makes your AI writer useful, not just fast. Knowing measurement makes your dashboard an argument, not decoration." },
  { dir: "Tools \u2192 knowledge", text: "AI accelerates research. You can test a framework against real data in an afternoon instead of a quarter. Tools turn theory into evidence." },
  { dir: "Tools \u2192 behaviours", text: "Making real things develops the Build habit. Using AI as a tutor, not a generator, develops Do the Reps. The tool shapes the person using it." },
  { dir: "Knowledge \u2192 behaviours", text: "Understanding why NPS is flawed builds skepticism. Knowing Sharp makes you question the next framework someone presents as gospel." },
];

function NodeItem({ node }: { node: NodeItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid #E0E0DC" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          width: "100%",
          padding: "16px 28px",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
          fontSize: "0.875rem",
          fontWeight: 400,
          color: "#1D1B1B",
          textAlign: "left",
          transition: "background 0.3s ease-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F0")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        <span style={{ color: "#F47521", fontSize: "0.8125rem", fontWeight: 400, flexShrink: 0 }}>/</span>
        <span style={{ flex: 1 }}>{node.name}</span>
        <span
          style={{
            color: open ? "#F47521" : "#8A8A85",
            fontSize: 12,
            flexShrink: 0,
            transition: "transform 0.3s ease-out, color 0.3s ease-out",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          &rsaquo;
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 600 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease-out",
        }}
      >
        <div style={{ padding: "0 28px 20px 52px" }}>
          <p style={{ fontSize: "0.8125rem", color: "#8A8A85", lineHeight: 1.6, marginBottom: 12 }}>{node.desc}</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {node.links.map((link, i) => (
              <li key={i} style={{ padding: "4px 0" }}>
                {link.href ? (
                  <a
                    href={link.href}
                    style={{
                      color: "#F47521",
                      textDecoration: "none",
                      fontSize: "0.75rem",
                      fontWeight: 400,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.625rem",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: "#8A8A85",
                        background: "#F5F5F0",
                        padding: "2px 6px",
                      }}
                    >
                      {link.tag}
                    </span>
                    {link.label}
                  </a>
                ) : (
                  <span style={{ fontSize: "0.75rem", color: "#8A8A85", display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span
                      style={{
                        fontSize: "0.625rem",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: "#8A8A85",
                        background: "#F5F5F0",
                        padding: "2px 6px",
                      }}
                    >
                      {link.tag}
                    </span>
                    {link.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function BranchPanel({ branch, isOpen, onToggle }: { branch: Branch; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        border: `1px solid ${isOpen ? "#F47521" : "#E0E0DC"}`,
        transition: "border-color 0.3s ease-out",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "24px 28px 20px",
          borderBottom: isOpen ? "1px solid #E0E0DC" : "none",
          background: "none",
          border: "none",
          borderBottomStyle: "solid",
          borderBottomWidth: isOpen ? 1 : 0,
          borderBottomColor: "#E0E0DC",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
          transition: "background 0.3s ease-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F0")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
      >
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 300,
              letterSpacing: "-0.3px",
              color: "#1D1B1B",
            }}
          >
            {branch.title}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#8A8A85", marginTop: 4 }}>{branch.subtitle}</div>
        </div>
        <span
          style={{
            fontSize: 18,
            color: isOpen ? "#F47521" : "#8A8A85",
            transition: "transform 0.3s ease-out, color 0.3s ease-out",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            display: "inline-block",
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? 3000 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease-out",
        }}
      >
        {branch.nodes.map((node, i) => (
          <NodeItem key={i} node={node} />
        ))}
        {branch.note && (
          <div
            style={{
              padding: "16px 28px",
              fontSize: "0.75rem",
              color: "#8A8A85",
              fontStyle: "italic",
              borderTop: "1px solid #E0E0DC",
            }}
          >
            {branch.note}
          </div>
        )}
      </div>
    </div>
  );
}

function TriangleWithLoop({ activeBranch, onNodeClick }: { activeBranch: string | null; onNodeClick: (id: string) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 64 }}>
      <div style={{ position: "relative", width: 360, height: 210 }}>
        <svg viewBox="0 0 360 210" style={{ width: "100%", height: "100%" }}>
          {/* Triangle path for the orbiting dot */}
          <path
            id="triPath"
            d="M 180 30 L 310 180 L 50 180 Z"
            fill="none"
            stroke="#E0E0DC"
            strokeWidth="1"
          />
          {/* Bidirectional chevrons */}
          <polygon points="115,103 119,97 123,103" fill="#E0E0DC" />
          <polygon points="111,111 115,117 119,111" fill="#E0E0DC" />
          <polygon points="237,103 241,97 245,103" fill="#E0E0DC" />
          <polygon points="239,111 243,117 247,111" fill="#E0E0DC" />
          <polygon points="160,177 160,183 166,180" fill="#E0E0DC" />
          <polygon points="200,177 200,183 194,180" fill="#E0E0DC" />
          {/* Orbiting dot */}
          <circle r="3" fill="#F47521" opacity="0.6">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M 180 30 L 310 180 L 50 180 Z"
            />
          </circle>
          {/* Second dot, offset */}
          <circle r="2.5" fill="#F47521" opacity="0.35">
            <animateMotion
              dur="8s"
              repeatCount="indefinite"
              path="M 180 30 L 310 180 L 50 180 Z"
              begin="-4s"
            />
          </circle>
        </svg>
        {/* Clickable labels */}
        <button
          onClick={() => onNodeClick("behaviours")}
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: activeBranch === "behaviours" ? "#F47521" : "#8A8A85",
            padding: "8px 16px",
            transition: "color 0.3s ease-out",
          }}
        >
          Behaviours
        </button>
        <button
          onClick={() => onNodeClick("knowledge")}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: activeBranch === "knowledge" ? "#F47521" : "#8A8A85",
            padding: "8px 16px",
            transition: "color 0.3s ease-out",
          }}
        >
          Knowledge
        </button>
        <button
          onClick={() => onNodeClick("tools")}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 400,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: activeBranch === "tools" ? "#F47521" : "#8A8A85",
            padding: "8px 16px",
            transition: "color 0.3s ease-out",
          }}
        >
          Tools
        </button>
      </div>
    </div>
  );
}

export default function StudentsContent() {
  const [openBranches, setOpenBranches] = useState<Set<string>>(new Set(["behaviours"]));
  const branchRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggleBranch = (id: string) => {
    setOpenBranches((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleTriNodeClick = (id: string) => {
    setOpenBranches(new Set([id]));
    setTimeout(() => {
      branchRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const activeBranch = openBranches.size === 1 ? Array.from(openBranches)[0] : null;

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
      {/* Hero */}
      <section
        style={{
          padding: "140px 0 80px",
          position: "relative",
        }}
      >
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
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 48,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: 2,
                  textTransform: "uppercase" as const,
                  color: "#F47521",
                  marginBottom: 16,
                }}
              >
                UCD Smurfit / Digital marketing 2026
              </div>
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "clamp(36px, 6vw, 72px)",
                  fontWeight: 300,
                  letterSpacing: -2,
                  lineHeight: 1.05,
                  margin: 0,
                }}
              >
                Behaviours, knowledge, tools
              </h1>
              <p style={{ fontSize: "0.875rem", color: "#8A8A85", marginTop: 20, maxWidth: 520 }}>
                Three things. Everything else flows from them. They are not three separate topics. They are one system where each feeds the others. Click any branch to explore.
              </p>
            </div>
            <Image
              src="/fox/fox-book.png"
              alt=""
              width={220}
              height={220}
              style={{
                width: 220,
                height: "auto",
                filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.15))",
                pointerEvents: "none",
                userSelect: "none",
                flexShrink: 0,
              }}
              priority
            />
          </div>
        </div>
      </section>

      {/* Mind map */}
      <section style={{ padding: "40px 0 120px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <TriangleWithLoop activeBranch={activeBranch} onNodeClick={handleTriNodeClick} />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 32,
              alignItems: "start",
            }}
          >
            {branches.map((branch) => (
              <div key={branch.id} ref={(el) => { branchRefs.current[branch.id] = el; }}>
                <BranchPanel
                  branch={branch}
                  isOpen={openBranches.has(branch.id)}
                  onToggle={() => toggleBranch(branch.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loops */}
      <section
        style={{
          padding: "80px 0",
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
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px", position: "relative" }}>
          <div style={{ marginBottom: 40 }}>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 300,
                letterSpacing: -1,
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              How they feed each other
            </h2>
            <p style={{ fontSize: "0.875rem", color: "rgba(247, 234, 217, 0.7)", maxWidth: 560, marginTop: 12 }}>
              Develop any one pillar and it pulls the other two forward. Neglect any one and the other two weaken. These are not modules to complete in order. They are loops.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {loops.map((loop, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid rgba(244, 117, 33, 0.2)",
                  padding: 24,
                }}
              >
                <div
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 400,
                    letterSpacing: 2,
                    textTransform: "uppercase" as const,
                    color: "#F47521",
                    marginBottom: 10,
                  }}
                >
                  {loop.dir}
                </div>
                <p style={{ fontSize: "0.8125rem", fontWeight: 300, color: "#F7EAD9", lineHeight: 1.6, margin: 0 }}>
                  {loop.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          section > div > div[style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
