"use client"

import Link from "next/link"
import { useFadeAnimation } from "@/lib/use-fade-animation"

export function ProductCta({
  title,
  productSlug,
}: {
  title: string
  productSlug?: string
}) {
  const ref = useFadeAnimation()

  return (
    <section ref={ref} className="px-6 py-20">
      <div
        data-animate
        className="fade-up relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-accent px-8 py-16 text-center text-white"
      >
        {/* Decorative shapes */}
        <div className="absolute -top-10 -left-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10" />

        <p className="relative mb-3 text-sm font-medium tracking-widest text-white/70">
          GET STARTED
        </p>
        <h2 className="relative mb-4 font-serif text-3xl font-bold md:text-4xl">
          {title}, 지금 <span className="italic">시작</span>하세요
        </h2>
        <p className="relative mb-8 text-white/80">
          카카오톡으로 편하게 상담받으세요. 빠르고 친절하게 안내해드립니다.
        </p>
        <div className="relative flex flex-wrap items-center justify-center gap-3">
          {productSlug && (
            <Link
              href={`/order?product=${productSlug}`}
              className="inline-block rounded-full bg-white px-8 py-3 text-sm font-bold text-accent transition-all hover:bg-white/90"
            >
              온라인 주문하기
            </Link>
          )}
          <a
            href="http://pf.kakao.com/_IxaZqX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block rounded-full px-8 py-3 text-sm font-bold transition-all ${
              productSlug
                ? "border border-white/40 text-white hover:bg-white/10"
                : "bg-white text-accent hover:bg-white/90"
            }`}
          >
            카카오톡 상담하기
          </a>
        </div>
      </div>
    </section>
  )
}
