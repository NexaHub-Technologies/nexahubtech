# Alafia

*Backend Development · project 1 of 3*

| | |
|---|---|
| **Course** | [Backend Development](../courses/backend-development.md) |
| **Modules** | 01–03 |
| **Weeks** | 1–4 |
| **Course level** | Open to beginners; smoother with some programming |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — How servers work** · Requests, responses, and the HTTP lifecycle — the foundation everything else sits on.
- **02 — Node.js & Express** · Build your first API. Routes, middleware, and the patterns that make backends tick.
- **03 — Databases & data modeling** · Store, query, and relate data. SQL or NoSQL — understanding the tradeoffs.

Alafia is a neighbourhood pharmacy's stock and dispensing API: what is on the
shelf, in which batch, expiring when, and what went out to whom.

The rules here have teeth a schema can hold — a batch expires, a quantity cannot
go negative, a controlled drug needs a prescription reference — so module 03's
claim that the data model *is* the product becomes demonstrable rather than
asserted.

**What you build**
- Stage one: three routes on `node:http` alone, with status codes and headers set
  by hand — a 200 with a body, a 201 with a `Location`, a 404 with a JSON error —
  and the raw `curl` exchange pasted into your notes — module 01.
- Stage two: the same thing rebuilt in Express with `routes/`, `services/` and
  `data/` separated, so no route handler contains SQL — module 02.
- Validation, request logging and error handling as three separate middleware,
  then the logger deliberately moved below the error handler, with a written
  account of exactly what stopped appearing — module 02.
- Three rules enforced by the database rather than by code:
  `CHECK (quantity_remaining >= 0)`, `UNIQUE (drug_id, batch_no)`, and a check
  that a controlled-drug dispense carries a prescription reference — module 03.
- Five queries the pharmacy would genuinely ask, at least two joining across
  tables: stock on hand per drug, batches expiring within thirty days, drugs
  below reorder level, most dispensed this month, and dispenses missing a
  prescription reference — module 03.

**The shape**
Three entities and no more: `Drug {id, name, form, strength, controlled,
reorder_level}`, `Batch {id, drug_id, batch_no, expires_on, quantity_received,
quantity_remaining}`, `Dispense {id, batch_id, quantity, dispensed_at,
patient_ref, prescription_ref}`. Endpoints: `GET /drugs`, `GET /drugs/:id`,
`POST /drugs`, `GET /drugs/:id/batches`, `POST /batches`, `POST /dispenses`,
`GET /reports/expiring`, `GET /reports/reorder`.

Design the schema on paper first and bring it to a session for your instructor to
pull apart, before you write any code. The critique is the point; the schema you
arrive at afterwards is the deliverable.

**Out of scope**
- User accounts, and "who dispensed it" as an authenticated identity — module 04.
  `patient_ref` is a free-text reference, not a login.

**What is assessed**
- The raw HTTP exchange, captured before any framework hid it.
- Validation, logging and error handling as separate middleware, plus the
  deliberate reorder and what it broke.
- A schema reflecting the rules described, with at least one constraint enforced
  by the database rather than by code.
- Five queries the business would genuinely ask.

---

## Where this sits

- Curriculum document: [`docs/courses/backend-development.md`](../courses/backend-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
