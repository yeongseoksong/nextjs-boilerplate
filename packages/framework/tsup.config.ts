import { defineConfig } from 'tsup'

export default defineConfig([
  {
    // UI components — 'use client' directive required
    entry: { 'ui/index': './ui/index.tsx' },
    format: ['esm', 'cjs'],
    dts: true,
    clean: false,
    external: [
      'react',
      'react-dom',
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/carousel',
      '@tabler/icons-react',
      'next',
    ],
    banner: { js: '"use client";' },
  },
  {
    // Utilities and types — no 'use client'
    entry: {
      'util/index': './util/index.ts',
      'types/index': './types/index.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: false,
    external: ['react'],
  },
])
