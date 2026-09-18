"use server";

import { cookies, headers } from "next/headers";
import { randomUUID } from "crypto";
import { getProspectPage } from "@/lib/prospect-pages";
import { logProspectEvent } from "@/lib/prospect-visit-store";

const authCookie = (slug: string) => `for_${slug}_auth`;
const visitorCookie = (slug: string) => `for_${slug}_visitor`;

export async function verifyProspectPassword(
  slug: string,
  password: string
): Promise<boolean> {
  const page = getProspectPage(slug);
  if (!page) return false;
  const correct = process.env[page.passwordEnv] || page.passwordFallback;
  if (password !== correct) return false;

  const cookieStore = await cookies();
  cookieStore.set(authCookie(slug), "1", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90, // 90 days
    path: `/for/${slug}`,
  });

  // Anonymous visitor id, set once per browser, so the log can tell one
  // reader from a link shared around a team. Nothing personal in it.
  let visitor = cookieStore.get(visitorCookie(slug))?.value;
  if (!visitor) {
    visitor = randomUUID().slice(0, 8);
    // Path "/" so the cookie also reaches /api/for/{slug}/track; the slug in
    // the cookie name keeps pages from colliding.
    cookieStore.set(visitorCookie(slug), visitor, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  const h = await headers();
  await logProspectEvent(slug, {
    type: "visit",
    name: "gate-passed",
    visitor,
    at: new Date().toISOString(),
    ua: h.get("user-agent") ?? undefined,
  });

  return true;
}

export async function checkProspectAuth(slug: string): Promise<boolean> {
  const page = getProspectPage(slug);
  if (!page) return false;
  const cookieStore = await cookies();
  return cookieStore.get(authCookie(slug))?.value === "1";
}
