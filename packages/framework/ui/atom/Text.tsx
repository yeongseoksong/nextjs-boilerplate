import { Text as MantineText, TextProps } from '@mantine/core'
import { ReactNode } from 'react'
import { t } from '../../util/text.util'

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

export const SdText = {
  Strong: createText({ fw: 700, c: 'slate.9', fz: 'md', style: { letterSpacing: '-0.04em' } }),
  Body: createText({ fw: 400, c: 'slate.7', fz: 'md', lh: 1.7 }),
  Sub: createText({ fw: 400, c: 'slate.5', fz: 'xs', lh: 1.6 }),
  Eyebrow: createText({
    fw: 700,
    c: 'primary.6',
    fz: 'xs',
    style: { letterSpacing: '0.12em', textTransform: 'uppercase' },
  }),
  Error: createText({ fw: 400, c: 'red.6', fz: 'sm' }),
  Hint: createText({ fw: 400, c: 'slate.4', fz: 'xs', lh: 1.5 }),
  Numeric: createText({
    fw: 700,
    c: 'slate.8',
    fz: 'md',
    style: { fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.02em' },
  }),
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
