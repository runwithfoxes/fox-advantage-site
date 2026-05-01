"use client";

import { useState, useEffect, createContext, useContext } from "react";

interface GateContextType {
  isUnlocked: boolean;
  unlock: () => void;
}

const GateContext = createContext<GateContextType>({
  isUnlocked: false,
  unlock: () => {},
});

export function useGate() {
  return useContext(GateContext);
}

export function GateProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fox_access");
    if (stored === "true") {
      setIsUnlocked(true);
    }
  }, []);

  const unlock = () => {
    localStorage.setItem("fox_access", "true");
    setIsUnlocked(true);
  };

  return (
    <GateContext.Provider value={{ isUnlocked, unlock }}>
      {children}
    </GateContext.Provider>
  );
}

export default function EmailGateForm({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { isUnlocked, unlock } = useGate();

  if (isUnlocked || submitted) {
    return (
      <div className="gate-success">
        <p>✓ You&apos;re on the list. We&apos;ll send the full book when it&apos;s ready.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open("https://runwithfoxes.substack.com/subscribe", "_blank", "noopener");
    setSubmitted(true);
    unlock();
  };

  return (
    <form onSubmit={handleSubmit} className="gate-form">
      <input
        type="email"
        className="gate-input"
        placeholder="your@email.com"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="gate-button">
        subscribe
      </button>
    </form>
  );
}
