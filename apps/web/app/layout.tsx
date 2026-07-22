import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css'
import './index.css'
import type { Metadata } from 'next'
import { MantineProvider, ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import { MainLayout, SdToastProvider } from '@framework/ui'
import { companyInfo } from '../data'
import { catalogNav } from './_catalog/nav'
import { appTheme } from './theme'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: {
    default: '@yeongseoksong/framework 컴포넌트 카탈로그',
    template: '%s | @yeongseoksong/framework',
  },
  description: 'Mantine 기반 디자인 시스템의 전체 컴포넌트와 variant를 한 곳에서 확인합니다.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="shortcut icon" href={`${basePath}/favicon.svg`} />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </head>
      <body>
        <MantineProvider theme={appTheme} defaultColorScheme="light">
          {/* 토스트가 렌더되는 곳 — 이게 없으면 SdToast 호출이 아무 일도 하지 않는다. */}
          <SdToastProvider />
          <MainLayout navItems={catalogNav} companyInfo={companyInfo}>
            {children}
          </MainLayout>
        </MantineProvider>
      </body>
    </html>
  )
}
