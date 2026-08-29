# Kasuwa Eight

*Data Analysis · project 1 of 4*

| | |
|---|---|
| **Course** | [Data Analysis](../courses/data-analysis.md) |
| **Modules** | 01–02 |
| **Weeks** | 1–5 |
| **Course level** | Open to beginners who enjoy a question |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — Thinking with data** · Asking the right questions. What data can tell you — and what it can't.
- **02 — SQL for analysis** · Query, filter, and join data. Get comfortable pulling insights from real databases.

## Supplied by the school

This project cannot run until these exist.

- The **Kasuwa** teaching database — eight tables, clearly labelled synthetic. The trap lives in `deliveries`: an order split across two deliveries inflates every revenue figure, and inflates it *plausibly*.

Kasuwa is a market-trading database the school builds and hands you: eight
tables covering traders, stalls, orders, deliveries, payments and returns, and
labelled synthetic on every page, because nothing produced from it is a fact
about any real market. Eight questions get answered against it over five weeks.

It sits across both modules on purpose. Module 01 is the shaping of the question
and module 02 is the SQL, and separating them produces analysts who can write a
query that runs and cannot say what it means.

**What you build**
- One vague question — "how is the market doing?" — turned into three narrower
  questions this database can answer, plus a written list of what it cannot and
  what you would have to collect instead — module 01, the question before the data.
- Eight answers in SQL, each with your order-of-magnitude prediction written down
  *before* you run the query — module 02, sanity-checking as routine rather than
  as a final step.
- Joins, grouped aggregates and at least one window function across the eight —
  module 02, against a schema you did not design.
- One of the eight joins duplicates rows silently and its total is wrong in a way
  that looks entirely reasonable. Find it, say how you knew, and **go back and
  correct any earlier answer it invalidates.** The questions are ordered so that
  a later one gives you the means to catch an earlier one; the strongest
  submissions correct themselves without being told to.
- A written account of what Kasuwa systematically leaves out — every dataset
  encodes somebody's decision about what was worth recording — module 01,
  selection effects.

**The shape**
A `.sql` file per question, each opening with a comment carrying the question in
plain English and your prediction, and a short markdown write-up holding the
three narrowed questions, the answers with their checks, and the correction.

**Out of scope**
- Charts. There are none in this project, deliberately — visualisation is module
  04, and a chart is a very effective way to stop looking at a number.
- Pandas. The whole point of five weeks here is that the database does the work.

**What is assessed**
- An explicit account of what the dataset leaves out, and the selection effects
  in it.
- The join that silently duplicates rows, found and explained.
- Sanity-checking as routine: a result that looks reasonable is the dangerous
  one.
- Predictions recorded before the query ran, including the ones you got wrong.
- Earlier answers corrected once a later one exposed them.

---

## Where this sits

- Curriculum document: [`docs/courses/data-analysis.md`](../courses/data-analysis.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
