'use client'
import { AppShell } from '@mantine/core'
import { SdHeader, SdFooter } from '../organism'
import { CompanyInfo, NavItem } from '../../types'

/** 헤더 변형 선택자 — SdHeader의 네임스페이스 키와 1:1로 대응한다. */
export type HeaderVariant = 'mega' | 'simple'

const headers: Record<HeaderVariant, typeof SdHeader.Mega> = {
  mega: SdHeader.Mega,
  simple: SdHeader.Simple,
}

export function MainLayout({
  children,
  navItems,
  companyInfo,
  loginFlag,
  headerVariant = 'mega',
}: {
  children: React.ReactNode
  navItems: NavItem[]
  companyInfo: CompanyInfo
  loginFlag?: boolean
  /** 기본 `mega` — hover 시 헤더가 확장되는 메가 메뉴. `simple`은 바 높이 고정 + 개별 드롭다운. */
  headerVariant?: HeaderVariant
}) {
  const Header = headers[headerVariant]

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header>
        <Header navItems={navItems} loginFlag={loginFlag} />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <SdFooter company={companyInfo} navItems={navItems} />
    </AppShell>
  )
}
