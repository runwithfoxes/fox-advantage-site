"use client";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body style={{ fontFamily: "monospace", padding: 40, background: "#1a1a1a", color: "#fff" }}>
        <h2>Something broke</h2>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: 13, color: "#ff6b6b" }}>
          {error.message}
        </pre>
        <pre style={{ whiteSpace: "pre-wrap", fontSize: 11, color: "#888", marginTop: 16 }}>
          {error.stack}
        </pre>
        <p style={{ fontSize: 11, color: "#666", marginTop: 24 }}>
          Digest: {error.digest || "none"}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{ marginTop: 20, padding: "10px 20px", fontSize: 14 }}
        >
          Reload
        </button>
      </body>
    </html>
  );
}
