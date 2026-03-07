# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Format:** `pnpm exec prettier --write .`

## Tech Stack

- **Framework:** Next.js 16 (App Router, React 19)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (via PostCSS plugin, config in `globals.css`)
- **UI Components:** shadcn/ui v4 (radix-nova style, lucide icons)
- **PDF Generation:** @react-pdf/renderer
- **Client Storage:** IndexedDB via `idb`
- **IDs:** nanoid
- **Analytics:** PostHog (optional, via env vars `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST`)
- **Package manager:** pnpm

## Architecture

- `src/app/` — Next.js App Router pages and layouts. Server components by default.
- `src/components/ui/` — shadcn/ui primitives (button, card, dialog, input, select, table, etc.)
- `src/components/` — App-level components (e.g., `posthog-pageview.tsx`)
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `src/hooks/` — Custom React hooks (alias `@/hooks`)

Path alias: `@/*` maps to `./src/*`

## Conventions

- **Formatting:** Prettier with single quotes, semicolons, trailing commas (es5), 100 char width, tailwindcss plugin for class sorting
- **Linting:** ESLint flat config with next/core-web-vitals and next/typescript
- **shadcn/ui:** Add components via `pnpm dlx shadcn@latest add <component>`. RSC-compatible. CSS variables for theming (oklch color space).
- **Dark mode:** Uses `.dark` class strategy (`@custom-variant dark (&:is(.dark *))`)
