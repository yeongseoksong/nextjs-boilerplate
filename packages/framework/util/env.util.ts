/**
 * 소비자 앱이 주입하는 상수들.
 *
 * 값은 소비자 앱의 `NEXT_PUBLIC_*` 환경변수에서 온다. 번들러가 빌드 시점에
 * 리터럴로 치환하므로, tsup이 ui/util 번들을 나눠도 양쪽에 같은 값이 박힌다.
 * (모듈 전역 변수로 주입하던 이전 방식은 번들이 갈리면서 값이 공유되지 않았다.)
 *
 * `process.env.X` 형태로 통째로 접근해야 한다. 구조분해(`const { X } = process.env`)는
 * 번들러의 정적 치환 대상이 아니라서 undefined가 된다.
 */

/**
 * 이 파일에서 필요한 최소한의 `process` 타입만 모듈 스코프로 선언한다.
 * `@types/node`를 의존성에 넣으면 브라우저 대상 라이브러리에 Node 전역 타입이
 * 딸려 들어와 `setTimeout` 반환 타입 등이 바뀐다.
 */
declare const process: { env: Record<string, string | undefined> }

/** `%c` 토큰이 치환될 회사명. 소비자 앱에서 필수. */
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME ?? ''

/** 헤더 로고 이미지 경로. */
export const LOGO_SRC = process.env.NEXT_PUBLIC_LOGO_SRC ?? '/logo.svg'

/** 헤더 로고 대체 텍스트. */
export const LOGO_ALT = process.env.NEXT_PUBLIC_LOGO_ALT ?? '로고'
