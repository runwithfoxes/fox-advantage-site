import { NextResponse } from "next/server";
import { hasAccess } from "@/lib/access";

/**
 * "DOES THIS BROWSER ALREADY HAVE AN ACCOUNT?", answered for the pages that cannot ask. 1 Oct 2026.
 *
 * Both sign-up cookies are httpOnly, so nothing running in the page can read them, and most pages
 * are built once and served to everybody (essays, the diary, the book, /course), so they cannot
 * read them on the server either without giving that up. Before this, only the four pages that
 * read the cookie themselves knew a returning visitor; every other page showed them Sign in and a
 * sign-up box. src/components/Known.tsx asks this once per page load and the page shows the right
 * things. It says yes or no and nothing else: never the email.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ known: await hasAccess() }, { headers: { "Cache-Control": "private, no-store" } });
}
