# Errand, Meter or Fare

*Python Programming · project 3 of 3*

| | |
|---|---|
| **Course** | [Python Programming](../courses/python-programming.md) |
| **Modules** | 05 |
| **Weeks** | 5–6 |
| **Course level** | The right place to start if you have never coded |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **05 — Building a project** · Put it all together into something real you can show and explain.

**Course capstone.** Pick one of three. Each is a command-line program that reads
data from somewhere real, groups and totals it, and answers a question you would
otherwise work out on paper. The choice is yours; the shape is not, and neither
is the restriction that follows the three briefs.

**Errand** — a shopping list costed against a prices file. Each price line
carries a shop, an item, a pack size and a price; the program normalises to a
unit price so that 900g of one brand and 1.2kg of another are comparable at all.
It reports the list costed, the cheapest shop per item on unit price, and the
total for the trip.

**Meter** — a prepaid electricity log. Each top-up records the date, the amount
paid and the units credited. The program reports cost per unit for each top-up
and how that has moved, units consumed per day between top-ups, and how many
days remain at the most recent rate of consumption.

**Fare** — a daily transport spend log. Each leg records the date, the route and
the fare paid. The program reports spend per week, spend by route, and the
routes whose fare has changed since the first week you recorded.

**What you build**
- The chosen program, reading its data from a file you maintain or an API you
  fetch — module 03, files and APIs, with the failure cases handled.
- The grouping and totalling written out by hand — a dictionary keyed by the
  thing you are grouping by — module 02. **No `pandas`.** The grouping is what
  is being assessed; a library does it for you and there is nothing left to mark.
- Whatever genuinely holds state as a class and nothing else — module 04, the
  same restraint as Rate Watch, defended in a paragraph.
- Bad input survived and named: a missing file, a blank line, a price that is not
  a number, a date in the wrong format. Each reported in a sentence, never as a
  traceback.
- A README a stranger can follow to run it on their own machine.

**The shape**
One command with two or three subcommands — one to add a record, one to report,
optionally one to list what is stored — over a plain-text or JSON data file you
can open and read yourself. Everything the program knows lives in that file.

**Out of scope**
- `pandas`, `numpy` and any charting library. This is the Python course; the
  Data Analysis course is where those belong.
- A web interface, a database or user accounts. Two weeks is enough for a good
  command-line program and not enough for those as well.

**What is assessed**
- It runs on someone else's machine from your README.
- It fails cleanly on bad input, with a message that helps.
- Functions are named after ideas; nothing is a 100-line block.
- You can explain any line of it without hesitating.
- The grouping is your own code, not a library call.

---

## Where this sits

- Curriculum document: [`docs/courses/python-programming.md`](../courses/python-programming.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
