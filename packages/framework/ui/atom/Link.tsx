'use client'
import { Anchor as MantineAnchor, AnchorProps } from '@mantine/core'
import { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { toCssColor } from '../../util/style.util'

type Props = AnchorProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'style'> & {
    children?: ReactNode
  }

const HOVER_COLOR = 'var(--mantine-color-primary-6)'

/**
 * Mantine 컬러 토큰("slate.4")을 CSS 변수로 바꾼다.
 * `c` 프롭은 인라인 style로 적용되므로, hover 해제 시 빈 문자열로 되돌리면
 * variant 색이 사라진다. 원래 색을 명시적으로 복원하기 위해 필요하다.
 */

function createLink(defaults: AnchorProps) {
  return function SdLink({ children, onMouseEnter, onMouseLeave, ...props }: Props) {
    const baseColor = toCssColor(props.c ?? defaults.c)

    const handleEnter = (e: MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = HOVER_COLOR
      onMouseEnter?.(e)
    }
    const handleLeave = (e: MouseEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.color = baseColor
      onMouseLeave?.(e)
    }

    return (
      <MantineAnchor
        {...defaults}
        {...props}
        style={{ transition: 'color 0.15s' }}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </MantineAnchor>
    )
  }
}

// variant 이름은 쓰이는 위치가 아니라 강조도로 정한다 — SdText(Strong/Body/Sub/Hint)와 동일한 축.
export const SdLink = {
  /** 최상위 강조 — 눈에 띄어야 하는 단일 링크 */
  Strong: createLink({ fw: 700, c: 'primary.6', fz: 'xs', underline: 'never' }),
  /** 기본 — 본문·네비게이션 수준의 일반 링크 */
  Body: createLink({ fw: 500, c: 'slate.7', fz: 15, underline: 'never' }),
  /** 보조 — 연락처·정책 등 부가 정보 */
  Sub: createLink({ fw: 400, c: 'slate.5', fz: 'xs', underline: 'never' }),
  /** 최소 강조 — 링크 목록처럼 밀도가 높고 톤을 낮춰야 하는 곳 */
  Hint: createLink({ fw: 400, c: 'slate.4', fz: 'xs', underline: 'never' }),
}

// Server Component에서 직접 import 가능한 개별 export. (Text.tsx 주석 참고)
export const SdLinkStrong = SdLink.Strong
export const SdLinkBody = SdLink.Body
export const SdLinkSub = SdLink.Sub
export const SdLinkHint = SdLink.Hint
