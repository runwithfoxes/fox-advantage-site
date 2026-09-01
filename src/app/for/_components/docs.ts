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
  // THE TEMPLATE. Built 28 Aug on Paul's call, and it takes over Kite's job as
  // the thing every proposal is copied from. All fifteen modules on one page,
  // named and numbered, with the opening and the shape switchable. The module
  // list is template-modules.json, which is also what an agent picks from.
  // Never sent to anyone: it carries real Sabre creative and real client numbers.
  template: dynamic(() => import("./TemplateDoc"), { ssr: false }),
  // Matthias Wenk, Home Store + More. Built 28 Aug from the template. One
  // priced card: a 3D modelling agent for their bedding photography.
  "home-store": dynamic(() => import("./HomeStoreDoc"), { ssr: false }),
  // Seamus Moore, CMO, Bright Software Group. Built 28 Aug, rebuilt 31 Aug onto
  // Seamus's own document because he wrote the brief himself. Twelve weeks from
  // 8 September across his four areas: reporting, lifecycle, content, and
  // design and production. One price of 20,000 plus VAT, no breakdown. Sent 31
  // Aug.
  bright: dynamic(() => import("./BrightDoc"), { ssr: false }),
  // Brendan Marrinan and Laura, ICS Medical Devices. Built 31 Aug from the
  // Fidelity page. Capabilities, no price; the close is a couple of hours with
  // Brendan and Laura on how the marketing work gets done today.
  "ics-medical": dynamic(() => import("./IcsMedicalDoc"), { ssr: false }),
  // Eoin Lynam (CEO) and Fiona Heffernan (marketing), AXA Life Europe. Built
  // 1 Sep from the ICS Medical page, which is the Fidelity page after Paul's
  // own cuts. Capabilities, no price; the close is a 90 minute session on how
  // the marketing work gets done today.
  axa: dynamic(() => import("./AxaDoc"), { ssr: false }),
};
