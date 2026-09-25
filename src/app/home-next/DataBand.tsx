"use client";

import Link from "next/link";
import { CATEGORIES, JOBS_KINDS, JOBS_RUN, JOBS_SOURCES, ASK_LABEL } from "../resources/data";
import { DAILY, TOTALS } from "@/components/agents/AdDeskWindow";
import n from "./next.module.css";

/**
 * THE NUMBERS. Paul, 25 Sep 2026: "we need to have a lot of the charts... you might see on the
 * Anthropic economic index", and on Sam's research: "make a certain amount of research available
 * to read and ask people to subscribe to login for the higher value in depth parts."
 *
 * Each card: a finding as its title, one chart read in a glance, where it came from and when,
 * what is free, and the deeper cut that needs a sign-in. Every number is read off a file:
 * data.ts (GEO Ireland day one, NOT signed off; Jobs and AI, 24 Sep) and AdDeskWindow.tsx (our
 * Meta campaign, read from the API 6 Sep). No chart without labels (Paul, 24 Sep).
 */
const OWN = { state: "#1A3A4E", middle: "#6CAAC8", other: "#CFCFC9" } as const;

function Card({
  bar,
  kicker,
  title,
  stamp,
  children,
  deeper,
  learn,
  draft,
}: {
  bar: string;
  kicker: string;
  title: string;
  stamp: string;
  children: React.ReactNode;
  deeper: string;
  learn?: { t: string; href: string };
  draft?: boolean;
}) {
  return (
    /* A depicted window, like the module pages' .mod-win (Paul, 25 Sep: "it feels a bit flat
       because of flat edges"): rounded, soft shadow, the grey bar with the three lights. */
    <article className={`mod-win ${n.dWin}`}>
      <div className="mod-winbar">
        <span className="mod-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="mod-wintitle">{bar}</span>
      </div>
      <div className={n.dCard}>
      <span className={n.dKick}>
        {kicker} {draft ? <span className={n.dDraft}>Draft</span> : null}
      </span>
      <h3 className={n.dTitle}>{title}</h3>
      <div className={n.dChart}>{children}</div>
      <span className={n.dStamp}>{stamp}</span>
      <div className={n.dFoot}>
        <a href="#account" className={n.dLock}>
          <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden>
            <rect x="2" y="5.5" width="8" height="5.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 5.5V4a2 2 0 014 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          {deeper}
        </a>
        {learn ? (
          <Link href={learn.href} className={n.dLearn}>
            {learn.t}
          </Link>
        ) : null}
      </div>
      </div>
    </article>
  );
}

export default function DataBand() {
  const n41 = CATEGORIES.length;
  const counts = { state: 0, middle: 0, other: 0 };
  CATEGORIES.forEach((c) => (counts[c.owner] += 1));
  const kindsTotal = JOBS_KINDS.reduce((a, k) => a + k.n, 0);
  const kindMax = Math.max(...JOBS_KINDS.map((k) => k.n));
  const boards = JOBS_SOURCES.filter((s) => s.ofJobs);
  const rateMax = Math.max(...boards.map((s) => s.rate));
  const views = DAILY.map((d) => d[4]);
  const vMax = Math.max(...views);

  return (
    <section className={n.data} id="data">
      <div className={n.dHead}>
        <h2 className={n.dH2}>The numbers</h2>
        {/* the live markers (Paul, 25 Sep, point 5): real counts, each with its read date */}
        <div className={n.liveRow}>
          <span><i className={n.liveDot} /> Updated 24 Sep</span>
          <span><b>{JOBS_RUN.jobs}</b> job ads read</span>
          <span><b>{n41}</b> categories asked</span>
          <span><b>5</b> AI engines</span>
          <span><b>1,000+</b> marketers on the course</span>
        </div>
      </div>

      <div className={n.dGrid}>
        <Card
          bar="geo_ireland"
          kicker="GEO Ireland · AI answers"
          title={`In ${counts.state} of ${n41} categories, the first name AI gives is a state body`}
          stamp={`Five engines, ${n41} categories of Irish life · day one, read 23 Aug 2026`}
          deeper="Your category, engine by engine"
          learn={{ t: "Learn to be found in AI answers →", href: "/course" }}
          draft
        >
          <div className={n.stack} role="img" aria-label={`State body ${counts.state}, booking site or marketplace ${counts.middle}, brand or other ${counts.other}`}>
            {(["state", "middle", "other"] as const).map((k) => (
              <i key={k} style={{ flex: counts[k], background: OWN[k] }} />
            ))}
          </div>
          <div className={n.stackKey}>
            <span><i style={{ background: OWN.state }} /> State body {counts.state}</span>
            <span><i style={{ background: OWN.middle }} /> Booking site {counts.middle}</span>
            <span><i style={{ background: OWN.other }} /> Brand or other {counts.other}</span>
          </div>
        </Card>

        <Card
          bar="jobs_and_ai"
          kicker="Jobs and AI · Jeff"
          title={`${JOBS_RUN.real} of ${JOBS_RUN.jobs} marketing and sales job ads ask for anything real about AI`}
          stamp={`Seven sources, one day · read ${JOBS_RUN.date}`}
          deeper="Every ad, by role and seniority"
          learn={{ t: "Learn the tools employers name →", href: "/course" }}
        >
          <div className={n.hbars}>
            {JOBS_KINDS.map((k) => (
              <div key={k.ask} className={n.hbar}>
                <span className={n.hLab}>{ASK_LABEL[k.ask]}</span>
                <span className={n.hTrack}>
                  <i style={{ width: `${(k.n / kindMax) * 100}%` }} />
                </span>
                <span className={n.hVal}>{k.n}</span>
              </div>
            ))}
          </div>
          <span className={n.dNote}>What the {kindsTotal} asks were for</span>
        </Card>

        <Card
          bar="jobs_and_ai · sources"
          kicker="Jobs and AI · where they ask"
          title="Company careers pages ask for AI about four times as often as the job boards"
          stamp={`Share of each source's ads with a real AI ask · read ${JOBS_RUN.date}`}
          deeper="The full source table, and the quotes"
        >
          <div className={n.hbars}>
            {boards.map((s) => (
              <div key={s.name} className={n.hbar}>
                <span className={n.hLab}>{s.name}</span>
                <span className={n.hTrack}>
                  <i style={{ width: `${(s.rate / rateMax) * 100}%`, background: s.name === "Careers pages" ? "#1A3A4E" : undefined }} />
                </span>
                <span className={n.hVal}>{s.rate}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card
          bar="meta_campaign"
          kicker="Our own campaign · Meta"
          title={`Our course ads held at ${Math.round(TOTALS.costPerView * 100)}c a visit for 21 days`}
          stamp={`€5 a day, 30 Jul to 19 Aug 2026 · read from Meta 6 Sep`}
          deeper="The daily breakdown and every ad we tested"
          learn={{ t: "How we run ads with an agent →", href: "/#agents" }}
        >
          <div className={n.spark} role="img" aria-label="Visits to the course page each day, 30 July to 19 August">
            {views.map((v, i) => (
              <i key={i} style={{ height: `${(v / vMax) * 100}%` }} />
            ))}
          </div>
          <div className={n.sparkAxis}>
            <span>30 Jul</span>
            <span>{TOTALS.views} visits</span>
            <span>19 Aug</span>
          </div>
        </Card>
      </div>
    </section>
  );
}
