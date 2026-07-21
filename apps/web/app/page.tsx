import Link from 'next/link'
import { Card, Group, SimpleGrid, Stack } from '@mantine/core'
import {
  SdBadgePrimary,
  SdContainer,
  SdTextBody,
  SdTextHint,
  SdTextNumeric,
  SdTextBoxSection,
  SdTitleCard,
} from '@framework/ui'
import { CodeBlock } from './_catalog/Showcase'

/**
 * 이 페이지는 Server Component다. 따라서 프레임워크 컴포넌트를 네임스페이스
 * dot(`SdText.Body`)이 아니라 flat export(`SdTextBody`)로 가져온다.
 * 배포된 번들에서는 dot 접근이 client reference proxy에 막혀 실패한다.
 */

const sections = [
  {
    href: '/components/atom',
    name: 'Atom',
    count: 13,
    description: '더 이상 쪼갤 수 없는 최소 단위. SdTitle, SdText, SdButton, SdInput 등.',
  },
  {
    href: '/components/molecule',
    name: 'Molecule',
    count: 12,
    description: 'atom을 조합한 의미 단위. SdTextBox, SdSteps, SdPricingCard 등.',
  },
  {
    href: '/components/organism',
    name: 'Organism',
    count: 7,
    description: '페이지의 한 구획. HeroCarousel, SdHeader, SdFooter 등.',
  },
]

export default function HomePage() {
  return (
    <SdContainer py="xl">
      <Stack gap={64}>
        <SdTextBoxSection
          label="Component Catalog"
          title="@yeongseoksong/framework"
          description="Mantine 9 기반 디자인 시스템입니다. 모든 컴포넌트와 variant를 실제 렌더 결과로 확인하고, import 코드를 그대로 복사해 쓸 수 있습니다."
          maxDescWidth={640}
        />

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          {sections.map((s) => (
            <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
              <Card withBorder padding="lg" radius="md" h="100%">
                <Stack gap="sm">
                  <Group justify="space-between" align="center">
                    <SdTitleCard>{s.name}</SdTitleCard>
                    <SdBadgePrimary>{s.count}</SdBadgePrimary>
                  </Group>
                  <SdTextBody>{s.description}</SdTextBody>
                </Stack>
              </Card>
            </Link>
          ))}
        </SimpleGrid>

        <Stack gap="lg" id="install">
          <SdTextBoxSection
            label="Install"
            title="설치"
            description="peerDependencies로 react, react-dom, next, @mantine/* 이 필요합니다."
          />
          <CodeBlock
            code={
              'pnpm add @yeongseoksong/framework @mantine/core @mantine/hooks @mantine/carousel'
            }
          />
        </Stack>

        <Stack gap="lg" id="env">
          <SdTextBoxSection
            label="Setup"
            title="환경변수"
            description="소비자별 상수는 NEXT_PUBLIC_* 로 주입합니다. 빌드 시점에 번들로 인라인되므로 비밀값은 넣지 마세요."
          />
          <CodeBlock
            code={[
              '# 필수 — SdText/SdTitle 문자열의 %c 토큰이 이 값으로 치환됩니다',
              'NEXT_PUBLIC_COMPANY_NAME=주식회사 회사명',
              '',
              '# 선택 — 헤더 로고 (기본값: /logo.svg, "로고")',
              'NEXT_PUBLIC_LOGO_SRC=/logo.svg',
              'NEXT_PUBLIC_LOGO_ALT=회사 로고',
            ].join('\n')}
          />
        </Stack>

        <Stack gap="lg">
          <SdTextBoxSection
            label="Important"
            title="Server Component에서는 flat export"
            description="ui 번들 전체에 'use client'가 붙으므로, 서버 컴포넌트가 네임스페이스를 dot 접근하면 client reference proxy에서 undefined가 반환되어 렌더가 실패합니다."
          />
          <CodeBlock
            code={[
              '// ❌ Server Component에서 실패',
              '//    Element type is invalid: expected a string ... got: undefined',
              'import { SdText } from "@yeongseoksong/framework/ui";',
              '<SdText.Body>본문</SdText.Body>',
              '',
              '// ✅ flat export 사용',
              'import { SdTextBody } from "@yeongseoksong/framework/ui";',
              '<SdTextBody>본문</SdTextBody>',
            ].join('\n')}
          />
          <SdTextHint>
            Client Component 안에서는 네임스페이스 형태를 그대로 써도 됩니다. 이 카탈로그의 각
            컴포넌트 페이지가 그 예입니다.
          </SdTextHint>
        </Stack>

        <Group gap="xl">
          <Stack gap={2}>
            <SdTextNumeric>32</SdTextNumeric>
            <SdTextHint>컴포넌트</SdTextHint>
          </Stack>
          <Stack gap={2}>
            <SdTextNumeric>60+</SdTextNumeric>
            <SdTextHint>variant</SdTextHint>
          </Stack>
        </Group>
      </Stack>
    </SdContainer>
  )
}
