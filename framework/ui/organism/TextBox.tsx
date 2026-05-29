import { MantineColor, Stack, StackProps, StyleProp, Text } from "@mantine/core";
import { ReactNode } from "react";
import { SdTitle } from "../atom/Title";
import { SdText } from "../atom/Text";

type TitleVariant = "Display" | "Section" | "Card" | "Sub";
type DescVariant = "Body" | "Sub";
type ColorVariant = StyleProp<MantineColor> | undefined;

interface TextBoxProps extends Omit<StackProps, "title"> {
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  titleVariant?: TitleVariant;
  maxDescWidth?: number;
}

function createTextBox(
  titleVariant: TitleVariant,
  defaultGap: StackProps["gap"] = "xs",
  descVariant: DescVariant = "Body",
  color: ColorVariant = undefined,
) {
  return function SdTextBox({
    label,
    title,
    description,
    titleVariant: variantOverride,
    maxDescWidth,
    children,
    ...stackProps
  }: TextBoxProps) {
    const variant = variantOverride ?? titleVariant;
    const TitleComponent = SdTitle[variant];
    const DescComponent = SdText[descVariant];

    return (
      <Stack gap={defaultGap} {...stackProps}>
        {label && <Text c={color}>{label}</Text>}
        <TitleComponent c={color}>{title}</TitleComponent>
        {description && (
          <DescComponent c={color} maw={maxDescWidth} mt={4}>
            {description}
          </DescComponent>
        )}
        {children}
      </Stack>
    );
  };
}

export const SdTextBox = {
  Hero:    createTextBox("Display", "lg", "Body", "slate.0"),
  Section: createTextBox("Section", "xs"),
  Card:    createTextBox("Card",    "xs", "Sub"),
  Sub:     createTextBox("Sub",     "xs", "Sub"),
};
