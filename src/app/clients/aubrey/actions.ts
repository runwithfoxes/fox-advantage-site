"use server";

/* Password gate for /clients/aubrey. Server-only: the password NEVER ships to
   the browser (do not move it into data.ts). Override in prod with the env var
   AUBREY_PASSWORD if you prefer not to keep it in the repo. */

import { cookies } from "next/headers";

const PASSWORD = process.env.AUBREY_PASSWORD || "Aubrey26";
const COOKIE = "aubrey_auth";
const PATH = "/clients/aubrey";

export async function verifyPassword(password: string): Promise<boolean> {
  if (password === PASSWORD) {
    const c = await cookies();
    c.set(COOKIE, "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
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
