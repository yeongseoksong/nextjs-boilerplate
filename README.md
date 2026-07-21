# nextjs-boilerplate

Mantine 9 기반 디자인 시스템 `@yeongseoksong/framework`와, 그 전체 컴포넌트를 보여주는 컴포넌트 카탈로그 사이트를 담은 pnpm + Turborepo 모노레포입니다.

## 구성

```
nextjs-boilerplate/
├── apps/web/               # 컴포넌트 카탈로그 (Next.js 16 → GitHub Pages 정적 배포)
├── packages/framework/     # @yeongseoksong/framework — 공유 UI 라이브러리 (npm 배포)
├── turbo.json              # 빌드 오케스트레이션 (framework → web)
└── pnpm-workspace.yaml     # 워크스페이스: apps/*, packages/framework
```

`turbo build`는 `dependsOn: ["^build"]`에 따라 `framework/build`를 먼저 실행한 뒤 `web/build`를 실행합니다.

## 요구 사항

| 도구 | 버전 |
|---|---|
| Node | 24 (CI 기준) |
| pnpm | 10.11.0 |

## 시작하기

```bash
pnpm install

# 카탈로그를 로컬에서 실행하려면 환경변수가 필요하다
cp apps/web/.env.example apps/web/.env.local   # 값 채우기

pnpm dev          # 전체 워크스페이스 watch/dev
pnpm build        # framework → web 순서로 빌드
pnpm lint         # oxlint (web)
```

개별 워크스페이스만:

```bash
pnpm --filter web dev
pnpm --filter @yeongseoksong/framework build
```

## packages/framework

Atomic Design(atom / molecule / organism / template)을 따르며 모든 디자인 시스템 컴포넌트에 `Sd` 접두사를 씁니다. 자세한 사용법·컴포넌트 목록은 [packages/framework/README.md](packages/framework/README.md)를 참고하세요.

**서버 컴포넌트에서는 flat export를 쓸 것** — 배포 번들 전체에 `"use client"`가 붙으므로 서버 컴포넌트가 네임스페이스를 dot 접근(`SdText.Body`)하면 실패합니다. flat export(`SdTextBody`)를 사용하세요. (자세한 내용은 프레임워크 README와 [CLAUDE.md](CLAUDE.md))

### 소비자 상수 주입

회사명·로고 같은 소비자별 값은 `NEXT_PUBLIC_*` 환경변수로 주입합니다.

| 변수 | 필수 | 기본값 | 용도 |
|---|---|---|---|
| `NEXT_PUBLIC_COMPANY_NAME` | ✓ | — | `SdText`/`SdTitle`의 `%c` 치환 |
| `NEXT_PUBLIC_LOGO_SRC` | | `/logo.svg` | `Logo` |
| `NEXT_PUBLIC_LOGO_ALT` | | `로고` | `Logo` |

배열·객체(`navItems`, `companyInfo`)는 환경변수로 담을 수 없어 `MainLayout`에 prop으로 넘깁니다.

## apps/web — 컴포넌트 카탈로그

프레임워크의 전체 컴포넌트와 variant를 실제 렌더 결과 + 복사 가능한 import 코드로 보여주는 사이트입니다.

```
app/page.tsx                            개요 · 설치 · 환경변수 안내
app/components/{atom,molecule,organism}/ 계층별 카탈로그
```

## 배포 (GitHub Pages)

`main`에 push하면 [.github/workflows/deploy-catalog.yml](.github/workflows/deploy-catalog.yml)이 정적 빌드해 Pages에 배포합니다.

- **최초 1회**: 저장소 **Settings → Pages → Source**를 **"GitHub Actions"** 로 설정해야 합니다. `GITHUB_TOKEN`으로는 Pages 사이트를 생성할 수 없어 이 단계만 수동입니다.
- 프로젝트 페이지는 `/<repo>/` 하위에 서빙되므로 워크플로가 `NEXT_PUBLIC_BASE_PATH`를 주입합니다.
- 배포 주소: `https://<owner>.github.io/<repo>/`

## npm 배포 (framework)

버전을 올린 뒤 태그를 push하면 [.github/workflows/publish-framework.yml](.github/workflows/publish-framework.yml)이 npm에 배포합니다.

```bash
pnpm changeset            # 변경 기록
pnpm changeset version    # package.json + CHANGELOG 수정 (커밋 안 함)
git add -A
git commit -m "release: framework"   # ← 반드시 먼저 커밋
pnpm changeset tag        # ← 그 커밋에 태그
git push --follow-tags
```
