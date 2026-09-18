"use client";

// THE REPORTING SUITE. Built 28 Aug 2026 for Bright, where Seamus Moore's first
// and loudest problem was this, in his own words on the call:
//
//   "I can't go from traffic to leads to MQL to closed won, just can't. It's in
//    HubSpot. It's in Google Analytics." ... "All our reports are in Excel."
//    ... "We need reporting like one suite of reporting because HubSpot's not
//    it."
//
// So the exhibit is that sentence answered: his four funnel stages across the
// top of one window, the channel panels underneath, and the checking agent.
// The stages are named the way he named them and not the way a dashboard
// vendor would.
//
// ⛔ EVERY NUMBER IN HERE IS INVENTED AND THE EXHIBIT SAYS SO ON ITS FACE.
// Paul, 28 Aug: "you can be in ballpark for these figures. so they feel right."
// Ballpark means plausible, never measured. Bright's own real figures - the
// 463,000 contacts, the €300k of search, the seven webinars a week - are
// deliberately NOT in the frame. They sit in the prose around it instead.
// Putting a client's real totals inside a dashboard makes the illustrative
// numbers beside them read as measured too, and then the page has told him we
// looked at a funnel we have never seen.
//
// The checking agent is Paul's own line from the same call: "You've got an
// agent whose only job is to do the analytics and another one whose only job is
// to make sure that the one doing the analytics is doing it correctly." That is
// the part that matters when a buyer is in the room, so it is on the exhibit
// rather than only in the prose.
//
// Motion rule, same as every other exhibit here: the base state is the finished
// scene. The bars have their full width in the markup and the animation only
// replays it, so with JavaScript off or reduced motion on, the reader sees the
// completed dashboard rather than an empty frame.

import { useEffect, useRef, useState } from "react";
import { ScaledWindow } from "./AgentWindows";
import "./agent-windows.css";
import "./reporting-suite.css";

interface Stage {
  name: string;
  value: string;
  sub: string;
  pct: number; // bar width, proportional to the stage above
}

// Illustrative. A quarter for a payroll and accounting software business
// selling into the UK and Ireland: a lot of top-of-funnel off the website,
// a form fill rate in the low single digits, and a real sales cycle after it.
const FUNNEL: Stage[] = [
  { name: "Traffic", value: "148,200", sub: "sessions", pct: 100 },
  { name: "Leads", value: "4,940", sub: "3.3% of traffic", pct: 62 },
  { name: "MQL", value: "1,180", sub: "23.9% of leads", pct: 34 },
  { name: "Closed won", value: "214", sub: "18.1% of MQL", pct: 15 },
];

interface Panel {
  label: string;
  head: string;
  rows: { k: string; v: string }[];
}

const PANELS: Panel[] = [
  {
    label: "Search",
    head: "Paid and organic, read daily",
    rows: [
      { k: "Spend, quarter", v: "€74,800" },
      { k: "Revenue attributed", v: "€412,600" },
      { k: "ROAS", v: "5.5x" },
      { k: "Keywords costing, not returning", v: "31" },
    ],
  },
  {
    label: "Email",
    head: "The database, by segment",
    rows: [
      { k: "Sent, quarter", v: "1.24m" },
      { k: "Revenue attributed", v: "€386,900" },
      { k: "Triggered vs broadcast", v: "18% / 82%" },
      { k: "Unsubscribed", v: "0.31%" },
    ],
  },
  {
    label: "Webinars",
    head: "Registration through to pipeline",
    rows: [
      { k: "Run, quarter", v: "84" },
      { k: "Attended", v: "11,700" },
      { k: "Became leads", v: "1,340" },
      { k: "Pipeline created", v: "€1.9m" },
    ],
  },
];

const SOURCES = ["HubSpot", "GA4", "Google Ads", "LinkedIn Ads", "the ESP"];

export default function ReportingSuite() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref}>
      <ScaledWindow width={940}>
        <div className="pprs-wrap">
          <div className="ppw-frame-win">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">one suite of reporting</span>
              <span className="ppw-live-pill">refreshed this morning</span>
            </div>

            <div className="pprs-body" data-run={run ? "1" : "0"}>
              <div className="pprs-head">
                <p className="pprs-head-k">Traffic through to closed won</p>
                <p className="pprs-head-note">Quarter to date. Illustrative figures.</p>
              </div>

              <div className="pprs-funnel">
                {FUNNEL.map((s, i) => (
                  <div className="pprs-stage" key={s.name}>
                    <div className="pprs-stage-top">
                      <span className="pprs-stage-name">{s.name}</span>
                      <span className="pprs-stage-value">{s.value}</span>
                    </div>
                    <div className="pprs-bar-track">
                      <div
                        className="pprs-bar"
                        style={{
                          width: s.pct + "%",
                          transitionDelay: 90 * i + "ms",
                        }}
                      />
                    </div>
                    <p className="pprs-stage-sub">{s.sub}</p>
                  </div>
                ))}
              </div>

              <div className="pprs-panels">
                {PANELS.map((p) => (
                  <div className="pprs-panel" key={p.label}>
                    <p className="pprs-panel-label">{p.label}</p>
                    <p className="pprs-panel-head">{p.head}</p>
                    <div className="pprs-rows">
                      {p.rows.map((r) => (
                        <div className="pprs-row" key={r.k}>
                          <span className="pprs-row-k">{r.k}</span>
                          <span className="pprs-row-v">{r.v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pprs-foot">
                <div className="pprs-sources">
                  <span className="pprs-foot-k">Pulled from</span>
                  {SOURCES.map((s) => (
                    <span className="pprs-src" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
                <div className="pprs-check">
                  <span className="pprs-check-dot" />
                  <span>
                    A second agent checked these numbers against the sources
                    before the report was written. 4 of 4 agreed.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="pprs-illus">
            Illustrative. This shows what the suite produces and how it reads. It
            is not a measurement of Bright, because we have not seen your data.
          </p>
        </div>
      </ScaledWindow>
    </div>
  );
}
