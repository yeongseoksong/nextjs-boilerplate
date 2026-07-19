import { Suspense } from "react";
import {
  HeroCarousel,
  SdContainer,
  SdFeatureSection,
  SdTextBoxSection,
  SdClientsGrid,
  SdClientsMarquee,
  SdMapTabs,
  SdMapSingle,
  SdSkeletonCard,
} from "@framework/ui";
import { clientItems, companyInfo, featureItems, heroSlides } from "../data";
import { Divider, SimpleGrid, Stack } from "@mantine/core";
import DelayedServiceSection from "./_demo/DelayedServiceSection";

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={heroSlides} />

      <SdFeatureSection
        label="핵심 기능"
        title="왜 선택해야 할까요?"
        description="복잡한 엔터프라이즈 요구사항을 충족하면서도 누구나 쉽게 사용할 수 있는 올인원 플랫폼입니다."
        items={featureItems}
        py="xl"
      />

      {/* ── 고객사 ── */}
      <SdContainer py="xl">
        <Stack gap="xl">
          <SdTextBoxSection
            label="Clients"
            title="함께하는 고객사"
            description="다양한 산업의 기업과 공공기관이 신뢰하고 있습니다."
            align="center"
            ta="center"
          />
          <Divider label="Grid" labelPosition="left" />
          <SdClientsGrid items={clientItems} />
          <Divider label="Marquee" labelPosition="left" />
          <SdClientsMarquee items={clientItems} />
        </Stack>
      </SdContainer>

      {/* ── 오시는 길 ── */}
      <SdContainer py="xl">
        <Stack gap="xl">
          <SdTextBoxSection
            label="Location"
            title="오시는 길"
            description="본사 및 지사 위치를 안내합니다."
            align="center"
            ta="center"
          />
          <Divider label="Tabs (여러 주소)" labelPosition="left" />
          <SdMapTabs addresses={companyInfo.addresses} height={360} />
          <Divider label="Single (단일 주소)" labelPosition="left" />
          <SdMapSingle address={companyInfo.addresses[0]} height={300} />
        </Stack>
      </SdContainer>

      {/* ── Skeleton Demo ── */}
      <SdContainer py="xl">
        <Stack gap="xl">
          <SdTextBoxSection
            label="Skeleton Demo"
            title="비동기 로딩 예시"
            description="서버 응답 전 Suspense fallback으로 SdSkeletonCard가 표시됩니다. (2초 지연)"
            align="center"
            ta="center"
          />
          <Suspense
            fallback={
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SdSkeletonCard key={i} lines={2} />
                ))}
              </SimpleGrid>
            }
          >
            <DelayedServiceSection />
          </Suspense>
        </Stack>
      </SdContainer>
    </>
  );
}
