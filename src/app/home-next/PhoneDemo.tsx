"use client";

import { useEffect, useRef, useState } from "react";
import n from "./next.module.css";

/**
 * THE FEATURED ITEM: the live hero's instruction, on a phone. Paul, 25 Sep 2026, on the dark
 * "You ~ run with foxes" terminal in the live hero: "Could this be not black and using our
 * figures but on what looks like an iphone screen. And this is thing we see on left of screen
 * as the featured item."
 *
 * Same instruction as the hero (AgentsHero.tsx, INSTR). Drawn in the course figures' language:
 * cream ground, dotted frame, sky blue for what moves. It types ONCE when it comes into view and
 * holds its finished height from the start, so nothing below it jumps (DOCTRINE, 6 Sep).
 */
const INSTR = "launch a campaign to 200 marketers who just changed roles";
const STEPS: [string, string][] = [
  ["Research", "finding who changed roles, and where they went"],
  ["Writer", "a first line for each person, in your voice"],
  ["Brand Guardian", "every message checked against your brand"],
  ["Outreach", "sent from your own inbox, a few each day"],
  ["Campaign Manager", "replies and meetings logged in your CRM"],
];

export default function PhoneDemo() {
  const root = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const [stage, setStage] = useState(0); // 0 typing, 1 answered, 2+ steps shown
  const started = useRef(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setTyped(INSTR.length);
      setStage(STEPS.length + 2);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting || started.current) return;
        started.current = true;
        for (let i = 1; i <= INSTR.length; i++) timers.push(setTimeout(() => setTyped(i), 400 + i * 38));
        const done = 400 + INSTR.length * 38;
        timers.push(setTimeout(() => setStage(1), done + 500));
        for (let s = 0; s <= STEPS.length; s++) timers.push(setTimeout(() => setStage(2 + s), done + 1200 + s * 700));
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className={n.phoneFrame} ref={root}>
      <div className={n.phone}>
        <div className={n.phoneIsland} aria-hidden />
        <div className={n.phoneBar}>
          <span>9:41</span>
          <span className={n.phoneApp}>/Runwithfoxes</span>
          <span aria-hidden>●●●</span>
        </div>
        <div className={n.phoneScreen}>
          <div className={n.phoneYou}>
            <span className={n.phoneWho}>You</span>
            <p className={n.phoneAsk}>
              {INSTR.slice(0, typed)}
              {stage === 0 ? <span className={n.phoneCur} aria-hidden /> : null}
            </p>
          </div>
          <div className={`${n.phoneReply} ${stage >= 1 ? n.on : ""}`}>
            <span className={n.phoneWho}>Your agents</span>
            <p className={n.phoneLead}>
              <span className={n.phoneDot} aria-hidden /> <b>5 agents on it</b>
            </p>
            <ol className={n.phoneSteps}>
              {STEPS.map(([who, what], i) => (
                <li key={who} className={stage >= 2 + i ? n.on : ""}>
                  <span className={`${n.tick} ${stage >= 3 + i ? n.done : ""}`} aria-hidden />
                  <span>
                    <b>{who}</b> {what}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className={n.phoneHome} aria-hidden />
      </div>
    </div>
  );
}
