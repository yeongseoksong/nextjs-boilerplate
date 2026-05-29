"use client";

import { Box, Card, Container, SimpleGrid } from "@mantine/core";
import { SdTextBox, HeroCarousel } from "../framework/ui";
import { heroSlides, features } from "../framework/example/example";

function Features() {
  return (
    <Box py={96} bg="white">
      <Container size="xl">
        <SdTextBox.Section
          label="핵심 기능"
          title="왜 %c 인가요?"
          description="복잡한 엔터프라이즈 요구사항을 충족하면서도 누구나 쉽게 사용할 수 있는 올인원 플랫폼입니다."
          maxDescWidth={520}
          ta="center"
        />
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
          {features.map((f) => (
            <Card key={f.title}>
              <SdTextBox.Card title={f.title} description={f.desc} />
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <Features />
    </>
  );
}
