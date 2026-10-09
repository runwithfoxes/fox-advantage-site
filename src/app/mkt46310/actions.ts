"use server";

/* Password gate for /mkt46310, the student page for Paul's UCD module AI and Digital
   Marketing Strategy, autumn 2026. Same shape as /zorro (see zorro/actions.ts). Server-only:
   the password never ships to the browser. Override in production with MKT46310_PASSWORD. */

import { cookies } from "next/headers";

const PASSWORD = process.env.MKT46310_PASSWORD || "smurfit2026";
const COOKIE = "mkt46310_auth";
const PATH = "/mkt46310";

export async function verifyPassword(password: string): Promise<boolean> {
  if (password.trim().toLowerCase() === PASSWORD.toLowerCase()) {
    const c = await cookies();
    c.set(COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 120,
      path: PATH,
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const c = await cookies();
  return c.get(COOKIE)?.value === "1";
}
