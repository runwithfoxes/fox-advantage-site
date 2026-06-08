// Privacy notice for runwithfoxes.com. Approved by Paul to go live 8 June 2026 and linked from
// the homepage footer alongside /cookies. Cookies/storage detail lives on /cookies (linked from here).
// Retention covered in the "How long we keep it" section. Address kept (Paul's call, 8 June).
// Created 1 June 2026 (T4). Contact email confirmed by Paul: paul@runwithfoxes.com.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy \\ Run with Foxes",
  description: "How Run with Foxes Limited handles personal data, including business contact information for B2B outreach.",
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

export default function PrivacyPage() {
  return (
    <main style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <article style={wrap}>
        <h1 style={h1}>Privacy</h1>
        <p style={{ ...p, fontFamily: "var(--font-mono)", color: "#3A7CA5" }}>Run with Foxes Limited</p>

        <p style={p}>
          This notice explains how Run with Foxes Limited handles personal data. We are the data controller.
          You can contact us at <a href="mailto:paul@runwithfoxes.com" style={{ color: "#3A7CA5" }}>paul@runwithfoxes.com</a> or by
          post at 61 Kerrymount Rise, Foxrock, Dublin 18, Ireland.
        </p>

        <h2 style={h2}>Business contact information and B2B outreach</h2>
        <p style={p}>
          We may collect and process limited business contact information for targeted business-to-business
          outreach, including name, professional role, employer, business email address, the source through which
          we identified you, and notes on professional relevance. We may collect this from publicly available
          professional sources, professional networks, company websites, event pages, referrals, and reputable
          business-to-business data providers.
        </p>
        <p style={p}>
          We process this information on the basis of our legitimate interests in carrying out relevant
          business-to-business marketing, and only where we believe the contact is relevant in a professional
          capacity. We use limited data, contact you at a business address, and give a clear way to opt out.
        </p>
        <p style={p}>
          You can object to or opt out of direct marketing at any time by replying to any message or contacting us
          at <a href="mailto:paul@runwithfoxes.com" style={{ color: "#3A7CA5" }}>paul@runwithfoxes.com</a>. We will
          suppress your details from future outreach immediately.
        </p>

        <h2 style={h2}>The book and our newsletter</h2>
        <p style={p}>
          When you sign up to download the book, you give us your email address. As we make clear at sign-up, this
          also subscribes you to the Run with Foxes newsletter, so we can send you new chapters and related writing.
          You can unsubscribe at any time using the link in any email, or by emailing{" "}
          <a href="mailto:paul@runwithfoxes.com" style={{ color: "#3A7CA5" }}>paul@runwithfoxes.com</a>. We also
          collect limited technical information needed to run the site. For details on cookies and browser storage,
          see our <a href="/cookies" style={{ color: "#3A7CA5" }}>Cookies page</a>. We do not sell your data.
        </p>

        <h2 style={h2}>How long we keep it</h2>
        <p style={p}>
          We keep business contact information only while a contact remains professionally relevant, and we remove it
          promptly on request. Newsletter details are kept until you unsubscribe. We do not keep personal data longer
          than we need it.
        </p>

        <h2 style={h2}>Your rights</h2>
        <p style={p}>
          You have the right to access the personal data we hold about you, to ask us to correct or delete it, and
          to object to direct marketing. To exercise any of these, email{" "}
          <a href="mailto:paul@runwithfoxes.com" style={{ color: "#3A7CA5" }}>paul@runwithfoxes.com</a>. If you are
          in the EU or UK and are unhappy with how we handle your data, you can complain to your local data
          protection authority (in Ireland, the Data Protection Commission).
        </p>

        <p style={{ ...p, marginTop: 40, fontSize: 13, color: "#6b7c86" }}>
          Run with Foxes Limited, 61 Kerrymount Rise, Foxrock, Dublin 18, Ireland.
        </p>
      </article>
    </main>
  );
}
