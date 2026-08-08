"use client";

// A self-rating slider, ported from the course's ModuleArrival pattern: a native
// range input with a big square thumb, a label that changes as the value moves,
// and a large readout. Used to open the adoption demonstration: the reader
// places their own team on the scale before we show what we do about it.
// The finished state is the default; nothing is hidden behind interaction.

import { useState } from "react";
import "./rate-slider.css";

const LEVELS = [
  "Not started yet",
  "A few experiments",
  "Some people use it weekly",
  "Most people use it weekly",
  "Used daily, unevenly",
  "Used daily by most",
  "Built into some workflows",
  "Built into most workflows",
  "Building things with it",
  "It's how the team works",
];

export default function RateSlider({
  question,
}: {
  question: string;
}) {
  const [value, setValue] = useState(4);

  return (
    <div className="pprs-root">
      <p className="pprs-question">{question}</p>
      <div className="pprs-row">
        <div className="pprs-track">
          <input
            type="range"
            min={1}
            max={10}
            value={value}
            aria-label={question}
            onChange={(e) => setValue(Number(e.target.value))}
          />
          <div className="pprs-ends">
            <span>1</span>
            <span>10</span>
          </div>
        </div>
        <div className="pprs-readout">
          <span className="pprs-num">{value}</span>
          <span className="pprs-label">{LEVELS[value - 1]}</span>
        </div>
      </div>
    </div>
  );
}
