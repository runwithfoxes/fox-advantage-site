/**
 * BUILD THE REPORT PDFs. 26 Sep 2026.
 *
 *   node scripts/resources/build-pdfs.mjs                 every published or draft edition
 *   node scripts/resources/build-pdfs.mjs --only <slug>   one
 *   BASE=http://localhost:3094 node scripts/resources/build-pdfs.mjs
 *
 * The PDF IS THE PAGE (BUILD-NOTES, the PDF rule): Playwright opens the real edition page on a
 * running dev server, hides the parts that belong to a screen (nav, rail, forms, the download
 * button, the film), and prints it to A4. Nothing is laid out twice.
 *
 * Every page of every PDF carries a footer with the report name, a page number, and the mockup's
 * own words: "Example, made-up numbers" for an example edition, "Draft, not approved" for The AI
 * Ask and GEO Ireland until Paul approves them.
 *
 * When it is done it writes scripts/resources/pdf-pages.json, the real page count per slug. The
 * catalogue generator reads that file, so `node scripts/resources/build-catalogue.mjs` afterwards
 * makes the catalogue's `pages` match the files. Nothing in catalogue.json is edited by hand.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
/* playwright is not in this repo's node_modules on the mini; fall back to the copy the other
   build scripts use (metrics-pyramid), or set PLAYWRIGHT=/path/to/playwright/index.mjs */
const pw = await import("playwright").catch(() => import(process.env.PLAYWRIGHT || `${process.env.HOME}/projects/metrics-pyramid/node_modules/playwright/index.mjs`));
const { chromium } = pw;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..", "..");
const CAT = JSON.parse(fs.readFileSync(path.join(ROOT, "src/app/resources/catalogue/catalogue.json"), "utf8"));
const OUT_DIR = path.join(ROOT, "public/resources/pdf");
const PAGES_FILE = path.join(__dirname, "pdf-pages.json");
const BASE = process.env.BASE || "http://localhost:3094";
const only = process.argv.includes("--only") ? process.argv[process.argv.indexOf("--only") + 1] : null;

const exe = fs
  .readdirSync(path.join(process.env.HOME, "Library/Caches/ms-playwright"))
  .filter((d) => d.startsWith("chromium-"))
  .map((d) => path.join(process.env.HOME, "Library/Caches/ms-playwright", d, "chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"))
  .find((p) => fs.existsSync(p));

/* What a screen has and a PDF does not. Attribute selectors, because the pages use CSS modules. */
const PRINT_CSS = `
  header[class*="nav"], [class*="NextNav"], [class*="top"] header, [class*="topInner"] header,
  [class*="railCol"], [class*="gate"], [class*="dl"], [class*="join"], form, video, footer,
  [class*="backs"], [class*="back"], [class*="note"], [class*="draft"], [class*="crumb"],
  [class*="banner"], .chat-bubble-wrap, [class*="ChatWidget"], [id*="chat"], nextjs-portal, [class*="hero"] [class*="film"], [class*="filmStill"] { display: none !important; }
  [class*="hero"] { min-height: 0 !important; background: #1A3A4E !important; }
  [class*="hero"] * { text-shadow: none !important; }
  html, body { background: #fff !important; }
  [class*="page"] { background: #fff !important; }
  [class*="wrap"], [class*="mast"], [class*="body"], [class*="findings"], [class*="bandInner"], [class*="topInner"] { max-width: none !important; padding-left: 0 !important; padding-right: 0 !important; }
  [class*="body"], [class*="mast"], [class*="feature"], [class*="about"] { grid-template-columns: 1fr !important; }
  [class*="main"] { max-width: none !important; }
  /* a finding is its heading and its figure: they stay on one page together, or move together */
  section[class*="chapter"]:not(#method):not(#more), figure, [class*="fGrid"], [class*="glance"], [class*="edRow"], details, [class*="sign"] { break-inside: avoid; page-break-inside: avoid; }
  h2, h3 { break-after: avoid; page-break-after: avoid; }
  [class*="chapter"] { border-bottom: 0 !important; }
  .mod-win { box-shadow: none !important; }
  details:not([open]) > *:not(summary) { display: block !important; }
  details summary em { display: none !important; }
  a { color: inherit !important; text-decoration: none !important; }
`;

function footerFor(r, se) {
  const stamp = r.example ? "Example, made-up numbers" : "Draft, not approved";
  return `<div style="width:100%;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:8px;color:#8A8A85;padding:0 14mm;display:flex;justify-content:space-between;">
    <span>${se.name} · ${r.edition} · Run with Foxes</span>
    <span style="color:${r.example ? "#F47521" : "#3A7CA5"}">${stamp}</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>`;
}

/* the root of the page tree carries the total; a subtree carries its own, so take the largest */
function pageCount(buf) {
  const s = buf.toString("latin1");
  const counts = [...s.matchAll(/\/Type\s*\/Pages[^>]*?\/Count\s+(\d+)/g)].map((m) => +m[1]);
  if (counts.length) return Math.max(...counts);
  return (s.match(/\/Type\s*\/Page[^s]/g) || []).length;
}

const jobs = CAT.reports.filter((r) => r.status !== "coming" && (!only || r.slug === only));
fs.mkdirSync(OUT_DIR, { recursive: true });
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });
const pages = fs.existsSync(PAGES_FILE) ? JSON.parse(fs.readFileSync(PAGES_FILE, "utf8")) : {};
let total = 0;
const mismatches = [];

for (const r of jobs) {
  const se = CAT.series.find((x) => x.slug === r.series);
  const url = BASE + (r.href ?? `/resources/reports/${r.series}/${r.slug}`);
  const file = path.join(OUT_DIR, path.basename(r.pdf));
  await page.goto(url, { waitUntil: "networkidle", timeout: 180000 });
  await page.emulateMedia({ media: "print" });
  await page.addStyleTag({ content: PRINT_CSS });
  // open every <details> so the method reads in full, and let the sweep-in highlights finish
  await page.evaluate(() => document.querySelectorAll("details").forEach((d) => (d.open = true)));
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((res) => setTimeout(res, 800));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  const buf = await page.pdf({
    path: file,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: false,
    margin: { top: "16mm", bottom: "18mm", left: "14mm", right: "14mm" },
    displayHeaderFooter: true,
    headerTemplate: "<span></span>",
    footerTemplate: footerFor(r, se),
  });
  const n = pageCount(buf);
  const kb = Math.round(buf.length / 1024);
  total += buf.length;
  pages[r.slug] = n;
  if (n !== r.pages) mismatches.push(`${r.slug}: catalogue says ${r.pages}, file has ${n}`);
  console.log(`${r.slug}  ${n} pp  ${kb} KB${kb > 5000 ? "  ⛔ over 5MB" : ""}`);
}
await browser.close();
fs.writeFileSync(PAGES_FILE, JSON.stringify(pages, null, 1) + "\n");
console.log(`\n${jobs.length} PDFs, ${(total / 1024 / 1024).toFixed(1)} MB in all, written to public/resources/pdf/`);
if (mismatches.length) {
  console.log(`\n${mismatches.length} page counts differ from the catalogue. Run node scripts/resources/build-catalogue.mjs to take the real counts from pdf-pages.json:`);
  mismatches.forEach((m) => console.log("  " + m));
}
