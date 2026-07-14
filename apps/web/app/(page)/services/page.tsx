"use client";

import { PageLayout, SdFeatureSection } from "@framework/ui";
import { serviceItems } from "../../../data";

export default function ServicesPage() {
  return (
    <PageLayout.Minimal
      label="service"
      title="서비스"
      description="고객의 디지털 전환을 처음부터 끝까지 함께합니다."
    >
      <SdFeatureSection
        label="What We Do"
        title="제공 서비스"
        description="컨설팅부터 운영까지, 전 과정을 원스톱으로 지원합니다."
        items={serviceItems}
      />
    </PageLayout.Minimal>
  );
}
