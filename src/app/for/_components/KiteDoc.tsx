"use client";

// The test page for the prospect-page system. Kite Insurance is fictional by
// design (it is the course's worked example), so this page can carry every
// component at full fidelity and nothing on it is a real client's data.
// Build order: each new component gets proven here first.

import ProspectShell, { PPSection } from "./ProspectShell";

const SECTIONS = [
  { id: "recommend", title: "What I'd recommend" },
  { id: "pricing", title: "The price" },
  { id: "agents", title: "The agents, working" },
  { id: "website", title: "Your website, rebuilt" },
  { id: "adoption", title: "AI adoption at Kite" },
  { id: "library", title: "Your library" },
];

export default function KiteDoc() {
  return (
    <ProspectShell
      clientName="Kite Insurance"
      eyebrow="Prepared for Sarah Nolan, Kite Insurance"
      title="Build the Kite marketing team you never had"
      titleHl="Kite"
      standfirst={[
        "This page holds the proposal from our conversation on Tuesday, a working demonstration of each agent configured for Kite, and a small library of material chosen for where Kite is right now. It stays live, and anything we add lands here.",
      ]}
      sections={SECTIONS}
    >
      <PPSection id="recommend" k="01" title="What I'd recommend">
        <p className="pps-standfirst">
          Placeholder. The recommendation block lands here: the situation from
          the call, then the shortest set of pieces that answers it.
        </p>
      </PPSection>

      <PPSection id="pricing" k="02" title="The price">
        <p className="pps-standfirst">
          Placeholder. Pricing cards, what the price covers and what it does
          not, then the close box.
        </p>
      </PPSection>

      <PPSection id="agents" k="03" title="The agents, working">
        <p className="pps-standfirst">
          Placeholder. The agent windows and per-agent demos land here.
        </p>
      </PPSection>

      <PPSection id="website" k="04" title="Your website, rebuilt">
        <p className="pps-standfirst">
          Placeholder. The browser-frame rebuild with generated photography.
        </p>
      </PPSection>

      <PPSection id="adoption" k="05" title="AI adoption at Kite">
        <p className="pps-standfirst">
          Placeholder. The fluency scale, the course as the artifact, and the
          adoption and measurement story.
        </p>
      </PPSection>

      <PPSection id="library" k="06" title="Your library">
        <p className="pps-standfirst">
          Placeholder. Three to six resources chosen for Kite, named for them.
        </p>
      </PPSection>
    </ProspectShell>
  );
}
