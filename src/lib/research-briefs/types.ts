export interface ResearchBrief {
  id: string;
  name: string;
  topic: string;
  thesis: string;
  opening: string;
  firstQuestion: string;
  moves: BriefMove[];
  probingRules: string[];
  closing: string;
  voiceRules: string[];
  extractionSchema: ExtractionField[];
  timing: {
    targetMinutes: number;
    maxMinutes: number;
  };
}

export interface BriefMove {
  number: number;
  instruction: string;
}

export interface ExtractionField {
  name: string;
  type: "scale_1_5" | "category" | "text" | "sentiment";
  question: string;
  options?: string[];
}
