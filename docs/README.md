# Documentation

Two views of the same curriculum, for two different jobs.

## `docs/courses/` — the curriculum

One document per course: the mental model, the week plan, every module with its
exercise brief, and the projects in summary. This is the full curriculum. The course page on the site shows a summary of it.

- [`README.md`](courses/README.md) — index and conventions
- [`NAMES.md`](courses/NAMES.md) — **the project name register.** Nothing may
  introduce a project name except this file. Read it first.

## `docs/<course>/` — the project specs

One document per project, for whoever is building or teaching it. Each carries
the modules it may rely on, what the school must supply before it can run, any
external dependency, and the full brief with its definition of done.

| Course | Projects |
|---|---|
| [Web Development (Fullstack)](web-development-fullstack/README.md) | Ajo · Òjò · Slot · Found |
| [Frontend Development](frontend-development/README.md) | Stitch · Shelf · Signboard |
| [JavaScript Programming](javascript-programming/README.md) | Tender · Steady and Digits · Roster |
| [React](react-development/README.md) | Roll Call · Cashbook and Ticker · Waybill |
| [Next.js](nextjs-fullstack/README.md) | Danfo · Pump · Marksheet · Owambe |
| [Backend Development](backend-development/README.md) | Alafia · Gatepass · Buka |
| [Mobile Development](mobile-development/README.md) | Lineup · Tally · Kiosk |
| [Python Programming](python-programming/README.md) | Rent Book · Rate Watch · capstone |
| [Data Analysis](data-analysis/README.md) | Kasuwa Eight · Basket · Second Opinion · capstone |
| [Cybersecurity](cybersecurity/README.md) | Mambilla Range · NexaRide Tickets · Gurara Vault · Idanre Range |

**Videography has no project specs yet** — its projects and materials are coming
from the videography instructor, so `docs/courses/videography-video-editing.md`
still carries the generic briefs.

**PC Basics and Microsoft Office have no projects at all**, by design rather than
by omission. Both are assessed through their per-module exercise briefs: the
people taking them need competence at a job they are already doing, not a
portfolio piece. Neither has a `docs/<course>/` directory, and
`src/lib/course-docs.test.ts` fails if one appears.

## How the two stay in step

The spec files are **generated from the curriculum documents**, so the brief a
student reads and the brief an instructor builds from cannot disagree. The
project blocks in `docs/courses/*.md` are the source; `docs/<course>/*.md` adds
the implementation framing around them — prerequisites, supplied artefacts,
external dependencies.

`src/lib/course-docs.test.ts` fails if a named project has no spec file, if a
spec file has no project, or if two projects anywhere share a name.

## Before any of this can be taught

**Twenty-one artefacts across sixteen projects are blocking** — the project
cannot run until the school has built them. They are listed per project under
*Supplied by the school*, and include a teaching database, two deliberately-bad
codebases, a deliberately vulnerable web application, two lab ranges and an
archived dataset snapshot.

The count is not maintained by hand — it is the `SUPPLIED` table in
`scripts/generate-project-specs.py`, which is also what puts those lines into the
spec files. Recount it there rather than trusting this paragraph:

```
python3 -c "import re;src=open('scripts/generate-project-specs.py').read();\
ns={};exec(src[src.index('SUPPLIED = {'):src.index(chr(10)+'}',src.index('SUPPLIED = {'))+2],ns);\
print(len(ns['SUPPLIED']),'projects,',sum(len(v) for v in ns['SUPPLIED'].values()),'artefacts')"
```

Four courses need **nothing** built and can be taught from writing alone:
JavaScript Programming, Backend Development, Next.js, and Mobile project 1.
