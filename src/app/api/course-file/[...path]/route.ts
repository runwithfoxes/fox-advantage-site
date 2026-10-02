import { readFile } from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";
import { hasAccess } from "@/lib/access";
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
  /* The dataset, 5 Aug 2026. A csv downloads like the markdown does: it is the thing a
     learner drops into a project, and its readable page is the .html beside it. */
  ".csv": "text/csv; charset=utf-8",
};

export async function GET(
  req: Request,
  ctx: { params: Promise<{ path: string[] }> },
) {
  const rel = (await ctx.params).path.join("/");

  const allowed = servable();

  /* ⭐ A WHOLE FOLDER AS ONE ZIP, Paul, 28 Sep 2026: people add these to Claude all at once,
     so "Download all" beats six clicks. `module-2/kite.zip` zips servable .md or .csv files
     directly under `module-2/kite/` (all of them, or the `files` asked for), so the zip can never hold a file the data does not
     list, and it cannot drift from the single files because it is built from them per
     request. Same door as a single file. */
  if (rel.endsWith(".zip")) {
    const dir = rel.slice(0, -4) + "/";
    /* `?files=audience,proof` picks exactly the files the page lists; the folder holds
       others (Kite's segment emails, the writer's format files) that a list may leave out. */
    const want = new URL(req.url).searchParams.get("files")?.split(",").filter(Boolean);
    const members = [...allowed.keys()].filter(
      (k) =>
        k.startsWith(dir) &&
        /* A named list may reach into subfolders (`kite/audience`), for one zip of a whole
           module's files; without one, only the folder's own files. */
        (want ? true : !k.slice(dir.length).includes("/")) &&
        /\.(md|csv)$/.test(k) &&
        (!want || want.some((w) => k.slice(dir.length) === (w.includes(".") ? w : `${w}.md`))),
    );
    if (!members.length) return new Response("Not found", { status: 404 });
    /* 2 Oct 2026, at the merge with main: the zip takes the same door as a single file,
       hasAccess(), so either cookie opens it. It read only the course cookie until then,
       which is the fault main fixed for single files on 1 Oct. */
    const mayZip = process.env.NODE_ENV === "development" || (await hasAccess());
    if (!mayZip) return new Response("Not found", { status: 404 });
    const zip = new JSZip();
    const folder = zip.folder(path.basename(dir))!;
    try {
      for (const k of members) folder.file(path.basename(k), await readFile(path.join(ROOT, k)));
    } catch {
      console.error(`[course-file] zip member missing on disk under ${dir}`);
      return new Response("Not found", { status: 404 });
    }
    const out = await zip.generateAsync({ type: "arraybuffer" });
    return new Response(out, {
      headers: {
        "Content-Type": "application/zip",
        "Cache-Control": "private, no-store",
        "Content-Disposition": `attachment; filename="${path.basename(rel)}"`,
      },
    });
  }

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
  /* ⭐ 1 Oct 2026: EITHER COOKIE, through hasAccess() (src/lib/access.ts). This read only the
     course's identity cookie, so someone who signed up at the library or for a report, and was
     told on the page that everything was open, got "Not found" on every file. Paul, 27 Sep:
     one sign-up opens everything. */
  const identified = process.env.NODE_ENV === "development" || (await hasAccess());
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
      /* The markdown and the csv are the things that go into a Claude project, so they
         download rather than rendering as text in a tab. The html is for reading in place. */
      ...(ext === ".md" || ext === ".csv"
        ? { "Content-Disposition": `attachment; filename="${path.basename(rel)}"` }
        : {}),
    },
  });
}
