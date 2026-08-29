# Data Analysis

Turn raw data into clear insights — with Python, SQL, and real analytical
thinking.

> **The mental model — Data answers the question you actually asked**
>
> Every number in a dataset is the residue of a decision somebody made — what to
> record, what to leave out, how to count it. Analysis is less about tools than
> about keeping the question, the data and the claim honestly aligned. The real
> skill is noticing the gap between what you want to know and what this data can
> actually tell you.

| | |
|---|---|
| **Format** | Taught live, online · start any time |

## Before you start

**Know:** secondary-school maths — percentages, averages, reading a chart; basic
spreadsheet use. No Python or SQL; both are taught here from the ground up.

**Have:** a laptop with 8GB RAM or more for working with real datasets; a stable
internet connection; 6–8 hours a week.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1–2 | 01 | Thinking with data |
| 3–5 | 02 | SQL for analysis |
| 6–8 | 03 | Python for data |
| 9–10 | 04 | Visualization & storytelling |
| 11–12 | 05 | A real analysis project |

## Projects

4 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing — project 2 starts from
nothing rather than extending project 1 — so you finish with 4 separate pieces
of work you can show somebody, each demonstrating something different.

The per-module exercise briefs below are practice. These are the integration.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–02 | 1–5 | **Kasuwa Eight** — eight questions answered in SQL, and checked |
| 2 | 03 | 6–8 | **Basket** — an NBS food-price release cleaned, with the decisions logged |
| 3 | 04 | 9–10 | **Second Opinion** — one finding, two honest charts |
| 4 | 05 | 11–12 | **Course capstone.** **Budget Line**, **Ward** or **Grid** — your choice of three |

### Project 1 — Kasuwa Eight
*Modules 01–02 · Weeks 1–5*

Kasuwa is a market-trading database the school builds and hands you: eight
tables covering traders, stalls, orders, deliveries, payments and returns, and
labelled synthetic on every page, because nothing produced from it is a fact
about any real market. Eight questions get answered against it over five weeks.

It sits across both modules on purpose. Module 01 is the shaping of the question
and module 02 is the SQL, and separating them produces analysts who can write a
query that runs and cannot say what it means.

**What you build**
- One vague question — "how is the market doing?" — turned into three narrower
  questions this database can answer, plus a written list of what it cannot and
  what you would have to collect instead — module 01, the question before the data.
- Eight answers in SQL, each with your order-of-magnitude prediction written down
  *before* you run the query — module 02, sanity-checking as routine rather than
  as a final step.
- Joins, grouped aggregates and at least one window function across the eight —
  module 02, against a schema you did not design.
- One of the eight joins duplicates rows silently and its total is wrong in a way
  that looks entirely reasonable. Find it, say how you knew, and **go back and
  correct any earlier answer it invalidates.** The questions are ordered so that
  a later one gives you the means to catch an earlier one; the strongest
  submissions correct themselves without being told to.
- A written account of what Kasuwa systematically leaves out — every dataset
  encodes somebody's decision about what was worth recording — module 01,
  selection effects.

**The shape**
A `.sql` file per question, each opening with a comment carrying the question in
plain English and your prediction, and a short markdown write-up holding the
three narrowed questions, the answers with their checks, and the correction.

**Out of scope**
- Charts. There are none in this project, deliberately — visualisation is module
  04, and a chart is a very effective way to stop looking at a number.
- Pandas. The whole point of five weeks here is that the database does the work.

**What is assessed**
- An explicit account of what the dataset leaves out, and the selection effects
  in it.
- The join that silently duplicates rows, found and explained.
- Sanity-checking as routine: a result that looks reasonable is the dangerous
  one.
- Predictions recorded before the query ran, including the ones you got wrong.
- Earlier answers corrected once a later one exposed them.

### Project 2 — Basket
*Module 03 · Weeks 6–8*

Basket takes a National Bureau of Statistics selected food-price release and
gets it into a state where it can be analysed at all: item names spelled several
ways, units that are not comparable, states appearing and disappearing between
months, gaps that may be a missing observation or may be a real zero. The
deliverable is not the clean data. It is the log of what you decided and what
each decision might have cost.

You work from a snapshot the school has archived and pinned, not from the live
release. NBS revises and re-posts, and an analysis that cannot be re-run against
the same bytes is not reproducible.

**What you build**
- The release loaded and profiled before anything is changed: row counts, ranges,
  missingness by column and by month — module 03, exploratory work that changes
  what you go on to ask.
- Names, units and geography reconciled — mixed measures brought to a common
  unit, duplicates resolved, item labels mapped — module 03, cleaning as analysis.
- A missing-value policy chosen deliberately per column, not one rule applied to
  the sheet, with the reason for each — module 03.
- **The decision log**: every choice, what it assumes, and which direction it
  could bias a result. This is the graded artefact.
- One decision re-run the other way, end to end, showing how far a headline
  number moves. Report the movement; do not dress it up as a finding about food
  prices, because it is a finding about your own choices.

**The shape**
A notebook in four sections — profile before cleaning, the cleaning itself with
each step commented, the alternative-choice comparison, and a short statement of
what this data can and cannot support — with the decision log as a separate
markdown table so it can be read without running anything.

**Out of scope**
- Explaining *why* prices moved. That needs data this release does not carry, and
  the confident causal sentence is the failure mode of this project.
- Forecasting. Not in this course at all.

**What is assessed**
- The decision log: every choice, and what it might bias.
- Two analysts can clean the same data differently and both be defensible; what
  is not defensible is failing to say so.
- The alternative-choice comparison, with the number it moves.
- The profile was taken before the cleaning, not after.
- The work re-runs from the archived snapshot and produces the same numbers.

### Project 3 — Second Opinion
*Module 04 · Weeks 9–10*

Second Opinion is built on a single finding drawn from a small supplied extract,
and asks for two charts that lead a reader to different emphases while both
remaining honest. The difference between them must be *which quantity is
plotted* — a level against a rate, a total against a share, an absolute change
against a proportional one — never something hidden, truncated or rescaled to
mislead. A student who submits one honest chart and one distorted one has failed
the exercise rather than half-passed it.

It arrives after the cleaning module because the reader of a chart cannot see any
of the decisions behind it. That is what makes visualisation an argument.

**What you build**
- One finding stated in a sentence, with the quantity, the population and the
  period named — module 01, still.
- Two charts of that same finding, each honest, each leading somewhere different,
  with a paragraph on what a reader takes away from each — module 04, chart
  choice as argument.
- The one you would actually publish, and a defence of it addressed to a reader
  who has not seen the other — module 04.
- A misleading chart found in the wild, the distortion named precisely — a
  truncated axis, a dual axis, an area encoding a linear quantity, a cherry-picked
  window — and rebuilt fairly from the same data.
- Every chart carrying its source, its units and its period on the chart itself.

**The shape**
A notebook that produces the four charts from code, plus a one-page write-up: the
finding, the two readings, the publication choice, and the rebuild with the
original beside it.

**Out of scope**
- Dashboards and interactivity. A chart that needs to be explored is a chart that
  has not decided what it is saying.
- A new dataset. Two weeks is for the argument, not for another clean-up.

**What is assessed**
- Both charts are honest; the difference is emphasis, not distortion.
- A defensible reason for the one you would publish.
- The distortion in the wild chart named precisely.
- Source, units and period legible on every chart without the write-up.

### Project 4 — Budget Line, Ward or Grid
*Module 05 · Weeks 11–12*

**Course capstone.** Take one public Nigerian dataset from a question to a
conclusion, and deliver a written analysis and a short presentation. Choose one
of three. Whichever you take, **the dataset is locked at the end of week 10** —
two weeks is enough to analyse a dataset and not enough to also go and find one.

**Budget Line** — federal budget data published by the Budget Office of the
Federation. Follow one ministry or one spending category across several years and
say what the pattern is. The methodological work is comparability: line items are
renamed and regrouped between years, and naira amounts from different years are
not the same unit. State how you handled both.

**Ward** — a National Bureau of Statistics household or living-standards release,
used to ask a question about access to a public service. The project is named for
a grain the data does not reach: these releases are published at state, and
sometimes senatorial or LGA, level, so a ward-level question has to be re-asked
at the level the sampling actually supports. Doing that in writing is half the
project.

**Grid** — Nigerian Electricity Regulatory Commission quarterly reports, on
generation, distribution, billing and collection. The work is assembling a
consistent series across quarters: check whether each measure is defined the same
way in every report you use, and say plainly what you did where it is not.

**What you build**
- The question written down and dated before the analysis, narrow enough that
  this dataset can answer it — module 01.
- A clean-up with a decision log, in the shape Basket taught — module 03.
- Plausibility checks on every headline number, including at least one figure
  checked against an independent published source — module 02.
- Charts that are honest about scale, baseline and uncertainty, sourced on the
  chart — module 04.
- A conclusion that states what the data does *not* support as plainly as what it
  does, and a five-minute presentation of it for a non-technical audience.

**The shape**
A repository with the locked raw data, a notebook that runs top to bottom from
that raw data to every number quoted, a written analysis of two to four pages,
and the slides.

**Out of scope**
- Causal claims. These are observational public datasets; "A caused B" is not
  available from any of the three, however strong the pattern looks.
- A dataset you assemble yourself by scraping. Locked at week 10 means locked.

**What is assessed**
- The question is stated before the analysis, and is answerable by this data.
- Cleaning decisions are logged and their effects acknowledged.
- Results are checked for plausibility, not just produced.
- Charts are honest.
- The conclusion says what the data does *not* support as clearly as what it does.
- Reproducible: someone else can run your notebook and get your numbers.

---

## Module 01 — Thinking with data
*Weeks 1–2*

Asking the right questions. What data can tell you — and what it can't.

**By the end you can**
- Turn a vague business question into one a dataset could answer.
- Identify what a dataset systematically leaves out.
- Say plainly when the honest answer is "this data cannot tell us that".

**The misconception this clears.** That analysis begins with the data. It begins
with the question — a dataset handed to you already encodes somebody else's
decisions about what mattered.

**Exercise brief.** You are given a dataset and the question "are our customers
happy?". Write down what the data can support, what it cannot, and what you would
need to collect. Then write the three narrower questions you would actually
answer instead.

**Model answer demonstrates.** Explicit acknowledgement of survivorship and
selection effects — no charts at all in this exercise, on purpose.

---

## Module 02 — SQL for analysis
*Weeks 3–5*

Query, filter, and join data. Get comfortable pulling insights from real
databases.

**By the end you can**
- Write joins, aggregates and window functions against a real schema.
- Check a result for plausibility before reporting it.
- Explain why a query returned more rows than you expected.

**The misconception this clears.** That a query that runs is a query that is
right. The most dangerous result is one that looks reasonable — a join that
silently duplicates rows inflates every total downstream.

**Exercise brief.** Answer eight business questions against a supplied database.
For each, state your expected order of magnitude *before* running it. One of the
eight has a join that will silently duplicate rows — find it.

**Model answer demonstrates.** Sanity-checking as routine, and the trap found and
explained.

---

## Module 03 — Python for data
*Weeks 6–8*

Pandas, NumPy, and Jupyter. Clean, transform, and explore datasets efficiently.

**By the end you can**
- Load, clean and reshape a messy dataset.
- Handle missing data deliberately, and document the choice.
- Do exploratory analysis that changes what you go on to ask.

**The misconception this clears.** That cleaning is preparation before the real
work. Cleaning *is* analysis — every decision about a missing value or an outlier
is a claim about the world that shapes the result.

**Exercise brief.** Clean a genuinely messy dataset — inconsistent dates,
duplicates, missing values, mixed units. Keep a decision log: every choice, and
what it might bias. Then show how one different choice would change a headline
number.

**Model answer demonstrates.** The decision log. Two analysts can clean the same
data differently and both be defensible; what is not defensible is not saying so.

---

## Module 04 — Visualization & storytelling
*Weeks 9–10*

Charts, dashboards, and narratives. Make your findings clear and compelling.

**By the end you can**
- Choose a chart type from the shape of the question.
- Build charts that are honest about scale, baseline and uncertainty.
- Present a finding to a non-technical audience without overclaiming.

**The misconception this clears.** That visualisation is the presentation step.
It is a form of argument, and the same data plotted two ways can support opposite
conclusions — which is why the ethics live here rather than in a footnote.

**Exercise brief.** Take one finding and produce two honest charts that lead a
reader to different emphases. Then produce the one you would actually publish and
defend it. Finally, find a misleading chart in the wild and rebuild it fairly.

**Model answer demonstrates.** Awareness that chart choices are choices, and a
defensible final pick.

---

## Module 05 — A real analysis project
*Weeks 11–12*

Take a dataset from question to insight to presentation.

**The project.** This module's work is Project 4, the course capstone —
specified in full in the Projects section above.

## Assessment across the course

The honest "we cannot tell from this" is worth more marks here than a confident
answer the data does not carry. Overclaiming is the one thing that fails a
project outright.
