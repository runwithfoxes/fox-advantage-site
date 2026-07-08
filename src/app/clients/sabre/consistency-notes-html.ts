/* Brand consistency notes rendered INLINE in the Sabre client page. Scoped under
   .cn-root so nothing leaks into the workspace. Written to be NEUTRAL: each note
   shows what the brand book says (with the page reference) and what the shipped
   files measure, then asks for a ruling. No judgement, no recommendation.
   Findings come from the pixel rebuild of the webinar display set (receipts in
   the calibrate folder) and a page-level read of both brand PDFs. */
export const consistencyNotesHtml = `
<style>
  .cn-root {
    --cn-terra: #E2553C; --cn-ink: #1a1a1a; --cn-paper: #F3EFE4;
    --cn-muted: #6b6b6b; --cn-line: #d8d2c4;
    background: var(--cn-paper); color: var(--cn-ink);
    font-family: "APK Galeria", -apple-system, "Helvetica Neue", Arial, sans-serif;
    -webkit-font-smoothing: antialiased; padding: 30px 26px 34px; border: 1px solid var(--cn-line);
  }
  .cn-root *, .cn-root *::before, .cn-root *::after { box-sizing: border-box; }
  .cn-root .cn-inner { max-width: 860px; margin: 0 auto; }
  .cn-root .cn-intro { font-size: 14.5px; line-height: 1.65; color: var(--cn-muted); margin: 0 0 6px; }
  .cn-root .cn-intro b { color: var(--cn-ink); font-weight: 700; }
  .cn-root .cn-note { border: 1px solid var(--cn-ink); background: #fff; margin: 22px 0 0; }
  .cn-root .cn-note-head { display: flex; align-items: center; gap: 12px; padding: 12px 20px; border-bottom: 1px solid var(--cn-line); }
  .cn-root .cn-num { width: 30px; height: 30px; flex: 0 0 30px; display: inline-flex; align-items: center; justify-content: center; background: var(--cn-ink); color: #fff; font-size: 15px; font-weight: 800; }
  .cn-root .cn-note-head h3 { font-size: 16px; margin: 0; font-weight: 800; }
  .cn-root .cn-body { padding: 16px 20px 18px; }
  .cn-root .cn-row { margin: 0 0 12px; font-size: 14px; line-height: 1.6; }
  .cn-root .cn-row:last-child { margin-bottom: 0; }
  .cn-root .cn-label { display: block; font-size: 11px; letter-spacing: 1.6px; text-transform: uppercase; color: var(--cn-terra); font-weight: 700; margin: 0 0 3px; }
  .cn-root .cn-ruling { background: var(--cn-paper); border: 1px solid var(--cn-line); padding: 10px 14px; }
  .cn-root .cn-close { font-size: 13px; line-height: 1.6; color: var(--cn-muted); margin: 22px 0 0; }
</style>
<div class="cn-root"><div class="cn-inner">
  <p class="cn-intro">While rebuilding the webinar display set to the pixel, we measured every element
  of the original files: positions, colours, type, geometry. Three places surfaced where the files and
  the brand book differ. <b>None of this is a quality judgement</b>, and a deliberate evolution of the
  look is always the brand owner's call. Each note shows what the book says and what the files measure,
  and asks for a ruling. Whichever way each ruling lands becomes the standard we hold every future
  piece to.</p>

  <div class="cn-note">
    <div class="cn-note-head"><span class="cn-num">1</span><h3>Background colour on the light scenes</h3></div>
    <div class="cn-body">
      <p class="cn-row"><span class="cn-label">What the book says</span>
      The primary palette is Terracotta, Black, Off-White and White (Brand Summary p12). The stated
      typical usage pairs Terracotta with Off-White, "with Black and White used for text" (p11).</p>
      <p class="cn-row"><span class="cn-label">What the files measure</span>
      The webinar set's light scenes sit on pure white, #FFFFFF exactly, on the 300x250, 970x250 and
      640x480 files. The earlier OPEN route carries the Off-White field, #F3EFE4 exactly.</p>
      <p class="cn-row cn-ruling"><span class="cn-label">The ruling to make</span>
      Keep pure white as the webinar family's look, or return future sets to Off-White fields.
      Either answer works; it then gets applied consistently.</p>
    </div>
  </div>

  <div class="cn-note">
    <div class="cn-note-head"><span class="cn-num">2</span><h3>Typeface in the webinar set</h3></div>
    <div class="cn-body">
      <p class="cn-row"><span class="cn-label">What the book says</span>
      "Our brand typeface is APK Galeria" (Brand Summary p18). Arial is the stated system alternative
      for Word, email platforms and similar applications (p19).</p>
      <p class="cn-row"><span class="cn-label">What the files measure</span>
      The webinar set's type measures as Helvetica. We identified it by rendering the same copy in each
      candidate font and comparing against the files pixel by pixel, rather than assuming. The earlier
      route sets are set in APK Galeria.</p>
      <p class="cn-row cn-ruling"><span class="cn-label">The ruling to make</span>
      Accept Helvetica as this set's look, or re-set the family in APK Galeria. If the webinar source
      files used a specific cut we have not seen, sharing it settles the weight question at the same time.</p>
    </div>
  </div>

  <div class="cn-note">
    <div class="cn-note-head"><span class="cn-num">3</span><h3>The tagline, once, in email</h3></div>
    <div class="cn-body">
      <p class="cn-row"><span class="cn-label">What the book says</span>
      The tagline stands alone: "don't attach other words to it" (Verbal Identity p20).</p>
      <p class="cn-row"><span class="cn-label">What the files show</span>
      One live email signs off with "Let's get going!", the locked line with an added exclamation mark.
      No words attached; the book simply never renders the line with one. A small thing, noted only
      because the tagline is the brand's most protected line.</p>
      <p class="cn-row cn-ruling"><span class="cn-label">The ruling to make</span>
      Whether the exclamation version is acceptable in email sign-offs. Separately: p26 of the verbal
      guidelines mentions a fuller Voice Guide; we would value a copy for anything broader on copy.</p>
    </div>
  </div>

  <p class="cn-close">Rulings can go in the feedback section below or straight to Paul. Each one gets
  recorded and then applied to every future piece automatically, the same way these measurements were
  made.</p>
</div></div>
`;
