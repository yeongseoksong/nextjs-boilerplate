'use client'

import { ChangeEvent, FormEvent, ReactNode, useCallback, useEffect, useMemo } from 'react'
import { create } from 'zustand'
import { SdToast } from '../ui/atom/Toast'
import { Finalizers, runFinalizers } from '../util/finalize.util'

/**
 * 모든 폼이 공유하는 상태 + 제출 파이프라인.
 *
 * 폼 하나하나가 `useState`로 값·에러·제출중 여부를 따로 들고 있으면 제출 처리(중복
 * 클릭 차단, 성공/실패 알림, 성공 후 초기화)가 폼마다 조금씩 달라진다. 그 셋을 여기
 * 한 곳에 묶어 두고, 화면은 `useSdForm()` 하나만 부르면 되게 한다.
 *
 * 스토어는 `formId`로 칸을 나눠 쓰므로 한 화면에 폼이 여러 개 떠 있어도 섞이지 않고,
 * 반대로 **같은 id를 쓰면 서로 다른 컴포넌트가 같은 폼을 공유**한다(마법사 단계 분리,
 * 페이지를 오간 뒤 입력값 복원 등).
 */

export type FormValues = Record<string, unknown>

/** 값이 유효하면 `null`, 아니면 사용자에게 보여줄 메시지를 돌려준다. */
export type FormRule<V extends FormValues> = (value: unknown, values: V) => string | null

export type FormErrors<V extends FormValues> = Partial<Record<keyof V, string>>

interface FormEntry {
  values: FormValues
  errors: Record<string, string>
  submitting: boolean
  /** 제출 실패 메시지 — 폼 상단에 노출한다. 필드 에러는 `errors`가 담는다. */
  error: ReactNode | null
}

const EMPTY_ERRORS: Record<string, string> = {}

/**
 * onChange가 넘겨준 것에서 실제 값을 꺼낸다.
 *
 * Mantine 입력은 두 갈래다 — TextInput·Checkbox처럼 **이벤트**를 주는 것과
 * Select·NumberInput·Slider·DateInput처럼 **값 자체**를 주는 것. 호출부가 그 차이를
 * 신경 쓰지 않도록 여기서 한 번에 흡수한다(체크박스는 `value` 대신 `checked`를 읽는다).
 */
function readChangePayload(payload: unknown): unknown {
  if (payload && typeof payload === 'object' && 'currentTarget' in payload) {
    const target = (payload as ChangeEvent<HTMLInputElement>).currentTarget
    if (target && typeof target === 'object' && 'value' in target) {
      return target.type === 'checkbox' ? target.checked : target.value
    }
  }
  return payload
}

interface FormStoreState {
  forms: Record<string, FormEntry>
  /** 첫 마운트 시 초기값을 심는다. 이미 있으면 건드리지 않는다(입력값 보존). */
  ensureForm: (formId: string, initialValues: FormValues) => void
  setValue: (formId: string, name: string, value: unknown) => void
  setValues: (formId: string, values: FormValues) => void
  setErrors: (formId: string, errors: Record<string, string>) => void
  setSubmitting: (formId: string, submitting: boolean) => void
  setError: (formId: string, error: ReactNode | null) => void
  resetForm: (formId: string, initialValues: FormValues) => void
  /** 폼 칸 자체를 버린다 — 값까지 지우고 싶을 때만. */
  removeForm: (formId: string) => void
}

function blankEntry(values: FormValues): FormEntry {
  return { values, errors: {}, submitting: false, error: null }
}

/** 폼 하나만 갱신하고 나머지 칸은 그대로 둔다. */
function patch(state: FormStoreState, formId: string, next: Partial<FormEntry>): FormStoreState {
  const current = state.forms[formId]
  if (!current) return state
  return { ...state, forms: { ...state.forms, [formId]: { ...current, ...next } } }
}

export const useFormStore = create<FormStoreState>()((set) => ({
  forms: {},

  ensureForm: (formId, initialValues) =>
    set((state) =>
      state.forms[formId]
        ? state
        : { ...state, forms: { ...state.forms, [formId]: blankEntry(initialValues) } },
    ),

  setValue: (formId, name, value) =>
    set((state) => {
      const current = state.forms[formId]
      if (!current) return state
      // 값을 고치면 그 필드의 에러는 바로 걷어낸다 — 고쳤는데 빨간 글씨가 남아 있지 않도록.
      const { [name]: _removed, ...restErrors } = current.errors
      return patch(state, formId, {
        values: { ...current.values, [name]: value },
        errors: restErrors,
      })
    }),

  setValues: (formId, values) =>
    set((state) => {
      const current = state.forms[formId]
      if (!current) return state
      return patch(state, formId, { values: { ...current.values, ...values } })
    }),

  setErrors: (formId, errors) => set((state) => patch(state, formId, { errors })),
  setSubmitting: (formId, submitting) => set((state) => patch(state, formId, { submitting })),
  setError: (formId, error) => set((state) => patch(state, formId, { error })),

  resetForm: (formId, initialValues) =>
    set((state) => ({ ...state, forms: { ...state.forms, [formId]: blankEntry(initialValues) } })),

  removeForm: (formId) =>
    set((state) => {
      const { [formId]: _removed, ...rest } = state.forms
      return { ...state, forms: rest }
    }),
}))

export interface SdFormOptions<V extends FormValues> {
  /** 스토어에서 이 폼이 쓸 칸의 이름. 같은 id를 쓰는 컴포넌트끼리는 상태를 공유한다. */
  id: string
  initialValues: V
  /** 필드별 검증 규칙. 제출 시 한 번에 돌린다. */
  rules?: Partial<Record<keyof V, FormRule<V>>>
  /** 실제 전송. 예외를 던지면 실패로 처리된다(에러 토스트 + 폼 상단 메시지). */
  onSubmit: (values: V) => void | Promise<void>
  /** 성공 토스트 메시지. `false`면 토스트를 띄우지 않는다. */
  successMessage?: ReactNode | false
  /** 실패 메시지 변환. 기본값은 `Error.message`, 없으면 일반 문구. */
  errorMessage?: (error: unknown) => ReactNode
  /** 성공 후 초기값으로 되돌릴지 */
  resetOnSuccess?: boolean
  onSuccess?: (values: V) => void
  /** 전송이 실패했을 때. 예외를 그대로 받는다. */
  onError?: (error: unknown) => void
  /**
   * 성공·실패와 무관하게 전송이 끝나면 **항상** 실행된다 — `finally`에 해당한다.
   * 라우팅, 모달 닫기, 목록 새로고침처럼 결과와 무관한 뒷정리 자리다.
   *
   * 타입은 폼 전용이 아니라 공용 `Finalizers`(`util/finalize.util.ts`)다 — 인자를 받지
   * 않으므로 기존 함수를 그대로 꽂고(`finalize: closeModal`), 여러 개는 배열로 묶는다.
   * 결과에 따라 갈라져야 하는 일은 `onSuccess` / `onError`에 둔다.
   *
   * 검증에서 걸려 전송 자체를 하지 않은 경우에는 실행되지 않는다(아직 "끝난" 게 아니다).
   * `submitting`이 내려간 **뒤에** 실행되므로, 여기서 `reset()`이나 다른 제출을 불러도 안전하다.
   */
  finalize?: Finalizers
}

export interface SdFormApi<V extends FormValues> {
  values: V
  errors: FormErrors<V>
  /** 전송 중 — 버튼 `loading`에 그대로 넘긴다. 이 동안 재제출은 무시된다. */
  submitting: boolean
  /** 제출 실패 메시지 */
  error: ReactNode | null
  setValue: <K extends keyof V>(name: K, value: V[K]) => void
  setValues: (values: Partial<V>) => void
  reset: () => void
  /** Mantine 입력 컴포넌트에 펼쳐 넣는다. 체크박스는 `{ type: 'checkbox' }`. */
  getInputProps: (
    name: keyof V,
    options?: { type?: 'input' | 'checkbox' },
  ) => Record<string, unknown>
  /** `<form onSubmit={...}>`에 그대로 넘긴다. */
  onSubmit: (event?: FormEvent<HTMLFormElement>) => void
}

/**
 * 폼 하나를 스토어에 붙이고, 값·에러·제출을 한 묶음으로 돌려준다.
 *
 * 제출은 항상 같은 순서로 흐른다:
 * 검증 → (통과 시) submitting on → `onSubmit` → 성공 토스트·초기화·`onSuccess`
 * → 실패 시 에러 토스트 + 상단 메시지·`onError` → submitting off → `finalize`.
 */
export function useSdForm<V extends FormValues>({
  id,
  initialValues,
  rules,
  onSubmit,
  successMessage,
  errorMessage,
  resetOnSuccess,
  onSuccess,
  onError,
  finalize,
}: SdFormOptions<V>): SdFormApi<V> {
  const entry = useFormStore((state) => state.forms[id])
  const store = useFormStore

  // 렌더 중에 스토어를 건드리지 않는다 — 칸이 아직 없으면 초기값을 그대로 읽고,
  // 실제 생성은 이펙트에서 한다. 첫 렌더부터 값이 정의돼 있어 controlled 경고도 없다.
  useEffect(() => {
    store.getState().ensureForm(id, initialValues)
    // initialValues는 매 렌더 새 객체일 수 있으므로 id만 본다. 초기값 변경은 reset()으로.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const values = (entry?.values ?? initialValues) as V
  const errors = (entry?.errors ?? EMPTY_ERRORS) as FormErrors<V>
  const submitting = entry?.submitting ?? false
  const error = entry?.error ?? null

  const setValue = useCallback(
    <K extends keyof V>(name: K, value: V[K]) =>
      store.getState().setValue(id, String(name), value),
    [id, store],
  )

  const setValues = useCallback(
    (next: Partial<V>) => store.getState().setValues(id, next as FormValues),
    [id, store],
  )

  const reset = useCallback(
    () => store.getState().resetForm(id, initialValues),
    // initialValues 참조가 바뀌어도 reset의 의미는 같다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id, store],
  )

  const getInputProps = useCallback(
    (name: keyof V, options?: { type?: 'input' | 'checkbox' }) => {
      const key = String(name)
      const fieldError = errors[name]
      const current = values[name]
      const onChange = (payload: unknown) =>
        store.getState().setValue(id, key, readChangePayload(payload))

      if (options?.type === 'checkbox') {
        return { checked: Boolean(current), error: fieldError, onChange }
      }

      return {
        // undefined일 때만 ''로 메운다 — null은 그대로 둬야 Select·Date가 "값 없음"으로 읽는다.
        value: current === undefined ? '' : current,
        error: fieldError,
        onChange,
      }
    },
    [errors, id, store, values],
  )

  const handleSubmit = useCallback(
    async (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault()

      const state = store.getState()
      const current = state.forms[id]
      // 중복 제출 차단 — 응답이 오기 전 재클릭은 무시한다.
      if (current?.submitting) return

      const currentValues = (current?.values ?? initialValues) as V

      if (rules) {
        const found: Record<string, string> = {}
        for (const [name, rule] of Object.entries(rules)) {
          const message = rule?.(currentValues[name], currentValues)
          if (message) found[name] = message
        }
        if (Object.keys(found).length > 0) {
          state.setErrors(id, found)
          return
        }
      }

      state.setErrors(id, {})
      state.setError(id, null)
      state.setSubmitting(id, true)

      try {
        await onSubmit(currentValues)
        if (successMessage !== false) SdToast.Success(successMessage ?? '저장했습니다.')
        if (resetOnSuccess) state.resetForm(id, initialValues)
        onSuccess?.(currentValues)
      } catch (caught) {
        const message =
          errorMessage?.(caught) ??
          (caught instanceof Error ? caught.message : '요청을 처리하지 못했습니다.')
        state.setError(id, message)
        SdToast.Error(message)
        onError?.(caught)
      } finally {
        // resetForm이 새 칸을 만들었더라도 submitting은 항상 내려간다.
        store.getState().setSubmitting(id, false)
        // submitting을 내린 뒤에 부른다 — finalize에서 reset이나 재제출을 해도 막히지 않도록.
        await runFinalizers(finalize, 'useSdForm')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      id,
      store,
      rules,
      onSubmit,
      successMessage,
      errorMessage,
      resetOnSuccess,
      onSuccess,
      onError,
      finalize,
    ],
  )

  return useMemo(
    () => ({
      values,
      errors,
      submitting,
      error,
      setValue,
      setValues,
      reset,
      getInputProps,
      onSubmit: handleSubmit,
    }),
    [values, errors, submitting, error, setValue, setValues, reset, getInputProps, handleSubmit],
  )
}

/**
 * 자주 쓰는 검증 규칙. `rules`에 그대로 꽂아 쓴다.
 *
 * ```ts
 * rules: { email: formRules.email(), password: formRules.minLength(8) }
 * ```
 */
export const formRules = {
  required:
    <V extends FormValues>(message = '필수 입력 항목입니다.'): FormRule<V> =>
    (value) =>
      value === undefined || value === null || String(value).trim() === '' ? message : null,

  email:
    <V extends FormValues>(message = '이메일 형식이 올바르지 않습니다.'): FormRule<V> =>
    (value) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '')) ? null : message,

  minLength:
    <V extends FormValues>(length: number, message?: string): FormRule<V> =>
    (value) =>
      String(value ?? '').length >= length ? null : (message ?? `${length}자 이상 입력하세요.`),

  /** 체크박스 동의 — 반드시 true여야 한다. */
  checked:
    <V extends FormValues>(message = '동의가 필요합니다.'): FormRule<V> =>
    (value) =>
      value === true ? null : message,

  /** 다른 필드와 같은 값인지 — 비밀번호 확인 등. */
  sameAs:
    <V extends FormValues>(other: keyof V, message = '값이 일치하지 않습니다.'): FormRule<V> =>
    (value, values) =>
      value === values[other] ? null : message,
}
