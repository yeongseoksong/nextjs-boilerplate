import {
  Avatar,
  Box,
  BoxProps,
  Card,
  Group,
  Rating,
  SimpleGrid,
  SimpleGridProps,
  Stack,
} from "@mantine/core";
import { TestimonialItem } from "../../types";
import { SdText } from "../atom/Text";
import { SdTitle } from "../atom/Title";

interface SdTestimonialProps extends BoxProps {
  item: TestimonialItem;
}

function AuthorRow({ item }: { item: TestimonialItem }) {
  return (
    <Group gap="sm" wrap="nowrap">
      {item.avatar && (
        <Avatar src={item.avatar} size="md" radius="xl" />
      )}
      {!item.avatar && (
        <Avatar size="md" radius="xl" color="primary">
          {item.name.charAt(0)}
        </Avatar>
      )}
      <Stack gap={0}>
        <SdText.Strong fz="sm">{item.name}</SdText.Strong>
        <SdText.Sub>
          {item.role}
          {item.company ? ` · ${item.company}` : ""}
        </SdText.Sub>
      </Stack>
    </Group>
  );
}

function CardTestimonial({ item, ...boxProps }: SdTestimonialProps) {
  return (
    <Card h="100%" {...boxProps}>
      <Stack gap="md" h="100%">
        {item.rating && (
          <Rating value={item.rating} readOnly size="sm" color="primary" />
        )}
        <Stack gap="xs" style={{ flex: 1 }}>
          <SdTitle.Display c="primary.6" lh={0.8} aria-hidden>
            &ldquo;
          </SdTitle.Display>
          {item.lines.map((line, i) => (
            <SdText.Body key={i}>{line}</SdText.Body>
          ))}
        </Stack>
        <AuthorRow item={item} />
      </Stack>
    </Card>
  );
}

function Strip({ item, ...boxProps }: SdTestimonialProps) {
  return (
    <Box {...boxProps}>
      <Stack gap="md">
        {item.rating && (
          <Rating value={item.rating} readOnly size="sm" color="primary" />
        )}
        <Group gap={4} align="flex-start">
          <SdTitle.Display c="primary.6" lh={0.8} aria-hidden>
            &ldquo;
          </SdTitle.Display>
          <Stack gap="xs" style={{ flex: 1 }}>
            {item.lines.map((line, i) => (
              <SdText.Body key={i}>{line}</SdText.Body>
            ))}
          </Stack>
        </Group>
        <AuthorRow item={item} />
      </Stack>
    </Box>
  );
}

interface SdTestimonialGridProps {
  items: TestimonialItem[];
  cols?: SimpleGridProps["cols"];
}

function Grid({ items, cols = { base: 1, sm: 2, md: 3 } }: SdTestimonialGridProps) {
  return (
    <SimpleGrid cols={cols} spacing="xl" style={{ alignItems: "stretch" }}>
      {items.map((item, i) => (
        <CardTestimonial key={i} item={item} />
      ))}
    </SimpleGrid>
  );
}

export const SdTestimonial = {
  /** 카드형 — 그리드 배치용 */
  Card: CardTestimonial,
  /** 스트립형 — 단일 강조 후기 */
  Strip,
  /** 카드 그리드 — 여러 후기 목록 */
  Grid,
};
