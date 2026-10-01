/**
 * THE EDGES OF A REPORT PDF: the cover, the contents page, the chapter openers, the last page.
 * 1 Oct 2026.
 *
 * Paul, reading The AI Ask as a PDF: "It feels like we haven't done a good job really making it
 * feel like a proper report, just on the edges... a proper robust report that if someone picks up
 * they know it's from us." Until today the PDF was the web page printed onto paper: no front, no
 * back, and nothing of ours on the inside pages. He agreed six things: a real cover, a back page,
 * a contents page, every chapter on a new page with its number set large, the wordmark at the top
 * of every inside page, and the fox once or twice. And on the cover: "the image we have currently
 * could be an image that looks well on the front page if it's done in an editorial type way, which
 * means you don't need it on the second page."
 *
 * build-pdfs.mjs still prints the page itself for the body ("the PDF is the page"). This file adds
 * what a web page does not have. Three PDFs are made and joined: cover, body, last page. The cover
 * and the last page have no margins and no page number; the body is numbered from 1 at its
 * contents page, and the contents page quotes those numbers.
 *
 * ⛔ CLASS NAMES HERE START pdfx- AND EVERYTHING ELSE IS INLINE STYLE, ON PURPOSE. The print rules
 * in build-pdfs.mjs match on pieces of class names ([class*="dl"], [class*="back"], [class*="top"],
 * [class*="mast"], [class*="about"], [class*="sign"], [class*="note"]...), so an innocent class
 * like "headline" (it contains "dl") or "masthead" is hidden or re-laid-out by them.
 *
 * Type follows clients/rwf/memory/rwf-type-system.md: Space Grotesk 500 for headlines, Source
 * Serif 4 for anything read (17px, standfirst 20px), JetBrains Mono for labels, numerals and the
 * wordmark. The wordmark is navy on the page's cream, as the site's nav has been since 30 Sep.
 */

const SANS = "var(--font-sans), 'Space Grotesk', sans-serif";
const SERIF = "var(--font-serif), 'Source Serif 4', Georgia, serif";
const MONO = "var(--font-mono), 'JetBrains Mono', monospace";
const NAVY = "#1A3A4E";
const SKY = "#3A7CA5";
const INK = "#1D1B1B";
const CREAM = "#FAFAF8";
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const label = `font-family:${MONO};font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;`;
const wordmark = (size = 13) => `<span style="font-family:${MONO};font-size:${size}px;font-weight:400;letter-spacing:2px;color:${NAVY};">/Runwithfoxes</span>`;

/** Read everything the furniture needs off the report page, before anything is hidden or moved. */
export async function collect(page, r, se) {
  const fromPage = await page.evaluate(() => {
    const txt = (el) => (el ? el.textContent.replace(/\s+/g, " ").trim() : "");
    const hero = document.querySelector('section[class*="hero"]');
    const h1 = hero && hero.querySelector("h1");
    const hl = h1 && h1.querySelector("span");
    const film = hero && hero.querySelector("video[poster]");
    let words = null;
    try { words = JSON.parse(document.getElementById("pdf-words").textContent); } catch { /* a report with no PDF words of its own */ }
    const sections = [];
    const push = (id, k, t, find) => document.getElementById(id) && sections.push({ id, k, t, find });
    push("intro", "", "Introduction", "INTRODUCTION");
    push("insights", "", "Three things that stood out", "Three things stood out");
    push("counted", "", "What we counted", "What we counted");
    push("findings", "", "The evidence, in six findings", "The evidence, in six findings");
    document.querySelectorAll('section[id^="ch"]').forEach((sec) => {
      const n = (txt(sec.querySelector('[class*="chN"]')).match(/\d+/) || [""])[0];
      if (n) sections.push({ id: sec.id, k: n.padStart(2, "0"), t: txt(sec.querySelector("h2")), find: `CHAPTER\\s*${n.padStart(2, "0")}(?!\\d)` });
    });
    ["discussion", "method"].forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) sections.push({ id, k: "", t: txt(sec.querySelector("h2")), find: txt(sec.querySelector('[class*="chN"]')).toUpperCase() });
    });
    return {
      titleLead: h1 ? txt(h1).replace(hl ? txt(hl) : "", "").trim() : "",
      titleHl: txt(hl),
      photo: hero ? hero.dataset.pdfPhoto || (film && film.getAttribute("poster")) || "" : "",
      photoAt: (hero && hero.dataset.pdfPhotoAt) || "center 70%",
      words,
      sections,
    };
  });
  const w = fromPage.words || {};
  return {
    ...fromPage,
    titleLead: fromPage.titleLead || r.title,
    series: w.series || se.name,
    strap: w.strap || "Report",
    issue: w.issue || r.edition,
    date: r.dateLong || "",
    stand: w.stand || "",
    credit: w.credit || [],
    end: w.end || [],
    site: w.site || "runwithfoxes.com",
    fox: w.fox || "",
  };
}

/** The cover: one page, no margins. The series name is the masthead, so every issue is known at a glance. */
export function coverHTML(d, base) {
  return `<div style="width:210mm;height:297mm;box-sizing:border-box;background:${CREAM};padding:14mm 15mm 12mm;display:flex;flex-direction:column;overflow:hidden;color:${INK};">
    <div style="display:flex;justify-content:space-between;align-items:baseline;">
      ${wordmark(13)}
      <span style="${label}color:#6b6b66;">${esc(d.strap)}</span>
    </div>
    <div style="font-family:${SANS};font-weight:500;font-size:104px;line-height:.92;letter-spacing:-0.04em;color:${NAVY};margin:15mm 0 7mm -4px;">${esc(d.series)}</div>
    <div style="height:2px;background:${NAVY};"></div>
    <div style="display:flex;justify-content:space-between;${label}color:${NAVY};padding:9px 0 0;">
      <span>${esc(d.issue)}</span><span>${esc(d.date)}</span>
    </div>
    ${d.photo ? `<img src="${base}${d.photo}" alt="" style="display:block;width:100%;height:98mm;object-fit:cover;object-position:${d.photoAt};margin:8mm 0 0;" />` : `<div style="height:98mm;margin:8mm 0 0;background:${NAVY};"></div>`}
    <div style="font-family:${SANS};font-weight:500;font-size:42px;line-height:1.08;letter-spacing:-0.025em;margin:10mm 0 0;">${esc(d.titleLead)}<br/><span style="color:${SKY};">${esc(d.titleHl)}</span></div>
    ${d.stand ? `<p style="font-family:${SERIF};font-size:18px;line-height:1.5;margin:6mm 0 0;max-width:140mm;color:${INK};">${esc(d.stand)}</p>` : ""}
    <div style="margin-top:auto;border-top:1px solid #C9C9C3;padding-top:10px;display:flex;justify-content:space-between;align-items:flex-end;font-family:${MONO};font-size:10.5px;line-height:1.6;color:#55554F;">
      <span>${d.credit.map(esc).join("<br/>")}</span>
      <span style="color:${NAVY};letter-spacing:.04em;">${esc(d.site)}</span>
    </div>
  </div>`;
}

/** The last page: who made the report, when the next one is due, how to quote it, and where we are. */
export function endHTML(d, base) {
  return `<div style="width:210mm;height:297mm;box-sizing:border-box;background:${CREAM};padding:14mm 15mm 12mm;display:flex;flex-direction:column;overflow:hidden;color:${INK};position:relative;">
    <div style="display:flex;justify-content:space-between;align-items:baseline;">
      ${wordmark(13)}
      <span style="${label}color:#6b6b66;">${esc(d.series)} · ${esc(d.issue)}</span>
    </div>
    <div style="height:2px;background:${NAVY};margin:8mm 0 12mm;"></div>
    <div style="max-width:128mm;">
      ${d.end.map((e) => `<div style="margin:0 0 9mm;">
        <div style="${label}color:${SKY};margin:0 0 7px;">${esc(e.k)}</div>
        <p style="font-family:${SERIF};font-size:17px;line-height:1.6;margin:0;">${esc(e.t)}</p>
      </div>`).join("")}
    </div>
    ${d.fox ? `<img src="${base}${d.fox}" alt="" style="position:absolute;right:11mm;bottom:27mm;width:62mm;height:auto;" />` : ""}
    <div style="margin-top:auto;border-top:1px solid #C9C9C3;padding-top:12px;">
      <div style="font-family:${SANS};font-weight:500;font-size:30px;letter-spacing:-0.02em;color:${NAVY};">${esc(d.site)}</div>
    </div>
  </div>`;
}

/** The running head and foot of every inside page. Chromium draws these outside the page, so they
    carry their own type sizes and cannot use the site's fonts. */
export function headerFor(d) {
  return `<div style="width:100%;margin:0 14mm;padding:5mm 0 2.2mm;border-bottom:0.5px solid #C9C9C3;font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;font-size:7.5px;display:flex;justify-content:space-between;align-items:baseline;-webkit-print-color-adjust:exact;">
    <span style="color:${NAVY};letter-spacing:1.4px;font-size:8.5px;">/Runwithfoxes</span>
    <span style="color:#8A8A85;letter-spacing:.6px;">${esc(d.series)} · ${esc(d.issue)}</span>
  </div>`;
}
export function footerFor(d, stamp, stampColour) {
  return `<div style="width:100%;margin:0 14mm;font-family:'JetBrains Mono',ui-monospace,Menlo,monospace;font-size:7.5px;color:#8A8A85;display:flex;justify-content:space-between;-webkit-print-color-adjust:exact;">
    <span style="color:${NAVY};letter-spacing:.4px;">${esc(d.site)}</span>
    <span style="color:${stampColour};">${esc(stamp)}</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;
}

/** Print rules for the pieces this file adds to the body, appended to build-pdfs.mjs's own. */
export const FURNITURE_CSS = `
  /* the picture and the title are on the cover now, so the body opens on the contents page */
  section[class*="hero"] { display: none !important; }
  [class*="body"], [class*="main"], [class*="page"] { padding-top: 0 !important; margin-top: 0 !important; }
  /* every chapter, the discussion and the method open a page */
  section[class*="chapter"] { break-before: page !important; page-break-before: always !important; padding-top: 3mm !important; }
  .pdfx-contents { break-after: page; page-break-after: always; }
  /* nothing trails the last chapter: its bottom space plus the page's own printed an empty last page */
  section[class*="chapter"] { margin-bottom: 0 !important; padding-bottom: 0 !important; }
  [class*="body"], [class*="page"], [class*="main"] { padding-bottom: 0 !important; margin-bottom: 0 !important; }
  /* The number sits beside the title, not above it. Above it (first try, 1 Oct) cost 70px on every
     opener, and chapter 6 then ran two lines onto a page of their own. */
  section[id^="ch"] > div:first-child { display: grid; grid-template-columns: auto minmax(0, 1fr); column-gap: 20px; align-items: start; }
  section[id^="ch"] [class*="chN"] { display: contents; }
  .pdfx-chword { grid-column: 1 / -1; display: block; margin-bottom: 10px; font-family: ${MONO}; font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: ${SKY}; }
  .pdfx-chnum { grid-column: 1; font-family: ${MONO}; font-weight: 300; font-size: 56px; line-height: .9; letter-spacing: -0.04em; color: ${SKY}; text-transform: none; }
  section[class*="chapter"] h2 { font-size: 32px !important; max-width: 140mm; }
  section[class*="chapter"] > div:first-child { margin-bottom: 22px !important; padding-bottom: 16px; border-bottom: 2px solid ${NAVY}; }
`;

/** Put the contents page and the opening title into the body, and set each chapter's number large.
    Page numbers go in afterwards (fillContents), once a first print has shown where things fall. */
export async function dressBody(page, d, base) {
  await page.evaluate(({ d, base, SANS, SERIF, MONO, NAVY, SKY, INK }) => {
    const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const main = document.querySelector('main[class*="main"]') || document.querySelector("main");
    if (!main) return;
    const label = `font-family:${MONO};font-size:10.5px;letter-spacing:.14em;text-transform:uppercase;`;
    const rows = d.sections.map((s) => `
      <a href="#${s.id}" style="display:flex;align-items:baseline;gap:12px;padding:11px 0;border-bottom:1px solid #E4E4DF;">
        <span style="font-family:${MONO};font-size:12px;color:${SKY};width:26px;flex:none;">${esc(s.k)}</span>
        <span style="font-family:${SANS};font-weight:500;font-size:16.5px;letter-spacing:-0.01em;color:${INK};flex:1;">${esc(s.t)}</span>
        <span class="pdfx-pg" data-for="${s.id}" style="font-family:${MONO};font-size:12px;color:${NAVY};flex:none;"></span>
      </a>`).join("");
    // a div, not a section: the site gives every <section> 80px of padding top and bottom
    const contents = document.createElement("div");
    contents.className = "pdfx-contents";
    contents.innerHTML = `
      <div style="${label}color:${SKY};margin:6mm 0 10px;">${esc(d.series)} · ${esc(d.issue)}</div>
      <div style="font-family:${SANS};font-weight:500;font-size:40px;letter-spacing:-0.025em;line-height:1.05;color:${NAVY};margin:0 0 9mm;">Contents</div>
      <div style="border-top:2px solid ${NAVY};">${rows}</div>`;
    /* No fox here. He was tried under the list (1 Oct) and pushed the page onto a second sheet,
       which put every page number one out. He is on the cover and on the last page. */
    main.insertBefore(contents, main.firstChild);

    // the first page of text opens with the report's own headline, now that the picture carrying it is on the cover
    const intro = document.getElementById("intro");
    const who = intro && intro.querySelector('[class*="who"]');
    if (who) {
      const open = document.createElement("div");
      open.innerHTML = `
        <div style="${label}color:${SKY};margin:6mm 0 10px;">Introduction</div>
        <div style="font-family:${SANS};font-weight:500;font-size:34px;letter-spacing:-0.025em;line-height:1.08;color:${INK};margin:0 0 7mm;max-width:150mm;">${esc(d.titleLead)} <span style="color:${SKY};">${esc(d.titleHl)}</span></div>`;
      who.parentElement.insertBefore(open, who);
    }

    // "Chapter 1" becomes the word small and the number large
    document.querySelectorAll('section[id^="ch"] [class*="chN"]').forEach((el) => {
      const n = (el.textContent.match(/\d+/) || [""])[0];
      if (!n) return;
      el.innerHTML = `<span class="pdfx-chword">Chapter</span><span class="pdfx-chnum">${n.padStart(2, "0")}</span>`;
    });
  }, { d, base, SANS, SERIF, MONO, NAVY, SKY, INK });
}

/** Which body page each section starts on, read off a printed body. Throws rather than guess:
    a contents page with a wrong number is worse than no contents page. */
export function findStarts(pagesText, sections) {
  const norm = pagesText.map((t) => t.replace(/\s+/g, " "));
  const starts = {};
  let from = 1; // page index 0 is the contents page itself
  for (const s of sections) {
    const re = new RegExp(s.find);
    let hit = -1;
    for (let i = from; i < norm.length; i++) if (re.test(norm[i])) { hit = i; break; }
    if (hit < 0) throw new Error(`contents: could not find where "${s.t}" starts (looked for /${s.find}/ from page ${from + 1})`);
    starts[s.id] = hit + 1;
    from = hit;
  }
  // the contents must fit one page, or every number after it is one out and the page looks broken
  if (sections[0] && starts[sections[0].id] !== 2) throw new Error(`contents: it ran past one page ("${sections[0].t}" starts on page ${starts[sections[0].id]}, not 2)`);
  return starts;
}

export async function fillContents(page, starts) {
  await page.evaluate((starts) => {
    document.querySelectorAll(".pdfx-pg").forEach((el) => { el.textContent = String(starts[el.dataset.for] ?? ""); });
  }, starts);
}
