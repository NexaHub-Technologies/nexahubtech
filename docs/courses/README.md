# Course curriculum

One document per course. Each contains the week plan, the outline module by
module, the exercise brief for every module, and the capstone specification.

These are working documents for whoever teaches the course. They are meant to be
edited by hand as sessions get delivered and the material improves.

**`src/lib/courses.ts` is the source of truth for the commercial facts** — fees,
how a course is delivered, length, level, prerequisites and module titles. The website renders from it, and
these documents restate it so they read on their own.

The fee, length, level and self-study hours are **not repeated in these
documents**. the course page renders them from the course record, so
there is nothing to keep in sync. What the documents do restate — module titles
and the mental model — is checked by `src/lib/course-docs.test.ts`, which also
fails if a course has no document, if a module has no exercise brief, or if the
projects do not tile the course — every module in exactly one project, every
week accounted for, three or four projects, the last one the capstone.

**Five courses have no projects.** Computer Essentials, PC Basics, Office
Essentials, Microsoft Office and Mobile Videography are assessed through their
per-module exercise briefs alone, so the tiling rule does not apply to them;
instead the test requires that they carry no projects section, no capstone and no
spec directory, and that **every** one of their modules has an exercise brief
rather than all but the last.

**How a course is delivered** — live online, in person at the Kubwa centre, or
either — is stated in each document's Format row, and the test holds it to the
course record, which is also what decides which fees the site sells. Courses
offered both ways are taught from the same document.

| Course | Length | Level |
|---|---|---|
| [Computer Essentials](computer-essentials.md) | 3 Weeks | Never used a computer |
| [PC Basics](pc-basics.md) | 6 Weeks | Never used a computer |
| [Office Essentials](office-essentials.md) | 4 Weeks | Office staff, Word and Excel |
| [Microsoft Office](microsoft-office.md) | 8 Weeks | Clerical and office staff |
| [Python Programming](python-programming.md) | 6 Weeks | Never coded before |
| [JavaScript Programming](javascript-programming.md) | 8 Weeks | Beginners, and copy-paste JavaScript |
| [Frontend Development](frontend-development.md) | 10 Weeks | Complete beginners |
| [Backend Development](backend-development.md) | 8 Weeks | Beginners; some programming helps |
| [Web Development (Fullstack)](web-development-fullstack.md) | 18 Weeks | Complete beginners |
| [React](react-development.md) | 8 Weeks | Already writes JavaScript |
| [Next.js](nextjs-fullstack.md) | 10 Weeks | Already writes React |
| [Mobile Development](mobile-development.md) | 12 Weeks | Can already program |
| [Data Analysis](data-analysis.md) | 10 Weeks | Beginners who enjoy a question |
| [Mobile Videography](mobile-videography.md) | 4 Weeks | Complete beginners with a phone |
| [Videography & Video Editing](videography-video-editing.md) | 8 Weeks | Complete beginners |
| [Cybersecurity](cybersecurity.md) | 16 Weeks | General technical confidence |

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
