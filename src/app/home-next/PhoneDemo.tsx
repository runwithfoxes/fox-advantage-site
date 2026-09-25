"use client";

import { useEffect, useState } from "react";
import "../for/_components/library/agent-windows.css";
import n from "./next.module.css";

/**
 * THE FEATURED ITEM: texting your agents from a phone.
 *
 * Paul, 25 Sep 2026, second pass: "You're not using our figures from our design system. It's
 * about 10 times too big. And I wanted to feel like a text message... You can talk to your
 * agents on your phone. You can send them messages, but it needs to look like a phone.
 * Everything needs to be tight and neat... restrained and professional."
 *
 * Built from the library's Outreach window parts (agent-windows.css): the .ppw-chd header with
 * an avatar, the .ppw-b bubbles (grey out, white in, the curved corner), the .ppw-type dots.
 * Sized like the homepage figures, not a poster. The conversation holds its full height from
 * the start, so nothing below it moves while it plays.
 */
type Msg = { from: "you" | "agents"; t: string };
/* Paul, 25 Sep: the agent has a name, Klara, and texts him first. The sign-up number is
   made up for the mockup, on his word. */
const THREAD: Msg[] = [
  { from: "agents", t: "Good morning Paul. Sign-ups from the campaign are on track at 142." },
  { from: "agents", t: "I've sent you your daily competitor pricing results." },
  { from: "agents", t: "You've a meeting clash at 2pm. Want me to reschedule with Susan?" },
  { from: "you", t: "Yes please" },
];

export default function PhoneDemo() {
  // starts complete, so the phone reads with no JS; the effect replays it
  const [shown, setShown] = useState(THREAD.length);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, f: () => void) => timers.push(setTimeout(() => !cancelled && f(), ms));
    const run = () => {
      setShown(0);
      setTyping(false);
      at(500, () => setTyping(true));
      at(1700, () => { setTyping(false); setShown(1); });
      at(2300, () => setTyping(true));
      at(3400, () => { setTyping(false); setShown(2); });
      at(4000, () => setTyping(true));
      at(5200, () => { setTyping(false); setShown(3); });
      at(6800, () => setShown(4));
      at(12000, run);
    };
    run();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  /* Composed the way the live hero is (Paul, 25 Sep, third pass: "we don't want that box
     behind it... I feel like I'm just looking at a wireframe"): no frame, the phone on its own
     on the page's dot ground. The Campaign window behind it came out on Paul's word the same evening. */
  return (
    <div className={n.phoneStage}>
      <div className={n.phoneFrame}>
      <div className={`ppw-scope ${n.phone}`}>
        <div className={n.phoneTop} aria-hidden>
          <span>9:41</span>
          <span className={n.phoneIsland} />
          <span className={n.phoneSig} />
        </div>
        <div className={`ppw-ibx ${n.phoneIbx}`}>
          <div className="ppw-conv">
            <div className="ppw-chd">
              <span className="ppw-av ppw-a1">K</span>
              <div className="ppw-who">
                Klara
                <div className="ppw-sub2">Project manager &middot; an AI</div>
              </div>
            </div>
            <div className={`ppw-stream ${n.phoneStream}`}>
              <div className="ppw-day">Today</div>
              {THREAD.slice(0, shown).map((m, i) => (
                <div key={i} className={`ppw-b ${m.from === "you" ? "ppw-out" : "ppw-in"}`}>
                  {m.t}
                </div>
              ))}
              {typing ? (
                <div className="ppw-b ppw-type">
                  <span />
                  <span />
                  <span />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={n.phoneHome} aria-hidden />
      </div>
      </div>
    </div>
  );
}
