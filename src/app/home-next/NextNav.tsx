"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import m from "../resources/menu.module.css";
import n from "./next.module.css";
import ResourcesMenu from "../resources/ResourcesMenu";
import { AGENTS } from "./content";
import { MODULES } from "../course/courseModules";

/**
 * THE FOUR-DOOR NAV. Paul, 25 Sep 2026: the main things are "agents, consulting, training,
 * resources", and "I love when you click on agents and the big page comes down showing the
 * agents." So every door opens a big panel, in the Resources menu's skin (menu.module.css,
 * itself the site's own .hp-mega values). Resources is the hub's menu as it stands.
 * Items tagged Example do not exist yet.
 */
type Door = "consulting" | "agents" | "training";

function Ex() {
  return <span className={n.menuEx}>Example</span>;
}

export default function NextNav() {
  const [open, setOpen] = useState<Door | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const click = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("mousedown", click);
    return () => {
      document.removeEventListener("keydown", key);
      document.removeEventListener("mousedown", click);
    };
  }, []);

  const enter = (d: Door) => () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(d);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(null), 180);
  };
  const trig = (d: Door, label: string) => (
    <div className={m.wrap} onMouseEnter={enter(d)} onMouseLeave={leave}>
      <button type="button" className={m.trigger} aria-expanded={open === d} onClick={() => setOpen(open === d ? null : d)}>
        /{label} <span className={m.chev} aria-hidden>{open === d ? "▴" : "▾"}</span>
      </button>
      {open === d ? <div onMouseEnter={enter(d)}>{panel(d)}</div> : null}
    </div>
  );

  const close = () => setOpen(null);

  const panel = (d: Door) => {
    if (d === "agents") {
      return (
        <div className={`${m.panel} ${n.agentsPanel}`} role="menu">
          <div className={n.agentGrid}>
            <span className={m.lab}>Ten agents we build and run for marketing teams</span>
            <div className={n.agentCols}>
              {AGENTS.map((a) => (
                <Link key={a.num} href="/#agents" className={n.agentItem} onClick={close}>
                  <span className={n.agentNum}>{a.num}</span>
                  <span>
                    <span className={m.itemT}>{a.name}</span>
                    <span className={m.itemD}>{a.short}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <Link href="/#agents" className={m.featured} onClick={close}>
            <span className={m.lab}>See them work</span>
            <span className={m.itemT}>Every agent, working on a made-up insurer</span>
            <span className={m.itemD}>The research note, the outreach, the ads and the site, as they come out.</span>
            <span className={n.menuGo}>The agents page →</span>
          </Link>
        </div>
      );
    }
    if (d === "consulting") {
      return (
        <div className={`${m.panel} ${n.threePanel}`} role="menu">
          <div className={m.col}>
            <span className={m.lab}>What we do</span>
            {["Marketing diagnosis", "Positioning and messaging", "Brand and effectiveness", "Media, budget and share of voice"].map((t) => (
              <span key={t} className={m.plain}>
                {t} <Ex />
              </span>
            ))}
          </div>
          <div className={`${m.col} ${m.rule}`}>
            <span className={m.lab}>Previous work</span>
            <Link href="/millionaire-raffle" className={m.plain} onClick={close}>Millionaire Raffle</Link>
            <Link href="/marketer-of-the-year" className={m.plain} onClick={close}>Marketer of the Year</Link>
            <Link href="/48" className={m.plain} onClick={close}>48</Link>
          </div>
          <Link href="/contact" className={m.featured} onClick={close}>
            <span className={m.lab}>Talk to us</span>
            <span className={n.menuFace}>
              <img src="/Paul_photo.jpg" alt="" />
            </span>
            <span className={m.itemT}>Paul Dervan</span>
            <span className={m.itemD}>Ireland’s Marketer of the Year 2022. Twenty years in brand.</span>
          </Link>
        </div>
      );
    }
    return (
      <div className={`${m.panel} ${n.threePanel}`} role="menu">
        <div className={m.col}>
          <span className={m.lab}>The free course</span>
          {MODULES.map((mod) => (
            <Link key={mod.n} href={mod.built ? `/course/${mod.n}` : `/course#m${mod.n}`} className={n.modRow} onClick={close}>
              <span className={m.itemT}>{mod.title.replace(/^\(\d\)\s*/, "")}</span>
              <span className={n.modWhen}>{mod.built ? "Open now" : mod.when}</span>
            </Link>
          ))}
        </div>
        <div className={`${m.col} ${m.rule}`}>
          <span className={m.lab}>For teams</span>
          <span className={m.plain}>
            In-company training <Ex />
          </span>
          <span className={m.plain}>
            University teaching <Ex />
          </span>
          <span className={m.lab} style={{ marginTop: 18 }}>Read</span>
          <Link href="/book" className={m.plain} onClick={close}>The Fox Advantage, free book</Link>
          <Link href="/course/everything" className={m.plain} onClick={close}>Library of everything</Link>
        </div>
        <Link href="/course" className={m.featured} onClick={close}>
          <span className={m.lab}>Featured</span>
          <span className={m.featImg}>
            <img src="/resources/hero-bridge.jpg" alt="" />
            <span className={m.featOver}>AI Fluency</span>
          </span>
          <span className={m.itemT}>AI Fluency for Ambitious Marketers</span>
          <span className={m.itemD}>Six modules, free. Over 1,000 marketers signed up.</span>
        </Link>
      </div>
    );
  };

  return (
    <header className={n.nav} ref={wrap}>
      <Link href="/home-next" className={n.logo}>
        /Runwithfoxes
      </Link>
      <nav className={n.links}>
        {trig("consulting", "consulting")}
        {trig("agents", "agents")}
        {trig("training", "training")}
        <ResourcesMenu />
        <a href="#" className={n.signin}>
          /sign in
        </a>
        <Link href="/contact" className={n.cta}>
          /talk to us
        </Link>
      </nav>
    </header>
  );
}
