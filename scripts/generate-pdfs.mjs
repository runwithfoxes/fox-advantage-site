/**
 * Generate A5 PDFs for The Fox Advantage — Part 1 and Part 2
 *
 * Usage: node scripts/generate-pdfs.mjs
 *
 * Requires: playwright (already in devDependencies)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chromium } from "playwright";
import { remark } from "remark";
import html from "remark-html";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const CHAPTERS_DIR = path.join(ROOT, "src/content/chapters");
const OUTPUT_DIR = path.join(ROOT, "public/downloads");
const FOX_BOOK_IMG = path.join(ROOT, "public/fox/fox-book.png");

// Part definitions
const parts = [
  {
    part: 1,
    partName: "What Just Collapsed",
    filename: "the-fox-advantage-part-1.pdf",
    chapters: [
      { file: "ch02-the-marketing-department-autopsy-report.md", number: 1, title: "The marketing department autopsy report" },
      { file: "ch03-the-robots-arent-coming-theyve-already-moved-in.md", number: 2, title: "The robots aren't coming. They've already moved in" },
      { file: "ch05-the-algorithm-will-see-you-now.md", number: 3, title: "The algorithm will see you now" },
      { file: "ch06-everything-everywhere-all-at-once.md", number: 4, title: "Everything. Everywhere. All at once" },
      { file: "ch07-average-is-the-new-invisible.md", number: 5, title: "Average is the new invisible" },
    ],
  },
  {
    part: 2,
    partName: "Better Together",
    filename: "the-fox-advantage-part-2.pdf",
    chapters: [
      { file: "ch09-drivers-wanted.md", number: 6, title: "Drivers Wanted" },
      { file: "ch10-robots-dont-have-skin-in-the-game.md", number: 7, title: "Robots don't have skin in the game" },
      { file: "ch11-kill-bugs-fast.md", number: 8, title: "Kill bugs fast" },
      { file: "ch12-critical-thinking-has-never-been-more-critical.md", number: 9, title: "Critical thinking has never been more critical" },
      { file: "ch13-ai-has-turned-us-all-into-little-hemingways.md", number: 10, title: "AI has turned us all into little Hemingways" },
      { file: "ch14-the-friction-is-the-point.md", number: 11, title: "The friction is the point" },
      { file: "ch15-a-very-tidy-wrong-answer.md", number: 12, title: "A very tidy wrong answer" },
    ],
  },
];

async function markdownToHtml(filepath) {
  const raw = fs.readFileSync(filepath, "utf8");
  const { content } = matter(raw);
  // Strip the first "# Chapter N: ..." heading and "Part N" line
  const cleaned = content
    .replace(/^#\s+Chapter\s+\d+:.*\n*/i, "")
    .replace(/^_Part\s+\d+_\s*\n*/i, "");
  const result = await remark().use(html, { sanitize: false }).process(cleaned);
  return result.toString();
}

function fileToDataUri(filepath) {
  const buf = fs.readFileSync(filepath);
  const ext = path.extname(filepath).toLowerCase().replace(".", "");
  const mime = ext === "jpg" ? "jpeg" : ext;
  return `data:image/${mime};base64,${buf.toString("base64")}`;
}

function buildCombinedHtml(allParts, allChapterContents, foxBookDataUri) {
  // Build TOC for all parts combined
  const tocItems = allParts
    .map((p) => {
      const partHeader = `<li class="toc-part-header">\\part_${String(p.part).padStart(2, "0")} — ${p.partName.toLowerCase()}</li>`;
      const chapters = p.chapters
        .map((ch) => `<li><span class="toc-num">${String(ch.number).padStart(2, "0")}</span> ${ch.title}</li>`)
        .join("\n");
      return partHeader + "\n" + chapters;
    })
    .join("\n");

  // Build chapter pages for each part, with a divider before Part 2+
  let contentIndex = 0;
  const partSections = allParts.map((p, partIdx) => {
    const divider = partIdx > 0
      ? `<div class="part-divider">
          <div class="part-divider-num">\\part_${String(p.part).padStart(2, "0")}</div>
          <div class="part-divider-name">${p.partName}</div>
        </div>`
      : "";

    const chapterPages = p.chapters
      .map((ch) => {
        const num = String(ch.number).padStart(2, "0");
        const content = allChapterContents[contentIndex++];
        return `
        <div class="chapter-page">
          <div class="chapter-header">
            <div class="chapter-num">${num}</div>
            <h2 class="chapter-title">${ch.title}</h2>
          </div>
          <div class="chapter-body">
            ${content}
          </div>
        </div>`;
      })
      .join("\n");

    return divider + chapterPages;
  }).join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>The Fox Advantage — Parts 1 &amp; 2</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

  @page {
    size: A5 portrait;
    margin: 18mm 16mm 22mm 16mm;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 300;
    line-height: 1.8;
    color: #1D1B1B;
    background: #fff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* ── Cover page ── */
  .cover {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  .cover img {
    width: 55mm;
    height: auto;
    margin-bottom: 8mm;
  }
  .cover h1 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 22px;
    font-weight: 300;
    color: #355E4C;
    letter-spacing: -0.5px;
    margin-bottom: 3mm;
  }
  .cover h1 span {
    color: #F47521;
  }
  .cover .cover-subtitle {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    font-weight: 300;
    color: #8A8A85;
    line-height: 1.6;
    margin-bottom: 3mm;
  }
  .cover .cover-author {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: #1D1B1B;
  }

  /* ── TOC ── */
  .toc {
    page-break-after: always;
  }
  .toc h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: #355E4C;
    margin-bottom: 6mm;
    letter-spacing: -0.3px;
  }
  .toc ul {
    list-style: none;
    padding: 0;
  }
  .toc li {
    font-size: 10px;
    line-height: 2.4;
    color: #1D1B1B;
    border-bottom: 1px solid #E0E0DC;
    padding: 1mm 0;
  }
  .toc li.toc-part-header {
    font-family: 'JetBrains Mono', monospace;
    font-size: 8px;
    color: #F47521;
    border-bottom: none;
    padding-top: 4mm;
    letter-spacing: 0.5px;
    line-height: 2;
  }
  .toc-num {
    display: inline-block;
    width: 8mm;
    color: #F47521;
    font-weight: 400;
  }

  /* ── Part divider ── */
  .part-divider {
    page-break-before: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }
  .part-divider-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    font-weight: 400;
    color: #F47521;
    letter-spacing: 1px;
    margin-bottom: 4mm;
  }
  .part-divider-name {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px;
    font-weight: 300;
    color: #355E4C;
    letter-spacing: -0.5px;
  }

  /* ── Chapter pages ── */
  .chapter-page {
    page-break-before: always;
  }
  .chapter-header {
    margin-bottom: 10mm;
    padding-bottom: 0;
  }
  .chapter-num {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 36px;
    font-weight: 300;
    color: #F47521;
    opacity: 0.25;
    line-height: 1;
    margin-bottom: 2mm;
  }
  .chapter-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: #355E4C;
    line-height: 1.3;
    letter-spacing: -0.3px;
  }

  /* ── Chapter body typography ── */
  .chapter-body p {
    margin-bottom: 3mm;
    text-align: left;
    orphans: 3;
    widows: 3;
  }
  .chapter-body h2 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #355E4C;
    margin-top: 6mm;
    margin-bottom: 3mm;
    letter-spacing: -0.2px;
  }
  .chapter-body h3 {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 11px;
    font-weight: 400;
    color: #355E4C;
    margin-top: 5mm;
    margin-bottom: 2mm;
  }
  .chapter-body blockquote {
    border-left: 2px solid #F47521;
    padding-left: 4mm;
    margin: 4mm 0;
    font-style: italic;
    color: #555;
  }
  .chapter-body ul, .chapter-body ol {
    padding-left: 6mm;
    margin-bottom: 3mm;
  }
  .chapter-body li {
    margin-bottom: 1.5mm;
  }
  .chapter-body strong {
    font-weight: 500;
  }
  .chapter-body em {
    font-style: italic;
  }
  .chapter-body a {
    color: #F47521;
    text-decoration: none;
  }
  .chapter-body hr {
    border: none;
    border-top: 1px solid #E0E0DC;
    margin: 5mm 0;
  }

  /* ── Back page ── */
  .back-page {
    page-break-before: always;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
  }
  .back-page .back-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 16px;
    font-weight: 300;
    color: #355E4C;
    margin-bottom: 4mm;
    letter-spacing: -0.3px;
  }
  .back-page .back-url {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #F47521;
  }
</style>
</head>
<body>

  <!-- Cover -->
  <div class="cover">
    <img src="${foxBookDataUri}" alt="Fox holding The Fox Advantage" />
    <h1>The <span>Fox</span> Advantage</h1>
    <div class="cover-author">Paul Dervan</div>
  </div>

  <!-- TOC -->
  <div class="toc">
    <h2>Contents</h2>
    <ul>
      ${tocItems}
    </ul>
  </div>

  <!-- All chapters with part dividers -->
  ${partSections}

  <!-- Back page -->
  <div class="back-page">
    <div class="back-url">runwithfoxes.com</div>
  </div>

</body>
</html>`;
}

async function generateCombinedPdf() {
  console.log("Generating combined PDF (Parts 1 & 2)...\n");

  // Read all chapters across all parts
  const allChapterContents = [];
  for (const partDef of parts) {
    console.log(`Part ${partDef.part}: ${partDef.partName}`);
    for (const ch of partDef.chapters) {
      const filepath = path.join(CHAPTERS_DIR, ch.file);
      if (!fs.existsSync(filepath)) {
        console.error(`  Missing: ${ch.file}`);
        allChapterContents.push("<p><em>Chapter not found.</em></p>");
        continue;
      }
      const h = await markdownToHtml(filepath);
      allChapterContents.push(h);
      console.log(`  Read: ${ch.file}`);
    }
  }

  const foxBookDataUri = fileToDataUri(FOX_BOOK_IMG);
  const fullHtml = buildCombinedHtml(parts, allChapterContents, foxBookDataUri);

  // Launch browser and print
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(fullHtml, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  const outputPath = path.join(OUTPUT_DIR, "the-fox-advantage-parts-1-and-2.pdf");
  await page.pdf({
    path: outputPath,
    width: "148mm",
    height: "210mm",
    margin: { top: "0", right: "0", bottom: "0", left: "0" },
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  console.log(`\nDone! PDF saved to ${outputPath}`);
}

// Main
async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  await generateCombinedPdf();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
