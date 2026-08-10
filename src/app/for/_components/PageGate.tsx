"use client";

import { useState, useTransition } from "react";
import { PROSPECT_DOCS } from "./docs";
import PageTracker from "./PageTracker";

export default function PageGate({
  slug,
  clientName,
  initialAuth,
  verifyAction,
}: {
  slug: string;
  clientName: string;
  initialAuth: boolean;
  verifyAction: (slug: string, password: string) => Promise<boolean>;
}) {
  const [authed, setAuthed] = useState(initialAuth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const ok = await verifyAction(slug, password);
      if (ok) setAuthed(true);
      else setError("Wrong password.");
    });
  }

  if (authed) {
    const Doc = PROSPECT_DOCS[slug];
    if (!Doc) return null;
    return (
      <>
        <PageTracker slug={slug} />
        <Doc />
      </>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAFAF8",
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        padding: "24px",
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ fontSize: 13, letterSpacing: 2, color: "#8A8A85", marginBottom: 6 }}>
          /<span style={{ color: "#F47521" }}>Run</span>withfoxes
        </div>
        <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "#3A7CA5", marginBottom: 18 }}>
          Private · {clientName}
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "#1D1B1B", marginBottom: 20 }}>
          This page is private. Enter the password to view it.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            autoFocus
            style={{
              width: "100%",
              border: "1px solid #E0E0DC",
              background: "#fff",
              padding: "12px 14px",
              fontFamily: "inherit",
              fontSize: 14,
              color: "#1D1B1B",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={pending}
            style={{
              width: "100%",
              marginTop: 12,
              background: "#1A3A4E",
              color: "#F7EAD9",
              border: "none",
              padding: "12px 14px",
              fontFamily: "inherit",
              fontSize: 12,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              cursor: pending ? "default" : "pointer",
            }}
          >
            {pending ? "Checking…" : "View page"}
          </button>
        </form>
        {error && <p style={{ fontSize: 12, color: "#c0392b", marginTop: 10 }}>{error}</p>}
      </div>
    </main>
  );
}
