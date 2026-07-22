import { Text as MantineText, TextProps } from '@mantine/core'
import { ReactNode } from 'react'
import { t } from '../../util/text.util'
import { textStyles } from '../typography'

type Props = TextProps & { children?: ReactNode }

function createText(defaults: TextProps) {
  return function SdText({ children, ...props }: Props) {
    const resolved = typeof children === 'string' ? t(children) : children

    return (
      <MantineText {...defaults} {...props}>
        {resolved}
      </MantineText>
    )
  }
}

// 값은 ui/typography.ts의 공용 토큰에서 온다 (SdLink와 공유).
export const SdText = {
  Strong: createText(textStyles.Strong),
  Body: createText(textStyles.Body),
  Sub: createText(textStyles.Sub),
  Eyebrow: createText(textStyles.Eyebrow),
  Error: createText(textStyles.Error),
  Hint: createText(textStyles.Hint),
  Numeric: createText(textStyles.Numeric),
}

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdTextStrong = SdText.Strong
export const SdTextBody = SdText.Body
export const SdTextSub = SdText.Sub
export const SdTextEyebrow = SdText.Eyebrow
export const SdTextError = SdText.Error
export const SdTextHint = SdText.Hint
export const SdTextNumeric = SdText.Numeric
