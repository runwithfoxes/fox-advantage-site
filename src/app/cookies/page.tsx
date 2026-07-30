// Cookie notice for runwithfoxes.com.
// Created 8 June 2026. Updated 20 July 2026 when Vercel Web Analytics was added, and
// 30 July 2026 when the course signup began reporting to Meta.
// Reflects the site's ACTUAL behaviour: no cookies of any kind, no advertising pixel.
//
// ⛔ 30 JUL 2026: THE "no advertising pixels" LINE WAS TRUE AND IS NOW ONLY HALF TRUE.
// There is still no browser pixel (no `fbq`, nothing on the device, so still no banner
// needed), but a course signup now sends a server-side conversion event to Meta with a
// hashed email - see src/lib/meta-capi.ts and the "When you sign up" section below.
// If that server event is ever widened beyond the signup, or a browser pixel is ever
// added, THIS PAGE CHANGES FIRST and a consent banner comes with the pixel.
// Analytics is Vercel Web Analytics, which is cookieless: it identifies a visitor by a hash
// of the incoming request that resets every day, so nobody can be followed between days or
// between sites. If that ever changes, or a cookie-setting tool is added, this page changes
// FIRST. Functional first-party browser storage:
//   localStorage  fox_access            -> remembers the book download has been unlocked (EmailGate.tsx)
//   sessionStorage isa-dismissed(-contact) -> remembers Isa was closed this visit (ChatWidget.tsx)
//   sessionStorage research-ref          -> matches a research referral to its study (ResearchClient.tsx)
// If analytics or any third-party script is ever added, update the "What we do store" section.
// Styling mirrors src/app/privacy/page.tsx.
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies \\ Run with Foxes",
  description: "How Run with Foxes Limited uses cookies and browser storage. We set no cookies, and our analytics is cookieless and anonymous.",
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
          The short version: this site sets no cookies. We do use analytics, but the cookieless kind, so we can see
          that a page was visited without knowing who visited it. We do not use Google Analytics, there is no
          advertising pixel on this site, we do not build a profile of you, and we do not sell data. There is one
          thing we share, and it is described below: if you sign up for the course after clicking one of our ads,
          we tell Meta the signup happened.
        </p>

        <h2 style={h2}>What we measure</h2>
        <p style={p}>
          We use Vercel Web Analytics, which counts page views and tells us roughly where visitors arrived from. It sets
          no cookies and stores nothing on your device. Instead of following a person, it works from a scrambled version
          of the request your browser makes, and that scramble is thrown away and rebuilt every day. The practical
          effect is that you cannot be recognised tomorrow, and you cannot be recognised on any other website.
        </p>
        <p style={p}>
          What we see is counts: how many people read a page, which pages, and which link or site sent them. It tells us
          whether something we wrote was worth writing. It does not tell us who you are.
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

        <h2 style={h2}>When you sign up for the course</h2>
        <p style={p}>
          We advertise the free course on Facebook and Instagram. If you sign up after clicking one of those ads, we
          tell Meta that the signup happened, so we can see which ad was worth running. This happens on our own
          server after you submit the form. There is no Facebook pixel on this site and nothing to do with it is
          stored on your device.
        </p>
        <p style={p}>
          What we send is a scrambled version of your email address rather than the address itself, along with the
          reference Meta adds to the link you clicked. Meta can match that scramble to your account if you have one
          with them, which is how they are able to tell us the ad worked. We send nothing for anyone who has not
          signed up, and nothing for anyone who arrived any other way. If you would rather we had not, email Paul at
          the address below and we will remove it.
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
