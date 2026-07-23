# @yeongseoksong/framework

Mantine 9 기반 공유 UI 컴포넌트 라이브러리. Next.js App Router 환경에서 사용하도록 설계되었습니다.

## 설치

```bash
pnpm add @yeongseoksong/framework
```

피어 의존성 설치:

```bash
pnpm add @mantine/core @mantine/hooks @mantine/carousel @mantine/notifications @mantine/dates dayjs zustand react react-dom next
```

## 설정

### 1. MantineProvider + theme

```tsx
// app/layout.tsx
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme, SdToastProvider } from '@yeongseoksong/framework/ui'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <MantineProvider theme={theme}>
          <SdToastProvider />
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
```

`SdToastProvider`는 토스트가 실제로 그려지는 자리입니다. 넣지 않으면 `SdToast.*` 호출이 조용히 아무 일도 하지 않습니다(아래 SdToast 항목 참고).

### 2. 환경변수 설정

소비자별 상수는 환경변수로 주입합니다. 앱 루트에 `.env.local`을 만드세요.

```bash
# [필수] SdText/SdTitle 문자열의 %c 토큰이 이 값으로 치환됩니다.
NEXT_PUBLIC_COMPANY_NAME=내 회사

# [선택] 헤더 로고. 기본값: /logo.svg, "로고"
NEXT_PUBLIC_LOGO_SRC=/logo.svg
NEXT_PUBLIC_LOGO_ALT=내 회사 로고
```

값은 빌드 시점에 번들로 인라인되므로 **런타임에 바꿀 수 없고**, 비밀값을 넣어서도 안 됩니다.

`NEXT_PUBLIC_COMPANY_NAME`이 없으면 `%c`가 빈 문자열로 치환됩니다. 누락을 배포 전에 잡으려면 `next.config.mjs`에서 검증하세요:

```js
// env.mjs
if (!process.env.NEXT_PUBLIC_COMPANY_NAME) {
  throw new Error('NEXT_PUBLIC_COMPANY_NAME이 설정되지 않았습니다.')
}

// next.config.mjs
import './env.mjs'
```

`navItems` / `companyInfo`처럼 배열·객체인 값은 환경변수로 담을 수 없으므로 `MainLayout`에 prop으로 넘깁니다 (아래 MainLayout 항목 참고).

### 3. 색상 커스터마이즈

브랜드 색은 환경변수가 아니라 **테마 오버라이드**로 주입합니다. `theme`은 `createTheme()`이 만든 `MantineThemeOverride`라 Mantine 표준 `mergeThemeOverrides()`로 그대로 합칠 수 있습니다.

**반드시 `"use client"` 파일 안에서 합쳐야 합니다.** `ui` 번들 전체에 `"use client"`가 붙어 있어 서버 컴포넌트가 `theme`을 임포트하면 실제 객체가 아니라 client reference proxy를 받습니다. `<MantineProvider theme={theme}>`처럼 **넘기기만** 하는 건 되지만, `mergeThemeOverrides(theme, ...)`처럼 값을 **읽으면** 터집니다.

```tsx
// app/theme.ts  ← "use client" 필수
'use client'
import { mergeThemeOverrides } from '@mantine/core'
import { theme } from '@yeongseoksong/framework/ui'

export const appTheme = mergeThemeOverrides(theme, {
  colors: {
    // 10단계 전부 채워야 합니다. 부분 배열은 Mantine이 허용하지 않습니다.
    primary: [
      '#e7f0fb', '#c8dcf4', '#a3c3ec', '#7aa8e3', '#4f8ddb',
      '#2374d4', '#0b5ed7', '#094db1', '#073d8c', '#052d68',
    ],
  },
  // 브랜드 앵커 shade를 바꾸려면 함께 지정
  primaryShade: { light: 6, dark: 5 },
})
```

```tsx
// app/layout.tsx — Server Component 그대로 둡니다
import { MantineProvider } from '@mantine/core'
import { appTheme } from './theme'

<MantineProvider theme={appTheme} defaultColorScheme="light">
```

오버라이드하지 않은 키(타이포·spacing·shadows·컴포넌트 기본값)는 프레임워크 값이 그대로 유지됩니다.

**컴포넌트가 의존하는 색상 키** — 아래 키를 바꾸면 해당 컴포넌트 전체가 따라 바뀝니다. 키를 **없애면** Mantine 기본 팔레트로 폴백하므로 톤이 어긋납니다.

| 키          | 쓰이는 곳                                                              |
| ----------- | ---------------------------------------------------------------------- |
| `primary`   | `primaryColor`. 버튼·링크 hover·`SdText.Eyebrow`·`SdBadge.Primary` 등  |
| `secondary` | 보조 강조                                                              |
| `slate`     | 중립 전반 — 모든 `SdText`/`SdTitle` 본문색, 보더, 표 헤더. `dark` 별칭 |
| `red`       | `SdText.Error`, `SdButton.Delete`                                      |
| `green`     | `SdButton.Excel`, `SdToast.Success`, `SdResult.Success`                |
| `amber`     | `SdBadge.Warning`, `SdToast.Warning`                                   |

10단계 램프를 손으로 만들기 번거로우면 [`@mantine/colors-generator`](https://mantine.dev/colors-generator/)의 `generateColors('#0b5ed7')`로 hex 하나에서 뽑을 수 있습니다(별도 설치 필요).

## 임포트 경로

| 경로                             | 내용                                          |
| -------------------------------- | --------------------------------------------- |
| `@yeongseoksong/framework/ui`    | UI 컴포넌트 전체 + `theme` (`"use client"`)   |
| `@yeongseoksong/framework/store` | Zustand 스토어 — `useAuthStore` · `useUiStore` · `useSdForm` (`"use client"`) |
| `@yeongseoksong/framework/util`  | `t()`, 한글 조사(`josa` · `withJosa` · `fixJosa`), `runFinalizers`, `filterAndSort`, `COMPANY_NAME`, `LOGO_SRC`, `LOGO_ALT` |
| `@yeongseoksong/framework/types` | 공유 인터페이스                               |

---

## ⚠️ Server Component에서는 flat export를 쓰세요

`ui` 번들 전체에 `"use client"`가 붙어 있습니다. 서버 컴포넌트가 이를 임포트하면 실제 객체가 아니라 **client reference proxy**를 받으므로, 네임스페이스를 dot 접근하면 `undefined`가 나옵니다.

```tsx
// ❌ 서버 컴포넌트에서 실패
//    Element type is invalid: expected a string ... got: undefined
import { SdText } from '@yeongseoksong/framework/ui'
;<SdText.Body>본문</SdText.Body>

// ✅ flat export 사용
import { SdTextBody } from '@yeongseoksong/framework/ui'
;<SdTextBody>본문</SdTextBody>
```

모든 variant에 `Sd<네임스페이스><Variant>` 형태의 flat export가 준비되어 있습니다:

| 네임스페이스     | flat export                                                                                                                                                                   |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SdText`         | `SdTextStrong` `SdTextBody` `SdTextSub` `SdTextEyebrow` `SdTextError` `SdTextHint` `SdTextNumeric`                                                                            |
| `SdTitle`        | `SdTitleDisplay` `SdTitleSection` `SdTitleCard` `SdTitleSub`                                                                                                                  |
| `SdButton`       | `SdButtonPrimary` `SdButtonSecondary` `SdButtonOutline` `SdButtonGhost` `SdButtonWhite` `SdButtonSubmit` `SdButtonDelete` `SdButtonCancel` `SdButtonExcel` `SdButtonDownload` |
| `SdBadge`        | `SdBadgeDefault` `SdBadgePrimary` `SdBadgeSuccess` `SdBadgeWarning`                                                                                                           |
| `SdInput`        | `SdInputText` `SdInputEmail` `SdInputPassword` `SdInputTextarea` `SdInputJson` `SdInputNumber` `SdInputSlider` `SdInputRating` `SdInputPinCode` `SdInputSelect` `SdInputNativeSelect` `SdInputMultiSelect` `SdInputAutocomplete` `SdInputTags` `SdInputRadioGroup` `SdInputSegmented` `SdInputCheckbox` `SdInputSwitch` `SdInputFile` `SdInputColor` `SdInputDate` `SdInputDateRange` `SdInputTime`                                                                                          |
| `SdLink`         | `SdLinkStrong` `SdLinkBody` `SdLinkSub` `SdLinkHint`                                                                                                                          |
| `SdQuote`        | `SdQuotePlain` `SdQuoteCard`                                                                                                                                                  |
| `SdTable`        | `SdTableSpec`                                                                                                                                                                 |
| `SdTabs`         | `SdTabsPills` `SdTabsUnderline` `SdTabsOutline`                                                                                                                               |
| `SdSkeleton`     | `SdSkeletonCard` `SdSkeletonText` `SdSkeletonTitle` `SdSkeletonImage` `SdSkeletonAvatar`                                                                                      |
| `SdTextBox`      | `SdTextBoxHero` `SdTextBoxSection` `SdTextBoxCard` `SdTextBoxSub`                                                                                                             |
| `SdSteps`        | `SdStepsBubble` `SdStepsCard` `SdStepsStrip`                                                                                                                                  |
| `SdCta`          | `SdCtaBanner` `SdCtaSubtle` `SdCtaInline`                                                                                                                                     |
| `SdFaq`          | `SdFaqDefault` `SdFaqFilled` `SdFaqWithHeader`                                                                                                                                |
| `SdPricingCard`  | `SdPricingCardDefault` `SdPricingCardFeatured` `SdPricingCardGrid`                                                                                                            |
| `SdTestimonial`  | `SdTestimonialCard` `SdTestimonialStrip` `SdTestimonialGrid`                                                                                                                  |
| `SdSolution`     | `SdSolutionFiltered` `SdSolutionList`                                                                                                                                         |
| `SdSolutionCard` | `SdSolutionCardItem` `SdSolutionCardGrid`                                                                                                                                     |
| `SdClients`      | `SdClientsGrid` `SdClientsMarquee`                                                                                                                                            |
| `SdMap`          | `SdMapSingle` `SdMapTabs`                                                                                                                                                     |
| `SdErrorView`    | `SdErrorViewPage` `SdErrorViewNotFound`                                                                                                                                       |
| `SdLoginView`    | `SdLoginViewCard` `SdLoginViewSplit`                                                                                                                                          |
| `SdResult`       | `SdResultSuccess` `SdResultError`                                                                                                                                             |
| `SdToast`        | `SdToastSuccess` `SdToastError` `SdToastWarning` `SdToastInfo` `SdToastLoading` `SdToastUpdate` `SdToastHide` `SdToastClean`                                                                                                                                       |
| `SdHeader`       | `SdHeaderMega` `SdHeaderSimple` `SdHeaderPanel` (`SdHeader` 자체는 `Mega`와 동일)                                                                                             |

**클라이언트 컴포넌트에서는 네임스페이스 형태(`SdText.Body`)를 그대로 써도 됩니다.** `SdModal`은 `opened`/`onClose` 상태가 필요해 애초에 클라이언트 전용이므로 flat export가 없습니다.

---

## 사용 예시

### SdButton

```tsx
import { SdButton } from '@yeongseoksong/framework/ui'

// 주요 액션
<SdButton.Primary onClick={handleSubmit}>저장</SdButton.Primary>

// 보조 액션
<SdButton.Outline onClick={handleCancel}>취소</SdButton.Outline>

// 텍스트 수준
<SdButton.Ghost>더 보기</SdButton.Ghost>

// 다크 배경 위
<SdButton.White>시작하기</SdButton.White>
```

**표준 액션 버튼** — 라벨·색·아이콘이 고정되어 있습니다. `children`을 생략하면 기본 라벨이,
넘기면 그 값이 라벨로 쓰입니다.

```tsx
// 아이콘 + 기본 라벨이 자동으로 붙는다
<SdButton.Submit onClick={handleSubmit} />   {/* 종이비행기 + "전송" */}
<SdButton.Delete onClick={handleDelete} />   {/* 휴지통 + "삭제" */}
<SdButton.Cancel onClick={handleClose} />    {/* X + "취소" */}
<SdButton.Excel  onClick={handleExport} />   {/* 스프레드시트 + "엑셀" */}
<SdButton.Download onClick={handleDownload} /> {/* 다운로드 + "다운로드" */}

// 라벨만 다르게 쓰고 싶으면 children으로 덮어쓴다
<SdButton.Submit>문의 보내기</SdButton.Submit>
<SdButton.Excel>엑셀 다운로드</SdButton.Excel>
```

| 변형       | 색               | 아이콘       | 기본 라벨 |
| ---------- | ---------------- | ------------ | --------- |
| `Submit`   | primary (filled) | 종이비행기   | 전송      |
| `Delete`   | red (filled)     | 휴지통       | 삭제      |
| `Cancel`   | slate (outline)  | X            | 취소      |
| `Excel`    | green (outline)  | 스프레드시트 | 엑셀      |
| `Download` | primary (light)  | 다운로드     | 다운로드  |

### SdText / SdTitle

```tsx
import { SdText, SdTitle } from '@yeongseoksong/framework/ui'

<SdTitle.Display>히어로 제목</SdTitle.Display>   {/* h2, 대형 */}
<SdTitle.Section>섹션 제목</SdTitle.Section>     {/* h3 */}
<SdTitle.Card>카드 제목</SdTitle.Card>           {/* h4 */}
<SdTitle.Sub>소제목</SdTitle.Sub>                {/* h5 */}

<SdText.Strong>강조 텍스트</SdText.Strong>
<SdText.Body>본문 텍스트입니다.</SdText.Body>
<SdText.Sub>보조 설명</SdText.Sub>
<SdText.Eyebrow>LABEL</SdText.Eyebrow>           {/* 대문자 레이블 */}
<SdText.Numeric>1,234</SdText.Numeric>           {/* 숫자 표기 */}
<SdText.Error>필수 항목입니다.</SdText.Error>
<SdText.Hint>최대 100자까지 입력 가능합니다.</SdText.Hint>

{/* %c → NEXT_PUBLIC_COMPANY_NAME 값으로 치환됨 */}
<SdText.Body>%c 서비스에 오신 것을 환영합니다.</SdText.Body>
```

### SdTextBox

레이블 + 제목 + 설명을 묶는 섹션 헤더 컴포넌트입니다.

```tsx
import { SdTextBox } from '@yeongseoksong/framework/ui'

// 히어로 섹션
<SdTextBox.Hero
  label="NEW"
  title="더 나은 서비스를 경험하세요"
  description="빠르고 안정적인 플랫폼으로 업무 효율을 높여보세요."
/>

// 일반 섹션
<SdTextBox.Section
  label="기능"
  title="핵심 기능 소개"
  description="다양한 기능을 통해 더 스마트하게 일하세요."
/>

// 카드 내부
<SdTextBox.Card title="카드 제목" description="카드 설명" />
```

### SdTabs

```tsx
import { SdTabs } from '@yeongseoksong/framework/ui'

// Pills 스타일
<SdTabs.Pills defaultValue="tab1">
  <SdTabs.Pills.List>
    <SdTabs.Pills.Tab value="tab1">소개</SdTabs.Pills.Tab>
    <SdTabs.Pills.Tab value="tab2">기능</SdTabs.Pills.Tab>
  </SdTabs.Pills.List>

  <SdTabs.Pills.Panel value="tab1">소개 내용</SdTabs.Pills.Panel>
  <SdTabs.Pills.Panel value="tab2">기능 내용</SdTabs.Pills.Panel>
</SdTabs.Pills>

// Underline 스타일
<SdTabs.Underline defaultValue="tab1">
  {/* 동일한 구조 */}
</SdTabs.Underline>
```

### SdTable

```tsx
import { SdTable } from '@yeongseoksong/framework/ui'

// 기본 테이블
<SdTable>
  <SdTable.Thead>
    <SdTable.Tr>
      <SdTable.Th>이름</SdTable.Th>
      <SdTable.Th>상태</SdTable.Th>
    </SdTable.Tr>
  </SdTable.Thead>
  <SdTable.Tbody>
    <SdTable.Tr>
      <SdTable.Td>홍길동</SdTable.Td>
      <SdTable.Td>활성</SdTable.Td>
    </SdTable.Tr>
  </SdTable.Tbody>
</SdTable>

// 스펙 강조 테이블 (primary 헤더)
<SdTable.Spec>
  <SdTable.Spec.Thead>
    <SdTable.Spec.Tr>
      <SdTable.Spec.Th>항목</SdTable.Spec.Th>
      <SdTable.Spec.Th>값</SdTable.Spec.Th>
    </SdTable.Spec.Tr>
  </SdTable.Spec.Thead>
  <SdTable.Spec.Tbody>
    <SdTable.Spec.Tr>
      <SdTable.Spec.Td>CPU</SdTable.Spec.Td>
      <SdTable.Spec.Td>8코어</SdTable.Spec.Td>
    </SdTable.Spec.Tr>
  </SdTable.Spec.Tbody>
</SdTable.Spec>
```

### SdModal

```tsx
'use client'
import { useDisclosure } from '@mantine/hooks'
import { SdModal, SdButton } from '@yeongseoksong/framework/ui'

export function Example() {
  const [opened, { open, close }] = useDisclosure()

  return (
    <>
      <SdButton.Primary onClick={open}>열기</SdButton.Primary>

      <SdModal opened={opened} onClose={close} title="제목">
        <SdModal.Body>모달 내용입니다.</SdModal.Body>
      </SdModal>
    </>
  )
}
```

### SdFaq

```tsx
import { SdFaq } from '@yeongseoksong/framework/ui'
import type { FaqItem } from '@yeongseoksong/framework/types'

const faqs: FaqItem[] = [
  { question: '무료 체험이 가능한가요?', answer: '네, 14일 무료 체험을 제공합니다.' },
  { question: '결제 수단은 어떻게 되나요?', answer: '카드 결제를 지원합니다.' },
]

// 아코디언만
<SdFaq.Default items={faqs} />

// 헤더 + 아코디언
<SdFaq.WithHeader
  label="FAQ"
  title="자주 묻는 질문"
  description="궁금한 점이 있으시면 언제든지 문의해 주세요."
  items={faqs}
/>
```

### SdPricingCard

```tsx
import { SdPricingCard } from '@yeongseoksong/framework/ui'
import type { PricingItem } from '@yeongseoksong/framework/types'

const plans: PricingItem[] = [
  {
    name: '스타터',
    price: '무료',
    description: '소규모 팀을 위한 플랜',
    features: [
      { text: '프로젝트 3개', included: true },
      { text: '팀원 5명', included: true },
      { text: '고급 분석', included: false },
    ],
    ctaLabel: '무료로 시작',
  },
  {
    name: '프로',
    price: '₩29,000',
    period: '월',
    description: '성장하는 팀을 위한 플랜',
    isPopular: true,   // → SdPricingCard.Grid에서 Featured 스타일 자동 적용
    features: [
      { text: '프로젝트 무제한', included: true },
      { text: '팀원 무제한', included: true },
      { text: '고급 분석', included: true },
    ],
    ctaLabel: '시작하기',
  },
]

// 그리드 (isPopular 항목은 자동으로 Featured 스타일)
<SdPricingCard.Grid items={plans} onSelect={(plan) => console.log(plan)} />

// 개별 카드
<SdPricingCard.Default item={plans[0]} onSelect={handleSelect} />
<SdPricingCard.Featured item={plans[1]} onSelect={handleSelect} />
```

### SdClients

```tsx
import { SdClients } from '@yeongseoksong/framework/ui'
import type { ClientItem } from '@yeongseoksong/framework/types'

const clients: ClientItem[] = [
  { name: '회사 A', url: 'https://example.com', logo: '/logos/a.svg' },
  { name: '회사 B', url: 'https://example.com', logo: '/logos/b.svg' },
]

// 반응형 그리드
<SdClients.Grid items={clients} />

// 무한 마키 스크롤 (호버 시 일시정지)
<SdClients.Marquee items={clients} speed={40} />
```

### SdHeader / SdFooter

```tsx
import { SdHeader, SdFooter } from '@yeongseoksong/framework/ui'
import type { NavItem, CompanyInfo } from '@yeongseoksong/framework/types'

const navItems: NavItem[] = [
  { id: 1, order: 1, isShow: true, label: '소개', href: '/about' },
  //   parentId로 하위 항목을 매단다 (헤더 2단 메뉴 · 푸터 링크 컬럼 공용)
  { id: 11, order: 1, isShow: true, label: '회사소개', href: '/about/company', parentId: 1 },
  { id: 12, order: 2, isShow: true, label: '연혁', href: '/about/history', parentId: 1 },
  { id: 2, order: 2, isShow: true, label: '기능', href: '/features' },
  { id: 3, order: 3, isShow: true, label: '요금제', href: '/pricing' },
]

const company: CompanyInfo = {
  name: '내 회사',
  registrationNumber: '000-00-00000',
  addresses: [{ label: '본사', address: '서울시 강남구', order: 1 }],
  tel: '02-0000-0000',
  email: 'hello@example.com',
  copyrightYear: 2024,
  // 소셜 아이콘 — 없으면 하단 바에 렌더되지 않음
  socials: [
    { platform: 'x', url: 'https://x.com/example' },
    { platform: 'youtube', url: 'https://youtube.com/@example' },
  ],
}

// 하단 바 정책 링크 (NavItem, highlight: true면 강조)
const policyLinks: NavItem[] = [
  { id: 1, order: 1, isShow: true, label: '이용약관', href: '/terms' },
  { id: 2, order: 2, isShow: true, label: '개인정보처리방침', href: '/privacy', highlight: true },
]

<SdHeader navItems={navItems} loginFlag />
<SdFooter
  company={company}
  navItems={navItems}
  policyLinks={policyLinks}
  description="한 줄 브랜드 설명"
/>
```

`SdHeader`는 데스크톱에서 헤더에 마우스를 올리면(또는 Tab으로 포커스가 들어오면) 헤더가 아래로 확장되며
`parentId`로 묶인 하위 링크가 각 상위 항목 **바로 아래 컬럼**으로 동시에 노출됩니다. 하위 항목이 하나도 없으면 확장이 일어나지 않습니다.
상위 항목의 `href`를 비우면 링크 대신 그룹 제목으로 렌더됩니다. 모바일(`< sm`)에서는 버거 드로어의 중첩 아코디언으로 전환됩니다.

헤더 바 높이를 60px로 고정하고 싶다면 `SdHeader.Simple`(서버 컴포넌트에서는 `SdHeaderSimple`)을 씁니다.
하위 항목을 가진 상위 항목마다 Mantine `Menu`가 하나씩 붙어 개별 드롭다운으로 열리며(마우스 hover · 클릭 · 키보드 모두 지원),
드롭다운은 포털로 렌더되므로 `overflow: hidden` 컨테이너 안에서도 잘리지 않습니다. 모바일 드로어는 기본 변형과 동일합니다.

```tsx
<SdHeader.Simple navItems={navItems} loginFlag />
```

바 높이는 `Simple`처럼 60px로 고정하되 드롭다운 내부는 `Mega`와 같은 그룹 컬럼으로 펼치고 싶다면
`SdHeader.Panel`(서버 컴포넌트에서는 `SdHeaderPanel`)을 씁니다. 상위 항목마다 붙는 개별 `Menu`는 그대로지만,
드롭다운 안을 `Menu.Item`/`Menu.Sub` 플라이아웃 대신 자식 링크 + 손자를 자식 아래 하위 링크로 얹은
세로 패널로 채웁니다. 모바일 드로어는 다른 변형과 동일합니다.

```tsx
<SdHeader.Panel navItems={navItems} loginFlag />
```

`navItems`는 같은 `parentId` 구조로 푸터 링크 컬럼도 만들고, 구분선 아래 하단 바에 카피라이트 · `policyLinks` · `company.socials` 아이콘이 놓입니다.
`socials.platform`은 `x | youtube | instagram | facebook | linkedin | github | blog`를 지원합니다.

### SdLoginView

로그인 화면 전체를 담당하는 organism입니다. `Card`(중앙 정렬 카드, 기본)와 `Split`(좌측 브랜드 패널 + 우측 폼) 두 변형이 있습니다.

```tsx
'use client'
import { SdLoginView } from '@yeongseoksong/framework/ui'

export default function LoginPage() {
  return (
    <SdLoginView.Card
      findPasswordHref="/find-password"
      signUpHref="/signup"
      socials={[
        { provider: 'google', onClick: () => signIn('google') },
        { provider: 'kakao', onClick: () => signIn('kakao') },
      ]}
      onSubmit={({ email, password, remember }) => login(email, password, remember)}
    />
  )
}
```

폼은 **비제어**(`FormData` 기반)입니다 — `@mantine/form`을 의존성으로 들이지 않고도 `onSubmit`이 `{ email, password, remember }`를 그대로 넘겨주므로, 인증 호출과 검증은 소비자가 담당합니다.
`loading`으로 제출 버튼의 로딩 상태를, `error`로 폼 상단 오류 메시지를 제어합니다. `withRemember={false}`면 자동 로그인 체크박스가 사라지고, `findPasswordHref`/`signUpHref`/`socials`는 넘기지 않으면 해당 영역(구분선 포함)이 렌더되지 않습니다. 폼 아래 약관 안내 같은 추가 내용은 `children`으로 넣습니다.

`socials[].provider`는 `google | kakao | naver | apple | github`을 지원하며, 아이콘과 기본 라벨("구글로 로그인" 등)이 함께 고정됩니다. `label`로 라벨만 덮어쓸 수 있습니다.

`Split`은 `brandTitle`/`brandDescription`으로 좌측 패널 문구를 받고(기본값 `%c`), 브랜드 면은 `PageLayout.Brand` 히어로와 같은 배경(`ui/surface.ts`)을 씁니다. 좌측 패널은 `md` 미만에서 숨겨져 폼만 남습니다.
전체 화면이 기본(`mih="100svh"`)이므로, 좁은 영역에 끼워 넣을 때만 `mih`를 줄입니다.

### 상태 관리 — useAuthStore / useUiStore

전역 클라이언트 상태는 **Zustand** 스토어로 **`@yeongseoksong/framework/store`** 경로에서 제공됩니다. Provider가 없으므로 어디서든 훅으로 바로 읽고 씁니다.

```tsx
'use client'
import { useAuthStore, useAuthHydrated } from '@yeongseoksong/framework/store'

function UserMenu() {
  const hydrated = useAuthHydrated()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  // 복원 전에는 로그아웃 상태로 그린다 — 아래 설명 참고
  if (!hydrated || !isAuthenticated) return <LoginButton />
  return <button onClick={logout}>{user?.name} 로그아웃</button>
}
```

로그인 성공 시 `login()`에 사용자 정보를 넣습니다. `SdLoginView`의 `onSubmit`과 바로 이어집니다.

```tsx
<SdLoginView.Card
  onSubmit={async ({ email, password }) => {
    const user = await api.login(email, password)   // 토큰은 httpOnly 쿠키로
    useAuthStore.getState().login({ id: user.id, email: user.email, name: user.name })
    SdToast.Success('로그인했습니다.')
  }}
/>
```

> **액세스 토큰을 스토어에 넣지 마세요.** `partialize`가 사용자 프로필만 localStorage(`sd-auth` 키)에 저장하도록 막아 두었습니다. 토큰을 localStorage에 담으면 XSS 한 번에 그대로 노출됩니다 — 세션 토큰은 httpOnly 쿠키가 맡습니다.

**`useAuthHydrated()`가 필요한 이유**: 저장된 세션 복원을 이펙트로 미룹니다(`skipHydration: true`). 자동 복원은 모듈 평가 시점에 일어나 첫 클라이언트 렌더가 이미 로그인 상태가 되는데, 서버가 만든 HTML은 항상 로그아웃 상태라 하이드레이션이 어긋납니다. 이 훅이 `false`를 주는 동안에는 **로그아웃 상태로** 그리세요. 복원은 훅을 여러 곳에서 써도 앱당 한 번만 실행됩니다.

`useUiStore`는 화면 간 공유가 필요한 UI 상태를 담습니다 — `globalLoading`(전역 로딩 오버레이)과 `sideNavOpened`(사이드 내비) + 토글 액션.

```tsx
const globalLoading = useUiStore((s) => s.globalLoading)
const setGlobalLoading = useUiStore((s) => s.setGlobalLoading)
```

`SdHeader`의 모바일 드로어는 일부러 이 스토어를 쓰지 않습니다 — 한 페이지에 헤더가 둘 이상 있으면 드로어가 함께 열리므로 인스턴스 로컬 상태로 남겨 두었습니다.

### 폼 — useSdForm

모든 폼이 같은 방식으로 값·검증·제출을 다루도록 훅 하나로 통일했습니다.

```tsx
'use client'
import { useSdForm, formRules } from '@yeongseoksong/framework/store'
import { SdInput, SdButton } from '@yeongseoksong/framework/ui'

function ContactForm() {
  const form = useSdForm({
    id: 'contact',                        // 스토어에서 이 폼이 쓸 칸
    initialValues: { name: '', email: '', agree: false },
    rules: {
      name: formRules.required(),
      email: formRules.email(),
      agree: formRules.checked('개인정보 수집에 동의해야 합니다.'),
    },
    successMessage: '문의를 접수했습니다.',
    resetOnSuccess: true,
    onSubmit: async (values) => {
      await api.contact(values)           // 예외를 던지면 실패 경로로 간다
    },
  })

  return (
    <form onSubmit={form.onSubmit}>
      <SdInput.Text label="이름" {...form.getInputProps('name')} />
      <SdInput.Email label="이메일" {...form.getInputProps('email')} />
      <SdInput.Select label="유형" data={['도입', '지원']} {...form.getInputProps('type')} />
      <SdInput.Date label="희망일" {...form.getInputProps('startDate')} />
      <Checkbox label="동의합니다" {...form.getInputProps('agree', { type: 'checkbox' })} />
      <SdButton.Submit type="submit" loading={form.submitting} />
    </form>
  )
}
```

제출은 항상 같은 순서로 흐릅니다.

1. `rules` 검증 → 실패하면 필드 아래 메시지를 붙이고 멈춥니다(값을 고치면 그 필드 에러만 즉시 사라집니다).
2. `submitting`을 켜고 — **이 동안 재제출은 무시됩니다** — `onSubmit(values)`를 부릅니다.
3. 성공: `SdToast.Success`(끄려면 `successMessage: false`) → `resetOnSuccess`면 초기화 → `onSuccess(values)`.
4. 실패(`onSubmit`이 던진 예외): `SdToast.Error` + `form.error`에 메시지 + `onError(error)`. 문구는 `errorMessage(error)`로 바꿉니다.
5. `finalize` — 성공·실패와 무관하게 **항상** 실행됩니다(`finally`에 해당). 아래 항목 참고.

`getInputProps`는 **어느 입력이든 같은 한 줄**입니다. Mantine 입력은 `onChange`로 이벤트를 주는 것(`TextInput`·`Checkbox`)과 값을 그대로 주는 것(`Select`·`NumberInput`·`Slider`·`DateInput`)으로 갈리는데, 훅이 그 차이를 흡수합니다. 값을 `checked`로 받아야 하는 체크박스·스위치만 `{ type: 'checkbox' }`를 붙이세요.

### finalize — 끝나면 항상 도는 뒷정리

`Finalizer`는 폼 전용 타입이 아닙니다. 라우팅·모달 닫기·목록 새로고침처럼 "작업이 끝나면 정리한다"가 필요한 곳이면 어느 스토어에서든 같은 타입을 씁니다.

```ts
import { runFinalizers, type Finalizers } from '@yeongseoksong/framework/util'

type Finalizer = () => unknown | Promise<unknown>   // 인자 없음
type Finalizers = Finalizer | Finalizer[]           // 여러 개면 순서대로
```

인자를 받지 않으므로 **기존 함수를 그대로 꽂습니다.**

```tsx
useSdForm({
  id: 'edit-user',
  initialValues,
  onSubmit: (values) => api.save(values),
  finalize: closeModal,                            // 하나
  // finalize: [closeModal, refetchList, () => router.push('/users')],   // 여러 개
})
```

결과에 따라 갈라져야 하는 일은 `onSuccess(values)` / `onError(error)`에 둡니다 — `finalize`는 결과를 보지 않습니다.

프로미스를 돌려주면 기다렸다가 끝냅니다. `submitting`이 내려간 **뒤에** 실행되므로 여기서 `reset()`이나 다음 제출을 불러도 막히지 않고, `finalize`에서 예외가 나도 작업 결과는 뒤집히지 않습니다(콘솔에만 남습니다). 검증에서 걸려 전송을 하지 않은 경우에는 호출되지 않습니다.

직접 만든 비동기 액션에도 같은 규약을 붙일 수 있습니다.

```ts
async function deleteUser(id: string, finalize?: Finalizers) {
  try {
    await api.delete(id)
    SdToast.Success('삭제했습니다.')
  } finally {
    await runFinalizers(finalize, 'deleteUser')     // label은 콘솔 메시지에만 쓰입니다
  }
}
```

`form`이 돌려주는 것: `values` · `errors` · `submitting` · `error` · `setValue` · `setValues` · `reset` · `getInputProps` · `onSubmit`.

상태는 `formId`로 칸을 나눠 스토어에 있으므로, **같은 id를 쓰면 서로 다른 컴포넌트가 같은 폼을 공유**합니다 — 마법사처럼 단계를 여러 컴포넌트로 쪼개거나, 페이지를 오간 뒤 입력값을 복원할 때 그대로 씁니다. 값까지 지우려면 `useFormStore.getState().removeForm(id)`를 부르세요.

`formRules`: `required()` · `email()` · `minLength(n)` · `checked()` · `sameAs('password')`. 규칙은 `(value, values) => string | null` 형태라 직접 만들어 섞어도 됩니다.

### SdToast — 순간 피드백

저장·삭제·로그인처럼 **잠깐 알리고 사라져야 하는** 결과에 씁니다. 컴포넌트가 아니라 호출하는 함수입니다.

```tsx
'use client'
import { SdToast } from '@yeongseoksong/framework/ui'

await save()
SdToast.Success('저장했습니다.')
SdToast.Error('저장하지 못했습니다.', { title: '네트워크 오류' })
```

변형마다 색·아이콘·기본 제목이 고정됩니다 — `Success`(green ✓ "완료") · `Error`(red ✕ "오류") · `Warning`(amber ⚠ "주의") · `Info`(primary ⓘ "안내") · `Loading`(스피너, 자동으로 닫히지 않음 "처리 중").
두 번째 인자로 Mantine `NotificationData`를 그대로 넘겨 제목·색·`autoClose`를 덮어쓸 수 있습니다.

오래 걸리는 작업은 `Loading`으로 띄운 뒤 반환된 id로 결과 변형으로 **교체**합니다.

```tsx
const id = SdToast.Loading('업로드하는 중입니다…')
try {
  await upload(file)
  SdToast.Update(id, 'Success', '업로드를 마쳤습니다.')
} catch {
  SdToast.Update(id, 'Error', '업로드에 실패했습니다.')
}
```

`SdToast.Hide(id)`로 하나, `SdToast.Clean()`으로 전부 닫습니다.

> 동작 조건 두 가지: 앱 레이아웃에 **`<SdToastProvider />`가 한 번 렌더**되어 있어야 하고, **`@mantine/notifications/styles.css`를 임포트**해야 합니다(위 설정 항목 참고). 위치·자동 닫힘·동시 표시 개수는 `SdToastProvider`가 `top-right` · 4초 · 3개로 고정하며, prop으로 덮어쓸 수 있습니다.

### SdResult — 결과 화면

가입 완료·결제 실패처럼 **페이지 전체가 결과**인 경우에 씁니다. 원형 아이콘 + 제목 + 설명 + 액션 버튼 구성입니다.

```tsx
'use client'
import { SdResult } from '@yeongseoksong/framework/ui'

<SdResult.Success
  title="가입이 완료되었습니다"
  description="입력하신 이메일로 인증 메일을 보냈습니다."
  primaryAction={{ label: '시작하기', onClick: () => router.push('/') }}
  secondaryAction={{ label: '홈으로', onClick: () => router.push('/') }}
/>
```

`Success`(green ✓) / `Error`(red ✕) 두 변형이 있고, 제목은 변형별 기본값(`'완료되었습니다'` / `'문제가 발생했습니다'`)을 씁니다.
액션은 `SdButton`이 `component` prop을 받지 못하므로 `href`가 아니라 `onClick`만 받습니다 — 라우팅은 호출부에서 처리하세요.
주문번호 요약 같은 상세 정보는 `children`으로 넣고, 좁은 영역에 담을 때만 `mih`(기본 `'60vh'`)를 줄입니다.

서버 오류(500)·404처럼 **화면 자체가 오류**인 경우는 `SdResult.Error`가 아니라 `SdErrorView`를 씁니다.

### MainLayout

헤더 + 본문 + 푸터가 포함된 전체 레이아웃입니다.

```tsx
import { MainLayout } from '@yeongseoksong/framework/ui'

export default function Page() {
  return (
    <MainLayout navItems={navItems} companyInfo={company}>
      <main>페이지 내용</main>
    </MainLayout>
  )
}
```

`headerVariant`로 어떤 헤더를 쓸지 고릅니다 — `mega`(기본, hover 시 확장되는 메가 메뉴), `simple`(바 높이 고정 + 항목별 드롭다운), `panel`(바 높이 고정 + 드롭다운 내부를 Mega식 그룹 컬럼으로).

```tsx
<MainLayout navItems={navItems} companyInfo={company} headerVariant="simple" loginFlag>
  <main>페이지 내용</main>
</MainLayout>
```

### t() — 회사명 치환

`NEXT_PUBLIC_COMPANY_NAME=내 회사` 일 때:

```ts
import { t } from '@yeongseoksong/framework/util'

t('%c 서비스') // → '내 회사 서비스'
t('%c에 오신 것을 환영합니다') // → '내 회사에 오신 것을 환영합니다'
```

`SdText`/`SdTitle`은 문자열 children에 `t()`를 자동으로 적용하므로 직접 호출할 일은 드뭅니다.

### 한글 조사 — josa / withJosa / fixJosa

회사명·사용자 이름·품목명처럼 **런타임에 정해지는 값** 뒤에 조사가 붙을 때, 받침에 맞는 형태를 골라 줍니다. React·DOM에 의존하지 않는 순수 함수라 서버·클라이언트 어디서든 씁니다.

```ts
import { josa, withJosa, fixJosa, hasFinalConsonant } from '@yeongseoksong/framework/util'

josa('가나전자', '은/는') // '는'
josa('한빛', '은/는') // '은'
withJosa('한빛', '을/를') // '한빛을'
hasFinalConsonant('수박') // true
```

지원 쌍: `은/는` `이/가` `을/를` `과/와` `으로/로` `아/야` `이라/라` `이나/나` `이란/란` `이여/여`. 표기는 항상 **'받침 있을 때/없을 때'** 순서입니다.

판단 기준은 마지막 소리입니다 — 한글 음절은 종성으로, **숫자는 읽는 소리로**(`3` 삼 → 받침 있음, `2` 이 → 없음), **알파벳도 읽는 소리로**(`URL`의 L=엘 → 받침 있음, `API`의 I=아이 → 없음) 봅니다. 괄호·문장부호로 끝나면 그 앞의 실제 글자까지 거슬러 올라갑니다(`가나(주)` → '주' 기준). `으로/로`만 예외로 **ㄹ 받침을 받침 없음처럼** 다룹니다(`서울로`, `7로`).

원고에 두 형태를 병기해 두고 마지막에 한 번 정리하는 방식도 됩니다.

```ts
fixJosa(t('%c은(는) 이렇게 일합니다')) // → '가나전자는 이렇게 일합니다'
fixJosa('서울(으)로 이전했습니다') // → '서울로 이전했습니다'
```

`은(는)` `이(가)` `을(를)` `과(와)`(역순 표기 포함)와 `(으)로` `(이)라` `(이)나` `(이)란` `(이)여`를 알아봅니다. 그 외의 괄호(`(주)가나`)는 건드리지 않습니다. `t()`는 `fixJosa`를 자동으로 부르지 **않습니다** — 필요한 문자열에서만 감싸 쓰세요.

> `setCompanyName()`은 **deprecated이며 2.0.0에서 제거됩니다.** tsup이 `ui`와 `util`을 별개 번들로 빌드하면서 `text.util`이 `dist/ui`에 인라인 복사되기 때문에, 이 함수로 값을 바꿔도 `t()`를 실제로 호출하는 `SdText`/`SdTitle`은 다른 사본을 읽습니다. 즉 처음부터 동작하지 않았습니다. 환경변수는 번들러가 양쪽 번들에 동일한 리터럴을 박아넣으므로 이 문제가 없습니다.

---

## 타입

```ts
import type {
  NavItem, // 네비게이션 메뉴
  HeroSlide, // 히어로 캐러셀 슬라이드
  FeatureItem, // 기능 카드
  TimelineEvent, // 연혁 타임라인
  SolutionItem, // 솔루션 카드
  StepItem, // 단계별 안내
  TestimonialItem, // 고객 후기
  PricingItem, // 요금제 플랜
  PricingFeature, // 요금제 항목
  FaqItem, // FAQ
  ClientItem, // 고객사 로고
  CompanyInfo, // 회사 정보 전체
  CompanyAddress, // 회사 주소
} from '@yeongseoksong/framework/types'
```

---

## 피어 의존성

| 패키지              | 버전   |
| ------------------- | ------ |
| `@mantine/core`     | ^9.2.2 |
| `@mantine/hooks`    | ^9.2.2 |
| `@mantine/carousel` | ^9.2.2 |
| `@mantine/notifications` | ^9.2.2 |
| `@mantine/dates`    | ^9.2.2 (dayjs 필요) |
| `zustand`           | ^5.0.14 |
| `next`              | 16.2.2 |
| `react`             | 19.2.4 |
| `react-dom`         | 19.2.4 |
