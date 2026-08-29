# Found

*Web Development · project 4 of 4*

| | |
|---|---|
| **Course** | [Web Development](../courses/web-development-fullstack.md) |
| **Modules** | 06 |
| **Weeks** | 9–10 |
| **Course level** | Built for complete beginners |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **06 — Fullstack project** · Put it all together into a complete application you understand end to end.

**Course capstone.** Found is a deployed lost-and-found board for a campus or an
estate: somebody who finds a thing posts it, somebody who lost a thing searches,
and the finder marks it claimed when it is collected.

One entity, two audiences, one state change — about as small as a genuinely
useful fullstack application gets. Both halves of the mental model are
unavoidable in it: the search runs on the server because the board is shared, and
the claim code is why the server is the side that decides.

**What you build**
- Posting a found item — what it is, category, where, roughly when, how to reach
  the finder — validated on the server with readable errors in the browser, and
  you can say why the rule is written twice and which copy is the real one —
  module 06.
- Search and filter across the board, executed by the API rather than in the
  browser, because the board is shared — module 06.
- A claim code returned on posting and required to mark an item claimed. Claimed
  items leave the default view without being deleted — module 06.
- State that survives a refresh and a restart, on real storage, with a deployment
  that comes back correctly from cold — module 06.
- Deployed and reachable from a link, with the database URL and any secret in
  environment variables — module 06.

**The shape**
Browser: a board page with a search field and a category filter, a post form, and
a claim form that takes a code. Server: `POST /items`, `GET /items?q=&category=`,
`GET /items/:id`, `POST /items/:id/claim`. A README covering what it does, how to
run it locally, and where the split falls.

**Out of scope**
- User accounts. The claim code exists precisely so no login is needed. Two weeks
  does not hold sessions, hashing and this product.
- Photo upload. File storage is a deployment problem rather than an application
  one, and it is where this capstone dies. A text description is enough.

**What is assessed**
- It runs, deployed, from a link you send us.
- The data survives a refresh and a restart.
- You can answer "why is this on the server and not the browser?" for any part.
- The README explains what it does and how to run it.
- The reasoning is written down — the same standard the studio holds itself to on
  `/approach`.

---

## Where this sits

- Curriculum document: [`docs/courses/web-development-fullstack.md`](../courses/web-development-fullstack.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
