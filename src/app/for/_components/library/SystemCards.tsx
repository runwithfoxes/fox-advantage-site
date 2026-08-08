"use client";

// The system exhibit (Paul, 8 Aug late): for proposals where the website
// matters, the website inside a big window like the homepage's film box, the
// chatbot as its own card, outbound as its own card, dotted connectors
// showing they are one linked machine. Slip-in / slip-out like the rest.
//
// The website slot is a real iframe. On this test page it holds the
// dataintelligence site, our own build and Paul's named standard of finish;
// a client's page gets their rebuilt site in the same slot. The outbound
// card is the live OutreachWindow; the chatbot card is a small recorded
// exchange in the site's chat register.

import { OutreachWindow, type OutreachThread } from "./AgentWindows";
import "./system-cards.css";

const THREADS: OutreachThread[] = [
  {
    name: "Ruth Carmody",
    company: "Director · Carmody & Lyle",
    message:
      "Hi Ruth - saw the two new commercial accounts this quarter. Same-day quotes, no re-keying. Worth a look?",
    reply: "Send me the portal login, I'll look this week.",
  },
  {
    name: "Michael Doran",
    company: "Broker Principal · Doran Cover",
    message:
      "Hi Michael - brokers are chasing quote turnaround right now. Same-day on commercial and fleet. Quick call?",
    reply: "Yes - Thursday afternoon works.",
  },
];

export default function SystemCards({
  siteUrl = "https://data-intelligence-eight.vercel.app/",
  siteLabel = "data-intelligence.ie",
}: {
  siteUrl?: string;
  siteLabel?: string;
}) {
  return (
    <div className="ppsy">
      <div className="ppsy-stage">
        {/* the connectors: two short dashed bridges across the gutter. The
            card labels carry the words; the wires carry the direction. */}
        <svg className="ppsy-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
          <path className="ppsy-wire" d="M63.2,26 C65,26 65,32 66.4,32" />
          <path className="ppsy-wire" d="M66.4,74 C65,74 65,68 63.2,68" />
        </svg>

        <div className="ppsy-site">
          <div className="ppsy-browser">
            <div className="ppsy-browserbar">
              <span className="ppsy-dots">
                <i />
                <i />
                <i />
              </span>
              <span className="ppsy-url">{siteLabel}</span>
              <span className="ppsy-live">live</span>
            </div>
            <div className="ppsy-frame">
              <iframe src={siteUrl} title="The website, live" />
            </div>
          </div>
          <p className="ppsy-cardlbl">The website</p>
        </div>

        <div className="ppsy-side">
          <div className="ppsy-chatcard">
            <div className="ppw-tl">
              <i />
              <i />
              <i />
              <span className="ppw-t">the chatbot</span>
              <span className="ppw-live-pill">always on</span>
            </div>
            <div className="ppsy-chatbody">
              <p className="ppsy-msg ppsy-them">Do you handle commercial fleet?</p>
              <p className="ppsy-msg ppsy-us">
                We do, same-day quotes. I can book you fifteen minutes with the
                broker desk, tomorrow at 10 is free.
              </p>
              <p className="ppsy-booked">meeting booked · calendar</p>
            </div>
            <p className="ppsy-cardlbl">Answers, books the meeting</p>
          </div>

          <div className="ppsy-outbound">
            <OutreachWindow threads={THREADS} title="outbound" sentLabel="96 sent" />
            <p className="ppsy-cardlbl">Outbound, filling the top</p>
          </div>
        </div>
      </div>
      <p className="ppsy-hint">
        <span className="ppsy-slash">/one system, three machines.</span>{" "}
        Outbound starts the conversations and sends people to the site, the
        site is built to be worth arriving at, and the chatbot meets every
        visitor and books the meeting. The site in the window is live, one we
        built and run; a Kite page would carry Kite&rsquo;s, built to the same
        standard.
      </p>
    </div>
  );
}
