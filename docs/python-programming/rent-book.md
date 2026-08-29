# Rent Book

*Python Programming · project 1 of 3*

| | |
|---|---|
| **Course** | [Python Programming](../courses/python-programming.md) |
| **Modules** | 01–02 |
| **Weeks** | 1–2 |
| **Course level** | The right place to start if you have never coded |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — How programming works** · Variables, logic, and control flow — the universal building blocks of code.
- **02 — Functions & data structures** · Organize your code and your data. Lists, dictionaries, and clean function design.

## Supplied by the school

This project cannot run until these exist.

- `rentbook_messy.py` — about sixty lines, everything in one block, printing as it goes, containing **one planted aliasing bug** that does not announce itself.

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

---

## Where this sits

- Curriculum document: [`docs/courses/python-programming.md`](../courses/python-programming.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
