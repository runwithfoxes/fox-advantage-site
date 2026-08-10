import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { getProspectPage } from "@/lib/prospect-pages";

// Serves the prospect's audit PDF behind the SAME gate as the page. The
// PDF deliberately lives in content/ rather than public/: anything in
// public/ is fetchable without the password, and this file carries a real
// prospect's findings. The auth cookie is scoped to /for/{slug}, so it
// reaches this route. next.config.ts carries an outputFileTracingIncludes
// entry so the file ships in the serverless bundle on Vercel.

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const page = getProspectPage(slug);
  if (!page) notFound();

  const cookieStore = await cookies();
  const authed = cookieStore.get(`for_${slug}_auth`)?.value === "1";
  if (!authed) {
    return new Response("Enter the password on the page first.", {
      status: 401,
    });
  }

  let pdf: Buffer;
  try {
    pdf = await readFile(
      path.join(process.cwd(), "content", "for", `${slug}-geo-audit.pdf`)
    );
  } catch {
    notFound();
  }

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${slug}-ai-answer-sample-runwithfoxes.pdf"`,
      "Cache-Control": "private, no-store",
    },
  });
}
