import { defineConfig } from 'tsup'

export default defineConfig([
  {
    // UI components — 'use client' directive required
    entry: { 'ui/index': './ui/index.tsx' },
    format: ['esm', 'cjs'],
    // 확장자를 명시해 모듈 형식을 파일명으로 못박는다. 기본값은 cjs → .js 인데,
    // 패키지에 "type": "module"이 없어 .js가 CommonJS로 해석되면서
    // package.json exports의 import 조건이 CJS를 가리키는 사고가 났었다.
    outExtension: ({ format }) => ({ js: format === 'esm' ? '.mjs' : '.cjs' }),
    dts: true,
    clean: false,
    external: [
      'react',
      'react-dom',
      '@mantine/core',
      '@mantine/hooks',
      '@mantine/carousel',
      '@mantine/notifications',
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
    outExtension: ({ format }) => ({ js: format === 'esm' ? '.mjs' : '.cjs' }),
    dts: true,
    clean: false,
    external: ['react'],
  },
])
