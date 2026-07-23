'use client'

import { useEffect, useState } from 'react'
import { Box, Tabs, TabsListProps, TabsProps, TabsPanelProps } from '@mantine/core'
import { SdContainer } from './Container'

// syncHash: 활성 탭 value ↔ URL 해시(#id)를 양방향 동기화
type SdTabsRootProps = TabsProps & { syncHash?: boolean }

function SdPanel({ children, ...props }: TabsPanelProps) {
  return (
    <Tabs.Panel {...props}>
      <SdContainer py="xl">{children}</SdContainer>
    </Tabs.Panel>
  )
}

function SdScrollableList({ children, ...props }: TabsListProps) {
  return (
    <Box style={{ overflowX: 'auto', width: '100%' }}>
      <Tabs.List {...props}>{children}</Tabs.List>
    </Box>
  )
}

function createTabs(defaults: TabsProps, scrollable = false) {
  function SdTabsRoot({ syncHash, value, onChange, ...props }: SdTabsRootProps) {
    // 서버 HTML과 첫 렌더를 맞추기 위해 해시는 마운트 후(useEffect)에만 반영
    const [hashValue, setHashValue] = useState<string | null>(null)

    useEffect(() => {
      if (!syncHash) return
      const apply = () => {
        const id = decodeURIComponent(window.location.hash.slice(1))
        if (id) setHashValue(id)
      }
      apply()
      window.addEventListener('hashchange', apply)
      return () => window.removeEventListener('hashchange', apply)
    }, [syncHash])

    if (!syncHash) {
      return <Tabs {...defaults} {...props} value={value} onChange={onChange} />
    }

    const handleChange = (next: string | null) => {
      if (next) {
        // 히스토리 오염 없이 해시만 교체 (뒤로가기로 탭 이동을 원하면 pushState로)
        window.history.replaceState(null, '', `#${next}`)
        setHashValue(next)
      }
      onChange?.(next)
    }

    // 제어(value)가 우선, 없으면 해시 값으로 제어
    return <Tabs {...defaults} {...props} value={value ?? hashValue} onChange={handleChange} />
  }
  SdTabsRoot.List = (scrollable ? SdScrollableList : Tabs.List) as typeof Tabs.List
  SdTabsRoot.Tab = Tabs.Tab
  SdTabsRoot.Panel = SdPanel
  return SdTabsRoot
}

export const SdTabs = {
  Pills: createTabs({
    variant: 'pills',
    color: 'primary',
    radius: 'xl',
    styles: {
      list: {
        background: 'var(--mantine-color-slate-1)',
        padding: 'var(--mantine-spacing-xs)',
        gap: 'var(--mantine-spacing-xs)',
        borderRadius: 'var(--mantine-radius-xl)',
        width: 'fit-content',
        maxWidth: '100%',
        margin: '0 auto',
        flexWrap: 'wrap' as React.CSSProperties['flexWrap'],
        justifyContent: 'center',
      },
      tab: {
        fontWeight: '500' as React.CSSProperties['fontWeight'],
        fontSize: 'var(--mantine-h5-font-size)',
        paddingInline: 'var(--mantine-spacing-lg)',
      },
    },
  }),

  Underline: createTabs({
    variant: 'default',
    color: 'primary',
    styles: {
      list: { width: 'fit-content', margin: '0 auto', gap: 'var(--mantine-spacing-sm)' },
      tab: {
        fontWeight: '500' as React.CSSProperties['fontWeight'],
        fontSize: 'var(--mantine-h5-font-size)',
        paddingInline: 'var(--mantine-spacing-lg)',
      },
    },
  }),

  Outline: createTabs({
    variant: 'outline',
    color: 'primary',
    radius: 'md',
    styles: {
      list: { width: 'fit-content', margin: '0 auto', gap: 'var(--mantine-spacing-sm)' },
      tab: {
        fontWeight: '500' as React.CSSProperties['fontWeight'],
        fontSize: 'var(--mantine-h5-font-size)',
        paddingInline: 'var(--mantine-spacing-lg)',
      },
    },
  }),
}

// SdTabs.Pills / .Underline / .Outline 은 .List / .Tab / .Panel 을 직접 속성으로 가짐
// → 개별 export에서도 compound sub-component 그대로 사용 가능
export const SdTabsPills = SdTabs.Pills
export const SdTabsUnderline = SdTabs.Underline
export const SdTabsOutline = SdTabs.Outline
