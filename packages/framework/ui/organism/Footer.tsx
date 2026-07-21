'use client'

import React from 'react'
import { ActionIcon, Box, Divider, Flex, Grid, Group, SimpleGrid, Stack } from '@mantine/core'
import {
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandX,
  IconBrandYoutube,
  IconWorld,
} from '@tabler/icons-react'
import { SdContainer } from '../atom/Container'
import { SdLink, SdText } from '../atom'
import { Logo } from '../atom/Logo'
import { CompanyInfo, NavItem, SocialItem, SocialPlatform } from '../../types'
import { filterAndSort } from '../../util/sort.util'

interface SdFooterProps {
  company: CompanyInfo
  navItems?: NavItem[]
  policyLinks?: NavItem[]
  description?: string
}

function FooterNavColumns({ items }: { items: NavItem[] }) {
  const topLevel = items.filter((item) => !item.parentId)
  const getChildren = (parentId: number) => items.filter((item) => item.parentId === parentId)
  const CHILD_THRESH =4
  return (
    <>
      {topLevel.map((group) => (
        <Grid.Col key={group.id} span={{ base: 6, sm: 4, md: 'auto' }}>
          <Stack gap="xs">
            <SdText.Sub>{group.label}</SdText.Sub>
            {getChildren(group.id).map((link,id) => {
              if (id >= CHILD_THRESH ) return
              return <SdLink.Hint key={link.id} href={link.href}>
                {link.label}
              </SdLink.Hint>
          })}
          </Stack>
        </Grid.Col>
      ))}
    </>
  )
}

const SOCIAL_ICONS: Record<SocialPlatform, typeof IconWorld> = {
  x: IconBrandX,
  youtube: IconBrandYoutube,
  instagram: IconBrandInstagram,
  facebook: IconBrandFacebook,
  linkedin: IconBrandLinkedin,
  github: IconBrandGithub,
  blog: IconWorld,
}

function FooterSocials({ items }: { items: SocialItem[] }) {
  return (
    <Group gap={0} wrap="nowrap">
      {items.map((item) => {
        const Icon = SOCIAL_ICONS[item.platform] ?? IconWorld
        return (
          <ActionIcon
            key={item.url}
            component="a"
            href={item.url}
            target="_blank"
            rel="noreferrer"
            size="lg"
            color="gray"
            variant="subtle"
            aria-label={item.label ?? item.platform}
          >
            <Icon size={18} stroke={1.5} />
          </ActionIcon>
        )
      })}
    </Group>
  )
}

/** 라벨 + 값 한 줄. 값은 문자열이거나 링크 노드. */
function InfoCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Group gap={6} wrap="nowrap" align="baseline">
      <SdText.Sub c="slate.4" style={{ whiteSpace: 'nowrap' }}>
        {label}
      </SdText.Sub>
      {typeof children === 'string' ? <SdText.Sub>{children}</SdText.Sub> : children}
    </Group>
  )
}

function FooterCompanyInfo({ company }: { company: CompanyInfo }) {
  const sortedAddresses = [...company.addresses].sort((a, b) => a.order - b.order)

  // 좁을 땐 1열, 태블릿에선 2열, md부터는 브랜드 컬럼이 좁아지므로 다시 1열.
  // verticalSpacing으로 행 간격만 따로 좁힌다.
  return (
    <SimpleGrid cols={{ base: 2, sm: 2, md: 1 }} spacing="md" verticalSpacing={0}>
      <InfoCell label="상호">{company.name}</InfoCell>
      <InfoCell label="사업자등록번호">{company.registrationNumber}</InfoCell>
      {sortedAddresses.map((addr) => (
        <InfoCell key={addr.label} label={addr.label}>
          {addr.address}
        </InfoCell>
      ))}
      <InfoCell label="Tel">
        <SdLink.Sub href={`tel:${company.tel}`}>{company.tel}</SdLink.Sub>
      </InfoCell>
      {company.fax && <InfoCell label="Fax">{company.fax}</InfoCell>}
      <InfoCell label="Email">
        <SdLink.Sub href={`mailto:${company.email}`}>{company.email}</SdLink.Sub>
      </InfoCell>
    </SimpleGrid>
  )
}

export function SdFooter({ company, navItems, policyLinks, description }: SdFooterProps) {
  const visibleNav = filterAndSort(navItems)
  const visiblePolicy = filterAndSort(policyLinks)

  return (
    <Box component="footer">
      <SdContainer>
        <Stack>
          <Logo size="sm" />
          {description && <SdText.Sub>{description}</SdText.Sub>}
          {/* 넓을 땐 가로 2단(정보 1 : 네비 2), 모바일에선 세로로 쌓인다 */}
          <Flex direction={{ base: 'column', md: 'row' }} gap={48} align="flex-start">
            <Box flex={{ base: '0 0 auto', md: '1 1 0' }} w={{ base: '100%', md: 'auto' }}>
              <FooterCompanyInfo company={company} />
            </Box>

            {visibleNav.length > 0 && (
              <Box flex={{ base: '0 0 auto', md: '2 1 0' }} w={{ base: '100%', md: 'auto' }}>
                <Grid style={{ '--grid-gutter': '24px' } as React.CSSProperties}>
                  <FooterNavColumns items={visibleNav} />
                </Grid>
              </Box>
            )}
          </Flex>

          <Divider />

          {/* Bottom bar */}
          <Group justify="space-between" wrap="wrap" gap="xs">
            <SdText.Sub>
              © {company.copyrightYear} {company.name}. All rights reserved.
            </SdText.Sub>
            <Group gap="lg" wrap="wrap">
              {visiblePolicy.length > 0 && (
                <Group gap="lg">
                  {visiblePolicy.map((item) => {
                    const Link = item.highlight ? SdLink.Strong : SdLink.Sub
                    return (
                      <Link key={item.id} href={item.href}>
                        {item.label}
                      </Link>
                    )
                  })}
                </Group>
              )}
              {company.socials && company.socials.length > 0 && (
                <FooterSocials items={company.socials} />
              )}
            </Group>
          </Group>
        </Stack>
      </SdContainer>
    </Box>
  )
}
