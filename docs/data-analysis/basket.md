# Basket

*Data Analysis · project 2 of 4*

| | |
|---|---|
| **Course** | [Data Analysis](../courses/data-analysis.md) |
| **Modules** | 03 |
| **Weeks** | 6–8 |
| **Course level** | Open to beginners who enjoy a question |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **03 — Python for data** · Pandas, NumPy, and Jupyter. Clean, transform, and explore datasets efficiently.

## Supplied by the school

This project cannot run until these exist.

- A **fixed archived snapshot** of the NBS food-price releases. NBS revises and re-posts, so without a frozen snapshot marking is not reproducible.

Basket takes a National Bureau of Statistics selected food-price release and
gets it into a state where it can be analysed at all: item names spelled several
ways, units that are not comparable, states appearing and disappearing between
months, gaps that may be a missing observation or may be a real zero. The
deliverable is not the clean data. It is the log of what you decided and what
each decision might have cost.

You work from a snapshot the school has archived and pinned, not from the live
release. NBS revises and re-posts, and an analysis that cannot be re-run against
the same bytes is not reproducible.

**What you build**
- The release loaded and profiled before anything is changed: row counts, ranges,
  missingness by column and by month — module 03, exploratory work that changes
  what you go on to ask.
- Names, units and geography reconciled — mixed measures brought to a common
  unit, duplicates resolved, item labels mapped — module 03, cleaning as analysis.
- A missing-value policy chosen deliberately per column, not one rule applied to
  the sheet, with the reason for each — module 03.
- **The decision log**: every choice, what it assumes, and which direction it
  could bias a result. This is the graded artefact.
- One decision re-run the other way, end to end, showing how far a headline
  number moves. Report the movement; do not dress it up as a finding about food
  prices, because it is a finding about your own choices.

**The shape**
A notebook in four sections — profile before cleaning, the cleaning itself with
each step commented, the alternative-choice comparison, and a short statement of
what this data can and cannot support — with the decision log as a separate
markdown table so it can be read without running anything.

**Out of scope**
- Explaining *why* prices moved. That needs data this release does not carry, and
  the confident causal sentence is the failure mode of this project.
- Forecasting. Not in this course at all.

**What is assessed**
- The decision log: every choice, and what it might bias.
- Two analysts can clean the same data differently and both be defensible; what
  is not defensible is failing to say so.
- The alternative-choice comparison, with the number it moves.
- The profile was taken before the cleaning, not after.
- The work re-runs from the archived snapshot and produces the same numbers.

---

## Where this sits

- Curriculum document: [`docs/courses/data-analysis.md`](../courses/data-analysis.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
