"use client";

import Link from "next/link";

const stats = [
  { value: "12%", label: "Youth market share", sub: "Within the first year" },
  { value: "18–22", label: "Age-locked product", sub: "Too old? You're out." },
  { value: "0", label: "Apologies", sub: "The complaints were the point" },
];

export default function FortyEightPage() {
  return (
    <>
      {/* TOP BAR */}
      <header className="top-bar">
        <Link href="/" className="logo">
          /<span>Run</span>withfoxes
        </Link>
        <nav>
          <Link href="/#projects">/projects</Link>
          <Link href="/#chapters">chapters.md</Link>
          <Link href="/#signup" className="cta-bar">
            /get_the_book
          </Link>
        </nav>
      </header>

      {/* HERO */}
      <section className="proj-hero">
        <div className="container">
          <div className="proj-body proj-hero-center">
            <div className="section-label">// project \48</div>
            <h1 className="proj-title">
              <span className="accent">Fame</span> Strategy in action
            </h1>
            <p className="proj-subtitle">
              48 · A youth brand that didn&apos;t ask to be liked
            </p>
            <p className="proj-lede">
              We built a mobile brand inside Telefonica that used exclusion as a
              brand asset. Only 18&ndash;22 year-olds could join. The ads got
              banned. We hit 12% market share in year one.
            </p>
            <div className="proj-hero-meta">
              <div><span className="proj-meta-accent">\</span> Telefonica (O2 Ireland)</div>
              <div><span className="proj-meta-accent">\</span> 2012&ndash;2014</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE PROBLEM */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// the_problem</div>
            <h2 className="proj-section-title">Everyone was chasing the same people</h2>
            <div className="proj-prose">
              <p>
                In 2012, every mobile operator in Ireland was fighting for the
                youth market. Same deals, same messaging, same race to the
                bottom on price. The category had no edges. Vodafone, Three,
                Meteor, O2. Pick one. It didn&apos;t really matter which.
              </p>
              <p>
                O2 had decent market share overall, but among 18&ndash;22
                year-olds we were getting nowhere. Standard playbook wasn&apos;t
                working. So we stopped running the standard playbook.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE INSIGHT */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// the_insight</div>
            <h2 className="proj-section-title">Exclusion as a brand asset</h2>
            <div className="proj-prose">
              <p>
                Most brands chase love. We chased fame. We borrowed from
                challenger brand playbooks: scarcity, earned media, tribal
                language, strong semiotics. We didn&apos;t design comms. We
                designed behaviour.
              </p>
              <p>
                The product itself was the provocation. Only 18&ndash;22
                year-olds could join. Too young? Locked out. Too old? Kicked
                out. It created curiosity, urgency, and debate. The brand felt
                underground, even though it was backed by a telco.
              </p>
            </div>
            <blockquote className="proj-pullquote">
              <p>
                &ldquo;We made a limited-age product no one else would dare
                launch. The campaign didn&apos;t ask to be liked. It demanded
                to be noticed.&rdquo;
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE CAMPAIGN */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// the_campaign</div>
            <h2 className="proj-section-title">Built to provoke</h2>
            <div className="proj-prose">
              <p>
                The launch campaign leaned into the tension. Age restriction
                wasn&apos;t a footnote in the terms and conditions. It was
                the entire point. The creative was designed to generate
                complaints, conversation, and coverage.
              </p>
              <p>
                It worked. The ads got banned. We created so many complaints
                that the campaign became a news story in its own right. Which,
                of course, was more earned media for a brand nobody had heard
                of a week earlier.
              </p>
            </div>
          </div>
          <div className="proj-video-stack">
            <div className="proj-video-wrapper">
              <div className="proj-video-label">Launch campaign</div>
              <div className="proj-video-embed">
                <iframe
                  src="https://www.youtube.com/embed/B6_-ujWjIyA"
                  title="48 - launch campaign"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
          <div className="proj-body">
            <div className="proj-prose" style={{ marginTop: 32 }}>
              <p>
                The follow-up doubled down. By now, the brand had an audience
                who got it. The tone could go further because the tribe was
                already forming.
              </p>
            </div>
          </div>
          <div className="proj-video-stack">
            <div className="proj-video-wrapper">
              <div className="proj-video-label">Follow-up campaign</div>
              <div className="proj-video-embed">
                <iframe
                  src="https://www.youtube.com/embed/6qm6MTXygSs"
                  title="48 - follow-up campaign"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* RESULTS */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// the_results</div>
            <h2 className="proj-section-title">The results</h2>
            <div className="proj-prose">
              <p>
                Within a year, 48 had captured 12% of the youth mobile market
                in Ireland. A brand that didn&apos;t exist twelve months
                earlier, built from nothing inside a corporate telco, was
                suddenly the third biggest player among 18&ndash;22 year-olds.
              </p>
              <p>
                The brand survived the O2/Three merger in 2015 and kept going.
                They eventually relaxed the age restriction and broadened the
                proposition, which tells you something about how strong the
                original positioning was. It had legs well beyond the launch.
              </p>
            </div>
          </div>
          <div className="proj-stats-row">
            {stats.map((s, i) => (
              <div key={i} className="proj-stat">
                <div className="proj-stat-value">{s.value}</div>
                <div className="proj-stat-label">{s.label}</div>
                <div className="proj-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="footer-spacer" />

      {/* BOTTOM BAR */}
      <div className="bottom-bar">
        <Link href="/" className="active">
          &larr; back
        </Link>
        <Link href="/#projects">/projects</Link>
        <Link href="/#signup" className="cta-bar">
          get the book
        </Link>
      </div>
    </>
  );
}
