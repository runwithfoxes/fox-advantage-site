"use client";

import { useEffect, useRef, useState } from "react";
import { COURSE_URL, SHARE } from "./courseCopy";

/**
 * THE SHARE CONTROLS. Added 20 Jul, before the 22 Jul launch.
 *
 * ⭐ WHY IT IS NOT IN THE HERO. Paul's design principle for this page, 19 Jul: "I want
 * to have as few things on as possible so that people can just see it and sign up."
 * A share cluster above the fold competes with the one thing the hero is for. So the
 * share controls appear in exactly two places, both of them AFTER the visitor has
 * already done what the page asks:
 *   1. inside the signup confirmation, the highest-intent moment on the page;
 *   2. on a module card, for someone passing on one module rather than the course.
 * Nobody who has not signed up sees the first one at all.
 *
 * ⚠️ THE REAL SHARING FIX IS NOT THIS COMPONENT, it is the Open Graph metadata in
 * page.tsx. Before that landed, the live page emitted a description tag and nothing
 * else, so a link pasted into LinkedIn drew a text stub with no image. Buttons that
 * post a dead-looking card are worse than no buttons. If the metadata is ever removed,
 * remove these too.
 */

/** LinkedIn's supported share entry point. It takes one param and nothing else. */
function linkedInHref(url: string) {
  return "https://www.linkedin.com/sharing/share-offsite/?url=" + encodeURIComponent(url);
}

/**
 * Copy-to-clipboard, shared by the row below and by the per-module control, so there is
 * one implementation of the timeout and the failure path rather than two.
 *
 * ⚠️ There is already a fourth copy-button pattern on this site, in
 * src/app/clients/_components/ClientWorkspace.tsx. It is not extracted here because that
 * one is styled for the client workspace and pulling it out days before a launch is the
 * wrong week's work. IT SHOULD BE ONE PRIMITIVE. Flagged, not fixed.
 */
function useCopy(url: string) {
  const [copied, setCopied] = useState(false);

  /* cleared on unmount so a card closing mid-timeout cannot set state on a dead node */
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard is permission-gated and blocked outright in some in-app browsers.
         Say nothing rather than throw an error at someone who was trying to be helpful:
         the link is in the address bar either way. */
      return;
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  }

  return { copied, copy };
}

/**
 * THE PER-MODULE CONTROL. One button, on the face of each card, sitting hard right of
 * the badge so it stays out of the reading path.
 *
 * ⭐ WHY THE CARD FACE EARNS AN EXTRA CONTROL when the hero does not: this is the thing
 * that makes the page forwardable in PIECES. "Here is the module on system thinking" is
 * a far easier thing for a marketer to send a colleague than "here is a course", and
 * without it the page is all-or-nothing. It copies an anchored URL (#m4), which is why
 * every card carries an id.
 */
export function CopyModuleLink({ n }: { n: number }) {
  const { copied, copy } = useCopy(COURSE_URL + "#m" + n);
  return (
    <button
      type="button"
      className={"co-copylink" + (copied ? " is-copied" : "")}
      onClick={copy}
      aria-label={SHARE.cardLead}
      aria-live="polite"
    >
      {copied ? SHARE.copied : SHARE.copy}
    </button>
  );
}

export default function ShareRow({
  url,
  lead,
  compact = false,
}: {
  /** absolute URL, because a share target cannot resolve a relative one */
  url: string;
  /** the quiet line above the controls. Omit on a card, where the context is obvious. */
  lead?: string;
  compact?: boolean;
}) {
  const { copied, copy } = useCopy(url);

  /**
   * ⚠️ FEATURE-DETECTED AFTER MOUNT, NOT DURING RENDER. navigator does not exist on the
   * server, so reading it in the render body would either crash the build or produce
   * markup that disagrees with the client's. The first paint shows the LinkedIn control
   * everywhere; on a phone it swaps to the native sheet once we know it is there. That
   * ordering matters: the fallback is the thing that always works.
   *
   * 🔴 POINTER, NOT JUST CAPABILITY, AND THIS WAS CAUGHT BY LOOKING RATHER THAN BY
   * READING THE CODE. `navigator.share` alone is NOT the right test: Chrome on macOS
   * supports it, so a desktop visitor was being handed the macOS share sheet, which
   * does not carry LinkedIn. Wednesday's traffic is a LinkedIn campaign, so on a mouse
   * the LinkedIn control is the one that should be there. Coarse pointer means a
   * finger, and a finger means the native sheet is genuinely the better control.
   */
  const [useNative, setUseNative] = useState(false);
  useEffect(() => {
    const hasShare = typeof navigator !== "undefined" && typeof navigator.share === "function";
    const coarse =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(pointer: coarse)").matches;
    setUseNative(hasShare && coarse);
  }, []);

  async function onNativeShare() {
    try {
      await navigator.share({ title: SHARE.title, text: SHARE.text, url });
    } catch {
      /* the visitor dismissed the sheet. That is a normal outcome, not an error. */
    }
  }

  return (
    <div className={"co-share" + (compact ? " co-share-compact" : "")}>
      {lead ? <span className="co-sharelead">{lead}</span> : null}

      {useNative ? (
        <button type="button" className="co-sharebtn" onClick={onNativeShare}>
          {SHARE.native}
        </button>
      ) : (
        <a
          className="co-sharebtn"
          href={linkedInHref(url)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {SHARE.linkedin}
        </a>
      )}

      <button
        type="button"
        className={"co-sharebtn" + (copied ? " is-copied" : "")}
        onClick={copy}
        aria-live="polite"
      >
        {copied ? SHARE.copied : SHARE.copy}
      </button>
    </div>
  );
}
