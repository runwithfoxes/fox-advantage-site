"use client";

import { createContext, useContext } from "react";
import type { Placeholder } from "./placeholderCopy";

/**
 * THE PLACEHOLDER MARK.
 *
 * BRIEF-A §4: "Every piece of placeholder copy must be unmistakably marked, so it
 * cannot ship believing it is real."
 *
 * This is the ONLY route unwritten copy takes onto the page. Every string in
 * placeholderCopy.ts renders through here, so there is no way to put sample copy on
 * /course without it arriving marked. That is the point: the ban is enforced by the
 * code path rather than by anyone remembering.
 *
 * MARKS-OFF IS A VIEWING STATE, NOT A STRIP. Paul cannot judge rhythm through a page
 * of underlines, so the toggle exists - but it only hides the decoration. The strings
 * are still placeholders, still in the one file, still listed in the counter. The way
 * to remove a mark is to write the real copy and delete the entry.
 */

export const MarksContext = createContext(true);

export function useMarks() {
  return useContext(MarksContext);
}

export function Ph({ v, as = "span" }: { v: Placeholder; as?: "span" | "p" }) {
  const marks = useMarks();

  /* Copy Paul has signed off renders exactly as it will ship - no mark, no tooltip,
     no toggle. It goes through <Ph> only so every card-face string lives in one file. */
  if (v.tier === "real") {
    const T = as;
    return <T>{v.text}</T>;
  }

  /* An OWED slot has no text by design - Paul owes the answer and nothing has been
     invented in its place. It renders as a visible empty slot rather than a plausible
     sentence, because a plausible sentence is exactly what the fabrication ban is
     there to stop. With marks off it disappears entirely, which is honest: with the
     marks off you are looking at the page as it would really read today, and today it
     does not answer this. */
  if (v.tier === "owed") {
    if (!marks) return null;
    return (
      <span className="co-ph co-ph-owed" title={v.note}>
        Paul owes this
      </span>
    );
  }

  const Tag = as;
  return (
    <Tag className={marks ? `co-ph co-ph-${v.tier}` : undefined} title={marks ? v.note : undefined}>
      {v.text}
    </Tag>
  );
}
