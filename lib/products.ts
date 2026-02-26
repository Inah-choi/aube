/* ── Types ── */

export type ProductIconName = "Camera" | "Baby" | "Users" | "Heart" | "Sparkles"

export interface PricingTier {
  name: string
  price: string
  features: string[]
  popular?: boolean
}

export interface FaqItem {
  question: string
  answer: string
}

export interface SampleImage {
  type: "before-after" | "portfolio"
  label: string
}

export interface ProductDetail {
  slug: string
  iconName: ProductIconName
  title: string
  titleEn: string
  description: string
  longDescription: string
  price: string
  highlights: string[]
  pricing: PricingTier[]
  samples: SampleImage[]
  faq: FaqItem[]
  process: { step: string; title: string; description: string }[]
  relatedSlugs: string[]
}

/* ── Data ── */

const products: ProductDetail[] = [
  {
    slug: "prewedding-snap",
    iconName: "Camera",
    title: "웨딩 스냅",
    titleEn: "Wedding Snap",
    description: "셀카로 만드는 스튜디오급 웨딩 스냅",
    longDescription:
      "스튜디오에 가지 않아도, 셀카 한 장이면 충분합니다. AI가 배경·조명·피부톤을 자연스럽게 보정하여 프리미엄 웨딩 스냅을 완성합니다.",
    price: "₩39,000~",
    highlights: [
      "셀카 1장으로 스튜디오급 결과물",
      "다양한 배경·컨셉 선택 가능",
      "48시간 이내 납품",
      "1회 무료 수정 포함",
    ],
    pricing: [
      {
        name: "베이직",
        price: "₩39,000",
        features: ["보정 사진 2장", "배경 1종 선택", "48시간 납품", "1회 수정"],
      },
      {
        name: "스탠다드",
        price: "₩69,000",
        features: [
          "보정 사진 5장",
          "배경 3종 선택",
          "24시간 납품",
          "2회 수정",
          "원본 파일 제공",
        ],
        popular: true,
      },
      {
        name: "프리미엄",
        price: "₩99,000",
        features: [
          "보정 사진 10장",
          "배경 무제한",
          "12시간 납품",
          "무제한 수정",
          "원본 + 인화 파일",
          "전문가 1:1 컨설팅",
        ],
      },
    ],
    samples: [
      { type: "portfolio", label: "클래식 웨딩" },
      { type: "portfolio", label: "가든 웨딩" },
      { type: "portfolio", label: "모던 스튜디오" },
      { type: "before-after", label: "보정 전후 비교 1" },
      { type: "before-after", label: "보정 전후 비교 2" },
    ],
    faq: [
      {
        question: "셀카로도 정말 웨딩 사진이 나오나요?",
        answer:
          "네, AI가 조명·배경·피부톤을 자연스럽게 보정합니다. 정면 셀카가 가장 좋은 결과를 만들어냅니다.",
      },
      {
        question: "어떤 배경을 선택할 수 있나요?",
        answer:
          "스튜디오, 가든, 해변, 유럽풍 등 다양한 배경을 제공합니다. 원하시는 레퍼런스를 보내주시면 맞춤 제작도 가능합니다.",
      },
      {
        question: "커플 사진도 가능한가요?",
        answer:
          "네, 두 분의 사진을 각각 보내주시면 자연스러운 커플 웨딩 사진을 완성해드립니다.",
      },
    ],
    process: [
      { step: "01", title: "주문서 작성", description: "웹에서 주문서를 작성하고 카카오톡으로 보내주세요" },
      { step: "02", title: "사진 전달", description: "카카오톡으로 셀카를 보내주세요" },
      { step: "03", title: "AI 생성", description: "AI가 프리미엄 웨딩 스냅을 완성합니다" },
      { step: "04", title: "작업물 전달", description: "완성된 고해상도 파일을 전달해드려요" },
    ],
    relatedSlugs: ["couple-snap", "ai-retouch", "doljanchi-retouch"],
  },
  {
    slug: "doljanchi-retouch",
    iconName: "Baby",
    title: "돌잔치 스냅",
    titleEn: "Doljanchi Snap",
    description: "우리 아이 특별한 날을 스튜디오급으로",
    longDescription:
      "아이 사진 한 장이면 충분합니다. AI가 배경·조명·분위기를 완성하여 전문 스튜디오에서 촬영한 듯한 돌잔치 사진을 만들어드립니다.",
    price: "₩29,000~",
    highlights: [
      "아이 사진으로 스튜디오급 결과물",
      "다양한 돌잔치 배경·컨셉 선택",
      "48시간 이내 납품",
      "1회 무료 수정 포함",
    ],
    pricing: [
      {
        name: "베이직",
        price: "₩29,000",
        features: ["결과물 3장", "배경 1종 선택", "48시간 납품", "1회 수정"],
      },
      {
        name: "스탠다드",
        price: "₩49,000",
        features: [
          "결과물 8장",
          "배경 3종 선택",
          "24시간 납품",
          "2회 수정",
          "원본 파일 제공",
        ],
        popular: true,
      },
      {
        name: "프리미엄",
        price: "₩79,000",
        features: [
          "결과물 15장",
          "배경 무제한",
          "12시간 납품",
          "무제한 수정",
          "원본 + 인화 파일",
          "전문가 1:1 컨설팅",
        ],
      },
    ],
    samples: [
      { type: "portfolio", label: "전통 돌상 컨셉" },
      { type: "portfolio", label: "모던 파티 컨셉" },
      { type: "portfolio", label: "가족 단체 컨셉" },
      { type: "before-after", label: "변환 전후 비교 1" },
      { type: "before-after", label: "변환 전후 비교 2" },
    ],
    faq: [
      {
        question: "아이 셀카로도 정말 돌잔치 사진이 나오나요?",
        answer:
          "네, AI가 배경·조명·분위기를 자연스럽게 합성합니다. 얼굴이 잘 보이는 사진이 가장 좋은 결과를 만듭니다.",
      },
      {
        question: "어떤 배경을 선택할 수 있나요?",
        answer:
          "전통 돌상, 모던 파티, 야외 가든 등 다양한 배경을 제공합니다. 레퍼런스를 보내주시면 맞춤 제작도 가능합니다.",
      },
      {
        question: "가족 사진도 함께 만들 수 있나요?",
        answer:
          "네, 가족 구성원 사진을 각각 보내주시면 자연스러운 가족 돌잔치 사진을 완성해드립니다.",
      },
    ],
    process: [
      { step: "01", title: "주문서 작성", description: "웹에서 주문서를 작성하고 카카오톡으로 보내주세요" },
      { step: "02", title: "사진 전달", description: "카카오톡으로 아이 사진을 보내주세요" },
      { step: "03", title: "AI 생성", description: "AI가 스튜디오급 돌잔치 사진을 완성합니다" },
      { step: "04", title: "작업물 전달", description: "완성된 고해상도 파일을 전달해드려요" },
    ],
    relatedSlugs: ["family-photo", "ai-retouch", "prewedding-snap"],
  },
  {
    slug: "family-photo",
    iconName: "Users",
    title: "가족사진",
    titleEn: "Family Photo",
    description: "각자의 사진으로 완성하는 가족 스냅",
    longDescription:
      "따로 찍은 사진도 괜찮습니다. 가족 구성원 사진을 보내주시면, AI가 자연스러운 배경과 조명으로 함께 모인 듯한 가족사진을 완성합니다.",
    price: "₩49,000~",
    highlights: [
      "개별 사진으로 가족 단체사진 완성",
      "다양한 배경·컨셉 선택 가능",
      "최대 10인 합성 가능",
      "1회 무료 수정 포함",
    ],
    pricing: [
      {
        name: "베이직",
        price: "₩49,000",
        features: ["결과물 3장", "최대 4인", "배경 1종 선택", "48시간 납품", "1회 수정"],
      },
      {
        name: "스탠다드",
        price: "₩79,000",
        features: [
          "결과물 8장",
          "최대 6인",
          "배경 3종 선택",
          "24시간 납품",
          "2회 수정",
          "원본 파일 제공",
        ],
        popular: true,
      },
      {
        name: "프리미엄",
        price: "₩119,000",
        features: [
          "결과물 15장",
          "최대 10인",
          "배경 무제한",
          "12시간 납품",
          "무제한 수정",
          "원본 + 인화 파일",
          "전문가 1:1 컨설팅",
        ],
      },
    ],
    samples: [
      { type: "portfolio", label: "스튜디오 컨셉" },
      { type: "portfolio", label: "야외 가든 컨셉" },
      { type: "portfolio", label: "홈 스튜디오 컨셉" },
      { type: "before-after", label: "변환 전후 비교 1" },
      { type: "before-after", label: "변환 전후 비교 2" },
    ],
    faq: [
      {
        question: "가족 구성원이 따로 찍은 사진도 되나요?",
        answer:
          "네, 각자 따로 찍은 사진을 보내주시면 AI가 한 장소에서 함께 찍은 듯한 가족사진을 만들어드립니다.",
      },
      {
        question: "어떤 배경을 선택할 수 있나요?",
        answer:
          "스튜디오, 야외 가든, 공원, 집 등 다양한 배경을 제공합니다. 레퍼런스를 보내주시면 맞춤 제작도 가능합니다.",
      },
      {
        question: "반려동물도 포함할 수 있나요?",
        answer:
          "물론입니다. 반려동물 사진도 함께 보내주시면 가족 모두가 담긴 사진을 완성합니다.",
      },
    ],
    process: [
      { step: "01", title: "주문서 작성", description: "웹에서 주문서를 작성하고 카카오톡으로 보내주세요" },
      { step: "02", title: "사진 전달", description: "카카오톡으로 가족 구성원 사진을 보내주세요" },
      { step: "03", title: "AI 생성", description: "AI가 자연스러운 가족사진을 완성합니다" },
      { step: "04", title: "작업물 전달", description: "완성된 고해상도 파일을 전달해드려요" },
    ],
    relatedSlugs: ["doljanchi-retouch", "couple-snap", "ai-retouch"],
  },
  {
    slug: "couple-snap",
    iconName: "Heart",
    title: "커플 스냅",
    titleEn: "Couple Snap",
    description: "각자 셀카로 완성하는 커플 사진",
    longDescription:
      "따로 찍어도 함께한 것처럼. 각자의 셀카를 보내주시면 AI가 자연스러운 배경과 분위기로 둘만의 커플 스냅을 완성합니다.",
    price: "₩25,000~",
    highlights: [
      "각자 셀카로 커플 사진 완성",
      "다양한 배경·컨셉 선택 가능",
      "48시간 이내 납품",
      "1회 무료 수정 포함",
    ],
    pricing: [
      {
        name: "베이직",
        price: "₩25,000",
        features: ["결과물 2장", "배경 1종 선택", "48시간 납품", "1회 수정"],
      },
      {
        name: "스탠다드",
        price: "₩45,000",
        features: [
          "결과물 5장",
          "배경 3종 선택",
          "24시간 납품",
          "2회 수정",
          "원본 파일 제공",
        ],
        popular: true,
      },
      {
        name: "프리미엄",
        price: "₩65,000",
        features: [
          "결과물 10장",
          "배경 무제한",
          "12시간 납품",
          "무제한 수정",
          "SNS용 + 인화용",
          "영상 슬라이드쇼",
        ],
      },
    ],
    samples: [
      { type: "portfolio", label: "데이트 컨셉" },
      { type: "portfolio", label: "기념일 컨셉" },
      { type: "portfolio", label: "시즌 컨셉" },
      { type: "before-after", label: "변환 전후 비교 1" },
      { type: "before-after", label: "변환 전후 비교 2" },
    ],
    faq: [
      {
        question: "각자 따로 찍은 셀카로도 되나요?",
        answer:
          "네, 두 분의 개별 셀카를 보내주시면 AI가 함께 찍은 듯한 자연스러운 커플 사진을 만들어드립니다.",
      },
      {
        question: "어떤 배경을 선택할 수 있나요?",
        answer:
          "캐주얼, 스튜디오, 야외, 시즌(벚꽃, 단풍 등) 다양한 배경을 제공합니다. 레퍼런스를 보내주시면 맞춤 제작도 가능합니다.",
      },
      {
        question: "SNS에 바로 올릴 수 있는 사이즈도 주나요?",
        answer:
          "네, 인스타그램 피드·스토리 사이즈 등 SNS 최적화 파일을 함께 제공합니다.",
      },
    ],
    process: [
      { step: "01", title: "주문서 작성", description: "웹에서 주문서를 작성하고 카카오톡으로 보내주세요" },
      { step: "02", title: "사진 전달", description: "카카오톡으로 각자 셀카를 보내주세요" },
      { step: "03", title: "AI 생성", description: "AI가 자연스러운 커플 스냅을 완성합니다" },
      { step: "04", title: "작업물 전달", description: "완성된 고해상도 파일을 전달해드려요" },
    ],
    relatedSlugs: ["prewedding-snap", "ai-retouch", "family-photo"],
  },
  {
    slug: "ai-retouch",
    iconName: "Sparkles",
    title: "AI 보정",
    titleEn: "AI Retouch",
    description: "기존 사진을 프리미엄 퀄리티로 업그레이드",
    longDescription:
      "이미 가지고 있는 사진을 프리미엄 퀄리티로 업그레이드. 피부 보정, 색감 조정, 배경 개선까지 AI가 한 번에 처리합니다.",
    price: "₩15,000~",
    highlights: [
      "자연스러운 피부 보정",
      "전문가급 색감 보정",
      "배경 정리 및 개선",
      "고해상도 업스케일링",
    ],
    pricing: [
      {
        name: "베이직",
        price: "₩15,000",
        features: ["보정 사진 2장", "기본 피부 보정", "48시간 납품", "1회 수정"],
      },
      {
        name: "스탠다드",
        price: "₩35,000",
        features: [
          "보정 사진 5장",
          "프리미엄 보정",
          "24시간 납품",
          "2회 수정",
          "배경 개선 포함",
        ],
        popular: true,
      },
      {
        name: "프리미엄",
        price: "₩55,000",
        features: [
          "보정 사진 10장",
          "풀 리터칭",
          "12시간 납품",
          "무제한 수정",
          "업스케일링",
          "인화용 파일 제공",
        ],
      },
    ],
    samples: [
      { type: "before-after", label: "피부 보정" },
      { type: "before-after", label: "색감 보정" },
      { type: "before-after", label: "배경 개선" },
      { type: "portfolio", label: "프로필 보정" },
      { type: "portfolio", label: "증명사진 보정" },
    ],
    faq: [
      {
        question: "오래된 사진도 보정 가능한가요?",
        answer:
          "네, 오래된 사진의 복원 및 화질 개선도 가능합니다. 스캔 사진도 접수 가능합니다.",
      },
      {
        question: "보정 강도를 조절할 수 있나요?",
        answer:
          "네, 자연스러운 보정부터 강한 보정까지 원하시는 수준으로 조절 가능합니다.",
      },
      {
        question: "증명사진 보정도 가능한가요?",
        answer:
          "네, 여권·이력서용 증명사진 보정도 제공합니다. 규격에 맞춘 파일로 제공됩니다.",
      },
    ],
    process: [
      { step: "01", title: "주문서 작성", description: "웹에서 주문서를 작성하고 카카오톡으로 보내주세요" },
      { step: "02", title: "사진 전달", description: "카카오톡으로 보정할 사진을 보내주세요" },
      { step: "03", title: "AI 보정", description: "전문가급 AI 보정을 진행합니다" },
      { step: "04", title: "작업물 전달", description: "완성된 고해상도 파일을 전달해드려요" },
    ],
    relatedSlugs: ["prewedding-snap", "couple-snap", "family-photo"],
  },
]

/* ── Helpers ── */

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return products.find((p) => p.slug === slug)
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug)
}

export function getRelatedProducts(slugs: string[]): ProductDetail[] {
  return slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is ProductDetail => p !== undefined)
}

/** Subset used by the home product grid */
export function getAllProducts() {
  return products.map(({ slug, iconName, title, description, price }) => ({
    slug,
    iconName,
    title,
    description,
    price,
  }))
}
