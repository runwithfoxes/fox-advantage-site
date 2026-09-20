"use client";

import { useEffect, useState } from "react";

/**
 * WHAT DO YOU WANT TO LEARN MORE ABOUT, module 1. Replaced the fluency slider there on
 * 18 Sep 2026. Paul: "I'd like to ask them to say the things they'd like to learn more
 * about. So we can collect that." Then: "We want words, not sentences. And needs to be
 * specific... something visual. So things like 'AI Agents' 'Content' 'Advertising'
 * 'Research' 'Creative' 'Email Agents'."
 *
 * ⭐ WORDS AS TILES, pick as many as you like, plus one optional line for anything the words
 * miss. The tiles give Paul something to count; the line catches what he did not think of.
 *
 * ⭐ IT GOES TO THE PERSON'S RECORD (api/course-event, "interests_picked") and on to Klaviyo
 * as "Course: interests picked", so a later email can speak to what they asked for.
 *
 * ⚠️ THE WORD LIST IS A FIRST CUT, Paul's six plus Kit's additions. His to edit.
 */
const WORDS = [
  "AI Agents",
  "Email Agents",
  "Content",
  "Copywriting",
  "Advertising",
  "Creative",
  "Research",
  "Data",
  "Reporting",
  "Strategy",
  "Brand",
  "Social",
  "SEO & GEO",
  "Automation",
  "Claude Code",
  "Prompting",
];

const KEY = "rwf-course-interests-sent";

export default function InterestPicker({ n }: { n: number }) {
  const [picked, setPicked] = useState<Set<string>>(new Set());
  /* Words the person typed themselves. They become tiles, picked, and count like the rest
     (Paul, 18 Sep: "when I wrote growth, it doesn't add to it"). */
  const [own, setOwn] = useState<string[]>([]);
  const [other, setOther] = useState("");
  const [sent, setSent] = useState(false);

  /* Remembers what they sent, in this browser. A reload shows the thank-you WITH their picks
     and a way to change them (Paul, 18 Sep: a bare thank-you on refresh read as a bug). */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { picked?: string[] };
      const words = Array.isArray(saved?.picked) ? saved.picked : [];
      if (!words.length) return; /* nothing saved to show: ask again */
      setPicked(new Set(words));
      setOwn(words.filter((w) => !WORDS.includes(w)));
      setSent(true);
    } catch {
      /* old "1" value or blocked storage: just ask again */
    }
  }, []);

  const toggle = (w: string) => {
    const next = new Set(picked);
    if (next.has(w)) next.delete(w);
    else next.add(w);
    setPicked(next);
  };

  const addOwn = () => {
    const w = other.trim().replace(/\s+/g, " ").slice(0, 40);
    if (!w) return;
    const known = [...WORDS, ...own].find((x) => x.toLowerCase() === w.toLowerCase());
    const word = known ?? w.charAt(0).toUpperCase() + w.slice(1);
    if (!known) setOwn([...own, word]);
    const next = new Set(picked);
    next.add(word);
    setPicked(next);
    setOther("");
  };

  const send = () => {
    /* Anything still sitting in the box counts too, so nothing typed is lost. */
    const extra = other.trim();
    const all = new Set(picked);
    if (extra) all.add(extra.charAt(0).toUpperCase() + extra.slice(1));
    if (!all.size) return;
    setPicked(all);
    setOwn([...all].filter((w) => !WORDS.includes(w)));
    setOther("");
    setSent(true);
    try {
      localStorage.setItem(KEY, JSON.stringify({ picked: [...all] }));
    } catch {
      /* fine */
    }
    fetch("/api/course-event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event: "interests_picked",
        module: n,
        detail: [...all].join(", "),
        /* Their own words, kept apart so they can be read as new ideas, not counted as ours. */
        item: [...all].filter((w) => !WORDS.includes(w)).join(", "),
      }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <div className="ip">
      {/* ⭐ DRAWN AS A COURSE FIGURE, 18 Sep 2026. Paul on the first version: "It just feels a bit
          big and bulky. Maybe it doesn't need the box around it... I'd rather we use our
          figures." So no panel: the question as an item heading, then one window in the
          figure language (f-frame grey, traffic lights, white panel, mono labels, f-sel pale
          blue for a pick, the rounded field with the round blue send). Values copied from
          figures.generated.ts, not invented. */}
      <style>{`
        .ip{margin-top:48px;}
        .ip-q{font-family:var(--sans);font-weight:500;font-size:1.5rem;line-height:1.25;letter-spacing:-.01em;color:#1D1B1B;margin:0 0 20px;}
        .ip-win{max-width:640px;background:#EDEEF1;border:1px solid rgba(20,20,30,.10);border-radius:15px;padding:0 8px 8px;
          box-shadow:0 1px 1px rgba(26,58,78,.06),0 5px 12px rgba(26,58,78,.11),0 14px 26px rgba(26,58,78,.08);}
        .ip-bar{display:flex;align-items:center;gap:6px;height:30px;padding-left:3px;}
        .ip-bar i{width:11px;height:11px;border-radius:50%;display:block;border:.5px solid rgba(0,0,0,.06);}
        .ip-bar span{font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;font-size:11.5px;font-weight:600;color:#54545C;margin-left:6px;}
        .ip-panel{background:#fff;border:1px solid rgba(20,20,30,.07);border-radius:9px;padding:18px 16px 16px;}
        .ip-words{display:flex;flex-wrap:wrap;gap:8px;}
        .ip-words button{
          font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;font-size:13px;line-height:1;color:#1D1B1B;
          background:#FAFAF8;border:1px solid rgba(20,20,30,.12);border-radius:8px;padding:9px 12px;cursor:pointer;
          transition:background .15s ease,border-color .15s ease,color .15s ease;
        }
        .ip-words button:hover{border-color:#3A7CA5;}
        /* Picked must be unmistakable, Paul 18 Sep: "when I click on them, it's not obvious that
           anything is happening." Solid sky with a tick, not the pale figure highlight. */
        .ip-words button[aria-pressed="true"]{background:#3A7CA5;border-color:#3A7CA5;color:#fff;}
        .ip-words button[aria-pressed="true"]::before{content:"✓ ";}
        .ip-foot{display:flex;gap:10px;margin-top:16px;align-items:stretch;flex-wrap:wrap;}
        .ip-field{flex:1 1 260px;display:flex;align-items:center;background:#FAFAF8;
          border:1px solid rgba(20,20,30,.12);border-radius:10px;padding:5px 14px;}
        .ip-field:focus-within{border-color:#3A7CA5;}
        .ip-field input{flex:1;min-width:0;border:0;background:transparent;outline:none;
          font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;font-size:13px;color:#1D1B1B;padding:6px 0;}
        .ip-field input::placeholder{color:#A8A8A2;}
        .ip-send{flex:0 0 auto;border:0;border-radius:10px;background:#3A7CA5;color:#fff;cursor:pointer;
          font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;font-size:13px;padding:0 18px;min-height:40px;
          display:flex;align-items:center;gap:10px;transition:background .15s ease;}
        .ip-send:hover{background:#1A3A4E;}
        .ip-send:disabled{background:#C9C9C3;cursor:default;}
        .ip-done{font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;font-size:13px;color:#1D1B1B;margin:0;line-height:1.6;}
        .ip-done b{color:#3A7CA5;font-weight:400;}
        .ip-change{font:inherit;color:#8A8A85;background:none;border:0;padding:0;margin-top:6px;
          cursor:pointer;text-decoration:underline;text-underline-offset:3px;}
        .ip-change:hover{color:#3A7CA5;}
      `}</style>

      <h2 className="ip-q">What would you like to learn more about?</h2>
      <div className="ip-win">
        <div className="ip-bar" aria-hidden>
          <i style={{ background: "#FF5F57" }} />
          <i style={{ background: "#FEBC2E" }} />
          <i style={{ background: "#28C840" }} />
          <span>pick as many as you like</span>
        </div>
        <div className="ip-panel">
          {sent ? (
            <p className="ip-done">
              Thanks. That helps me decide what to go deeper on.
              {picked.size ? (
                <>
                  <br />
                  <b>{[...picked].join(" · ")}</b>
                </>
              ) : null}
              <br />
              <button type="button" className="ip-change" onClick={() => setSent(false)}>
                change
              </button>
            </p>
          ) : (
            <>
              <div className="ip-words">
                {[...WORDS, ...own].map((w) => (
                  <button
                    key={w}
                    type="button"
                    aria-pressed={picked.has(w)}
                    onClick={() => toggle(w)}
                  >
                    {w}
                  </button>
                ))}
              </div>
              <div className="ip-foot">
              <div className="ip-field">
                <input
                  type="text"
                  value={other}
                  onChange={(e) => setOther(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addOwn();
                    }
                  }}
                  placeholder="add your own, press enter"
                  maxLength={300}
                  aria-label="Anything else you would like to learn about"
                />
              </div>
              {/* The send stands on its own, not inside the "anything else" field: the words
                  are the main answer, and a button tucked into the text box read as belonging
                  only to the text (Paul, 18 Sep). It counts what is picked. */}
              <button
                type="button"
                className="ip-send"
                onClick={send}
                disabled={!picked.size && !other.trim()}
              >
                {(() => {
                  const c = picked.size + (other.trim() ? 1 : 0);
                  return c ? `send ${c} picked` : "send";
                })()}
                <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                  <path d="M1.5 1 L9 5 L1.5 9 Z" fill="#fff" />
                </svg>
              </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
