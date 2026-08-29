# JavaScript Programming

Learn JavaScript as a language — the same core that runs in a browser and on a
server.

> **The mental model — The language is small; the runtime is the rest**
>
> Most of what people call JavaScript is not JavaScript. Values, functions,
> objects and the event loop are the language, and they are identical everywhere
> it runs. The DOM, fetch, the file system, timers — those are whatever the host
> happens to hand you. Once you can tell the two apart, moving between a browser
> and Node stops being a new language to learn and becomes a new set of tools
> around one you already have.

| | |
|---|---|
| **Format** | Taught live, online · start any time |
| **Scope** | The language itself, in both runtimes. Not a framework course. |

## Before you start

**Know:** how to use a computer confidently. No prior JavaScript — the course
starts at values and builds up. A little HTML helps with the browser exercises
but is not assumed.

**Have:** a laptop with 4GB RAM or more; Node.js installed (session 1 covers it
if you have not); 6–8 hours a week outside sessions.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1 | 01 | Values and how JavaScript thinks |
| 2 | 02 | Functions, scope & closures |
| 3 | 03 | Objects, arrays & the prototype chain |
| 4–5 | 04 | Asynchrony & the event loop |
| 6 | 05 | Modules and the two runtimes |
| 7–8 | 06 | Building on both sides |

## Projects

3 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing — project 2 starts from
nothing rather than extending project 1 — so you finish with 3 separate pieces
of work you can show somebody, each demonstrating something different.

The per-module exercise briefs below are practice. These are the integration.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–03 | 1–3 | **Tender** — a money library with no host APIs anywhere in it |
| 2 | 04–05 | 4–6 | **Steady** and **Digits** — async utilities, and one core in two runtimes |
| 3 | 06 | 7–8 | **Course capstone.** **Roster** — a duty rota with a Node half and a browser half |

### Project 1 — Tender
*Modules 01–03 · Weeks 1–3*

Tender is a money library. Every amount is a whole number of kobo and no float
is allowed near it: a `Money` type built on prototypes, a ledger factory, a
fair-split function, plus `once` and a memoiser.

Money is the right vehicle for module 01. `0.1 + 0.2`, `"1500" == 1500`,
`Number("1,500")` and two names pointing at one ledger are not textbook
curiosities here — each is a bug that loses somebody's money. The library's
central decision, integers in kobo, is the answer to one of them.

**What you build**
- `Money`, built with `Object.create` and a prototype rather than `class` —
  module 03. You then write the paragraph on what `class` was hiding, and decide
  deliberately whether to give it a `valueOf`, and what that lets `+` and `==` do
  to it. That decision is module 01 in one method.
- `ledger()`, a closure-based factory that accumulates entries and returns a
  total — module 02. A comment must say what it remembers and where that memory
  lives, and a second ledger must not see the first one's entries.
- `once(fn)` and `memo(fn)` — module 02, functions as values and closures over
  cached results, with the memoiser's key-building forced to confront module 01's
  coercion rules.
- `split(amount, ways)` that distributes the remainder rather than losing it —
  module 03, `reduce` over an array, and a pure function with an exactly right
  answer.
- `format(money)` producing `₦1,234.56` by hand — module 01, coercion done
  deliberately, because the obvious tool is banned.

**The shape**
`money.js`, `ledger.js`, `once.js`, `memo.js`, `split.js`, `format.js`,
`index.js`. Hand in the module 01 and 03 prediction sheets alongside — your
answer, the real answer, and the rule behind every miss.

**Out of scope**
- `Intl.NumberFormat`. It is exactly the right tool, and that is why `format` is
  on the list: `Intl` is a host API, and this library must contain none. Reaching
  for it breaks the one rule the project exists to teach.
- Promises and `async`. Module 04. A memoiser that caches a promise is a good
  idea in three weeks' time.

> **A wrinkle worth stating.** "No host APIs anywhere" also rules out
> `console.log`, and therefore `node:test`. The library exports pure functions
> that return values; a single throwaway `check.js` **outside** the library does
> the printing. It is not part of the deliverable.

**What is assessed**
- Every utility states, in a comment, what it remembers and where that lives.
- The prototype version is behaviourally identical to the `class` version it
  replaced, and you can say what `class` was hiding.
- The prediction sheets cite a rule for each miss rather than rationalising it.
- Not one host API anywhere in the library.
- Amounts are integers in kobo end to end.

### Project 2 — Steady and Digits
*Modules 04–05 · Weeks 4–6*

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

### Project 3 — Roster
*Modules 06 · Weeks 7–8*

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

## Module 01 — Values and how JavaScript thinks
*Week 1*

Primitives, objects and coercion. Why `==` surprises people and `===` does not —
from the rules themselves rather than a list of things to avoid.

**By the end you can**
- Name every primitive type and say how objects differ from them.
- Predict the result of a coercion by applying the rules, not by memory.
- Explain the difference between copying a value and copying a reference.

**The misconception this clears.** That JavaScript's type behaviour is
arbitrary and the advice is simply "always use `===`". The rules are written
down and short; once you know them the surprises stop being surprises.

**Exercise brief.** You are given 15 expressions involving `==`, `+`, truthiness
and `null`/`undefined`. Predict each result **in writing first**, then run them.
For every one you got wrong, find the rule that explains it and write it down.

**Model answer demonstrates.** The rule cited for each case. Getting them right
by instinct is worth less here than getting one wrong and locating why.

---

## Module 02 — Functions, scope & closures
*Week 2*

Functions as values, scope as nested boxes, and the closure — the single idea
holding up callbacks, modules and most of the language.

**By the end you can**
- Pass functions as values and return them from other functions.
- Trace which scope a name resolves in, without running the code.
- Explain a closure to someone else in one sentence.

**The misconception this clears.** That a closure is an advanced trick. It is
just a function remembering where it was born, and it is already behind every
callback the learner has written.

**Exercise brief.** Write a `counter` factory, a `once` wrapper that lets a
function run a single time, and a memoiser. All three without classes. Then
explain, in comments, exactly what each one is remembering and where it lives.

**Model answer demonstrates.** Correct behaviour, plus the explanation — which
is the actual assessment.

---

## Module 03 — Objects, arrays & the prototype chain
*Week 3*

How a property lookup actually resolves. Prototypes as a chain you can follow,
and the array methods that replace most of the loops you would have written.

**By the end you can**
- Follow a property lookup up the prototype chain, step by step.
- Replace hand-written loops with `map`, `filter` and `reduce` where they fit.
- Say what `class` compiles down to, and why it changes nothing underneath.

**The misconception this clears.** That JavaScript "has classes like other
languages". It has prototypes with class-shaped syntax over the top, and knowing
that explains inheritance behaviour that otherwise looks broken.

**Exercise brief.** Take a supplied program written with `class`, and rewrite it
using plain objects and prototypes, with identical behaviour. Then write a
paragraph on what `class` was hiding.

**Model answer demonstrates.** Behavioural equivalence, and a clear account of
`class` as syntax rather than as a different mechanism.

---

## Module 04 — Asynchrony & the event loop
*Weeks 4–5*

One thread and a queue. Callbacks, promises and `async`/`await` turn out to be
three views of the same machinery, which is why mixing them goes wrong.

**By the end you can**
- Predict the order of output across synchronous code, promises and timers.
- Convert between the three async styles without changing behaviour.
- Explain why "JavaScript is single-threaded" and "JavaScript does things at the
  same time" are both true.

**The misconception this clears.** That `async`/`await` makes code synchronous.
It changes how the code reads, not what the runtime does — and every hard async
bug lives in that gap.

**Exercise brief.** Given a program that logs from synchronous code, a resolved
promise, `setTimeout(0)` and an `await`, predict the exact output order in
writing before running it. Then fix a supplied function that runs requests in
sequence so that they run together, and measure both.

**Model answer demonstrates.** A correct ordering with the queue explained, and
a measured before/after — the numbers matter, because "it feels faster" is not
evidence.

---

## Module 05 — Modules and the two runtimes
*Week 6*

The same language in a browser and in Node. What each host provides, what it
withholds, and how to write code that does not care which one it lands in.

**By the end you can**
- Split a program into modules and import across them.
- Name what is language and what is host, for any API you meet.
- Write a core that runs unchanged in both runtimes.
- Reach for `node:fs`, `node:path` and `process` on one side, and `fetch`,
  `URL` and storage on the other, knowing which is which.

**The misconception this clears.** That Node is "JavaScript for the backend", a
different dialect. It is the same language with a different standard library
bolted on.

**Exercise brief.** Write a small core — date formatting, validation, parsing,
your choice — with no host dependencies at all. Then write two thin adapters
around it: one that takes its input from `node:fs/promises` and `process.argv`,
and one that takes the same input in a browser from a `fetch` response and a
form. The core must not change a character between them.

**Model answer demonstrates.** Adapters that are thin and a core that is
untouched — plus a list of the APIs that had to stay out of the core, and which
host each one belongs to.

---

## Module 06 — Building on both sides
*Weeks 7–8*

One project with a Node half and a browser half, so the split between language
and runtime stops being theory and becomes something you have used.

**The project.** This module's work is Project 3, the course capstone —
specified in full in the Projects section above.

## Assessment across the course

No grades. Modules 01 and 04 both hinge on *predicting before running* — that
written prediction is the assessment, more than the working code.
