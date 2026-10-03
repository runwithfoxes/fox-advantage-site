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


# Paul, 3 Oct: "use the orange highlight for this line". Matched by its words until Sam marks it
# in his own page with <mark>; if the words change and nothing is marked, the run says so.
HIGHLIGHT = [
    "I did all of that because I wanted to know one thing. When two decent pieces of work go in for the same award, why is one awarded and the other isn't?",
]


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


# The papers' own addresses on adfx.ie no longer answer (410 on 3 Oct 2026), so each "Read the paper"
# link goes to the web archive's copy of the same address.
ARCHIVE = "https://web.archive.org/web/2/"


def shares(evidence):
    """The two shares a checklist line gives, awarded first, read from its own words and never typed:
    "84% of awarded papers ..., and 53% of the papers that weren't awarded". "No awarded paper" is 0."""
    b = re.search(r"(\d+)% of the papers that weren't awarded", evidence)
    a = re.search(r"(\d+)% of awarded papers", evidence)
    if b and a and a.start() < b.start():
        return int(a.group(1)), int(b.group(1))
    if b and re.search(r"\bNo awarded paper\b", evidence[: b.start()]):
        return 0, int(b.group(1))
    return None


def counts(chart, cap):
    """The counts behind each bar, read out of Sam's own caption ("87 of 103 awarded, 46 of 87 not
    awarded", or "49 and 26" once the totals have been given). A pair of counts is given to a row
    only when it is the one pair in the caption that rounds to that row's two percentages. If any
    row is left without one, the figure gets no counts at all and the run names it."""
    tot = re.search(r"(\d+) of (\d+) awarded, (\d+) of (\d+) not awarded", cap)
    if not tot:
        return False
    na, nb = int(tot.group(2)), int(tot.group(4))
    pairs = [(int(a), int(b)) for a, b in re.findall(rf"(\d+) of {na} awarded, (\d+) of {nb} not awarded", cap)]
    pairs += [(int(a), int(b)) for a, b in re.findall(r"(\d+) and (\d+)", cap)]
    near = lambda k, n, pct: abs(100 * k / n - pct) <= 0.5 + 1e-9
    A, B = chart["series"][0], chart["series"][1]
    ka, kb = [], []
    for pa, pb in zip(A["data"], B["data"]):
        hits = {(a, b) for a, b in pairs if near(a, na, pa) and near(b, nb, pb)}
        if len(hits) != 1:
            return False
        a, b = hits.pop()
        ka.append(a)
        kb.append(b)
    A["k"], A["n"], B["k"], B["n"] = ka, na, kb, nb
    return True


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

    intro, chapters, method = [], [], []
    check = {"title": "", "lead": [], "heads": [], "do": [], "never": [], "close": []}
    method_title = ""
    ch = sub = None
    where = "intro"
    pending = None  # a chapter's number, waiting for its h2
    used, held, figs, marked, nocount, undrawn, cases = set(), 0, [], [], [], [], []

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
            elif hid == "checklist":
                where, check["title"] = "checklist", text(el)
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
        if where == "checklist":
            if el.name == "p" and not cls:
                (check["close"] if check["do"] else check["lead"]).append(text(el))
            elif el.name == "div" and "listhead" in cls:
                check["heads"].append(text(el))
            elif el.name in ("ol", "ul") and "checklist" in cls:
                never = "never" in cls
                for li in el.find_all("li", recursive=False):
                    a = li.find("a")
                    m = re.match(r"#c(\d+)$", a["href"]) if a else None
                    if not m:
                        sys.exit(f"a checklist line with no chapter link: {text(li)!r}")
                    a.extract()
                    line = {"t": text(li.find("b")), "e": text(li.find("span")), "ch": int(m.group(1))}
                    if never:  # Sam's page puts the word in front with CSS; here it is in the words
                        line["t"] = "Never " + line["t"]
                    pair = shares(line["e"])
                    if pair:
                        line["a"], line["b"] = pair
                    else:
                        undrawn.append(line["t"])
                    check["never" if never else "do"].append(line)
            else:
                sys.exit(f"in the checklist, an element the script does not know: <{el.name} class={sorted(cls)}>")
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
        if el.name == "p" and "do" in cls:
            b = el.find("b")
            label = text(b).rstrip(".")
            b.extract()
            add({"do": text(el), "label": label})
            continue
        if el.name == "blockquote" and "case" in cls:
            cite = el.find("cite")
            a = cite.find("a")
            href, link = a["href"], text(a)
            a.extract()
            c = text(cite)
            cite.extract()
            m = re.match(r"^([^,]+),\s*([^.]+)\.\s*(.*)$", c)
            if not m:
                sys.exit(f"a case line not in the 'Brand, award. why.' shape: {c!r}")
            key = el["data-case"]
            cases.append(key)
            add({"case": key, "quote": text(el), "brand": m.group(1), "award": m.group(2), "why": m.group(3),
                 "href": ARCHIVE + href, "link": link})
            continue
        if el.name == "div" and "named" in cls:
            items = []
            for li in el.find_all("li"):
                b, aw = li.find("b"), li.select_one(".aw")
                brand, award = text(b), text(aw)
                b.extract()
                aw.extract()
                items.append({"brand": brand, "award": award, "text": text(li)})
            add({"named": items, "title": text(el.select_one(".named-h"))})
            continue
        if el.name == "p":
            # a marked line: Sam's own <mark>, or one of the lines Paul asked to have marked
            m = el.find("mark")
            hl = text(m) if m else None
            t = text(el)
            hl = hl or next((h for h in HIGHLIGHT if h in t), None)
            if hl:
                marked.append(hl)
                add({"p": t, "hl": hl})
            else:
                add({"p": t})
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
                if not counts(charts[fid], cap):
                    nocount.append(no)
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
    if not (check["do"] and check["never"] and len(check["heads"]) == 2):
        sys.exit("the checklist is not on the page in the shape the script knows: a Do list and a Never list, each under its own head")

    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "copy.json").write_text(json.dumps(
        {"meta": meta, "intro": intro, "checklist": check, "chapters": chapters, "methodTitle": method_title, "method": method},
        ensure_ascii=False, indent=1) + "\n")
    (OUT / "charts.json").write_text(json.dumps(charts, ensure_ascii=False, indent=1) + "\n")

    # figures that open a section with no words before them (DOCTRINE, 28 Sep): named, never written here
    bare = []
    for c in chapters:
        for holder in [c["lede"]] + [s["blocks"] for s in c["subs"]]:
            if holder and ("fig" in holder[0] or "stats" in holder[0]):
                bare.append(holder[0]["no"])
    print(f"{len(chapters)} chapters, {len(figs)} figures ({', '.join(figs)}), {len(check['do'])} do and {len(check['never'])} never lines, {len(method)} method notes, {held} held boxes, {len(cases)} case quotes")
    print("checklist lines with no pair of shares to draw: " + ("; ".join(undrawn) if undrawn else "none"))
    print(f"highlighted lines: {len(marked)}" + ("" if marked else "  <-- NONE: Paul's marked line is no longer on the page word for word"))
    print("charts whose counts could not be read from the caption: " + (", ".join(nocount) if nocount else "none"))
    print("figures with no lead-in before them: " + (", ".join(bare) if bare else "none"))


if __name__ == "__main__":
    main()
