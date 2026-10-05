"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/*
  Tells /api/site-view that this page was opened, once per page, on every page of the site.
  The route ignores anyone without the identity cookie, so an anonymous reader sends a
  request that learns nothing.

  Two kinds of page are left alone because they already say so themselves. A course module
  records module_viewed. A report, dataset or tracker page carries ViewedPing, which marks
  window.__rwfViewed with its own path; its effect runs before this one, being further down
  the tree, and the timer below gives it time anyway.
*/
const SKIP = /^\/(course\/\d+|for|clients|proposals|api)(\/|$)/;

export default function SiteViewPing() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname || SKIP.test(pathname)) return;
    const t = window.setTimeout(() => {
      if ((window as unknown as { __rwfViewed?: string }).__rwfViewed === pathname) return;
      fetch("/api/site-view", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ page: pathname }),
        keepalive: true,
      }).catch(() => null);
    }, 2000);
    return () => window.clearTimeout(t);
  }, [pathname]);
  return null;
}
