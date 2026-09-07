import Link from "next/link";

export const metadata = {
  title: "Contact - Run with Foxes",
  description: "Get in touch with Paul Dervan.",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <header className="top-bar">
        <Link href="/" className="logo">
          /<span>Run</span>withfoxes
        </Link>
        <nav>
          <Link href="/#projects">/projects</Link>
          <Link href="/contact" className="active">/contact</Link>
          <Link href="/#signup" className="cta-bar">
            /get_the_book
          </Link>
        </nav>
      </header>

      <main className="contact-main">
        <div className="contact-inner">
          <div className="section-label">/contact</div>
          <h1 className="contact-heading">Get in touch</h1>

          <div className="contact-channels">
            <div className="contact-item">
              <a href="https://cal.com/paul-dervan-mjfd50" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-label">\calendar</div>
                <div className="contact-value">Book a 30-minute strategy <span className="contact-book-link">chat</span></div>
              </a>
            </div>

            <div className="contact-item">
              <a href="mailto:paul@runwithfoxes.com" className="contact-link">
                <div className="contact-label">\email</div>
                <div className="contact-value">paul@runwithfoxes.com</div>
              </a>
            </div>

            <div className="contact-item">
              <a href="https://www.linkedin.com/in/pauldervan/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-label">\linkedin</div>
                <div className="contact-value">linkedin.com/in/pauldervan</div>
              </a>
            </div>

            <div className="contact-item">
              <a href="https://runwithfoxes.substack.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-label">\substack</div>
                <div className="contact-value">runwithfoxes.substack.com</div>
              </a>
            </div>

            <div className="contact-item">
              <Link href="/" className="contact-link">
                <div className="contact-label">\chatbot</div>
                <div className="contact-value">Talk to Isa on runwithfoxes.com - bottom right of any page</div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="bottom-bar">
        <Link href="/" className="active">← back</Link>
        <Link href="/#projects">/projects</Link>
        <Link href="/contact">/contact</Link>
        <Link href="/#signup" className="cta-bar">get the book</Link>
      </div>
    </div>
  );
}
