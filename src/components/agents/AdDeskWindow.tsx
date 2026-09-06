"use client";

import { useEffect, useRef, useState } from "react";

/*
  ADVERTISING AGENT - the real campaign, the real ad, the real numbers.

  Paul, 6 Sep 2026: "We have some images we can use and some stats that we
  create some sort of dashboard from, from the work that we did, our Run with
  Foxes AI fluency course where we were running Facebook ads. Find the ads and
  find the data, an animated dashboard, and show the actual ads."

  So this is our own Meta campaign for the free course, "RWF Free Course -
  Meta capability proof - Jul 2026", account 22987145. The ad on the left is
  the one that ran (c1-scroll, the animated square with the six module titles
  scrolling), playing itself. The numbers are pulled from the Meta Marketing
  API on 6 Sep 2026, date range maximum, one row a day, and they agree with
  Jo's desk records (intelligence/jo-desk-state.md, 19 Aug entry). Source
  file for the series: the scratchpad's course-campaign-daily.json, copied
  into DAILY below.

  ⛔ NO SIGNUPS ARE SHOWN. Nobody can say how many course registrations came
  from Meta: the Conversions API never fired (the ad account had no dataset,
  and creating one needed the Business Portfolio that Meta restricted on
  1 Aug 2026). Spend, reach, clicks and landing page views are real; a
  registration number here would be invented. The caption says so.
*/

/** date, spend in euro, impressions, clicks, landing page views */
const DAILY: [string, number, number, number, number][] = [
  ["30 Jul", 0.99, 382, 4, 0],
  ["31 Jul", 4.15, 1190, 21, 7],
  ["1 Aug", 4.06, 1160, 21, 15],
  ["2 Aug", 4.59, 1727, 21, 13],
  ["3 Aug", 5.6, 1812, 30, 18],
  ["4 Aug", 5.27, 1627, 23, 17],
  ["5 Aug", 4.48, 1403, 18, 8],
  ["6 Aug", 4.67, 1462, 21, 17],
  ["7 Aug", 5.44, 1545, 23, 17],
  ["8 Aug", 4.93, 1296, 18, 11],
  ["9 Aug", 5.95, 1634, 26, 18],
  ["10 Aug", 5.21, 1352, 20, 12],
  ["11 Aug", 4.67, 1403, 26, 15],
  ["12 Aug", 4.26, 1210, 20, 12],
  ["13 Aug", 4.59, 1330, 21, 10],
  ["14 Aug", 4.92, 1309, 24, 11],
  ["15 Aug", 5.35, 1567, 38, 26],
  ["16 Aug", 5.83, 1616, 24, 14],
  ["17 Aug", 4.51, 1215, 16, 12],
  ["18 Aug", 5.24, 1293, 16, 16],
  ["19 Aug", 3.48, 830, 16, 11],
];

const TOTALS = { spend: 98.19, reach: 12561, clicks: 447, views: 281, costPerView: 0.35 };

/** Counts from 0 to `to` over `ms`, eased, when `go` flips true. */
function useCount(to: number, go: boolean, ms = 1400) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) {
      setV(0);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      const e = 1 - Math.pow(1 - p, 3);
      setV(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, go, ms]);
  return v;
}

const euro = (n: number) => "€" + n.toFixed(2);
const int = (n: number) => Math.round(n).toLocaleString("en-IE");

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="agw-stat">
      <div className="agw-stat-n">{value}</div>
      <div className="agw-stat-l">{label}</div>
      {sub ? <div className="agw-stat-s">{sub}</div> : null}
    </div>
  );
}

export default function AdDeskWindow() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  // the counters and the bars run when the window scrolls into view, and
  // they run again if it leaves and comes back, like the typed notes
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => setGo(e.isIntersecting)),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const spend = useCount(TOTALS.spend, go);
  const reach = useCount(TOTALS.reach, go);
  const clicks = useCount(TOTALS.clicks, go);
  const views = useCount(TOTALS.views, go);

  const max = Math.max(...DAILY.map((d) => d[4]));

  return (
    <div className={`agw agw-addesk${go ? " go" : ""}`} ref={rootRef}>
      <div className="agw-tl">
        <i />
        <i />
        <i />
        <span className="agw-t">Advertising Agent</span>
        <span className="agw-pill">the course campaign &middot; 21 days</span>
      </div>
      <div className="agw-panel agw-ad2">
        <div className="agw-ad2-side">
          <div className="agw-k">the ad that ran</div>
          <div className="agw-fbad">
            <div className="agw-fbad-top">
              <span className="agw-fbad-av">R</span>
              <span>
                Run with Foxes
                <em>Sponsored</em>
              </span>
            </div>
            <p className="agw-fbad-body">
              The list is open now. A free course in AI fluency for marketers, six modules, one
              every fortnight, at your own pace.
            </p>
            <video
              className="agw-fbad-video"
              src="/agents/advertising/c1-scroll.mp4"
              poster="/agents/advertising/c1-scroll-f1.png"
              autoPlay
              muted
              loop
              playsInline
              aria-label="The course ad: a square animated ad with the six module titles scrolling past a fox"
            />
            <div className="agw-fbad-foot">
              <span>
                <b>Get on the list. It&rsquo;s free.</b>
                <em>runwithfoxes.com</em>
              </span>
              <span className="agw-fbad-cta">Sign up</span>
            </div>
          </div>
        </div>
        <div className="agw-ad2-main">
          <div className="agw-k">30 july to 19 august 2026 &middot; ireland &middot; &euro;5 a day</div>
          <div className="agw-stats">
            <Stat label="spent" value={euro(spend)} />
            <Stat label="people reached" value={int(reach)} />
            <Stat label="clicks" value={int(clicks)} />
            <Stat label="course page" value={int(views)} sub={`€${TOTALS.costPerView.toFixed(2)} a visit`} />
          </div>
          <div className="agw-k agw-chart-k">people on the course page, each day</div>
          <div className="agw-bars" role="img" aria-label="A bar a day for 21 days, people landing on the course page, between 7 and 26 a day">
            {DAILY.map(([d, s, , c, v], i) => (
              <div className="agw-bar-slot" key={d} style={{ ["--i" as string]: i }}>
                <div className="agw-bar" style={{ height: `${(v / max) * 100}%` }} />
                <div className="agw-bar-tip" role="tooltip">
                  <b>{d}</b> {v} on the page &middot; {c} clicks &middot; {euro(s)}
                </div>
              </div>
            ))}
          </div>
          <div className="agw-bar-axis">
            <span>30 Jul</span>
            <span>19 Aug</span>
          </div>
          <p className="agw-ad2-note">
            Four headlines went live on the first day. One carried the whole run at a steady
            &euro;0.35 a visit, so the other three were paused and the budget went to it.
          </p>
        </div>
      </div>
    </div>
  );
}
