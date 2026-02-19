import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const chaptersDirectory = path.join(
  process.cwd(),
  "src/content/chapters"
);

export interface Chapter {
  slug: string;
  number: number;
  title: string;
  part: number;
  partName: string;
  content?: string;
}

// Map chapter files to their display order and part assignments
// Based on the Table of Contents
const chapterMap: {
  file: string;
  number: number;
  title: string;
  part: number;
  partName: string;
}[] = [
  // Part 1: What Just Collapsed
  { file: "ch02-the-marketing-department-autopsy-report.md", number: 1, title: "The marketing department autopsy report", part: 1, partName: "What Just Collapsed" },
  { file: "ch03-the-robots-arent-coming-theyve-already-moved-in.md", number: 2, title: "The robots aren't coming. They've already moved in", part: 1, partName: "What Just Collapsed" },
  { file: "ch05-the-algorithm-will-see-you-now.md", number: 3, title: "The algorithm will see you now", part: 1, partName: "What Just Collapsed" },
  { file: "ch06-everything-everywhere-all-at-once.md", number: 4, title: "Everything. Everywhere. All at once", part: 1, partName: "What Just Collapsed" },
  { file: "ch07-average-is-the-new-invisible.md", number: 5, title: "Average is the new invisible", part: 1, partName: "What Just Collapsed" },
  // Part 2: Better Together
  { file: "ch09-drivers-wanted.md", number: 6, title: "Drivers Wanted", part: 2, partName: "Better Together" },
  { file: "ch10-robots-dont-have-skin-in-the-game.md", number: 7, title: "Robots don't have skin in the game", part: 2, partName: "Better Together" },
  { file: "ch11-kill-bugs-fast.md", number: 8, title: "Kill bugs fast", part: 2, partName: "Better Together" },
  { file: "ch12-critical-thinking-has-never-been-more-critical.md", number: 9, title: "Critical thinking has never been more critical", part: 2, partName: "Better Together" },
  { file: "ch13-ai-has-turned-us-all-into-little-hemingways.md", number: 10, title: "AI has turned us all into little Hemingways", part: 2, partName: "Better Together" },
  { file: "ch14-the-friction-is-the-point.md", number: 11, title: "The friction is the point", part: 2, partName: "Better Together" },
  { file: "ch15-a-very-tidy-wrong-answer.md", number: 12, title: "A very tidy wrong answer", part: 2, partName: "Better Together" },
  // Part 3: Behaviours
  { file: "ch16-pressing-buttons-is-not-the-same-as-driving.md", number: 13, title: "Pressing buttons is not the same as driving", part: 3, partName: "Behaviours" },
  { file: "ch17-mr-beast.md", number: 14, title: "Mr Beast", part: 3, partName: "Behaviours" },
  { file: "ch18-look-for-the-smell.md", number: 15, title: "Look for the smell", part: 3, partName: "Behaviours" },
  { file: "ch19-standards-decide-what-stays.md", number: 16, title: "Standards decide what stays", part: 3, partName: "Behaviours" },
  { file: "ch20-gotta-put-in-the-reps.md", number: 17, title: "Gotta put in the reps", part: 3, partName: "Behaviours" },
  { file: "ch21-dont-help-ask-me-questions.md", number: 18, title: "Don't help. Ask me questions", part: 3, partName: "Behaviours" },
  { file: "ch22-getting-attention-from-robots.md", number: 19, title: "Getting attention from robots", part: 3, partName: "Behaviours" },
  { file: "ch23-my-830am-research-report.md", number: 20, title: "My 8.30am research report", part: 3, partName: "Behaviours" },
  { file: "ch24-boardy-ai-rang-me-on-a-sunday.md", number: 21, title: "Boardy AI rang me on a Sunday", part: 3, partName: "Behaviours" },
  { file: "ch25-i-chaired-a-meeting-between-two-robots.md", number: 22, title: "I chaired a meeting between two robots", part: 3, partName: "Behaviours" },
  { file: "ch26-start-with-what.md", number: 23, title: "Start with what", part: 3, partName: "Behaviours" },
  { file: "ch27-126-years-of-aida.md", number: 24, title: "126 years of AIDA", part: 3, partName: "Behaviours" },
  { file: "ch28-the-one-number-you-need-to-grow.md", number: 25, title: "The one number you need to grow", part: 3, partName: "Behaviours" },
  { file: "ch32-interview-with-two-dead-men.md", number: 26, title: "Interview with two dead men", part: 3, partName: "Behaviours" },
  { file: "ch33-strong-opinions-weakly-held.md", number: 27, title: "Strong opinions. Weakly held", part: 3, partName: "Behaviours" },
  { file: "ch34-build-it-in-front-of-them.md", number: 28, title: "Build it in front of them", part: 3, partName: "Behaviours" },
  { file: "ch35-keep-the-skill-in-your-hands.md", number: 29, title: "Keep the skill in your hands", part: 3, partName: "Behaviours" },
  { file: "ch36-build-the-scaffolding-once.md", number: 30, title: "Build the scaffolding once", part: 3, partName: "Behaviours" },
  { file: "ch37-tiktok-writer.md", number: 31, title: "TikTok writer", part: 3, partName: "Behaviours" },
  { file: "ch38-wrestling-with-a-stubborn-ai-writer.md", number: 32, title: "Wrestling with a stubborn AI writer", part: 3, partName: "Behaviours" },
  { file: "ch39-the-gap.md", number: 33, title: "The gap", part: 3, partName: "Behaviours" },
  { file: "ch40-you-dont-need-permission-anymore.md", number: 34, title: "You don't need permission anymore", part: 3, partName: "Behaviours" },
  { file: "ch41-learn-enough-to-be-dangerous.md", number: 35, title: "Learn enough to be dangerous", part: 3, partName: "Behaviours" },
  // Part 4: Marketing for Leaders
  { file: "ch44c-your-eyepatch-moment.md", number: 36, title: "Your eyepatch moment", part: 4, partName: "Marketing for Leaders" },
  { file: "ch44d-marcel.md", number: 37, title: "Marcel", part: 4, partName: "Marketing for Leaders" },
  { file: "ch44e-find-your-winning-ticket.md", number: 38, title: "Find your winning ticket", part: 4, partName: "Marketing for Leaders" },
  { file: "ch45-the-robot-is-the-grown-up-in-the-room-now.md", number: 39, title: "The robot is the grown-up in the room now", part: 4, partName: "Marketing for Leaders" },
  { file: "ch46-dashboards-lie.md", number: 40, title: "Dashboards lie", part: 4, partName: "Marketing for Leaders" },
  { file: "ch47-more-doing-less-discussing.md", number: 41, title: "A Growth Marketing team of one", part: 4, partName: "Marketing for Leaders" },
];

export function getAllChapters(): Chapter[] {
  return chapterMap.map((ch) => ({
    slug: ch.file.replace(".md", ""),
    number: ch.number,
    title: ch.title,
    part: ch.part,
    partName: ch.partName,
  }));
}

export function getChaptersByPart(): { part: number; partName: string; chapters: Chapter[] }[] {
  const chapters = getAllChapters();
  const parts: { part: number; partName: string; chapters: Chapter[] }[] = [];

  for (const ch of chapters) {
    let existing = parts.find((p) => p.part === ch.part);
    if (!existing) {
      existing = { part: ch.part, partName: ch.partName, chapters: [] };
      parts.push(existing);
    }
    existing.chapters.push(ch);
  }

  return parts.sort((a, b) => a.part - b.part);
}

export async function getChapterContent(slug: string): Promise<Chapter | null> {
  const mapping = chapterMap.find((ch) => ch.file.replace(".md", "") === slug);
  if (!mapping) return null;

  const fullPath = path.join(chaptersDirectory, mapping.file);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    number: mapping.number,
    title: mapping.title,
    part: mapping.part,
    partName: mapping.partName,
    content: contentHtml,
  };
}

export function getAdjacentChapters(slug: string): { prev: Chapter | null; next: Chapter | null } {
  const chapters = getAllChapters();
  const index = chapters.findIndex((ch) => ch.slug === slug);

  return {
    prev: index > 0 ? chapters[index - 1] : null,
    next: index < chapters.length - 1 ? chapters[index + 1] : null,
  };
}
