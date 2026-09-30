import SiteFooter from "@/components/SiteFooter";
import NextNav from "@/app/home-next/NextNav";
import c from "./contact.module.css";

export const metadata = {
  title: "Contact - Run with Foxes",
  description: "Get in touch with Paul Dervan.",
};

/* Rebuilt 30 Sep 2026 on Paul's word ("We have an old page link here"), in the About page's style. The
   words are the old page's own: nothing new was written. Every line is a real link now; on the old page
   only the word "chat" looked like one. */
export default function ContactPage() {
  return (
    <div className="contact-page">
      <NextNav bar />

      <main className={c.main}>
        <div className={c.inner}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={c.photo} src="/Paul_photo.jpg" alt="Paul Dervan" />
          <div>
            <span className={c.lab}>/contact</span>
            <h1 className={c.title}>Get in touch</h1>
            <a className={c.book} href="https://cal.com/paul-dervan-mjfd50" target="_blank" rel="noopener noreferrer">
              Book a 30-minute strategy chat &rarr;
            </a>
            <ul className={c.rows}>
              <li className={c.row}>
                <span className={c.rowLab}>Email</span>
                <a className={c.rowVal} href="mailto:paul@runwithfoxes.com">paul@runwithfoxes.com</a>
              </li>
              <li className={c.row}>
                <span className={c.rowLab}>LinkedIn</span>
                <a className={c.rowVal} href="https://www.linkedin.com/in/pauldervan/" target="_blank" rel="noopener noreferrer">linkedin.com/in/pauldervan</a>
              </li>
              <li className={c.row}>
                <span className={c.rowLab}>Substack</span>
                <a className={c.rowVal} href="https://runwithfoxes.substack.com" target="_blank" rel="noopener noreferrer">runwithfoxes.substack.com</a>
              </li>
              <li className={c.row}>
                <span className={c.rowLab}>Chat</span>
                <span className={c.rowVal}>Talk to Isa, bottom right of any page</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <SiteFooter current="/contact" />
    </div>
  );
}
