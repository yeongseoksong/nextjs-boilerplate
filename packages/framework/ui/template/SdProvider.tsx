'use client'
import { MantineProvider, type MantineColorScheme, type MantineThemeOverride } from '@mantine/core'
import { SdToastProvider } from '../atom/Toast'
import { theme as baseTheme } from '../theme'
import { NavItem } from '../../types'
import { NavProvider } from './NavProvider'

/**
 * 소비자 앱의 **프로바이더/컨텍스트 조립**을 한 컴포넌트로 묶는다 —
 * `MantineProvider`(테마) + `SdToastProvider`(토스트 렌더 지점) + `NavProvider`(navItems Context).
 * 소비자는 이 셋을 매번 손으로 쌓는 대신 `<SdProvider>` 하나만 렌더한다.
 *
 * 헤더/푸터 크롬(`MainLayout`)이나 페이지 템플릿(`PageLayout`)은 여기 넣지 않는다 —
 * 그건 페이지마다 다를 수 있는 **레이아웃**이라 소비자가 `SdProvider` 안쪽에 직접 배치한다.
 * `SdProvider`가 `NavProvider`로 감싸므로 그 아래 `MainLayout`/`SdBreadcrumb`는 navItems를
 * Context에서 읽는다(브레드크럼은 prop 없이 동작).
 *
 * 담지 않는 것:
 * - 회사명/로고는 여기 없다 — `NEXT_PUBLIC_*` env var로 남는다. `t()`가 서버
 *   컴포넌트인 `SdText`/`SdTitle` 안에서 돌기 때문에 Context로 옮기면 `ui/`
 *   트리 전체가 client가 되어 flat export/서버 렌더 이점을 잃는다. (CLAUDE.md
 *   §Consumer Config Injection 참고.)
 * - `ColorSchemeScript`와 Mantine CSS import는 `<head>`/서버 layout 몫이라
 *   여기서 빼둔다.
 *
 * 색상 오버라이드는 소비자의 `"use client"` 모듈에서 `mergeThemeOverrides(theme, …)`
 * 로 합친 결과를 `theme` prop에 넘긴다. 생략하면 프레임워크 기본 테마를 쓴다.
 */
export function SdProvider({
  children,
  theme = baseTheme,
  navItems,
  defaultColorScheme = 'light',
}: {
  children: React.ReactNode
  /** 생략 시 프레임워크 기본 테마. 색 오버라이드는 `mergeThemeOverrides`로 합쳐 넘긴다. */
  theme?: MantineThemeOverride
  navItems: NavItem[]
  defaultColorScheme?: MantineColorScheme
}) {
  return (
    <MantineProvider theme={theme} defaultColorScheme={defaultColorScheme}>
      {/* 토스트가 렌더되는 곳 — 이게 없으면 SdToast 호출이 아무 일도 하지 않는다. */}
      <SdToastProvider />
      <NavProvider navItems={navItems}>{children}</NavProvider>
    </MantineProvider>
  )
}
