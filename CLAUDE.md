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

Follows Atomic Design:

- `ui/atom/` — Base components (`SdButton`, `SdText`, `SdTitle`, `SdLogo`) wrapping Mantine with design system defaults
- `ui/organism/` — Composite components (`SdHeader`, `SdFooter`, `SdTextBox`, `SdHeroCarousel`)
- `ui/Templates/` — Page layouts (`MainLayout`, `PageLayout`) using Mantine `AppShell`
- `ui/theme.ts` — Full Mantine theme: color palette, typography (Noto Sans KR), spacing, shadows, component defaults, `other.logoSizes`
- `util/` — `text.util.ts` exports `t(text)` for `%c` → company name substitution, barrel via `index.ts`
- `types/` — Shared interfaces (`NavItem`, `HeroSlide`), barrel via `index.ts`

**Component patterns used:**
- Factory functions to create variants (e.g., `SdButton.Primary`, `SdButton.Outline`)
- All UI components are Client Components — tsup adds `"use client"` banner to the UI bundle only

**Color rule — never set inline `c=` props.** All colors come from two sources:
- `SdText` variants carry their own defaults (`Strong: slate.9`, `Body: slate.7`, `Sub: slate.5`)
- Mantine component defaults in `theme.ts` (e.g., `Anchor → primary.6`)

Only override color when a component genuinely needs a one-off value not covered by the design system. Prefer adding a new `SdText` variant or updating `theme.ts` component defaults instead.

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
