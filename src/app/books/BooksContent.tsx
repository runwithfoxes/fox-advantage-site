"use client";

import Image from "next/image";

interface Book {
  title: string;
  author: string;
  year: string;
  description: string;
  link: string;
}

const books: Record<string, Book[]> = {
  "Byron Sharp": [
    {
      title: "How Brands Grow: What Marketers Don't Know",
      author: "Byron Sharp",
      year: "2010",
      description:
        "This book provides evidence-based answers to the key questions asked by marketers every day. Tackling issues such as how brands grow, how advertising really works, what price promotions really do, and how loyalty programs really affect loyalty. Based on decades of research that has progressively uncovered scientific laws about buying and brand performance.",
      link: "https://www.amazon.com/How-Brands-Grow-What-Marketers/dp/0195573560",
    },
  ],
  "Jenni Romaniuk": [
    {
      title: "How Brands Grow Part 2",
      author: "Jenni Romaniuk & Byron Sharp",
      year: "2016 (Revised 2021)",
      description:
        "Takes readers further on a journey to smarter, evidence-based marketing. Covers the fundamentals of buying behaviour and brand performance, how to build Mental Availability, metrics to assess Distinctive Assets, and a framework for Physical Availability. A must-read for marketers in emerging markets, services, durables, B2B, and luxury categories.",
      link: "https://www.amazon.com/How-Brands-Grow-Revised-Including/dp/0190330023",
    },
    {
      title: "Building Distinctive Brand Assets",
      author: "Jenni Romaniuk",
      year: "2018",
      description:
        "A book about future-proofing your brand's identity. It will help you set up a long-term strategy to build your Distinctive Assets and give you tips on how to protect them. Explores strategy, tactics, and insights from a wide range of asset types including celebrities, taglines, jingles, and advertising-based assets.",
      link: "https://www.amazon.com/Building-Distinctive-Brand-Assets-Romaniuk/dp/0190311509",
    },
    {
      title: "Better Brand Health: Measures and Metrics for a How Brands Grow World",
      author: "Jenni Romaniuk",
      year: "2023",
      description:
        "A book about brand health concepts, measures, and metrics. It will help you improve your existing brand health tracker or set up a new one. Gain new insights into well-known metrics such as brand awareness and brand attitude, and learn how to work with newer metrics such as Mental Availability.",
      link: "https://www.amazon.co.uk/Better-Brand-Health-Measures-Metrics/dp/0190340908",
    },
  ],
  "Les Binet & Peter Field": [
    {
      title: "The Long and the Short of It",
      author: "Les Binet & Peter Field",
      year: "2013",
      description:
        "Examines the impact of timescales of effect, exploring the tension between long and short-term strategies for brands and businesses. Provides evidence-based recommendations on how best to approach investment in advertising. The IPA data suggests the optimum balance between brand building and sales activation is around 60:40.",
      link: "https://www.amazon.com/Long-Short-Balancing-Long-Term-Strategies/dp/085294134X",
    },
    {
      title: "Media in Focus: Marketing Effectiveness in the Digital Era",
      author: "Les Binet & Peter Field",
      year: "2017",
      description:
        "Takes the changing media landscape as its focus. Addresses: Does mass marketing still work? Is tight targeting now the most efficient approach? Is unpaid making paid media redundant? Challenges the industry to reconsider approaches to efficiency, ROMI, and measurement strategy.",
      link: "https://www.amazon.com/Media-Focus-Marketing-Effectiveness-Digital/dp/0852941412",
    },
    {
      title: "Effectiveness in Context: A Manual for Brand Building",
      author: "Les Binet & Peter Field",
      year: "2018",
      description:
        "Uses evidence from hundreds of IPA Effectiveness Awards case histories to show how successful marketing strategy is shaped by the context in which brands and businesses operate. Shows how marketers can adapt general principles to their particular brand context.",
      link: "https://www.amazon.com/Effectiveness-Context-Manual-Brand-Building/dp/0852941455",
    },
  ],
  "Paul Feldwick": [
    {
      title: "The Anatomy of Humbug: How to Think Differently About Advertising",
      author: "Paul Feldwick",
      year: "2015",
      description:
        "Deftly and entertainingly picks apart the historical roots of our common, and often contradictory, beliefs about advertising. Creates space for a more flexible, creative, and effective approach. Outlines six theories of how advertising works: salesmanship, seduction, salience, social connection, spin, and showbiz.",
      link: "https://www.amazon.com/Anatomy-Humbug-Think-Differently-Advertising/dp/1784621927",
    },
    {
      title: "Why Does The Pedlar Sing?: What Creativity Really Means in Advertising",
      author: "Paul Feldwick",
      year: "2021",
      description:
        "Throughout history, selling and entertainment have gone hand in hand. We now understand better than ever the psychological reasons why apparent frivolity creates serious business benefits. Yet the advertising business today seems reluctant to embrace its powerful links with popular culture. This book shows why people do buy from clowns.",
      link: "https://www.amazon.com/Does-Pedlar-Sing-Paul-Feldwick/dp/1800462522",
    },
  ],
  "Adam Morgan": [
    {
      title: "Eating the Big Fish: How Challenger Brands Can Compete Against Brand Leaders",
      author: "Adam Morgan",
      year: "1999 (2nd Edition 2009)",
      description:
        "The international bestseller that introduced the concept of challenger brands to marketing. Examines forty successful challenger brands that achieved rapid growth despite limited resources. Outlines eight key credos including: break with the immediate past, build a lighthouse identity, assume thought leadership, and sacrifice.",
      link: "https://www.amazon.com/Eating-Big-Fish-Challenger-Compete/dp/0470238275",
    },
    {
      title: "The Pirate Inside: Building a Challenger Brand Culture Within Yourself and Your Organization",
      author: "Adam Morgan",
      year: "2004",
      description:
        "Challenger brands don't rely on CEOs or founders alone, but on people whose personal qualities make the difference between gold and dust. A book for 'Necessary Pirates' who must leave the way their category has historically done things in order to succeed. Shows nine ways of behaving that stimulate challenger brand cultures.",
      link: "https://www.amazon.com/Pirate-Inside-Building-Challenger-Organization/dp/0470860820",
    },
    {
      title: "A Beautiful Constraint: How To Transform Your Limitations Into Advantages",
      author: "Adam Morgan & Mark Barden",
      year: "2015",
      description:
        "About everyday, practical inventiveness for constrained times. Shows how to take the issues we all face today, lack of time, money, resources, attention, and see in them the opportunity for transformation. Based on 35 interviews from Nike, IKEA, the U.S. Navy, Formula One engineers, and barley farmers in South Africa.",
      link: "https://www.amazon.com/Beautiful-Constraint-Transform-Limitations-Advantages/dp/1118899016",
    },
    {
      title: "Overthrow II: 10 Strategies from the New Wave of Challengers",
      author: "Adam Morgan & Malcolm Devoy",
      year: "2019",
      description:
        "A provocative and practical guide to the narrative you need to be a compelling challenger brand. Identifies 10 different challenger types including Real & Human, Feisty Underdog, Local Hero, Next Generation, and Dramatic Disruptor. Features Oatly, BrewDog, Tony's Chocolonely, Mailchimp, Monzo, and Who Gives A Crap.",
      link: "https://www.amazon.com/Overthrow-II-strategies-wave-challengers-ebook/dp/B07V4M8815",
    },
  ],
  "Phil Barden": [
    {
      title: "Decoded: The Science Behind Why We Buy",
      author: "Phil Barden",
      year: "2013",
      description:
        "Reveals what decision science explains about people's purchase behaviour. Shows the latest research on the motivations behind consumers' choices and what happens in the brain as buyers make decisions. Deciphers the 'secret codes' of products, services, and brands to explain why people buy them. One of the earliest books to apply neuroscience and behavioural economics to marketing.",
      link: "https://www.amazon.com/Decoded-Science-Behind-Why-Buy/dp/1118345606",
    },
  ],
  "David Taylor": [
    {
      title: "The brandgym: A Practical Workout for Growing Brands in a Digital Age",
      author: "David Taylor",
      year: "2017",
      description:
        "A major re-write for the digital age, this third edition provides practical, hands-on brand-building tools. David Taylor has been named one of the world's 50 leading marketing thinkers by the CIM. Based on real-world consulting work with leading brands.",
      link: "https://www.amazon.com/Brandgym-Practical-Workout-Growing-Digital/dp/1910453366",
    },
    {
      title: "Grow the Core",
      author: "David Taylor",
      year: "2013",
      description:
        "Focuses on the most important source of growth for most businesses: their core brand. Shows how to drive profitable growth by strengthening what you already have, rather than chasing shiny new things. Practical frameworks for brand extension and portfolio strategy.",
      link: "https://www.amazon.com/Grow-Core-Profit-Driven-Brand-Building/dp/1118484711",
    },
    {
      title: "Where's the Sausage?",
      author: "David Taylor",
      year: "2007",
      description:
        "Cuts through marketing fluff to focus on the product truth at the heart of great brands. Shows how to build brands by starting with real product substance, not just clever positioning. Practical, no-nonsense approach to brand building.",
      link: "https://www.amazon.com/Wheres-Sausage-David-Taylor/dp/1906465037",
    },
  ],
  "Douglas Holt": [
    {
      title: "How Brands Become Icons: The Principles of Cultural Branding",
      author: "Douglas Holt",
      year: "2004",
      description:
        "The first systematic model to explain how brands become icons. Based on analyses of America's most successful iconic brands including ESPN, Mountain Dew, Volkswagen, Budweiser, and Harley-Davidson. Shows how iconic brands create 'identity myths' that soothe collective anxieties resulting from social change.",
      link: "https://www.amazon.com/How-Brands-Become-Icons-Principles/dp/1578517745",
    },
    {
      title: "Cultural Strategy: Using Innovative Ideologies to Build Breakthrough Brands",
      author: "Douglas Holt & Douglas Cameron",
      year: "2010",
      description:
        "Challenges conventional brand wisdom: champion a better ideology and the world will take notice. Shows how brands in mature categories get locked into cultural mimicry. Draws on Nike, Marlboro, Starbucks, Jack Daniels, vitaminwater, and Ben & Jerry's to show how cultural innovation leapfrogs entrenched incumbents.",
      link: "https://www.amazon.com/Cultural-Strategy-Innovative-Ideologies-Breakthrough/dp/0199655855",
    },
  ],
  "Andy Nairn": [
    {
      title: "Go Luck Yourself: 40 Ways to Stack the Odds in Your Brand's Favour",
      author: "Andy Nairn",
      year: "2021",
      description:
        "Luck is a four-letter word in business circles. But fortune plays a part in every success story. From the founder of Lucky Generals, this book shows how to uncover hidden treasures, spot opportunities in unexpected places, and turn misfortune into good fortune. Royalties go to Commercial Break, helping working-class kids into creative industries.",
      link: "https://www.amazon.com/Go-Luck-Yourself-brands-favour/dp/0857198882",
    },
  ],
  "Jim Taylor & Steve Hatch": [
    {
      title: "Rigorous Magic: Communication Ideas and Their Application",
      author: "Jim Taylor & Steve Hatch",
      year: "2009",
      description:
        "Brings science to the art of ideas. Dispels myths around communication ideas and creates a practical road map for marketers. Covers 7 main types of communication ideas with examples. Only through rigorous cataloguing and evaluation can ideas be understood and the right ones selected.",
      link: "https://www.amazon.com/Rigorous-Magic-Communication-Application-Author/dp/B00LXJU3H2",
    },
  ],
  "Ethan Mollick": [
    {
      title: "Co-Intelligence: Living and Working with AI",
      author: "Ethan Mollick",
      year: "2024",
      description:
        "New York Times bestseller from the Wharton professor behind the One Useful Thing newsletter. Urges us not to turn away from AI, but to invite it to the table as co-worker, co-teacher, and coach. Demonstrates how AI can amplify human capacities and assesses its impact on business and organisations.",
      link: "https://www.amazon.com/Co-Intelligence-Living-Working-Ethan-Mollick/dp/059371671X",
    },
  ],
  "Lisa Feldman Barrett": [
    {
      title: "How Emotions Are Made: The Secret Life of the Brain",
      author: "Lisa Feldman Barrett",
      year: "2017",
      description:
        "Pioneering research that overturns the belief that emotions are automatic, universal, and hardwired in different brain regions. Emotions aren't pre-programmed; they are psychological experiences we construct based on personal history, physiology, and environment. Essential reading for anyone in communications trying to understand how people actually feel.",
      link: "https://www.amazon.com/How-Emotions-Are-Made-Secret/dp/0544133315",
    },
    {
      title: "Seven and a Half Lessons About the Brain",
      author: "Lisa Feldman Barrett",
      year: "2020",
      description:
        "Seven short essays revealing mind-expanding lessons from the front lines of neuroscience. Learn where brains came from, how they're structured, and how yours works with other brains. Dismisses popular myths like the 'lizard brain' and the alleged battle between thoughts and emotions.",
      link: "https://www.amazon.com/Seven-Half-Lessons-About-Brain/dp/0358157145",
    },
  ],
  "Daniel Kahneman": [
    {
      title: "Thinking, Fast and Slow",
      author: "Daniel Kahneman",
      year: "2011",
      description:
        "The Nobel laureate's masterwork on how two systems in your brain fight over control of your behaviour. System 1 is fast, intuitive, emotional. System 2 is slow, deliberate, logical. Shows how this leads to errors in memory, judgment, and decisions. The introduction to behavioural science for a generation of marketers.",
      link: "https://www.amazon.com/Thinking-Fast-Slow-Daniel-Kahneman/dp/0374533555",
    },
    {
      title: "Noise: A Flaw in Human Judgment",
      author: "Daniel Kahneman, Olivier Sibony & Cass R. Sunstein",
      year: "2021",
      description:
        "Noise is variability in judgments that should be identical. Two doctors giving different diagnoses to identical patients. Two judges giving different sentences for matching crimes. The same person making different decisions on Monday versus Wednesday. Shows how noise produces errors in medicine, law, hiring, and strategy.",
      link: "https://www.amazon.com/Noise-Human-Judgment-Daniel-Kahneman/dp/0316451401",
    },
  ],
  "Rory Sutherland": [
    {
      title: "Alchemy: The Dark Art and Curious Science of Creating Magic in Brands, Business, and Life",
      author: "Rory Sutherland",
      year: "2019",
      description:
        "Thirty years of fieldwork inside consumer capitalism from the Vice Chairman of Ogilvy UK. Reveals why abandoning logic is sometimes the best way to solve problems. We are not rational creatures who make logical decisions based on evidence. The best ideas don't make rational sense; they make you feel more than they make you think.",
      link: "https://www.amazon.com/Alchemy-Curious-Science-Creating-Business/dp/006238841X",
    },
  ],
  "Orlando Wood": [
    {
      title: "Lemon: How the Advertising Brain Turned Sour",
      author: "Orlando Wood",
      year: "2019",
      description:
        "Blends neuroscience, behavioural science, and cultural history to explain why advertising effectiveness has declined over 15 years. Shows how left-brain thinking has spread across marketing and is to blame. Characters, animals, human connection, and music build brands. Product close-ups, words on screen, and the stare make people look away.",
      link: "https://www.amazon.com/Lemon-How-advertising-brain-turned/dp/0852941439",
    },
    {
      title: "Look Out: Advertising's Effectiveness Problem Is Staring Us in the Face",
      author: "Orlando Wood",
      year: "2021",
      description:
        "If Lemon was the diagnosis, Look Out is the treatment. To create effective advertising that builds brands, capture 'broad-beam' attention. Traces how society's attention has narrowed in the digital age through an analysis of 'the stare', which is detrimental to culture, society, and advertising itself. The playbook for rebuilding lost effectiveness.",
      link: "https://www.amazon.com/Look-out-Orlando-Wood/dp/0852941536",
    },
  ],
};

export default function BooksContent() {
  return (
    <main className="books-page">
      <div className="books-container">
        <header className="books-header">
          <div className="header-content">
            <span className="section-label">// recommended_reading</span>
            <h1>Books for Marketers</h1>
            <p className="books-intro">
              These are the books I recommend to my students at UCD Smurfit.
              Evidence-based marketing, brand building, advertising effectiveness,
              and challenger strategy. No fluff.
            </p>
          </div>
          <div className="header-fox">
            <Image
              src="/fox/fox-book.png"
              alt="Grumpy fox with book"
              width={180}
              height={250}
              className="fox-img"
            />
          </div>
        </header>

        {Object.entries(books).map(([authorName, authorBooks]) => (
          <section key={authorName} className="author-section">
            <h2 className="author-name">{authorName}</h2>
            <div className="books-list">
              {authorBooks.map((book) => (
                <article key={book.title} className="book-card">
                  <h3 className="book-title">
                    <a href={book.link} target="_blank" rel="noopener noreferrer">
                      {book.title}
                    </a>
                  </h3>
                  <div className="book-meta">
                    <span className="book-author">{book.author}</span>
                    <span className="book-year">{book.year}</span>
                  </div>
                  <p className="book-description">{book.description}</p>
                </article>
              ))}
            </div>
          </section>
        ))}

        <footer className="books-footer">
          <p>More recommendations coming soon.</p>
        </footer>
      </div>

      <style jsx>{`
        .books-page {
          min-height: 100vh;
          background: var(--bg, #FAFAF8);
          padding: 80px 24px;
        }

        .books-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .books-header {
          margin-bottom: 64px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 48px;
        }

        .header-content {
          flex: 1;
          max-width: 600px;
        }

        .header-fox {
          flex-shrink: 0;
          margin-top: 20px;
        }

        @media (max-width: 768px) {
          .books-container {
            max-width: 720px;
          }
          .header-fox {
            display: none;
          }
        }

        .section-label {
          font-family: var(--mono);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #F47521;
          display: block;
          margin-bottom: 16px;
        }

        .books-header h1 {
          font-family: var(--sans);
          font-size: clamp(28px, 5vw, 44px);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: #1D1B1B;
          margin: 0 0 24px 0;
        }

        .books-intro {
          font-family: var(--mono);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.85;
          color: #1D1B1B;
          max-width: 600px;
        }

        .author-section {
          margin-bottom: 40px;
        }

        .author-name {
          font-family: var(--sans);
          font-size: clamp(20px, 3vw, 28px);
          font-weight: 400;
          letter-spacing: -0.01em;
          color: #1D1B1B;
          margin: 0 0 24px 0;
          padding-bottom: 12px;
          border-bottom: 1px solid #E0E0DC;
        }

        .books-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .book-card {
          padding-left: 16px;
          border-left: 2px solid #E0E0DC;
        }

        .book-card:hover {
          border-left-color: #F47521;
        }

        .book-title {
          font-family: var(--mono);
          font-size: 16px;
          font-weight: 400;
          margin: 0 0 8px 0;
        }

        .book-title a {
          color: #1D1B1B;
          text-decoration: none;
        }

        .book-title a:hover {
          color: #F47521;
        }

        .book-meta {
          font-family: var(--mono);
          font-size: 12px;
          color: #8A8A85;
          margin-bottom: 12px;
          display: flex;
          gap: 16px;
        }

        .book-description {
          font-family: var(--mono);
          font-size: 14px;
          font-weight: 300;
          line-height: 1.8;
          color: #1D1B1B;
          margin: 0;
        }

        .books-footer {
          margin-top: 64px;
          padding-top: 32px;
          border-top: 1px solid #E0E0DC;
        }

        .books-footer p {
          font-family: var(--mono);
          font-size: 13px;
          color: #8A8A85;
          font-style: italic;
        }
      `}</style>
    </main>
  );
}
