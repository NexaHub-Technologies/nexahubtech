# Project name register

Every student project across the curriculum, named. **This file is the source of
truth for names.** Nothing else may introduce one.

It exists because the first attempt at naming was done by three people working in
parallel who could not see each other's lists, and it produced **Bukka** and
**Buka** — two canteen projects one letter apart, in two courses a student might
well take both of. Also Ajo three times, Kiosk twice, and a brush with
[Kobo360](https://en.wikipedia.org/wiki/Kobo360), a real Nigerian logistics firm.

Rules, in order of importance:

1. **Every name is unique across all courses.** Enforced by
   `src/lib/course-docs.test.ts`, not by care.
2. **No two names share a root**, and no two projects share a domain. Two canteen
   projects is the same failure as two identical names.
3. **Local subjects, spread names.** Nigerian domains make better teaching
   material than to-do lists, but the *names* are spread across registers —
   plain English, Nigerian words, landforms — so a portfolio does not read as six
   market words.
4. **Check any brandable name against real Nigerian companies** before adding it.
5. Fictional organisations in Cybersecurity carry the school's own prefix
   (`Nexa…`) and lab ranges are named after landforms, because a landform cannot
   be mistaken for a company.

Videography is **not in this register** — its projects and materials are coming
from the videography instructor.

**PC Basics and Microsoft Office have no projects at all**, so they have no names
here. Both are assessed through their per-module exercise briefs instead.

---

## Web Development (Fullstack) — 10 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Ajo** | Three-page site for a contribution savings club | 01–03 | 1–3 |
| 2 | **Òjò** | Rain check across Nigerian towns, one API call | 04 | 4–6 |
| 3 | **Slot** | Booking API for a one-chair business | 05 | 7–8 |
| 4 | **Found** | Deployed lost-and-found board *(capstone)* | 06 | 9–10 |

- **Ajo** — a savings club must publish *rules*, which forces genuine semantic
  markup: an ordered process, a real data table, an unsubmitted form, `<details>`
  for the FAQ. No JavaScript exists yet; a hamburger menu is the trap to name.
- **Òjò** — a student-authored array of ~15 towns; Open-Meteo takes
  comma-separated coordinates and returns an **array** of locations (verified).
  Search, filter, sort all operate on the array, never on rows already rendered.
- **Slot** — no browser side at all, assessed through `curl`. A unique constraint
  on `(date, time)` makes "no double booking" a database rule. A cancellation
  reference replaces accounts.
- **Found** — one entity, two audiences, one state change. Claim code, not logins.
  No photo upload; that is where this capstone dies.

## Frontend Development — 10 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Stitch** | Three-page tailor's shop site, from a supplied design | 01–03 | 1–4 |
| 2 | **Shelf** | Book finder over Open Library | 04 | 5–8 |
| 3 | **Signboard** | One-person business site with a quote builder *(capstone)* | 05 | 9–10 |

- **Stitch** — styles grid (comparable items with prices), one style written up in
  full (article + figure + fabric table), find-us (address, hours, form). Handed
  in twice: once unstyled and keyboard-walked, once styled at three widths. Zero
  JavaScript — module 04 is five weeks away.
- **Shelf** — Open Library genuinely returns partial records (verified: 22–34 of
  40 missing covers across three searches) and empty results are reachable, so
  those states are real rather than simulated. The accordion is built from
  `<button>` + `aria-expanded`, not `<details>` — building the behaviour is the point.
- **Signboard** — student picks the business; the *shape* is fixed. Six catalogue
  items, three quote questions, flat price table. Ends in a copyable quote and a
  `wa.me` link, because there is no server in this course.

## JavaScript Programming — 8 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Tender** | Money library — integers in kobo, zero host APIs | 01–03 | 1–3 |
| 2 | **Steady** + **Digits** | Async utilities; phone-number core in two runtimes | 04–05 | 4–6 |
| 3 | **Roster** | Duty rota — one core, Node and browser halves *(capstone)* | 06 | 7–8 |

- **Tender** — money is the best vehicle for module 01: `0.1 + 0.2`,
  `"1500" == 1500`, and two names on one ledger are bugs that lose money.
  `Money` on a prototype, not `class`. **`Intl.NumberFormat` is banned** — it is a
  host API and `format()` exists to make that rule bite. Note in the brief that
  "no host APIs" also rules out `console.log`, so a throwaway `check.js` outside
  the library does the printing.
- **Steady / Digits** — two repos. Steady: `retry`, `timeout`, `queue`, with
  ordering proved by tests. Digits: normalises `0803…`/`+23480…`/spaced numbers,
  pure core plus a `node:fs` adapter and a `fetch` adapter. School supplies an
  **indicative** prefix table — portability means a prefix no longer proves a network.
- **Roster** — `Date` allowed in the core, `Intl` not; the student must say why.
  Serving the browser half from `node:http` is the trap. Algorithm stated in the
  brief so the fortnight goes on the split, not on scheduling theory.

## React — 8 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Roll Call** | Lecturer's attendance register | 01–03 | 1–3 |
| 2 | **Cashbook** + **Ticker** | Supplied: refactor target, then profiling target | 04–05 | 4–6 |
| 3 | **Waybill** | Dispatch-rider job board *(capstone)* | 06 | 7–8 |

- **Roll Call** — one `status` union so "loading and failed" cannot be typed.
  Selection stored as a matric number and looked up on render, so a filter change
  cannot leave it pointing at nobody. Switching course mid-fetch is the cleanup lesson.
- **Cashbook** — supplied 300-line treasurer's contribution screen; decomposed to
  nothing over 80 lines, no prop past two levels. **Ticker** — supplied slow price
  board, ~2,000 rows, three *separately diagnosable* causes plus one pointless
  `useMemo`. Virtualising Ticker is banned: a library makes the number good
  without the student learning which cause it fixed.
- **Waybill** — job state machine as a pure function with tests on the illegal
  transitions. Status filter in the URL, form state local; both defended.

## Next.js — 10 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Danfo** | Lagos bus-route directory, rebuilt from a supplied SPA | 01–03 | 1–3 |
| 2 | **Pump** | Crowd-reported petrol price and queue board | 04 | 4–6 |
| 3 | **Marksheet** | School results portal — student and teacher roles | 05 | 7–8 |
| 4 | **Owambe** | Event page and guest list *(capstone)* | 06 | 9–10 |

- **Danfo** — read-only, so server actions stay genuinely unnecessary. The
  supplied SPA ships a 400KB dataset to the browser to filter it, which makes the
  boundary lesson a measurement rather than an opinion. `"use client"` reduced to
  two leaves, bundle reported before and after.
- **Pump** — two data sources whose right caching answers genuinely differ: a
  station directory that changes yearly, reports worthless when ten minutes stale.
  Revalidation broken on purpose and the broken state described. File store, not a
  database — the caching work must not be confused with query work.
- **Marksheet** — separates the three things module 05 is about: authentication
  says who you are, ownership says you see your own results, role says only a
  teacher sees the class summary. An app with ownership alone lets a student pass
  still believing identity is authorisation.
- **Owambe** — public event page static and on-demand revalidated; organiser
  dashboard dynamic per session with the guest list streamed. One product, two
  correct rendering answers.

## Backend Development — 8 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Alafia** | Pharmacy stock and dispensing API | 01–03 | 1–4 |
| 2 | **Gatepass** | Estate visitor-pass API | 04 | 5–6 |
| 3 | **Buka** | Canteen ordering API *(capstone)* | 05 | 7–8 |

- **Alafia** — three rules enforced by the *database*: `quantity_remaining >= 0`,
  unique `(drug_id, batch_no)`, and a controlled-drug dispense requiring a
  prescription reference. Stage one is `node:http` with the raw `curl` exchange
  captured before any framework hides it.
- **Gatepass** — resident sees only their own passes; officer may verify any code
  but must never see the resident's phone number. `GET /passes/:id` returns **404,
  not 403**, for a pass you do not own.
- **Buka** — `unitPrice` is copied onto the order item at order time so a later
  menu change does not rewrite what someone was charged. Students almost always
  join it instead; say so explicitly.

## Mobile Development — 12 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Lineup** | Event companion app, deep-linked | 01–02 | 1–4 |
| 2 | **Tally** | Offline-first shop stock and sales log | 03–04 | 5–8 |
| 3 | **Kiosk** | Neighbourhood classifieds *(capstone)* | 05 | 9–12 |

- **Lineup** — opened cold from `lineup://session/<id>`, back must land on the day
  list rather than exiting. A separate "My List" tab is the trap: it would share
  starred state across two navigators, which is module 03's problem.
- **Tally** — offline is the normal condition, not a mode. Writes queue to disk
  with a client-generated id so a retry cannot post twice. Per-row sync status;
  the interface must never show "saved" for something only in memory. Tested in
  aeroplane mode on hardware.
- **Kiosk** — posting is a **durable draft**: force-quit halfway and the title,
  price, area and attached photo survive, and the upload resumes rather than
  restarting. Privacy statement must be genuinely about something — photos, a
  phone number, an approximate area.

## Python Programming — 6 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Rent Book** | Rent-collection CLI report for a landlord | 01–02 | 1–2 |
| 2 | **Rate Watch** | Daily FX recorder, append-safe | 03–04 | 3–4 |
| 3 | *Choice of three* | **Errand** / **Meter** / **Fare** *(capstone)* | 05 | 5–6 |

- **Rent Book** — school supplies `rentbook_messy.py`, ~60 lines, everything in
  one block, printing as it goes, containing **one planted aliasing bug** where
  the tenant register and the defaulter list are two names on one list. Amounts as
  integers in kobo. Periods are integers 1–12, **not dates** — `datetime` is
  module 03 and is the likeliest route off-syllabus.
- **Rate Watch** — write to a temp file then `os.replace`, so an interrupted run
  leaves the previous history intact. `show` must work with the network off. One
  class (`RateStore`), everything else functions, with a written defence of what
  stayed a function. **Verify `open.er-api.com` is live and key-free before the
  brief is issued**; fallback is a daily weather log.
- **Capstone, choice of three** — **Errand** (shopping list over a prices file,
  unit price normalised across pack sizes), **Meter** (prepaid electricity units
  log), **Fare** (daily transport spend). No `pandas` — the grouping is the assessment.

## Data Analysis — 12 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Kasuwa Eight** | Eight SQL questions against a synthetic market database | 01–02 | 1–5 |
| 2 | **Basket** | NBS food-price clean-up with a decision log | 03 | 6–8 |
| 3 | **Second Opinion** | One finding, two honest charts | 04 | 9–10 |
| 4 | *Choice of three* | **Budget Line** / **Ward** / **Grid** *(capstone)* | 05 | 11–12 |

- **Kasuwa Eight** — school builds the **Kasuwa** teaching database (8 tables),
  clearly labelled synthetic. The trap lives in `deliveries`: an order split across
  two deliveries inflates every revenue figure *plausibly*. Question 7 is placed
  after question 2 deliberately — it is what makes the trap visible, and the
  strongest submissions go back and correct question 2 themselves.
- **Basket** — school must **archive a fixed snapshot** of the NBS releases; NBS
  revises and re-posts, so without one, marking is not reproducible. The required
  deliverable is the decision log, not the clean data.
- **Second Opinion** — both charts must be honest; the difference is which
  quantity is plotted, not what is hidden. A student who produces one honest chart
  and one distorted one has failed the exercise, not passed half of it.
- **Capstone** — lock the dataset at the end of week 10. Two weeks is enough to
  analyse a dataset and not enough to also find one.

## Cybersecurity — 16 weeks

| # | Name | What it is | Modules | Weeks |
|---|---|---|---|---|
| 1 | **Mambilla Range** | Threat model, then map and segment the range | 01–02 | 1–5 |
| 2 | **NexaRide Tickets** | Vulnerable ticketing app — broken, then fixed | 03 | 6–8 |
| 3 | **Gurara Vault** | Crypto review and a breach reconstructed | 04–05 | 9–12 |
| 4 | **Idanre Range** | Full defensive assessment and report *(capstone)* | 06 | 13–16 |

Fictional organisations: **NexaPay Microfinance**, **NexaCare Clinic**,
**NexaRide**. Every report template opens with *this organisation is fictional and
exists only inside the range*.

- **Mambilla** — the deliverable is a reachability matrix before and after
  segmentation. A rule list is not a proof.
- **NexaRide Tickets** — five planted classes (SQLi in trip search, broken access
  control on sequential ids, stored XSS in reviews, predictable reset token, mass
  assignment on `role`), **plus second instances of at least two** so a
  symptom-level fix is detectable. Ships bound to `127.0.0.1` with a startup guard
  refusing non-loopback interfaces.
- **Gurara Vault** — right primitive, wrong key handling: AES-GCM with a nonce
  from a counter that resets on restart, key committed beside the ciphertext. The
  supplied logs must contain a **real gap** — the admin console has no logging, so
  an admin action can be established but not attributed. That gap is the highest-value
  part of the exercise.
- **Idanre Range** — scope and authorisation memo written and signed *before* any
  work, assessed as an artefact. Findings ranked by business impact, not by a CVSS
  score copied from a scanner.

### Safety lines that must appear

1. Module 02: scanning is confined to **the range, or a network you control end to
   end and are the sole user of** — a hostel or estate connection is neither.
2. NexaRide Tickets must never be deployed anywhere reachable from the internet.
   The realistic failure is a student putting it on a cheap VPS to show a friend.
3. The capstone forbids reconnaissance of any real organisation — no scanning, no
   credential searching, no employee enumeration, nothing outside the range.
