# Gurara Vault

*Cybersecurity · project 3 of 4*

| | |
|---|---|
| **Course** | [Cybersecurity](../courses/cybersecurity.md) |
| **Modules** | 04–05 |
| **Weeks** | 9–12 |
| **Course level** | Assumes general technical confidence |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **04 — Cryptography basics** · Encryption, hashing, and key management — the tools that protect data.
- **05 — Incident response** · What to do when things go wrong. Detection, containment, and recovery.

## Supplied by the school

This project cannot run until these exist.

- The **Gurara** vault implementation — right primitive, wrong key handling.
- A log set containing a **real gap**: the admin console has no logging, so an admin action can be established but not attributed.

A cryptographic review of a supplied vault used by the fictional **Gurara
Co-operative**, followed by the reconstruction of a simulated breach of it,
written up for a board.

Bolting the two modules to one fictional organisation lets the incident report
land where the crypto review predicted it would — which is the lesson. The failure
was in key handling, and the review said so before the logs did.

**What you build**
- A mechanism memo for four scenarios — stored passwords, a session token, a file
  at rest, data in transit — each with the primitive chosen **and a key-handling
  story**: where the key lives, who can read it, what happens when it rotates —
  module 04.
- The planted flaw found — module 04. The vault uses the right primitive badly,
  which is how real systems fail; the review must say precisely what is wrong and
  what the correct construction is.
- A timeline from the supplied logs: what happened, when it started, what was
  accessed, how — module 05.
- **An honest statement of what the logs cannot tell you** — module 05. The
  supplied log set contains a real gap, and finding its edge is the highest-value
  part of this project. Attribution beyond what the logs support is the overclaim
  this module exists to prevent.
- A board report — module 05: what happened, what it means, what to do, in
  language a non-technical director can act on, with the technical detail in an
  appendix.

**The shape**
Part A: the mechanism memo, four scenarios, a page each. Part B: the flaw report,
with the correct construction alongside. Part C: the incident report — Executive
summary → Timeline → Scope of access → How it was done → What we cannot determine
→ Recommendations, prioritised → Technical appendix.

**Out of scope**
- Writing a new cryptographic construction. Choose and defend; do not invent.
- Attributing the breach to any actor beyond what the logs support.

**What is assessed**
- Correct primitives *and* a key-handling story for each.
- A defensible timeline, and an explicit statement of what cannot be determined.
- A report a non-technical director could act on.

---

## Where this sits

- Curriculum document: [`docs/courses/cybersecurity.md`](../courses/cybersecurity.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
