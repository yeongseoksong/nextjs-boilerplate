import type { NavItem } from "@framework/types";

/**
 * 카탈로그 사이트의 네비게이션.
 *
 * `data/index.tsx`의 navItems는 프레임워크 컴포넌트 데모용 샘플 데이터이므로
 * (SdHeader 쇼케이스에서 2단 메뉴를 보여주는 데 쓰인다) 실제 사이트 네비게이션은
 * 여기서 따로 정의한다.
 */
/**
 * SdHeader는 next/link가 아니라 Mantine Anchor(순수 <a>)로 렌더하므로
 * Next가 basePath를 붙여주지 않는다. GitHub Pages 프로젝트 페이지에서
 * 링크가 깨지지 않도록 여기서 직접 prefix를 붙인다.
 */
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const catalogNav: NavItem[] = [
  { id: 1, order: 1, isShow: true, label: "개요", href: `${base}/` },
  { id: 2, order: 2, isShow: true, label: "Atom", href: `${base}/components/atom/` },
  { id: 3, order: 3, isShow: true, label: "Molecule", href: `${base}/components/molecule/` },
  { id: 4, order: 4, isShow: true, label: "Organism", href: `${base}/components/organism/` },
  { id: 5, order: 1, isShow: true, label: "설치", href: `${base}/`,parentId: 1 },

];
