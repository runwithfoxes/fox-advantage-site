import { readFile } from "node:fs/promises";
import path from "node:path";
import { hasAccess } from "@/lib/access";
import { REPORTS, DATASETS, TRACKERS } from "../../../resources/catalogue";

/**
 * THE REPORT PDFs AND DATA FILES, SERVED ONLY TO SOMEONE WHO HAS GIVEN AN EMAIL. 29 Sep 2026.
 *
 * Paul, launch day: "I don't think we want people to download the AI ask without giving email."
 * The download button already asked for an email, but the files sat in `public/`, so anybody with
 * the URL got them, and 41 made-up example PDFs went with them. Same mistake, same fix as
 * `api/course-file` (read its header): the files live in `resource-files/` outside `public/`, and
 * this route is the only way to them.
 *
 * ⭐ THE WHITELIST IS DERIVED FROM THE FILTERED CATALOGUE, never typed. `REPORTS`, `DATASETS` and
 * `TRACKERS` already drop every example and every held series (catalogue/index.ts), so a file for
 * one of those cannot be served even if it is put back on disk.
 * ⛔ An unknown file and a known one you may not have both answer 404, as course-file does.
 */

const ROOT = path.join(process.cwd(), "resource-files");

function servable(): Set<string> {
  const out = new Set<string>();
  REPORTS.filter((r) => r.status === "published").forEach((r) => r.pdf && out.add(path.basename(r.pdf)));
  DATASETS.forEach((d) => d.csv && out.add(path.basename(d.csv)));
  TRACKERS.forEach((t) => out.add(`${t.slug}-history.csv`));
  return out;
}

const TYPES: Record<string, string> = {
  ".pdf": "application/pdf",
  ".csv": "text/csv; charset=utf-8",
};

export async function GET(_req: Request, ctx: { params: Promise<{ file: string }> }) {
  const file = (await ctx.params).file;
  if (!servable().has(file)) return new Response("Not found", { status: 404 });

  /* The same door as the download button: either access cookie. Dev skips it, as course-file
     does, because the local server has no Klaviyo key to set the cookie with. */
  const open = process.env.NODE_ENV === "development" || (await hasAccess());
  if (!open) return new Response("Not found", { status: 404 });

  const type = TYPES[path.extname(file)];
  if (!type) return new Response("Not found", { status: 404 });

  let body: Buffer;
  try {
    body = await readFile(path.join(ROOT, file));
  } catch {
    console.error(`[resource-file] listed but missing on disk: ${file}`);
    return new Response("Not found", { status: 404 });
  }
  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": type,
      /* ⛔ Never in a shared cache, or the CDN hands it to the next person with no cookie. */
      "Cache-Control": "private, no-store",
      "Content-Disposition": `attachment; filename="${file}"`,
    },
  });
}
