"use client";

import { createTheme, MantineColorsTuple, rem } from '@mantine/core';

/* ============================================================
   SIWORKS — Mantine theme
   Maps the SIWORKS design system (see ../README.md and
   ../colors_and_type.css) onto Mantine v7/v8.

   Usage:
     import { MantineProvider } from '@mantine/core';
     import { siworksTheme } from './theme';
     <MantineProvider theme={theme}>…</MantineProvider>
   ============================================================ */



// Brand blue — the logo "SI". index 6 ≈ #0B5ED7
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
];

// Brand orange — the logo "WORKS". Sparing accent only. index 5/6 ≈ #F7931E
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
];

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
];

// Accents that only ever appear inside gradients
const cyan: MantineColorsTuple = [
  '#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee',
  '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63',
];
const indigo: MantineColorsTuple = [
  '#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8',
  '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81',
];

export const theme = createTheme({
  /* ---- Color ---- */
  colors: { primary, secondary, slate, cyan, indigo, dark: slate },
  primaryColor: 'primary',
  primaryShade: { light: 6, dark: 5 },

  /* ---- Type ---- */
  fontFamily:
    "'Noto Sans KR', ui-sans-serif, system-ui, -apple-system, sans-serif",
  fontFamilyMonospace:
    "'Noto Sans KR', ui-monospace, monospace",
  // Global tight tracking is the brand signature (-0.04em).
  // Set this on the body in your global CSS — see README.
  headings: {
    fontFamily:
      "'Noto Sans KR', ui-sans-serif, system-ui, sans-serif",
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
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
  },
  lineHeights: {
    xs: '1.4', sm: '1.45', md: '1.5', lg: '1.55', xl: '1.6',
  },

  /* ---- Radii (the brand loves generous rounding) ---- */
  defaultRadius: 'md',
  radius: {
    xs: rem(6),
    sm: rem(8),
    md: rem(10),  // base --radius
    lg: rem(14),
    xl: rem(18),
  },

  /* ---- Spacing ---- */
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  /* ---- Shadows (mirror --shadow-* tokens) ---- */
  shadows: {
    xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
    md: '0 8px 32px rgb(0 0 0 / 0.08)',                 // glass nav
    lg: '0 30px 60px -15px rgb(0 0 0 / 0.05)',          // card hover lift
    xl: '0 40px 80px -20px rgb(0 0 0 / 0.3)',           // modal
  },

    breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },

  /* ---- Brand extras (gradients, surfaces, the logo blue) ---- */
  other: {
    logoSizes: {
      xs: { width: 72,  height: 22 },
      sm: { width: 96,  height: 29 },
      md: { width: 120, height: 36 },
      lg: { width: 160, height: 48 },
      xl: { width: 200, height: 60 },
    },
    brandBlue: '#0b5ed7',
    brandOrange: '#f7931e',
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
    Logo: {
      defaultProps: { size: 'md' },
    },
    Button: {
      defaultProps: {
        radius: 'xl',   // wide pill-ish; pass radius={9999} for a full pill
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
    Anchor: {
      defaultProps: { c: 'primary.6' },
    },
  },
});

export default theme;
