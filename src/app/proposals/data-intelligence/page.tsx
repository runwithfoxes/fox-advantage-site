import type { Metadata } from "next";
import { checkAuth, verifyPassword } from "./actions";
import ProposalGate from "./ProposalGate";

export const metadata: Metadata = {
  title: "Data Intelligence \\ Run with Foxes",
  description: "Private proposal.",
  robots: { index: false, follow: false },
};

export default async function DataIntelligenceProposalPage() {
  const authed = await checkAuth();
  return <ProposalGate initialAuth={authed} verifyAction={verifyPassword} />;
}
