import { Box, Tabs, TabsListProps, TabsProps, TabsPanelProps } from "@mantine/core";
import { SdContainer } from "./Container";

function SdPanel({ children, ...props }: TabsPanelProps) {
  return (
    <Tabs.Panel {...props}>
      <SdContainer py="xl">{children}</SdContainer>
    </Tabs.Panel>
  );
}

function SdScrollableList({ children, ...props }: TabsListProps) {
  return (
    <Box style={{ overflowX: 'auto', width: '100%' }}>
      <Tabs.List {...props}>{children}</Tabs.List>
    </Box>
  );
}

function createTabs(defaults: TabsProps, scrollable = false) {
  function SdTabsRoot(props: TabsProps) {
    return <Tabs {...defaults} {...props} />;
  }
  SdTabsRoot.List  = (scrollable ? SdScrollableList : Tabs.List) as typeof Tabs.List;
  SdTabsRoot.Tab   = Tabs.Tab;
  SdTabsRoot.Panel = SdPanel;
  return SdTabsRoot;
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
      tab: { fontWeight: '500' as React.CSSProperties['fontWeight'], fontSize: 'var(--mantine-h5-font-size)', paddingInline: 'var(--mantine-spacing-lg)' },
    },
  }),

  Underline: createTabs({
    variant: 'default',
    color: 'primary',
    styles: {
      list: { width: 'fit-content', margin: '0 auto', gap: 'var(--mantine-spacing-sm)' },
      tab:  { fontWeight: '500' as React.CSSProperties['fontWeight'], fontSize: 'var(--mantine-h5-font-size)', paddingInline: 'var(--mantine-spacing-lg)' },
    },
  }),

  Outline: createTabs({
    variant: 'outline',
    color: 'primary',
    radius: 'md',
    styles: {
      list: { width: 'fit-content', margin: '0 auto', gap: 'var(--mantine-spacing-sm)' },
      tab:  { fontWeight: '500' as React.CSSProperties['fontWeight'], fontSize: 'var(--mantine-h5-font-size)', paddingInline: 'var(--mantine-spacing-lg)' },
    },
  }),
};

// SdTabs.Pills / .Underline / .Outline 은 .List / .Tab / .Panel 을 직접 속성으로 가짐
// → 개별 export에서도 compound sub-component 그대로 사용 가능
export const SdTabsPills     = SdTabs.Pills;
export const SdTabsUnderline = SdTabs.Underline;
export const SdTabsOutline   = SdTabs.Outline;
