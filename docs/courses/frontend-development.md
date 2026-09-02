# Frontend Development

Learn the web from first principles — HTML, CSS, and JavaScript done properly.

> **The mental model — You describe; the browser draws**
>
> You never place a pixel yourself. You hand the browser a document and a set of
> rules, and it computes the result — structure first, then layout, then paint.
> Once CSS reads as constraints you hand a layout engine rather than positions
> you set by hand, "why is it doing that?" stops being a mystery and becomes a
> question you can reason your way to.

| | |
|---|---|
| **Format** | Taught live, online · start any time |
| **Scope** | HTML, CSS and JavaScript. No framework, no backend. |

## Before you start

**Know:** basic computer literacy — files, folders, installing software. No HTML,
CSS or JavaScript; every one of them starts from zero here.

**Have:** a laptop with 4GB RAM or more (8GB is far more comfortable); a stable
internet connection; 6–8 hours a week outside sessions.

> **How this differs from the Fullstack track.** Same first four subjects, but
> over 10 weeks instead of 6, with no server work. If you want depth in the
> browser, take this. If you want both halves quickly, take Fullstack.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1 | 01–02 | How the web works · HTML, structurally |
| 2–4 | 03 | CSS & layout |
| 5–8 | 04 | JavaScript foundations |
| 9–10 | 05 | Building something real |

## Projects

3 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing — project 2 starts from
nothing rather than extending project 1 — so you finish with 3 separate pieces
of work you can show somebody, each demonstrating something different.

The per-module exercise briefs below are practice. These are the integration.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–03 | 1–4 | **Stitch** — a tailor's shop site, from a supplied design |
| 2 | 04 | 5–8 | **Shelf** — a book finder over a real, incomplete catalogue |
| 3 | 05 | 9–10 | **Course capstone.** **Signboard** — a business site with a quote builder |

### Project 1 — Stitch
*Modules 01–03 · Weeks 1–4*

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

### Project 2 — Shelf
*Modules 04 · Weeks 5–8*

Shelf is a book finder over the Open Library catalogue: search by subject or
author, filter and sort what comes back, and expand any result for its details.

Open Library returns a large, genuinely incomplete result set — missing years,
missing authors, missing covers — so the empty and partial states are real rather
than simulated. It is also slow enough on a poor connection that the loading
state has to be designed rather than remembered.

**What you build**
- Search executed against the API with the query held in a variable, never read
  back out of the input on re-render — module 04.
- Filter by decade and by "has a cover", and sort by year or title, all applied
  to the fetched array — module 04, `filter`/`sort`/`map` on the data, with
  re-render as the only way the page changes.
- An accordion built from `<button>` elements with `aria-expanded`, one panel per
  result — module 04. It must **not** be `<details>`: the point is to build the
  behaviour, not to borrow it.
- Loading, empty and failed states, with "no results" and "the request failed"
  saying visibly different things — module 04.
- The whole thing operable with no mouse, and focus never lost when the list
  re-renders — module 04, with module 02 carried forward.

**The shape**
One page, one stylesheet, one script split into fetching, a pure
`applyFilters(books, state)`, and a single `render(state)`. The request:
`https://openlibrary.org/search.json?q=…&limit=40&fields=title,author_name,first_publish_year,cover_i,key`
The `fields` parameter is part of the brief rather than an optimisation — it is
your first encounter with asking for less over a slow connection.

**Out of scope**
- Putting the search in the URL so a result page can be shared. The History API
  is not in module 04 and it will consume a week.
- Infinite scroll. A "load more" button is acceptable if you are ahead;
  paginating is not required.

**What is assessed**
- Loading, empty and failed states all handled deliberately.
- Filtering works on the data, not on the DOM.
- State kept in variables rather than read back out of the page.
- The whole thing is operable without a mouse.

### Project 3 — Signboard
*Modules 05 · Weeks 9–10*

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

## Module 01 — How the web works
*Week 1*

The mental model first — what a browser is really doing before you write a
single tag.

**By the end you can**
- Describe the journey from URL to painted pixels, in order.
- Name what the browser does that you are not writing: parse, layout, paint.
- Use developer tools to inspect what actually loaded.

**The misconception this clears.** That a web page is a picture you build. It is
a document the browser renders, and you are writing instructions for a machine
that makes the final decisions.

**Exercise brief.** Take a page you like. Using developer tools only, write down
what it is made of: how many requests, what the largest one is, what the HTML
structure is underneath the design. Predict, before you look, which part is HTML
and which is CSS.

**Model answer demonstrates.** Fluency in the developer tools, and — more
importantly — predictions that were then checked, right or wrong.

---

## Module 02 — HTML, structurally
*Week 1*

Markup as meaning. Build pages that are readable to people, browsers, and
assistive tech.

**By the end you can**
- Choose elements by what the content means, not how it should look.
- Build a form that works by keyboard and reads correctly to a screen reader.
- Explain why semantics are not decoration.

**The misconception this clears.** That tags are interchangeable and the visual
result is what matters. Browsers, search engines and assistive technology all
read the meaning, and only one of your audiences can see the styling.

**Exercise brief.** Mark up a supplied article — headings, quotes, a figure, a
data table and a sign-up form — with no CSS at all. It must be completely
navigable by keyboard and make sense read aloud.

**Model answer demonstrates.** A page that is usable before any styling exists,
correct heading order, and labelled controls.

---

## Module 03 — CSS & layout
*Weeks 2–4*

From the box model to modern layout — styling with intent instead of guesswork.

**By the end you can**
- Predict how a box sizes itself, and why.
- Reach for Flexbox or Grid deliberately, and justify which.
- Diagnose why a rule lost, using specificity and the cascade.
- Build a layout that adapts to widths you did not design for.

**The misconception this clears.** That CSS is unpredictable. It is a constraint
system with rules you can learn — "it just does that" is almost always a rule you
have not met yet.

**Exercise brief.** Rebuild a supplied design at three widths. Constraints: no
fixed widths on containers, no `!important`, and no copying a framework's grid.
Keep a short log of every time the result surprised you and what the rule turned
out to be.

**Model answer demonstrates.** Layout that adapts because of how it was
described, and a surprise log — the log is the real deliverable, because it is
evidence of the model forming.

---

## Module 04 — JavaScript foundations
*Weeks 5–8*

Values, logic, and the DOM. How to make a page think, step by careful step.

**By the end you can**
- Work with values, functions, arrays and objects confidently.
- Respond to events and update the DOM without re-rendering everything by hand.
- Fetch data and handle loading, empty and failed states.
- Debug with the console and the debugger rather than by guessing.

**The misconception this clears.** That JavaScript is jQuery-shaped snippets you
paste in. It is a language; the DOM is one API it can reach.

**Exercise brief.** Build an interactive page — a searchable, filterable list
from a public API. No framework. It must behave correctly while loading, when
the result is empty, and when the network fails.

**Model answer demonstrates.** State kept in variables rather than read back out
of the DOM, all three states handled on purpose, and rendering separated from
logic.

---

## Module 05 — Building something real
*Weeks 9–10*

Put it together into a project you understand end to end — and can explain.

**The project.** This module's work is Project 3, the course capstone —
specified in full in the Projects section above.

**Where this leads.** Everything in this course runs by opening a file in a
browser, or by serving a folder. That is deliberate, and it is the reason the
course works: it rests on *you describe; the browser draws*, and a build step
puts a machine in the middle of that sentence. It is also, increasingly, not how
frontend work is done in a job.

Professional projects run through a build tool — **Vite** is the current default.
It serves your pages while you work, reloads them as you save, and bundles them
for deployment. None of that changes what the browser does; it changes what
reaches the browser. You have already met the smallest version of the problem it
solves: Shelf would not run from a `file://` address, so you had to serve the
folder. A build tool is that, and a great deal more.

We are not going to make you use one, and you should be suspicious of anyone who
puts one in front of you before you can build a page without it. But you should
know what it is when you meet it, and you should know what you are still missing:

- **Modules** — `import` and `export`, instead of one script and the order of the
  tags on the page.
- **The terminal**, past the single command that serves a folder.
- **Node**, and the package manager that comes with it.

Those three are [JavaScript Programming](javascript-programming.md) module 05,
and they are why **[React](react-development.md) is not the next course after
this one**, even though it looks like it should be. React assumes modules, the
terminal and Node from week one. Going straight there from here means meeting all
four of those and React in the same fortnight, which is the most common way people
bounce off React and conclude they are not clever enough for it.

The path is **Frontend Development → JavaScript Programming → React**. Be warned
that the first weeks of JavaScript Programming will feel like revision after
module 04 here — it starts from values and assumes no JavaScript at all. It does
not stay there: closures, the prototype chain, the event loop and the two
runtimes are all past where this course stops.

## Assessment across the course

No grades. A module is done when the exercise is done and you can explain it to
your instructor without notes. The capstone is the one piece we ask
to see deployed.
