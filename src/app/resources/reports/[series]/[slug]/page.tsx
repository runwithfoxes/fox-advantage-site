import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import { REPORTS, reportBySlug, seriesBySlug, seriesHref, day } from "../../../catalogue";
import { Chart, FigureWindow, Gate, DownloadPdf, Example } from "../../../kit";
import { Rail } from "../../../the-ai-ask/2026-q3/Parts";
import { Top, Byline, nextEdition } from "../../shared";
import s from "../../reports.module.css";

export function generateStaticParams() {
  return REPORTS.filter((r) => !r.href).map((r) => ({ series: r.series, slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ series: string; slug: string }> }): Promise<Metadata> {
  const r = reportBySlug((await params).slug);
  return { title: r ? `${r.title} | Run with Foxes` : "Reports | Run with Foxes", robots: { index: false, follow: false } };
}

/**
 * /resources/reports/[series]/[slug], AN EDITION. The generated report, in The AI Ask's shape
 * (Paul, 25 Sep: "give the report the full dray works"), so every edition of every series reads
 * the way the one he liked reads. A real edition with its own page (href) redirects there; the
 * template never makes a second copy of a real report.
 *
 * Craft ledger:
 * - the note: one mono line in orange, the mockup's own voice, saying the numbers are made up
 *   (or that a real one is a draft). It leaves with the mockup.
 * - the masthead: eyebrow (series, edition, sectors), the title at full column, the byline with
 *   the author's mark, standfirst, the download. Beside it the at-a-glance window with the fox
 *   on its edge (one fox per page) and each finding's number, and the next edition's date.
 * - what we found: one card per finding, the number big, the sentence under it, each a link to
 *   its section, so the report can be read in thirty seconds or in ten minutes.
 * - the body: The AI Ask's rail (percent read, dots) and reading column. Each finding is a
 *   section whose heading IS the insight sentence, with its figure under it; a finding with no
 *   figure gets its number drawn big on a hairline band instead of an empty space.
 * - the figures: kit/Chart in the module window, varied kinds, titles that say what they prove.
 * - method: details rows, the sign-off with the author's mark, then the gate and the way back.
 */
export default async function EditionPage({ params }: { params: Promise<{ series: string; slug: string }> }) {
  const { slug } = await params;
  const r = reportBySlug(slug);
  if (!r) notFound();
  if (r.href) redirect(r.href);
  const se = seriesBySlug(r.series)!;
  const next = nextEdition(se);
  const crumbs = [{ href: "/resources", t: "Resources" }, { href: "/resources/reports", t: "Reports" }, { href: seriesHref(se), t: se.name }, { t: r.edition }];

  if (r.status === "coming") {
    return (
      <div className={s.page}>
        <Top crumbs={crumbs} />
        <main className={s.wrap}>
          <section className={s.coming}>
            <div className={s.eyebrow}>
              <span>{se.name}</span>
              <span className={s.badge}>{r.edition}</span>
              <span>Announced</span>
            </div>
            <h1 className={s.h1} style={{ marginTop: 14 }}>{r.title}</h1>
            <p className={s.comingWhen}>{day(r.date)}</p>
            <p className={s.stand}>{r.standfirst}</p>
            <p className={s.p} style={{ marginTop: 16, color: "#4a4a46" }}>
              {se.method} Sample: {r.sample}.
            </p>
            <Gate adds={r.withAccount} head="When it lands" />
            <div className={s.backs}>
              <Link href={seriesHref(se)}>&larr; Every edition of {se.name}</Link>
              <Link href="/resources/reports">All reports</Link>
            </div>
          </section>
        </main>
        <SiteFooter current="/resources" wide />
      </div>
    );
  }

  const sections = r.findings.map((f, i) => ({ f, fig: r.figures[i], id: `finding-${i + 1}` }));
  const extra = r.figures.slice(r.findings.length);
  const rail = [
    { id: "top", k: "", t: "At a glance" },
    ...sections.map((x, i) => ({ id: x.id, k: String(i + 1), t: x.f.label })),
    ...(extra.length ? [{ id: "more", k: "", t: "More figures" }] : []),
    { id: "method", k: "", t: "How we did it" },
  ];
  let figN = 0;

  return (
    <div className={s.page}>
      <Top crumbs={crumbs} />
      <main className={s.wrap}>
        <p className={s.note}>
          {r.example ? "Example report. Every number on this page is made up, to show the shape of an edition." : `Draft. ${r.author.name}'s text and numbers, not yet approved for the live site.`}
        </p>
        <header className={s.mast} id="top">
          <div className={s.mastMain}>
            <div className={s.eyebrow}>
              <span>{se.name}</span>
              <span className={s.badge}>{r.edition}</span>
              <span>{se.cadence}</span>
              {r.sectors.length ? <span style={{ color: "#8A8A85" }}>{r.sectors.slice(0, 3).join(" · ")}</span> : null}
              <Example on={r.example} />
            </div>
            <h1 className={s.h1}>{r.title}</h1>
            <Byline r={r} />
            <p className={s.stand}>{r.standfirst}</p>
            <div id="download">
              <DownloadPdf href={r.pdf} pages={r.pages} />
            </div>
          </div>
          <aside className={`mod-win ${s.glance}`} aria-label="At a glance">
            <div className="mod-winbar">
              <span className="mod-lights"><i /><i /><i /></span>
              <span className="mod-wintitle">at_a_glance</span>
            </div>
            <div className={s.glanceBody}>
              <img className={s.glanceFox} src="/fox/chapter-fox-sitting-nobg.png" alt="" />
              <span className={s.glanceSample}>{r.sample}</span>
              {r.findings.map((f) => (
                <div key={f.label} className={s.glanceRow}>
                  <span className="mod-num">{f.big}</span>
                  <span className="mod-lbl">{f.label}</span>
                </div>
              ))}
              {next ? <span className={s.glanceNext}>Next edition: {next.t}, {day(next.date)}</span> : null}
            </div>
          </aside>
        </header>

        <div className={s.sectionHead} style={{ marginTop: 0 }}>
          <h2 className={s.h2}>What we found</h2>
          <span>{r.findings.length} findings, each one a section</span>
        </div>
        <ol className={s.fGrid}>
          {sections.map((x, i) => (
            <li key={x.id}>
              <a href={`#${x.id}`} className={s.fCard}>
                <span className={s.fN}>0{i + 1}</span>
                <span className={s.fBig}>{x.f.big}</span>
                <span className={s.fBigL}>{x.f.label}</span>
                <span className={s.fText}>{x.f.text}</span>
                <span className={s.fGo}>Read it &rarr;</span>
              </a>
            </li>
          ))}
        </ol>

        <div className={s.body}>
          <aside className={s.railCol}>
            <Rail items={rail} />
          </aside>
          <div className={s.main} id="report-main">
            {sections.map((x, i) => (
              <section key={x.id} id={x.id} className={s.chapter}>
                <span className={s.chN}>Finding {i + 1}</span>
                <h2 className={s.chH2}>{x.f.text}</h2>
                {x.fig ? (
                  <FigureWindow id={x.fig.id} n={String(++figN)} title={x.fig.title} caption={x.fig.caption}>
                    <Chart data={x.fig.data} />
                  </FigureWindow>
                ) : (
                  <div className={s.bigBand}>
                    <span className={s.bigNum}>{x.f.big}</span>
                    <span className={s.bigLab}>
                      {x.f.label}
                      {x.f.count ? ` · ${x.f.count.k.toLocaleString("en-IE")} of ${x.f.count.n.toLocaleString("en-IE")}` : ""}
                    </span>
                  </div>
                )}
              </section>
            ))}
            {extra.length ? (
              <section id="more" className={s.chapter}>
                <span className={s.chN}>More figures</span>
                <h2 className={s.chH2}>The rest of what the data shows</h2>
                {extra.map((fig) => (
                  <FigureWindow key={fig.id} id={fig.id} n={String(++figN)} title={fig.title} caption={fig.caption}>
                    <Chart data={fig.data} />
                  </FigureWindow>
                ))}
              </section>
            ) : null}
            <section id="method" className={s.chapter} style={{ borderBottom: 0 }}>
              <span className={s.chN}>Method</span>
              <h2 className={s.chH2}>How we did it</h2>
              {[
                { k: "The sample", t: `${r.sample}, read for ${se.name} ${r.edition}${r.example ? ". Example data, made up for the mockup." : "."}` },
                { k: "The method", t: se.method },
                { k: "The check", t: r.checkedBy ? `${r.checkedBy} checked every number against the source before it went on the page.` : "Checked by the author." },
                { k: "What is free", t: `${r.free.length ? r.free.join("; ") + ". " : ""}Every finding and every figure on this page, no form.` },
              ].map((m, i) => (
                <details key={m.k} className={s.meth} open={i === 0}>
                  <summary>
                    <span>{m.k}</span>
                    <em>open</em>
                  </summary>
                  <p className={s.small}>{m.t}</p>
                </details>
              ))}
              <div className={s.sign}>
                <i className={s.mark}>{r.author.name[0]}</i>
                <p className={s.small}>
                  {r.author.name}, {r.author.role}. {se.name} is read {se.cadence.toLowerCase()}; the next edition{next ? ` is ${next.t}, ${day(next.date)}` : " is on the way"}.
                </p>
              </div>
              <Gate adds={r.withAccount} />
              <div className={s.backs}>
                <Link href={seriesHref(se)}>&larr; Every edition of {se.name}</Link>
                <Link href="/resources/reports">All reports</Link>
                <Link href="/home-next">The homepage</Link>
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter current="/resources" wide />
    </div>
  );
}
