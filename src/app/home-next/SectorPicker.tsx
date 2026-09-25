"use client";

import Link from "next/link";
import { useState } from "react";
import { CATEGORIES, OWNER_LABEL } from "../resources/data";
import n from "./next.module.css";

/**
 * PICK YOUR SECTOR. Paul, 25 Sep 2026: "Pick tourism, tax / accounting and a few others. This
 * is just for design and we can change later."
 *
 * Each sector gathers what we measure for it. Today that is GEO Ireland: for each of the
 * sector's categories, who AI names first and how often (the highest rate on any engine, the
 * figure INSIGHTS.md quotes), day one, not signed off. The rows we do not measure yet (ads,
 * hiring, your own brand) show as locked rows for signed-in readers, never with invented numbers.
 */
const SECTORS: { key: string; name: string; cats: string[] }[] = [
  { key: "tourism", name: "Tourism", cats: ["Tourism", "Hotels", "Airlines and travel"] },
  { key: "tax", name: "Tax and accounting", cats: ["Tax", "Accountants", "Business software"] },
  { key: "banking", name: "Banking", cats: ["Banks", "Mortgages"] },
  { key: "insurance", name: "Insurance", cats: ["Car insurance", "Health insurance", "Home insurance"] },
  { key: "energy", name: "Energy", cats: ["Energy", "Home energy grants", "Broadband and mobile"] },
  { key: "retail", name: "Retail", cats: ["Supermarkets", "Pharmacies", "Irish food and drink"] },
];

const OWN = { state: "#1A3A4E", middle: "#6CAAC8", other: "#9FA3A6" } as const;

export default function SectorPicker() {
  const [on, setOn] = useState(SECTORS[0].key);
  const s = SECTORS.find((x) => x.key === on) ?? SECTORS[0];
  const rows = s.cats.map((c) => CATEGORIES.find((x) => x.name === c)).filter(Boolean) as typeof CATEGORIES;

  return (
    <section className={n.sectors} id="sectors">
      <div className={n.dHead}>
        <h2 className={n.dH2}>Your sector</h2>
        <span className={n.secSub}>Everything we measure for a sector, in one place</span>
      </div>
      {/* Paul, 25 Sep: a dropdown, not a button per sector. A native select in our skin, so a
          phone opens its own picker and the list can grow to every sector we measure. */}
      <label className={n.secPick}>
        <span>Show me</span>
        <span className={n.secSelect}>
          <select value={on} onChange={(e) => setOn(e.target.value)} aria-label="Pick a sector">
            {SECTORS.map((x) => (
              <option key={x.key} value={x.key}>
                {x.name}
              </option>
            ))}
          </select>
        </span>
      </label>

      <div className={n.secPanel}>
<div className={`mod-win ${n.dWin} ${n.secMain}`}>
          <div className="mod-winbar">
            <span className="mod-lights">
              <i />
              <i />
              <i />
            </span>
            <span className="mod-wintitle">{`sector · ${s.name.toLowerCase()}`}</span>
          </div>
          <div className={n.winBody}>
          <span className={n.dKick}>
            AI answers &middot; who the engines name first <span className={n.dDraft}>Draft</span>
          </span>
          {rows.map((c) => (
            <div key={c.name} className={n.secRow}>
              <span className={n.secCat}>{c.name}</span>
              <span className={n.secTop}>
                {c.top}
                <em style={{ color: OWN[c.owner] }}>{OWNER_LABEL[c.owner]}</em>
              </span>
              <span className={n.hTrack}>
                <i style={{ width: `${Math.round(c.rate * 100)}%`, background: OWN[c.owner] }} />
              </span>
              <span className={n.hVal}>{Math.round(c.rate * 100)}%</span>
            </div>
          ))}
          <span className={n.dStamp}>Share of answers naming it, on the engine that named it most · day one, read 23 Aug 2026</span>
          </div>
        </div>

<aside className={`mod-win ${n.dWin} ${n.secSide}`}>
          <div className="mod-winbar">
            <span className="mod-lights">
              <i />
              <i />
              <i />
            </span>
            <span className="mod-wintitle">your_account</span>
          </div>
          <div className={n.winBody}>
          <span className={n.dKick}>With a free account</span>
          {["Every engine, side by side", "Your own brand's result", "Ads running in the sector", "Who is hiring, and for what", "The full sector report, as a PDF"].map((t) => (
            <a key={t} href="#account" className={n.secLocked}>
              <svg viewBox="0 0 12 12" width="11" height="11" aria-hidden>
                <rect x="2" y="5.5" width="8" height="5.5" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <path d="M4 5.5V4a2 2 0 014 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
              </svg>
              {t}
            </a>
          ))}
          <Link href="/resources/geo-ireland" className={n.dLearn}>
            Read the GEO Ireland study →
          </Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
