'use client'

import { Anchor, Box, SimpleGrid, SimpleGridProps, Tooltip } from "@mantine/core";
import { ClientItem } from "../../types";

const grayStyle: React.CSSProperties = {
  filter: "grayscale(1) opacity(0.5)",
  transition: "filter 0.25s",
};

const colorStyle: React.CSSProperties = {
  filter: "grayscale(0) opacity(1)",
};

function LogoImage({ client, height }: { client: ClientItem; height: number }) {
  return (
    <Tooltip label={client.name} withArrow>
      <Anchor href={client.url} target="_blank" rel="noopener noreferrer">
        <img
          src={client.logo}
          alt={client.name}
          style={{ height, width: "auto", objectFit: "contain", display: "block", ...grayStyle }}
          onMouseEnter={(e) => Object.assign(e.currentTarget.style, colorStyle)}
          onMouseLeave={(e) => Object.assign(e.currentTarget.style, grayStyle)}
        />
      </Anchor>
    </Tooltip>
  );
}

/* ─────────────────────────────────────────────
   SdClients.Grid — 반응형 로고 그리드
───────────────────────────────────────────── */
interface SdClientsGridProps {
  items: ClientItem[];
  cols?: SimpleGridProps["cols"];
  logoHeight?: number;
}

function Grid({
  items,
  cols = { base: 2, sm: 3, md: 4, lg: 6 },
  logoHeight = 40,
}: SdClientsGridProps) {
  return (
    <SimpleGrid cols={cols} spacing="xl">
      {items.map((client, i) => (
        <Box key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 8px" }}>
          <LogoImage client={client} height={logoHeight} />
        </Box>
      ))}
    </SimpleGrid>
  );
}

/* ─────────────────────────────────────────────
   SdClients.Marquee — 무한 수평 스크롤 띠
   호버 시 일시정지
───────────────────────────────────────────── */
const KEYFRAME = `@keyframes sd-clients-marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`;

interface SdClientsMarqueeProps {
  items: ClientItem[];
  speed?: number;   // 전체 한 바퀴 초 (기본 40s)
  logoHeight?: number;
  gap?: number;     // 로고 간 px 간격 (기본 64)
}

function Marquee({ items, speed = 40, logoHeight = 36, gap = 64 }: SdClientsMarqueeProps) {
  const doubled = [...items, ...items]; // 끝없는 루프를 위해 2배 복제

  return (
    <Box style={{ overflow: "hidden" }}>
      <style>{KEYFRAME}</style>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          gap,
          width: "max-content",
          animation: `sd-clients-marquee ${speed}s linear infinite`,
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.animationPlayState = "running"; }}
      >
        {doubled.map((client, i) => (
          <LogoImage key={i} client={client} height={logoHeight} />
        ))}
      </Box>
    </Box>
  );
}

export const SdClients = {
  /** 반응형 로고 그리드 */
  Grid,
  /** 무한 수평 스크롤 띠 — 호버 시 일시정지 */
  Marquee,
};
