# Waybill

*React · project 3 of 3*

| | |
|---|---|
| **Course** | [React](../courses/react-development.md) |
| **Modules** | 06 |
| **Weeks** | 7–8 |
| **Course level** | Assumes you already write JavaScript |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **06 — Architecture at scale** · Structure, data layers, and testing — the decisions that decide whether an app ages well.

## Supplied by the school

This project cannot run until these exist.

- A seed API with jobs, riders and zones.

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

## Where this sits

- Curriculum document: [`docs/courses/react-development.md`](../courses/react-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
