import { buildLibrary } from "@/app/course/everything/build";

/**
 * /resources/library/all-prompts.txt: every prompt in the library as one text file.
 * Built from the same source as the page (build.ts, so moduleData) on each request, never
 * kept as a file by hand; a prompt added to a module is in the download the same minute it
 * is on the page. Behind the gate on the page (the finding is free, the file needs an
 * account); the route itself is open, because the gate is a mockup and posts nowhere.
 */
export const revalidate = 300;

export function GET() {
  const { lessonRows } = buildLibrary();
  const parts: string[] = [];
  for (const row of lessonRows) {
    if (row.type !== "folder") continue;
    for (const f of row.files) {
      if (f.kind !== "prompt" || !f.body) continue;
      parts.push(`## ${f.name}\nFrom: ${row.name} (module ${row.modN})\n\n${f.body}`);
    }
  }
  const head = `Run with Foxes, The Library. Every prompt from the course, ${parts.length} in all.\nrunwithfoxes.com/resources/library\n\n`;
  return new Response(head + parts.join("\n\n\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "content-disposition": 'attachment; filename="run-with-foxes-prompts.txt"',
    },
  });
}
