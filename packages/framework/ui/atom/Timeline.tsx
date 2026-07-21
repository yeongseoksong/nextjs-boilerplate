'use client'
import { Group, Stack, Timeline as MantineTimeline } from '@mantine/core'
import { TimelineEvent } from '../../types'
import { SdText } from './Text'
import { SdTitle } from './Title'

interface SdTimelineProps {
  items: TimelineEvent[]
}

export function SdTimeline({ items }: SdTimelineProps) {
  const grouped = items
    .filter((item) => item.isShow)
    .sort((a, b) => b.year - a.year || b.month - a.month)
    .reduce<Record<number, TimelineEvent[]>>((acc, item) => {
      ;(acc[item.year] ??= []).push(item)
      return acc
    }, {})

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <MantineTimeline active={items.length} bulletSize={24} lineWidth={2}>
      {years.map((year) => (
        <MantineTimeline.Item key={year} title={<SdTitle.Sub>{year}년</SdTitle.Sub>}>
          <Stack gap={6} mt="xs">
            {grouped[year].map((event) => (
              <Group key={event.id} gap="md" align="flex-start" wrap="nowrap">
                <SdText.Eyebrow miw={28}>{event.month}월</SdText.Eyebrow>
                <SdText.Body style={{ flex: 1 }}>{event.description}</SdText.Body>
              </Group>
            ))}
          </Stack>
        </MantineTimeline.Item>
      ))}
    </MantineTimeline>
  )
}
