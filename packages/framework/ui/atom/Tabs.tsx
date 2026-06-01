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
  Pills:     createTabs({ variant: 'pills',   color: 'primary', radius: 'xl' }),
  Underline: createTabs({ variant: 'default', color: 'primary' }),
  Outline:   createTabs({ variant: 'outline', color: 'primary', radius: 'md' }),
};
