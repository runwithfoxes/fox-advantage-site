import type { Metadata } from "next";
import StudentsContent from "./StudentsContent";

export const metadata: Metadata = {
  title: "Students \\ Run with Foxes",
  description:
    "Behaviours, knowledge, tools. The three-pillar framework for UCD Smurfit digital marketing students.",
};

export default function StudentsPage() {
  return <StudentsContent />;
}
