"use client";

import { Center, Group, Stack, Text } from "@mantine/core";
import { SdButton } from "../atom/Button";
import { SdContainer } from "../atom/Container";
import { SdText } from "../atom/Text";
import { SdTitle } from "../atom/Title";

/* ─────────────────────────────────────────────
   공통: 대형 상태 코드 배경 숫자
───────────────────────────────────────────── */
function StatusCode({ code }: { code: string }) {
  return (
    <Text
      fz={160}
      fw={900}
      c="slate.1"
      lh={1}
      style={{ userSelect: "none", letterSpacing: "-0.04em" }}
      aria-hidden
    >
      {code}
    </Text>
  );
}

/* ─────────────────────────────────────────────
   SdErrorView.Page — app/error.tsx 전용
   Next.js error boundary props + 재시도/홈 이동
───────────────────────────────────────────── */
interface SdErrorPageProps {
  error: Error & { digest?: string };
  onReset: () => void;
  onHome?: () => void;
}

function Page({ error, onReset, onHome }: SdErrorPageProps) {
  return (
    <Center mih="60vh">
      <SdContainer>
        <Stack align="center" gap="lg" ta="center">
          <StatusCode code="500" />
          <Stack gap="sm" align="center">
            <SdTitle.Section>서버에서 오류가 발생했습니다</SdTitle.Section>
            <SdText.Body maw={480}>
              { "예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."}
            </SdText.Body>
            {/* {error.digest && ( */}
              {/* <SdText.Sub>오류 코드: {error.digest}</SdText.Sub> */}
            {/* )} */}
          </Stack>
          <Group gap="sm" justify="center">
            <SdButton.Primary onClick={onReset}>다시 시도</SdButton.Primary>
            {onHome && (
              <SdButton.Ghost onClick={onHome}>홈으로</SdButton.Ghost>
            )}
          </Group>
        </Stack>
      </SdContainer>
    </Center>
  );
}

/* ─────────────────────────────────────────────
   SdErrorView.NotFound — app/not-found.tsx 전용
───────────────────────────────────────────── */
interface SdErrorNotFoundProps {
  title?: string;
  description?: string;
  onHome?: () => void;
  onBack?: () => void;
}

function NotFound({
  title = "페이지를 찾을 수 없습니다",
  description = "요청하신 페이지가 존재하지 않거나 이동되었습니다.",
  onHome = () => { window.location.href = "/"; },
  onBack = () => window.history.back(),
}: SdErrorNotFoundProps) {
  return (
    <Center mih="60vh">
      <SdContainer>
        <Stack align="center" gap="lg" ta="center">
          <StatusCode code="404" />
          <Stack gap="sm" align="center">
            <SdTitle.Section>{title}</SdTitle.Section>
            <SdText.Body maw={480}>{description}</SdText.Body>
          </Stack>
          <Group gap="sm" justify="center">
            {onHome && (
              <SdButton.Primary onClick={onHome}>홈으로</SdButton.Primary>
            )}
            {onBack && (
              <SdButton.Ghost onClick={onBack}>뒤로 가기</SdButton.Ghost>
            )}
          </Group>
        </Stack>
      </SdContainer>
    </Center>
  );
}

export const SdErrorView = {
  /** app/error.tsx — 서버/렌더링 오류 + 재시도 버튼 */
  Page,
  /** app/not-found.tsx — 404 Not Found */
  NotFound,
};
