"use client";

import { Container, Text } from "@mantine/core";
import { PageLayout } from "@framework/ui";
import { navItems } from "../../../data";


export default function AboutPage() {
  return (
    <PageLayout navItems={navItems} title="회사 소개" description="asd 미션과 비전을 소개합니다.">
      <Container size="xl" py={80}>
        <Text>페이지 본문 내용</Text>
      </Container>
    </PageLayout>
  );
}
