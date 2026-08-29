# Roll Call

*React · project 1 of 3*

| | |
|---|---|
| **Course** | [React](../courses/react-development.md) |
| **Modules** | 01–03 |
| **Weeks** | 1–3 |
| **Course level** | Assumes you already write JavaScript |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — How React actually works** · Rendering, reconciliation, and why the screen updates when it does — the model behind the API.
- **02 — State, placed properly** · Where state belongs, when to lift it, and how to design it so whole classes of bugs stop existing.
- **03 — Effects & the outside world** · Data fetching, subscriptions, and cleanup — plus learning when you don't need an effect at all.

## Supplied by the school

This project cannot run until these exist.

- A static JSON roll endpoint, one file per course code.

Roll Call is a single-screen attendance register for a lecturer taking a class:
pick a course, the roll loads, filter it, mark each student present, absent or
excused.

It is the smallest honest thing with all three awkward pieces at once — a
filterable list carrying a selection, a form, and a network load that can be
raced. The selection surviving a filter change is the state-shape lesson;
switching courses mid-fetch is the cleanup lesson.

**What you build**
- A course picker that refetches the roll, with cleanup that discards the
  response of a course you have already navigated away from — module 03, effects
  and cleanup.
- One `status` union — `idle | loading | ready | error` — instead of separate
  `isLoading` and `error` variables, so "loading and failed at once" cannot be
  typed — module 02, impossible states.
- Selection stored as a matric number only, with the student looked up on render,
  so a filter change or a new roll cannot leave the selection pointing at
  nobody — module 02, derived not stored.
- The filtered list and the present/absent/excused tally computed during render,
  never held in state and never synced by an effect — module 02 and 03.
- Roll rows keyed by matric number, with the module 01 render-log report showing
  which rows actually re-rendered when one student was marked — module 01,
  reconciliation and keys.

**The shape**
One screen. A header with the course picker and a live tally; a filter bar with a
search input and a three-way status filter; the roll list; a mark panel for the
selected student; and a form to add a walk-in. Data comes from a supplied static
JSON endpoint, one file per course code.

**Out of scope**
- Saving marks back to a server. There is no write path here; the session summary
  is produced as copyable text instead, because a write adds nothing to what is
  being assessed.
- Extracting a `useRoll` hook. Hooks are module 04, and doing it early hides
  exactly the state placement being assessed.

**What is assessed**
- The impossible states are actually impossible — list which bugs that killed.
- Derived values are computed, not stored and kept in sync.
- Every remaining `useEffect` has a written justification; the rest are gone.
- Cleanup that provably stops the stale response, demonstrated.
- The render-log report, with the reconciliation rule behind every wrong
  prediction.

---

## Where this sits

- Curriculum document: [`docs/courses/react-development.md`](../courses/react-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
