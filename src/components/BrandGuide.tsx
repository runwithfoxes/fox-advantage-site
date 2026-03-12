"use client";

import Link from "next/link";

function Swatch({ hex, name, cssVar, usage }: { hex: string; name: string; cssVar: string; usage: string }) {
  const isLight = ["#FAFAF8", "#F7EAD9", "#E0E0DC", "#F5F5F0", "#F0F0EC"].includes(hex);
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
      <div
        style={{
          width: 64,
          height: 64,
          minWidth: 64,
          background: hex,
          border: isLight ? "1px solid var(--border)" : "none",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          padding: 6,
        }}
      >
        <span style={{ fontFamily: "var(--mono)", fontSize: 9, fontWeight: 400, color: isLight ? "var(--text-muted)" : "#fff", letterSpacing: 0.5 }}>{hex}</span>
      </div>
      <div>
        <div style={{ fontFamily: "var(--sans)", fontSize: 16, fontWeight: 400, letterSpacing: -0.3 }}>{name}</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 300, color: "var(--text-muted)", marginTop: 2 }}>{cssVar}</div>
        <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 300, color: "var(--text-muted)", lineHeight: 1.7, marginTop: 4 }}>{usage}</div>
      </div>
    </div>
  );
}

function SectionBlock({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: "80px 0" }}>
      <div className="container">
        <div className="section-label">{label}</div>
        <h2 className="section-title">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Rule({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "baseline", marginBottom: 10 }}>
      <span style={{ color: "var(--orange)", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400 }}>\\</span>
      <span style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: "var(--text)" }}>{text}</span>
    </div>
  );
}

function TypeRow({ font, size, weight, spacing, usage, sample }: { font: string; size: string; weight: string; spacing: string; usage: string; sample: string }) {
  const fontFamily = font === "Space Grotesk" ? "var(--sans)" : "var(--mono)";
  return (
    <div style={{ paddingBottom: 28, marginBottom: 28, borderBottom: "1px solid var(--border)" }}>
      <div style={{ fontFamily, fontSize: size, fontWeight: weight, letterSpacing: spacing, lineHeight: 1.2, marginBottom: 8 }}>{sample}</div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 1, color: "var(--orange)" }}>{font}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 300, color: "var(--text-muted)" }}>{size} / {weight} / {spacing}</span>
        <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 300, color: "var(--text-muted)" }}>{usage}</span>
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div style={{
      background: "#1D1B1B",
      padding: "20px 24px",
      marginTop: 16,
      marginBottom: 16,
      fontFamily: "var(--mono)",
      fontSize: 13,
      fontWeight: 300,
      lineHeight: 2,
      color: "rgba(255,255,255,0.6)",
      maxWidth: 560,
      overflowX: "auto",
    }}>
      <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{children}</pre>
    </div>
  );
}

export default function BrandGuide() {
  return (
    <div className="chapter-page">
      {/* NAV */}
      <header className="chapter-nav">
        <Link href="/" className="chapter-nav-back">/&thinsp;<span style={{ color: "var(--orange)" }}>Run</span>withfoxes</Link>
        <span className="chapter-nav-count">brand guide</span>
      </header>

      <div className="chapter-main" style={{ paddingTop: 100 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* HERO */}
          <div style={{ marginBottom: 80 }}>
            <div className="chapter-part-label">// internal reference</div>
            <h1 style={{ fontFamily: "var(--sans)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, letterSpacing: -1, lineHeight: 1.1, marginBottom: 24 }}>
              Brand guide
            </h1>
            <p style={{ fontFamily: "var(--mono)", fontSize: 14, fontWeight: 300, lineHeight: 1.9, color: "var(--text-muted)", maxWidth: 560 }}>
              Everything you need to keep runwithfoxes.com looking and sounding like itself. Colours, fonts, components, writing rules, and the things we never do.
            </p>
          </div>

          <hr className="divider" />

          {/* COLOURS */}
          <SectionBlock id="colours" label="/colours" title="Colour palette">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 64px", marginTop: 32 }}>
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Primary</div>
                <Swatch hex="#F47521" name="Orange" cssVar="--orange" usage="Primary accent. CTAs, links, hover states, stats, active nav" />
                <Swatch hex="#E06A1A" name="Orange hover" cssVar="n/a" usage="Button hover state" />
                <Swatch hex="#355E4C" name="Charcoal" cssVar="--charcoal" usage="Dark sections, bottom bar, chat send button. Deep green-tinted dark, not black" />
                <Swatch hex="#F7EAD9" name="Cream" cssVar="--cream" usage="Warm highlight. Used sparingly" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Neutrals</div>
                <Swatch hex="#FAFAF8" name="Background" cssVar="--bg" usage="Page background. Warm off-white" />
                <Swatch hex="#1D1B1B" name="Text" cssVar="--text" usage="Primary body text. Near-black" />
                <Swatch hex="#8A8A85" name="Text muted" cssVar="--text-muted" usage="Secondary text, labels, nav defaults" />
                <Swatch hex="#E0E0DC" name="Border" cssVar="--border" usage="Dividers, card borders, subtle lines" />
                <Swatch hex="#F5F5F0" name="Card hover" cssVar="n/a" usage="Card background on hover" />
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 16 }}>Rules</div>
              <Rule text="Orange is the only loud colour. The rest is warm neutrals." />
              <Rule text="Charcoal is NOT black. It's a dark forest green (#355E4C)." />
              <Rule text="Never use pure black (#000) or pure white (#FFF) as backgrounds." />
              <Rule text="No additional accent colours. No blues, reds, greens in content." />
              <Rule text="White text only on charcoal backgrounds and orange buttons." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* TYPOGRAPHY */}
          <SectionBlock id="type" label="/typography" title="Type system">
            <div style={{ marginTop: 32 }}>
              <TypeRow font="Space Grotesk" size="clamp(48px, 8vw, 96px)" weight="300" spacing="-2px" usage="Hero heading" sample="The Fox Advantage" />
              <TypeRow font="Space Grotesk" size="clamp(36px, 5vw, 64px)" weight="300" spacing="-1px" usage="Section titles" sample="Fox thinking, not hedgehog thinking" />
              <TypeRow font="Space Grotesk" size="24px" weight="400" spacing="-0.5px" usage="Part and project names" sample="Mental Availability in action" />
              <TypeRow font="Space Grotesk" size="18px" weight="400" spacing="-0.3px" usage="Chapter titles in lists" sample="The marketing department autopsy report" />
              <TypeRow font="JetBrains Mono" size="15px" weight="300" spacing="0" usage="Chapter prose, body copy" sample="The marketing department as we knew it is gone. The stack collapsed." />
              <TypeRow font="JetBrains Mono" size="14px" weight="300" spacing="0" usage="About text, descriptions" sample="This book started as notes to myself. Then it became a Substack." />
              <TypeRow font="JetBrains Mono" size="12px" weight="400" spacing="2px" usage="Buttons (uppercase)" sample="GET THE BOOK" />
              <TypeRow font="JetBrains Mono" size="11px" weight="400" spacing="2px" usage="Labels, tags (uppercase)" sample="\MENTAL_AVAILABILITY" />
            </div>

            <div style={{ marginTop: 40 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 16 }}>Rules</div>
              <Rule text="Headings are always light weight (300). Never bold." />
              <Rule text="Body copy is light weight (300). Strong tags use 500." />
              <Rule text="Negative letter-spacing on large headings, positive on small uppercase labels." />
              <Rule text="Sentence case for all headings. Never Title Case." />
              <Rule text="JetBrains Mono is the default body font. Monospace is the brand." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* LOGO */}
          <SectionBlock id="logo" label="/logo" title="Logo">
            <div style={{ marginTop: 32, padding: "48px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 26, fontWeight: 300, letterSpacing: 4, color: "var(--text-muted)" }}>
                /<span style={{ color: "var(--orange)" }}>Run</span>withfoxes
              </span>
            </div>
            <div style={{ marginTop: 24 }}>
              <Rule text="Text-only. No image logo, no icon." />
              <Rule text='JetBrains Mono, weight 300, letter-spacing 2px.' />
              <Rule text='"Run" is orange (#F47521). Everything else is muted (#8A8A85).' />
              <Rule text="Starts with a forward slash." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* NAVIGATION */}
          <SectionBlock id="nav" label="/navigation" title="Navigation">
            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Top bar</div>
              <div style={{
                background: "rgba(250, 250, 248, 0.85)",
                backdropFilter: "blur(12px)",
                borderBottom: "1px solid var(--border)",
                padding: "16px 48px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 300, letterSpacing: 2, color: "var(--text-muted)" }}>
                  /<span style={{ color: "var(--orange)" }}>Run</span>withfoxes
                </span>
                <div style={{ display: "flex", gap: 32 }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "var(--orange)" }}>#about</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "var(--text-muted)" }}>chapters.md</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "var(--text-muted)" }}>/projects</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "var(--text-muted)" }}>author.txt</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "var(--orange)" }}>/get_the_book</span>
                </div>
              </div>
              <Rule text="Fixed position, z-index 100, backdrop-filter: blur(12px)." />
              <Rule text="Semi-transparent background: rgba(250, 250, 248, 0.85)." />
              <Rule text="Links use terminal/code aesthetic: #about, chapters.md, /projects." />
              <Rule text="Default link colour: muted. Hover and active: orange. Transition 0.3s." />
              <Rule text="Mobile (under 768px): nav links hidden, logo only." />
            </div>

            <div style={{ marginTop: 40 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Bottom bar</div>
              <div style={{
                background: "var(--charcoal)",
                display: "inline-flex",
                marginBottom: 16,
              }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "var(--orange)", padding: "14px 28px" }}>#top</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "rgba(255,255,255,0.5)", padding: "14px 28px" }}>chapters.md</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "rgba(255,255,255,0.5)", padding: "14px 28px" }}>/projects</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 1, color: "#fff", padding: "14px 28px", background: "var(--orange)" }}>get the book</span>
              </div>
              <Rule text="Fixed to bottom centre. Background: charcoal (#355E4C)." />
              <Rule text="Links: white at 50% opacity, hover to full white. Active: orange." />
              <Rule text="CTA: orange background, white text." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* DOT GRID */}
          <SectionBlock id="texture" label="/texture" title="Dot grid background">
            <div style={{
              marginTop: 32,
              position: "relative",
              height: 200,
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0, left: 0, width: "100%", height: "100%",
                backgroundImage: "radial-gradient(circle, #d0d0cc 0.8px, transparent 0.8px)",
                backgroundSize: "28px 28px",
                opacity: 0.4,
              }} />
              <div style={{
                position: "absolute",
                bottom: 16, left: 20,
                fontFamily: "var(--mono)", fontSize: 11, fontWeight: 300, color: "var(--text-muted)",
              }}>
                0.8px dots · 28px grid · 0.4 opacity · #d0d0cc
              </div>
            </div>

            <div style={{
              marginTop: 16,
              position: "relative",
              height: 200,
              background: "var(--charcoal)",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute",
                top: 0, left: 0, width: "100%", height: "100%",
                backgroundImage: "radial-gradient(circle, rgba(244, 117, 33, 0.08) 0.8px, transparent 0.8px)",
                backgroundSize: "28px 28px",
              }} />
              <div style={{
                position: "absolute",
                bottom: 16, left: 20,
                fontFamily: "var(--mono)", fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,0.4)",
              }}>
                charcoal variant · orange dots at 0.08 opacity
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <Rule text="Fixed position, full viewport, pointer-events none, z-index 0." />
              <Rule text="This dot grid appears on every page. It's a defining visual element." />
              <Rule text="On charcoal sections, dots switch to orange at 0.08 opacity." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* SECTION LABELS */}
          <SectionBlock id="labels" label="/section_labels" title="Section labels">
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 48px" }}>
              {[
                ["// a book by paul dervan", "Hero label"],
                ["/what_collapsed", "About section"],
                ["/structure", "Parts section"],
                ["/chapters.md", "Chapters section"],
                ["/projects", "Projects section"],
                ["/author.txt", "Author section"],
                ["/get_the_book", "Gate/signup section"],
                ["\\part_01", "Part numbering"],
              ].map(([label, desc]) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, letterSpacing: 2, color: "var(--text-muted)", textTransform: "uppercase" }}>{label}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 300, color: "var(--text-muted)", opacity: 0.6 }}>{desc}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <Rule text="JetBrains Mono, 12px, weight 400, letter-spacing 2px, uppercase." />
              <Rule text="Use forward slashes, hashtags, backslashes, and file extensions." />
              <Rule text="This terminal aesthetic is core to the brand identity." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* CARDS AND HOVER */}
          <SectionBlock id="hover" label="/interactions" title="Cards and hover effects">
            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Part and project cards</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, background: "var(--border)", marginBottom: 16 }}>
                <div className="part-card">
                  <div className="part-number">\01</div>
                  <div className="part-name">What just collapsed</div>
                  <div className="part-desc">Hover this card to see the background shift to #F5F5F0</div>
                </div>
                <div className="part-card">
                  <div className="part-number">\02</div>
                  <div className="part-name">Better together</div>
                  <div className="part-desc">Subtle. No dramatic transforms. Just a gentle warmth.</div>
                </div>
              </div>
              <Rule text="Background shifts from #FAFAF8 to #F5F5F0 on hover." />
              <Rule text="No border-radius. Sharp corners throughout." />
              <Rule text="All transitions use 0.3s duration." />
            </div>

            <div style={{ marginTop: 40 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Chapter list items</div>
              <div style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="chapter-item" style={{ cursor: "pointer" }}>
                  <span className="chapter-num">01</span>
                  <span className="chapter-title">Hover to see the slide and colour shift</span>
                  <span className="chapter-arrow">→</span>
                </div>
                <div className="chapter-item" style={{ cursor: "pointer" }}>
                  <span className="chapter-num">02</span>
                  <span className="chapter-title">Title turns orange, arrow fades in</span>
                  <span className="chapter-arrow">→</span>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <Rule text="Hover slides content right (padding-left: 12px)." />
                <Rule text="Title colour transitions to orange." />
                <Rule text="Arrow (initially opacity 0) fades in as orange." />
              </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Hover philosophy</div>
              <Rule text="Subtle. No dramatic transforms, no scale changes." />
              <Rule text="Colour shift to orange is the primary hover pattern." />
              <Rule text="Padding and letter-spacing shifts create gentle motion." />
              <Rule text="'Read more →' links: letter-spacing expands from 1.5px to 2.5px on hover." />
              <Rule text="Link hover: opacity drops to 0.7." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* BUTTONS */}
          <SectionBlock id="buttons" label="/buttons" title="Buttons and CTAs">
            <div style={{ marginTop: 32, display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <button className="gate-button">get the book</button>
              <a href="#" className="rwf-buy-btn" onClick={e => e.preventDefault()}>buy on amazon</a>
              <a href="#" style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 400, color: "var(--orange)", textDecoration: "none", letterSpacing: 0.5 }} onClick={e => e.preventDefault()}>text link →</a>
            </div>
            <div style={{ marginTop: 24 }}>
              <Rule text="Primary: orange bg (#F47521), white text, hover darkens to #E06A1A." />
              <Rule text="Outline: transparent bg, 1px orange border, hover border shifts to text colour." />
              <Rule text="Link: orange text, hover opacity 0.7." />
              <Rule text="All buttons: JetBrains Mono, 12px, weight 400, letter-spacing 2px, uppercase." />
              <Rule text="No border-radius. Sharp corners." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* FOX IMAGERY */}
          <SectionBlock id="fox" label="/fox_imagery" title="Fox placement">
            <div style={{ marginTop: 32 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 12 }}>Hero</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: "var(--text-muted)" }}>
                    340px width<br />
                    Right side of grid<br />
                    Double drop-shadow (24px + 8px)<br />
                    Mobile: 240px
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 12 }}>Gate section</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: "var(--text-muted)" }}>
                    260px width<br />
                    Right column<br />
                    Opacity 0.9<br />
                    Mobile: 160px
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 12 }}>Chapter pages</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: "var(--text-muted)" }}>
                    180px, float right<br />
                    Negative margin (-60px)<br />
                    shape-outside: margin-box<br />
                    Mobile: 140px, centred
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 32 }}>
              <Rule text="All foxes are transparent PNGs with preserved semi-transparent shadows." />
              <Rule text="Multiple poses: holding book, sitting, bored, arms folded, walking away." />
              <Rule text="The fox has attitude. Grumpy, slightly bored. Not cute, not corporate." />
              <Rule text="No stock photography. Ever." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* ANIMATIONS */}
          <SectionBlock id="motion" label="/motion" title="Animations">
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 48px" }}>
              {[
                ["Number counter", "Stats count from 0 to value. Ease-out quintic, 1200-3000ms. Triggered on scroll via IntersectionObserver."],
                ["Chat bubble", "Scales from 0 to 1 with opacity. 0.4s ease-out. Hover: scale 1.08, shadow expands."],
                ["Chat panel", "Scale 0.9→1, translateY 10px→0. 0.25s. Mobile: slides up from bottom."],
                ["Typing indicator", "Opacity pulses 0.3→1, 1s infinite loop."],
                ["Chapter accordion", "Click to expand/collapse. First group open by default. +/− indicator."],
                ["SVG chart", "Stroke-dashoffset animation for line drawing effect."],
              ].map(([name, desc]) => (
                <div key={name} style={{ paddingBottom: 24, borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontFamily: "var(--sans)", fontSize: 16, fontWeight: 400, letterSpacing: -0.3, marginBottom: 8 }}>{name}</div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 300, lineHeight: 1.8, color: "var(--text-muted)" }}>{desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <Rule text="Global transition default: 0.3s on all properties." />
              <Rule text="Chat uses 0.2s for snappier feel." />
              <Rule text="No bouncy or elastic easing. Clean ease-out only." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* BLOCKQUOTES */}
          <SectionBlock id="quotes" label="/blockquotes" title="Blockquotes and pull quotes">
            <div style={{ marginTop: 32 }}>
              <blockquote style={{ borderLeft: "2px solid var(--orange)", paddingLeft: 20, margin: "0 0 32px", color: "var(--text-muted)", fontStyle: "italic", fontFamily: "var(--mono)", fontSize: 15, fontWeight: 300, lineHeight: 2 }}>
                The marketing department as we knew it is gone. The stack collapsed. The specialists are being replaced by generalists with tools.
              </blockquote>
              <div style={{ borderLeft: "2px solid var(--orange)", paddingLeft: 32, maxWidth: 560 }}>
                <p style={{ fontFamily: "var(--sans)", fontSize: 17, fontWeight: 300, lineHeight: 1.7, fontStyle: "italic", color: "var(--text)", margin: 0 }}>
                  This isn&apos;t about AI replacing marketers. It&apos;s about marketers who use AI replacing those who don&apos;t.
                </p>
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <Rule text="Left border: 2px solid orange. Always." />
              <Rule text="In-chapter: JetBrains Mono, muted text, italic." />
              <Rule text="Pull quotes: Space Grotesk, 17px, weight 300, italic." />
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* TERMINAL AESTHETIC */}
          <SectionBlock id="terminal" label="/aesthetic" title="The code/terminal aesthetic">
            <div style={{ marginTop: 32 }}>
              <p style={{ fontFamily: "var(--mono)", fontSize: 14, fontWeight: 300, lineHeight: 1.9, color: "var(--text)", maxWidth: 640, marginBottom: 24 }}>
                The entire site borrows from developer tools and terminals. This is a core brand decision, not decoration. It signals &quot;this person builds things, not just talks about them.&quot;
              </p>
              <CodeBlock>{`// Navigation uses file paths and commands
#about    chapters.md    /projects    author.txt

// Section labels use terminal prefixes
/what_collapsed    /structure    /get_the_book

// Part numbers are zero-padded with backslash
\\part_01    \\part_02    \\part_03

// Project tags use backslash prefix
\\mental_availability    \\brand    \\fame_strategy

// Meta items use backslash
\\ 54 chapters    \\ 4 parts    \\ free to read`}</CodeBlock>
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* WRITING STYLE */}
          <SectionBlock id="writing" label="/writing_style" title="Writing style">
            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Voice</div>
              <Rule text="Conversational, peer-to-peer. Like two mates in a pub." />
              <Rule text="Direct. Short sentences mixed with longer ones. Uneven rhythm." />
              <Rule text='Irish inflection where it fits: "deadly", "hoover", "mate". Nothing forced.' />
              <Rule text='Uses "we" more than "you". Never "most people".' />
              <Rule text="Evidence and observation first, judgement after." />
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Opening recipe</div>
              <Rule text="Start with a small lived moment: a meeting, a phone call, a queue." />
              <Rule text="One odd detail: a brand name, a timestamp, a place like Carrickmines." />
              <Rule text="Short verdict line. Then the turn. Then the bigger point." />
              <Rule text="No neat endings. No bow, no lesson, no moral. Just stop." />
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Hard bans</div>
              <Rule text="No em dashes. Use a comma or full stop." />
              <Rule text="No corporate words: future-proof, over-index, activation, ecosystem, leverage, unlock, synergy, reimagine." />
              <Rule text="No invented specifics. If it wasn't given, don't make it up." />
              <Rule text="Sentence case for all headings. Never Title Case." />
            </div>

            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 20 }}>Examples from the site</div>
              <div style={{ display: "grid", gap: 24 }}>
                {[
                  ["Hero", "How to thrive in marketing because of AI, not despite it. 54 short chapters. No jargon. No fluff."],
                  ["About", "The marketing department as we knew it is gone. The stack collapsed. The specialists are being replaced by generalists with tools."],
                  ["Part description", "The reps. The poking. The building. The five behaviour shifts that separate foxes from hedgehogs."],
                  ["Author bio", "Marketing leader. Currently figuring out what happens when AI collapses the marketing stack, one experiment at a time."],
                  ["Gate CTA", "Parts 1 and 2 are live now. Drop your email and we'll send the rest when it's ready."],
                ].map(([label, text]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, color: "var(--text-muted)", letterSpacing: 1, marginBottom: 6 }}>{label}</div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: "var(--text)", borderLeft: "2px solid var(--border)", paddingLeft: 16 }}>{text}</div>
                  </div>
                ))}
              </div>
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* RESPONSIVE */}
          <SectionBlock id="responsive" label="/responsive" title="Responsive breakpoints">
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 32 }}>
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 12 }}>Desktop</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 300, lineHeight: 1.8, color: "var(--text-muted)" }}>
                  Full layout<br />
                  2-column grids<br />
                  Visible top nav<br />
                  Centred bottom bar<br />
                  Container: 48px padding
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 12 }}>max 768px</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 300, lineHeight: 1.8, color: "var(--text-muted)" }}>
                  Single column<br />
                  Top nav hidden<br />
                  Full-width bottom bar<br />
                  Container: 24px padding<br />
                  Sections: 80px vertical
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400, letterSpacing: 2, color: "var(--orange)", textTransform: "uppercase", marginBottom: 12 }}>max 380px</div>
                <div style={{ fontFamily: "var(--mono)", fontSize: 12, fontWeight: 300, lineHeight: 1.8, color: "var(--text-muted)" }}>
                  Container: 16px padding<br />
                  Hero fox: 180px<br />
                  Chapter fox: 110px<br />
                  Smaller fonts<br />
                  Tighter bar padding
                </div>
              </div>
            </div>
          </SectionBlock>

          <hr className="divider" />

          {/* DO NOT */}
          <SectionBlock id="donts" label="/never_do_this" title="What not to do">
            <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 48px" }}>
              {[
                "No rounded corners on cards, buttons, or panels",
                "No gradients in UI elements",
                "No heavy shadows",
                "No decorative icons or emoji",
                "No bold heading weights (300 or 400 only)",
                "No pure black (#000) or pure white (#FFF) backgrounds",
                "No additional accent colours beyond orange",
                "No images with visible backgrounds",
                "No stock photography",
                "No Title Case in headings",
                "No em dashes in copy",
                "No corporate jargon",
              ].map((rule) => (
                <div key={rule} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                  <span style={{ color: "#c44", fontFamily: "var(--mono)", fontSize: 11, fontWeight: 400 }}>✕</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: 13, fontWeight: 300, lineHeight: 1.8, color: "var(--text)" }}>{rule}</span>
                </div>
              ))}
            </div>
          </SectionBlock>

          <div style={{ height: 120 }} />
        </div>
      </div>
    </div>
  );
}
