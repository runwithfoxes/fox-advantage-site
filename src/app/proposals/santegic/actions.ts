// → src/app/proposals/santegic/actions.ts   (replace santegic and santegic26)
"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string): Promise<boolean> {
  const correct = process.env.SANTEGIC_PASSWORD || "santegic26";
  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("santegic_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/proposals/santegic",
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("santegic_auth")?.value === "1";
}
