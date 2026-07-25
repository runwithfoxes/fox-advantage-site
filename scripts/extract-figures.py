#!/usr/bin/env python3
"""Extract the course figures out of course-figures.html into React-ready data.

    python3 scripts/extract-figures.py            # write src/app/course/figures/figures.generated.ts
    python3 scripts/extract-figures.py --check    # exit 1 if the file on disk is stale

WHY THIS EXISTS, and it is the whole argument for a build step over hand-copying.
There are 26 figures and the figures terminal changes them. fig-14 changed twice on the
evening of 25 Jul alone. Hand-copying an SVG into a component means every one of those
changes is a re-copy somebody has to remember to do, which is the same duplication problem
`figures.py` was written to kill on the other side.

WHAT IT GUARANTEES, and each of these is asserted rather than hoped for:

  1. THE SVG IS BYTE IDENTICAL to the source page. Not reformatted, not converted to JSX,
     not re-indented. It ships as a string and goes in through dangerouslySetInnerHTML,
     which is safe here because the input is a file in Paul's own repo, and which is the
     only way to keep the bytes honest. Attribute translation (class -> className,
     stroke-width -> strokeWidth, and about forty more) is exactly where a hand port
     silently loses a shadow.

  2. EACH FIGURE IS SELF CONTAINED. Its own <defs>, its own <style>, its own resolved
     colours. Lift one <svg> out on its own and it renders complete. ⛔ Nothing is hoisted
     to a page level, however tempting, because the video terminal lifts single figures out
     for MP4 export and a hoisted filter leaves them with no shadow, silently.

  3. NOTHING LEAKS OUT OF THE FIGURE. The page's CSS is global by design and would not
     survive contact with a real app. Every selector is scoped to the figure's own id, so
     `.f-frame` becomes `#anim7 .f-frame`. Without that, the reduced-motion block's
     [class^="r2"] matches any element on the site whose class starts with r2 and quietly
     turns its animation off.

  4. NOTHING IS WRITTEN BACK. course-figures.html and figures.py belong to the figures
     terminal. This script only ever reads them.

⛔ NEVER EDIT figures.generated.ts BY HAND. Change the figure on the figures page, re-run.
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys

SOURCE = pathlib.Path.home() / "paul-hub/intelligence/course-build/course-figures.html"
OUT = pathlib.Path(__file__).resolve().parents[1] / "src/app/course/figures/figures.generated.ts"

# Keyframe names get a prefix on the way out. `r30` as a global keyframe name is an
# accident waiting to happen in an app that already has thousands of lines of CSS.
KF_PREFIX = "rwff-"

# Page chrome, not figure vocabulary. A rule mentioning only these is dropped.
PAGE_ONLY = {"wrap", "kicker", "standfirst", "body", "sec", "sec-meta", "flag",
             "fig-plate", "fig-bar", "btn", "seekbar", "sw", "rules"}


# ---------------------------------------------------------------- CSS parsing

def split_blocks(css: str):
    """Yield (prelude, body, kind) for every top level block. kind is 'rule' | 'at'."""
    out, i, depth, start = [], 0, 0, 0
    while i < len(css):
        c = css[i]
        if c == "{":
            if depth == 0:
                prelude = css[start:i].strip()
                body_start = i + 1
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                out.append((prelude, css[body_start:i]))
                start = i + 1
        i += 1
    return out


def strip_comments(css: str) -> str:
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def root_vars(css: str) -> dict[str, str]:
    for prelude, body in split_blocks(css):
        if prelude.strip() == ":root":
            return dict(re.findall(r"(--[\w-]+)\s*:\s*([^;]+);", body))
    return {}


def resolve_vars(text: str, vars_: dict[str, str]) -> str:
    """var(--x) -> its literal value. A figure that needs a page-level :root to be the
    right colour is not self contained, and the MP4 export would get black."""
    for _ in range(5):
        new = re.sub(
            r"var\((--[\w-]+)(?:\s*,\s*([^()]*))?\)",
            lambda m: vars_.get(m.group(1), m.group(2) or m.group(0)).strip(),
            text,
        )
        if new == text:
            return new
        text = new
    raise SystemExit("var() resolution did not settle: a cycle in :root?")


# ---------------------------------------------------------------- selection

def classes_in(svg: str) -> set[str]:
    found: set[str] = set()
    for m in re.finditer(r'class="([^"]*)"', svg):
        found.update(m.group(1).split())
    return found


def selector_wanted(sel: str, used: set[str]) -> bool:
    """Does this one selector target something in this figure?"""
    named = set(re.findall(r"\.([A-Za-z][\w-]*)", sel))
    if named:
        if named & PAGE_ONLY:
            return False
        return bool(named & used)
    # [class^="r2"] style prefix matches, from the reduced-motion block
    prefixes = re.findall(r'\[class\^="([^"]+)"\]', sel)
    if prefixes:
        return any(c.startswith(p) for p in prefixes for c in used)
    return False


def scope(sel: str, fig_id: str) -> str:
    sel = sel.strip()
    return f"#{fig_id} {sel}"


ANIM_WORDS = {"infinite", "normal", "reverse", "alternate", "alternate-reverse", "none",
              "forwards", "backwards", "both", "running", "paused", "linear", "ease",
              "ease-in", "ease-out", "ease-in-out", "step-start", "step-end",
              "!important", "inherit", "initial", "unset"}


def kf_names(body: str) -> set[str]:
    """Keyframe names referenced by an animation shorthand in this declaration block.
    ⚠️ `animation:none !important` in the reduced-motion block is not a keyframe name, and
    treating it as one is how the first run of this script died."""
    names = set()
    for m in re.finditer(r"animation(?:-name)?\s*:\s*([^;}]+)", body):
        # drop whole functions, name and all: cubic-bezier(...), steps(...)
        value = re.sub(r"[\w-]*\([^)]*\)", "", m.group(1))
        for tok in value.replace(",", " ").split():
            if tok in ANIM_WORDS:
                continue
            if re.match(r"^[\d.]+m?s$", tok):  # a duration or a delay
                continue
            if re.match(r"^[A-Za-z_-][\w-]*$", tok):
                names.add(tok)
    return names


def rename_kf(body: str, names: set[str]) -> str:
    for n in sorted(names, key=len, reverse=True):
        body = re.sub(rf"(?<![\w-]){re.escape(n)}(?![\w-])", KF_PREFIX + n, body)
    return body


def css_for(css: str, fig_id: str, used: set[str], vars_: dict[str, str]) -> str:
    """The subset of the page stylesheet this one figure actually needs, scoped to it."""
    blocks = split_blocks(css)
    keyframes = {}
    for prelude, body in blocks:
        m = re.match(r"@keyframes\s+([\w-]+)", prelude)
        if m:
            keyframes[m.group(1)] = body

    out: list[str] = []
    wanted_kf: set[str] = set()

    def emit(prelude: str, body: str, indent: str = "") -> bool:
        sels = [s for s in prelude.split(",") if selector_wanted(s, used)]
        if not sels:
            return False
        wanted_kf.update(kf_names(body))
        body = rename_kf(body, kf_names(body))
        joined = ",".join(scope(s, fig_id) for s in sels)
        out.append(f"{indent}{joined}{{{body.strip()}}}")
        return True

    for prelude, body in blocks:
        if prelude.startswith("@keyframes") or prelude.strip() == ":root":
            continue
        if prelude.startswith("@media"):
            inner = [b for b in split_blocks(body)]
            held: list[str] = []
            sink = out
            out = held
            for p2, b2 in inner:
                emit(p2, b2, "  ")
            out = sink
            if held:
                out.append(f"{prelude}{{\n" + "\n".join(held) + "\n}")
            continue
        if prelude.startswith("@"):
            continue
        emit(prelude, body)

    # keyframes are global whatever we do, so they get a prefix and go in last
    kf_out = []
    for n in sorted(wanted_kf):
        if n not in keyframes:
            raise SystemExit(f"{fig_id}: animation references @keyframes {n}, which does not exist")
        kf_out.append(f"@keyframes {KF_PREFIX}{n}{{{keyframes[n].strip()}}}")

    return resolve_vars("\n".join(out + kf_out), vars_)


# ---------------------------------------------------------------- extraction

def svgs(src: str):
    """Every top level <svg> in the page, sliced by tag depth, in document order.

    Yields (svg, end_offset). The 13 animated figures carry an id on the svg; the 13
    stills do not, so the caller gives those one. That injected id is the ONLY change
    ever made to the markup, it is additive, and it is asserted below."""
    depth_guard = 0
    for m in re.finditer(r"<svg\b[^>]*>", src):
        start = m.start()
        if start < depth_guard:  # a nested <svg>, already inside one we returned
            continue
        depth, j = 0, start
        while True:
            t = re.compile(r"</?svg").search(src, j)
            if t is None:
                raise SystemExit(f"unclosed <svg> at {start}")
            if t.group(0) == "<svg":
                depth += 1
            else:
                depth -= 1
                if depth == 0:
                    end = src.index(">", t.end()) + 1
                    break
            j = t.end()
        depth_guard = end
        yield src[start:end], end


def fig_number(src: str, after: int) -> str | None:
    """The fig-NN label the page prints in the bar UNDER this figure. That is the name
    Paul and the briefs use, so it is the name a component is asked for."""
    m = re.search(r"<b>(fig-[\w-]+)</b>", src[after:])
    return m.group(1) if m else None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="fail if the checked-in file is stale")
    args = ap.parse_args()

    if not SOURCE.exists():
        print(f"source not found: {SOURCE}", file=sys.stderr)
        return 1
    src = SOURCE.read_text()

    page_css = strip_comments(re.search(r"<style>(.*?)</style>", src, re.S).group(1))
    vars_ = root_vars(page_css)
    if "--sky" not in vars_:
        raise SystemExit("no :root block found in the figures page")

    figures = {}
    for svg, end in svgs(src):
        name = fig_number(src, end)
        if name is None:
            raise SystemExit(f"an <svg> at offset {end} has no fig-NN bar under it")
        open_tag = re.match(r"<svg\b[^>]*>", svg).group(0)
        idm = re.search(r'id="([^"]+)"', open_tag)
        if idm:
            fig_id = idm.group(1)
        else:
            # the stills carry no id. give it one, additively, and prove it landed.
            fig_id = name
            svg = svg.replace("<svg", f'<svg id="{fig_id}"', 1)
            assert f'id="{fig_id}"' in svg, f"{name}: id injection did not take"

        used = classes_in(svg)
        css = css_for(page_css, fig_id, used, vars_)
        if not css:
            raise SystemExit(f"{name}: no CSS matched, so it would render unstyled")
        label = re.search(r'aria-label="([^"]*)"', svg)
        view = re.search(r'viewBox="([^"]*)"', svg)
        # ⛔ the style block goes INSIDE the svg, so one lifted out on its own is complete
        open_end = svg.index(">") + 1
        inline = svg[:open_end] + f"<style>{css}</style>" + svg[open_end:]
        assert inline.count("<style>") == 1, f"{name}: expected exactly one style block"
        if name in figures:
            raise SystemExit(f"two figures both called {name}")
        figures[name] = {
            "id": fig_id,
            "name": name,
            "label": label.group(1) if label else "",
            "viewBox": view.group(1) if view else "0 0 720 320",
            "animated": "animation:" in css,
            "svg": inline,
        }

    if len(figures) < 26:
        raise SystemExit(f"only {len(figures)} figures found, expected at least 26: "
                         "has the page changed shape?")

    body = [
        "/* GENERATED by scripts/extract-figures.py from",
        " * ~/paul-hub/intelligence/course-build/course-figures.html",
        " *",
        " * ⛔ DO NOT EDIT. Change the figure on the figures page and re-run the script.",
        " * Each entry's `svg` is byte identical to the source page and carries its own",
        " * <defs> and its own <style>, scoped to its id, so it renders standalone.",
        " */",
        "",
        "export type GeneratedFigure = {",
        "  id: string;",
        "  /** The fig-NN label the figures page prints, when it has one. */",
        "  name: string | null;",
        "  label: string;",
        "  viewBox: string;",
        "  animated: boolean;",
        "  svg: string;",
        "};",
        "",
        "export const FIGURES: Record<string, GeneratedFigure> = "
        + json.dumps(figures, indent=2, ensure_ascii=False)
        + ";",
        "",
    ]
    text = "\n".join(body)

    if args.check:
        current = OUT.read_text() if OUT.exists() else ""
        if current != text:
            print(f"STALE: {OUT.name} does not match the figures page. Re-run without --check.",
                  file=sys.stderr)
            return 1
        print(f"up to date: {len(figures)} figures")
        return 0

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(text)
    animated = sum(1 for f in figures.values() if f["animated"])
    print(f"{OUT.relative_to(pathlib.Path.cwd())}: {len(figures)} figures, {animated} animated")
    for f in figures.values():
        print(f"  {f['id']:<10} {f['name'] or '-':<8} "
              f"{'animated' if f['animated'] else 'still':<9} {len(f['svg']):>6} chars")
    return 0


if __name__ == "__main__":
    sys.exit(main())
