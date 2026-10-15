"use client";

import { useState } from "react";
import c from "@/app/essays/[slug]/copy-page.module.css";

/** One button that copies the Monday instruction, the same quiet button as Copy this page on an essay. */
export default function CopyLine({ text }: { text: string }) {
  const [done, setDone] = useState(false);
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
      {done ? "Copied" : "Copy the instruction"}
    </button>
  );
}
