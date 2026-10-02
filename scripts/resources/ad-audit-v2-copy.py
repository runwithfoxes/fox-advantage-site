#!/usr/bin/env python3
"""
The Ad Audit Q3 2026, v2: Sam's draft into the page's files. Run it again every time Sam changes
the draft; nothing it writes is ever edited by hand.

Reads   ~/paul-hub/intelligence/research/irish-ad-audit/reports/2026-q3/v2/{index.html,charts.json,img/}
        and the parent folder's numbers.json.
Writes  src/app/resources/the-ad-audit/2026-q3-v2/copy.json    Sam's words, in page order
        src/app/resources/the-ad-audit/2026-q3-v2/charts.json  Sam's series, as he wrote them
        src/app/resources/the-ad-audit/2026-q3-v2/facts.json   the few category totals the page prints
        public/resources/the-ad-audit/2026-q3-v2/              the ad stills and the frame strips

Two rules it enforces. letters-private.json is never read. And facts.json carries category totals
only, nothing keyed by a bank's name, because charts.json is lettered and a bank-named file shipped
to the browser would be the key to the letters.
"""
import json, re, shutil, sys
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Tag

SRC = Path.home() / "paul-hub/intelligence/research/irish-ad-audit/reports/2026-q3"
V2 = SRC / "v2"
SITE = Path(__file__).resolve().parents[2]
OUT = SITE / "src/app/resources/the-ad-audit/2026-q3-v2"
PUB = SITE / "public/resources/the-ad-audit/2026-q3-v2"


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
    cap = text(fc)
    m = re.match(r"^(Figure|Table)\s+(\d+\.\d+[a-z]?)\.\s*(.*?)\.?$", title)
    if not m:
        sys.exit(f"caption not in the 'Figure N.N. Title.' shape: {title!r}")
    return m.group(1), m.group(2), m.group(3), cap


def main():
    soup = BeautifulSoup((V2 / "index.html").read_text(), "html.parser")
    charts = json.loads((V2 / "charts.json").read_text())
    page = soup.select_one("div.page")

    meta = {
        "kicker": text(page.select_one(".kicker")),
        "h1": text(page.find("h1")),
        "byline": text(page.select_one(".byline")),
    }
    standfirst = text(page.select_one("p.standfirst"))

    intro, findings, chapters, method = [], [], [], []
    ch = sub = None
    where = "intro"
    used_figs = set()

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
        cls = el.get("class") or []
        if el.name in ("a", "h1") or {"kicker", "byline", "standfirst", "contents", "chapter"} & set(cls):
            continue
        if el.name == "hr":
            continue
        if el.name == "h2":
            hid = el.get("id")
            if hid == "intro":
                where = "intro"
            elif hid == "method":
                where = "method"
            else:
                where = "chapter"
                n = int(hid.replace("ch", ""))
                ch = {"id": hid, "n": n, "title": text(el), "lede": [], "subs": []}
                chapters.append(ch)
                sub = None
            continue
        if where == "method":
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
        if el.name == "ul" and where != "intro":
            # a list inside a chapter is Sam's text, kept as a list
            add({"list": [text(li) for li in el.find_all("li")]})
            continue
        if el.name == "ul" and "findings" in cls:
            for li in el.find_all("li"):
                t = text(li)
                m = re.search(r"\s*\((?:Chapter\s+(\d+))\)\.?$", t)
                c = int(m.group(1)) if m else int(re.search(r"Chapter (\d+)", t).group(1))
                findings.append({"text": t, "ch": c})
            continue
        if el.name == "div" and "gallery" in cls:
            items = []
            for f in el.select("figure.ad"):
                img = f.find("img")["src"].split("/")[-1]
                lines = text(f.find("figcaption")).split("\n")
                items.append({"img": img, "lines": lines})
            add({"gallery": items})
            continue
        if el.name == "p":
            add({"small": text(el)} if "small" in cls else {"p": text(el)})
            continue
        if el.name == "figure":
            kind, no, title, cap = caption(el)
            canvas = el.find("canvas") or el.find("table")
            if canvas is not None:
                fid = canvas["id"]
                if fid not in charts:
                    sys.exit(f"{fid} is on the page but not in charts.json")
                used_figs.add(fid)
                add({"fig": fid, "kind": kind, "no": no, "title": title, "cap": cap})
            else:
                img = el.find("img")
                stem = Path(img["src"]).stem
                # Sam's single frames, one file each, named -0s, -0_5s ... -3s. Ordered by the time
                # in the name, and the time label is written from it, never drawn into the picture.
                frames = []
                for f in (V2 / "img").glob(f"{stem}-*.jpg"):
                    m = re.match(rf"{re.escape(stem)}-(\d+(?:_\d+)?)s$", f.stem)
                    if m:
                        frames.append((float(m.group(1).replace("_", ".")), f.name))
                frames.sort()
                add({"strip": img["src"].split("/")[-1], "frames": [{"t": t, "img": n} for t, n in frames],
                     "alt": img.get("alt", ""), "no": no, "title": title, "cap": cap})
            continue
        sys.exit(f"an element the script does not know: <{el.name} class={cls}>")

    missing = set(charts) - used_figs
    if missing:
        sys.exit(f"in charts.json but on no page: {sorted(missing)}")

    n = json.loads((SRC / "numbers.json").read_text())
    t = n["totals"]
    facts = {
        "bank_ads": t["bank_ads"],
        "bank_creatives": t["bank_creatives"],
        "new_creatives": t["new_creatives"],
        "advertisers": t["advertisers"],
        "biggest_single_ad": n["biggest_single_ad"],
    }

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "copy.json").write_text(json.dumps(
        {"meta": meta, "standfirst": standfirst, "intro": intro, "findings": findings, "chapters": chapters, "method": method},
        ensure_ascii=False, indent=1) + "\n")
    (OUT / "charts.json").write_text(json.dumps(charts, ensure_ascii=False, indent=1) + "\n")
    (OUT / "facts.json").write_text(json.dumps(facts, ensure_ascii=False, indent=1) + "\n")

    PUB.mkdir(parents=True, exist_ok=True)
    for f in (V2 / "img").iterdir():
        if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp"):
            shutil.copy2(f, PUB / f.name)

    words = len(" ".join([standfirst] + [b.get("p", "") for c in chapters for b in c["lede"] + [x for s in c["subs"] for x in s["blocks"]]]).split())
    print(f"{len(chapters)} chapters, {len(used_figs)} charts, {len(findings)} findings, {len(method)} method notes, about {words} words")


if __name__ == "__main__":
    main()
