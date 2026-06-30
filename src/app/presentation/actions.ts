"use server";

/* Password gate for /presentation (the "The AI Maturity Curve" working session).
   Server-only: the password NEVER ships to the browser. Override in prod with
   the env var PRESENTATION_PASSWORD if you prefer not to keep it in the repo. */

import { cookies } from "next/headers";

const PASSWORD = process.env.PRESENTATION_PASSWORD || "foxes_july06";
const COOKIE = "presentation_auth";

export async function verifyPassword(password: string): Promise<boolean> {
  if (password === PASSWORD) {
    const c = await cookies();
    c.set(COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/", // sent for both /presentation and the gated /presentation-app assets
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const c = await cookies();
  return c.get(COOKIE)?.value === "1";
}
