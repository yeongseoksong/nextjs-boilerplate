'use client'

import { Anchor, Group, Stack } from '@mantine/core'
import { CompanyInfo, NavItem } from '../../../types'
import { SdText } from '../../atom'
import { Logo } from '../../atom/Logo'

interface FooterBrandProps {
  company: CompanyInfo
  policyLinks?: NavItem[]
}

export function FooterBrand({ company, policyLinks }: FooterBrandProps) {
  return (
    <Stack gap="xs">
      <Logo size="sm" />

      {policyLinks && policyLinks.length > 0 && (
        <Group gap="md" wrap="wrap">
          {policyLinks.map((item) => (
            <Anchor key={item.id} href={item.href} fz="xs" fw={item.highlight ? 700 : undefined}>
              {item.label}
            </Anchor>
          ))}
        </Group>
      )}

      <Stack gap={4}>
        <SdText.Sub>
          {company.name} &nbsp;·&nbsp; 사업자등록번호 {company.registrationNumber}
        </SdText.Sub>
        <SdText.Sub>
          © {company.copyrightYear} {company.name}. All rights reserved.
        </SdText.Sub>
      </Stack>
    </Stack>
  )
}
