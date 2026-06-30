"use client";

import { useState } from "react";

type Props = {
  initialAuth: boolean;
  verifyAction: (password: string) => Promise<boolean>;
};

export default function PresentationGate({ initialAuth, verifyAction }: Props) {
  const [authed, setAuthed] = useState(initialAuth);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);

  if (authed) {
    return (
      <iframe
        src="/presentation-app/index.html"
        title="The AI Maturity Curve"
        style={{ position: "fixed", inset: 0, width: "100%", height: "100%", border: "none" }}
      />
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const ok = await verifyAction(pw);
    setBusy(false);
    if (ok) setAuthed(true);
    else {
      setErr(true);
      setPw("");
    }
  }

  const mono = "'JetBrains Mono', ui-monospace, monospace";

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAFAF8",
        color: "#1D1B1B",
        fontFamily: mono,
        padding: 24,
      }}
    >
      <form onSubmit={submit} style={{ width: "100%", maxWidth: 360 }}>
        <div style={{ fontSize: 13, letterSpacing: 2, color: "#8A8A85", marginBottom: 28 }}>
          /<span style={{ color: "#F47521" }}>Run</span>withfoxes
        </div>
        <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 300, letterSpacing: "-0.5px", marginBottom: 10 }}>
          The AI Maturity Curve
        </div>
        <p style={{ fontSize: 13, color: "#8A8A85", lineHeight: 1.6, marginBottom: 24 }}>
          A private working session. Enter the password to view.
        </p>
        <input
          type="password"
          value={pw}
          onChange={(e) => {
            setPw(e.target.value);
            setErr(false);
          }}
          placeholder="Password"
          autoFocus
          style={{
            width: "100%",
            border: `1px solid ${err ? "#C0392B" : "#E0E0DC"}`,
            background: "#fff",
            padding: "12px 14px",
            fontFamily: mono,
            fontSize: 14,
            color: "#1D1B1B",
            outline: "none",
            marginBottom: 14,
          }}
        />
        <button
          type="submit"
          disabled={busy || !pw}
          style={{
            width: "100%",
            background: busy || !pw ? "#E0E0DC" : "#3A7CA5",
            color: busy || !pw ? "#8A8A85" : "#fff",
            border: "none",
            cursor: busy || !pw ? "default" : "pointer",
            padding: "12px 14px",
            fontFamily: mono,
            fontSize: 12,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          {busy ? "Checking…" : "Enter"}
        </button>
        {err && (
          <div style={{ fontSize: 12, color: "#C0392B", marginTop: 12 }}>
            That password isn&apos;t right. Try again.
          </div>
        )}
      </form>
    </div>
  );
}
