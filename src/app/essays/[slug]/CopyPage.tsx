"use client";

import { useState } from "react";
import c from "./copy-page.module.css";

/**
 * "Copy this page" at the top of every essay. Paul, 14 Oct 2026: "Can we include a 'copy this
 * page' on all your essays so people can copy and it is a signal that we are happy for them to
 * do this." It copies the essay as markdown (title, dek, body, a link back), with the site's own
 * picture and page paths made absolute so they still work wherever it is pasted.
 */
export default function CopyPage({ title, dek, raw, url }: { title: string; dek: string; raw: string; url: string }) {
  const [done, setDone] = useState(false);
  const text = [
    `# ${title}`,
    dek,
    raw.trim().replace(/(\]\(|src=["'])\//g, "$1https://runwithfoxes.com/"),
    `Paul Dervan, Run with Foxes: ${url}`,
  ].filter(Boolean).join("\n\n");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const t = document.createElement("textarea");
      t.value = text; document.body.appendChild(t); t.select();
      document.execCommand("copy"); t.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 2500);
  }

  return (
    <button type="button" className={c.btn} onClick={copy} aria-live="polite">
      {done ? "Copied" : "Copy this page"}
    </button>
  );
}
