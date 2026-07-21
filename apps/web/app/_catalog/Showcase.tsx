'use client'

import { ReactNode } from 'react'
import {
  Box,
  CopyButton,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { SdBadgeDefault, SdTextHint, SdTextSub, SdTitleCard } from '@framework/ui'

/**
 * 카탈로그 전용 프리미티브.
 *
 * 페이지 디자인은 프레임워크 컴포넌트(SdTitle/SdText/SdBadge)로 구성하고,
 * 프레임워크에 없는 것(코드 블록·프리뷰 프레임)만 여기서 Mantine으로 만든다.
 */

export function CodeBlock({ code }: { code: string }) {
  return (
    <Paper withBorder radius="md" bg="slate.0" p={0} style={{ overflow: 'hidden' }}>
      <Group justify="space-between" px="sm" py={6} bg="slate.1">
        <SdTextHint>import</SdTextHint>
        <CopyButton value={code} timeout={1500}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? '복사됨' : '복사'} withArrow>
              <UnstyledButton onClick={copy}>
                <SdTextHint>{copied ? '✓ 복사됨' : '복사'}</SdTextHint>
              </UnstyledButton>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
      <ScrollArea type="auto">
        <Box
          component="pre"
          m={0}
          p="sm"
          style={{
            fontFamily: 'var(--mantine-font-family-monospace)',
            fontSize: 'var(--mantine-font-size-xs)',
            lineHeight: 1.7,
            whiteSpace: 'pre',
          }}
        >
          {code}
        </Box>
      </ScrollArea>
    </Paper>
  )
}

/** 컴포넌트 하나에 대한 데모 블록. */
export function Showcase({
  name,
  description,
  exports: exportNames,
  children,
}: {
  name: string
  description: string
  /** 이 컴포넌트가 제공하는 flat export 이름들 */
  exports: string[]
  children: ReactNode
}) {
  const code = `import {\n${exportNames.map((e) => `  ${e},`).join('\n')}\n} from "@yeongseoksong/framework/ui";`

  return (
    // id는 nav의 앵커 대상이다(`nav.ts`의 anchors()가 이 name을 그대로 참조).
    // scrollMarginTop — AppShell의 고정 헤더(60px) 아래로 제목이 숨지 않도록.
    <Stack gap="md" id={name} style={{ scrollMarginTop: 80 }}>
      <Stack gap={4}>
        <Group gap="sm" align="baseline">
          <SdTitleCard>{name}</SdTitleCard>
          <SdBadgeDefault>{exportNames.length} variants</SdBadgeDefault>
        </Group>
        <SdTextSub>{description}</SdTextSub>
      </Stack>

      <CodeBlock code={code} />

      <Paper withBorder radius="md" p="lg">
        {children}
      </Paper>
    </Stack>
  )
}

/** variant 하나를 라벨과 함께 감싸 시각적으로 비교하게 한다. */
export function Variant({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Stack gap="xs">
      <SdTextHint>{label}</SdTextHint>
      {children}
    </Stack>
  )
}
