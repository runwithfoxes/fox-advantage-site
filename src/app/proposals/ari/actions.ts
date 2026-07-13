// → src/app/proposals/ari/actions.ts   (replace ari and ari26)
"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string): Promise<boolean> {
  const correct = process.env.ARI_PASSWORD || "ari26";
  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("ari_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/proposals/ari",
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("ari_auth")?.value === "1";
}
