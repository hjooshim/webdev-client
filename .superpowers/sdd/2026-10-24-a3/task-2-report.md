# A3 Task 2 Report

## Delivered

- Completed the Lab 3 composition in book order with the existing Task 1 components, then classes, styles, client/server examples, three Add instances, three Square instances, three Highlight samples, path links, and the five-row todo list.
- Added the standalone TypeScript examples at `/labs/lab3/types`, including typed props, utility types, and an `unknown`-based narrowing example for the `any` discussion.
- Added the standalone client API examples at `/labs/lab3/client-apis`. Search-parameter consumers are wrapped in Suspense, browser globals are read after mount or from the user-click handler, geolocation does not request permission automatically, and remote fetch failures render messages.
- Added the standalone server API examples at `/labs/lab3/server-apis`, including request headers, guarded weather fetching, the temporary-file visit counter, and fixed-argument `node --version` execution.
- Added the children and wrapper examples at `/labs/lab3/children`, including the configurable box, box model layers, nesting-order example, and composed card.
- Added finite numeric path parameter handling with visible invalid-operand feedback, a mapped Labs TOC that preserves existing navigation and adds the external Book Ch3 link, and an output tracing include for real Lab 3 files used by the server filesystem demo.
- The only environment variable read by the demo is the named sample `LAB3_SERVER_MESSAGE`; no other environment values are rendered.

## Validation

- `npx eslint app/labs/TOC.tsx app/labs/lab3 next.config.ts` — passed with no warnings.
- `npx tsc --noEmit` — passed.
- `npm run build` — passed on Next.js 16.3.6. The build lists the `/labs/lab3/types`, `/labs/lab3/client-apis`, `/labs/lab3/children`, `/labs/lab3/server-apis`, and `/labs/lab3/add/[a]/[b]` routes.
- `node --test scripts/verify-a3.mjs` — 3 passed and 5 failed. The Lab 3 composition, arbitrary finite addition operands, and active TOC/external Book Ch3 checks passed. The five remaining dashboard/course/modules/assignments/roster checks are the known Task 3 baseline gaps.
- `git diff --check` — passed.
- Confirmed the generated Lab 3 HTML contains real files from `app/labs/lab3`, including `VariablesAndConstants.tsx`, and the server information includes `arch` and `pid`.

## Runtime

The production server started with `npm run start` is still running in exec session `2561` on port 3000 for the parent’s browser checks.
