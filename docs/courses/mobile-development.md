# Mobile Development

Build real mobile applications — from concept to the app store.

> **The mental model — Your app is a guest, not the host**
>
> A phone interrupts you. A call arrives, the user switches away, the system
> reclaims your memory, the network vanishes halfway through a tap. A mobile app
> isn't a program that runs from start to finish — it is something that has to
> survive being paused, resumed and quietly destroyed, and still look to the
> person holding it as though it never left.

| | |
|---|---|
| **Format** | Taught live, online · start any time |

## Before you start

**Know:** JavaScript, or another modern language, to a working standard; what an
API call is; the terminal and git.

**Have:** a laptop with 8GB RAM or more (macOS if you intend to build for iOS);
an Android or iOS phone to test on; 8–10 hours a week.

## Week plan

| Week | Module | Focus |
|---|---|---|
| 1–2 | 01 | Mobile development foundations |
| 3–4 | 02 | UI components & navigation |
| 5–6 | 03 | State & data management |
| 7–8 | 04 | APIs and backend integration |
| 9–12 | 05 | Testing & publishing |

## Projects

3 projects across the course, each built once the modules behind it are done.
They are independent pieces, not stages of one thing — project 2 starts from
nothing rather than extending project 1 — so you finish with 3 separate pieces
of work you can show somebody, each demonstrating something different.

The per-module exercise briefs below are practice. These are the integration.

| # | Modules | Weeks | The project |
|---|---|---|---|
| 1 | 01–02 | 1–4 | **Lineup** — an event app that survives the operating system |
| 2 | 03–04 | 5–8 | **Tally** — a shop log that works with no network at all |
| 3 | 05 | 9–12 | **Course capstone.** **Kiosk** — classifieds, tested and submitted |

### Project 1 — Lineup
*Modules 01–02 · Weeks 1–4*

Lineup is an event companion app: the programme, a session, the person speaking,
and where the venue is. All the data ships with the app.

Session links get shared in WhatsApp groups, so a deep link straight into a
detail screen two levels inside a tab is what the product genuinely needs — which
is exactly the back-button case module 02 exists for.

**What you build**
- A tab navigator (Schedule, Venue, About) with a stack inside Schedule: day list
  → session → speaker — module 02.
- Correct hardware back from every screen. Opened cold from
  `lineup://session/<id>`, back must land on the day list rather than exiting the
  app — module 02, back behaviour after a deep link.
- Layouts holding in portrait and landscape on a small phone, safe-area insets
  respected under the notch and the gesture bar, and touch targets that do not
  need aiming — module 02.
- Starred sessions and the last-open day persisted, so a force-quit and reopen
  returns you exactly where you were — module 01, lifecycle and persistence.
- A lifecycle log written **before** the fix: what survived backgrounding,
  force-quit and reopen, tested and recorded at each step — module 01.

**The shape**
Screens: Schedule (day selector, list, and a "starred only" filter on the same
screen), Session detail, Speaker, Venue (a bundled map image and directions),
About. Data is a bundled JSON programme. Seed it from a real published programme
or your own — do not present an invented event as a real organisation's.

**Out of scope**
- A separate "My List" tab. It looks harmless and it is the trap: starred
  sessions would then be shared across two navigators, which is module 03's
  problem, so the filter stays on the Schedule screen.
- Fetching the programme from a server — module 04.

**What is assessed**
- Demonstrated on hardware. Simulator-only counts as not demonstrated.
- Back behaviour correct in every case, deep links included.
- The lifecycle log, written before the fix rather than after.
- A force-quit and reopen returning you exactly where you were.

### Project 2 — Tally
*Modules 03–04 · Weeks 5–8*

Tally is a stock count and sales log for a small shop, used standing in a market
with no signal.

Offline is not a mode here, it is the normal condition — which is module 04's
claim taken seriously. And it has both halves: a catalogue worth caching and
writes worth queueing.

**What you build**
- The product catalogue fetched once and cached to a local database, so a cold
  start in aeroplane mode shows the full list with an explicit "last updated"
  timestamp — module 04.
- Sales and stock adjustments written to an on-disk queue first and uploaded when
  connectivity returns, each carrying a client-generated id so a retry cannot
  post twice — module 04, with module 03 for the persistence.
- A per-row sync status — on device, uploading, uploaded, failed — with the
  interface never showing "saved" for something that exists only in memory —
  module 04, honest state.
- State placed deliberately and defended in the README: the search text local to
  the search screen, the pending-queue count shared across screens — module 03.
- A long stock count that stays responsive while an upload runs — module 03.

**The shape**
Screens: Products (searchable, cached), Product detail (count and adjust), Record
sale, Pending (the queue, with retry), Settings (last sync, force sync). The API
is supplied; use your own from Backend Development if you have taken it.

**Out of scope**
- Conflict resolution between two devices counting the same shop. Last-write-wins
  is acceptable, but it must be written down as a decision rather than left as an
  accident.
- Background sync while the app is killed. That is a platform capability, not the
  lesson.

**What is assessed**
- Tested in aeroplane mode on hardware, not with a mocked network.
- The queue survives a force-quit.
- The interface never claims something is saved when it is not.
- State placement defended — you can say why each piece is local or shared.

### Project 3 — Kiosk
*Modules 05 · Weeks 9–12*

**Course capstone.** Kiosk is a neighbourhood classifieds app: browse what is for
sale nearby, and post an item with a photo.

Every capstone criterion has a real place to fail here. Offline shows in the
cached listings, force-quit shows in a half-written post with a photo attached,
slow network shows in the image upload, and the store listing needs a privacy
statement that is genuinely about something — photos, a phone number, an
approximate area.

**What you build**
- Listings fetched and cached locally, so a cold launch in aeroplane mode shows
  the last-seen listings behind an explicit "offline, last updated…" banner —
  module 04 carried forward.
- Posting as a **durable draft**: force-quit halfway through and the title, price,
  area and attached photo are exactly where you left them, and the upload resumes
  rather than restarting — module 05.
- Image upload on a slow connection with real progress, cancellable, with a
  bounded retry — module 05.
- Tests over the upload queue's state machine and the draft-restore path, plus one
  end-to-end run of post-while-offline, reconnect, published — module 05.
- Store packaging: icon, adaptive icon, screenshots at the required sizes, a
  description, and a privacy statement that accurately names what is collected
  and where it goes — module 05. Installed and run on a device that is not yours.

**The shape**
Screens: Browse (list with an area filter), Item detail (gallery, contact the
seller by phone or WhatsApp), Post item (multi-step, durable draft), My items
(with sync status), Settings. Local entities: `Listing`, `Draft`, `UploadTask`,
`CachedImage`. The listings API is supplied.

**Out of scope**
- In-app messaging between buyer and seller — a second product, and it needs
  realtime infrastructure.
- Payments. Contact is a handoff to the phone.

**What is assessed**
- Installs and runs on a device that is not yours.
- Survives force-quit mid-task with no data loss.
- Behaves correctly in aeroplane mode.
- A store listing that would actually pass review.
- A README covering the architecture and the lifecycle decisions.

---

## Module 01 — Mobile development foundations
*Weeks 1–2*

How mobile platforms work — native vs cross-platform, and choosing your path.

**By the end you can**
- Describe the app lifecycle: launched, backgrounded, resumed, killed.
- Set up a project and run it on a real device, not only a simulator.
- Explain the tradeoffs of cross-platform against native.

**The misconception this clears.** That a mobile app is a website that happens to
be on a phone. The operating system is in charge, and it will suspend or kill you
without asking.

**Exercise brief.** Build a screen that displays a counter, then background the
app, force-quit it, and reopen it. Document exactly what survived and what did
not at each step. Then make the value survive all three.

**Model answer demonstrates.** An accurate lifecycle log first, and persistence
added second — in that order, because the log is the lesson.

---

## Module 02 — UI components & navigation
*Weeks 3–4*

Build screens that feel right. Layouts, gestures, and moving between views.

**By the end you can**
- Build layouts that adapt across device sizes and orientations.
- Implement stack and tab navigation with correct back behaviour.
- Handle touch targets and safe areas so the app feels native.

**The misconception this clears.** That navigation is routing. On mobile it is a
stack the user has a mental model of — get the back button wrong and the app
feels broken regardless of how it looks.

**Exercise brief.** Build a three-screen flow with a stack and a tab bar.
Requirement: the hardware back button behaves correctly from every screen,
including after a deep link. Test on a real device.

**Model answer demonstrates.** Correct back behaviour in every case, verified on
hardware — simulator-only testing does not count here.

---

## Module 03 — State & data management
*Weeks 5–6*

Keep your app responsive as complexity grows — local state, global state, and
syncing.

**By the end you can**
- Choose between local and shared state deliberately.
- Persist state across app restarts.
- Keep the interface responsive while work happens in the background.

**The misconception this clears.** That state management on mobile is the same
problem as on the web. It is not — your process can be destroyed at any moment,
so "in memory" is a temporary claim.

**Exercise brief.** Add persistence to your module 02 app so that a user who is
mid-flow, gets a phone call, and returns twenty minutes later finds exactly where
they were. Test it by force-quitting.

**Model answer demonstrates.** Restoration that is genuinely indistinguishable
from never having left.

---

## Module 04 — APIs and backend integration
*Weeks 7–8*

Connect your app to real data. Fetching, caching, and handling offline.

**By the end you can**
- Fetch and cache remote data sensibly.
- Design for a slow or absent network as the normal case.
- Show the user honest state: stale, loading, failed, offline.

**The misconception this clears.** That offline is an edge case to handle later.
On Nigerian networks it is the median experience, and an app that only works on
good wifi does not work.

**Exercise brief.** Make your app fully usable with the network disabled: cached
data visible, actions queued, and a clear indication of what has not yet synced.
Test it in aeroplane mode, not by mocking.

**Model answer demonstrates.** A queue that survives a restart, and an interface
that never lies about whether something has been saved.

---

## Module 05 — Testing & publishing
*Weeks 9–12*

Make it reliable, then ship it. Testing strategies and app store deployment.

**The project.** This module's work is Project 3, the course capstone —
specified in full in the Projects section above.

## Assessment across the course

Every module is tested on a real device. Anything demonstrated only in a
simulator is treated as not yet demonstrated.
