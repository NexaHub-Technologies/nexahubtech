# Pump

*Next.js · project 2 of 4*

| | |
|---|---|
| **Course** | [Next.js](../courses/nextjs-fullstack.md) |
| **Modules** | 04 |
| **Weeks** | 4–6 |
| **Course level** | Assumes you already write React |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **04 — Data, caching & mutations** · Server actions, caching, and revalidation — keeping data fresh without guesswork.

## Supplied by the school

This project cannot run until these exist.

- A station directory endpoint.

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

---

## Where this sits

- Curriculum document: [`docs/courses/nextjs-fullstack.md`](../courses/nextjs-fullstack.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
