# Mambilla Range

*Cybersecurity · project 1 of 4*

| | |
|---|---|
| **Course** | [Cybersecurity](../courses/cybersecurity.md) |
| **Modules** | 01–02 |
| **Weeks** | 1–5 |
| **Course level** | Assumes general technical confidence |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **01 — Security foundations** · The principles of confidentiality, integrity, and availability — and why they matter.
- **02 — Network security** · How networks are attacked and defended. Firewalls, intrusion detection, and monitoring.

## Supplied by the school

This project cannot run until these exist.

- The **NexaPay Microfinance** architecture diagram (fictional).
- The **Mambilla** lab range.

A threat model for **NexaPay Microfinance**, a fictional lender whose architecture
the school supplies, followed by a mapping and segmentation of the Mambilla lab
range — proved before and after.

The threat model is doable from week one with nothing but a diagram, which fills
the first fortnight honestly. The range work then tests whether the boundaries you
drew on paper survive contact with what is actually reachable.

**What you build**
- A trust boundary map of the NexaPay architecture: every boundary, what crosses
  it, in which direction, and what is trusted on the far side — module 01.
  Boundaries go where trust changes, not at convenient subnet edges.
- Three prioritised attacks with reasons — module 01. A ranked three with a
  rationale beats a list of twelve.
- A reachability matrix of the range before segmentation: which host reaches which
  service on which port, produced from your own scanning **inside the range** —
  module 02.
- A segmentation proposal and its implementation, each firewall rule carrying a
  one-line statement of what it denies and which boundary it enforces — module 02.
- The same matrix re-run afterwards, showing a specific path closed — module 02.
  A rule list is not a proof; the matrix is.

**The shape**
A report: Scope and authorisation → Architecture and trust boundaries → Threat
model → Prioritised attacks → Range reachability, before → Segmentation proposal
→ Implementation, annotated → Reachability, after → What this does not protect
against.

> **Scanning is confined to the lab range, or to a network you control end to end
> and are the sole user of.** A hostel network, an estate network, a shared ISP
> connection and a workplace network are none of those, whoever pays the bill.
> Scanning a network you do not control is an offence under the Cybercrimes Act,
> and believing it was coursework is not a defence. All assessed scanning happens
> in the range.

**Out of scope**
- Web application vulnerabilities — module 03.
- Anything about the cryptography in use — module 04.

**What is assessed**
- Boundaries drawn where trust actually changes.
- Prioritisation with a rationale, not a list.
- A before-and-after reachability proof.
- Everything inside the authorised range.

---

## Where this sits

- Curriculum document: [`docs/courses/cybersecurity.md`](../courses/cybersecurity.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
