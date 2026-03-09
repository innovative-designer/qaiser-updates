# Free Invoice Kit Branding Normalization Design

**Date:** 2026-03-10

## Goal

Normalize the remaining product-name drift so user-facing copy and project documentation consistently refer to the product as **Free Invoice Kit**, while preserving the existing GitHub repo name and other non-user-facing technical identifiers.

## Scope

- Update branding references in product and launch documentation.
- Update QA and handoff docs that still instruct reviewers to look for the previous product name.
- Update temporary workspace prompts that describe the app by the old name.

## Non-Goals

- Do not rename the GitHub repository, filesystem paths, or repo-derived working-directory examples.
- Do not migrate package names, database identifiers, or other internal technical strings unless they are clearly user-facing.
- Do not change product behavior, routing, or metadata that already says `Free Invoice Kit`.

## Approach

Use targeted copy updates rather than broad mechanical renames. This keeps technical examples like `quickbill` repo/path references intact, while converting visible brand mentions such as headers, watermark text, launch copy, Pro messaging, and social/distribution text to `Free Invoice Kit`.

## Validation

- Run a repository search for stale legacy brand strings.
- Confirm any remaining matches are intentional technical references or historical repo/path names.
- Review changed docs for wording that becomes awkward after the rename, especially `Free Invoice Kit Pro`, launch titles, and watermark examples.
