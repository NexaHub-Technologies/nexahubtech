# Design-system bundle

`bun run design-system` builds the code files of the NexaHubTech design system
(the Design System artifact at https://claude.ai/artifact/RVdi5QXit3xgADcgoWvfoA)
from this repository, into `.design-system/` (git-ignored):

| file | what it is |
| --- | --- |
| `bundle.css` | `src/styles.css` compiled with Tailwind against `src/`, without the colour, spacing, radius and shadow values the system's `tokens.json` owns |
| `bundle.js` | `Logo`, `Eyebrow`, `ModeSwitch`, `Header`, `Footer`, `Preloader`, `SessionLoop` and `ModeProvider` as `window.NexaHub`, for React 18 |

Upload them to the system as `project/components/bundle.css` and
`project/components/bundle.js`; the system's previews pick them up on the next load.
Its tokens, guidelines and previews are edited in the system itself.

## How it stays faithful

- The components are bundled from `src/` untouched. Only their surroundings are
  swapped for a preview card (`shims/`): React comes from the card's globals,
  TanStack Router's `Link` is a plain anchor and the current path is `/`, and the
  mode starts from the card's theme and switches it instead of persisting.
- `:root[data-mode='build']` selectors become `[data-theme='build']`, the attribute
  the system's theme switch sets.
- The build fails rather than guesses if `styles.css`'s token blocks move, if a
  `data-mode` selector it does not cover appears, or if `Logo` stops loading
  `/logo-main.svg` (which is pointed at the system's uploaded copy).

A new exported component needs a line in `entry.ts`, a name in `CARDS` in
`build.ts`, and a preview card in the system.
