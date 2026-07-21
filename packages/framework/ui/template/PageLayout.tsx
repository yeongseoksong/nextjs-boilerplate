import { Box, Divider, Space, Stack } from '@mantine/core'
import { SdContainer } from '../atom/Container'
import { ReactNode } from 'react'
import { SdTextBox } from '../molecule/TextBox'
import { ST } from 'next/dist/shared/lib/utils'

interface PageHeroBaseProps {
  label?: ReactNode
  title: ReactNode
  description?: ReactNode
  children: ReactNode
}

interface WithImageProps extends PageHeroBaseProps {
  image?: string
}

function Content({ children }: { children: ReactNode }) {
  return (
    <SdContainer py="xl">
      <Stack gap="xl">{children}</Stack>
    </SdContainer>
  )
}

function LayoutGap() {
  return <Space h={48} />
}

function Minimal({ label, title, description, children }: PageHeroBaseProps) {
  return (
    <>
      <Plain>
        <SdTextBox.Section label={label} title={title} description={description ?? ''} />
        <Divider />
        {children}
      </Plain>
    </>
  )
}

function Plain({ children }: { children: ReactNode }) {
  return (
    <>
      <LayoutGap />
      <Content>{children}</Content>
    </>
  )
}

/* Image — 이미지 배경 + frosted glass 카드 */
function Image({ image, label, title, description, children }: WithImageProps) {
  return (
    <>
      <Box
        style={{
          position: 'relative',
          minHeight: '30svh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'var(--mantine-color-slate-9)',
        }}
      >
        {/* 전체 어둠 스크림 */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.55)',
          }}
        />
        <SdContainer style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {/* frosted glass 카드 */}
          <Box
            py={48}
            px={40}
            maw={420}
            style={{
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              background: 'rgba(255,255,255,0.10)',
              borderRadius: 'var(--mantine-radius-md)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <SdTextBox.Hero
              label={label}
              title={title}
              description={description}
              ta="left"
              align="flex-start"
            />
          </Box>
        </SdContainer>
      </Box>
      <Content>{children}</Content>
    </>
  )
}

/* Brand — primary 그라디언트 배경 + 중앙 텍스트 + 장식 원 */
function Brand({ label, title, description, children }: PageHeroBaseProps) {
  return (
    <>
      <Box
        style={{
          position: 'relative',
          minHeight: '40svh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, var(--mantine-color-primary-8) 0%, var(--mantine-color-primary-6) 50%, var(--mantine-color-primary-4) 100%)',
        }}
      >
        <Box
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            bottom: -60,
            left: -60,
            width: 240,
            height: 240,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }}
        />
        <SdContainer style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <SdTextBox.Hero
            label={label}
            title={title}
            description={description}
            ta="center"
            align="center"
            maw={640}
            mx="auto"
            pt={80}
            pb={64}
          />
        </SdContainer>
      </Box>
      <Content>{children}</Content>
    </>
  )
}

/* Plain — 히어로 없이 SdContainer만 */

export const PageLayout = {
  /** 이미지 배경 + 대각선 그라디언트 + 좌하단 텍스트 */
  Image,
  /** SdTextBox.Section 타이틀 + Plain 컨테이너 */
  Minimal,
  /** primary 그라디언트 배경 + 중앙 텍스트 */
  Brand,
  /** 히어로 없이 SdContainer + py="xl" 만 */
  Plain,
}
