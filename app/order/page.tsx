import type { Metadata } from "next"
import { Navbar } from "@/components/aube/navbar"
import { Footer } from "@/components/aube/footer"
import { OrderForm } from "@/components/order/order-form"

export const metadata: Metadata = {
  title: "온라인 주문 | aube",
  description:
    "aube AI 웨딩스냅 스튜디오에서 간편하게 주문하세요. 상품과 플랜을 선택하고 주문서를 작성하면 카카오톡으로 바로 상담이 시작됩니다.",
  openGraph: {
    title: "온라인 주문 | aube",
    description:
      "상품과 플랜을 선택하고 주문서를 작성하면 카카오톡으로 바로 상담이 시작됩니다.",
    url: "https://aube.ai.kr/order",
    siteName: "aube",
    locale: "ko_KR",
    type: "website",
  },
  alternates: {
    canonical: "https://aube.ai.kr/order",
  },
}

interface PageProps {
  searchParams: Promise<{ product?: string; tier?: string }>
}

export default async function OrderPage({ searchParams }: PageProps) {
  const { product, tier } = await searchParams

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="pt-16">
        {/* Hero */}
        <section className="px-6 py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="mb-3 text-sm font-medium tracking-widest text-gold">
              ONLINE ORDER
            </p>
            <h1 className="mb-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
              간편 <span className="italic">주문하기</span>
            </h1>
            <p className="text-base text-muted-foreground">
              상품과 플랜을 선택하고 정보를 입력하면
              <br className="hidden sm:block" />
              주문서가 자동으로 생성됩니다
            </p>
          </div>
        </section>

        <OrderForm defaultProduct={product} defaultTier={tier} />
      </main>
      <Footer />
    </div>
  )
}
