import type { Metadata } from "next";
import ChiefClient from "./ChiefClient";
import "./chief.css";

export const metadata: Metadata = {
  title: "Chief of Staff \\ Run with Foxes",
  description: "Internal briefing for Chief of Staff product.",
  robots: { index: false, follow: false },
};

export default function ChiefPage() {
  return <ChiefClient initialAuth={true} />;
}
