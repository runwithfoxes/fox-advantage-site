"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string): Promise<boolean> {
  const correct = process.env.SOFTCO_PASSWORD || "Daraghsoftco26";
  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("softco_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/clients/softco",
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("softco_auth")?.value === "1";
}
