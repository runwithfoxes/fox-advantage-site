"use client";

import { useState, useTransition } from "react";
import { verifyPassword } from "./actions";
import PlanTab from "./tabs/PlanTab";
import ArchitectureTab from "./tabs/ArchitectureTab";
import BriefingTab from "./tabs/BriefingTab";

type Tab = "plan" | "architecture" | "briefing";

export default function ChiefClient({ initialAuth }: { initialAuth: boolean }) {
  const [authed, setAuthed] = useState(initialAuth);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<Tab>("plan");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      const ok = await verifyPassword(password);
      if (ok) {
        setAuthed(true);
      } else {
        setError("Wrong password.");
        setPassword("");
      }
    });
  }

  if (!authed) {
    return (
      <div className="chief-gate">
        <div className="chief-gate-inner">
          <div className="logo">
            /<span className="logo-run">Run</span>
            <span className="logo-rest">withfoxes</span>
          </div>
          <div className="gate-label">/chief_of_staff</div>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              autoFocus
              disabled={isPending}
            />
            <button type="submit" disabled={isPending}>
              {isPending ? "checking..." : "enter"}
            </button>
          </form>
          {error && <div className="gate-error">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="chief-page">
      <div className="chief-container">
        <div className="logo">
          /<span className="logo-run">Run</span>
          <span className="logo-rest">withfoxes</span>
        </div>
        <h1 className="page-title">chief of staff</h1>
        <p className="page-subtitle">
          an AI that reads your email, preps your meetings, clears the noise,
          and briefs you every morning. you just open the page.
        </p>

        <div className="chief-tabs">
          <button
            className={`chief-tab${activeTab === "plan" ? " active" : ""}`}
            onClick={() => setActiveTab("plan")}
          >
            plan
          </button>
          <button
            className={`chief-tab${activeTab === "architecture" ? " active" : ""}`}
            onClick={() => setActiveTab("architecture")}
          >
            architecture
          </button>
          <button
            className={`chief-tab${activeTab === "briefing" ? " active" : ""}`}
            onClick={() => setActiveTab("briefing")}
          >
            briefing
          </button>
        </div>

        {activeTab === "plan" && <PlanTab />}
        {activeTab === "architecture" && <ArchitectureTab />}
        {activeTab === "briefing" && <BriefingTab />}
      </div>
    </div>
  );
}
