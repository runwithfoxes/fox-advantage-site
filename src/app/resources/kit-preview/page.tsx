import { REPORTS, TRACKERS, day } from "../catalogue";
import { Chart, FigureWindow, Gate, DownloadPdf, Sparkline, Example } from "../kit";

/**
 * /resources/kit-preview - every chart kind in the catalogue drawn once, with the gate, the
 * download and a sparkline, so a template agent can see the parts before using them.
 * Not linked from anywhere and not indexed. Mockup, 26 Sep 2026.
 */
export const metadata = { title: "Resource centre kit - Run with Foxes", robots: { index: false } };

export default function KitPreview() {
  const seen = new Set<string>();
  const figs = REPORTS.flatMap((r) => r.figures.map((f) => ({ r, f }))).filter(({ f }) => (seen.has(f.data.kind) ? false : (seen.add(f.data.kind), true)));
  const t = TRACKERS[4];
  return (
    <main style={{ maxWidth: 820, margin: "0 auto", padding: "48px 16px 96px" }}>
      <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#3A7CA5", letterSpacing: ".1em", textTransform: "uppercase" }}>Kit preview, one of each</p>
      {figs.map(({ r, f }, i) => (
        <FigureWindow key={f.data.kind} id={`k${i}`} n={`${i + 1}.1`} title={f.title} caption={`${f.data.kind} · from ${r.slug}`}>
          <Chart data={f.data} />
        </FigureWindow>
      ))}
      <p style={{ fontFamily: "var(--mono)", fontSize: 12 }}>
        {t.name} <Example on={t.example} /> · {t.reading} {t.readingLabel} · {day(t.lastRead)}
      </p>
      <Sparkline values={t.history} width={220} height={44} />
      <div style={{ margin: "32px 0" }}>
        <DownloadPdf href="/resources/pdf/the-ai-ask-2026-q3.pdf" pages={28} />
      </div>
      <Gate adds={REPORTS[3].withAccount} />
    </main>
  );
}
