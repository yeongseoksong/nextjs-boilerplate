import type { Metadata } from "next";
import AtomCatalog from "./AtomCatalog";

export const metadata: Metadata = {
  title: "Atom · 컴포넌트 카탈로그",
  description: "SdTitle, SdText, SdButton 등 최소 단위 컴포넌트의 전체 variant를 확인합니다.",
};

export default function AtomPage() {
  return <AtomCatalog />;
}
