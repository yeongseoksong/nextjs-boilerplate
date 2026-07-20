import {
  PasswordInput,
  PasswordInputProps,
  Select,
  SelectProps,
  Textarea,
  TextareaProps,
  TextInput,
  TextInputProps,
} from "@mantine/core";

function createTextInput(defaults: TextInputProps) {
  return function SdInput({ ...props }: TextInputProps) {
    return <TextInput {...defaults} {...props} />;
  };
}

function createTextarea(defaults: TextareaProps) {
  return function SdInputTextarea({ ...props }: TextareaProps) {
    return <Textarea {...defaults} {...props} />;
  };
}

function createPasswordInput(defaults: PasswordInputProps) {
  return function SdInputPassword({ ...props }: PasswordInputProps) {
    return <PasswordInput {...defaults} {...props} />;
  };
}

function createSelect(defaults: Omit<SelectProps, "data">) {
  return function SdInputSelect({ ...props }: SelectProps) {
    return <Select {...defaults} {...props} />;
  };
}

export const SdInput = {
  /** 일반 텍스트 — 이름, 회사명 등 */
  Text: createTextInput({}),
  /** 이메일 입력 */
  Email: createTextInput({ type: "email" }),
  /** 비밀번호 입력 — 마스킹 토글 포함 */
  Password: createPasswordInput({}),
  /** 멀티라인 텍스트 — 문의 메시지 등 */
  Textarea: createTextarea({ autosize: true, minRows: 3 }),
  /** 드롭다운 선택 */
  Select: createSelect({}),
};

// Server Component에서 직접 import 가능한 개별 export.
// dist/ui 번들 전체에 "use client" 배너가 붙으므로, 서버 컴포넌트가
// SdText.Body 처럼 네임스페이스를 dot 접근하면 client reference proxy에서
// undefined가 반환되어 렌더가 실패한다. 아래 flat export를 사용할 것.
export const SdInputText = SdInput.Text;
export const SdInputEmail = SdInput.Email;
export const SdInputPassword = SdInput.Password;
export const SdInputTextarea = SdInput.Textarea;
export const SdInputSelect = SdInput.Select;
