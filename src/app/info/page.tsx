import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The distribution resource pack \\ Run with Foxes",
  description:
    "Making it is the easy part. Getting it seen is the job. A resource pack of levers, tools and reads for building an audience at speed: video, AI search, built tools, automations and community.",
};

export default function Page() {
  return (
    <iframe
      src="/info/index.html"
      title="The YouTube distribution playbook \ Run with Foxes"
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
