import type { Metadata } from "next";
import ClientWorkspace from "../_components/ClientWorkspace";
import { verifyPassword, checkAuth } from "./actions";
import { meta, deliverables, work } from "./data";
import { getClientFeedback } from "@/lib/client-feedback-store";
import "../_components/workspace.css";

export const metadata: Metadata = {
  title: "SoftCo \\ Run with Foxes",
  description: "Private creative workspace.",
  robots: { index: false, follow: false },
};

export default async function SoftcoPage() {
  const authed = await checkAuth();
  const feedback = await getClientFeedback("softco");
  return (
    <ClientWorkspace
      initialAuth={authed}
      verifyAction={verifyPassword}
      meta={meta}
      deliverables={deliverables}
      work={work}
      feedback={feedback}
    />
  );
}
