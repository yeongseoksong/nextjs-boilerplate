'use client'

import { Paper, Stack } from '@mantine/core'
import {
  HeroCarousel,
  PageLayout,
  SdContainer,
  SdErrorView,
  SdFeatureSection,
  SdFooter,
  SdHeader,
  SdHeaderSimple,
  SdHeaderPanel,
  SdLoginView,
  SdResult,
  SdStepsSection,
  SdText,
  SdTextBoxSection,
  SdTimelineSection,
} from '@framework/ui'
import {
  companyInfo,
  featureItems,
  footerNavItems,
  heroSlides,
  navItems,
  policyLinks,
  timelineEvents,
} from '../../../data'
import { Showcase, Variant } from '../../_catalog/Showcase'

const demoSteps = [
  { title: '요구사항 분석', description: '업무 환경과 요구사항을 파악해 방향을 도출합니다.' },
  { title: '설계 및 제안', description: '시스템 구조를 설계하고 상세 제안서를 작성합니다.' },
  { title: '개발 및 구현', description: '단계별 테스트로 품질을 보장하며 구현합니다.' },
]

/** 페이지 폭 전체를 쓰는 organism을 잘라내지 않고 담기 위한 프레임. */
function FullBleed({ children }: { children: React.ReactNode }) {
  return (
    <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
      {children}
    </Paper>
  )
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
          exports={['HeroCarousel']}
        >
          <FullBleed>
            <HeroCarousel slides={heroSlides} />
          </FullBleed>
        </Showcase>

        <Showcase
          name="SdFeatureSection"
          description="섹션 헤더 + SdFeatures 그리드를 묶은 조합입니다."
          exports={['SdFeatureSection']}
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
          exports={['SdTimelineSection']}
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
          exports={['SdStepsSection']}
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
          description="상단 네비게이션. navItems의 parentId로 상위→자식→손자 3단계까지 묶입니다. Mega 변형은 헤더 전체 확장 컬럼(손자는 그룹으로), Simple 변형은 상위 항목마다 붙는 Mantine Menu(손자는 Menu.Sub 플라이아웃), Panel 변형은 Simple처럼 바 높이는 고정하되 드롭다운 내부를 Mega식 그룹 컬럼(손자는 자식 아래 하위 링크)으로 노출합니다. 모바일에서는 세 변형 모두 버거 드로어의 중첩 아코디언으로 전환됩니다."
          exports={['SdHeader', 'SdHeaderMega', 'SdHeaderSimple', 'SdHeaderPanel']}
        >
          <Variant label="Mega(기본) — hover 시 헤더 전체가 아래로 확장">
            {/*
              고정 높이 박스로 감싸지 않는다 — Mega는 hover 시 헤더 자체가 커지는데,
              h={60} 고정 + FullBleed의 overflow:hidden이 그 확장분을 잘라내 hover가
              동작 안 하는 것처럼 보였다. 카드가 함께 자라도록 SdHeader를 직접 담는다.
              (실제 배포에서는 AppShell.Header가 pos:relative로 아래 콘텐츠 위에 덮는다.)
            */}
            <FullBleed>
              <SdHeader navItems={navItems} />
            </FullBleed>
          </Variant>
          <Variant label="Simple — 항목마다 개별 드롭다운, 바 높이 고정">
            <FullBleed>
              <SdHeaderSimple navItems={navItems} />
            </FullBleed>
          </Variant>
          <Variant label="Panel — 바 높이 고정 + 드롭다운 내부는 Mega식 그룹 컬럼">
            <FullBleed>
              <SdHeaderPanel navItems={navItems} />
            </FullBleed>
          </Variant>
        </Showcase>

        <Showcase
          name="SdFooter"
          description="하단 회사 정보. 브랜드 컬럼 + 네비 그룹 위에 주소·연락처·사업자등록번호를 렌더하고, 구분선 아래 하단 바에 카피라이트·정책 링크·소셜 아이콘(company.socials)을 배치합니다."
          exports={['SdFooter']}
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
          description="페이지 히어로 + 본문을 감싸는 템플릿. 페이지 파일에서 최상위로 사용합니다. navItems를 넘기면 본문 최상단에 SdBreadcrumb가 기본으로 붙고(현재 경로는 usePathname으로 추론), breadcrumb={false}로 끕니다. (template — flat export 없음, 네임스페이스 dot으로만 사용)"
          exports={['PageLayout']}
        >
          <Stack gap="xl">
            <Variant label="Brand · slate 바탕 + primary 라이트 (브레드크럼 기본)">
              <FullBleed>
                <PageLayout.Brand
                  label="Company"
                  title="회사 소개"
                  description="어두운 바탕에 primary 광원을 얹은 브랜드 히어로입니다."
                  navItems={navItems}
                  currentHref="/about/company"
                >
                  <SdText.Body>본문 영역입니다.</SdText.Body>
                </PageLayout.Brand>
              </FullBleed>
            </Variant>
            <Variant label="Image · 사진 배경 + 하단 스크림 (브레드크럼 기본)">
              <FullBleed>
                <PageLayout.Image
                  image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80"
                  label="Service"
                  title="서비스"
                  description="사진 위로 짙어지는 스크림에 텍스트를 얹습니다."
                  navItems={navItems}
                  currentHref="/services"
                >
                  <SdText.Body>본문 영역입니다.</SdText.Body>
                </PageLayout.Image>
              </FullBleed>
            </Variant>
            <Variant label="Minimal · 섹션 타이틀 + 구분선 (브레드크럼 기본)">
              <FullBleed>
                <PageLayout.Minimal
                  label="Solutions"
                  title="제조"
                  description="브레드크럼은 타이틀 위에 놓입니다."
                  navItems={navItems}
                  currentHref="/solutions/industry/manufacturing"
                >
                  <SdText.Body>본문 영역입니다.</SdText.Body>
                </PageLayout.Minimal>
              </FullBleed>
            </Variant>
            <Variant label="Plain · breadcrumb={false}로 끈 경우">
              <FullBleed>
                <PageLayout.Plain navItems={navItems} breadcrumb={false} currentHref="/pricing">
                  <SdText.Body>navItems를 넘겨도 breadcrumb={'{false}'}면 그리지 않습니다.</SdText.Body>
                </PageLayout.Plain>
              </FullBleed>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdLoginView"
          description="로그인 화면. 이메일·비밀번호·자동 로그인·비밀번호 찾기·회원가입 링크에 소셜 로그인 슬롯까지 묶은 표준 폼입니다. 폼은 비제어(FormData)라 onSubmit으로 { email, password, remember }를 그대로 받습니다."
          exports={['SdLoginViewCard', 'SdLoginViewSplit']}
        >
          <Stack gap="xl">
            <Variant label="Card(기본) — 중앙 정렬 카드">
              <FullBleed>
                <SdLoginView.Card
                  mih={640}
                  findPasswordHref="#"
                  signUpHref="#"
                  socials={[{ provider: 'google' }, { provider: 'kakao' }]}
                  onSubmit={() => undefined}
                />
              </FullBleed>
            </Variant>
            <Variant label="Split — 좌측 브랜드 패널 + 우측 폼 (md 이상)">
              <FullBleed>
                <SdLoginView.Split
                  mih={560}
                  findPasswordHref="#"
                  signUpHref="#"
                  onSubmit={() => undefined}
                />
              </FullBleed>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdResult"
          description="작업 결과 화면. 원형 아이콘 + 제목·설명 + 액션 버튼으로 성공/실패를 알립니다. 서버 오류·404처럼 화면 자체가 오류인 경우는 SdErrorView를 씁니다."
          exports={['SdResultSuccess', 'SdResultError']}
        >
          <Stack gap="xl">
            <Variant label="Success">
              <FullBleed>
                <SdResult.Success
                  mih={420}
                  title="가입이 완료되었습니다"
                  description="입력하신 이메일로 인증 메일을 보냈습니다. 메일의 링크를 눌러 인증을 마쳐 주세요."
                  primaryAction={{ label: '시작하기', onClick: () => undefined }}
                  secondaryAction={{ label: '홈으로', onClick: () => undefined }}
                />
              </FullBleed>
            </Variant>
            <Variant label="Error">
              <FullBleed>
                <SdResult.Error
                  mih={420}
                  title="결제에 실패했습니다"
                  description="카드사 승인이 거절되었습니다. 다른 결제 수단으로 다시 시도해 주세요."
                  primaryAction={{ label: '다시 시도', onClick: () => undefined }}
                />
              </FullBleed>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdErrorView"
          description="에러·404 화면. app/error.tsx와 not-found.tsx에서 얇은 래퍼로 사용합니다."
          exports={['SdErrorViewPage', 'SdErrorViewNotFound']}
        >
          <Stack gap="xl">
            <Variant label="NotFound">
              <FullBleed>
                <SdErrorView.NotFound />
              </FullBleed>
            </Variant>
            <Variant label="Page">
              <FullBleed>
                <SdErrorView.Page
                  error={new Error('데모용 오류입니다.')}
                  onReset={() => undefined}
                />
              </FullBleed>
            </Variant>
          </Stack>
        </Showcase>
      </Stack>
    </SdContainer>
  )
}
