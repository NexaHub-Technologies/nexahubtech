# Design-system bundle

`bun run design-system` builds the code files of the NexaHubTech design system
(the Design System artifact at https://claude.ai/artifact/RVdi5QXit3xgADcgoWvfoA)
from this repository, into `.design-system/` (git-ignored):

| file | what it is |
| --- | --- |
| `bundle.css` | `src/styles.css` compiled with Tailwind against `src/`, without the colour, spacing, radius and shadow values the system's `tokens.json` owns |
| `bundle.js` | the site chrome (`Logo`, `Header`, `Footer`, `PageHead`, `SectionHead`, `Eyebrow`), the evidence slots (`Figure`, `LogoRow`, `CaseStudyCard`, `Quote`, `PersonCard`, `TextSlot`) and the page sections, as `window.NexaHub`, for React 18 |

Upload them to the system as `project/components/bundle.css` and
`project/components/bundle.js`; the system's previews pick them up on the next load.
Its tokens, guidelines and previews are edited in the system itself.

## How it stays faithful

- The components are bundled from `src/` untouched. Only their surroundings are
  swapped for a preview card (`shims/`): React comes from the card's globals, and
  TanStack Router's `Link` is a plain anchor with the current path `/contact`.
- The `:root` token block is stripped: the system's `tokens.json` supplies those
  values. Since the calm redesign the site has one light theme and one accent —
  update `tokens.json` to match `:root` in `styles.css` (the old `build` theme
  and the `--hot` gradients are gone).
- The build fails rather than guesses if the `:root` token block moves, or if
  `Logo` stops loading `/logo-main.svg` (which is pointed at the system's
  uploaded copy).

A new exported component needs a line in `entry.ts`, a name in `CARDS` in
`build.ts`, and a preview card in the system.
