"use client";

import { PageLayout, SdButton, SdModal, SdTable, SdQuote, SdTabs, SdTimelineSection, SdTitle } from "@framework/ui";
import { ceoMessage, navItems, timelineEvents } from "../../../data";
import { useDisclosure } from "@mantine/hooks";
import { Container, Stack } from "@mantine/core";

export default function AboutPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <PageLayout
      navItems={navItems}
      image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80"
      title="회사 소개"
      description="asd 미션과 비전을 소개합니다."
    >
        <SdTabs.Underline defaultValue="history" w="100%">
          <SdTabs.Pills.List>
            <SdTabs.Pills.Tab value="history">연혁</SdTabs.Pills.Tab>
            <SdTabs.Pills.Tab value="vision">미션 · 비전</SdTabs.Pills.Tab>
            <SdTabs.Pills.Tab value="ceo">대표의 말</SdTabs.Pills.Tab>
          </SdTabs.Pills.List>

          <SdTabs.Pills.Panel value="history">
            <SdTimelineSection
              label="연혁"
              title="회사의 발자취"
              description="창립부터 현재까지 걸어온 길을 소개합니다.소개합니다소개합니다"
              items={timelineEvents}
            />
          </SdTabs.Pills.Panel>

          <SdTabs.Pills.Panel value="vision">
            <Container py={96}>
              <Stack gap="xl">
                <SdTable>
                  <SdTable.Thead>
                    <SdTable.Tr>
                      <SdTable.Th>구분</SdTable.Th>
                      <SdTable.Th>내용</SdTable.Th>
                    </SdTable.Tr>
                  </SdTable.Thead>
                  <SdTable.Tbody>
                    <SdTable.Tr>
                      <SdTable.Td>미션</SdTable.Td>
                      <SdTable.Td>기술로 업무를 더 스마트하게</SdTable.Td>
                    </SdTable.Tr>
                    <SdTable.Tr>
                      <SdTable.Td>비전</SdTable.Td>
                      <SdTable.Td>2030년 아시아 1위 업무 플랫폼</SdTable.Td>
                    </SdTable.Tr>
                    <SdTable.Tr>
                      <SdTable.Td>핵심가치</SdTable.Td>
                      <SdTable.Td>혁신 · 신뢰 · 협업</SdTable.Td>
                    </SdTable.Tr>
                  </SdTable.Tbody>
                </SdTable>

                <SdButton.Outline onClick={open} w="fit-content">
                  핵심가치 상세 보기
                </SdButton.Outline>
              </Stack>

              <SdModal opened={opened} onClose={close} title={<SdTitle.Card>핵심가치</SdTitle.Card>}>
                <SdModal.Body>
                  <SdTable>
                    <SdTable.Thead>
                      <SdTable.Tr>
                        <SdTable.Th>가치</SdTable.Th>
                        <SdTable.Th>설명</SdTable.Th>
                      </SdTable.Tr>
                    </SdTable.Thead>
                    <SdTable.Tbody>
                      <SdTable.Tr>
                        <SdTable.Td>혁신</SdTable.Td>
                        <SdTable.Td>끊임없는 기술 혁신으로 고객 가치를 창출합니다.</SdTable.Td>
                      </SdTable.Tr>
                      <SdTable.Tr>
                        <SdTable.Td>신뢰</SdTable.Td>
                        <SdTable.Td>고객과의 약속을 지키는 신뢰를 최우선으로 합니다.</SdTable.Td>
                      </SdTable.Tr>
                      <SdTable.Tr>
                        <SdTable.Td>협업</SdTable.Td>
                        <SdTable.Td>팀 간 긴밀한 협업으로 최상의 결과를 만들어냅니다.</SdTable.Td>
                      </SdTable.Tr>
                    </SdTable.Tbody>
                  </SdTable>
                </SdModal.Body>
              </SdModal>
            </Container>
          </SdTabs.Pills.Panel>
          <SdTabs.Pills.Panel value="ceo">
              <SdQuote.Card
                lines={ceoMessage.lines}
                name={ceoMessage.name}
                role={ceoMessage.role}
              />
          </SdTabs.Pills.Panel>
        </SdTabs.Underline>
    </PageLayout>
  );
}
