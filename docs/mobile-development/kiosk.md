# Kiosk

*Mobile Development · project 3 of 3*

| | |
|---|---|
| **Course** | [Mobile Development](../courses/mobile-development.md) |
| **Modules** | 05 |
| **Weeks** | 9–12 |
| **Course level** | Assumes you can already program |

## What you can rely on

This project may use anything from the modules below and **nothing from
later ones**. If a feature needs something not on this list, it belongs to a
later project.

- **05 — Testing & publishing** · Make it reliable, then ship it. Testing strategies and app store deployment.

## Supplied by the school

This project cannot run until these exist.

- A listings API.

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

## Where this sits

- Curriculum document: [`docs/courses/mobile-development.md`](../courses/mobile-development.md)
- Name register: [`docs/courses/NAMES.md`](../courses/NAMES.md)
