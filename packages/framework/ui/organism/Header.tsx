"use client";
import { Anchor, Container, Drawer, Group, Burger, Stack } from "@mantine/core";
import { Logo } from "../atom/Logo";
import { SdButton } from "../atom/Button";
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

  return (
    <>
      <Container size="xl" h="100%">
        <Group justify="space-between" h="100%">
          <Logo />
          <Group gap="xl" visibleFrom="sm">
            {navItems.map((item) => (
              <Anchor key={item.label} href={item.href} c="slate.7" fw={500} underline="never" fz={15}>
                {item.label}
              </Anchor>
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
      </Container>

      <Drawer opened={opened} onClose={close} hiddenFrom="sm" size="xs">
        <Stack>
          {navItems.map((item) => (
            <Anchor key={item.label} href={item.href} c="slate.7" fw={500} underline="never" fz={16} onClick={close}>
              {item.label}
            </Anchor>
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
