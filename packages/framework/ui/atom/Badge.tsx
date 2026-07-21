import { Badge as MantineBadge, BadgeProps } from '@mantine/core'
import { ReactNode } from 'react'

type Props = BadgeProps & { children?: ReactNode }

function createBadge(defaults: BadgeProps) {
  return function SdBadge({ children, ...props }: Props) {
    return (
      <MantineBadge {...defaults} {...props}>
        {children}
      </MantineBadge>
    )
  }
}

export const SdBadge = {
  /** 기본 — outline slate */
  Default: createBadge({ variant: 'outline', color: 'slate' }),
  /** 브랜드 강조 — light primary */
  Primary: createBadge({ variant: 'light', color: 'primary' }),
  /** 성공/완료 */
  Success: createBadge({ variant: 'light', color: 'green' }),
  /** 주의/경고 */
  Warning: createBadge({ variant: 'light', color: 'orange' }),
}

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdBadgeDefault = SdBadge.Default
export const SdBadgePrimary = SdBadge.Primary
export const SdBadgeSuccess = SdBadge.Success
export const SdBadgeWarning = SdBadge.Warning
