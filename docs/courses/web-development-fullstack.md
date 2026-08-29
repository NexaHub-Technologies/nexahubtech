# Web Development (Fullstack)

Learn frontend and backend in one complete path — from first principles to full
applications.

> **The mental model — Two computers, one conversation**
>
> A browser and a server are separate machines that only ever pass text between
> them. One asks; the other answers. Every framework, database and deployment
> step you will ever meet is a refinement of that single exchange — so when
> something breaks, you always have a first question worth asking: which side is
> this happening on, and what did it actually send?

| | |
|---|---|
| **Format** | Taught live, online · start any time |
| **Scope** | HTML, CSS, JavaScript, Node.js and Express. No React or Next.js. |

## Before you start

**Know:** how to use a computer confidently (files, folders, installing
software); enough English to read technical writing without a struggle. No
coding at all — module 01 starts at how the web works.

**Have:** a laptop with 8GB RAM or more; a stable internet connection;
10–12 hours a week outside sessions.

> **A word on pace.** This track covers what the Frontend and Backend courses
> cover separately over 18 weeks. It is compressed on purpose and it is not the
> gentler option — it is the faster one. Anyone who cannot reliably find 10 hours
> a week should take Frontend first instead.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1 | 01–02 | How the web works · HTML & structure |
| 2–3 | 03 | CSS & layout |
| 4–6 | 04 | JavaScript foundations |
| 7–8 | 05 | Backend with Node.js |
| 9–10 | 06 | Fullstack project |

## Projects

4 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing — project 2 starts from
nothing rather than extending project 1 — so you finish with 4 separate pieces
of work you can show somebody, each demonstrating something different.

The per-module exercise briefs below are practice. These are the integration.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–03 | 1–3 | **Ajo** — a savings club's site, correct before it is styled |
| 2 | 04 | 4–6 | **Òjò** — a rain check across Nigerian towns |
| 3 | 05 | 7–8 | **Slot** — a booking API with no browser side at all |
| 4 | 06 | 9–10 | **Course capstone.** **Found** — a deployed lost-and-found board |

### Project 1 — Ajo
*Modules 01–03 · Weeks 1–3*

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

### Project 2 — Òjò
*Modules 04 · Weeks 4–6*

Òjò is a single-page rain check for a fixed list of Nigerian towns: one request,
then a table you can search, filter and sort to answer "where is it raining this
week?".

The town list is data you author yourself, and everything the visitor does is an
operation on that array. That is what makes the module's central claim concrete:
the state is the array, and the table is only a picture of it.

**What you build**
- A list of roughly fifteen towns with coordinates, held as an array of objects
  in JavaScript — module 04. The data is never in the DOM to begin with, so it
  cannot be read back out of it.
- One request for every location at once, using Open-Meteo's comma-separated
  coordinates, which returns an array to be zipped back onto your town list —
  module 04, fetch, JSON, and array work that is not a one-line `map`.
- Search by name, filter to "rain likely today", and sort by temperature or rain
  chance — module 04, applied to the data and re-rendered, never applied to rows
  already on the page.
- A day selector across the seven-day forecast — module 04, one variable changing
  and one re-render, rather than seven handlers editing cells.
- Loading, empty and failed states — module 04. Empty is genuinely reachable
  here: filter for rain in the dry season and there is nothing.

**The shape**
One `index.html`, one stylesheet, one `app.js` in three visible parts: the town
data, the logic (fetch, merge, filter, sort), and a single `render(state)` that
draws the table. Hand in a screenshot taken on a throttled connection.

The request:
`https://api.open-meteo.com/v1/forecast?latitude=…&longitude=…&daily=precipitation_probability_max,temperature_2m_max&timezone=Africa/Lagos`

**Out of scope**
- Remembering the visitor's chosen towns between visits. Persistence belongs to
  the server and arrives in module 05. If you want it, the answer is "not yet,
  and here is which machine will own it".
- Letting the visitor add a town by typing its name. That needs geocoding — a
  second API and a second failure mode — and it will eat the three weeks.

**What is assessed**
- Loading, empty and failed states each handled on purpose, not discovered.
- State lives in variables and is never read back out of the DOM.
- Rendering is separable from logic.
- It still behaves with the network throttled to something realistic.

### Project 3 — Slot
*Modules 05 · Weeks 7–8*

Slot is a booking API for a single-chair business — a barber, a hairdresser, a
phone-repair bench. Create a booking, list the day's bookings, cancel one. There
is no browser side at all.

Bookings have a rule only a server can hold: a slot is either taken or it is not,
and two people asking at once cannot both be right. That gives the "try to make
your own API do something it should not allow" report an obvious target rather
than an invented one.

**What you build**
- `POST /bookings` with validation that exists nowhere else: the slot must be in
  the future, fall on the half-hour, sit inside opening hours, and carry a name
  and a plausible phone number — module 05. None of these live in a form, because
  there is no form.
- A uniqueness rule the database enforces — a unique constraint on
  `(date, time)`, so "no double booking" is not a `SELECT` followed by an `INSERT`
  and a prayer — module 05, schema design.
- A cancellation reference returned on create and required on delete, so
  `DELETE /bookings/:id` without it returns 403 — module 05, ownership without
  accounts.
- One consistent error shape and correct status codes throughout: 201 on create,
  400 on a malformed body, 409 on a taken slot, 404 on an unknown booking — module 05.
- Data that survives a restart, in a real file-backed database rather than an
  array in memory — module 05.

**The shape**
`POST /bookings`, `GET /bookings?date=`, `GET /bookings/:id`, `DELETE /bookings/:id`,
`GET /availability?date=`. Source split into routes, validation and data access.
Hand in the repository plus a transcript of your attacks on your own API: a
booking in the past, the same slot twice, a negative-length appointment, extra
fields in the body, somebody else's cancellation — each with what the server did
and whether that was right.

**Out of scope**
- Sign-up and passwords. Authentication is not in this course, and the
  cancellation reference is the deliberate substitute. A login is a fortnight
  spent on the wrong problem.
- A frontend. This project is assessed through `curl` or a REST client. The
  browser side is project 4, and it is a different product.

**What is assessed**
- Validation on the server, not only in a form.
- Sensible status codes and one consistent error shape throughout.
- Data survives a restart.
- An honest report of at least one hole you found in your own work.

### Project 4 — Found
*Modules 06 · Weeks 9–10*

**Course capstone.** Found is a deployed lost-and-found board for a campus or an
estate: somebody who finds a thing posts it, somebody who lost a thing searches,
and the finder marks it claimed when it is collected.

One entity, two audiences, one state change — about as small as a genuinely
useful fullstack application gets. Both halves of the mental model are
unavoidable in it: the search runs on the server because the board is shared, and
the claim code is why the server is the side that decides.

**What you build**
- Posting a found item — what it is, category, where, roughly when, how to reach
  the finder — validated on the server with readable errors in the browser, and
  you can say why the rule is written twice and which copy is the real one —
  module 06.
- Search and filter across the board, executed by the API rather than in the
  browser, because the board is shared — module 06.
- A claim code returned on posting and required to mark an item claimed. Claimed
  items leave the default view without being deleted — module 06.
- State that survives a refresh and a restart, on real storage, with a deployment
  that comes back correctly from cold — module 06.
- Deployed and reachable from a link, with the database URL and any secret in
  environment variables — module 06.

**The shape**
Browser: a board page with a search field and a category filter, a post form, and
a claim form that takes a code. Server: `POST /items`, `GET /items?q=&category=`,
`GET /items/:id`, `POST /items/:id/claim`. A README covering what it does, how to
run it locally, and where the split falls.

**Out of scope**
- User accounts. The claim code exists precisely so no login is needed. Two weeks
  does not hold sessions, hashing and this product.
- Photo upload. File storage is a deployment problem rather than an application
  one, and it is where this capstone dies. A text description is enough.

**What is assessed**
- It runs, deployed, from a link you send us.
- The data survives a refresh and a restart.
- You can answer "why is this on the server and not the browser?" for any part.
- The README explains what it does and how to run it.
- The reasoning is written down — the same standard the studio holds itself to on
  `/approach`.

---

## Module 01 — How the web works
*Week 1*

The mental model first — what a browser and server are really doing before you
write a single line of code.

**By the end you can**
- Describe what happens between typing a URL and seeing a page, in order.
- Read a request and a response, and name the parts of each.
- Say which machine is responsible for a given piece of behaviour.

**The misconception this clears.** That "the website" is one thing living in one
place. It is two programs on two machines exchanging text, and almost every
confusion later in the course dissolves once that is concrete.

**Exercise brief.** Open the browser's network tab on a site you use often.
Pick one request. Write half a page describing: what was asked for, what came
back, how big it was, how long it took, and what the page did with it. No code.

**Model answer demonstrates.** Correct use of the vocabulary (method, status,
headers, body), and a clear statement of which side did what — not a
screenshot with labels.

---

## Module 02 — HTML & structure
*Week 1*

Markup as meaning. Build pages that are readable to people, browsers, and
assistive tech.

**By the end you can**
- Choose elements by what the content *is*, not by how it should look.
- Build a form that is usable by keyboard and by a screen reader.
- Explain why a `<div>` with a click handler is not a button.

**The misconception this clears.** That HTML is a styling language and the tags
are interchangeable. They are a description of meaning, which is what browsers,
search engines and assistive technology all read.

**Exercise brief.** You are given a page built entirely from `<div>`s. Rewrite
it so the markup describes the content, without changing how it looks. Then
navigate your version using only the keyboard and note what improved.

**Model answer demonstrates.** Landmarks, headings in a sensible order, labelled
form controls — and a short note on what each change bought, so the point is the
reasoning rather than the tag list.

---

## Module 03 — CSS & layout
*Weeks 2–3*

From the box model to modern layout — styling with intent instead of guesswork.

**By the end you can**
- Predict how a box will size itself before you reload the page.
- Build a layout with Flexbox and Grid, and say which one suits a problem.
- Explain why a rule did not apply, and fix it without `!important`.

**The misconception this clears.** That CSS is a pile of tricks that either work
or do not. It is a constraint system: you describe the rules and the browser
computes the result.

**Exercise brief.** Build a responsive page from a supplied design at three
widths. Constraint: no fixed pixel widths on any container, and no `!important`
anywhere. Where a rule loses to another, write one line saying why.

**Model answer demonstrates.** Layout that adapts because of how it was
described rather than because of breakpoint patches, plus correct diagnosis of
at least one specificity conflict.

---

## Module 04 — JavaScript foundations
*Weeks 4–6*

Values, logic, and the DOM. How to make a page think, step by careful step.

**By the end you can**
- Work with values, functions and arrays without copying a template.
- Read from and write to the DOM in response to events.
- Fetch data and render it, including while it is loading and when it fails.

**The misconception this clears.** That JavaScript is the thing that "makes
things move". It is a language for describing logic; the DOM is one set of tools
the browser happens to hand it.

**Exercise brief.** Build a page that fetches a list from a public API and lets
the user filter it. Must handle three states: loading, empty, and failed.
Do not use a framework.

**Model answer demonstrates.** All three states handled deliberately, event
handling that does not re-query the DOM unnecessarily, and logic separated from
rendering.

---

## Module 05 — Backend with Node.js
*Weeks 7–8*

Servers, routes, and databases. Build an API that powers your frontend.

**By the end you can**
- Build an Express API with routes that return well-formed responses.
- Store and retrieve data, and design a table for the thing you are modelling.
- Explain why a check that only exists in the browser is not a check.

**The misconception this clears.** That the backend is where "the hard code"
goes. It is the side that holds the truth — the browser is a client you do not
control, and cannot trust.

**Exercise brief.** Give your module 04 page a real backend: an API that stores
the list, with create and delete. Then, using only the browser's network tab,
try to make your own API do something it should not allow. Write down what you
found.

**Model answer demonstrates.** Validation on the server rather than only in the
form, sensible status codes, and honest reporting of at least one hole found by
the student in their own work.

---

## Module 06 — Fullstack project
*Weeks 9–10*

Put it all together into a complete application you understand end to end.

**By the end you can**
- Take an idea to a deployed, working application.
- Explain every architectural decision in it.
- Debug it by asking which side the problem is on — the model, closing the loop.

**The project.** This module's work is Project 4, the course capstone —
specified in full in the Projects section above.

## Assessment across the course

There is no grade. A module is complete when the exercise is done and you can
explain the reasoning to your instructor without notes. The capstone
is the only piece we ask to see finished and deployed.
