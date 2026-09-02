"""Generates docs/<course>/<project>.md from the project blocks in
docs/courses/*.md, so the brief a student reads on the syllabus page and the
brief an instructor builds from cannot disagree.

The curriculum documents are the source. This adds the implementation framing
around each block: which modules it may rely on, what the school must supply
before it can run, and any external dependency.

Run with:  python3 scripts/generate-project-specs.py
Re-run after editing any `### Project N` block. `src/lib/course-docs.test.ts`
fails if you forget.

Requires the module metadata dump first:
    bun run scripts/dump-course-modules.ts > .cache/modules.json
"""

import io, re, json, os, unicodedata

META = json.load(open(".cache/modules.json"))

# what the school must build before a project can run
SUPPLIED = {
 ("frontend-development","stitch"): ["The **Stitch design**, at three widths. You write the markup and the CSS; the design is given."],
 ("javascript-programming","steady-and-digits"): ["An **indicative** prefix-to-network table for Nigerian phone numbers. It is indicative because number portability means a prefix no longer proves a network — the tool must say *likely*, never claim to know."],
 ("react-development","roll-call"): ["A static JSON roll endpoint, one file per course code."],
 ("react-development","cashbook-and-ticker"): ["**Cashbook** — a 300-line single component, realistically bad rather than artificially bad.","**Ticker** — a slow price board of ~2,000 rows with three *separately diagnosable* causes, plus one pointless `useMemo`."],
 ("react-development","waybill"): ["A seed API with jobs, riders and zones."],
 ("nextjs-fullstack","danfo"): ["**Danfo** as a client-only React SPA, shipping a 400KB dataset to the browser. This is the rebuild target and the source of the before/after measurement."],
 ("nextjs-fullstack","pump"): ["A station directory endpoint."],
 ("mobile-development","tally"): ["`tally-api` — products, sales and adjustments, all idempotent by client id. Students who have taken Backend Development may use their own instead."],
 ("mobile-development","kiosk"): ["A listings API."],
 ("python-programming","rent-book"): ["`rentbook_messy.py` — about sixty lines, everything in one block, printing as it goes, containing **one planted aliasing bug** that does not announce itself."],
 ("data-analysis","kasuwa-eight"): ["The **Kasuwa** teaching database — eight tables, clearly labelled synthetic. The trap lives in `deliveries`: an order split across two deliveries inflates every revenue figure, and inflates it *plausibly*."],
 ("data-analysis","basket"): ["A **fixed archived snapshot** of the NBS food-price releases. NBS revises and re-posts, so without a frozen snapshot marking is not reproducible."],
 ("cybersecurity","mambilla-range"): ["The **NexaPay Microfinance** architecture diagram (fictional).","The **Mambilla** lab range."],
 ("cybersecurity","nexaride-tickets"): ["**NexaRide Tickets** — five planted vulnerability classes, plus second instances of at least two in less obvious places so a symptom-level fix is detectable.","A **flawed fix branch** in which a previous developer patched the symptom and left the class alive elsewhere.","Both bound to `127.0.0.1` with a startup guard refusing non-loopback interfaces."],
 ("cybersecurity","gurara-vault"): ["The **Gurara** vault implementation — right primitive, wrong key handling.","A log set containing a **real gap**: the admin console has no logging, so an admin action can be established but not attributed."],
 ("cybersecurity","idanre-range"): ["The **Idanre** lab range — several hosts, a web application, a file server, an internal admin box and a misconfigured backup."],
}

VERIFY = {
 ("web-development-fullstack","ojo"): "Open-Meteo — free, no key, `access-control-allow-origin: *`, and returns a JSON **array** for comma-separated coordinates. Verified.",
 ("frontend-development","shelf"): "Open Library — free, no key, CORS `*`, honours `fields`. Partial records are real: across three subject searches, 22–34 of 40 results were missing covers, with missing years and authors too, and empty results are reachable. Verified.",
 ("python-programming","rate-watch"): "`open.er-api.com` — **must be re-checked as live and unauthenticated before this brief is issued.** Named fallback: a daily weather log over Open-Meteo.",
}

def slugify(name):
    s = unicodedata.normalize("NFKD", name).encode("ascii","ignore").decode()
    s = s.lower().replace("&","and")
    s = re.sub(r"[^a-z0-9]+","-",s).strip("-")
    return s

def parse_range(txt):
    t = txt.replace("–","-")
    if "-" in t:
        a,b = t.split("-",1); return list(range(int(a), int(b)+1))
    return [int(t)]

written = []
for slug, meta in META.items():
    p = f"docs/courses/{slug}.md"
    s = io.open(p, encoding="utf-8").read()
    # a course may legitimately have no projects: the two office tracks are
    # assessed through their per-module exercises instead. No section means
    # nothing to generate and, importantly, no empty directory to leave behind.
    if "## Projects" not in s: continue
    sec = s.split("## Projects")[1].split("\n---\n\n## Module 01")[0]
    blocks = re.split(r"(?=^### Project \d+ — )", sec, flags=re.M)[1:]
    if not blocks: continue
    # videography is not named yet
    if slug == "videography-video-editing": continue

    os.makedirs(f"docs/{slug}", exist_ok=True)
    entries = []
    for b in blocks:
        m = re.match(r"### Project (\d+) — (.+)", b)
        num, name = m.group(1), m.group(2).strip()
        pslug = slugify(name)
        mm = re.search(r"^\*Modules? ([\d–-]+) · Weeks? ([\d–-]+)\*\s*$", b, re.M)
        mods, wks = mm.group(1), mm.group(2)
        body = b[mm.end():].strip()
        covered = parse_range(mods)
        mod_lines = []
        for n in covered:
            mod = next(x for x in meta["modules"] if int(x["n"]) == n)
            mod_lines.append(f"- **{mod['n']} — {mod['t']}** · {mod['d']}")

        sup = SUPPLIED.get((slug, pslug))
        ver = VERIFY.get((slug, pslug))

        parts = [
            f"# {name}",
            "",
            f"*{meta['t']} · project {num} of {len(blocks)}*",
            "",
            "| | |",
            "|---|---|",
            f"| **Course** | [{meta['t']}](../courses/{slug}.md) |",
            f"| **Modules** | {mods} |",
            f"| **Weeks** | {wks} |",
            f"| **Course level** | {meta['level']} |",
            "",
            "## What you can rely on",
            "",
            "This project may use anything from the modules below and **nothing from",
            "later ones**. If a feature needs something not on this list, it belongs to a",
            "later project.",
            "",
            *mod_lines,
            "",
        ]
        if sup:
            parts += ["## Supplied by the school", "",
                      "This project cannot run until these exist.", ""]
            parts += [f"- {x}" for x in sup] + [""]
        if ver:
            parts += ["## External dependency", "", f"- {ver}", ""]
        parts += [body, "",
                  "---", "",
                  "## Where this sits", "",
                  f"- Curriculum document: [`docs/courses/{slug}.md`](../courses/{slug}.md)",
                  f"- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)",
                  ""]
        io.open(f"docs/{slug}/{pslug}.md","w",encoding="utf-8").write("\n".join(parts))
        entries.append((num, name, pslug, mods, wks))
        written.append(f"docs/{slug}/{pslug}.md")

    idx = [f"# {meta['t']} — projects", "",
           f"{len(entries)} projects. Each is an independent piece built once the modules",
           "behind it are done; the last one is the course capstone.", "",
           "| # | Project | Modules | Weeks |", "|---|---|---|---|"]
    for num,name,pslug,mods,wks in entries:
        idx.append(f"| {num} | [{name}]({pslug}.md) | {mods} | {wks} |")
    idx += ["", f"Course document: [`docs/courses/{slug}.md`](../courses/{slug}.md)", ""]
    io.open(f"docs/{slug}/README.md","w",encoding="utf-8").write("\n".join(idx))
    written.append(f"docs/{slug}/README.md")

print(f"wrote {len(written)} files")
