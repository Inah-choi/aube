"use client"

import { useFadeAnimation } from "@/lib/use-fade-animation"
import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import type { FaqItem } from "@/lib/products"

export function ProductFaq({ items }: { items: FaqItem[] }) {
  const ref = useFadeAnimation()

  return (
    <section ref={ref} className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <p
            data-animate
            className="fade-up mb-3 text-sm font-medium tracking-widest text-gold"
          >
            FAQ
          </p>
          <h2
            data-animate
            className="fade-up font-serif text-3xl font-bold text-foreground delay-100 md:text-4xl"
          >
            Questions &amp; <span className="italic">Answers</span>
          </h2>
        </div>

        <div data-animate className="fade-up delay-200">
          <Accordion.Root type="single" collapsible className="space-y-3">
            {items.map((faq, i) => (
              <Accordion.Item
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-xl border border-border bg-background"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-foreground transition-colors hover:text-accent">
                    {faq.question}
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>
    </section>
  )
}
