/* The words and the figures for /mkt46310. Written 9 Oct 2026 from Nicky's brief
   (paul-hub clients/ucd/courses/mkt46310-harriet/dray-brief-module-page.md).

   EVERY FIGURE here is from digital-marketing-job-ads-findings.md at paul-hub commit
   c06f30a51, which Cato cleared. Never take a number from anywhere else. The job site the
   ads came from is never named. The marks are a portfolio worth 20% and an exam worth 80%
   that must be passed. The exam date and venue stay off the page. */

export const ADS = 85;

/* Findings section 2. Jobs of 85 that ask for each kind of work. */
export const WORK: [string, number][] = [
  ["Reporting on results", 73],
  ["Content and copywriting", 59],
  ["Social media, unpaid", 54],
  ["The website", 42],
  ["Paid advertising of any kind", 40],
  ["Email", 34],
  ["SEO", 31],
  ["Paid social", 30],
  ["Managing agencies", 30],
  ["Paid search", 25],
  ["Photo and video", 25],
  ["CRM", 24],
  ["Testing", 24],
  ["Web analytics", 23],
  ["Ecommerce", 18],
  ["Holding a budget", 15],
];

/* Findings section 3. Jobs of 85 that name each tool. */
export const TOOLS: [string, number][] = [
  ["Canva", 21],
  ["Google Ads", 21],
  ["Adobe Creative Suite", 17],
  ["Google Analytics", 16],
  ["Meta's ad tools", 16],
  ["CapCut", 11],
  ["Shopify", 7],
  ["TikTok ads", 7],
];

/* Findings section 7. Word for word from the ads. The employer is left off. */
export const QUOTES: string[] = [
  "Act as a strong agency lead, setting direction, challenging performance and ensuring value for money, while agencies execute the operational delivery.",
  "Own content end to end: idea, capture, edit, caption, approval, scheduling and publishing.",
  "Every performance review should answer four questions: What happened? Why did it happen? What did we learn? What are we testing next?",
  "Improve brand visibility within AI-generated search results and answer engines.",
];

export const PILLARS: { name: string; what: string; ads: string }[] = [
  {
    name: "Tools",
    what: "The tools a digital marketer uses today, such as a website, Google Ads, Google Analytics, Meta ads, email and a CRM. And the AI tools: Claude and marketing agents.",
    ads: "Almost everything in the job ads is here.",
  },
  {
    name: "Knowledge",
    what: "The fundamentals of marketing. They stay the same when the tools change.",
    ads: "The job ads do not ask for it.",
  },
  {
    name: "Behaviour",
    what: "The five behaviours of marketers who do well. We come back to them in every class.",
    ads: "The job ads ask for it in a few stock words.",
  },
];

export const BEHAVIOURS: [string, string][] = [
  ["Poke", "Be curious. When something looks odd, look into it. Do not stop at the first answer that sounds right."],
  ["Skeptically optimistic", "AI gives answers that sound sure of themselves. Ask where an answer came from before you build a plan on it."],
  ["Do the reps", "You get good judgment by doing the work yourself, many times. Reading about it is not enough."],
  ["Build", "Make the real thing. Do not only describe it. A page you can click is worth twenty slides about a page."],
  ["Become a multi-tool marketer", "Be able to do enough different jobs that you can finish a piece of work without waiting on a line of other people."],
];

export const MAKE: string[] = [
  "A clear answer to two questions: who does your agency sell to, and what do you say to them?",
  "A plan that explains how your agency will get customers.",
  "A website for your agency. You design it, write the words and make the pictures.",
  "Work that helps your agency show up when people ask an AI tool such as ChatGPT for a recommendation. This is called GEO.",
  "Messages to companies that could become your customers. This is called outbound. The companies are made up and you will not send the messages to anyone.",
  "At least three marketing agents that work for your agency. A marketing agent is an AI that does a marketing job for you. Your team chooses which jobs.",
];

export const PROJECT_DATES: [string, string][] = [
  ["Monday 12 October", "The project is explained. Teams are set."],
  ["Monday 19 October", "Your team chooses its marketing agents. You set up Claude on your laptop in class."],
  ["2 and 9 November", "You build the website and do the GEO, the paid search plan, the ads and the posts."],
  ["Later in November", "You set up your customers in Attio, write your outbound messages and write your emails in Klaviyo. The days are to be confirmed."],
  ["The last class", "Each team presents its agency to the class. The day is to be confirmed."],
];

export type Row = [label: string, text: string];
export type Klass = { name: string; when: string; where?: string; pillar: string; rows: Row[] };

export const CLASSES: Klass[] = [
  {
    name: "What Employers Want",
    when: "Monday 12 October, 13:30 to 15:30",
    where: "Room N304",
    pillar: "All three",
    rows: [
      ["In this class", "What Irish employers ask for in digital marketing job ads, and what a digital marketing job is today. The three pillars the module is built on. The five behaviours of successful marketers."],
      ["For your agency", "The project is explained and teams of four or five are formed."],
    ],
  },
  {
    name: "Marketing Fundamentals, Part 1",
    when: "Monday 19 October, 10:30 to 12:30",
    where: "Room N304",
    pillar: "Knowledge",
    rows: [
      ["In this class", "Insights about the customer, positioning and messaging frameworks. The fundamentals of marketing stay the same when the tools change."],
      ["For your agency", "Your team decides who the agency sells to and what it says to them. You need this before you write your website."],
    ],
  },
  {
    name: "Marketing Fundamentals, Part 2",
    when: "Monday 19 October, 13:30 to 15:30",
    pillar: "Knowledge",
    rows: [
      ["In this class", "How marketing works and how brands grow. Mental availability, distinctive brand assets, the importance of reach, market penetration, and the different categories of marketing measurement."],
      ["For your agency", "Your team sets out how the agency plans to get customers."],
    ],
  },
  {
    name: "Building Your Agent Team",
    when: "Monday 19 October, 16:00 to 18:00",
    pillar: "Tools",
    rows: [
      ["In this class", "What a marketing agent is, how to write a job an agent can do, and where a person has to stay in charge. We look at a real team of four agents built for a gym in Madrid, and how work passes from one to the next."],
      ["For your agency", "Your team chooses at least three marketing agents and says what job each one has. We set up Claude in class, so bring a laptop."],
    ],
  },
  {
    name: "Websites",
    when: "Monday 2 November, 13:30 to 15:30",
    pillar: "Tools",
    rows: [
      ["How it is done today", "How a company runs its website, the pages, the copy, and getting more visitors to buy, book or get in touch."],
      ["How it is done with AI", "Building and changing a website in Claude by asking."],
      ["Analytics", "How many people come, where they come from, and how many take the action you want."],
      ["For your agency", "You build the agency's website, with its copy, artwork and imagery. It is also a service your agency sells to clients."],
    ],
  },
  {
    name: "SEO and AI Search (GEO)",
    when: "Monday 2 November, 16:00 to 18:00",
    pillar: "Tools",
    rows: [
      ["How it is done today", "How people find a company in search, keywords, the long tail, and what makes a page rank."],
      ["How it is done with AI", "GEO. How AI answers choose which brands to name, how to check where a brand shows up, and how to improve it."],
      ["Analytics", "Rankings, visits from search, and how often a brand is named in AI answers."],
      ["For your agency", "You do GEO for your own site. SEO and GEO are services your agency sells."],
    ],
  },
  {
    name: "Paid Search",
    when: "Monday 9 November, 13:30 to 15:30",
    pillar: "Tools",
    rows: [
      ["How it is done today", "Google Ads is one of the tools employers name most. Keywords, bids, cost per click, writing a search ad, and the page the ad leads to."],
      ["How it is done with AI", "An agent that finds new terms, writes new ads and adjusts bids every day."],
      ["Analytics", "Cost per click, cost per lead and return on ad spend."],
      ["For your agency", "A paid search plan to bring clients to the agency, and one your agency could sell to a client. No money is spent."],
    ],
  },
  {
    name: "Paid Social and Content",
    when: "Monday 9 November, 16:00 to 18:00",
    pillar: "Tools",
    rows: [
      ["How it is done today", "Meta, LinkedIn and TikTok. Running the social accounts, making the content, and what makes an ad work."],
      ["How it is done with AI", "Using AI to write and make ads and posts, and to change them quickly."],
      ["Analytics", "Reach, cost per thousand and clicks."],
      ["For your agency", "Ads and posts for the agency. Nothing is paid for."],
    ],
  },
  {
    name: "CRM",
    when: "Week of 16 November, date to be confirmed",
    pillar: "Tools",
    rows: [
      ["How it is done today", "What a customer database is for, how a company records the people and companies it sells to, the sales pipeline and its stages, and why the data has to be kept clean. We use Attio."],
      ["How it is done with AI", "An agent that keeps the records up to date."],
      ["Analytics", "How many prospects are at each stage, how many move on, and how long a sale takes."],
      ["For your agency", "Your agency's prospects in Attio, from made-up data that every team is given. A CRM agent if your team chooses one."],
    ],
  },
  {
    name: "Outbound",
    when: "Week of 16 November, date to be confirmed",
    pillar: "Tools",
    rows: [
      ["How it is done today", "How a company approaches people who have not asked to hear from it. Choosing who to approach, researching them first, and a short run of messages by email and LinkedIn."],
      ["How it is done with AI", "Research on each company done by an agent, and a first message written from that research."],
      ["Analytics", "How many replied and how many agreed to a meeting."],
      ["For your agency", "An outbound sequence for the agency, written and logged. Nothing is sent to real people."],
    ],
  },
  {
    name: "Email",
    when: "Week of 23 November, date to be confirmed",
    pillar: "Tools",
    rows: [
      ["How it is done today", "Lists and how people join them, automatic emails such as a welcome series, campaigns, and writing an email people open. We use Klaviyo."],
      ["How it is done with AI", "An agent that drafts the emails, tests them and chooses which group of people gets each one."],
      ["Analytics", "Open rate, click rate, unsubscribes and sales."],
      ["For your agency", "Your agency's list in Klaviyo, from made-up data that every team is given. An email agent if your team chooses one."],
    ],
  },
  {
    name: "Agency Presentations and Exam Preparation",
    when: "Date to be confirmed",
    pillar: "All three",
    rows: [
      ["In this class", "Each team presents its agency: who it sells to and what it says, how it plans to get customers, its website, and its marketing agents working together."],
      ["Then", "Exam preparation: the format of the exam, a sample question, and how an answer is marked."],
    ],
  },
];
