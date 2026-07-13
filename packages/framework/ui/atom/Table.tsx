import { Table, TableProps } from "@mantine/core";
import { type ComponentPropsWithoutRef } from "react";
import { SdText } from "./Text";

function createTable(defaults: TableProps) {
  function SdTableRoot(props: TableProps) {
    return <Table {...defaults} {...props} />;
  }
  SdTableRoot.Thead   = Table.Thead;
  SdTableRoot.Tbody   = Table.Tbody;
  SdTableRoot.Tr      = Table.Tr;
  SdTableRoot.Th      = Table.Th;
  SdTableRoot.Td      = Table.Td;
  SdTableRoot.Caption = Table.Caption;
  return SdTableRoot;
}

const base: TableProps = {
  striped: true,
  highlightOnHover: true,
  withTableBorder: true,
  withColumnBorders: false,
  verticalSpacing: 'sm',
  horizontalSpacing: 'md',
};

function SpecTh({ children, ...props }: ComponentPropsWithoutRef<'th'>) {
  return (
    <Table.Th {...props}>
      <SdText.Strong c="white">{children}</SdText.Strong>
    </Table.Th>
  );
}

function SpecTd({ children, ...props }: ComponentPropsWithoutRef<'td'>) {
  return (
    <Table.Td {...props}>
      <SdText.Body>{children}</SdText.Body>
    </Table.Td>
  );
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
});

Spec.Th = SpecTh as typeof Table.Th;
Spec.Td = SpecTd as typeof Table.Td;

export const SdTable = Object.assign(createTable(base), { Spec });
