export interface ToolEntry {
  name: string;
  desc: string;
  url?: string;
}

export interface ToolBucket {
  slug: string;
  number: number;
  title: string;
  intro: string;
  tools: ToolEntry[];
  aiDoes: string[];
  marketerDoes: string[];
  skills: string[];
  keyPoint?: string;
  prev?: { slug: string; title: string };
  next?: { slug: string; title: string };
}

const rawBuckets: Omit<ToolBucket, "prev" | "next">[] = [
  {
    slug: "channel-operations",
    number: 1,
    title: "Channel operations",
    intro: "How ad platforms work, what algorithms optimise for, and when to override them. The three platforms you will use most, and what each is good at.",
    tools: [
      {
        name: "Meta Ads (Advantage+)",
        desc: "Facebook and Instagram advertising. Advantage+ is Meta's AI-driven campaign type that automates audience selection, placement, and creative testing. You set the objective and constraints, it handles delivery.",
        url: "https://www.facebook.com/business/ads",
      },
      {
        name: "Google Ads (Performance Max)",
        desc: "Search, display, YouTube, and shopping ads in one campaign. Performance Max uses AI to allocate budget across all Google surfaces. Strong for intent-based targeting where people are already searching.",
        url: "https://ads.google.com",
      },
      {
        name: "TikTok Ads",
        desc: "Short-form video advertising. The algorithm is aggressive about finding audiences based on content engagement, not declared interests. Good for reach and awareness with younger demographics.",
        url: "https://ads.tiktok.com",
      },
    ],
    aiDoes: [
      "Bid management in milliseconds",
      "Audience selection from thousands of signals",
      "When and where ads appear",
      "Spend allocation across placements",
      "Budget shifting to winning variants",
    ],
    marketerDoes: [
      "Define what success actually means before the campaign starts",
      "Set constraints: budget caps, audience exclusions, timeframes",
      "Question inflated ROAS claims from platforms",
      "Verify real conversions vs attributed conversions",
      "Distinguish branded search from genuine new demand",
    ],
    skills: [
      "Healthy skepticism about platform metrics",
      "Understanding branded vs non-branded performance",
      "ROAS verification and incrementality thinking",
      "Knowing when to expand audiences vs pull the plug",
      "Recognising when AI is learning vs actually failing",
      "Setting the right objective for the right outcome",
    ],
    keyPoint: "Your role is to define what success actually means before the campaign starts. You set the constraints. Then you watch. Not to tinker with every setting, but to catch the things the AI gets wrong.",
  },
  {
    slug: "analytics",
    number: 2,
    title: "Analytics and measurement",
    intro: "Multi-touch attribution, reading across platforms, and spotting when numbers lie. Five layers of truth from one campaign.",
    tools: [
      {
        name: "Google Analytics 4",
        desc: "Website and app analytics. Tracks user journeys, conversions, and events. The move from Universal Analytics to GA4 changed how sessions and attribution work. Event-based, not pageview-based.",
        url: "https://analytics.google.com",
      },
      {
        name: "Platform reporting (Meta, Google, TikTok)",
        desc: "Each ad platform has its own reporting dashboard. They each claim credit for the same conversions. The skill is reading across all three without double-counting.",
      },
      {
        name: "Holdout and incrementality testing",
        desc: "Withhold ads from a control group and measure the difference. The only reliable way to know if advertising caused the sale or if the customer would have bought anyway.",
      },
      {
        name: "Dashboards and data visualisation",
        desc: "Tools like Looker Studio, Tableau, or even spreadsheets. The tool matters less than the questions you ask of it. A dashboard shows what happened, not why.",
        url: "https://lookerstudio.google.com",
      },
    ],
    aiDoes: [
      "Pull data from every platform automatically",
      "Build dashboards and visualisations",
      "Spot trends and flag anomalies",
      "Surface correlations across data sets",
      "Calculate statistical significance",
    ],
    marketerDoes: [
      "Decide which questions actually matter",
      "Determine causation vs correlation",
      "Design holdout tests to prove incrementality",
      "Interpret why things happened, not just what",
      "Spot when a metric looks good but means nothing",
    ],
    skills: [
      "Correlation vs causation thinking",
      "Holdout test design",
      "Incrementality thinking",
      "Question formulation (asking the right question matters more than the tool)",
      "Contextual analysis (what else was happening that week?)",
      "Reading across platforms without double-counting",
    ],
    keyPoint: "AI is excellent at spotting correlations. But it takes human judgment to figure out why. This is called incrementality thinking, and it is one of the most valuable analytical skills you can develop.",
  },
  {
    slug: "content-creative",
    number: 3,
    title: "Content and creative",
    intro: "High-volume production with AI while keeping a distinctive voice. The difference between scaling content and scaling mush.",
    tools: [
      {
        name: "Claude",
        desc: "Anthropic's AI. Good for long-form writing, strategic thinking, and working with detailed briefs. Follows complex instructions and voice guidelines well when you give it the right context.",
        url: "https://claude.ai",
      },
      {
        name: "ChatGPT",
        desc: "OpenAI's AI. Strong for brainstorming, quick drafts, and conversational content. Widely used but requires editing for voice consistency.",
        url: "https://chat.openai.com",
      },
      {
        name: "Figma",
        desc: "Design tool for creating ad creatives, landing pages, and brand assets. The industry standard for collaborative design. AI plugins are extending what non-designers can do.",
        url: "https://figma.com",
      },
      {
        name: "Canva",
        desc: "Design tool for people who are not designers. Templates, brand kits, and AI-powered generation. Good enough for social content, email headers, and presentation decks.",
        url: "https://canva.com",
      },
      {
        name: "AI image generation (Midjourney, DALL-E)",
        desc: "Generate images from text prompts. Useful for concepts, mood boards, and social content. Not yet reliable enough for final brand assets without human direction.",
      },
    ],
    aiDoes: [
      "First drafts of copy at speed",
      "Headline and subject line variants (50 in seconds)",
      "Cross-platform adaptation (blog post to 10 social variants)",
      "Image generation for concepts and mood boards",
      "Translation and localisation",
    ],
    marketerDoes: [
      "Create the creative concept and strategic direction",
      "Define the brand voice blueprint (the lines it would say, and the lines it would never say)",
      "Build the messaging framework that keeps AI output consistent",
      "Judge which output is good enough and which is mush",
      "Feed real customer language, not brand adjectives",
    ],
    skills: [
      "Creative concept development",
      "Brand voice definition and consistency",
      "Brief writing (the quality of the brief determines the quality of the output)",
      "Messaging framework creation",
      "Editing for distinctiveness, not just correctness",
      "Knowing when AI output sounds like everyone else",
    ],
    keyPoint: "The human creates the blueprint. AI mass-produces from it. Feed your positioning, voice rules, and customer verbatims into every prompt. Now AI is not producing generic content. It is producing your content, at scale.",
  },
  {
    slug: "audience-targeting",
    number: 4,
    title: "Audience and targeting",
    intro: "Custom audiences, lookalikes, retargeting. How AI finds audiences for you, and when to override it.",
    tools: [
      {
        name: "Meta Advantage+ audiences",
        desc: "Meta's AI-driven targeting. Upload customer lists, build lookalikes, or go broad and let the algorithm find buyers. The trend is towards broader targeting with AI doing the segmentation.",
        url: "https://business.facebook.com",
      },
      {
        name: "Google Performance Max audiences",
        desc: "Google's equivalent. Combines search intent, display behaviour, YouTube viewing, and shopping signals. Strong for intent-based audiences where someone is actively looking.",
        url: "https://ads.google.com",
      },
      {
        name: "Customer data platforms (CDPs)",
        desc: "Tools like Segment or mParticle that unify customer data across touchpoints. Feed clean data into ad platforms for better targeting. The quality of your first-party data determines the quality of your lookalikes.",
      },
      {
        name: "Retargeting pixels",
        desc: "Small code on your website that tracks visitors. Use it to show ads to people who visited but did not buy. Effective but easy to overdo (nobody likes being followed around the internet for 30 days).",
      },
    ],
    aiDoes: [
      "Find patterns across thousands of signals",
      "Automated audience expansion and optimisation",
      "Real-time bid adjustment based on user signals",
      "Lookalike modelling from seed audiences",
      "Budget shifting toward responsive segments",
    ],
    marketerDoes: [
      "Choose the right objective (form fills vs purchases vs CAC)",
      "Judge audience quality vs breadth tradeoff",
      "Set meaningful exclusions (existing customers, wrong geography)",
      "Diagnose when metrics look good but sales do not follow",
      "Decide whether the algorithm is finding buyers or just clickers",
    ],
    skills: [
      "Audience signal quality judgment",
      "Broad vs narrow targeting tradeoffs",
      "Constraint setting and exclusion strategy",
      "Objective alignment (optimise for what matters, not what is easy to measure)",
      "Problem diagnosis when platform metrics diverge from business results",
      "First-party data strategy",
    ],
    keyPoint: "The AI will optimise for whatever you tell it to measure. If you measure form fills, you get form fillers. If you measure purchases, you get buyers. Your job is pointing it at the right objective.",
  },
  {
    slug: "martech",
    number: 5,
    title: "Marketing technology",
    intro: "CRM, automation, tag management. The stack keeps growing. The skill is deciding what matters and simplifying.",
    tools: [
      {
        name: "HubSpot",
        desc: "CRM, email automation, landing pages, and reporting in one platform. Good for mid-sized teams. Free tier is generous. The risk is feature bloat, where you pay for features nobody uses.",
        url: "https://hubspot.com",
      },
      {
        name: "Salesforce",
        desc: "Enterprise CRM. Powerful but complex. Usually requires a dedicated admin. If your company uses it, learn to navigate it because all your customer data lives there.",
        url: "https://salesforce.com",
      },
      {
        name: "Email automation (Klaviyo, Mailchimp, ActiveCampaign)",
        desc: "Trigger-based email sequences. Cart abandonment, welcome series, re-engagement. AI handles the timing and segmentation. You write the strategy and the content.",
        url: "https://klaviyo.com",
      },
      {
        name: "Google Tag Manager",
        desc: "Manages tracking code on your website without needing a developer for every change. If you cannot tag it, you cannot measure it. Essential for connecting your analytics to reality.",
        url: "https://tagmanager.google.com",
      },
      {
        name: "Zapier / Make",
        desc: "Connects tools that do not natively talk to each other. When a form is submitted, add to CRM, send Slack notification, trigger email sequence. Automation glue.",
        url: "https://zapier.com",
      },
    ],
    aiDoes: [
      "Automate workflows across platforms",
      "Trigger actions based on customer behaviour",
      "Flag data quality issues",
      "Surface unused tools and features (shelfware)",
      "Integration and data syncing",
    ],
    marketerDoes: [
      "Decide which tools are worth having",
      "Simplify the stack (bigger is not better)",
      "Spot shelfware: tools you pay for but nobody uses",
      "Own data quality (garbage in, garbage out)",
      "Recognise when misconfigured tracking is giving you wrong numbers",
    ],
    skills: [
      "Tool selection judgment",
      "Stack simplification",
      "Shelfware identification",
      "Data quality ownership",
      "Tracking and tag management basics",
      "Systems thinking (how tools connect to each other)",
    ],
    keyPoint: "AI can automate the connections between tools. It cannot decide which tools are worth connecting in the first place. Adding tools is easy. Simplifying takes judgment.",
  },
  {
    slug: "testing",
    number: 6,
    title: "Testing and optimisation",
    intro: "A/B tests, holdouts, geo tests. AI runs them faster. You form hypotheses worth testing and know when results are noise.",
    tools: [
      {
        name: "A/B testing (built into most platforms)",
        desc: "One variable, two versions, measure the difference. Meta, Google, and email platforms all have native A/B testing. The mechanics are automated. The hypothesis is yours.",
      },
      {
        name: "Google Optimize (sunset) / VWO / Optimizely",
        desc: "Website A/B and multivariate testing tools. Test different headlines, layouts, CTAs on your site. VWO and Optimizely are the main options now that Google Optimize has been discontinued.",
        url: "https://vwo.com",
      },
      {
        name: "Holdout testing (manual setup)",
        desc: "Exclude a control group from seeing ads. Compare their behaviour to the exposed group. The only way to measure true incrementality. Requires discipline: you are deliberately not showing ads to people who might buy.",
      },
      {
        name: "Geo testing",
        desc: "Run different strategies in different regions. Useful when you cannot do individual-level holdouts. Compare Dublin vs Cork, or UK vs Ireland, and measure the difference.",
      },
    ],
    aiDoes: [
      "Traffic allocation across variants",
      "Run dozens of variants simultaneously",
      "Statistical significance calculation",
      "Auto-optimise by shifting budget to winners mid-test",
      "Pattern detection across test results",
    ],
    marketerDoes: [
      "Form the hypothesis (what do you expect, who does it affect, and why)",
      "Decide what is worth testing in the first place",
      "Interpret results honestly (not just pick the number you like)",
      "Spot noise vs signal (small early swings are not results)",
      "Know when a result generalises and when it does not",
    ],
    skills: [
      "Hypothesis formation",
      "Sample size and timing judgment",
      "Statistical significance interpretation",
      "Novelty effect recognition (the emoji subject line effect fades in 6 weeks)",
      "Result skepticism",
      "Metric alignment (test clicks but measure purchases separately)",
    ],
    keyPoint: "A test result tells you what happened in that test, with that audience, at that time. It does not automatically generalise. The skill is knowing which question is worth asking before you run anything.",
  },
  {
    slug: "planning-budget",
    number: 7,
    title: "Planning and budgeting",
    intro: "Turning strategy into decisions with money attached. Tradeoffs, business cases, and speaking finance language.",
    tools: [
      {
        name: "Spreadsheets (Excel, Google Sheets)",
        desc: "Still the most used planning tool in marketing. Budget models, forecasts, scenario planning, and reporting. If you cannot build a model in a spreadsheet, the tool does not matter.",
      },
      {
        name: "Platform forecasting tools",
        desc: "Meta, Google, and TikTok all offer reach and conversion forecasts based on budget inputs. Useful as a starting point but always overly optimistic. Treat as a rough guide, not a plan.",
      },
      {
        name: "Claude / ChatGPT for scenario modelling",
        desc: "Ask AI to build financial models, run what-if scenarios, and stress-test assumptions. Good at the mechanics. The judgment on which scenario to pursue is yours.",
      },
    ],
    aiDoes: [
      "Forecasting from historical data",
      "Budget pacing and spend tracking",
      "Allocation suggestions across channels",
      "Scenario modelling (what if we shift 20% to search?)",
      "Automated reporting and variance flagging",
    ],
    marketerDoes: [
      "Decide which tradeoff is worth making",
      "Judge whether a forecast is trustworthy",
      "Build the business case in language finance understands",
      "Say no to good ideas in favour of better ones",
      "Present with honesty about what you cannot prove",
    ],
    skills: [
      "Finance language (CAC, LTV, payback period, contribution margin)",
      "Channel tradeoff analysis",
      "Business case construction",
      "Risk appetite judgment",
      "Presenting to non-marketers (business framing, not campaign metrics)",
      "Resource allocation under uncertainty",
    ],
    keyPoint: "Budget follows strategy, not the other way around. AI can tell you what each channel historically returns. It cannot decide which bet is worth taking.",
  },
  {
    slug: "cross-functional",
    number: 8,
    title: "Cross-functional coordination",
    intro: "Working with sales, product, finance, agencies. Influence without authority. Translating marketing into other functions' language.",
    tools: [
      {
        name: "Slack / Teams",
        desc: "Where cross-functional work actually happens. Channels, threads, quick decisions. The risk is everything becoming a meeting that could have been a message, or a message that needed to be a meeting.",
        url: "https://slack.com",
      },
      {
        name: "AI meeting summaries (Otter, Fireflies, Tactiq)",
        desc: "Record meetings and get AI-generated summaries, action items, and transcripts. Useful for accountability but does not replace being present and reading the room.",
        url: "https://tactiq.io",
      },
      {
        name: "Project management (Asana, Monday, Notion)",
        desc: "Track who is doing what by when. The tool matters less than the discipline. Most marketing teams over-tool and under-communicate.",
        url: "https://asana.com",
      },
      {
        name: "Brief templates and shared docs",
        desc: "A strong brief takes 30 minutes longer to write and saves three rounds of revisions. Build a template once and use it every time. Include the problem, not just the ask.",
      },
    ],
    aiDoes: [
      "Meeting summaries and action items",
      "Status reports generated from data",
      "Slide decks drafted from briefs",
      "Follow-up emails and campaign updates",
      "Briefing documents from project data",
    ],
    marketerDoes: [
      "Build trust over time with other functions",
      "Read the room in meetings (AI cannot do this)",
      "Navigate disagreement without escalating",
      "Translate marketing language into finance, sales, and product language",
      "Write briefs that are specific enough to get good work back",
    ],
    skills: [
      "Influence without authority",
      "Translation across functions",
      "Brief writing quality",
      "Relationship building",
      "Conflict navigation",
      "Knowing when to meet vs when to message",
    ],
    keyPoint: "Each team has its own language. Finance talks in margins and payback. Sales talks in pipeline and close rates. Product talks in features and roadmap. The marketer who can translate across those conversations is genuinely valuable.",
  },
  {
    slug: "commercial-fluency",
    number: 9,
    title: "Commercial fluency",
    intro: "Connecting marketing to revenue. CAC, LTV, payback period. Reading a P&L and defending budgets in language a CFO believes.",
    tools: [
      {
        name: "P&L statements",
        desc: "Revenue, cost of goods, gross profit, operating costs (your budget lives here), operating profit. If you cannot find marketing on a P&L, you cannot defend it.",
      },
      {
        name: "Unit economics calculators",
        desc: "CAC, LTV, payback period, contribution margin. Build these in a spreadsheet. Understand how they connect: if CAC exceeds LTV, you are losing money on every customer, no matter how good the ROAS looks.",
      },
      {
        name: "Channel profitability analysis",
        desc: "Go beyond ROAS. Paid search might show 4x return but 70% is branded (people who would have bought anyway). Email might look small but has 60% repeat order margin. A busy channel and a profitable channel are not the same thing.",
      },
      {
        name: "AI for financial modelling",
        desc: "Use Claude or ChatGPT to build financial models, calculate break-even points, and stress-test assumptions. The maths is fast. The judgment on which assumptions to trust is yours.",
      },
    ],
    aiDoes: [
      "Aggregate data across channels",
      "Build dashboards and financial models",
      "Calculate metrics and spot trends",
      "Scenario modelling and forecasting",
      "Automated reporting to stakeholders",
    ],
    marketerDoes: [
      "Connect marketing activity to business outcomes a CFO cares about",
      "Defend budgets with honest evidence, not inflated metrics",
      "Distinguish busy channels from profitable ones",
      "Make hard cut decisions when something is not working",
      "Present limitations honestly (what you cannot prove)",
    ],
    skills: [
      "P&L reading and interpretation",
      "Unit economics (CAC, LTV, payback, contribution margin)",
      "Business case construction",
      "Channel profitability analysis beyond ROAS",
      "Finance conversation fluency",
      "Knowing when to kill a campaign that looks good on paper",
    ],
    keyPoint: "The question is not 'is this channel performing?' It is 'is this channel making the business more money than it is costing?' A busy channel and a profitable channel are not the same thing.",
  },
];

// Wire up prev/next navigation
export const toolBuckets: ToolBucket[] = rawBuckets.map((b, i) => ({
  ...b,
  prev: i > 0 ? { slug: rawBuckets[i - 1].slug, title: rawBuckets[i - 1].title } : undefined,
  next: i < rawBuckets.length - 1 ? { slug: rawBuckets[i + 1].slug, title: rawBuckets[i + 1].title } : undefined,
}));
