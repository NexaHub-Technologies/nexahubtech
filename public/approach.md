# Our Approach — NexaHubTech

> How NexaHubTech works: we settle what should be built, and why, before any of it gets written — for company websites and for the software your members sign into.

Canonical page: https://nexahubtech.company/approach

## Understand the problem

Before anything is designed, we work out what is actually being asked. Most software that fails does so by solving a problem nobody had.

- **What you do:** Talk us through how the work is done today — who does what, where it goes wrong, and what that costs you. No specification needed; the brief is what we are trying to arrive at, not what you have to bring.
- **What you get:** A written statement of the problem, the constraints and the two or three journeys the organisation actually runs on — in your words, checked back with you.

01. **Clarify the problem** — Separate what you asked for from what you need. We ask what happens today, who it fails, and what that failure costs you — because a brief is already a proposed solution, not the problem itself.
02. **Name the constraints** — Budget, deadline, team, devices, network, regulation. In this market that usually means mobile-first, intermittent connectivity and local payment rails. Constraints decide architecture, so they go on the table before any architecture does.
03. **Model the domain** — Name the entities and the rules that bind them before choosing a database. A cooperative's membership and contribution rules are the product; the schema only records them.
04. **Map the critical flows** — Walk the two or three journeys the business actually runs on, end to end. An architecture that serves real paths beats one that serves an imagined feature list.

## Decide the architecture

Only once the problem is pinned down do we choose a shape. Every decision here is written down together with the reason it was made, so it can be argued with later.

- **What you do:** Read the decisions and push back on them. This is the cheapest moment in the whole project to disagree, and the one place where an hour of your time is worth a fortnight of ours.
- **What you get:** A shape you can see: what your members will use, what your staff will use, who can see what, and what happens when the network drops mid-transaction.

05. **Choose the shape** — Where state lives, what talks to what, what must happen now and what can wait. We pick the simplest arrangement that satisfies the constraints from step 02 — not the most impressive one.
06. **Design the data layer** — Schema, relationships, indexes and access rules together, in one pass. Row-level security and role claims are part of the data design, not a layer bolted on once the tables already exist.
07. **Draw the trust boundaries** — Decide what each kind of user can see and do, and where that is enforced. A permission checked only in the interface is decoration — it belongs where the data lives.
08. **Plan for failure** — Assume the payment webhook never arrives and the connection dies mid-transaction. What the system does when things go wrong is designed here, deliberately, rather than discovered in production.

## Commit to it

The last three steps turn a design into something you can hold us to — and something we can be measured against once the building starts.

- **What you do:** Approve the design and the cost, or send it back. Nothing gets built against a document you have not agreed to.
- **What you get:** A design document and a cost grounded in it — and, once building starts, a written note whenever reality forces a change, rather than a system quietly drifting away from what you signed off.

09. **Cost it honestly** — Estimate infrastructure and effort before committing to either. We optimise for the least cost that meets the requirement, because a modest system you will never outgrow is worth more than a clever one you cannot afford to run.
10. **Write the design document** — The design becomes an artifact you can read, question and disagree with — while disagreeing is still cheap. It is also the thing the finished build gets checked against.
11. **Build to it, and revise out loud** — Implementation follows the document. When reality contradicts it — and occasionally it does — we change the document and say why, rather than letting the system quietly drift away from its own design.

## Contact

- Email: nexahubt@gmail.com
- Phone: +234 913 451 3173
- WhatsApp: https://wa.me/2349134513173
- Address: F01 Market, Kubwa, FCT-Abuja, Nigeria
- Company registration: RC 9545130
