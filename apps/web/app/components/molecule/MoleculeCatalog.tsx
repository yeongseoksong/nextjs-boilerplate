'use client'

import { Stack } from '@mantine/core'
import {
  SdBreadcrumb,
  SdClients,
  SdContainer,
  SdCta,
  SdFaq,
  SdFeatures,
  SdMap,
  SdPricingCard,
  SdSolution,
  SdSolutionCard,
  SdSteps,
  SdTestimonial,
  SdTextBox,
  SdTextBoxSection,
  SdTimeline,
} from '@framework/ui'
import type { ClientItem } from '@framework/types'
import {
  companyInfo,
  faqItems,
  navItems,
  featureItems,
  pricingItems,
  solutionItems,
  testimonialItems,
  timelineEvents,
} from '../../../data'
import { Showcase, Variant } from '../../_catalog/Showcase'

/**
 * 데모 데이터의 로고 경로(/clients/*.png)는 저장소에 없으므로, 인지도 있는
 * 브랜드 로고를 Simple Icons CDN(cdn.simpleicons.org)에서 외부 URL로 가져온다.
 * images.unoptimized 모드라 외부 SVG도 remotePatterns 설정 없이 렌더된다.
 */
const demoClients: ClientItem[] = [
  { name: 'Google', url: 'https://google.com', logo: 'https://cdn.simpleicons.org/google' },
  { name: 'GitHub', url: 'https://github.com', logo: 'https://cdn.simpleicons.org/github' },
  { name: 'GitLab', url: 'https://gitlab.com', logo: 'https://cdn.simpleicons.org/gitlab' },
  { name: 'Vercel', url: 'https://vercel.com', logo: 'https://cdn.simpleicons.org/vercel' },
  {
    name: 'Cloudflare',
    url: 'https://cloudflare.com',
    logo: 'https://cdn.simpleicons.org/cloudflare',
  },
  { name: 'Docker', url: 'https://docker.com', logo: 'https://cdn.simpleicons.org/docker' },
  { name: 'Figma', url: 'https://figma.com', logo: 'https://cdn.simpleicons.org/figma' },
  { name: 'Notion', url: 'https://notion.so', logo: 'https://cdn.simpleicons.org/notion' },
]

const demoSteps = [
  { title: '요구사항 분석', description: '업무 환경과 요구사항을 파악해 방향을 도출합니다.' },
  { title: '설계 및 제안', description: '시스템 구조를 설계하고 상세 제안서를 작성합니다.' },
  { title: '개발 및 구현', description: '단계별 테스트로 품질을 보장하며 구현합니다.' },
  { title: '납품 및 지원', description: '설치·교육 후 지속적인 유지보수를 지원합니다.' },
]

export default function MoleculeCatalog() {
  return (
    <SdContainer py="xl">
      <Stack gap={64}>
        <SdTextBoxSection
          label="Molecule"
          title="조합 컴포넌트"
          description="atom을 조합해 하나의 의미 단위를 이룹니다. 대부분 데이터 배열을 props로 받습니다."
        />

        <Showcase
          name="SdBreadcrumb"
          description="네비게이션 계층 기반 브레드크럼. navItems의 parentId 트리에서 현재 경로가 놓인 위치를 찾아 홈 아이콘 > 조상 > … > 현재 페이지 순으로 그립니다. currentHref를 생략하면 usePathname()으로 자동 추론하고, 정확히 일치하는 href가 없으면 가장 구체적인 상위 경로로 매칭합니다(상세 페이지). 마지막 크럼은 링크가 아닌 강조 텍스트입니다."
          exports={['SdBreadcrumb']}
        >
          <Stack gap="lg">
            <Variant label="3단계 — /about/company/history">
              <SdBreadcrumb navItems={navItems} currentHref="/about/company/history" />
            </Variant>
            <Variant label="그룹 제목 조상(href 없음) — /support/notice/updates">
              <SdBreadcrumb navItems={navItems} currentHref="/support/notice/updates" />
            </Variant>
            <Variant label="접두 매칭(상세 페이지) — /solutions/industry/manufacturing/detail-42">
              <SdBreadcrumb
                navItems={navItems}
                currentHref="/solutions/industry/manufacturing/detail-42"
              />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdTextBox"
          description="라벨 + 제목 + 설명을 묶는 섹션 헤더. 이 카탈로그의 각 페이지 상단도 이 컴포넌트입니다."
          exports={['SdTextBoxHero', 'SdTextBoxSection', 'SdTextBoxCard', 'SdTextBoxSub']}
        >
          <Stack gap="xl">
            <Variant label="Section">
              <SdTextBox.Section
                label="Label"
                title="섹션 제목"
                description="섹션 설명 문장입니다."
              />
            </Variant>
            <Variant label="Card">
              <SdTextBox.Card label="Label" title="카드 제목" description="카드 설명 문장입니다." />
            </Variant>
            <Variant label="Sub">
              <SdTextBox.Sub label="Label" title="소제목" description="보조 설명 문장입니다." />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdFeatures"
          description="기능 카드 그리드. FeatureItem 배열을 받고 cols로 열 수를 조정합니다."
          exports={['SdFeatures']}
        >
          <SdFeatures items={featureItems} />
        </Showcase>

        <Showcase
          name="SdSteps"
          description="단계별 안내. 같은 데이터를 세 가지 레이아웃으로 보여줍니다."
          exports={['SdStepsBubble', 'SdStepsCard', 'SdStepsStrip']}
        >
          <Stack gap="xl">
            <Variant label="Bubble">
              <SdSteps.Bubble items={demoSteps} />
            </Variant>
            <Variant label="Card">
              <SdSteps.Card items={demoSteps} />
            </Variant>
            <Variant label="Strip">
              <SdSteps.Strip items={demoSteps} />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdTimeline"
          description="연혁 타임라인. 연도별로 자동 그룹핑하고 최신순으로 정렬합니다."
          exports={['SdTimeline']}
        >
          <SdTimeline items={timelineEvents} />
        </Showcase>

        <Showcase
          name="SdTestimonial"
          description="고객 후기. 단일 강조와 그리드 배치를 제공합니다."
          exports={['SdTestimonialCard', 'SdTestimonialStrip', 'SdTestimonialGrid']}
        >
          <Stack gap="xl">
            <Variant label="Grid">
              <SdTestimonial.Grid items={testimonialItems} />
            </Variant>
            <Variant label="Strip">
              <SdTestimonial.Strip item={testimonialItems[0]} />
            </Variant>
            <Variant label="Card">
              <SdTestimonial.Card item={testimonialItems[0]} />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdPricingCard"
          description="요금제 카드. Grid는 isPopular 항목을 자동으로 Featured로 처리합니다."
          exports={['SdPricingCardDefault', 'SdPricingCardFeatured', 'SdPricingCardGrid']}
        >
          <Stack gap="xl">
            <Variant label="Grid">
              <SdPricingCard.Grid items={pricingItems} cols={{ base: 1, sm: 3 }} />
            </Variant>
            <Variant label="Default (단일)">
              <SdPricingCard.Default item={pricingItems[0]} maw={340} />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdFaq"
          description="아코디언 FAQ. WithHeader는 섹션 헤더까지 함께 렌더합니다."
          exports={['SdFaqDefault', 'SdFaqFilled', 'SdFaqWithHeader']}
        >
          <Stack gap="xl">
            <Variant label="Default">
              <SdFaq.Default items={faqItems.slice(0, 3)} />
            </Variant>
            <Variant label="Filled">
              <SdFaq.Filled items={faqItems.slice(0, 3)} />
            </Variant>
            <Variant label="WithHeader">
              <SdFaq.WithHeader
                label="FAQ"
                title="자주 묻는 질문"
                description="궁금한 점을 모았습니다."
                items={faqItems.slice(0, 3)}
              />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdCta"
          description="전환 유도 블록. onPrimary/onSecondary 콜백을 받습니다."
          exports={['SdCtaBanner', 'SdCtaSubtle', 'SdCtaInline']}
        >
          <Stack gap="xl">
            <Variant label="Banner">
              <SdCta.Banner
                label="지금 시작하세요"
                title="14일 무료 체험"
                description="신용카드 없이 바로 시작할 수 있습니다."
                primaryLabel="무료 체험"
                secondaryLabel="도입 문의"
              />
            </Variant>
            <Variant label="Subtle">
              <SdCta.Subtle
                label="지금 시작하세요"
                title="14일 무료 체험"
                description="신용카드 없이 바로 시작할 수 있습니다."
                primaryLabel="무료 체험"
                secondaryLabel="도입 문의"
              />
            </Variant>
            <Variant label="Inline">
              <SdCta.Inline
                label="Enterprise"
                title="맞춤 솔루션이 필요하신가요?"
                description="전담 매니저가 요구사항을 분석합니다."
                primaryLabel="도입 문의"
              />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdSolution"
          description="솔루션 탐색. Filtered는 카테고리 필터를 내장합니다."
          exports={['SdSolutionFiltered', 'SdSolutionList']}
        >
          <Stack gap="xl">
            <Variant label="Filtered">
              <SdSolution.Filtered items={solutionItems} />
            </Variant>
            <Variant label="List">
              <SdSolution.List items={solutionItems.slice(0, 4)} />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdSolutionCard"
          description="솔루션 카드 단위. SdSolution 내부에서도 사용됩니다."
          exports={['SdSolutionCardItem', 'SdSolutionCardGrid']}
        >
          <Stack gap="xl">
            <Variant label="Grid">
              <SdSolutionCard.Grid items={solutionItems.slice(0, 6)} />
            </Variant>
            <Variant label="Item (단일)">
              <SdSolutionCard.Item item={solutionItems[0]} maw={340} />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdClients"
          description="고객사 로고. Marquee는 무한 스크롤이며 호버 시 정지합니다."
          exports={['SdClientsGrid', 'SdClientsMarquee']}
        >
          <Stack gap="xl">
            <Variant label="Grid">
              <SdClients.Grid items={demoClients} />
            </Variant>
            <Variant label="Marquee">
              <SdClients.Marquee items={demoClients} />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdMap"
          description="구글 지도 임베드. embbedUrl이 없는 주소는 렌더하지 않습니다."
          exports={['SdMapSingle', 'SdMapTabs']}
        >
          <Stack gap="xl">
            <Variant label="Tabs (여러 주소)">
              <SdMap.Tabs addresses={companyInfo.addresses} height={320} />
            </Variant>
            <Variant label="Single (단일 주소)">
              <SdMap.Single address={companyInfo.addresses[0]} height={280} />
            </Variant>
          </Stack>
        </Showcase>
      </Stack>
    </SdContainer>
  )
}
