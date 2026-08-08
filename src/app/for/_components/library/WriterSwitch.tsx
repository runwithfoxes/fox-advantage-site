"use client";

// The writer, demonstrated by its one real mechanism: the brand pack is the
// input. Same brief, two different brand packs, and the reader flips between
// them and watches the same machine write in two different voices. The point
// lands in one click: your voice is held because your pack is what it reads.
//
// Finished state is the default (the first brand's email is fully visible with
// no interaction); switching replays the lines with a short stagger.

import { useState } from "react";
import "./writer-switch.css";

type Brand = {
  key: string;
  name: string;
  reads: string[];
  lines: string[];
  sign: string;
};

const BRIEF = "Win back a lapsed customer. Email, under 120 words.";

const BRANDS: Brand[] = [
  {
    key: "kite",
    name: "Kite Insurance",
    reads: ["positioning.md", "audience.md", "tone-of-voice.md"],
    lines: [
      "Hi Michael,",
      "Your commercial quote from March lapsed without a renewal conversation, and that's on us.",
      "One thing worth knowing before you place this year's book: Kite quotes commercial the same day, no re-keying. Three of your clients renewed with us last year without a single query.",
      "If turnaround matters to your desk, I'll hold a line open on Thursday.",
    ],
    sign: "Claire, Kite broker desk",
  },
  {
    key: "harbour",
    name: "Harbour Hotel",
    reads: ["positioning.md", "guest-voice.md"],
    lines: [
      "Hi Michael,",
      "It's been a year since your last stay, and the harbour is at its best right now.",
      "The water-side rooms have just been redone, and breakfast still runs until eleven.",
      "If you fancy a night down, reply to this and I'll set the water-side rate aside for you.",
    ],
    sign: "Grainne, Harbour Hotel",
  },
];

export default function WriterSwitch() {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0);
  const brand = BRANDS[active];

  const pick = (i: number) => {
    if (i === active) return;
    setActive(i);
    setRun((r) => r + 1);
  };

  return (
    <div className="ppws-root">
      <div className="ppws-bar">
        <i></i><i></i><i></i>
        <span className="ppws-title">the writer</span>
        <span className="ppws-live">same brief, your voice</span>
      </div>
      <div className="ppws-body">
        <div className="ppws-brief">
          <span className="ppws-k">the brief</span>
          <span className="ppws-btext">{BRIEF}</span>
        </div>
        <div className="ppws-switch" role="tablist" aria-label="Choose a brand pack">
          {BRANDS.map((b, i) => (
            <button
              key={b.key}
              role="tab"
              aria-selected={i === active}
              className={i === active ? "ppws-on" : ""}
              onClick={() => pick(i)}
            >
              {b.name} pack
            </button>
          ))}
        </div>
        <div className="ppws-email" key={run}>
          {brand.lines.map((line, i) => (
            <p
              key={i}
              className="ppws-line"
              style={{ animationDelay: `${0.1 + i * 0.35}s` }}
            >
              {line}
            </p>
          ))}
          <p
            className="ppws-line ppws-sign"
            style={{ animationDelay: `${0.1 + brand.lines.length * 0.35}s` }}
          >
            {brand.sign}
          </p>
        </div>
        <div className="ppws-reads">
          <span className="ppws-k">the writer read</span>
          {brand.reads.map((f) => (
            <span key={f} className="ppws-file">{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
