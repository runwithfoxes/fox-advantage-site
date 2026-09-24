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

export type Ask = "tools" | "builder" | "search";
export const ASK_LABEL: Record<Ask, string> = {
  tools: "Uses AI tools",
  builder: "Builds with AI",
  search: "AI search",
};

/** Verbatim from the 23 Sep test file. Yuno's line was not kept, so it is described, not quoted. */
export const WORDING: { co: string; role: string; ask: Ask; q: string; quoted: boolean }[] = [
  { co: "Wayflyer", role: "Technical Revenue Operations Analyst", ask: "builder", q: "You’re an AI-native builder.", quoted: true },
  { co: "Udemy", role: "Strategic Partnership Manager", ask: "tools", q: "AI proficiency. Experience leveraging AI tools to improve productivity, generate insights or streamline partner engagement workflows.", quoted: true },
  { co: "Dropbox", role: "Regional Sales Operations Manager", ask: "tools", q: "Experience using AI, automation, and analytics tools to improve forecasting, pipeline inspection, reporting, and workflow efficiency.", quoted: true },
  { co: "LearnUpon", role: "Director Partnerships", ask: "tools", q: "Experience using AI tools to streamline tasks and improve efficiencies.", quoted: true },
  { co: "Tines", role: "Lead Analyst, Revenue", ask: "builder", q: "curious about where AI can take repetitive work off your plate.", quoted: true },
  { co: "Yuno Energy", role: "Marketing, on jobs.ie", ask: "search", q: "Asks for visibility in AI search. The exact line gets pulled from the stored ad.", quoted: false },
];
