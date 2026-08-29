# NexaRide Tickets

*Cybersecurity · project 2 of 4*

| | |
|---|---|
| **Course** | [Cybersecurity](../courses/cybersecurity.md) |
| **Modules** | 03 |
| **Weeks** | 6–8 |
| **Course level** | Assumes general technical confidence |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **03 — Web application security** · OWASP Top 10, injection attacks, XSS — learn to find and fix vulnerabilities.

## Supplied by the school

This project cannot run until these exist.

- **NexaRide Tickets** — five planted vulnerability classes, plus second instances of at least two in less obvious places so a symptom-level fix is detectable.
- A **flawed fix branch** in which a previous developer patched the symptom and left the class alive elsewhere.
- Both bound to `127.0.0.1` with a startup guard refusing non-loopback interfaces.

**NexaRide Tickets** is a deliberately vulnerable bus-ticketing web application,
shipped by the school. You break it, fix it properly, and then review a fix
somebody else got wrong.

Ticketing gives every vulnerability class a natural home — accounts, roles, an
admin panel, payments, user-written reviews — without anything being contrived.

**What you build**
- A finding record for each planted vulnerability: how you found it, a working
  proof captured inside the lab, the fix, and why the fix cannot be bypassed the
  same way — module 03.
- Fixes at the right layer — module 03. The application contains a **second
  instance of at least two classes in a less obvious place**, so a symptom-level
  fix is detectable. A patched endpoint with the class still live elsewhere does
  not pass.
- Injection addressed by separating data from instructions — parameterised
  queries, correct output encoding — never by filtering. A blocklist is a
  blocklist and it loses — module 03.
- **A review of the supplied flawed fix branch.** Shipped with the app is a branch
  in which a previous developer patched the symptom and left the class alive
  elsewhere. Find what they missed, name the specific line, and say what trust was
  misplaced there — module 03.

**The shape**
A findings register, one page per finding; a fix branch with one commit per
finding; and a review of 400–600 words on the supplied flawed branch naming a
specific line.

> **NexaRide Tickets must never be deployed anywhere reachable from the
> internet.** It ships bound to `127.0.0.1` with a startup guard that refuses to
> run on any other interface. Do not remove the guard. The realistic failure in
> this course is not somebody attacking a stranger — it is a knowingly vulnerable
> ticketing app put on a cheap VPS to show a friend, and conscripted within hours.

**Out of scope**
- Cryptographic critique of the app's session tokens — module 04, and project 3
  covers it properly.
- Network-level fixes. A WAF rule is not a fix for an injection at this point.

**What is assessed**
- Fixes at the right layer; the second instances found.
- Injection fixed by separating data from instructions.
- The review of the supplied branch finds something real and names the line.
- Every proof captured inside the lab.

---

## Where this sits

- Curriculum document: [`docs/courses/cybersecurity.md`](../courses/cybersecurity.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
