# Ajo

*Web Development · project 1 of 4*

| | |
|---|---|
| **Course** | [Web Development](../courses/web-development-fullstack.md) |
| **Modules** | 01–03 |
| **Weeks** | 1–3 |
| **Course level** | Built for complete beginners |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — How the web works** · The mental model first — what a browser and server are really doing before you write a single line of code.
- **02 — HTML & structure** · Markup as meaning. Build pages that are readable to people, browsers, and assistive tech.
- **03 — CSS & layout** · From the box model to modern layout — styling with intent instead of guesswork.

Ajo is a three-page site for a contribution savings club — the scheme called
*ajo* in the south-west, *adashe* in the north and *isusu* in the south-east.
It explains how the scheme works, what the contribution levels are, and how to
join.

It is the right first project because a savings club has to publish **rules**,
and rules are the content type HTML was designed for: steps in order, a genuine
data table, definitions, a form. The semantic choice is forced by the content
rather than invented for an exercise.

**What you build**
- A contribution table — level, daily amount, cycle length, payout position —
  marked up so a screen reader can read any cell back to its row and column
  headings — module 02, `<caption>`, `<thead>`, `<th scope>`.
- A join form, fully labelled and keyboard-operable, that **submits nowhere** —
  module 02. Module 01 supplies the write-up: which machine would receive this,
  and what it would send.
- An FAQ built from `<details>` and `<summary>` — module 02, expand and collapse
  as browser behaviour. A useful early proof that "interactive" and "JavaScript"
  are not the same word.
- A committee grid that reflows without a breakpoint written for it — module 03,
  Grid with `repeat(auto-fit, minmax())`.
- The table surviving a narrow screen through an `overflow-x` wrapper rather than
  shrinking the type or hiding columns — module 03.

**The shape**
Three pages: `index.html` (what the scheme is, the steps in order),
`contributions.html` (the table, and the rules on missed payments), `join.html`
(the form, and where the office is). One shared stylesheet. One `<nav>` repeated
across all three, with the current page marked `aria-current="page"`.

**Out of scope**
- A hamburger menu that opens and closes. That needs module 04. At narrow widths
  the nav wraps or stacks in CSS. The checkbox-and-`:checked` trick is banned
  too — it is a workaround for a tool you do not have yet, and it produces a
  control that lies about what it is.
- A form that actually sends. That is module 05. Submitting and doing nothing is
  the correct behaviour at week 3, and you must be able to say why.

**What is assessed**
- It is usable by keyboard and sensible read aloud *before* any styling exists.
- It adapts because of how the layout was described, not because of patched
  breakpoints. No fixed widths on containers, no `!important`.
- For anything the page loads, you can say which machine served it and why.
- No invented member testimonials or savings figures. The rules of the scheme are
  stated as rules; nothing on the page claims to be a fact about a real club.

---

## Where this sits

- Curriculum document: [`docs/courses/web-development-fullstack.md`](../courses/web-development-fullstack.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
