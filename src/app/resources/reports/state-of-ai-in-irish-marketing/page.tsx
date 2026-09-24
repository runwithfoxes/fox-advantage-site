import Link from "next/link";
import type { Metadata } from "next";
import { Shell, Item, Frame } from "../../parts";
import s from "../../resources.module.css";

export const metadata: Metadata = {
  title: "The State of AI in Irish Marketing | Run with Foxes",
  robots: { index: false, follow: false },
};

/**
 * ⛔ AN EXAMPLE REPORT, INVENTED FOR THE MOCKUP (Paul, 24 Sep 2026: "just make them up").
 * It shows what a flagship report page looks like: edition, chapters, method, cite line.
 * It states what each chapter WILL measure and holds no findings, because a made-up finding
 * about Irish marketing is a fabricated claim, whatever page it sits on.
 */
const CHAPTERS = [
  { id: "c1", t: "What marketers actually do with AI", line: "Built from behaviour, not a survey: which lessons people open, what they copy and what they come back to, counted across every course member and published only in totals." },
  { id: "c2", t: "What employers now ask for", line: "A year of the Jobs and AI tracker: the wording by kind of ask, the tools named, and the new job titles with the date each first appeared." },
  { id: "c3", t: "Who AI recommends in Ireland", line: "Four quarters of GEO Ireland side by side, category by category, with what moved and what held." },
  { id: "c4", t: "What the agents cost", line: "The running cost of the agents we operate ourselves, per task, and where a person still has to step in." },
  { id: "c5", t: "What we would do next year", line: "Our read, labelled as our read, with the evidence for each call beside it." },
];

export default function StateOfAiReport() {
  return (
    <Shell
      back={{ href: "/resources#reports", label: "← the observatory" }}
      railTitle="The Observatory"
      railHref="/resources"
      railLabel="/in this report"
      rail={CHAPTERS.map((c, i) => ({ href: `#${c.id}`, k: String(i + 1).padStart(2, "0"), t: c.t }))}
      railFoot={
        <a className="mod-rail-lib" href="#method">
          /how it is made
        </a>
      }
    >
      <header className="mod-masthead">
        <p className="mod-eyebrow">
          Report No. 02 &middot; annual &middot; first edition January 2027 &middot; example
        </p>
        <h1 className="mod-h1">
          The State of <span className="mod-hl">AI</span> in Irish Marketing
        </h1>
        <p className="mod-standfirst">
          Once a year, everything we have measured about AI and marketing in Ireland in one
          place: what marketers do, what employers ask for, who AI recommends, and what the
          agents cost to run.
        </p>
        <div className="mod-meta">
          <span>
            Edition<b>No. 02, first</b>
          </span>
          <span>
            Published<b>January, every year</b>
          </span>
          <span>
            Sources<b>4 of our own</b>
          </span>
          <span>
            Access<b>Free, no form</b>
          </span>
        </div>
      </header>

      <main>
        <Item id="cover" n={0} title="The cover">
          <Frame label="Example cover. The figure on the finished report will be drawn from its own lead finding.">
            <svg viewBox="0 0 600 260" style={{ width: "100%", height: "auto", display: "block" }} aria-hidden>
              {[120, 96, 72, 48, 24].map((r, i) => (
                <circle key={r} cx="300" cy="130" r={r} fill="none" stroke={i === 2 ? "#3A7CA5" : "#1A3A4E"} strokeWidth={i === 2 ? 8 : 1.4} />
              ))}
            </svg>
          </Frame>
        </Item>
        {CHAPTERS.map((c, i) => (
          <Item key={c.id} id={c.id} n={i + 1} title={c.t}>
            <p className="mod-body">{c.line}</p>
          </Item>
        ))}
        <section className="mod-item" id="method">
          <div className="mod-reading" style={{ marginTop: 0 }}>
            <span className="mod-readinglbl">How it is made</span>
            <p className="mod-body">
              Every source is our own and every number carries the date it was read. Course
              data is published only in totals, never by company or by name. The method for
              each chapter sits at the foot of that chapter.
            </p>
          </div>
          <div className="mod-reading">
            <span className="mod-readinglbl">Cite as</span>
            <p className="mod-body">Run with Foxes, The State of AI in Irish Marketing, No. 02, January 2027.</p>
          </div>
          <div className="mod-reading">
            <span className="mod-readinglbl">Built from</span>
            <Link className="mod-readinglink" href="/resources/geo-ireland">
              GEO Ireland No. 01<i>Study</i>
            </Link>
            <Link className="mod-readinglink" href="/resources/jobs-ai">
              Jobs and AI<i>Tracker</i>
            </Link>
          </div>
        </section>
      </main>
    </Shell>
  );
}
