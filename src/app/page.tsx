import type { Metadata } from "next";
import HomePage from "@/components/HomePage";
import { getSubstackPosts } from "@/lib/substack";

export const metadata: Metadata = {
  description:
    "Run with Foxes builds marketing agents for your business. They make the ads, write the outreach, and run the campaigns, around the clock.",
};

export default async function Home() {
  const posts = await getSubstackPosts();
  return <HomePage posts={posts} />;
}
