/* /retail-media - the retail media machine, shown as a worked example on the
   Heineken brand across Tesco's placements. The audience is any retail media
   team; no client is named. Assets live in public/clients/retail-media/media/.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../clients/_components/ClientWorkspace";

export const meta: Meta = {
  client: "Retail Media",
  slug: "retail-media",
  headline: "One campaign, every Tesco placement",
  intro: "",
  lastUpdated: "2026-07-15",
  hideProgress: true,
  zoneIntros: {
    deliverables: "The twelve touchpoints of the Tesco shopper journey, and where each one stands.",
    work: "The journey first, then each placement up close, then the fingerprint: the original and our rebuild.",
  },
};

/* The 12 journey nodes as the scoreboard. Honest statuses only. */
export const deliverables: Deliverable[] = [
  { name: "1 · eCRM email", detail: "Tesco eCRM module, rebuilt from the real layout", status: "ready", anchor: "cw-s-ecrm-email-rebuilt-from-the-real-tesco-layout", note: "Rebuilt in the real Tesco layout; hero carries the headline and the €19 Clubcard price." },
  { name: "2 · Tesco.ie web/app", detail: "Onsite hero strip and MPU set", status: "ready", anchor: "cw-s-each-placement-up-close", note: "Hero strip (1456x180) and MPU (300x250) both built." },
  { name: "3 · Tesco socials", detail: "Geo-map social, 1080x1080", status: "ready", anchor: "cw-s-each-placement-up-close" },
  { name: "4 · Convenience / store wrap", detail: "Large-format print wrap, 720x1800", status: "ready", anchor: "cw-s-each-placement-up-close" },
  { name: "5 · JCD screens", detail: "1080x1920 portrait chassis, static and motion", status: "ready", anchor: "cw-s-each-placement-up-close", note: "Static receipted to within 3px; 10s motion built on the same chassis." },
  { name: "6 · Totem screens", detail: "Same portrait chassis, directional to the drinks aisle", status: "ready", anchor: "cw-s-each-placement-up-close", note: "Runs on the same portrait chassis as the JCD screen." },
  { name: "7 · Hanging boards", detail: "Landscape, arrow directional", status: "in-progress", note: "Landscape plate registered; creative in build." },
  { name: "8 · Power aisle screen", detail: "Wide digital strip", status: "in-progress", note: "Same landscape/band family; sized after the boards land." },
  { name: "9 · Goal post screens", detail: "Cross-collaboration bundle: brand x Tesco partner pack", status: "in-progress", note: "Bundle creative in rebuild." },
  { name: "10 · BWS gate, outside", detail: "Print gate panel, 0.0 message only outside the zone", status: "in-progress", note: "In build: needs a real 0.0 pack shot before the panel is made - we don't fake the product." },
  { name: "11 · BWS gate, inside", detail: "Print gate panel, full alcohol message inside", status: "ready", anchor: "cw-s-bws-gate-inside", note: "Landscape gate panel built off the registered plate, carrying the €19 offer." },
  { name: "12 · BWS special build", detail: "In-bay screens, sound on", status: "todo" },
];

export const work: WorkSection[] = [
  { title: "The Tesco shopper journey", kind: "embed", badge: "The map",
    desc: "Twelve touchpoints in the order a shopper meets them: at home, online, on the way, into the store, down the aisle, into the drinks zone. Each tile is the actual ad at its real format shape; the dashed tiles are still in build.",
    wideDesc: true,
    embedSrc: "journey.html",
    embedHeight: 1240 },

  { title: "Each placement, up close", kind: "media", badge: "The placements",
    desc: "One campaign - Spain v France, Heineken Original at the €19 Clubcard price - remade into each placement's own format from a single machine. Every ad carries the price, because retail is about acting now, not admiring the brand. Same proportions, same disc, re-laid-out per shape, never scaled.",
    wideDesc: true,
    layout: "grouped",
    groups: [
      { label: "In-store screen · JCD & totem · 1080x1920",
        items: [
          { src: "screen-still.png", w: 300, ratio: "1080 / 1920", cap: "The still - receipted to within 3px of the reference." },
          { src: "screen-motion.mp4", w: 300, ratio: "1080 / 1920", cap: "The 10-second motion, built on the same chassis." },
        ] },
      { label: "Tesco social · 1080x1080",
        items: [ { src: "social-square.png", w: 440, ratio: "1 / 1" } ] },
      { label: "Convenience / store wrap · 720x1800",
        items: [ { src: "store-wrap.png", w: 210, ratio: "720 / 1800" } ] },
      { label: "Tesco.ie hero strip · 1456x180",
        items: [ { src: "hero-strip.png", w: 760, ratio: "1456 / 180", cap: "The copy flanks the can; the price flash sits on the right." } ] },
      { label: "Tesco.ie MPU · 300x250 (actual size)",
        items: [ { src: "mpu.png", w: 300, ratio: "300 / 250", cap: "At true size - the price flash moves to the corner so it still reads." } ] },
    ] },

  { title: "eCRM email, rebuilt from the real Tesco layout", kind: "embed", badge: "Placement 1 · At home",
    desc: "The Tesco eCRM email, rebuilt: Tesco chrome, our machine's creative as the hero carrying the headline and the €19 Clubcard price, the offer in the body, the live footer and terms. The price does the work.",
    wideDesc: true,
    embedSrc: "email.html",
    embedHeight: 1180 },

  { title: "BWS gate, inside", kind: "media", badge: "Placement 11 · The drinks zone",
    desc: "The security gate into the beer, wine and spirits zone, carrying the full €19 alcohol offer. The outside-zone panel (0.0 message only) is in build: it needs a real 0.0 pack shot, which we won't fake.",
    wideDesc: true,
    layout: "single",
    item: { src: "node11-gate-inside.png", w: 620, ratio: "1920 / 1080" } },

  { title: "In the real world", kind: "media", badge: "In situ",
    desc: "The same campaign as a shopper actually meets it: on the in-store screen, in the inbox on a phone, and onsite on Tesco.ie. Each one is our creative rebuilt into the real placement, from a photo of that placement.",
    wideDesc: true,
    layout: "grouped",
    groups: [
      { label: "In-store screen · JCD / totem",
        items: [ { src: "insitu-totem.png", w: 340, ratio: "1250 / 2130" } ] },
      { label: "In the inbox · eCRM email on a phone",
        items: [ { src: "insitu-email.png", w: 330, ratio: "784 / 1556" } ] },
      { label: "Onsite · Tesco.ie search",
        items: [ { src: "insitu-onsite.png", w: 940, ratio: "2912 / 1800", cap: "Sponsored hero banner and MPU on the live results page - the €19 Clubcard price in the grid is real." } ] },
    ] },

  { title: "The fingerprint: original vs rebuild", kind: "compare", badge: "The method",
    desc: "Drag the slider. Left is the finished Heineken Champions League static, right is the same ad rebuilt by our machine, measured to within 3 pixels. Both are set in the same type, so what you are judging is the rebuild of the scene, the layout and the containment, not a font swap. This piece is a sponsorship promo, not a retail ad; we use it here purely to show the fingerprint step. The retail creative lives in the journey above, each ad in its placement's own grammar.",
    wideDesc: true,
    compare: {
      before: "original-win-match-tickets.png",
      after: "rebuild-win-match-tickets.png",
      ratio: "786/1102",
      w: 440,
      labelBefore: "The original",
      labelAfter: "Rebuilt by the machine",
      download: false,
    } },

  { title: "How it works: calibrate once, produce always", kind: "copy", badge: "The machine",
    desc: "",
    blocks: [
      { label: "Fingerprint once",
        text: "We measure the brand's real ad: every element position, every colour, the font identified by evidence, the layout rules that hold it together. That becomes a locked structure with a small set of swappable inputs." },
      { label: "Then produce in minutes",
        text: "Campaign line, product asset, offer and mechanic. Type the change, the machine re-renders the placement, and automated gates check position, colour, containment and clear space before anything is shown. The green receipts through this page are those gates, not decoration." },
      { label: "Across the whole journey",
        text: "One approved idea goes out to every placement in the map above: screens, onsite, email, print gates. The structure work is done once per placement; after that, each new campaign is an input swap." },
    ] },
];
