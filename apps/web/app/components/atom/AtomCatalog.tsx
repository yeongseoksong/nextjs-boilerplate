'use client'

import { Group, SimpleGrid, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  Logo,
  SdBadge,
  SdButton,
  SdContainer,
  SdInput,
  SdLink,
  SdModal,
  SdNumberIcon,
  SdQuote,
  SdSkeleton,
  SdTable,
  SdTabs,
  SdText,
  SdTextBoxSection,
  SdTitle,
  SdToast,
} from '@framework/ui'
import { ceoMessage } from '../../../data'
import { Showcase, Variant } from '../../_catalog/Showcase'

export default function AtomCatalog() {
  const [opened, { open, close }] = useDisclosure(false)

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
          exports={['SdTitleDisplay', 'SdTitleSection', 'SdTitleCard', 'SdTitleSub']}
        >
          <Stack gap="lg">
            <Variant label="Display · order 2">
              <SdTitle.Display>디스플레이 제목</SdTitle.Display>
            </Variant>
            <Variant label="Section · order 3">
              <SdTitle.Section>섹션 제목</SdTitle.Section>
            </Variant>
            <Variant label="Card · order 4">
              <SdTitle.Card>카드 제목</SdTitle.Card>
            </Variant>
            <Variant label="Sub · order 5">
              <SdTitle.Sub>소제목</SdTitle.Sub>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdText"
          description="본문 텍스트. fz·fw가 variant에 인코딩되어 있으므로 인라인으로 덮어쓰지 않습니다."
          exports={[
            'SdTextStrong',
            'SdTextBody',
            'SdTextSub',
            'SdTextEyebrow',
            'SdTextNumeric',
            'SdTextError',
            'SdTextHint',
          ]}
        >
          <Stack gap="md">
            <Variant label="Strong">
              <SdText.Strong>강조 본문입니다.</SdText.Strong>
            </Variant>
            <Variant label="Body">
              <SdText.Body>일반 본문입니다. %c 토큰은 회사명으로 치환됩니다.</SdText.Body>
            </Variant>
            <Variant label="Sub">
              <SdText.Sub>보조 설명 텍스트입니다.</SdText.Sub>
            </Variant>
            <Variant label="Eyebrow">
              <SdText.Eyebrow>eyebrow label</SdText.Eyebrow>
            </Variant>
            <Variant label="Numeric">
              <SdText.Numeric>1,234,567</SdText.Numeric>
            </Variant>
            <Variant label="Error">
              <SdText.Error>필수 항목입니다.</SdText.Error>
            </Variant>
            <Variant label="Hint">
              <SdText.Hint>최대 100자까지 입력할 수 있습니다.</SdText.Hint>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdButton"
          description="액션 버튼. 스타일 변형(Primary~White)과 라벨·아이콘까지 고정된 표준 액션 버튼(Submit·Delete·Cancel·Excel)으로 나뉩니다. 표준 버튼은 children 없이 써도 기본 라벨이 표시됩니다."
          exports={[
            'SdButtonPrimary',
            'SdButtonSecondary',
            'SdButtonOutline',
            'SdButtonGhost',
            'SdButtonWhite',
            'SdButtonSubmit',
            'SdButtonDelete',
            'SdButtonCancel',
            'SdButtonExcel',
            'SdButtonDownload',
          ]}
        >
          <Stack gap="lg">
            <Variant label="스타일 변형">
              <Group gap="sm">
                <SdButton.Primary>Primary</SdButton.Primary>
                <SdButton.Secondary>Secondary</SdButton.Secondary>
                <SdButton.Outline>Outline</SdButton.Outline>
                <SdButton.Ghost>Ghost</SdButton.Ghost>
              </Group>
            </Variant>
            <Variant label="표준 액션 (라벨 고정)">
              <Group gap="sm">
                <SdButton.Submit />
                <SdButton.Delete />
                <SdButton.Cancel />
                <SdButton.Excel />
                <SdButton.Download />
              </Group>
            </Variant>
            <Variant label="라벨 덮어쓰기">
              <Group gap="sm">
                <SdButton.Submit>문의 보내기</SdButton.Submit>
                <SdButton.Excel>엑셀 다운로드</SdButton.Excel>
              </Group>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdBadge"
          description="상태 표시 배지."
          exports={['SdBadgeDefault', 'SdBadgePrimary', 'SdBadgeSuccess', 'SdBadgeWarning']}
        >
          <Group gap="sm">
            <SdBadge.Default>일반</SdBadge.Default>
            <SdBadge.Primary>브랜드</SdBadge.Primary>
            <SdBadge.Success>완료</SdBadge.Success>
            <SdBadge.Warning>주의</SdBadge.Warning>
          </Group>
        </Showcase>

        <Showcase
          name="SdLink"
          description="앵커 표준. hover 시 primary.6으로 전환되며, 쓰이는 위치가 아니라 강조도(Strong→Hint)로 variant를 고릅니다. 타이포 값은 ui/typography.ts의 토큰을 SdText와 공유합니다."
          exports={['SdLinkStrong', 'SdLinkBody', 'SdLinkSub', 'SdLinkHint']}
        >
          <Stack gap="lg">
            <Group gap="xl">
              <SdLink.Strong href="#">강조 링크</SdLink.Strong>
              <SdLink.Body href="#">기본 링크</SdLink.Body>
              <SdLink.Sub href="#">보조 링크</SdLink.Sub>
              <SdLink.Hint href="#">최소 강조 링크</SdLink.Hint>
            </Group>
            <Variant label="href 없음 — 같은 강조도의 SdText로 폴백 (죽은 앵커를 만들지 않음)">
              <Group gap="xl">
                <SdLink.Strong>강조 링크</SdLink.Strong>
                <SdLink.Body>기본 링크</SdLink.Body>
                <SdLink.Sub>보조 링크</SdLink.Sub>
                <SdLink.Hint>최소 강조 링크</SdLink.Hint>
              </Group>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdInput"
          description="폼 입력 한 벌. Mantine 입력을 통과시키되 모든 변형이 label·description·error를 같은 방식으로 받습니다(라벨 프로퍼티가 없는 Slider·Rating·Segmented·PinCode는 Input.Wrapper로 감쌌습니다). useSdForm의 getInputProps를 그대로 펼쳐 넣을 수 있습니다."
          exports={[
            'SdInputText',
            'SdInputEmail',
            'SdInputPassword',
            'SdInputTextarea',
            'SdInputJson',
            'SdInputNumber',
            'SdInputSlider',
            'SdInputRating',
            'SdInputPinCode',
            'SdInputSelect',
            'SdInputNativeSelect',
            'SdInputMultiSelect',
            'SdInputAutocomplete',
            'SdInputTags',
            'SdInputRadioGroup',
            'SdInputSegmented',
            'SdInputCheckbox',
            'SdInputSwitch',
            'SdInputFile',
            'SdInputColor',
            'SdInputDate',
            'SdInputDateRange',
            'SdInputTime',
          ]}
        >
          <Stack gap="xl">
            <Variant label="텍스트">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <SdInput.Text label="이름" placeholder="홍길동" required />
                <SdInput.Email label="업무 이메일" placeholder="you@company.com" />
                <SdInput.Password label="비밀번호" placeholder="••••••••" />
                <SdInput.Textarea label="문의 내용" placeholder="자유롭게 적어주세요." />
                <SdInput.Json label="설정(JSON)" placeholder='{ "key": "value" }' />
              </SimpleGrid>
            </Variant>

            <Variant label="숫자">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <SdInput.Number label="수량" placeholder="0" min={0} />
                <SdInput.PinCode label="인증번호" length={6} />
                <SdInput.Slider label="예산 비중" defaultValue={40} />
                <SdInput.Rating label="만족도" defaultValue={4} />
              </SimpleGrid>
            </Variant>

            <Variant label="선택">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <SdInput.Select
                  label="팀 규모"
                  placeholder="선택하세요"
                  data={['1–10명', '11–50명', '51–200명']}
                />
                <SdInput.NativeSelect label="문의 유형" data={['도입 문의', '기술 지원']} />
                <SdInput.MultiSelect
                  label="관심 분야"
                  placeholder="복수 선택"
                  data={['자산 관리', '프로젝트', '리포팅']}
                />
                <SdInput.Autocomplete
                  label="회사명"
                  placeholder="입력하며 검색"
                  data={['주식회사 가나', '주식회사 다라']}
                />
                <SdInput.Tags label="태그" placeholder="입력 후 Enter" />
                <SdInput.Segmented label="요금제" data={['월간', '연간']} />
                <SdInput.Radio
                  label="연락 방법"
                  data={[
                    { value: 'email', label: '이메일' },
                    { value: 'phone', label: '전화' },
                  ]}
                />
              </SimpleGrid>
            </Variant>

            <Variant label="불리언 · 기타">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <SdInput.Checkbox label="개인정보 수집에 동의합니다." />
                <SdInput.Switch label="이메일 알림 받기" />
                <SdInput.File label="첨부 파일" placeholder="파일 선택" />
                <SdInput.Color label="브랜드 색상" defaultValue="#0b5ed7" />
              </SimpleGrid>
            </Variant>

            <Variant label="날짜 · 시간 (@mantine/dates)">
              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <SdInput.Date label="희망 도입일" placeholder="YYYY-MM-DD" />
                <SdInput.DateRange label="조회 기간" placeholder="시작 – 종료" />
                <SdInput.Time label="미팅 시각" />
              </SimpleGrid>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdNumberIcon"
          description="단계 번호를 원형 아이콘으로 표시합니다."
          exports={['SdNumberIcon']}
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
          exports={['SdTabsPills', 'SdTabsUnderline', 'SdTabsOutline']}
        >
          <Stack gap="xl">
            <Variant label="Pills">
              <SdTabs.Pills defaultValue="a">
                <SdTabs.Pills.List>
                  <SdTabs.Pills.Tab value="a">첫번째</SdTabs.Pills.Tab>
                  <SdTabs.Pills.Tab value="b">두번째</SdTabs.Pills.Tab>
                </SdTabs.Pills.List>
                <SdTabs.Pills.Panel value="a">
                  <SdText.Body>Pills 첫번째 패널</SdText.Body>
                </SdTabs.Pills.Panel>
                <SdTabs.Pills.Panel value="b">
                  <SdText.Body>Pills 두번째 패널</SdText.Body>
                </SdTabs.Pills.Panel>
              </SdTabs.Pills>
            </Variant>
            <Variant label="Underline">
              <SdTabs.Underline defaultValue="a">
                <SdTabs.Underline.List>
                  <SdTabs.Underline.Tab value="a">첫번째</SdTabs.Underline.Tab>
                  <SdTabs.Underline.Tab value="b">두번째</SdTabs.Underline.Tab>
                </SdTabs.Underline.List>
                <SdTabs.Underline.Panel value="a">
                  <SdText.Body>Underline 첫번째 패널</SdText.Body>
                </SdTabs.Underline.Panel>
                <SdTabs.Underline.Panel value="b">
                  <SdText.Body>Underline 두번째 패널</SdText.Body>
                </SdTabs.Underline.Panel>
              </SdTabs.Underline>
            </Variant>
            <Variant label="Outline">
              <SdTabs.Outline defaultValue="a">
                <SdTabs.Outline.List>
                  <SdTabs.Outline.Tab value="a">첫번째</SdTabs.Outline.Tab>
                  <SdTabs.Outline.Tab value="b">두번째</SdTabs.Outline.Tab>
                </SdTabs.Outline.List>
                <SdTabs.Outline.Panel value="a">
                  <SdText.Body>Outline 첫번째 패널</SdText.Body>
                </SdTabs.Outline.Panel>
                <SdTabs.Outline.Panel value="b">
                  <SdText.Body>Outline 두번째 패널</SdText.Body>
                </SdTabs.Outline.Panel>
              </SdTabs.Outline>
            </Variant>
            <Variant label="syncHash — URL 해시(#id)와 동기화">
              <Stack gap="sm">
                <SdText.Sub>
                  아래 링크를 누르면 탭이 바뀌고, 탭을 누르면 주소창 해시가 갱신됩니다.
                </SdText.Sub>
                <Group gap="xs">
                  <SdLink.Sub href="#tab-overview">#tab-overview 로 이동</SdLink.Sub>
                  <SdLink.Sub href="#tab-detail">#tab-detail 로 이동</SdLink.Sub>
                </Group>
                <SdTabs.Underline syncHash defaultValue="tab-overview">
                  <SdTabs.Underline.List>
                    <SdTabs.Underline.Tab value="tab-overview">개요</SdTabs.Underline.Tab>
                    <SdTabs.Underline.Tab value="tab-detail">상세</SdTabs.Underline.Tab>
                  </SdTabs.Underline.List>
                  <SdTabs.Underline.Panel value="tab-overview">
                    <SdText.Body>개요 패널 — 해시 #tab-overview</SdText.Body>
                  </SdTabs.Underline.Panel>
                  <SdTabs.Underline.Panel value="tab-detail">
                    <SdText.Body>상세 패널 — 해시 #tab-detail</SdText.Body>
                  </SdTabs.Underline.Panel>
                </SdTabs.Underline>
              </Stack>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdTable"
          description="기본 테이블과 스펙 표기용 Spec 변형."
          exports={['SdTable', 'SdTableSpec']}
        >
          <Stack gap="xl">
            <Variant label="default">
              <SdTable>
                <SdTable.Thead>
                  <SdTable.Tr>
                    <SdTable.Th>항목</SdTable.Th>
                    <SdTable.Th>값</SdTable.Th>
                  </SdTable.Tr>
                </SdTable.Thead>
                <SdTable.Tbody>
                  <SdTable.Tr>
                    <SdTable.Td>플랜</SdTable.Td>
                    <SdTable.Td>Business</SdTable.Td>
                  </SdTable.Tr>
                  <SdTable.Tr>
                    <SdTable.Td>사용자</SdTable.Td>
                    <SdTable.Td>50명</SdTable.Td>
                  </SdTable.Tr>
                </SdTable.Tbody>
              </SdTable>
            </Variant>
            <Variant label="Spec">
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
                </SdTable.Spec.Tbody>
              </SdTable.Spec>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdQuote"
          description="인용문. 대표 인사말 등에 사용합니다."
          exports={['SdQuotePlain', 'SdQuoteCard']}
        >
          <Stack gap="xl">
            <Variant label="Plain">
              <SdQuote.Plain
                lines={ceoMessage.lines}
                name={ceoMessage.name}
                role={ceoMessage.role}
              />
            </Variant>
            <Variant label="Card">
              <SdQuote.Card
                lines={ceoMessage.lines}
                name={ceoMessage.name}
                role={ceoMessage.role}
              />
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="SdSkeleton"
          description="로딩 플레이스홀더. Suspense fallback으로 사용합니다."
          exports={[
            'SdSkeletonCard',
            'SdSkeletonText',
            'SdSkeletonTitle',
            'SdSkeletonImage',
            'SdSkeletonAvatar',
          ]}
        >
          <Stack gap="lg">
            <Variant label="Title / Text">
              <Stack gap="xs">
                <SdSkeleton.Title />
                <SdSkeleton.Text />
                <SdSkeleton.Text width="80%" />
              </Stack>
            </Variant>
            <Variant label="Avatar / Image">
              <Group align="flex-start">
                <SdSkeleton.Avatar />
                <SdSkeleton.Image height={120} />
              </Group>
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
          exports={['SdModal']}
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
          name="SdToast"
          description="화면 모서리에 잠깐 떴다 사라지는 알림. 컴포넌트가 아니라 호출하는 함수이며, 레이아웃에 SdToastProvider가 한 번 놓여 있어야 동작합니다."
          exports={[
            'SdToastSuccess',
            'SdToastError',
            'SdToastWarning',
            'SdToastInfo',
            'SdToastLoading',
            'SdToastUpdate',
            'SdToastHide',
            'SdToastClean',
            'SdToastProvider',
          ]}
        >
          <Stack gap="lg" align="flex-start">
            <Variant label="변형 — 색·아이콘·기본 제목이 고정">
              <Group>
                <SdButton.Outline onClick={() => SdToast.Success('저장했습니다.')}>
                  Success
                </SdButton.Outline>
                <SdButton.Outline onClick={() => SdToast.Error('저장하지 못했습니다.')}>
                  Error
                </SdButton.Outline>
                <SdButton.Outline onClick={() => SdToast.Warning('되돌릴 수 없는 작업입니다.')}>
                  Warning
                </SdButton.Outline>
                <SdButton.Outline onClick={() => SdToast.Info('새 버전이 배포되었습니다.')}>
                  Info
                </SdButton.Outline>
              </Group>
            </Variant>
            <Variant label="Loading → Update — 진행 중 알림을 결과로 교체">
              <SdButton.Outline
                onClick={() => {
                  const id = SdToast.Loading('업로드하는 중입니다…')
                  setTimeout(() => SdToast.Update(id, 'Success', '업로드를 마쳤습니다.'), 2000)
                }}
              >
                업로드 시작
              </SdButton.Outline>
            </Variant>
          </Stack>
        </Showcase>

        <Showcase
          name="Logo"
          description="헤더 로고. src·alt는 NEXT_PUBLIC_LOGO_SRC / NEXT_PUBLIC_LOGO_ALT로 주입합니다."
          exports={['Logo']}
        >
          <Group gap="xl" align="center">
            <Variant label="sm">
              <Logo size="sm" />
            </Variant>
            <Variant label="md">
              <Logo size="md" />
            </Variant>
            <Variant label="lg">
              <Logo size="lg" />
            </Variant>
          </Group>
        </Showcase>

        <Showcase
          name="SdContainer"
          description="페이지 최대 너비와 좌우 여백을 담당하는 래퍼. 이 카탈로그 전체를 감싸고 있습니다."
          exports={['SdContainer']}
        >
          <SdText.Body>이 문단이 놓인 영역이 SdContainer의 기본 폭입니다.</SdText.Body>
        </Showcase>
      </Stack>
    </SdContainer>
  )
}
