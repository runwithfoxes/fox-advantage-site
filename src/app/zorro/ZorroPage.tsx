import Link from "next/link";
import { ITEMS } from "./zorroData";

/* The page behind the door. Same bones as a course module: the rail on the left with the
   contents, the masthead and the numbered items on the right. Server-rendered, no state. */

function Body({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <>
      {blocks.map((b, i) => {
        const lines = b.split("\n");
        if (lines.every((l) => l.startsWith("> "))) {
          return (
            <div key={i} className="mod-copybox">
              {lines.map((l, j) => (
                <p key={j}>{l.slice(2)}</p>
              ))}
            </div>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="mod-list mod-list-bullet">
              {lines.map((l, j) => (
                <li key={j}>{l.slice(2)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="mod-body">
            {b}
          </p>
        );
      })}
    </>
  );
}

export default function ZorroPage() {
  return (
    <div className="mod-shell">
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-logo">
          /<span>Run</span>withfoxes
        </Link>
        <span className="chapter-nav-back">UCD x IE &middot; 14 to 18 Sep</span>
      </header>

      <div className="mod-grid">
        <div className="mod-railcol">
          <nav className="mod-rail">
            <p>/this week</p>
            {ITEMS.map((it, i) => (
              <a key={i} href={`#i${i + 1}`}>
                <span className="mod-k">{String(i + 1).padStart(2, "0")}</span>
                <span className="mod-dot" />
                <span>{it.t}</span>
              </a>
            ))}
            <a className="mod-rail-lib" href="#i7">
              /the gym files
            </a>
          </nav>
        </div>

        <div className="mod-maincol">
          <header className="mod-masthead">
            <p className="mod-eyebrow">UCD x IE &middot; Strategic Gen AI in Business &middot; Room E117</p>
            <h1 className="mod-h1">
              Gimnasio <span className="mod-hl">Zorro</span>
            </h1>
            <div className="chapter-fox-hero">
              <img className="chapter-fox-hero-img" src="/fox/fox-spain-team-nobg.png" alt="" />
            </div>
            <p className="mod-standfirst">
              One gym, 900 members, an owner with no time. This week you build the agent that
              notices who is drifting away, writes to them in her voice, and two weeks later
              tells her how many came back. Everything you need is on this page.
            </p>
            <p className="mod-standfirst">
              Read the first two items today. The rest are for the day they name.
            </p>
            <div className="mod-meta">
              <span>
                Week<b>14 to 18 September</b>
              </span>
              <span>
                Teams<b>Three people, one Attio</b>
              </span>
              <span>
                Friday<b>A number, and two mistakes</b>
              </span>
              <span>
                Files<b>Nobody in them is real</b>
              </span>
            </div>
          </header>

          <main>
            {ITEMS.map((it, i) => (
              <article key={i} className="mod-item" id={`i${i + 1}`}>
                <div className="mod-itemtop">
                  <span className="mod-n">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mod-h3">{it.t}</h2>
                </div>
                <Body text={it.text} />
                {it.files && (
                  <div className="mod-reading">
                    <span className="mod-readinglbl">{it.filesTitle ?? "Files"}</span>
                    <ul className="mod-frows">
                      {it.files.map((f) => (
                        <li className="mod-frow" key={f.name}>
                          <a className="mod-fname" href={f.href} download>
                            {f.name}
                          </a>
                          <span className="mod-fwhat">{f.what}</span>
                          <a className="mod-readinglink" href={f.href} download>
                            Download
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
