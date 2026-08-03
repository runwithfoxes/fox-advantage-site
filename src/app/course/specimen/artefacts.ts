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
 * ⚠️ SPECIMENS 01 TO 13 ARE STAND-IN COPY, NOT PAUL'S. None of it is course content and
 * none of it may be lifted into a real module. Paul's words only ever arrive through the
 * intake. `placeholder: true` in moduleData.ts is the same idea.
 *
 * ⭐ SPECIMEN 14 IS THE EXCEPTION AND IT IS DELIBERATE. `IMAGE_LESSON` at the foot of this
 * file is REAL material: Paul's lesson and his own photograph of his own Vespa.
 * It has its own, stricter provenance rules written above it. Read them before touching it.
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
  { key: "image", label: "Image", intake: "IMAGE: file.png + LABEL: (repeatable, in order)" },
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


/* ------------------------------------------------------------------ */
/* SPECIMEN 14 - THE IMAGE LESSON. Real material, not stand-ins.       */
/* ------------------------------------------------------------------ */

/**
 * ⚠️ READ ALL OF THIS BEFORE CHANGING ANY STRING BELOW. Paul rejected an earlier build of
 * this item on 25 Jul and the rulings are narrow and easy to undo by accident.
 *
 * ⭐ THE LESSON IS THREE MOVES, STATED IN PLAIN WORDS BEFORE ANYTHING HAPPENS.
 * Paul: "We need to say up front: this is what you do... It's really straightforward."
 * The reader is told the whole trick, then watches it happen once. The demonstration exists
 * to PROVE the three lines, not to make the reader discover them.
 *
 * ⛔ NO EXERCISE, NO GUESS, NO QUIZ, NO SCORE, IN ANY FORM. Paul: "I don't want to do that.
 * They're not children. They're busy people." An earlier build had the reader guess a word
 * count; it was deleted. A build before that had the reader attempt the decode themselves;
 * that was deleted too. If a future brief asks for either, cite this comment first.
 *
 * ⛔ NOTHING IS HIDDEN BEHIND A CLICK. The whole item is visible on load and reads top to
 * bottom in one pass. Paul: "It's not clear to me from the flow that I'm going to see the
 * next image. It's kind of hidden." There is no Generate button. The image IS the payoff.
 *
 * ⛔ NO WORD COUNT, NO CHARACTER COUNT, NO LENGTH COMMENTARY ANYWHERE ON THE ITEM.
 * Paul: "longer prompts aren't necessarily better or worse". Length is not a quality axis
 * and it is not the lesson. Do not teach long, do not teach short, do not count anything.
 * There is also NO REVEAL: the reader was told the three moves up front, so by the time they
 * reach the decode they already know AI wrote it. Nothing here is built to land or pay off.
 *
 * ⛔ THE PAGE MAKES ZERO MODEL CALLS, EVER, AT ANY SCALE. Paul: "I don't want a thousand
 * people using my tokens to generate images." No API call from the browser, no key on the
 * page, no server route that generates on demand, no "try it yourself" box. Every variant is
 * PRECOMPUTED once by us and committed as a static file. A thousand learners cost nothing.
 *
 * ⭐ THE PROMPT SHOWN MUST BE THE EXACT TEXT THAT PRODUCED THE IMAGE BESIDE IT. Not tidied,
 * not paraphrased. If they diverge, the item is a fake demonstration of its own lesson, which
 * is the one failure this example cannot survive. So a variant's `prompt` stays null until
 * its `src` exists, and both get filled in together, from the real generation.
 *
 * ⛔ NEVER point `src` at a file that was not generated from the `prompt` beside it.
 *
 * ON LENGTH, CHECKED AT SOURCE 25 JUL, so nobody trims to an imagined limit: Replicate's
 * input schema for bytedance/seedream-4.5 (version 9fe3b8282dcb) gives
 * `prompt: {type: string, maxLength: 4000}`, described as "Maximum 4000 characters. BytePlus
 * recommends keeping prompts under 600 English words". The decode below is 2303 characters
 * and 420 words, so it is inside both and needs no trimming. The "about a thousand
 * characters" figure is real for SOME generators and is NOT this model's limit.
 *
 * THE FOX IS DELETED FROM THIS ITEM, on Paul's call: the pair used to make the point did not
 * read as the same character, so it disproved its own point. If it ever comes back it has to
 * be really generated via `~/.claude/skills/fox-static/SKILL.md` step 4 WITH the style
 * reference image, which is the only thing that holds a character steady. Separate job.
 */

export type Variant = {
  key: string;
  /** The plain words Paul would actually type. Real, and never invented. */
  typed: string;
  /** The short amended prompt that came back. Null until it has really been produced. */
  prompt: string | null;
  /** The image that `prompt` produced. Null until it really exists. */
  src: string | null;
  alt?: string;
  pending?: string;
};

/** The three moves, in plain words, before anything is demonstrated. */
export const MOVES = [
  "Drop an image into AI and ask it for a descriptive prompt.",
  "Ask for the same prompt with one or two things changed.",
  "Generate the image.",
];

const VESPA_DECODE = `A colour photograph of a vintage Italian motor scooter, taken outdoors in direct midday sun. The camera is low, roughly at the height of the front mudguard, and close, about a metre from the front wheel, on a wide phone lens. The scooter is turned three quarters towards the camera with its front wheel nearest, so the mudguard and legshield loom large in the foreground and the body falls away and shrinks towards the top left corner. The machine runs as a diagonal from bottom right to upper left. Portrait orientation.

The bodywork is a metallic pale blue, a powder blue with real flake in it, and it shifts noticeably from panel to panel: near white where the sun strikes the crown of the mudguard and the top of the legshield, a deeper steel blue in the shaded flank and beneath the horn casting. The paint is glossy and old, carrying a fine haze of swirl marks and a few small chips.

The legshield carries a chrome script badge reading vespa in lower case, and above it a small dark blue hexagonal Piaggio badge in a chrome surround. A slim chrome trim strip follows the whole outline of the legshield and the crown of the mudguard. The round headlight sits high on the handlebars in a chrome nacelle, its glass ribbed, holding a hard white highlight. A round chrome mirror stands on a stalk to the left. A small round chrome horn cover sits low on the legshield.

The saddle is a single sprung seat, black and studded around the skirt, its top worn grey. The floor runners are ribbed alloy strips over blue with a black rubber mat, and the ignition keys hang from the floor on a black fob. The centre stand is down and the machine leans very slightly onto it.

The ground is pale grey concrete paving with visible aggregate and a joint running under the wheels, a darker tarmac patch and a square metal inspection cover to the left. The scooter throws a hard shadow with a sharp edge down and to the left, which places the sun high and a little behind the camera. Behind, thrown well out of focus, a pale rendered wall with two dark framed windows, and to the right a clipped green hedge over a strip of gravel. No sky in frame.

Overall the colour is high contrast and slightly cool, the blue of the paint set against warm grey ground, with a strong specular highlight on every chrome surface.`;

export const IMAGE_LESSON = {
  source: {
    src: "/course/vespa-source.jpg",
    label: "The picture we started with",
    alt: "A pale blue vintage Vespa scooter on a paved driveway in bright sun, photographed low and close from three quarters front",
    credit:
      "Paul's own Vespa, on his own phone. An ordinary photograph of a real thing, taken somewhere unremarkable, which is what everybody has.",
  },
  decode: {
    label: "The prompt AI wrote from it",
    provenance: "Written by AI from the photograph above, 25 Jul 2026",
    text: VESPA_DECODE,
  },
  /** ⭐ Three plain-language changes. All three shown, no click required. */
  variants: [
    {
      key: "rome",
      typed: "same Vespa, but on a street in Rome",
      prompt: null,
      src: null,
      pending:
        "Waiting on the go-ahead to generate. The prompt and the picture get filled in together, from the real generation, so the words shown are the words that made the image.",
    },
    {
      key: "rain",
      typed: "same Vespa, but at night in the rain",
      prompt: null,
      src: null,
      pending: "Same. Nothing goes in here that was not really generated from the prompt beside it.",
    },
    {
      key: "studio",
      typed: "same Vespa, but in a white studio",
      prompt: null,
      src: null,
      pending: "Same. Nothing goes in here that was not really generated from the prompt beside it.",
    },
  ] as Variant[],
};
