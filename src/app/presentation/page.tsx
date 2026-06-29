import type { Metadata } from "next";
import PresentationGate from "./PresentationGate";
import { verifyPassword, checkAuth } from "./actions";

export const metadata: Metadata = {
  title: "AI at Sabre \\ Run with Foxes",
  description: "Private working session.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const authed = await checkAuth();
  return <PresentationGate initialAuth={authed} verifyAction={verifyPassword} />;
}
