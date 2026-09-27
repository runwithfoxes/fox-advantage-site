import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import NextNav from "../../../home-next/NextNav";
import N from "./numbers.json";
import { META, INTRO, FINDINGS, CHAPTERS, METHOD, GALLERY, type Block } from "./copy";
import { FigWin, F11, F12, F21, F31, F32, F41, F42, T51, F52, T71, Gallery } from "./Charts";

/* each chart imported by name: a map object exported from a client file arrives empty on the server */
const FIGS = { f11: F11, f12: F12, f21: F21, f31: F31, f32: F32, f41: F41, f42: F42, t51: T51, f52: F52 };
import { Hl, Rail } from "../../the-ai-ask/2026-q3/Parts";
import { Gate, DownloadPdf } from "../../kit";
import { reportBySlug } from "../../catalogue";
import f from "../../front.module.css";
import h from "../../hero.module.css";
import n from "../../../home-next/next.module.css";
import r from "../../the-ai-ask/2026-q3/report.module.css";
import a from "./audit.module.css";

export const metadata: Metadata = {
  title: "The Ad Audit, Q3 2026 | Run with Foxes",
  robots: { index: false, follow: false },
};

/** Sam's words with the ==phrase== highlight marks from copy.ts. The words are never touched. */
function Text({ s }: { s: string }) {
  const parts = s.split("==");
  return <>{parts.map((p, i) => (i % 2 ? <Hl key={i}>{p}</Hl> : <span key={i}>{p}</span>))}</>;
}

/* this edition's row in the resource centre catalogue: the PDF path, page count and what an account adds */
const CAT = reportBySlug("the-ad-audit-2026-q3");

const day = (iso: string) => new Date(iso + "T12:00:00Z").toLocaleDateString("en-IE", { day: "numeric", month: "long", timeZone: "UTC" });

function BlockView({ b }: { b: Block }) {
  if ("p" in b)
    return (
      <p className={r.p}>
        <Text s={b.p} />
      </p>
    );
  if ("gallery" in b) return <Gallery items={GALLERY} />;
  if (b.fig === "t71")
    return (
      <FigWin id={b.fig} n={b.no} title={b.title} cap={b.cap} win="ad_library">
        <T71 head={b.head ?? []} rows={b.rows ?? []} />
      </FigWin>
    );
  const Fig = FIGS[b.fig];
  return (
    <FigWin id={b.fig} n={b.no} title={b.title} cap={b.cap}>
      <Fig />
    </FigWin>
  );
}

/**
 * THE AD AUDIT, Q3 2026, on the AI Ask's reading template (Paul settled its shape on the morning
 * of 27 Sep): the hero carries the kicker and the headline and nothing else, then the orange draft
 * line, the byline at the top of the article, the standfirst at body size, the at-a-glance
 * window, the findings, and the chapters with numbered figures in module windows.
 * NOT FOR THE LIVE SITE until Paul approves Sam's text.
 */
export default function AdAuditQ3() {
  const words = [...INTRO, ...CHAPTERS.flatMap((c) => [...c.lede, ...c.subs.flatMap((s) => s.blocks)].map((b) => ("p" in b ? b.p : "")))].join(" ").split(/\s+/).length;
  const mins = Math.round(words / 230);
  const A = N.advertisers;
  const boi = A["Bank of Ireland"];
  const cat = N.category;
  const big: Record<number, { v: string; l: string }> = {
    2: { v: `${cat.job_share_of_reach.sales}%`, l: "of the quarter's reach went to ads that only sell" },
    1: { v: `${boi.q3_share}%`, l: "of the category's reach went to Bank of Ireland, the most of any" },
    3: { v: `${cat.product_share_of_reach.current_account}% · ${cat.product_share_of_reach.mortgage}%`, l: "of the reach: current accounts · mortgages" },
    4: { v: `${N.groups["Digital challengers"].under_35}% · ${N.groups["Irish banks and lenders"].under_35}%`, l: "of reach under 35: the challengers · the Irish banks" },
    5: { v: `${boi.by23_ran_2_days_or_less} of ${boi.by23}`, l: "Bank of Ireland ads started by 23 September ran two days or less" },
    6: { v: `${N.aib_life_series.share_of_aib_brand_reach}%`, l: "of AIB's brand reach came from one series of well-known people" },
  };
  const rail = [
    { id: "intro", k: "", t: "Introduction" },
    { id: "findings", k: "", t: "What we found" },
    ...CHAPTERS.map((c) => ({ id: c.id, k: String(c.n), t: c.title })),
    { id: "method", k: "", t: "How we did it" },
  ];
  const gn = N.biggest_single_ad;

  return (
    <div className={`${f.page} ${r.page}`}>
      <section className={`${h.hero} ${r.heroR}`} id="top">
        {/* A still, not a film: the fox outside a Dublin bank (report-covers/gen.py, "the-ad-audit").
            The object position is inline so no stylesheet order can move it. Not the site's .film
            class from next.module.css, because that hides itself under reduced motion. */}
        <img className={h.film} src="/resources/the-ad-audit/2026-q3/hero-flip.jpg" alt="" style={{ objectPosition: "50% 78%" }} />
        <NextNav />
        <div className={`${h.inner} ${n.heroInner} ${r.heroInnerR}`}>
          <div className={h.text}>
            {/* Two things on the hero (DOCTRINE, 27 Sep): what this is, and the headline. */}
            <span className={r.eyebrowW}>{META.kicker}</span>
            <h1 className={r.h1W}>
              {META.heroTitle} <span className={r.hlW}>{META.titleHl}</span>
            </h1>
          </div>
        </div>
      </section>

      <div className={r.draft}>Draft for Paul. Sam&rsquo;s text and numbers, not yet approved for the live site.</div>

      <header className={r.mast} id="intro">
        <div className={r.mastMain}>
          <div className={r.who}>
            <span className={r.whoFaces}>
              <i className={r.byMark}>S</i>
              <img className={r.whoImg} src="/Paul_photo.jpg" alt="Paul Dervan" />
            </span>
            <span className={r.whoText}>
              <span className={r.whoLine}>
                <span>{META.byline}</span>
                <span className={r.byDot}>·</span>
                <span>{META.checked}</span>
              </span>
              <span className={`${r.whoLine} ${r.whoMeta}`}>
                <span>Issue 01 · Q3 2026 · {META.date}</span>
                <span className={r.byDot}>·</span>
                <span>{mins} min read</span>
              </span>
            </span>
          </div>
          <p className={r.standfirst}>
            <Text s={INTRO[0]} />
          </p>
          {/* The ad the opening paragraph is about. Facts from numbers.json (biggest_single_ad). */}
          <div className={a.opener}>
            <img src="/resources/the-ad-audit/2026-q3/0.jpg" alt="Revolut's Graham Norton ad" />
            <span className={a.openerText}>
              <b>{gn.adv}</b>
              <span>
                Shown only in Ireland, {day(gn.start)} to {day(gn.stop)}
              </span>
              <b className={a.openerBig}>{gn.reach.toLocaleString("en-IE")}</b>
              <span>people reached by its biggest copy, the most of any single ad in the study</span>
            </span>
          </div>
          {INTRO.slice(1).map((p, i) => (
            <p key={i} className={r.p}>
              <Text s={p} />
            </p>
          ))}
          <div id="download" style={{ marginTop: 8 }}>
            <DownloadPdf href={CAT?.pdf ?? "/resources/pdf/the-ad-audit-q3-2026.pdf"} pages={CAT?.pages} />
          </div>
        </div>
        <aside className={`mod-win ${r.glance}`}>
          <div className="mod-winbar">
            <span className="mod-lights">
              <i />
              <i />
              <i />
            </span>
            <span className="mod-wintitle">at_a_glance</span>
          </div>
          <div className={r.glanceBody}>
            <img className={r.glanceFox} src="/fox/chapter-fox-sitting-nobg.png" alt="" />
            {[
              { v: N.totals.ads.toLocaleString("en-IE"), l: `ads ten banks and lenders showed in Ireland, 1 July to 26 September` },
              { v: N.totals.creatives.toLocaleString("en-IE"), l: "different ads, once copies with the same words are merged" },
              { v: `${(N.totals.q3_reach / 1e6).toFixed(1)}m`, l: "reach, added up across ads started in the quarter: showings, not people" },
              { v: `${cat.offer_creatives} of ${N.totals.bank_creatives}`, l: "different bank ads state an offer: a rate, a cashback, a bonus or something free" },
            ].map((s) => (
              <div key={s.l} className={r.glanceRow}>
                <span className="mod-num">{s.v}</span>
                <span className="mod-lbl">{s.l}</span>
              </div>
            ))}
            <span className={r.glanceNext}>Next issue: Q4 2026, in December</span>
          </div>
        </aside>
      </header>

      <section className={r.findings} id="findings">
        <div className={r.fHead}>
          <h2 className={r.h2s}>What we found</h2>
          <span className={r.fSub}>Six findings, each one a chapter</span>
        </div>
        <ol className={r.fGrid}>
          {FINDINGS.map((fd, i) => (
            <li key={i}>
              <a href={`#ch${fd.ch}`} className={r.fCard}>
                <span className={r.fN}>0{i + 1}</span>
                <span className={r.fBig}>{big[fd.ch].v}</span>
                <span className={r.fBigL}>{big[fd.ch].l}</span>
                <span className={r.fText}>{fd.text}</span>
                <span className={r.fGo}>Chapter {fd.ch} &rarr;</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <div className={r.body}>
        <aside className={r.railCol}>
          <Rail items={rail} />
        </aside>

        <main className={r.main} id="report-main">
          {CHAPTERS.map((c) => (
            <section key={c.id} id={c.id} className={r.chapter}>
              <div className={r.chHead}>
                <span className={r.chN}>Chapter {c.n}</span>
                <h2 className={r.h2}>{c.title}</h2>
              </div>
              {c.lede.map((b, i) =>
                "p" in b ? (
                  <p key={i} className={r.lede}>
                    <Text s={b.p} />
                  </p>
                ) : (
                  <BlockView key={i} b={b} />
                ),
              )}
              {c.subs.map((s) => (
                <div key={s.n} className={r.sub} id={`s${s.n.replace(".", "-")}`}>
                  <h3 className={r.h3}>
                    <span className={r.subN}>{s.n}</span>
                    {s.title}
                  </h3>
                  {s.blocks.map((b, i) => (
                    <BlockView key={i} b={b} />
                  ))}
                </div>
              ))}
            </section>
          ))}

          <section id="join" className={r.join}>
            <div>
              <span className={r.eyebrow}>Get full access, free</span>
              <h2 className={r.h2}>Every ad behind this report, and the next one first</h2>
              <p className={r.p}>
                A free account opens the full tables, every ad by bank, product, offer and week, and the downloads. The December issue comes to you when it&rsquo;s read.
              </p>
            </div>
            <form className={r.joinForm}>
              <input type="email" placeholder="you@company.ie" aria-label="Work email" />
              <button type="button">Get full access, free</button>
            </form>
          </section>

          <section id="method" className={r.chapter}>
            <div className={r.chHead}>
              <span className={r.chN}>Method</span>
              <h2 className={r.h2}>How we did it</h2>
            </div>
            {METHOD.map((m, i) => (
              <details key={m.k} className={r.meth} open={i === 0}>
                <summary>
                  <span>{m.k}</span>
                  <em>open</em>
                </summary>
                <p className={r.small}>{m.t}</p>
              </details>
            ))}
            <Gate adds={CAT?.withAccount ?? []} />
            <Link href="/home-next" className={r.back}>
              &larr; Back to the homepage
            </Link>
          </section>
        </main>
      </div>

      <SiteFooter current="/resources" wide />
    </div>
  );
}
