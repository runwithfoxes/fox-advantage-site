import type { Metadata } from "next";
import { Shell, Item, Frame } from "../parts";
import Wording from "./Wording";
import s from "../resources.module.css";

export const metadata: Metadata = {
  title: "Jobs and AI tracker | Run with Foxes",
  robots: { index: false, follow: false },
};

/**
 * THE JOBS AND AI TRACKER. Paul, 23 Sep: "the main flaw is jobs.ie does not represent the
 * market", so the page never leads with a share. It leads with the sources, then the
 * library of real wording he leaned towards in place of a score.
 */
export default function JobsAiPage() {
  return (
    <Shell
      back={{ href: "/resources", label: "← resources" }}
      railTitle="Trackers"
      railHref="/resources#trackers"
      railLabel="/jobs and ai"
      rail={[
        { href: "#sources", k: "01", t: "Where the ads come from" },
        { href: "#wording", k: "02", t: "What employers write" },
        { href: "#titles", k: "03", t: "New job titles" },
      ]}
    >
      <header className="mod-masthead">
        <p className="mod-eyebrow">Tracker &middot; testing &middot; first read 23 Sep 2026</p>
        <h1 className="mod-h1">
          How Irish employers ask for <span className="mod-hl">AI</span> in marketing and sales jobs
        </h1>
        <p className="mod-standfirst">The exact words, from real job ads, sorted by what they ask for.</p>
        <div className="mod-meta">
          <span>
            Read<b>Daily</b>
          </span>
          <span>
            Sources<b>3, more to come</b>
          </span>
          <span>
            Real AI asks<b>About 10</b>
          </span>
          <span>
            30-day rate from<b>Thu 22 Oct</b>
          </span>
        </div>
      </header>

      <main>
        <Item id="sources" n={1} title="No one job site is the market">
          <Frame label="Marketing and sales ads read on 23 Sep 2026">
            <div className={s.overlap}>
              <div>
                <span className={s.figlabel} style={{ margin: 0 }}>jobs.ie</span>
                <b>28</b>
                <p>New ads from 22 and 23 Sep. Mostly car sales, retail and hotel roles. One AI ask.</p>
              </div>
              <div>
                <span className={s.figlabel} style={{ margin: 0 }}>Cpl</span>
                <b>21</b>
                <p>No AI asks. Six are the same ads as on jobs.ie.</p>
              </div>
              <div>
                <span className={s.figlabel} style={{ margin: 0 }}>Company careers pages</span>
                <b>98</b>
                <p>Live roles at 38 firms, mostly Dublin tech. About nine AI asks. None are on jobs.ie or Cpl.</p>
              </div>
            </div>
          </Frame>
          <p className="mod-body">
            Irish SME marketing ads ask for AI search. Dublin tech firms ask their sales and
            revenue staff to use AI tools. IrishJobs, Indeed and Google Jobs are next, and the
            rate waits until there are 30 days of reads behind it.
          </p>
        </Item>

        <Item id="wording" n={2} title="What employers write">
          <Wording />
        </Item>

        <Item id="titles" n={3} title="New job titles">
          <p className="mod-body">
            None recorded yet. A new title goes here with the date it was first seen.
          </p>
        </Item>
      </main>
    </Shell>
  );
}
