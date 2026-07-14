"use client";

import { HeroCarousel, SdClients, SdContainer, SdFeatureSection, SdMap, SdTextBox } from "@framework/ui";
import { clientItems, companyInfo, featureItems, heroSlides } from "../data";
import { Divider, Stack } from "@mantine/core";

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
          <SdTextBox.Section
            label="Clients"
            title="함께하는 고객사"
            description="다양한 산업의 기업과 공공기관이 신뢰하고 있습니다."
            align="center"
            ta="center"
          />

          <Divider label="Grid" labelPosition="left" />
          <SdClients.Grid items={clientItems} />

          <Divider label="Marquee" labelPosition="left" />
          <SdClients.Marquee items={clientItems} />
        </Stack>
      </SdContainer>

      {/* ── 오시는 길 ── */}
      <SdContainer py="xl">
        <Stack gap="xl">
          <SdTextBox.Section
            label="Location"
            title="오시는 길"
            description="본사 및 지사 위치를 안내합니다."
            align="center"
            ta="center"
          />
          <Divider label="Tabs (여러 주소)" labelPosition="left" />
          <SdMap.Tabs addresses={companyInfo.addresses} height={360} />

          <Divider label="Single (단일 주소)" labelPosition="left" />
          <SdMap.Single address={companyInfo.addresses[0]} height={300} />
        </Stack>
      </SdContainer>
    </>
  );
}
