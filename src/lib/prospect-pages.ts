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
};

export function getProspectPage(slug: string): ProspectPageConfig | null {
  return PROSPECT_PAGES[slug] ?? null;
}
