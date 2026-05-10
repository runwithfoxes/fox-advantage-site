export interface ResearchBrief {
  id: string;
  name: string;
  topic: string;
  style: "thesis" | "behavioural";
  thesis?: string;
  objectives: string[];
  opening: string;
  firstQuestion: string;
  questionAreas: QuestionArea[];
  probingRules: string[];
  closing: string;
  voiceRules: string[];
  extractionSchema: ExtractionField[];
  timing: {
    targetMinutes: number;
    maxMinutes: number;
  };
}

export interface QuestionArea {
  topic: string;
  starterQuestion: string;
  probes: string[];
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
