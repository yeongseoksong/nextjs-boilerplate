'use client'

import { Box, BoxProps, Breadcrumbs } from '@mantine/core'
import { usePathname } from 'next/navigation'
import { IconChevronRight, IconHome } from '@tabler/icons-react'
import { NavItem } from '../../types'
import { SdLink } from '../atom/Link'
// template 배럴이 아니라 파일에서 직접 가져온다 — 배럴(`../template`)은 molecule을
// 되-export하므로 molecule→template→molecule 순환이 된다.
import { useNav } from '../template/NavProvider'

interface SdBreadcrumbProps extends BoxProps {
  navItems?: NavItem[]
  /** 현재 경로. 생략하면 `usePathname()`으로 자동 추론한다. */
  currentHref?: string
  /** 홈(첫 크럼) 링크 대상. 기본 `/`. */
  homeHref?: string
  /** 홈 아이콘의 접근성 라벨. 기본 `홈`. */
  homeLabel?: string
}

/** 끝의 슬래시를 떼어 경로 비교를 안정화한다. 루트/빈 값은 `/`로 본다. */
function normalizePath(href?: string): string {
  if (!href) return ''
  const trimmed = href.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

/**
 * navItems에서 currentHref에 해당하는 항목을 찾아 `parentId` 사슬을 루트까지 거슬러
 * `[조상…, 현재]` 순서의 트레일을 만든다. 홈(첫 크럼)은 여기 포함하지 않는다.
 *
 * 매칭은 두 단계다: ① href가 정확히 일치하는 항목, 없으면 ② currentHref의 상위 경로인
 * href 중 가장 긴(=가장 구체적인) 항목 — 상세 페이지(`/blog/123`)가 목록 항목(`/blog`)
 * 아래에 놓이도록 한다. `parentId` 조상 탐색은 `isShow`와 무관하게 전체에서 하므로,
 * 네비에는 숨겨진 그룹 항목도 트레일에는 나타날 수 있다.
 */
function buildTrail(navItems: NavItem[], currentHref: string): NavItem[] {
  const target = normalizePath(currentHref)
  const byId = new Map(navItems.map((item) => [item.id, item]))

  let current = navItems.find((item) => normalizePath(item.href) === target)

  if (!current) {
    current = navItems
      .filter((item) => item.href && target.startsWith(normalizePath(item.href) + '/'))
      .sort((a, b) => normalizePath(b.href).length - normalizePath(a.href).length)[0]
  }

  if (!current) return []

  // parentId 사슬을 거슬러 올라간다. seen으로 순환(잘못된 데이터)에서 무한 루프를 막는다.
  const trail: NavItem[] = []
  const seen = new Set<number>()
  let node: NavItem | undefined = current
  while (node && !seen.has(node.id)) {
    seen.add(node.id)
    trail.unshift(node)
    node = node.parentId != null ? byId.get(node.parentId) : undefined
  }
  return trail
}

/**
 * 네비게이션 계층 기반 브레드크럼 — `홈 아이콘 > a > b > c`.
 *
 * navItems의 `parentId` 트리에서 현재 경로가 놓인 위치를 찾아 루트까지의 경로를 그린다.
 * 조상 크럼은 클릭 가능한 링크(`SdLink.Sub`), 마지막(현재 페이지) 크럼은 href 없는
 * `SdLink.Body`라 링크가 아닌 강조 텍스트(`SdText.Body`)로 폴백해 현재 위치를 나타낸다.
 */
export function SdBreadcrumb({
  navItems: navItemsProp,
  currentHref,
  homeHref = '/',
  homeLabel = '홈',
  ...boxProps
}: SdBreadcrumbProps) {
  // navItems prop이 우선, 없으면 NavProvider가 제공하는 컨텍스트 값으로 폴백한다.
  const navFromContext = useNav()
  const navItems = navItemsProp ?? navFromContext
  const pathname = usePathname()
  const trail = buildTrail(navItems, currentHref ?? pathname ?? '')

  if (navItems.length===0) return

  return (
    <Box {...boxProps}>
      <Breadcrumbs
        separator={<IconChevronRight size={14} stroke={2} color="var(--mantine-color-slate-4)" />}
        separatorMargin="xs"
      >
        <SdLink.Sub
          href={homeHref}
          aria-label={homeLabel}
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <IconHome size={16} stroke={2} />
        </SdLink.Sub>

        {trail.map((item, i) => {
          const isLast = i === trail.length - 1
          // 마지막 크럼(현재 페이지)은 href를 비워 링크가 아닌 텍스트로 폴백한다.
          return isLast ? (
            <SdLink.Body key={item.id}>{item.label}</SdLink.Body>
          ) : (
            <SdLink.Sub key={item.id} href={item.href}>
              {item.label}
            </SdLink.Sub>
          )
        })}
      </Breadcrumbs>
    </Box>
  )
}
