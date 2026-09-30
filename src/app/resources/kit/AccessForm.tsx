"use client";

import { useState } from "react";

export type Want = "library" | "report" | "dataset" | "tool" | "playbook" | "tracker" | "research" | "account" | "course";

/**
 * THE ONE ASK. Every "full access, free" form on the site is this component, so every sign-up
 * reaches Klaviyo tagged with what the person was looking for (Paul, 27 Sep 2026: "we need to
 * tag what they were looking for, so we can separate out people on the course from people
 * looking for library only or a free report").
 *
 * want="course" posts to the course's own route, so course people land on the course list and
 * its welcome flow exactly as before. Everything else posts to /api/access, which tags the
 * profile, adds it to the resources-access list and sets the rwf_access cookie.
 *
 * It renders only the input and the button, unstyled by itself: the caller passes the form
 * class it already had, so the look on every page stays what Paul settled.
 */
export default function AccessForm({
  want,
  item,
  label = "Sign up",
  className,
  inputClassName,
  done = "You're in. Everything on this page is open to you, and the links are on their way.",
  doneClassName,
  placeholder = "you@company.ie",
  onDone,
}: {
  want: Want;
  item?: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  done?: string;
  doneClassName?: string;
  placeholder?: string;
  onDone?: () => void;
}) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  if (state === "done") return <p className={doneClassName}>{done}</p>;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    try {
      const page = typeof window !== "undefined" ? window.location.pathname : "";
      const res =
        want === "course"
          ? await fetch("/api/course-signup", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ email, signup_source: "card", page_url: typeof window !== "undefined" ? window.location.href : undefined }),
            })
          : await fetch("/api/access", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ email, want, item, page }),
            });
      if (!res.ok) throw new Error(String(res.status));
      setState("done");
      onDone?.();
    } catch {
      setState("error");
    }
  };

  return (
    <form className={className} onSubmit={submit} noValidate>
      <input
        type="email"
        name="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        aria-label="Work email"
        className={inputClassName}
      />
      <button type="submit" disabled={state === "busy"}>
        {state === "busy" ? "One moment" : state === "error" ? "Try again" : label}
      </button>
    </form>
  );
}
