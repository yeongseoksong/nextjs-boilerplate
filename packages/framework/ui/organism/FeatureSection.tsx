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
  py = 0,
  ...boxProps
}: SdFeatureSectionProps) {
  return (
      <Container py={py} {...boxProps}>
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
  )
}
