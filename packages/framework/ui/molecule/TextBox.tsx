import { MantineColor, Stack, StackProps, StyleProp, Text } from "@mantine/core";
import { ReactNode } from "react";
import { SdTitle } from "../atom/Title";
import { SdText } from "../atom/Text";

type TitleVariant = "Display" | "Section" | "Card" | "Sub";
type DescVariant = "Body" | "Sub" | "Strong" | "Eyebrow" | "Numeric";
type ColorVariant = StyleProp<MantineColor> | undefined;

interface TextBoxProps extends Omit<StackProps, "title"|"color"> {
  label?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  titleVariant?: TitleVariant;
  maxDescWidth?: number;
  color?: ColorVariant;
}

function createTextBox(
  titleVariant: TitleVariant,
  defaultGap: StackProps["gap"] = "xs",
  descVariant: DescVariant = "Body",
  color_: ColorVariant = undefined,
) {


  return function SdTextBox({
    label,
    title,
    description,
    titleVariant: variantOverride,
    maxDescWidth,
    children,
    color,
    ...stackProps
  }: TextBoxProps) {

    /**
     * 우선순위 
     * 1. SdTextBox 색상
     * 2. SdTextBox 객체 에 정의된 색상 
     *  */ 
    const colorRes = color_? color_: color;

    const variant = variantOverride ?? titleVariant;
    const TitleComponent = SdTitle[variant];
    const DescComponent = SdText[descVariant];
    return (
      <Stack gap={defaultGap} {...stackProps}>
        {label && <SdText.Eyebrow>{label}</SdText.Eyebrow>}
        <TitleComponent c={colorRes}>{title}</TitleComponent>
        {description && (
          <DescComponent c={colorRes} maw={maxDescWidth} mt={4}>
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
