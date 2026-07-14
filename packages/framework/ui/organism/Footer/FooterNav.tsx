'use client'

import { Anchor, Group, Stack } from '@mantine/core'
import { NavItem } from '../../../types'
import { SdText } from '../../atom'

interface FooterNavProps {
  items: NavItem[]
}

export function FooterNav({ items }: FooterNavProps) {
  const topLevel = items.filter((item) => !item.parentId)
  const getChildren = (parentId: number) => items.filter((item) => item.parentId === parentId)

  return (
    <Group gap={48} align="flex-start" wrap="wrap">
      {topLevel.map((item) => {
        const children = getChildren(item.id)
        return (
          <Stack key={item.id} gap="sm">
            <SdText.Eyebrow c="slate.4">{item.label}</SdText.Eyebrow>
            {children.map((child) => (
              <Anchor key={child.id} href={child.href} fz="xs" c="slate.5" underline="never"
                style={{ transition: 'color 0.15s' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--mantine-color-slate-1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '' }}
              >
                {child.label}
              </Anchor>
            ))}
          </Stack>
        )
      })}
    </Group>
  )
}
