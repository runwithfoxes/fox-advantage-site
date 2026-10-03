#!/usr/bin/env python3
"""
The Winning Paper, October 2026: Sam's draft into the page's files. Run it again every time Sam
rebuilds; nothing it writes is ever edited by hand.

Reads   ~/paul-hub/intelligence/research/award-entries/reports/2026-10/index.html, and nothing else.
        The papers, the coding files and numbers.json are never opened: the page prints Sam's
        words and Sam's chart values as his own page carries them.
Writes  src/app/resources/the-winning-paper/2026-10/copy.json    Sam's words, in page order
        src/app/resources/the-winning-paper/2026-10/charts.json  each chart and the table, by id

It stops on any element it does not know, on a chart that is on the page and not in the page's
CHARTS list (or the other way round), and on a caption that is not in the "Figure N.N: Title."
shape. It prints how many "Held for Paul" boxes it found.
"""
import json, re, sys
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Tag

SRC = Path.home() / "paul-hub/intelligence/research/award-entries/reports/2026-10/index.html"
SITE = Path(__file__).resolve().parents[2]
OUT = SITE / "src/app/resources/the-winning-paper/2026-10"


def text(el):
    """The element's words as Sam wrote them, whitespace folded, <br> kept as a line break."""
    for br in el.find_all("br"):
        br.replace_with("\n")
    s = el.get_text()
    return "\n".join(re.sub(r"\s+", " ", line).strip() for line in s.split("\n")).strip()


def caption(fig):
    fc = fig.find("figcaption")
    b = fc.find("b")
    title = text(b) if b else ""
    if b:
        b.extract()
    m = re.match(r"^(Figure|Table)\s+(\d+\.\d+[a-z]?)[:.]\s*(.*?)\.?$", title)
    if not m:
        sys.exit(f"caption not in the 'Figure N.N: Title.' shape: {title!r}")
    return m.group(1), m.group(2), m.group(3), text(fc)


def page_charts(html):
    """The CHARTS list out of the page's last script: the array the page hands to forEach."""
    m = re.search(r"(\[\{\"id\".*?\}\])\.forEach", html, re.S)
    if not m:
        sys.exit("the CHARTS list was not found in the page's script")
    out = {}
    for c in json.loads(m.group(1)):
        if not (len(c["labels"]) == len(c["a"]) == len(c["b"])):
            sys.exit(f"{c['id']}: labels and values are not the same length")
        out[c["id"]] = {
            "type": "pair",
            "labels": c["labels"],
            "series": [{"label": c["la"], "data": c["a"]}, {"label": c["lb"], "data": c["b"]}],
            "max": c["mx"],
        }
    return out


def main():
    html = SRC.read_text()
    soup = BeautifulSoup(html, "html.parser")
    charts = page_charts(html)
    page = soup.select_one("div.page")

    meta = {
        "kicker": text(page.select_one(".kicker")),
        "h1": text(page.find("h1")),
        "byline": text(page.select_one(".byline")),
    }

    intro, findings, chapters, method = [], [], [], []
    method_title = ""
    ch = sub = None
    where = "intro"
    pending = None  # a chapter's number, waiting for its h2
    used, held, figs = set(), 0, []

    def add(block):
        if where == "intro":
            intro.append(block)
        elif sub is not None:
            sub["blocks"].append(block)
        else:
            ch["lede"].append(block)

    for el in page.children:
        if isinstance(el, NavigableString) or not isinstance(el, Tag):
            continue
        cls = set(el.get("class") or [])
        if el.name == "h1" or cls & {"brand", "kicker", "byline", "contents"} or el.name == "hr":
            continue  # the hero and the rail carry these
        if el.name == "div" and "chapter" in cls:
            pending = el.get("id")
            continue
        if el.name == "h2":
            hid = el.get("id")
            if hid == "intro":
                where = "intro"
            elif hid == "how":
                where, method_title = "method", text(el)
            elif pending:
                where = "chapter"
                ch = {"id": pending, "n": int(pending.lstrip("c")), "title": text(el), "lede": [], "subs": []}
                chapters.append(ch)
                sub, pending = None, None
            else:
                sys.exit(f"an h2 with no chapter line before it: {text(el)!r}")
            continue
        if where == "method":
            if not (el.name == "div" and "small" in cls):
                sys.exit(f"in the method, an element the script does not know: <{el.name} class={sorted(cls)}>")
            for p in el.find_all("p"):
                b = p.find("b")
                k = text(b).rstrip(".") if b else ""
                if b:
                    b.extract()
                method.append({"k": k, "t": text(p)})
            continue
        if el.name == "h3":
            no = el.select_one(".no")
            n = text(no)
            no.extract()
            sub = {"n": n, "title": text(el), "blocks": []}
            ch["subs"].append(sub)
            continue
        if el.name == "ul" and "findings" in cls:
            for li in el.find_all("li"):
                t = text(li)
                m = re.search(r"\(Chapter (\d+)\)\.?$", t)
                if not m:
                    sys.exit(f"a finding with no chapter at its end: {t!r}")
                findings.append({"text": t, "ch": int(m.group(1))})
            continue
        if el.name == "p":
            add({"p": text(el)})
            continue
        if el.name == "div" and "held" in cls:
            b = el.find("b")
            label = text(b)
            b.extract()
            add({"held": text(el), "label": label})
            held += 1
            continue
        if el.name == "figure":
            kind, no, title, cap = caption(el)
            figs.append(no)
            base = {"kind": kind, "no": no, "title": title, "cap": cap}
            stats, canvas, table = el.select_one("div.stats"), el.find("canvas"), el.find("table")
            if stats is not None:
                items = [{"v": text(d.find("b")), "l": text(d.find("span"))} for d in stats.find_all("div", recursive=False)]
                add({"stats": items, **base})
            elif canvas is not None:
                fid = canvas["id"]
                if fid not in charts:
                    sys.exit(f"{fid} is on the page but not in the page's CHARTS list")
                used.add(fid)
                add({"fig": fid, "alt": canvas.get("aria-label", ""), **base})
            elif table is not None:
                fid = "t" + no.replace(".", "")
                charts[fid] = {
                    "type": "table",
                    "head": [text(th) for th in table.select("thead th")],
                    "rows": [[text(td) for td in tr.find_all("td")] for tr in table.select("tbody tr")],
                }
                used.add(fid)
                add({"fig": fid, "alt": "", **base})
            else:
                sys.exit(f"Figure {no} holds nothing the script can draw")
            continue
        sys.exit(f"an element the script does not know: <{el.name} class={sorted(cls)}>")

    missing = set(charts) - used
    if missing:
        sys.exit(f"in the page's CHARTS list but on no figure: {sorted(missing)}")
    if len(findings) != len(chapters):
        sys.exit(f"{len(findings)} findings and {len(chapters)} chapters")

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "copy.json").write_text(json.dumps(
        {"meta": meta, "intro": intro, "findings": findings, "chapters": chapters, "methodTitle": method_title, "method": method},
        ensure_ascii=False, indent=1) + "\n")
    (OUT / "charts.json").write_text(json.dumps(charts, ensure_ascii=False, indent=1) + "\n")

    # figures that open a section with no words before them (DOCTRINE, 28 Sep): named, never written here
    bare = []
    for c in chapters:
        for holder in [c["lede"]] + [s["blocks"] for s in c["subs"]]:
            if holder and ("fig" in holder[0] or "stats" in holder[0]):
                bare.append(holder[0]["no"])
    print(f"{len(chapters)} chapters, {len(figs)} figures ({', '.join(figs)}), {len(findings)} findings, {len(method)} method notes, {held} held boxes")
    print("figures with no lead-in before them: " + (", ".join(bare) if bare else "none"))


if __name__ == "__main__":
    main()
