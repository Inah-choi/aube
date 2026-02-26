"use client"

import { useState } from "react"
import { useFadeAnimation } from "@/lib/use-fade-animation"
import * as Tabs from "@radix-ui/react-tabs"
import type { SampleImage } from "@/lib/products"

export function SampleGallery({
  samples,
  showBeforeAfter = false,
}: {
  samples: SampleImage[]
  showBeforeAfter?: boolean
}) {
  const ref = useFadeAnimation()
  const [tab, setTab] = useState<string>("portfolio")

  const portfolio = samples.filter((s) => s.type === "portfolio")
  const beforeAfter = samples.filter((s) => s.type === "before-after")

  return (
    <section ref={ref} className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p
            data-animate
            className="fade-up mb-3 text-sm font-medium tracking-widest text-gold"
          >
            GALLERY
          </p>
          <h2
            data-animate
            className="fade-up font-serif text-3xl font-bold text-foreground delay-100 md:text-4xl"
          >
            Sample <span className="italic">Works</span>
          </h2>
        </div>

        <div data-animate className="fade-up delay-200">
          {showBeforeAfter ? (
            <Tabs.Root value={tab} onValueChange={setTab}>
              <Tabs.List className="mb-8 flex justify-center gap-2">
                <Tabs.Trigger
                  value="portfolio"
                  className="rounded-full px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
                >
                  포트폴리오
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="before-after"
                  className="rounded-full px-5 py-2 text-sm font-medium transition-all data-[state=active]:bg-accent data-[state=active]:text-white data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground"
                >
                  Before &amp; After
                </Tabs.Trigger>
              </Tabs.List>

              <Tabs.Content value="portfolio">
                <PortfolioGrid items={portfolio} />
              </Tabs.Content>

              <Tabs.Content value="before-after">
                <div className="grid gap-4 sm:grid-cols-2">
                  {beforeAfter.map((s, i) => (
                    <div key={i} className="overflow-hidden rounded-xl">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="relative aspect-square bg-surface">
                          <span className="absolute bottom-2 left-2 rounded bg-foreground/70 px-2 py-0.5 text-xs text-white">
                            Before
                          </span>
                        </div>
                        <div className="relative aspect-square bg-gold/5">
                          <span className="absolute bottom-2 left-2 rounded bg-accent/80 px-2 py-0.5 text-xs text-white">
                            After
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-center text-sm text-muted-foreground">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Tabs.Content>
            </Tabs.Root>
          ) : (
            <PortfolioGrid items={portfolio} />
          )}
        </div>
      </div>
    </section>
  )
}

function PortfolioGrid({ items }: { items: SampleImage[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <div key={i} className="group overflow-hidden rounded-xl">
          <div className="aspect-[4/3] bg-surface transition-transform duration-300 group-hover:scale-105" />
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  )
}
