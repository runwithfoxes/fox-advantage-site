import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./softco.css";

// SoftCo's body and UI face. Their site serves it as "plusJakartaSans".
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Built in SoftCo's brand \\ Run with Foxes",
  description:
    "A demonstration page: one web page built entirely from SoftCo's own brand system, with the measurements it was built from shown at the bottom.",
  // Unlisted on purpose. Not in the sitemap, not linked from anywhere on the
  // site, and kept out of the index so it cannot surface as a SoftCo page.
  robots: { index: false, follow: false },
};

export default function SoftCoDemoPage() {
  return (
    <div className={`sft-root ${jakarta.variable}`}>
      {/* Frame. Deliberately in Run with Foxes' language, not SoftCo's, so the
          page cannot be read as softco.com. */}
      <div className="sft-frame">
        <div className="sft-frame-inner">
          <span>
            <a href="/">Run with Foxes</a> \ brand consistency test
          </span>
          <span className="sft-frame-tag">
            Built for SoftCo \ 23 July 2026 \ not a SoftCo page
          </span>
        </div>
      </div>

      {/* 1. Hero */}
      <header className="sft-hero">
        <div className="sft-hero-nav">
          <img
            src="/softco/softco-logo-negative.svg"
            alt="SoftCo"
            width={140}
            height={30}
          />
        </div>
        <div className="sft-wrap">
          <div className="sft-hero-grid">
            <h1 className="sft-h1">
              Everything on this page came from SoftCo&rsquo;s own brand system.
            </h1>
            <p className="sft-hero-sub">
              The colours, the type, the spacing and the tone were read from
              SoftCo&rsquo;s brand guidelines, then checked against the computed
              styles on softco.com. The copy in the middle of the page is
              theirs, word for word. The photograph is from their own image
              library. Nothing here was invented.
            </p>
            <div className="sft-hero-actions">
              <a className="sft-btn" href="#receipts">
                See the measurements
                <span className="sft-btn-arrow" aria-hidden="true">
                  &rsaquo;
                </span>
              </a>
              <a
                className="sft-link sft-link-light"
                href="https://softco.com"
                target="_blank"
                rel="noreferrer"
              >
                Compare with softco.com <span>&rsaquo;</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 2. The animation */}
      <section className="sft-anim">
        <div className="sft-wrap">
          <div className="sft-anim-head">
            <div>
              <p className="sft-eyebrow sft-eyebrow-white">The hero, animated</p>
              <h2 className="sft-h3" style={{ color: "#fff" }}>
                Their homepage image, rebuilt so it moves
              </h2>
            </div>
          </div>
          <div className="sft-anim-frame">
            <video
              src="/softco/hero-animation.mp4"
              poster="/softco/hero-animation-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              aria-label="SoftCo product hero, animated: the invoice review panel, AI analysis checks and KPI cards arrive in sequence"
            />
          </div>
          <p className="sft-anim-note">
            SoftCo&rsquo;s homepage hero is a still image. This is the same
            composition rebuilt so the AI checks tick through and the match rate
            and spend KPI cards arrive in order. Twenty four seconds, looping.
            Every element in it is already in their own picture.
          </p>
          <p className="sft-src sft-src-light">
            source \ softco_hero_v1.mp4, built 23 Jul 2026, 1816x920, 30fps
          </p>
        </div>
      </section>

      {/* 3. Their own section, rebuilt from the brand system */}
      <section className="sft-sec sft-sec-light">
        <div className="sft-wrap">
          <div className="sft-split">
            <div>
              <p className="sft-eyebrow">Where we excel</p>
              <h2 className="sft-h2">
                Built for <span className="sft-hl">complexity</span>
              </h2>
              <p className="sft-body" style={{ margin: "28px 0 0", maxWidth: 480 }}>
                If your AP and P2P reality is complex, multi-layered, and
                high-stakes, you are in the right place. We thrive where others
                simplify away.
              </p>
              <div className="sft-actions">
                <a className="sft-btn" href="https://softco.com" target="_blank" rel="noreferrer">
                  What we do
                  <span className="sft-btn-arrow" aria-hidden="true">
                    &rsaquo;
                  </span>
                </a>
              </div>
              <p className="sft-src">
                copy \ softco.com homepage, 23 Jul 2026, verbatim. Not rewritten.
              </p>
            </div>

            <ul className="sft-complex-list">
              {[
                ["ERP complexity", "One ERP or more in play"],
                [
                  "Global operations",
                  "Multiple entities, currencies or jurisdictions",
                ],
                [
                  "Exception handling",
                  "High exception rates and complex matching",
                ],
                ["Compliance pressure", "Audit, tax and compliance pressure"],
                [
                  "Business growth",
                  "Integrating acquisitions or scaling shared services",
                ],
              ].map(([label, line]) => (
                <li key={label}>
                  <p className="sft-eyebrow">{label}</p>
                  <p className="sft-h3">{line}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. The photograph */}
      <section className="sft-sec sft-sec-tint">
        <div className="sft-wrap">
          <p className="sft-eyebrow">Client success stories</p>
          <h2 className="sft-h2" style={{ maxWidth: 820, marginBottom: 60 }}>
            Trusted by enterprises that can&rsquo;t afford{" "}
            <span className="sft-hl">&lsquo;good enough&rsquo;</span>
          </h2>

          <div className="sft-photo-grid">
            <div className="sft-photo">
              <span className="sft-photo-mark" aria-hidden="true" />
              <img
                src="/softco/softco-p2p-flow.jpg"
                alt="Hands marking up a printed invoice report beside a tablet showing a P2P process flow diagram"
                width={1600}
                height={900}
              />
            </div>

            <div>
              <p className="sft-quote">
                &ldquo;SoftCo provides Primark with complete visibility,
                significantly reduced manual workload and a 1 year return on
                investment.&rdquo;
              </p>
              <p className="sft-attrib">
                <strong>Maura Mulderry</strong>
                <span>
                  Director Financial Planning &amp; Analysis, Primark
                </span>
              </p>

              <div className="sft-stats">
                {[
                  ["98%", "AI match rate"],
                  ["350k", "Annual invoices"],
                  ["1 yr", "ROI achieved"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <span className="sft-stat-n">{n}</span>
                    <span className="sft-stat-l">{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="sft-src">
            photograph \ SoftCo brand library, 08_Images. Cropped, not
            retouched, no filter. Their guidelines allow a light blueprint
            overlay on low-detail areas only, so the rule and the mark sit in
            the corner, clear of the hands.
            <br />
            quote and figures \ softco.com homepage, 23 Jul 2026.
          </p>
        </div>
      </section>

      {/* 5. Receipts */}
      <section className="sft-sec sft-sec-dark" id="receipts">
        <div className="sft-wrap">
          <div className="sft-receipt-head">
            <div>
              <p className="sft-eyebrow">The measurements</p>
              <h2 className="sft-h2">
                What the page was{" "}
                <span className="sft-hl-light">built from</span>
              </h2>
            </div>
            <div>
              <p className="sft-body sft-body-light">
                Consistency is not a feeling about a page. It is a set of values
                that either match the source or do not. These are the values
                this page holds, and where each one came from. Two sources were
                used: SoftCo&rsquo;s brand guidelines, and the computed styles
                read off softco.com on 23 July 2026.
              </p>
            </div>
          </div>

          <div className="sft-swatches">
            {[
              ["#047fe5", "SoftCo Blue", "Signature colour. 40 to 60 per cent of the page."],
              ["#060d2e", "Dark Blue", "Body text and depth. 30 to 50 per cent."],
              ["#f7931e", "Orange", "Accent only. Never more than 10 per cent."],
              ["#e8f2fd", "Light Blue", "Panel tint."],
              ["#f2f2f2", "Grey", "Neutral, white space."],
            ].map(([hex, name, role]) => (
              <div key={hex}>
                <div
                  className="sft-swatch-chip"
                  style={{ background: hex }}
                  aria-hidden="true"
                />
                <p className="sft-swatch-hex">{hex}</p>
                <p className="sft-swatch-name">{name}</p>
                <p className="sft-swatch-role">{role}</p>
              </div>
            ))}
          </div>

          <div className="sft-specs">
            {[
              ["Headline face", "Erode Semibold 600, from their brand pack"],
              ["Body and UI face", "Plus Jakarta Sans 400 to 800"],
              ["H1", "80px / 84px, white, on the hero gradient"],
              ["H2", "60px / 64px, #060d2e on light, white on dark"],
              ["Eyebrow label", "14px, weight 800, 1.4px tracking, uppercase"],
              ["Hero gradient", "linear-gradient(#1f99f2, #0d72d4)"],
              ["Button", "#f7931e, 5px radius, 15px 30px padding"],
              ["Button type", "Jakarta 700, 14px, 0.35px tracking"],
              ["Headline highlight", "One phrase switches to #047fe5. Headings only."],
              ["Case", "Sentence case throughout. No title case."],
              ["Punctuation", "No em dashes, no exclamation marks, Oxford comma"],
              ["Linework", "Level 2: fine rules and end marks in the margins"],
            ].map(([k, v]) => (
              <dl className="sft-spec" key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </dl>
            ))}
          </div>

          <div className="sft-flag">
            <h3>
              One value where the two sources disagree, so this page had to pick
            </h3>
            <p>
              The SoftCo ad system, signed off in June, puts dark{" "}
              <code>#060d2e</code> text on the orange button and rules out white.
              The live website ships white text on the same orange. Both cannot
              be right, and neither source is obviously wrong, so the page shows
              its working rather than quietly copying one.
            </p>
            <div className="sft-contrast">
              <div className="sft-contrast-card sft-c-white">
                White on orange <small>2.3:1</small>
              </div>
              <div className="sft-contrast-card sft-c-dark">
                Dark on orange <small>8.3:1</small>
              </div>
            </div>
            <p>
              Measured, white on <code>#f7931e</code> gives 2.3:1. The floor for
              large text is 3:1, so it does not clear it. The dark text gives
              8.3:1. This page uses the dark text, which is what the signed-off
              ad system already says. The buttons above are the live proof of
              the choice, not a description of it.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Close */}
      <section className="sft-close">
        <div className="sft-wrap">
          <p className="sft-eyebrow sft-eyebrow-white">What this is</p>
          <h2 className="sft-h2">
            One page, one brand system, and the receipts underneath it.
          </h2>
          <p className="sft-body sft-body-light">
            Run with Foxes built this page as a test of one thing: whether a
            brand can be held exactly on the web, not just in ads, and whether
            the work can show where every value came from. The same method works
            for landing pages, campaign pages and client work.
          </p>
          <a className="sft-btn" href="/contact">
            Talk to us
            <span className="sft-btn-arrow" aria-hidden="true">
              &rsaquo;
            </span>
          </a>
        </div>
      </section>

      <footer className="sft-foot">
        <div className="sft-wrap sft-foot-inner">
          <span>
            Built by <a href="/">Run with Foxes</a> \ 23 July 2026 \ unlisted
            demonstration page
          </span>
          <img
            src="/softco/softco-logo-positive.svg"
            alt="SoftCo"
            width={110}
            height={22}
          />
        </div>
      </footer>
    </div>
  );
}
