import { Anchor, Box, Container, Group, Text } from "@mantine/core";
import { Logo } from "../atom/Logo";

export function SdFooter() {
  return (

      <Container size="xl">
        <Group justify="space-between" align="center">
          <Logo/>
          <Text fz="sm" c="slate.4">© 2025 SIWORKS Inc. All rights reserved.</Text>
          <Group gap="lg">
            {["이용약관", "개인정보처리방침", "고객센터"].map((item) => (
              <Anchor key={item} fz="sm" c="slate.5" underline="never">{item}</Anchor>
            ))}
          </Group>
        </Group>
      </Container>
  );
}
