import HomePage from "@/components/HomePage";
import { getSubstackPosts } from "@/lib/substack";

export default async function Home() {
  const posts = await getSubstackPosts();
  return <HomePage posts={posts} />;
}
