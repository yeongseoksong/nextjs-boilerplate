'use client'
import { Box, Burger, Drawer, Group, Menu, NavLink, Stack } from '@mantine/core'
import { SdContainer } from '../atom/Container'
import { Logo } from '../atom/Logo'
import { SdButton } from '../atom/Button'
import { SdLink } from '../atom/Link'
import { SdText } from '../atom/Text'
import { IconChevronDown } from '@tabler/icons-react'
import { useDisclosure, useFocusWithin, useHover, useMergedRef } from '@mantine/hooks'
import { NavItem } from '../../types'
import { filterAndSort } from '../../util/sort.util'

export type { NavItem }

/** 상단 바 높이. MainLayout의 AppShell `header={{ height }}`와 맞춘다. */
const BAR_HEIGHT = 60

interface HeaderProps {
  navItems: NavItem[]
  loginFlag?: boolean
}

/** navItems를 isShow/order로 정리한 뒤 상위 항목과 자식 조회 함수로 나눈다. */
function useNavTree(navItems: NavItem[]) {
  const visibleItems = filterAndSort(navItems)
  return {
    topItems: visibleItems.filter((item) => !item.parentId),
    childrenOf: (parentId: number) => visibleItems.filter((item) => item.parentId === parentId),
    hasAnyChildren: visibleItems.some((item) => item.parentId),
  }
}

interface MobileNavProps {
  opened: boolean
  close: () => void
  topItems: NavItem[]
  childrenOf: (parentId: number) => NavItem[]
  loginFlag?: boolean
}

/** 모바일 버거 드로어. 데스크톱 변형과 무관하게 동일한 아코디언을 쓴다. */
function MobileNav({ opened, close, topItems, childrenOf, loginFlag }: MobileNavProps) {
  return (
    <Drawer opened={opened} onClose={close} hiddenFrom="sm" size="xs">
      <Stack gap={0}>
        {topItems.map((item) => {
          const kids = childrenOf(item.id)
          if (kids.length === 0) {
            return (
              <Box key={item.id} px="sm" py={8}>
                <SdLink.Body href={item.href} onClick={close}>
                  {item.label}
                </SdLink.Body>
              </Box>
            )
          }

          return (
            <NavLink
              key={item.id}
              label={item.label}
              href={item.href}
              childrenOffset={28}
              onClick={kids.length > 0 ? undefined : close}
            >
              {kids.map((kid) => (
                <NavLink key={kid.id} label={kid.label} href={kid.href} onClick={close} />
              ))}
            </NavLink>
          )
        })}
        {loginFlag && (
          <Stack gap="xs" mt="md">
            <SdButton.Primary size="xs">로그인</SdButton.Primary>
          </Stack>
        )}
      </Stack>
    </Drawer>
  )
}

/**
 * Mega 변형(기본) — 헤더 전체가 아래로 확장되며 하위 링크가 상위 항목 아래 컬럼으로
 * 한꺼번에 노출되는 메가 메뉴.
 */
function MegaHeader({ navItems, loginFlag }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure()

  const { topItems, childrenOf, hasAnyChildren } = useNavTree(navItems)

  /**
   * hover(마우스) + focus-within(키보드 Tab) 둘 다로 확장을 연다.
   * 상위 링크와 하위 링크가 같은 Box 안에 있어 그 사이를 오갈 때 닫히지 않는다.
   */
  const { hovered, ref: hoverRef } = useHover<HTMLDivElement>()
  const { focused, ref: focusRef } = useFocusWithin<HTMLDivElement>()
  const rootRef = useMergedRef(hoverRef, focusRef)
  const expanded = hasAnyChildren && (hovered || focused)

  return (
    <>
      {/*
        pos="relative" — 확장 영역이 AppShell.Header의 60px를 넘겨 자라도
        (AppShell.Header에는 overflow 지정이 없다) 뒤따르는 콘텐츠 위에 그려지게 한다.
      */}
      <Box
        ref={rootRef}
        pos="relative"
        bg="var(--mantine-color-body)"
        style={{
          boxShadow: expanded ? 'var(--mantine-shadow-md)' : undefined,
          borderBottom: expanded ? '1px solid var(--mantine-color-slate-2)' : undefined,
          transition: 'box-shadow 0.15s',
        }}
      >
        <SdContainer>
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Group h={BAR_HEIGHT} align="center">
              <Logo />
            </Group>

            {/* 상위 링크와 그 자식을 한 컬럼에 담아, 정렬을 flexbox가 보장하게 한다. */}
            <Group gap="xl" align="flex-start" wrap="nowrap" visibleFrom="sm">
              {topItems.map((item) => {
                const kids = childrenOf(item.id)
                return (
                  <Stack key={item.id} gap={0} align="center">
                    <Group h={BAR_HEIGHT} align="center">
                      {item.href ? (
                        <SdLink.Body href={item.href}>{item.label}</SdLink.Body>
                      ) : (
                        <SdText.Strong>{item.label}</SdText.Strong>
                      )}
                    </Group>
                    {kids.length > 0 && (
                      /*
                        Mantine Collapse를 쓰지 않는다 — 접힐 때 display:none이 되어
                        하위 링크가 폭 계산에서 빠졌다가 펼칠 때 다시 들어오면서
                        컬럼 폭(=상단 nav 간격)이 튄다.
                        height 0 + overflow hidden은 폭 기여를 유지하므로 간격이 고정된다.
                        visibility:hidden이 접힌 상태의 링크를 탭 순서에서도 빼준다.
                      */
                      <Box
                        aria-hidden={!expanded}
                        style={{
                          height: expanded ? 'auto' : 0,
                          overflow: 'hidden',
                          opacity: expanded ? 1 : 0,
                          visibility: expanded ? 'visible' : 'hidden',
                          transition: 'opacity 0.15s ease',
                        }}
                      >
                        <Stack gap="xs" pt={4} pb="lg" align="center">
                          {kids.map((kid) => (
                            <SdLink.Sub key={kid.id} href={kid.href}>
                              {kid.label}
                            </SdLink.Sub>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                )
              })}
            </Group>

            <Group h={BAR_HEIGHT} align="center" gap="sm" wrap="nowrap">
              <Burger hiddenFrom="sm" opened={opened} onClick={toggle} />

              {loginFlag && (
                <Group gap="sm" visibleFrom="sm">
                  <SdButton.Primary size="xs">로그인</SdButton.Primary>
                </Group>
              )}
            </Group>
          </Group>
        </SdContainer>
      </Box>

      <MobileNav
        opened={opened}
        close={close}
        topItems={topItems}
        childrenOf={childrenOf}
        loginFlag={loginFlag}
      />
    </>
  )
}

/**
 * Simple 변형 — 헤더 바 높이는 고정이고, 자식을 가진 상위 항목마다
 * Mantine `Menu`가 하나씩 붙어 개별 드롭다운으로 열린다.
 * 바가 자라지 않으므로 AppShell.Header 높이를 그대로 쓰는 레이아웃에 적합하다.
 */
function SimpleHeader({ navItems, loginFlag }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure()

  const { topItems, childrenOf } = useNavTree(navItems)

  return (
    <>
      <Box bg="var(--mantine-color-body)">
        <SdContainer>
          <Group h={BAR_HEIGHT} justify="space-between" align="center" wrap="nowrap">
            <Logo />

            <Group gap="xl" align="center" wrap="nowrap" visibleFrom="sm">
              {topItems.map((item) => {
                const kids = childrenOf(item.id)

                if (kids.length === 0) {
                  return item.href ? (
                    <SdLink.Body key={item.id} href={item.href}>
                      {item.label}
                    </SdLink.Body>
                  ) : (
                    <SdText.Strong key={item.id}>{item.label}</SdText.Strong>
                  )
                }

                return (
                  /*
                    trigger="click-hover" — 마우스는 hover로, 키보드/터치는 click으로 연다.
                    Menu.Target은 ref를 받을 수 있는 단일 엘리먼트여야 하므로
                    SdLink/SdText가 아니라 Box를 타깃으로 두고 라벨을 그 안에 넣는다.
                  */
                  <Menu
                    key={item.id}
                    trigger="click-hover"
                    openDelay={50}
                    closeDelay={120}
                    position="bottom"
                    offset={12}
                    shadow="md"
                    radius="md"
                    withinPortal
                  >
                    <Menu.Target>
                      <Box style={{ cursor: 'pointer' }}>
                        <Group gap={4} align="center" wrap="nowrap">
                          {item.href ? (
                            <SdLink.Body href={item.href}>{item.label}</SdLink.Body>
                          ) : (
                            <SdText.Strong>{item.label}</SdText.Strong>
                          )}
                          <IconChevronDown size={14} stroke={2} />
                        </Group>
                      </Box>
                    </Menu.Target>

                    <Menu.Dropdown>
                      {kids.map((kid) => (
                        <Menu.Item key={kid.id} component="a" href={kid.href}>
                          {kid.label}
                        </Menu.Item>
                      ))}
                    </Menu.Dropdown>
                  </Menu>
                )
              })}
            </Group>

            <Group align="center" gap="sm" wrap="nowrap">
              <Burger hiddenFrom="sm" opened={opened} onClick={toggle} />

              {loginFlag && (
                <Group gap="sm" visibleFrom="sm">
                  <SdButton.Primary size="xs">로그인</SdButton.Primary>
                </Group>
              )}
            </Group>
          </Group>
        </SdContainer>
      </Box>

      <MobileNav
        opened={opened}
        close={close}
        topItems={topItems}
        childrenOf={childrenOf}
        loginFlag={loginFlag}
      />
    </>
  )
}

export const SdHeader = Object.assign(MegaHeader, { Mega: MegaHeader, Simple: SimpleHeader })

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdHeader.Simple 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdHeaderMega = MegaHeader
export const SdHeaderSimple = SimpleHeader
