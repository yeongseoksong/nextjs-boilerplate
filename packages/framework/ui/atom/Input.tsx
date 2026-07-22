'use client'

import {
  Autocomplete,
  AutocompleteProps,
  Checkbox,
  CheckboxProps,
  ColorInput,
  ColorInputProps,
  FileInput,
  FileInputProps,
  Group,
  Input,
  InputWrapperProps,
  JsonInput,
  JsonInputProps,
  MultiSelect,
  MultiSelectProps,
  NativeSelect,
  NativeSelectProps,
  NumberInput,
  NumberInputProps,
  PasswordInput,
  PasswordInputProps,
  PinInput,
  PinInputProps,
  Radio,
  RadioGroupProps,
  Rating,
  RatingProps,
  SegmentedControl,
  SegmentedControlProps,
  Select,
  SelectProps,
  Slider,
  SliderProps,
  Stack,
  Switch,
  SwitchProps,
  TagsInput,
  TagsInputProps,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from '@mantine/core'
import {
  DateInput,
  DateInputProps,
  DatePickerInput,
  DatePickerInputProps,
  TimeInput,
  TimeInputProps,
} from '@mantine/dates'
import { ComponentType, ReactNode } from 'react'

/**
 * 폼 입력 한 벌.
 *
 * Mantine 입력 컴포넌트를 그대로 통과시키되, **모든 변형이 `label`·`description`·`error`를
 * 같은 방식으로 받도록** 맞춘 것이 이 파일의 존재 이유다. Mantine에서 Slider·Rating·
 * SegmentedControl·PinInput은 라벨/에러 프로퍼티가 없어 폼에 넣으면 나머지와 모양이
 * 어긋나는데, 여기서 `Input.Wrapper`로 감싸 그 차이를 흡수한다.
 *
 * `useSdForm`의 `getInputProps()`를 그대로 펼쳐 넣을 수 있다 — 이벤트를 주는 입력과
 * 값을 주는 입력(Select·Number·Slider·Date 등)을 훅이 알아서 구분한다.
 */

/** 값 자체가 아니라 이벤트를 주는 입력 — pass-through로 충분하다. */
function createInput<P extends object>(Component: ComponentType<P>, defaults?: Partial<P>) {
  return function SdInput(props: P) {
    return <Component {...(defaults as P)} {...props} />
  }
}

/** Input.Wrapper가 대신 받아 주는 필드들. */
type WrapperFields = Pick<
  InputWrapperProps,
  'label' | 'description' | 'error' | 'required' | 'withAsterisk'
>

/**
 * 라벨·에러 프로퍼티가 없는 입력(Slider·Rating·SegmentedControl·PinInput)을
 * `Input.Wrapper`로 감싸 나머지 변형과 같은 API를 갖게 한다.
 *
 * 주의: 감싼 컴포넌트의 `label`은 가려진다. Slider의 값 툴팁처럼 원래 `label`이
 * 다른 뜻인 경우에는 Mantine 컴포넌트를 직접 쓰는 편이 낫다.
 */
function createWrappedInput<P extends object>(Component: ComponentType<P>, defaults?: Partial<P>) {
  return function SdWrappedInput({
    label,
    description,
    error,
    required,
    withAsterisk,
    ...rest
  }: Omit<P, keyof WrapperFields> & WrapperFields) {
    return (
      <Input.Wrapper
        label={label}
        description={description}
        error={error}
        required={required}
        withAsterisk={withAsterisk}
      >
        <Component {...(defaults as P)} {...(rest as unknown as P)} />
      </Input.Wrapper>
    )
  }
}

/** 라디오는 그룹 단위로 쓰인다 — 항목을 `data`로 받아 Select류와 호출부를 맞춘다. */
interface SdRadioProps extends Omit<RadioGroupProps, 'children'> {
  data: { value: string; label: ReactNode; disabled?: boolean }[]
  orientation?: 'horizontal' | 'vertical'
}

function SdInputRadio({ data, orientation = 'horizontal', ...props }: SdRadioProps) {
  const Layout = orientation === 'vertical' ? Stack : Group
  return (
    <Radio.Group {...props}>
      <Layout gap="sm" mt="xs">
        {data.map((item) => (
          <Radio key={item.value} value={item.value} label={item.label} disabled={item.disabled} />
        ))}
      </Layout>
    </Radio.Group>
  )
}

export const SdInput = {
  // ── 텍스트 ──
  /** 일반 텍스트 — 이름, 회사명 등 */
  Text: createInput<TextInputProps>(TextInput),
  /** 이메일 입력 */
  Email: createInput<TextInputProps>(TextInput, { type: 'email' }),
  /** 비밀번호 입력 — 마스킹 토글 포함 */
  Password: createInput<PasswordInputProps>(PasswordInput),
  /** 멀티라인 텍스트 — 문의 메시지 등 */
  Textarea: createInput<TextareaProps>(Textarea, { autosize: true, minRows: 3 }),
  /** JSON 입력 — 포맷·검증 버튼 포함 */
  Json: createInput<JsonInputProps>(JsonInput, { autosize: true, minRows: 4, formatOnBlur: true }),

  // ── 숫자 ──
  /** 숫자 입력 — 증감 컨트롤 포함 */
  Number: createInput<NumberInputProps>(NumberInput),
  /** 범위 선택 슬라이더 */
  Slider: createWrappedInput<SliderProps>(Slider),
  /** 별점 */
  Rating: createWrappedInput<RatingProps>(Rating),
  /** 인증번호 등 자리수가 고정된 코드 */
  PinCode: createWrappedInput<PinInputProps>(PinInput),

  // ── 선택 ──
  /** 드롭다운 선택 */
  Select: createInput<SelectProps>(Select),
  /** 브라우저 기본 select — 모바일·간단한 목록 */
  NativeSelect: createInput<NativeSelectProps>(NativeSelect),
  /** 다중 선택 */
  MultiSelect: createInput<MultiSelectProps>(MultiSelect),
  /** 입력하며 후보를 좁히는 자동완성(자유 입력 허용) */
  Autocomplete: createInput<AutocompleteProps>(Autocomplete),
  /** 자유롭게 추가하는 태그 목록 */
  Tags: createInput<TagsInputProps>(TagsInput),
  /** 라디오 그룹 — data로 항목을 넘긴다 */
  Radio: SdInputRadio,
  /** 두세 개 중 하나 — 탭처럼 보이는 선택 */
  Segmented: createWrappedInput<SegmentedControlProps>(SegmentedControl),

  // ── 불리언 ──
  /** 체크박스 — getInputProps(name, { type: 'checkbox' }) */
  Checkbox: createInput<CheckboxProps>(Checkbox),
  /** 스위치 — 즉시 반영되는 on/off */
  Switch: createInput<SwitchProps>(Switch),

  // ── 기타 ──
  /** 파일 선택 */
  File: createInput<FileInputProps>(FileInput, { clearable: true }),
  /** 색상 선택 */
  Color: createInput<ColorInputProps>(ColorInput),

  // ── 날짜·시간 (@mantine/dates) ──
  /** 날짜 — 직접 입력 + 달력 팝오버. 값은 'YYYY-MM-DD' 문자열 */
  Date: createInput<DateInputProps>(DateInput, { valueFormat: 'YYYY-MM-DD', clearable: true }),
  /** 기간 — 시작·종료 두 날짜 */
  DateRange: createInput<DatePickerInputProps<'range'>>(DatePickerInput, {
    type: 'range',
    valueFormat: 'YYYY-MM-DD',
    clearable: true,
  }),
  /** 시각 */
  Time: createInput<TimeInputProps>(TimeInput),
}

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdInputText = SdInput.Text
export const SdInputEmail = SdInput.Email
export const SdInputPassword = SdInput.Password
export const SdInputTextarea = SdInput.Textarea
export const SdInputJson = SdInput.Json
export const SdInputNumber = SdInput.Number
export const SdInputSlider = SdInput.Slider
export const SdInputRating = SdInput.Rating
export const SdInputPinCode = SdInput.PinCode
export const SdInputSelect = SdInput.Select
export const SdInputNativeSelect = SdInput.NativeSelect
export const SdInputMultiSelect = SdInput.MultiSelect
export const SdInputAutocomplete = SdInput.Autocomplete
export const SdInputTags = SdInput.Tags
export const SdInputRadioGroup = SdInput.Radio
export const SdInputSegmented = SdInput.Segmented
export const SdInputCheckbox = SdInput.Checkbox
export const SdInputSwitch = SdInput.Switch
export const SdInputFile = SdInput.File
export const SdInputColor = SdInput.Color
export const SdInputDate = SdInput.Date
export const SdInputDateRange = SdInput.DateRange
export const SdInputTime = SdInput.Time
