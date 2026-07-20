'use client'

import { Accordion, Box, BoxProps, Stack } from "@mantine/core";
import { FaqItem } from "../../types";
import { SdText } from "../atom/Text";
import { SdTitle } from "../atom/Title";

interface SdFaqProps extends BoxProps {
  items: FaqItem[];
}

function Default({ items, ...boxProps }: SdFaqProps) {
  return (
    <Box {...boxProps}>
      <Accordion variant="separated" radius="md">
        {items.map((item, i) => (
          <Accordion.Item key={i} value={String(i)}>
            <Accordion.Control>
              <SdText.Strong fz="sm">{item.question}</SdText.Strong>
            </Accordion.Control>
            <Accordion.Panel>
              <SdText.Body fz="sm">{item.answer}</SdText.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
}

function Filled({ items, ...boxProps }: SdFaqProps) {
  return (
    <Box {...boxProps}>
      <Accordion variant="filled" radius="md">
        {items.map((item, i) => (
          <Accordion.Item key={i} value={String(i)}>
            <Accordion.Control>
              <SdText.Strong fz="sm">{item.question}</SdText.Strong>
            </Accordion.Control>
            <Accordion.Panel>
              <SdText.Body fz="sm">{item.answer}</SdText.Body>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
}

interface SdFaqWithHeaderProps extends SdFaqProps {
  label?: string;
  title: string;
  description?: string;
}

function WithHeader({ label, title, description, items, ...boxProps }: SdFaqWithHeaderProps) {
  return (
    <Stack gap="xl" {...(boxProps as Parameters<typeof Stack>[0])}>
      <Stack gap="xs">
        {label && <SdText.Eyebrow>{label}</SdText.Eyebrow>}
        <SdTitle.Section>{title}</SdTitle.Section>
        {description && <SdText.Body>{description}</SdText.Body>}
      </Stack>
      <Default items={items} />
    </Stack>
  );
}

export const SdFaq = {
  /** separated 스타일 아코디언 */
  Default,
  /** filled 배경 아코디언 */
  Filled,
  /** 헤더 + 아코디언 조합 */
  WithHeader,
};

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdFaqDefault = SdFaq.Default;
export const SdFaqFilled = SdFaq.Filled;
export const SdFaqWithHeader = SdFaq.WithHeader;
