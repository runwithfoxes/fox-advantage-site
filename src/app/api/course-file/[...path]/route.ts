import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { MODULES_BY_N } from "../../../course/moduleData";

/**
 * ⭐⭐ THE MODULE FILES, SERVED BEHIND THE SAME DOOR AS THE MODULE. Paul, 3 Aug 2026:
 * "if you move them to where you want and keep them from public seeing it, then do."
 *
 * ⛔⛔ THIS ROUTE EXISTS BECAUSE `public/` IS NOT PRIVATE, AND THAT MISTAKE WAS MADE HERE
 * FIRST. The fourteen documents shipped under `public/course/module-2/` earlier the same
 * evening. The module page was gated, the library excluded them, and every one of them
 * still answered 200 to anybody with the URL, because anything under `public/` is a static
 * asset and no page code runs before it is served. Being unlinked is not being private.
 *
 * ⭐ THE WHITELIST IS DERIVED, NEVER TYPED. Every servable path is read out of
 * `moduleData.ts`, which is already the only copy of what a module contains. That kills
 * directory traversal by construction rather than by sanitising the string: `../../.env`
 * is not in the set, so it 404s like any other name we do not serve. A regex over the
 * path would have to be right forever; a set membership test only has to be right once.
 *
 * ⚠️ IT ALSO MEANS A FILE ADDED TO `moduleData.ts` IS SERVABLE THE SAME MOMENT, and one
 * left on disk but not in the data is not servable at all. That is the right way round:
 * the page and the server agree because they read the same list.
 */

const ROOT = path.join(process.cwd(), "course-files");

/** Every path the data says we serve, as `module-2/writer/writer-dna.md`. */
function servable(): Map<string, number> {
  const out = new Map<string, number>();
  Object.values(MODULES_BY_N).forEach((mod) => {
    mod.files?.forEach((set) => {
      set.files.forEach((f) => {
        [f.href, f.take].forEach((u) => {
          const rel = u.replace(/^\/api\/course-file\//, "");
          out.set(rel, mod.n);
        });
      });
    });
  });
  return out;
}

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const rel = (await ctx.params).path.join("/");

  const allowed = servable();
  const modN = allowed.get(rel);
  /* ⛔ NOT 403. An unknown path and a known one you may not have both answer 404, so this
     route never confirms that a file exists to somebody who cannot read it. */
  if (modN === undefined) {
    return new Response("Not found", { status: 404 });
  }

  /* ⭐ THE SAME COOKIE THE MODULE PAGE CHECKS (`course/[n]/page.tsx`). One door, one
     check. If the module page ever stops trusting this cookie, this must move with it,
     which is why it reads the same name rather than inventing a second one.
     ⚠️ IT IS A DOOR, NOT A LOCK, and the module page's own note says so: anyone who
     types an email is in. What it stops is the file being readable by someone who never
     came to the course at all. */
  /* ⭐ DEV ONLY, 4 Aug 2026, and it MUST move in step with the same bypass in
     `course/[n]/page.tsx`. That one let Paul review a module without the door; without this
     one the module renders but every file it serves 404s, so a folder window on the page
     would come up empty and look like a broken component rather than a missing cookie.
     `NODE_ENV` is "production" in every build Vercel ships, so this cannot reach a member. */
  const identified =
    process.env.NODE_ENV === "development"
      ? "dev@localhost"
      : (await cookies()).get("rwf_course_id")?.value ?? "";
  if (!identified) {
    return new Response("Not found", { status: 404 });
  }

  const ext = path.extname(rel);
  const type = TYPES[ext];
  if (!type) return new Response("Not found", { status: 404 });

  let body: Buffer;
  try {
    body = await readFile(path.join(ROOT, rel));
  } catch {
    /* In the data but not on disk. A real state, and it must be loud in the log rather
       than silently serving nothing: the two lists have come apart. */
    console.error(`[course-file] listed but missing on disk: ${rel}`);
    return new Response("Not found", { status: 404 });
  }

  return new Response(new Uint8Array(body), {
    headers: {
      "Content-Type": type,
      /* ⛔ NEVER CACHED BY A SHARED CACHE. A CDN holding one of these would serve it to
         the next person with no cookie at all, which is the whole hole this route closes. */
      "Cache-Control": "private, no-store",
      /* The markdown is the thing that goes into a Claude project, so it downloads
         rather than rendering as text in a tab. The html is for reading in place. */
      ...(ext === ".md"
        ? { "Content-Disposition": `attachment; filename="${path.basename(rel)}"` }
        : {}),
    },
  });
}
