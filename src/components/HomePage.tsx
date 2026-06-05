"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SubstackPost } from "@/lib/substack";

function LazyVideo({ src, className, loop }: { src: string; className?: string; loop?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { rootMargin: "200px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}>
      {visible && (
        <video className={className} autoPlay muted playsInline loop={loop}>
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

/* ===== Substack thought-leadership carousel - live feed, manual rotation only ===== */
function SubstackCarousel({ posts }: { posts: SubstackPost[] }) {
  const carRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [maxIdx, setMaxIdx] = useState(0);

  useEffect(() => {
    function measure() {
      const car = carRef.current, track = trackRef.current;
      if (!car || !track) return;
      const card = track.querySelector<HTMLElement>(".hpx-wcard");
      const s = card ? card.offsetWidth + 24 : 0;
      const vis = s ? Math.max(1, Math.round(car.offsetWidth / s)) : 1;
      const mi = Math.max(0, posts.length - vis);
      setStep(s);
      setMaxIdx(mi);
      setIdx((i) => Math.min(i, mi));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [posts.length]);

  if (!posts.length) return null;

  const clamped = Math.min(idx, maxIdx);
  const next = () => setIdx((i) => (i >= maxIdx ? 0 : i + 1));
  const prev = () => setIdx((i) => (i <= 0 ? maxIdx : i - 1));

  return (
    <div className="hpx-writing">
      <div className="hpx-writing-head">
        <a className="hpx-writing-more" href="https://runwithfoxes.substack.com/" target="_blank" rel="noopener noreferrer">View newsletter &rarr;</a>
      </div>
      <div className="hpx-wcar" ref={carRef}>
        <div className="hpx-wtrack" ref={trackRef} style={{ transform: `translateX(-${clamped * step}px)` }}>
          {posts.map((p) => (
            <a key={p.slug} className="hpx-wcard" href={p.link} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {p.image ? <img className="hpx-thumb" src={p.image} alt="" /> : <span className="hpx-thumb" />}
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <div className="hpx-wmeta"><span className="hpx-pin">&#9776;</span>{p.date.toUpperCase()} &middot; Paul Dervan</div>
            </a>
          ))}
        </div>
      </div>
      <div className="hpx-wctrls">
        <button className="hpx-warrow" onClick={prev} aria-label="Previous">&lsaquo;</button>
        <button className="hpx-warrow" onClick={next} aria-label="Next">&rsaquo;</button>
        <div className="hpx-wdots">
          {Array.from({ length: maxIdx + 1 }).map((_, i) => (
            <span key={i} className={`hpx-wdot${i === clamped ? " on" : ""}`} onClick={() => setIdx(i)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===== Testimonials - slim rotating band, manual, fixed height ===== */
const QUOTES = [
  { q: "I've worked with Paul on a number of very successful projects over more than 5 years. His command of marketing science as well as his instincts for great thinking and ideas are, in my opinion, superb.", a: "Peter Field", r: "The Godfather of Effectiveness, Author of The Long and the Short of It" },
  { q: "Paul Dervan reported into me as Head of Brand when I was at Indeed. I have learned more from him than anyone else in my career.", a: "Paul D'Arcy", r: "CMO, Moloco. Former CMO at Miro and Indeed" },
  { q: "When in O2, Paul had the highest scores on people management across the entire organisation. He set the standard for excellent management of his team's performance and development.", a: "Damian Devaney", r: "Ex-CMO O2, Chair of Effies Ireland" },
  { q: "Paul is a strategic thinker, with world class creative capabilities. So he knows not just what to do, but how to do it.", a: "Jonnie Cahill", r: "SVP and CMO International Foods, PepsiCo" },
];

function Testimonials() {
  const [qi, setQi] = useState(0);
  const t = QUOTES[qi];
  return (
    <div className="hpx-quotes">
      <div className="hpx-quotes-row">
        <button className="hpx-qarrow" onClick={() => setQi((i) => (i - 1 + QUOTES.length) % QUOTES.length)} aria-label="Previous">&lsaquo;</button>
        <div className="hpx-qbody">
          <div className="hpx-qquote">&ldquo;{t.q}&rdquo;</div>
          <div className="hpx-qattr"><strong>{t.a}</strong> &middot; {t.r}</div>
        </div>
        <button className="hpx-qarrow" onClick={() => setQi((i) => (i + 1) % QUOTES.length)} aria-label="Next">&rsaquo;</button>
      </div>
      <div className="hpx-qdots">
        {QUOTES.map((_, i) => (
          <span key={i} className={`hpx-qdot${i === qi ? " on" : ""}`} onClick={() => setQi(i)} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage({ posts }: { posts: SubstackPost[] }) {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = useCallback((id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const isOpen = useCallback((id: string) => expanded.has(id), [expanded]);

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
    <div className="hp-root">
      <div id="top" />

      <nav className="hp-nav" ref={navRef} id="topNav">
        <a href="#heroWrapper" className="hp-nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          /<span>Run</span>withfoxes
        </a>
        <div className="hp-nav-links">
          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">/tools &#9662;</span>
            <div className="hp-mega">
              <div className="hp-mega-inner">
                <div className="hp-mega-col">
                  <div className="hp-mega-label">MODULES</div>
                  <a href="#mod-effectiveness">Marketing effectiveness</a>
                  <a href="#mod-segmentation">Segmentation</a>
                  <a href="#mod-brand-strategy">Brand strategy</a>
                  <a href="#mod-advertising">Advertising</a>
                  <a href="#mod-studio">Studio</a>
                  <a href="#mod-business-development">Business development</a>
                  <a href="#mod-research">Research and insights</a>
                </div>
              </div>
            </div>
          </div>

          <div className="hp-dropdown-wrap">
            <span className="hp-dropdown-trigger">/previous &#9662;</span>
            <div className="hp-mega">
              <div className="hp-projects-dropdown">
                <div className="hp-pd-label">CASE STUDIES</div>
                <Link href="/millionaire-raffle">Millionaire Raffle</Link>
                <Link href="/marketer-of-the-year">Marketer of the Year</Link>
                <Link href="/48">48</Link>
                <Link href="/run-with-foxes">Run with Foxes (book 1)</Link>
              </div>
            </div>
          </div>

          <Link href="/book">/book</Link>
          <Link href="/contact" className="hp-nav-cta">/contact</Link>
        </div>
      </nav>

      <div className="hp-hero-wrapper" ref={heroRef} id="heroWrapper">
        <video
          className="hp-hero-video hp-hero-video-landscape"
          autoPlay
          muted
          playsInline
          poster="/video/fox-tarantino-trunk-poster.jpg"
        >
          <source src="/video/fox-tarantino-trunk.mp4" type="video/mp4" />
        </video>
        <video
          className="hp-hero-video hp-hero-video-portrait"
          autoPlay
          muted
          playsInline
          poster="/video/fox-tarantino-trunk-portrait-poster.jpg"
        >
          <source src="/video/fox-tarantino-trunk-portrait.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hp-hero-text">
        <h1>Build an <span className="hpx-hl">unfair advantage</span> in marketing</h1>
        <div className="hpx-hero-desc">We turn repeated marketing work into practical AI systems: brand strategists, ad builders, brand guardians, campaign managers, performance analysts, content engines and reporting systems.</div>
      </div>

      {/* BIO + PHOTO (magazine wrap) and contact-CTA strip */}
      <section className="hpx-about" id="about">
        <div className="hpx-wrap">
          <div className="hpx-bio">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hpx-bio-photo" src="/Paul_photo.jpg" alt="Paul Dervan" />
            <div className="hpx-bio-name">/Paul Dervan</div>
            <p>Twenty years in brand. Head of brand at O2 Ireland, then CMO at the National Lottery. Head of brand at Indeed and Miro, both global roles. Ireland&apos;s Marketer of the Year in 2022.</p>
            <p>Trained by Peter Field, one half of Binet and Field. That obsession with effectiveness runs through everything here.</p>
            <p>Run with Foxes is the consultancy. We work with teams to bring twenty years of brand thinking together with AI, so they get faster without losing quality.</p>
          </div>
          <div className="hpx-metastrip">
            <span className="hpx-ctas-label">Contact us to</span>
            <Link className="hpx-mod-cta" href="/contact"><span className="hpx-fdot"></span>\build it for you</Link>
            <Link className="hpx-mod-cta" href="/contact"><span className="hpx-fdot"></span>\work alongside you</Link>
            <Link className="hpx-mod-cta" href="/contact"><span className="hpx-fdot"></span>\train your team</Link>
          </div>
        </div>
      </section>

      <div className="cl-modules-wrap" ref={modulesRef}>

        {/* THOUGHT-LEADERSHIP CAROUSEL (live Substack feed) */}
        <div className="hpx-wrap">
          <SubstackCarousel posts={posts} />
        </div>

        {/* MODULES INTRO */}
        <div className="hpx-wrap hpx-intro">
          <h2 className="hpx-intro-h2">Where can <span className="hpx-hl">AI</span> be built into marketing?</h2>
          <p className="hpx-intro-p">Below are the places we most often build AI into marketing work. A marketing team of two or three, with the right systems, can do work that used to need a department.</p>
        </div>

        {/* NESTED ACCORDION */}
        <div className="hpx-wrap">
          <div className="hpx-mods">

            {/* MODULE 1: MARKETING EFFECTIVENESS */}
            <div className={`hpx-mitem${isOpen('mod-effectiveness') ? ' open' : ''}`} id="mod-effectiveness">
              <button className="hpx-mrow" onClick={() => toggle('mod-effectiveness')}>
                <span className="hpx-ic">&#9656;</span>
                <span className="hpx-mmid"><span className="hpx-mname">Marketing effectiveness</span><span className="hpx-mdesc">Which metrics matter, and how they move each other</span></span>
                <span className="hpx-mright"><span className="hpx-mcount">4 examples</span><span className="hpx-chev">&#9656;</span></span>
              </button>
              {isOpen('mod-effectiveness') && (
                <div className="hpx-mdetail">
                  <div className="hpx-mintro"><p>You can&apos;t manage a brand if you can&apos;t measure one. We help marketing teams and the wider organisation understand which metrics matter and how they influence each other. We train teams on marketing effectiveness and then build marketing effectiveness tools, audits, scorecards and dashboards using AI and hand them over.</p></div>
                  <div className="hpx-toolslabel">Examples</div>
                  <div className="hpx-tools">

                    <div className={`hpx-titem${isOpen('eff-1') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('eff-1')}><span className="hpx-tname">Measurement training</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('eff-1') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 300, height: 'auto' }}>
                                <rect x="88" y="4" width="84" height="18" fill="#355E4C"/>
                                <rect x="68" y="24" width="124" height="18" fill="#4A7A62"/>
                                <rect x="48" y="44" width="164" height="18" fill="#F47521"/>
                                <rect x="28" y="64" width="204" height="18" fill="#D4A574"/>
                                <rect x="8" y="84" width="244" height="18" fill="#E8DDD0"/>
                                <text x="130" y="16" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#fff">Commercial</text>
                                <text x="130" y="36" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#fff">Behaviour</text>
                                <text x="130" y="56" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#fff">Memory</text>
                                <text x="130" y="76" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#fff">Marketing comms</text>
                                <text x="130" y="96" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="7" fill="#8A8A85">Marketing activity</text>
                              </svg>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">This training trains marketers on five categories of marketing measurements and helps marketers understand the relationships between each of these metrics.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('eff-2') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('eff-2')}><span className="hpx-tname">Metrics audit</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('eff-2') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-mini-pyramid">
                                <div className="cl-mp-row"><span className="cl-mp-label">Commercial</span><div className="cl-mp-bar cl-mp-1"><span>Revenue</span><span>Margin</span></div></div>
                                <div className="cl-mp-row"><span className="cl-mp-label">Behaviour</span><div className="cl-mp-bar cl-mp-2"><span>Pipeline</span><span>Win rate</span><span>CLV</span></div></div>
                                <div className="cl-mp-row"><span className="cl-mp-label">Memory</span><div className="cl-mp-bar cl-mp-3"><em>None tracked</em></div></div>
                                <div className="cl-mp-row"><span className="cl-mp-label">Comms</span><div className="cl-mp-bar cl-mp-4"><span>CPC</span><span>CTR</span><span>Conv.</span><span>CPA</span><span>ROAS</span></div></div>
                                <div className="cl-mp-row"><span className="cl-mp-label">Activity</span><div className="cl-mp-bar cl-mp-5"><span>Impr.</span><span>Reach</span><span>Sessions</span><span>Posts</span></div></div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">Paste in whatever you track. The audit sorts them into five levels and shows the gaps.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('eff-3') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('eff-3')}><span className="hpx-tname">Brand scorecard</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('eff-3') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-scorecard">
                                <div className="cl-sc-level-row">
                                  <div className="cl-sc-level-label cl-sc-l1">Commercial outcomes</div>
                                  <div className="cl-sc-metrics">
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">Revenue growth</span><span className="cl-sc-val cl-sc-ok">+12%</span><span className="cl-sc-trend cl-sc-ok">&#9650; 4pp vs Q1</span><span className="cl-sc-tag cl-sc-tag-ok">On track</span></div>
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">Market share</span><span className="cl-sc-val cl-sc-ok">14.2%</span><span className="cl-sc-trend cl-sc-ok">&#9650; 0.8pp</span><span className="cl-sc-tag cl-sc-tag-ok">On track</span></div>
                                  </div>
                                </div>
                                <div className="cl-sc-level-row">
                                  <div className="cl-sc-level-label cl-sc-l2">Customer behaviour</div>
                                  <div className="cl-sc-metrics">
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">Win rate</span><span className="cl-sc-val cl-sc-ok">28%</span><span className="cl-sc-trend cl-sc-ok">&#9650; 3pp vs Q1</span><span className="cl-sc-tag cl-sc-tag-ok">On track</span></div>
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">Retention</span><span className="cl-sc-val cl-sc-watch">84%</span><span className="cl-sc-trend cl-sc-watch">&#9654; 0pp</span><span className="cl-sc-tag cl-sc-tag-watch">Watch</span></div>
                                  </div>
                                </div>
                                <div className="cl-sc-level-row">
                                  <div className="cl-sc-level-label cl-sc-l3">Memory metrics</div>
                                  <div className="cl-sc-metrics">
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">Aided awareness</span><span className="cl-sc-val cl-sc-ok">73%</span><span className="cl-sc-trend cl-sc-ok">&#9650; 4pp vs Q1</span><span className="cl-sc-tag cl-sc-tag-ok">On track</span></div>
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">Consideration</span><span className="cl-sc-val cl-sc-watch">31%</span><span className="cl-sc-trend cl-sc-watch">&#9654; 0pp</span><span className="cl-sc-tag cl-sc-tag-watch">Watch</span></div>
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">Mental availability</span><span className="cl-sc-val cl-sc-concern">2.1</span><span className="cl-sc-trend cl-sc-concern">&#9660; 0.3</span><span className="cl-sc-tag cl-sc-tag-concern">Needs attention</span></div>
                                  </div>
                                </div>
                                <div className="cl-sc-level-row">
                                  <div className="cl-sc-level-label cl-sc-l4">Comms response</div>
                                  <div className="cl-sc-metrics">
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">CTR</span><span className="cl-sc-val cl-sc-ok">2.1%</span><span className="cl-sc-trend cl-sc-ok">&#9650; 0.4pp</span><span className="cl-sc-tag cl-sc-tag-ok">On track</span></div>
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">CPA</span><span className="cl-sc-val cl-sc-ok">&euro;42</span><span className="cl-sc-trend cl-sc-ok">&#9650; &minus;&euro;6</span><span className="cl-sc-tag cl-sc-tag-ok">On track</span></div>
                                  </div>
                                </div>
                                <div className="cl-sc-level-row">
                                  <div className="cl-sc-level-label cl-sc-l5">Activity outputs</div>
                                  <div className="cl-sc-metrics">
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">Reach</span><span className="cl-sc-val cl-sc-ok">1.2M</span><span className="cl-sc-trend cl-sc-ok">&#9650; 18%</span><span className="cl-sc-tag cl-sc-tag-ok">On track</span></div>
                                    <div className="cl-sc-metric-item"><span className="cl-sc-name">SOV</span><span className="cl-sc-val cl-sc-watch">8.4%</span><span className="cl-sc-trend cl-sc-watch">&#9654; 0pp</span><span className="cl-sc-tag cl-sc-tag-watch">Watch</span></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">The scorecard pulls from the metrics audit. It shows what matters, how it&apos;s tracking, and where to focus. Built for the leadership team, not just marketing.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('eff-4') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('eff-4')}><span className="hpx-tname">Brand / activation split</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('eff-4') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-split-layout">
                            <div className="cl-split-tables">
                              <div className="cl-split-col">
                                <div className="cl-split-col-header cl-split-col-header-activation">Activation</div>
                                <div className="cl-split-col-item">Google Ads Search <span className="cl-split-col-budget">&euro;80,000</span></div>
                                <div className="cl-split-col-item">LinkedIn Sponsored Content <span className="cl-split-col-budget">&euro;60,000</span></div>
                                <div className="cl-split-col-item">Blog + SEO <span className="cl-split-col-budget">&euro;45,000</span></div>
                                <div className="cl-split-col-item">Trade show booths <span className="cl-split-col-budget">&euro;40,000</span></div>
                                <div className="cl-split-col-item">Gated webinars <span className="cl-split-col-budget">&euro;35,000</span></div>
                                <div className="cl-split-col-item">Email nurture sequences <span className="cl-split-col-budget">&euro;30,000</span></div>
                                <div className="cl-split-col-item">YouTube pre-roll (15s) <span className="cl-split-col-budget">&euro;27,000</span></div>
                                <div className="cl-split-col-item">Case studies <span className="cl-split-col-budget">&euro;18,000</span></div>
                                <div className="cl-split-col-footer">&euro;335,000</div>
                              </div>
                              <div className="cl-split-col">
                                <div className="cl-split-col-header cl-split-col-header-brand">Brand building</div>
                                <div className="cl-split-col-item">TV sponsorship (30s, broad) <span className="cl-split-col-budget">&euro;45,000</span></div>
                                <div className="cl-split-col-item">Cinema (emotional, captive) <span className="cl-split-col-budget">&euro;20,000</span></div>
                                <div className="cl-split-col-item cl-split-col-empty">&nbsp;</div>
                                <div className="cl-split-col-item cl-split-col-empty">&nbsp;</div>
                                <div className="cl-split-col-item cl-split-col-empty">&nbsp;</div>
                                <div className="cl-split-col-item cl-split-col-empty">&nbsp;</div>
                                <div className="cl-split-col-item cl-split-col-empty">&nbsp;</div>
                                <div className="cl-split-col-item cl-split-col-empty">&nbsp;</div>
                                <div className="cl-split-col-footer">&euro;65,000</div>
                              </div>
                            </div>
                            <div className="cl-split-chart">
                              <div className="cl-split-chart-bars">
                                <div className="cl-split-chart-bar-wrap">
                                  <div className="cl-split-chart-value">84%</div>
                                  <div className="cl-split-chart-bar cl-split-chart-bar-activation" style={{ height: '84%' }}></div>
                                  <div className="cl-split-chart-label">Activation</div>
                                </div>
                                <div className="cl-split-chart-bar-wrap">
                                  <div className="cl-split-chart-value">16%</div>
                                  <div className="cl-split-chart-bar cl-split-chart-bar-brand" style={{ height: '16%' }}></div>
                                  <div className="cl-split-chart-label">Brand</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* MODULE 2: SEGMENTATION */}
            <div className={`hpx-mitem${isOpen('mod-segmentation') ? ' open' : ''}`} id="mod-segmentation">
              <button className="hpx-mrow" onClick={() => toggle('mod-segmentation')}>
                <span className="hpx-ic">&#9656;</span>
                <span className="hpx-mmid"><span className="hpx-mname">Segmentation</span><span className="hpx-mdesc">Proper segmentation, with the maths actually run</span></span>
                <span className="hpx-mright"><span className="hpx-mcount">4 examples</span><span className="hpx-chev">&#9656;</span></span>
              </button>
              {isOpen('mod-segmentation') && (
                <div className="hpx-mdetail">
                  <div className="hpx-mintro"><p>Segmentation matters, but pseudo-science segmentation is dangerous. We&apos;ve combined the rigour of empirical theory with AI to run the math to help build proper customer segmentation, including similarity analysis, correlation matrix, scatter plots, penetration adjustment, usage bias and purchase triggers.</p></div>
                  <div className="hpx-toolslabel">Examples</div>
                  <div className="hpx-tools">

                    <div className={`hpx-titem${isOpen('seg-what') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('seg-what')}><span className="hpx-tname">What segmentation is</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('seg-what') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <svg viewBox="0 0 440 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 420, height: 'auto' }}>
                                <line x1="40" y1="260" x2="300" y2="260" stroke="#E0E0DC" strokeWidth="0.5"/>
                                <line x1="40" y1="260" x2="40" y2="20" stroke="#E0E0DC" strokeWidth="0.5"/>
                                <text x="170" y="285" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">Purchase frequency</text>
                                <text x="16" y="140" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85" transform="rotate(-90,16,140)">Basket value</text>
                                <rect x="64" y="62" width="46" height="42" fill="none" stroke="#1A3A4E" strokeOpacity="0.35" strokeWidth="0.75"/>
                                <rect x="208" y="64" width="50" height="46" fill="none" stroke="#3A7CA5" strokeOpacity="0.4" strokeWidth="0.75"/>
                                <rect x="188" y="184" width="50" height="46" fill="none" stroke="#F47521" strokeOpacity="0.45" strokeWidth="0.75"/>
                                <polygon points="76,70 80,74 76,78 72,74" fill="#1A3A4E"/>
                                <polygon points="94,68 98,72 94,76 90,72" fill="#1A3A4E"/>
                                <polygon points="82,82 86,86 82,90 78,86" fill="#1A3A4E"/>
                                <polygon points="98,82 102,86 98,90 94,86" fill="#1A3A4E"/>
                                <polygon points="72,84 76,88 72,92 68,88" fill="#1A3A4E"/>
                                <polygon points="90,90 94,94 90,98 86,94" fill="#1A3A4E"/>
                                <circle cx="218" cy="78" r="3.7" fill="#3A7CA5"/>
                                <circle cx="234" cy="76" r="3.7" fill="#3A7CA5"/>
                                <circle cx="224" cy="90" r="3.7" fill="#3A7CA5"/>
                                <circle cx="242" cy="86" r="3.7" fill="#3A7CA5"/>
                                <circle cx="248" cy="78" r="3.7" fill="#3A7CA5"/>
                                <circle cx="222" cy="100" r="3.7" fill="#3A7CA5"/>
                                <circle cx="238" cy="98" r="3.7" fill="#3A7CA5"/>
                                <polygon points="200,192 204,200 196,200" fill="#F47521"/>
                                <polygon points="216,190 220,198 212,198" fill="#F47521"/>
                                <polygon points="206,204 210,212 202,212" fill="#F47521"/>
                                <polygon points="224,202 228,210 220,210" fill="#F47521"/>
                                <polygon points="196,208 200,216 192,216" fill="#F47521"/>
                                <polygon points="214,214 218,222 210,222" fill="#F47521"/>
                                <polygon points="228,208 232,216 224,216" fill="#F47521"/>
                                <polygon points="334,116 338,120 334,124 330,120" fill="#1A3A4E"/>
                                <text x="348" y="123" fontFamily="JetBrains Mono" fontSize="11" fill="#5A5A55">Cluster 1</text>
                                <circle cx="334" cy="142" r="3.7" fill="#3A7CA5"/>
                                <text x="348" y="145" fontFamily="JetBrains Mono" fontSize="11" fill="#5A5A55">Cluster 2</text>
                                <polygon points="334,160 338,168 330,168" fill="#F47521"/>
                                <text x="348" y="167" fontFamily="JetBrains Mono" fontSize="11" fill="#5A5A55">Cluster 3</text>
                              </svg>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">Segmentation is the choice of who to go after. It groups customers who genuinely behave differently, decides which groups are worth pursuing, and shapes the product, proposition and value so they fit that group and appeal to it. Done well it lifts efficiency, conversion and retention. A segment is only worth having if it passes four tests: we can measure it, it is big enough to matter, it genuinely behaves differently, and we can reach it.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('seg-holds') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('seg-holds')}><span className="hpx-tname">What holds up</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('seg-holds') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div style={{ display: 'grid', gridTemplateColumns: '94px repeat(4, 1fr)', columnGap: 6, rowGap: 9, alignItems: 'center', fontFamily: 'var(--mono)' }}>
                                <span></span>
                                {['Meas.', 'Subst.', 'Diff.', 'Access.'].map((h) => (
                                  <span key={h} style={{ fontSize: 8, color: '#8A8A85', textAlign: 'center', letterSpacing: '0.02em' }}>{h}</span>
                                ))}
                                {[
                                  { t: 'Behavioural', p: [1, 1, 1, 1] },
                                  { t: 'Value-based', p: [1, 1, 1, 1] },
                                  { t: 'Occasion', p: [1, 1, 1, 1] },
                                  { t: 'Geographic', p: [1, 1, 1, 1] },
                                  { t: 'Psychographic', p: [1, 1, 0, 1] },
                                  { t: 'Personality', p: [1, 1, 0, 1] },
                                  { t: 'Lifestyle', p: [1, 1, 0, 1] },
                                ].flatMap((r, ri) => [
                                  <span key={`l${ri}`} style={{ fontSize: 11, color: 'var(--text)', textAlign: 'right' }}>{r.t}</span>,
                                  ...r.p.map((v, i) => (
                                    <span key={`c${ri}-${i}`} style={{ justifySelf: 'center', width: 10, height: 10, boxSizing: 'border-box', background: v ? '#1A3A4E' : 'transparent', border: v ? 'none' : '1px solid #C8C8C4' }} />
                                  )),
                                ])}
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">There are different ways to segment: by behaviour, by value, by the occasion someone is buying for, and more. Some hold up better than others once you run the numbers. We put each one through the same four tests before we trust it, so the groups we act on are real, not assumed.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('seg-1') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('seg-1')}><span className="hpx-tname">Similarity analysis</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('seg-1') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-sim-bars">
                                <div className="cl-sim-row"><span className="cl-sim-label">Aspirational</span><div className="cl-sim-track"><div className="cl-sim-bar" style={{ width: '96%', background: '#1A3A4E' }}></div></div><span className="cl-sim-val">96%</span></div>
                                <div className="cl-sim-row"><span className="cl-sim-label">Value seekers</span><div className="cl-sim-track"><div className="cl-sim-bar" style={{ width: '94%', background: '#1A3A4E' }}></div></div><span className="cl-sim-val">94%</span></div>
                                <div className="cl-sim-row"><span className="cl-sim-label">Traditionalists</span><div className="cl-sim-track"><div className="cl-sim-bar" style={{ width: '93%', background: '#1A3A4E' }}></div></div><span className="cl-sim-val">93%</span></div>
                                <div className="cl-sim-row"><span className="cl-sim-label">Experimenters</span><div className="cl-sim-track"><div className="cl-sim-bar" style={{ width: '91%', background: '#3A7CA5' }}></div></div><span className="cl-sim-val">91%</span></div>
                                <div className="cl-sim-row"><span className="cl-sim-label">Convenience</span><div className="cl-sim-track"><div className="cl-sim-bar" style={{ width: '89%', background: '#3A7CA5' }}></div></div><span className="cl-sim-val">89%</span></div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">We test what each segment wants from brands. If they all want the same things, they are not different segments.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('seg-2') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('seg-2')}><span className="hpx-tname">Scatter plots</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('seg-2') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 360, height: 'auto' }}>
                                <line x1="40" y1="260" x2="300" y2="260" stroke="#E0E0DC" strokeWidth="0.5"/>
                                <line x1="40" y1="260" x2="40" y2="20" stroke="#E0E0DC" strokeWidth="0.5"/>
                                <line x1="40" y1="260" x2="300" y2="20" stroke="#E0E0DC" strokeWidth="1" strokeDasharray="4,3"/>
                                <text x="170" y="285" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">Base score</text>
                                <text x="16" y="140" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85" transform="rotate(-90,16,140)">Segment score</text>
                                <text x="290" y="36" fontFamily="JetBrains Mono" fontSize="8" fill="#8A8A85">same</text>
                                <circle cx="78" cy="228" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="95" cy="210" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="112" cy="198" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="130" cy="175" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="145" cy="162" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="158" cy="145" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="175" cy="130" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="190" cy="118" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="205" cy="100" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="218" cy="88" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="232" cy="78" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="250" cy="58" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="102" cy="202" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="140" cy="168" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="168" cy="142" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="198" cy="108" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="228" cy="82" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="260" cy="52" r="4" fill="#3A7CA5" opacity="0.6"/>
                                <circle cx="120" cy="178" r="4" fill="#F47521" opacity="0.8"/>
                                <circle cx="200" cy="82" r="4" fill="#F47521" opacity="0.8"/>
                              </svg>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">Each dot is a brand attribute. Dots on the diagonal line score the same as the base. Dots off the line are where the segment genuinely differs. The orange dots are the attributes worth investigating.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* MODULE 3: BRAND STRATEGY */}
            <div className={`hpx-mitem${isOpen('mod-brand-strategy') ? ' open' : ''}`} id="mod-brand-strategy">
              <button className="hpx-mrow" onClick={() => toggle('mod-brand-strategy')}>
                <span className="hpx-ic">&#9656;</span>
                <span className="hpx-mmid"><span className="hpx-mname">Brand strategy</span><span className="hpx-mdesc">Positioning, messaging, mental availability, assets</span></span>
                <span className="hpx-mright"><span className="hpx-mcount">6 examples</span><span className="hpx-chev">&#9656;</span></span>
              </button>
              {isOpen('mod-brand-strategy') && (
                <div className="hpx-mdetail">
                  <div className="hpx-mintro"><p>Brand strategy covers a bunch of areas: positioning, messaging frameworks, mental availability, customer journey mapping, brand guidelines development, distinctive brand assets. We use a number of AI tools and agents and skills to help do brand strategy at a really high quality at speed.</p></div>
                  <div className="hpx-toolslabel">Examples</div>
                  <div className="hpx-tools">

                    <div className={`hpx-titem${isOpen('brand-1') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('brand-1')}><span className="hpx-tname">Competitor positioning map</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('brand-1') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-comp-map">
                                <div className="cl-comp-map-axis" style={{ left: '50%', top: -18, transform: 'translateX(-50%)' }}>TECHNOLOGY-LED</div>
                                <div className="cl-comp-map-axis" style={{ left: '50%', bottom: -22, transform: 'translateX(-50%)' }}>PEOPLE-LED</div>
                                <div className="cl-comp-map-axis" style={{ left: -70, top: '50%', transform: 'rotate(-90deg) translateX(-50%)', transformOrigin: 'center' }}>LOCAL</div>
                                <div className="cl-comp-map-axis" style={{ right: -50, top: '50%', transform: 'rotate(90deg) translateX(50%)', transformOrigin: 'center' }}>GLOBAL</div>
                                <div className="cl-comp-map-line" style={{ left: '50%', top: 0, bottom: 0, borderLeft: '1px dashed #E0E0DC' }}></div>
                                <div className="cl-comp-map-line" style={{ top: '50%', left: 0, right: 0, borderTop: '1px dashed #E0E0DC' }}></div>
                                <div className="cl-comp-map-dot" style={{ background: '#C0392B', left: '82%', top: '15%' }}></div>
                                <div className="cl-comp-map-label" style={{ left: '82%', top: '5%' }}>Competitor A</div>
                                <div className="cl-comp-map-dot" style={{ background: '#E67E22', left: '75%', top: '22%' }}></div>
                                <div className="cl-comp-map-label" style={{ left: '75%', top: '12%' }}>Competitor B</div>
                                <div className="cl-comp-map-dot" style={{ background: '#2980B9', left: '78%', top: '42%' }}></div>
                                <div className="cl-comp-map-label" style={{ left: '78%', top: '32%' }}>Competitor C</div>
                                <div className="cl-comp-map-dot" style={{ background: '#355E4C', left: '38%', top: '35%' }}></div>
                                <div className="cl-comp-map-label" style={{ left: '38%', top: '25%', color: '#355E4C' }}>Your brand</div>
                                <div className="cl-comp-map-dot" style={{ background: '#8E44AD', left: '65%', top: '60%' }}></div>
                                <div className="cl-comp-map-label" style={{ left: '65%', top: '50%' }}>Competitor D</div>
                                <div className="cl-comp-map-dot" style={{ background: '#F47521', left: '22%', top: '75%' }}></div>
                                <div className="cl-comp-map-label" style={{ left: '22%', top: '65%' }}>Competitor E</div>
                                <div className="cl-comp-map-dot" style={{ background: '#D4A017', left: '15%', top: '85%' }}></div>
                                <div className="cl-comp-map-label" style={{ left: '15%', top: '75%' }}>Competitor F</div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">We research competitor positions across different dimensions, plot the map, and find the white space. The axes come from the category, not a template.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('brand-2') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('brand-2')}><span className="hpx-tname">Mental availability</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('brand-2') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-dba-chart-wrap">
                                <div className="cl-dba-chart-title">Mental availability metrics (4 waves)</div>
                                <div className="cl-dba-chart">
                                  <svg viewBox="0 0 640 260" xmlns="http://www.w3.org/2000/svg">
                                    <line x1="50" y1="30" x2="520" y2="30" stroke="#E0E0DC" strokeWidth="0.5"/>
                                    <line x1="50" y1="85" x2="520" y2="85" stroke="#E0E0DC" strokeWidth="0.5"/>
                                    <line x1="50" y1="140" x2="520" y2="140" stroke="#E0E0DC" strokeWidth="0.5"/>
                                    <line x1="50" y1="195" x2="520" y2="195" stroke="#E0E0DC" strokeWidth="0.5"/>
                                    <text x="42" y="34" textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">50%</text>
                                    <text x="42" y="89" textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">37%</text>
                                    <text x="42" y="144" textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">25%</text>
                                    <text x="42" y="199" textAnchor="end" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">12%</text>
                                    <text x="50" y="240" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">Wave 1</text>
                                    <text x="207" y="240" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">Wave 2</text>
                                    <text x="363" y="240" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">Wave 3</text>
                                    <text x="520" y="240" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="#8A8A85">Wave 4</text>
                                    <polyline points="50,90.8 207,75.6 363,60.4 520,41.4" fill="none" stroke="#1A3A4E" strokeWidth="2"/>
                                    <circle cx="50" cy="90.8" r="3" fill="#1A3A4E"/><circle cx="207" cy="75.6" r="3" fill="#1A3A4E"/><circle cx="363" cy="60.4" r="3" fill="#1A3A4E"/><circle cx="520" cy="41.4" r="3" fill="#1A3A4E"/>
                                    <text x="528" y="45" fontFamily="JetBrains Mono" fontSize="11" fontWeight="300" fill="#1A3A4E">47%</text>
                                    <polyline points="50,151.6 207,140.2 363,128.8 520,113.6" fill="none" stroke="#3A7CA5" strokeWidth="2"/>
                                    <circle cx="50" cy="151.6" r="3" fill="#3A7CA5"/><circle cx="207" cy="140.2" r="3" fill="#3A7CA5"/><circle cx="363" cy="128.8" r="3" fill="#3A7CA5"/><circle cx="520" cy="113.6" r="3" fill="#3A7CA5"/>
                                    <text x="528" y="117" fontFamily="JetBrains Mono" fontSize="11" fontWeight="300" fill="#3A7CA5">28%</text>
                                    <polyline points="50,121.2 207,106 363,90.8 520,71.8" fill="none" stroke="#F47521" strokeWidth="2"/>
                                    <circle cx="50" cy="121.2" r="3" fill="#F47521"/><circle cx="207" cy="106" r="3" fill="#F47521"/><circle cx="363" cy="90.8" r="3" fill="#F47521"/><circle cx="520" cy="71.8" r="3" fill="#F47521"/>
                                    <text x="528" y="75" fontFamily="JetBrains Mono" fontSize="11" fontWeight="300" fill="#F47521">3.1</text>
                                  </svg>
                                </div>
                                <div className="cl-dba-chart-legend">
                                  <div className="cl-dba-legend-item"><span className="cl-dba-legend-swatch" style={{ background: '#1A3A4E' }}></span>MPen (mental penetration)</div>
                                  <div className="cl-dba-legend-item"><span className="cl-dba-legend-swatch" style={{ background: '#3A7CA5' }}></span>MMS (mental market share)</div>
                                  <div className="cl-dba-legend-item"><span className="cl-dba-legend-swatch" style={{ background: '#F47521' }}></span>NS (network size)</div>
                                </div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">We use AI to measure and analyse mental availability: mental penetration, mental market share, and network size across buying situations.</div>
                              <a className="cl-acc-detail-link" href="https://runwithfoxes.substack.com/p/what-is-mental-availability-and-why" target="_blank" rel="noopener noreferrer">Read: What is Mental Availability and why does it matter? &rarr;</a>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('brand-3') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('brand-3')}><span className="hpx-tname">Messaging framework</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('brand-3') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <LazyVideo src="/video/messaging-framework-scroll.mp4" loop className="cl-detail-video" />
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">We take positioning, customer barriers and pain points, key messages, tone of voice, and work with clients to create a unified messaging framework at speed, which then becomes the basis for all their marketing communications.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('brand-4') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('brand-4')}><span className="hpx-tname">Distinctive brand assets</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('brand-4') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-dba-matrix">
                                <div className="cl-dba-y-label">Fame (recognition)</div>
                                <div className="cl-dba-quad cl-dba-quad-tl">
                                  <span className="cl-dba-quad-label">Use or lose</span>
                                  <span className="cl-dba-asset cl-dba-asset-mid">Brand colour</span>
                                  <span className="cl-dba-asset cl-dba-asset-mid">Logo wordmark</span>
                                </div>
                                <div className="cl-dba-quad cl-dba-quad-tr">
                                  <span className="cl-dba-quad-label">Invest here</span>
                                  <span className="cl-dba-asset cl-dba-asset-strong">Character</span>
                                  <span className="cl-dba-asset cl-dba-asset-strong">Tagline</span>
                                </div>
                                <div className="cl-dba-quad cl-dba-quad-bl">
                                  <span className="cl-dba-quad-label">Avoid or test</span>
                                  <span className="cl-dba-asset cl-dba-asset-weak">Shape</span>
                                  <span className="cl-dba-asset cl-dba-asset-weak">Typeface</span>
                                </div>
                                <div className="cl-dba-quad cl-dba-quad-br">
                                  <span className="cl-dba-quad-label">Build fame</span>
                                  <span className="cl-dba-asset cl-dba-asset-risk">Sonic</span>
                                  <span className="cl-dba-asset cl-dba-asset-risk">Pattern</span>
                                </div>
                                <div className="cl-dba-corner"></div>
                                <div className="cl-dba-x-label">Uniqueness (attribution)</div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">We catalogue a brand&apos;s existing distinctive assets, assess consistency and gaps, and plot them on a Fame x Uniqueness matrix to see what to invest in and what to protect.</div>
                              <a className="cl-acc-detail-link" href="https://runwithfoxes.substack.com/p/distinctive-brand-assets-in-an-ai" target="_blank" rel="noopener noreferrer">Read: Distinctive Brand Assets in an AI world &rarr;</a>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('brand-5') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('brand-5')}><span className="hpx-tname">Brand on a page</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('brand-5') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-brand-house">
                                <div className="cl-bh-essence">
                                  <div className="cl-bh-essence-quote">&ldquo;Honest, not heroic&rdquo;</div>
                                  <div className="cl-bh-essence-desc">For mid-career marketers who know the textbook answers aren&apos;t working, this is the brand consultancy that builds evidence-based marketing systems.</div>
                                </div>
                                <div className="cl-bh-grid">
                                  <div className="cl-bh-section">
                                    <div className="cl-bh-block-label">What we do</div>
                                    <div className="cl-bh-block-value"><strong>Category:</strong> Brand management<br/><strong>Core offering:</strong> AI-powered brand strategy<br/><strong>Differentiator:</strong> Evidence over opinion</div>
                                  </div>
                                  <div className="cl-bh-section">
                                    <div className="cl-bh-block-label">Who we serve</div>
                                    <div className="cl-bh-block-value"><strong>Audience:</strong> Mid-career to senior marketers<br/><strong>Their problem:</strong> Gut feel dressed up as strategy</div>
                                  </div>
                                  <div className="cl-bh-section">
                                    <div className="cl-bh-block-label">Voice</div>
                                    <div className="cl-bh-block-value"><strong>Tone:</strong> Smart colleague over coffee<br/><strong>Never:</strong> Jargon, heroics, certainty theatre<br/><strong>Always:</strong> Evidence first, peer-to-peer</div>
                                  </div>
                                  <div className="cl-bh-section">
                                    <div className="cl-bh-block-label">Versus</div>
                                    <div className="cl-bh-block-value"><strong>Big consultancies:</strong> We build, not advise<br/><strong>Agencies:</strong> We measure, not just make</div>
                                  </div>
                                </div>
                                <div className="cl-bh-pillars">
                                  <div className="cl-bh-pillar">Learning from failure</div>
                                  <div className="cl-bh-pillar">Fox thinking</div>
                                  <div className="cl-bh-pillar">Evidence-based</div>
                                  <div className="cl-bh-pillar">Brand salience</div>
                                  <div className="cl-bh-pillar">Honest learning</div>
                                </div>
                                <div className="cl-bh-foundations">
                                  <div className="cl-bh-block">
                                    <div className="cl-bh-block-label">Key messages</div>
                                    <div className="cl-bh-block-value">Most marketing fails because teams measure the wrong things</div>
                                  </div>
                                  <div className="cl-bh-block">
                                    <div className="cl-bh-block-label">Values</div>
                                    <div className="cl-bh-block-value">Honesty over comfort. Evidence over opinion. Building over advising</div>
                                  </div>
                                  <div className="cl-bh-block">
                                    <div className="cl-bh-block-label">Proof</div>
                                    <div className="cl-bh-block-value">20 yrs brand leadership. Marketer of the Year 2022</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">We work with clients to convert all their various brand elements into a brand on a page that captures everything for the team.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('brand-6') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('brand-6')}><span className="hpx-tname">Brand guidelines</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('brand-6') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-brand-guidelines">
                                <div className="cl-bg-row">
                                  <div className="cl-bg-section">
                                    <div className="cl-bg-label">Colour palette</div>
                                    <div className="cl-bg-swatches">
                                      <div className="cl-bg-swatch" style={{ background: '#3A7CA5', color: 'rgba(255,255,255,0.7)' }}>Sky</div>
                                      <div className="cl-bg-swatch" style={{ background: '#1A3A4E', color: 'rgba(255,255,255,0.7)' }}>Deep</div>
                                      <div className="cl-bg-swatch" style={{ background: '#F47521', color: 'rgba(255,255,255,0.7)' }}>Run</div>
                                      <div className="cl-bg-swatch" style={{ background: '#F7EAD9', color: '#8A8A85', border: '1px solid #E0E0DC' }}>Cream</div>
                                      <div className="cl-bg-swatch" style={{ background: '#FAFAF8', color: '#8A8A85', border: '1px solid #E0E0DC' }}>BG</div>
                                      <div className="cl-bg-swatch" style={{ background: '#1D1B1B', color: 'rgba(255,255,255,0.7)' }}>Text</div>
                                    </div>
                                  </div>
                                  <div className="cl-bg-section">
                                    <div className="cl-bg-label">Typography</div>
                                    <div className="cl-bg-type-sample" style={{ fontFamily: 'var(--mono)', fontSize: 15, fontWeight: 300, letterSpacing: '-0.3px' }}>JetBrains Mono Light</div>
                                    <div className="cl-bg-type-name">Headings, large numbers</div>
                                    <div className="cl-bg-type-sample" style={{ fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 300, marginTop: 6 }}>JetBrains Mono Light</div>
                                    <div className="cl-bg-type-name">Body, data, labels</div>
                                  </div>
                                  <div className="cl-bg-section">
                                    <div className="cl-bg-label">Logo</div>
                                    <div className="cl-bg-logo">/<span>Run</span>withfoxes</div>
                                    <div className="cl-bg-type-name" style={{ marginTop: 3 }}>Text only. Forward slash. Run in orange.</div>
                                  </div>
                                </div>
                                <div className="cl-bg-row">
                                  <div className="cl-bg-section">
                                    <div className="cl-bg-label">Writing style</div>
                                    <div className="cl-bg-type-name" style={{ color: 'var(--text)', fontSize: 10, lineHeight: '1.5' }}>Conversational, peer-to-peer. Sentence case only. Evidence before opinion.</div>
                                  </div>
                                  <div className="cl-bg-section">
                                    <div className="cl-bg-label">Never</div>
                                    <div className="cl-bg-nevers">
                                      <span className="cl-bg-never">Rounded corners</span>
                                      <span className="cl-bg-never">Gradients</span>
                                      <span className="cl-bg-never">Bold headings</span>
                                      <span className="cl-bg-never">Title Case</span>
                                      <span className="cl-bg-never">Stock photos</span>
                                      <span className="cl-bg-never">Em dashes</span>
                                      <span className="cl-bg-never">Drop shadows</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">We help build brand guidelines and convert them into something that allows clients to make sure everything they create after that is highly consistent. Built for humans and robots.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* MODULE 4: ADVERTISING */}
            <div className={`hpx-mitem${isOpen('mod-advertising') ? ' open' : ''}`} id="mod-advertising">
              <button className="hpx-mrow" onClick={() => toggle('mod-advertising')}>
                <span className="hpx-ic">&#9656;</span>
                <span className="hpx-mmid"><span className="hpx-mname">Advertising</span><span className="hpx-mdesc">Brief to useful options faster, quality first</span></span>
                <span className="hpx-mright"><span className="hpx-mcount">4 examples</span><span className="hpx-chev">&#9656;</span></span>
              </button>
              {isOpen('mod-advertising') && (
                <div className="hpx-mdetail">
                  <div className="hpx-mintro"><p>AI has made advertising production faster. That does not mean the work gets better by default. We build customised advertising engines that help teams move from brief to useful options faster, across static ads, animated ads, brand video and e-commerce work. We focus on quality first, then automate it.</p></div>
                  <div className="hpx-toolslabel">Examples</div>
                  <div className="hpx-tools">

                    <div className={`hpx-titem${isOpen('ad-1') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('ad-1')}><span className="hpx-tname">Video</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('ad-1') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-media-row">
                            <div className="cl-media-item"><LazyVideo src="/video/hyperspeed.mp4" loop className="cl-media-video" /></div>
                            <div className="cl-media-item"><LazyVideo src="/video/rounders.mp4" loop className="cl-media-video" /></div>
                            <div className="cl-media-item"><LazyVideo src="/video/waterslide.mp4" loop className="cl-media-video" /></div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('ad-2') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('ad-2')}><span className="hpx-tname">Brand ads</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('ad-2') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-media-row">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <div className="cl-media-item"><img src="/ads/brand-killbill.png" alt="Kill Bill brand ad" className="cl-media-img-square" /></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <div className="cl-media-item"><img src="/ads/brand-vespa.png" alt="Vespa brand ad" className="cl-media-img-square" /></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <div className="cl-media-item"><img src="/ads/brand-rushmore.png" alt="Rushmore fox brand ad" className="cl-media-img" /></div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('ad-3') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('ad-3')}><span className="hpx-tname">Animated ads</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('ad-3') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-media-row">
                            <div className="cl-media-item"><LazyVideo src="/video/animated-6040-sideeye.mp4" loop className="cl-media-video" /></div>
                            <div className="cl-media-item"><LazyVideo src="/video/animated-6040-activate.mp4" loop className="cl-media-video" /></div>
                            <div className="cl-media-item"><LazyVideo src="/video/animated-lottery.mp4" loop className="cl-media-video" /></div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('ad-4') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('ad-4')}><span className="hpx-tname">Static ads</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('ad-4') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-media-row">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <div className="cl-media-item"><img src="/ads/static-arsenal.png" alt="Arsenal static ad" className="cl-media-img" /></div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <div className="cl-media-item"><img src="/ads/static-6040.png" alt="60/40 static ad" className="cl-media-img" /></div>
                          </div>
                        </div></div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* MODULE 5: STUDIO */}
            <div className={`hpx-mitem${isOpen('mod-studio') ? ' open' : ''}`} id="mod-studio">
              <button className="hpx-mrow" onClick={() => toggle('mod-studio')}>
                <span className="hpx-ic">&#9656;</span>
                <span className="hpx-mmid"><span className="hpx-mname">Studio</span><span className="hpx-mdesc">Twenty years of studio craft, with AI inside</span></span>
                <span className="hpx-mright"><span className="hpx-mcount">3 examples</span><span className="hpx-chev">&#9656;</span></span>
              </button>
              {isOpen('mod-studio') && (
                <div className="hpx-mdetail">
                  <div className="hpx-mintro"><p>We&apos;ve spent twenty years running internal studios. We bring AI into them to do three things: improve the quality of the work, get it out faster, and show the ROI.</p></div>
                  <div className="hpx-toolslabel">Examples</div>
                  <div className="hpx-tools">

                    <div className={`hpx-titem${isOpen('studio-cal') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('studio-cal')}><span className="hpx-tname">Marketing calendar</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('studio-cal') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src="/ads/marketing-calendar-preview.png" alt="Marketing calendar" style={{ width: '100%', height: 'auto', display: 'block', border: '1px solid var(--border)' }} />
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">A marketing calendar puts every activity, across channels and campaigns, on one page. We use AI to move from the full year down to a single event and back, without the work that usually goes into building one and keeping it current.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('studio-1') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('studio-1')}><span className="hpx-tname">Studio measurement</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('studio-1') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div style={{ maxWidth: 780 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src="/ads/studio-measurement.png" alt="Studio measurement dashboard" style={{ width: '100%', height: 'auto', display: 'block' }} />
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('studio-2') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('studio-2')}><span className="hpx-tname">Brief coach</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('studio-2') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-models-grid">
                            <div className="cl-model-card">
                              <div className="cl-model-name">Hierarchy of effects</div>
                              <div className="cl-model-desc">Awareness leads to interest, desire, then action. Sequential.</div>
                            </div>
                            <div className="cl-model-card">
                              <div className="cl-model-name">Persuasion</div>
                              <div className="cl-model-desc">Change beliefs, change attitudes, change behaviour.</div>
                            </div>
                            <div className="cl-model-card cl-model-card-active">
                              <div className="cl-model-name">Weak theory</div>
                              <div className="cl-model-desc">Advertising reinforces existing behaviour, doesn&apos;t convert.</div>
                              <div className="cl-model-using">What most briefs actually use</div>
                            </div>
                            <div className="cl-model-card">
                              <div className="cl-model-name">Salience</div>
                              <div className="cl-model-desc">Be mentally available at the moment of purchase. Ehrenberg-Bass.</div>
                            </div>
                            <div className="cl-model-card">
                              <div className="cl-model-name">Fame</div>
                              <div className="cl-model-desc">Get talked about. Social objects, not messages.</div>
                            </div>
                            <div className="cl-model-card">
                              <div className="cl-model-name">Direct response</div>
                              <div className="cl-model-desc">Stimulus, response, measure. Ogilvy direct tradition.</div>
                            </div>
                            <div className="cl-model-card">
                              <div className="cl-model-name">Signalling</div>
                              <div className="cl-model-desc">Spending signals commitment. The medium is the message.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* MODULE 6: BUSINESS DEVELOPMENT */}
            <div className={`hpx-mitem${isOpen('mod-business-development') ? ' open' : ''}`} id="mod-business-development">
              <button className="hpx-mrow" onClick={() => toggle('mod-business-development')}>
                <span className="hpx-ic">&#9656;</span>
                <span className="hpx-mmid"><span className="hpx-mname">Business development</span><span className="hpx-mdesc">AI for sales, outreach and GTM</span></span>
                <span className="hpx-mright"><span className="hpx-mcount">1 example</span><span className="hpx-chev">&#9656;</span></span>
              </button>
              {isOpen('mod-business-development') && (
                <div className="hpx-mdetail">
                  <div className="hpx-mintro"><p>We&apos;ve been building AI systems to help sales, business development, outreach and GTM.</p></div>
                  <div className="hpx-toolslabel">Examples</div>
                  <div className="hpx-tools">

                    <div className={`hpx-titem${isOpen('bd-pipeline') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('bd-pipeline')}><span className="hpx-tname">Business development rep</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('bd-pipeline') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-bd-pipe">
                                <div className="cl-bd-track"></div>
                                <div className="cl-bd-station is-first" style={{ left: '5%' }}>
                                  <span className="cl-bd-tick"></span>
                                  <span className="cl-bd-lab"><span>List</span><span>building</span></span>
                                </div>
                                <div className="cl-bd-station" style={{ left: '35%' }}>
                                  <span className="cl-bd-tick"></span>
                                  <span className="cl-bd-lab"><span>Prospect</span><span>intel</span></span>
                                </div>
                                <div className="cl-bd-station" style={{ left: '65%' }}>
                                  <span className="cl-bd-tick"></span>
                                  <span className="cl-bd-lab"><span>Outreach</span></span>
                                </div>
                                <div className="cl-bd-station is-last" style={{ left: '95%' }}>
                                  <span className="cl-bd-tick"></span>
                                  <span className="cl-bd-lab"><span>Scheduling</span><span>meetings</span></span>
                                </div>
                                <div className="cl-bd-flow">
                                  <span className="cl-bd-dot"></span>
                                  <span className="cl-bd-dot s"></span>
                                  <span className="cl-bd-dot"></span>
                                  <span className="cl-bd-dot s"></span>
                                  <span className="cl-bd-dot"></span>
                                  <span className="cl-bd-dot s"></span>
                                  <span className="cl-bd-dot"></span>
                                </div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">We build AI setups that automate the many tasks needed for business development: building and enriching the list, researching prospects, writing and sending the outreach, and setting up the calls.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* MODULE 7: RESEARCH AND INSIGHTS */}
            <div className={`hpx-mitem${isOpen('mod-research') ? ' open' : ''}`} id="mod-research">
              <button className="hpx-mrow" onClick={() => toggle('mod-research')}>
                <span className="hpx-ic">&#9656;</span>
                <span className="hpx-mmid"><span className="hpx-mname">Research and insights</span><span className="hpx-mdesc">Message testing, intelligence, interviews by phone</span></span>
                <span className="hpx-mright"><span className="hpx-mcount">4 examples</span><span className="hpx-chev">&#9656;</span></span>
              </button>
              {isOpen('mod-research') && (
                <div className="hpx-mdetail">
                  <div className="hpx-mintro"><p>We love research, and have helped teams with a range of solutions such as message testing, company intelligence, review analysis, pricing monitors, and agents that call and interview people on their shopping behaviour.</p></div>
                  <div className="hpx-toolslabel">Examples</div>
                  <div className="hpx-tools">

                    <div className={`hpx-titem${isOpen('res-1') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('res-1')}><span className="hpx-tname">AI research interviewer</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('res-1') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div style={{ maxWidth: 420 }}>
                                <svg viewBox="0 0 280 500" xmlns="http://www.w3.org/2000/svg" style={{ width: 220, height: 'auto', display: 'block', margin: '0 auto' }}>
                                  <rect x="0" y="0" width="280" height="500" rx="36" fill="#1a1a1a"/>
                                  <rect x="6" y="6" width="268" height="488" rx="32" fill="#2a2a2a"/>
                                  <rect x="90" y="6" width="100" height="24" rx="12" fill="#1a1a1a"/>
                                  <defs>
                                    <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
                                      <stop offset="0%" stopColor="#4a4a52"/>
                                      <stop offset="50%" stopColor="#6b5a4a"/>
                                      <stop offset="100%" stopColor="#5a4a3a"/>
                                    </linearGradient>
                                  </defs>
                                  <rect x="6" y="6" width="268" height="488" rx="32" fill="url(#screenGrad)" opacity="0.9"/>
                                  <text x="140" y="26" textAnchor="middle" fontFamily="SF Pro Display, -apple-system, sans-serif" fontSize="11" fill="rgba(255,255,255,0.8)">9:41</text>
                                  <text x="140" y="160" textAnchor="middle" fontFamily="SF Pro Display, -apple-system, sans-serif" fontSize="36" fontWeight="300" fill="#ffffff">Isa</text>
                                  <text x="140" y="185" textAnchor="middle" fontFamily="SF Pro Display, -apple-system, sans-serif" fontSize="14" fill="rgba(255,255,255,0.5)">Research call</text>
                                  <circle cx="90" cy="420" r="30" fill="#ff3b30"/>
                                  <line x1="78" y1="420" x2="102" y2="420" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
                                  <text x="90" y="464" textAnchor="middle" fontFamily="SF Pro Display, -apple-system, sans-serif" fontSize="10" fill="rgba(255,255,255,0.6)">Decline</text>
                                  <circle cx="190" cy="420" r="30" fill="#34c759"/>
                                  <path d="M178,413 Q178,427 190,427 Q202,427 202,413" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/>
                                  <text x="190" y="464" textAnchor="middle" fontFamily="SF Pro Display, -apple-system, sans-serif" fontSize="10" fill="rgba(255,255,255,0.6)">Accept</text>
                                </svg>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">An AI researcher trained to do structured qualitative interviews by phone, hundreds a week, that remembers previous conversations and picks up where it left off. This gives clients longitudinal insights that would be impossible to get at scale with human interviewers.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('res-2') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('res-2')}><span className="hpx-tname">Company intelligence</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('res-2') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div className="cl-intel-card">
                                <div className="cl-intel-header">
                                  <div>
                                    <div className="cl-intel-company">Acme Corp</div>
                                    <div className="cl-intel-meta">B2B SaaS | Dublin | 120 employees</div>
                                  </div>
                                  <div className="cl-intel-updated">Last enriched: 2 days ago</div>
                                </div>
                                <div className="cl-intel-grid">
                                  <div className="cl-intel-section">
                                    <div className="cl-intel-label">Leadership</div>
                                    <div className="cl-intel-value">CMO: Jane Smith (ex-Google, 18mo)<br/>VP Marketing: Tom Reilly (promoted internally)<br/>Head of Brand: Open role (posted 3 weeks)</div>
                                  </div>
                                  <div className="cl-intel-section">
                                    <div className="cl-intel-label">Change signals</div>
                                    <div className="cl-intel-value">New CMO hired 18mo ago<br/>Head of Brand role open<br/>Series C closed Q1<br/>Agency review in progress</div>
                                  </div>
                                  <div className="cl-intel-section">
                                    <div className="cl-intel-label">Marketing team</div>
                                    <div className="cl-intel-value">12 people across brand, growth, content<br/>3 new hires in last 6 months<br/>No measurement or insights role</div>
                                  </div>
                                  <div className="cl-intel-section">
                                    <div className="cl-intel-label">News</div>
                                    <div className="cl-intel-value">Rebrand announced last quarter<br/>CMO quoted on &ldquo;brand-led growth&rdquo;<br/>Sponsoring SaaStr EU 2026</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">Company and people enrichment, news, team backgrounds, open roles, and change signals. Built from multiple data sources and updated on a schedule so the picture stays current.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('res-3') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('res-3')}><span className="hpx-tname">Review intelligence</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('res-3') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div style={{ maxWidth: 420 }}>
                                <div className="cl-review-title">Review analysis across 3 platforms</div>
                                <div className="cl-review-scores">
                                  <div className="cl-review-score" style={{ background: '#1A3A4E' }}><div className="cl-review-score-num">4.2</div><div className="cl-review-score-name">Trustpilot</div></div>
                                  <div className="cl-review-score" style={{ background: '#3A7CA5' }}><div className="cl-review-score-num">3.8</div><div className="cl-review-score-name">App Store</div></div>
                                  <div className="cl-review-score" style={{ background: '#3A7CA5' }}><div className="cl-review-score-num">4.0</div><div className="cl-review-score-name">Amazon</div></div>
                                </div>
                                <div className="cl-review-bars">
                                  <div className="cl-review-bar-row">
                                    <span className="cl-review-bar-label">Delivery speed</span>
                                    <div className="cl-review-bar-track"><div className="cl-review-bar-fill" style={{ width: '78%', background: '#4A7A62' }}></div></div>
                                    <span style={{ fontSize: 10, color: '#4A7A62', width: 28 }}>78%</span>
                                    <span style={{ fontSize: 9, color: '#4A7A62' }}>positive</span>
                                  </div>
                                  <div className="cl-review-bar-row">
                                    <span className="cl-review-bar-label">Product quality</span>
                                    <div className="cl-review-bar-track"><div className="cl-review-bar-fill" style={{ width: '64%', background: '#3A7CA5' }}></div></div>
                                    <span style={{ fontSize: 10, color: '#3A7CA5', width: 28 }}>64%</span>
                                    <span style={{ fontSize: 9, color: '#3A7CA5' }}>mixed</span>
                                  </div>
                                  <div className="cl-review-bar-row">
                                    <span className="cl-review-bar-label">Customer service</span>
                                    <div className="cl-review-bar-track"><div className="cl-review-bar-fill" style={{ width: '41%', background: '#C25B3A' }}></div></div>
                                    <span style={{ fontSize: 10, color: '#C25B3A', width: 28 }}>41%</span>
                                    <span style={{ fontSize: 9, color: '#C25B3A' }}>negative</span>
                                  </div>
                                  <div className="cl-review-bar-row">
                                    <span className="cl-review-bar-label">Value for money</span>
                                    <div className="cl-review-bar-track"><div className="cl-review-bar-fill" style={{ width: '55%', background: '#3A7CA5' }}></div></div>
                                    <span style={{ fontSize: 10, color: '#3A7CA5', width: 28 }}>55%</span>
                                    <span style={{ fontSize: 9, color: '#3A7CA5' }}>mixed</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">Trustpilot, Amazon, app store reviews analysed across brands and competitors. Themes extracted, sentiment tracked over time, and compared against the category.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                    <div className={`hpx-titem${isOpen('res-4') ? ' open' : ''}`}>
                      <button className="hpx-trow" onClick={() => toggle('res-4')}><span className="hpx-tname">Pricing intelligence</span><span className="hpx-chev">&#9656;</span></button>
                      {isOpen('res-4') && (
                        <div className="hpx-tdetail"><div className="cl-acc-detail">
                          <div className="cl-acc-detail-split">
                            <div className="cl-acc-detail-visual">
                              <div style={{ maxWidth: 420 }}>
                                <div className="cl-price-title">Daily price monitor | 4 retailers</div>
                                <div className="cl-price-table">
                                  <div className="cl-price-header">
                                    <span>Product</span><span>Tesco</span><span>Dunnes</span><span>SuperV</span><span>Aldi</span><span>Change</span>
                                  </div>
                                  <div className="cl-price-row">
                                    <span>Product A 500ml</span><span>&euro;3.49</span><span>&euro;3.29</span><span>&euro;3.49</span><span>&euro;2.99</span><span style={{ color: '#4A7A62' }}>&#9654;</span>
                                  </div>
                                  <div className="cl-price-row cl-price-row-alert">
                                    <span>Product B 1L</span><span>&euro;5.99</span><span>&euro;5.99</span><span style={{ color: '#C25B3A', fontWeight: 400 }}>&euro;4.49</span><span>&euro;4.99</span><span style={{ color: '#C25B3A' }}>&#9660; SuperV</span>
                                  </div>
                                  <div className="cl-price-row">
                                    <span>Product C 330ml x6</span><span>&euro;7.99</span><span>&euro;7.49</span><span>&euro;7.99</span><span>&euro;6.99</span><span style={{ color: '#4A7A62' }}>&#9654;</span>
                                  </div>
                                  <div className="cl-price-row">
                                    <span>Competitor X 500ml</span><span>&euro;2.99</span><span>&euro;2.99</span><span>&euro;2.99</span><span>&euro;2.49</span><span style={{ color: '#4A7A62' }}>&#9654;</span>
                                  </div>
                                </div>
                                <div className="cl-price-alert"><strong style={{ fontWeight: 400, color: '#C25B3A' }}>Alert:</strong> SuperValu dropped Product B by &euro;1.50 yesterday. Now &euro;1.50 below your Tesco price.</div>
                              </div>
                            </div>
                            <div className="cl-acc-detail-copy">
                              <div className="cl-acc-detail-sub">Daily competitive price monitoring across retailers. Alerts on changes, tracks promotional patterns, and flags when a competitor undercuts on a key line.</div>
                            </div>
                          </div>
                        </div></div>
                      )}
                    </div>

                  </div>
                </div>
              )}
            </div>

          </div>

          {/* TESTIMONIALS - rotating band, manual, fixed height */}
          <Testimonials />

          {/* BOOK BLOCK - mirrors the /book hero */}
          <div className="hpx-bookblock">
            <div className="hpx-bookblock-text">
              <div className="hpx-bookblock-title">The <span>Fox</span> Advantage</div>
              <div className="hpx-bookblock-sub">How to thrive in marketing because of AI, not despite it. 54 short chapters. No jargon. No fluff.</div>
              <div className="hpx-bookblock-meta">
                <span>\ 54 chapters</span>
                <span>\ 4 parts</span>
                <Link href="/book">\ get_the_book &rarr;</Link>
              </div>
            </div>
            <div className="hpx-bookblock-img">
              <Image src="/fox/fox-book.png" alt="The Fox Advantage" width={300} height={424} />
            </div>
          </div>

        </div>
      </div>

      <div className="hp-bottom-bar" ref={bottomBarRef}>
        <a href="#heroWrapper" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>#top</a>
        <a href="#about">#about</a>
        <Link href="/book">/book</Link>
        <Link href="/contact" className="hp-cta-bar">get in touch</Link>
      </div>
    </div>
  );
}
