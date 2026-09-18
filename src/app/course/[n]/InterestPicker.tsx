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
  const [other, setOther] = useState("");
  const [sent, setSent] = useState(false);

  /* Asked once. A reload after sending shows the thank-you, not the question again. */
  useEffect(() => {
    try {
      if (localStorage.getItem(KEY)) setSent(true);
    } catch {
      /* blocked storage just means we may ask again */
    }
  }, []);

  const toggle = (w: string) => {
    const next = new Set(picked);
    if (next.has(w)) next.delete(w);
    else next.add(w);
    setPicked(next);
  };

  const send = () => {
    if (!picked.size && !other.trim()) return;
    setSent(true);
    try {
      localStorage.setItem(KEY, "1");
    } catch {
      /* fine */
    }
    fetch("/api/course-event", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event: "interests_picked",
        module: n,
        detail: [...picked].join(", "),
        item: other.trim(),
      }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <div className="ip">
      <style>{`
        .ip{background:#fff;border:1px solid #C9C9C3;margin-top:44px;padding:30px 32px 32px;}
        .ip-q{font-family:var(--sans);font-weight:500;font-size:1.5rem;line-height:1.3;color:#1D1B1B;margin:0 0 8px;}
        .ip-note{font-family:var(--mono);font-size:.75rem;line-height:1.7;color:#8A8A85;margin:0 0 24px;}
        .ip-words{display:flex;flex-wrap:wrap;gap:10px;}
        .ip-words button{
          font-family:var(--sans);font-size:.9375rem;font-weight:500;line-height:1;
          padding:12px 16px;border:1px solid #C9C9C3;background:#FAFAF8;color:#1D1B1B;
          border-radius:0;cursor:pointer;transition:background .15s ease,border-color .15s ease,color .15s ease;
        }
        .ip-words button:hover{border-color:#3A7CA5;}
        .ip-words button[aria-pressed="true"]{background:#1A3A4E;border-color:#1A3A4E;color:#FAFAF8;}
        .ip-foot{display:flex;gap:12px;margin-top:22px;flex-wrap:wrap;}
        .ip-foot input{
          flex:1 1 280px;min-width:0;font-family:var(--mono);font-size:.8125rem;color:#1D1B1B;
          border:1px solid #C9C9C3;background:#FAFAF8;padding:12px 14px;border-radius:0;outline:none;
        }
        .ip-foot input:focus{border-color:#3A7CA5;}
        .ip-foot button{
          font-family:var(--mono);font-size:.6875rem;letter-spacing:.08em;text-transform:uppercase;
          background:#1A3A4E;color:#FAFAF8;border:0;border-radius:0;padding:13px 26px;cursor:pointer;
        }
        .ip-foot button:hover{background:#3A7CA5;}
        .ip-foot button:disabled{opacity:.4;cursor:default;background:#1A3A4E;}
        .ip-done{font-family:var(--sans);font-size:1.0625rem;color:#1D1B1B;margin:0;}
      `}</style>

      {sent ? (
        <p className="ip-done">Thanks. That helps me decide what to go deeper on.</p>
      ) : (
        <>
          <p className="ip-q">What would you like to learn more about?</p>
          <p className="ip-note">Pick as many as you like.</p>
          <div className="ip-words">
            {WORDS.map((w) => (
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
            <input
              type="text"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Anything else?"
              maxLength={300}
              aria-label="Anything else you would like to learn about"
            />
            <button type="button" onClick={send} disabled={!picked.size && !other.trim()}>
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
