"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import m from "../resources/menu.module.css";
import n from "./next.module.css";
import ResourcesMenu from "../resources/ResourcesMenu";
import { NOTES } from "@/lib/notes-name";
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
  // the phone menu (Paul, 30 Sep 2026: "I'd like a hamburger menu for mobile")
  const [burger, setBurger] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* 1 Oct 2026: hovering a word opened its menu and clicking the same word then closed it, so the
     natural move (point, then click) shut the thing you had just asked for. A touch screen does the
     same in one tap, because it sends the hover before the click. So a click on a menu that hover
     opened keeps it open; only a click on a menu that a click opened closes it. */
  const byHover = useRef(false);

  useEffect(() => {
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(null); setBurger(false); } };
    const click = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) { setOpen(null); setBurger(false); }
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
    if (open !== d) byHover.current = true;
    setOpen(d);
  };
  const press = (d: Door) => () => {
    const keep = open !== d || byHover.current;
    byHover.current = false;
    setOpen(keep ? d : null);
  };
  const leave = () => {
    timer.current = setTimeout(() => setOpen(null), 180);
  };
  const trig = (d: Door, label: string) => (
    <div className={m.wrap} onMouseEnter={enter(d)} onMouseLeave={leave}>
      <button type="button" className={m.trigger} aria-expanded={open === d} onClick={press(d)}>
        /{label} <span className={m.chev} aria-hidden>{open === d ? "▴" : "▾"}</span>
      </button>
      {open === d ? <div onMouseEnter={enter(d)}>{panel(d)}</div> : null}
    </div>
  );

  const close = () => { setOpen(null); setBurger(false); };
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
          <Link href="/about" className={m.featured} onClick={close}>
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
            {/* Paul, 30 Sep: not the fox on the bridge, a silent loop of the module 2 intro film. On 2 Oct
                he recorded a new film and asked for it here too. Eleven seconds of it (15.4s to 26.6s),
                the stretch where "Not about one prompt" is struck through for "but the quality of the
                outputs", cropped in on him and the caption so the words read at this size. No overlay:
                the title under it says what it is. */}
            <video src="/resources/nav-module-2-intro-loop-v3.mp4" poster="/resources/nav-module-2-intro-loop-v3-poster.jpg" autoPlay muted loop playsInline preload="auto" />
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
            Sign in. A page that read the cookie itself passes `known`. Every other page (1 Oct) carries
            both buttons and <html data-known> shows the right one: see src/components/Known.tsx. */}
        {known ? (
          <Link href="/course" className={n.fullAccess}>Your course</Link>
        ) : (
          <>
            <a href="/signin" className={n.fullAccess} data-ask>Sign in</a>
            <Link href="/course" className={n.fullAccess} data-known-only>Your course</Link>
          </>
        )}
        <button type="button" className={n.burger} aria-label={burger ? "Close menu" : "Open menu"} aria-expanded={burger} onClick={() => { setOpen(null); setBurger(!burger); }}>
          <span /><span /><span />
        </button>
      </nav>
      {/* The phone menu: the same four doors as the desktop menus, as one list on the menus' navy. */}
      {burger ? (
        <div className={`${m.panel} ${n.mobPanel}`} role="menu">
          <div className={n.mobGroup}>
            <span className={m.lab}>Consulting</span>
            <Link href="/#consulting" className={m.plain} onClick={door("consulting")}>Designing team AI adoption</Link>
            <Link href="/millionaire-raffle" className={m.plain} onClick={close}>Mental availability in practice</Link>
            <Link href="/48" className={m.plain} onClick={close}>Fame strategies</Link>
            <Link href="/about" className={m.plain} onClick={close}>Talk to us</Link>
          </div>
          <div className={n.mobGroup}>
            <span className={m.lab}>Agents</span>
            <Link href="/#agents" className={m.plain} onClick={door("agents")}>The ten agents we build and run</Link>
            <Link href="/essays/why-i-gave-my-agents-email-addresses" className={m.plain} onClick={close}>Why I gave my agents email addresses</Link>
          </div>
          <div className={n.mobGroup}>
            <span className={m.lab}>Training</span>
            <Link href="/course" className={m.plain} onClick={close}>AI Fluency for Ambitious Marketers</Link>
            <Link href="/#library" className={m.plain} onClick={close}>The library</Link>
            <Link href="/book" className={m.plain} onClick={close}>The Fox Advantage, free book</Link>
          </div>
          <div className={n.mobGroup}>
            <span className={m.lab}>Resources</span>
            <Link href="/resources/the-ai-ask/2026-q3" className={m.plain} onClick={close}>The AI Ask, our new report</Link>
            <Link href="/essays" className={m.plain} onClick={close}>Essays, by Paul</Link>
            <Link href="/diary" className={m.plain} onClick={close}>Diary of an agent team, by Lena</Link>
            <Link href={NOTES.route} className={m.plain} onClick={close}>{NOTES.nav}</Link>
            <Link href="/about#contributors" className={m.plain} onClick={close}>Who writes here</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
