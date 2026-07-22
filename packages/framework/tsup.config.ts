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
      '@mantine/dates',
      '@mantine/notifications',
      '@tabler/icons-react',
      'zustand',
      'next',
    ],
    banner: { js: '"use client";' },
  },
  {
    // Zustand 스토어 — own entry so `dist/store` is the single copy consumers and
    // `dist/ui` both resolve to. `ui/index.tsx`가 이걸 다시 export하지 않는 게 핵심
    // 조건이다 — re-export하면 esbuild가 인라인해서 사본이 두 개가 된다. 상세 이유는
    // store/index.ts 상단 주석과 CLAUDE.md §State Management 참고.
    entry: { 'store/index': './store/index.ts' },
    format: ['esm', 'cjs'],
    outExtension: ({ format }) => ({ js: format === 'esm' ? '.mjs' : '.cjs' }),
    dts: true,
    clean: false,
    // form.state.ts가 SdToast(ui/atom/Toast)를 끌어오면서 딸려오는 것들.
    // 이 패키지들 자체는 외부(peer)이므로 여기서도 번들에 안 넣는다 — 중복은
    // 코드 몇 줄뿐이고(Toast 래퍼), 상태를 갖는 건 zustand store뿐이라 안전하다.
    external: ['react', 'zustand', '@mantine/notifications', '@tabler/icons-react'],
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
