import type { Metadata } from 'next'
import StateCatalog from './StateCatalog'

export const metadata: Metadata = {
  title: 'State · 컴포넌트 카탈로그',
  description: 'useAuthStore / useUiStore — Zustand 기반 표준 스토어의 동작을 직접 확인합니다.',
}

export default function StatePage() {
  return <StateCatalog />
}
