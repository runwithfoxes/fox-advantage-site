"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    const bottomBar = bottomBarRef.current;
    const modules = modulesRef.current;
    if (!nav || !hero || !bottomBar || !modules) return;

    const onScroll = () => {
      const heroH = hero.offsetHeight;
      nav.classList.toggle("hp-nav-scrolled", window.scrollY > heroH - 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const barObserver = new IntersectionObserver(
      ([e]) => {
        bottomBar.classList.toggle("hp-bb-visible", e.isIntersecting);
      },
      { threshold: 0 }
    );
    barObserver.observe(modules);

    return () => {
      window.removeEventListener("scroll", onScroll);
      barObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* ==================== NAV ==================== */}
      <nav className="hp-nav" ref={navRef} id="topNav">
        <Link href="/" className="hp-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <div className="hp-nav-links">
          {/* #unfair_advantage dropdown */}
          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">#unfair_advantage &#9662;</span>
            <div className="hp-mega">
              <div className="hp-mega-inner">
                <div className="hp-mega-col">
                  <div className="hp-mega-label">HUMAN LEADS</div>
                  <a href="#mod-strategy">Strategy</a>
                  <a href="#mod-positioning">Positioning</a>
                </div>
                <div className="hp-mega-col">
                  <div className="hp-mega-label">AI + HUMAN</div>
                  <a href="#mod-messaging">Messaging</a>
                  <a href="#mod-research">Research</a>
                  <a href="#mod-advertising">Advertising</a>
                  <a href="#mod-effectiveness">Effectiveness</a>
                  <a href="#mod-brand-guardian">Brand guardian</a>
                  <a href="#mod-events">Events</a>
                </div>
                <div className="hp-mega-col">
                  <div className="hp-mega-label">AI DOES IT</div>
                  <a href="#mod-ad-engine">Ad engine</a>
                  <a href="#mod-growth">Growth team</a>
                  <a href="#mod-pm">Project manager</a>
                </div>
              </div>
            </div>
          </div>

          {/* /projects dropdown */}
          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">/projects &#9662;</span>
            <div className="hp-mega">
              <div className="hp-projects-dropdown">
                <div className="hp-pd-label">CASE STUDIES</div>
                <Link href="/millionaire-raffle">Millionaire Raffle</Link>
                <Link href="/marketer-of-the-year">Marketer of the Year</Link>
                <Link href="/48">48</Link>
                <Link href="/run-with-foxes">Run with Foxes (book 1)</Link>
                <div className="hp-pd-label">AI TOOLS</div>
                <Link href="/experts">Expert Panel</Link>
                <Link href="/brief-diagnostician">Brief Diagnostician</Link>
                <Link href="/coach">Effectiveness Coach</Link>
                <Link href="/ai-writer">AI Writer</Link>
                <Link href="/brand">Brand System</Link>
                <Link href="/chief">Chief of Staff</Link>
              </div>
            </div>
          </div>

          <Link href="/book">/book</Link>
          <Link href="/contact" className="hp-nav-cta">/contact</Link>
        </div>
      </nav>

      {/* ==================== VIDEO HERO ==================== */}
      <div className="hp-hero-wrapper" ref={heroRef} id="heroWrapper">
        <video
          className="hp-hero-video hp-hero-video-landscape"
          autoPlay
          muted
          playsInline
        >
          <source src="/video/fox-tarantino-trunk.mp4" type="video/mp4" />
        </video>
        <video
          className="hp-hero-video hp-hero-video-portrait"
          autoPlay
          muted
          playsInline
        >
          <source src="/video/fox-tarantino-trunk-portrait.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hp-hero-text">
        <h1>Build an unfair advantage in marketing</h1>
        <div className="hp-hero-row">
          <div className="hp-function-links">
            <a href="#mod-strategy">\strategy</a>
            <a href="#mod-positioning">\positioning</a>
            <a href="#mod-messaging">\messaging</a>
            <a href="#mod-research">\research</a>
            <a href="#mod-advertising">\advertising</a>
            <a href="#mod-effectiveness">\effectiveness</a>
            <a href="#mod-brand-guardian">\brand</a>
            <a href="#mod-ad-engine">\ads</a>
            <a href="#mod-growth">\growth</a>
            <a href="#mod-events">\events</a>
            <a href="#mod-pm">\project_manager</a>
          </div>
        </div>
      </div>

      {/* ==================== ABOUT ==================== */}
      <section className="hp-about hp-about-top" id="about">
        <div className="hp-about-grid">
          <div className="hp-about-photo">
            <Image src="/Paul_photo.jpg" alt="Paul Dervan" width={320} height={427} />
          </div>
          <div className="hp-about-bio">
            <div className="hp-about-name">Paul Dervan</div>
            <p>Twenty years in brand. Head of brand at O2 Ireland, then CMO at the National Lottery, one of the biggest FMCG brands in the country. Head of brand at Indeed and Miro, both global roles. Launched the challenger brand 48. Ireland&apos;s Marketer of the Year in 2022.</p>
            <p>Trained by Peter Field, one half of Binet and Field, who wrote The Long and the Short of It. That obsession with effectiveness, what actually drives growth, how to measure it, how to build on it, runs through everything here.</p>
            <p>The first book was <Link href="/run-with-foxes" className="hp-about-inline-link">Run with Foxes</Link>, published in 2020, about marketing effectiveness. The new one is The Fox Advantage, about how marketing teams can thrive in an AI era.</p>
            <p>Run with Foxes is the consultancy. We work with teams to bring twenty years of brand thinking together with AI, so they get faster without losing quality.</p>
            <p>What I&apos;m particularly interested in is systems. Set the bar high once, then build the system so your marketing stays at that level consistently, especially using AI.</p>
            <p>We work with large marketing teams and with businesses that have no marketing team at all. B2B and FMCG. The challenges are different but the opportunities are across both.</p>
            <div className="hp-about-ctas">
              <Link href="/book" className="hp-about-cta">\ get the book</Link>
              <Link href="/contact" className="hp-about-cta">\ get in touch</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MODULES ==================== */}
      <div className="hp-modules" ref={modulesRef}>

        {/* STRATEGY */}
        <div className="hp-module-section" id="mod-strategy">
          <div className="hp-module-split">
            <div>
              <div className="hp-module-header">
                <div className="hp-module-title">Strategy</div>
              </div>
              <div className="hp-module-desc" style={{ marginTop: 16 }}>AI isn&apos;t just about faster answers. The interesting bit is better questions.</div>
              <div className="hp-module-desc">We built a panel of experts, effectiveness, CMO, growth marketing, commercial, each trained on different frameworks and different evidence. You put your plan in front of them. They look for the flaws, the biases, the assumptions you stopped noticing because you&apos;ve been staring at the brief for three weeks.</div>
              <div className="hp-module-desc">It doesn&apos;t replace the strategist. It gives the strategist five informed perspectives before the plan leaves the building. The quality of the thinking goes up before any money gets spent.</div>
              <a href="https://runwithfoxes.com/experts" target="_blank" rel="noopener noreferrer" className="hp-try-btn">Try the panel yourself &rarr;</a>
            </div>
            <div className="hp-fox-visual">
              <Image src="/fox/chapter-fox-sitting-nobg.png" alt="Fox — strategy panel" width={380} height={380} />
            </div>
          </div>
        </div>

        {/* TESTIMONIAL: JONNIE CAHILL */}
        <div className="hp-testimonial-bar">
          <div className="hp-testimonial-bar-inner">
            <div className="hp-tbar-quote">&ldquo;Paul is a strategic thinker, with world class creative capabilities. So he knows not just what to do, but how to do it. His unique talent is his ability to galvanise an organization.&rdquo;</div>
            <div className="hp-tbar-attr"><strong>Jonnie Cahill</strong> — SVP and CMO International Foods, PepsiCo</div>
          </div>
        </div>

        {/* POSITIONING */}
        <div className="hp-module-section" id="mod-positioning">
          <div className="hp-module-header">
            <div className="hp-module-title">Positioning</div>
          </div>
          <div className="hp-module-split">
            <div className="hp-module-left">
              <div className="hp-module-desc">Brand equity is what people carry in their heads about your brand. AI won&apos;t do the positioning for you. But we can take a company&apos;s internal material, the decks, the briefs, the research, the campaign history, and use AI to work through it at speed against frameworks and competitive data. What we get to is a higher quality positioning document, like the brand house on the right, that the whole team works from. Messaging, briefs, creative, all built on it.</div>
            </div>
            <div className="hp-module-right">
              <div className="hp-brand-house">
                <div className="hp-bh-roof">
                  <div className="hp-bh-roof-label">essence</div>
                  <div className="hp-bh-roof-text">&ldquo;Honest, not heroic&rdquo;</div>
                </div>
                <div className="hp-bh-promise">Better marketing decisions through honest examination of failures</div>
                <div className="hp-bh-pillars">
                  <div className="hp-bh-pillar">Learning from failure</div>
                  <div className="hp-bh-pillar">Fox thinking</div>
                  <div className="hp-bh-pillar">Evidence-based</div>
                  <div className="hp-bh-pillar">Brand salience</div>
                  <div className="hp-bh-pillar">Honest learning</div>
                </div>
                <div className="hp-bh-row">
                  <div className="hp-bh-cell">
                    <div className="hp-bh-cell-label">audience</div>
                    Mid-career to senior marketers
                  </div>
                  <div className="hp-bh-cell">
                    <div className="hp-bh-cell-label">voice</div>
                    Smart colleague over coffee
                  </div>
                </div>
                <div className="hp-bh-foundation">
                  <div className="hp-bh-cell-label">proof</div>
                  20 yrs brand leadership &middot; Marketer of the Year 2022
                </div>
                <div className="hp-bh-caption">Run with Foxes — brand house example</div>
              </div>
            </div>
          </div>
        </div>

        {/* MESSAGING */}
        <div className="hp-module-section" id="mod-messaging">
          <div className="hp-module-header">
            <div className="hp-module-title">Messaging</div>
          </div>
          <div className="hp-module-split">
            <div className="hp-module-left">
              <div className="hp-module-desc">Messaging flows from positioning. We built an agent that takes all of a client&apos;s material, the decks, the briefs, the landing pages, the keynotes, and understands the right framework for messaging. It reads through everything at speed and structures it into a messaging framework: master proposition, pillars, proof and language rules, all locked down. Because the fundamentals are right from the start, everything written after it is higher quality. Anyone writing anything checks against it first.</div>
            </div>
            <div className="hp-module-right">
              <div className="hp-video-container">
                <video autoPlay muted loop playsInline>
                  <source src="/video/messaging-framework-scroll.mp4" type="video/mp4" />
                </video>
                <div className="hp-video-caption">Messaging framework — one locked document, every message built on it</div>
              </div>
            </div>
          </div>
        </div>

        {/* RESEARCH */}
        <div className="hp-module-section" id="mod-research">
          <div className="hp-module-split">
            <div>
              <div className="hp-module-header">
                <div className="hp-module-title">Research</div>
              </div>
              <div className="hp-module-desc" style={{ marginTop: 16 }}>Building AI research agents is one of the better use cases we&apos;ve found. We built one that searches YouTube, Substack and other sources a couple of times a week on its own. It reads transcripts, pulls out the right information based on a brief, and builds a library over time. When something relevant comes up, it surfaces it.</div>
              <div className="hp-module-desc">It saves hours of reading and searching every week. We still need to read it ourselves. The robots haven&apos;t figured that bit out yet.</div>
            </div>
            <div className="hp-fox-visual">
              <Image src="/fox/fox-sideeye-right-nobg.png" alt="Fox — research" width={380} height={380} />
            </div>
          </div>
        </div>

        {/* BOOK CTA */}
        <div className="hp-mid-cta">
          <div className="hp-mid-cta-inner">
            <h3>The Fox Advantage is available for free.</h3>
            <p>The book is almost finished. Pick up a copy.</p>
            <Link href="/book" className="hp-big-btn">Get the book</Link>
          </div>
        </div>

        {/* ADVERTISING */}
        <div className="hp-module-section" id="mod-advertising">
          <div className="hp-module-header">
            <div className="hp-module-title">Advertising</div>
          </div>
          <div className="hp-module-split">
            <div className="hp-module-left">
              <div className="hp-module-desc">We built an agent with deep knowledge of how advertising works. The different influence models we often don&apos;t think about. The difference between salience and persuasion. What fame actually requires versus direct response. Which KPIs make sense for each type. The constraints and trade-offs that come with each approach. Brand-building versus activation and why they need different briefs.</div>
              <div className="hp-module-desc">With all of that built in, it coaches teams to make good decisions before the brief goes out the door. It forces them to clarify which influence model they&apos;re using, looks for contradictions, and helps marketing teams sharpen and crystallise what they want from their advertising partners.</div>
              <Link href="/brief-diagnostician" className="hp-try-btn">Try the brief diagnostician &rarr;</Link>
            </div>
            <div className="hp-module-right">
              <div className="hp-diagnosis-card">
                <div className="hp-dc-header">
                  <div className="hp-dc-label">core diagnosis</div>
                  <div className="hp-dc-diagnosis">&ldquo;Your brief is climbing all rungs of the ladder at once.&rdquo;</div>
                </div>
                <div className="hp-dc-section">
                  <div className="hp-dc-section-label">evidence</div>
                  <ul className="hp-dc-list">
                    <li>KPI mixes attention, attitude and sales from a single execution</li>
                    <li>Brief names demographics, not buying moments</li>
                    <li>Rational and emotional drivers treated as separate systems</li>
                  </ul>
                </div>
                <div className="hp-dc-collapse">
                  <div className="hp-dc-section-label">the collapse move</div>
                  <div className="hp-dc-collapse-text">&ldquo;You need salience built on actual purchase triggers, not demographic mail merges.&rdquo;</div>
                </div>
                <div className="hp-dc-caption">Marketing Influence Model Diagnostician — sample output</div>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL: PETER FIELD */}
        <div className="hp-testimonial-bar">
          <div className="hp-testimonial-bar-inner">
            <div className="hp-tbar-quote">&ldquo;I&apos;ve worked with Paul on a number of very successful projects over more than 5 years. His command of marketing science as well as his instincts for great thinking and ideas are, in my opinion, superb.&rdquo;</div>
            <div className="hp-tbar-attr"><strong>Peter Field</strong> — The Godfather of Effectiveness, Author of The Long and the Short of It</div>
          </div>
        </div>

        {/* MARKETING EFFECTIVENESS */}
        <div className="hp-module-section" id="mod-effectiveness">
          <div className="hp-module-split">
            <div>
              <div className="hp-module-header">
                <div className="hp-module-title">Marketing effectiveness</div>
              </div>
              <div className="hp-module-desc" style={{ marginTop: 16 }}>You can&apos;t manage a brand if you can&apos;t measure one. We built an AI agent to help marketing teams and the wider organisation understand which metrics matter and how they influence each other. Paste in whatever you&apos;re tracking and the pyramid sorts them into five levels, from activity at the base to commercial outcomes at the top. It shows where the gaps are and where you&apos;re heavy on vanity metrics with nothing connecting them to revenue.</div>
              <a href="https://runwithfoxes.com/coach" target="_blank" rel="noopener noreferrer" className="hp-try-btn">Try the metrics pyramid &rarr;</a>
            </div>
            <div>
              <div className="hp-metrics-pyramid">
                <div className="hp-mp-level hp-mp-1"><div className="hp-mp-shape">1</div><div className="hp-mp-label">Commercial outcomes</div></div>
                <div className="hp-mp-level hp-mp-2"><div className="hp-mp-shape">2</div><div className="hp-mp-label">Customer behaviour</div></div>
                <div className="hp-mp-level hp-mp-3"><div className="hp-mp-shape">3</div><div className="hp-mp-label">Memory metrics</div></div>
                <div className="hp-mp-level hp-mp-4"><div className="hp-mp-shape">4</div><div className="hp-mp-label">Comms response</div></div>
                <div className="hp-mp-level hp-mp-5"><div className="hp-mp-shape">5</div><div className="hp-mp-label">Activity + outputs</div></div>
                <div className="hp-mp-caption">The metrics pyramid — paste your metrics, see where the gaps are</div>
              </div>
            </div>
          </div>
        </div>

        {/* AD AGENT ENGINE */}
        <div className="hp-module-section" id="mod-ad-engine">
          <div className="hp-module-split">
            <div>
              <div className="hp-module-header">
                <div className="hp-module-title">Ad agent engine</div>
              </div>
              <div className="hp-module-desc" style={{ marginTop: 16 }}>We built an ad agent engine. Small teams can produce ads at speed that stay on brand and on message with very little effort, once it&apos;s set up. Setting up takes time if you care about the quality.</div>
              <div className="hp-module-desc">We care a lot about the quality. The consistency of the brand asset, the message, the tone, the fonts, the space around the logo, the transition from one frame to another. All the stuff that matters when you&apos;re putting your name on something.</div>
              <div className="hp-module-desc">What we like is the learning loop. The agents learn from the data from your winning ads to write and create the new ones. This is for sales activation, amplification of distinctive brand assets, performance ads. Brands still need to do the hard work on positioning, messaging and the work that creates your brand assets. The engine makes them work harder once they exist.</div>
            </div>
            <div style={{ paddingTop: 72 }}>
              <div className="hp-video-row-2">
                <div className="hp-video-container">
                  <video autoPlay muted playsInline>
                    <source src="/video/lottery-ad.mp4" type="video/mp4" />
                  </video>
                </div>
                <div className="hp-video-container">
                  <video autoPlay muted playsInline>
                    <source src="/video/6040-ad.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="hp-video-caption">Two ads built by the engine — fox character, chart data, headlines, all AI-generated</div>
            </div>
          </div>
        </div>

        {/* BRAND GUARDIAN */}
        <div className="hp-module-section" id="mod-brand-guardian">
          <div className="hp-module-split">
            <div>
              <div className="hp-module-header">
                <div className="hp-module-title">Brand guardian</div>
              </div>
              <div className="hp-module-desc" style={{ marginTop: 16 }}>We built an agent that helps marketing teams stay on brand 100% of the time. It can review documents, flag where they drift, and offer suggestions on how to make them better. In some cases it can create the materials itself, docs, emails, webpages, presentations, all consistent with the brand guidelines it&apos;s been trained on.</div>
            </div>
            <div>
              <div className="hp-video-container">
                <video autoPlay muted loop playsInline>
                  <source src="/video/brand-guidelines-scroll.mp4" type="video/mp4" />
                </video>
                <div className="hp-video-caption">Brand guidelines — built for AI, not just humans</div>
              </div>
            </div>
          </div>
        </div>

        {/* TESTIMONIAL: PAUL D'ARCY */}
        <div className="hp-testimonial-bar">
          <div className="hp-testimonial-bar-inner">
            <div className="hp-tbar-quote">&ldquo;Paul Dervan reported into me as Head of Brand when I was at Indeed. I have learned more from him than anyone else in my career.&rdquo;</div>
            <div className="hp-tbar-attr"><strong>Paul D&apos;Arcy</strong> — CMO, Moloco. Former CMO at Miro and Indeed</div>
          </div>
        </div>

        {/* EVENTS */}
        <div className="hp-module-section" id="mod-events">
          <div className="hp-module-header">
            <div className="hp-module-title">Events</div>
          </div>
          <div className="hp-module-split">
            <div className="hp-module-left">
              <div className="hp-module-desc">We built an agent that replaces the need for any event SaaS software. Give it the venue, the date, a few photos, and it builds everything you need to run the event. A landing page guests RSVP on. Confirmation and reminder emails you plug into HubSpot. QR codes for the door. A check-in scanner for staff on the night. A registration dashboard so you can see who&apos;s coming. Calendar invites that work in Outlook and Gmail. All of it deployed and live.</div>
              <div className="hp-module-desc">The whole thing takes minutes, not days. And if you&apos;re running lots of events, the agent clones from a template, rewrites all the copy for the new city and venue, swaps in the photos, deploys it, and creates the repo. Same brand, same quality, different event. You can recreate them over and over again at speed.</div>
              <div className="hp-module-desc">No Eventbrite. No Splash. No monthly subscription for a tool you use six times a year. Just an agent that builds the whole thing fresh each time, exactly the way you want it.</div>
            </div>
            <div className="hp-module-right">
              <div className="hp-screenshot-container">
                <Image src="/event-page-screenshot.png" alt="AI-generated event landing page" width={600} height={400} style={{ width: "100%", height: "auto" }} />
                <div className="hp-video-caption">Event landing page — built by an agent in minutes</div>
              </div>
            </div>
          </div>
        </div>

        {/* GROWTH TEAM */}
        <div className="hp-module-section" id="mod-growth">
          <div className="hp-module-split">
            <div>
              <div className="hp-module-header">
                <div className="hp-module-title">Growth team</div>
              </div>
              <div className="hp-module-desc" style={{ marginTop: 16 }}>We built an AI growth team. A copywriter, a growth exec and a content creator that can run email and LinkedIn campaigns, do the analysis and rewrite what isn&apos;t working. Between them they run and track campaigns end to end.</div>
              <div className="hp-module-desc">They learn as they go. They use the data from previous campaigns to write new emails, new ads, new headlines. The more they run, the better the output gets.</div>
              <div className="hp-module-desc">For companies that don&apos;t have growth teams, this is a good opportunity. What would normally need three full-time roles can be done in a couple of hours a week.</div>
            </div>
            <div className="hp-fox-visual">
              <Image src="/fox/fox-sideeye-right-nobg.png" alt="Fox — growth team" width={380} height={380} />
            </div>
          </div>
        </div>

        {/* TESTIMONIAL: DAMIAN DEVANEY */}
        <div className="hp-testimonial-bar">
          <div className="hp-testimonial-bar-inner">
            <div className="hp-tbar-quote">&ldquo;When in O2, Paul had the highest scores on people management across the entire organisation. He set the standard for excellent management of his team&apos;s performance and development.&rdquo;</div>
            <div className="hp-tbar-attr"><strong>Damian Devaney</strong> — Ex-CMO O2, Chair of Effies Ireland</div>
          </div>
        </div>

        {/* PROJECT MANAGER */}
        <div className="hp-module-section" id="mod-pm">
          <div className="hp-module-split">
            <div>
              <div className="hp-module-header">
                <div className="hp-module-title">Project manager</div>
              </div>
              <div className="hp-module-desc" style={{ marginTop: 16 }}>We built a project manager agent that reads your priorities, emails, calendar, client status and tasks, and gets you from &ldquo;just opened the laptop&rdquo; to &ldquo;I know what to do today&rdquo; in under two minutes. It shows you what matters, with a reason for each, and comes back with concrete proposals. Move a priority, add a task, park something, or no change.</div>
              <div className="hp-module-desc">It talks to the other agents through a shared briefing board so they don&apos;t cross wires.</div>
            </div>
            <div className="hp-fox-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/fox/fox-pm-nobg.png" alt="Fox — project manager" />
            </div>
          </div>
        </div>

      </div>

      {/* ==================== CLOSE ==================== */}
      <section className="hp-close-section">
        <div className="hp-close-inner">
          <h2>Build an <span className="hp-accent">unfair</span> advantage in marketing</h2>
          <Link href="/contact" className="hp-close-cta">Get in touch</Link>
        </div>
      </section>

      {/* ==================== BOTTOM BAR ==================== */}
      <div className="hp-bottom-bar" ref={bottomBarRef}>
        <a href="#">#top</a>
        <a href="#about">#about</a>
        <a href="#projects">/projects</a>
        <Link href="/book">/book</Link>
        <Link href="/contact" className="hp-cta-bar">get in touch</Link>
      </div>
    </>
  );
}
