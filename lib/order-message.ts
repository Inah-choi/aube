import type { OrderFormData } from "./order-schema"
import { getProductBySlug } from "./products"

export function buildOrderMessage(data: OrderFormData): string {
  const product = getProductBySlug(data.product)
  const productTitle = product?.title ?? data.product
  const tier = product?.pricing.find((t) => t.name === data.tier)
  const tierPrice = tier?.price ?? ""

  const lines: string[] = [
    "📋 aube 주문서",
    "━━━━━━━━━━━━━━━━",
    "",
    `▸ 상품: ${productTitle}`,
    `▸ 플랜: ${data.tier} (${tierPrice})`,
    "",
    `▸ 이름: ${data.name}`,
    `▸ 연락처: ${data.phone}`,
    `▸ 이메일: ${data.email}`,
  ]

  if (data.kakaoId) {
    lines.push(`▸ 카카오톡 ID: ${data.kakaoId}`)
  }

  lines.push("")
  lines.push(`▸ 배경/컨셉: ${data.concepts.join(", ")}`)

  if (data.concepts.includes("기타") && data.customConcept) {
    lines.push(`  → ${data.customConcept}`)
  }

  if (data.notes) {
    lines.push("")
    lines.push(`▸ 추가 요청사항:`)
    lines.push(data.notes)
  }

  lines.push("")
  lines.push("━━━━━━━━━━━━━━━━")
  lines.push("aube AI 웨딩스냅 스튜디오")
  lines.push("https://aube.ai.kr")

  return lines.join("\n")
}
