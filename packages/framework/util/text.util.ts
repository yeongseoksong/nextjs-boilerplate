import { COMPANY_NAME } from './env.util'

const COMPANY_TOKEN = '%c'


/** 문자열 안의 `%c`를 회사명으로 치환한다. 서버/클라이언트 양쪽에서 안전하다. */
export function t(text: string): string {
  return text.replaceAll(COMPANY_TOKEN, COMPANY_NAME)
}
