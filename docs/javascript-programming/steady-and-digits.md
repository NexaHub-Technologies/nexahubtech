# Steady and Digits

*JavaScript Programming · project 2 of 3*

| | |
|---|---|
| **Course** | [JavaScript Programming](../courses/javascript-programming.md) |
| **Modules** | 04–05 |
| **Weeks** | 4–6 |
| **Course level** | For beginners, and for anyone who has only ever copied JavaScript |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **04 — Asynchrony & the event loop** · One thread and a queue. Callbacks, promises and async/await turn out to be three views of the same machinery, which is why mixing them goes wrong.
- **05 — Modules and the two runtimes** · The same language in a browser and in Node. What each host provides, what it withholds, and how to write code that does not care which one it lands in.

## Supplied by the school

This project cannot run until these exist.

- An **indicative** prefix-to-network table for Nigerian phone numbers. It is indicative because number portability means a prefix no longer proves a network — the tool must say *likely*, never claim to know.

Two artefacts, handed in as two repositories, because they are two different
things.

**Steady** is an async utility library for work running against a network that is
not reliable: `retry` with backoff, `timeout`, and a concurrency-limited `queue`.
Those three are where the difference between "reads sequential" and "is
sequential" actually bites, which is module 04's misconception written as code.

**Digits** normalises Nigerian phone numbers — `0803…`, `+23480…`, `23480…`,
numbers with spaces and dashes — into one canonical form, classifies each by
prefix, and reports the ones it cannot parse. The input is messy in four
different ways, the core is pure string logic with no excuse to touch a host, and
the same job is plainly useful as a CLI over a file and as a paste-in box in a
browser.

**What you build**
- `retry(fn, { attempts, delay })` with backoff, and a written answer to what
  happens if `fn` is not idempotent — module 04.
- `timeout(promise, ms)` built with `Promise.race` and a timer, with a comment
  noting that the losing promise is still running — module 04.
- `queue(limit)` running at most *n* at a time and preserving result order, so
  completion order and result order are deliberately different — module 04.
- Tests that prove the ordering guarantees by recording a log of events, not by a
  comment claiming it holds — module 05, `node:test`.
- Digits: a pure core, a Node adapter reading a path from `process.argv` through
  `node:fs/promises`, and a browser adapter taking the same input from a textarea
  or a `fetch` — module 05, with the core unchanged between them.

**The shape**
Steady: `retry.js`, `timeout.js`, `queue.js`, `index.js`, `test/`. A README
stating each guarantee in one sentence and naming the test that proves it.
Digits: `core/` (untouched between adapters), `cli.js`, `web/`, and a diff showing
`core/` identical in both runs.

**Out of scope**
- `AbortController`. It is the right answer for cancelling the loser of a
  `timeout` race, and it is on the capstone's Web API list. Defer it, and write
  down in the README what your timeout leaves running — that honesty is worth
  more here than the cancellation.

> The school supplies the prefix-to-network table, and it is **indicative**:
> number portability means a prefix no longer proves a network. Do not invent
> prefixes, and make the tool say "likely" rather than claiming to know.

**What is assessed**
- The ordering guarantees are proved by tests, not asserted in a README.
- A sequential path made concurrent, with both timings recorded.
- The Digits core is byte-identical under both adapters — show it.
- The adapters are thin; no logic leaked into them.
- A written list of the APIs that had to stay out of the core, and which host each
  belongs to.

---

## Where this sits

- Curriculum document: [`docs/courses/javascript-programming.md`](../courses/javascript-programming.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
