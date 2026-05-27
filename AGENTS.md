# Repository Guidelines

## Project Structure & Module Organization

This is a React Router v7 app backed by Cloudflare Workers. Frontend code lives in `app/`: routes in `app/routes`, reusable UI in `app/components`, client data access in `app/queries`, hooks in `app/hooks`, and shared frontend utilities in `app/lib`. Worker and server code lives in `workers/`, including Hono routing, Durable Objects, MCP, agent logic, database schema, and email helpers. Cross-runtime utilities are in `shared/`. Static assets belong in `public/`; `demo_app.png` is the README screenshot.

## Build, Test, and Development Commands

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the React Router development server.
- `npm run build`: build the app for production.
- `npm run preview`: build, then serve the production bundle locally with Vite.
- `npm run typecheck`: generate Cloudflare and React Router types, then run `tsc -b`.
- `npm run cf-typegen`: regenerate Wrangler environment types.
- `npm run deploy`: build and deploy with Wrangler.

Before deploying, configure `wrangler.jsonc` and create the R2 bucket described in `README.md`.

## Coding Style & Naming Conventions

Use TypeScript, ES modules, and React function components. Match the existing style: tabs for indentation, double quotes, semicolons, and trailing commas in multiline calls and objects. Use PascalCase for React components (`ComposePanel.tsx`), camelCase for functions and variables, and lowercase route filenames that mirror URL purpose (`search-results.tsx`). Prefer existing imports and aliases such as `~/services/api` over deep relative paths when available.

## Testing Guidelines

No dedicated test runner or test directory is currently configured. For changes today, run `npm run typecheck` and, when UI or routing changes are involved, verify behavior through `npm run dev`. If adding tests, colocate them near the changed module with `*.test.ts` or `*.test.tsx`, and add the runner command to `package.json`.

## Commit & Pull Request Guidelines

Git history is sparse, with short imperative summaries such as `Updated dependencies`. Keep commits concise and focused, for example `Add mailbox search parsing test` or `Fix attachment upload error`. Pull requests should describe the user-facing change, list validation performed, link related issues, and include screenshots for visible UI changes.

## Security & Configuration Tips

Do not commit secrets. Use `.dev.vars` locally and keep `.dev.vars.example` safe to share. Production access depends on Cloudflare Access secrets (`POLICY_AUD`, `TEAM_DOMAIN`) and the configured trust boundary described in `README.md`; review authorization impact before changing `/mcp`, mailbox, or email-sending code.
