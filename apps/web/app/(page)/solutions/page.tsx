"use client";

import { PageLayout, SdSolution, SdTextBox } from "@framework/ui";
import { solutionItems } from "../../../data";
import { Stack } from "@mantine/core";

export default function SolutionsPage() {
  return (
    <PageLayout.Minimal
      title="솔루션"
      description="산업별 현장에서 검증된 맞춤형 솔루션을 만나보세요."
    >
      <Stack gap={80} w="100%">

        {/* ── 카테고리 필터 그리드 ── */}
        <Stack gap="xl">
          <SdTextBox.Section
            label="Solutions"
            title="산업별 솔루션"
            description="제조·물류·금융·유통·의료·공공 등 다양한 산업에 최적화된 솔루션을 제공합니다."
            align="center"
            ta="center"
          />
          <SdSolution.Filtered
            items={solutionItems}
            onSelect={(item) => alert(`${item.title} 선택됨`)}
          />
        </Stack>

        {/* ── 리스트 레이아웃 ── */}
        <Stack gap="xl">
          <SdTextBox.Section
            label="List View"
            title="리스트 보기"
            description="카드 외에도 수평 리스트로 솔루션을 탐색할 수 있습니다."
            align="center"
            ta="center"
          />
          <SdSolution.List
            items={solutionItems}
            onSelect={(item) => alert(`${item.title} 선택됨`)}
          />
        </Stack>

      </Stack>
    </PageLayout.Minimal>
  );
}
