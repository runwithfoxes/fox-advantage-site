// Writes src/lib/picture-shapes.json: the width over height of every piece's own picture.
// /read reads it to decide which pictures can sit in a 16 by 9 frame without being cut.
// It runs before every build (the "prebuild" line in package.json), so a new piece needs nothing done
// by hand. The page must not open picture files itself: that pulls the whole public folder into the
// server function, and the build fails at 565mb against a 250mb limit (12 Oct 2026).
import fs from "fs";
import path from "path";
import sharp from "sharp";

const root = process.cwd();
const dirs = ["essays", "diary", "research-nuggets", "caught-our-eye", "how-we-made-it"];
const out = {};
for (const d of dirs) {
  const dir = path.join(root, "src/content", d);
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".md"))) {
    const s = fs.readFileSync(path.join(dir, f), "utf8");
    const found = [
      s.match(/^image:\s*["']?([^"'\n]+)/m)?.[1],
      s.match(/!\[[^\]]*\]\(([^)]+)\)/)?.[1],
      s.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1],
      s.match(/<video[^>]+poster=["']([^"']+)["']/i)?.[1],
    ].filter(Boolean);
    for (const src of found) {
      const file = path.join(root, "public", src.trim());
      if (out[src] || !fs.existsSync(file)) continue;
      try {
        const m = await sharp(file).metadata();
        if (m.width && m.height) out[src.trim()] = Math.round((m.width / m.height) * 100) / 100;
      } catch {}
    }
  }
}
const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(path.join(root, "src/lib/picture-shapes.json"), JSON.stringify(sorted, null, 2) + "\n");
console.log(`picture shapes: ${Object.keys(sorted).length} written`);
