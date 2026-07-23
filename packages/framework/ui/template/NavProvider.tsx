'use client'
import { createContext, useContext } from 'react'
import { NavItem } from '../../types'

/**
 * 네비게이션 트리를 렌더 트리에 얹는 React Context.
 *
 * zustand가 아니라 Context를 쓰는 이유: `useNav`를 소비하는 `SdBreadcrumb`가 `ui`
 * 번들 안에 있어서, 여기서 스토어를 import하면 esbuild가 스토어를 `dist/ui`에 인라인해
 * `create()`가 두 번 돌게 된다(dual-bundle 인스턴스 분열 — CLAUDE.md §State Management).
 * Context는 모듈 상태가 없어 `dist/ui`에 복사돼도 안전하므로 이 불변식을 지킨다.
 */
const NavContext = createContext<NavItem[]>([])

/**
 * navItems를 하위 트리에 제공한다. `SdProvider`가 자동으로 감싸므로, 그 아래의
 * `SdBreadcrumb`는 `navItems` prop 없이도 동작한다.
 */
export function NavProvider({
  children,
  navItems,
}: {
  children: React.ReactNode
  navItems: NavItem[]
}) {
  return <NavContext.Provider value={navItems}>{children}</NavContext.Provider>
}

/** 가장 가까운 `NavProvider`가 제공하는 navItems. Provider가 없으면 빈 배열. */
export function useNav(): NavItem[] {
  return useContext(NavContext)
}