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
  "great-national": {
    slug: "great-national",
    client: "Great National Hotels & Resorts",
    shortName: "Great National",
    tabTitle: "Run with Foxes for Great National",
    passwordEnv: "GREAT_NATIONAL_PASSWORD",
    passwordFallback: "greatnational26",
  },
};

export function getProspectPage(slug: string): ProspectPageConfig | null {
  return PROSPECT_PAGES[slug] ?? null;
}
