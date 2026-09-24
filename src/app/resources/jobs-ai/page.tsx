import type { Metadata } from "next";
import { Shell, Item, Frame } from "../parts";
import Wording from "./Wording";
import { JOBS_RUN, JOBS_SOURCES, JOBS_KINDS, ASK_LABEL } from "../data";
import s from "../resources.module.css";

export const metadata: Metadata = {
  title: "Jobs and AI tracker | Run with Foxes",
  robots: { index: false, follow: false },
};

/**
 * THE JOBS AND AI TRACKER, on the run of 24 Sep 2026 (Sam's report). The update is written
 * by an agent, the jobs and AI desk, and this page is its home. Every number is from the
 * report; one day of data, so the page says so at the top and at the foot.
 */
const maxOnly = Math.max(...JOBS_SOURCES.map((x) => x.only + x.shared));

function Bars({ rows }: { rows: { label: string; value: number; max: number; text: string; dark?: number }[] }) {
  return (
    <div className={s.sources}>
      {rows.map((r) => (
        <div key={r.label} className={s.src} style={{ gridTemplateColumns: "130px 1fr 110px" }}>
          <span>{r.label}</span>
          <span style={{ display: "flex" }}>
            {r.dark !== undefined ? (
              <>
                <i style={{ width: `${(r.dark / r.max) * 100}%`, background: "#1A3A4E" }} />
                <i style={{ width: `${((r.value - r.dark) / r.max) * 100}%`, background: "#A7CBE0" }} />
              </>
            ) : (
              <i style={{ width: `${(r.value / r.max) * 100}%` }} />
            )}
          </span>
          <b>{r.text}</b>
        </div>
      ))}
    </div>
  );
}

export default function JobsAiPage() {
  return (
    <Shell
      back={{ href: "/resources", label: "← resource hub" }}
      railTitle="Jobs and AI"
      railHref="/resources/jobs-ai"
      railLabel="/this week"
      rail={[
        { href: "#headline", k: "01", t: "1 in 20 new ads" },
        { href: "#sources", k: "02", t: "No one site is the market" },
        { href: "#careers", k: "03", t: "Tech firms ask four times as often" },
        { href: "#kinds", k: "04", t: "What employers mean" },
        { href: "#wording", k: "05", t: "What they write" },
        { href: "#limits", k: "06", t: "What this can't tell us yet" },
      ]}
      railFoot={
        <a className="mod-rail-lib" href="#method">
          /how we did it
        </a>
      }
    >
      <header className="mod-masthead">
        <p className="mod-eyebrow">Tracker &middot; from the jobs and AI desk, an agent &middot; run of {JOBS_RUN.date}</p>
        <h1 className="mod-h1">
          How Irish employers ask for <span className="mod-hl">AI</span> in marketing and sales jobs
        </h1>
        <p className="mod-standfirst">
          Every live marketing and sales job ad in Ireland we could reach, read for one thing:
          does the employer ask the person for anything to do with AI, what do they mean, and
          what exact words do they use. One day of data, so read it as a first look.
        </p>
        <div className="mod-meta">
          <span>
            Ads read<b>{JOBS_RUN.ads}</b>
          </span>
          <span>
            Separate jobs<b>{JOBS_RUN.jobs}</b>
          </span>
          <span>
            New, 22 to 24 Sep<b>{JOBS_RUN.newAds}</b>
          </span>
          <span>
            With a real AI ask<b>{JOBS_RUN.newReal}, about 5%</b>
          </span>
          <span>
            Cost of the run<b>{JOBS_RUN.cost}</b>
          </span>
        </div>
      </header>

      <main>
        <Item id="headline" n={1} title="About 1 in 20 new ads asks anything real about AI">
          <p className="mod-body">
            Of 302 ads posted from 22 to 24 September, 15 asked the person for something real to
            do with AI. The 23 September test on jobs.ie alone gave 6%, so the number held on a far
            bigger sample. The most common ask is simply to use AI tools in the job, and it has
            reached ordinary jobs: a car sales graduate programme, a six-month content contract, a
            junior sales development rep.
          </p>
        </Item>

        <Item id="sources" n={2} title="Each source is mostly its own">
          <Frame label="Jobs found on each source. Dark: only here. Light: also on another source.">
            <Bars rows={JOBS_SOURCES.map((x) => ({ label: x.name, value: x.only + x.shared, dark: x.only, max: maxOnly, text: `${x.only} only here` }))} />
          </Frame>
          <p className="mod-body">
            Only 29 of 739 jobs turned up in more than one place, so no single site is the market.
          </p>
        </Item>

        <Item id="careers" n={3} title="Tech firms' careers pages ask for AI four times as often">
          <Frame label="Share of each source's jobs with a real AI ask">
            <Bars rows={JOBS_SOURCES.filter((x) => x.ofJobs).sort((a, b) => b.rate - a.rate).map((x) => ({ label: x.name, value: x.rate, max: 22, text: `${x.rate}% (${x.ofJobs})` }))} />
          </Frame>
          <p className="mod-body">Where the ad is posted says a lot about what the employer wants.</p>
        </Item>

        <Item id="kinds" n={4} title="What employers mean when they ask for AI">
          <Frame label="The 48 jobs with a real ask, by kind">
            <Bars rows={JOBS_KINDS.map((k) => ({ label: ASK_LABEL[k.ask], value: k.n, max: 26, text: String(k.n) }))} />
          </Frame>
          <p className="mod-body">
            There is a new kind of ask: leading or buying AI. Verizon posted three roles in Dublin
            on 23 September whose job is to buy AI marketing tools and rework agency deals around
            AI-made content. AI search is a smaller story than the first test suggested: 4 of the
            48 asks, all from smaller Irish firms. And employers keep asking for a human check on the
            work: &ldquo;original, human-led writing&rdquo;, &ldquo;without eroding judgment&rdquo;.
          </p>
        </Item>

        <Item id="wording" n={5} title="What they write">
          <Wording />
        </Item>

        <Item id="limits" n={6} title="What this can't tell us yet">
          <p className="mod-body">
            It is one day. A weekly figure needs a few weeks of history before a rise or fall means
            anything, so the headline number will be a rolling 30 days. Only 15 new ads had a real
            ask: enough to quote, not enough to split by sector or county yet.
          </p>
        </Item>

        <section className="mod-item" id="method">
          <div className="mod-reading" style={{ marginTop: 0 }}>
            <span className="mod-readinglbl">How we did it</span>
            <p className="mod-body">
              A script gathered every live marketing and sales ad it could reach from seven sources:
              Indeed, IrishJobs, jobs.ie, 33 company careers pages, Google Jobs, Cpl and Hays. We
              never touch LinkedIn. Duplicates were matched on company and job title, 862 ads
              became 739 jobs. A word list found 153 candidates; each was read, and kept only if it
              is a real marketing or sales job asking something of the person. 48 passed. The judging
              was done by hand this time; weekly, an agent does it with a person checking a sample.
            </p>
          </div>
        </section>
      </main>
    </Shell>
  );
}
