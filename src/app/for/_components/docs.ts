"use client";

// Client-side registry: slug -> the page's doc component, loaded lazily so a
// visitor who has not passed the gate never downloads the page content.
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const PROSPECT_DOCS: Record<string, ComponentType> = {
  kite: dynamic(() => import("./KiteDoc"), { ssr: false }),
  // The v2 capabilities page, built 9 Aug from the Kite shell. The original
  // React take stays at /proposals/fidelity as the copy record.
  fidelity: dynamic(() => import("./FidelityDoc"), { ssr: false }),
  // Suzanne Acton and the marketing team, Affirm Healthcare. Built 11 Aug
  // from the Fidelity page, with Brief Coach brought over from Kite.
  affirm: dynamic(() => import("./AffirmDoc"), { ssr: false }),
  // Donald Douglas, Return2Sender. Built 19 Aug from the Affirm page.
  // Capabilities only, no price - Paul: "not a hard sell one, more like a
  // peter berry one."
  return2sender: dynamic(() => import("./ReturnToSenderDoc"), { ssr: false }),
};
