"use client";

import { Group, SimpleGrid, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Logo,
  SdBadge,
  SdButton,
  SdContainer,
  SdInput,
  SdModal,
  SdNumberIcon,
  SdQuote,
  SdSkeleton,
  SdTable,
  SdTabs,
  SdText,
  SdTextBoxSection,
  SdTitle,
} from "@framework/ui";
import { ceoMessage } from "../../../data";
import { Showcase, Variant } from "../../_catalog/Showcase";

export default function AtomCatalog() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <SdContainer py="xl">
      <Stack gap={64}>
        <SdTextBoxSection
          label="Atom"
          title="기본 컴포넌트"
          description="더 이상 쪼갤 수 없는 최소 단위입니다. 모든 상위 컴포넌트가 이들을 조합해 만들어집니다."
        />

        <Showcase
          name="SdTitle"
          description="제목 계층. order가 고정되어 있어 문서 구조가 일관됩니다."
          exports={["SdTitleDisplay", "SdTitleSection", "SdTitleCard", "SdTitleSub"]}
        >
          <Stack gap="lg">
            <Variant label="Display · order 2"><SdTitle.Display>디스플레이 제목</SdTitle.Display></Variant>
            <Variant label="Section · order 3"><SdTitle.Section>섹션 제목</SdTitle.Section></Variant>
            <Variant label="Card · order 4"><SdTitle.Card>카드 제목</SdTitle.Card></Variant>
            <Variant label="Sub · order 5"><SdTitle.Sub>소제목</SdTitle.Sub></Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdText"
          description="본문 텍스트. fz·fw가 variant에 인코딩되어 있으므로 인라인으로 덮어쓰지 않습니다."
          exports={[
            "SdTextStrong", "SdTextBody", "SdTextSub", "SdTextEyebrow",
            "SdTextNumeric", "SdTextError", "SdTextHint",
          ]}
        >
          <Stack gap="md">
            <Variant label="Strong"><SdText.Strong>강조 본문입니다.</SdText.Strong></Variant>
            <Variant label="Body"><SdText.Body>일반 본문입니다. %c 토큰은 회사명으로 치환됩니다.</SdText.Body></Variant>
            <Variant label="Sub"><SdText.Sub>보조 설명 텍스트입니다.</SdText.Sub></Variant>
            <Variant label="Eyebrow"><SdText.Eyebrow>eyebrow label</SdText.Eyebrow></Variant>
            <Variant label="Numeric"><SdText.Numeric>1,234,567</SdText.Numeric></Variant>
            <Variant label="Error"><SdText.Error>필수 항목입니다.</SdText.Error></Variant>
            <Variant label="Hint"><SdText.Hint>최대 100자까지 입력할 수 있습니다.</SdText.Hint></Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdButton"
          description="액션 버튼. 용도별로 색과 변형이 고정되어 있습니다."
          exports={[
            "SdButtonPrimary", "SdButtonSecondary", "SdButtonOutline", "SdButtonGhost",
            "SdButtonWhite", "SdButtonDelete", "SdButtonCancel",
          ]}
        >
          <Group gap="sm">
            <SdButton.Primary>Primary</SdButton.Primary>
            <SdButton.Secondary>Secondary</SdButton.Secondary>
            <SdButton.Outline>Outline</SdButton.Outline>
            <SdButton.Ghost>Ghost</SdButton.Ghost>
            <SdButton.Delete>삭제</SdButton.Delete>
            <SdButton.Cancel>취소</SdButton.Cancel>
          </Group>
        </Showcase>

        <Showcase
          name="SdBadge"
          description="상태 표시 배지."
          exports={["SdBadgeDefault", "SdBadgePrimary", "SdBadgeSuccess", "SdBadgeWarning"]}
        >
          <Group gap="sm">
            <SdBadge.Default>일반</SdBadge.Default>
            <SdBadge.Primary>브랜드</SdBadge.Primary>
            <SdBadge.Success>완료</SdBadge.Success>
            <SdBadge.Warning>주의</SdBadge.Warning>
          </Group>
        </Showcase>

        <Showcase
          name="SdInput"
          description="폼 입력 요소. Mantine 입력 컴포넌트에 디자인 기본값을 입혔습니다."
          exports={["SdInputText", "SdInputEmail", "SdInputPassword", "SdInputTextarea", "SdInputSelect"]}
        >
          <Stack gap="md" maw={460}>
            <SdInput.Text label="이름" placeholder="홍길동" required />
            <SdInput.Email label="업무 이메일" placeholder="you@company.com" />
            <SdInput.Password label="비밀번호" placeholder="••••••••" />
            <SdInput.Select label="팀 규모" placeholder="선택하세요" data={["1–10명", "11–50명", "51–200명"]} />
            <SdInput.Textarea label="문의 내용" placeholder="자유롭게 적어주세요." />
          </Stack>
        </Showcase>

        <Showcase
          name="SdNumberIcon"
          description="단계 번호를 원형 아이콘으로 표시합니다."
          exports={["SdNumberIcon"]}
        >
          <Group gap="md">
            <SdNumberIcon value="1" />
            <SdNumberIcon value="2" color="slate" />
            <SdNumberIcon value="3" size={64} />
          </Group>
        </Showcase>

        <Showcase
          name="SdTabs"
          description="탭 네비게이션. 세 가지 시각 스타일을 제공합니다."
          exports={["SdTabsPills", "SdTabsUnderline", "SdTabsOutline"]}
        >
          <Stack gap="xl">
            <Variant label="Pills">
              <SdTabs.Pills defaultValue="a">
                <SdTabs.Pills.List>
                  <SdTabs.Pills.Tab value="a">첫번째</SdTabs.Pills.Tab>
                  <SdTabs.Pills.Tab value="b">두번째</SdTabs.Pills.Tab>
                </SdTabs.Pills.List>
                <SdTabs.Pills.Panel value="a"><SdText.Body>Pills 첫번째 패널</SdText.Body></SdTabs.Pills.Panel>
                <SdTabs.Pills.Panel value="b"><SdText.Body>Pills 두번째 패널</SdText.Body></SdTabs.Pills.Panel>
              </SdTabs.Pills>
            </Variant>
            <Variant label="Underline">
              <SdTabs.Underline defaultValue="a">
                <SdTabs.Underline.List>
                  <SdTabs.Underline.Tab value="a">첫번째</SdTabs.Underline.Tab>
                  <SdTabs.Underline.Tab value="b">두번째</SdTabs.Underline.Tab>
                </SdTabs.Underline.List>
                <SdTabs.Underline.Panel value="a"><SdText.Body>Underline 첫번째 패널</SdText.Body></SdTabs.Underline.Panel>
                <SdTabs.Underline.Panel value="b"><SdText.Body>Underline 두번째 패널</SdText.Body></SdTabs.Underline.Panel>
              </SdTabs.Underline>
            </Variant>
            <Variant label="Outline">
              <SdTabs.Outline defaultValue="a">
                <SdTabs.Outline.List>
                  <SdTabs.Outline.Tab value="a">첫번째</SdTabs.Outline.Tab>
                  <SdTabs.Outline.Tab value="b">두번째</SdTabs.Outline.Tab>
                </SdTabs.Outline.List>
                <SdTabs.Outline.Panel value="a"><SdText.Body>Outline 첫번째 패널</SdText.Body></SdTabs.Outline.Panel>
                <SdTabs.Outline.Panel value="b"><SdText.Body>Outline 두번째 패널</SdText.Body></SdTabs.Outline.Panel>
              </SdTabs.Outline>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdTable"
          description="기본 테이블과 스펙 표기용 Spec 변형."
          exports={["SdTable", "SdTableSpec"]}
        >
          <Stack gap="xl">
            <Variant label="default">
              <SdTable>
                <SdTable.Thead>
                  <SdTable.Tr><SdTable.Th>항목</SdTable.Th><SdTable.Th>값</SdTable.Th></SdTable.Tr>
                </SdTable.Thead>
                <SdTable.Tbody>
                  <SdTable.Tr><SdTable.Td>플랜</SdTable.Td><SdTable.Td>Business</SdTable.Td></SdTable.Tr>
                  <SdTable.Tr><SdTable.Td>사용자</SdTable.Td><SdTable.Td>50명</SdTable.Td></SdTable.Tr>
                </SdTable.Tbody>
              </SdTable>
            </Variant>
            <Variant label="Spec">
              <SdTable.Spec>
                <SdTable.Spec.Thead>
                  <SdTable.Spec.Tr><SdTable.Spec.Th>구분</SdTable.Spec.Th><SdTable.Spec.Th>내용</SdTable.Spec.Th></SdTable.Spec.Tr>
                </SdTable.Spec.Thead>
                <SdTable.Spec.Tbody>
                  <SdTable.Spec.Tr><SdTable.Spec.Td>미션</SdTable.Spec.Td><SdTable.Spec.Td>기술로 업무를 더 스마트하게</SdTable.Spec.Td></SdTable.Spec.Tr>
                  <SdTable.Spec.Tr><SdTable.Spec.Td>비전</SdTable.Spec.Td><SdTable.Spec.Td>2030년 아시아 1위 업무 플랫폼</SdTable.Spec.Td></SdTable.Spec.Tr>
                </SdTable.Spec.Tbody>
              </SdTable.Spec>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdQuote"
          description="인용문. 대표 인사말 등에 사용합니다."
          exports={["SdQuotePlain", "SdQuoteCard"]}
        >
          <Stack gap="xl">
            <Variant label="Plain">
              <SdQuote.Plain lines={ceoMessage.lines} name={ceoMessage.name} role={ceoMessage.role} />
            </Variant>
            <Variant label="Card">
              <SdQuote.Card lines={ceoMessage.lines} name={ceoMessage.name} role={ceoMessage.role} />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdSkeleton"
          description="로딩 플레이스홀더. Suspense fallback으로 사용합니다."
          exports={["SdSkeletonCard", "SdSkeletonText", "SdSkeletonTitle", "SdSkeletonImage", "SdSkeletonAvatar"]}
        >
          <Stack gap="lg">
            <Variant label="Title / Text">
              <Stack gap="xs"><SdSkeleton.Title /><SdSkeleton.Text /><SdSkeleton.Text width="80%" /></Stack>
            </Variant>
            <Variant label="Avatar / Image">
              <Group align="flex-start"><SdSkeleton.Avatar /><SdSkeleton.Image height={120} /></Group>
            </Variant>
            <Variant label="Card">
              <SimpleGrid cols={{ base: 1, sm: 3 }}>
                <SdSkeleton.Card lines={2} />
                <SdSkeleton.Card lines={2} />
                <SdSkeleton.Card lines={2} />
              </SimpleGrid>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdModal"
          description="모달. opened/onClose 상태가 필요해 Client Component 전용입니다."
          exports={["SdModal"]}
        >
          <Stack gap="md" align="flex-start">
            <SdButton.Outline onClick={open}>모달 열기</SdButton.Outline>
            <SdModal opened={opened} onClose={close} title={<SdTitle.Card>모달 제목</SdTitle.Card>}>
              <SdModal.Body>
                <SdText.Body>모달 본문입니다. SdModal.Body로 감싸 여백이 적용됩니다.</SdText.Body>
              </SdModal.Body>
            </SdModal>
          </Stack>
        </Showcase>

        <Showcase
          name="Logo"
          description="헤더 로고. src·alt는 NEXT_PUBLIC_LOGO_SRC / NEXT_PUBLIC_LOGO_ALT로 주입합니다."
          exports={["Logo"]}
        >
          <Group gap="xl" align="center">
            <Variant label="sm"><Logo size="sm" /></Variant>
            <Variant label="md"><Logo size="md" /></Variant>
            <Variant label="lg"><Logo size="lg" /></Variant>
          </Group>
        </Showcase>

        <Showcase
          name="SdContainer"
          description="페이지 최대 너비와 좌우 여백을 담당하는 래퍼. 이 카탈로그 전체를 감싸고 있습니다."
          exports={["SdContainer"]}
        >
          <SdText.Body>이 문단이 놓인 영역이 SdContainer의 기본 폭입니다.</SdText.Body>
        </Showcase>
      </Stack>
    </SdContainer>
  );
}
