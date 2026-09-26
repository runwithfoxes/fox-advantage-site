"use client";

import { useState } from "react";
import k from "./kit.module.css";
import Lock from "./Lock";

/**
 * THE GATE (Paul, 26 Sep 2026: "let people see research to an extent, get them to subscribe for
 * the better, detailed stuff, while still being generous and not pushy").
 *
 * The rule: the finding is free; your own answer and the working files need an email. One free
 * account opens everything, and once someone has it they are never asked again.
 *
 * So this sits at the END of a piece as a quiet list of what an account adds, never as a pop-up
 * and never cutting a piece off halfway. ⛔ MOCKUP: the form posts nowhere, and says so.
 */
export default function Gate({ adds, head = "With a free account" }: { adds: string[]; head?: string }) {
  const [done, setDone] = useState(false);
  if (!adds.length) return null;
  return (
    <aside className={k.gate} aria-label="What a free account adds">
      <div>
        <p className={k.gateHead}>{head}</p>
        <ul className={k.gateList}>
          {adds.map((a) => (
            <li key={a}>
              <Lock />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        {done ? (
          <p className={k.gateDone}>You have full access. Everything above is open to you.</p>
        ) : (
          <form
            className={k.gateForm}
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            <input type="email" required placeholder="you@company.ie" aria-label="Work email" />
            <button type="submit">Get full access, free</button>
          </form>
        )}
        <p className={k.gateNote}>One account opens every report, tracker, dataset and the course. No payment, ever. Mockup: this form sends nothing.</p>
      </div>
    </aside>
  );
}
