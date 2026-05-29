import { HeroSlide, NavItem } from "../types";

export const navItems: NavItem[] = [
  { label: "제품" },
  { label: "솔루션" },
  { label: "고객사례" },
  { label: "가격" },
];

export const heroSlides: HeroSlide[] = [
  {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80",
    title: "업무를 더 스마트하게, %c",
    description: "ASM과 PIMS로 자산 관리부터 프로젝트 운영까지 — 하나의 플랫폼으로 모든 업무 흐름을 연결하세요.",
  },
  {
    image: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1600&q=80",
    title: <>자산을 한눈에,{" "}<span >스마트 자산 관리</span></>,
    description: "장비·설비·IT 자산의 수명 주기를 자동으로 추적하고 유지보수 일정을 관리하세요.",
  },
  {
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=80",
    title: <>프로젝트 납기를{" "}<span>지키는 유일한 방법</span></>,
    description: "WBS·일정·리소스·비용을 한 화면에서 관리하고 AI가 리스크를 사전에 감지합니다.",
  },
];

export const features = [
  { title: "빠른 온보딩", desc: "5분 안에 팀을 초대하고 바로 업무를 시작하세요. 복잡한 설정은 필요 없습니다." },
  { title: "시스템 통합", desc: "ERP, HR, 회계 시스템과 원클릭으로 연동해 데이터를 한 곳에서 관리하세요." },
  { title: "실시간 대시보드", desc: "자산 현황, 프로젝트 진척률, 비용 분석을 실시간으로 확인하세요." },
  { title: "엔터프라이즈 보안", desc: "ISO 27001 인증 · RBAC 권한 관리 · AES-256 암호화로 데이터를 보호합니다." },
  { title: "AI 자동화", desc: "반복 업무를 AI가 처리합니다. 승인 플로우, 알림, 보고서를 자동으로 생성하세요." },
  { title: "글로벌 지원", desc: "한국어·영어·일본어를 지원하며 다국적 팀도 문제없이 사용할 수 있습니다." },
];
