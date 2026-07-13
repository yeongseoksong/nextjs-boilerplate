import { ThemeIcon, type ThemeIconProps } from "@mantine/core";
import { SdText } from "./Text";

interface SdNumberIconProps extends Omit<ThemeIconProps, "children"> {
  value: string;
}

export function SdNumberIcon({ value, size = 48, radius = "xl", color = "primary", ...props }: SdNumberIconProps) {
  return (
    <ThemeIcon size={size} radius={radius} color={color} {...props}>
      <SdText.Strong c="white">{value}</SdText.Strong>
    </ThemeIcon>
  );
}
