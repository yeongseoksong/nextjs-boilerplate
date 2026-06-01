import { Table, TableProps } from "@mantine/core";

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

export const SdTable = createTable({
  striped: true,
  highlightOnHover: true,
  withTableBorder: true,
  withColumnBorders: false,
  verticalSpacing: "sm",
  horizontalSpacing: "md",
  fz: "sm",
});
