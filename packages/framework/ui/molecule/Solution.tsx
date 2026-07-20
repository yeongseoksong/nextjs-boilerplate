'use client'

import { useState } from "react";
import {
  Button,
  Divider,
  Group,
  SimpleGridProps,
  Stack,
  ThemeIcon,
} from "@mantine/core";
import Link from "next/link";
import { SolutionItem } from "../../types";
import { SdBadge } from "../atom/Badge";
import { SdButton } from "../atom/Button";
import { SdTabs } from "../atom/Tabs";
import { SdText } from "../atom/Text";
import { SdTitle } from "../atom/Title";
import { SdSolutionCard } from "./SolutionCard";

interface SdSolutionFilteredProps {
  items: SolutionItem[];
  allLabel?: string;
  cols?: SimpleGridProps["cols"];
  onSelect?: (item: SolutionItem) => void;
}

function Filtered({ items, allLabel = "전체", cols, onSelect }: SdSolutionFilteredProps) {
  const categories = ["all", ...Array.from(new Set(items.map((i) => i.category)))];
  const [active, setActive] = useState("all");

  const filtered = active === "all" ? items : items.filter((i) => i.category === active);

  return (
    <Stack gap="xl">
      <SdTabs.Pills value={active} onChange={(v) => setActive(v ?? "all")}>
        <SdTabs.Pills.List>
          {categories.map((cat) => (
            <SdTabs.Pills.Tab key={cat} value={cat}>
              {cat === "all" ? allLabel : cat}
            </SdTabs.Pills.Tab>
          ))}
        </SdTabs.Pills.List>
      </SdTabs.Pills>
      <SdSolutionCard.Grid items={filtered} cols={cols} onSelect={onSelect} />
    </Stack>
  );
}
interface SdSolutionListProps {
  items: SolutionItem[];
  onSelect?: (item: SolutionItem) => void;
}

function List({ items, onSelect }: SdSolutionListProps) {
  return (
    <Stack gap={0}>
      {items.map((item, i) => (
        <div key={i}>
          {i > 0 && <Divider />}
          <Group align="flex-start" py="lg" gap="lg">
            {item.icon && (
              <ThemeIcon variant="light" color="primary" size="xl" radius="md">
                {item.icon}
              </ThemeIcon>
            )}
            <Stack gap="xs" style={{ flex: 1 }}>
              <SdBadge.Primary>{item.category}</SdBadge.Primary>
              <SdTitle.Card>{item.title}</SdTitle.Card>
              <SdText.Body>{item.description}</SdText.Body>
              {item.href ? (
                <Button
                  variant="subtle"
                  color="slate"
                  component={Link}
                  href={item.href}
                  style={{ alignSelf: "flex-start", paddingInline: 0 }}
                >
                  {item.ctaLabel ?? "자세히 보기"} →
                </Button>
              ) : (
                <SdButton.Ghost
                  onClick={() => onSelect?.(item)}
                  style={{ alignSelf: "flex-start" }}
                >
                  {item.ctaLabel ?? "자세히 보기"} →
                </SdButton.Ghost>
              )}
            </Stack>
          </Group>
        </div>
      ))}
    </Stack>
  );
}

export const SdSolution = {
  /** 카테고리 탭 필터 + 카드 그리드 (솔루션 페이지 메인) */
  Filtered,
  /** 수평 리스트 레이아웃 (상세 탐색용) */
  List,
};

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdSolutionFiltered = SdSolution.Filtered;
export const SdSolutionList = SdSolution.List;
