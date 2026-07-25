#!/usr/bin/env python3
"""Prove a ported figure is the SAME figure as the one on the figures page, frame by frame.

    python3 scripts/compare-figures.py                 # every figure
    python3 scripts/compare-figures.py fig-14 fig-24   # named ones
    python3 scripts/compare-figures.py fig-14 --control  # prove the test can go red

Renders each figure twice at the same seek times: once out of course-figures.html carrying
the page's own global stylesheet, which is the source of truth, and once out of
figures.generated.ts carrying only the CSS the extractor decided it needed. Then diffs the
pixels and writes a diff image wherever they disagree.

⭐ THIS IS THE ASSERTION THAT CAN FAIL. Reading the extractor's output and finding it
convincing is not verification. A dropped keyframe, a shadow filter left behind, a colour
that fell back to black because a var() did not resolve: every one of those looks
completely fine in a diff of the code, and none of them survive this.

⭐ AND IT HAS A PLANTED CONTROL. `--control` strips each figure's own style block, which is
exactly what a port that hoisted CSS to a page level would ship, and the run must go RED.
A green run with no control is indistinguishable from a test that cannot fail.

⚠️ Needs the figure to hold still. Both sides get `html.seek` plus a negative
animation-delay, which is the figures page's own seek mechanism, so a frame is computed
rather than captured mid-flight.
"""
import importlib.util
import json
import pathlib
import re
import sys

HERE = pathlib.Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
from shot import shot_or_die  # noqa: E402

REPO = HERE.parent
PAGE = pathlib.Path.home() / "paul-hub/intelligence/course-build/course-figures.html"
GEN = REPO / "src/app/course/figures/figures.generated.ts"
WORK = REPO / ".figure-compare"
PROFILE = str(WORK / "chrome-profile")

FONT = ('<link href="https://fonts.googleapis.com/css2?'
        'family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@400;500&display=swap"'
        ' rel="stylesheet">')
PLATE = ("background:#fff;background-image:radial-gradient(circle,"
         "rgba(208,208,204,.4) .8px,transparent .8px);background-size:28px 28px")
SEEK = ('<script>const q=new URLSearchParams(location.search).get("t");'
        'if(q!==null){document.documentElement.style.setProperty("--seek",q+"s");'
        'document.documentElement.classList.add("seek");}</script>')
SEEKCSS = ("html.seek *{animation-play-state:paused !important;"
           "animation-delay:calc(-1 * var(--seek)) !important}")


def extractor():
    spec = importlib.util.spec_from_file_location("xf", HERE / "extract-figures.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def page_svg(xf, src, name):
    """The figure as it stands on the page, found by the fig-NN label in the bar under it.
    ⚠️ NOT by id. The 13 still figures carry no id on the page, which is why the extractor
    gives them one. Looking those up by id finds nothing and reads like a missing figure."""
    for svg, end in xf.svgs(src):
        if xf.fig_number(src, end) == name:
            return svg
    sys.exit(f"no figure called {name} on the page")


def wrap(body_svg, extra_css):
    return ('<!doctype html><html><head><meta charset="utf-8">' + FONT +
            "<style>" + extra_css + SEEKCSS +
            "body{margin:0;" + PLATE + ";width:720px}"
            "svg{display:block;width:720px;height:auto}</style></head><body>"
            + body_svg + SEEK + "</body></html>")


def diff(a, b, out):
    """Percentage of pixels differing by more than a trivial amount. Writes a diff image
    wherever they do, so a failure gets LOOKED at rather than argued about."""
    import numpy as np
    from PIL import Image
    ia = np.asarray(Image.open(a).convert("RGB"), dtype=np.int16)
    ib = np.asarray(Image.open(b).convert("RGB"), dtype=np.int16)
    if ia.shape != ib.shape:
        print(f"  RED size mismatch: {ia.shape} vs {ib.shape}")
        return 100.0
    bad = np.abs(ia - ib).max(axis=2) > 8
    if bad.any():
        vis = np.asarray(Image.open(a).convert("RGB")).copy()
        vis[bad] = [255, 0, 0]
        Image.fromarray(vis).save(out)
    return 100.0 * bad.sum() / bad.size


def main(argv):
    control = "--control" in argv
    reduced = "--reduced" in argv
    names = [a for a in argv if not a.startswith("--")]

    text = GEN.read_text()
    gen = json.loads(text[text.index("= {", text.index("export const FIGURES")) + 2:
                          text.rindex("};") + 1])
    src = PAGE.read_text()
    page_css = re.search(r"<style>(.*?)</style>", src, re.S).group(1)
    xf = extractor()
    WORK.mkdir(exist_ok=True)

    worst = 0.0
    for name in names or list(gen):
        fig = gen[name]
        mine = fig["svg"]
        if control:
            i = mine.index("<style>")
            j = mine.index("</style>") + len("</style>")
            mine = mine[:i] + mine[j:]
        (WORK / "mine.html").write_text(wrap(mine, ""))
        (WORK / "page.html").write_text(wrap(page_svg(xf, src, name), page_css))

        # A still holds one state, so one frame proves it. An animated figure gets three:
        # before the first move, mid move, and the second it holds its finished state.
        # Under reduced motion every animation is off, so the figure holds one state and
        # one frame proves it. Three frames there would just be the same picture, thrice.
        frames = ("0.5", "2.5", "4.8") if (fig["animated"] and not reduced) else ("2.5",)
        for t in frames:
            a = WORK / f"page-{name}-{t}.png"
            b = WORK / f"mine-{name}-{t}.png"
            shot_or_die(f"file://{WORK}/page.html?t={t}", a, 720, 320, 3.0, profile=PROFILE,
                        reduced=reduced)
            shot_or_die(f"file://{WORK}/mine.html?t={t}", b, 720, 320, 3.0, profile=PROFILE,
                        reduced=reduced)
            pct = diff(a, b, WORK / f"diff-{name}-{t}.png")
            worst = max(worst, pct)
            print(f"  {'OK ' if pct < 0.05 else 'RED'} {name} t={t}s  {pct:.3f}% differ")

    print(f"\nworst frame: {worst:.3f}%")
    if control:
        print("control run: RED is the pass. Green here means the test cannot fail.")
        return 0 if worst >= 0.05 else 1
    return 0 if worst < 0.05 else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
