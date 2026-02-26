/**
 * 카카오톡 채널 자동응답 메시지 템플릿
 *
 * 카카오톡 채널 관리자 > 자동응답 메시지에 설정하세요.
 * 코드로 사용되지 않으며, 참조용 텍스트입니다.
 */

export const SITE_URL = "https://aube.ai.kr"
export const KAKAO_CHANNEL = "http://pf.kakao.com/_IxaZqX/chat"

/* ── 1. 환영 인사 (첫 메시지 자동 응답) ── */

export const welcomeMessage = `안녕하세요 💛 AI 웨딩스냅 스튜디오 aube입니다!

셀카 한 장으로 스튜디오급 사진을 완성해드려요 ✨

아래 메뉴에서 원하시는 항목을 선택해주세요:

📸 상품 카탈로그 보기
📋 온라인 주문하기
💬 1:1 상담 요청

🌐 홈페이지: ${SITE_URL}
📋 온라인 주문: ${SITE_URL}/order`

/* ── 2. 상품 카탈로그 ── */

export const catalogMessage = `📸 aube 상품 안내

1️⃣ 웨딩 스냅 — ₩39,000~
   셀카로 만드는 스튜디오급 웨딩 스냅

2️⃣ 돌잔치 스냅 — ₩29,000~
   우리 아이 특별한 날을 스튜디오급으로

3️⃣ 가족사진 — ₩29,000~
   각자의 사진으로 완성하는 가족 스냅

4️⃣ 커플 스냅 — ₩25,000~
   각자 셀카로 완성하는 커플 사진

5️⃣ AI 보정 — ₩15,000~
   기존 사진을 프리미엄 퀄리티로 업그레이드

━━━━━━━━━━━━━━━━
💡 상품명을 입력하시면 상세 가격을 안내해드려요!
📋 온라인 주문: ${SITE_URL}/order`

/* ── 3. 상품별 상세 (5개) ── */

export const productDetailMessages = {
  preweddingSnap: `📸 웨딩 스냅

셀카로 만드는 스튜디오급 웨딩 스냅

▸ 베이직  ₩39,000 — 보정 2장, 배경 1종, 48h 납품
▸ 스탠다드 ₩69,000 — 보정 5장, 배경 3종, 24h 납품 ⭐인기
▸ 프리미엄 ₩99,000 — 보정 10장, 배경 무제한, 12h 납품

🔗 상세보기: ${SITE_URL}/products/prewedding-snap
📋 온라인 주문: ${SITE_URL}/order?product=prewedding-snap`,

  doljanchiRetouch: `👶 돌잔치 스냅

우리 아이 특별한 날을 스튜디오급으로

▸ 베이직  ₩29,000 — 결과물 3장, 배경 1종, 48h 납품
▸ 스탠다드 ₩49,000 — 결과물 8장, 배경 3종, 24h 납품 ⭐인기
▸ 프리미엄 ₩79,000 — 결과물 15장, 배경 무제한, 12h 납품

🔗 상세보기: ${SITE_URL}/products/doljanchi-retouch
📋 온라인 주문: ${SITE_URL}/order?product=doljanchi-retouch`,

  familyPhoto: `👨‍👩‍👧‍👦 가족사진

각자의 사진으로 완성하는 가족 스냅

▸ 베이직  ₩29,000 — 결과물 3장, 배경 1종, 48h 납품
▸ 스탠다드 ₩49,000 — 결과물 8장, 배경 3종, 24h 납품 ⭐인기
▸ 프리미엄 ₩69,000 — 결과물 15장, 배경 무제한, 12h 납품

🔗 상세보기: ${SITE_URL}/products/family-photo
📋 온라인 주문: ${SITE_URL}/order?product=family-photo`,

  coupleSnap: `💕 커플 스냅

각자 셀카로 완성하는 커플 사진

▸ 베이직  ₩25,000 — 결과물 2장, 배경 1종, 48h 납품
▸ 스탠다드 ₩45,000 — 결과물 5장, 배경 3종, 24h 납품 ⭐인기
▸ 프리미엄 ₩65,000 — 결과물 10장, 배경 무제한, 12h 납품

🔗 상세보기: ${SITE_URL}/products/couple-snap
📋 온라인 주문: ${SITE_URL}/order?product=couple-snap`,

  aiRetouch: `✨ AI 보정

기존 사진을 프리미엄 퀄리티로 업그레이드

▸ 베이직  ₩15,000 — 보정 2장, 기본 보정, 48h 납품
▸ 스탠다드 ₩35,000 — 보정 5장, 프리미엄 보정, 24h 납품 ⭐인기
▸ 프리미엄 ₩55,000 — 보정 10장, 풀 리터칭, 12h 납품

🔗 상세보기: ${SITE_URL}/products/ai-retouch
📋 온라인 주문: ${SITE_URL}/order?product=ai-retouch`,
}

/* ── 4. 주문 안내 ── */

export const orderGuideMessage = `📋 온라인 주문 안내

aube는 카카오톡으로 간편하게 주문할 수 있어요!

① 주문서 작성
   → ${SITE_URL}/order
   상품·플랜 선택 후 정보를 입력해주세요

② 주문서 복사
   작성 완료 후 [복사하기] 버튼을 눌러주세요

③ 카카오톡으로 전송
   [카카오톡으로 보내기] 버튼을 눌러
   복사한 주문서를 채팅에 붙여넣기 해주세요

④ 확인 & 안내
   담당자가 확인 후 결제 및 진행 방법을 안내드려요

━━━━━━━━━━━━━━━━
📋 온라인 주문: ${SITE_URL}/order
💬 바로 상담: ${KAKAO_CHANNEL}`
