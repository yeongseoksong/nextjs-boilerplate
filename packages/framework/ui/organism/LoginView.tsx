'use client'

import { Box, Center, Checkbox, Divider, Group, Paper, SimpleGrid, Stack } from '@mantine/core'
import {
  IconBrandApple,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandKakaoTalk,
  IconCircleLetterN,
  IconLogin2,
} from '@tabler/icons-react'
import { FormEvent, ReactNode } from 'react'
import { SdButton } from '../atom/Button'
import { SdInput } from '../atom/Input'
import { SdLink } from '../atom/Link'
import { SdText } from '../atom/Text'
import { Logo } from '../atom/Logo'
import { SdTextBox } from '../molecule/TextBox'
import { brandDotTexture, brandSurface } from '../surface'

/** 소셜 로그인 제공자 — 아이콘·기본 라벨이 고정된 목록. */
type LoginProvider = 'google' | 'kakao' | 'naver' | 'apple' | 'github'

interface LoginSocial {
  provider: LoginProvider
  /** 버튼 라벨. 생략하면 제공자 기본 라벨("구글로 로그인" 등)을 쓴다. */
  label?: ReactNode
  /** OAuth 시작 핸들러. 리다이렉트가 필요하면 여기서 이동시킨다. */
  onClick?: () => void
}

/** 폼 제출 값. 비제어 폼이라 소비자는 이 값만 받아 인증 로직을 붙이면 된다. */
interface LoginValues {
  email: string
  password: string
  remember: boolean
}

interface SdLoginViewProps {
  title?: ReactNode
  description?: ReactNode
  /** 제출 시 폼 값 전달. 소비자가 인증 호출을 담당한다. */
  onSubmit?: (values: LoginValues) => void
  /** 제출 버튼 로딩 상태 */
  loading?: boolean
  /** 인증 실패 메시지 — 폼 상단에 SdText.Error로 노출 */
  error?: ReactNode
  submitLabel?: ReactNode
  /** 자동 로그인 체크박스 노출 여부 */
  withRemember?: boolean
  /** 비밀번호 찾기 링크. 없으면 렌더하지 않는다. */
  findPasswordHref?: string
  /** 회원가입 링크. 없으면 하단 안내가 사라진다. */
  signUpHref?: string
  /** 소셜 로그인 버튼. 비어 있으면 구분선까지 함께 사라진다. */
  socials?: LoginSocial[]
  /** 폼 아래 추가 슬롯 — 약관 안내·사업자 정보 등 */
  children?: ReactNode
  /** 화면 최소 높이. 카탈로그처럼 좁은 프레임에 담을 때 줄인다. */
  mih?: string | number
}

const SOCIAL_META: Record<LoginProvider, { Icon: typeof IconBrandGoogle; label: string }> = {
  google: { Icon: IconBrandGoogle, label: '구글로 로그인' },
  kakao: { Icon: IconBrandKakaoTalk, label: '카카오로 로그인' },
  naver: { Icon: IconCircleLetterN, label: '네이버로 로그인' },
  apple: { Icon: IconBrandApple, label: '애플로 로그인' },
  github: { Icon: IconBrandGithub, label: '깃허브로 로그인' },
}

/* ─────────────────────────────────────────────
   폼 본체 — Card / Split이 공유한다.
───────────────────────────────────────────── */
function LoginForm({
  onSubmit,
  loading,
  error,
  submitLabel = '로그인',
  withRemember = true,
  findPasswordHref,
  signUpHref,
  socials,
  children,
}: Omit<SdLoginViewProps, 'title' | 'description' | 'mih'>) {
  /*
    비제어 폼 + FormData.
    @mantine/form을 의존성으로 들이지 않고도 소비자가 값을 온전히 받게 하려는 선택이다.
    검증·상태가 필요한 소비자는 name이 같은 자체 폼을 쓰거나 onSubmit에서 처리한다.
  */
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit?.({
      email: String(data.get('email') ?? ''),
      password: String(data.get('password') ?? ''),
      remember: data.get('remember') === 'on',
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack gap="md">
        {error && <SdText.Error>{error}</SdText.Error>}

        <SdInput.Email
          name="email"
          label="이메일"
          placeholder="name@example.com"
          autoComplete="email"
          required
        />
        <SdInput.Password
          name="password"
          label="비밀번호"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          required
        />

        {(withRemember || findPasswordHref) && (
          <Group justify="space-between" align="center" wrap="nowrap">
            {withRemember ? (
              <Checkbox name="remember" size="xs" label="자동 로그인" />
            ) : (
              <span />
            )}
            {findPasswordHref && (
              <SdLink.Sub href={findPasswordHref}>비밀번호를 잊으셨나요?</SdLink.Sub>
            )}
          </Group>
        )}

        <SdButton.Primary
          type="submit"
          fullWidth
          loading={loading}
          leftSection={<IconLogin2 size={16} />}
        >
          {submitLabel}
        </SdButton.Primary>

        {socials && socials.length > 0 && (
          <>
            <Divider label="또는" labelPosition="center" />
            <Stack gap="xs">
              {socials.map((social) => {
                const { Icon, label } = SOCIAL_META[social.provider]
                return (
                  <SdButton.Outline
                    key={social.provider}
                    color="slate"
                    fullWidth
                    type="button"
                    onClick={social.onClick}
                    leftSection={<Icon size={16} />}
                  >
                    {social.label ?? label}
                  </SdButton.Outline>
                )
              })}
            </Stack>
          </>
        )}

        {signUpHref && (
          <Group gap={6} justify="center">
            <SdText.Sub>아직 계정이 없으신가요?</SdText.Sub>
            <SdLink.Sub href={signUpHref} c="primary.6">
              회원가입
            </SdLink.Sub>
          </Group>
        )}

        {children}
      </Stack>
    </form>
  )
}

/** 로고 + 제목/설명. 폼 위 헤더 블록. */
function FormHeader({ title, description }: Pick<SdLoginViewProps, 'title' | 'description'>) {
  return (
    <Stack gap="lg">
      <Logo size="sm" />
      <SdTextBox.Card title={title} description={description ?? ''} />
    </Stack>
  )
}

/* ─────────────────────────────────────────────
   SdLoginView.Card — 중앙 정렬 카드 (기본)
───────────────────────────────────────────── */
function Card({
  title = '로그인',
  description = '%c 서비스를 이용하려면 로그인해 주세요.',
  mih = '100svh',
  ...formProps
}: SdLoginViewProps) {
  return (
    <Center mih={mih} bg="slate.0" p="md">
      <Paper w="100%" maw={420} p={{ base: 'lg', sm: 'xl' }} radius="lg" withBorder shadow="sm">
        <Stack gap="xl">
          <FormHeader title={title} description={description} />
          <LoginForm {...formProps} />
        </Stack>
      </Paper>
    </Center>
  )
}

/* ─────────────────────────────────────────────
   SdLoginView.Split — 좌측 브랜드 패널 + 우측 폼
   좁은 화면에서는 브랜드 패널을 감추고 폼만 남긴다.
───────────────────────────────────────────── */
interface SdLoginSplitProps extends SdLoginViewProps {
  brandTitle?: ReactNode
  brandDescription?: ReactNode
}

function Split({
  title = '로그인',
  description = '계정 정보를 입력해 주세요.',
  brandTitle = '%c',
  brandDescription = '하나의 계정으로 모든 서비스를 이용하세요.',
  mih = '100svh',
  ...formProps
}: SdLoginSplitProps) {
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0} mih={mih}>
      {/* 브랜드 패널 — PageLayout.Brand와 같은 면(ui/surface.ts)을 쓴다. */}
      <Box
        visibleFrom="md"
        pos="relative"
        style={{ overflow: 'hidden', display: 'flex', alignItems: 'flex-end', ...brandSurface }}
      >
        <Box aria-hidden pos="absolute" inset={0} style={brandDotTexture} />
        <Box pos="relative" p={48} style={{ zIndex: 1, width: '100%' }}>
          <SdTextBox.Hero
            title={brandTitle}
            description={brandDescription}
            gap="sm"
            maxDescWidth={420}
            ta="left"
            align="flex-start"
          />
        </Box>
      </Box>

      <Center p={{ base: 'md', sm: 'xl' }} bg="white">
        <Stack gap="xl" w="100%" maw={400}>
          <FormHeader title={title} description={description} />
          <LoginForm {...formProps} />
        </Stack>
      </Center>
    </SimpleGrid>
  )
}

export const SdLoginView = {
  /** 중앙 정렬 카드 — 기본 로그인 화면 */
  Card,
  /** 좌측 브랜드 패널 + 우측 폼 — 넓은 화면용 */
  Split,
}

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdLoginViewCard = SdLoginView.Card
export const SdLoginViewSplit = SdLoginView.Split
