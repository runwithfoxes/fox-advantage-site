"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

/**
 * Routes Isa does NOT appear on.
 *
 * /course - Paul, 18 Jul 2026, explicit say-so (the CLAUDE.md guardrail requires
 * it). The course page's whole job is one signup pill, and Isa auto-opens over it
 * on desktop after 5s, covering the only thing on the page worth doing. She also
 * has no course knowledge yet - the Isa-on-course-pages wiring has been open since
 * 12 Jul - so she would be answering questions about a course she has not been
 * told about.
 *
 * /softco - the brand-consistency demonstration page. The whole point of that
 * page is that every pixel on it comes from SoftCo's brand system; Isa arrives
 * in Run with Foxes' own chrome and colours, which breaks the demonstration.
 */
const NO_CHAT_ROUTES = ["/course", "/softco", "/for", "/proposals"];

export default function ChatWidgetLoader() {
  const pathname = usePathname();
  const suppressed = NO_CHAT_ROUTES.some(
    (r) => pathname === r || pathname?.startsWith(r + "/")
  );
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(() => setReady(true), { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(id);
  }, []);
  if (suppressed || !ready) return null;
  return <ChatWidget />;
}
