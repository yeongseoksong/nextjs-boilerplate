'use client'

import {
  Button,
  Card,
  CardProps,
  SimpleGrid,
  SimpleGridProps,
  Stack,
} from "@mantine/core";
import Link from "next/link";
import { SolutionItem } from "../../types";
import { SdBadge } from "../atom/Badge";
import { SdButton } from "../atom/Button";
import { SdText } from "../atom/Text";
import { SdTitle } from "../atom/Title";

interface SdSolutionCardItemProps extends Omit<CardProps, "children"> {
  item: SolutionItem;
  onSelect?: (item: SolutionItem) => void;
}

function SolutionCardItem({ item, onSelect, ...cardProps }: SdSolutionCardItemProps) {
  return (
    <Card withBorder {...cardProps}>
      <Stack gap="md">
        {item.icon}
        <SdBadge.Primary>{item.category}</SdBadge.Primary>
        <SdTitle.Card>{item.title}</SdTitle.Card>
        <SdText.Body>{item.description}</SdText.Body>
        {item.href ? (
          <Button variant="subtle" color="slate" component={Link} href={item.href}>
            {item.ctaLabel ?? "자세히 보기"} →
          </Button>
        ) : (
          <SdButton.Ghost onClick={() => onSelect?.(item)}>
            {item.ctaLabel ?? "자세히 보기"} →
          </SdButton.Ghost>
        )}
      </Stack>
    </Card>
  );
}

interface SdSolutionGridProps {
  items: SolutionItem[];
  cols?: SimpleGridProps["cols"];
  onSelect?: (item: SolutionItem) => void;
}

function Grid({ items, cols = { base: 1, sm: 2, md: 3 }, onSelect }: SdSolutionGridProps) {
  return (
    <SimpleGrid cols={cols} spacing="xl">
      {items.map((item, i) => (
        <SolutionCardItem key={i} item={item} onSelect={onSelect} />
      ))}
    </SimpleGrid>
  );
}

export const SdSolutionCard = {
  /** 단일 compact 카드 */
  Item: SolutionCardItem,
  /** 카드 그리드 */
  Grid,
};
