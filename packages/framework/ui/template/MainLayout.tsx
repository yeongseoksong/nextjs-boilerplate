'use client'
import { AppShell } from '@mantine/core'
import { SdHeader, SdFooter } from '../organism'
import { CompanyInfo, NavItem } from '../../types'
import { SdButtonExcel } from '../atom'

export function MainLayout({
  children,
  navItems,
  companyInfo,
  loginFlag,
}: {
  children: React.ReactNode
  navItems: NavItem[]
  companyInfo: CompanyInfo
  loginFlag?: boolean
}) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <SdHeader navItems={navItems} loginFlag={loginFlag}/>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <SdFooter company={companyInfo} navItems={navItems} />
    </AppShell>
  )
}
