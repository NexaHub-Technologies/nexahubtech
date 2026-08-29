# Slot

*Web Development · project 3 of 4*

| | |
|---|---|
| **Course** | [Web Development](../courses/web-development-fullstack.md) |
| **Modules** | 05 |
| **Weeks** | 7–8 |
| **Course level** | Built for complete beginners |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **05 — Backend with Node.js** · Servers, routes, and databases. Build an API that powers your frontend.

Slot is a booking API for a single-chair business — a barber, a hairdresser, a
phone-repair bench. Create a booking, list the day's bookings, cancel one. There
is no browser side at all.

Bookings have a rule only a server can hold: a slot is either taken or it is not,
and two people asking at once cannot both be right. That gives the "try to make
your own API do something it should not allow" report an obvious target rather
than an invented one.

**What you build**
- `POST /bookings` with validation that exists nowhere else: the slot must be in
  the future, fall on the half-hour, sit inside opening hours, and carry a name
  and a plausible phone number — module 05. None of these live in a form, because
  there is no form.
- A uniqueness rule the database enforces — a unique constraint on
  `(date, time)`, so "no double booking" is not a `SELECT` followed by an `INSERT`
  and a prayer — module 05, schema design.
- A cancellation reference returned on create and required on delete, so
  `DELETE /bookings/:id` without it returns 403 — module 05, ownership without
  accounts.
- One consistent error shape and correct status codes throughout: 201 on create,
  400 on a malformed body, 409 on a taken slot, 404 on an unknown booking — module 05.
- Data that survives a restart, in a real file-backed database rather than an
  array in memory — module 05.

**The shape**
`POST /bookings`, `GET /bookings?date=`, `GET /bookings/:id`, `DELETE /bookings/:id`,
`GET /availability?date=`. Source split into routes, validation and data access.
Hand in the repository plus a transcript of your attacks on your own API: a
booking in the past, the same slot twice, a negative-length appointment, extra
fields in the body, somebody else's cancellation — each with what the server did
and whether that was right.

**Out of scope**
- Sign-up and passwords. Authentication is not in this course, and the
  cancellation reference is the deliberate substitute. A login is a fortnight
  spent on the wrong problem.
- A frontend. This project is assessed through `curl` or a REST client. The
  browser side is project 4, and it is a different product.

**What is assessed**
- Validation on the server, not only in a form.
- Sensible status codes and one consistent error shape throughout.
- Data survives a restart.
- An honest report of at least one hole you found in your own work.

---

## Where this sits

- Curriculum document: [`docs/courses/web-development-fullstack.md`](../courses/web-development-fullstack.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
