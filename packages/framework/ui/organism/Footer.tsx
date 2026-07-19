'use client'

import React from 'react'
import { Anchor, Box, Divider, Grid, Group, Stack } from '@mantine/core'
import { SdContainer } from '../atom/Container'
import { SdText } from '../atom'
import { Logo } from '../atom/Logo'
import { CompanyInfo, NavItem } from '../../types'
import { filterAndSort } from '../../util/sort.util'

interface SdFooterProps {
  company: CompanyInfo
  navItems?: NavItem[]
  policyLinks?: NavItem[]
  description?: string
}

function FooterNavColumns({ items }: { items: NavItem[] }) {
  const topLevel = items.filter((item) => !item.parentId)
  const getChildren = (parentId: number) =>
    items.filter((item) => item.parentId === parentId)

  return (
    <>
      {topLevel.map((group) => (
        <Grid.Col key={group.id} span={{ base: 6, sm: 4, md: 'auto' }}>
          <Stack gap="sm">
            <SdText.Strong fz="sm">{group.label}</SdText.Strong>
            {getChildren(group.id).map((link) => (
              <Anchor
                key={link.id}
                href={link.href}
                fz="sm"
                c="slate.6"
                underline="never"
                style={{ transition: 'color 0.15s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--mantine-color-primary-6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = ''
                }}
              >
                {link.label}
              </Anchor>
            ))}
          </Stack>
        </Grid.Col>
      ))}
    </>
  )
}

function FooterCompanyInfo({ company }: { company: CompanyInfo }) {
  const sortedAddresses = [...company.addresses].sort((a, b) => a.order - b.order)

  return (
    <Group gap="xs" wrap="wrap">
      <SdText.Sub>{company.name}</SdText.Sub>
      <SdText.Sub c="slate.4">|</SdText.Sub>
      <SdText.Sub>사업자등록번호 {company.registrationNumber}</SdText.Sub>
      {sortedAddresses.map((addr) => (
        <Group key={addr.label} gap="xs" wrap="nowrap">
          <SdText.Sub c="slate.4">|</SdText.Sub>
          <SdText.Sub>{addr.address}</SdText.Sub>
        </Group>
      ))}
      <SdText.Sub c="slate.4">|</SdText.Sub>
      <Anchor href={`tel:${company.tel}`} fz="xs" c="slate.5" underline="never">
        Tel {company.tel}
      </Anchor>
      {company.fax && (
        <>
          <SdText.Sub c="slate.4">|</SdText.Sub>
          <SdText.Sub>Fax {company.fax}</SdText.Sub>
        </>
      )}
      <SdText.Sub c="slate.4">|</SdText.Sub>
      <Anchor href={`mailto:${company.email}`} fz="xs" c="slate.5" underline="never">
        {company.email}
      </Anchor>
    </Group>
  )
}

export function SdFooter({ company, navItems, policyLinks, description }: SdFooterProps) {
  const visibleNav = filterAndSort(navItems)
  const visiblePolicy = filterAndSort(policyLinks)

  return (
    <Box component="footer"  py="xl">
      <SdContainer>
        <Grid style={{ '--grid-gutter': '48px' } as React.CSSProperties}>
          {/* Brand column */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Logo size="sm" />
              {description && (
                <SdText.Body c="slate.4" fz="sm">
                  {description}
                </SdText.Body>
              )}
            </Stack>
          </Grid.Col>

          {/* Navigation columns */}
          {visibleNav.length > 0 && (
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Grid style={{ '--grid-gutter': '24px' } as React.CSSProperties}>
                <FooterNavColumns items={visibleNav} />
              </Grid>
            </Grid.Col>
          )}
        </Grid>

        <Divider/>

        {/* Company info */}
        <FooterCompanyInfo company={company} />

        {/* Bottom bar */}
        <Group justify="space-between" wrap="wrap" gap="xs" mt="md">
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
                  fw={item.highlight ? 700 : 400}
                  c={item.highlight ? 'white' : 'slate.5'}
                  underline="never"
                >
                  {item.label}
                </Anchor>
              ))}
            </Group>
          )}
        </Group>
      </SdContainer>
    </Box>
  )
}
