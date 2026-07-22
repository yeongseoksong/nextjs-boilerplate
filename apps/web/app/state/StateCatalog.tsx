'use client'

import { useState } from 'react'
import { Box, Checkbox, Group, LoadingOverlay, Paper, SimpleGrid, Stack } from '@mantine/core'
import {
  formRules,
  SdBadge,
  SdButton,
  SdContainer,
  SdInput,
  SdLoginView,
  SdText,
  SdTextBoxSection,
  SdTitle,
  SdToast,
  useAuthHydrated,
  useAuthStore,
  useSdForm,
  useUiStore,
} from '@framework/ui'
import { Showcase, Variant } from '../_catalog/Showcase'

/** 상태 한 줄 — 라벨 + 현재 값 배지. */
function StateRow({ label, value }: { label: string; value: boolean | string | null }) {
  const isBool = typeof value === 'boolean'
  return (
    <Group justify="space-between" wrap="nowrap">
      <SdText.Sub>{label}</SdText.Sub>
      {isBool ? (
        value ? (
          <SdBadge.Success>true</SdBadge.Success>
        ) : (
          <SdBadge.Default>false</SdBadge.Default>
        )
      ) : (
        <SdText.Body>{value ?? '—'}</SdText.Body>
      )}
    </Group>
  )
}

/* ─────────────────────────────────────────────
   useAuthStore — 로그인 폼과 세션 패널을 나란히 두고
   같은 스토어를 두 컴포넌트가 공유하는 것을 보여준다.
───────────────────────────────────────────── */
function AuthDemo() {
  // 복원이 끝나기 전에는 로그아웃 상태로 그려야 서버 HTML과 어긋나지 않는다.
  const hydrated = useAuthHydrated()
  const user = useAuthStore((state) => state.user)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const login = useAuthStore((state) => state.login)
  const logout = useAuthStore((state) => state.logout)

  const loggedIn = hydrated && isAuthenticated

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
      <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
        <SdLoginView.Card
          mih={560}
          onSubmit={({ email }) => {
            login({ id: 'demo-1', email, name: email.split('@')[0] })
            SdToast.Success(`${email} 님으로 로그인했습니다.`)
          }}
        />
      </Paper>

      <Stack gap="md">
        <Paper withBorder radius="md" p="lg">
          <Stack gap="sm">
            <SdTitle.Sub>스토어 현재 값</SdTitle.Sub>
            <StateRow label="hasHydrated" value={hydrated} />
            <StateRow label="isAuthenticated" value={loggedIn} />
            <StateRow label="user.email" value={loggedIn ? (user?.email ?? null) : null} />
            <StateRow label="user.name" value={loggedIn ? (user?.name ?? null) : null} />
            <Group mt="xs">
              <SdButton.Outline
                disabled={!loggedIn}
                onClick={() => {
                  logout()
                  SdToast.Info('로그아웃했습니다.')
                }}
              >
                로그아웃
              </SdButton.Outline>
            </Group>
          </Stack>
        </Paper>

        <Paper withBorder radius="md" p="lg" bg="slate.0">
          <Stack gap="xs">
            <SdText.Strong>확인해 볼 것</SdText.Strong>
            <SdText.Sub>
              로그인한 뒤 이 페이지를 새로고침해 보세요. 세션은 localStorage의 `sd-auth` 키에
              남아 있어 그대로 복원됩니다.
            </SdText.Sub>
            <SdText.Sub>
              복원은 모듈 평가 시점이 아니라 `useAuthHydrated()`의 이펙트에서 일어납니다. 그래서
              첫 렌더는 항상 로그아웃 상태이고, 정적으로 미리 렌더된 HTML과 어긋나지 않습니다.
            </SdText.Sub>
            <SdText.Error>
              액세스 토큰은 이 스토어에 넣지 마세요. partialize가 사용자 프로필만 저장하도록 막아
              두었습니다 — 토큰은 httpOnly 쿠키가 맡습니다.
            </SdText.Error>
          </Stack>
        </Paper>
      </Stack>
    </SimpleGrid>
  )
}

/* ─────────────────────────────────────────────
   useUiStore — 화면 간 공유가 필요한 클라이언트 UI 상태
───────────────────────────────────────────── */
function UiDemo() {
  const globalLoading = useUiStore((state) => state.globalLoading)
  const setGlobalLoading = useUiStore((state) => state.setGlobalLoading)
  const sideNavOpened = useUiStore((state) => state.sideNavOpened)
  const toggleSideNav = useUiStore((state) => state.toggleSideNav)

  return (
    <Stack gap="lg">
      <Variant label="globalLoading — 전역 로딩 오버레이">
        <Stack gap="sm">
          <Group>
            <SdButton.Outline
              onClick={() => {
                setGlobalLoading(true)
                setTimeout(() => setGlobalLoading(false), 1500)
              }}
            >
              1.5초 동안 켜기
            </SdButton.Outline>
            <StateRow label="globalLoading" value={globalLoading} />
          </Group>
          <Box pos="relative" mih={120}>
            <LoadingOverlay visible={globalLoading} zIndex={1} />
            <Paper withBorder radius="md" p="lg" h="100%">
              <SdText.Body>
                오버레이가 덮는 영역입니다. 실제 앱에서는 레이아웃 최상단에 하나 두고 라우트
                전환·일괄 작업 동안 켭니다.
              </SdText.Body>
            </Paper>
          </Box>
        </Stack>
      </Variant>

      <Variant label="sideNavOpened — 관리자형 레이아웃의 사이드 내비">
        <Stack gap="sm">
          <Group>
            <SdButton.Outline onClick={toggleSideNav}>토글</SdButton.Outline>
            <StateRow label="sideNavOpened" value={sideNavOpened} />
          </Group>
          <Group align="stretch" gap={0} wrap="nowrap" mih={120}>
            <Paper
              withBorder
              radius="md"
              p="sm"
              w={sideNavOpened ? 200 : 56}
              style={{ transition: 'width 0.2s ease', overflow: 'hidden' }}
            >
              <SdText.Sub>{sideNavOpened ? '사이드 내비 (열림)' : '≡'}</SdText.Sub>
            </Paper>
            <Box p="sm" style={{ flex: 1 }}>
              <SdText.Body>본문 영역</SdText.Body>
            </Box>
          </Group>
        </Stack>
      </Variant>

      <Paper withBorder radius="md" p="lg" bg="slate.0">
        <SdText.Sub>
          `SdHeader`의 모바일 드로어는 일부러 이 스토어를 쓰지 않습니다. 한 페이지에 헤더가 둘
          이상 렌더되면(카탈로그의 Mega/Simple 쇼케이스처럼) 드로어가 함께 열리기 때문에, 그건
          인스턴스 로컬 상태로 남겨 두었습니다.
        </SdText.Sub>
      </Paper>
    </Stack>
  )
}

/* ─────────────────────────────────────────────
   useSdForm — 값·검증·제출을 한 묶음으로.
   같은 formId를 쓰는 두 컴포넌트가 상태를 공유하는 것도 함께 보여준다.
───────────────────────────────────────────── */
const CONTACT_FORM_ID = 'catalog-contact'
const contactInitialValues = {
  name: '',
  email: '',
  // 값 자체를 주는 입력(Select·Number·Date)도 같은 getInputProps로 붙는다.
  type: null as string | null,
  budget: '' as number | string,
  startDate: null as string | null,
  message: '',
  agree: false,
}

/** 제출이 끝나면 첫 입력칸으로 커서를 돌려놓는다 — 인자를 받지 않는 평범한 함수다. */
function focusFirstField() {
  document.querySelector<HTMLInputElement>(`#${CONTACT_FORM_ID} input`)?.focus()
}

function ContactForm({ shouldFail, onLog }: { shouldFail: boolean; onLog: (line: string) => void }) {
  const form = useSdForm({
    id: CONTACT_FORM_ID,
    initialValues: contactInitialValues,
    rules: {
      name: formRules.required('이름을 입력하세요.'),
      email: formRules.email(),
      type: formRules.required('문의 유형을 선택하세요.'),
      message: formRules.minLength(10, '10자 이상 입력하세요.'),
      agree: formRules.checked('개인정보 수집에 동의해야 합니다.'),
    },
    successMessage: '문의를 접수했습니다.',
    resetOnSuccess: true,
    onSubmit: async () => {
      // 실제 앱이라면 여기서 fetch. 예외를 던지면 실패 경로로 간다.
      await new Promise((resolve) => setTimeout(resolve, 1200))
      if (shouldFail) throw new Error('서버가 응답하지 않습니다. (데모용 실패)')
    },
    // 결과에 따라 갈라지는 일은 onSuccess / onError에.
    onSuccess: () => onLog('onSuccess — 성공 경로'),
    onError: () => onLog('onError — 실패 경로'),
    // 성공이든 실패든 항상 도는 뒷정리. 인자를 받지 않으므로 기존 함수를 그대로 넘긴다.
    finalize: [() => onLog('finalize — 정리 실행'), focusFirstField],
  })

  return (
    <form id={CONTACT_FORM_ID} onSubmit={form.onSubmit}>
      <Stack gap="md">
        {form.error && <SdText.Error>{form.error}</SdText.Error>}
        <SdInput.Text label="이름" placeholder="홍길동" {...form.getInputProps('name')} />
        <SdInput.Email
          label="이메일"
          placeholder="name@example.com"
          {...form.getInputProps('email')}
        />
        <SdInput.Select
          label="문의 유형"
          placeholder="선택하세요"
          data={['도입 문의', '기술 지원', '제휴']}
          {...form.getInputProps('type')}
        />
        <SdInput.Number label="예산(만원)" min={0} {...form.getInputProps('budget')} />
        <SdInput.Date
          label="희망 시작일"
          placeholder="YYYY-MM-DD"
          {...form.getInputProps('startDate')}
        />
        <SdInput.Textarea
          label="문의 내용"
          placeholder="10자 이상 입력하세요."
          {...form.getInputProps('message')}
        />
        <Checkbox
          size="xs"
          label="개인정보 수집·이용에 동의합니다."
          {...form.getInputProps('agree', { type: 'checkbox' })}
        />
        <Group>
          <SdButton.Submit type="submit" loading={form.submitting}>
            문의 보내기
          </SdButton.Submit>
          <SdButton.Cancel type="button" onClick={form.reset} disabled={form.submitting}>
            초기화
          </SdButton.Cancel>
        </Group>
      </Stack>
    </form>
  )
}

/** 같은 formId를 읽는 별개 컴포넌트 — 스토어 기반이라 입력이 그대로 비친다. */
function ContactMirror() {
  const form = useSdForm({
    id: CONTACT_FORM_ID,
    initialValues: contactInitialValues,
    onSubmit: () => undefined,
  })

  return (
    <Paper withBorder radius="md" p="lg">
      <Stack gap="sm">
        <SdTitle.Sub>같은 formId를 읽는 다른 컴포넌트</SdTitle.Sub>
        <StateRow label="values.name" value={form.values.name || null} />
        <StateRow label="values.type" value={form.values.type} />
        <StateRow label="values.budget" value={String(form.values.budget || '') || null} />
        <StateRow label="values.startDate" value={form.values.startDate} />
        <StateRow label="values.agree" value={form.values.agree} />
        <StateRow label="submitting" value={form.submitting} />
        <SdText.Sub>
          이 패널은 왼쪽 폼과 아무 prop도 주고받지 않습니다. `useSdForm({'{'} id: &apos;
          {CONTACT_FORM_ID}&apos; {'}'})`로 같은 칸을 읽을 뿐입니다 — 마법사 단계 분리나 페이지를
          오간 뒤 입력값 복원이 이 구조로 해결됩니다.
        </SdText.Sub>
      </Stack>
    </Paper>
  )
}

function FormDemo() {
  const [shouldFail, setShouldFail] = useState(false)
  const [log, setLog] = useState<string[]>([])

  return (
    <Stack gap="lg">
      <Checkbox
        size="xs"
        label="전송 실패 시뮬레이션 — onSubmit이 예외를 던지게 합니다"
        checked={shouldFail}
        onChange={(event) => setShouldFail(event.currentTarget.checked)}
      />
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        <Paper withBorder radius="md" p="lg">
          <ContactForm
            shouldFail={shouldFail}
            onLog={(line) =>
              setLog((prev) =>
                [`${new Date().toLocaleTimeString('ko-KR')} · ${line}`, ...prev].slice(0, 6),
              )
            }
          />
        </Paper>
        <Stack gap="lg">
          <ContactMirror />
          <Paper withBorder radius="md" p="lg">
            <Stack gap="xs">
              <SdTitle.Sub>제출 콜백 기록</SdTitle.Sub>
              {log.length === 0 ? (
                <SdText.Hint>아직 제출하지 않았습니다.</SdText.Hint>
              ) : (
                log.map((line) => <SdText.Sub key={line}>{line}</SdText.Sub>)
              )}
              <SdText.Hint>
                onSuccess / onError는 결과에 따라 갈리고, finalize는 둘 중 무엇이든 그 뒤에 항상
                돕니다. 검증에서 걸려 전송을 하지 않은 경우에는 셋 다 남지 않습니다.
              </SdText.Hint>
            </Stack>
          </Paper>
        </Stack>
      </SimpleGrid>

      <Paper withBorder radius="md" p="lg" bg="slate.0">
        <Stack gap="xs">
          <SdText.Strong>확인해 볼 것</SdText.Strong>
          <SdText.Sub>
            빈 값으로 제출하면 규칙(`formRules`)이 걸려 필드 아래 메시지가 붙고, 값을 고치는 즉시
            그 필드의 에러만 사라집니다.
          </SdText.Sub>
          <SdText.Sub>
            이벤트를 주는 입력(Text·Textarea·Checkbox)과 값을 주는 입력(Select·Number·Date)이
            섞여 있지만 호출부는 모두 {'`{...form.getInputProps(name)}`'} 한 줄입니다 — 차이는
            훅에서 흡수합니다.
          </SdText.Sub>
          <SdText.Sub>
            정상 제출하면 1.2초 동안 버튼이 로딩 상태가 되고(그 사이 재클릭은 무시됩니다) 성공
            토스트 + 폼 초기화까지 자동으로 이어집니다.
          </SdText.Sub>
          <SdText.Sub>
            위 체크박스를 켜고 제출하면 실패 경로를 볼 수 있습니다 — `onSubmit`이 던진 예외가
            에러 토스트와 폼 상단 메시지로 나타나고, 폼은 초기화되지 않습니다.
          </SdText.Sub>
          <SdText.Sub>
            `finalize`는 성공이든 실패든 항상 돕니다. 인자를 받지 않는 공용 타입(`Finalizers`)이라
            기존 함수를 그대로 꽂을 수 있고, 이 데모는 배열로 두 개(기록 남기기 · 첫 입력칸으로
            포커스 되돌리기)를 넘겼습니다. 라우팅·모달 닫기·목록 새로고침이 여기 들어갑니다.
          </SdText.Sub>
        </Stack>
      </Paper>
    </Stack>
  )
}

export default function StateCatalog() {
  return (
    <SdContainer py="xl">
      <Stack gap={64}>
        <SdTextBoxSection
          label="State"
          title="상태 관리"
          description="전역 클라이언트 상태는 Zustand 스토어로 표준화되어 있습니다. Provider가 없으므로 어디서든 훅으로 바로 읽고 씁니다."
        />

        <Showcase
          name="useAuthStore"
          description="인증 세션. 로그인 폼과 세션 패널이 같은 스토어를 공유하며, localStorage에 사용자 프로필만 저장합니다."
          exports={['useAuthStore', 'useAuthHydrated', 'AuthUser']}
        >
          <AuthDemo />
        </Showcase>

        <Showcase
          name="useSdForm"
          description="모든 폼이 공유하는 상태 + 제출 파이프라인. 검증 → 중복 제출 차단 → 전송 → 성공/실패 토스트 → 초기화까지 한 훅으로 흐릅니다. formId로 칸을 나눠 쓰므로 같은 id면 컴포넌트끼리 상태를 공유합니다."
          exports={['useSdForm', 'formRules', 'useFormStore']}
        >
          <FormDemo />
        </Showcase>

        <Showcase
          name="useUiStore"
          description="화면 간 공유가 필요한 UI 상태 — 전역 로딩 오버레이와 사이드 내비 열림 상태."
          exports={['useUiStore']}
        >
          <UiDemo />
        </Showcase>
      </Stack>
    </SdContainer>
  )
}
