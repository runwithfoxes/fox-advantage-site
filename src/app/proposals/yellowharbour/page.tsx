// → src/app/proposals/yellowharbour/page.tsx   (replace yellowharbour and Yellow Harbour)
import type { Metadata } from "next";
import { checkAuth, verifyPassword } from "./actions";
import ProposalGate from "./ProposalGate";

export const metadata: Metadata = {
  title: "Yellow Harbour \\ Run with Foxes",
  description: "Private proposal.",
  robots: { index: false, follow: false },
};

export default async function ProposalPage() {
  const authed = await checkAuth();
  return <ProposalGate initialAuth={authed} verifyAction={verifyPassword} />;
}
