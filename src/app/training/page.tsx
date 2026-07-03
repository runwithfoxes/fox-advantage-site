import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Training for Ireland's marketers \\ Run with Foxes",
  description:
    "Free training for marketers in Ireland, built for the AI years. One useful thing in your inbox on a regular rhythm; when your city reaches one hundred of us, we book a room and go deeper together.",
};

export default function Page() {
  return (
    <iframe
      src="/training-app/index.html"
      title="Training for Ireland's marketers \ Run with Foxes"
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
