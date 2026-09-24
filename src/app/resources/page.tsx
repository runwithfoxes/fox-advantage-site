import Link from "next/link";
import type { Metadata } from "next";
import { getAllEssays, formatEssayDate } from "@/lib/essays";
import { MODULES, isLive } from "../course/courseModules";
import { MODULE_BLURBS } from "../course/courseCopy";
import ModuleArtefact from "../course/ModuleArtefact";
import { Shell, Item, Frame, OwnerStrip, CategoryChips } from "./parts";
import s from "./resources.module.css";

export const metadata: Metadata = {
  title: "Resources | Run with Foxes",
  robots: { index: false, follow: false },
};

/**
 * /resources, the front door. The module page's grammar, turned into a library: the rail is
 * the list of shelves, each shelf is a numbered item, and each shelf reuses the thing it
 * points at (the course's own module card, the essays index's own rows).
 */
export default function ResourcesPage() {
  const essays = getAllEssays();
  const live = MODULES.find((m) => isLive(m)) ?? MODULES[0];

  return (
    <Shell
      back={{ href: "/", label: "← home" }}
      railTitle="Resources"
      railHref="/resources"
      railLabel="/on the shelves"
      rail={[
        { href: "#research", k: "01", t: "Research: GEO Ireland" },
        { href: "#trackers", k: "02", t: "Trackers" },
        { href: "#course", k: "03", t: "The course" },
        { href: "#essays", k: "04", t: `Essays (${essays.length})` },
        { href: "#answers", k: "05", t: "Short answers" },
      ]}
    >
      <header className="mod-masthead">
        <p className="mod-eyebrow">Resources &middot; free to read</p>
        <h1 className="mod-h1">
          Research on AI and <span className="mod-hl">marketing</span>
        </h1>
        <div className="chapter-fox-hero">
          <img className="chapter-fox-hero-img" src="/fox/chapter-fox-sitting-nobg.png" alt="" />
        </div>
        <p className="mod-standfirst">
          What we find out running our own agents, measuring AI search in Ireland and reading
          what employers ask for. Published as we go, with the method and the limits beside
          every number.
        </p>
        <div className="mod-meta">
          <span>
            Research<b>1 study, 41 categories</b>
          </span>
          <span>
            Trackers<b>1 testing, 2 planned</b>
          </span>
          <span>
            Course<b>6 modules, 1 open</b>
          </span>
          <span>
            Essays<b>{essays.length}</b>
          </span>
          <span>
            Sharing<b>Copy anything. Send it on.</b>
          </span>
        </div>
      </header>

      <main>
        <Item id="research" n={1} title="Who AI names when you ask an Irish question" href="/resources/geo-ireland" hint="Read the study">
          <Frame label="Who is named most in each of the 41 categories">
            <OwnerStrip />
            <CategoryChips />
          </Frame>
          <p className="mod-body">
            We asked five AI engines the questions people in Ireland ask, across 41 categories
            from tax to hotels, and counted the names that came back. In 17 categories the name
            is a state body. In most of the rest it is a booking site or a marketplace. The
            brands paying for the advertising are rarely the answer.
          </p>
          <p className="mod-body">Repeated every quarter. Susan O&rsquo;Shea leads research from October.</p>
        </Item>

        <Item id="trackers" n={2} title="Trackers our agents read every day">
          <div className="mod-win" style={{ marginTop: 4 }}>
            <div className="mod-winbar">
              <span className="mod-lights">
                <i />
                <i />
                <i />
              </span>
              <span className="mod-wintitle">trackers</span>
            </div>
            <table className={s.trk}>
              <thead>
                <tr>
                  <th>Tracker</th>
                  <th>Status</th>
                  <th>Read</th>
                  <th>This week</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Link href="/resources/jobs-ai">Jobs and AI</Link>
                  </td>
                  <td>testing</td>
                  <td>daily</td>
                  <td className={s.line}>
                    Wayflyer is hiring a revenue analyst: &ldquo;You&rsquo;re an AI-native builder.&rdquo;
                  </td>
                </tr>
                <tr>
                  <td>Who AI recommends in Ireland</td>
                  <td className={s.soon}>planned</td>
                  <td className={s.soon}>daily</td>
                  <td className={`${s.line} ${s.soon}`}>
                    The GEO Ireland questions asked every morning, so a brand can watch its own name move.
                  </td>
                </tr>
                <tr>
                  <td>Irish ads by sector</td>
                  <td className={s.soon}>planned</td>
                  <td className={s.soon}>weekly</td>
                  <td className={`${s.line} ${s.soon}`}>
                    What each sector is running on Meta this week, and what changed.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mod-body" style={{ marginTop: 24 }}>
            A big move waits for the next read to confirm it before it goes up.
          </p>
        </Item>

        <Item id="course" n={3} title="AI Fluency for Ambitious Marketers" href="/course" hint="All six modules">
          {/* The course page's own module card, reused whole, with its own artefact window. */}
          <div className={`co-root ${s.courseCard}`} style={{ background: "none", padding: 0 }}>
            <article className="co-card">
              <div className="co-chrome">
                <i className="r" />
                <i className="y" />
                <i className="g" />
                <span className="co-chrome-name">Module {live.n}</span>
              </div>
              <div className="co-cardbody">
                <div className="co-cardinfo">
                  <h3 className="co-cardtitle">{live.title}</h3>
                  <p>{MODULE_BLURBS[live.n]}</p>
                  <div className="co-cardfoot">
                    <span className="co-badge">Live</span>
                    <span className="co-when">Open now</span>
                  </div>
                  <Link className="co-cardaction" href={`/course/${live.n}`}>
                    What&apos;s in it <span aria-hidden>→</span>
                  </Link>
                </div>
                <ModuleArtefact art={live.art} />
              </div>
            </article>
          </div>
          <div className="mod-reading">
            <span className="mod-readinglbl">Coming next</span>
            {MODULES.filter((m) => m.n !== live.n).map((m) => (
              <Link key={m.n} className="mod-readinglink" href={`/course#m${m.n}`}>
                {m.title}
                <i>Opens {m.when}</i>
              </Link>
            ))}
          </div>
        </Item>

        <Item id="essays" n={4} title="Essays" href="/essays" hint={`All ${essays.length}`}>
          {/* The essays index's own rows, the newest four. */}
          <div className={`essay-list ${s.essays}`}>
            {essays.slice(0, 4).map((e) => (
              <Link key={e.slug} href={`/essays/${e.slug}`} className="essay-list-item">
                {e.image ? <img className="essay-list-thumb" src={e.image} alt="" /> : <span className="essay-list-thumb" />}
                <div>
                  <div className="essay-list-title">{e.title}</div>
                  {e.dek ? <div className="essay-list-dek">{e.dek}</div> : null}
                  <div className="essay-list-date">{formatEssayDate(e.date)}</div>
                </div>
              </Link>
            ))}
          </div>
        </Item>

        <Item id="answers" n={5} title="Short answers to the questions we get asked">
          <div className="mod-reading" style={{ marginTop: 0, paddingTop: 0, borderTop: 0 }}>
            {[
              ["/what-is-a-marketing-agent", "What is a marketing agent?"],
              ["/what-does-a-marketing-agent-cost", "What does a marketing agent cost?"],
              ["/ai-marketing-agent-vs-agency", "An AI agent or an agency?"],
              ["/when-an-ai-agent-needs-a-human", "When does an AI agent need a human?"],
              ["/ai-marketing-ireland", "AI marketing in Ireland"],
              ["/answer-engine-optimization", "Answer engine optimisation: 18 things worth knowing"],
            ].map(([href, t]) => (
              <Link key={href} className="mod-readinglink" href={href}>
                {t}
              </Link>
            ))}
          </div>
        </Item>
      </main>
    </Shell>
  );
}
