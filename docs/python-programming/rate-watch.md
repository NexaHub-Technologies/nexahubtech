# Rate Watch

*Python Programming · project 2 of 3*

| | |
|---|---|
| **Course** | [Python Programming](../courses/python-programming.md) |
| **Modules** | 03–04 |
| **Weeks** | 3–4 |
| **Course level** | The right place to start if you have never coded |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **03 — Working with files & APIs** · Read, write, and fetch data. Connect your scripts to the real world.
- **04 — Object-oriented Python** · Classes, objects, and when OOP actually helps — not just when it adds noise.

## External dependency

- `open.er-api.com` — **must be re-checked as live and unauthenticated before this brief is issued.** Named fallback: a daily weather log over Open-Meteo.

Rate Watch records the naira exchange rate once a day and keeps the history.
Two things make it the right project for these two weeks. The network is the
boundary module 03 is about — it is slow, it is absent on the day you need it,
and it returns shapes you did not expect. And there is exactly one thing in the
program that genuinely holds state, the history on disk, which is the smallest
honest reason to write a class.

*Before this brief is issued, check that `open.er-api.com` is still live and
key-free. If it is not, the same project works unchanged as a daily weather log.*

**What you build**
- `record` fetches today's rate from a public rates API and adds it to the
  history — module 03, fetching JSON and navigating the result rather than
  hoping about it.
- The write goes to a temporary file and is then moved into place with
  `os.replace`, so a run interrupted halfway leaves the previous history intact
  — module 03, not losing data when something goes wrong.
- `show` works with the network disconnected, because it reads only what is
  already on disk — module 03, knowing where your program's boundary is.
- Three failure cases handled by name: no network, a currency the API does not
  carry, and a history file somebody has edited into invalid JSON. Each fails
  with a sentence a person could act on — module 03, error handling as design
  rather than decoration.
- One class, `RateStore`, holding the file path and the loaded history;
  everything else stays a function, with a paragraph defending both halves —
  module 04, restraint.

**The shape**
`python ratewatch.py record` and `python ratewatch.py show [--last N]`. The
history is a single JSON file with one entry per day — date, base currency,
quote currency, rate — and running `record` twice in one day replaces that day's
entry rather than adding a second one.

**Out of scope**
- A database. A JSON file you can open and read is the point; a database hides
  the failure mode this project is about.
- Classes for fetching or formatting. `RateStore` holds state. Nothing else in
  the program does, and converting them anyway is the mistake being watched for.

**What is assessed**
- Runs cleanly with the network disconnected and with a corrupted file, both
  failing with a message a human could act on.
- A written defence of what you converted to a class *and what you left alone*.
  The strongest answers convert less than half.
- A `record` killed mid-write leaves the previous history readable.
- `show` never touches the network — demonstrated with the network off.

---

## Where this sits

- Curriculum document: [`docs/courses/python-programming.md`](../courses/python-programming.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
