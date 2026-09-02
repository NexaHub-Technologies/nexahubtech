# Microsoft Office

Word, Excel, PowerPoint and Access, taught to the standard clerical work
actually deserves — for people already doing the job, mostly self-taught, and
losing hours a week to it.

> **The mental model — The data is not the document**
>
> Each of these four programs keeps two things apart, and nearly every hour a
> self-taught office worker loses comes from mixing them up. There is the
> information — names, amounts, dates, records — and there is the way it happens
> to be laid out today. A style, a formula, a slide master and a query are all
> the same move: describe the presentation once, point it at the data, and let
> the program redraw it. Type the answer in by hand instead and you have made
> something that is correct exactly once, and wrong the first time anything
> changes.

| | |
|---|---|
| **Format** | Taught live, online · start any time |

## Before you start

**Know:** how to use a computer confidently — files, folders, saving, email. You
have opened Word and Excel before, even if nobody ever showed you how. No
formulas, no databases and no macros are assumed, and the course does not
pretend you should already know them.

**Have:** **a Windows PC.** This is not a preference. Access is not made for
macOS, and module 05 is Access — a Mac can carry the other five modules and then
stops. The centre has licensed Windows machines, and anyone on a Mac should plan
to use one for weeks 8 and 9. You will also need a Microsoft 365 or Office
licence, real work from your own desk to bring, and 4–6 hours a week outside
sessions.

> **How this differs from PC Basics.** They overlap by design and are not
> substitutes. [PC Basics](pc-basics.md) module 03 spends two weeks on the *idea*
> — that a heading is a style and a total is a formula — for somebody who has
> never used a computer. This course assumes that idea and spends ten weeks on
> the craft: mail merge, lookups, pivot tables, slide masters, and a relational
> database. If you have never used a computer, start there. If you have been
> doing this job for three years by hand, start here.

> **On the honest limit.** Ten weeks makes you genuinely good at four programs.
> It does not make you a data analyst — that is
> [Data Analysis](data-analysis.md) — and it does not teach macros or VBA, which
> are programming and are deliberately out of scope. What it does teach is how to
> recognise the moment a job has outgrown the tool you are using on it.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1–2 | 01 | Word, properly |
| 3 | 02 | PowerPoint that carries a decision |
| 4–5 | 03 | Excel: the data table and its formulas |
| 6–7 | 04 | Excel: lookups, pivots and reporting |
| 8–9 | 05 | Access: tables, relationships and queries |
| 10 | 06 | Choosing the right tool, and handing over |

## Module 01 — Word, properly
*Weeks 1–2*

Styles, templates, long documents and mail merge — the difference between typing
and producing.

**By the end you can**
- Build a document from heading styles, so it can be renumbered, contented and
  restyled without being retyped.
- Save a template, and say why that is different from keeping a document to copy.
- Run a mail merge from a spreadsheet, including the cases where the data is not
  clean.
- Use track changes and comments the way a document under review actually needs.

**The misconception this clears.** That formatting is what you do at the end,
with the bold button. Bold-and-bigger *looks* like a heading and carries no
structure, so nothing downstream — contents pages, navigation, restyling,
accessibility — can use it, and every change becomes manual again. Ten years of
typing quickly is not the same as two weeks of this, and that is not an insult;
nobody was ever shown.

**Exercise brief.** Two twenty-page documents are supplied and look identical on
screen. One is built with styles; one is built by hand. Without being told which
is which, find out — then make one change that proves it. Then repair the
hand-built one, and time yourself doing it.

**Model answer demonstrates.** The test done by changing something rather than by
looking — switch the theme, generate a contents page, collapse the navigation
pane. The repair done by applying styles rather than by reformatting paragraphs
one at a time.

---

## Module 02 — PowerPoint that carries a decision
*Week 3*

Slide masters, and a deck that still works when it is read without you in the
room.

**By the end you can**
- Edit a slide master so every slide follows one change.
- Build a slide that makes one point, and know which points do not need slides.
- Say what a deck is for in a meeting where a decision has to be made.

**The misconception this clears.** That a deck is the document. Most office decks
are a report with line breaks, read aloud to people who can read. The fix is not
"fewer words" as a style rule — it is knowing whether the thing you are making is
a document to be read or a prompt for a conversation, because they are different
artefacts and neither one is a bad version of the other.

**Exercise brief.** You are given a two-page memo and asked for a deck. Produce
**two**: one for a meeting you will speak at, one to be forwarded to somebody who
will never hear you say a word. Then write three lines on what you moved between
them and why.

**Model answer demonstrates.** Two genuinely different artefacts from one source,
and the reasoning named — what carries the meaning in each case, and what the
speaker was carrying in the first version.

---

## Module 03 — Excel: the data table and its formulas
*Weeks 4–5*

One clean table, honest columns, and every figure a formula that recalculates.

**By the end you can**
- Lay out a table so that one row is one thing and one column is one fact.
- Write formulas with references, and know when to lock one.
- Use data validation to stop the mistakes that are invisible once made.
- Spot the shapes that will hurt later: merged cells, totals inside data, numbers
  stored as text.

**The misconception this clears.** That a spreadsheet is a grid you lay out to
look like the paper form it replaced. That is why merged cells exist and why
everything downstream then hurts. The layout that is easiest to read is almost
never the layout that is easiest to compute, and the answer is to keep the data
table plain and build the readable thing on top of it.

**Exercise brief.** A deliberately awful sheet is supplied — merged headers,
trailing spaces, a total row in the middle, dates as text, one number as text
with a leading apostrophe. Get it to answer a simple question. Write down every
obstacle in the order you hit it.

**Model answer demonstrates.** Each obstacle named and connected to the layout
decision that caused it, and the sheet restructured rather than patched around.

---

## Module 04 — Excel: lookups, pivots and reporting
*Weeks 6–7*

Joining two sheets, summarising thousands of rows, and charts that answer one
question.

**By the end you can**
- Join two tables with a lookup, and handle the rows that do not match.
- Build a pivot table to answer a question, then rebuild it to answer a different
  one.
- Make one chart that answers one question, titled with the answer.

**The misconception this clears.** That a lookup returning nothing means there is
nothing there. It usually means the two spellings differ, or one side is text and
the other is a number — and the dangerous part is that the sheet keeps working
and the total is quietly wrong. **A lookup you have not checked for failures is
not finished**, and this module treats the unmatched rows as the main event
rather than an edge case.

**Exercise brief.** Two supplied sheets that should join on staff number, except
that one stores it as text with a leading zero and the other as a number, and
four people exist on one side only. Join them, then produce the count of rows
that did not match — before producing any total.

**Model answer demonstrates.** The mismatch diagnosed rather than worked around,
the four unmatched rows surfaced deliberately, and a stated reason for what
should happen to them.

---

## Module 05 — Access: tables, relationships and queries
*Weeks 8–9*

When a spreadsheet stops being the right answer, and what a database does
instead.

**By the end you can**
- Split one sheet into related tables, so each fact is recorded once.
- Define relationships and switch on referential integrity, and say what it
  refuses.
- Write queries that answer questions a spreadsheet made awkward.
- Build a simple form and a printable report.

**The misconception this clears.** That a database is a big spreadsheet, or that
this is about learning a fourth program. It is about one idea: **when the same
fact is written in more than one place, it will eventually disagree with
itself.** A person's name spelt three ways in a requisition log is not untidiness
— it is three people, as far as any total is concerned. The tables come from
that, not from a rule about normalisation.

**Exercise brief.** Given a single sheet where one column holds five items
crammed into one cell and the requester's name is retyped on every row, mark up
on paper — before touching Access — what the tables should be and why. Defend the
boundaries out loud. Only then build it.

**Model answer demonstrates.** Table boundaries argued from "what is the thing
here, and what is a fact about it", not from a rule; and at least one boundary
where a defensible alternative existed and was rejected for a stated reason.

---

## Module 06 — Choosing the right tool, and handing over
*Week 10*

Which of the four a job belongs in, and how to leave work a colleague can run.

**By the end you can**
- Say which of the four programs a job belongs in, and defend it.
- Recognise the point at which a job has outgrown the tool it is being done in.
- Write a handover somebody else can actually work from.

**The misconception this clears.** That the right tool is the one you know best.
It is the most expensive habit in clerical work: a register kept in Word because
Word is comfortable, a database kept in Excel because Excel is familiar. The
signals are learnable — how the thing grows, how often it is read back, how many
people write to it — and this module is where they are named.

**Exercise brief.** Take **one repeating task from your own desk** — something
you do every week or every month, by hand. Write down how it is done today,
honestly, including the parts that are embarrassing. Then say which of the four
programs it actually belongs in and argue it in writing. Finally, write the
handover note: what to open, what to change, what never to touch, and what to do
when it looks wrong. One page. If it needs three, the job is too complicated and
that is the finding.

If you have no desk of your own, use the sample desk the school supplies — a
real, ordinary office task with its paperwork.

Replace anything personal before you hand it in: salaries, phone numbers, health
or disciplinary records. If the task cannot be shown without them, pick another
task.

**Model answer demonstrates.** A choice of program argued rather than assumed —
"Excel, because a requisition log grows a row a day and only ever gets read back
one way" is an argument; "Excel, because that is what we use" is not. And a
handover note somebody else can follow without asking you anything.

## Assessment across the course

No grades, and no course project. This course is assessed entirely through the
per-module exercise briefs above. The people taking it are already in the job;
what they need is to stop losing hours, not a portfolio.

One demonstration carries most of the weight and cannot be talked around:
**change one input and watch what moves.** Change a template's theme and every
merged letter must restyle itself; change one salary and every dependent figure,
pivot and chart must move. Whatever does not move was done by hand, and doing it
by hand is the thing this course exists to end.

The module 06 handover note is the other measure that cannot be coached: somebody
who is not you either runs the task from it or does not.
