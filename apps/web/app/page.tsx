import { HeroCarousel, SdFeatureSection } from "@framework/ui";
import { featureItems, heroSlides } from "../data";

export default function HomePage() {
  return (
    <>
      <HeroCarousel slides={heroSlides} />
      <SdFeatureSection
        label="핵심 기능"
        title="왜 선택해야 할까요?"
        description="복잡한 엔터프라이즈 요구사항을 충족하면서도 누구나 쉽게 사용할 수 있는 올인원 플랫폼입니다."
        items={featureItems}
      />
    </>
  );
}
