import BriefDiagnosticianClient from "./BriefDiagnosticianClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brief Diagnostician \\ Run with Foxes",
  description:
    "Most bad ads don't start with bad ideas. They start with briefs that don't know how they want the communication to work. Paste yours and get a diagnosis in seconds.",
};

export default function Page() {
  return <BriefDiagnosticianClient />;
}
