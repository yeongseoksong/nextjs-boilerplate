"use client";

import { PageLayout, SdButton, SdModal, SdTable, SdQuote, SdTabs, SdTimelineSection, SdTitle, SdStepsSection, SdSteps } from "@framework/ui";
import { ceoMessage, timelineEvents } from "../../../data";
import { useDisclosure } from "@mantine/hooks";
import { Stack } from "@mantine/core";

const processSteps = [
  { title: "요구사항 분석", description: "고객의 업무 환경과 요구사항을 면밀히 파악하고 최적의 솔루션 방향을 도출합니다." },
  { title: "설계 및 제안", description: "분석 결과를 바탕으로 시스템 구조를 설계하고 상세 제안서를 작성합니다." },
  { title: "개발 및 구현", description: "검증된 기술 스택으로 안정적으로 구현하며, 단계별 테스트를 통해 품질을 보장합니다." },
  { title: "납품 및 지원", description: "현장 설치와 사용자 교육을 진행하고, 이후 지속적인 유지보수를 지원합니다." },
];

export default function AboutPage() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <PageLayout.Image
      image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80"
      title="회사 소개"
      description="asd 미션과 비전을 소개합니다."
    >
        <SdTabs.Pills defaultValue="history" w="100%">
          <SdTabs.Pills.List>
            <SdTabs.Pills.Tab value="history">연혁</SdTabs.Pills.Tab>
            <SdTabs.Pills.Tab value="vision">미션 · 비전</SdTabs.Pills.Tab>
            <SdTabs.Pills.Tab value="process">도입 절차</SdTabs.Pills.Tab>
            <SdTabs.Pills.Tab value="ceo">대표의 말</SdTabs.Pills.Tab>
          </SdTabs.Pills.List>

          <SdTabs.Pills.Panel value="history">
            <SdTimelineSection
              label="연혁"
              title="회사의 발자취"
              description="창립부터 현재까지 걸어온 길을 소개합니다."
              items={timelineEvents}
            />
          </SdTabs.Pills.Panel>

          <SdTabs.Pills.Panel value="vision">
              <Stack gap="xl">
                <SdTable.Spec>
                  <SdTable.Spec.Thead>
                    <SdTable.Spec.Tr>
                      <SdTable.Spec.Th>구분</SdTable.Spec.Th>
                      <SdTable.Spec.Th>내용</SdTable.Spec.Th>
                    </SdTable.Spec.Tr>
                  </SdTable.Spec.Thead>
                  <SdTable.Spec.Tbody>
                    <SdTable.Spec.Tr>
                      <SdTable.Spec.Td>미션</SdTable.Spec.Td>
                      <SdTable.Spec.Td>기술로 업무를 더 스마트하게</SdTable.Spec.Td>
                    </SdTable.Spec.Tr>
                    <SdTable.Spec.Tr>
                      <SdTable.Spec.Td>비전</SdTable.Spec.Td>
                      <SdTable.Spec.Td>2030년 아시아 1위 업무 플랫폼</SdTable.Spec.Td>
                    </SdTable.Spec.Tr>
                    <SdTable.Spec.Tr>
                      <SdTable.Spec.Td>핵심가치</SdTable.Spec.Td>
                      <SdTable.Spec.Td>혁신 · 신뢰 · 협업</SdTable.Spec.Td>
                    </SdTable.Spec.Tr>
                  </SdTable.Spec.Tbody>
                </SdTable.Spec>

                <SdButton.Outline onClick={open} w="fit-content">
                  핵심가치 상세 보기
                </SdButton.Outline>
              </Stack>

              <SdModal opened={opened} onClose={close} title={<SdTitle.Card>핵심가치</SdTitle.Card>}>
                <SdModal.Body>
                  <SdTable.Spec>
                    <SdTable.Spec.Thead>
                      <SdTable.Spec.Tr>
                        <SdTable.Spec.Th>가치</SdTable.Spec.Th>
                        <SdTable.Spec.Th>설명</SdTable.Spec.Th>
                      </SdTable.Spec.Tr>
                    </SdTable.Spec.Thead>
                    <SdTable.Spec.Tbody>
                      <SdTable.Spec.Tr>
                        <SdTable.Spec.Td>혁신</SdTable.Spec.Td>
                        <SdTable.Spec.Td>끊임없는 기술 혁신으로 고객 가치를 창출합니다.</SdTable.Spec.Td>
                      </SdTable.Spec.Tr>
                      <SdTable.Spec.Tr>
                        <SdTable.Spec.Td>신뢰</SdTable.Spec.Td>
                        <SdTable.Spec.Td>고객과의 약속을 지키는 신뢰를 최우선으로 합니다.</SdTable.Spec.Td>
                      </SdTable.Spec.Tr>
                      <SdTable.Spec.Tr>
                        <SdTable.Spec.Td>협업</SdTable.Spec.Td>
                        <SdTable.Spec.Td>팀 간 긴밀한 협업으로 최상의 결과를 만들어냅니다.</SdTable.Spec.Td>
                      </SdTable.Spec.Tr>
                    </SdTable.Spec.Tbody>
                  </SdTable.Spec>
                </SdModal.Body>
              </SdModal>
          </SdTabs.Pills.Panel>
          <SdTabs.Pills.Panel value="process">
            <SdStepsSection
              label="도입 절차"
              title="4단계로 완성되는 도입 프로세스"
              description="체계적인 절차로 안정적인 서비스 도입을 보장합니다."
              items={processSteps}
            />

            <SdTabs.Underline defaultValue="bubble" mt="xl">
              <SdTabs.Underline.List>
                <SdTabs.Underline.Tab value="bubble">Bubble</SdTabs.Underline.Tab>
                <SdTabs.Underline.Tab value="card">Card</SdTabs.Underline.Tab>
                <SdTabs.Underline.Tab value="strip">Strip</SdTabs.Underline.Tab>
              </SdTabs.Underline.List>
              <SdTabs.Underline.Panel value="bubble">
                <SdSteps.Bubble items={processSteps} />
              </SdTabs.Underline.Panel>
              <SdTabs.Underline.Panel value="card">
                <SdSteps.Card items={processSteps} />
              </SdTabs.Underline.Panel>
              <SdTabs.Underline.Panel value="strip">
                <SdSteps.Strip items={processSteps} />
              </SdTabs.Underline.Panel>
            </SdTabs.Underline>
          </SdTabs.Pills.Panel>

          <SdTabs.Pills.Panel value="ceo">
              <SdQuote.Card
                lines={ceoMessage.lines}
                name={ceoMessage.name}
                role={ceoMessage.role}
              />
          </SdTabs.Pills.Panel>
        </SdTabs.Pills>
    </PageLayout.Image>
  );
}
