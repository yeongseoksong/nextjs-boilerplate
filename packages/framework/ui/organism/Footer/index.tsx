'use client'

import React from 'react'
import { Anchor, Box, Divider, Grid, Group } from '@mantine/core'
import { SdContainer } from '../../atom/Container'
import { SdText } from '../../atom'
import { CompanyInfo, NavItem } from '../../../types'
import { FooterBrand } from './FooterBrand'
import { FooterContact } from './FooterContact'
import { FooterNav } from './FooterNav'
import { filterAndSort } from '../../../util/sort.util'

interface SdFooterProps {
  company: CompanyInfo
  utilityLinks?: NavItem[]
  policyLinks?: NavItem[]
}

export function SdFooter({ company, utilityLinks, policyLinks }: SdFooterProps) {
  const visibleUtility = filterAndSort(utilityLinks)
  const visiblePolicy = filterAndSort(policyLinks)

  return (
    <Box>
      {/* <SdContainer > */}

        <Grid style={{ '--grid-gutter': '48px' } as React.CSSProperties} align="flex-start">
          {/* 좌: 로고 */}
          <Grid.Col span={{ base: 12, md: 3 }}>
            <FooterBrand />
          </Grid.Col>

          {/* 우: 네비 */}
          <Grid.Col span={{ base: 12, md: 9 }}>
            <FooterNav items={visibleUtility ?? []} />
          </Grid.Col>
        </Grid>

        <Divider/>

        {/* 회사 정보 — 전체 폭 */}
        <FooterContact company={company} />

        <Divider/>

        {/* 하단 바 */}
        <Group justify="space-between" wrap="wrap" gap="xs">
          <SdText.Sub c="slate.5">
            © {company.copyrightYear} {company.name}. All rights reserved.
          </SdText.Sub>
          {visiblePolicy.length > 0 && (
            <Group gap="lg">
              {visiblePolicy.map((item) => (
                <Anchor
                  key={item.id}
                  href={item.href}
                  fz="xs"
                  c={item.highlight ? 'primary.6' : 'slate.5'}
                  underline="never"
                >
                  {item.label}
                </Anchor>
              ))}
            </Group>
          )}
        </Group>

      {/* </SdContainer> */}
    </Box>
  )
}
