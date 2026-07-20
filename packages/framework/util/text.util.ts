import { COMPANY_NAME } from "./env.util";

const COMPANY_TOKEN = "%c";

let warned = false;

/**
 * @deprecated 동작하지 않는다. tsup이 ui/util을 별개 번들로 빌드하면서 이 모듈이
 * `dist/ui`에 인라인 복사되기 때문에, 여기서 값을 바꿔도 `t()`를 실제로 호출하는
 * `SdText`/`SdTitle`은 다른 사본을 읽는다. 대신 `NEXT_PUBLIC_COMPANY_NAME`을 사용할 것.
 * 2.0.0에서 제거한다.
 */
export function setCompanyName(_name: string) {
  if (!warned) {
    warned = true;
    console.warn(
      "[@yeongseoksong/framework] setCompanyName()은 동작하지 않으며 2.0.0에서 제거됩니다. " +
        "NEXT_PUBLIC_COMPANY_NAME 환경변수를 사용하세요.",
    );
  }
}

/** 문자열 안의 `%c`를 회사명으로 치환한다. 서버/클라이언트 양쪽에서 안전하다. */
export function t(text: string): string {
  return text.replaceAll(COMPANY_TOKEN, COMPANY_NAME);
}
