"use client";

import { useEffect } from "react";

/** Tells /api/viewed this page was opened. Once per page load; the route ignores anyone without
 *  the identity cookie, so an anonymous reader sends a request that learns nothing. */
export default function ViewedPing({ want, item }: { want: "library" | "report" | "dataset" | "tool" | "playbook" | "tracker"; item?: string }) {
  useEffect(() => {
    const t = window.setTimeout(() => {
      fetch("/api/viewed", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ want, item, page: window.location.pathname }),
        keepalive: true,
      }).catch(() => null);
    }, 1500);
    return () => window.clearTimeout(t);
  }, [want, item]);
  return null;
}
