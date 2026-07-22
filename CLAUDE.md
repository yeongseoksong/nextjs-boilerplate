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
│   └── store/              # Zustand 스토어 — 독립 entry (@yeongseoksong/framework/store)
├── turbo.json              # Build task orchestration
├── pnpm-workspace.yaml     # Workspace roots: apps/*, packages/framework
└── tsconfig.json           # Base TypeScript config (extended by all packages)
```

`turbo build` runs `framework/build` before `web/build` via `dependsOn: ["^build"]`.

## @framework/* Import Resolution

**In the monorepo**, `apps/web/tsconfig.json` paths bypass `dist/` and point directly to source:

```
@framework/ui    → packages/framework/ui/index.tsx
@framework/store → packages/framework/store/index.ts
@framework/util  → packages/framework/util/index.ts
@framework/types → packages/framework/types/index.ts
```

**Standalone** (after `pnpm --filter framework build`), consumers resolve via `package.json` exports to `dist/`.

New exports require changes in three places: `tsup.config.ts` entry, `package.json` exports, and `apps/web/tsconfig.json` paths.

## packages/framework Architecture

Follows Atomic Design with `Sd` prefix on all design system components:

- `ui/atom/` — Base components: `SdButton`, `SdText`, `SdTitle`, `SdLogo`, `SdModal`, `SdQuote`, `SdTable`, `SdTabs`, `SdTimeline`, `SdContainer`, `SdNumberIcon`, `SdBadge`, `SdInput`(Mantine 입력 한 벌 — 텍스트·숫자·선택·불리언·파일/색상 + `@mantine/dates` 날짜/시각. 라벨 프로퍼티가 없는 Slider·Rating·Segmented·PinCode는 `Input.Wrapper`로 감싸 API를 통일), `SdLink`, `SdToast`(컴포넌트가 아니라 `notifications.show()`를 감싼 함수 네임스페이스 + `SdToastProvider`)
- `ui/molecule/` — Composite components: `SdTextBox`, `SdFeatures`, `SdSteps`, `SdTestimonial`, `SdPricingCard`, `SdFaq`, `SdCta`, `SdSolution`, `SdSolutionCard`, `SdClients`, `SdMap`
- `ui/organism/` — Full-page sections: `SdHeader`(`parentId` 2단 — `Mega`(기본)는 hover/focus 시 헤더가 확장되며 하위 링크가 상위 항목 아래 컬럼으로 노출, `Simple`은 바 높이를 고정한 채 상위 항목마다 Mantine `Menu`가 붙는 개별 드롭다운, 모바일은 둘 다 `NavLink` 아코디언), `SdFooter`, `HeroCarousel`, `SdFeatureSection`, `SdTimelineSection`, `SdStepsSection`, `SdErrorView`, `SdResult`(작업 결과 화면 — 성공/실패), `SdLoginView`(`Card` 중앙 카드 / `Split` 좌측 브랜드 패널 + 우측 폼 — 비제어 폼이라 `onSubmit`이 `{ email, password, remember }`를 넘긴다)
- `ui/template/` — Page layouts: `MainLayout`, `PageLayout`
- `ui/typography.ts` — `textStyles` 토큰(fw·c·fz·style). `SdText`와 `SdLink`가 공유하는 유일한 출처이며(`SdLink.X`는 `href`가 없으면 같은 강조도의 `SdText.X`로 폴백한다 — `NavItem.href`가 선택이라 호출부의 삼항을 없애기 위함), `SdLink`는 여기에 `underline: 'never'` 같은 링크 전용 프로퍼티만 `Object.assign`으로 얹는다 (`AnchorProps`가 `TextProps`를 포함하므로 토큰 하나로 양쪽이 통한다). 변형 값 수정은 이 파일에서만.
- `ui/surface.ts` — `brandSurface`(slate 바탕 + primary radial 광원) · `brandDotTexture`. `PageLayout.Brand` 히어로와 `SdLoginView.Split` 좌측 패널이 공유하는 어두운 브랜드 면의 유일한 출처.
- `ui/theme.ts` — Full Mantine theme: color palette, typography (Noto Sans KR), spacing, shadows, component defaults, `other.logoSizes`
- `ui/style.util.ts` — `toCssColor()`. Mantine 컬러 토큰("slate.4")을 `var(--mantine-color-slate-4)`로 바꾸는 헬퍼. `--mantine-color-*` 네이밍이 Mantine 규약이라 UI 레이어 전용이며, `util/`의 나머지처럼 Mantine 없이 쓸 수 있는 순수 유틸이 아니므로 `/util` 공개 경로로 내보내지 않는다. 현재 `SdLink`(hover 시 색 복원용)만 소비.
- `util/` — 여기 있는 모든 것은 React/Mantine 없이도 동작하는 순수 함수다(공개 `/util` 경로로 나가는 것과 일치). `env.util.ts` reads consumer-injected `NEXT_PUBLIC_*` constants; `text.util.ts` exports `t(text)` for `%c` → company name substitution; `josa.util.ts` — 한글 조사 순수 유틸(`josa`/`withJosa`/`fixJosa`/`hasFinalConsonant`). 받침 판정은 한글 종성 + 숫자·알파벳 읽는 소리까지 보며, `으로/로`만 ㄹ 받침을 받침 없음처럼 다룬다. `t()`는 `fixJosa`를 자동 호출하지 **않는다** — 필요한 문자열에서만 감싼다; `finalize.util.ts` — `Finalizer`/`Finalizers`/`runFinalizers`(§State Management 참고); `sort.util.ts` exports `filterAndSort` (`isShow` 필터 + `order` 정렬, `CommonInfo` 상속 타입 공용). **새 util을 추가할 때 기준**: Mantine·DOM·React 훅 없이 쓸 수 있으면 `util/`, 그렇지 않고 특정 UI 컴포넌트만을 위한 것이면 그 컴포넌트 옆이나 `ui/*.util.ts`(현재 `style.util.ts`가 유일한 예)에 둔다.
- `types/` — Shared interfaces only. Demo data lives in `apps/web/data/index.tsx` (the consumer owns its own content).

## State Management — Zustand

전역 클라이언트 상태는 **Zustand**로 표준화한다. Provider가 없어 `MantineProvider`/`SdToastProvider` 위에 계층을 더 얹지 않고, `persist`가 내장이라 세션 유지에 추가 의존성이 없다. (Jotai는 스토어 2개 규모에 atom 파편화 비용이 크고, Redux Toolkit은 UI 라이브러리가 소비자에게 강제하기엔 무겁다. 서버 데이터 캐싱은 직교하는 문제라 필요해지면 TanStack Query를 **병행** 도입한다.)

| 스토어         | 파일                     | 담는 것                                                        |
| -------------- | ------------------------ | -------------------------------------------------------------- |
| `useAuthStore` | `store/auth.store.ts`    | `user` · `isAuthenticated` · `login()` / `logout()`, localStorage 영속 |
| `useUiStore`   | `store/ui.store.ts`      | `globalLoading` · `sideNavOpened` — 화면 간 공유가 필요한 UI 상태 |
| `useSdForm`    | `store/form.state.ts`    | 모든 폼 공용 — 값·필드 에러·`submitting`과 제출 파이프라인. `formRules` 검증 규칙 동봉 |

**폼은 `useSdForm` 하나로 통일한다.** 폼마다 `useState`로 값·에러·제출중을 따로 들면 제출 처리가 조금씩 달라지므로, 검증 → 중복 제출 차단 → 전송 → 성공/실패 `SdToast` → `resetOnSuccess`/`onSuccess`/`onError` → `finalize`까지를 훅 안에 고정했다. 상태는 `formId`로 칸을 나눠 스토어에 두므로 같은 id를 쓰는 컴포넌트끼리 상태를 공유한다(마법사 단계 분리, 페이지 이동 후 입력값 복원). 입력에는 `{...form.getInputProps('name')}`, 체크박스·스위치는 `{ type: 'checkbox' }`를 넘긴다. Mantine 입력은 onChange로 **이벤트를 주는 것**(TextInput·Checkbox)과 **값을 주는 것**(Select·NumberInput·Slider·DateInput)으로 갈리는데, `readChangePayload()`가 그 차이를 흡수하므로 호출부는 어느 입력이든 같은 한 줄이다. `form.state.ts`가 `ui/atom/Toast`를 import하는 건 같은 `ui` 번들 안이라 순환이 없다.

**`store/`는 `@yeongseoksong/framework/store`라는 독립된 진입점이다** (`tsup.config.ts`에 `store/index` 별도 빌드 패스, `package.json`의 `exports["./store"]`, `apps/web/tsconfig.json`의 `@framework/store`). 소비자는 `import { useAuthStore } from '@yeongseoksong/framework/store'`로 가져간다.

이게 안전한 이유는 **`ui/index.tsx`가 스토어를 재수출하지 않기 때문**이다. tsup(esbuild)은 상대 경로 import를 만나면 그 모듈을 인라인 복사한다 — 만약 `ui`가 `export * from '../store'`를 했다면 스토어 코드가 `dist/ui`와 `dist/store` 두 번들에 각각 있게 되고 `create()`도 두 번 호출되어, 소비자가 `/store`에서 가져온 스토어와 어떤 `ui` 컴포넌트가 내부에서 쓰는 스토어가 서로 다른 인스턴스가 된다 — `setCompanyName()`이 조용히 no-op이던 것과 같은 dual-bundle 모듈 상태 분열이다. 그래서 **지금 `ui/` 안의 어떤 컴포넌트도 스토어를 직접 import하지 않는다** — 이 불변식이 깨지면(예: `SdHeader`가 나중에 `useAuthStore`를 내부에서 읽도록 바뀌면) 스토어도 `ui`의 자체 entry로 다시 인라인해야 한다. `form.state.ts → ui/atom/Toast`처럼 반대 방향(store가 ui를 가져오는 것)은 문제없다 — Toast는 상태 없는 얇은 래퍼라 두 번들에 복사돼도 안전하다. 검증은 `dist/ui/index.mjs`에 `zustand`/스토어 코드가 0번, `dist/store/index.mjs`에 스토어별로 `create()`가 정확히 한 번씩 나오는지로 한다. 카탈로그(`apps/web/app/state/StateCatalog.tsx`)도 이 세 훅을 `@framework/ui`가 아니라 `@framework/store`에서 가져온다 — `Showcase`의 `from` prop이 코드 예시의 import 경로를 결정한다(기본값 `/ui`).

`useAuthStore`는 `skipHydration: true`다. 자동 복원은 모듈 평가 시점에 일어나 첫 클라이언트 렌더가 이미 로그인 상태가 되는데, 서버 HTML(`output: "export"`면 빌드 시점 고정)은 항상 로그아웃이라 하이드레이션이 어긋난다. 복원은 `useAuthHydrated()`가 이펙트에서 한 번만 트리거하며, 이 훅이 `false`를 주는 동안 로그인 의존 UI는 **로그아웃 상태로** 그려야 한다. 토큰은 스토어에 넣지 않는다(`partialize`가 프로필만 저장).

**`finalize`는 폼 전용이 아니다.** 타입(`Finalizer` / `Finalizers`)과 실행기(`runFinalizers`)는 `util/finalize.util.ts`에 있고 `/util`로도 나간다 — 라우팅·모달 닫기·목록 새로고침처럼 "끝나면 정리한다"가 필요한 다른 스토어·액션도 같은 규약을 쓴다. 인자를 받지 않으므로 기존 함수(`closeModal`, `refetch`)를 그대로 꽂고, 여러 개는 배열로 순서대로 돈다. 결과에 따라 갈라지는 일은 `onSuccess`/`onError` 몫이다. `submitting`을 내린 **뒤에** 실행되며, 여기서 난 예외는 본 작업 결과를 뒤집지 않고 콘솔에만 남는다. (util은 stateless라 ui 번들에 인라인 복사돼도 안전하다 — 모듈 상태가 있는 스토어와 다른 점이다.)

`SdHeader`의 모바일 드로어는 의도적으로 `useUiStore`를 쓰지 않는다 — 한 페이지에 헤더가 둘 이상 렌더되면 드로어가 함께 열리므로 인스턴스 로컬(`useDisclosure`)로 남긴다.

## Consumer Config Injection

Consumer-specific constants are injected via `NEXT_PUBLIC_*` env vars, read in `util/env.util.ts`:

| Variable                   | Required | Default     | Used by                                        |
| -------------------------- | -------- | ----------- | ---------------------------------------------- |
| `NEXT_PUBLIC_COMPANY_NAME` | yes      | —           | `t()` → `SdText` / `SdTitle` `%c` substitution |
| `NEXT_PUBLIC_LOGO_SRC`     | no       | `/logo.svg` | `SdLogo`                                       |
| `NEXT_PUBLIC_LOGO_ALT`     | no       | `로고`      | `SdLogo`                                       |

Env vars are used rather than a React Context because `t()` is called inside `SdText`/`SdTitle`, which are server components in the monorepo path (only 15 of 36 UI files carry `"use client"` in source, while tsup's banner makes all of them client in `dist/`). A Context would require marking the whole `ui/` tree `"use client"`, since the factory pattern makes server modules dot into `SdText.Body` / `SdTitle[variant]` in 16 files — and dotting into a client module from a server component throws.

Env vars also sidestep the dual-bundle problem that made the old `setCompanyName()` setter a silent no-op: tsup inlines `text.util.ts` into `dist/ui` with its own module state, so a setter called via `/util` never reached the components. Bundlers replace `process.env.NEXT_PUBLIC_*` with the same literal in both bundles.

Access must be the full `process.env.NEXT_PUBLIC_X` expression — destructuring defeats static replacement. `env.util.ts` declares a module-scoped `process` type rather than depending on `@types/node`, which would pull Node globals into a browser-targeted library.

Array/object config (`navItems`, `companyInfo`) cannot go in env vars and stays as props on `MainLayout`. 헤더 변형도 `MainLayout`의 `headerVariant?: 'mega' | 'simple'` prop으로 고른다 (기본 `mega`) — `MainLayout`이 `"use client"`이므로 내부에서 `SdHeader.Mega`/`.Simple` dot 접근이 안전하다.

색상은 env var이 아니라 **테마 오버라이드**로 주입한다. `theme`은 `createTheme()`의 `MantineThemeOverride`이므로 소비자가 `mergeThemeOverrides(theme, { colors: { primary: [...] } })`로 합친다. 이 merge는 반드시 소비자의 `"use client"` 모듈에서 해야 한다 — 서버 컴포넌트는 `theme`을 prop으로 **넘길** 수는 있어도 client reference proxy라 **읽을** 수 없다. 컴포넌트가 의존하는 키는 `primary`/`secondary`/`slate`/`red`/`green`/`amber`이며, 키를 제거하면 Mantine 기본 팔레트로 폴백한다.

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

| UI 변경                    | 카탈로그 반영                                                         |
| -------------------------- | --------------------------------------------------------------------- |
| variant 추가/삭제/이름변경 | 해당 `*Catalog.tsx`의 `<Showcase>` + `exports={[...]}` 목록           |
| 새 컴포넌트 추가           | 계층에 맞는 `*Catalog.tsx`에 `<Showcase>` 블록 신설                   |
| props 시그니처 변경        | 데모의 해당 props 사용부                                              |
| 기본 라벨·기본값 변경      | 데모에서 그 기본값이 드러나도록 (예: `<SdButton.Submit />` 라벨 생략) |
| 컴포넌트 제거              | `*Catalog.tsx`에서 `<Showcase>` 제거 + import 정리                    |

문서 3곳도 같이 맞춘다: 이 파일의 Component Factory Pattern 표, `packages/framework/README.md`의 flat export 표와 사용 예시.

검증: `pnpm --filter framework build && pnpm --filter web build`. 카탈로그가 실제 배포 번들(`dist/ui`, flat export)을 소비하진 않지만 소스 기준 커버리지·타입은 이걸로 확인된다. flat export 커버리지는 아래 한 줄로 감사한다 — 네임스페이스 키마다 대응 `Sd<NS><Variant>` export가 있는지 검사(§Namespace dot access 참고).

### GitHub Pages 제약

`next.config.mjs`가 `output: "export"` + `trailingSlash: true` + `images.unoptimized`로 동작한다. 프로젝트 페이지는 `/<repo>/` 아래에 서빙되므로 `NEXT_PUBLIC_BASE_PATH`가 필요하고, 워크플로(`.github/workflows/deploy-catalog.yml`)가 주입한다.

Next가 basePath를 **자동으로 붙여주지 않는** 두 곳은 직접 처리해야 한다:

1. **`images.unoptimized`의 `<img src>`** — `NEXT_PUBLIC_LOGO_SRC`에 prefix를 포함시킨다.
2. **`SdHeader`의 링크** — Mantine `Anchor`(순수 `<a>`)로 렌더되므로 `app/_catalog/nav.ts`에서 href에 prefix를 붙인다. `next/link`로 바꾸면 불필요해진다.

`public/.nojekyll`이 있어야 `_next/`가 Jekyll에 의해 무시되지 않는다.

### Shared Types (`types/index.ts`)

| Interface         | extends    | 용도                                                      |
| ----------------- | ---------- | --------------------------------------------------------- |
| `CommonInfo`      | —          | 공통 메타(id, order, isShow, timestamps)                  |
| `NavItem`         | CommonInfo | 네비게이션 메뉴                                           |
| `HeroSlide`       | CommonInfo | 히어로 캐러셀 슬라이드                                    |
| `FeatureItem`     | CommonInfo | 기능 카드                                                 |
| `TimelineEvent`   | CommonInfo | 연혁 타임라인                                             |
| `SolutionItem`    | CommonInfo | 솔루션 카드 (category, icon, href)                        |
| `StepItem`        | —          | 단계별 안내                                               |
| `TestimonialItem` | —          | 고객 후기                                                 |
| `PricingFeature`  | —          | 요금제 항목(text, included)                               |
| `PricingItem`     | —          | 요금제 플랜                                               |
| `FaqItem`         | —          | FAQ                                                       |
| `ClientItem`      | —          | 고객사 로고(name, url, logo)                              |
| `CompanyAddress`  | —          | 회사 주소(label, address, order, embbedUrl?)              |
| `SocialItem`      | —          | 소셜 링크(platform, url, label?) — `SocialPlatform` union |
| `CompanyInfo`     | —          | 회사 정보 전체 (주소·연락처 + `socials?`)                 |

**타입 배치 원칙:** 여러 컴포넌트가 공유하는 데이터 타입 → `types/index.ts`. 해당 컴포넌트만 쓰는 props 타입 → 컴포넌트 파일 내 인라인(미export).

## Component Factory Pattern

All atom and molecule components use factory functions to create named variants on a single namespace:

```tsx
function createVariant(defaults: TextProps) {
  return ({ children, ...props }: TextProps) => (
    <MantineText {...defaults} {...props}>
      {children}
    </MantineText>
  )
}
export const SdText = {
  Strong: createVariant({ fw: 700, c: 'slate.9', lts: '-0.04em' }),
  Body: createVariant({ fw: 400, c: 'slate.7', lh: 1.7 }),
  Sub: createVariant({ fw: 400, c: 'slate.5', fz: 'xs' }),
  Eyebrow: createVariant({ fw: 700, c: 'primary.6', fz: 'xs', tt: 'uppercase', lts: '0.12em' }),
  Numeric: createVariant({ fw: 700, c: 'slate.8', fvs: 'tabular-nums', lts: '-0.04em' }),
  Error: createVariant({ fw: 400, c: 'red.6', fz: 'sm' }),
  Hint: createVariant({ fw: 400, c: 'slate.4', fz: 'xs', lh: 1.5 }),
}
```

The same pattern applies to:

| Component        | Variants                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| `SdTitle`        | Display / Section / Card / Sub                                                                                  |
| `SdButton`       | Primary / Secondary / Outline / Ghost / White / **Submit** / **Delete** / **Cancel** / **Excel** / **Download** |
| `SdTextBox`      | Hero / Section / Card / Sub                                                                                     |
| `SdTabs`         | Pills / Underline / Outline                                                                                     |
| `SdTable`        | default + Spec                                                                                                  |
| `SdSteps`        | Bubble / Card / Strip                                                                                           |
| `SdQuote`        | Plain / Card                                                                                                    |
| `SdBadge`        | Default / Primary / Success / Warning                                                                           |
| `SdLink`         | Strong / Body / Sub / Hint                                                                                      |
| `SdInput`        | Text / Email / Password / Textarea / Json · Number / Slider / Rating / PinCode · Select / NativeSelect / MultiSelect / Autocomplete / Tags / Radio / Segmented · Checkbox / Switch · File / Color · Date / DateRange / Time |
| `SdTestimonial`  | Card / Strip / Grid                                                                                             |
| `SdPricingCard`  | default + Grid                                                                                                  |
| `SdFaq`          | default + WithHeader                                                                                            |
| `SdCta`          | Subtle / Inline                                                                                                 |
| `SdSolution`     | Filtered / List                                                                                                 |
| `SdSolutionCard` | Item / Grid                                                                                                     |
| `SdClients`      | Grid / Marquee                                                                                                  |
| `SdMap`          | Single / Tabs                                                                                                   |
| `SdErrorView`    | Page / NotFound                                                                                                 |
| `SdLoginView`    | Card(= default) / Split                                                                                         |
| `SdResult`       | Success / Error                                                                                                 |
| `SdToast`        | Success / Error / Warning / Info / Loading (+ `Update` / `Hide` / `Clean`)                                       |
| `SdHeader`       | Mega(= default) / Simple                                                                                        |

All UI components are Client Components — tsup adds `"use client"` banner to the UI bundle only.

### Namespace dot access is forbidden in Server Components

Because the banner makes all of `dist/ui` a client module, a Server Component importing it receives **client reference proxies**, not real objects. Dotting into a namespace returns `undefined`:

```tsx
// ❌ Server Component — renders <undefined>, fails with
//    "Element type is invalid: expected a string ... got: undefined"
import { SdText } from '@yeongseoksong/framework/ui'
;<SdText.Body>…</SdText.Body>

// ✅ flat export
import { SdTextBody } from '@yeongseoksong/framework/ui'
;<SdTextBody>…</SdTextBody>
```

This only bites through the published package — `apps/web` maps `@framework/*` to source, where no banner exists, so namespace access works locally and breaks after publish. **Verify UI changes against `dist`, not just source.**

Every variant therefore has a flat `Sd<Namespace><Variant>` export alongside the namespace (`SdTextBody`, `SdTitleSection`, `SdErrorViewPage`, `SdTableSpec`, …). When adding a variant, add its flat export in the same file. The namespace form stays valid inside Client Components.

`SdModal` is exempt — it requires `opened`/`onClose` state, so it can only be used from a Client Component anyway.

## Next.js Special Files

| 파일               | 위치             | 역할                                           |
| ------------------ | ---------------- | ---------------------------------------------- |
| `global-error.tsx` | `app/` 루트 고정 | 루트 layout 오류 — `MantineProvider` 직접 복원 |
| `not-found.tsx`    | `app/` 루트 고정 | 전역 404                                       |
| `error.tsx`        | `app/`           | 페이지 렌더 오류                               |

`SdErrorView.Page` / `SdErrorView.NotFound` organism을 thin wrapper로 사용. UI 로직은 organism에 집중, app/ 파일은 Next.js 어댑터 역할만 담당.

## SdText & SdTitle Variants

**SdText** (pass-through to Mantine `Text`):

| Variant | fw  | c         | fz  | Notes                      |
| ------- | --- | --------- | --- | -------------------------- |
| Strong  | 700 | slate.9   | md  | lts: -0.04em               |
| Body    | 500 | slate.7   | sm  | lh: 1.7                    |
| Sub     | 400 | slate.5   | xs  | lh: 1.6                    |
| Eyebrow | 700 | primary.6 | xs  | uppercase, lts: 0.12em     |
| Numeric | 700 | slate.8   | md  | tabular-nums, lts: -0.04em |
| Error   | 400 | red.6     | sm  |                            |
| Hint    | 400 | slate.4   | xs  | lh: 1.5                    |

**SdTitle** (pass-through to Mantine `Title`):

| Variant | order | Usage                 |
| ------- | ----- | --------------------- |
| Display | 2     | Hero section headings |
| Section | 3     | Section titles        |
| Card    | 4     | Card/modal titles     |
| Sub     | 5     | Subtitles             |

Both `SdText` and `SdTitle` variants automatically apply `t()` to their children, substituting `%c` with the configured company name.

## Color & Typography Rules

**Never set inline `fz=` or `fw=` props on `SdText` variants** — each variant encodes those as its typographic identity. Overriding them defeats the design system standard.

**Inline `c=` overrides** are allowed only when a component genuinely needs a one-off contextual value not covered by the design system (e.g., `c="white"` on a primary-colored background). Otherwise, prefer adding a new `SdText` variant or updating `theme.ts` component defaults.

All colors originate from:

0. `ui/typography.ts`의 `textStyles` (SdText · SdLink 공용)
1. `SdText`/`SdTitle` variant defaults
2. Mantine component defaults in `theme.ts` (e.g., `Anchor → primary.6`)

## tsup Build Config

Two separate build passes in `tsup.config.ts`:

1. `ui/index` — with `banner: { js: '"use client";' }`, externals include `next`
2. `util/index` + `types/index` — no banner, only `react` external

Both emit ESM (`.mjs`) + CJS (`.js`) + type declarations (`.d.ts`/`.d.mts`).

`packages/framework/tsconfig.json` uses `moduleResolution: "node"` (not `"bundler"`) to correctly resolve Mantine's `.d.ts` type entry points, and `ignoreDeprecations: "6.0"` to suppress a tsup-internal `baseUrl` warning under TypeScript 6.

## Key Tech Versions

| Package    | Version      |
| ---------- | ------------ |
| pnpm       | 10.11.0      |
| Next.js    | 16.2.2       |
| React      | 19.2.4       |
| TypeScript | 6.0.2        |
| Mantine    | 9.4.2 (core · hooks · carousel · notifications) |
| tsup       | latest (8.x) |
| zustand    | 5.0.x        |
| Linter     | oxlint       |
