"use client"

import Link from "next/link"
import { useFadeAnimation } from "@/lib/use-fade-animation"
import { Check } from "lucide-react"
import type { PricingTier } from "@/lib/products"

export function PricingTable({
  tiers,
  productSlug,
}: {
  tiers: PricingTier[]
  productSlug?: string
}) {
  const ref = useFadeAnimation()

  return (
    <section ref={ref} className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p
            data-animate
            className="fade-up mb-3 text-sm font-medium tracking-widest text-gold"
          >
            PRICING
          </p>
          <h2
            data-animate
            className="fade-up font-serif text-3xl font-bold text-foreground delay-100 md:text-4xl"
          >
            Choose Your <span className="italic">Plan</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <div
              key={tier.name}
              data-animate
              className={`fade-up relative flex flex-col rounded-2xl border bg-background p-6 transition-all delay-${
                (i + 1) * 100
              } ${
                tier.popular
                  ? "border-accent ring-2 ring-accent/20"
                  : "border-border"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-white">
                  인기
                </span>
              )}
              <h3 className="mb-1 text-lg font-bold text-foreground">
                {tier.name}
              </h3>
              <p className="mb-6 text-3xl font-bold text-accent">{tier.price}</p>
              <ul className="mb-8 flex-1 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={
                  productSlug
                    ? `/order?product=${productSlug}&tier=${encodeURIComponent(tier.name)}`
                    : "http://pf.kakao.com/_IxaZqX/chat"
                }
                {...(!productSlug && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className={`block rounded-full py-3 text-center text-sm font-medium transition-all ${
                  tier.popular
                    ? "bg-accent text-white hover:bg-rose-dark"
                    : "border border-border text-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {productSlug ? "주문하기" : "상담 신청"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
