import { BoxProps, Center, Stack } from "@mantine/core";
import { ReactNode } from "react";
import { TimelineEvent } from "../../types";
import { SdTimeline } from "../molecule/Timeline";
import { SdTextBox } from "../molecule/TextBox";

interface SdTimelineSectionProps extends BoxProps {
  label?: string;
  title: ReactNode;
  description?: ReactNode;
  items: TimelineEvent[];
}

export function SdTimelineSection({
  label,
  title,
  description,
  items,
  py = 0,
  ...boxProps
}: SdTimelineSectionProps) {
  return (
    <Center> 
      <Stack py={py} gap="md" {...boxProps}>
        <SdTextBox.Section
          label={label}
          title={title}
          description={description}
        />
        <Center> 
          <SdTimeline items={items} />
        </Center>
      </Stack>
    </Center>

  );
}
