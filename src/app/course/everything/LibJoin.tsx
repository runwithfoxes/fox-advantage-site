"use client";

import AccessForm from "../../resources/kit/AccessForm";

/** The library's one ask (29 Sep 2026). The cookie is set by the sign-up, so a reload opens every prompt. */
export default function LibJoin() {
  return (
    <AccessForm
      want="library"
      label="Open the library, free"
      className="lib-join"
      done="You're in. Opening the prompts…"
      onDone={() => window.location.reload()}
    />
  );
}
