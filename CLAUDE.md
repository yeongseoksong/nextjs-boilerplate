# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Root (Turborepo — runs all workspaces)
pnpm dev          # turbo dev: starts all packages in watch/dev mode
pnpm build        # turbo build: builds framework first, then web
pnpm lint         # turbo lint: runs oxlint on web app

# Web app only
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web lint     # oxlint

# Framework package only
pnpm --filter framework build   # tsup → dist/
pnpm --filter framework dev     # tsup --watch
```

## Monorepo Structure

```
nextjs-boilerplate/
├── apps/web/               # Next.js 16 app
├── packages/framework/     # Shared UI library (private, not published)
├── turbo.json              # Build task orchestration
├── pnpm-workspace.yaml     # Workspace roots: apps/*, packages/framework
└── tsconfig.json           # Base TypeScript config (extended by all packages)
```

`turbo build` runs `framework/build` before `web/build` via `dependsOn: ["^build"]`.

## @framework/* Import Resolution

**In the monorepo**, `apps/web/tsconfig.json` paths bypass `dist/` and point directly to source:

```
@framework/ui    → packages/framework/ui/index.tsx
@framework/util  → packages/framework/util/index.ts
@framework/types → packages/framework/types/index.ts
```

**Standalone** (after `pnpm --filter framework build`), consumers resolve via `package.json` exports to `dist/`.

New exports require changes in three places: `tsup.config.ts` entry, `package.json` exports, and `apps/web/tsconfig.json` paths.

## packages/framework Architecture

Follows Atomic Design with `Sd` prefix on all design system components:

- `ui/atom/` — Base components: `SdButton`, `SdText`, `SdTitle`, `SdLogo`, `SdModal`, `SdQuote`, `SdTable`, `SdTabs`, `SdTimeline`
- `ui/molecule/` — Composite components: `SdTextBox`, `SdFeatures`, `SdSteps`
- `ui/organism/` — Full-page sections: `SdHeader`, `SdFooter`, `SdHeroCarousel`, `SdFeatureSection`, `SdTimelineSection`, `SdStepsSection`
- `ui/template/` — Page layouts: `MainLayout`, `PageLayout`
- `ui/theme.ts` — Full Mantine theme: color palette, typography (Noto Sans KR), spacing, shadows, component defaults, `other.logoSizes`
- `util/` — `text.util.ts` exports `t(text)` for `%c` → company name substitution; `sort.util.ts` exports `filterAndSort` but **is not re-exported from `util/index.ts`**
- `types/` — Shared interfaces (`NavItem`, `HeroSlide`, `FeatureItem`, `StepItem`, `TimelineEvent`, `CompanyInfo`) + `example.tsx` (sample data for dev/demo)

## Component Factory Pattern

All atom and molecule components use factory functions to create named variants on a single namespace:

```tsx
function createVariant(defaults: TextProps) {
  return ({ children, ...props }: TextProps) => (
    <MantineText {...defaults} {...props}>{children}</MantineText>
  );
}
export const SdText = {
  Strong:  createVariant({ fw: 700, c: "slate.9", lts: "-0.04em" }),
  Body:    createVariant({ fw: 400, c: "slate.7", lh: 1.7 }),
  Sub:     createVariant({ fw: 400, c: "slate.5", fz: "xs" }),
  Eyebrow: createVariant({ fw: 700, c: "primary.6", fz: "xs", tt: "uppercase", lts: "0.12em" }),
  Numeric: createVariant({ fw: 700, c: "slate.8", fvs: "tabular-nums", lts: "-0.04em" }),
  Error:   createVariant({ fw: 400, c: "red.6", fz: "sm" }),
  Hint:    createVariant({ fw: 400, c: "slate.4", fz: "xs", lh: 1.5 }),
};
```

The same pattern applies to `SdTitle` (Display/Section/Card/Sub), `SdButton` (Primary/Outline/Ghost/White), `SdTextBox` (Hero/Section/Card/Sub), `SdTabs` (Pills/Underline/Outline), `SdTable` (default + Spec), `SdSteps` (Bubble/Card/Strip), and `SdQuote` (Plain/Card).

All UI components are Client Components — tsup adds `"use client"` banner to the UI bundle only.

## SdText & SdTitle Variants

**SdText** (pass-through to Mantine `Text`):

| Variant | fw | c | fz | Notes |
|---|---|---|---|---|
| Strong | 700 | slate.9 | md | lts: -0.04em |
| Body | 400 | slate.7 | md | lh: 1.7 |
| Sub | 400 | slate.5 | xs | lh: 1.6 |
| Eyebrow | 700 | primary.6 | xs | uppercase, lts: 0.12em |
| Numeric | 700 | slate.8 | md | tabular-nums, lts: -0.04em |
| Error | 400 | red.6 | sm | |
| Hint | 400 | slate.4 | xs | lh: 1.5 |

**SdTitle** (pass-through to Mantine `Title`):

| Variant | order | Usage |
|---|---|---|
| Display | 2 | Hero section headings |
| Section | 3 | Section titles |
| Card | 4 | Card/modal titles |
| Sub | 5 | Subtitles |

Both `SdText` and `SdTitle` variants automatically apply `t()` to their children, substituting `%c` with the configured company name.

## Color & Typography Rules

**Never set inline `fz=` or `fw=` props on `SdText` variants** — each variant encodes those as its typographic identity. Overriding them defeats the design system standard.

**Inline `c=` overrides** are allowed only when a component genuinely needs a one-off contextual value not covered by the design system (e.g., `c="white"` on a primary-colored background). Otherwise, prefer adding a new `SdText` variant or updating `theme.ts` component defaults.

All colors originate from:
1. `SdText`/`SdTitle` variant defaults
2. Mantine component defaults in `theme.ts` (e.g., `Anchor → primary.6`)

## tsup Build Config

Two separate build passes in `tsup.config.ts`:
1. `ui/index` — with `banner: { js: '"use client";' }`, externals include `next`
2. `util/index` + `types/index` — no banner, only `react` external

Both emit ESM (`.mjs`) + CJS (`.js`) + type declarations (`.d.ts`/`.d.mts`).

`packages/framework/tsconfig.json` uses `moduleResolution: "node"` (not `"bundler"`) to correctly resolve Mantine's `.d.ts` type entry points, and `ignoreDeprecations: "6.0"` to suppress a tsup-internal `baseUrl` warning under TypeScript 6.

## Key Tech Versions

| Package | Version |
|---|---|
| pnpm | 10.11.0 |
| Next.js | 16.2.2 |
| React | 19.2.4 |
| TypeScript | 6.0.2 |
| Mantine | 9.2.2 |
| tsup | latest (8.x) |
| Linter | oxlint |
