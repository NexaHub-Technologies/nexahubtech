# Cashbook and Ticker

*React · project 2 of 3*

| | |
|---|---|
| **Course** | [React](../courses/react-development.md) |
| **Modules** | 04–05 |
| **Weeks** | 4–6 |
| **Course level** | Assumes you already write JavaScript |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **04 — Composition & custom hooks** · The patterns that keep components small and share logic without tangling a codebase.
- **05 — Performance, measured** · Memoisation, list rendering, and profiling. Making it fast on evidence rather than on instinct.

## Supplied by the school

This project cannot run until these exist.

- **Cashbook** — a 300-line single component, realistically bad rather than artificially bad.
- **Ticker** — a slow price board of ~2,000 rows with three *separately diagnosable* causes, plus one pointless `useMemo`.

Two supplied codebases, neither of which you wrote.

**Cashbook** is a three-hundred-line single component: a cooperative treasurer's
contribution desk, with a member search, a member summary, a contribution form, a
ledger table and a receipt preview all in one file, and the selected member
drilled four levels down to the receipt. It is the shape a real screen degenerates
into when nobody stopped.

**Ticker** is a deliberately slow price board — around two thousand produce prices
across forty markets. It is slow for three separate reasons, so the profiler has
to distinguish them rather than confirm a hunch.

**What you build**
- Cashbook decomposed so nothing exceeds eighty lines and no prop travels more
  than two levels. The receipt preview and the ledger both need the selected
  member, and the fix is composition — passing elements through as children —
  module 04.
- Exactly one custom hook extracted, with a one-sentence justification, and at
  least one place you deliberately leave duplicated with the reason written
  down — module 04, hooks that earn their place.
- Ticker's three planted problems found with the profiler, fixed, and reported
  with before-and-after numbers — module 05.
- One planted `useMemo` wrapping a primitive comparison, found and removed —
  module 05.

**The shape**
Cashbook: one screen — member search, summary strip, contribution entry, ledger
table, receipt preview. Ticker: one screen — search box, market filter chips, a
long unvirtualised table, a star toggle per row. Hand in both repositories plus a
profiling report.

**Out of scope**
- Virtualising Ticker's list. A library would make the number good without you
  learning which of the three problems it solved.
- Introducing context or a state library to relieve Cashbook's prop drilling.
  Composition is module 04's answer, and reaching past it skips the exercise.

**What is assessed**
- Judgement, including at least one place where the right decision was to leave
  things alone.
- Three performance problems found by measurement, fixed, and reported with
  before-and-after numbers.
- A change without a number attached does not count.

---

## Where this sits

- Curriculum document: [`docs/courses/react-development.md`](../courses/react-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
