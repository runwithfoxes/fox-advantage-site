"use server";

/* Password gate for /zorro, the student page for the UCD x IE week, 14-18 Sep 2026.
   Same shape as the client workspaces (see clients/sabre/actions.ts). Server-only: the
   password never ships to the browser. Override in production with ZORRO_PASSWORD. */

import { cookies } from "next/headers";

const PASSWORD = process.env.ZORRO_PASSWORD || "zorro2026";
const COOKIE = "zorro_auth";
const PATH = "/zorro";

export async function verifyPassword(password: string): Promise<boolean> {
  if (password.trim().toLowerCase() === PASSWORD.toLowerCase()) {
    const c = await cookies();
    c.set(COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
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
