"use client";
import Image from "next/image";
import Link from "next/link";
import { MantineSize, rem, useProps, useMantineTheme } from "@mantine/core";
import { LOGO_ALT, LOGO_SRC } from "../../util/env.util";

interface LogoProps {
  size?: MantineSize;
}

export function Logo(_props: LogoProps) {
  const { size } = useProps("Logo", { size: "md" } , _props);
  const theme = useMantineTheme();
  const resolved = theme.other.logoSizes[size!];

  return (
    <Link href="/" style={{ display: "inline-flex", alignItems: "center" }}>
      <Image
        src={LOGO_SRC}
        alt={LOGO_ALT}
        width={resolved.width}
        height={resolved.height}
        style={{
          width: rem(resolved.width),
          height: "auto",
          objectFit: "contain"
        }}
        priority
      />
    </Link>
  );
}
