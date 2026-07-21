import { Button as MantineButton, ButtonProps } from "@mantine/core";
import { IconDownload, IconFileSpreadsheet, IconSend, IconTrash, IconX } from "@tabler/icons-react";
import { ComponentPropsWithoutRef, ReactNode } from "react";

type Props = ButtonProps & ComponentPropsWithoutRef<"button"> & { children?: ReactNode };

/**
 * @param defaults  Mantine ButtonProps 기본값
 * @param defaultLabel  children이 없을 때 표시할 기본 라벨. 소비자가 children을
 *                      넘기면 그 값으로 덮어쓴다. 의미가 고정된 버튼(삭제/취소)에만 쓴다.
 */
function createButton(defaults: ButtonProps, defaultLabel?: ReactNode) {
  return function SdButton({ children, ...props }: Props) {
    return (
      <MantineButton {...defaults} {...props}>
        {children ?? defaultLabel}
      </MantineButton>
    );
  };
}

export const SdButton = {
  /** 주요 액션 — filled primary */
  Primary: createButton({ color: "primary" }),
  /** 보조 액션 — white bg + slate text */
  Secondary: createButton({ variant: "white", color: "slate" }),
  /** 보조 액션 — outline */
  Outline: createButton({ variant: "outline", color: "primary" }),
  /** 텍스트 수준 — subtle */
  Ghost:   createButton({ variant: "subtle", color: "slate" }),
  /** 다크 배경 위 — white */
  White:   createButton({ variant: "white" }),

  // ── 표준 액션 버튼: 라벨·색·아이콘이 고정 (children으로 라벨 덮어쓰기 가능) ──
  /** 전송 — filled primary + 종이비행기 아이콘, 기본 라벨 "전송" */
  Submit:  createButton({ color: "primary", leftSection: <IconSend size={16} /> }, "전송"),
  /** 삭제 — filled red + 휴지통 아이콘, 기본 라벨 "삭제" */
  Delete:  createButton({ color: "red", leftSection: <IconTrash size={16} /> }, "삭제"),
  /** 취소 — outline slate + X 아이콘, 기본 라벨 "취소" */
  Cancel:  createButton({ variant: "outline", color: "slate", leftSection: <IconX size={16} /> }, "취소"),
  /** 엑셀 — outline green + 스프레드시트 아이콘, 기본 라벨 "엑셀" */
  Excel:   createButton({ variant: "outline", color: "green", leftSection: <IconFileSpreadsheet size={16} /> }, "엑셀"),
  /** 다운로드 — light primary + 다운로드 아이콘, 기본 라벨 "다운로드" */
  Download: createButton({ variant: "light", color: "primary", leftSection: <IconDownload size={16} /> }, "다운로드"),
};

export const SdButtonPrimary   = SdButton.Primary;
export const SdButtonSecondary = SdButton.Secondary;
export const SdButtonOutline   = SdButton.Outline;
export const SdButtonGhost     = SdButton.Ghost;
export const SdButtonWhite     = SdButton.White;
export const SdButtonSubmit    = SdButton.Submit;
export const SdButtonDelete    = SdButton.Delete;
export const SdButtonCancel    = SdButton.Cancel;
export const SdButtonExcel     = SdButton.Excel;
export const SdButtonDownload  = SdButton.Download;
