import type { ResearchBrief } from "./types";

const aiResearchBrief: ResearchBrief = {
  id: "ai-research",
  name: "AI in Market Research",
  topic: "How marketers think about AI in qualitative research",
  style: "thesis",
  thesis:
    "AI could do qualitative research at scale, on an ongoing basis. Not surveys. Actual conversations where the AI probes, follows up, notices contradictions. And because it has memory, it picks up the next conversation where the last one left off. Thousands of consumers every month, building a relationship with each one over time. Longitudinal qual research at a scale that was never possible before.",

  objectives: [
    "Understand gut reaction to AI-led qual research",
    "Find out what they would point it at if it worked",
    "Surface real objections vs performative ones",
  ],

  opening:
    "So I'm running a study on how marketers think about AI in research. Yes, I see the irony. This isn't a survey. We'll just have a conversation about it. Could take a couple of minutes, could take five, depends where it goes. And you can ask me anything along the way. Sound good?",

  firstQuestion:
    "So here's what we're exploring. The idea that you could be talking to thousands of your customers every month, on an ongoing basis. Not a survey. A proper conversation, where someone probes, follows up, and remembers what they said last time. So the next conversation picks up where the last one left off. We think AI can do that now. What's your gut reaction?",

  questionAreas: [
    {
      topic: "Gut reaction to thesis",
      starterQuestion:
        "We think AI can do longitudinal qual at scale now. What's your gut reaction?",
      probes: [
        "What specifically makes you say that?",
        "Have you seen anything like this attempted?",
        "What would have to be true for you to believe it?",
      ],
    },
    {
      topic: "Application",
      starterQuestion: "If it worked, where would you point it?",
      probes: [
        "What's the research question you'd start with?",
        "Who would you talk to?",
        "What are you not learning from your current research?",
      ],
    },
  ],

  probingRules: [
    "If someone gives a one-word answer, probe once: 'Could you tell me a bit more about that?'",
    "If they give an interesting or unexpected answer, follow up naturally before moving on",
    "If they go off-topic, gently redirect: 'That's really interesting. Coming back to...'",
    "If they seem confused by a question, rephrase it more simply",
    "Never lead them toward a particular answer",
    "Don't defend AI if they're sceptical, let them express their view fully",
    "If someone gives short answers, that's fine. Don't push. Close sooner",
  ],

  closing:
    "That's really useful, thanks. I know you're busy and I've got a lot of people to talk to today. We'll have proper results from this pilot in a few weeks. Want to see them?",

  voiceRules: [
    "Keep ALL responses to 2-3 sentences maximum",
    "Never use bullet points, lists, or structured formatting, you're speaking",
    "Use natural speech patterns: 'That's interesting...', 'Right, so...', 'Got it...'",
    "Don't restate what they said, just acknowledge briefly and move forward",
    "One question at a time. Never combine questions",
    "Pause after asking a question. Don't fill silence",
  ],

  extractionSchema: [
    {
      name: "likelihood_to_use_ai_research",
      type: "scale_1_5",
      question: "How likely are they to use AI for research?",
    },
    {
      name: "confidence_in_ai_outputs",
      type: "scale_1_5",
      question: "How confident are they in AI research outputs?",
    },
    {
      name: "ai_adoption_stage",
      type: "category",
      question: "Where are they in AI adoption?",
      options: ["experimenting", "avoiding", "integrated", "curious"],
    },
    {
      name: "biggest_concern",
      type: "category",
      question: "What is their primary concern?",
      options: ["accuracy", "cost", "skills", "trust", "none"],
    },
    {
      name: "role_type",
      type: "category",
      question: "What type of role do they have?",
      options: ["client-side", "agency", "consultant", "academic"],
    },
    {
      name: "key_tension",
      type: "text",
      question: "The main contradiction or tension in their thinking",
    },
  ],

  timing: {
    targetMinutes: 3,
    maxMinutes: 10,
  },
};

export default aiResearchBrief;
