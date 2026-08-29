# Course curriculum

One document per course. Each contains the week plan, the outline module by
module, the exercise brief for every module, and the capstone specification.

These are working documents for whoever teaches the course. They are meant to be
edited by hand as sessions get delivered and the material improves.

**`src/lib/courses.ts` is the source of truth for the commercial facts** — fee,
length, level, prerequisites and module titles. The website renders from it, and
these documents restate it so they read on their own.

The fee, length, level and self-study hours are **not repeated in these
documents**. the course page renders them from the course record, so
there is nothing to keep in sync. What the documents do restate — module titles
and the mental model — is checked by `src/lib/course-docs.test.ts`, which also
fails if a course has no document, if a module has no exercise brief, or if the
projects do not tile the course — every module in exactly one project, every
week accounted for, three or four projects, the last one the capstone.

| Course | Length | Fee | Level |
|---|---|---|---|
| [Web Development (Fullstack)](web-development-fullstack.md) | 10 Weeks | ₦160,000 | Complete beginners |
| [Frontend Development](frontend-development.md) | 10 Weeks | ₦120,000 | Complete beginners |
| [JavaScript Programming](javascript-programming.md) | 8 Weeks | ₦100,000 | Beginners, and copy-paste JavaScript |
| [React](react-development.md) | 8 Weeks | ₦120,000 | Already writes JavaScript |
| [Next.js](nextjs-fullstack.md) | 10 Weeks | ₦160,000 | Already writes React |
| [Backend Development](backend-development.md) | 8 Weeks | ₦100,000 | Beginners; some programming helps |
| [Mobile Development](mobile-development.md) | 12 Weeks | ₦190,000 | Can already program |
| [Cybersecurity](cybersecurity.md) | 16 Weeks | ₦230,000 | General technical confidence |
| [Python Programming](python-programming.md) | 6 Weeks | ₦80,000 | Never coded before |
| [Data Analysis](data-analysis.md) | 12 Weeks | ₦120,000 | Beginners who enjoy a question |
| [Videography & Video Editing](videography-video-editing.md) | 8 Weeks | ₦120,000 | Complete beginners |

## The shape every document follows

Each course teaches one idea — its **mental model** — and every module is a step
toward holding it. Each session has the same three parts:

1. **A mental model.** The idea in plain language, before any code.
2. **An exercise brief.** A task that cannot be finished by pattern-matching the
   example, so the learner finds out whether they actually have the concept.
3. **A model answer.** A worked solution with the reasoning left in, to compare
   against — never to substitute for the attempt.

Every module below therefore carries an exercise brief and a note on what the
model answer should demonstrate. It also names **the misconception the module
exists to clear**, because that is usually the real work.

## Projects and the capstone

Each document carries a **projects section**: three or four major projects per
course, each built once the two or three modules behind it are done.

They are **independent pieces, not stages of one thing.** Project 2 starts from
nothing rather than extending project 1, so a learner finishes the course with
three or four separate artefacts — each demonstrating something different —
instead of one product and a pile of weekly fragments.

The per-module exercise briefs are the practice; the projects are the
integration. Both are needed and neither replaces the other.

The last project of every course is the **course capstone**, and it is the only
piece we ask to see finished and, where it applies, deployed. Its full
specification lives in the projects section rather than in the final module, so
it is stated once.

See [`/teaching`](../../src/routes/teaching.tsx) for the pedagogy this rests on.
