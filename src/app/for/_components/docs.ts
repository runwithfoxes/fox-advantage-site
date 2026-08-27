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
  // Siobhan Smith, Expleo. Built 24 Aug from the Kite template: the first
  // real page to carry a recommendation and a price.
  expleo: dynamic(() => import("./ExpleoDoc"), { ssr: false }),
  // Tony McGuinness and Eamon Galavan, Ace Express Freight. Built 25 Aug from
  // the Expleo page. One priced option, the AI writer for LinkedIn.
  "ace-express": dynamic(() => import("./AceExpressDoc"), { ssr: false }),
  // James Sullivan and Chris Kenny, Great National Hotels & Resorts. Built
  // 26 Aug from the Return2Sender page. Capabilities, no price; the close is
  // an hour with Chris on the content and creative workflow.
  "great-national": dynamic(() => import("./GreatNationalDoc"), { ssr: false }),
  // Daragh Boylan, Boreman Ltd. Truck lighting, five people, seven to ten key
  // accounts. Built 27 Aug. The first page to open on the client's own site
  // rebuilt, full bleed, above the masthead - Paul's call, pointing at the GEO
  // Ireland page. Two priced agents, Advertising and Website, plus Growth shown.
  boreman: dynamic(() => import("./BoremanDoc"), { ssr: false }),
};
