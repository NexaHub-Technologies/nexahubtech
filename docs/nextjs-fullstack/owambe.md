# Owambe

*Next.js · project 4 of 4*

| | |
|---|---|
| **Course** | [Next.js](../courses/nextjs-fullstack.md) |
| **Modules** | 06 |
| **Weeks** | 9–10 |
| **Course level** | Assumes you already write React |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **06 — Rendering & deployment** · Static, dynamic, and streaming — then shipping the whole thing to production.

**Course capstone.** Owambe is an event page and guest list: an organiser
publishes a page, and guests RSVP without an account.

The static/dynamic split is not something you have to manufacture. The public
event page is read by many and changes rarely; the organiser's dashboard is
different for every request. One product, two correct answers.

**What you build**
- The public event page statically generated with `generateStaticParams` and
  revalidated on demand when the organiser saves — module 06, with module 04.
- The dashboard rendered dynamically per session, with the guest list streamed
  under Suspense while the event summary paints immediately — module 06.
- Organiser authentication and a database, every dashboard query scoped to the
  organiser; guests need no account — module 05 carried forward.
- RSVP through a server action that revalidates the organiser's view but not the
  public page's cached body — module 04, chosen and defended.
- Deployed on a real URL, verified from a cold start, with the client bundle
  inspected for secrets — module 06.

**The shape**
Entities: `Organiser {id, email, passwordHash, name}`, `Event {id, slug, title,
host, venue, startsAt, capacity, organiserId, published}`, `Rsvp {id, eventId,
name, phone, guests, createdAt}`. Routes: `/` (static), `/e/[slug]` (static,
revalidated on demand), `/sign-in`, `/dashboard`, `/dashboard/events/[id]`.
Server actions: `rsvp`, `saveEvent`. Five routes; do not add a sixth.

**Out of scope**
- Ticketing and payments.
- Invitations by email or SMS — a third-party integration that proves nothing
  about rendering.

**What is assessed**
- It is live and works from a cold start.
- Each route's rendering strategy is a decision you can defend.
- Secrets are server-side; verified by inspecting the client bundle.
- A README naming every server/client boundary decision and its reason.

---

## Where this sits

- Curriculum document: [`docs/courses/nextjs-fullstack.md`](../courses/nextjs-fullstack.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
