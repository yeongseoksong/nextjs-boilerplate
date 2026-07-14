import { ReactNode } from "react";

export interface CommonInfo{
  id: number;
  order: number;
  isShow: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NavItem  extends CommonInfo{
  label: string;
  href?: string;
  highlight?: boolean;
  parentId?: number;
}

export interface HeroSlide extends CommonInfo{
  image: string;
  title: ReactNode;
  description: string;
}

export interface FeatureItem extends CommonInfo {
  icon?: ReactNode;
  label?: string;
  title: ReactNode;
  description?: ReactNode;
}

export interface CompanyAddress  {
  label: string;  
  address: string;
  order: number;
  embbedUrl?: string
}

export interface CompanyInfo {
  name: string;
  registrationNumber: string;
  addresses: CompanyAddress[];
  tel: string;
  fax?: string;
  email: string;
  copyrightYear: number;
}

export interface TimelineEvent extends CommonInfo {
  year: number;
  month: number;
  title?: string;
  description: string;
}


export interface StepItem {
  title: string;
  description?: string;
}

export interface TestimonialItem {
  lines: string[];
  name: string;
  role: string;
  company?: string;
  rating?: number;
  avatar?: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingItem {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  ctaLabel?: string;
  isPopular?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClientItem {
  name: string;
  url: string;
  logo: string;
}

export interface SolutionItem extends CommonInfo {
  category: string;
  title: ReactNode;
  description: string;
  href?: string;
  ctaLabel?: string;
  icon?: ReactNode;
}

export * from "./example"