import { BoxProps, Stack } from "@mantine/core";
import { SdContainer } from "../atom/Container";
import { ReactNode } from "react";
import { StepItem } from "../../types";
import { SdSteps } from "../molecule/Steps";
import { SdTextBox } from "../molecule/TextBox";

interface SdStepsSectionProps extends Omit<BoxProps, 'title'> {
  label?: string;
  title?: ReactNode;
  description?: ReactNode;
  items: StepItem[];
}

export function SdStepsSection({
  label,
  title,
  description,
  items,
  py = 0,
  ...boxProps
}: SdStepsSectionProps) {
  return (
    <SdContainer py={py} {...boxProps}>
      <Stack gap="xl">
        {(label || title || description) && (
          <SdTextBox.Section label={label} title={title} description={description} />
        )}
        <SdSteps.Bubble items={items} />
      </Stack>
    </SdContainer>
  );
}
