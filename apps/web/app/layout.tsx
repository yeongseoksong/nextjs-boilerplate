import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dates/styles.css'
import './index.css'
import type { Metadata } from 'next'
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import { MainLayout, SdProvider } from '@framework/ui'
import { companyInfo } from '../data'
import { catalogNav } from './_catalog/nav'
import { appTheme } from './theme'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  title: {
    default: '@yeongseoksong/framework 컴포넌트 카탈로그',
    template: '%s | @yeongseoksong/framwework',
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
        <SdProvider theme={appTheme} navItems={catalogNav}>
          <MainLayout navItems={catalogNav} companyInfo={companyInfo}>
            {children}
          </MainLayout>
        </SdProvider>
      </body>
    </html>
  )
}
