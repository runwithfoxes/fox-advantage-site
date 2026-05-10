import type { ResearchBrief } from "./types";

const groceryShoppingBrief: ResearchBrief = {
  id: "grocery-shopping",
  name: "Weekly Food Shopping",
  topic: "Understanding real food shopping behaviour, choices, and habits",
  style: "behavioural",

  objectives: [
    "Map actual shopping behaviour from the past week, not hypothetical",
    "Understand store choice and what drives it",
    "Uncover brand loyalty vs switching in specific categories",
    "Surface the gap between what people say they do and what they actually did",
    "Build a rich picture of this person over time",
  ],

  opening:
    "Hi, I'm Isa. And who am I talking to?",

  firstQuestion:
    "Lovely to meet you. And where are you today?",

  questionAreas: [
    {
      topic: "Store choice",
      starterQuestion: "Where did you end up going?",
      probes: [
        "Was that your usual or did something change?",
        "Did you go anywhere else that week or was it just the one shop?",
        "What made you pick that one over somewhere else?",
        "Is there a shop you used to go to but stopped? What happened?",
      ],
    },
    {
      topic: "What they bought",
      starterQuestion: "What was in the basket? What do you remember buying?",
      probes: [
        "Any particular brands you always get?",
        "Anything you picked up that wasn't on the list?",
        "Did you buy own-label or branded for that?",
        "Was there anything you wanted but didn't buy? What stopped you?",
        "Any new products you tried for the first time?",
      ],
    },
    {
      topic: "Decisions and trade-offs",
      starterQuestion: "Was there anything where you had to choose between two options?",
      probes: [
        "What tipped it? Price, habit, something else?",
        "Would you have bought the same thing six months ago?",
        "Is that something you think about or is it just automatic at this stage?",
        "Did anyone else in the house have a say in what went in the trolley?",
      ],
    },
    {
      topic: "Price and value",
      starterQuestion: "Did the total surprise you at all?",
      probes: [
        "Are there things where you always check the price and things where you just grab it?",
        "Have you switched anything recently because of price?",
        "Is there a brand you'd never go own-label on? Why?",
      ],
    },
    {
      topic: "Habits and change",
      starterQuestion: "Has your shop changed much in the last year?",
      probes: [
        "What drove that change?",
        "Is there anything you buy now that you didn't a year ago?",
        "Anything you stopped buying? What happened?",
      ],
    },
  ],

  probingRules: [
    "Ask about what they DID, not what they think. Behaviour first, opinions never.",
    "When someone names a brand, ask why THAT one. Don't accept 'it's just what I buy' — probe once more: 'Was it always that one?'",
    "When someone says they 'always' do something, test it: 'Always? Even last week?'",
    "Notice contradictions. If they say price doesn't matter but then mention switching for price, name it gently: 'You mentioned price there — I thought you said it wasn't a factor?'",
    "If they say 'I don't know' or 'I just grab it', that IS data. Note it and move on.",
    "Don't ask what they WOULD do. Ask what they DID.",
    "If they start giving you the 'right' answer (healthy eating, careful budgeting), get specific: 'What was actually in the trolley though?'",
    "Follow the interesting thread. If they mention something unexpected, stay on it.",
    "One question at a time. Let them talk. The best data comes when they're thinking out loud.",
    "If they mention another person (partner, kids), ask how that changes what they buy.",
  ],

  closing:
    "That's really helpful, thanks. Genuinely interesting hearing about the actual decisions. We're doing this with a bunch of people and I'd love to check in again in a few weeks to see if anything's shifted. Would that be alright?",

  voiceRules: [
    "Keep ALL responses to 2-3 sentences maximum",
    "Never use bullet points, lists, or structured formatting, you're speaking",
    "Use natural speech patterns: 'Right...', 'Got it...', 'That's gas...', 'Fair enough...'",
    "Don't restate what they said, just acknowledge briefly and move forward",
    "One question at a time. Never combine questions",
    "Sound genuinely curious, not clinical. This is a chat, not a clipboard",
    "Use their words back to them: if they say 'the big Tesco', you say 'the big Tesco', not 'your primary grocery retailer'",
  ],

  categoryKnowledge: `IRISH GROCERY MARKET (use to ask sharper questions, never lecture)

RETAILERS: Dunnes 23.6% (market leader, Irish-owned, Simply Better own-brand is premium), Tesco 23.3% (biggest range, Clubcard, online delivery), SuperValu 20.2% (community-focused, strong in towns, Irish produce, good delis), Lidl 14% (fastest growing, Middle Aisle is cultural touchpoint), Aldi 11.8% (similar to Lidl, expanding). Lidl+Aldi combined = 26%. Centra/Spar are convenience/forecourt.

SHOPPING PATTERNS: Irish people shop ~22 trips/month (more frequent than UK). Split-shopping is common: primary shop at Dunnes/SuperValu, cherry-pick at Lidl/Aldi for specific categories. 83% still prefer in-store. Online ~5.7%. "Big shop" exists but less dominant than UK.

OWN-BRAND: Crossed 47% value share in 2025, overtaking branded. 78% of Irish consumers say own-brand meets needs. Dunnes Simply Better (premium, genuinely respected). Categories where branded still wins: tea, butter, bread, alcohol.

KEY BRANDS: Brennan's bread (No.3, yellow bag, "Today's bread today"), Avonmore (No.4, milk/cream), Tayto (No.5, cheese & onion, national institution), Barry's Tea (No.24, overtook Lyons, Cork=Barry's Dublin=Lyons), Kerrygold (No.36, 30-40% more than own-brand but loyalists won't switch), Denny's (sausages/ham, facing Simply Better pressure).

PRICE: Food inflation 5% in Aug 2025. Butter +18.6%, beef +23.7%, milk +12.1%. Cumulative +27% since 2020. Trading down is permanent, not temporary. Price war expected 2026 on basics.

LOYALTY: Tesco Clubcard (points + Clubcard Prices), SuperValu Real Rewards (tokens, personalised), Dunnes VALUEclub (points, recently went app-based). Most people have all three, use whichever shop they're in. Card loyalty ≠ shop loyalty.

LOCAL: Butcher still matters (~35% buy meat from independent butcher). SuperValu positioned as local. Farmers markets growing but niche. Cork has strong local loyalty.

TRENDS THAT ARE REAL: High protein (under-35s), own-brand premiumisation (trading up within own-brand not back to branded), food waste apps (Too Good To Go). TRENDS THAT ARE NOISE: Plant-based (plateaued, flexitarian at best), meal kits (niche/premium), batch cooking (aspirational not practised).`,

  extractionSchema: [
    {
      name: "primary_store",
      type: "text",
      question: "Which store did they primarily shop at?",
    },
    {
      name: "secondary_stores",
      type: "text",
      question: "Any other stores visited?",
    },
    {
      name: "store_loyalty",
      type: "category",
      question: "How loyal are they to their primary store?",
      options: ["very_loyal", "habitual", "shops_around", "switched_recently"],
    },
    {
      name: "price_sensitivity",
      type: "scale_1_5",
      question: "How price sensitive are they? 1 = not at all, 5 = very",
    },
    {
      name: "own_label_attitude",
      type: "category",
      question: "Attitude to own-label products",
      options: ["prefers_own_label", "mixed", "prefers_branded", "category_dependent"],
    },
    {
      name: "brands_mentioned",
      type: "text",
      question: "Specific brands mentioned and context",
    },
    {
      name: "recent_switches",
      type: "text",
      question: "Any recent switches in brand or store, and why",
    },
    {
      name: "household_influence",
      type: "text",
      question: "Who else influences the shopping decisions",
    },
    {
      name: "key_tension",
      type: "text",
      question: "Main contradiction between stated and actual behaviour",
    },
    {
      name: "overall_sentiment",
      type: "sentiment",
      question: "Overall sentiment toward their food shopping experience",
    },
  ],

  timing: {
    targetMinutes: 5,
    maxMinutes: 15,
  },
};

export default groceryShoppingBrief;
