// → src/app/proposals/fidelity/actions.ts
"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string): Promise<boolean> {
  const correct = process.env.FIDELITY_PASSWORD || "fidelity26";
  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("fidelity_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/proposals/fidelity",
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("fidelity_auth")?.value === "1";
}
