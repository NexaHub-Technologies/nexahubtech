# Roster

*JavaScript Programming · project 3 of 3*

| | |
|---|---|
| **Course** | [JavaScript Programming](../courses/javascript-programming.md) |
| **Modules** | 06 |
| **Weeks** | 7–8 |
| **Course level** | For beginners, and for anyone who has only ever copied JavaScript |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **06 — Building on both sides** · One project with a Node half and a browser half, so the split between language and runtime stops being theory and becomes something you have used.

**Course capstone.** Roster is a duty rota builder — hostel cleaning, shop
shifts, a church or mosque duty list, a clinic call list. Give it a list of
people, their unavailable dates and a month, and it produces the rota and flags
every clash. One core, a Node half and a browser half.

Rota assignment is pure logic over dates and arrays with no reason to touch a
host, while the two halves want completely different tool sets: a CLI wants a
file, a path and a confirmation prompt; a browser wants a form, storage, a locale
and a shareable URL. The split falls somewhere obvious, which is what makes the
README defensible.

**What you build**
- A pure core: round-robin assignment that skips unavailable people, plus clash
  detection. Deterministic, so the same input gives the same rota, and testable
  without a runtime. `Date` is allowed in the core and `Intl` is not — you must be
  able to say why, and that distinction is the course in one sentence.
- The Node half: month from `process.argv`, people and unavailability read with
  `node:fs/promises` and `node:path`, a stable rota id from `node:crypto`, and
  `node:readline` to confirm before overwriting an existing file — four `node:`
  modules, each with a reason that survives being asked.
- The browser half: `FormData` to add people, `localStorage` to keep the working
  rota, `Intl.DateTimeFormat` for day and month names, and `URLSearchParams` with
  the History API to put the month in the URL — four Web APIs, none standing in
  for the others.
- Deliberate async on the Node side: several input files read concurrently where
  order does not matter, written sequentially where it does, with the concurrent
  path measured.
- A diff showing the shared core byte-identical in both halves.

**The shape**
`core/roster.js` (assignment), `core/clashes.js` (detection), `cli.js`,
`web/index.html` and `web/main.js`. A README naming every `node:` module and
every Web API with the reason it was needed, and stating where the split falls.

**Out of scope**
- Serving the browser half from `node:http`. It is on the allowed list, which is
  exactly why it is a trap: it turns the capstone into a small web application and
  the two halves stop being two halves. The browser half is static files.
- Optimising the assignment — fairness scoring, preference weighting, minimising
  consecutive duties. Round-robin with a skip is the specification. Start writing
  a scheduler and you will not finish.

**What is assessed**
- The shared module is byte-identical in both halves — show the diff.
- Each `node:` module you used is named in the README with the reason you needed
  it. Three imports nobody can justify is not three imports.
- Each Web API you used is named the same way.
- No bundler polyfill or shim standing in for a host API.
- Async work is deliberate, with the concurrent path measured.
- You can point at any line and say whether it is language or runtime.

---

## Where this sits

- Curriculum document: [`docs/courses/javascript-programming.md`](../courses/javascript-programming.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
