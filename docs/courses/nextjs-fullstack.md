# Next.js

Build fullstack applications on the React metaframework — routing, rendering,
and data in one stack.

> **The mental model — One codebase, two machines**
>
> Your code runs in two places — a server you control and a browser you don't —
> and Next.js lets you write both in one file tree. Nearly every decision it asks
> of you is the same question wearing different clothes: which machine should
> this run on, and what has to travel between them? Server or client, where to
> fetch, what to cache.

| | |
|---|---|
| **Format** | Taught live, online · start any time |

## Before you start

**Know:** React in practice — components, state, hooks and composition;
JavaScript's async model; enough HTTP to know what a request, a response and a
status code are; the terminal and git.

**Have:** a laptop with 8GB RAM or more with Node.js installed; a GitHub account
for deploying the capstone; 8–10 hours a week.

> Take [React](react-development.md) first if hooks and composition are not yet
> comfortable. This course spends no time on them.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1 | 01–02 | Why a metaframework · Routing & layouts |
| 2–3 | 03 | Server & client components |
| 4–6 | 04 | Data, caching & mutations |
| 7–8 | 05 | Auth, databases & APIs |
| 9–10 | 06 | Rendering & deployment |

## Projects

4 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing — project 2 starts from
nothing rather than extending project 1 — so you finish with 4 separate pieces
of work you can show somebody, each demonstrating something different.

The per-module exercise briefs below are practice. These are the integration.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–03 | 1–3 | **Danfo** — a bus-route directory, rebuilt off the client |
| 2 | 04 | 4–6 | **Pump** — a price board that stays fresh on purpose |
| 3 | 05 | 7–8 | **Marksheet** — a results portal where roles actually hold |
| 4 | 06 | 9–10 | **Course capstone.** **Owambe** — an event page, shipped to production |

### Project 1 — Danfo
*Modules 01–03 · Weeks 1–3*

Danfo is a Lagos bus-route directory: corridors, the stops along each, and the
fare between any two. You are given it as a client-only React app, and you
rebuild it on the App Router.

It is read-only, which keeps server actions and databases genuinely unnecessary
at this point, and it carries a 400KB dataset — so the supplied version shipping
all of it to the browser in order to filter it makes the boundary lesson a
measurement rather than an opinion.

**What you build**
- Three levels of nested routing with a layout at each, the corridor list
  persisting while the stop pane changes — module 02, layouts as boundaries.
- A `loading.tsx` scoped to the stop segment only, so the corridor sidebar does
  not flash on navigation — module 02, loading boundaries in the right place.
- Stop filtering done on the server through a search param, so the dataset never
  crosses to the browser — module 03.
- `"use client"` reduced to two leaves — the fare calculator and the copy-code
  button — with bundle size reported before and after — module 03.
- A count living in the corridor layout that survives navigation, and a per-stop
  note that does not, demonstrated by behaviour rather than described — module 02.

**The shape**
Routes: `/routes`, `/routes/[corridor]`, `/routes/[corridor]/[stop]`. Entities:
`Corridor {slug, name, endpoints}`, `Stop {code, name, corridorSlug, landmarks[]}`,
`Fare {fromStopCode, toStopCode, amount, peakAmount}`. Data read from a local
module at request time. Hand in the first-load cost report for the supplied app
against your rebuild — requests, bytes, time to content — and be honest about
what moving to the server did *not* fix.

**Out of scope**
- Saving a favourite route. It needs a write path, which is module 04.
- Any `revalidate` or fetch-cache tuning. Caching is project 2's whole subject,
  and guessing at it here produces cargo cult.

**What is assessed**
- A first-load cost report with honest accounting, including what the server did
  not fix.
- Bundle size before and after pushing the boundary down.
- Each side of the boundary justified in writing.
- Loading states scoped to the part that is actually changing.

### Project 2 — Pump
*Modules 04 · Weeks 4–6*

Pump is a board of petrol stations carrying crowd-reported pump price and queue
length. Anyone can report; there are no accounts.

It has two data sources whose right caching answers genuinely differ — a station
directory that changes about once a year, and reports that are worthless if they
are ten minutes stale. That is module 04's decision, forced by the product rather
than invented for the exercise.

**What you build**
- The station directory fetched on the server from a supplied endpoint with a
  day-long revalidation, because an address does not change hourly — module 04.
- The report form submitted through a server action with `revalidatePath`, so a
  new report appears without a full reload — module 04.
- Optimistic display of the submitted report, with rollback when the action
  fails — module 04, plus module 03 for the client leaf it needs.
- Revalidation broken on purpose and kept in the write-up: the report saved, the
  board still showing yesterday's, described exactly as it appeared before you
  fixed it — module 04. The failure is the lesson.
- A written table: for each piece of data, what is cached, for how long, and what
  invalidates it — module 04.

**The shape**
Routes: `/` (the board, most recent report first) and `/stations/[id]` (report
history and the form). Server action: `submitReport`. Entities:
`Station {id, name, brand, area}`, `Report {id, stationId, pricePerLitre, queue:
none|short|long|closed, reportedAt, reporterName}`. Storage is a JSON file on
disk, deliberately.

**Out of scope**
- Accounts, "my reports", or stopping somebody reporting twice by identity — all
  authentication, module 05.
- A database. The file store is the point, so the caching work is not confused
  with query work.

**What is assessed**
- Revalidation broken on purpose and then fixed, with a written account of
  exactly what stale looked like.
- For each piece of data: what is cached, for how long, and what invalidates it.
- Nothing solved by disabling the cache.

### Project 3 — Marksheet
*Modules 05 · Weeks 7–8*

Marksheet is a school results portal: a student signs in and sees their own
results; a teacher signs in and sees the class summary.

It separates the three things module 05 is about. Authentication says who you
are. Ownership says you may see your own results. Role says only a teacher sees
the summary. An app with ownership alone lets you pass while still believing
identity is authorisation.

**What you build**
- Email and password sign-in with a session cookie that survives a refresh —
  module 05.
- A real database queried only from server code, with every read filtered by the
  signed-in user **at the query** rather than in the page — module 05.
- A teacher-only route handler, `GET /api/classes/[id]/summary`, with the role
  check inside the handler — module 05, route handlers.
- The attack, run and reported: a student's session calling that summary
  endpoint directly, and calling the by-id result endpoint for a classmate, with
  whatever it found and the fix — module 05.
- A check that no database URL or session secret appears anywhere in the client
  bundle — module 05.

**The shape**
Entities: `User {id, email, passwordHash, name}`, `Class {id, name, term}`,
`Enrolment {userId, classId, role: student|teacher}`, `Result {id, enrolmentId,
subject, score, recordedAt, recordedBy}`. Routes: `/sign-in`, `/results`,
`/class/summary`. Handlers: `GET /api/results`, `POST /api/results`,
`GET /api/classes/[id]/summary`.

**Out of scope**
- Grade calculation rules, weighting and progression logic. Interesting, and
  entirely irrelevant to module 05.
- Parent accounts. A third role adds nothing the first two have not taught.

**What is assessed**
- Authorisation enforced on the server, not in the interface.
- An honest report of the attack, including anything it found.
- No secret reachable from a client component — verified in the bundle.

### Project 4 — Owambe
*Modules 06 · Weeks 9–10*

**Course capstone.** Owambe is an event page and guest list: an organiser
publishes a page, and guests RSVP without an account.

The static/dynamic split is not something you have to manufacture. The public
event page is read by many and changes rarely; the organiser's dashboard is
different for every request. One product, two correct answers.

**What you build**
- The public event page statically generated with `generateStaticParams` and
  revalidated on demand when the organiser saves — module 06, with module 04.
- The dashboard rendered dynamically per session, with the guest list streamed
  under Suspense while the event summary paints immediately — module 06.
- Organiser authentication and a database, every dashboard query scoped to the
  organiser; guests need no account — module 05 carried forward.
- RSVP through a server action that revalidates the organiser's view but not the
  public page's cached body — module 04, chosen and defended.
- Deployed on a real URL, verified from a cold start, with the client bundle
  inspected for secrets — module 06.

**The shape**
Entities: `Organiser {id, email, passwordHash, name}`, `Event {id, slug, title,
host, venue, startsAt, capacity, organiserId, published}`, `Rsvp {id, eventId,
name, phone, guests, createdAt}`. Routes: `/` (static), `/e/[slug]` (static,
revalidated on demand), `/sign-in`, `/dashboard`, `/dashboard/events/[id]`.
Server actions: `rsvp`, `saveEvent`. Five routes; do not add a sixth.

**Out of scope**
- Ticketing and payments.
- Invitations by email or SMS — a third-party integration that proves nothing
  about rendering.

**What is assessed**
- It is live and works from a cold start.
- Each route's rendering strategy is a decision you can defend.
- Secrets are server-side; verified by inspecting the client bundle.
- A README naming every server/client boundary decision and its reason.

---

## Module 01 — Why a metaframework
*Week 1*

What Next.js adds on top of React, and which problems it exists to solve for you.

**By the end you can**
- Name the problems a plain React SPA has that Next.js addresses.
- Describe what happens on the server for a first page load.
- Say when Next.js is the wrong choice.

**The misconception this clears.** That Next.js is "React with a router". It
moves half your code onto a machine you control, which is a change of
architecture, not a convenience.

**Exercise brief.** Take a supplied client-only React app. Write a page
describing what its first load costs a user on a slow connection — requests,
bytes, time to content — and predict what moving it to the server would and
would not fix.

**Model answer demonstrates.** Honest accounting, including the things a server
does *not* fix.

---

## Module 02 — Routing & layouts
*Week 1*

File-based routing, nested layouts, and loading states that appear in the right
order.

**By the end you can**
- Build nested routes with layouts that persist across navigation.
- Place loading and error boundaries so the right part of the screen responds.
- Explain what is preserved and what remounts on navigation.

**The misconception this clears.** That a layout is a wrapper component. It is a
boundary in the tree that survives navigation — which is why state placed inside
one behaves differently from state placed outside.

**Exercise brief.** Build a three-level nested route with a layout at each level.
Add a loading state that shows for only the part that is actually changing.
Demonstrate a piece of state that survives navigation and one that does not.

**Model answer demonstrates.** Correct boundary placement, shown by behaviour
rather than described in a comment.

---

## Module 03 — Server & client components
*Weeks 2–3*

Where your code runs, why it matters, and how to draw the boundary deliberately.

**By the end you can**
- Decide server or client for a component, and give the reason.
- Explain what can and cannot cross the boundary, and why.
- Recognise when `"use client"` has been added to silence an error rather than to
  express a decision.

**The misconception this clears.** That `"use client"` marks a file as
client-side. It marks the *boundary* — everything imported below it goes too,
which is how one careless directive drags an entire tree into the browser.

**Exercise brief.** You are given an app where `"use client"` sits at the top of
the tree. Push it down as far as it will go. Report the bundle size before and
after, and note which components genuinely needed it.

**Model answer demonstrates.** A measured bundle reduction, and a boundary each
side of which can be justified.

---

## Module 04 — Data, caching & mutations
*Weeks 4–6*

Server actions, caching, and revalidation — keeping data fresh without guesswork.

**By the end you can**
- Fetch on the server and mutate with server actions.
- Say what is cached, for how long, and what invalidates it.
- Debug stale data by reasoning about the cache rather than disabling it.

**The misconception this clears.** That caching is an optimisation you add later.
In Next.js it is on by default and part of the programming model — most "my data
is stale" bugs are the cache doing exactly what it was told.

**Exercise brief.** Build a page that lists records and a form that adds one,
using a server action. Make the new record appear without a full reload. Then
deliberately break it with the wrong revalidation, and write down what you saw.

**Model answer demonstrates.** Correct revalidation, and an accurate account of
the broken version — the failure is the lesson.

---

## Module 05 — Auth, databases & APIs
*Weeks 7–8*

Sessions, route handlers, and wiring a real backend into the same codebase.

**By the end you can**
- Add authentication with sessions that survive a refresh.
- Query a real database from server code.
- Explain why a secret must never cross into a client component.

**The misconception this clears.** That being in the same repository makes code
"safe". The boundary is a trust boundary — anything that reaches the client is
public, whatever folder it lived in.

**Exercise brief.** Add login to your module 04 app, with records scoped to the
signed-in user. Then attempt to read another user's data by calling your own
endpoints directly. Report what you found and fix it.

**Model answer demonstrates.** Authorisation enforced on the server, and an
honest report of any hole the student found in their own work.

---

## Module 06 — Rendering & deployment
*Weeks 9–10*

Static, dynamic, and streaming — then shipping the whole thing to production.

**The project.** This module's work is Project 4, the course capstone —
specified in full in the Projects section above.

## Assessment across the course

Modules 03, 04 and 05 each ask for a measurement or a deliberate failure. Those
write-ups are the assessment. Working code that nobody can explain does not pass
this course.
