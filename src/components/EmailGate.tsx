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
      <div className={`font-mono text-sm ${variant === "dark" ? "text-white/50" : "text-[var(--text-muted)]"}`}>
        <p>✓ You have access. <a href="#chapters" className="text-[var(--orange)] underline underline-offset-2">Start reading →</a></p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Submit to Substack via their iframe-based subscribe endpoint
      // We create a hidden iframe and POST to Substack's subscribe form
      const iframe = document.createElement("iframe");
      iframe.name = "substack-subscribe";
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://runwithfoxes.substack.com/api/v1/free";
      form.target = "substack-subscribe";

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

      // Clean up
      setTimeout(() => {
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 3000);

      // Unlock access regardless of Substack response
      // (the subscription happens async in the iframe)
      setStatus("success");
      unlock();
    } catch {
      // Even if Substack fails, unlock access
      // The worst case is they get access without being subscribed
      setStatus("success");
      unlock();
    }
  };

  const isDark = variant === "dark";

  return (
    <div>
      {status === "success" ? (
        <div className={`font-mono text-sm ${isDark ? "text-white/70" : "text-[var(--text)]"}`}>
          <p>✓ You&apos;re in. <a href="#chapters" className="text-[var(--orange)] underline underline-offset-2">Start reading →</a></p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-[520px]">
          <input
            type="email"
            placeholder="your@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`flex-1 px-5 py-4 font-mono text-[13px] font-light outline-none transition-colors
              ${isDark
                ? "bg-white/[0.06] border border-white/[0.12] text-white placeholder:text-white/25 focus:border-[var(--orange)]"
                : "bg-white border border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-[var(--orange)]"
              }`}
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-8 py-4 font-mono text-xs font-normal tracking-[2px] uppercase bg-[var(--orange)] text-white border-none cursor-pointer transition-colors hover:bg-[#E06A1A] disabled:opacity-50 whitespace-nowrap"
          >
            {status === "loading" ? "..." : "get access"}
          </button>
        </form>
      )}
    </div>
  );
}
