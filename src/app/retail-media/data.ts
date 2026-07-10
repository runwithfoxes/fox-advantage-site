/* /retail-media - the retail media machine, shown as a worked example on the
   Heineken brand across Tesco's placements. The audience is any retail media
   team; no client is named. Assets live in public/clients/retail-media/media/.
   NOTE: this file ships to the browser. Never put the password here. */

import type { Meta, Deliverable, WorkSection } from "../clients/_components/ClientWorkspace";

export const meta: Meta = {
  client: "Retail Media",
  slug: "retail-media",
  headline: "One campaign, every Tesco placement",
  intro:
    "A worked example on the Heineken brand. We fingerprint a brand's retail ads once, then remake them with different products, offers and messages in minutes. Below: the full Tesco shopper journey, then each placement up close, rebuilt and remade.",
  lastUpdated: "2026-07-10",
  hideProgress: true,
  zoneIntros: {
    deliverables: "The twelve touchpoints of the Tesco shopper journey, and where each one stands.",
    work: "The journey first, then each placement up close: the original, our rebuild, and the remake.",
  },
};

/* The 12 journey nodes as the scoreboard. Honest statuses only. */
export const deliverables: Deliverable[] = [
  { name: "1 · eCRM email", detail: "Tesco eCRM module, rebuilt from the real layout", status: "todo" },
  { name: "2 · Tesco.ie web/app", detail: "Onsite hero and MPU set", status: "todo" },
  { name: "3 · Tesco socials", detail: "Geo-map social, 1080x1080", status: "todo" },
  { name: "4 · Convenience / store wrap", detail: "Large-format print wrap", status: "todo" },
  { name: "5 · JCD screens", detail: "1080x1920 portrait chassis, static and motion", status: "in-progress", anchor: "cw-s-the-fingerprint-original-vs-rebuild", note: "Fingerprint method proven (demo below). Placement-native brand creative in build." },
  { name: "6 · Totem screens", detail: "Same portrait chassis, directional to the drinks aisle", status: "in-progress", note: "Same portrait chassis; directional creative in build." },
  { name: "7 · Hanging boards", detail: "Landscape, arrow directional", status: "todo" },
  { name: "8 · Power aisle screen", detail: "Wide digital strip", status: "in-progress", note: "Same portrait-chassis family; sized after the screens land." },
  { name: "9 · Goal post screens", detail: "Cross-collaboration bundle: brand x Tesco partner pack", status: "ready", anchor: "cw-s-the-bundle-remade-in-one-line", note: "Pair built and gated. Hi-res pack shot swap pending." },
  { name: "10 · BWS gate, outside", detail: "Print gate panel, 0.0 message only outside the zone", status: "todo" },
  { name: "11 · BWS gate, inside", detail: "Print gate panel, full alcohol message inside", status: "todo" },
  { name: "12 · BWS special build", detail: "In-bay screens, sound on", status: "todo" },
];

export const work: WorkSection[] = [
  { title: "The Tesco shopper journey", kind: "embed", badge: "The map",
    desc: "Twelve touchpoints in the order a shopper meets them: at home, online, on the way, into the store, down the aisle, into the drinks zone. Green rings carry finished creative; the rest are in build.",
    wideDesc: true,
    embedSrc: "journey.html",
    embedHeight: 820 },

  { title: "The fingerprint: original vs rebuild", kind: "compare", badge: "The method",
    desc: "Drag the slider. Left is a finished Heineken Champions League static from the brand's own kit; right is the same ad rebuilt by our machine, measured to within 3 pixels. This piece is a sponsorship promo, not a retail ad - we use it here purely to show the fingerprint step. The retail creative lives in the journey above, each ad in its placement's own grammar.",
    wideDesc: true,
    compare: {
      before: "heineken-ucl-original.png",
      after: "heineken-ucl-rebuilt.png",
      ratio: "786/1102",
      w: 440,
      labelBefore: "Heineken's original",
      labelAfter: "Rebuilt by the machine",
      download: false,
    } },

  { title: "One typed line", kind: "html", badge: "The method",
    html: `<div class="rmiA"><style>
      .rmiA .tbox{font-family:'SF Mono',Menlo,monospace;font-size:13px;background:#14140F;color:#D9F5C9;padding:12px 16px;max-width:720px;}
      .rmiA .t{display:inline-block;overflow:hidden;white-space:nowrap;vertical-align:bottom;width:0;border-right:8px solid #D9F5C9;animation:rmiA-type 2.6s steps(66,end) .5s forwards, rmiA-blink 1s step-end infinite;}
      @keyframes rmiA-type{to{width:66ch;}}
      @keyframes rmiA-blink{50%{border-color:transparent;}}
    </style><div class="tbox"><span class="t">&gt; swap the line to "Get the team together"; sub to "Don't forget the 0.0"</span></div></div>` },

  { title: "Remade from the fingerprint", kind: "media", badge: "The method",
    desc: "The same locked structure carrying the typed change. This shows the swap capability on the fingerprinted structure; the version that also swaps the product and the scene is in final production. The retail placements in the journey get their own placement-native creative, not this piece.",
    wideDesc: true,
    layout: "single",
    item: { src: "remake-get-the-team-together.png", w: 380, ratio: "786 / 1102", cap: "Same structure, new line: Get the team together / Don't forget the 0.0." } },

  { title: "One typed line, again", kind: "html", badge: "Placement 9 · Goal post screens",
    html: `<div class="rmiB"><style>
      .rmiB .tbox{font-family:'SF Mono',Menlo,monospace;font-size:13px;background:#14140F;color:#D9F5C9;padding:12px 16px;max-width:720px;}
      .rmiB .t{display:inline-block;overflow:hidden;white-space:nowrap;vertical-align:bottom;width:0;border-right:8px solid #D9F5C9;animation:rmiB-type 2.2s steps(52,end) .5s forwards, rmiB-blink 1s step-end infinite;}
      @keyframes rmiB-type{to{width:52ch;}}
      @keyframes rmiB-blink{50%{border-color:transparent;}}
    </style><div class="tbox"><span class="t">&gt; swap product to 0.0 cans; panel to 0.0 blue; same deal</span></div></div>` },

  { title: "The bundle, remade in one line", kind: "media", badge: "Placement 9 · Goal post screens",
    desc: "A Tesco bundle ad built in the real placement's grammar: the panel geometry is measured off a live Tesco ad, the products are official pack shots, the Drinkaware strip is the real mark. Left to right: one typed instruction swaps the product to 0.0 cans and keys the panel to the 0.0 colourway. Nothing else changed, nothing else needed to.",
    wideDesc: true,
    layout: "grouped",
    groups: [
      { label: "Heineken Original x Tesco Finest", items: [ { src: "bundle-original-x-finest.png", w: 470, ratio: "1144 / 860" } ] },
      { label: "The remake: 0.0, one typed line later", items: [ { src: "bundle-00-swap.png", w: 470, ratio: "1144 / 860" } ] },
    ] },

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
