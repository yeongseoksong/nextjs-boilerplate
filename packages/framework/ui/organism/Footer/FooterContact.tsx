'use client'

import { Anchor, Stack } from '@mantine/core'
import { CompanyInfo } from '../../../types'
import { SdText } from '../../atom'

interface FooterContactProps {
  company: CompanyInfo
}

export function FooterContact({ company }: FooterContactProps) {
  return (
    <Stack gap={4}>
      {company.addresses.map((addr) => (
        <SdText.Sub key={addr.label}>
          [{addr.label}] {addr.address}
        </SdText.Sub>
      ))}
      <Anchor href={`tel:${company.tel}`} fz="sm">
        Tel {company.tel}
      </Anchor>
      {company.fax && <SdText.Sub>Fax {company.fax}</SdText.Sub>}
      <Anchor href={`mailto:${company.email}`} fz="sm">
        {company.email}
      </Anchor>
    </Stack>
  )
}
