# Idanre Range

*Cybersecurity · project 4 of 4*

| | |
|---|---|
| **Course** | [Cybersecurity](../courses/cybersecurity.md) |
| **Modules** | 06 |
| **Weeks** | 13–16 |
| **Course level** | Assumes general technical confidence |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **06 — Security in practice** · Hands-on labs and real-world scenarios that put your skills to the test.

## Supplied by the school

This project cannot run until these exist.

- The **Idanre** lab range — several hosts, a web application, a file server, an internal admin box and a misconfigured backup.

**Course capstone.** A full defensive assessment of the Idanre lab range —
several hosts, a web application, a file server, an internal admin box and a
misconfigured backup — delivered as a report.

**What you build**
- A scope and authorisation memo, written and signed **before any work**: hosts in
  scope, hosts explicitly out, the window, and the escalation contact — module 06.
  This is an assessed artefact, not paperwork. It is also the habit that keeps a
  graduate lawful.
- Reconnaissance notes, confined to the range, timestamped and reproducible —
  module 06.
- A findings register ranked by business impact, each finding carrying its
  consequence in one sentence — module 06. A CVSS score copied from a scanner
  without that sentence is not a ranking.
- A reproduction path per finding, such that a marker can reproduce it from your
  write-up alone on a fresh range instance — module 06.
- A remediation plan by layer: the fix, the layer, and what it does not fix —
  module 06.

**The shape**
Scope and authorisation → Method → Findings, ranked → Per-finding detail
(evidence, reproduction, impact, fix) → Remediation plan → Executive summary,
written last and placed first → Appendix.

> **No reconnaissance of any real organisation.** Not scanning, not credential
> searching, not employee enumeration, not "just looking" at a real company's
> public infrastructure. This is the single likeliest way somebody on this course
> commits an offence while believing they are doing coursework, and it is why a
> capstone with a recon phase needs this line in writing. Everything stays inside
> Idanre.
>
> When you publish this work, describe what was found and what was fixed. Do not
> publish working payloads against identifiable off-the-shelf software versions.

**What is assessed**
- Findings are reproducible from your write-up alone.
- Risk ranking reflects business impact, not a scanner's severity label.
- Every finding has a fix at the correct layer.
- The report is readable by someone who is not a security engineer.
- The scope memo was written before the work, and everything stayed inside it.

---

## Where this sits

- Curriculum document: [`docs/courses/cybersecurity.md`](../courses/cybersecurity.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
