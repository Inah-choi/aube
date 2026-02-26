"use client"

import Link from "next/link"
import { useFadeAnimation } from "@/lib/use-fade-animation"
import { getProductIcon } from "@/lib/product-icons"
import type { ProductDetail } from "@/lib/products"

export function RelatedProducts({ products }: { products: ProductDetail[] }) {
  const ref = useFadeAnimation()

  return (
    <section ref={ref} className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p
            data-animate
            className="fade-up mb-3 text-sm font-medium tracking-widest text-gold"
          >
            MORE
          </p>
          <h2
            data-animate
            className="fade-up font-serif text-3xl font-bold text-foreground delay-100 md:text-4xl"
          >
            More <span className="italic">Services</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => {
            const Icon = getProductIcon(p.iconName)
            return (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                data-animate
                className={`fade-up group rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg delay-${
                  (i + 1) * 100
                }`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1.5 text-lg font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {p.description}
                </p>
                <p className="text-lg font-bold text-accent">{p.price}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
