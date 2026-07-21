'use client'

import {
  Box,
  Card,
  CardProps,
  Divider,
  Group,
  SimpleGrid,
  SimpleGridProps,
  Stack,
  ThemeIcon,
} from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { PricingItem } from '../../types'
import { SdBadge } from '../atom/Badge'
import { SdButton } from '../atom/Button'
import { SdText } from '../atom/Text'
import { SdTitle } from '../atom/Title'

interface SdPricingCardProps extends Omit<CardProps, 'children'> {
  item: PricingItem
  onSelect?: (item: PricingItem) => void
}

function Default({ item, onSelect, ...cardProps }: SdPricingCardProps) {
  return (
    <Card withBorder style={{ position: 'relative' }} {...cardProps}>
      <Stack gap="xl">
        {/* Header */}
        <Stack gap="xs">
          <Group justify="space-between" align="flex-start">
            <SdTitle.Card>{item.name}</SdTitle.Card>
            {item.isPopular && <SdBadge.Primary>추천</SdBadge.Primary>}
          </Group>
          {item.description && <SdText.Sub>{item.description}</SdText.Sub>}
        </Stack>

        {/* Price */}
        <Group gap={4} align="baseline">
          <SdTitle.Display>{item.price}</SdTitle.Display>
          {item.period && <SdText.Sub>/ {item.period}</SdText.Sub>}
        </Group>

        <Divider />

        {/* Features */}
        <Stack gap="sm">
          {item.features.map((f, i) => (
            <Group key={i} gap="sm" wrap="nowrap">
              <ThemeIcon
                size="xs"
                radius="xl"
                color={f.included ? 'primary' : 'slate'}
                variant={f.included ? 'filled' : 'subtle'}
              >
                {f.included ? <IconCheck size={12} /> : <IconX size={12} />}
              </ThemeIcon>
              <SdText.Body fz="sm" c={f.included ? 'slate.7' : 'slate.4'}>
                {f.text}
              </SdText.Body>
            </Group>
          ))}
        </Stack>

        {/* CTA */}
        <SdButton.Outline fullWidth onClick={() => onSelect?.(item)}>
          {item.ctaLabel ?? '시작하기'}
        </SdButton.Outline>
      </Stack>
    </Card>
  )
}

function Featured({ item, onSelect, ...cardProps }: SdPricingCardProps) {
  return (
    <Card bg="primary.6" style={{ position: 'relative' }} {...cardProps}>
      <Stack gap="xl">
        {/* Header */}
        <Stack gap="xs">
          <Group justify="space-between" align="flex-start">
            <SdTitle.Card c="white">{item.name}</SdTitle.Card>
            {item.isPopular && (
              <SdBadge.Default c="white" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
                추천
              </SdBadge.Default>
            )}
          </Group>
          {item.description && <SdText.Body c="primary.1">{item.description}</SdText.Body>}
        </Stack>

        {/* Price */}
        <Group gap={4} align="baseline">
          <SdTitle.Display c="white">{item.price}</SdTitle.Display>
          {item.period && <SdText.Body c="primary.2">/ {item.period}</SdText.Body>}
        </Group>

        <Divider color="primary.4" />

        {/* Features */}
        <Stack gap="sm">
          {item.features.map((f, i) => (
            <Group key={i} gap="sm" wrap="nowrap">
              <ThemeIcon
                size="xs"
                radius="xl"
                color="white"
                variant={f.included ? 'filled' : 'subtle'}
              >
                {f.included ? (
                  <IconCheck size={12} color="var(--mantine-color-primary-6)" />
                ) : (
                  <IconX size={12} color="rgba(255,255,255,0.4)" />
                )}
              </ThemeIcon>
              <SdText.Body fz="sm" c={f.included ? 'white' : 'primary.3'}>
                {f.text}
              </SdText.Body>
            </Group>
          ))}
        </Stack>

        {/* CTA */}
        <SdButton.White fullWidth onClick={() => onSelect?.(item)}>
          {item.ctaLabel ?? '시작하기'}
        </SdButton.White>
      </Stack>
    </Card>
  )
}

interface SdPricingGridProps {
  items: PricingItem[]
  cols?: SimpleGridProps['cols']
  onSelect?: (item: PricingItem) => void
}

function Grid({ items, cols = { base: 1, sm: 2, md: 3 }, onSelect }: SdPricingGridProps) {
  return (
    <SimpleGrid cols={cols} spacing="xl" style={{ alignItems: 'stretch' }}>
      {items.map((item, i) =>
        item.isPopular ? (
          <Featured key={i} item={item} onSelect={onSelect} />
        ) : (
          <Default key={i} item={item} onSelect={onSelect} />
        ),
      )}
    </SimpleGrid>
  )
}

export const SdPricingCard = {
  /** 기본 outlined 카드 */
  Default,
  /** 강조 — primary 배경 */
  Featured,
  /** 가격 그리드 (isPopular 항목은 자동으로 Featured 처리) */
  Grid,
}

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdPricingCardDefault = SdPricingCard.Default
export const SdPricingCardFeatured = SdPricingCard.Featured
export const SdPricingCardGrid = SdPricingCard.Grid
