import { Tabs, TabsProps } from "@mantine/core";

function createTabs(defaults: TabsProps) {
  function SdTabsRoot(props: TabsProps) {
    return <Tabs {...defaults} {...props} />;
  }
  SdTabsRoot.List  = Tabs.List;
  SdTabsRoot.Tab   = Tabs.Tab;
  SdTabsRoot.Panel = Tabs.Panel;
  return SdTabsRoot;
}

export const SdTabs = {
  Pills: createTabs({
    variant: 'pills',
    color: 'primary',
    radius: 'xl',
    styles: {
      list: { background: 'var(--mantine-color-slate-1)', padding: 'var(--mantine-spacing-xs)', gap: 'var(--mantine-spacing-sm)', borderRadius: '9999px', width: 'fit-content', margin: '0 auto' },
      tab:  { fontWeight: 'var(--mantine-h5-font-weight)' as React.CSSProperties['fontWeight'], fontSize: 'var(--mantine-h5-font-size)', paddingInline: 'var(--mantine-spacing-lg)' },
    },
  }),

  Underline: createTabs({
    variant: 'default',
    color: 'primary',
    styles: {
      list: { width: 'fit-content', margin: '0 auto', gap: 'var(--mantine-spacing-sm)' },
      tab:  { fontWeight: 'var(--mantine-h5-font-weight)' as React.CSSProperties['fontWeight'], fontSize: 'var(--mantine-h5-font-size)', paddingInline: 'var(--mantine-spacing-lg)' },
    },
  }),

  Outline: createTabs({
    variant: 'outline',
    color: 'primary',
    radius: 'md',
    styles: {
      list: { width: 'fit-content', margin: '0 auto', gap: 'var(--mantine-spacing-sm)' },
      tab:  { fontWeight: 'var(--mantine-h5-font-weight)' as React.CSSProperties['fontWeight'], fontSize: 'var(--mantine-h5-font-size)', paddingInline: 'var(--mantine-spacing-lg)' },
    },
  }),
};
