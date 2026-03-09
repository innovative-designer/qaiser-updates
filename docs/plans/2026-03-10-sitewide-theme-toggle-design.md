# Sitewide Theme Toggle Design

**Date:** 2026-03-10

## Goal

Add a sitewide light/dark theme toggle to Free Invoice Kit that feels native to the existing Editorial Utility design system and works consistently across marketing, app, history, and blog pages.

## Product Decision

The theme switch applies to the entire site rather than only `/create` and `/history`.

This keeps behavior predictable:
- the shared header controls the same thing on every route
- users do not cross from a dark app surface into a forced-light marketing page
- the brand language stays coherent across product and content surfaces

## Interaction Design

- Place the control in the shared header beside the existing navigation actions.
- Use an icon-led toggle with sun/moon states and a moving thumb so the state is immediately obvious without extra text.
- Persist theme selection with `next-themes`.
- Respect system preference on first visit.
- Maintain 44px+ tap targets, visible focus rings, and an explicit `aria-label`.

## Visual Direction

The dark mode should not collapse into generic grayscale. It should preserve the app’s warm editorial feel with:
- deep ink/navy backgrounds
- slightly warm dark cards
- cobalt primary accents preserved for CTAs
- muted mint support accents
- elevated “paper” surfaces that remain readable rather than harshly inverted

## Technical Approach

- Remove the forced-light configuration in the root theme provider.
- Add a client `ThemeToggle` component in the shared header.
- Refine global `.dark` tokens in `globals.css`.
- Patch the highest-traffic pages and shared surfaces that currently hardcode light-only white cards/gradients so text contrast remains correct in dark mode.

## Validation

- Toggle works on `/`, `/create`, `/history`, `/blog`, and a representative SEO page.
- Theme persists across reloads.
- No hydration mismatch from theme-dependent icon rendering.
- Core shared surfaces remain readable in both themes.
