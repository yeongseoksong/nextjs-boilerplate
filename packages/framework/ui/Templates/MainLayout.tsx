'use client'; 

import { AppShell } from '@mantine/core';
import { SdHeader, SdFooter } from '../organism';

export function MainLayout({ children, navItems }: { children: React.ReactNode, navItems: any[] }) {

  return (
    <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
      <AppShell.Header>
        <SdHeader navItems={navItems} />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <SdFooter />
    </AppShell>
  );
}