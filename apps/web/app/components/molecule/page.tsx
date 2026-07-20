import type { Metadata } from "next";
import MoleculeCatalog from "./MoleculeCatalog";

export const metadata: Metadata = {
  title: "Molecule · 컴포넌트 카탈로그",
  description: "SdTextBox, SdSteps, SdPricingCard 등 atom을 조합한 컴포넌트의 전체 variant를 확인합니다.",
};

export default function MoleculePage() {
  return <MoleculeCatalog />;
}
