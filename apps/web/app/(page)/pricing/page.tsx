"use client";

import {
  PageLayout,
  SdBadge,
  SdButton,
  SdContainer,
  SdCta,
  SdFaq,
  SdInput,
  SdPricingCard,
  SdSolutionCard,
  SdTabs,
  SdTestimonial,
  SdText,
  SdTextBox,
} from "@framework/ui";
import {
  faqItems,
  navItems,
  pricingItems,
  solutionItems,
  testimonialItems,
} from "../../../data";
import { Box, Divider, Group, Stack } from "@mantine/core";

export default function PricingPage() {
  return (
    <PageLayout
      navItems={navItems}
      image="https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=1600&q=80"
      title="요금제"
      description="팀 규모에 맞는 플랜을 선택하고, 업무 효율을 높이세요."
    >
      <Stack gap={80} w="100%">

        {/* ── Badge 예시 ── */}
        <Stack gap="xl">
          <SdTextBox.Section
            label="Components"
            title="새 컴포넌트 예시"
            description="랜딩 페이지에 활용할 수 있는 신규 컴포넌트입니다."
            align="center"
            ta="center"
          />
          <Divider label={<SdText.Sub>SdBadge</SdText.Sub>} />
          <Group justify="center" gap="sm">
            <SdBadge.Default>일반</SdBadge.Default>
            <SdBadge.Primary>브랜드</SdBadge.Primary>
            <SdBadge.Success>완료</SdBadge.Success>
            <SdBadge.Warning>주의</SdBadge.Warning>
          </Group>
        </Stack>

        {/* ── 솔루션 ── */}
        <Stack gap="xl">
          <SdTextBox.Section
            label="Solutions"
            title="산업별 솔루션"
            description="다양한 산업 현장에서 검증된 맞춤형 솔루션을 확인하세요."
            align="center"
            ta="center"
          />
          <SdSolutionCard.Grid
            items={solutionItems}
            onSelect={(item) => alert(`${item.title} 선택됨`)}
          />
        </Stack>

        {/* ── 요금제 ── */}
        <Stack gap="xl">
          <SdTextBox.Section
            label="Pricing"
            title="투명한 요금제"
            description="숨겨진 비용 없이, 필요한 만큼만 사용하세요."
            align="center"
            ta="center"
          />
          <SdPricingCard.Grid
            items={pricingItems}
            cols={{ base: 1, sm: 3 }}
            onSelect={(item) => alert(`${item.name} 선택됨`)}
          />
        </Stack>

        {/* ── 고객 후기 ── */}
        <Stack gap="xl">
          <SdTextBox.Section
            label="Testimonials"
            title="고객이 말하는 %c"
            description="실제 도입 고객의 생생한 경험을 확인하세요."
            align="center"
            ta="center"
          />
          <SdTabs.Underline defaultValue="grid">
            <SdTabs.Underline.List>
              <SdTabs.Underline.Tab value="grid">카드 그리드</SdTabs.Underline.Tab>
              <SdTabs.Underline.Tab value="strip">단일 강조</SdTabs.Underline.Tab>
            </SdTabs.Underline.List>
            <SdTabs.Underline.Panel value="grid">
              <SdTestimonial.Grid items={testimonialItems} />
            </SdTabs.Underline.Panel>
            <SdTabs.Underline.Panel value="strip">
              <SdContainer>
                <SdTestimonial.Strip item={testimonialItems[0]} />
              </SdContainer>
            </SdTabs.Underline.Panel>
          </SdTabs.Underline>
        </Stack>

        {/* ── FAQ ── */}
        <Box>
          <SdFaq.WithHeader
            label="FAQ"
            title="자주 묻는 질문"
            description="궁금한 점이 있으면 언제든지 문의해 주세요."
            items={faqItems}
          />
        </Box>

        {/* ── Contact Form ── */}
        <Stack gap="xl">
          <SdTextBox.Section
            label="Contact"
            title="도입 문의"
            description="담당자가 영업일 기준 1일 이내 연락드립니다."
            align="center"
            ta="center"
          />
          <Divider label={<SdText.Sub>SdInput</SdText.Sub>} />
          <Stack gap="md" maw={480} mx="auto" w="100%">
            <Group grow gap="md">
              <SdInput.Text label="이름" placeholder="홍길동" required />
              <SdInput.Text label="회사명" placeholder="(주)아무개" />
            </Group>
            <SdInput.Email label="업무 이메일" placeholder="you@company.com" required />
            <SdInput.Select
              label="팀 규모"
              placeholder="선택하세요"
              data={["1–10명", "11–50명", "51–200명", "200명 이상"]}
            />
            <SdInput.Textarea label="문의 내용" placeholder="도입 배경이나 궁금한 점을 자유롭게 적어주세요." />
            <SdButton.Primary fullWidth>문의 보내기</SdButton.Primary>
          </Stack>
        </Stack>

        {/* ── CTA ── */}
        <Stack gap="xl">
          <SdCta.Subtle
            label="지금 시작하세요"
            title="14일 무료 체험, 신용카드 불필요"
            description="지금 바로 시작하고 팀의 업무 효율을 경험하세요."
            primaryLabel="무료 체험 시작"
            secondaryLabel="도입 문의"
            onPrimary={() => alert("무료 체험 시작")}
            onSecondary={() => alert("도입 문의")}
          />
          <SdCta.Inline
            label="Enterprise"
            title="대규모 조직을 위한 맞춤 솔루션이 필요하신가요?"
            description="전담 매니저가 요구사항을 분석하고 최적의 플랜을 제안합니다."
            primaryLabel="도입 문의하기"
            secondaryLabel="자료 다운로드"
            onPrimary={() => alert("도입 문의")}
          />
        </Stack>

      </Stack>
    </PageLayout>
  );
}
