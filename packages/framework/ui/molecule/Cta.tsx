'use client'

import { Box, BoxProps, Center, Group, Stack } from "@mantine/core";
import { SdButton } from "../atom/Button";
import { SdText } from "../atom/Text";
import { SdTitle } from "../atom/Title";

interface SdCtaProps extends BoxProps {
  label?: string;
  title: string;
  description?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  onPrimary?: () => void;
  onSecondary?: () => void;
}

/** 다크 배경 — 섹션 마무리 CTA */
function Banner({
  label,
  title,
  description,
  primaryLabel = "시작하기",
  secondaryLabel,
  onPrimary,
  onSecondary,
  ...boxProps
}: SdCtaProps) {
  return (
    <Box
      bg="primary.7"
      py={{ base: "xl", md: 80 }}
      px={{ base: "md", md: "xl" }}
      {...boxProps}
    >
      <Center>
        <Stack gap="xl" align="center" maw={600}>
          <Stack gap="sm" align="center">
            {label && <SdText.Eyebrow c="primary.3">{label}</SdText.Eyebrow>}
            <SdTitle.Section c="white" ta="center">
              {title}
            </SdTitle.Section>
            {description && (
              <SdText.Body c="primary.2" ta="center">
                {description}
              </SdText.Body>
            )}
          </Stack>
          <Group gap="sm">
            <SdButton.White size="md" onClick={onPrimary}>
              {primaryLabel}
            </SdButton.White>
            {secondaryLabel && (
              <SdButton.Ghost
                size="md"
                c="primary.2"
                onClick={onSecondary}
              >
                {secondaryLabel}
              </SdButton.Ghost>
            )}
          </Group>
        </Stack>
      </Center>
    </Box>
  );
}

/** 라이트 배경 — 페이지 내 삽입 CTA */
function Subtle({
  label,
  title,
  description,
  primaryLabel = "시작하기",
  secondaryLabel,
  onPrimary,
  onSecondary,
  ...boxProps
}: SdCtaProps) {
  return (
    <Box
      bg="primary.0"
      py={{ base: "xl", md: 60 }}
      px={{ base: "md", md: "xl" }}
      style={{ borderRadius: "var(--mantine-radius-lg)" }}
      {...boxProps}
    >
      <Center>
        <Stack gap="lg" align="center" maw={560}>
          <Stack gap="sm" align="center">
            {label && <SdText.Eyebrow>{label}</SdText.Eyebrow>}
            <SdTitle.Section ta="center">{title}</SdTitle.Section>
            {description && (
              <SdText.Body ta="center">{description}</SdText.Body>
            )}
          </Stack>
          <Group gap="sm">
            <SdButton.Primary size="md" onClick={onPrimary}>
              {primaryLabel}
            </SdButton.Primary>
            {secondaryLabel && (
              <SdButton.Outline size="md" onClick={onSecondary}>
                {secondaryLabel}
              </SdButton.Outline>
            )}
          </Group>
        </Stack>
      </Center>
    </Box>
  );
}

/** 좌우 분할 — 텍스트(좌) + 버튼(우) 인라인 CTA */
function Inline({
  label,
  title,
  description,
  primaryLabel = "시작하기",
  secondaryLabel,
  onPrimary,
  onSecondary,
  ...boxProps
}: SdCtaProps) {
  return (
    <Box
      py={{ base: "xl", md: 48 }}
      px={{ base: "md", md: "xl" }}
      style={{
        borderTop: "1px solid var(--mantine-color-slate-2)",
        borderBottom: "1px solid var(--mantine-color-slate-2)",
      }}
      {...boxProps}
    >
      <Group justify="space-between" align="center" gap="xl">
        <Stack gap="xs" style={{ flex: 1 }}>
          {label && <SdText.Eyebrow>{label}</SdText.Eyebrow>}
          <SdTitle.Card>{title}</SdTitle.Card>
          {description && <SdText.Sub>{description}</SdText.Sub>}
        </Stack>
        <Group gap="sm" wrap="nowrap">
          <SdButton.Primary size="md" onClick={onPrimary}>
            {primaryLabel}
          </SdButton.Primary>
          {secondaryLabel && (
            <SdButton.Outline size="md" onClick={onSecondary}>
              {secondaryLabel}
            </SdButton.Outline>
          )}
        </Group>
      </Group>
    </Box>
  );
}

export const SdCta = {
  /** 다크 배경 전체폭 CTA */
  Banner,
  /** 라이트 박스형 CTA */
  Subtle,
  /** 좌우 분할 인라인 CTA */
  Inline,
};

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdCtaBanner = SdCta.Banner;
export const SdCtaSubtle = SdCta.Subtle;
export const SdCtaInline = SdCta.Inline;
