# Shelf

*Frontend Development · project 2 of 3*

| | |
|---|---|
| **Course** | [Frontend Development](../courses/frontend-development.md) |
| **Modules** | 04 |
| **Weeks** | 5–8 |
| **Course level** | Built for complete beginners |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **04 — JavaScript foundations** · Values, logic, and the DOM. How to make a page think, step by careful step.

## External dependency

- Open Library — free, no key, CORS `*`, honours `fields`. Partial records are real: across three subject searches, 22–34 of 40 results were missing covers, with missing years and authors too, and empty results are reachable. Verified.

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

---

## Where this sits

- Curriculum document: [`docs/courses/frontend-development.md`](../courses/frontend-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
