'use client'
import { Anchor as MantineAnchor, AnchorProps, TextProps } from '@mantine/core'
import { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { toCssColor } from '../style.util'
import { t } from '../../util/text.util'
import { textStyles } from '../typography'
import { SdText } from './Text'

type Props = AnchorProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'style'> & {
    children?: ReactNode
  }

/** 같은 강조도를 가진 SdText 변형 — href가 없을 때의 폴백. */
type TextFallback = (props: TextProps & { children?: ReactNode }) => ReactNode

const HOVER_COLOR = 'var(--mantine-color-primary-6)'

/**
 * Mantine 컬러 토큰("slate.4")을 CSS 변수로 바꾼다.
 * `c` 프롭은 인라인 style로 적용되므로, hover 해제 시 빈 문자열로 되돌리면
 * variant 색이 사라진다. 원래 색을 명시적으로 복원하기 위해 필요하다.
 */

/**
 * `defaults`로 링크를, `Fallback`으로 href 없는 경우의 텍스트를 만든다.
 *
 * NavItem처럼 href가 선택인 데이터(그룹 제목 역할의 상위 메뉴 등)를 그릴 때
 * 호출부마다 `item.href ? <SdLink…> : <SdText…>` 삼항을 쓰는 대신 여기서 흡수한다.
 * href 없는 <a>는 포커스도 못 받는 죽은 앵커라 텍스트로 렌더하는 게 맞다.
 */
function createLink(defaults: AnchorProps, Fallback: TextFallback) {
  return function SdLink({ children, onMouseEnter, onMouseLeave, ...props }: Props) {
    const baseColor = toCssColor(props.c ?? defaults.c)
    const resolved = typeof children === 'string' ? t(children) : children

    if (!props.href) {
      // 앵커 전용 속성은 텍스트에 의미가 없으므로 떨군다.
      // t()는 SdText가 다시 적용하니 가공 전 children을 넘긴다.
      const { href: _href, target: _target, rel: _rel, ...textProps } = props
      return <Fallback {...(textProps as TextProps)}>{children}</Fallback>
    }

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
        {resolved}
      </MantineAnchor>
    )
  }
}

/**
 * 공용 타이포 토큰(ui/typography.ts)에 링크 전용 프로퍼티만 얹는다.
 * fw·c·fz·style은 SdText와 같은 값을 쓰므로 여기서 다시 적지 않는다.
 */
function linkStyle(base: TextProps, extra?: AnchorProps): AnchorProps {
  return Object.assign({ underline: 'never' } as AnchorProps, base, extra)
}

// variant 이름은 쓰이는 위치가 아니라 강조도로 정한다 — SdText(Strong/Body/Sub/Hint)와 동일한 축.
export const SdLink = {
  /** 최상위 강조 — 눈에 띄어야 하는 단일 링크 */
  Strong: createLink(linkStyle(textStyles.Strong), SdText.Strong),
  /** 기본 — 본문·네비게이션 수준의 일반 링크 */
  Body: createLink(linkStyle(textStyles.Body), SdText.Body),
  /** 보조 — 연락처·정책 등 부가 정보 */
  Sub: createLink(linkStyle(textStyles.Sub), SdText.Sub),
  /** 최소 강조 — 링크 목록처럼 밀도가 높고 톤을 낮춰야 하는 곳 */
  Hint: createLink(linkStyle(textStyles.Hint), SdText.Hint),
}

// Server Component에서 직접 import 가능한 개별 export. (Text.tsx 주석 참고)
export const SdLinkStrong = SdLink.Strong
export const SdLinkBody = SdLink.Body
export const SdLinkSub = SdLink.Sub
export const SdLinkHint = SdLink.Hint
