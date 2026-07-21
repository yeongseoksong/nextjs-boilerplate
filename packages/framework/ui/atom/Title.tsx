import { Title as MantineTitle, TitleProps } from '@mantine/core'
import { ReactNode } from 'react'
import { t } from '../../util/text.util'

type Props = TitleProps & { children?: ReactNode }

function createTitle(defaults: TitleProps) {
  return function SdTitle({ children, ...props }: Props) {
    const resolved = typeof children === 'string' ? t(children) : children

    return (
      <MantineTitle {...defaults} {...props}>
        {resolved}
      </MantineTitle>
    )
  }
}

export const SdTitle = {
  /** 히어로 대제목 — h1, clamp 폰트 */
  Display: createTitle({ order: 2 }),
  /** 섹션 제목  */
  Section: createTitle({ order: 3 }),
  /** 카드·모달 제목 — */
  Card: createTitle({ order: 4 }),
  /** 소제목  */
  Sub: createTitle({ order: 5 }),
}

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdTitleDisplay = SdTitle.Display
export const SdTitleSection = SdTitle.Section
export const SdTitleCard = SdTitle.Card
export const SdTitleSub = SdTitle.Sub
