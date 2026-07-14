// → src/app/proposals/santegic/page.tsx   (replace santegic and Santegic)
import type { Metadata } from "next";
import { checkAuth, verifyPassword } from "./actions";
import ProposalGate from "./ProposalGate";

export const metadata: Metadata = {
  title: "Santegic \\ Run with Foxes",
  description: "Private proposal.",
  robots: { index: false, follow: false },
};

export default async function ProposalPage() {
  const authed = await checkAuth();
  return <ProposalGate initialAuth={authed} verifyAction={verifyPassword} />;
}
