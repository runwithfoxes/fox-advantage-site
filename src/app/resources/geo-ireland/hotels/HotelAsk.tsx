"use client";

import { useState } from "react";
import s from "../../resources.module.css";

/**
 * ⛔ MOCKUP ONLY. This form posts nowhere: no course signup route, no Klaviyo, no Attio.
 * It shows the shape of the one email ask the resources make. Wiring it is a later job.
 */
export default function HotelAsk() {
  const [sent, setSent] = useState(false);
  if (sent) return <p className={s.done}>Thanks. Your hotel&rsquo;s result comes by email.</p>;
  return (
    <>
      <form
        className={s.ask}
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <input id="hotel-email" type="email" required placeholder="you@yourhotel.ie" aria-label="Work email" />
        <input id="hotel-site" type="text" required placeholder="yourhotel.ie" aria-label="Hotel website" />
        <button type="submit" aria-label="Send me the result">
          →
        </button>
      </form>
      <p className={s.asknote}>
        The only place the resources ask for an email, because the answer is about your hotel.
      </p>
    </>
  );
}
