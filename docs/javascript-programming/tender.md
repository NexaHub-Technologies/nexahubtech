# Tender

*JavaScript Programming · project 1 of 3*

| | |
|---|---|
| **Course** | [JavaScript Programming](../courses/javascript-programming.md) |
| **Modules** | 01–03 |
| **Weeks** | 1–3 |
| **Course level** | For beginners, and for anyone who has only ever copied JavaScript |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — Values and how JavaScript thinks** · Primitives, objects and coercion. Why == surprises people and === does not — from the rules themselves rather than a list of things to avoid.
- **02 — Functions, scope & closures** · Functions as values, scope as nested boxes, and the closure — the single idea holding up callbacks, modules and most of the language.
- **03 — Objects, arrays & the prototype chain** · How a property lookup actually resolves. Prototypes as a chain you can follow, and the array methods that replace most of the loops you would have written.

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

---

## Where this sits

- Curriculum document: [`docs/courses/javascript-programming.md`](../courses/javascript-programming.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
