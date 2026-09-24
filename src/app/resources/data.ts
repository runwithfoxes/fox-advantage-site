/**
 * RESOURCES MOCKUP DATA, 24 Sep 2026.
 *
 * ⛔ Every number here is read off a real file, never typed from memory:
 *   GEO Ireland   ~/projects/search-agent/survey/report/*.json (day one, 23 Aug 2026)
 *                 and INSIGHTS.md. NOT SIGNED OFF BY PAUL. Single day, no margin.
 *   Jobs and AI   ~/paul-hub/intelligence/research/2026-09-23-jobs-ai-tracker-design-and-test.md
 * The rate per category is the highest rate on any engine, the same figure INSIGHTS.md quotes.
 */

export type Owner = "state" | "middle" | "other";

export const OWNER_LABEL: Record<Owner, string> = {
  state: "A state body",
  middle: "A booking site or marketplace",
  other: "A brand, charity or professional body",
};

export type Category = { name: string; top: string; rate: number; owner: Owner; slug?: string };

export const CATEGORIES: Category[] = [
  { name: "Tax", top: "Revenue", rate: 0.958, owner: "state" },
  { name: "Mental health", top: "Samaritans", rate: 0.958, owner: "other" },
  { name: "Student grants", top: "SUSI", rate: 0.952, owner: "state" },
  { name: "Home energy grants", top: "SEAI", rate: 0.895, owner: "state" },
  { name: "Vaccines", top: "HSE", rate: 0.87, owner: "state" },
  { name: "Scams", top: "An Garda Síochána", rate: 0.818, owner: "state" },
  { name: "Alcohol", top: "HSE", rate: 0.792, owner: "state" },
  { name: "Business software", top: "QuickBooks", rate: 0.75, owner: "other" },
  { name: "Quitting smoking", top: "HSE Quit", rate: 0.75, owner: "state" },
  { name: "Universities", top: "UCD", rate: 0.743, owner: "other" },
  { name: "Driving licence", top: "Road Safety Authority", rate: 0.708, owner: "state" },
  { name: "Road safety", top: "Road Safety Authority", rate: 0.703, owner: "state" },
  { name: "Supermarkets", top: "Tesco Ireland", rate: 0.696, owner: "other" },
  { name: "Charities", top: "Charities Regulator", rate: 0.684, owner: "state" },
  { name: "Hotels", top: "Booking.com", rate: 0.682, owner: "middle", slug: "hotels" },
  { name: "Health service", top: "HSE", rate: 0.667, owner: "state" },
  { name: "Passports", top: "Dept of Foreign Affairs", rate: 0.667, owner: "state" },
  { name: "Banks", top: "Bank of Ireland", rate: 0.611, owner: "other" },
  { name: "Health insurance", top: "Health Insurance Authority", rate: 0.609, owner: "state" },
  { name: "Recruitment", top: "LinkedIn Jobs", rate: 0.565, owner: "middle" },
  { name: "Estate agents", top: "Daft.ie", rate: 0.55, owner: "middle" },
  { name: "Car insurance", top: "Chill", rate: 0.537, owner: "other" },
  { name: "Councils", top: "Dublin City Council", rate: 0.522, owner: "state" },
  { name: "Food safety", top: "FSAI", rate: 0.522, owner: "state" },
  { name: "Marketing agencies", top: "Clutch.co", rate: 0.522, owner: "middle" },
  { name: "Solicitors", top: "Law Society of Ireland", rate: 0.522, owner: "other" },
  { name: "Broadband and mobile", top: "eir", rate: 0.5, owner: "other" },
  { name: "Citizens information", top: "Legal Aid Board", rate: 0.478, owner: "state" },
  { name: "Moving to Ireland", top: "Citizens Information", rate: 0.478, owner: "state" },
  { name: "Accountants", top: "Chartered Accountants Ireland", rate: 0.455, owner: "other" },
  { name: "Mortgages", top: "Bank of Ireland", rate: 0.417, owner: "other" },
  { name: "Gyms", top: "FLYEfit", rate: 0.35, owner: "other" },
  { name: "Airlines and travel", top: "Aer Lingus", rate: 0.348, owner: "other" },
  { name: "Cars", top: "DoneDeal", rate: 0.348, owner: "middle" },
  { name: "Home insurance", top: "Aviva", rate: 0.304, owner: "other" },
  { name: "Water safety", top: "RNLI", rate: 0.273, owner: "other" },
  { name: "Energy", top: "bonkers.ie", rate: 0.25, owner: "middle" },
  { name: "Gambling and drugs", top: "Gambling Awareness Trust", rate: 0.227, owner: "other" },
  { name: "Irish food and drink", top: "Kerrygold", rate: 0.222, owner: "other" },
  { name: "Pharmacies", top: "McCabes Pharmacy", rate: 0.15, owner: "other" },
  { name: "Tourism", top: "TripAdvisor", rate: 0.136, owner: "middle" },
];

export const ENGINES = ["Claude", "Claude + web", "ChatGPT", "Perplexity", "Google AI"];

/** hotels.json, named_rate_by_engine, in ENGINES order. `site` = a booking site, not a hotel. */
export const HOTELS: { name: string; rates: number[]; site: boolean }[] = [
  { name: "Booking.com", rates: [0.682, 0.591, 0.273, 0.182, 0.222], site: true },
  { name: "Expedia", rates: [0.591, 0.636, 0.273, 0.136, 0.056], site: true },
  { name: "TripAdvisor", rates: [0.136, 0.318, 0.045, 0.045, 0.056], site: true },
  { name: "Maldron Hotels", rates: [0.136, 0.136, 0.091, 0.091, 0.056], site: false },
  { name: "Ashford Castle", rates: [0.091, 0.091, 0.091, 0.091, 0.056], site: false },
  { name: "Clayton Hotels", rates: [0.091, 0.045, 0.045, 0, 0], site: false },
  { name: "The Doyle Collection", rates: [0, 0, 0.045, 0, 0], site: false },
];

/** hotels.json, top_cited_sources. */
export const HOTEL_SOURCES: [string, number][] = [
  ["reddit.com", 45],
  ["google.com", 22],
  ["booking.com", 21],
  ["tripadvisor.com", 20],
  ["tripadvisor.ie", 16],
  ["ccpc.ie", 13],
  ["siteminder.com", 9],
  ["skyscanner.ie", 8],
];

export type Ask = "tools" | "sell" | "lead" | "search" | "build";
export const ASK_LABEL: Record<Ask, string> = {
  tools: "Use AI tools",
  sell: "Sell an AI product",
  lead: "Lead or buy AI",
  search: "Be found in AI search",
  build: "Build AI tools",
};

/**
 * JOBS AND AI, run of 24 Sep 2026 (Sam's report, intelligence/research/jobs-ai-tracker/2026-09-24).
 * One day of data. Quotes are verbatim from the ads; links to the ads are not wired yet.
 */
export const JOBS_RUN = {
  date: "24 Sep 2026",
  ads: 862,
  jobs: 739,
  newAds: 302,
  newReal: 15,
  real: 48,
  cost: "$2.09",
};

export const JOBS_SOURCES: { name: string; only: number; shared: number; rate: number; ofJobs: string }[] = [
  { name: "Indeed", only: 243, shared: 18, rate: 5, ofJobs: "13 of 261" },
  { name: "IrishJobs", only: 162, shared: 14, rate: 5, ofJobs: "8 of 176" },
  { name: "jobs.ie", only: 153, shared: 10, rate: 6, ofJobs: "10 of 163" },
  { name: "Careers pages", only: 92, shared: 7, rate: 20, ofJobs: "20 of 99" },
  { name: "Google Jobs", only: 41, shared: 10, rate: 6, ofJobs: "3 of 51" },
  { name: "Cpl", only: 18, shared: 0, rate: 0, ofJobs: "" },
];

export const JOBS_KINDS: { ask: Ask; n: number }[] = [
  { ask: "tools", n: 24 },
  { ask: "sell", n: 12 },
  { ask: "lead", n: 6 },
  { ask: "search", n: 4 },
  { ask: "build", n: 2 },
];

export const WORDING: { co: string; role: string; ask: Ask; q: string; when: string; where: string }[] = [
  { co: "Kearys Motor Group", role: "Sales Graduate Programme, BYD Eastgate", ask: "tools", when: "21 Sep", where: "Indeed", q: "AI tools for lead handling and follow-up, we're aiming to lead the Irish motor industry on AI, and you'll be part of that" },
  { co: "DocuSign", role: "Sales Development Representative (French speaker)", ask: "tools", when: "24 Sep", where: "Indeed", q: "Familiarity with AI-powered sales, research, and productivity tools, including Gong, Glean, Gemini, Notebook LM" },
  { co: "Osborne Recruitment", role: "Digital Marketing and Content Specialist", ask: "tools", when: "18 Sep", where: "IrishJobs", q: "Use AI tools effectively for research, ideation, drafting and editing, while maintaining a high standard of original, human-led writing." },
  { co: "Okta", role: "EMEA Digital Media Manager", ask: "tools", when: "22 Sep", where: "Indeed", q: "Identify and scale practical uses of generative AI and automation across localization, audience development, creative testing, campaign operations, analysis, and optimization." },
  { co: "Cpl, for a client in Cork", role: "Product Marketing Communication DE/FR/ES", ask: "tools", when: "24 Sep", where: "jobs.ie", q: "Use approved AI tools to speed up content workflows and asset versioning" },
  { co: "Tines", role: "Lead Analyst, Revenue", ask: "tools", when: "8 Sep", where: "Careers page", q: "Uses AI in their own work and understands where its judgement breaks down." },
  { co: "Stripe", role: "Account Executive, UK Velocity Hunter", ask: "tools", when: "16 Sep", where: "Careers page", q: "We're looking for a high-performing, well-rounded, AI-fluent seller with proven new-business sales experience." },
  { co: "Verizon", role: "Senior Manager, Strategic Sourcing, Marketing (Agency Category)", ask: "lead", when: "23 Sep", where: "Indeed, IrishJobs, Google", q: "Restructuring agency models to reflect shifts in AI-driven content generation, digital asset rights, and omnichannel campaign delivery." },
  { co: "Mediolanum International Funds", role: "Head of Sales", ask: "lead", when: "22 Sep", where: "Indeed", q: "Use AI capabilities to increase the relevance, frequency and efficiency of content production, without compromising technical accuracy, brand standards, governance or regulatory requirements." },
  { co: "Datadog", role: "Director, Enterprise Customer Success", ask: "lead", when: "14 Sep", where: "Careers page", q: "Champion practical AI adoption across the team by identifying where AI tools genuinely improve efficiency or customer outcomes, and coaching managers and CSMs to use them well without eroding judgment" },
  { co: "Femtech Healthcare (KeyForHer)", role: "Senior AI Search & SEO Specialist", ask: "search", when: "11 Sep", where: "jobs.ie", q: "Own visibility across AI platforms including ChatGPT, Gemini, Claude and Perplexity." },
  { co: "Yuno Energy", role: "Digital Marketing Manager", ask: "search", when: "23 Sep", where: "jobs.ie", q: "Collaborate with our SEO/GEO agency partner to drive organic growth through traditional and AI-driven search." },
  { co: "Excel Recruitment", role: "Senior Digital Marketing Manager", ask: "search", when: "27 Aug", where: "jobs.ie", q: "Improve brand visibility within AI-generated search results and answer engines." },
  { co: "Wayflyer", role: "Technical Revenue Operations Analyst", ask: "build", when: "17 Sep", where: "Careers page", q: "Build, deploy and continuously sharpen AI-native workflows and agents that augment how Sales, CS and the wider Revenue org work, not just automate around the edges." },
  { co: "Greenhouse", role: "Senior Account Executive, Mid-Market", ask: "sell", when: "2 Sep", where: "Careers page", q: "An AI-curious seller, you're comfortable learning and selling AI-enabled product capabilities as part of your pitch" },
  { co: "Microsoft", role: "Digital Enterprise Solution Sales Specialist, AI Workforce (French speaking)", ask: "sell", when: "17 Sep", where: "Indeed", q: "You will drive the day-to-day execution of Microsoft's strategic business priorities, lead the generative AI narratives, and sell best-in-class cloud services and platforms to our managed customers." },
];
