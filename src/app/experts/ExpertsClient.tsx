"use client";

import { useState, useRef, useCallback } from "react";

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
    colour: "#F47521",
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
    colour: "#355E4C",
    group: "marketing",
  },
  {
    id: "professor",
    name: "The Smurfit UCD Professor",
    short: "Evidence, rigour, theory informing practice. Fox, not hedgehog.",
    colour: "#6B5CE7",
    group: "marketing",
  },
  {
    id: "rumelt",
    name: "The Rumelt Purist",
    short: "Diagnosis, guiding policy, coherent actions. No dog's dinners.",
    colour: "#E74C3C",
    group: "strategy",
  },
  {
    id: "byron-sharp",
    name: "The Byron Sharp Skeptic",
    short: "Penetration, mental availability, distinctive assets. Where's the evidence?",
    colour: "#FFB900",
    group: "strategy",
  },
  {
    id: "consulting-partner",
    name: "The Strategy Consulting Partner",
    short: "Choice cascade, where to play, how to win. Be more specific.",
    colour: "#00A676",
    group: "strategy",
  },
  {
    id: "jtbd",
    name: "The JTBD Investigator",
    short: "Real customer circumstances, timeline reconstruction, the four forces.",
    colour: "#FF6B3D",
    group: "strategy",
  },
];

export default function ExpertsPage() {
  const [plan, setPlan] = useState("");
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [critique, setCritique] = useState("");
  const [loading, setLoading] = useState(false);
  const [personaName, setPersonaName] = useState("");
  const responseRef = useRef<HTMLDivElement>(null);

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
      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(250, 250, 248, 0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border, #E0E0DC)",
          padding: "12px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
            fontSize: 13,
            fontWeight: 300,
            letterSpacing: 2,
            color: "var(--text-muted, #8A8A85)",
            textDecoration: "none",
          }}
        >
          /<span style={{ color: "var(--orange, #F47521)" }}>Run</span>withfoxes
        </a>
        <span
          style={{
            fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase" as const,
            color: "var(--text-muted, #8A8A85)",
          }}
        >
          Expert Critique
        </span>
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
          <span style={{ color: "var(--orange, #F47521)" }}>panel</span>
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
          Paste your marketing plan, strategy document, or campaign brief below.
          Then pick an expert. They will read it and tell you what they think,
          in character, with no punches pulled.
        </p>

        {/* Text area */}
        <div style={{ marginBottom: 48 }}>
          <label
            style={{
              fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              letterSpacing: 2,
              textTransform: "uppercase" as const,
              color: "var(--text-muted, #8A8A85)",
              display: "block",
              marginBottom: 8,
            }}
          >
            Your plan
          </label>
          <textarea
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            placeholder="Paste your plan, strategy, brief, or campaign idea here..."
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
                      background: "var(--orange, #F47521)",
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
                  whiteSpace: "pre-wrap",
                }}
              >
                {critique || "Reading your plan..."}
              </div>

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

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid var(--border, #E0E0DC)",
            paddingTop: 32,
            textAlign: "center" as const,
          }}
        >
          <div
            style={{
              fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
              fontSize: 13,
              fontWeight: 300,
              letterSpacing: 2,
              color: "var(--text-muted, #8A8A85)",
              marginBottom: 8,
            }}
          >
            /<span style={{ color: "var(--orange, #F47521)" }}>Run</span>
            withfoxes
          </div>
          <div
            style={{
              fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              color: "var(--text-muted, #8A8A85)",
            }}
          >
            Expert personas by Paul Dervan. Powered by Claude.
          </div>
        </div>
      </div>

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
