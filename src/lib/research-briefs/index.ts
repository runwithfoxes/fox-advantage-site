import type { ResearchBrief } from "./types";
import aiResearchBrief from "./ai-research";

const briefs: Record<string, ResearchBrief> = {
  "ai-research": aiResearchBrief,
};

export function getBrief(id: string): ResearchBrief | null {
  return briefs[id] ?? null;
}

export function getDefaultBrief(): ResearchBrief {
  return aiResearchBrief;
}

export function listBriefs(): { id: string; name: string }[] {
  return Object.values(briefs).map((b) => ({ id: b.id, name: b.name }));
}

export type { ResearchBrief, BriefMove, ExtractionField } from "./types";
