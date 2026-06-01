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


export * from "./example"