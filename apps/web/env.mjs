/**
 * 필수 환경변수 검증.
 *
 * `next.config.mjs`에서 import한다. Next는 config를 읽기 전에 `.env*` 파일을 먼저
 * 로드하므로 여기서 `process.env`를 확인할 수 있고, 누락 시 dev/build가 즉시 멈춘다.
 * 이 검증이 없으면 회사명이 빈 문자열인 채로 프로덕션에 배포된다.
 *
 * 이 파일은 Node에서 실행되므로 `process.env[key]` 동적 접근이 가능하다.
 * 번들에 들어가는 코드(framework/util/env.util.ts)에서는 반드시
 * `process.env.NEXT_PUBLIC_X` 형태로 통째로 써야 정적 치환이 된다.
 */

/** 없으면 빌드를 중단시킬 변수. */
const REQUIRED = ["NEXT_PUBLIC_COMPANY_NAME"];

const missing = REQUIRED.filter((key) => !process.env[key]);

if (missing.length > 0) {
  throw new Error(
    `필수 환경변수가 설정되지 않았습니다: ${missing.join(", ")}\n` +
      `.env.example을 .env.local로 복사한 뒤 값을 채워주세요.`,
  );
}
