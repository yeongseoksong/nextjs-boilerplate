import { SdFooter } from '../ui/organism/Footer';
import type { CompanyInfo, FeatureItem, HeroSlide, NavItem, TimelineEvent } from './index';

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

// ServiceItem
export const serviceItems: FeatureItem[] = [
  {
    id: 1, order: 1, isShow: true,
    label: '컨설팅',
    title: 'IT 전략 컨설팅',
    description: '업무 프로세스를 분석하고 최적의 디지털 전환 로드맵을 수립합니다.',
  },
  {
    id: 2, order: 2, isShow: true,
    label: '구축',
    title: '시스템 구축 · 커스터마이징',
    description: '고객사 환경에 맞게 ASM·PIMS를 커스터마이징하고 안정적으로 구축합니다.',
  },
  {
    id: 3, order: 3, isShow: true,
    label: '교육',
    title: '사용자 교육 · 온보딩',
    description: '현장 담당자부터 관리자까지 역할별 맞춤 교육으로 빠른 정착을 돕습니다.',
  },
  {
    id: 4, order: 4, isShow: true,
    label: '유지보수',
    title: '운영 · 유지보수',
    description: '전담 기술지원팀이 장애 대응부터 정기 점검까지 운영 전반을 책임집니다.',
  },
  {
    id: 5, order: 5, isShow: true,
    label: '연동',
    title: 'ERP · 레거시 연동',
    description: '기존 ERP·HR·회계 시스템과 API 연동으로 데이터 단절 없이 연결합니다.',
  },
  {
    id: 6, order: 6, isShow: true,
    label: '클라우드',
    title: '클라우드 마이그레이션',
    description: '온프레미스 환경을 클라우드로 안전하게 이전하고 인프라 비용을 최적화합니다.',
  },
];

// TimelineEvent
export const timelineEvents: TimelineEvent[] = [
  { id: 1,  order: 1,  isShow: true, year: 2024, month: 11, description: '기업 부설 연구소 설립' },
  { id: 2,  order: 2,  isShow: true, year: 2024, month: 8,  description: 'PIMS v2.0 정식 출시' },
  { id: 3,  order: 3,  isShow: true, year: 2024, month: 3,  description: '공공기관 ASM 공급 계약 체결' },
  { id: 4,  order: 4,  isShow: true, year: 2023, month: 10, description: 'ISO 27001 정보보안 인증 취득' },
  { id: 5,  order: 5,  isShow: true, year: 2023, month: 6,  description: 'ASM 모바일 앱 출시 (iOS·Android)' },
  { id: 6,  order: 6,  isShow: true, year: 2023, month: 2,  description: '시리즈 A 투자 유치' },
  { id: 7,  order: 7,  isShow: true, year: 2022, month: 9,  description: 'PIMS(프로젝트 관리 시스템) 론칭' },
  { id: 8,  order: 8,  isShow: true, year: 2022, month: 4,  description: '벤처기업 인증' },
  { id: 9,  order: 9,  isShow: true, year: 2021, month: 7,  description: 'ASM(자산 관리 시스템) 베타 서비스 개시' },
  { id: 10, order: 10, isShow: true, year: 2021, month: 3,  description: '법인 설립' },
];

// CeoMessage
export const ceoMessage = {
  lines: [
    "저희 회사는 고객의 신뢰를 최우선으로 생각합니다.",
    "끊임없는 혁신과 도전을 통해 더 나은 내일을 만들어 가겠습니다.",
    "고객 여러분의 성공이 곧 저희의 성공이며, 앞으로도 변함없이 함께하겠습니다.",
  ],
  name: "홍길동",
  role: "대표이사",
};

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


