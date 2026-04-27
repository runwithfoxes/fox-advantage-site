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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { isUnlocked, unlock } = useGate();

  if (isUnlocked) {
    return (
      <div className="gate-success">
        <p>✓ You&apos;re on the list. We&apos;ll send the full book when it&apos;s ready.</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Subscribe failed");

      setStatus("success");
      unlock();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      {status === "success" ? (
        <div className="gate-success">
          <p>✓ You&apos;re on the list. We&apos;ll send the full book when it&apos;s ready.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="gate-form">
          <input
            type="email"
            className="gate-input"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="gate-button" disabled={status === "loading"}>
            {status === "loading" ? "..." : "subscribe"}
          </button>
          {status === "error" && (
            <p className="gate-error">Something went wrong. Try again or subscribe directly at runwithfoxes.substack.com</p>
          )}
        </form>
      )}
    </div>
  );
}
