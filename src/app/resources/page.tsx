import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import Archive from "./Archive";
import HubHero from "./HubHero";
import { AREAS, getLibrary, formatDay, type Area } from "./library";
import { CATEGORIES, OWNER_LABEL, type Owner } from "./data";
import { REPORTS, INSTRUMENTS, TOOLS, PLAYBOOKS, CALENDAR, type Report } from "./examples";
import { MODULES } from "../course/courseModules";
import { getAllEssays } from "@/lib/essays";
import { getAllDispatches } from "@/lib/diary";
import s from "./front.module.css";

export const metadata: Metadata = {
  title: "Ireland and AI | Run with Foxes",
  robots: { index: false, follow: false },
};

const ORDER: Owner[] = ["state", "middle", "other"];
const COLS = ORDER.flatMap((o) => CATEGORIES.filter((c) => c.owner === o).sort((a, b) => b.rate - a.rate));

function Ex({ on }: { on: boolean }) {
  return on ? <span className={s.ex}>Example</span> : null;
}

/** Cover art: a chart in the brand blues, and a subtle fox in the corner, the way the book
 *  chapters carry one. None of the example covers carries a number. */
function CoverArt({ r }: { r: Report }) {
  return (
    <div className={s.coverArt} aria-hidden>
      {r.cover === "bars" && (
        <div className={s.coverBars}>
          {COLS.map((c) => (
            <i key={c.name} className={s[c.owner]} style={{ height: `${c.rate * 100}%` }} />
          ))}
        </div>
      )}
      {r.cover === "rings" && (
        <svg viewBox="0 0 200 160" className={s.coverSvg}>
          {[74, 58, 42, 26, 10].map((rad, i) => (
            <circle key={rad} cx="92" cy="80" r={rad} fill={["#E3EEF5", "#C4DCEA", "#6CAAC8", "#3A7CA5", "#1A3A4E"][i]} />
          ))}
        </svg>
      )}
      {r.cover === "blocks" && (
        <svg viewBox="0 0 200 160" className={s.coverSvg}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={14 + i * 24} y={150 - (i + 1) * 21} width="18" height={(i + 1) * 21} fill={["#C4DCEA", "#A7CBE0", "#6CAAC8", "#3A7CA5", "#2B5E80", "#1A3A4E"][i]} />
          ))}
        </svg>
      )}
      {r.cover === "grid" && (
        <svg viewBox="0 0 200 160" className={s.coverSvg}>
          {Array.from({ length: 35 }).map((_, i) => {
            const shade = ["#E3EEF5", "#C4DCEA", "#6CAAC8", "#3A7CA5", "#1A3A4E"][(i * 7 + Math.floor(i / 7)) % 5];
            return <rect key={i} x={10 + (i % 7) * 22} y={12 + Math.floor(i / 7) * 28} width="18" height="24" fill={shade} />;
          })}
        </svg>
      )}
      <img className={s.coverFox} src={`/fox/${r.fox}`} alt="" />
    </div>
  );
}

/**
 * /resources. Name still open (Paul, 24 Sep: "the observatory is not going to be right").
 * Colour enters through the artwork, never the chrome: the flagship chart, the report covers
 * with a fox on each, the essays' own illustrations. The page type stays calm.
 */
export default function ResourceHubPage() {
  const library = getLibrary().filter((e) => !e.soon);
  const entries = library.map((e) => ({ ...e, day: formatDay(e.date) }));
  const areaNames = Object.fromEntries(AREAS.map((a) => [a.key, a.name])) as Record<Area, string>;
  const latest = library.filter((e) => e.type !== "Study" && e.type !== "Category").slice(0, 4);
  const others = REPORTS.filter((r) => r.no !== "No. 01");

  return (
    <div className={s.page}>
      <HubHero
        lines={[
          ...REPORTS.map((r) => ({ label: `Report ${r.no}${r.example ? " · example" : ""}`, title: r.title, href: r.href })),
          ...INSTRUMENTS.map((t) => ({ label: `Tracker${t.example ? " · example" : ""}`, title: t.what, href: t.href })),
          ...library
            .filter((e) => e.type !== "Study")
            .map((e) => ({ label: `${e.type} · ${formatDay(e.date)}`, title: e.title, href: e.href })),
        ]}
      />

      <main className={s.wrap}>
        {/* ── Latest, as words: the pictures were foxes, and foxes now live on the report covers only ── */}
        <section className={s.latestRow}>
          {latest.map((e) => (
            <Link key={e.href} href={e.href} className={s.latestCell}>
              <span className={s.meta}>
                {e.type} &middot; {formatDay(e.date)}
              </span>
              <span className={s.picTitle}>{e.title}</span>
              {e.dek ? <span className={s.latestDek}>{e.dek}</span> : null}
            </Link>
          ))}
        </section>

        {/* ── Who writes here: four streams, each with its own voice and rhythm ── */}
        <section className={s.shelf} id="writers">
          <div className={s.shelfHead}>
            <h2 className={s.h2}>Who writes here</h2>
            <span className={s.meta}>Two people and two agents, each named for what they are</span>
          </div>
          <div className={s.writers}>
            <div className={s.writer}>
              <div className={s.byline}>
                <img src="/Paul_photo.jpg" alt="" />
                <div>
                  <span className={s.personName}>Paul Dervan</span>
                  <span className={s.meta}>Essays &middot; founder</span>
                </div>
              </div>
              <ul className={s.writerList}>
                {getAllEssays().slice(0, 3).map((e) => (
                  <li key={e.slug}>
                    <Link href={`/essays/${e.slug}`}>{e.title}</Link>
                    <span>{formatDay(e.date)}</span>
                  </li>
                ))}
              </ul>
              <Link className={s.writerAll} href="/essays">All essays →</Link>
            </div>
            <div className={s.writer}>
              <div className={s.byline}>
                <span className={s.agentMark}>L</span>
                <div>
                  <span className={s.personName}>Lena</span>
                  <span className={s.meta}>The agent team diary &middot; an agent, daily</span>
                </div>
              </div>
              <ul className={s.writerList}>
                {getAllDispatches().slice(0, 3).map((d) => (
                  <li key={d.slug}>
                    <Link href={`/diary/${d.slug}`}>{d.title}</Link>
                    <span>{formatDay(d.date)}</span>
                  </li>
                ))}
              </ul>
              <Link className={s.writerAll} href="/diary">The whole diary →</Link>
            </div>
            <div className={s.writer}>
              <div className={s.byline}>
                <span className={s.initials}>SO</span>
                <div>
                  <span className={s.personName}>Susan O&rsquo;Shea</span>
                  <span className={s.meta}>Research &middot; head of research</span>
                </div>
              </div>
              <p className={s.writerSoon}>Susan joins in October. Her first piece goes up here.</p>
            </div>
            <div className={s.writer}>
              <div className={s.byline}>
                <span className={s.agentMark}>J</span>
                <div>
                  <span className={s.personName}>The jobs and AI desk</span>
                  <span className={s.meta}>Irish job ads &middot; an agent, weekly</span>
                </div>
              </div>
              <ul className={s.writerList}>
                <li>
                  <Link href="/resources/jobs-ai">About 1 in 13 new marketing and sales ads asks anything real about AI</Link>
                  <span>24 Sept 2026</span>
                </li>
                <li>
                  <Link href="/resources/jobs-ai#careers">Tech firms&rsquo; careers pages ask for AI four times as often</Link>
                  <span>24 Sept 2026</span>
                </li>
              </ul>
              <Link className={s.writerAll} href="/resources/jobs-ai">The tracker →</Link>
            </div>
          </div>
        </section>

        {/* ── Reports: covers with a fox on each ── */}
        <section className={s.shelf} id="reports">
          <div className={s.shelfHead}>
            <h2 className={s.h2}>Reports</h2>
            <span className={s.meta}>Numbered editions on a fixed calendar</span>
          </div>
          <div className={s.covers}>
            {others.map((r) => {
              const body = (
                <>
                  <div className={s.cover}>
                    <div className={s.coverTop}>
                      <span>{r.no}</span>
                      <span>{r.cadence}</span>
                    </div>
                    <CoverArt r={r} />
                    <div className={s.coverFoot}>
                      <span className={s.coverTitle}>{r.title}</span>
                    </div>
                  </div>
                  <span className={s.meta}>
                    First edition {r.when} <Ex on={r.example} />
                  </span>
                  <p className={s.coverLine}>{r.line}</p>
                </>
              );
              return r.href ? (
                <Link key={r.no} href={r.href} className={s.coverCard}>
                  {body}
                </Link>
              ) : (
                <div key={r.no} className={s.coverCard}>
                  {body}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Areas ── */}
        <section className={s.areas} aria-label="Areas">
          {AREAS.map((a) => {
            const items = library.filter((e) => e.area === a.key);
            return (
              <div key={a.key} className={s.area} id={`area-${a.key}`}>
                <span className={s.areaName}>{a.name}</span>
                <ul className={s.areaList}>
                  {items.slice(0, 3).map((e) => (
                    <li key={e.href}>
                      <Link href={e.href}>{e.title}</Link>
                    </li>
                  ))}
                </ul>
                <span className={s.areaCount}>
                  {items.length} {items.length === 1 ? "piece" : "pieces"}
                </span>
              </div>
            );
          })}
        </section>

        {/* ── Trackers ── */}
        <section className={s.shelf} id="trackers">
          <div className={s.shelfHead}>
            <h2 className={s.h2}>Trackers</h2>
            <span className={s.meta}>Read by our agents. A big move waits for the next read.</span>
          </div>
          <div className={s.board}>
            {INSTRUMENTS.map((t) => (
              <div key={t.name} className={s.boardRow}>
                <span className={`${s.dot} ${t.status === "testing" ? s.dotOn : ""}`} aria-hidden />
                <div className={s.boardName}>
                  {t.href ? <Link href={t.href}>{t.name}</Link> : t.name}
                  <span>{t.what}</span>
                </div>
                <span className={s.boardCell}>{t.reads}</span>
                <span className={s.boardCell}>
                  {t.status}
                  {t.last ? `, ${t.last}` : ""}
                </span>
                <p className={s.boardLine}>
                  {t.line} <Ex on={t.example} />
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tools ── */}
        <section className={s.shelf} id="tools">
          <div className={s.shelfHead}>
            <h2 className={s.h2}>Tools</h2>
            <span className={s.meta}>Free. Your own full result is the only thing we ask an email for.</span>
          </div>
          <div className={s.tools}>
            {TOOLS.map((t) => {
              const inner = (
                <>
                  <div className="mod-winbar">
                    <span className="mod-lights">
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="mod-wintitle">{t.bar}</span>
                  </div>
                  <div className={s.toolBody}>
                    <span className={s.toolName}>
                      {t.name} <Ex on={t.example} />
                    </span>
                    <p>{t.line}</p>
                    <span className={s.toolGo}>{t.href ? "Open →" : "Coming"}</span>
                  </div>
                </>
              );
              return t.href ? (
                <Link key={t.name} href={t.href} className={`mod-win ${s.tool}`}>
                  {inner}
                </Link>
              ) : (
                <div key={t.name} className={`mod-win ${s.tool} ${s.toolSoon}`}>
                  {inner}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Playbooks, and the course ── */}
        <section className={`${s.shelf} ${s.split}`} id="playbooks">
          <div>
            <div className={s.shelfHead}>
              <h2 className={s.h2}>Playbooks</h2>
              <span className={s.meta}>Prompts, files and templates we use</span>
            </div>
            <div className={s.files}>
              {PLAYBOOKS.map((p) => (
                <div key={p.name} className={s.fileRow}>
                  <span className={s.fileName}>
                    {p.name} <Ex on={p.example} />
                  </span>
                  <span className={s.fileKind}>
                    {p.kind} &middot; {p.from}
                  </span>
                  <span className={s.fileActs}>
                    {p.href ? <Link href={p.href}>Open</Link> : <span>Open</span>}
                    <span>Copy</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={s.shelfHead}>
              <h2 className={s.h2}>The course</h2>
              <span className={s.meta}>AI Fluency for Ambitious Marketers. Free.</span>
            </div>
            <ol className={s.modules}>
              {MODULES.map((m) => (
                <li key={m.n} className={m.built ? s.modOpen : undefined}>
                  <span className={s.modDot} />
                  <Link href={m.built ? `/course/${m.n}` : `/course#m${m.n}`}>{m.title.replace(/^\(\d\)\s*/, "")}</Link>
                  <span className={s.modWhen}>{m.built ? "Open now" : m.when}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── Coming up ── */}
        <section className={s.shelf}>
          <div className={s.shelfHead}>
            <h2 className={s.h2}>Coming up</h2>
            <span className={s.meta}>The next six months</span>
          </div>
          <div className={s.calendar}>
            {CALENDAR.map((c) => (
              <div key={c.month} className={s.month}>
                <span className={s.monthName}>{c.month}</span>
                {c.items.map((it) => (
                  <span key={it.t} className={s.monthItem}>
                    {it.t} <Ex on={it.example} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ── How we publish, and who ── */}
        <section className={`${s.shelf} ${s.split}`}>
          <div>
            <h2 className={s.h2}>How we publish</h2>
            <ol className={s.standards}>
              <li>Every number carries the date it was read.</li>
              <li>The method and its limits sit beside the finding.</li>
              <li>A big move waits for the next read to confirm it.</li>
              <li>Studies are free to read, with no form.</li>
              <li>We only ask for an email when the answer is about you.</li>
            </ol>
          </div>
          <div>
            <h2 className={s.h2}>Research team</h2>
            <div className={s.people}>
              <div className={s.person}>
                <img src="/Paul_photo.jpg" alt="Paul Dervan" />
                <div>
                  <span className={s.personName}>Paul Dervan</span>
                  <span className={s.meta}>Founder, Run with Foxes</span>
                </div>
              </div>
              <div className={s.person}>
                <span className={s.initials}>SO</span>
                <div>
                  <span className={s.personName}>Susan O&rsquo;Shea</span>
                  <span className={s.meta}>Head of research, from October 2026</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Archive entries={entries} areaNames={areaNames} />
      </main>

      <SiteFooter current="/resources" wide />
      <div className={s.banner}>
        Mockup, 24 Sep 2026. Anything tagged Example is made up for this mockup. GEO Ireland numbers are day one and not signed off.
      </div>
    </div>
  );
}
