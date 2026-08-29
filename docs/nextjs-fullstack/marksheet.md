# Marksheet

*Next.js · project 3 of 4*

| | |
|---|---|
| **Course** | [Next.js](../courses/nextjs-fullstack.md) |
| **Modules** | 05 |
| **Weeks** | 7–8 |
| **Course level** | Assumes you already write React |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **05 — Auth, databases & APIs** · Sessions, route handlers, and wiring a real backend into the same codebase.

Marksheet is a school results portal: a student signs in and sees their own
results; a teacher signs in and sees the class summary.

It separates the three things module 05 is about. Authentication says who you
are. Ownership says you may see your own results. Role says only a teacher sees
the summary. An app with ownership alone lets you pass while still believing
identity is authorisation.

**What you build**
- Email and password sign-in with a session cookie that survives a refresh —
  module 05.
- A real database queried only from server code, with every read filtered by the
  signed-in user **at the query** rather than in the page — module 05.
- A teacher-only route handler, `GET /api/classes/[id]/summary`, with the role
  check inside the handler — module 05, route handlers.
- The attack, run and reported: a student's session calling that summary
  endpoint directly, and calling the by-id result endpoint for a classmate, with
  whatever it found and the fix — module 05.
- A check that no database URL or session secret appears anywhere in the client
  bundle — module 05.

**The shape**
Entities: `User {id, email, passwordHash, name}`, `Class {id, name, term}`,
`Enrolment {userId, classId, role: student|teacher}`, `Result {id, enrolmentId,
subject, score, recordedAt, recordedBy}`. Routes: `/sign-in`, `/results`,
`/class/summary`. Handlers: `GET /api/results`, `POST /api/results`,
`GET /api/classes/[id]/summary`.

**Out of scope**
- Grade calculation rules, weighting and progression logic. Interesting, and
  entirely irrelevant to module 05.
- Parent accounts. A third role adds nothing the first two have not taught.

**What is assessed**
- Authorisation enforced on the server, not in the interface.
- An honest report of the attack, including anything it found.
- No secret reachable from a client component — verified in the bundle.

---

## Where this sits

- Curriculum document: [`docs/courses/nextjs-fullstack.md`](../courses/nextjs-fullstack.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
