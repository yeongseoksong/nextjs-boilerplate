import type { NavItem } from '@framework/types'

/**
 * 카탈로그 사이트의 네비게이션.
 *
 * `data/index.tsx`의 navItems는 프레임워크 컴포넌트 데모용 샘플 데이터이므로
 * (SdHeader 쇼케이스에서 2단 메뉴를 보여주는 데 쓰인다) 실제 사이트 네비게이션은
 * 여기서 따로 정의한다.
 */
/**
 * SdHeader는 next/link가 아니라 Mantine Anchor(순수 <a>)로 렌더하므로
 * Next가 basePath를 붙여주지 않는다. GitHub Pages 프로젝트 페이지에서
 * 링크가 깨지지 않도록 여기서 직접 prefix를 붙인다.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/**
 * 컴포넌트 이름 목록 → 해당 카탈로그 페이지의 앵커 NavItem[].
 *
 * 앵커 id는 `_catalog/Showcase.tsx`가 `<Showcase name>`을 그대로 `id`로 쓰기 때문에
 * 컴포넌트 이름과 같다. **아래 목록은 각 `*Catalog.tsx`의 `<Showcase>` 순서와 일치해야 한다**
 * (컴포넌트를 추가·삭제하면 여기도 같이 고친다 — CLAUDE.md "카탈로그는 UI의 거울" 규칙).
 */
function anchors(parentId: number, path: string, names: string[]): NavItem[] {
  return names.map((name, i) => ({
    id: parentId * 100 + i + 1,
    order: i + 1,
    isShow: true,
    label: name,
    href: `${base}${path}#${name}`,
    parentId,
  }))
}

const atoms = [
  'SdTitle',
  'SdText',
  'SdButton',
  'SdBadge',
  'SdLink',
  'SdInput',
  'SdNumberIcon',
  'SdTabs',
  'SdTable',
  'SdQuote',
  'SdSkeleton',
  'SdModal',
  'SdContainer',
]

const molecules = [
  'SdTextBox',
  'SdFeatures',
  'SdSteps',
  'SdTimeline',
  'SdTestimonial',
  'SdPricingCard',
  'SdFaq',
  'SdCta',
  'SdSolution',
  'SdSolutionCard',
  'SdClients',
  'SdMap',
]

const organisms = [
  'HeroCarousel',
  'SdFeatureSection',
  'SdTimelineSection',
  'SdStepsSection',
  'SdHeader',
  'SdFooter',
  'PageLayout',
  'SdErrorView',
]

export const catalogNav: NavItem[] = [
  { id: 1, order: 1, isShow: true, label: '개요',  },
  { id: 2, order: 2, isShow: true, label: 'Atom', href: `${base}/components/atom/` },
  { id: 3, order: 3, isShow: true, label: 'Molecule', href: `${base}/components/molecule/` },
  { id: 4, order: 4, isShow: true, label: 'Organism', href: `${base}/components/organism/` },

  // 개요 페이지의 섹션 앵커
  { id: 101, order: 1, isShow: true, label: '설치', href: `${base}/#install`, parentId: 1 },
  { id: 102, order: 2, isShow: true, label: '환경변수', href: `${base}/#env`, parentId: 1 },
  { id: 103, order: 3, isShow: true, label: '색상 팔레트', href: `${base}/#colors`, parentId: 1 },

  ...anchors(2, '/components/atom/', atoms),
  ...anchors(3, '/components/molecule/', molecules),
  ...anchors(4, '/components/organism/', organisms),
]
