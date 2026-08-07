// → src/app/proposals/hearwell/actions.ts   (replace hearwell and hearwell26)
"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string): Promise<boolean> {
  const correct = process.env.HEARWELL_PASSWORD || "hearwell26";
  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("hearwell_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/proposals/hearwell",
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("hearwell_auth")?.value === "1";
}
