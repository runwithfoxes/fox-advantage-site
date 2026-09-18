"use client";

// The Brief Coach's figure: the ladder of marketing metrics from its own
// product page, recreated in the house register. Five rungs, and the lit
// rung walks from Activity at the bottom to Commercial at the top, which is
// the coaching in one picture. Typographic, hairlines, one loud colour.

import "./ladder-figure.css";

const RUNGS = [
  { name: "Commercial", detail: "Profit · Revenue" },
  { name: "Customer behaviour", detail: "Penetration · Frequency · Share of wallet" },
  { name: "Memory", detail: "Salience · Consideration · Coming to mind" },
  { name: "Communication", detail: "Reach · Engagement · Registrations" },
  { name: "Activity", detail: "Budget spent · Impressions bought · Assets shipped" },
];

export default function LadderFigure() {
  return (
    <div className="ppld" role="img" aria-label="The ladder of marketing metrics, the lit rung walking from Activity up to Commercial">
      {RUNGS.map((r, i) => (
        <div className="ppld-rung" key={r.name} style={{ ["--i" as string]: i }}>
          <span className="ppld-name">{r.name}</span>
          <span className="ppld-detail">{r.detail}</span>
        </div>
      ))}
      <p className="ppld-caption">
        Every goal sits on one of these rungs. Only the top is a commercial
        outcome. The coach lights the rung your brief is on, and walks it up.
      </p>
    </div>
  );
}
