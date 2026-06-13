import type { Metadata } from "next";
import SoftcoClient from "./SoftcoClient";
import { checkAuth } from "./actions";
import "./softco.css";

export const metadata: Metadata = {
  title: "SoftCo \\ Run with Foxes",
  description: "Private creative workspace.",
  robots: { index: false, follow: false },
};

export default async function SoftcoPage() {
  const authed = await checkAuth();
  return <SoftcoClient initialAuth={authed} />;
}
