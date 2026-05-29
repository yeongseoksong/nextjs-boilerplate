'use client'

import { Anchor, Group, Stack } from '@mantine/core'
import { NavItem } from '../../../types'

interface FooterNavProps {
  items: NavItem[]
}

export function FooterNav({ items }: FooterNavProps) {
  const topLevel = items.filter((item) => !item.parentId)
  const getChildren = (parentId: number) => items.filter((item) => item.parentId === parentId)

  return (
    <Group gap="xl"  align="flex-start" wrap="wrap">
      {topLevel.map((item) => {
        const children = getChildren(item.id)
        return (
          <Stack key={item.id} gap={4}>
            <Anchor href={item.href} fz="sm" fw={500}>
              {item.label}
            </Anchor>
            {children.map((child) => (
              <Anchor key={child.id} href={child.href} fz="xs">
                {child.label}
              </Anchor>
            ))}
          </Stack>
        )
      })}
    </Group>
  )
}
