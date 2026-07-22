'use client'
import React from 'react'
import { Carousel } from '@mantine/carousel'
import { Anchor, Box, Group, Stack } from '@mantine/core'
import { SdTextBox } from '../molecule'
import { SdButton } from '../atom'
import { HeroCta, HeroSlide } from '../../types'
import { filterAndSort } from '../../util/sort.util'
import { IconArrowNarrowRight } from '@tabler/icons-react'

const variantMap = {
  primary: SdButton.Primary,
  secondary: SdButton.Secondary,
  outline: SdButton.Outline,
  white: SdButton.White,
} as const

function CtaButton({ cta }: { cta: HeroCta }) {
  const Button = variantMap[cta.variant ?? 'primary']
  return (
    <Anchor href={cta.href} underline="never">
      {cta.icon ? (
        <Button size="md" rightSection={<IconArrowNarrowRight />}>
          {cta.label}
        </Button>
      ) : (
        <Button size="md">{cta.label}</Button>
      )}
    </Anchor>
  )
}

interface HeroCarouselProps {
  slides: HeroSlide[]
  children?: React.ReactNode
}

export function HeroCarousel({ slides, children }: HeroCarouselProps) {
  if (children) return <>{children}</>

  const filterdSlides = filterAndSort(slides)
  return (
    <Carousel withIndicators height="60svh">
      {filterdSlides.map((slide, i) => (
        <Carousel.Slide key={i}>
          <Box
            style={{
              height: '100%',
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack align="center" style={{ textAlign: 'center', maxWidth: 780 }} px="xl">
              <SdTextBox.Hero
                title={slide.title}
                description={slide.description}
                ta="center"
                align="center"
              />
              {slide.ctas && slide.ctas.length > 0 && (
                <Group gap="sm" mt="md">
                  {slide.ctas.map((cta, i) => (
                    <CtaButton key={cta.href} cta={cta} />
                  ))}
                </Group>
              )}
            </Stack>
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}
