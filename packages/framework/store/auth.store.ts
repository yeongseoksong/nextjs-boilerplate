'use client'

import { useEffect } from 'react'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/**
 * 로그인한 사용자. 소비자 앱의 사용자 모델이 더 넓으면 `login()`에 넘기기 전에
 * 이 형태로 좁혀서 넣는다 — 스토어는 화면이 필요로 하는 최소 정보만 갖는다.
 */
export interface AuthUser {
  id: string
  email: string
  name?: string
  roles?: string[]
}

interface AuthState {
  user: AuthUser | null
  /** user의 파생값이지만, 셀렉터를 `(s) => s.isAuthenticated` 한 줄로 유지하려고 상태로 둔다. */
  isAuthenticated: boolean
  /** localStorage 복원이 끝났는지. 정적 프리렌더 대비용 — 아래 주석 참고. */
  hasHydrated: boolean
  login: (user: AuthUser) => void
  logout: () => void
  setHasHydrated: (value: boolean) => void
}

/**
 * 인증 세션.
 *
 * **액세스 토큰을 여기 넣지 말 것.** `partialize`가 사용자 프로필만 저장하도록
 * 막아 두었다. 토큰은 httpOnly 쿠키로 두는 게 소비자 앱의 몫이다 — localStorage에
 * 담으면 XSS 한 번에 그대로 털린다.
 *
 * `skipHydration`을 켠 이유: 자동 복원은 모듈 평가 시점에 일어나서 **첫 클라이언트
 * 렌더가 이미 로그인 상태**가 된다. 반면 서버가 만든 HTML에는 항상 로그아웃 상태가
 * 박혀 나가므로(`output: "export"`면 빌드 시점에 고정) 하이드레이션 불일치가 난다.
 * 복원을 이펙트로 미루면 첫 렌더가 서버와 일치하고, 그 다음 틱에 세션이 반영된다.
 * 복원을 트리거하고 완료 여부를 돌려주는 게 아래 `useAuthHydrated()`다.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: 'sd-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
      skipHydration: true,
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    },
  ),
)

/** 앱 수명 동안 복원은 한 번이면 된다 — 훅이 여러 컴포넌트에서 불려도 중복 실행하지 않는다. */
let rehydrateStarted = false

/**
 * 저장된 세션을 복원하고, 복원이 끝났는지를 돌려준다.
 *
 * 로그인 여부에 따라 다르게 그리는 UI는 이 값이 `false`인 동안 **로그아웃 상태로**
 * 그려야 서버 HTML과 어긋나지 않는다.
 *
 * ```tsx
 * const hydrated = useAuthHydrated()
 * const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
 * if (hydrated && isAuthenticated) { ... }
 * ```
 */
export function useAuthHydrated(): boolean {
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  useEffect(() => {
    if (rehydrateStarted) return
    rehydrateStarted = true
    void useAuthStore.persist.rehydrate()
  }, [])

  return hasHydrated
}
