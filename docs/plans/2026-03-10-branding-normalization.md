# Free Invoice Kit Branding Normalization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove remaining outdated legacy branding from user-facing docs and QA artifacts while preserving repo/path identifiers.

**Architecture:** This is a documentation-first cleanup. The implementation updates a small set of files that still contain the old product name, then validates the repo with targeted searches to make sure only intentional technical identifiers remain.

**Tech Stack:** Markdown docs, plain text artifacts, `rg`

---

### Task 1: Add the branding decision record

**Files:**
- Create: `docs/plans/2026-03-10-branding-normalization-design.md`

**Step 1: Write the design note**

Document:
- final product name is `Free Invoice Kit`
- repo/path identifiers stay `quickbill`
- internal technical identifiers stay unchanged unless clearly user-facing

**Step 2: Verify the file exists**

Run: `test -f docs/plans/2026-03-10-branding-normalization-design.md`
Expected: exit code `0`

### Task 2: Update branding drift in handoff and planning docs

**Files:**
- Modify: `tmp-agent-prompt.txt`
- Modify: `docs/Playwright_local_test_handoff.md`
- Modify: `docs/Sprint1_Frontend_Design_Spec.md`
- Modify: `docs/Sprint1_Implementation_Plan.md`
- Modify: `docs/Phase1_Implementation_Plan.md`
- Modify: `docs/WhatsApp_Invoice_SaaS_Launch_Blueprint.md`

**Step 1: Replace visible product-name references**

Update:
- product name mentions
- watermark copy
- Pro messaging
- social/distribution examples
- QA expectations that still mention the previous product name

**Step 2: Leave technical identifiers alone**

Preserve:
- repo name `quickbill`
- working-directory paths containing `quickbill`
- package name and other internal identifiers unless user-visible

### Task 3: Verify the cleanup

**Files:**
- Check: repository-wide search results

**Step 1: Search for stale branding**

Run: `rg -n "QuickBill|Quick Bill" docs src README.md tmp-agent-prompt.txt`
Expected: no remaining user-facing legacy brand strings

**Step 2: Search for lowercase technical references**

Run: `rg -n "quickbill" docs src README.md package.json tmp-agent-prompt.txt`
Expected: remaining matches are repo/path/package or other intentional technical identifiers
