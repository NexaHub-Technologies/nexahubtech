# Lineup

*Mobile Development · project 1 of 3*

| | |
|---|---|
| **Course** | [Mobile Development](../courses/mobile-development.md) |
| **Modules** | 01–02 |
| **Weeks** | 1–4 |
| **Course level** | Assumes you can already program |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — Mobile development foundations** · How mobile platforms work — native vs cross-platform, and choosing your path.
- **02 — UI components & navigation** · Build screens that feel right. Layouts, gestures, and moving between views.

Lineup is an event companion app: the programme, a session, the person speaking,
and where the venue is. All the data ships with the app.

Session links get shared in WhatsApp groups, so a deep link straight into a
detail screen two levels inside a tab is what the product genuinely needs — which
is exactly the back-button case module 02 exists for.

**What you build**
- A tab navigator (Schedule, Venue, About) with a stack inside Schedule: day list
  → session → speaker — module 02.
- Correct hardware back from every screen. Opened cold from
  `lineup://session/<id>`, back must land on the day list rather than exiting the
  app — module 02, back behaviour after a deep link.
- Layouts holding in portrait and landscape on a small phone, safe-area insets
  respected under the notch and the gesture bar, and touch targets that do not
  need aiming — module 02.
- Starred sessions and the last-open day persisted, so a force-quit and reopen
  returns you exactly where you were — module 01, lifecycle and persistence.
- A lifecycle log written **before** the fix: what survived backgrounding,
  force-quit and reopen, tested and recorded at each step — module 01.

**The shape**
Screens: Schedule (day selector, list, and a "starred only" filter on the same
screen), Session detail, Speaker, Venue (a bundled map image and directions),
About. Data is a bundled JSON programme. Seed it from a real published programme
or your own — do not present an invented event as a real organisation's.

**Out of scope**
- A separate "My List" tab. It looks harmless and it is the trap: starred
  sessions would then be shared across two navigators, which is module 03's
  problem, so the filter stays on the Schedule screen.
- Fetching the programme from a server — module 04.

**What is assessed**
- Demonstrated on hardware. Simulator-only counts as not demonstrated.
- Back behaviour correct in every case, deep links included.
- The lifecycle log, written before the fix rather than after.
- A force-quit and reopen returning you exactly where you were.

---

## Where this sits

- Curriculum document: [`docs/courses/mobile-development.md`](../courses/mobile-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
