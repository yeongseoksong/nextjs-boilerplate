'use client'

import { Notifications, NotificationsProps, notifications } from '@mantine/notifications'
import type { NotificationData } from '@mantine/notifications'
import { IconAlertTriangle, IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react'
import { ReactNode } from 'react'

/**
 * 변형별 색·아이콘·기본 제목. 토스트의 유일한 출처다.
 *
 * `SdToast.Update`가 같은 맵을 읽어 이미 떠 있는 알림을 다른 변형으로 바꾸므로,
 * 톤을 고치려면 여기만 고치면 된다.
 */
const toastStyles = {
  /** 성공 — 저장·전송 완료 */
  Success: { color: 'green', icon: <IconCheck size={18} />, title: '완료' },
  /** 실패 — 요청 오류·검증 실패 */
  Error: { color: 'red', icon: <IconX size={18} />, title: '오류' },
  /** 주의 — 되돌릴 수 없는 동작 안내 등 */
  Warning: { color: 'amber', icon: <IconAlertTriangle size={18} />, title: '주의' },
  /** 안내 — 중립 정보 */
  Info: { color: 'primary', icon: <IconInfoCircle size={18} />, title: '안내' },
  /** 진행 중 — 스피너 + 자동 닫힘 없음. Update로 결과 변형으로 바꾼다. */
  Loading: { loading: true, autoClose: false, withCloseButton: false, title: '처리 중' },
} satisfies Record<string, Partial<NotificationData>>

type ToastVariant = keyof typeof toastStyles

/**
 * @param defaults 변형이 고정하는 색·아이콘·제목
 * @returns `(message, options?) => id` — options가 뒤에 펼쳐지므로 호출부에서
 *          제목·색·autoClose를 덮어쓸 수 있다. 반환된 id는 Update/Hide에 쓴다.
 */
function createToast(defaults: Partial<NotificationData>) {
  return function SdToast(message: ReactNode, options?: Partial<NotificationData>): string {
    return notifications.show({ ...defaults, message, ...options })
  }
}

export const SdToast = {
  Success: createToast(toastStyles.Success),
  Error: createToast(toastStyles.Error),
  Warning: createToast(toastStyles.Warning),
  Info: createToast(toastStyles.Info),
  Loading: createToast(toastStyles.Loading),

  /**
   * 이미 떠 있는 알림을 다른 변형으로 교체한다 — `Loading` → `Success`/`Error` 전환용.
   * `loading: false`·`autoClose`를 먼저 깔아 두므로 스피너가 그대로 남지 않는다.
   */
  Update: (
    id: string,
    variant: ToastVariant,
    message: ReactNode,
    options?: Partial<NotificationData>,
  ) =>
    notifications.update({
      id,
      loading: false,
      autoClose: 4000,
      withCloseButton: true,
      ...toastStyles[variant],
      message,
      ...options,
    }),

  /** 특정 알림 닫기 */
  Hide: (id: string) => notifications.hide(id),
  /** 떠 있는 알림 전부 닫기 */
  Clean: () => notifications.clean(),
}

/**
 * 토스트가 실제로 렌더되는 곳. `MantineProvider` 안에 **한 번** 놓는다.
 * 이게 없으면 `SdToast.*` 호출은 조용히 아무 일도 하지 않는다.
 * 소비자 앱에서 `@mantine/notifications/styles.css` 임포트도 필요하다.
 */
export function SdToastProvider(props: NotificationsProps) {
  return <Notifications position="top-right" autoClose={4000} limit={3} {...props} />
}

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
// (토스트는 이벤트 핸들러에서만 호출되므로 실제로는 클라이언트 전용이다.)
export const SdToastSuccess = SdToast.Success
export const SdToastError = SdToast.Error
export const SdToastWarning = SdToast.Warning
export const SdToastInfo = SdToast.Info
export const SdToastLoading = SdToast.Loading
export const SdToastUpdate = SdToast.Update
export const SdToastHide = SdToast.Hide
export const SdToastClean = SdToast.Clean
