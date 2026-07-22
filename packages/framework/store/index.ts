/**
 * Zustand 스토어.
 *
 * **별도 export 경로(`@yeongseoksong/framework/store`)를 만들지 않는다.** tsup은
 * entry마다 모듈을 인라인 복사하므로, 스토어를 자체 entry로 두고 `ui`에서도 import하면
 * 같은 스토어가 두 번들에 복사되어 상태가 갈라진다(소비자가 로그인시킨 스토어와
 * `SdHeader`가 읽는 스토어가 서로 다른 객체가 된다). 과거 `setCompanyName()`이
 * 조용히 no-op이던 것과 같은 원인이다 — README의 해당 항목 참고.
 *
 * 따라서 이 디렉터리는 `ui/index.tsx`에서만 re-export하고, 소비자는
 * `@yeongseoksong/framework/ui`에서 훅을 가져다 쓴다.
 */
export * from './auth.store'

export * from './ui.store'

export * from './form.state'
