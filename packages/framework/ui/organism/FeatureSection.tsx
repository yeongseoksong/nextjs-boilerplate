'use client'

import { Box, BoxProps, Container, SimpleGridProps, Stack } from '@mantine/core'
import { ReactNode } from 'react'
import { FeatureItem } from '../../types'
import { SdFeatures } from '../molecule'
import { SdTextBox } from '../molecule'

interface SdFeatureSectionProps extends Omit<BoxProps, 'title'> {
  label?: string
  title: ReactNode
  description?: ReactNode
  items: FeatureItem[]
  cols?: SimpleGridProps['cols']
}

export function SdFeatureSection({
  label,
  title,
  description,
  items,
  cols,
  py = 96,
  ...boxProps
}: SdFeatureSectionProps) {
  return (
    <Box py={py} {...boxProps}>
      <Container size="xl">
        <Stack gap="xl">
          <SdTextBox.Section
            label={label}
            title={title}
            description={description}
            maxDescWidth={520}
            ta="center"
            align="center"
          />
          <SdFeatures items={items} cols={cols} />
        </Stack>
      </Container>
    </Box>
  )
}
