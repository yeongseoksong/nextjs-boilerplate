"use client";

import { Box, Paper, Stack } from "@mantine/core";
import {
  HeroCarousel,
  PageLayout,
  SdContainer,
  SdErrorView,
  SdFeatureSection,
  SdFooter,
  SdHeader,
  SdStepsSection,
  SdText,
  SdTextBoxSection,
  SdTimelineSection,
} from "@framework/ui";
import {
  companyInfo,
  featureItems,
  footerNavItems,
  heroSlides,
  navItems,
  policyLinks,
  timelineEvents,
} from "../../../data";
import { Showcase, Variant } from "../../_catalog/Showcase";

const demoSteps = [
  { title: "요구사항 분석", description: "업무 환경과 요구사항을 파악해 방향을 도출합니다." },
  { title: "설계 및 제안", description: "시스템 구조를 설계하고 상세 제안서를 작성합니다." },
  { title: "개발 및 구현", description: "단계별 테스트로 품질을 보장하며 구현합니다." },
];

/** 페이지 폭 전체를 쓰는 organism을 잘라내지 않고 담기 위한 프레임. */
function FullBleed({ children }: { children: React.ReactNode }) {
  return (
    <Paper withBorder radius="md" style={{ overflow: "hidden" }}>
      {children}
    </Paper>
  );
}

export default function OrganismCatalog() {
  return (
    <SdContainer py="xl">
      <Stack gap={64}>
        <SdTextBoxSection
          label="Organism"
          title="섹션 컴포넌트"
          description="molecule과 atom을 묶어 페이지의 한 구획을 이룹니다. 대부분 라벨·제목·설명과 데이터를 함께 받습니다."
        />

        <Showcase
          name="HeroCarousel"
          description="히어로 캐러셀. HeroSlide 배열을 받아 자동 순환합니다."
          exports={["HeroCarousel"]}
        >
          <FullBleed>
            <HeroCarousel slides={heroSlides} />
          </FullBleed>
        </Showcase>

        <Showcase
          name="SdFeatureSection"
          description="섹션 헤더 + SdFeatures 그리드를 묶은 조합입니다."
          exports={["SdFeatureSection"]}
        >
          <SdFeatureSection
            label="핵심 기능"
            title="왜 선택해야 할까요?"
            description="복잡한 요구사항을 충족하면서도 누구나 쉽게 쓸 수 있습니다."
            items={featureItems}
          />
        </Showcase>

        <Showcase
          name="SdTimelineSection"
          description="섹션 헤더 + SdTimeline 조합입니다."
          exports={["SdTimelineSection"]}
        >
          <SdTimelineSection
            label="연혁"
            title="회사의 발자취"
            description="창립부터 현재까지 걸어온 길입니다."
            items={timelineEvents}
          />
        </Showcase>

        <Showcase
          name="SdStepsSection"
          description="섹션 헤더 + SdSteps 조합입니다."
          exports={["SdStepsSection"]}
        >
          <SdStepsSection
            label="도입 절차"
            title="3단계로 완성되는 도입 프로세스"
            description="체계적인 절차로 안정적인 도입을 보장합니다."
            items={demoSteps}
          />
        </Showcase>

        <Showcase
          name="SdHeader"
          description="상단 네비게이션. 헤더에 마우스를 올리면 navItems의 parentId로 묶인 하위 링크가 각 상위 항목 아래 컬럼으로 확장되고, 모바일에서는 버거 드로어의 아코디언으로 전환됩니다."
          exports={["SdHeader"]}
        >
          <FullBleed>
            {/* pos="relative" — 확장된 헤더가 아래 Showcase를 밀어내지 않고 덮도록 */}
            <Box h={60} pos="relative">
              <SdHeader navItems={navItems} />
            </Box>
          </FullBleed>
        </Showcase>

        <Showcase
          name="SdFooter"
          description="하단 회사 정보. 브랜드 컬럼 + 네비 그룹 위에 주소·연락처·사업자등록번호를 렌더하고, 구분선 아래 하단 바에 카피라이트·정책 링크·소셜 아이콘(company.socials)을 배치합니다."
          exports={["SdFooter"]}
        >
          <FullBleed>
            <SdFooter
              company={companyInfo}
              navItems={footerNavItems}
              policyLinks={policyLinks}
              description="자산 관리부터 프로젝트 운영까지, 하나의 플랫폼으로 모든 업무 흐름을 연결합니다."
            />
          </FullBleed>
        </Showcase>

        <Showcase
          name="PageLayout"
          description="페이지 히어로 + 본문을 감싸는 템플릿. 페이지 파일에서 최상위로 사용합니다. (template — flat export 없음, 네임스페이스 dot으로만 사용)"
          exports={["PageLayout"]}
        >
          <Stack gap="xl">
            <Variant label="Brand · primary 그라디언트 배경">
              <FullBleed>
                <PageLayout.Brand label="Company" title="회사 소개" description="브랜드 그라디언트 히어로입니다.">
                  <SdText.Body>본문 영역입니다.</SdText.Body>
                </PageLayout.Brand>
              </FullBleed>
            </Variant>
            <Variant label="Image · 이미지 배경 + frosted glass">
              <FullBleed>
                <PageLayout.Image
                  image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80"
                  label="Service"
                  title="서비스"
                  description="이미지 배경 위 frosted glass 카드입니다."
                >
                  <SdText.Body>본문 영역입니다.</SdText.Body>
                </PageLayout.Image>
              </FullBleed>
            </Variant>
            <Variant label="Minimal · 섹션 타이틀 + 구분선">
              <FullBleed>
                <PageLayout.Minimal label="Solutions" title="솔루션" description="히어로 없이 섹션 헤더로 시작합니다.">
                  <SdText.Body>본문 영역입니다.</SdText.Body>
                </PageLayout.Minimal>
              </FullBleed>
            </Variant>
            <Variant label="Plain · 히어로 없이 컨테이너만">
              <FullBleed>
                <PageLayout.Plain>
                  <SdText.Body>히어로 없이 SdContainer만 감쌉니다.</SdText.Body>
                </PageLayout.Plain>
              </FullBleed>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdErrorView"
          description="에러·404 화면. app/error.tsx와 not-found.tsx에서 얇은 래퍼로 사용합니다."
          exports={["SdErrorViewPage", "SdErrorViewNotFound"]}
        >
          <Stack gap="xl">
            <Variant label="NotFound">
              <FullBleed><SdErrorView.NotFound /></FullBleed>
            </Variant>
            <Variant label="Page">
              <FullBleed>
                <SdErrorView.Page
                  error={new Error("데모용 오류입니다.")}
                  onReset={() => undefined}
                />
              </FullBleed>
            </Variant>
          </Stack>
        </Showcase>
      </Stack>
    </SdContainer>
  );
}
