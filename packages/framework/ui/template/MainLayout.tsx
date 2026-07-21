'use client'
import { AppShell } from '@mantine/core'
import { SdHeader, SdFooter } from '../organism'
import { CompanyInfo, NavItem } from '../../types'

export function MainLayout({
  children,
  navItems,
  companyInfo,
}: {
  children: React.ReactNode
  navItems: NavItem[]
  companyInfo: CompanyInfo
}) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <SdHeader navItems={navItems} loginFlag={true} />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <SdFooter company={companyInfo} navItems={navItems} />
    </AppShell>
  )
}
