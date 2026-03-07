# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` contains Next.js App Router entry points, layouts, and `globals.css`; pages are server components by default.
- `src/components/` holds app-specific components such as `posthog-pageview.tsx`.
- `src/components/ui/` stores shadcn/ui primitives; reuse these before creating new base components.
- `src/lib/` is for shared helpers like `cn()` in `utils.ts`.
- `public/` serves static assets. Use the `@/*` alias for internal imports from `src/`.

## Build, Test, and Development Commands
- `pnpm dev` starts the local development server on `http://localhost:3000`.
- `pnpm build` creates the production build and surfaces route, type, and config issues.
- `pnpm start` runs the built app for a quick production smoke test.
- `pnpm lint` runs ESLint with Next.js Core Web Vitals and TypeScript rules.
- `pnpm exec prettier --write .` formats the repo and sorts Tailwind classes.

## Coding Style & Naming Conventions
- Write strict TypeScript and prefer explicit props and utility types over `any`.
- Follow Prettier defaults in this repo: 2-space indentation, single quotes, semicolons, trailing commas, and 100-character lines.
- Use PascalCase for React component names, and keep filenames lowercase or kebab-case where that matches Next.js or existing patterns, for example `page.tsx` and `posthog-pageview.tsx`.
- Keep Tailwind utility classes in JSX, shared helpers in `src/lib/`, and UI primitives inside `src/components/ui/`.

## Testing Guidelines
- No dedicated test runner or coverage threshold is configured yet.
- Treat `pnpm lint` and `pnpm build` as the current required checks before opening a PR.
- If you add automated tests, name them `*.test.ts` or `*.test.tsx`, place them next to the feature or in a nearby `__tests__/` folder, and document the run command in the PR.

## Commit & Pull Request Guidelines
- Follow the Git history’s Conventional Commit style: `feat:`, `fix:`, and `chore:` with short, imperative summaries.
- Keep PRs focused and include a clear description, linked issue or task, validation steps, and screenshots or GIFs for UI changes.
- Mention any new environment variables or analytics changes explicitly.

## Security & Configuration Tips
- PostHog is optional and uses `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`; never commit secrets or sample production values.
- Review changes to `src/app/layout.tsx` and `src/components/posthog-pageview.tsx` carefully when touching analytics behavior.
