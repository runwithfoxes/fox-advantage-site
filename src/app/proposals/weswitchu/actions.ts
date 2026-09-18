// → src/app/proposals/weswitchu/actions.ts   (replace weswitchu and weswitchu26)
"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string): Promise<boolean> {
  const correct = process.env.WESWITCHU_PASSWORD || "weswitchu26";
  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("weswitchu_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/proposals/weswitchu",
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("weswitchu_auth")?.value === "1";
}
