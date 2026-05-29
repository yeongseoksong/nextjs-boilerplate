import { Button as MantineButton, ButtonProps } from "@mantine/core";
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
  /** 주요 액션 — filled primary + glow */
  Primary: createButton({ color: "primary" }),
  /** 보조 액션 — outline */
  Outline: createButton({ variant: "outline", color: "primary" }),
  /** 텍스트 수준 — subtle */
  Ghost:   createButton({ variant: "subtle", color: "slate" }),
  /** 다크 배경 위 — white */
  White:   createButton({ variant: "white" }),
};
