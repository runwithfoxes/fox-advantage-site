"use client";

import { useState } from "react";
import L from "./library.module.css";

export type PromptRow = { key: string; name: string; from: string; modN: number; lines: number; body: string; href: string };

/**
 * START HERE: the prompts. The one thing in the library you can take and use in the next
 * minute, so they come first. A row opens to show the words; copy puts them on the clipboard.
 * The words are in the HTML whether or not a row is open (same rule as the browser below: a
 * crawler never clicks).
 */
export default function PromptRows({ rows }: { rows: PromptRow[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [said, setSaid] = useState<string | null>(null);
  const copy = async (r: PromptRow) => {
    try {
      await navigator.clipboard.writeText(r.body);
      setSaid(r.key);
      window.setTimeout(() => setSaid(null), 1500);
    } catch {
      /* the words are on screen either way */
    }
  };
  return (
    <ol className={L.prompts}>
      {rows.map((r) => (
        <li key={r.key} className={L.prompt}>
          <div className={L.promptRow}>
            <button type="button" className={L.promptName} aria-expanded={open === r.key} onClick={() => setOpen(open === r.key ? null : r.key)}>
              <span className={L.promptMark} aria-hidden>{open === r.key ? "-" : "+"}</span>
              {r.name}
            </button>
            <a className={L.promptFrom} href={r.href}>
              {r.from} · module {r.modN}
            </a>
            <span className={L.promptMeta}>{r.lines} lines</span>
            <button type="button" className={L.promptCopy} onClick={() => copy(r)}>
              {said === r.key ? "copied" : "copy"}
            </button>
          </div>
          <pre className={L.promptBody} hidden={open !== r.key}>{r.body}</pre>
        </li>
      ))}
    </ol>
  );
}
