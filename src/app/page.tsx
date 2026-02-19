import { getChaptersByPart } from "@/lib/chapters";
import Landing from "@/components/Landing";

export default function Home() {
  const parts = getChaptersByPart();
  return <Landing parts={parts} />;
}
