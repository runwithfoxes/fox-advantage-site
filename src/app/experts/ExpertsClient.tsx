"use client";

import { useState, useRef, useCallback, useId } from "react";
import Link from "next/link";

interface Persona {
  id: string;
  name: string;
  short: string;
  colour: string;
  group: "marketing" | "strategy";
}

const PERSONAS: Persona[] = [
  {
    id: "commercial-manager",
    name: "The Commercial Manager",
    short: "Revenue, margin, implementation. Impatient with theory.",
    colour: "#3A7CA5",
    group: "marketing",
  },
  {
    id: "growth-leader",
    name: "The Growth Marketing Leader",
    short: "Measurement, incrementality, channel economics. Dashboards lie.",
    colour: "#2E8BC0",
    group: "marketing",
  },
  {
    id: "cmo",
    name: "The CMO",
    short: "Brand health, distinctive assets, fame. Binet & Field, Ehrenberg-Bass.",
    colour: "#1A3A4E",
    group: "marketing",
  },
  {
    id: "professor",
    name: "The Marketing Professor",
    short: "Evidence, rigour, theory informing practice. Fox, not hedgehog.",
    colour: "#6B5CE7",
    group: "marketing",
  },
  {
    id: "rumelt",
    name: "The Strategy Purist",
    short: "Diagnosis, guiding policy, coherent actions. No dog's dinners.",
    colour: "#E74C3C",
    group: "strategy",
  },
  {
    id: "byron-sharp",
    name: "The Effectiveness Expert",
    short: "Penetration, mental availability, distinctive assets. Where's the evidence?",
    colour: "#FFB900",
    group: "strategy",
  },
  {
    id: "consulting-partner",
    name: "The Consulting Partner",
    short: "Choice cascade, where to play, how to win. Be more specific.",
    colour: "#00A676",
    group: "strategy",
  },
  {
    id: "jtbd",
    name: "The Customer Investigator",
    short: "Real customer circumstances, timeline reconstruction, the four forces.",
    colour: "#FF6B3D",
    group: "strategy",
  },
];

export default function ExpertsPage() {
  const renderMarkdown = useCallback((text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^### (.+)$/gm, '<div style="font-family:var(--sans,\'Space Grotesk\',sans-serif);font-size:15px;font-weight:500;margin:20px 0 8px;">$1</div>')
      .replace(/^## (.+)$/gm, '<div style="font-family:var(--sans,\'Space Grotesk\',sans-serif);font-size:16px;font-weight:500;margin:24px 0 10px;">$1</div>')
      .replace(/^- (.+)$/gm, '<div style="padding-left:16px;margin:4px 0;">&#9670; <span style="margin-left:6px;">$1</span></div>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  }, []);

  const [plan, setPlan] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [critique, setCritique] = useState("");
  const [loading, setLoading] = useState(false);
  const [personaName, setPersonaName] = useState("");
  const responseRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputId = useId();

  const handleFile = useCallback(async (file: File) => {
    const name = file.name.toLowerCase();

    // Text-based files
    if (name.endsWith(".txt") || name.endsWith(".md") || name.endsWith(".csv")) {
      const text = await file.text();
      setPlan(text.slice(0, 10000));
      setFileName(file.name);
      return;
    }

    // Word documents (.docx) - extract text from XML
    if (name.endsWith(".docx")) {
      try {
        const JSZip = (await import("jszip")).default;
        const zip = await JSZip.loadAsync(file);
        const docXml = await zip.file("word/document.xml")?.async("string");
        if (docXml) {
          // Strip XML tags to get plain text
          const text = docXml
            .replace(/<w:p[^>]*>/g, "\n")
            .replace(/<[^>]+>/g, "")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'")
            .replace(/\n{3,}/g, "\n\n")
            .trim();
          setPlan(text.slice(0, 10000));
          setFileName(file.name);
        } else {
          alert("Could not read this .docx file.");
        }
      } catch {
        alert("Could not read this .docx file. Try pasting the text instead.");
      }
      return;
    }

    // PDF - extract text client-side
    if (name.endsWith(".pdf")) {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        let fullText = "";
        for (let i = 1; i <= Math.min(pdf.numPages, 30); i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const pageText = content.items
            .map((item: any) => item.str || "")
            .join(" ");
          fullText += pageText + "\n\n";
        }
        setPlan(fullText.trim().slice(0, 10000));
        setFileName(file.name);
      } catch {
        alert("Could not read this PDF. Try pasting the text instead.");
      }
      return;
    }

    alert("Supported formats: .txt, .md, .csv, .docx, .pdf. Or just paste your text directly.");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleSubmit = useCallback(
    async (personaId: string) => {
      if (!plan.trim() || loading) return;

      const persona = PERSONAS.find((p) => p.id === personaId);
      if (!persona) return;

      setSelectedPersona(personaId);
      setPersonaName(persona.name);
      setCritique("");
      setLoading(true);

      // Scroll to response area
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      try {
        const res = await fetch("/api/experts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: plan.trim(), personaId }),
        });

        if (!res.ok) {
          const errText = await res.text();
          setCritique(`Error: ${errText}`);
          setLoading(false);
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          setCritique("Error: No response stream");
          setLoading(false);
          return;
        }

        const decoder = new TextDecoder();
        let fullText = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullText += chunk;
          setCritique(fullText);
        }
      } catch (err) {
        setCritique(`Error: ${err instanceof Error ? err.message : "Something went wrong"}`);
      } finally {
        setLoading(false);
      }
    },
    [plan, loading]
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg, #FAFAF8)",
        position: "relative",
      }}
    >
      {/* NAV — same as homepage, always in scrolled state */}
      <nav className="hp-nav hp-nav-scrolled" style={{ position: "fixed" }}>
        <Link href="/" className="hp-nav-logo">/<span>Run</span>withfoxes</Link>
        <div className="hp-nav-links">
          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">#unfair_advantage &#9662;</span>
            <div className="hp-mega">
              <div className="hp-mega-inner">
                <div className="hp-mega-col">
                  <div className="hp-mega-label">HUMAN LEADS</div>
                  <Link href="/#mod-strategy">Strategy</Link>
                  <Link href="/#mod-positioning">Positioning</Link>
                </div>
                <div className="hp-mega-col">
                  <div className="hp-mega-label">AI + HUMAN</div>
                  <Link href="/#mod-messaging">Messaging</Link>
                  <Link href="/#mod-research">Research</Link>
                  <Link href="/#mod-advertising">Advertising</Link>
                  <Link href="/#mod-effectiveness">Effectiveness</Link>
                  <Link href="/#mod-brand-guardian">Brand guardian</Link>
                  <Link href="/#mod-events">Events</Link>
                </div>
                <div className="hp-mega-col">
                  <div className="hp-mega-label">AI DOES IT</div>
                  <Link href="/#mod-ad-engine">Ad engine</Link>
                  <Link href="/#mod-growth">Growth team</Link>
                  <Link href="/#mod-pm">Project manager</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">/projects &#9662;</span>
            <div className="hp-mega">
              <div className="hp-projects-dropdown">
                <div className="hp-pd-label">CASE STUDIES</div>
                <Link href="/millionaire-raffle">Millionaire Raffle</Link>
                <Link href="/marketer-of-the-year">Marketer of the Year</Link>
                <Link href="/48">48</Link>
                <Link href="/run-with-foxes">Run with Foxes (book 1)</Link>
                <div className="hp-pd-label">AI TOOLS</div>
                <Link href="/experts">Expert Panel</Link>
                <Link href="/brief-diagnostician">Brief Diagnostician</Link>
                <Link href="/coach">Effectiveness Coach</Link>
                <Link href="/ai-writer">AI Writer</Link>
                <Link href="/brand">Brand System</Link>
                <Link href="/chief">Chief of Staff</Link>
              </div>
            </div>
          </div>
          <Link href="/book">/book</Link>
          <Link href="/contact" className="hp-nav-cta">/contact</Link>
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 32px 80px" }}>
        {/* Header */}
        <h1
          style={{
            fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 300,
            letterSpacing: -0.5,
            marginBottom: 16,
            color: "var(--text, #1D1B1B)",
          }}
        >
          Put your plan through the{" "}
          <span style={{ color: "var(--orange, #3A7CA5)" }}>panel</span>
        </h1>
        <p
          style={{
            fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
            fontSize: 13,
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--text-muted, #8A8A85)",
            maxWidth: 600,
            marginBottom: 48,
          }}
        >
          Paste your marketing plan, strategy document, or campaign brief below,
          or drop a file. Then pick an expert. They will read it and tell you
          what they think, in character, with no punches pulled.
        </p>

        {/* Text area */}
        <div style={{ marginBottom: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <label
              style={{
                fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                fontSize: 11,
                letterSpacing: 2,
                textTransform: "uppercase" as const,
                color: "var(--text-muted, #8A8A85)",
              }}
            >
              Your plan
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {fileName && (
                <span
                  style={{
                    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                    fontSize: 11,
                    color: "var(--orange, #3A7CA5)",
                  }}
                >
                  {fileName}
                </span>
              )}
              <input
                ref={fileInputRef}
                id={fileInputId}
                type="file"
                accept=".txt,.md,.csv,.docx,.pdf"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                  fontSize: 11,
                  fontWeight: 300,
                  padding: "5px 12px",
                  background: "transparent",
                  border: "1px solid var(--border, #E0E0DC)",
                  borderRadius: 4,
                  color: "var(--text-muted, #8A8A85)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Attach file
              </button>
            </div>
          </div>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{ position: "relative" }}
          >
            <textarea
              value={plan}
              onChange={(e) => {
                setPlan(e.target.value);
                if (fileName) setFileName(null);
              }}
              placeholder="Paste your plan here, or drag and drop a file (.txt, .md, .docx, .pdf)..."
              style={{
                width: "100%",
                minHeight: 200,
                padding: 20,
                fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                fontSize: 13,
                fontWeight: 300,
                lineHeight: 1.8,
                color: "var(--text, #1D1B1B)",
                background: "#fff",
                border: "1px solid var(--border, #E0E0DC)",
                borderRadius: 8,
                resize: "vertical",
                outline: "none",
              }}
              maxLength={10000}
            />
          </div>
          <div
            style={{
              fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              color: "var(--text-muted, #8A8A85)",
              marginTop: 6,
              textAlign: "right",
            }}
          >
            {plan.length.toLocaleString()} / 10,000
          </div>
        </div>

        {/* Marketing Personas */}
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              color: "var(--text-muted, #8A8A85)",
              marginBottom: 16,
            }}
          >
            Marketing Experts
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {PERSONAS.filter((p) => p.group === "marketing").map((persona) => (
              <button
                key={persona.id}
                onClick={() => handleSubmit(persona.id)}
                disabled={!plan.trim() || loading}
                style={{
                  padding: "16px 16px 14px",
                  background:
                    selectedPersona === persona.id
                      ? persona.colour
                      : "#fff",
                  color:
                    selectedPersona === persona.id
                      ? "#fff"
                      : "var(--text, #1D1B1B)",
                  border: `1px solid ${
                    selectedPersona === persona.id
                      ? persona.colour
                      : "var(--border, #E0E0DC)"
                  }`,
                  borderRadius: 8,
                  cursor: plan.trim() && !loading ? "pointer" : "default",
                  textAlign: "left" as const,
                  transition: "all 0.2s ease",
                  opacity: !plan.trim() || loading ? 0.5 : 1,
                  borderTop: `3px solid ${persona.colour}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  {persona.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                    fontSize: 11,
                    fontWeight: 300,
                    lineHeight: 1.6,
                    opacity: selectedPersona === persona.id ? 0.85 : 0.6,
                  }}
                >
                  {persona.short}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Strategy Personas */}
        <div style={{ marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              color: "var(--text-muted, #8A8A85)",
              marginBottom: 16,
            }}
          >
            Strategy Experts
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 12,
            }}
          >
            {PERSONAS.filter((p) => p.group === "strategy").map((persona) => (
              <button
                key={persona.id}
                onClick={() => handleSubmit(persona.id)}
                disabled={!plan.trim() || loading}
                style={{
                  padding: "16px 16px 14px",
                  background:
                    selectedPersona === persona.id
                      ? persona.colour
                      : "#fff",
                  color:
                    selectedPersona === persona.id
                      ? "#fff"
                      : "var(--text, #1D1B1B)",
                  border: `1px solid ${
                    selectedPersona === persona.id
                      ? persona.colour
                      : "var(--border, #E0E0DC)"
                  }`,
                  borderRadius: 8,
                  cursor: plan.trim() && !loading ? "pointer" : "default",
                  textAlign: "left" as const,
                  transition: "all 0.2s ease",
                  opacity: !plan.trim() || loading ? 0.5 : 1,
                  borderTop: `3px solid ${persona.colour}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
                    fontSize: 14,
                    fontWeight: 500,
                    marginBottom: 6,
                  }}
                >
                  {persona.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                    fontSize: 11,
                    fontWeight: 300,
                    lineHeight: 1.6,
                    opacity: selectedPersona === persona.id ? 0.85 : 0.6,
                  }}
                >
                  {persona.short}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Response area */}
        <div ref={responseRef}>
          {(critique || loading) && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border, #E0E0DC)",
                borderRadius: 8,
                padding: 32,
                marginBottom: 48,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase" as const,
                  color: "var(--text-muted, #8A8A85)",
                  marginBottom: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {loading && (
                  <span
                    style={{
                      display: "inline-block",
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--orange, #3A7CA5)",
                      animation: "pulse 1.2s ease-in-out infinite",
                    }}
                  />
                )}
                {personaName}
              </div>
              <div
                style={{
                  fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                  fontSize: 13,
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: "var(--text, #1D1B1B)",
                }}
                dangerouslySetInnerHTML={{
                  __html: critique ? renderMarkdown(critique) : "Reading your plan...",
                }}
              />

              {/* Try another expert */}
              {!loading && critique && (
                <div
                  style={{
                    marginTop: 24,
                    paddingTop: 16,
                    borderTop: "1px solid var(--border, #E0E0DC)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                      fontSize: 11,
                      color: "var(--text-muted, #8A8A85)",
                    }}
                  >
                    Try another expert on the same plan:
                  </span>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 8,
                      marginTop: 10,
                    }}
                  >
                    {PERSONAS.filter((p) => p.id !== selectedPersona).map(
                      (persona) => (
                        <button
                          key={persona.id}
                          onClick={() => handleSubmit(persona.id)}
                          style={{
                            padding: "6px 12px",
                            fontFamily:
                              "var(--mono, 'JetBrains Mono', monospace)",
                            fontSize: 11,
                            fontWeight: 300,
                            background: "transparent",
                            border: `1px solid ${persona.colour}`,
                            borderRadius: 4,
                            color: persona.colour,
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                        >
                          {persona.name}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>

      {/* BOTTOM BAR */}
      <div className="hp-bottom-bar hp-bb-visible">
        <Link href="/">#top</Link>
        <Link href="/#about">#about</Link>
        <Link href="/book">/book</Link>
        <Link href="/contact" className="hp-cta-bar">get in touch</Link>
      </div>
    </div>
  );
}
