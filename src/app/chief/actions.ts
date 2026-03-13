"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string): Promise<boolean> {
  const correct = process.env.CHIEF_PASSWORD || "foxchief2026";
  if (!correct) return false;

  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("chief_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/chief",
    });
    return true;
  }

  return false;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("chief_auth")?.value === "1";
}
