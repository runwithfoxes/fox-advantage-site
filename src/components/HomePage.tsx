"use client";

import { useEffect, useRef, useState } from "react";
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

/* ===== PRODUCTS STOREFRONT (ported from wireframes/homepage-storefront-branded.html) ===== */
const SF_SKY = "#3A7CA5", SF_DEEP = "#1A3A4E", SF_ORANGE = "#F47521", SF_MUT = "#B7B7B2";
const sfS = (s: string) =>
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + s + "</svg>";

const SF_IC: Record<string, string> = {
  resize: sfS('<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M11 7h6a1 1 0 011 1v6"/>'),
  ad: sfS('<path d="M3 10v4l11 5V5L3 10z"/><path d="M14 8c2 0 3 1.5 3 4s-1 4-3 4"/>'),
  write: sfS('<path d="M4 20h6"/><path d="M14 4l6 6L9 21l-6 1 1-6z"/>'),
  score: sfS('<line x1="6" y1="20" x2="6" y2="14"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="18" y1="20" x2="18" y2="10"/>'),
  seg: sfS('<circle cx="7" cy="7" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/>'),
  map: sfS('<polygon points="4,6 9,4 15,6 20,4 20,18 15,20 9,18 4,20"/><line x1="9" y1="4" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="20"/>'),
  matrix: sfS('<rect x="4" y="4" width="16" height="16" rx="1"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>'),
  shield: sfS('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
  phone: sfS('<path d="M5 4h4l2 5-3 2a12 12 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'),
  doc: sfS('<rect x="6" y="3" width="12" height="18" rx="1"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/>'),
  star: sfS('<path d="M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.7-5 2.7 1-5.5-4-3.9 5.6-.8z"/>'),
  tag: sfS('<path d="M3 12l9-9 8 8-9 9z"/><circle cx="15" cy="9" r="1.4"/>'),
  reach: sfS('<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>'),
  funnel: sfS('<path d="M3 5h18l-7 8v6l-4-2v-4z"/>'),
  cm: sfS('<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 9h18M8 3v4M16 3v4"/>'),
  content: sfS('<path d="M21 11.5a8.4 8.4 0 01-9 8.3 8.4 8.4 0 01-3.8-.9L3 21l2.1-5.2A8.4 8.4 0 0112 3.1a8.4 8.4 0 019 8.4z"/><line x1="8" y1="10" x2="14" y2="10"/><line x1="8" y1="13.5" x2="12" y2="13.5"/>'),
  cycle: sfS('<path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 4 21 9 16 9"/>'),
};

const SF_VIS: Record<string, string> = {
  resize: `<svg viewBox="0 0 200 118"><rect x="34" y="30" width="58" height="58" fill="${SF_SKY}" opacity=".14" stroke="${SF_SKY}"/><rect x="104" y="30" width="40" height="26" fill="${SF_DEEP}" opacity=".08" stroke="${SF_MUT}"/><rect x="104" y="62" width="62" height="14" fill="${SF_DEEP}" opacity=".08" stroke="${SF_MUT}"/><rect x="104" y="80" width="22" height="8" fill="${SF_ORANGE}" opacity=".7"/></svg>`,
  ad: `<svg viewBox="0 0 200 118"><rect x="40" y="20" width="120" height="78" fill="${SF_DEEP}" opacity=".08" stroke="${SF_MUT}"/><rect x="52" y="32" width="60" height="8" fill="${SF_DEEP}" opacity=".5"/><rect x="52" y="46" width="40" height="6" fill="${SF_MUT}"/><rect x="118" y="60" width="30" height="26" fill="${SF_ORANGE}" opacity=".8"/><rect x="52" y="80" width="44" height="9" fill="${SF_SKY}"/></svg>`,
  write: `<svg viewBox="0 0 200 118"><rect x="40" y="28" width="118" height="10" fill="${SF_SKY}" opacity=".55"/><rect x="40" y="48" width="100" height="6" fill="${SF_MUT}"/><rect x="40" y="62" width="116" height="6" fill="${SF_MUT}"/><rect x="40" y="76" width="70" height="6" fill="${SF_MUT}"/><rect x="112" y="74" width="2" height="12" fill="${SF_ORANGE}"/></svg>`,
  score: `<svg viewBox="0 0 200 118"><polygon points="100,22 130,46 70,46" fill="${SF_SKY}" opacity=".85"/><rect x="70" y="50" width="60" height="14" fill="${SF_SKY}" opacity=".6"/><rect x="56" y="68" width="88" height="14" fill="${SF_SKY}" opacity=".4"/><rect x="42" y="86" width="116" height="14" fill="${SF_SKY}" opacity=".25"/></svg>`,
  seg: `<svg viewBox="0 0 200 118"><g fill="${SF_SKY}" opacity=".8"><circle cx="50" cy="40" r="4"/><circle cx="62" cy="52" r="4"/><circle cx="44" cy="58" r="4"/><circle cx="56" cy="46" r="4"/></g><g fill="${SF_ORANGE}" opacity=".85"><circle cx="135" cy="78" r="4"/><circle cx="148" cy="86" r="4"/><circle cx="128" cy="90" r="4"/></g><g fill="${SF_DEEP}" opacity=".6"><circle cx="150" cy="38" r="4"/><circle cx="138" cy="30" r="4"/><circle cx="162" cy="46" r="4"/></g><line x1="24" y1="98" x2="176" y2="98" stroke="${SF_MUT}"/><line x1="24" y1="20" x2="24" y2="98" stroke="${SF_MUT}"/></svg>`,
  map: `<svg viewBox="0 0 200 118"><line x1="100" y1="16" x2="100" y2="102" stroke="${SF_MUT}"/><line x1="30" y1="59" x2="170" y2="59" stroke="${SF_MUT}"/><circle cx="64" cy="40" r="5" fill="${SF_MUT}"/><circle cx="132" cy="46" r="5" fill="${SF_MUT}"/><circle cx="78" cy="80" r="5" fill="${SF_MUT}"/><circle cx="140" cy="36" r="7" fill="${SF_ORANGE}"/><text x="150" y="34" font-size="8" fill="${SF_DEEP}" font-family="monospace">you</text></svg>`,
  matrix: `<svg viewBox="0 0 200 118"><rect x="56" y="16" width="88" height="86" fill="none" stroke="${SF_MUT}"/><line x1="100" y1="16" x2="100" y2="102" stroke="${SF_MUT}"/><line x1="56" y1="59" x2="144" y2="59" stroke="${SF_MUT}"/><circle cx="124" cy="36" r="7" fill="${SF_ORANGE}" opacity=".85"/><circle cx="78" cy="44" r="5" fill="${SF_SKY}" opacity=".6"/><circle cx="84" cy="82" r="5" fill="${SF_MUT}"/><circle cx="120" cy="80" r="5" fill="${SF_SKY}" opacity=".4"/></svg>`,
  shield: `<svg viewBox="0 0 200 118"><path d="M100 22l34 12v22c0 20-14 30-34 36-20-6-34-16-34-36V34z" fill="${SF_SKY}" opacity=".12" stroke="${SF_SKY}"/><path d="M86 64l10 10 20-20" fill="none" stroke="${SF_ORANGE}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  phone: `<svg viewBox="0 0 200 118"><rect x="74" y="20" width="52" height="82" fill="${SF_DEEP}" opacity=".08" stroke="${SF_MUT}"/><circle cx="100" cy="38" r="9" fill="${SF_SKY}" opacity=".25"/><rect x="86" y="54" width="28" height="5" fill="${SF_MUT}"/><rect x="84" y="66" width="32" height="5" fill="${SF_MUT}"/><circle cx="88" cy="88" r="7" fill="${SF_ORANGE}" opacity=".8"/><circle cx="112" cy="88" r="7" fill="${SF_SKY}" opacity=".5"/></svg>`,
  doc: `<svg viewBox="0 0 200 118"><rect x="64" y="16" width="72" height="86" fill="${SF_DEEP}" opacity=".05" stroke="${SF_MUT}"/><rect x="76" y="30" width="48" height="7" fill="${SF_SKY}" opacity=".6"/><rect x="76" y="46" width="40" height="5" fill="${SF_MUT}"/><rect x="76" y="58" width="44" height="5" fill="${SF_MUT}"/><rect x="76" y="70" width="30" height="5" fill="${SF_MUT}"/><circle cx="120" cy="86" r="6" fill="${SF_ORANGE}" opacity=".8"/></svg>`,
  star: `<svg viewBox="0 0 200 118"><rect x="40" y="34" width="92" height="10" fill="${SF_SKY}" opacity=".6"/><rect x="40" y="54" width="120" height="10" fill="${SF_ORANGE}" opacity=".55"/><rect x="40" y="74" width="64" height="10" fill="${SF_MUT}" opacity=".55"/><text x="150" y="44" font-size="11" fill="${SF_DEEP}" font-family="monospace">+</text></svg>`,
  tag: `<svg viewBox="0 0 200 118"><polyline points="30,80 60,70 90,74 120,52 150,58 172,38" fill="none" stroke="${SF_SKY}" stroke-width="2"/><polyline points="30,88 60,84 90,86 120,80 150,82 172,72" fill="none" stroke="${SF_MUT}" stroke-width="2" stroke-dasharray="3 3"/><circle cx="172" cy="38" r="4" fill="${SF_ORANGE}"/><line x1="24" y1="98" x2="176" y2="98" stroke="${SF_MUT}"/></svg>`,
  reach: `<svg viewBox="0 0 200 118"><rect x="34" y="28" width="92" height="22" fill="${SF_SKY}" opacity=".15" stroke="${SF_SKY}"/><rect x="42" y="36" width="60" height="6" fill="${SF_SKY}"/><rect x="74" y="64" width="92" height="22" fill="${SF_DEEP}" opacity=".08" stroke="${SF_MUT}"/><rect x="82" y="72" width="48" height="6" fill="${SF_MUT}"/></svg>`,
  funnel: `<svg viewBox="0 0 200 118"><rect x="50" y="26" width="100" height="12" fill="${SF_SKY}" opacity=".6"/><rect x="62" y="48" width="76" height="12" fill="${SF_SKY}" opacity=".45"/><rect x="74" y="70" width="52" height="12" fill="${SF_SKY}" opacity=".3"/><rect x="86" y="92" width="28" height="12" fill="${SF_ORANGE}" opacity=".7"/></svg>`,
  cm: `<svg viewBox="0 0 200 118"><rect x="26" y="18" width="148" height="84" fill="${SF_DEEP}" opacity=".05" stroke="${SF_MUT}"/><line x1="26" y1="38" x2="174" y2="38" stroke="${SF_MUT}"/><line x1="56" y1="38" x2="56" y2="102" stroke="${SF_MUT}" opacity=".5"/><line x1="86" y1="38" x2="86" y2="102" stroke="${SF_MUT}" opacity=".5"/><line x1="116" y1="38" x2="116" y2="102" stroke="${SF_MUT}" opacity=".5"/><line x1="146" y1="38" x2="146" y2="102" stroke="${SF_MUT}" opacity=".5"/><rect x="34" y="48" width="22" height="8" fill="${SF_SKY}" opacity=".7"/><rect x="94" y="64" width="22" height="8" fill="${SF_ORANGE}" opacity=".7"/><rect x="124" y="80" width="22" height="8" fill="${SF_SKY}" opacity=".5"/><rect x="64" y="90" width="22" height="8" fill="${SF_DEEP}" opacity=".4"/></svg>`,
  content: `<svg viewBox="0 0 200 118"><rect x="44" y="18" width="112" height="82" fill="${SF_DEEP}" opacity=".05" stroke="${SF_MUT}"/><circle cx="62" cy="36" r="8" fill="${SF_SKY}" opacity=".4"/><rect x="78" y="31" width="50" height="6" fill="${SF_MUT}"/><rect x="78" y="41" width="32" height="5" fill="${SF_MUT}"/><rect x="56" y="58" width="92" height="5" fill="${SF_DEEP}" opacity=".45"/><rect x="56" y="68" width="84" height="5" fill="${SF_MUT}"/><rect x="56" y="78" width="58" height="5" fill="${SF_MUT}"/><rect x="56" y="90" width="24" height="6" fill="${SF_ORANGE}" opacity=".7"/></svg>`,
  cycle: `<svg viewBox="0 0 200 118"><circle cx="100" cy="59" r="33" fill="none" stroke="${SF_MUT}"/><circle cx="100" cy="26" r="5.5" fill="${SF_SKY}"/><circle cx="133" cy="59" r="5.5" fill="${SF_SKY}" opacity=".65"/><circle cx="100" cy="92" r="5.5" fill="${SF_ORANGE}" opacity=".85"/><circle cx="67" cy="59" r="5.5" fill="${SF_SKY}" opacity=".45"/></svg>`,
};

type SfMod = { key: string; name: string; icon: string; cat?: string; cats?: string[]; badges?: string[]; tag?: string; ben: string };
const SF_MODS: SfMod[] = [
  { key: "campaign-manager", name: "Campaign Manager", icon: "cm", cats: ["strategy", "advertising", "email", "outreach", "bundle"], badges: ["Beta"], tag: "Everything, run for you", ben: "The whole operation, run as one." },
  { key: "ad-maker", name: "Advertising Agent", icon: "ad", cat: "advertising", badges: ["Bundled"], ben: "Makes the ads, runs them, reads the numbers." },
  { key: "outreach", name: "Outbound Agent", icon: "reach", cats: ["outreach", "email"], badges: ["Bundled"], ben: "Finds the right people, writes each one for real." },
  { key: "lifecycle", name: "Lifecycle Agent", icon: "cycle", cats: ["email"], ben: "Keep and grow the people who already know you." },
  { key: "guardian", name: "Brand Guardian", icon: "shield", cat: "strategy", ben: "Nothing ships off-brand." },
  { key: "brief-coach", name: "Brief Coach", icon: "doc", cat: "strategy", ben: "The right work, not the nice work." },
  { key: "copywriter", name: "Copywriter", icon: "write", cats: ["advertising", "email"], ben: "Your brand's voice, trained to write." },
  { key: "linkedin-content", name: "Ghostwriter", icon: "content", cat: "strategy", badges: ["Bundled"], ben: "Your expertise, published in your voice." },
  { key: "ad-resizer", name: "Ad Resizer", icon: "resize", cat: "advertising", badges: ["New"], ben: "One ad in, every size out." },
];
const SF_CATS: [string, string][] = [["all", "All"], ["strategy", "Strategy"], ["advertising", "Advertising"], ["email", "Email"], ["outreach", "Outreach"]];
// a product can sit in more than one filter: use cats:[...] (falls back to the single cat)
const sfCatsOf = (m: SfMod) => m.cats || (m.cat ? [m.cat] : []);
const SF_PAGES: Record<string, string> = {
  "ad-resizer": "/products/module-ad-maker.html",
  "ad-maker": "/products/module-advertising-agent.html",
  "guardian": "/products/module-brand-guardian.html",
  "linkedin-content": "/products/module-ghostwriter.html",
  "brief-coach": "/products/module-brief-coach.html",
  "outreach": "/products/module-outbound-agent.html",
  "lifecycle": "/products/module-lifecycle-agent.html",
  "copywriter": "/products/module-copywriter.html",
  "campaign-manager": "/products/module-campaign-manager.html",
};

export default function HomePage({ posts }: { posts: SubstackPost[] }) {
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const nav = navRef.current;
    const hero = heroRef.current;
    if (!nav || !hero) return;

    const onScroll = () => {
      const heroH = hero.offsetHeight;
      nav.classList.toggle("hp-nav-scrolled", window.scrollY > heroH - 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
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
            <span className="hp-dropdown-trigger">/products &#9662;</span>
            <div className="hp-mega">
              <div className="hp-mega-inner">
                <div className="hp-mega-col">
                  <div className="hp-mega-label">PRODUCTS</div>
                  {SF_MODS.map((m) => (
                    <a key={m.key} href={SF_PAGES[m.key] || "#"}>{m.name}</a>
                  ))}
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

      {/* BIO (left) + RECENT ESSAYS compact list (right), then the contact-CTA strip */}
      <section className="hpx-about" id="about">
        <div className="hpx-wrap">
          <div className="hpx-about-grid">
            <div className="hpx-bio">
              <div className="hpx-bio-head"><span className="hpx-bio-name">/Paul Dervan</span></div>
              <div className="hpx-bio-body">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="hpx-bio-photo" src="/Paul_photo.jpg" alt="Paul Dervan" />
                <p>Twenty years in brand. Head of brand at O2 Ireland, then CMO at the National Lottery. Head of brand at Indeed and Miro, both global roles. Ireland&apos;s Marketer of the Year in 2022.</p>
                <p>Trained by Peter Field, one half of Binet and Field. That obsession with effectiveness runs through everything here.</p>
                <p>Run with Foxes is the consultancy. We work with teams to bring twenty years of brand thinking together with AI, so they get faster without losing quality.</p>
              </div>
            </div>
            <aside className="hpx-nl">
              <div className="hpx-nl-head">
                <span className="hpx-nl-kick">/recent essays</span>
                <a className="hpx-nl-more" href="https://runwithfoxes.substack.com/" target="_blank" rel="noopener noreferrer" aria-label="View newsletter">&rarr;</a>
              </div>
              <div className="hpx-nl-list">
                {posts.slice(0, 4).map((p) => (
                  <a key={p.slug} className="hpx-nl-item" href={p.link} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {p.image ? <img className="hpx-nl-thumb" src={p.image} alt="" /> : <span className="hpx-nl-thumb" />}
                    <div className="hpx-nl-text">
                      <div className="hpx-nl-title">{p.title}</div>
                      <div className="hpx-nl-meta">{p.date.toUpperCase()} &middot; Paul Dervan</div>
                    </div>
                  </a>
                ))}
              </div>
            </aside>
          </div>
          <div className="hpx-metastrip">
            <span className="hpx-ctas-label">Contact us to</span>
            <Link className="hpx-mod-cta" href="/contact"><span className="hpx-fdot"></span>\build it for you</Link>
            <Link className="hpx-mod-cta" href="/contact"><span className="hpx-fdot"></span>\work alongside you</Link>
            <Link className="hpx-mod-cta" href="/contact"><span className="hpx-fdot"></span>\train your team</Link>
          </div>
        </div>
      </section>

      <div className="cl-modules-wrap">

        {/* ===== PRODUCTS STOREFRONT (replaces the old module accordion) ===== */}
        <div className="hpx-wrap">
          <section className="sf-store">
            <div className="sf-shop">
              <div className="sf-shop-kick">/products</div>
              <div className="sf-fbar">
                {SF_CATS.map((c) => (
                  <button
                    key={c[0]}
                    className={`sf-fbtn${filter === c[0] ? " active" : ""}`}
                    onClick={() => setFilter(c[0])}
                  >
                    {c[1]}
                  </button>
                ))}
              </div>
              <div className="sf-grid">
                {SF_MODS.filter((m) => filter === "all" || sfCatsOf(m).includes(filter)).map((m) => {
                  const href = SF_PAGES[m.key] || "#";
                  const live = href !== "#";
                  return (
                    <a key={m.key} className={`sf-card${live ? "" : " soon"}`} href={href}>
                      <div className="sf-card-vis">
                        {m.badges && m.badges.length > 0 && (
                          <div className="sf-card-badges">
                            {m.badges.map((b) => (
                              <span key={b} className={`sf-card-badge ${b.toLowerCase()}`}>{b}</span>
                            ))}
                          </div>
                        )}
                        <span className="sf-vis" dangerouslySetInnerHTML={{ __html: SF_VIS[m.icon] }} />
                      </div>
                      <div className="sf-card-bd">
                        {m.tag && <span className="sf-tagb">{m.tag}</span>}
                        <div className="sf-card-nm">
                          <span className="sf-ci" dangerouslySetInnerHTML={{ __html: SF_IC[m.icon] }} />
                          <h3>{m.name}</h3>
                        </div>
                        <div className="sf-card-ben">{m.ben}</div>
                        <div className="sf-card-cta">{live ? "See how it works" : "Page coming"} <span className="arr">&rarr;</span></div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS - rotating band, manual, fixed height */}
          <Testimonials />

        </div>
      </div>

      <footer className="hpx-footer">
        <span>&copy; 2026 Run with Foxes Limited</span>
        <span className="hpx-footer-sep">&middot;</span>
        <Link href="/privacy">Privacy</Link>
        <span className="hpx-footer-sep">&middot;</span>
        <Link href="/cookies">Cookies</Link>
      </footer>
    </div>
  );
}
