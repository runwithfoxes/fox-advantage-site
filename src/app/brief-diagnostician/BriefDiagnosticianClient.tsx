"use client";

import { useState, useRef, useCallback, useId } from "react";

const EXAMPLE_BRIEF = `Client: Mid-sized DTC skincare brand, £12m revenue, looking to grow to £20m next year.

Background: Category is saturated. Loyalty is low. Our product has clinical backing but that hasn't translated to share. Competitors are winning on influencer-led awareness.

Target audience: Women aged 28–45, urban, income £40k+, care about ingredients and sustainability. They research before they buy.

Objective: Build brand awareness, grow our social following, drive Q4 conversions, and increase AOV by 15%.

Insight: Our customer wants to feel confident in her skincare choices. She is overwhelmed by options.

Proposition: The clinically-proven skincare for women who think before they buy.

Creative direction: A series of influencer partnerships plus a hero TV spot for Q4. Tone: warm, empowering, aspirational.

KPIs: Awareness lift, follower growth, conversion rate, AOV, ROAS on paid social.

Media: Paid social (60%), influencer (25%), TV (15%).`;

export default function BriefDiagnosticianClient() {
  const renderMarkdown = useCallback((text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(
        /^## (.+)$/gm,
        '<div style="font-family:var(--sans,\'Space Grotesk\',sans-serif);font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;margin:28px 0 10px;color:var(--orange,#3A7CA5);">$1</div>'
      )
      .replace(
        /^### (.+)$/gm,
        '<div style="font-family:var(--sans,\'Space Grotesk\',sans-serif);font-size:15px;font-weight:500;margin:20px 0 8px;">$1</div>'
      )
      .replace(
        /^- (.+)$/gm,
        '<div style="padding-left:18px;margin:6px 0;position:relative;"><span style="position:absolute;left:0;color:var(--orange,#3A7CA5);">&mdash;</span>$1</div>'
      )
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/\n/g, "<br/>");
  }, []);

  const [brief, setBrief] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [loading, setLoading] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputId = useId();

  const handleFile = useCallback(async (file: File) => {
    const name = file.name.toLowerCase();

    if (name.endsWith(".txt") || name.endsWith(".md") || name.endsWith(".csv")) {
      const text = await file.text();
      setBrief(text.slice(0, 10000));
      setFileName(file.name);
      return;
    }

    if (name.endsWith(".docx")) {
      try {
        const JSZip = (await import("jszip")).default;
        const zip = await JSZip.loadAsync(file);
        const docXml = await zip.file("word/document.xml")?.async("string");
        if (docXml) {
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
          setBrief(text.slice(0, 10000));
          setFileName(file.name);
        } else {
          alert("Could not read this .docx file.");
        }
      } catch {
        alert("Could not read this .docx file. Try pasting the text instead.");
      }
      return;
    }

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
          const pageText = content.items.map((item: any) => item.str || "").join(" ");
          fullText += pageText + "\n\n";
        }
        setBrief(fullText.trim().slice(0, 10000));
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

  const handleDiagnose = useCallback(async () => {
    if (!brief.trim() || loading) return;

    setDiagnosis("");
    setLoading(true);

    setTimeout(() => {
      responseRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    try {
      const res = await fetch("/api/brief-diagnostician", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: brief.trim() }),
      });

      if (!res.ok) {
        const errText = await res.text();
        setDiagnosis(`Error: ${errText}`);
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setDiagnosis("Error: No response stream");
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
        setDiagnosis(fullText);
      }
    } catch (err) {
      setDiagnosis(`Error: ${err instanceof Error ? err.message : "Something went wrong"}`);
    } finally {
      setLoading(false);
    }
  }, [brief, loading]);

  const loadExample = useCallback(() => {
    setBrief(EXAMPLE_BRIEF);
    setFileName(null);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg, #FAFAF8)",
        position: "relative",
      }}
    >
      {/* Nav */}
      <header className="top-bar">
        <a href="/" className="logo">
          /<span>Run</span>withfoxes
        </a>
        <nav>
          <a href="/#projects">/projects</a>
          <a href="/contact">/contact</a>
          <a href="/#signup" className="cta-bar">
            /get_the_book
          </a>
        </nav>
      </header>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 32px 80px" }}>
        {/* Hero */}
        <div
          style={{
            fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--text-muted, #8A8A85)",
            marginBottom: 20,
          }}
        >
          /brief_diagnostician
        </div>
        <h1
          style={{
            fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
            fontSize: "clamp(30px, 4.5vw, 44px)",
            fontWeight: 300,
            letterSpacing: -0.5,
            lineHeight: 1.15,
            marginBottom: 24,
            color: "var(--text, #1D1B1B)",
          }}
        >
          Most bad ads don&apos;t start with bad ideas. They start with{" "}
          <span style={{ color: "var(--orange, #3A7CA5)" }}>briefs that don&apos;t know</span> how
          they want the communication to work.
        </h1>
        <p
          style={{
            fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
            fontSize: 14,
            fontWeight: 300,
            lineHeight: 1.8,
            color: "var(--text-muted, #8A8A85)",
            maxWidth: 680,
            marginBottom: 48,
          }}
        >
          Is it salience or persuasion? Fame or direct response? Brand-building or activation? Most
          briefs can&apos;t say. Most teams don&apos;t ask. So every reviewer judges the ad through a
          different lens. By round three the idea&apos;s dead, or unrecognisable.
          <br />
          <br />
          Paste your brief. It reads it, spots which of seven influence models it&apos;s leaning on,
          flags the contradictions, and tells you the one choice you&apos;ve been avoiding. Use it
          before you write the ad, not after it fails.
        </p>

        {/* Textarea */}
        <div style={{ marginBottom: 24 }}>
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
                textTransform: "uppercase",
                color: "var(--text-muted, #8A8A85)",
              }}
            >
              Your brief
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
              <button
                type="button"
                onClick={loadExample}
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
                Try an example
              </button>
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
                type="button"
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
          <div onDrop={handleDrop} onDragOver={handleDragOver} style={{ position: "relative" }}>
            <textarea
              value={brief}
              onChange={(e) => {
                setBrief(e.target.value);
                if (fileName) setFileName(null);
              }}
              placeholder="Paste your brief here, or drag and drop a file (.txt, .md, .docx, .pdf)..."
              style={{
                width: "100%",
                minHeight: 260,
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
            {brief.length.toLocaleString()} / 10,000
          </div>
        </div>

        {/* Diagnose button */}
        <div style={{ marginBottom: 48 }}>
          <button
            type="button"
            onClick={handleDiagnose}
            disabled={!brief.trim() || loading}
            style={{
              fontFamily: "var(--sans, 'Space Grotesk', sans-serif)",
              fontSize: 15,
              fontWeight: 500,
              padding: "14px 28px",
              background: !brief.trim() || loading ? "var(--border, #E0E0DC)" : "var(--orange, #3A7CA5)",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: !brief.trim() || loading ? "default" : "pointer",
              letterSpacing: 0.3,
              transition: "all 0.2s ease",
              opacity: !brief.trim() || loading ? 0.6 : 1,
            }}
          >
            {loading ? "Diagnosing..." : "Diagnose this brief →"}
          </button>
        </div>

        {/* Response */}
        <div ref={responseRef}>
          {(diagnosis || loading) && (
            <div
              style={{
                background: "#fff",
                border: "1px solid var(--border, #E0E0DC)",
                borderRadius: 8,
                padding: "32px 36px 36px",
                marginBottom: 48,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                  fontSize: 11,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "var(--text-muted, #8A8A85)",
                  marginBottom: 20,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  paddingBottom: 16,
                  borderBottom: "1px solid var(--border, #E0E0DC)",
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
                Diagnosis
              </div>
              <div
                style={{
                  fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
                  fontSize: 13.5,
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: "var(--text, #1D1B1B)",
                }}
                dangerouslySetInnerHTML={{
                  __html: diagnosis ? renderMarkdown(diagnosis) : "Reading your brief...",
                }}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: "1px solid var(--border, #E0E0DC)",
            paddingTop: 32,
            textAlign: "center",
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
            /<span style={{ color: "var(--orange, #3A7CA5)" }}>Run</span>withfoxes
          </div>
          <div
            style={{
              fontFamily: "var(--mono, 'JetBrains Mono', monospace)",
              fontSize: 11,
              color: "var(--text-muted, #8A8A85)",
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Built from the Marketing Influence Model Diagnostician by Paul Dervan. Powered by
            Claude.
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
