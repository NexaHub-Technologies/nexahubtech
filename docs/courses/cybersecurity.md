# Cybersecurity

Understand how systems are attacked — and how to defend them.

> **The mental model — Every system has a boundary, and attacks cross it**
>
> Security isn't a feature you bolt on; it is a property of where you place
> trust. Draw the line between what you control and what you don't, and every
> vulnerability turns out to have the same shape: something crossed that line and
> was trusted on the far side. Injection, XSS, broken authentication — each is
> trust granted where it was never earned.

| | |
|---|---|
| **Format** | Taught live, online · start any time · lab-heavy |

## Before you start

**Know:** how networks and the web work at a basic level — IPs, ports, HTTP; the
command line, and enough code-reading to follow a script. No prior security
experience needed.

**Have:** a laptop with 8GB RAM or more and room for virtual machines; a stable
internet connection; 8–10 hours a week.

> **Rules of engagement.** Every technique in this course is taught for defence.
> All practical work happens inside lab environments we provide or systems you
> own. Testing a system you do not have written permission to test is a criminal
> offence in Nigeria under the Cybercrimes Act, and grounds for removal from the
> course. This is not a formality — read it before week one.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1–2 | 01 | Security foundations |
| 3–5 | 02 | Network security |
| 6–8 | 03 | Web application security |
| 9–10 | 04 | Cryptography basics |
| 11–12 | 05 | Incident response |
| 13–16 | 06 | Security in practice |

## Projects

4 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing, so you finish with 4
separate pieces of work — and in this course every one of them is a document
somebody could act on, which is the actual skill being certified.

The per-module exercise briefs below are practice. These are the integration.

> **Every project happens inside a lab range the school provides.** Fictional
> organisations carry the `Nexa` prefix and exist only inside the range. Nothing
> in this course is ever pointed at a real organisation, a real network, or a
> system you do not control end to end. Read the rules of engagement above before
> week one.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–02 | 1–5 | **Mambilla Range** — threat model, then map and segment |
| 2 | 03 | 6–8 | **NexaRide Tickets** — a web app broken, then fixed properly |
| 3 | 04–05 | 9–12 | **Gurara Vault** — a crypto review and a breach reconstructed |
| 4 | 06 | 13–16 | **Course capstone.** **Idanre Range** — a full assessment and report |

### Project 1 — Mambilla Range
*Modules 01–02 · Weeks 1–5*

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

### Project 2 — NexaRide Tickets
*Modules 03 · Weeks 6–8*

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

### Project 3 — Gurara Vault
*Modules 04–05 · Weeks 9–12*

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

### Project 4 — Idanre Range
*Modules 06 · Weeks 13–16*

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

## Module 01 — Security foundations
*Weeks 1–2*

The principles of confidentiality, integrity, and availability — and why they
matter.

**By the end you can**
- Apply the CIA triad to a real system and say which property matters most.
- Draw the trust boundaries of a system you have been shown.
- Build a threat model: who would attack this, and what for.

**The misconception this clears.** That security is a checklist of tools. It is a
way of asking who you are trusting with what — the tools only make sense once the
boundary is drawn.

**Exercise brief.** Given an architecture diagram of a small fintech app, draw
every trust boundary and list what crosses each one. Then name the three attacks
you would try first, and why those three.

**Model answer demonstrates.** Boundaries drawn where trust actually changes —
not at network diagrams' convenient lines — and prioritisation with a rationale.

---

## Module 02 — Network security
*Weeks 3–5*

How networks are attacked and defended. Firewalls, intrusion detection, and
monitoring.

**By the end you can**
- Read packet captures and identify what a flow is doing.
- Scan and map the lab range — or a network you control end to end and are the
  sole user of — and interpret the result.
- Configure firewall rules and explain what each one denies.

**The misconception this clears.** That the perimeter is the defence. Once
something is inside, a flat network means the perimeter bought you nothing.

**Exercise brief.** In the lab environment, map the network, identify the exposed
services, and write a report proposing segmentation. Then implement your proposal
and demonstrate that a compromised host can no longer reach what it previously
could.

**Model answer demonstrates.** A before-and-after proof, not a rule list.

---

## Module 03 — Web application security
*Weeks 6–8*

OWASP Top 10, injection attacks, XSS — learn to find and fix vulnerabilities.

**By the end you can**
- Find and exploit the common vulnerability classes in a lab application.
- Fix each one at the right layer, and explain why the fix holds.
- Review someone else's code and spot where trust was misplaced.

**The misconception this clears.** That input validation solves injection. The
fix is separating data from instructions — parameterised queries, correct
encoding — because a filter is a blocklist and blocklists lose.

**Exercise brief.** Work through a deliberately vulnerable application. For each
finding, submit: how you found it, a working proof in the lab, the fix, and a
note on why the fix cannot be bypassed the same way.

**Model answer demonstrates.** Fixes at the right layer. A patched symptom with
the class of bug still present does not pass.

---

## Module 04 — Cryptography basics
*Weeks 9–10*

Encryption, hashing, and key management — the tools that protect data.

**By the end you can**
- Choose between hashing, symmetric and asymmetric encryption for a job.
- Store passwords correctly and say why a fast hash is the wrong tool.
- Explain what TLS gives you and what it does not.

**The misconception this clears.** That encryption makes data safe. Encryption
moves the problem to key management, which is where real systems fail.

**Exercise brief.** Given four scenarios — stored passwords, a session token, a
file at rest, data in transit — choose a mechanism for each and defend it. Then
find the flaw in a supplied implementation that uses the right primitive badly.

**Model answer demonstrates.** Correct primitives *and* a key-handling story for
each.

---

## Module 05 — Incident response
*Weeks 11–12*

What to do when things go wrong. Detection, containment, and recovery.

**By the end you can**
- Work an incident through detection, containment, eradication and recovery.
- Preserve evidence without destroying it.
- Write an incident report someone non-technical can act on.

**The misconception this clears.** That response begins when you notice. It
begins with the logging you set up months earlier — an incident you cannot
reconstruct is an incident you cannot contain.

**Exercise brief.** You are given logs from a simulated breach. Establish what
happened, when it started, what was accessed, and how it was done. Write the
report for a board, not for engineers.

**Model answer demonstrates.** A defensible timeline, an honest statement of what
the logs cannot tell you, and clear recommendations.

---

## Module 06 — Security in practice
*Weeks 13–16*

Hands-on labs and real-world scenarios that put your skills to the test.

**The project.** This module's work is Project 4, the course capstone —
specified in full in the Projects section above.

## Assessment across the course

Reports carry more weight than exploits. Anyone can run a scanner; the skill this
course certifies is explaining what a finding means and what to do about it.
