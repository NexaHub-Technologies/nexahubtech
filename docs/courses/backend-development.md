# Backend Development

Build the engine behind applications — APIs, databases, and server-side logic.

> **The mental model — A server is a function you can call over a wire**
>
> Strip away the frameworks and a backend does one thing: it takes a request and
> returns a response. What makes it hard is that it does this for many people at
> once, and it remembers things between calls. Hold those two apart — the
> translation, and the state it touches — and routing, middleware, databases and
> auth each drop into place.

| | |
|---|---|
| **Format** | Taught live, online · start any time |

## Before you start

**Know:** basic programming in any language — variables, loops, functions;
comfort with the terminal, or willingness to learn it in week one. No server, API
or database experience needed.

**Have:** a laptop with 8GB RAM or more; a stable internet connection; 6–8 hours
a week outside sessions.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1–2 | 01–02 | How servers work · Node.js & Express |
| 3–4 | 03 | Databases & data modeling |
| 5–6 | 04 | Authentication & security |
| 7–8 | 05 | Deploying your API |

## Projects

3 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing — project 2 starts from
nothing rather than extending project 1 — so you finish with 3 separate pieces
of work you can show somebody, each demonstrating something different.

The per-module exercise briefs below are practice. These are the integration.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–03 | 1–4 | **Alafia** — a pharmacy API whose rules live in the database |
| 2 | 04 | 5–6 | **Gatepass** — a visitor-pass API, then attacked by its own author |
| 3 | 05 | 7–8 | **Course capstone.** **Buka** — a canteen ordering API, deployed |

### Project 1 — Alafia
*Modules 01–03 · Weeks 1–4*

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

### Project 2 — Gatepass
*Modules 04 · Weeks 5–6*

Gatepass is an estate visitor-pass API: a resident creates a pass with a code,
and a security officer verifies it at the gate.

It separates identity, ownership and role cleanly in one small surface. A
resident is authenticated but may see only their own passes; an officer may
verify any code but must not see the resident's phone number. That is module 04's
misconception laid out as endpoints.

**What you build**
- Sign-up and sign-in with properly hashed passwords, and sessions held in the
  database so they survive a restart — not a module-level `Map` — module 04.
- Ownership checked on every route touching a pass: `GET /passes/:id` returns
  **404, not 403**, for a pass you do not own, because a 403 confirms it exists —
  module 04, identity is not authorisation.
- A role check at the gate: `POST /gate/passes/:code/use` is officer-only, and the
  verify response returns only the visitor's name, the host's flat and the
  validity window — never the resident's phone number — module 04, minimal
  payloads.
- A written list naming each common web vulnerability and the specific place this
  API stops it, plus a rate limit on sign-in — module 04.

**The shape**
Entities: `User {id, email, passwordHash, name, role: resident|officer, flat}`,
`Pass {id, code, residentId, visitorName, visitorPhone, validFrom, validUntil,
usedAt, usedByOfficerId}`, `Session {id, userId, expiresAt}`. Endpoints:
`POST /auth/sign-up`, `POST /auth/sign-in`, `POST /auth/sign-out`, `GET /me`,
`POST /passes`, `GET /passes`, `GET /passes/:id`, `DELETE /passes/:id`,
`GET /gate/passes/:code`, `POST /gate/passes/:code/use`.

**Then attack it yourself.** Work this checklist against your own running API,
with two accounts you created, and write up what each attempt returned and
whether that was right:

1. Read a pass belonging to the other resident, by its id.
2. Guess a pass id you were never given — sequential ids make this easy, which is
   itself a finding.
3. Send `"role": "officer"` in a sign-up or profile-update body.
4. Call a gate endpoint with a resident's session.
5. Use a session you signed out of, and one you have let expire.
6. Read the verify response carefully: does it leak a field the officer should
   never see?
7. Use the same pass code twice.
8. Send a pass whose `validUntil` is before its `validFrom`.

Finding nothing is an acceptable result **only** if you can show what you tried.
Finding something and fixing it is the better outcome, and it is worth more marks
than an API that was never tested.

**Out of scope**
- Sending the code by SMS, and QR generation. Both are integrations that consume
  the fortnight and exercise nothing in module 04.

**What is assessed**
- Ownership checked on every route that touches user data — identity alone is not
  authorisation.
- The attack write-up: eight attempts, what each returned, and your judgement on
  whether the response was correct.
- Anything you found, closed, with the fix explained.
- No endpoint returning a field its caller has no business seeing.

### Project 3 — Buka
*Modules 05 · Weeks 7–8*

**Course capstone.** Buka is an ordering API for a single canteen: a menu,
customers placing orders, and a kitchen queue.

It is small enough to finish and deploy in a fortnight, and every capstone
criterion has somewhere obvious to land — status codes in the order transitions,
restart-safety in the orders, environment configuration in the database URL and
session secret.

**What you build**
- An order status machine — `placed → accepted → ready → collected`, or
  `cancelled` — with illegal transitions rejected as 409 in the same error body
  used everywhere else — module 05.
- An item marked sold out cannot be ordered, rejected on the write path with 409
  rather than silently accepted — modules 03 and 05.
- Orders scoped to the customer who placed them; the kitchen queue scoped to the
  vendor role, enforced on every route — module 04 carried forward.
- Configuration entirely from environment variables — database URL, session
  secret, port, allowed origin — with a startup check that fails loudly when one
  is missing, and a committed `.env.example` holding no real values — module 05.
- Deployed and reachable, verified to survive a redeploy with the orders still
  there — module 05.

**The shape**
Entities: `User {id, email, passwordHash, name, role: customer|vendor}`,
`MenuItem {id, name, price, available}`, `Order {id, customerId, status,
placedAt, total}`, `OrderItem {orderId, menuItemId, quantity, unitPrice}`.

`unitPrice` is **copied onto the order item when the order is placed**, so a later
menu price change does not rewrite what somebody was charged. Almost everybody
joins to the menu instead; do not.

Endpoints: `POST /auth/*`, `GET /menu`, `POST /menu`, `PATCH /menu/:id`,
`POST /orders`, `GET /orders`, `GET /orders/:id`, `GET /kitchen/orders?status=`,
`PATCH /orders/:id/status`, `GET /health`.

**Out of scope**
- Payments.
- Delivery and rider tracking — a second product wearing the same name.

**What is assessed**
- Live, reachable, and working from a cold start.
- Secrets in environment variables, never in the repository.
- Sensible status codes and a consistent error shape throughout.
- Authorisation enforced on every route that touches user data.
- A README with the endpoints and how to run it locally.

---

## Module 01 — How servers work
*Week 1*

Requests, responses, and the HTTP lifecycle — the foundation everything else
sits on.

**By the end you can**
- Read a raw HTTP request and response and name every part.
- Choose a status code correctly, including when not to use 200.
- Explain what "stateless" means and why sessions exist despite it.

**The misconception this clears.** That HTTP is plumbing you can ignore behind a
framework. Every framework decision downstream is an HTTP decision wearing a
nicer name.

**Exercise brief.** Without any framework, write a server using only Node's
`http` module that answers three routes with correct status codes and headers.
Then call it with `curl` and paste the raw exchange into your notes.

**Model answer demonstrates.** Correct codes and headers set deliberately, and
the raw exchange included — the point is seeing the protocol before it is hidden.

---

## Module 02 — Node.js & Express
*Weeks 1–2*

Build your first API. Routes, middleware, and the patterns that make backends
tick.

**By the end you can**
- Structure an Express app so routes, logic and data access are separable.
- Write middleware and say exactly where in the chain it runs.
- Return errors in a shape a client can actually use.

**The misconception this clears.** That middleware is configuration. It is a
pipeline you are assembling, and order changes behaviour — most "my auth isn't
running" bugs are ordering bugs.

**Exercise brief.** Build a CRUD API with validation, logging and error handling
as separate middleware. Then deliberately reorder two of them so the behaviour
breaks, and write down what broke and why.

**Model answer demonstrates.** Clean separation, consistent error shape, and an
accurate account of the deliberate break.

---

## Module 03 — Databases & data modeling
*Weeks 3–4*

Store, query, and relate data. SQL or NoSQL — understanding the tradeoffs.

**By the end you can**
- Design a schema from a description of a real problem.
- Write queries that join across tables without loading everything into memory.
- Explain what an index does and what it costs.

**The misconception this clears.** That the schema is a technical detail chosen
after the features. The data model *is* the product — the rules it can and cannot
express decide what the application can ever do.

**Exercise brief.** Given a written description of a small business (a
cooperative, a shop, a clinic), design the schema before writing any code. Bring
it to the session for critique. Then implement it and write five queries the
business would genuinely ask.

**Model answer demonstrates.** A model that reflects the rules described,
including at least one constraint enforced by the database rather than by code.

---

## Module 04 — Authentication & security
*Weeks 5–6*

Sessions, tokens, and the basics of keeping users and data safe.

**By the end you can**
- Implement sign-up and sign-in with properly hashed passwords.
- Distinguish authentication from authorisation, and enforce both server-side.
- Name the common web vulnerabilities and how your API avoids each.

**The misconception this clears.** That authentication is the security work. Most
real breaches are *authorisation* — a signed-in user reaching another user's data
because the check was on identity rather than on ownership.

**Exercise brief.** Add auth to your module 03 API. Then attack it yourself with
two accounts you created: read the other account's rows by id, guess an id you
were never given, and send a `role` field in a body that should ignore it. Write
up each attempt and what it returned.

**Model answer demonstrates.** Ownership checks on every route that touches user
data, and an honest report of what your own attacks turned up — including the
attempts that correctly returned nothing.

---

## Module 05 — Deploying your API
*Weeks 7–8*

Ship it. Get your backend running in the real world, not just on your machine.

**The project.** This module's work is Project 3, the course capstone —
specified in full in the Projects section above.

## Assessment across the course

No grades. Modules 02 and 04 both ask you to break something on purpose and
report it — those write-ups are worth more than a clean run.
