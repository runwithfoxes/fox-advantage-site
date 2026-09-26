import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import { TOOLS, AREA_LABEL, type Tool } from "../catalogue";
import { Example, Gate, Lock } from "../kit";
import Band from "../library/Band";
import f from "../front.module.css";
import T from "./tools.module.css";

export const metadata: Metadata = {
  title: "Tools | Run with Foxes",
  description: "Free tools for marketers: put something in, get a first look for nothing, the full result with a free account.",
  robots: { index: false, follow: false },
};

const ORDER: Tool["status"][] = ["live", "beta", "coming"];
const STATUS: Record<Tool["status"], string> = { live: "Live", beta: "Beta", coming: "Coming" };

/**
 * /resources/tools - the tools index.
 *
 * CRAFT LEDGER (DOCTRINE 7 Sep):
 * - Head band: the shared deep band, the checking fox (clipboard and watch), title full column.
 * - The window: the first live tool drawn as a screen, showing the gate rule as a picture: what
 *   you put in, what comes back free, what an account adds. Built from the tool's own three
 *   lines, so it is the real tool and not a mockup of a tool.
 * - The index: a table, not a card grid (BUILD-NOTES: Anthropic's publications are a plain
 *   table). Live first, then beta, then coming, each a chip. Rows with a page are links.
 * - The gate, last.
 */
export default function ToolsPage() {
  const tools = [...TOOLS].sort((a, b) => ORDER.indexOf(a.status) - ORDER.indexOf(b.status));
  const counts = ORDER.map((s) => ({ s, n: TOOLS.filter((t) => t.status === s).length }));
  const featured = tools.find((t) => t.status === "live" && t.href) ?? tools[0];

  return (
    <div className={f.page}>
      <Band
        kicker="tools"
        title={
          <>
            Tools you can use today, <em>free</em>
          </>
        }
        standfirst="Put something in and get a first look for nothing. The full result, the file, the notes, the rewrite, comes with a free account, and you are asked for it once. Each tool was built off a report or a lesson, so it checks the thing the research says matters."
        fox="fox-pm-nobg.png"
        aside={
          <figure className={`mod-win ${T.win}`}>
            <div className="mod-winbar">
              <span className="mod-lights">
                <i />
                <i />
                <i />
              </span>
              <span className="mod-wintitle">{featured.slug.replace(/-/g, "_")}</span>
            </div>
            <div className={T.winBody}>
              <span className={T.winLab}>How every tool works · {featured.name}</span>
              <span className={T.winStep}>01 · You put in</span>
              <div className={T.winInput}>
                <span>{featured.input}</span>
                <b>Run</b>
              </div>
              <span className={T.winStep}>02 · Free, on screen</span>
              <p className={T.winFree}>{featured.free}</p>
              <span className={T.winStep}>03 · With a free account</span>
              <p className={T.winFull}>
                <Lock /> {featured.full}
              </p>
              <span className={T.winTime}>about {featured.minutes} minutes</span>
            </div>
          </figure>
        }
      >
        <ul className={T.counts}>
          {counts.map((c) => (
            <li key={c.s}>
              <b>{c.n}</b>
              <span>{STATUS[c.s].toLowerCase()}</span>
            </li>
          ))}
        </ul>
      </Band>

      <main className={`${f.wrap} ${T.wrap}`}>
        <section className={T.sec} id="all">
          <div className={T.secHead}>
            <h2 className={T.h2}>Every tool</h2>
            <span className={T.secSub}>{TOOLS.length} tools · a first go is free on all of them</span>
          </div>
          <table className={T.table}>
            <thead>
              <tr>
                <th>Tool</th>
                <th>You put in</th>
                <th>Free, on screen</th>
                <th>With a free account</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tools.map((t) => (
                <tr key={t.slug} className={t.status === "coming" ? T.rowSoon : ""}>
                  <td data-l="Tool">
                    {t.href ? (
                      <a href={t.href} className={T.name}>
                        {t.name}
                      </a>
                    ) : (
                      <span className={T.name}>{t.name}</span>
                    )}
                    <Example on={t.example} />
                    <span className={T.line}>{t.line}</span>
                    <span className={T.area}>{AREA_LABEL[t.area]}</span>
                  </td>
                  <td data-l="You put in">{t.input}</td>
                  <td data-l="Free, on screen">{t.free}</td>
                  <td data-l="With a free account">
                    <Lock /> {t.full}
                  </td>
                  <td data-l="Time" className={T.num}>
                    {t.minutes} min
                  </td>
                  <td data-l="Status">
                    <span className={`${T.chip} ${T[t.status]}`}>{STATUS[t.status]}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={T.sec} id="account">
          <Gate adds={["The full result from every tool, not just the first look", "Your results kept, so you can run the same check next quarter and see what moved", "New tools the day they open, and the beta ones now"]} />
        </section>
      </main>

      <SiteFooter current="/resources" wide />
    </div>
  );
}
