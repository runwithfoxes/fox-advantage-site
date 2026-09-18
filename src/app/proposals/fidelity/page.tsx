import type { Metadata } from "next";
import { checkAuth, verifyPassword } from "./actions";
import ProposalGate from "./ProposalGate";

export const metadata: Metadata = {
  title: "Fidelity Investments Canada \\ Run with Foxes",
  description: "Private.",
  robots: { index: false, follow: false },
};

export default async function FidelityPage() {
  const authed = await checkAuth();
  return <ProposalGate initialAuth={authed} verifyAction={verifyPassword} />;
}
