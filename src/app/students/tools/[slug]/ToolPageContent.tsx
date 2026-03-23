"use client";

import Image from "next/image";
import Link from "next/link";
import type { ToolBucket } from "../../toolData";

export default function ToolPageContent({ bucket }: { bucket: ToolBucket }) {
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
      <section
        style={{
          padding: "140px 0 60px",
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
            Tools / Bucket {bucket.number}
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
            {bucket.title}
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "#8A8A85", marginTop: 16, maxWidth: 600 }}>
            {bucket.intro}
          </p>
        </div>
      </section>

      {/* Tools & platforms */}
      <section style={{ padding: "40px 0 60px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 24,
              fontWeight: 300,
              letterSpacing: "-0.5px",
              margin: "0 0 24px 0",
            }}
          >
            Tools and platforms
          </h2>
          <div style={{ display: "grid", gap: 16 }}>
            {bucket.tools.map((tool, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #E0E0DC",
                  padding: "20px 24px",
                  transition: "background 0.3s ease-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F0")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                  <span style={{ color: "#F47521", fontSize: "0.8125rem", fontWeight: 400 }}>/</span>
                  <span style={{ fontSize: "0.9375rem", fontWeight: 400 }}>{tool.name}</span>
                </div>
                <p style={{ fontSize: "0.8125rem", color: "#8A8A85", lineHeight: 1.6, margin: 0, paddingLeft: 22 }}>
                  {tool.desc}
                </p>
                {tool.url && (
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: 8,
                      paddingLeft: 22,
                      fontSize: "0.75rem",
                      color: "#F47521",
                      textDecoration: "none",
                    }}
                  >
                    {tool.url.replace(/^https?:\/\/(www\.)?/, "").split("/")[0]} &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI vs Marketer */}
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
              fontSize: 24,
              fontWeight: 300,
              letterSpacing: "-0.5px",
              margin: "0 0 32px 0",
            }}
          >
            What AI does vs what you do
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#F47521",
                  marginBottom: 16,
                }}
              >
                AI handles
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {bucket.aiDoes.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "0.8125rem",
                      color: "#F7EAD9",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(244, 117, 33, 0.15)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 400,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "#F47521",
                  marginBottom: 16,
                }}
              >
                You decide
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {bucket.marketerDoes.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: "0.8125rem",
                      color: "#F7EAD9",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(244, 117, 33, 0.15)",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 24,
              fontWeight: 300,
              letterSpacing: "-0.5px",
              margin: "0 0 24px 0",
            }}
          >
            Skills to develop
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {bucket.skills.map((skill, i) => (
              <div
                key={i}
                style={{
                  fontSize: "0.8125rem",
                  color: "#1D1B1B",
                  padding: "10px 0",
                  borderBottom: "1px solid #E0E0DC",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                }}
              >
                <span style={{ color: "#F47521", fontSize: "0.75rem", flexShrink: 0 }}>/</span>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key point */}
      {bucket.keyPoint && (
        <section style={{ padding: "40px 0 60px" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
            <div
              style={{
                borderLeft: "3px solid #F47521",
                paddingLeft: 24,
              }}
            >
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
                {bucket.keyPoint}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Nav */}
      <section style={{ padding: "40px 0 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            {bucket.prev && (
              <Link
                href={`/students/tools/${bucket.prev.slug}`}
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
                &larr; {bucket.prev.title}
              </Link>
            )}
            <div style={{ flex: 1 }} />
            {bucket.next && (
              <Link
                href={`/students/tools/${bucket.next.slug}`}
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
                {bucket.next.title} &rarr;
              </Link>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 768px) {
          section > div {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
