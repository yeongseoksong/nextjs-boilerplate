import { Badge as MantineBadge, BadgeProps } from "@mantine/core";
import { ReactNode } from "react";

type Props = BadgeProps & { children?: ReactNode };

function createBadge(defaults: BadgeProps) {
  return function SdBadge({ children, ...props }: Props) {
    return (
      <MantineBadge {...defaults} {...props}>
        {children}
      </MantineBadge>
    );
  };
}

export const SdBadge = {
  /** 기본 — outline slate */
  Default: createBadge({ variant: "outline", color: "slate" }),
  /** 브랜드 강조 — light primary */
  Primary: createBadge({ variant: "light", color: "primary" }),
  /** 성공/완료 */
  Success: createBadge({ variant: "light", color: "green" }),
  /** 주의/경고 */
  Warning: createBadge({ variant: "light", color: "orange" }),
};
