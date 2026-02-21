"use client";

import Link from "next/link";

const stats = [
  { value: "63%", label: "Youth brand awareness", sub: "Within six months of launch" },
  { value: "48%", label: "Communication awareness", sub: "Highest in category among youth" },
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
            <h2 className="proj-section-title">O2 was a brand for their parents</h2>
            <div className="proj-prose">
              <p>
                O2 had about a third of Ireland as customers, but by 2011 we
                were losing ground with younger segments. They thought we were
                a bit pricy. This was broadly true. They didn&apos;t dislike us,
                but the brand wasn&apos;t for them.
              </p>
              <p>
                At least two other companies had tried launching low-cost mobile
                networks in Ireland in the previous 18 months. Both offered the
                lowest prices in the market. Both failed quickly and quietly.
                Lower prices alone weren&apos;t enough. People satisfice. They
                don&apos;t always choose the cheapest. They choose what feels
                safe. And nobody was going to risk switching to an unknown brand
                if it meant losing touch with their mates.
              </p>
              <p>
                So the question wasn&apos;t how do we be cheaper. It was how do
                we get talked about?
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
                A small group of us spent a week in Soho creating the brand.
                We&apos;d brought in people from WhatIf Innovation, a handful
                of creatives, and a bunch of teenagers. We leaned into Adam
                Morgan&apos;s challenger brand playbook, specifically the idea
                of scarcity. Google had done something similar with Gmail,
                making it invite-only at launch. We wondered if we could build
                scarcity into the core of the brand itself.
              </p>
              <p>
                The winning idea: a mobile network only for 18&ndash;22
                year-olds. Too young? Locked out. Too old? Kicked out.
                The brand was called 48, for the 48 best months of their lives.
              </p>
            </div>
            <blockquote className="proj-pullquote">
              <p>
                &ldquo;So, nobody can join the network until they are 18.
                And at 22, we kick them out.&rdquo;
                <br /><br />
                Silence.
                <br /><br />
                &ldquo;Right, so Paul, firstly that&apos;s not even legal.&rdquo;
              </p>
            </blockquote>
            <div className="proj-prose">
              <p>
                Susan was right to raise it. You can&apos;t actually stop people
                from joining. That would be discrimination. But as long as we
                never stopped anybody, we weren&apos;t doing anything illegal. We
                were going to get complaints. That didn&apos;t bother us. In most
                companies, the concept would have been killed on that first call.
                In fairness to the board, it wasn&apos;t. They didn&apos;t change
                a thing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <hr className="divider" />
      </div>

      {/* THE BRAND */}
      <section className="proj-section">
        <div className="container">
          <div className="proj-body">
            <div className="section-label">// the_brand</div>
            <h2 className="proj-section-title">Everything was stripped back</h2>
            <div className="proj-prose">
              <p>
                While our competitors had over 50 high street stores, we had
                none. They had large call centres. Ours was online. They had
                hundreds of price plans. We had two. We didn&apos;t sell
                handsets. We gave away SIM cards. Most networks had thousands of
                employees. We had eleven people.
              </p>
              <p>
                All this stripped-out complexity let us offer incredibly low
                prices. But we knew cheap signals poor quality. So the role of
                everything we did was to say we were cheap while signalling
                that we were not a risky, poor-quality brand.
              </p>
            </div>
            <div className="proj-callout">
              <div className="proj-callout-number">0</div>
              <div className="proj-callout-label">
                quarter-page ads. That was the rule.
              </div>
              <div className="proj-callout-note">
                If you can&apos;t afford a full page, don&apos;t advertise there.
                Give the budget back. We built conspicuous waste into every
                touchpoint.
              </div>
            </div>
            <div className="proj-prose">
              <p>
                Our TV ads were high-quality, movie-like, 50-second
                productions. We bought only large billboards and long-format
                radio. Full-page ads in youth magazines. Minimal, confident SIM
                card packaging. Everything oozed with confidence. When asked,
                teenagers saw 48 as a big brand on a par with our competitors.
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
                Before the advertising even started, we fanned the flames.
                Debates broke out on social media about the legalities of
                it. People on forums were threatening to sue. We seeded
                photographs of rejection letters telling people they
                didn&apos;t get in. We advertised for and recruited a Head of
                Rejection, whose job was to not let people join.
              </p>
              <p>
                Our customer care agents were trained to flirt and banter. In
                customer emails, we explained that we were &ldquo;running
                background checks&rdquo; and wanted to make sure they were
                &ldquo;not some sort of drug lord&rdquo;. Everything was
                reviewed through one lens: would this get talked about?
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
                The advertising itself got pulled due to complaints. Which was,
                of course, more earned media for a brand nobody had heard of a
                week earlier. The follow-up doubled down. By now, the tribe was
                forming.
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
                Within six months, 63% of Irish youth were aware of the 48
                brand. Our total brand communication awareness was 48%, the
                highest in the category among youth, with word-of-mouth as the
                second biggest driver. It exceeded customer acquisition
                targets despite early teething problems.
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
          <div className="proj-body">
            <div className="proj-prose" style={{ marginTop: 40 }}>
              <p>
                The brand survived the O2/Three merger in 2015 and kept
                going for years afterwards. Looking back, finding ways to
                create scarcity was not the difficult part. It&apos;s the
                willingness to not dilute the idea or back away from it when
                the hurdles appear. And they will appear.
              </p>
            </div>
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
