import { SdFeatureSection } from "@framework/ui";
import { serviceItems } from "../../data";

async function sleep(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

// 의도적 2초 지연 — Suspense fallback(SdSkeleton) 확인용
export default async function DelayedServiceSection() {
  await sleep(2000);

  return (
    <SdFeatureSection
      label="서비스"
      title="전문 서비스"
      description="도입부터 운영까지 전 주기를 지원합니다."
      items={serviceItems}
    />
  );
}
