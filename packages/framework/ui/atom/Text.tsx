import { Text as MantineText, TextProps } from "@mantine/core";
import { ReactNode } from "react";
import { t } from "../../util/text.util";

type Props = TextProps & { children?: ReactNode };

function createText(defaults: TextProps) {
  return function SdText({ children, ...props }: Props) {
      const resolved = typeof children === "string" ? t(children) : children;
    
    return (
      <MantineText {...defaults} {...props}>
        {resolved}
      </MantineText>
    )
  };
}

export const SdText = {
  Strong:  createText({ fw: 700, c: "slate.9", fz: "md", style: { letterSpacing: "-0.04em" } }),
  Body:    createText({ fw: 400, c: "slate.7", fz: "md", lh: 1.7 }),
  Sub:     createText({ fw: 400, c: "slate.5", fz: "xs", lh: 1.6 }),
  Eyebrow: createText({ fw: 700, c: "primary.6", fz: "xs", style: { letterSpacing: "0.12em", textTransform: "uppercase" } }),
  Error:   createText({ fw: 400, c: "red.6",   fz: "sm" }),
  Hint:    createText({ fw: 400, c: "slate.4", fz: "xs", lh: 1.5 }),
  Numeric: createText({ fw: 700, c: "slate.8", fz: "md", style: { fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" } }),
};
