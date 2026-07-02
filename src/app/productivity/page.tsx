import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team productivity \\ Run with Foxes",
  description:
    "When a team works with AI the gain isn't only speed, it's a shared standard. A coach that pressure-tests every brief against the ladder of marketing metrics.",
};

export default function Page() {
  return (
    <iframe
      src="/productivity-app/index.html"
      title="Team productivity \ Run with Foxes"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}
