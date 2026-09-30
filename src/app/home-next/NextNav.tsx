"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import m from "../resources/menu.module.css";
import n from "./next.module.css";
import ResourcesMenu from "../resources/ResourcesMenu";
import { AGENTS } from "./content";
import { MODULES } from "../course/courseModules";
import { openDoor } from "@/components/AgentsHero";
import PhoneDemo from "./PhoneDemo";

/**
 * THE FOUR-DOOR NAV. Paul, 25 Sep 2026: the main things are "agents, consulting, training,
 * resources", and "I love when you click on agents and the big page comes down showing the
 * agents." So every door opens a big panel, in the Resources menu's skin (menu.module.css,
 * itself the site's own .hp-mega values). Resources is the hub's menu as it stands.
 * Items tagged Example do not exist yet.
 */
type Door = "consulting" | "agents" | "training";


/* Paul, 30 Sep: "should we not have the same navigation across every page that people land on?" Pages
   with no film at the top (essays, diary, book, contact) pass `bar`: the same nav on a fixed navy bar. */
export default function NextNav({ known = false, bar = false }: { known?: boolean; bar?: boolean } = {}) {
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
  /* Paul, 30 Sep: clicking agents should bring the big page down with every agent on it. A link to
     /#agents from the page it is already on raises no event, so the menu only closed. When this page
     carries the agents section, open its full-screen surface directly, the same signal the AI Agents
     button under the hero sends; from any other page the link goes home and opens it there. */
  /* Paul, 30 Sep: each agent in the menu goes to that agent, not the list. On a page carrying the
     agents section it opens that agent's piece; elsewhere /#agent-NN goes home and opens it there. */
  const agent = (num: string) => (e: ReactMouseEvent) => {
    close();
    if (document.getElementById("agents")) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent<string>("rwf:agent", { detail: num }));
    }
  };
  const door = (d: Door) => (e: ReactMouseEvent) => {
    close();
    if (document.getElementById("agents")) {
      e.preventDefault();
      openDoor(d);
    }
  };

  const panel = (d: Door) => {
    if (d === "agents") {
      return (
        <div className={`${m.panel} ${n.agentsPanel}`} role="menu">
          <div className={n.agentGrid}>
            <span className={m.lab}>Ten agents we build and run for marketing teams</span>
            <div className={n.agentCols}>
              {AGENTS.map((a) => (
                <Link key={a.num} href={`/#agent-${a.num}`} className={n.agentItem} onClick={agent(a.num)}>
                  <span className={n.agentNum}>{a.num}</span>
                  <span>
                    <span className={m.itemT}>{a.name}</span>
                    <span className={m.itemD}>{a.short}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {/* Paul, 30 Sep: "See them work" made no sense. The Klara phone from the homepage feature,
              playing, and a click goes to the essay it sits beside. */}
          <Link href="/essays/why-i-gave-my-agents-email-addresses" className={`${m.featured} ${n.menuPhone}`} onClick={close} aria-label="Why I gave my agents email addresses, an essay by Paul Dervan">
            {/* Paul, 30 Sep, third pass: the headline under the phone "just looks random". The writing
                sits beside the phone, and says plainly that it goes to another page. */}
            <span className={n.menuPhoneBox}>
              <PhoneDemo />
            </span>
            <span className={n.menuPhoneText}>
              <span className={m.lab}>Essay</span>
              <span className={m.itemT}>Why I gave my agents email addresses</span>
              <span className={n.menuGo}>Read the essay &rarr;</span>
            </span>
          </Link>
        </div>
      );
    }
    if (d === "consulting") {
      return (
        <div className={`${m.panel} ${n.twoPanel}`} role="menu">
          {/* Paul, 29 Sep: "We can take things off the nav bar if they shouldn't be there." The example
              services column and Marketer of the Year (off the homepage the same day) are gone. */}
          <div className={m.col}>
            <span className={m.lab}>Previous work</span>
            {/* The homepage's names for them (Paul, 29 Sep), the brand underneath. */}
            <Link href="/millionaire-raffle" className={n.workItem} onClick={close}>
              <span className={m.itemT}>Mental availability in practice</span>
              <span className={m.itemD}>Millionaire Raffle, National Lottery</span>
            </Link>
            <Link href="/48" className={n.workItem} onClick={close}>
              <span className={m.itemT}>Fame strategies</span>
              <span className={m.itemD}>48, O2 Ireland</span>
            </Link>
            {/* Paul, 30 Sep: a third link. It opens the consulting page of the same name, the method. */}
            <Link href="/#consulting" className={n.workItem} onClick={door("consulting")}>
              <span className={m.itemT}>Designing team AI adoption</span>
              <span className={m.itemD}>Map the work, redesign it, build agents</span>
            </Link>
            {/* Paul, 29 Sep: consulting has no page of its own yet, so the best link today is the
                consulting view on the homepage. */}
            <Link href="/#consulting" className={n.menuGo} onClick={door("consulting")}>How we work with you →</Link>
          </div>
          <Link href="/about#contact" className={m.featured} onClick={close}>
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
          <span className={m.lab}>Read</span>
          <Link href="/book" className={m.plain} onClick={close}>The Fox Advantage, free book</Link>
          <Link href="/#library" className={m.plain} onClick={close}>Library of everything</Link>
        </div>
        <Link href="/course" className={m.featured} onClick={close}>
          <span className={m.lab}>Featured</span>
          <span className={m.featImg}>
            {/* Paul, 30 Sep: not the fox on the bridge. Eleven silent seconds of the module 2 intro film
                (17.0s to 28.2s), the stretch where "Not working well with the first prompt" is struck
                through for "but getting the quality right", cropped in on him and the caption so the
                words read at this size. Looping, until he records a new one. The "AI Fluency" overlay
                came off: it sat on the caption, and the title under it says the same. */}
            <video src="/resources/nav-module-2-intro-loop.mp4" poster="/resources/nav-module-2-intro-loop-poster.jpg" autoPlay muted loop playsInline preload="auto" />
          </span>
          <span className={m.itemT}>AI Fluency for Ambitious Marketers</span>
          <span className={m.itemD}>Six modules, free. Over 1,000 marketers signed up.</span>
        </Link>
      </div>
    );
  };

  return (
    <header className={`${n.nav}${bar ? ` ${n.navBar}` : ""}`} ref={wrap}>
      <Link href="/" className={n.logo}>
        /Runwithfoxes
      </Link>
      <nav className={n.links}>
        {trig("consulting", "consulting")}
        {trig("agents", "agents")}
        {trig("training", "training")}
        <ResourcesMenu />
        {/* Paul, 27 Sep: "i don't think sign-in can look like this. It needs to feel more solid.
            Also, the get full access is doing same thing. We need to make this simple." One solid
            button. It opens the account band, which registers a new reader and signs in an old one;
            the hero's own form beside it is the register ask. (25 Sep: no paid tier, so nothing
            says upgrade.) */}
        {/* Paul, 29 Sep 2026: a visitor this browser already knows gets "Your course" here, not
            Sign in. Pages that know pass `known`; the rest show Sign in. */}
        <a href={known ? "/course" : "/signin"} className={n.fullAccess}>
          {known ? "Your course" : "Sign in"}
        </a>
      </nav>
    </header>
  );
}
