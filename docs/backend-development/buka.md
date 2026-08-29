# Buka

*Backend Development · project 3 of 3*

| | |
|---|---|
| **Course** | [Backend Development](../courses/backend-development.md) |
| **Modules** | 05 |
| **Weeks** | 7–8 |
| **Course level** | Open to beginners; smoother with some programming |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **05 — Deploying your API** · Ship it. Get your backend running in the real world, not just on your machine.

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

## Where this sits

- Curriculum document: [`docs/courses/backend-development.md`](../courses/backend-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
