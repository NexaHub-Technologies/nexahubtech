# Tally

*Mobile Development · project 2 of 3*

| | |
|---|---|
| **Course** | [Mobile Development](../courses/mobile-development.md) |
| **Modules** | 03–04 |
| **Weeks** | 5–8 |
| **Course level** | Assumes you can already program |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **03 — State & data management** · Keep your app responsive as complexity grows — local state, global state, and syncing.
- **04 — APIs and backend integration** · Connect your app to real data. Fetching, caching, and handling offline.

## Supplied by the school

This project cannot run until these exist.

- `tally-api` — products, sales and adjustments, all idempotent by client id. Students who have taken Backend Development may use their own instead.

Tally is a stock count and sales log for a small shop, used standing in a market
with no signal.

Offline is not a mode here, it is the normal condition — which is module 04's
claim taken seriously. And it has both halves: a catalogue worth caching and
writes worth queueing.

**What you build**
- The product catalogue fetched once and cached to a local database, so a cold
  start in aeroplane mode shows the full list with an explicit "last updated"
  timestamp — module 04.
- Sales and stock adjustments written to an on-disk queue first and uploaded when
  connectivity returns, each carrying a client-generated id so a retry cannot
  post twice — module 04, with module 03 for the persistence.
- A per-row sync status — on device, uploading, uploaded, failed — with the
  interface never showing "saved" for something that exists only in memory —
  module 04, honest state.
- State placed deliberately and defended in the README: the search text local to
  the search screen, the pending-queue count shared across screens — module 03.
- A long stock count that stays responsive while an upload runs — module 03.

**The shape**
Screens: Products (searchable, cached), Product detail (count and adjust), Record
sale, Pending (the queue, with retry), Settings (last sync, force sync). The API
is supplied; use your own from Backend Development if you have taken it.

**Out of scope**
- Conflict resolution between two devices counting the same shop. Last-write-wins
  is acceptable, but it must be written down as a decision rather than left as an
  accident.
- Background sync while the app is killed. That is a platform capability, not the
  lesson.

**What is assessed**
- Tested in aeroplane mode on hardware, not with a mocked network.
- The queue survives a force-quit.
- The interface never claims something is saved when it is not.
- State placement defended — you can say why each piece is local or shared.

---

## Where this sits

- Curriculum document: [`docs/courses/mobile-development.md`](../courses/mobile-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
