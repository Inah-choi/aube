import { z } from "zod"

export const productSlugs = [
  "prewedding-snap",
  "doljanchi-retouch",
  "family-photo",
  "couple-snap",
  "ai-retouch",
] as const

export type ProductSlug = (typeof productSlugs)[number]

export const tierNames = ["베이직", "스탠다드", "프리미엄"] as const
export type TierName = (typeof tierNames)[number]

export const conceptOptions = [
  "클래식 스튜디오",
  "야외 가든",
  "모던 미니멀",
  "로맨틱",
  "시즌 (벚꽃/단풍/크리스마스)",
  "한복/전통",
  "캐주얼/자연스러운",
  "기타",
] as const

export type ConceptOption = (typeof conceptOptions)[number]

export const orderSchema = z.object({
  product: z.enum(productSlugs, {
    required_error: "상품을 선택해주세요",
  }),
  tier: z.enum(tierNames, {
    required_error: "플랜을 선택해주세요",
  }),
  name: z
    .string()
    .min(2, "이름은 2자 이상 입력해주세요")
    .max(20, "이름은 20자 이하로 입력해주세요"),
  phone: z
    .string()
    .regex(
      /^01[016789]-?\d{3,4}-?\d{4}$/,
      "올바른 휴대폰 번호를 입력해주세요"
    ),
  email: z
    .string()
    .email("올바른 이메일 주소를 입력해주세요")
    .max(100, "이메일은 100자 이하로 입력해주세요"),
  kakaoId: z
    .string()
    .max(30, "카카오톡 ID는 30자 이하로 입력해주세요")
    .optional()
    .or(z.literal("")),
  concepts: z
    .array(z.enum(conceptOptions))
    .min(1, "배경/컨셉을 최소 1개 선택해주세요"),
  customConcept: z
    .string()
    .max(100, "100자 이내로 입력해주세요")
    .optional()
    .or(z.literal("")),
  notes: z
    .string()
    .max(500, "추가 요청사항은 500자 이내로 입력해주세요")
    .optional()
    .or(z.literal("")),
})

export type OrderFormData = z.infer<typeof orderSchema>
