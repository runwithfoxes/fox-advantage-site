"use client";

import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "12%", label: "Youth market share", sub: "Within the first year" },
  { value: "63%", label: "Youth brand awareness", sub: "Within six months of launch" },
  { value: "11", label: "People", sub: "The entire team that ran 48" },
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
              We built a mobile brand inside Telefonica that used scarcity as a
              strategy. Only 18&ndash;22 year-olds could join. The ads got
              banned. We hit 12% market share in year one.
            </p>
            <div className="proj-hero-meta">
              <div><span className="proj-meta-accent">\</span> Telefonica (O2 Ireland)</div>
              <div><span className="proj-meta-accent">\</span> 2012&ndash;2014</div>
            </div>
            <div className="proj-hero-image-stacked">
              <Image
                src="/projects/48/poster2.jpeg"
                alt="48 Go Conquer campaign poster"
                width={720}
                height={1080}
                priority
                className="proj-hero-img"
              />
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
            <h2 className="proj-section-title">O2 was a brand for their parents</h2>
            <div className="proj-prose">
              <p>
                O2 had a third of Ireland as customers, but we were losing
                ground with younger segments. Two other companies had recently
                launched cheap mobile networks in Ireland. Both failed. Lower
                prices alone weren&apos;t enough. People don&apos;t switch to
                brands they&apos;ve never heard of. So the question
                wasn&apos;t how do we be cheaper. It was how do we get talked
                about?
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE IDEA */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// the_idea</div>
            <h2 className="proj-section-title">Firstly Paul, that&apos;s not even legal</h2>
            <div className="proj-prose">
              <p>
                We borrowed from Adam Morgan&apos;s challenger brand playbook
                and built scarcity into the core of the brand. A mobile network
                only for 18&ndash;22 year-olds. Too young? Locked out. Too old?
                Kicked out. We called it 48, for the 48 best months of their
                lives.
              </p>
            </div>
            <blockquote className="proj-pullquote">
              <p>&ldquo;So, nobody can join until they are 18. And at 22, we kick them out.&rdquo;</p>
              <p className="proj-pullquote-pause">Silence.</p>
              <p>&ldquo;Right, so Paul, firstly that&apos;s not even legal.&rdquo;</p>
            </blockquote>
            <div className="proj-prose">
              <p>
                In most companies, the concept would have been killed on that
                first call. In fairness to the board, it wasn&apos;t. They
                didn&apos;t change a thing.
              </p>
            </div>
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
                Before the advertising even started, we seeded rejection
                letters, recruited a Head of Rejection, and told customers we
                were &ldquo;running background checks&rdquo; on them. Forums
                lit up. People threatened to sue. Everything was reviewed
                through one lens: would this get talked about?
              </p>
            </div>
          </div>
          <div className="proj-body proj-hero-center">
            <div className="proj-hero-image-stacked">
              <Image
                src="/projects/48/rejection-letter.png"
                alt="48 rejection letter sent to applicants"
                width={600}
                height={800}
                className="proj-hero-img"
              />
              <div className="proj-image-caption">The actual rejection letter.</div>
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
                The ads got pulled due to complaints. Which was, of course,
                more earned media for a brand nobody had heard of a week
                earlier.
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
          <div className="proj-body proj-hero-center">
            <div className="proj-hero-image-stacked">
              <Image
                src="/projects/48/ads.png"
                alt="48 Go Conquer print campaign - six poster designs"
                width={900}
                height={600}
                className="proj-hero-img"
              />
              <div className="proj-image-caption">The full print campaign.</div>
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
                Within six months, 63% of Irish youth were aware of 48.
                Word-of-mouth was the second biggest driver. The brand survived
                the O2/Three merger and kept going for years. Finding ways to
                create scarcity was not the hard part. It&apos;s the
                willingness to not dilute the idea when the hurdles appear.
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
