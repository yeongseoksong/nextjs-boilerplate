import type { TextProps } from '@mantine/core'

/**
 * SdText · SdLink 공용 타이포 토큰.
 *
 * 두 컴포넌트는 같은 강조 축(Strong / Body / Sub / Hint)을 쓰므로 fw·c·fz·style의
 * 출처를 여기 한 곳으로 모은다. 한쪽만 고쳐 톤이 어긋나는 일을 막는 게 목적이다.
 *
 * `underline` 같은 링크 전용 프로퍼티는 여기 두지 않는다 — Link.tsx가 이 토큰을
 * 확장(`Object.assign`)해서 얹는다. Anchor는 Text 위에 만들어져 있어
 * `AnchorProps`가 `TextProps`를 그대로 받으므로 토큰 하나로 양쪽이 통한다.
 */
export const textStyles = {
  /** 최상위 강조 */
  Strong: { fw: 700, c: 'slate.9', fz: 'md', style: { letterSpacing: '-0.04em' } },
  /** 기본 본문 */
  Body: { fw: 500, c: 'slate.7', fz: 'sm', lh: 1.7 },
  /** 보조 정보 */
  Sub: { fw: 400, c: 'slate.5', fz: 'xs', lh: 1.6 },
  /** 최소 강조 — 밀도 높은 목록 */
  Hint: { fw: 400, c: 'slate.4', fz: 'xs', lh: 1.5 },
  /** 섹션 라벨 */
  Eyebrow: {
    fw: 700,
    c: 'primary.6',
    fz: 'xs',
    style: { letterSpacing: '0.12em', textTransform: 'uppercase' },
  },
  /** 오류 메시지 */
  Error: { fw: 400, c: 'red.6', fz: 'sm' },
  /** 숫자 — 자릿수 정렬 */
  Numeric: {
    fw: 700,
    c: 'slate.8',
    fz: 'md',
    style: { fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' },
  },
} satisfies Record<string, TextProps>
