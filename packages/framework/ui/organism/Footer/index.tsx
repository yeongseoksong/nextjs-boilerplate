'use client'

import { Container, Grid } from '@mantine/core'
import { CompanyInfo, NavItem} from '../../../types'
import { FooterBrand } from './FooterBrand'
import { FooterContact } from './FooterContact'
import { FooterNav } from './FooterNav'
import { filterAndSort } from '../../../util/sort.util'

interface SdFooterProps {
  company: CompanyInfo
  /** Group 1 내 유틸리티 링크 (사이트맵, 자주 찾는 링크 등) */
  utilityLinks?: NavItem[]
  /** 정책 링크 — 개인정보처리방침은 highlight: true 필수 */
  policyLinks?: NavItem[]
}

export function SdFooter({ company, utilityLinks, policyLinks }: SdFooterProps) {
  const visibleUtility = filterAndSort(utilityLinks)
  const visiblePolicy = filterAndSort(policyLinks)

  return (
    <Container py="md">
      <Grid  align="flex-start">
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <FooterBrand company={company} policyLinks={visiblePolicy} />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <FooterContact company={company} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <FooterNav items={visibleUtility ?? []} />
        </Grid.Col>
      </Grid>s
    </Container>
  )
}
