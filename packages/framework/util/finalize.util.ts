/**
 * 어떤 작업이 끝난 뒤 항상 돌려야 하는 뒷정리 — 라우팅, 모달 닫기, 목록 새로고침 등.
 *
 * 폼에 딸린 개념이 아니다. 제출·삭제·업로드처럼 "끝나면 정리한다"가 필요한 곳이면
 * 어느 스토어에서든 같은 타입과 실행기를 쓴다.
 */

/**
 * 뒷정리 함수. **인자를 받지 않는다** — 대개 결과와 무관한 정리·이동이라
 * 기존 함수(`close`, `refetch`, `() => router.push('/')`)를 그대로 꽂을 수 있어야 한다.
 * 반환값은 무시하고, 프로미스면 기다린다.
 */
export type Finalizer = () => unknown | Promise<unknown>

/** 하나 또는 여러 개. 여러 개면 넘긴 순서대로 실행된다. */
export type Finalizers = Finalizer | Finalizer[]

/**
 * `finalize`를 하나든 여러 개든 같은 방식으로 실행한다.
 *
 * 여기서 터진 예외는 **본 작업의 결과를 뒤집지 않는다** — 작업은 이미 끝났고, 뒷정리
 * 하나가 실패했다고 성공 알림을 취소하거나 처리되지 않은 rejection을 만들 이유가 없다.
 * 대신 콘솔에 남겨 개발 중에 눈에 띄게 한다.
 *
 * @param label 콘솔 메시지에 붙일 호출부 이름 (예: `'useSdForm'`)
 */
export async function runFinalizers(finalize: Finalizers | undefined, label = 'finalize') {
  if (!finalize) return

  const list = Array.isArray(finalize) ? finalize : [finalize]
  for (const fn of list) {
    try {
      await fn()
    } catch (caught) {
      console.error(`[${label}] finalize에서 예외가 발생했습니다.`, caught)
    }
  }
}
