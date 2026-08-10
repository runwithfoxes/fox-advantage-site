"use client";

// Client-side registry: slug -> the page's doc component, loaded lazily so a
// visitor who has not passed the gate never downloads the page content.
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

export const PROSPECT_DOCS: Record<string, ComponentType> = {
  kite: dynamic(() => import("./KiteDoc"), { ssr: false }),
  fidelity: dynamic(() => import("../../proposals/fidelity/FidelityDoc"), {
    ssr: false,
  }),
  front: dynamic(() => import("./FrontDoc"), { ssr: false }),
};
