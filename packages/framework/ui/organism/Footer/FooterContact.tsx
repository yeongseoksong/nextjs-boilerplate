'use client'

import { Anchor, Group } from '@mantine/core'
import { CompanyInfo } from '../../../types'
import { SdText } from '../../atom'

interface FooterContactProps {
  company: CompanyInfo
}

export function FooterContact({ company }: FooterContactProps) {
  return (
    <Group gap="lg" wrap="wrap">
      <SdText.Sub c="slate.5">{company.name}</SdText.Sub>
      <SdText.Sub c="slate.5">사업자등록번호 {company.registrationNumber}</SdText.Sub>
      {company.addresses.map((addr) => (
        <SdText.Sub key={addr.label} c="slate.5">{addr.address}</SdText.Sub>
      ))}
      <Anchor href={`tel:${company.tel}`} fz="xs" c="slate.5" underline="never">
        Tel {company.tel}
      </Anchor>
      {company.fax && <SdText.Sub c="slate.5">Fax {company.fax}</SdText.Sub>}
      <Anchor href={`mailto:${company.email}`} fz="xs" c="slate.5" underline="never">
        {company.email}
      </Anchor>
    </Group>
  )
}
