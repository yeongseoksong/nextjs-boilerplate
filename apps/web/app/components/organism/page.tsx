import type { Metadata } from "next";
import OrganismCatalog from "./OrganismCatalog";

export const metadata: Metadata = {
  title: "Organism · 컴포넌트 카탈로그",
  description: "HeroCarousel, SdHeader, SdFooter 등 페이지 구획 단위 컴포넌트를 확인합니다.",
};

export default function OrganismPage() {
  return <OrganismCatalog />;
}
