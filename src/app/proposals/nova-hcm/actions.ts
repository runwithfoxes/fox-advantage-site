// → src/app/proposals/nova-hcm/actions.ts   (replace nova-hcm and nova26)
"use server";

import { cookies } from "next/headers";

export async function verifyPassword(password: string): Promise<boolean> {
  const correct = process.env.NOVA_HCM_PASSWORD || "nova26";
  if (password === correct) {
    const cookieStore = await cookies();
    cookieStore.set("nova-hcm_auth", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: "/proposals/nova-hcm",
    });
    return true;
  }
  return false;
}

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("nova-hcm_auth")?.value === "1";
}
