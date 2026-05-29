"use client";
import Image from "next/image";
import Link from "next/link";
import { MantineSize, rem, useProps, useMantineTheme } from "@mantine/core";

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
        src="/logo.svg"
        alt="로고"
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
