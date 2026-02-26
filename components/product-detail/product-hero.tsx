"use client"

import Link from "next/link"
import { useFadeAnimation } from "@/lib/use-fade-animation"
import type { ProductDetail } from "@/lib/products"

export function ProductHero({ product }: { product: ProductDetail }) {
  const ref = useFadeAnimation()

  return (
    <section ref={ref} className="px-6 py-20">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        {/* Image gallery placeholder */}
        <div data-animate className="fade-up">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 aspect-[4/3] rounded-2xl bg-surface" />
            <div className="aspect-square rounded-xl bg-gold/5" />
            <div className="aspect-square rounded-xl bg-gold/5" />
          </div>
        </div>

        {/* Product info */}
        <div data-animate className="fade-up delay-200">
          <p className="mb-2 text-sm font-medium tracking-widest text-gold">
            {product.titleEn.toUpperCase()}
          </p>
          <h1 className="mb-4 font-serif text-4xl font-bold text-foreground md:text-5xl">
            {product.title}
          </h1>
          <p className="mb-6 text-base leading-relaxed text-muted-foreground">
            {product.longDescription}
          </p>

          {/* Highlights */}
          <ul className="mb-8 space-y-2.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-center gap-2.5 text-sm text-foreground">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {h}
              </li>
            ))}
          </ul>

          {/* Price + CTA */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-bold text-accent">{product.price}</span>
            <Link
              href={`/order?product=${product.slug}`}
              className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-rose-dark"
            >
              온라인 주문하기
            </Link>
            <a
              href="http://pf.kakao.com/_IxaZqX/chat"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-accent hover:text-accent"
            >
              카카오톡 상담하기
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
