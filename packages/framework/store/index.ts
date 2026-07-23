/**
 * Zustand 스토어. `@yeongseoksong/framework/store`로 독립된 진입점이다
 * (`tsup.config.ts`에 `store/index`가 별도 빌드 패스로 있다).
 *
 * **`ui/index.tsx`는 이걸 다시 export하지 않는다 — 반드시 그래야 한다.** tsup(esbuild)은
 * 상대 경로 import를 만나면 그 모듈을 인라인 복사한다. 만약 `ui`가 `export * from
 * '../store'`를 했다면 스토어 코드가 `dist/ui`와 `dist/store` 두 번들에 각각 한 번씩,
 * 총 두 벌 존재하게 되고 `create()`도 두 번 호출된다 — 즉 소비자가 `/store`에서 가져온
 * `useAuthStore`와 어떤 `ui` 컴포넌트가 내부에서 쓰는 `useAuthStore`가 서로 다른 store
 * 인스턴스가 되어 상태가 갈라진다. 과거 `setCompanyName()`이 조용히 no-op이던 것과
 * 같은 원인(dual-bundle 모듈 상태 분열)이다 — README의 해당 항목 참고.
 *
 * 이 파일을 안전하게 만드는 조건은 이거 하나다: **`ui/` 안의 어떤 컴포넌트도 스토어를
 * import하지 않는다.** (`form.state.ts`가 `ui/atom/Toast`를 가져오는 것은 반대 방향이라
 * 문제 없다 — Toast는 상태가 없는 얇은 래퍼라 두 번들에 복사돼도 안전하다.) 스토어를
 * 쓰는 UI를 새로 만들 때는 그 컴포넌트를 Client Component로 두고 소비자가
 * `@yeongseoksong/framework/store`에서 훅을 가져와 prop으로 넘기는 방식을 쓴다.
 */
export * from './auth.store'

export * from './ui.store'

export * from './nav.store'

export * from './form.state'
