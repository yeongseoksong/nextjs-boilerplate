import { Table, TableProps } from '@mantine/core'
import { type ComponentPropsWithoutRef } from 'react'
import { SdText } from './Text'

function createTable(defaults: TableProps) {
  function SdTableRoot(props: TableProps) {
    return <Table {...defaults} {...props} />
  }
  SdTableRoot.Thead = Table.Thead
  SdTableRoot.Tbody = Table.Tbody
  SdTableRoot.Tr = Table.Tr
  SdTableRoot.Th = Table.Th
  SdTableRoot.Td = Table.Td
  SdTableRoot.Caption = Table.Caption
  return SdTableRoot
}

const base: TableProps = {
  striped: true,
  highlightOnHover: true,
  withTableBorder: true,
  withColumnBorders: false,
  verticalSpacing: 'sm',
  horizontalSpacing: 'md',
}

function SpecTh({ children, ...props }: ComponentPropsWithoutRef<'th'>) {
  return (
    <Table.Th {...props}>
      <SdText.Strong c="white">{children}</SdText.Strong>
    </Table.Th>
  )
}

function SpecTd({ children, ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <Table.Td {...props}>
      <SdText.Body>{children}</SdText.Body>
    </Table.Td>
  )
}

/** 스펙 강조 테이블: primary 헤더 + SdText.Strong/Body 자동 적용 */
const Spec = createTable({
  ...base,
  withColumnBorders: true,
  verticalSpacing: 'md',
  horizontalSpacing: 'lg',
  styles: {
    table: { borderRadius: 'var(--mantine-radius-md)', overflow: 'hidden' },
    th: {
      background: 'var(--mantine-color-primary-6)',
      letterSpacing: '0.01em',
    },
  },
})

Spec.Th = SpecTh as typeof Table.Th
Spec.Td = SpecTd as typeof Table.Td

export const SdTable = Object.assign(createTable(base), { Spec })

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdTable.Spec 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdTableSpec = Spec
