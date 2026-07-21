'use client'

import { Button, Card, CardProps, SimpleGrid, SimpleGridProps, Stack } from '@mantine/core'
import Link from 'next/link'
import { SolutionItem } from '../../types'
import { SdBadge } from '../atom/Badge'
import { SdButton } from '../atom/Button'
import { SdText } from '../atom/Text'
import { SdTitle } from '../atom/Title'

interface SdSolutionCardItemProps extends Omit<CardProps, 'children'> {
  item: SolutionItem
  onSelect?: (item: SolutionItem) => void
}

function SolutionCardItem({ item, onSelect, ...cardProps }: SdSolutionCardItemProps) {
  return (
    <Card withBorder {...cardProps}>
      <Stack gap="md">
        {item.icon}
        <SdBadge.Primary>{item.category}</SdBadge.Primary>
        <SdTitle.Card>{item.title}</SdTitle.Card>
        <SdText.Body>{item.description}</SdText.Body>
        {item.href ? (
          <Button variant="subtle" color="slate" component={Link} href={item.href}>
            {item.ctaLabel ?? '자세히 보기'} →
          </Button>
        ) : (
          <SdButton.Ghost onClick={() => onSelect?.(item)}>
            {item.ctaLabel ?? '자세히 보기'} →
          </SdButton.Ghost>
        )}
      </Stack>
    </Card>
  )
}

interface SdSolutionGridProps {
  items: SolutionItem[]
  cols?: SimpleGridProps['cols']
  onSelect?: (item: SolutionItem) => void
}

function Grid({ items, cols = { base: 1, sm: 2, md: 3 }, onSelect }: SdSolutionGridProps) {
  return (
    <SimpleGrid cols={cols} spacing="xl">
      {items.map((item, i) => (
        <SolutionCardItem key={i} item={item} onSelect={onSelect} />
      ))}
    </SimpleGrid>
  )
}

export const SdSolutionCard = {
  /** 단일 compact 카드 */
  Item: SolutionCardItem,
  /** 카드 그리드 */
  Grid,
}

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdSolutionCardItem = SdSolutionCard.Item
export const SdSolutionCardGrid = SdSolutionCard.Grid
