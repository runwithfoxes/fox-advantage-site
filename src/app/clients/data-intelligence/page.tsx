import type { Metadata } from "next";
import ClientWorkspace from "../_components/ClientWorkspace";
import { verifyPassword, checkAuth } from "./actions";
import { meta, deliverables, work } from "./data";
import "../_components/workspace.css";

export const metadata: Metadata = {
  title: "Data Intelligence \\ Run with Foxes",
  description: "Private client workspace.",
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
