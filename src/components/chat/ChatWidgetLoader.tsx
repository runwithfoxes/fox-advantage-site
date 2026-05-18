"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ChatWidget = dynamic(() => import("./ChatWidget"), { ssr: false });

export default function ChatWidgetLoader() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof requestIdleCallback === "function") {
      const id = requestIdleCallback(() => setReady(true), { timeout: 3000 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(() => setReady(true), 2000);
    return () => clearTimeout(id);
  }, []);
  if (!ready) return null;
  return <ChatWidget />;
}
