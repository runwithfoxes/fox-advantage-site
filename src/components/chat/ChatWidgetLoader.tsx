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
/**
 * ⭐ `children` decides whether the suppression reaches sub-routes.
 *
 * /course keeps CHILDREN suppressed, and that is now a decision rather than collateral.
 * The course home is here on the 18 Jul ruling: its whole job is one signup pill and she
 * auto-opens over it. Module pages are suppressed for a different reason: ⭐ THEY HAVE
 * THEIR OWN ISA, embedded in the rail (`ModuleIsa.tsx`), scoped to the module.
 * Un-suppressing the floating one here was built and looked at on 24 Jul 2026 and gave
 * two Isas on one page, the second opening over the count boxes and the copy. Paul:
 * "We don't want two Isas on the page." If you ever change this, delete ModuleIsa.
 *
 * /softco keeps prefix matching: the point of that page is that every pixel comes from
 * SoftCo's brand system, and Isa arrives in Run with Foxes' chrome and colours.
 */
const NO_CHAT_ROUTES: { path: string; children: boolean }[] = [
  { path: "/course", children: true },
  { path: "/softco", children: true },
];

export default function ChatWidgetLoader() {
  const pathname = usePathname();
  const suppressed = NO_CHAT_ROUTES.some(
    (r) =>
      pathname === r.path ||
      (r.children && pathname?.startsWith(r.path + "/"))
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
