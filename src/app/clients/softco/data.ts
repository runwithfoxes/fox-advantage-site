/* The ONE file you edit to keep this page live.
   Change statuses, dates, notes, and add work sections here. No React or CSS
   needed. Commit + push and Vercel redeploys.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../_components/ClientWorkspace";

export const meta: Meta = {
  client: "SoftCo",
  slug: "softco",
  headline: "Creative deliverables",
  intro:
    "A live view of the work for SoftCo in the new brand system. The full asset list is below with status. The finished pieces are shown in full underneath, static and animated. Have a look and send back your thoughts.",
  lastUpdated: "2026-06-19",
  feedbackContacts: ["softco.com"],
};

export const deliverables: Deliverable[] = [
  { name: "Display / banner ads", detail: "11 IAB sizes, animated", status: "ready", date: "2026-06-12" },
  { name: "Testimonial cards", detail: "4 layouts, square, static + animated", status: "ready", date: "2026-06-13" },
  { name: "Iceberg diagram", detail: "Square 1080×1080, organic + paid", status: "ready", date: "2026-06-12" },
  { name: "Email banners", detail: "600×140 and 1024×206", status: "ready", date: "2026-06-13" },
  { name: "Blog headers", detail: "1200×630", status: "ready", date: "2026-06-13" },
  { name: "Blog content cards", detail: "Stat, pull-quote, question", status: "ready", date: "2026-06-13" },
  { name: "Event graphics", detail: "Square 1080×1080", status: "ready", date: "2026-06-13" },
  { name: "Meeting backgrounds", detail: "1920×1080 virtual background", status: "ready", date: "2026-06-13" },
  { name: "Social posts", detail: "Square 1080×1080", status: "ready", date: "2026-06-13" },
  { name: "Carousels", detail: "3-slide, square 1080×1080", status: "ready", date: "2026-06-13" },
  { name: "Product walkthrough carousel", detail: "5-slide, square 1080×1080", status: "ready", date: "2026-06-13" },
  { name: "Testimonial carousel", detail: "5-slide, square 1080×1080", status: "ready", date: "2026-06-13" },
  { name: "Webinar promos", detail: "Square 1080×1080", status: "ready", date: "2026-06-13" },
  { name: "Thumbnails", detail: "1280×720", status: "ready", date: "2026-06-13" },
  { name: "Video clips", detail: "Webinar repurposing", status: "todo" },
  { name: "Product Proof ad", detail: "Square 1080×1080, extra", status: "ready", date: "2026-06-12" },
];

/* Chart Ad set, grouped by shape. [size, aspect-ratio, display-width-px] */
type Tile = [string, string, number];
const chartTile = (t: Tile) => {
  const [size, ratio, w] = t;
  return { src: `chart-${size}.mp4`, poster: `chart-${size}-poster.png`, ratio, w, cap: size };
};
const CHART_SQUARE: Tile[] = [
  ["1080x1080", "1080/1080", 280],
  ["640x480", "640/480", 300],
  ["300x250", "300/250", 240],
  ["160x600", "160/600", 150],
];
const CHART_BOARD: Tile[] = [
  ["970x250", "970/250", 560],
  ["1029x210", "1029/210", 560],
  ["728x90", "728/90", 440],
  ["600x200", "600/200", 340],
];
const CHART_STRIP: Tile[] = [
  ["320x100", "320/100", 320],
  ["600x100", "600/100", 460],
  ["300x50", "300/50", 320],
];

/* Testimonial layouts. [key, name] */
const TESTI: [string, string][] = [
  ["v1", "Photo column"],
  ["v2", "Cut-out"],
  ["A", "Quote panel"],
  ["B", "Speaker promo"],
];

/* Feedback round - 18 June 2026. Verbatim. */
const FB_INTRO =
  "Ok great. So all of what you want is possible and the way to get good quality is about deciding upfront these decisions as much as possible. You can have a wide range as long as each one is decided.";
const FB_ITEMS: { q: string[]; a: string; who?: string; when?: string }[] = [
  {
    who: "Daragh Byrne",
    when: "18 Jun 2026",
    q: [
      "Will the system give us more variation / flexibility so every asset doesn't feel like the same blue template. Will we be able to instruct it, or will we be tied to strict templates? For example - change blue to SoftCo orange and more.",
    ],
    a: "Yes but we have to build them upfront. For example, if you want orange or others, show me examples and I'll build them. So you might end up with 3-5 types of ads formats. To be honest, AI alone, I'd recommend you don't vary it too much. You might get bored but consistency pays off. If you don't have examples, we can still build them. I just need to know what's on in your heads on this.",
  },
  {
    who: "Daragh Byrne",
    when: "18 Jun 2026",
    q: [
      "In some examples, it's not immediately clear what should be read first.",
      "Am I correct in assuming that readability will improve as font size, weight, contrast, text density feel off in parts.",
    ],
    a: "I suggest we lock in font size per asset and shape upfront. One example is your iceberg is complex for a banner ad. So either you decide this is not a good idea for a banner ad or we find a better way. For now, I was just replicating it, but I wouldn't necessarily recommend this. This is about locking in rules which as \"font must be x size for x shape and size\" and this forces user to make decisions on number of words you cannot go over.",
  },
  {
    who: "Daragh Byrne",
    when: "18 Jun 2026",
    q: [
      "Again (and maybe this is part of the development), but we will want to have Product-led and human-led assets. We have found they perform better.",
    ],
    a: "Yes on product and human. Are there examples in the files you sent me? If not, let me know examples. People do get higher attention.",
  },
  {
    who: "Daragh Byrne",
    when: "18 Jun 2026",
    q: [
      "Webinar repurposing remains the highest-value workflow and should remain a major focus of Phase 1.",
      "I know you mentioned looking at another webinar tool, but can we see what our existing one does first? I believe it has a Claude plug-in. John Neary can provide more info.",
    ],
    a: "I looked at your webinar tool, and registered with it but it seems to be more about data on what happened, views etc not a clipping tool, unless I got that wrong? Can you tell me, as this is critical to move forward quickly?",
  },
  {
    who: "Daragh Byrne",
    when: "18 Jun 2026",
    q: [
      "Will the system include readability guardrails so that assets fail QA automatically if minimum contrast, size, or spacing requirements are not met.",
    ],
    a: "The QA is possible. It's a good idea. Nobody asked me before. I'll do that.",
  },
  {
    who: "Daragh Byrne",
    when: "18 Jun 2026",
    q: [
      "I know we are getting ahead here, but how does the system decide which asset format to generate?",
    ],
    a: "You decide what assets you want. Think of it as a menu of customised options to choose from. The menu options don't have to be narrow but again I'd recommend you don't go so wide, so you have consistency. You might have say a product route, a testimonial route, a case study route etc. And each of these would have a range of formats / sizes.",
  },
  {
    who: "John Neary",
    when: "18 Jun 2026",
    q: [
      "I appreciate that consistency pays off, but I a curious what the limits are to allow the engine creative freedom beyond the stricter and more consistent templates.",
      "I'll work on categorizing all imaging in the morning and share them with you. After which we can arrange a call.",
    ],
    a: "I'm confident we can recreate any format or route we want. I could be wrong but so far, this has proved true. I can show you how to deviate from what is locked in. But take my time running the National Lottery marketing. We had jackpot ads for 4 products. All different from eachother but each followed a format. We also had Good Causes format, and some other formats. But all in, we had about 6 types of ads.\n\nSo you / we can train AI on whatever format you wish. The challenge is if a brand wants a different format every time, which is not a good idea in general. As in non ai world, that racks up costs of origination each time and same in AI world. So best way to think about this is what is the widest scope of ads you would use, and then articulate these in detail. It requires a bit of discipline but that was the case pre-AI for any brand that wants quality at speed too. In Lottery, I didn't want to waste time or money re-creating new formats every time. We had our 4-6 types and everybody in the agency was to execute as efficiently as possible once we agree what they are.",
  },
];

export const work: WorkSection[] = [
  /* ---- THE BRIEF: SoftCo asset library (19 Jun, from John Neary) ----
     Source material FROM the client. This is NOT the AI versions. It is the
     existing set of formats the AI engine recreates and automates. Mobile/
     desktop and any responsive versions belong to the AI versions, not here.
     Reconcile into the tracker later. */
  {
    title: "The brief",
    kind: "gallery",
    badge: "Source material",
    desc: "Everything in this section is from SoftCo's own asset library, sent by John on 19 June. This is the brief: the existing formats the AI engine recreates and automates. It is not AI-made work. The AI versions are the deliverables list above and the finished pieces below.",
    items: [],
  },
  {
    title: "Brief · LinkedIn static ads",
    kind: "gallery",
    badge: "Brief",
    desc: "Current SoftCo version, from John's library (19 Jun). Product-led and human-led single-image ads. Deliverable: recreate as a locked route and automate.",
    items: [
      { src: "ae-li-static-1.png", ratio: "1200/1350", w: 240, cap: "Human-led · photographic", download: true },
      { src: "ae-li-static-3.png", ratio: "1200/1350", w: 240, cap: "Product-led · brand orange", download: true },
      { src: "ae-li-static-5.png", ratio: "1200/1350", w: 240, cap: "Product-led", download: true },
    ],
  },
  {
    title: "Brief · Email banners",
    kind: "gallery",
    badge: "Brief",
    desc: "Current SoftCo version. Wide email header strips, single line of copy and a CTA. Deliverable: recreate and automate across their banner sizes.",
    items: [
      { src: "ae-email-v3.png", ratio: "600/140", w: 480, cap: "600×140", download: true },
      { src: "ae-email-v31.png", ratio: "1024/206", w: 520, cap: "1024×206", download: true },
      { src: "ae-email-template15.png", ratio: "1584/396", w: 520, cap: "Wide template", download: true },
    ],
  },
  {
    title: "Brief · Promo & stat cards",
    kind: "gallery",
    badge: "Brief",
    desc: "Current SoftCo version. Square social tiles in the Control campaign system: big-stat, reframe statement with CTA, and question cards. Deliverable: recreate and automate.",
    items: [
      { src: "ae-promo-statcard.png", ratio: "1/1", w: 270, cap: "Stat card", download: true },
      { src: "ae-promo-reframe.png", ratio: "1/1", w: 270, cap: "Reframe + CTA", download: true },
      { src: "ae-promo-volume.png", ratio: "1/1", w: 270, cap: "Question", download: true },
      { src: "ae-promo-supplier.png", ratio: "1/1", w: 270, cap: "Question", download: true },
    ],
  },
  {
    title: "Brief · LinkedIn carousels",
    kind: "gallery",
    badge: "Brief",
    desc: "Current SoftCo version. Multi-slide square carousels (a 3-panel set, plus a 7-slide set cover). Deliverable: recreate as a locked route and automate.",
    items: [
      { src: "ae-carousel1-1.png", ratio: "1/1", w: 220, cap: "Set 1 · 1/3", download: true },
      { src: "ae-carousel1-2.png", ratio: "1/1", w: 220, cap: "Set 1 · 2/3", download: true },
      { src: "ae-carousel1-3.png", ratio: "1/1", w: 220, cap: "Set 1 · 3/3", download: true },
      { src: "ae-carousel2-1.png", ratio: "1/1", w: 220, cap: "Set 2 · cover", download: true },
    ],
  },
  {
    title: "Brief · Blog diagrams & figures",
    kind: "gallery",
    badge: "Brief",
    desc: "Current SoftCo version. In-article explainer diagrams and figures. Deliverable: recreate as a locked route and automate.",
    items: [
      { src: "ae-blog-paymentloops.png", ratio: "2348/1331", w: 460, cap: "Payment-loops diagram", download: true },
      { src: "ae-blog-fig1.png", ratio: "2005/675", w: 480, cap: "Figure", download: true },
      { src: "ae-blog-fig3.png", ratio: "2453/845", w: 480, cap: "Figure", download: true },
    ],
  },
  {
    title: "Brief · Testimonial cards",
    kind: "gallery",
    badge: "Brief",
    desc: "Current SoftCo version, with-names variant (a without-names set also exists). Square customer-quote cards with logo. Deliverable: recreate and automate.",
    items: [
      { src: "ae-testi-dairygold.png", ratio: "1/1", w: 260, cap: "Dairygold", download: true },
      { src: "ae-testi-logitech.png", ratio: "1/1", w: 260, cap: "Logitech", download: true },
      { src: "ae-testi-smyths.png", ratio: "1/1", w: 260, cap: "Smyths", download: true },
      { src: "ae-testi-superdry.png", ratio: "1/1", w: 260, cap: "Superdry", download: true },
      { src: "ae-testi-noname-dairygold.png", ratio: "1/1", w: 260, cap: "Without-names variant", download: true },
    ],
  },
  {
    title: "Brief · Webinar clips & promos",
    kind: "gallery",
    badge: "Brief",
    desc: "Current SoftCo version. Webinar repurposing: promo images plus a clip template (the pack also holds six cut video clips). The highest-value workflow. Deliverable: recreate and automate the clip and promo pipeline.",
    items: [
      { src: "ae-webinar-1.png", ratio: "1/1", w: 260, cap: "Webinar promo", download: true },
      { src: "ae-webinar-2.png", ratio: "1/1", w: 260, cap: "Webinar promo", download: true },
      { src: "ae-webinar-3.png", ratio: "1/1", w: 260, cap: "Webinar promo", download: true },
      { src: "ae-webinar-clip.mp4", ratio: "720/1280", w: 180, cap: "Video clip · plays", download: true },
      { src: "ae-webinar-cliptemplate.png", ratio: "720/1280", w: 180, cap: "Clip template", download: true },
      { src: "ae-webinar-header.png", ratio: "1604/487", w: 460, cap: "Webinar header", download: true },
    ],
  },
  {
    title: "Brief · Event graphics",
    kind: "gallery",
    badge: "Brief",
    desc: "Current SoftCo version. Event sponsorship graphics (Lumenia and SSOW shown; Gartner and IOFM also in the pack). Square and social. Deliverable: recreate as a locked route and automate.",
    items: [
      { src: "ae-event-lumenia.png", ratio: "1200/1350", w: 240, cap: "Lumenia · sponsor", download: true },
      { src: "ae-event-lumenia2.png", ratio: "1200/1321", w: 240, cap: "Lumenia", download: true },
      { src: "ae-event-ssow.png", ratio: "1/1", w: 260, cap: "SSOW · social", download: true },
      { src: "ae-event-ssow-li.png", ratio: "1/1", w: 260, cap: "SSOW · LinkedIn", download: true },
    ],
  },
  {
    title: "Brief · Campaign landing page",
    kind: "gallery",
    badge: "Brief",
    desc: "Current SoftCo version, full webinar/campaign landing page wireframe: hero and form, feature blocks, a dark stats band, footer. Deliverable: build and automate the campaign page.",
    items: [
      { src: "ae-landing-wireframe.png", ratio: "1470/7225", w: 320, cap: "Full page wireframe", download: true },
    ],
  },
  {
    title: "Feedback & responses",
    kind: "feedback",
    date: "18 June 2026",
    desc: "A running record of all feedback and commentary on this page, and the replies, kept here so we can both see everything. Click an entry to read the response.",
    intro: FB_INTRO,
    responder: "Paul",
    faq: FB_ITEMS,
    note: "Next step agreed: a short video call to go through each ad and format one by one, transcribed so the full feedback is captured.",
  },
  {
    title: "Chart Ad set",
    kind: "media",
    layout: "grouped",
    status: "ready",
    desc: "The animated display ad across the full IAB range, eleven sizes from the square down to the mobile strips. Every size is here at true proportion.",
    groups: [
      { label: "Square and rectangle", items: CHART_SQUARE.map(chartTile) },
      { label: "Leaderboard and billboard", items: CHART_BOARD.map(chartTile) },
      { label: "Strips and mobile", items: CHART_STRIP.map(chartTile) },
    ],
  },
  {
    title: "Iceberg diagram",
    kind: "media",
    layout: "single",
    status: "ready",
    desc: "Animated explainer, the visible cost above the line, the hidden cost below. Built as a square for LinkedIn, organic and paid.",
    item: { src: "iceberg-1080.mp4", poster: "iceberg-poster.png", ratio: "1/1", w: 320, cap: "1080×1080 · organic + paid" },
  },
  {
    title: "Testimonial cards",
    kind: "media",
    layout: "pair",
    status: "ready",
    desc: "Four layout options, each produced static and with the neuron field gently animating. Anton Scott is the test face. Real cards take a customer quote and photo.",
    items: TESTI.map(([key, name]) => ({
      key,
      name,
      src: `testimonial-${key}.mp4`,
      img: `testimonial-${key}.png`,
    })),
  },
  {
    title: "Blog & content cards",
    kind: "gallery",
    status: "ready",
    desc: "Stat, pull-quote and question cards. Square 1080×1080.",
    items: [
      { src: "stat_card.png", ratio: "1/1", w: 300, cap: "Stat · 1080×1080" },
      { src: "quote_card.png", ratio: "1/1", w: 300, cap: "Pull-quote · 1080×1080" },
      { src: "question_card.png", ratio: "1/1", w: 300, cap: "Question · 1080×1080" },
    ],
  },
  {
    title: "Social & event",
    kind: "gallery",
    status: "ready",
    placement: "feed",
    desc: "Square 1080×1080, organic and paid. The Gartner mark is placeholder pending the real logo.",
    items: [
      { src: "social_post.png", ratio: "1/1", w: 300, cap: "Social post · 1080×1080" },
      { src: "event_card.png", ratio: "1/1", w: 300, cap: "Event graphic · 1080×1080" },
    ],
  },
  {
    title: "Email banners",
    kind: "gallery",
    status: "ready",
    placement: "email",
    desc: "Your existing email banner dimensions, single line of copy.",
    items: [
      { src: "email_banner_1024.png", ratio: "1024/206", w: 520, cap: "1024×206" },
      { src: "email_banner_600.png", ratio: "600/140", w: 420, cap: "600×140" },
    ],
  },
  {
    title: "Blog header & thumbnail",
    kind: "gallery",
    status: "ready",
    desc: "Wide formats.",
    items: [
      { src: "blog_header.png", ratio: "1200/630", w: 480, cap: "Blog header · 1200×630" },
      { src: "thumbnail.png", ratio: "1280/720", w: 440, cap: "Thumbnail · 1280×720" },
    ],
  },
  {
    title: "Webinar & LinkedIn carousel",
    kind: "gallery",
    status: "ready",
    desc: "Square 1080×1080. The carousel is a 3-slide set.",
    items: [
      { src: "webinar_promo.png", ratio: "1/1", w: 300, cap: "Webinar promo · 1080×1080" },
      { src: "carousel_1.png", ratio: "1/1", w: 220, cap: "Carousel 1/3" },
      { src: "carousel_2.png", ratio: "1/1", w: 220, cap: "Carousel 2/3" },
      { src: "carousel_3.png", ratio: "1/1", w: 220, cap: "Carousel 3/3" },
    ],
  },
  {
    title: "LinkedIn carousel · product walkthrough",
    kind: "gallery",
    status: "ready",
    placement: "feed",
    carousel: true,
    desc: "A 5-slide LinkedIn carousel. One invoice from inbox to paid, with the AP screen rebuilt as live UI. Numbers shown are placeholder, to confirm before publishing.",
    items: [
      { src: "product-carousel-1.png", ratio: "1/1", w: 210, cap: "1 · Cover" },
      { src: "product-carousel-2.png", ratio: "1/1", w: 210, cap: "2 · Capture" },
      { src: "product-carousel-3.png", ratio: "1/1", w: 210, cap: "3 · Match" },
      { src: "product-carousel-4.png", ratio: "1/1", w: 210, cap: "4 · Controls" },
      { src: "product-carousel-5.png", ratio: "1/1", w: 210, cap: "5 · Close" },
    ],
  },
  {
    title: "LinkedIn carousel · customer stories",
    kind: "gallery",
    status: "ready",
    placement: "feed",
    carousel: true,
    desc: "A 5-slide LinkedIn carousel. Face-led customer proof. Faces, names and the retention figure are placeholder, to confirm before publishing.",
    items: [
      { src: "testimonial-carousel-1.png", ratio: "1/1", w: 210, cap: "1 · Cover" },
      { src: "testimonial-carousel-2.png", ratio: "1/1", w: 210, cap: "2 · Customer" },
      { src: "testimonial-carousel-3.png", ratio: "1/1", w: 210, cap: "3 · Customer" },
      { src: "testimonial-carousel-4.png", ratio: "1/1", w: 210, cap: "4 · Result" },
      { src: "testimonial-carousel-5.png", ratio: "1/1", w: 210, cap: "5 · Close" },
    ],
  },
  {
    title: "Meeting background",
    kind: "gallery",
    status: "ready",
    desc: "Virtual call background, the person sits on the clear right side. 1920×1080.",
    items: [
      { src: "meeting_bg.png", ratio: "1920/1080", w: 520, cap: "1920×1080" },
    ],
  },
  {
    title: "Product Proof ad",
    kind: "media",
    layout: "single",
    badge: "Extra",
    desc: "An extra we explored beyond the brief. The product itself, rebuilt as live UI and animated. Built as a large square for a LinkedIn organic post and a paid square ad.",
    item: { src: "proof-v2.mp4", poster: "proof-v2-poster.png", ratio: "1/1", w: 320, cap: "1080×1080 · organic + paid" },
  },
];
