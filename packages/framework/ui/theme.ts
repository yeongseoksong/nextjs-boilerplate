'use client'

import { createTheme, MantineColorsTuple, rem } from '@mantine/core'

const primary: MantineColorsTuple = [
  '#e7f0fb',
  '#c8dcf4',
  '#a3c3ec',
  '#7aa8e3',
  '#4f8ddb',
  '#2374d4',
  '#0b5ed7', // 6 ← brand anchor
  '#094db1',
  '#073d8c',
  '#052d68',
]

const secondary: MantineColorsTuple = [
  '#fef6e7',
  '#fde9c4',
  '#fbd79a',
  '#fac470',
  '#f8ab47',
  '#f7931e', // 5
  '#de7c12', // 6
  '#b5640e',
  '#8a4c0b',
  '#5e3307',
]

// Neutral — Tailwind slate. The whole UI rides on this; use as gray.
const slate: MantineColorsTuple = [
  '#f8fafc', // 0  slate-50
  '#f1f5f9', // 1  slate-100
  '#e2e8f0', // 2  slate-200
  '#cbd5e1', // 3  slate-300
  '#94a3b8', // 4  slate-400
  '#64748b', // 5  slate-500
  '#475569', // 6  slate-600
  '#334155', // 7  slate-700
  '#1e293b', // 8  slate-800
  '#0f172a', // 9  slate-900
]

const cyan: MantineColorsTuple = [
  '#ecfeff',
  '#cffafe',
  '#a5f3fc',
  '#67e8f9',
  '#22d3ee',
  '#06b6d4',
  '#0891b2',
  '#0e7490',
  '#155e75',
  '#164e63',
]
const indigo: MantineColorsTuple = [
  '#eef2ff',
  '#e0e7ff',
  '#c7d2fe',
  '#a5b4fc',
  '#818cf8',
  '#6366f1',
  '#4f46e5',
  '#4338ca',
  '#3730a3',
  '#312e81',
]

export const theme = createTheme({
  /* ---- Color ---- */
  colors: { primary, secondary, slate, cyan, indigo, dark: slate },
  primaryColor: 'primary',
  primaryShade: { light: 6, dark: 5 },

  /* ---- Type ---- */
  fontFamily: "'Noto Sans KR', ui-sans-serif, system-ui, -apple-system, sans-serif",
  fontFamilyMonospace: "'Noto Sans KR', ui-monospace, monospace",

  headings: {
    fontFamily: "'Noto Sans KR', ui-sans-serif, system-ui, sans-serif",
    fontWeight: '700',
    sizes: {
      h1: { fontSize: rem(48), lineHeight: '1.1', fontWeight: '900' },
      h2: { fontSize: rem(36), lineHeight: '1.1', fontWeight: '900' },
      h3: { fontSize: rem(28), lineHeight: '1.15', fontWeight: '700' },
      h4: { fontSize: rem(20), lineHeight: '1.3', fontWeight: '700' },
      h5: { fontSize: rem(16), lineHeight: '1.4', fontWeight: '700' },
      h6: { fontSize: rem(14), lineHeight: '1.4', fontWeight: '700' },
    },
  },
  fontSizes: {
    xs: rem(14),
    sm: rem(16),
    md: rem(18),
    lg: rem(20),
    xl: rem(22),
  },
  lineHeights: {
    xs: '1.4',
    sm: '1.45',
    md: '1.5',
    lg: '1.55',
    xl: '1.6',
  },

  defaultRadius: 'md',
  radius: {
    xs: rem(6),
    sm: rem(8),
    md: rem(10),
    lg: rem(14),
    xl: rem(18),
  },

  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
    md: '0 8px 32px rgb(0 0 0 / 0.08)', // glass nav
    lg: '0 30px 60px -15px rgb(0 0 0 / 0.05)', // card hover lift
    xl: '0 40px 80px -20px rgb(0 0 0 / 0.3)', // modal
  },

  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },

  other: {
    logoSizes: {
      xs: { width: 72, height: 22 },
      sm: { width: 96, height: 29 },
      md: { width: 120, height: 36 },
      lg: { width: 160, height: 48 },
      xl: { width: 200, height: 60 },
    },

    surfaceSubtle: '#f8fafc',
    surfaceDark: '#0f172a',
    surfaceDarker: '#020617',
    gradientHeroText: 'linear-gradient(to right, #60a5fa, #22d3ee, #3b82f6)',
    gradientAsm: 'linear-gradient(to bottom right, #2563eb, #06b6d4)',
    gradientPims: 'linear-gradient(to bottom right, #4f46e5, #a855f7)',
    tracking: '-0.04em',
    trackingEyebrow: '0.25em',
  },

  /* ---- Component defaults (match the live site) ---- */
  defaultGradient: { from: 'primary.6', to: 'cyan.4', deg: 90 },

  components: {
    Container: {
      defaultProps: { size: 'xl', h: '100%' },
    },
    Logo: {
      defaultProps: { size: 'md' },
    },
    Button: {
      defaultProps: {
        radius: 'xl',
        fw: 700,
      },
    },
    Card: {
      defaultProps: {
        radius: 'lg',
        shadow: 'sm',
        withBorder: true,
        padding: 'lg',
      },
    },
    Paper: {
      defaultProps: { radius: 'lg' },
    },
    Badge: {
      defaultProps: { radius: 'xl', variant: 'light' },
    },
    Modal: {
      defaultProps: { radius: 'lg', centered: true, shadow: 'xl' },
    },
    Input: {
      defaultProps: { radius: 'sm' },
    },
    TextInput: {
      defaultProps: { radius: 'sm' },
    },
    Divider: {
      defaultProps: { c: 'slate.5' },
    },
    Anchor: {
      defaultProps: { c: 'slate.5', fz: 'sm', underline: 'never' },
    },
    // SdHeader 모바일 드로어의 2단 아코디언 타이포를 SdLink와 맞춘다.
    NavLink: {
      defaultProps: { c: 'slate.7', fz: 'sm' },
    },
    Table: {
      defaultProps: {
        captionSide: 'bottom',
      },
      styles: {
        th: { color: 'var(--mantine-color-slate-5)', fontWeight: '700' },
      },
    },
  },
})

export default theme
