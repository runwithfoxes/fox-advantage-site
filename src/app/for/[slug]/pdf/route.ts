import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import path from "path";
import { getProspectPage } from "@/lib/prospect-pages";

// Serves the prospect's proposal PDF behind the SAME gate as the page, the
// twin of ../audit/route.ts. The PDF lives in content/ rather than public/
// because anything in public/ is fetchable without the password, and a
// proposal carries a real client's scope and price. The auth cookie is
// scoped to /for/{slug}, so it reaches this route. next.config.ts carries an
// outputFileTracingIncludes entry so the file ships in the serverless bundle.
//
// Source of the PDF: wireframes/{slug}-proposal-pdf-source.html, rendered
// with Chrome --print-to-pdf. It is a separate portrait document, never a
// print of the web page: the exhibits are interactive React and print as a
// frozen first frame or as nothing at all.

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
      path.join(process.cwd(), "content", "for", `${slug}-proposal.pdf`)
    );
  } catch {
    notFound();
  }

  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `inline; filename="${slug}-proposal.pdf"`,
      "cache-control": "private, no-store",
    },
  });
}
