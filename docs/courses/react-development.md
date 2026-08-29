# React

Go beyond the basics — build React applications that stay understandable as they
grow.

> **The mental model — The screen is a function of state**
>
> You don't update the page. You change state, describe what the page should look
> like for any given state, and let React work out the difference. Every stale
> value, surprise re-render and "why didn't it update?" dissolves once you stop
> listing the steps to change the screen and start describing what the screen is
> for the data you hold.

| | |
|---|---|
| **Format** | Taught live, online · start any time |

## Before you start

**Know:** JavaScript to a working standard — functions, arrays, promises,
modules; HTML and CSS well enough to build a page without a framework; the basics
of React, even shakily (components, props, `useState`); the terminal and git.

**Have:** a laptop with 8GB RAM or more with Node.js installed; a code editor you
are already comfortable in; 6–8 hours a week.

> This is not an introduction. If `useState` is new to you, take
> [JavaScript Programming](javascript-programming.md) first.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1 | 01 | How React actually works |
| 2 | 02 | State, placed properly |
| 3 | 03 | Effects & the outside world |
| 4–5 | 04 | Composition & custom hooks |
| 6 | 05 | Performance, measured |
| 7–8 | 06 | Architecture at scale |

## Projects

3 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing — project 2 starts from
nothing rather than extending project 1 — so you finish with 3 separate pieces
of work you can show somebody, each demonstrating something different.

The per-module exercise briefs below are practice. These are the integration.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–03 | 1–3 | **Roll Call** — an attendance register whose state is in the right places |
| 2 | 04–05 | 4–6 | **Cashbook** and **Ticker** — supplied code, refactored and profiled |
| 3 | 06 | 7–8 | **Course capstone.** **Waybill** — a dispatch job board with tested logic |

### Project 1 — Roll Call
*Modules 01–03 · Weeks 1–3*

Roll Call is a single-screen attendance register for a lecturer taking a class:
pick a course, the roll loads, filter it, mark each student present, absent or
excused.

It is the smallest honest thing with all three awkward pieces at once — a
filterable list carrying a selection, a form, and a network load that can be
raced. The selection surviving a filter change is the state-shape lesson;
switching courses mid-fetch is the cleanup lesson.

**What you build**
- A course picker that refetches the roll, with cleanup that discards the
  response of a course you have already navigated away from — module 03, effects
  and cleanup.
- One `status` union — `idle | loading | ready | error` — instead of separate
  `isLoading` and `error` variables, so "loading and failed at once" cannot be
  typed — module 02, impossible states.
- Selection stored as a matric number only, with the student looked up on render,
  so a filter change or a new roll cannot leave the selection pointing at
  nobody — module 02, derived not stored.
- The filtered list and the present/absent/excused tally computed during render,
  never held in state and never synced by an effect — module 02 and 03.
- Roll rows keyed by matric number, with the module 01 render-log report showing
  which rows actually re-rendered when one student was marked — module 01,
  reconciliation and keys.

**The shape**
One screen. A header with the course picker and a live tally; a filter bar with a
search input and a three-way status filter; the roll list; a mark panel for the
selected student; and a form to add a walk-in. Data comes from a supplied static
JSON endpoint, one file per course code.

**Out of scope**
- Saving marks back to a server. There is no write path here; the session summary
  is produced as copyable text instead, because a write adds nothing to what is
  being assessed.
- Extracting a `useRoll` hook. Hooks are module 04, and doing it early hides
  exactly the state placement being assessed.

**What is assessed**
- The impossible states are actually impossible — list which bugs that killed.
- Derived values are computed, not stored and kept in sync.
- Every remaining `useEffect` has a written justification; the rest are gone.
- Cleanup that provably stops the stale response, demonstrated.
- The render-log report, with the reconciliation rule behind every wrong
  prediction.

### Project 2 — Cashbook and Ticker
*Modules 04–05 · Weeks 4–6*

Two supplied codebases, neither of which you wrote.

**Cashbook** is a three-hundred-line single component: a cooperative treasurer's
contribution desk, with a member search, a member summary, a contribution form, a
ledger table and a receipt preview all in one file, and the selected member
drilled four levels down to the receipt. It is the shape a real screen degenerates
into when nobody stopped.

**Ticker** is a deliberately slow price board — around two thousand produce prices
across forty markets. It is slow for three separate reasons, so the profiler has
to distinguish them rather than confirm a hunch.

**What you build**
- Cashbook decomposed so nothing exceeds eighty lines and no prop travels more
  than two levels. The receipt preview and the ledger both need the selected
  member, and the fix is composition — passing elements through as children —
  module 04.
- Exactly one custom hook extracted, with a one-sentence justification, and at
  least one place you deliberately leave duplicated with the reason written
  down — module 04, hooks that earn their place.
- Ticker's three planted problems found with the profiler, fixed, and reported
  with before-and-after numbers — module 05.
- One planted `useMemo` wrapping a primitive comparison, found and removed —
  module 05.

**The shape**
Cashbook: one screen — member search, summary strip, contribution entry, ledger
table, receipt preview. Ticker: one screen — search box, market filter chips, a
long unvirtualised table, a star toggle per row. Hand in both repositories plus a
profiling report.

**Out of scope**
- Virtualising Ticker's list. A library would make the number good without you
  learning which of the three problems it solved.
- Introducing context or a state library to relieve Cashbook's prop drilling.
  Composition is module 04's answer, and reaching past it skips the exercise.

**What is assessed**
- Judgement, including at least one place where the right decision was to leave
  things alone.
- Three performance problems found by measurement, fixed, and reported with
  before-and-after numbers.
- A change without a number attached does not count.

### Project 3 — Waybill
*Modules 06 · Weeks 7–8*

**Course capstone.** Waybill is a job board for a small dispatch-rider business:
today's jobs, who is carrying them, and what state each one is in.

It has genuine logic worth testing that would be awkward to test if it were
tangled into components — a job state machine and a zone-based fee — which is
precisely the structural argument module 06 makes.

**What you build**
- All API access behind one data module returning a single result shape, so no
  component calls `fetch` — module 06, data layers.
- The job state machine as a pure function — `placed → assigned → picked up →
  delivered`, or `failed` — with unit tests covering the illegal transitions —
  module 06.
- Loading, error and empty states at every route, with empty treated as a normal
  outcome rather than an error — module 06.
- State placed deliberately and defended: the board's status filter in the URL
  because it should survive a refresh and be shareable; the new-job form's state
  local because it should not — modules 02 and 06.
- One performance decision on the board list backed by a profiler measurement —
  module 05 carried forward.

**The shape**
Entities: `Job {id, waybillNo, pickup, dropoff, zone, status, riderId, fee}`,
`Rider {id, name, phone, capacity}`, `Zone {name, baseFee}`. Screens: Board
(today's jobs grouped by status), Job detail (timeline and permitted
transitions), New job (fee computed from zone and weight), Riders (list with
current load). The seed API is supplied.

**Out of scope**
- Authentication. That is a Next.js module 05 subject and it would eat the
  fortnight.
- Live updates over a websocket.

**What is assessed**
- State lives at the right level, and you can defend every placement.
- No effect that should not exist.
- At least one performance decision backed by a measurement.
- Tests over the state machine, including the illegal transitions.
- A README with the folder structure and the reason for it.

---

## Module 01 — How React actually works
*Week 1*

Rendering, reconciliation, and why the screen updates when it does — the model
behind the API.

**By the end you can**
- Say what "render" means, and what it does not mean.
- Explain reconciliation and what a key is actually for.
- Predict whether a change will cause a re-render, before running it.

**The misconception this clears.** That a re-render is expensive and to be
avoided. A render is React calling your function; the expensive part is the DOM
work that may or may not follow.

**Exercise brief.** Instrument a supplied component tree with render logging.
Predict in writing which components re-render for five different interactions,
then check. Explain every miss.

**Model answer demonstrates.** Correct predictions traced to the reconciliation
rules — and, where a prediction failed, an account of the rule that was missing.

---

## Module 02 — State, placed properly
*Week 2*

Where state belongs, when to lift it, and how to design it so whole classes of
bugs stop existing.

**By the end you can**
- Choose where a piece of state should live, and defend the choice.
- Spot state that should have been derived instead of stored.
- Model state so impossible combinations cannot be represented.

**The misconception this clears.** That more `useState` calls mean more control.
Most state bugs are two variables that can disagree with each other, and the fix
is a better shape, not more effects to keep them in sync.

**Exercise brief.** You are given a component with six `useState` calls that can
enter contradictory states (loading *and* error, selected item that no longer
exists). Reduce it so the bad combinations are unrepresentable. List which bugs
became impossible.

**Model answer demonstrates.** Fewer, better-shaped state variables — often one
union — and derived values computed rather than stored.

---

## Module 03 — Effects & the outside world
*Week 3*

Data fetching, subscriptions, and cleanup — plus learning when you don't need an
effect at all.

**By the end you can**
- Decide whether a problem needs an effect, and usually conclude it does not.
- Write cleanup that actually prevents the stale update it was meant to.
- Explain the dependency array in terms of synchronisation, not triggering.

**The misconception this clears.** That effects are how you "react to things
changing". They are for synchronising with systems outside React; using them to
chain state is the single most common source of loops and stale values.

**Exercise brief.** Given four components that each use `useEffect`, remove the
effect from the three that don't need one, keeping behaviour identical. For the
fourth, add correct cleanup and prove the stale-response bug is gone.

**Model answer demonstrates.** Three effects deleted with behaviour unchanged,
and one kept with cleanup — plus a sentence on why the fourth is genuinely
external.

---

## Module 04 — Composition & custom hooks
*Weeks 4–5*

The patterns that keep components small and share logic without tangling a
codebase.

**By the end you can**
- Extract a custom hook when it earns its place, and leave it inline when not.
- Compose components so that configuration does not become a prop avalanche.
- Recognise when a custom hook has become a way to hide complexity, not remove it.

**The misconception this clears.** That extracting a hook is automatically good.
A hook with eight options and a boolean flag is worse than the duplication it
replaced.

**Exercise brief.** Refactor a supplied 300-line component into composed parts.
Constraint: no component over 80 lines, no prop drilled more than two levels,
and every custom hook must be justified in one sentence. Some duplication is
allowed to survive — say why you left it.

**Model answer demonstrates.** Judgement, including at least one place where the
right decision was to leave things alone.

---

## Module 05 — Performance, measured
*Week 6*

Memoisation, list rendering, and profiling. Making it fast on evidence rather
than on instinct.

**By the end you can**
- Use the profiler to find what is actually slow.
- Apply `memo`, `useMemo` and `useCallback` where they help, and say why.
- Show a before and after with numbers.

**The misconception this clears.** That wrapping everything in `useMemo` makes an
app fast. Memoisation has a cost; applied blindly it makes things slower and much
harder to read.

**Exercise brief.** Profile a deliberately slow supplied app. Find the three
worst problems, fix them, and report timings before and after. Then find one
place where an existing `useMemo` is doing nothing and remove it.

**Model answer demonstrates.** Measurement first, then the fix. A change without
a number attached does not count.

---

## Module 06 — Architecture at scale
*Weeks 7–8*

Structure, data layers, and testing — the decisions that decide whether an app
ages well.

**The project.** This module's work is Project 3, the course capstone —
specified in full in the Projects section above.

## Assessment across the course

Modules 01 and 05 both hinge on *predict, then measure*. Written predictions and
recorded numbers are the assessment; working code is the floor, not the goal.
