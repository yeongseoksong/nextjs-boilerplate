import type { CSSProperties } from 'react'

/**
 * 어두운 브랜드 면(面) 토큰.
 *
 * slate 바탕 위에 primary 광원 두 개를 radial로 얹은 배경과, 그 위에 깔리는
 * 도트 텍스처를 한 곳에 모은다. PageLayout.Brand 히어로와 SdLoginView.Split의
 * 좌측 패널이 같은 값을 쓰므로, 톤이 갈라지지 않도록 출처를 하나로 둔다.
 * primary 팔레트를 갈아끼워도 무너지지 않게 CSS 변수만 참조한다.
 */
export const brandSurface: CSSProperties = {
  background: `
    radial-gradient(90% 120% at 12% 0%, var(--mantine-color-primary-7) 0%, transparent 58%),
    radial-gradient(70% 100% at 100% 100%, var(--mantine-color-primary-9) 0%, transparent 55%),
    var(--mantine-color-slate-9)`,
}

/**
 * brandSurface 위에 얹는 도트 텍스처.
 * 아래로 갈수록 사라져 텍스트가 놓이는 영역의 가독성을 해치지 않는다.
 */
export const brandDotTexture: CSSProperties = {
  backgroundImage: 'radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)',
  backgroundSize: '18px 18px',
  maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 70%)',
  WebkitMaskImage: 'linear-gradient(180deg, rgba(0,0,0,0.9) 0%, transparent 70%)',
  pointerEvents: 'none',
}
