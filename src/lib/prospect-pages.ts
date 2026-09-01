// Registry of prospect pages served at /for/{slug}.
// One entry per prospect. The doc component itself is registered client-side in
// src/app/for/_components/docs.ts so the gate can load it lazily after the
// password is entered (nothing about the page ships in the initial bundle).

export interface ProspectPageConfig {
  slug: string;
  client: string; // full client name, shown on the gate
  shortName: string; // what we call them in a sentence
  tabTitle: string; // browser tab, "Run with Foxes for {shortName}"
  passwordEnv: string; // env var holding the password
  passwordFallback: string; // dev fallback when the env var is unset
}

export const PROSPECT_PAGES: Record<string, ProspectPageConfig> = {
  // Kite Insurance is the course's fictional company. This page is the test
  // slug for the prospect-page system: every component is proven here before
  // any real client page uses it. Never deployed with a real client's data.
  kite: {
    slug: "kite",
    client: "Kite Insurance",
    shortName: "Kite",
    tabTitle: "Run with Foxes for Kite",
    passwordEnv: "KITE_PAGE_PASSWORD",
    passwordFallback: "kite26",
  },
  fidelity: {
    slug: "fidelity",
    client: "Fidelity Investments Canada",
    shortName: "Fidelity",
    tabTitle: "Run with Foxes for Fidelity",
    passwordEnv: "FIDELITY_PASSWORD",
    passwordFallback: "fidelity26",
  },
  affirm: {
    slug: "affirm",
    client: "Affirm Health",
    shortName: "Affirm",
    tabTitle: "Run with Foxes for Affirm",
    passwordEnv: "AFFIRM_PASSWORD",
    passwordFallback: "affirm26",
  },
  // Donald Douglas, Return2Sender. Capabilities page, no price, built 19 Aug
  // from the Affirm build. The links he asked for on the 11 Aug call.
  return2sender: {
    slug: "return2sender",
    client: "Return2Sender",
    shortName: "Return2Sender",
    tabTitle: "Run with Foxes for Return2Sender",
    passwordEnv: "RETURN2SENDER_PASSWORD",
    passwordFallback: "r2s26",
  },
  // Siobhan Smith, Expleo. Built 24 Aug 2026 from the Kite template. A real
  // proposal with a price, because she asked for "an approach ... with the
  // associated costs" on 18 Aug.
  // ⛔ Nothing of Expleo's is on the page - she asked that their material not
  // be shared, so the proof built from their guidelines is screen-share only.
  expleo: {
    slug: "expleo",
    client: "Expleo",
    shortName: "Expleo",
    tabTitle: "Run with Foxes for Expleo",
    passwordEnv: "EXPLEO_PASSWORD",
    passwordFallback: "expleo26",
  },
  // Tony McGuinness and Eamon Galavan, Ace Express Freight. Built 25 Aug 2026
  // from the Expleo page, off the 25 Aug discovery call. They came in from the
  // Newstalk radio ads. One priced option only, at Paul's instruction.
  "ace-express": {
    slug: "ace-express",
    client: "Ace Express Freight",
    shortName: "Ace Express",
    tabTitle: "Run with Foxes for Ace Express",
    passwordEnv: "ACE_EXPRESS_PASSWORD",
    passwordFallback: "aceexpress26",
  },
  // James Sullivan and Chris Kenny, Great National Hotels & Resorts. Built
  // 26 Aug 2026 from the Return2Sender capabilities shape. No price on the
  // page at Paul's instruction: the close is an hour with Chris on their
  // content and creative workflow. The old priced page (6 Aug, EUR 7,500,
  // never sent) stays in paul-hub as the copy record.
  boreman: {
    slug: "boreman",
    client: "Boreman Limited",
    shortName: "Boreman",
    tabTitle: "Run with Foxes for Boreman",
    passwordEnv: "BOREMAN_PASSWORD",
    passwordFallback: "boreman26",
  },
  // THE TEMPLATE, built 28 Aug 2026 on Paul's call: "one very long template for
  // proposal... it has every module in there. and we name each module... And then
  // everybody knows to look at this and pick the modules from it."
  // It takes over Kite's job as the page every proposal is copied from. Kite
  // carried nine of the fifteen modules, which is why people copied Boreman or
  // Affirm instead and the section names drifted to 43 across eight pages.
  // ⛔ Not a client and never sent. It is gated because it carries real Sabre
  // creative and real client numbers.
  template: {
    slug: "template",
    client: "Run with Foxes",
    shortName: "the template",
    tabTitle: "Run with Foxes proposal template",
    passwordEnv: "TEMPLATE_PAGE_PASSWORD",
    passwordFallback: "template26",
  },
  "great-national": {
    slug: "great-national",
    client: "Great National Hotels & Resorts",
    shortName: "Great National",
    tabTitle: "Run with Foxes for Great National",
    passwordEnv: "GREAT_NATIONAL_PASSWORD",
    passwordFallback: "greatnational26",
  },
  // Matthias Wenk, Marketing Director, Home Store + More. Built 28 Aug 2026
  // from the template, off the 28 Aug discovery call. One priced card at Paul's
  // instruction: one thing is offered, so one price.
  "home-store": {
    slug: "home-store",
    client: "Home Store + More",
    shortName: "Home Store + More",
    tabTitle: "Run with Foxes for Home Store + More",
    passwordEnv: "HOME_STORE_PASSWORD",
    passwordFallback: "homestore26",
  },
  // Seamus Moore, CMO, Bright Software Group. Built 28 Aug 2026, then rebuilt
  // 31 Aug onto Seamus's own document, because he wrote the brief himself and
  // following our format on top of his read as confusing. Twelve weeks from 8
  // September across his four areas: reporting, lifecycle, content, and design
  // and production. ONE price of 20,000 plus VAT with no breakdown, because
  // itemising it hands him the chance to drop a piece. Sent 31 Aug.
  bright: {
    slug: "bright",
    client: "Bright Software Group",
    shortName: "Bright",
    tabTitle: "Run with Foxes for Bright",
    passwordEnv: "BRIGHT_PASSWORD",
    passwordFallback: "bright26",
  },
  // Brendan Marrinan and Laura, ICS Medical Devices, Galway. A catheter and
  // delivery system CDMO, 170 people, selling to medtech startups and OEMs.
  // Came in off the Newstalk radio ads, self-booked 16 Aug, call 28 Aug.
  // Built 31 Aug from the Fidelity page on Paul's instruction: "We could do a
  // Fidelity one, but just targeted to them."
  // ⛔ NO PRICE, deliberately. Paul told Brendan on the call he would not put a
  // number on anything until he had spent a couple of hours seeing how the
  // work gets done, so the close is that session.
  "ics-medical": {
    slug: "ics-medical",
    client: "ICS Medical Devices",
    shortName: "ICS Medical Devices",
    tabTitle: "Run with Foxes for ICS Medical Devices",
    passwordEnv: "ICS_MEDICAL_PASSWORD",
    passwordFallback: "icsmedical26",
  },
  // Eoin Lynam and Fiona Heffernan, AXA Life Europe. Promised on the 28 Aug
  // call: "I'll send you on some stuff for the things I can do." Capabilities,
  // no price.
  axa: {
    slug: "axa",
    client: "AXA Life Europe",
    shortName: "AXA Life Europe",
    tabTitle: "Run with Foxes for AXA Life Europe",
    passwordEnv: "AXA_PASSWORD",
    passwordFallback: "axa26",
  },
};

export function getProspectPage(slug: string): ProspectPageConfig | null {
  return PROSPECT_PAGES[slug] ?? null;
}
