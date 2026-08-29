# Danfo

*Next.js · project 1 of 4*

| | |
|---|---|
| **Course** | [Next.js](../courses/nextjs-fullstack.md) |
| **Modules** | 01–03 |
| **Weeks** | 1–3 |
| **Course level** | Assumes you already write React |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — Why a metaframework** · What Next.js adds on top of React, and which problems it exists to solve for you.
- **02 — Routing & layouts** · File-based routing, nested layouts, and loading states that appear in the right order.
- **03 — Server & client components** · Where your code runs, why it matters, and how to draw the boundary deliberately.

## Supplied by the school

This project cannot run until these exist.

- **Danfo** as a client-only React SPA, shipping a 400KB dataset to the browser. This is the rebuild target and the source of the before/after measurement.

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

---

## Where this sits

- Curriculum document: [`docs/courses/nextjs-fullstack.md`](../courses/nextjs-fullstack.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
