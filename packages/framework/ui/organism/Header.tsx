"use client";
import { Drawer, Group, Burger, Stack } from "@mantine/core";
import { SdContainer } from "../atom/Container";
import { Logo } from "../atom/Logo";
import { SdButton } from "../atom/Button";
import { SdLink } from "../atom/Link";
import { ReactNode } from "react";
import { useDisclosure } from "@mantine/hooks";
import { NavItem } from "../../types";

export type { NavItem };

interface HeaderProps {
  navItems: NavItem[];
  loginFlag?: boolean;
  children?: ReactNode;
}

export function SdHeader({ navItems, loginFlag, children }: HeaderProps) {
  const [opened, { toggle, close }] = useDisclosure();

  const visibleTopItems = navItems
    .filter((item) => item.isShow && !item.parentId)
    .sort((a, b) => a.order - b.order)

  return (
    <>
      <SdContainer h="100%">
        <Group justify="space-between" h="100%">
          <Logo />
          <Group gap="xl" visibleFrom="sm">
            {visibleTopItems.map((item) => (
              <SdLink.Body key={item.id} href={item.href}>
                {item.label}
              </SdLink.Body>
            ))}
          </Group>
          <Burger hiddenFrom="sm" opened={opened} onClick={toggle} />
          {loginFlag && (
            <Group gap="sm" visibleFrom="sm">
              <SdButton.Ghost size="sm">로그인</SdButton.Ghost>
              <SdButton.Primary size="sm">무료 시작</SdButton.Primary>
            </Group>
          )}
          {children}
        </Group>
      </SdContainer>

      <Drawer opened={opened} onClose={close} hiddenFrom="sm" size="xs">
        <Stack>
          {visibleTopItems.map((item) => (
            <SdLink.Body key={item.id} href={item.href} fz={16} onClick={close}>
              {item.label}
            </SdLink.Body>
          ))}
          {loginFlag && (
            <Stack gap="xs" mt="md">
              <SdButton.Ghost size="sm">로그인</SdButton.Ghost>
              <SdButton.Primary size="sm">무료 시작</SdButton.Primary>
            </Stack>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
