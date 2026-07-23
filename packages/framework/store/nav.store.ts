import { create } from 'zustand'
import { NavItem } from '../types'

interface NavState {
  /** 앱 전역 네비게이션 트리. 소비자가 앱 진입 시 `setNavItems`로 한 번 주입한다. */
  navItems: NavItem[]
  setNavItems: (navItems: NavItem[]) => void
}

/**
 * 네비게이션 상태 스토어 — 렌더 트리 **밖에서** navItems에 접근해야 할 때 쓴다
 * (프로그램적 네비게이션, 라우팅 로직 등). 소비자가 `setNavItems`로 채운다.
 *
 * 트리 **안** 컴포넌트(`SdBreadcrumb`)는 이 스토어가 아니라 `ui/template/NavProvider`의
 * React Context(`useNav`)에서 navItems를 읽는다 — `ui` 번들이 스토어를 import하면
 * `dist/ui`에 인라인돼 `create()`가 두 번 도는 dual-bundle 문제가 생기기 때문이다
 * (store/index.ts 상단 주석 참고). Context는 모듈 상태가 없어 그 문제에서 자유롭다.
 */
export const useNavStore = create<NavState>()((set) => ({
  navItems: [],
  setNavItems: (navItems) => set({ navItems }),
}))
