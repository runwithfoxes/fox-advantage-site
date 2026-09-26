"use client";

import { useState } from "react";
import P from "./playbooks.module.css";

/** Puts the text on the clipboard and says so for a moment. The text is in the page whether
 *  or not anyone clicks. */
export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [said, setSaid] = useState(false);
  return (
    <button
      type="button"
      className={P.copy}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setSaid(true);
          window.setTimeout(() => setSaid(false), 1500);
        } catch {
          /* nothing to do: the words are on screen */
        }
      }}
    >
      {said ? "copied" : label}
    </button>
  );
}
