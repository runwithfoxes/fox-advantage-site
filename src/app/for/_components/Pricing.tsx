"use client";

// The pricing block, formalised from the ARI build: one or two cards, the
// covers / does-not-cover pair, then the close box. Numbers and bullets come
// in as props; nothing here invents a price.

import "./pricing.css";

export interface PriceCard {
  label: string; // "Option A", "Part one"
  title: string;
  bullets: string[];
  price: string; // "€9,500 plus VAT"
  note?: string; // timeline / phase line under the price
  // Optional footed total. Paul's ask, 24 Aug 2026, on the Expleo build: a
  // buyer reading a setup fee and a monthly should not have to add them up
  // herself. Pass the first-period total in plain words. Older pages omit it
  // and render exactly as before.
  total?: { label: string; value: string };
  featured?: boolean;
}

export function PricingCards({ cards }: { cards: PriceCard[] }) {
  return (
    <div className="ppp-cards" data-count={cards.length}>
      {cards.map((c) => (
        <div key={c.label} className="ppp-card" data-featured={c.featured ? "1" : "0"}>
          <p className="ppp-card-label">{c.label}</p>
          <h3 className="ppp-card-title">{c.title}</h3>
          <ul className="ppp-card-list">
            {c.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <p className="ppp-card-price">{c.price}</p>
          {c.note && <p className="ppp-card-note">{c.note}</p>}
          {c.total && (
            <div className="ppp-card-total">
              <span className="ppp-card-total-k">{c.total.label}</span>
              <span className="ppp-card-total-v">{c.total.value}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function CoversGrid({
  covers,
  notCovered,
}: {
  covers: string[];
  notCovered: string[];
}) {
  return (
    <div className="ppp-covers">
      <div>
        <p className="ppp-covers-label">What the price covers</p>
        <ul>
          {covers.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="ppp-covers-label">What it doesn&rsquo;t</p>
        <ul>
          {notCovered.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CloseBox({
  clientName,
  calUrl = "https://cal.com/paul-dervan-mjfd50",
}: {
  clientName: string;
  calUrl?: string;
}) {
  const mailto = `mailto:paul@runwithfoxes.com?subject=${encodeURIComponent(
    `${clientName} - your page`
  )}`;
  return (
    <div className="ppp-close">
      <p className="ppp-close-line">
        If this looks right, the next step is a conversation, not a contract.
      </p>
      <div className="ppp-close-actions">
        <a
          className="ppp-close-btn"
          href={calUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            window.dispatchEvent(
              new CustomEvent("prospect-track", {
                detail: { type: "open", name: "book-a-chat" },
              })
            )
          }
        >
          Book a time to chat
        </a>
        <a className="ppp-close-mail" href={mailto}>
          or email Paul directly
        </a>
      </div>
    </div>
  );
}
