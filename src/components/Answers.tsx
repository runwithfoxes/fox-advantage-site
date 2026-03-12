"use client";

import { useState } from "react";
import Link from "next/link";
import { clusters } from "@/content/answers-data";

function capitalise(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export default function AnswersPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [activeCluster, setActiveCluster] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredClusters = activeCluster
    ? clusters.filter((c) => c.slug === activeCluster)
    : clusters;

  const totalQs = clusters.reduce((sum, c) => sum + c.qas.length, 0);

  return (
    <>
      {/* TOP BAR */}
      <header className="top-bar">
        <Link href="/" className="logo">
          /<span>Run</span>withfoxes
        </Link>
        <nav>
          <Link href="/#about">#about</Link>
          <Link href="/#chapters">chapters.md</Link>
          <Link href="/answers" className="active">/answers</Link>
          <Link href="/#signup" className="cta-bar">
            /get_the_book
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="answers-hero">
        <div className="container">
          <div className="section-label">// paul dervan</div>
          <h1 className="answers-title">
            Questions marketers <span className="accent">ask</span>
          </h1>
          <p className="answers-sub">
            On AI, brand building, creativity, and strategy. Answered by
            Paul Dervan, author of{" "}
            <em>The Fox Advantage</em> and <em>Run with Foxes</em>.
          </p>
        </div>
      </section>

      {/* CLUSTER FILTER */}
      <section className="answers-filters">
        <div className="container">
          <div className="answers-filter-row">
            <button
              className={`answers-filter-btn ${!activeCluster ? "active" : ""}`}
              onClick={() => setActiveCluster(null)}
            >
              all ({totalQs})
            </button>
            {clusters.map((c) => (
              <button
                key={c.slug}
                className={`answers-filter-btn ${activeCluster === c.slug ? "active" : ""}`}
                onClick={() =>
                  setActiveCluster(activeCluster === c.slug ? null : c.slug)
                }
              >
                {c.name.replace(/^Cluster \d+:\s*/, "").toLowerCase()} ({c.qas.length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Q&A SECTIONS */}
      <section className="answers-content">
        <div className="container">
          {filteredClusters.map((cluster) => (
            <div key={cluster.slug} className="answers-cluster">
              <div className="answers-cluster-label">
                {cluster.name.replace(/^Cluster \d+:\s*/, "")}
              </div>

              {cluster.qas.map((qa, qi) => {
                const key = `${cluster.slug}-${qi}`;
                const isOpen = openItems[key];

                return (
                  <div
                    key={key}
                    className={`answers-item ${isOpen ? "open" : ""}`}
                  >
                    <button
                      className="answers-question"
                      onClick={() => toggle(key)}
                    >
                      <span className="answers-q-text">{capitalise(qa.q)}</span>
                      <span className="answers-q-icon">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="answers-answer">
                        {qa.paragraphs.map((p, pi) => (
                          <p key={pi}>{p}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM BAR */}
      <div className="footer-spacer" />
      <div className="bottom-bar">
        <Link href="/">#home</Link>
        <Link href="/#chapters">chapters.md</Link>
        <Link href="/answers" className="active">/answers</Link>
        <Link href="/#signup" className="cta-bar">
          get the book
        </Link>
      </div>

      {/* FAQ SCHEMA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: clusters.flatMap((c) =>
              c.qas.map((qa) => ({
                "@type": "Question",
                name: qa.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: qa.paragraphs.join(" "),
                },
              }))
            ),
          }),
        }}
      />
    </>
  );
}
