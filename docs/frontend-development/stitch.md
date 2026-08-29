# Stitch

*Frontend Development · project 1 of 3*

| | |
|---|---|
| **Course** | [Frontend Development](../courses/frontend-development.md) |
| **Modules** | 01–03 |
| **Weeks** | 1–4 |
| **Course level** | Built for complete beginners |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — How the web works** · The mental model first — what a browser is really doing before you write a single tag.
- **02 — HTML, structurally** · Markup as meaning. Build pages that are readable to people, browsers, and assistive tech.
- **03 — CSS & layout** · From the box model to modern layout — styling with intent instead of guesswork.

## Supplied by the school

This project cannot run until these exist.

- The **Stitch design**, at three widths. You write the markup and the CSS; the design is given.

Stitch is a three-page site for a tailor: the styles on offer, one style written
up in full, and how to find the shop. The school supplies the design at three
widths; you supply the markup and the CSS.

Those three pages cover almost everything modules 02 and 03 have to teach. A
styles list is a grid of comparable items; a style write-up is an article with a
figure and a small table; find-us is an address, opening hours and a form. None
of it is invented to exercise a tag.

**What you build**
- The styles list marked up as a list of items, not a wall of `<div>`s — each a
  heading, a description and a price, reading correctly aloud in that order —
  module 02, choosing elements by what the content is.
- The style page as an `<article>` with a `<figure>`/`<figcaption>` and a fabric
  table — module 02, headings in order and a table that is data rather than layout.
- A measurements enquiry form, labelled and keyboard-operable, submitting
  nowhere — module 02.
- The styles grid built with CSS Grid, with a written reason for Grid rather than
  Flexbox — the alignment across rows is the reason, and you have to name it —
  module 03.
- The opening-hours block and the page frame built with Flexbox, so the same
  project contains a deliberate choice in both directions — module 03.

**The shape**
`index.html` (the styles), `style.html` (one style in full), `find-us.html`
(address, hours, form). One stylesheet. Handed in as two commits: the first with
no CSS at all, keyboard-walked and read aloud; the second styled at three widths.
Plus the surprise log — every time CSS did something you did not expect, and the
rule that turned out to explain it.

**Out of scope**
- Any JavaScript at all, including a nav that toggles open. Module 04 is five
  weeks away. At narrow widths the nav wraps.
- An image lightbox or a carousel on the style page. Both need module 04. The
  supplied design contains neither, so this is a temptation to resist rather than
  a gap to fill.

**What is assessed**
- Usable by keyboard and sensible read aloud before any CSS exists.
- Responsive because of how it was described, not by patched breakpoints. No
  fixed container widths, no `!important`.
- The surprise log, which is the real deliverable — it is evidence of the model
  forming.

---

## Where this sits

- Curriculum document: [`docs/courses/frontend-development.md`](../courses/frontend-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
