# Gatepass

*Backend Development · project 2 of 3*

| | |
|---|---|
| **Course** | [Backend Development](../courses/backend-development.md) |
| **Modules** | 04 |
| **Weeks** | 5–6 |
| **Course level** | Open to beginners; smoother with some programming |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **04 — Authentication & security** · Sessions, tokens, and the basics of keeping users and data safe.

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

---

## Where this sits

- Curriculum document: [`docs/courses/backend-development.md`](../courses/backend-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
