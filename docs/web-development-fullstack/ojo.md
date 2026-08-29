# Òjò

*Web Development · project 2 of 4*

| | |
|---|---|
| **Course** | [Web Development](../courses/web-development-fullstack.md) |
| **Modules** | 04 |
| **Weeks** | 4–6 |
| **Course level** | Built for complete beginners |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **04 — JavaScript foundations** · Values, logic, and the DOM. How to make a page think, step by careful step.

## External dependency

- Open-Meteo — free, no key, `access-control-allow-origin: *`, and returns a JSON **array** for comma-separated coordinates. Verified.

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

---

## Where this sits

- Curriculum document: [`docs/courses/web-development-fullstack.md`](../courses/web-development-fullstack.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
