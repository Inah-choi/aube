"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { getAllProducts } from "@/lib/products"
import { getProductIcon } from "@/lib/product-icons"

const products = getAllProducts()

export function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = section.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="products" className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p
            data-animate
            className="fade-up mb-3 text-sm font-medium tracking-widest text-gold"
          >
            PRODUCTS
          </p>
          <h2
            data-animate
            className="fade-up font-serif text-3xl font-bold text-foreground delay-100 md:text-4xl"
          >
            Our <span className="italic">Collection</span>
          </h2>
        </div>

        {/* 윗줄 3개 */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product, i) => {
            const Icon = getProductIcon(product.iconName)
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                data-animate
                className={`fade-up group cursor-pointer rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg delay-${(i + 1) * 100}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1.5 text-lg font-bold text-foreground">
                  {product.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-accent">{product.price}</p>
              </Link>
            )
          })}
        </div>
        {/* 아랫줄 2개 가운데 정렬 */}
        <div className="mt-5 flex justify-center gap-5">
          {products.slice(3).map((product, i) => {
            const Icon = getProductIcon(product.iconName)
            return (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                data-animate
                className={`fade-up group w-full cursor-pointer rounded-xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:shadow-lg sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] delay-${(i + 4) * 100}`}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1.5 text-lg font-bold text-foreground">
                  {product.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <p className="text-lg font-bold text-accent">{product.price}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
