'use client'

import { Box, Center, Group, Stack } from '@mantine/core'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'
import { ComponentType, ReactNode } from 'react'
import { SdButton } from '../atom/Button'
import { SdContainer } from '../atom/Container'
import { SdText } from '../atom/Text'
import { SdTitle } from '../atom/Title'

/** 결과 화면의 액션 버튼. SdButton은 component prop을 받지 못해 href가 아닌 onClick만 받는다. */
interface ResultAction {
  label: ReactNode
  onClick: () => void
}

interface SdResultProps {
  title?: ReactNode
  description?: ReactNode
  /** 주 액션 — filled primary */
  primaryAction?: ResultAction
  /** 보조 액션 — ghost */
  secondaryAction?: ResultAction
  /** 제목·설명과 버튼 사이 상세 슬롯 (주문번호 요약 등) */
  children?: ReactNode
  /** 화면 최소 높이. 좁은 프레임에 담을 때 줄인다. SdErrorView와 같은 기본값. */
  mih?: string | number
}

/** 원형 아이콘 배지 — 상태를 한눈에 알리는 유일한 색 요소. */
function ResultIcon({ color, Icon }: { color: string; Icon: ComponentType<{ size?: number; stroke?: number; color?: string }> }) {
  return (
    <Center w={88} h={88} bg={`${color}.0`} style={{ borderRadius: '50%' }} aria-hidden>
      <Icon size={48} stroke={1.5} color={`var(--mantine-color-${color}-6)`} />
    </Center>
  )
}

function createResult(defaults: {
  color: string
  Icon: ComponentType<{ size?: number; stroke?: number; color?: string }>
  title: ReactNode
}) {
  return function SdResult({
    title = defaults.title,
    description,
    primaryAction,
    secondaryAction,
    children,
    mih = '60vh',
  }: SdResultProps) {
    return (
      <Center mih={mih}>
        <SdContainer>
          <Stack align="center" gap="lg" ta="center">
            <ResultIcon color={defaults.color} Icon={defaults.Icon} />
            <Stack gap="sm" align="center">
              <SdTitle.Section>{title}</SdTitle.Section>
              {description && <SdText.Body maw={480}>{description}</SdText.Body>}
            </Stack>
            {children && <Box>{children}</Box>}
            {(primaryAction || secondaryAction) && (
              <Group gap="sm" justify="center">
                {primaryAction && (
                  <SdButton.Primary onClick={primaryAction.onClick}>
                    {primaryAction.label}
                  </SdButton.Primary>
                )}
                {secondaryAction && (
                  <SdButton.Ghost onClick={secondaryAction.onClick}>
                    {secondaryAction.label}
                  </SdButton.Ghost>
                )}
              </Group>
            )}
          </Stack>
        </SdContainer>
      </Center>
    )
  }
}

export const SdResult = {
  /** 성공 — 가입 완료·결제 완료 등 */
  Success: createResult({
    color: 'green',
    Icon: IconCircleCheck,
    title: '완료되었습니다',
  }),
  /** 실패 — 결제 실패·처리 중 오류 등. 서버 오류·404는 SdErrorView를 쓴다. */
  Error: createResult({
    color: 'red',
    Icon: IconCircleX,
    title: '문제가 발생했습니다',
  }),
}

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdResultSuccess = SdResult.Success
export const SdResultError = SdResult.Error
