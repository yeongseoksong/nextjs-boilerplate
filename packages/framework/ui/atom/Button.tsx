import { Button as MantineButton, ButtonProps } from "@mantine/core";
import { IconTrash, IconX } from "@tabler/icons-react";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = ButtonProps & ComponentPropsWithoutRef<"button"> & { children?: ReactNode };

function createButton(defaults: ButtonProps) {
  return function SdButton({ children, ...props }: Props) {
    return (
      <MantineButton {...defaults} {...props}>
        {children}
      </MantineButton>
    );
  };
}

export const SdButton = {
  /** 주요 액션 — filled primary */
  Primary: createButton({ color: "primary" }),
  /** 보조 액션 — outline */
  Outline: createButton({ variant: "outline", color: "primary" }),
  /** 텍스트 수준 — subtle */
  Ghost:   createButton({ variant: "subtle", color: "slate" }),
  /** 다크 배경 위 — white */
  White:   createButton({ variant: "white" }),
  /** 삭제 — filled red + 휴지통 아이콘 */
  Delete:  createButton({ color: "red", leftSection: <IconTrash size={16} /> }),
  /** 취소 — outline slate + X 아이콘 */
  Cancel:  createButton({ variant: "outline", color: "slate", leftSection: <IconX size={16} /> }),
};
