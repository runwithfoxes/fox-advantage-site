"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string): Promise<boolean> {
  const correct = process.env.KAPTURE_PASSWORD || "kapture26";
  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("kapture_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/proposals/kapture",
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("kapture_auth")?.value === "1";
}
