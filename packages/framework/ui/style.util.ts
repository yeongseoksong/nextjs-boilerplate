/**
 * Mantine 컬러 토큰("slate.4")을 CSS 변수("var(--mantine-color-slate-4)")로 바꾼다.
 *
 * `--mantine-color-*` 네이밍은 Mantine 테마 시스템의 규약이라 이 함수는 UI 레이어에만
 * 의미가 있다 — `util/`의 나머지(`t()`, `josa`, `filterAndSort`, `runFinalizers`)처럼
 * Mantine 없이도 쓸 수 있는 순수 유틸이 아니다. 그래서 `/util` 공개 경로로 내보내지
 * 않고 `ui/` 안에만 둔다. 현재 `SdLink`(hover 시 색을 인라인 style로 복원하기 위해)만 쓴다.
 */
export function toCssColor(value: unknown): string {
  if (typeof value !== 'string') return ''
  return value.includes('.') ? `var(--mantine-color-${value.replace('.', '-')})` : value
}
