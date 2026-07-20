# @yeongseoksong/framework

Mantine 9 기반 공유 UI 컴포넌트 라이브러리. Next.js App Router 환경에서 사용하도록 설계되었습니다.

## 설치

```bash
pnpm add @yeongseoksong/framework
```

피어 의존성 설치:

```bash
pnpm add @mantine/core @mantine/hooks @mantine/carousel react react-dom next
```

## 설정

### 1. MantineProvider + theme

```tsx
// app/layout.tsx
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import { MantineProvider } from '@mantine/core'
import { theme } from '@yeongseoksong/framework/ui'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </body>
    </html>
  )
}
```

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

## 임포트 경로

| 경로 | 내용 |
|---|---|
| `@yeongseoksong/framework/ui` | UI 컴포넌트 전체 + `theme` (`"use client"`) |
| `@yeongseoksong/framework/util` | `t()`, `COMPANY_NAME`, `LOGO_SRC`, `LOGO_ALT` |
| `@yeongseoksong/framework/types` | 공유 인터페이스 |

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

// 삭제 (휴지통 아이콘 자동 포함)
<SdButton.Delete onClick={handleDelete}>삭제</SdButton.Delete>

// 취소 (X 아이콘 자동 포함)
<SdButton.Cancel onClick={handleClose}>닫기</SdButton.Cancel>
```

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
}

<SdHeader navItems={navItems} loginFlag />
<SdFooter company={company} utilityLinks={navItems} />
```

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

### t() — 회사명 치환

`NEXT_PUBLIC_COMPANY_NAME=내 회사` 일 때:

```ts
import { t } from '@yeongseoksong/framework/util'

t('%c 서비스')          // → '내 회사 서비스'
t('%c에 오신 것을 환영합니다') // → '내 회사에 오신 것을 환영합니다'
```

`SdText`/`SdTitle`은 문자열 children에 `t()`를 자동으로 적용하므로 직접 호출할 일은 드뭅니다.

> `setCompanyName()`은 **deprecated이며 2.0.0에서 제거됩니다.** tsup이 `ui`와 `util`을 별개 번들로 빌드하면서 `text.util`이 `dist/ui`에 인라인 복사되기 때문에, 이 함수로 값을 바꿔도 `t()`를 실제로 호출하는 `SdText`/`SdTitle`은 다른 사본을 읽습니다. 즉 처음부터 동작하지 않았습니다. 환경변수는 번들러가 양쪽 번들에 동일한 리터럴을 박아넣으므로 이 문제가 없습니다.

---

## 타입

```ts
import type {
  NavItem,          // 네비게이션 메뉴
  HeroSlide,        // 히어로 캐러셀 슬라이드
  FeatureItem,      // 기능 카드
  TimelineEvent,    // 연혁 타임라인
  SolutionItem,     // 솔루션 카드
  StepItem,         // 단계별 안내
  TestimonialItem,  // 고객 후기
  PricingItem,      // 요금제 플랜
  PricingFeature,   // 요금제 항목
  FaqItem,          // FAQ
  ClientItem,       // 고객사 로고
  CompanyInfo,      // 회사 정보 전체
  CompanyAddress,   // 회사 주소
} from '@yeongseoksong/framework/types'
```

---

## 피어 의존성

| 패키지 | 버전 |
|---|---|
| `@mantine/core` | ^9.2.2 |
| `@mantine/hooks` | ^9.2.2 |
| `@mantine/carousel` | ^9.2.2 |
| `next` | 16.2.2 |
| `react` | 19.2.4 |
| `react-dom` | 19.2.4 |
