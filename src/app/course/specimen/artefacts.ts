/**
 * THE ARTEFACT CATALOGUE - the data behind /course/specimen.
 *
 * Built 25 Jul 2026 with Paul, answering one question: what kinds of thing can be in a
 * module, and how does each one get in?
 *
 * ⭐ THE THREE AXES. An item is not "a type". It picks off three separate axes:
 *    1. WHAT THE READER DOES  - read, paste, do, watch, compare, save, take.
 *    2. WHAT IT CARRIES       - an image, a video, a file, nothing. A property, not a type.
 *    3. WHICH PRIMITIVE IT RUNS - one of six named mechanics, or none.
 *
 * The bug this replaces: `kindOf()` in moduleData.ts derives the type from which ASSETS
 * are attached, so three of module 1's items are badged "Show and copy" with no prompt to
 * copy - item 01 among them. Assets and verbs are different axes and were collapsed into one.
 *
 * ⚠️ EVERY WORD OF SPECIMEN COPY IN HERE IS A STAND-IN, NOT PAUL'S. Nothing in this file
 * is course content and none of it may be lifted into a real module. Paul's words only
 * ever arrive through the intake. `placeholder: true` in moduleData.ts is the same idea.
 *
 * ⭐ THE COST RULE STILL BINDS (reference_course_interaction_patterns): nothing here
 * reaches a paid tool or a model. Every primitive below is Tier 1, browser only,
 * rules over data.
 */

export type Axis = "does" | "carries" | "primitive";

/** Axis 1. What the reader actually does with the item. */
export const VERBS = [
  { key: "read", label: "Read", note: "Your words. No action asked for." },
  { key: "paste", label: "Paste", note: "Words to copy into a model." },
  { key: "do", label: "Do", note: "An action in their own account. Nothing to copy." },
  { key: "watch", label: "Watch", note: "A clip carries the explanation." },
  { key: "compare", label: "Compare", note: "Two things, a judgement to make." },
  { key: "save", label: "Save", note: "Someone else's work, pointed at." },
  { key: "take", label: "Take", note: "A file they leave with." },
] as const;

/** Axis 2. What hangs off the item. A property, never a category. */
export const CARRIES = [
  { key: "image", label: "Image", intake: "IMAGE: file.png + CAPTION:" },
  { key: "video", label: "Video", intake: "VIDEO: clip.mp4 + POSTER: + CAPTION:" },
  { key: "file", label: "File", intake: "FILE: thing.xlsx + LABEL:" },
  { key: "none", label: "Nothing", intake: "no marker" },
] as const;

/** Axis 3. The six mechanics. Each built once, then fed data forever. */
export const PRIMITIVES = [
  { key: "tune", label: "Tune and keep", tier: 1 },
  { key: "hundred", label: "One by hand, then a hundred", tier: 1 },
  { key: "compare", label: "Compare, commit, reveal", tier: 1 },
  { key: "classify", label: "Classify each line", tier: 1 },
  { key: "guesses", label: "Ranked guesses", tier: 1 },
  { key: "assemble", label: "Drag to assemble", tier: 1 },
] as const;

/* ------------------------------------------------------------------ */
/* PRIMITIVE DATA. This is all a module author ever supplies.          */
/* ------------------------------------------------------------------ */

/** 1. Tune and keep. Variables, and the template they assemble. */
export const TUNE = {
  vars: [
    { key: "audience", label: "Audience", steps: ["everyone", "B2B marketers", "B2B marketers at 50-200 person SaaS firms"] },
    { key: "length", label: "Length", steps: ["no limit", "under 300 words", "under 150 words"] },
    { key: "register", label: "Register", steps: ["neutral", "plain and direct", "plain, direct, no marketing words"] },
  ],
  build: (v: Record<string, string>) =>
    `Write a LinkedIn post.\n\nAudience: ${v.audience}\nLength: ${v.length}\nRegister: ${v.register}\n\nBefore you write, tell me what you think the reader already believes.`,
};

/** 2. One by hand, then a hundred. The flaw, the options, and the two rates. */
export const HUNDRED = {
  brief: [
    "Send a follow-up to everyone who downloaded the report.",
    "Reference the report by name.",
    "Ask for a meeting.",
  ],
  question: "One line here will do damage once it runs a hundred times. Which?",
  options: [
    { key: "a", text: "Send to everyone who downloaded", right: true },
    { key: "b", text: "Reference the report by name", right: false },
    { key: "c", text: "Ask for a meeting", right: false },
  ],
  /** How many of 100 land badly, unfixed vs fixed. Rules, not a model. */
  badUnfixed: 78,
  badFixed: 6,
  unfixedNote: "78 of 100 went to people who never asked, because one word in the brief said everyone.",
  fixedNote: "6 of 100 still miss. The brief got narrower, so the damage got small.",
};

/** 3. Compare, commit, reveal. Two outputs and the view that follows. */
export const COMPARE = {
  a: "Our platform leverages AI to unlock unprecedented efficiency for modern marketing teams, driving measurable outcomes at scale.",
  b: "Most of the work in a campaign is the setup. This does the setup, so a two-week build takes an afternoon.",
  expert:
    "B says what the thing does and what changes. A could be any company in any category, which is the tell: if a competitor could run the same sentence unedited, it is not saying anything.",
};

/** 4. Classify each line. The passage, and the answer key. */
export const CLASSIFY = {
  tags: ["supported", "inferred", "invented"] as const,
  lines: [
    { text: "The report surveyed 1,200 marketers across Ireland and the UK.", key: "supported" },
    { text: "Which suggests most teams are further along than they admit publicly.", key: "inferred" },
    { text: "Gartner named this the fastest-growing category of 2026.", key: "invented" },
    { text: "Two thirds of respondents said they had no written policy.", key: "supported" },
  ],
};

/** 5. Ranked guesses. Keyword to guesses, precomputed. Never a live call. */
export const GUESSES: { match: string[]; guesses: [string, number][] }[] = [
  {
    match: ["email", "sequence", "follow"],
    guesses: [
      ["Write a cold outreach sequence", 0.62],
      ["Write a follow-up to a warm lead", 0.24],
      ["Audit an existing sequence", 0.14],
    ],
  },
  {
    match: ["brand", "positioning", "message"],
    guesses: [
      ["Write positioning for a new product", 0.55],
      ["Sharpen an existing value proposition", 0.31],
      ["Compare two brands' messaging", 0.14],
    ],
  },
  {
    match: ["report", "data", "analyse", "analyze", "numbers"],
    guesses: [
      ["Summarise a dataset you will paste", 0.58],
      ["Find the story in a set of results", 0.29],
      ["Check a claim against the numbers", 0.13],
    ],
  },
];

/** 6. Drag to assemble. The blocks, and which belong in a good brief. */
export const ASSEMBLE = {
  target: "A brief the model can act on",
  blocks: [
    { key: "who", text: "Who it is for", belongs: true },
    { key: "believe", text: "What they already believe", belongs: true },
    { key: "want", text: "What you want them to do", belongs: true },
    { key: "avoid", text: "What to avoid saying", belongs: true },
    { key: "polite", text: "Please and thank you", belongs: false },
    { key: "role", text: "You are a world-class expert", belongs: false },
  ],
};
