import type { Metadata } from "next";
import { checkAuth } from "./actions";
import ChiefClient from "./ChiefClient";
import "./chief.css";

export const metadata: Metadata = {
  title: "Chief of Staff \\ Run with Foxes",
  description: "Internal briefing for Chief of Staff product.",
  robots: { index: false, follow: false },
};

export default async function ChiefPage() {
  const isAuthed = await checkAuth();
  return <ChiefClient initialAuth={isAuthed} />;
}
