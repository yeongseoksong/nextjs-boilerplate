'use client'
import { Box, Burger, Drawer, Group, NavLink, Stack } from '@mantine/core'
import { SdContainer } from '../atom/Container'
import { Logo } from '../atom/Logo'
import { SdButton } from '../atom/Button'
import { SdLink } from '../atom/Link'
import { SdText } from '../atom/Text'
import { ReactNode } from 'react'
import { useDisclosure, useFocusWithin, useHover, useMergedRef } from '@mantine/hooks'
import { NavItem } from '../../types'
import { filterAndSort } from '../../util/sort.util'

export type { NavItem }

/** 상단 바 높이. MainLayout의 AppShell `header={{ height }}`와 맞춘다. */
const BAR_HEIGHT = 60

interface HeaderProps {
  navItems: NavItem[]
  loginFlag?: boolean
  children?: ReactNode
}

export function SdHeader({ navItems, loginFlag, children }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure()

  const visibleItems = filterAndSort(navItems)
  const topItems = visibleItems.filter((item) => !item.parentId)
  const childrenOf = (parentId: number) => visibleItems.filter((item) => item.parentId === parentId)

  const hasAnyChildren = visibleItems.some((item) => item.parentId)

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
              {children}
            </Group>
          </Group>
        </SdContainer>
      </Box>

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
    </>
  )
}
