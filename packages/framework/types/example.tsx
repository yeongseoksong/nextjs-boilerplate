import { SdFooter } from '../ui/organism/Footer';
import type { CompanyInfo, FeatureItem, HeroSlide, NavItem } from './index';

// NavItem
export const navItems: NavItem[] = [

  { id: 1, order: 1, isShow: true, label: '소개', href: '/about' },
    { id: 11, order: 1, isShow: true, label: '회사소개', href: '/about/company', parentId: 1 },
    { id: 12, order: 2, isShow: true, label: '팀소개', href: '/about/team', parentId: 1 },
    { id: 2, order: 2, isShow: true, label: '서비스', href: '/services' },
    { id: 3, order: 3, isShow: true, label: '솔루션', href: '/solutions' },
    { id: 4, order: 4, isShow: true, label: '상세보기', href: '/solutions/detail'},
    { id: 5, order: 5, isShow: true, label: '기타테스트', href: '/solutions/detail'},
    { id: 15, order: 1, isShow: true, label: '기타테스트', href: '/solutions/detail', parentId: 5 },
    { id: 16, order: 2, isShow: true, label: '기타테스트', href: '/solutions/detail', parentId: 5 },
];

// HeroSlide
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    order: 10,
    isShow: true,
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80",
    title: "업무를 더 스마트하게, %c",
    description: "ASM과 PIMS로 자산 관리부터 프로젝트 운영까지 — 하나의 플랫폼으로 모든 업무 흐름을 연결하세요.",
  },
  {
    id: 2,
    order: 3,
    isShow: true,
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1600&q=80",
    title: <>자산을 한눈에,{" "}<span >스마트 자산 관리</span></>,
    description: "장비·설비·IT 자산의 수명 주기를 자동으로 추적하고 유지보수 일정을 관리하세요.",
  },
  {
    id: 2,
    order: 4,
    isShow: true,
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80",
    title: <>프로젝트 납기를{" "}<span>지키는 유일한 방법</span></>,
    description: "WBS·일정·리소스·비용을 한 화면에서 관리하고 AI가 리스크를 사전에 감지합니다.",
  },
];

// FeatureItem
export const featureItems: FeatureItem[] = [
  {
    id: 1, order: 1, isShow: true,
    label: '자산 관리',
    title: '스마트 자산 추적',
    description: '장비·설비·IT 자산의 수명 주기를 자동으로 추적하고 유지보수 일정을 관리하세요.',
  },
  {
    id: 2, order: 2, isShow: true,
    label: '프로젝트',
    title: '일정 & 리소스 관리',
    description: 'WBS·일정·리소스·비용을 한 화면에서 관리하고 AI가 리스크를 사전에 감지합니다.',
  },
  {
    id: 3, order: 3, isShow: true,
    label: '대시보드',
    title: '실시간 현황 파악',
    description: '조직 전체의 자산 현황과 프로젝트 진행률을 하나의 대시보드에서 확인하세요.',
  },
  {
    id: 4, order: 4, isShow: true,
    label: '협업',
    title: '팀 협업 강화',
    description: '부서 간 업무 요청과 승인 흐름을 자동화하여 커뮤니케이션 비용을 줄입니다.',
  },
  {
    id: 5, order: 5, isShow: true,
    label: '보안',
    title: '엔터프라이즈 보안',
    description: '역할 기반 접근 제어와 감사 로그로 데이터 보안 요건을 충족합니다.',
  },
  {
    id: 6, order: 6, isShow: true,
    label: '연동',
    title: '기존 시스템 연동',
    description: 'ERP·HR·회계 시스템과 API로 연결하여 데이터를 일원화하세요.',
  },
];

// CompanyInfo
export const companyInfo: CompanyInfo = {
  name: '주식회사 회사명',
  registrationNumber: '000-00-00000',
  addresses: [
    { label: '본사', address: '서울특별시 구 동 상세주소' ,order:1},
    { label: '지사', address: '경기도 시 구 상세주소' , order:2},
  ],
  tel: '000-000-0000',
  fax: '000-000-0000',
  email: 'contact@company.kr',
  copyrightYear: new Date().getFullYear(),
};


