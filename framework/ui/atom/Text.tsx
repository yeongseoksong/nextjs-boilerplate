import { Text as MantineText, TextProps } from "@mantine/core";
import { ReactNode } from "react";

type Props = TextProps & { children?: ReactNode };

function createText(defaults: TextProps) {
  return function SdText({ children, ...props }: Props) {
    return (
      <MantineText {...defaults} {...props}>
        {children}
      </MantineText>
    );
  };
}

export const SdText = {
  Strong: createText({ fw: 700, c: "primary.6", fz: "md", style: { letterSpacing: "-0.04em" } }),
  Body:   createText({ fw: 400, c: "primary.5",  fz: "md", lh: 1.7 }),
  Sub:    createText({ fw: 400, c: "primary.4",  fz: "sm", lh: 1.6 }),
};
