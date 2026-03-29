import { redirect } from "next/navigation";

export const metadata = {
  title: "Marketing Effectiveness Coach | Run with Foxes",
  description:
    "Drop in your marketing metrics and sort them into what actually matters. Separates activity from outcomes, inputs from effects.",
};

export default function CoachPage() {
  redirect("https://metrics-pyramid.vercel.app");
}
