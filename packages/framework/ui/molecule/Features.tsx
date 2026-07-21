import { Card, SimpleGrid, SimpleGridProps, Stack } from '@mantine/core'
import { FeatureItem } from '../../types'
import { filterAndSort } from '../../util/sort.util'
import { SdTextBox } from './TextBox'

interface SdFeaturesProps {
  items: FeatureItem[]
  cols?: SimpleGridProps['cols']
}

export function SdFeatures({ items, cols = { base: 1, sm: 2, md: 3 } }: SdFeaturesProps) {
  const visible = filterAndSort(items)

  return (
    <SimpleGrid cols={cols} spacing="xl">
      {visible.map((item) => (
        <Card key={item.id}>
          <Stack key={item.id} gap="sm">
            {item.icon}
            <SdTextBox.Card label={item.label} title={item.title} description={item.description} />
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  )
}
