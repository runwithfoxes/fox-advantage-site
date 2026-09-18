"use client";

import { useEffect } from "react";

// Reports what the reader actually does: one visit event per page load, one
// section event the first time each [data-track-section] scrolls into view,
// and open/download/resource events sent by the doc via a custom DOM event:
//   window.dispatchEvent(new CustomEvent("prospect-track",
//     { detail: { type: "open", name: "pricing-tab" } }))

export default function PageTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const send = (type: string, name?: string) => {
      const body = JSON.stringify({ type, name });
      const url = `/api/for/${slug}/track`;
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, new Blob([body], { type: "application/json" }));
      } else {
        fetch(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body,
          keepalive: true,
        }).catch(() => {});
      }
    };

    send("visit", "page-load");

    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = (entry.target as HTMLElement).dataset.trackSection;
          if (name && !seen.has(name)) {
            seen.add(name);
            send("section", name);
          }
        }
      },
      { threshold: 0.3 }
    );
    document
      .querySelectorAll<HTMLElement>("[data-track-section]")
      .forEach((el) => observer.observe(el));

    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { type?: string; name?: string }
        | undefined;
      if (detail?.type) send(detail.type, detail.name);
    };
    window.addEventListener("prospect-track", onCustom);

    return () => {
      observer.disconnect();
      window.removeEventListener("prospect-track", onCustom);
    };
  }, [slug]);

  return null;
}
