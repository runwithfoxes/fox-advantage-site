import type { Metadata } from "next";
import ClientWorkspace from "../clients/_components/ClientWorkspace";
import { verifyPassword, checkAuth } from "./actions";
import { meta, deliverables, work } from "./data";
import "../clients/_components/workspace.css";

export const metadata: Metadata = {
  title: "Retail Media \\ Run with Foxes",
  description: "One campaign, every placement.",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const authed = await checkAuth();
  return (
    <ClientWorkspace
      initialAuth={authed}
      verifyAction={verifyPassword}
      meta={meta}
      deliverables={deliverables}
      work={work}
    />
  );
}
