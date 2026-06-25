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
  lastUpdated: "2026-06-25",
  feedbackContacts: ["softco.com"],
  targetDate: "2026-07-11",
  hideProgress: true,
  zoneIntros: {
    deliverables: "Everything we're producing and where each piece stands.",
    brief:
      "SoftCo's own asset library, sent by John on 19 June. This is the brief: the existing formats the AI engine recreates and automates. It is not AI-made work.",
    work: "The AI versions. Each piece is marked for where it stands with our readability QA. Only the pieces marked QA passed are ready for your sign-off. In QA means we are still checking it. Fail QA means do not use it yet.",
    feedback: "A running record of all feedback and the replies, kept here so we can both see everything.",
  },
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
  { name: "Readability QA gate", detail: "Auto-fails assets on contrast, size, spacing, density", status: "ready", date: "2026-06-25", isNew: true },
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
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "Right now we're only on LinkedIn. We ran Google last year and pulled it, but we'll re-engage. We get far more bang from LinkedIn. Ideally, once the campaign's running, display would be on LinkedIn, Instagram and Google.",
    ],
    a: "Fine. LinkedIn is expensive but it's about the only place with reasonably accurate targeting, because people set their own. Instagram is interesting for you. Good to know the formats need to work across all three.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "The content isn't the problem, execution is. The campaign (Control & Compliance) and all eight written pieces are ready, but we kept getting stuck getting graphics out, a backlog with the designer. Worst is waiting on webinar images and missing the live window. Hugely frustrating.",
    ],
    a: "That's exactly the use case, repetitive, time-sensitive work we automate so you get blog images, webinar images and testimonials \"at the door\" without waiting on a designer.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "Two webinars a month, five or six promo images each, with faces and without, big/little titles, big/little dates. We've tested and know which work.",
    ],
    a: "That structure is exactly what a locked format is for. Agree the set once, then it comes out consistently.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "Oisín writes the blogs (softco.com is headless, WordPress to manage). While writing he requests about three images to show three things; the designer makes them, back and forth. Basic stuff: call-outs, pull quotes, before/afters, simple diagrams. Plus a social image per blog, sometimes carousels.",
    ],
    a: "All very doable, none of it's complicated. It just needs to be fast, consistent, and not stuck behind a person.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "Events are big, Gartner conferences in Miami and London. Three moments: pre, during, post. We want a carousel and/or single image to promote what we're doing there, like a webinar: \"these two people are talking about this, here's what you'll learn.\" On the day it's mostly attendee video.",
    ],
    a: "Two jobs: promoting the event (before and after) and the on-the-ground artwork, which is usually a last-minute scramble. The promo carousel/single image is the same pattern as the webinar promos, so we can cover it.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "We need a lot of email banners. (The current ones are a bit cluttered and use a separate campaign colour.)",
    ],
    a: "Easy to do. I took the buttons off, they're not real buttons in an email and were crowding the message. The logo matters and one line of copy. You can also set a max-character rule to force the writer to keep it simple.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "Contrast lists clips after each webinar but we use none, they lack context and pick the wrong moments and sizes. So it's manual: Oisín watches the whole video, picks clips, Descript to trim and remove ums, then the designer drops it into a SoftCo frame. Takes forever. Could Claude find the right clips from the transcript if I give it an MD file with our positioning, messaging, narrative, pain points and ICP?",
    ],
    a: "Yes. This one's about teaching judgement, not pixel-perfect, so less instant than the ad formats but very doable and worth it. The plan is a Claude webinar-clipper skill: Oisín points it at the latest transcript and it finds four or five clips using everything we've told it. I'll get access to your Contrast transcripts and start. Whether it can cut the clip itself I still need to test. Happy to drop the SoftCo frame and run a clean subtitled screen if that's easier.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "The \"why we pick a clip\" isn't written anywhere, it's Oisín's judgement. You could reverse-engineer the clips we've chosen historically to learn the pattern.",
    ],
    a: "Exactly, judgement can be decoded as long as he can articulate why he chose each clip. 30 minutes with him explaining his picks is worth far more than me guessing, and it all becomes the training for the skill. Send me his email and the list of clips you've used.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "On colour: the agency workshop said blue is synonymous with AP automation, everyone's blue, so they brought orange in to differentiate, and we kept both as accents. Should we just do what the stakeholders want?",
    ],
    a: "My two cents: pick a lane, be single-minded. Orange-on-blue divides your chances of building a brand people recognise, and you don't have the budget to carry two colours, the same fight I had at the Lottery (one green), Metro (one yellow) and Indeed. Orange as an accent (orange headlines on a blue background) can work, but I'd bite the bullet. I can absolutely recreate the orange versions if you want them, this is more your call with Daragh than a blocker for me. Separately, your new premium blue with the gradient beats the classic B2B light blue.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "These new ads are our new brand identity, applied by the graphic designer to a campaign. We're open to feedback.",
    ],
    a: "Honestly, they've got a picture inside a picture, a screen within a screen with charts inside that. At ad size the only takeaway is \"SoftCo has a new look.\" Single-mindedness matters, the smaller and busier the ad, the less anyone gets from it. They're recreatable, but the format should drive the goal, not the other way round.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "Faces is what we need, but internally the pushback is \"how will they know we're a software company?\", so there's pressure to show the product instead. This is more a want than something we have examples of. I'll send the agency brief on the type of images.",
    ],
    a: "Faces work, one person beats a group, and a face on the left beats the right because Western eyes read left to right. The answer to the internal point is that it's not about being a software company, it's the problem you solve. I can create faces, I just need examples of what you like or the agency brief so I get the style right.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "I love the testimonial cards, especially with a human face. Our limitation is how few clients have given a testimonial with their face and sign-off, so short term I need one version with a name/face and one without.",
    ],
    a: "Fine, we'll have both. You ask for the photo testimonial, drop in the new photo, and it follows the format. The named-and-faced ones are the upgrade when you have the sign-off.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "For the landing page the main thing we need is a before/after, \"before SoftCo / after SoftCo\" with images. The concept's simple but we've found it hard to land a good before/after visual.",
    ],
    a: "I showed you the Heineken green-light draggable before/after slider, it's tactile and would work nicely for this. I can build it as a Claude before/after tool: drop in two images and it makes the slider.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "Measured-outcome and stat cards are useful.",
    ],
    a: "I built a square chart ad even though you didn't ask, because I can see you wanting one. A few decisions baked in: SoftCo centred on vertical ads, a vertical bar chart (a horizontal one won't fit a square), and smooth not bouncy motion. One thing to fix, the logo is too small on the square, I prefer it bigger like the other sizes.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "(On the iceberg graphic from the old version.)",
    ],
    a: "Claude recreates the iceberg really well, but there's too much detail for an ad, I wouldn't run it small. It would work beautifully as a big interactive graphic on a web page.",
  },
  {
    who: "John Neary",
    when: "24 Jun 2026",
    q: [
      "We're promoting the new website, and showing the product matters, but you can't show a full screen of software because nobody can make sense of every button. If you show just a little animated piece it makes such a difference.",
    ],
    a: "Agreed completely. I can take a static image from your site and rebuild it as an animated walkthrough, which used to need a motion designer. Great for blog posts and showing how it works. I'll make it a skill: drop in your static, get the animated walkthrough out.",
  },
];

export const work: WorkSection[] = [
  /* Sections are grouped by zone for the engine: all zone:"brief" first, then
     all zone:"work", then zone:"feedback" last. Keep that order when editing.
     ---- ZONE: brief - SoftCo asset library (19 Jun, from John Neary).
     Source material FROM the client, not the AI versions. */
  {
    title: "Brief · LinkedIn static ads",
    kind: "gallery",
    zone: "brief",
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
    zone: "brief",
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
    zone: "brief",
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
    zone: "brief",
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
    zone: "brief",
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
    zone: "brief",
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
    zone: "brief",
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
    zone: "brief",
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
    zone: "brief",
    badge: "Brief",
    desc: "Current SoftCo version, full webinar/campaign landing page wireframe: hero and form, feature blocks, a dark stats band, footer. Deliverable: build and automate the campaign page.",
    items: [
      { src: "ae-landing-wireframe.png", ratio: "1470/7225", w: 320, cap: "Full page wireframe", download: true },
    ],
  },
  /* ---- ZONE: work - the AI versions, grouped by QA state. ---- */
  {
    title: "Blog & content cards",
    kind: "gallery",
    zone: "work",
    status: "ready",
    qa: "pass",
    groupLabel: "Passed QA - ready for your feedback",
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
    zone: "work",
    status: "ready",
    qa: "pass",
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
    zone: "work",
    status: "ready",
    qa: "pass",
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
    zone: "work",
    status: "ready",
    qa: "pass",
    desc: "Wide formats.",
    items: [
      { src: "blog_header.png", ratio: "1200/630", w: 480, cap: "Blog header · 1200×630" },
      { src: "thumbnail.png", ratio: "1280/720", w: 440, cap: "Thumbnail · 1280×720" },
    ],
  },
  {
    title: "Webinar promo",
    kind: "gallery",
    zone: "work",
    status: "ready",
    qa: "pass",
    desc: "Square 1080×1080.",
    items: [
      { src: "webinar_promo.png", ratio: "1/1", w: 300, cap: "Webinar promo · 1080×1080" },
    ],
  },
  {
    title: "Meeting background",
    kind: "gallery",
    zone: "work",
    status: "ready",
    qa: "pass",
    desc: "Virtual call background, the person sits on the clear right side. 1920×1080.",
    items: [
      { src: "meeting_bg.png", ratio: "1920/1080", w: 520, cap: "1920×1080" },
    ],
  },
  {
    title: "Chart Ad set",
    kind: "media",
    zone: "work",
    layout: "grouped",
    qa: "pending",
    groupLabel: "In QA - please hold off approving these",
    desc: "The animated display ad across the full IAB range, eleven sizes from the square down to the mobile strips. Every size is here at true proportion. Animated, so it has not been through the automatic readability gate yet.",
    groups: [
      { label: "Square and rectangle", items: CHART_SQUARE.map(chartTile) },
      { label: "Leaderboard and billboard", items: CHART_BOARD.map(chartTile) },
      { label: "Strips and mobile", items: CHART_STRIP.map(chartTile) },
    ],
  },
  {
    title: "Testimonial cards",
    kind: "media",
    zone: "work",
    layout: "pair",
    qa: "pending",
    desc: "Four layout options, each produced static and with the neuron field gently animating. Anton Scott is the test face. Real cards take a customer quote and photo.",
    items: TESTI.map(([key, name]) => ({
      key,
      name,
      src: `testimonial-${key}.mp4`,
      img: `testimonial-${key}.png`,
    })),
  },
  {
    title: "Blog figure · responsive",
    kind: "responsive",
    zone: "work",
    qa: "pending",
    isNew: true,
    context: "softco.com/blog",
    desc: "The e-invoicing readiness figure, the one piece reflowed for each screen. Flip the toggle to see the desktop and mobile layouts.",
    desktopSrc: "ae-blog-desktop.png",
    desktopRatio: "1681/912",
    mobileSrc: "ae-blog-mobile.png",
    mobileRatio: "1012/1641",
  },
  {
    title: "LinkedIn carousel",
    kind: "gallery",
    zone: "work",
    qa: "pending",
    desc: "A 3-slide square carousel. Multi-slide, so not through the automatic gate yet.",
    items: [
      { src: "carousel_1.png", ratio: "1/1", w: 220, cap: "Carousel 1/3" },
      { src: "carousel_2.png", ratio: "1/1", w: 220, cap: "Carousel 2/3" },
      { src: "carousel_3.png", ratio: "1/1", w: 220, cap: "Carousel 3/3" },
    ],
  },
  {
    title: "LinkedIn carousel · customer stories",
    kind: "gallery",
    zone: "work",
    qa: "pending",
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
    title: "Product Proof ad",
    kind: "media",
    zone: "work",
    layout: "single",
    qa: "pending",
    badge: "Extra",
    desc: "An extra we explored beyond the brief. The product itself, rebuilt as live UI and animated. Built as a large square for a LinkedIn organic post and a paid square ad.",
    item: { src: "proof-v2.mp4", poster: "proof-v2-poster.png", ratio: "1/1", w: 320, cap: "1080×1080 · organic + paid" },
  },
  {
    title: "Iceberg diagram",
    kind: "media",
    zone: "work",
    layout: "single",
    qa: "fail",
    groupLabel: "Fail QA - do not use yet",
    desc: "Animated explainer, the visible cost above the line, the hidden cost below. The labels around the iceberg are too small to read at ad size. It works as a large graphic on a web page, not as a small ad. Needs the labels enlarged or thinned before use.",
    item: { src: "iceberg-1080.mp4", poster: "iceberg-poster.png", ratio: "1/1", w: 320, cap: "1080×1080 · organic + paid" },
  },
  {
    title: "LinkedIn carousel · product walkthrough",
    kind: "gallery",
    zone: "work",
    qa: "fail",
    placement: "feed",
    carousel: true,
    desc: "A 5-slide LinkedIn carousel. One invoice from inbox to paid, with the AP screen rebuilt as live UI. The small line above each headline (e.g. STEP ONE · CAPTURE) is too pale to read. Needs that line brightened before use. Numbers shown are placeholder.",
    items: [
      { src: "product-carousel-1.png", ratio: "1/1", w: 210, cap: "1 · Cover" },
      { src: "product-carousel-2.png", ratio: "1/1", w: 210, cap: "2 · Capture" },
      { src: "product-carousel-3.png", ratio: "1/1", w: 210, cap: "3 · Match" },
      { src: "product-carousel-4.png", ratio: "1/1", w: 210, cap: "4 · Controls" },
      { src: "product-carousel-5.png", ratio: "1/1", w: 210, cap: "5 · Close" },
    ],
  },
  {
    title: "Readability QA gate",
    kind: "files",
    zone: "work",
    status: "ready",
    isNew: true,
    groupLabel: "The QA tool itself",
    wideDesc: true,
    desc: "The automatic check that runs at the end of the ad machine, answering Daragh's 18 June question. Every render is measured, never eyeballed, and an asset is blocked if it fails any of four gates: text contrast against its real background (WCAG AA, with a slightly easier bar for large headlines or approved brand pairs), minimum font size, clear space from the canvas edge and logo, and copy density (email banners must stay one line). When something fails it prints exactly what and why, e.g. \"headline: large text, measured 1.16:1, need >= 3:1\". The thresholds come from SoftCo's own approved templates, so signed-off work passes and only genuinely unreadable work fails. When an ad is flagged, the check opens a decision page showing it with our recommendation, and your team chooses: accept this one, change the rule for everything, or send it back to fix. Those choices update SoftCo's own settings, so the guardrails stay yours. Download the skill and a plain-English explainer below.",
    files: [
      { name: "ad-qa skill (Claude Code)", file: "ad-qa-skill.zip", note: "The full gate: engine, SoftCo config, docs", date: "25 June 2026" },
      { name: "How it works (plain English)", file: "ad-qa-how-it-works.md", note: "One-page explainer, no jargon", date: "25 June 2026" },
    ],
  },
  /* ---- ZONE: feedback - the running conversation, last. ---- */
  {
    title: "Feedback & responses",
    kind: "feedback",
    zone: "feedback",
    date: "24 June 2026",
    desc: "A running record of all feedback and commentary on this page, and the replies, kept here so we can both see everything. Click an entry to read the response.",
    intro: FB_INTRO,
    responder: "Paul",
    faq: FB_ITEMS,
    note: "From the 24 June call. John to send: Oisín's email plus ~30 minutes on his clip-picking logic, the list of clips used to date, and the agency brief on image types and faces; and an MD file (positioning, messaging, narrative, pain points, ICP) for the clipper. Paul to send the Mr Beast attention research, and is building the webinar-clipper, the before/after slider and the static-to-animated walkthrough, after first making Daragh's legibility edits and then automating each approved format one at a time. Parked: the orange/blue colour decision (John to discuss with Daragh).",
  },
];
