// Cookie notice for runwithfoxes.com.
// Created 8 June 2026. Reflects the site's ACTUAL behaviour: no tracking/analytics/advertising
// cookies. Only functional first-party browser storage:
//   localStorage  fox_access            -> remembers the book download has been unlocked (EmailGate.tsx)
//   sessionStorage isa-dismissed(-contact) -> remembers Isa was closed this visit (ChatWidget.tsx)
//   sessionStorage research-ref          -> matches a research referral to its study (ResearchClient.tsx)
// If analytics or any third-party script is ever added, update the "What we do store" section.
// Styling mirrors src/app/privacy/page.tsx.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies \\ Run with Foxes",
  description: "How Run with Foxes Limited uses cookies and browser storage. We use no tracking, advertising, or analytics cookies.",
};

const wrap: React.CSSProperties = {
  maxWidth: 760,
  margin: "0 auto",
  padding: "72px 24px 96px",
  fontFamily: "var(--font-mono), monospace",
  fontWeight: 300,
  lineHeight: 1.65,
  color: "#1A3A4E",
  background: "#FAFAF8",
};
const h1: React.CSSProperties = { fontFamily: "var(--font-sans), sans-serif", fontWeight: 700, fontSize: 34, color: "#1A3A4E", margin: "0 0 8px" };
const h2: React.CSSProperties = { fontFamily: "var(--font-sans), sans-serif", fontWeight: 600, fontSize: 20, color: "#3A7CA5", margin: "40px 0 10px" };
const p: React.CSSProperties = { margin: "0 0 14px" };
const li: React.CSSProperties = { margin: "0 0 10px" };
const link: React.CSSProperties = { color: "#3A7CA5" };

export default function CookiesPage() {
  return (
    <main style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <article style={wrap}>
        <h1 style={h1}>Cookies</h1>
        <p style={{ ...p, fontFamily: "var(--font-mono)", color: "#3A7CA5" }}>Run with Foxes Limited</p>

        <p style={p}>
          The short version: this site does not use tracking, advertising, or analytics cookies. We do not use
          Google Analytics, advertising pixels, or any third-party tracking. We do not build a profile of you, and we
          do not sell data.
        </p>

        <h2 style={h2}>What we do store</h2>
        <p style={p}>
          To make the site work, we keep a small amount of information in your own browser. It stays on your device,
          it is not sent to us as part of a tracking cookie, and it is never shared. There are three things:
        </p>
        <ul style={{ margin: "0 0 14px", paddingLeft: 20 }}>
          <li style={li}>
            <strong>Book access.</strong> Once you unlock the free book download, we remember it so you are not asked
            to sign up again on the same device.
          </li>
          <li style={li}>
            <strong>Chat.</strong> If you close Isa, our chat assistant, we remember that so she does not reopen
            during the same visit.
          </li>
          <li style={li}>
            <strong>Research reference.</strong> If you arrive through a research link, we keep a short reference so a
            call or interview can be matched to the right study.
          </li>
        </ul>
        <p style={p}>
          This is strictly functional storage. It keeps the site working and remembers your choices. It is not used
          to track you across other websites.
        </p>

        <h2 style={h2}>Managing it</h2>
        <p style={p}>
          You can clear this at any time through your browser settings, by clearing site data for runwithfoxes.com.
          Nothing breaks if you do. You may just be asked to sign up for the book again, or see Isa reopen on your
          next visit.
        </p>

        <h2 style={h2}>Questions</h2>
        <p style={p}>
          If anything here is unclear, email{" "}
          <a href="mailto:paul@runwithfoxes.com" style={link}>paul@runwithfoxes.com</a>.
        </p>
      </article>
    </main>
  );
}
