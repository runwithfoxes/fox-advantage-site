"use client";

import Link from "next/link";

/* ---------------------------------------------------------------------------
   Run with Foxes brand guide.
   Source of truth: ~/paul-hub/clients/rwf/memory/rwf-type-system.md (type),
   rwf-brand-spec-for-ads.md (Anton, the fox, the ad voice). This page is
   rendered IN the system it documents: reading register throughout, chrome
   square, one weight per face. If you change a rule here, change it there too.
--------------------------------------------------------------------------- */

function Label({ children }: { children: React.ReactNode }) {
  return <div className="rwf-label" style={{ color: "var(--orange)", marginBottom: 18 }}>{children}</div>;
}

function Section({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: "56px 0", borderTop: "1px solid var(--border)" }}>
      <div className="rwf-label" style={{ marginBottom: 14 }}>{label}</div>
      <h2 className="rwf-h2" style={{ marginBottom: 24 }}>{title}</h2>
      {children}
    </section>
  );
}

function Rule({ text }: { text: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 10 }}>
      <span style={{ color: "var(--orange)", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400 }}>{"\\"}</span>
      <span className="rwf-body" style={{ fontSize: 15 }}>{text}</span>
    </div>
  );
}

/* Because. Every rule carries its reason so the next person does not follow a rule they cannot explain. */
function Because({ children }: { children: React.ReactNode }) {
  return (
    <p className="rwf-meta" style={{ marginTop: 12, borderLeft: "2px solid var(--border)", paddingLeft: 14, maxWidth: 620 }}>
      {children}
    </p>
  );
}

function Swatch({ hex, name, cssVar, usage }: { hex: string; name: string; cssVar: string; usage: string }) {
  const isLight = ["#FAFAF8", "#F7EAD9", "#E0E0DC", "#F5F5F0", "#F0F0EC"].includes(hex);
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
      <div style={{ width: 64, height: 64, minWidth: 64, background: hex, border: isLight ? "1px solid var(--border)" : "none", display: "flex", alignItems: "flex-end", padding: 6 }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, fontWeight: 400, color: isLight ? "var(--text-muted)" : "#fff", letterSpacing: 0.5 }}>{hex}</span>
      </div>
      <div>
        <div className="rwf-h3" style={{ fontSize: 16 }}>{name}</div>
        <div className="rwf-meta" style={{ marginTop: 2 }}>{cssVar}</div>
        <div className="rwf-meta" style={{ marginTop: 4, color: "var(--text-muted)" }}>{usage}</div>
      </div>
    </div>
  );
}

/* A live type specimen: the sample is set in the very class it names. */
function Spec({ cls, sample, note }: { cls: string; sample: string; note: string }) {
  return (
    <div style={{ paddingBottom: 24, marginBottom: 24, borderBottom: "1px solid var(--border)" }}>
      <div className={cls} style={{ marginBottom: 10 }}>{sample}</div>
      <div className="rwf-meta">{note}</div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div style={{ background: "#1D1B1B", padding: "20px 24px", margin: "16px 0", fontFamily: "var(--mono)", fontSize: 13, fontWeight: 400, lineHeight: 2, color: "rgba(255,255,255,0.65)", overflowX: "auto" }}>
      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{children}</pre>
    </div>
  );
}

function Dont({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
      <span style={{ color: "#c44", fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400 }}>&#10007;</span>
      <span className="rwf-body" style={{ fontSize: 15 }}>{children}</span>
    </div>
  );
}

export default function BrandGuide() {
  return (
    <div className="chapter-page">
      {/* NAV */}
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-back">/&thinsp;<span style={{ color: "#F47521" }}>Run</span>withfoxes</Link>
        <span className="chapter-nav-count">brand guide</span>
      </header>

      <div className="chapter-main" style={{ paddingTop: 96 }}>
        <div className="rwf-reading" style={{ maxWidth: 880, margin: "0 auto", paddingBottom: 120 }}>

          {/* HERO */}
          <div style={{ marginBottom: 12 }}>
            <div className="rwf-label" style={{ marginBottom: 20 }}>// internal reference</div>
            <h1 className="rwf-h1" style={{ marginBottom: 24 }}>Brand guide</h1>
            <p className="rwf-standfirst" style={{ marginBottom: 16 }}>
              How runwithfoxes.com is made, not what it says. This page is built in its own system,
              so it doubles as the specimen. If a rule here is broken by the page you are reading, one
              of them is wrong.
            </p>
            <p className="rwf-body">
              The source of truth is two memory files, not this page: the type system and the ad spec.
              This is where they are made legible, with the reason under every rule so nobody follows
              one they cannot explain.
            </p>
          </div>

          {/* THE ONE IDEA */}
          <Section id="idea" label="/the_one_idea" title="Two things held in tension">
            <p className="rwf-body" style={{ marginBottom: 16 }}>
              The brand is bright, colourful, crafted creativity and, at the same time, a techie,
              low-key, typewriter restraint. Both have to be legible in any encounter with the brand,
              in whatever format. Neither half on its own is the brand. Type carries the restraint.
              Colour and craft come in through the artwork, never through the chrome.
            </p>
            <p className="rwf-body" style={{ marginBottom: 24 }}>
              The enemy is not dark and it is not quiet. The enemy is dull. Kill Bill is dark and still
              brilliant because of the gold. A restrained page is still brilliant if the craft is visible.
            </p>
            <Label>two layers, kept separate</Label>
            <Rule text={<><strong>Reasons</strong> are durable: both-ness legible everywhere, brilliance not brightness, craft visible, colour through artwork not chrome, effectiveness underneath.</>} />
            <Rule text={<><strong>Vehicles</strong> are current practice and replaceable: the three faces, the fox, the window, mono and the slash, film references. Any vehicle can be swapped for one that serves the reasons better.</>} />
            <Because>
              The test for anything new: is both-ness legible, and if not, which half is under-weighted.
              This keeps the guide from turning into a cage.
            </Because>
          </Section>

          {/* TYPE */}
          <Section id="type" label="/typography" title="Type system">
            <p className="rwf-body" style={{ marginBottom: 28 }}>
              Three faces, each with one job. Two registers. Two reading sizes. One weight per face.
              Hierarchy comes from size, position and space, never from making things heavier.
            </p>

            <Label>the three faces</Label>
            <Spec cls="rwf-statement" sample="Build an unfair advantage" note="JetBrains Mono 700 / statement register / front doors only" />
            <Spec cls="rwf-h1" sample="Fox thinking, not hedgehog thinking" note="Space Grotesk 500 / headline register / h1 through h3, reading pages" />
            <Spec cls="rwf-standfirst" sample="The specialists are being replaced by generalists with tools, and the tools are getting very good." note="Source Serif 4 / standfirst / 20px / 1.5, once per page under the H1" />
            <Spec cls="rwf-body" sample="Everything a person actually reads runs in Source Serif at one size. If a line wants to be smaller than this, it is not reading copy. It becomes the machine, so it changes face, not size." note="Source Serif 4 / body / 17px / 1.65" />
            <Spec cls="rwf-label" sample="\MENTAL_AVAILABILITY" note="JetBrains Mono / the machine / 11 to 12px, labels, meta, sources, counts" />

            <div style={{ marginTop: 24 }}>
              <Label>the rules</Label>
              <Rule text="Two registers. Statement (Mono 700, centred, ~54px) is for front doors only, where nobody is reading yet. Reading (Grotesk 500 headline, Source Serif body) is for every page someone stays on. Statement does not travel to a page with a paragraph on it." />
              <Rule text="Two reading sizes only. Standfirst 20px, once, under the H1. Body 17px, everything else. No sub-body, no small print, no caption-sized serif." />
              <Rule text="Anything smaller than body becomes mono, not small serif. That removes the when-do-I-drop-a-size question. You do not. You change face." />
              <Rule text="One weight per face. Mono 400 (700 for the one statement headline). Grotesk 500. Serif 400, with 600 for a genuine inline emphasis inside a sentence, never a whole line or a heading." />
              <Because>
                Grotesk 500 was chosen over 600, which read too insistent over long copy, and over 300,
                which went weak at size. 500 holds a page without shouting. Nothing is bolded for
                emphasis, because heavy-everything is the drift this rule exists to stop.
              </Because>
            </div>
          </Section>

          {/* WIDTH */}
          <Section id="width" label="/measure" title="Copy runs the full width of its container">
            <p className="rwf-body" style={{ marginBottom: 16 }}>
              If there is empty space to the right of a paragraph and nothing is in it, that is the bug:
              four lines and a dead column instead of two lines across. Body copy is never capped at a
              62 to 66 character measure. Standard typographic advice says otherwise here, and it loses.
            </p>
            <Rule text="The only exception is a real two-column grid with something actually in the other column, almost always the fox. It works either side. That is a grid column, not a max-width on the text." />
            <Because>
              A cap on the text is the bug; a grid column is legitimate. A hook already polices the cap,
              but the hook cannot see intent, so the rule is stated plainly here.
            </Because>
          </Section>

          {/* COLOUR */}
          <Section id="colours" label="/colour" title="Colour palette">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 48px", marginTop: 8 }}>
              <div>
                <Label>the palette</Label>
                <Swatch hex="#3A7CA5" name="Sky blue" cssVar="--orange (misnamed, see below)" usage="The one accent. Links, hover, active nav, stats, the slash." />
                <Swatch hex="#1A3A4E" name="Deep sky" cssVar="--charcoal" usage="Chrome only. Dark bars, chat send button. A deep blue, not black." />
                <Swatch hex="#F47521" name="Logo orange" cssVar="--logo-orange" usage="The word Run in the logo, and nothing else." />
                <Swatch hex="#F7EAD9" name="Cream" cssVar="--color-cream" usage="Warm highlight, used sparingly." />
              </div>
              <div>
                <Label>neutrals</Label>
                <Swatch hex="#FAFAF8" name="Background" cssVar="--bg" usage="Page background. Warm off-white. The fox only appears here." />
                <Swatch hex="#1D1B1B" name="Text" cssVar="--text" usage="Body text. Near-black, not pure black." />
                <Swatch hex="#8A8A85" name="Text muted" cssVar="--text-muted" usage="Meta, labels, nav defaults." />
                <Swatch hex="#E0E0DC" name="Border" cssVar="--border" usage="Dividers, thin lines." />
              </div>
            </div>

            <div style={{ marginTop: 32 }}>
              <Label>the rules</Label>
              <Rule text="Colour enters through the artwork, not the chrome. The chrome (nav, dividers, labels, rules) stays quiet. A photo, a scene, a slide can be as loud as the idea needs." />
              <Rule text="Sky blue is the only loud colour in the chrome. No accent beyond it." />
              <Rule text="Content sits on cream. Never put writing on the blue. Deep sky is chrome only." />
              <Rule text="Never pure black or pure white as a background." />
              <Rule text={<>Orange (#F47521) is the logo word Run only. It is not a content colour.</>} />
              <Because>
                Build note, not a colour decision: the CSS variable <code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>--orange</code> holds the blue #3A7CA5,
                a leftover from a rebrand where the value changed and the name did not. The accent is
                genuinely sky blue. Use <code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>--logo-orange</code> for the real orange. Renaming <code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>--orange</code> is
                on the backlog; until then, do not read the name as the truth.
              </Because>
            </div>
          </Section>

          {/* LOGO */}
          <Section id="logo" label="/logo" title="Logo">
            <div style={{ padding: "40px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", textAlign: "center", marginBottom: 20 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 26, fontWeight: 400, letterSpacing: 4, color: "var(--text-muted)" }}>
                /<span style={{ color: "#F47521" }}>Run</span>withfoxes
              </span>
            </div>
            <Rule text="Text only. No image logo, no icon. There is no logo file: read .chapter-nav-back or .hp-nav-logo and match it." />
            <Rule text="JetBrains Mono, weight 400, starts with a forward slash." />
            <Rule text={<>Run is orange (#F47521) on cream. Everything else is muted.</>} />
            <Rule text="On a dark background the wordmark is a full whiteout, Run included. Orange only on cream." />
          </Section>

          {/* NAVIGATION */}
          <Section id="nav" label="/navigation" title="Navigation">
            <Label>top bar</Label>
            <div style={{ background: "rgba(250,250,248,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)", padding: "16px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 400, letterSpacing: 2, color: "var(--text-muted)" }}>/<span style={{ color: "#F47521" }}>Run</span>withfoxes</span>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                {["/tools", "/previous", "/book", "/contact"].map((l) => (
                  <span key={l} style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "var(--text-muted)" }}>{l}</span>
                ))}
              </div>
            </div>
            <Rule text="Fixed, backdrop-filter blur(12px), semi-transparent cream background." />
            <Rule text="/tools opens the module dropdown, /previous the case studies. Then /book, /contact." />
            <Rule text="Default link muted, hover and active to sky blue, 0.3s." />

            <div style={{ marginTop: 32 }}>
              <Label>bottom bar</Label>
              <div style={{ background: "var(--charcoal)", display: "inline-flex", marginBottom: 16, flexWrap: "wrap" }}>
                {[["#top", 0], ["#about", 0], ["/book", 0], ["get in touch", 1]].map(([l, cta]) => (
                  <span key={l as string} style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: cta ? "#fff" : "rgba(255,255,255,0.55)", padding: "14px 24px", background: cta ? "var(--orange)" : "transparent" }}>{l}</span>
                ))}
              </div>
              <Rule text="Fixed bottom centre on deep sky. Links white at 55%, hover to full white. The get-in-touch chip is sky blue." />
            </div>
          </Section>

          {/* DOT GRID */}
          <Section id="texture" label="/texture" title="Dot grid background">
            <div style={{ position: "relative", height: 180, border: "1px solid var(--border)", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, #d0d0cc 0.8px, transparent 0.8px)", backgroundSize: "28px 28px", opacity: 0.4 }} />
              <div className="rwf-meta" style={{ position: "absolute", bottom: 14, left: 18 }}>0.8px dots &middot; 28px grid &middot; 0.4 opacity &middot; #d0d0cc</div>
            </div>
            <div style={{ marginTop: 20 }}>
              <Rule text="Fixed, full viewport, pointer-events none, behind everything. It appears on every cream page. A defining texture, not decoration." />
              <Rule text="On deep-sky sections the dots switch to sky blue at 0.08 opacity." />
            </div>
          </Section>

          {/* SECTION LABELS */}
          <Section id="labels" label="/section_labels" title="Section labels and the terminal aesthetic">
            <p className="rwf-body" style={{ marginBottom: 20 }}>
              The whole site borrows from developer tools and terminals. It is a brand decision, not
              decoration: it signals someone who builds things, not just talks about them. This is the
              restraint half made visible.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 40px", marginBottom: 20 }}>
              {[["/tools", "Modules menu"], ["/previous", "Case studies"], ["\\build_it_for_you", "Engagement CTA"], ["/the_one_idea", "A section anchor"], ["#about", "In-page anchor"], ["\\ 54 chapters", "Meta item"]].map(([label, desc]) => (
                <div key={label} style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                  <span className="rwf-label" style={{ color: "var(--text-muted)" }}>{label}</span>
                  <span className="rwf-meta">{desc}</span>
                </div>
              ))}
            </div>
            <Rule text="JetBrains Mono, 12px, letter-spacing 2px, uppercase." />
            <Rule text="Forward slashes, hashes, backslashes and file extensions. Sentence-level meaning, machine styling." />
          </Section>

          {/* CARDS AND CURVES */}
          <Section id="cards" label="/cards_and_curves" title="Cards, chrome, and where curves are allowed">
            <p className="rwf-body" style={{ marginBottom: 20 }}>
              This is the one rule that changed. The site is not flat-everywhere anymore, and it is not
              rounded-everywhere either. The line is between chrome and artwork.
            </p>
            <Label>chrome stays square</Label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "var(--border)", marginBottom: 16 }}>
              <div style={{ background: "var(--bg)", padding: "24px 20px" }}>
                <div className="rwf-meta" style={{ color: "var(--orange)" }}>{"\\01"}</div>
                <div className="rwf-h3" style={{ fontSize: 17, margin: "6px 0" }}>Square corners</div>
                <div className="rwf-body" style={{ fontSize: 14 }}>Nav, dividers, section rows, buttons, labels, tables, content cards. All sharp. This is the typewriter-restraint half.</div>
              </div>
              <div style={{ background: "var(--bg)", padding: "24px 20px" }}>
                <div className="rwf-meta" style={{ color: "var(--orange)" }}>{"\\02"}</div>
                <div className="rwf-h3" style={{ fontSize: 17, margin: "6px 0" }}>Subtle hover</div>
                <div className="rwf-body" style={{ fontSize: 14 }}>Background warms to #F5F5F0, or colour shifts to sky blue. No scale, no dramatic transform. translateX for slides, never padding.</div>
              </div>
            </div>

            <div style={{ marginTop: 28 }}>
              <Label>the agent windows are artwork, and they carry the soft corners of the software they depict</Label>
              <div style={{ display: "flex", gap: 12, alignItems: "stretch", marginBottom: 16, flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 200px", background: "#fff", border: "1px solid var(--border)", borderRadius: 9, overflow: "hidden", boxShadow: "0 1px 2px rgba(26,58,78,0.06)" }}>
                  <div style={{ display: "flex", gap: 6, padding: "9px 11px", borderBottom: "1px solid var(--border)" }}>
                    <i style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57", display: "inline-block", boxShadow: "inset 0 0 0 .5px rgba(0,0,0,.06)" }} />
                    <i style={{ width: 11, height: 11, borderRadius: "50%", background: "#febc2e", display: "inline-block", boxShadow: "inset 0 0 0 .5px rgba(0,0,0,.06)" }} />
                    <i style={{ width: 11, height: 11, borderRadius: "50%", background: "#28c840", display: "inline-block", boxShadow: "inset 0 0 0 .5px rgba(0,0,0,.06)" }} />
                  </div>
                  <div style={{ padding: "14px 14px 18px" }}>
                    <div className="rwf-meta" style={{ marginBottom: 8 }}>Campaign Agent</div>
                    <div style={{ background: "#eef1f4", color: "#33322f", borderRadius: 13, borderBottomLeftRadius: 5, padding: "8px 11px", fontSize: 12, fontFamily: "var(--sans)", maxWidth: "85%" }}>Running the batch now.</div>
                  </div>
                </div>
                <div className="rwf-body" style={{ flex: "1 1 240px", fontSize: 14 }}>
                  A window that shows software working borrows the macOS window corner, the rounded chat
                  bubble, the pill badge, because that is what real software looks like. The radius lives
                  inside the window. The page around it stays square.
                </div>
              </div>
              <Rule text="Rounded corners are allowed only on the agent-window artwork. The window frame ~9 to 15px, chat bubbles ~13px, pills fully round." />
              <Rule text={<>The three window dots are real macOS traffic lights: red #ff5f57, amber #febc2e, green #28c840. House style, pinned in the locked agent-card template (card-core.css). They are the one place the depicted-software world shows through in colour, so they are exempt from no-accent-beyond-sky-blue. Do not recolour them to blue.</>} />
              <Because>
                Same logic as a borrowed typeface: a piece of artwork may borrow from the world it depicts,
                and it stays ours because it lives inside our frame. Chrome is always quiet; artwork can be
                as loud, or as soft, as the idea needs. A nav bar never rounds. A depicted app always does.
              </Because>
            </div>
          </Section>

          {/* BUTTONS */}
          <Section id="buttons" label="/buttons" title="Buttons and CTAs">
            <Rule text="Primary: sky blue background, white text, hover darkens to #2F6688. Square." />
            <Rule text="Outline: transparent, 1px sky blue border, hover border to text colour. Square." />
            <Rule text="Link: sky blue text, hover opacity 0.7." />
            <Rule text="All buttons: JetBrains Mono, 12px, letter-spacing 2px, uppercase." />
            <Rule text="The \\ prefix (\\build it for you) is the engagement-CTA syntax. Blue, mono." />
          </Section>

          {/* FOX */}
          <Section id="fox" label="/fox" title="The fox">
            <p className="rwf-body" style={{ marginBottom: 20 }}>
              The fox is the distinctive asset. It carries the personality that keeps everything ours,
              even when the world around it changes. It is the character in the costume.
            </p>
            <Rule text="Transparent PNGs with their soft shadows preserved. Only ever on cream, never on the blue." />
            <Rule text="Many poses: holding the book, sitting, bored, arms folded, walking away. The fox has attitude. Grumpy, slightly bored. Not cute, not corporate." />
            <Rule text="On the homepage the fox drives the scroll: the film shrinks and moves down-right as the agent windows assemble. On reading pages it sits in its own grid column, either side, and is the only reason to split the copy into two columns." />
            <Rule text="No stock photography, ever." />
          </Section>

          {/* ISA */}
          <Section id="isa" label="/isa" title="Isa">
            <p className="rwf-body" style={{ marginBottom: 20 }}>
              Isa is the site&apos;s AI, and a brand surface in her own right. She is now a draggable
              window, not a bubble stuck to the corner: rounded window chrome with three working
              controls, grab her almost anywhere and move her aside. She belongs to the agent-window
              family, so she rounds for the same reason they do.
            </p>
            <Rule text="Do not change Isa or her rules without Paul's say-so. She is a guarded surface." />
            <Rule text="Behaviour: opens herself after a beat on desktop only (she waits for the homepage hero to be scrolled past). On mobile the bubble stays and the visitor taps it. Once dismissed she stays closed for the visit, and reopens next visit." />
            <Rule text="On /contact she opens booking-led instead of book-led, with her own dismissal memory." />
            <Rule text={<>Her voice is a personality, not a tone. Do not improvise her. Load her real system prompt (<code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>src/lib/chat-system-prompt.ts</code>) before writing a word as Isa.</>} />
          </Section>

          {/* HOMEPAGE */}
          <Section id="homepage" label="/homepage" title="The homepage and the agents hero">
            <p className="rwf-body" style={{ marginBottom: 20 }}>
              The homepage is the fullest statement of both-ness. It opens on the statement register (a
              mono headline, almost nothing else), then a fox film shrinks and slides down-right on
              scroll while five draggable agent windows assemble around the dominant Campaign Agent. The
              restraint is the type and the chrome; the life is the film, the fox, and the working
              software in the windows.
            </p>
            <Rule text="The hero lives entirely in AgentsHero.tsx so it can be swapped in one move. Its styles are the ah- block in globals.css." />
            <Rule text={<>Never put <code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>overflow-x: hidden</code> on html, body or .page-wrapper. It silently kills the sticky scroll and the hero renders nothing. Use <code style={{ fontFamily: "var(--mono)", fontSize: 12 }}>overflow-x: clip</code>.</>} />
            <Rule text="Below the hero: bio and contact strip, live Substack carousel, the seven-module nested accordion, testimonials, book block. Mobile is a relayout of the same markup, never a second version and never a crop." />
            <Rule text="Do not touch the nav, the hero or Isa without Paul's explicit say-so." />
          </Section>

          {/* MOTION */}
          <Section id="motion" label="/motion" title="Motion">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 40px", marginBottom: 20 }}>
              {[
                ["Agents assemble", "The homepage signature. Fox film shrinks and moves on scroll while agent windows slide into place around the Campaign Agent."],
                ["Isa window", "Scales and fades in. Draggable. Slides up from the bottom on mobile."],
                ["Accordion", "Click to expand a module, then a tool. No auto-advance."],
                ["Fade-in", "Scroll-triggered, translateY(24px) to 0, opacity 0 to 1. Subtle and sparse."],
              ].map(([n, d]) => (
                <div key={n} style={{ paddingBottom: 18, borderBottom: "1px solid var(--border)" }}>
                  <div className="rwf-h3" style={{ fontSize: 16, marginBottom: 6 }}>{n}</div>
                  <div className="rwf-body" style={{ fontSize: 14 }}>{d}</div>
                </div>
              ))}
            </div>
            <Rule text="Only animate transform and opacity. Never padding, height, letter-spacing, or anything that triggers layout." />
            <Rule text="Clean ease-out, no bounce or elastic. 0.3s default, 0.2s for the snappier chat." />
            <Rule text="Always include a prefers-reduced-motion block that disables animation." />
            <Rule text="Three or four purposeful moments per page, not a theme park. A workflow or flow diagram always animates." />
          </Section>

          {/* BLOCKQUOTES */}
          <Section id="quotes" label="/blockquotes" title="Pull quotes">
            <div style={{ borderLeft: "2px solid var(--orange)", paddingLeft: 24, marginBottom: 20 }}>
              <p className="rwf-standfirst" style={{ fontStyle: "italic" }}>
                This isn&apos;t about AI replacing marketers. It&apos;s about marketers who use AI
                working alongside those who don&apos;t.
              </p>
            </div>
            <Rule text="Left border 2px sky blue, always. Set in the reading register, Source Serif, italic, standfirst size." />
            <Rule text="Never on the blue. The quote is content; it sits on cream." />
          </Section>

          {/* ANTON / BORROWED FACES */}
          <Section id="art" label="/art_direction" title="Anton and borrowed faces">
            <p className="rwf-body" style={{ marginBottom: 20 }}>
              Anton is not in the three-face reading system. It is the art-directed voice for ads, decks
              and anywhere the brand makes a loud creative statement. That is artwork, so it lives by
              different rules to the chrome.
            </p>
            <Rule text="A piece of artwork may borrow a typeface from the world it depicts. The spaced serif on a film-poster ad is correct precisely because it is not our font. Rounders can look like Rounders." />
            <Rule text="The borrowed face lives inside the artwork only. The chrome around it (logo, caption, frame) stays in our voice. Fox in a costume: the character keeps it ours while the world changes." />
            <Rule text="The dial: chrome is always quiet, artwork can be as loud as the idea needs. A deck can run gold-on-black for ten slides. A nav bar never can." />
          </Section>

          {/* WRITING */}
          <Section id="writing" label="/writing" title="Writing style">
            <p className="rwf-body" style={{ marginBottom: 20 }}>
              Full spec lives in the writing-voice skill. The short version: pub voice, peer to peer,
              never staccato. Evidence before opinion.
            </p>
            <Label>voice</Label>
            <Rule text="Conversational, peer to peer, like two mates in a pub. We more than you. Never most teams." />
            <Rule text="Quality and speed are the two themes running through everything." />
            <Rule text="AI is always an opportunity, never a replacement or a threat." />
            <Rule text="Start specific, not with a thesis. No neat endings, no bow, no moral. Just stop." />
            <div style={{ marginTop: 24 }}>
              <Label>hard bans</Label>
              <Rule text="No em dashes. A comma or a full stop." />
              <Rule text="No corporate words: leverage, unlock, activation, ecosystem, synergy, reimagine, future-proof, over-index." />
              <Rule text="No invented specifics. If it was not given, do not make it up." />
              <Rule text="Sentence case for headings. Never Title Case." />
            </div>
          </Section>

          {/* DON'T */}
          <Section id="donts" label="/never_do_this" title="What not to do">
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
              <Dont>No rounded corners on chrome. Rounded corners belong only to the agent-window artwork, which rounds because it depicts software.</Dont>
              <Dont>No mono body on a reading page. Body is Source Serif. Mono is for the machine (labels, meta), not for paragraphs someone reads.</Dont>
              <Dont>No bolding for emphasis, and no heading heavier than its face&apos;s one weight. Hierarchy is size and space.</Dont>
              <Dont>No small serif. Anything smaller than body becomes mono.</Dont>
              <Dont>No capped text measure. Copy runs the full container width unless a real second column holds something.</Dont>
              <Dont>No writing on the blue. Content on cream, deep sky is chrome only.</Dont>
              <Dont>No colour in the chrome beyond sky blue. Colour enters through the artwork.</Dont>
              <Dont>No pure black or pure white backgrounds. No gradients in UI chrome.</Dont>
              <Dont>No stock photography. No images with visible backgrounds.</Dont>
              <Dont>No Title Case in headings. No em dashes. No corporate jargon.</Dont>
              <Dont>No hover-only content. Touch users cannot hover, so use tap patterns.</Dont>
              <Dont>No animating layout properties, and no skipping prefers-reduced-motion.</Dont>
            </div>
          </Section>

        </div>
      </div>
    </div>
  );
}
