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
├── apps/web/               # 컴포넌트 카탈로그 (Next.js 16, GitHub Pages 정적 배포)
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

- `ui/atom/` — Base components: `SdButton`, `SdText`, `SdTitle`, `SdLogo`, `SdModal`, `SdQuote`, `SdTable`, `SdTabs`, `SdTimeline`, `SdContainer`, `SdNumberIcon`, `SdBadge`, `SdInput`, `SdLink`
- `ui/molecule/` — Composite components: `SdTextBox`, `SdFeatures`, `SdSteps`, `SdTestimonial`, `SdPricingCard`, `SdFaq`, `SdCta`, `SdSolution`, `SdSolutionCard`, `SdClients`, `SdMap`
- `ui/organism/` — Full-page sections: `SdHeader`, `SdFooter`, `HeroCarousel`, `SdFeatureSection`, `SdTimelineSection`, `SdStepsSection`, `SdErrorView`
- `ui/template/` — Page layouts: `MainLayout`, `PageLayout`
- `ui/theme.ts` — Full Mantine theme: color palette, typography (Noto Sans KR), spacing, shadows, component defaults, `other.logoSizes`
- `util/` — `env.util.ts` reads consumer-injected `NEXT_PUBLIC_*` constants; `text.util.ts` exports `t(text)` for `%c` → company name substitution; `sort.util.ts` exports `filterAndSort` but **is not re-exported from `util/index.ts`**
- `types/` — Shared interfaces only. Demo data lives in `apps/web/data/index.tsx` (the consumer owns its own content).

## Consumer Config Injection

Consumer-specific constants are injected via `NEXT_PUBLIC_*` env vars, read in `util/env.util.ts`:

| Variable | Required | Default | Used by |
|---|---|---|---|
| `NEXT_PUBLIC_COMPANY_NAME` | yes | — | `t()` → `SdText` / `SdTitle` `%c` substitution |
| `NEXT_PUBLIC_LOGO_SRC` | no | `/logo.svg` | `SdLogo` |
| `NEXT_PUBLIC_LOGO_ALT` | no | `로고` | `SdLogo` |

Env vars are used rather than a React Context because `t()` is called inside `SdText`/`SdTitle`, which are server components in the monorepo path (only 15 of 36 UI files carry `"use client"` in source, while tsup's banner makes all of them client in `dist/`). A Context would require marking the whole `ui/` tree `"use client"`, since the factory pattern makes server modules dot into `SdText.Body` / `SdTitle[variant]` in 16 files — and dotting into a client module from a server component throws.

Env vars also sidestep the dual-bundle problem that made the old `setCompanyName()` setter a silent no-op: tsup inlines `text.util.ts` into `dist/ui` with its own module state, so a setter called via `/util` never reached the components. Bundlers replace `process.env.NEXT_PUBLIC_*` with the same literal in both bundles.

Access must be the full `process.env.NEXT_PUBLIC_X` expression — destructuring defeats static replacement. `env.util.ts` declares a module-scoped `process` type rather than depending on `@types/node`, which would pull Node globals into a browser-targeted library.

Array/object config (`navItems`, `companyInfo`) cannot go in env vars and stays as props on `MainLayout`.

Required-var validation lives in `apps/web/env.mjs`, imported by `next.config.mjs` — Next loads `.env*` before the config, so a missing var stops dev/build immediately.

## apps/web — Component Catalog

`apps/web` is a component catalog deployed to GitHub Pages, not a product site.

```
app/page.tsx                    개요 · 설치 · 환경변수 · flat export 규칙
app/components/{atom,molecule,organism}/
    page.tsx                    Server Component — metadata만 export
    *Catalog.tsx                "use client" — 실제 데모
app/_catalog/Showcase.tsx       Showcase / Variant / CodeBlock 프리미티브
app/_catalog/nav.ts             사이트 네비게이션 (data/index.tsx의 navItems와 별개)
```

`page.tsx`를 Server Component로 두고 데모를 client 파일로 분리한 이유는, client 페이지에서는 `export const metadata`가 동작하지 않기 때문이다. 이 구조 덕에 페이지별 metadata를 유지하면서 데모에서 훅과 네임스페이스 dot 접근을 쓸 수 있다.

### ⚠️ 카탈로그는 UI의 거울 — 항상 함께 갱신

`packages/framework/ui`를 수정하면 **같은 변경 단위 안에서** `apps/web`의 카탈로그도 반드시 갱신한다. 카탈로그가 곧 이 라이브러리의 문서이자 배포 경로 검증(서버 컴포넌트에서 flat export가 실제로 도는지)이므로, 뒤처지면 문서가 거짓말이 되고 회귀를 놓친다.

UI 변경 종류별로 반영할 곳:

| UI 변경 | 카탈로그 반영 |
|---|---|
| variant 추가/삭제/이름변경 | 해당 `*Catalog.tsx`의 `<Showcase>` + `exports={[...]}` 목록 |
| 새 컴포넌트 추가 | 계층에 맞는 `*Catalog.tsx`에 `<Showcase>` 블록 신설 |
| props 시그니처 변경 | 데모의 해당 props 사용부 |
| 기본 라벨·기본값 변경 | 데모에서 그 기본값이 드러나도록 (예: `<SdButton.Submit />` 라벨 생략) |
| 컴포넌트 제거 | `*Catalog.tsx`에서 `<Showcase>` 제거 + import 정리 |

문서 3곳도 같이 맞춘다: 이 파일의 Component Factory Pattern 표, `packages/framework/README.md`의 flat export 표와 사용 예시.

검증: `pnpm --filter framework build && pnpm --filter web build`. 카탈로그가 실제 배포 번들(`dist/ui`, flat export)을 소비하진 않지만 소스 기준 커버리지·타입은 이걸로 확인된다. flat export 커버리지는 아래 한 줄로 감사한다 — 네임스페이스 키마다 대응 `Sd<NS><Variant>` export가 있는지 검사(§Namespace dot access 참고).

### GitHub Pages 제약

`next.config.mjs`가 `output: "export"` + `trailingSlash: true` + `images.unoptimized`로 동작한다. 프로젝트 페이지는 `/<repo>/` 아래에 서빙되므로 `NEXT_PUBLIC_BASE_PATH`가 필요하고, 워크플로(`.github/workflows/deploy-catalog.yml`)가 주입한다.

Next가 basePath를 **자동으로 붙여주지 않는** 두 곳은 직접 처리해야 한다:

1. **`images.unoptimized`의 `<img src>`** — `NEXT_PUBLIC_LOGO_SRC`에 prefix를 포함시킨다.
2. **`SdHeader`의 링크** — Mantine `Anchor`(순수 `<a>`)로 렌더되므로 `app/_catalog/nav.ts`에서 href에 prefix를 붙인다. `next/link`로 바꾸면 불필요해진다.

`public/.nojekyll`이 있어야 `_next/`가 Jekyll에 의해 무시되지 않는다.

### Shared Types (`types/index.ts`)

| Interface | extends | 용도 |
|---|---|---|
| `CommonInfo` | — | 공통 메타(id, order, isShow, timestamps) |
| `NavItem` | CommonInfo | 네비게이션 메뉴 |
| `HeroSlide` | CommonInfo | 히어로 캐러셀 슬라이드 |
| `FeatureItem` | CommonInfo | 기능 카드 |
| `TimelineEvent` | CommonInfo | 연혁 타임라인 |
| `SolutionItem` | CommonInfo | 솔루션 카드 (category, icon, href) |
| `StepItem` | — | 단계별 안내 |
| `TestimonialItem` | — | 고객 후기 |
| `PricingFeature` | — | 요금제 항목(text, included) |
| `PricingItem` | — | 요금제 플랜 |
| `FaqItem` | — | FAQ |
| `ClientItem` | — | 고객사 로고(name, url, logo) |
| `CompanyAddress` | — | 회사 주소(label, address, order, embbedUrl?) |
| `SocialItem` | — | 소셜 링크(platform, url, label?) — `SocialPlatform` union |
| `CompanyInfo` | — | 회사 정보 전체 (주소·연락처 + `socials?`) |

**타입 배치 원칙:** 여러 컴포넌트가 공유하는 데이터 타입 → `types/index.ts`. 해당 컴포넌트만 쓰는 props 타입 → 컴포넌트 파일 내 인라인(미export).

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

The same pattern applies to:

| Component | Variants |
|---|---|
| `SdTitle` | Display / Section / Card / Sub |
| `SdButton` | Primary / Secondary / Outline / Ghost / White / **Submit** / **Delete** / **Cancel** / **Excel** / **Download** |
| `SdTextBox` | Hero / Section / Card / Sub |
| `SdTabs` | Pills / Underline / Outline |
| `SdTable` | default + Spec |
| `SdSteps` | Bubble / Card / Strip |
| `SdQuote` | Plain / Card |
| `SdBadge` | Default / Primary / Success / Warning |
| `SdLink` | Strong / Body / Sub / Hint |
| `SdTestimonial` | Card / Strip / Grid |
| `SdPricingCard` | default + Grid |
| `SdFaq` | default + WithHeader |
| `SdCta` | Subtle / Inline |
| `SdSolution` | Filtered / List |
| `SdSolutionCard` | Item / Grid |
| `SdClients` | Grid / Marquee |
| `SdMap` | Single / Tabs |
| `SdErrorView` | Page / NotFound |

All UI components are Client Components — tsup adds `"use client"` banner to the UI bundle only.

### Namespace dot access is forbidden in Server Components

Because the banner makes all of `dist/ui` a client module, a Server Component importing it receives **client reference proxies**, not real objects. Dotting into a namespace returns `undefined`:

```tsx
// ❌ Server Component — renders <undefined>, fails with
//    "Element type is invalid: expected a string ... got: undefined"
import { SdText } from "@yeongseoksong/framework/ui";
<SdText.Body>…</SdText.Body>

// ✅ flat export
import { SdTextBody } from "@yeongseoksong/framework/ui";
<SdTextBody>…</SdTextBody>
```

This only bites through the published package — `apps/web` maps `@framework/*` to source, where no banner exists, so namespace access works locally and breaks after publish. **Verify UI changes against `dist`, not just source.**

Every variant therefore has a flat `Sd<Namespace><Variant>` export alongside the namespace (`SdTextBody`, `SdTitleSection`, `SdErrorViewPage`, `SdTableSpec`, …). When adding a variant, add its flat export in the same file. The namespace form stays valid inside Client Components.

`SdModal` is exempt — it requires `opened`/`onClose` state, so it can only be used from a Client Component anyway.

## Next.js Special Files

| 파일 | 위치 | 역할 |
|---|---|---|
| `global-error.tsx` | `app/` 루트 고정 | 루트 layout 오류 — `MantineProvider` 직접 복원 |
| `not-found.tsx` | `app/` 루트 고정 | 전역 404 |
| `error.tsx` | `app/` | 페이지 렌더 오류 |

`SdErrorView.Page` / `SdErrorView.NotFound` organism을 thin wrapper로 사용. UI 로직은 organism에 집중, app/ 파일은 Next.js 어댑터 역할만 담당.

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
