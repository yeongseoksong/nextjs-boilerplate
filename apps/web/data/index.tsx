import type { ClientItem, CompanyInfo, FaqItem, FeatureItem, HeroSlide, NavItem, PricingItem, SolutionItem, TestimonialItem, TimelineEvent } from '@framework/types';

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
    { id: 6, order: 6, isShow: true, label: '요금제', href: '/pricing' },
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
      order: 1,
      isShow: true,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80",
      title: "업무를 더 스마트하게, %c",
      description: "ASM과 PIMS로 자산 관리부터 프로젝트 운영까지 — 하나의 플랫폼으로 연결하세요.",
      ctas: [
      { label: '무료 체험 시작', href: '/pricing',icon: false },                       // variant 생략 → primary
      { label: '도입 문의하기', href: '/contact',variant:'secondary',icon:true},
    ]
    },
    {
      id: 2,
      order: 2,
      isShow: true,
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80",
      title: "자산을 한눈에, 스마트 자산 관리",
      description: "장비·설비·IT 자산의 수명 주기를 자동으로 추적하고 유지보수 일정을 관리하세요.",
      // ctaLabel 없으면 버튼 미노출
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

// TestimonialItem
export const testimonialItems: TestimonialItem[] = [
  {
    lines: [
      "도입 이후 자산 관리 업무 효율이 40% 향상됐습니다.",
      "지원팀의 응대도 매우 빠르고 친절합니다.",
    ],
    name: "김민준",
    role: "IT 인프라 팀장",
    company: "한국제조 주식회사",
    rating: 5,
  },
  {
    lines: [
      "기존 ERP와 연동이 깔끔하게 되어 데이터 이중 입력이 사라졌습니다.",
      "직관적인 UI 덕분에 직원들도 빠르게 적응했어요.",
    ],
    name: "이수진",
    role: "경영지원 팀장",
    company: "글로벌테크 주식회사",
    rating: 5,
  },
  {
    lines: [
      "프로젝트 납기 준수율이 눈에 띄게 올랐습니다.",
      "리소스 배분 뷰가 특히 유용합니다.",
    ],
    name: "박성호",
    role: "PMO 실장",
    company: "미래건설 주식회사",
    rating: 4,
  },
];

// PricingItem
export const pricingItems: PricingItem[] = [
  {
    name: "스타터",
    price: "₩290,000",
    period: "월",
    description: "소규모 팀을 위한 입문 플랜",
    features: [
      { text: "사용자 최대 10명", included: true },
      { text: "자산 등록 최대 500건", included: true },
      { text: "기본 대시보드", included: true },
      { text: "이메일 지원", included: true },
      { text: "API 연동", included: false },
      { text: "커스텀 보고서", included: false },
      { text: "전담 지원 매니저", included: false },
    ],
    ctaLabel: "무료로 시작하기",
  },
  {
    name: "프로",
    price: "₩690,000",
    period: "월",
    description: "성장하는 팀을 위한 핵심 플랜",
    features: [
      { text: "사용자 최대 50명", included: true },
      { text: "자산 등록 무제한", included: true },
      { text: "고급 대시보드 & 분석", included: true },
      { text: "우선 이메일·전화 지원", included: true },
      { text: "API 연동", included: true },
      { text: "커스텀 보고서", included: true },
      { text: "전담 지원 매니저", included: false },
    ],
    ctaLabel: "14일 무료 체험",
    isPopular: true,
  },
  {
    name: "엔터프라이즈",
    price: "문의",
    description: "대규모 조직을 위한 맞춤 플랜",
    features: [
      { text: "사용자 무제한", included: true },
      { text: "자산 등록 무제한", included: true },
      { text: "전용 대시보드 구성", included: true },
      { text: "24/7 전용 기술 지원", included: true },
      { text: "API & 레거시 연동", included: true },
      { text: "커스텀 보고서", included: true },
      { text: "전담 지원 매니저", included: true },
    ],
    ctaLabel: "도입 문의하기",
  },
];

// FaqItem
export const faqItems: FaqItem[] = [
  {
    question: "무료 체험 기간이 있나요?",
    answer:
      "프로 플랜은 신용카드 없이 14일 무료 체험이 가능합니다. 체험 기간 중 언제든지 취소할 수 있으며, 비용이 청구되지 않습니다.",
  },
  {
    question: "기존 ERP·HR 시스템과 연동이 가능한가요?",
    answer:
      "프로 플랜 이상에서 REST API 연동을 지원합니다. SAP, Oracle, 더존 등 국내외 주요 ERP와의 연동 사례가 있으며, 엔터프라이즈 플랜에서는 전담 엔지니어가 커스텀 연동을 지원합니다.",
  },
  {
    question: "데이터 보안은 어떻게 관리되나요?",
    answer:
      "ISO 27001 인증을 보유하고 있으며, 모든 데이터는 AES-256으로 암호화되어 국내 데이터센터에 저장됩니다. 역할 기반 접근 제어(RBAC)와 감사 로그를 통해 데이터 접근을 철저히 관리합니다.",
  },
  {
    question: "도입까지 얼마나 걸리나요?",
    answer:
      "스타터·프로 플랜은 당일 셀프 온보딩이 가능합니다. 엔터프라이즈 플랜은 요구사항 분석 → 설계 → 구축 → 교육의 4단계로 진행되며, 규모에 따라 일정이 결정됩니다.",
  },
  {
    question: "플랜을 중간에 변경할 수 있나요?",
    answer:
      "언제든지 업그레이드 또는 다운그레이드가 가능합니다. 업그레이드 시 잔여 기간 금액은 즉시 차감되며, 다운그레이드는 다음 결제 주기부터 적용됩니다.",
  },
];

// SolutionItem
export const solutionItems: SolutionItem[] = [
  {
    id: 1, order: 1, isShow: true,
    category: '제조',
    title: 'ERP 통합 솔루션',
    description: '생산·재고·구매를 하나의 플랫폼으로 통합하여 운영 효율을 높입니다.',
    ctaLabel: '자세히 보기',
  },
  {
    id: 2, order: 2, isShow: true,
    category: '물류',
    title: '스마트 물류 관리',
    description: '입출고·배송·재고를 실시간으로 추적하여 공급망 가시성을 확보합니다.',
    ctaLabel: '자세히 보기',
  },
  {
    id: 3, order: 3, isShow: true,
    category: '금융',
    title: '디지털 금융 플랫폼',
    description: '여신·수신·리스크 관리를 통합하여 금융 업무의 디지털 전환을 지원합니다.',
    ctaLabel: '자세히 보기',
  },
  {
    id: 4, order: 4, isShow: true,
    category: '유통',
    title: '옴니채널 유통 솔루션',
    description: '온·오프라인 채널을 통합하고 고객 데이터를 분석하여 매출을 극대화합니다.',
    ctaLabel: '자세히 보기',
  },
  {
    id: 5, order: 5, isShow: true,
    category: '의료',
    title: '스마트 병원 관리',
    description: '전자의무기록·예약·청구를 연계하여 환자 중심의 의료 서비스를 실현합니다.',
    ctaLabel: '자세히 보기',
  },
  {
    id: 6, order: 6, isShow: true,
    category: '공공',
    title: '공공기관 행정 시스템',
    description: '민원·행정·예산 관리를 디지털화하여 행정 효율을 높이고 시민 서비스를 개선합니다.',
    ctaLabel: '자세히 보기',
  },
];

// ClientItem
export const clientItems: ClientItem[] = [
  { name: "국립전파연구원",        url: "https://www.rra.go.kr/",             logo: "/clients/rra.jpg" },
  { name: "행정안전부",            url: "https://www.mois.go.kr/",            logo: "/clients/mois.png" },
  { name: "국민권익위원회",        url: "https://www.acrc.go.kr/",            logo: "/clients/acrc.svg" },
  { name: "국민건강보험공단",      url: "https://www.nhis.or.kr/",            logo: "/clients/nhis.png" },
  { name: "국가생명윤리정책원",    url: "https://nibp.kr/",                   logo: "/clients/nibp.png" },
  { name: "국민연금관리공단",      url: "https://www.nps.or.kr",              logo: "/clients/nps.svg" },
  { name: "한국지능정보사회진흥원", url: "https://www.nia.or.kr/",            logo: "/clients/nia.png" },
  { name: "한국방송통신전파진흥원", url: "https://www.kca.kr/",               logo: "/clients/kca.png" },
  { name: "한국교육학술정보원",    url: "https://www.keris.or.kr",            logo: "/clients/keris.png" },
  { name: "한국자산관리공사",      url: "https://www.kamco.or.kr/",           logo: "/clients/kamco.png" },
  { name: "한국정보통신기술협회",  url: "https://www.tta.or.kr/",             logo: "/clients/tta.svg" },
  { name: "한국수력원자력",        url: "https://www.khnp.co.kr/",            logo: "/clients/khnp.png" },
  { name: "한국주택금융공사",      url: "https://www.hf.go.kr/",              logo: "/clients/hf.png" },
  { name: "한국산업은행",          url: "https://www.kdb.co.kr",              logo: "/clients/kdb.png" },
  { name: "교보생명",              url: "https://www.kyobo.com/",             logo: "/clients/kyobo.png" },
  { name: "미래에셋생명",          url: "https://life.miraeasset.com/",       logo: "/clients/miraeasset.png" },
  { name: "NH농협손해보험",        url: "https://www.nhfire.co.kr/",          logo: "/clients/nhfire.png" },
  { name: "라이나생명",            url: "https://direct.e-lina.co.kr/",       logo: "/clients/lina.png" },
  { name: "SBI저축은행",           url: "https://www.babilloan.com/",         logo: "/clients/sbi.png" },
  { name: "우정정보관리원(우체국금융)", url: "https://kpds.koreapost.go.kr/", logo: "/clients/koreapost.png" },
  { name: "한국무역정보통신",      url: "https://www.ktnet.com/",             logo: "/clients/ktnet.svg" },
  { name: "SK 주식회사",           url: "https://www.sk.co.kr",               logo: "/clients/sk.png" },
];

// CompanyInfo
export const companyInfo: CompanyInfo = {
  name: '주식회사 회사명',
  registrationNumber: '000-00-00000',
  addresses: [
    {
      label: '본사', address: '서울특별시 중구 태평로1가 31', order: 1,
      embbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.919945!2d126.977929!3d37.566576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2012d5c39cf%3A0x7e11eca1405bf29b!2z7ISc7Jq47IucIOyEseyLnCDshqHsmIHroZw!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr',
    },
    {
      label: '지사', address: '경기도 수원시 팔달구 효원로 1', order: 2,
      embbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3171.836!2d127.028873!3d37.263504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b5f9c56e7cd67%3A0x84e78ef4e31b7bab!2z7IiY7JWE7IucIOyEseyLnCDsiJjslYTrjIDsnYQ!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr',
    },
  ],
  tel: '000-000-0000',
  fax: '000-000-0000',
  email: 'contact@company.kr',
  copyrightYear: new Date().getFullYear(),
};


