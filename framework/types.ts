import { ReactNode } from "react";

export interface NavItem {
  label: string;
  href?: string;
}

export interface HeroSlide {
  image: string;
  title: ReactNode;
  description: string;
}
