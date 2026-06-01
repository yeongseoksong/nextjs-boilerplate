import { Box, BoxProps, Card, Center, Group, Stack } from "@mantine/core";
import { SdText } from "./Text";
import { SdTitle } from "./Title";

interface SdQuoteProps extends BoxProps {
  lines: string[];
  name?: string;
  role?: string;
}

function QuoteInner({ lines, name, role }: Pick<SdQuoteProps, "lines" | "name" | "role">) {
  return (
    <Stack gap="lg">
      <Stack gap={0}>
        <SdTitle.Display c="primary.6" lh={0.8} aria-hidden>
          &ldquo;
        </SdTitle.Display>
        <Stack gap="sm" mt="md">
          {lines.map((line, i) => (
            <SdText.Body key={i}>{line}</SdText.Body>
          ))}
        </Stack>
      </Stack>
      {(name || role) && (
        <Group gap="xs" align="baseline">
          {name && <SdText.Strong>{name}</SdText.Strong>}
          {role && <SdText.Sub>{role}</SdText.Sub>}
        </Group>
      )}
    </Stack>
  );
}

function Plain({ lines, name, role, ...boxProps }: SdQuoteProps) {
  return (
    <Center>
      <Box w="fit-content" {...boxProps}>
        <QuoteInner lines={lines} name={name} role={role} />
      </Box>
    </Center>
  );
}

function CardQuote({ lines, name, role, ...boxProps }: SdQuoteProps) {
  return (
    <Center>
      <Card w="fit-content" {...boxProps}>
        <QuoteInner lines={lines} name={name} role={role} />
      </Card>
    </Center>
  );
}

export const SdQuote = {
  Plain,
  Card: CardQuote,
};
