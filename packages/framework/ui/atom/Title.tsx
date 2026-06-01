import { Title as MantineTitle, TitleProps } from "@mantine/core";
import { ReactNode } from "react";
import { t } from "../../util/text.util";

type Props = TitleProps & { children?: ReactNode };

function createTitle(defaults: TitleProps) {
  return function SdTitle({ children, ...props }: Props) {
    const resolved = typeof children === "string" ? t(children) : children;
    
    return (
      <MantineTitle {...defaults} {...props}>
        {resolved}
      </MantineTitle>
    );
  };
}

export const SdTitle = {
  /** 히어로 대제목 — h1, clamp 폰트 */
  Display: createTitle({  order: 2 }),
  /** 섹션 제목  */
  Section: createTitle({ order: 3 }),
  /** 카드·모달 제목 — */
  Card:    createTitle({ order: 4 }),
  /** 소제목  */
  Sub:     createTitle({ order: 5}),
};
