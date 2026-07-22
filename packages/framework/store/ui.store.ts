import { create } from 'zustand'

interface UiState {
  /** 전역 로딩 오버레이 — 라우트 전환·일괄 작업처럼 화면 전체를 막아야 할 때 */
  globalLoading: boolean
  setGlobalLoading: (value: boolean) => void
  /** 관리자형 레이아웃의 사이드 내비 열림 상태 */
  sideNavOpened: boolean
  openSideNav: () => void
  closeSideNav: () => void
  toggleSideNav: () => void
}

/**
 * 화면 간 공유가 필요한 클라이언트 UI 상태.
 *
 * `SdHeader`의 모바일 드로어는 **일부러 여기 두지 않는다.** 그건 인스턴스 로컬
 * 상태(`useDisclosure`)여야 한다 — 카탈로그처럼 한 페이지에 헤더가 둘 이상 렌더되면
 * 스토어를 공유하는 순간 드로어가 함께 열린다.
 */
export const useUiStore = create<UiState>()((set) => ({
  globalLoading: false,
  setGlobalLoading: (value) => set({ globalLoading: value }),
  sideNavOpened: false,
  openSideNav: () => set({ sideNavOpened: true }),
  closeSideNav: () => set({ sideNavOpened: false }),
  toggleSideNav: () => set((state) => ({ sideNavOpened: !state.sideNavOpened })),
}))
