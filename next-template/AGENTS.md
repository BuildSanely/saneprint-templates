<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project guardrails

Before changing code, inspect the nearest existing implementation and the
relevant components in `src/features/core`. Treat the codebase, `/styleguide`,
and `src/app/globals.css` as the source of truth for architecture and design.

- Reuse existing core components before creating new primitives.
- Use semantic design tokens and existing utilities. Do not hardcode colors,
  add arbitrary Tailwind values, use inline styles, or embed raw SVG icons.
- Keep code inside the appropriate feature. Import another feature through its
  public `index.ts` API; do not reach into its internals.
- Keep request logic in services or data hooks, not components.
- Read environment values through `src/config/client-env.ts` or
  `src/config/server-env.ts`; do not access `process.env` elsewhere.
- Use the established libraries and patterns already present in the project.
  Do not introduce a parallel component system, state layer, API client, icon
  library, or folder convention without an explicit requirement.
- Preserve accessibility, loading, empty, error, and disabled states when
  changing interactive UI.

Run `npm run quality:check` before considering the work complete. Fix the
implementation when a guardrail fails; do not disable, weaken, or bypass a rule
unless the user explicitly asks to change that rule.
