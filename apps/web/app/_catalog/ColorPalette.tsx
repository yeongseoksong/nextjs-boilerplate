'use client'

import { Box, CopyButton, Group, SimpleGrid, Stack, Tooltip, UnstyledButton } from '@mantine/core'
import { SdText, SdTitle, theme } from '@framework/ui'

/**
 * theme.colors를 그대로 읽어 렌더하므로 팔레트를 고치면 이 페이지도 같이 바뀐다.
 *
 * 이 파일이 client인 이유: `theme.ts`에 `"use client"`가 있어 서버 컴포넌트에서
 * `theme.colors`를 dot 접근하면 client reference proxy에 막힌다.
 */

/** `dark`는 slate의 별칭이라 따로 보여주지 않는다. */
const PALETTES = [
  { name: 'primary', note: '브랜드 · 버튼·링크·강조' },
  { name: 'secondary', note: '보조 강조' },
  { name: 'slate', note: '중립 — 텍스트·보더·배경 전반 (dark 별칭)' },
  { name: 'red', note: '위험·오류 — SdText.Error, SdButton.Delete' },
  { name: 'green', note: '성공·확인 — SdButton.Excel, SdToast.Success, SdResult.Success' },
  { name: 'amber', note: '경고 — SdBadge.Warning, SdToast.Warning' },
] as const

/** theme의 primaryShade에서 브랜드 앵커 인덱스를 끌어온다(하드코딩하지 않는다). */
const anchorShade =
  typeof theme.primaryShade === 'object' ? theme.primaryShade.light : theme.primaryShade

export function ColorPalette() {
  const colors = theme.colors ?? {}

  return (
    <Stack gap="xl">
      {PALETTES.map(({ name, note }) => {
        const tuple = colors[name]
        if (!tuple) return null

        return (
          <Stack key={name} gap="xs">
            <Group gap="sm" align="baseline">
              <SdTitle.Sub>{name}</SdTitle.Sub>
              <SdText.Hint>{note}</SdText.Hint>
            </Group>

            <SimpleGrid cols={{ base: 5, sm: 10 }} spacing={6}>
              {tuple.map((hex, index) => {
                const token = `${name}.${index}`
                const isAnchor = name === 'primary' && index === anchorShade

                return (
                  <CopyButton key={token} value={hex} timeout={1200}>
                    {({ copied, copy }) => (
                      <Tooltip label={copied ? '복사됨' : `${token} · ${hex}`} withArrow>
                        <UnstyledButton onClick={copy}>
                          <Stack gap={4}>
                            <Box
                              h={52}
                              bg={hex}
                              style={{
                                borderRadius: 'var(--mantine-radius-sm)',
                                border: '1px solid var(--mantine-color-slate-2)',
                                outline: isAnchor
                                  ? '2px solid var(--mantine-color-slate-9)'
                                  : undefined,
                                outlineOffset: 2,
                              }}
                            />
                            <SdText.Hint ta="center">{index}</SdText.Hint>
                          </Stack>
                        </UnstyledButton>
                      </Tooltip>
                    )}
                  </CopyButton>
                )
              })}
            </SimpleGrid>
          </Stack>
        )
      })}
    </Stack>
  )
}
