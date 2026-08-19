# NexaHubTech

Marketing site for NexaHubTech — a Nigeria-based skills-to-service company: a tech
school and a software studio under one roof.

Built with [TanStack Start](https://tanstack.com/start) (React 19, TanStack Router,
Vite, Tailwind v4), formatted and linted with [Biome](https://biomejs.dev).

## Getting started

```bash
bun install
bun run dev      # http://localhost:3000
```

## Scripts

| Command                   | What it does                                  |
| ------------------------- | --------------------------------------------- |
| `bun run dev`             | Dev server on port 3000                        |
| `bun run build`           | Production build                               |
| `bun run preview`         | Serve the production build locally             |
| `bun run generate-routes` | Regenerate `src/routeTree.gen.ts` from routes  |
| `bun run check`           | Biome format + lint                            |
| `bun run test`            | Vitest                                         |

## Layout

```
src/
  routes/            file-based routes (TanStack Router)
    __root.tsx       document shell, <head> meta, header/footer
    index.tsx        home
    about.tsx        about
    contact.tsx      contact (the only SSR route)
    courses/         course index + /courses/$slug detail
  components/site.tsx  header, footer, NAV / CONTACT / SOCIALS, shared bits
  lib/courses.ts       all course content (the site's content store)
  styles.css           design tokens + component styles
```

Routes are generated into `src/routeTree.gen.ts` — edit files in `src/routes/`, not
that file.

## Content

There is no CMS, API, or database. All page content lives in source:

- **Courses** — `src/lib/courses.ts` (`COURSES`). Adding an entry there adds a card
  to `/courses` and a full `/courses/$slug` page, with prev/next wiring for free.
- **Contact details and socials** — `CONTACT` and `SOCIALS` in
  `src/components/site.tsx`. Change them in one place; header, footer, and the
  contact page all read from there.
- **Everything else** — the arrays at the top of each route file (`VALUES`,
  `APPROACH`, `AUDIENCE`, …).

## Contact form

The form on `/contact` has no backend by design. On submit it composes the enquiry
and hands it to the visitor's own mail client (`mailto:`), with a WhatsApp fallback
built from `CONTACT.whatsapp`. Nothing is stored and no third-party service is
involved. If you later want submissions logged, swap the handoff in
`src/routes/contact.tsx` for a POST to a form service or a Supabase table.

## Still to supply

`src/routes/about.tsx` carries two `TODO` comments awaiting real copy: the founding
story / rebrand year, and co-founder photos plus a personal note.
