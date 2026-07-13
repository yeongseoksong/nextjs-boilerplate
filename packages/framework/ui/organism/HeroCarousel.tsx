"use client";
import { Carousel } from "@mantine/carousel";
import { Box, Stack } from "@mantine/core";
import { SdTextBox } from "../molecule";
import { HeroSlide } from "../../types";
import { filterAndSort } from "../../util/sort.util";


interface HeroCarouselProps {
  slides: HeroSlide[];
}

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const filterdSlides =filterAndSort(slides);
  return (
    <Carousel withIndicators  height="60svh" >
      {filterdSlides.map((slide, i) => (
        <Carousel.Slide key={i}>
          <Box
            style={{
              height: "100%",
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack align="center" style={{ textAlign: "center", maxWidth: 780}} px="xl">
              <SdTextBox.Hero
                title={slide.title}
                description={slide.description}
                ta="center"
                align="center"
              />
            </Stack>
          </Box>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
}
