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
      // Submit to Substack in a hidden iframe so the main page doesn't navigate
      const iframe = document.createElement("iframe");
      iframe.name = "substack-subscribe-" + Date.now();
      iframe.style.cssText = "position:absolute;width:0;height:0;border:0;left:-9999px";
      document.body.appendChild(iframe);

      // Wait for iframe to be ready
      await new Promise<void>((resolve) => {
        iframe.onload = () => resolve();
        setTimeout(resolve, 100);
      });

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://runwithfoxes.substack.com/api/v1/free";
      form.target = iframe.name;
      form.style.display = "none";

      const emailInput = document.createElement("input");
      emailInput.type = "hidden";
      emailInput.name = "email";
      emailInput.value = email;
      form.appendChild(emailInput);

      const firstUrlInput = document.createElement("input");
      firstUrlInput.type = "hidden";
      firstUrlInput.name = "first_url";
      firstUrlInput.value = window.location.href;
      form.appendChild(firstUrlInput);

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        form.remove();
        iframe.remove();
      }, 5000);

      setStatus("success");
      unlock();
    } catch {
      setStatus("success");
      unlock();
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
            {status === "loading" ? "..." : "notify me"}
          </button>
        </form>
      )}
    </div>
  );
}
