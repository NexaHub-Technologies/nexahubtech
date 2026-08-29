# Python Programming

Learn programming from scratch with Python — the language that powers everything
from scripts to AI.

> **The mental model — Names are labels, not boxes**
>
> A variable in Python is a name tied to an object, not a container holding one.
> Two names can point at the same list. Passing a value to a function passes the
> label, not a copy. This one idea explains almost every surprise a beginner runs
> into — mutation, identity, default arguments — and turns programming into
> watching data change shape rather than memorising syntax.

| | |
|---|---|
| **Format** | Taught live, online · start any time |

## Before you start

**Know:** how to use a computer — files, folders, installing software. No
programming experience of any kind.

**Have:** a laptop with 4GB RAM or more; a stable internet connection; 5–7 hours
a week outside sessions.

> **On pace.** Six weeks is short. It is enough to make you genuinely able to
> write small programs and read larger ones — it is not enough to make you a
> professional Python developer, and we will not pretend otherwise.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1 | 01 | How programming works |
| 2 | 02 | Functions & data structures |
| 3 | 03 | Working with files & APIs |
| 4 | 04 | Object-oriented Python |
| 5–6 | 05 | Building a project |

## Projects

3 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing — project 2 starts from
nothing rather than extending project 1 — so you finish with 3 separate pieces
of work you can show somebody, each demonstrating something different.

The per-module exercise briefs below are practice. These are the integration.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–02 | 1–2 | **Rent Book** — a landlord's rent report, rebuilt from a messy script |
| 2 | 03–04 | 3–4 | **Rate Watch** — a daily exchange-rate recorder that survives interruption |
| 3 | 05 | 5–6 | **Course capstone.** **Errand**, **Meter** or **Fare** — your choice of three |

### Project 1 — Rent Book
*Modules 01–02 · Weeks 1–2*

Rent Book is a landlord's rent-collection report: who is on the register, who has
paid for a period, who has not, and what is outstanding. You are given
`rentbook_messy.py` — about sixty lines, everything in one block, printing as it
goes — and you rebuild it. It is the right project for the first fortnight
precisely because it needs nothing from outside the program: no files, no
network, no classes. The whole job is naming ideas and picking the structure that
fits each one.

The supplied script also contains one planted bug of the kind module 01 exists to
clear, and it does not announce itself. The rebuild is where you find it.

**What you build**
- The one-block script rebuilt into functions named after ideas, none longer than
  15 lines and none printing — module 02, functions that return rather than print.
- The planted aliasing bug found, fixed and written up: the tenant register and
  the defaulter list turn out to be two names on one list — module 01, names and
  objects.
- Defaulters for a period, computed as everyone on the register minus everyone
  who paid — module 02, sets and set difference.
- The register held as a dictionary keyed by flat number, with a written reason
  for choosing it over a list of tuples — module 02, choosing the structure.
- Money carried as whole kobo everywhere, turned into naira in the single
  function that formats — module 01, integers, and why floats have no business
  near rent.

**The shape**
One file, `rentbook.py`, run as `python rentbook.py`. The period under review is
a constant at the top of the file; periods are integers 1–12, not dates. `main()`
calls the report functions and is the only place `print` appears. It prints four
sections in order: the register, receipts for the period, defaulters for the
period, and total outstanding in naira.

**Out of scope**
- Reading the register from a CSV, or writing the report anywhere but the
  terminal — files are module 03.
- A `Tenant` class. Classes are module 04, and a dictionary is the right answer
  this fortnight.
- Real dates. `datetime` is module 03 and is the likeliest route off-syllabus in
  the whole course; if you find yourself importing it, the period is meant to be
  an integer.

**What is assessed**
- Functions return rather than print; output happens in one place.
- A defensible choice of list, dict, set or tuple at each point.
- The aliasing cases explained in terms of names and objects, not "lists are
  weird".
- Your prediction sheet from module 01 handed in alongside it, including the two
  cases where two names point at the same list.
- Amounts are integers in kobo end to end, with no float arithmetic on money.

### Project 2 — Rate Watch
*Modules 03–04 · Weeks 3–4*

Rate Watch records the naira exchange rate once a day and keeps the history.
Two things make it the right project for these two weeks. The network is the
boundary module 03 is about — it is slow, it is absent on the day you need it,
and it returns shapes you did not expect. And there is exactly one thing in the
program that genuinely holds state, the history on disk, which is the smallest
honest reason to write a class.

*Before this brief is issued, check that `open.er-api.com` is still live and
key-free. If it is not, the same project works unchanged as a daily weather log.*

**What you build**
- `record` fetches today's rate from a public rates API and adds it to the
  history — module 03, fetching JSON and navigating the result rather than
  hoping about it.
- The write goes to a temporary file and is then moved into place with
  `os.replace`, so a run interrupted halfway leaves the previous history intact
  — module 03, not losing data when something goes wrong.
- `show` works with the network disconnected, because it reads only what is
  already on disk — module 03, knowing where your program's boundary is.
- Three failure cases handled by name: no network, a currency the API does not
  carry, and a history file somebody has edited into invalid JSON. Each fails
  with a sentence a person could act on — module 03, error handling as design
  rather than decoration.
- One class, `RateStore`, holding the file path and the loaded history;
  everything else stays a function, with a paragraph defending both halves —
  module 04, restraint.

**The shape**
`python ratewatch.py record` and `python ratewatch.py show [--last N]`. The
history is a single JSON file with one entry per day — date, base currency,
quote currency, rate — and running `record` twice in one day replaces that day's
entry rather than adding a second one.

**Out of scope**
- A database. A JSON file you can open and read is the point; a database hides
  the failure mode this project is about.
- Classes for fetching or formatting. `RateStore` holds state. Nothing else in
  the program does, and converting them anyway is the mistake being watched for.

**What is assessed**
- Runs cleanly with the network disconnected and with a corrupted file, both
  failing with a message a human could act on.
- A written defence of what you converted to a class *and what you left alone*.
  The strongest answers convert less than half.
- A `record` killed mid-write leaves the previous history readable.
- `show` never touches the network — demonstrated with the network off.

### Project 3 — Errand, Meter or Fare
*Module 05 · Weeks 5–6*

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

## Module 01 — How programming works
*Week 1*

Variables, logic, and control flow — the universal building blocks of code.

**By the end you can**
- Read a short program and say what it will print, before running it.
- Use conditionals and loops to express a rule in words as a rule in code.
- Explain what a variable actually is, in Python's terms.

**The misconception this clears.** That a variable is a box holding a value. It
is a name pointing at an object — the course's whole mental model starts here, in
week one, deliberately.

**Exercise brief.** Given six short programs involving assignment, lists and
functions, predict the output **in writing** before running any of them. Two of
them involve two names pointing at the same list. Explain those two carefully.

**Model answer demonstrates.** Correct predictions explained in terms of names
and objects — not "it changed because lists are weird".

---

## Module 02 — Functions & data structures
*Week 2*

Organize your code and your data. Lists, dictionaries, and clean function design.

**By the end you can**
- Choose between a list, a dictionary, a set and a tuple for a given job.
- Write functions that do one thing and return rather than print.
- Explain why a mutable default argument behaves the way it does.

**The misconception this clears.** That functions are for avoiding repetition.
They are for naming an idea; the reuse is a side effect.

**Exercise brief.** You are given a 60-line script with everything in one block.
Break it into functions, choosing the right data structure at each step. No
function longer than 15 lines, and none may print — printing happens in one place
only.

**Model answer demonstrates.** Functions named after ideas rather than steps, and
a defensible choice of structure at each point.

---

## Module 03 — Working with files & APIs
*Week 3*

Read, write, and fetch data. Connect your scripts to the real world.

**By the end you can**
- Read and write files without losing data when something goes wrong.
- Fetch JSON from an API and navigate the result.
- Handle the failure cases — missing file, bad response, unexpected shape.

**The misconception this clears.** That error handling is something you add at
the end. Anything crossing your program's boundary can fail, and code written
assuming success is code that will lose someone's data.

**Exercise brief.** Write a script that fetches data from a public API, saves it
to a file, and can be run repeatedly without corrupting what is already there.
Then run it with the network disconnected and with a corrupted file, and make
both cases fail cleanly.

**Model answer demonstrates.** Both failure cases handled with a message a human
could act on, not a stack trace.

---

## Module 04 — Object-oriented Python
*Week 4*

Classes, objects, and when OOP actually helps — not just when it adds noise.

**By the end you can**
- Write a class with clear responsibilities.
- Say when a class is the right tool and when a function or dictionary is better.
- Read code written by others that uses classes.

**The misconception this clears.** That OOP is the grown-up way to write Python.
It is one tool; a class with no state and one method is a function wearing a
costume.

**Exercise brief.** Take your module 03 script and refactor the part that
genuinely holds state into a class. Leave the rest as functions. Write one
paragraph defending both decisions.

**Model answer demonstrates.** Restraint — the strongest answers convert less
than half the script and can say why.

---

## Module 05 — Building a project
*Weeks 5–6*

Put it all together into something real you can show and explain.

**The project.** This module's work is Project 3, the course capstone —
specified in full in the Projects section above.

## Assessment across the course

No grades. Module 01's written predictions matter most — if the name/object model
is solid by week two, everything after it is much easier.
