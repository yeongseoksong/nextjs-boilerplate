import { Box, Divider, Group, Space, Stack } from '@mantine/core'
import { SdContainer } from '../atom/Container'
import { ReactNode } from 'react'
import { SdTextBox } from '../molecule/TextBox'
import { SdText } from '../atom/Text'
import { SdBreadcrumb } from '../molecule/Breadcrumb'
import { NavItem } from '../../types'
import { brandDotTexture, brandSurface } from '../surface'

/**
 * 모든 변형이 공유하는 브레드크럼 설정.
 * `navItems`가 있고 `breadcrumb`이 false가 아니면 본문 최상단에 브레드크럼을 그린다.
 */
interface BreadcrumbProps {
  /** 브레드크럼용 네비 트리. 없으면 브레드크럼을 렌더하지 않는다. */
  navItems?: NavItem[]
  /** 브레드크럼 표시 여부. 기본 `true` — `navItems`가 있을 때만 실제로 그려진다. `false`로 끈다. */
  breadcrumb?: boolean
  /** 현재 경로 강제 지정. 생략 시 `SdBreadcrumb`가 `usePathname()`으로 추론한다. */
  currentHref?: string
}

interface PageHeroBaseProps extends BreadcrumbProps {
  label?: ReactNode
  title: ReactNode
  description?: ReactNode
  children: ReactNode
}

interface WithImageProps extends PageHeroBaseProps {
  image?: string
}

/** 히어로 최소 높이 · 세로 여백. Image/Brand가 같은 리듬을 갖도록 한 곳에서 관리한다. */
const HERO_MIN_H = '38svh'
const HERO_PY = { base: 56, sm: 88 }
const HERO_MAW = 680

function Content({
  children,
  navItems,
  breadcrumb = true,
  currentHref,
}: BreadcrumbProps & { children: ReactNode }) {
  const showBreadcrumb = breadcrumb && !!navItems && navItems.length > 0
  return (
    <SdContainer py="xl">
      {showBreadcrumb && <SdBreadcrumb navItems={navItems} currentHref={currentHref} mb="lg" />}
      <Stack gap="xl">{children}</Stack>
    </SdContainer>
  )
}

function LayoutGap() {
  return <Space/>
}

function Minimal({
  label,
  title,
  description,
  children,
  navItems,
  breadcrumb,
  currentHref,
}: PageHeroBaseProps) {
  return (
    <Plain navItems={navItems} breadcrumb={breadcrumb} currentHref={currentHref}>
      <LayoutGap></LayoutGap>
      <SdTextBox.Section label={label} title={title} description={description ?? ''} />
      <Divider />
      {children}
    </Plain>
  )
}

function Plain({
  children,
  navItems,
  breadcrumb,
  currentHref,
}: BreadcrumbProps & { children: ReactNode }) {
  return (
    <>
      <Content navItems={navItems} breadcrumb={breadcrumb} currentHref={currentHref}>
        {children}
      </Content>
    </>
  )
}

/**
 * 어두운 히어로 위의 텍스트 블록. Image/Brand 공용.
 *
 * SdTextBox의 `label`을 쓰지 않고 eyebrow를 직접 렌더한다 — SdText.Eyebrow의 기본
 * primary.6은 어두운 배경에서 대비가 부족해서, 여기서만 밝은 톤으로 올린다.
 */
function HeroCopy({ label, title, description }: Omit<PageHeroBaseProps, 'children'>) {
  return (
    <Stack gap="md" maw={HERO_MAW}>
      {label && (
        <Group gap="sm" align="center" wrap="nowrap">
          <Box w={28} h={2} bg="primary.3" style={{ borderRadius: 2 }} />
          <SdText.Eyebrow c="primary.1">{label}</SdText.Eyebrow>
        </Group>
      )}
      <SdTextBox.Hero
        title={title}
        description={description}
        gap="sm"
        maxDescWidth={560}
        ta="left"
        align="flex-start"
      />
    </Stack>
  )
}

/* Image — 사진 배경 + 아래로 짙어지는 스크림 + 좌측 정렬 텍스트 */
function Image({
  image,
  label,
  title,
  description,
  children,
  navItems,
  breadcrumb,
  currentHref,
}: WithImageProps) {
  return (
    <>
      <Box
        pos="relative"
        style={{
          minHeight: HERO_MIN_H,
          display: 'flex',
          alignItems: 'flex-end',
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: 'var(--mantine-color-slate-9)',
        }}
      >
        {/*
          균일한 검정 오버레이 대신 위→아래로 짙어지는 스크림.
          사진은 위쪽에서 살아 있고, 텍스트가 놓이는 아래쪽에서만 대비를 확보한다.
        */}
        <Box
          aria-hidden
          pos="absolute"
          inset={0}
          style={{
            background:
              'linear-gradient(180deg, rgba(15,23,42,0.25) 0%, rgba(15,23,42,0.72) 62%, rgba(15,23,42,0.94) 100%)',
          }}
        />
        <SdContainer pos="relative" py={HERO_PY} style={{ zIndex: 1, width: '100%' }}>
          <HeroCopy label={label} title={title} description={description} />
        </SdContainer>
      </Box>
      <Content navItems={navItems} breadcrumb={breadcrumb} currentHref={currentHref}>
        {children}
      </Content>
    </>
  )
}

/* Brand — slate 바탕에 primary 라이트 + 도트 텍스처 */
function Brand({
  label,
  title,
  description,
  children,
  navItems,
  breadcrumb,
  currentHref,
}: PageHeroBaseProps) {
  return (
    <>
      <Box
        pos="relative"
        style={{
          minHeight: HERO_MIN_H,
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
          borderBottom: '1px solid var(--mantine-color-slate-8)',
          /*
            대각선 그라디언트 한 줄 대신, 어두운 slate 바탕 위에 primary 광원 두 개를
            radial로 얹는다. 배너보다 조명에 가까워 톤이 차분하다.
            값은 ui/surface.ts — SdLoginView.Split의 좌측 패널과 공유한다.
          */
          ...brandSurface,
        }}
      >
        {/* 도트 텍스처 — 아래로 갈수록 사라져 텍스트 가독성을 해치지 않는다. */}
        <Box aria-hidden pos="absolute" inset={0} style={brandDotTexture} />
        <SdContainer pos="relative" py={HERO_PY} style={{ zIndex: 1, width: '100%' }}>
          <HeroCopy label={label} title={title} description={description} />
        </SdContainer>
      </Box>
      <Content navItems={navItems} breadcrumb={breadcrumb} currentHref={currentHref}>
        {children}
      </Content>
    </>
  )
}

/* Plain — 히어로 없이 SdContainer만 */

export const PageLayout = {
  /** 사진 배경 + 하단 스크림 + 좌측 정렬 텍스트 */
  Image,
  /** SdTextBox.Section 타이틀 + Plain 컨테이너 */
  Minimal,
  /** slate 바탕 + primary 라이트 + 도트 텍스처 */
  Brand,
  /** 히어로 없이 SdContainer + py="xl" 만 */
  Plain,
}


export const PageLayoutImage = PageLayout.Image
export const PageLayoutMinimal = PageLayout.Minimal
export const PageLayoutBrand = PageLayout.Brand
export const PageLayoutPlain = PageLayout.Plain