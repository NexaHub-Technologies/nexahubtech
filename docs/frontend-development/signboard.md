# Signboard

*Frontend Development · project 3 of 3*

| | |
|---|---|
| **Course** | [Frontend Development](../courses/frontend-development.md) |
| **Modules** | 05 |
| **Weeks** | 9–10 |
| **Course level** | Built for complete beginners |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **05 — Building something real** · Put it together into a project you understand end to end — and can explain.

**Course capstone.** Signboard is a deployed three-page site for a one-person
business you pick — a tailor, a phone-repair bench, a photographer, a baker —
whose interactive piece is a quote builder: the visitor answers three questions
and gets an itemised estimate they can copy or send on WhatsApp.

You choose the subject; the shape is fixed. That is what makes two submissions
comparable, and the quote builder is deliberately not a filtered list, so the
capstone does not repeat Shelf.

**What you build**
- A work or catalogue page with a grid of six items, responsive without written
  breakpoints — module 03 carried forward.
- A quote builder: pick a service, pick options, watch an itemised estimate
  update — module 04, a price table held as an array of objects, state in
  variables, one render function. The arithmetic is trivial; the state discipline
  is the assessment.
- The finished quote composed into a copyable summary and a `wa.me` link —
  module 04, a real ending for the interaction rather than a form that goes
  nowhere.
- A contact form with client-side validation and readable inline errors that are
  announced and keyboard-reachable — module 04, with module 02 carried forward.
- Deployed, reachable from a link, and quick on a slow connection — module 05.

**The shape**
`index.html` (what the business does, prices at a glance), `work.html` (the
grid), `quote.html` (the builder and the contact form). One stylesheet, one
script, any static host. Six catalogue items and three quote questions with a
flat price table — those numbers are the brief, not a suggestion.

**Out of scope**
- Taking payment, or storing an enquiry anywhere. There is no server in this
  course; the quote ends in the visitor's hands, and you must be able to say why
  that is the honest boundary.
- A blog or a CMS. Multi-page means three pages that exist, not a publishing
  system.

**What is assessed**
- Deployed and reachable from a link.
- Usable by keyboard throughout; sensible structure underneath the design.
- Responsive because of how it was built, not because of patched breakpoints.
- You can explain any CSS rule in it and why it is there.
- A README saying what it is and what you would do next.

---

## Where this sits

- Curriculum document: [`docs/courses/frontend-development.md`](../courses/frontend-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
