'use client'

import { useState } from "react";
import { Box, BoxProps, Stack } from "@mantine/core";
import { CompanyAddress } from "../../types";
import { SdTabs } from "../atom/Tabs";
import { SdText } from "../atom/Text";

/* ─────────────────────────────────────────────
   내부: iframe 지도 + 주소 텍스트
───────────────────────────────────────────── */
function MapFrame({ address, height }: { address: CompanyAddress; height: number }) {
  return (
    <Stack gap="xs">
      <Box style={{ borderRadius: "var(--mantine-radius-md)", overflow: "hidden", height }}>
        <iframe
          src={address.embbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={address.label}
        />
      </Box>
      <SdText.Sub>[{address.label}] {address.address}</SdText.Sub>
    </Stack>
  );
}

/* ─────────────────────────────────────────────
   SdMap.Single — 단일 주소 지도
───────────────────────────────────────────── */
interface SdMapSingleProps extends Omit<BoxProps, "children"> {
  address: CompanyAddress;
  height?: number;
}

function Single({ address, height = 400, ...boxProps }: SdMapSingleProps) {
  if (!address.embbedUrl) return null;
  return (
    <Box {...boxProps}>
      <MapFrame address={address} height={height} />
    </Box>
  );
}

/* ─────────────────────────────────────────────
   SdMap.Tabs — 여러 주소를 탭으로 전환
───────────────────────────────────────────── */
interface SdMapTabsProps {
  addresses: CompanyAddress[];
  height?: number;
}

function Tabs({ addresses, height = 400 }: SdMapTabsProps) {
  const mapped = addresses.filter((a) => a.embbedUrl);
  const [active, setActive] = useState(mapped[0]?.label ?? "");

  if (mapped.length === 0) return null;
  if (mapped.length === 1) return <MapFrame address={mapped[0]} height={height} />;

  const current = mapped.find((a) => a.label === active) ?? mapped[0];

  return (
    <Stack gap="md">
      <SdTabs.Pills value={active} onChange={(v) => setActive(v ?? mapped[0].label)}>
        <SdTabs.Pills.List>
          {mapped.map((addr) => (
            <SdTabs.Pills.Tab key={addr.label} value={addr.label}>
              {addr.label}
            </SdTabs.Pills.Tab>
          ))}
        </SdTabs.Pills.List>
      </SdTabs.Pills>
      <MapFrame address={current} height={height} />
    </Stack>
  );
}

export const SdMap = {
  /** 단일 주소 지도 — embbedUrl 없으면 null 반환 */
  Single,
  /** 여러 주소 탭 전환 지도 — embbedUrl 있는 항목만 표시 */
  Tabs,
};
