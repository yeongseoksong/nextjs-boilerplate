import { Box, Card, Group, Stack, ThemeIcon } from "@mantine/core";
import { IconArrowDown, IconArrowRight } from "@tabler/icons-react";
import { StepItem } from "../../types";
import { SdNumberIcon } from "../atom/NumberIcon";
import { SdText } from "../atom/Text";

import { SdTextBox } from "./TextBox";
import { Fragment } from "react/jsx-runtime";

interface SdStepsProps {
  items: StepItem[];
}
/* ─────────────────────────────────────────
   Design 1 · Bubble
   primary 원 + 연결선 + 콘텐츠
───────────────────────────────────────── */
function BubbleStep({ item, index, isLast }: { item: StepItem; index: number; isLast: boolean }) {
  return (
    <Group align="flex-start" gap="lg" wrap="nowrap">
      <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <SdNumberIcon value={String(index + 1).padStart(2, '0')} />
        {!isLast && (
          <Box style={{ width: 2, flex: 1, minHeight: 32, marginTop: 8, background: 'var(--mantine-color-primary-2)' }} />
        )}
      </Box>
      <SdTextBox.Card title={item.title} description={item.description} pb={!isLast ? "xl" : 0} pt={4} />
    </Group>
  );
}

function Bubble({ items }: SdStepsProps) {
  return (
    <Box>
      {items.map((item, i) => (
        <BubbleStep key={i} item={item} index={i} isLast={i === items.length - 1} />
      ))}
    </Box>
  );
}

/* ─────────────────────────────────────────
   Design 2 · Card
   primary 헤더 밴드 + 하단 화살표로 방향 강조
───────────────────────────────────────── */
function CardStep({ item, index }: { item: StepItem; index: number }) {
  return (
    <Card withBorder radius="md" p={0} style={{ height: '100%', overflow: 'hidden' }}>
      <Box
        py="lg"
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: 'var(--mantine-color-primary-0)',
        }}
      >
        <SdText.Eyebrow>STEP {String(index + 1).padStart(2, '0')}</SdText.Eyebrow>
      </Box>
      <Box p="lg" style={{ textAlign: 'center' }}>
        <SdTextBox.Card title={item.title} description={item.description} />
      </Box>
    </Card>
  );
}

function CardArrow({ direction }: { direction: 'right' | 'down' }) {
  return (
    <ThemeIcon size={36} radius="xl" variant="light" color="primary">
      {direction === 'right'
        ? <IconArrowRight size={20} stroke={2.5} />
        : <IconArrowDown size={20} stroke={2.5} />
      }
    </ThemeIcon>
  );
}

function CardVariant({ items }: SdStepsProps) {
  return (
    <>
      {/* 모바일: 세로 스택 */}
      <Stack gap="sm" hiddenFrom="sm">
        {items.map((item, i) => (
          <Fragment key={i}>
            <CardStep item={item} index={i} />
            {i < items.length - 1 && (
              <Box style={{ display: 'flex', justifyContent: 'center' }}>
                <CardArrow direction="down" />
              </Box>
            )}
          </Fragment>
        ))}
      </Stack>

      {/* 데스크톱: 가로 나열 */}
      <Group wrap="nowrap" align="stretch" gap={0} visibleFrom="sm">
        {items.map((item, i) => (
          <Fragment key={i}>
            <Box style={{ flex: 1, minWidth: 0 }}>
              <CardStep item={item} index={i} />
            </Box>
            {i < items.length - 1 && (
              <Box style={{ display: 'flex', alignItems: 'center', padding: '0 8px' }}>
                <CardArrow direction="right" />
              </Box>
            )}
          </Fragment>
        ))}
      </Group>
    </>
  );
}

/* ─────────────────────────────────────────
   Design 3 · Strip
   primary 좌측 보더 + eyebrow 번호 + 콘텐츠
───────────────────────────────────────── */
function StripStep({ item, index }: { item: StepItem; index: number }) {
  return (
    <Box pl="md" style={{ borderLeft: '3px solid var(--mantine-color-primary-6)' }}>
      <Stack gap={4}>
        <SdText.Eyebrow>STEP {String(index + 1).padStart(2, '0')}</SdText.Eyebrow>
        <SdTextBox.Card title={item.title} description={item.description} />
      </Stack>
    </Box>
  );
}

function Strip({ items }: SdStepsProps) {
  return (
    <Stack gap="xl">
      {items.map((item, i) => (
        <StripStep key={i} item={item} index={i} />
      ))}
    </Stack>
  );
}

/* ─────────────────────────────────────────
   Export
───────────────────────────────────────── */
export const SdSteps = { Bubble, Card: CardVariant, Strip };

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdStepsBubble = SdSteps.Bubble;
export const SdStepsCard = SdSteps.Card;
export const SdStepsStrip = SdSteps.Strip;
