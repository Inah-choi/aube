"use client"

import { useEffect, useRef } from "react"
import * as Accordion from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "어떤 사진을 보내면 되나요?",
    answer:
      "셀카, 폰 사진, 기존 스튜디오 사진 등 어떤 사진이든 가능합니다. 얼굴이 잘 보이는 정면 또는 약간 측면 사진이 가장 좋은 결과를 만들어냅니다.",
  },
  {
    question: "보정 결과물은 얼마나 걸리나요?",
    answer:
      "평균 48시간 이내에 납품됩니다. 급하신 경우 빠른 납품 옵션(24시간 이내)도 제공하고 있습니다.",
  },
  {
    question: "수정 요청은 가능한가요?",
    answer:
      "네, 1회 무료 수정이 포함되어 있습니다. 추가 수정이 필요한 경우 건당 소정의 추가 비용이 발생합니다.",
  },
  {
    question: "결제는 어떻게 하나요?",
    answer:
      "카카오톡 채널을 통해 상담 후 계좌이체 또는 카카오페이로 결제하실 수 있습니다.",
  },
  {
    question: "원본 파일은 어떤 형식으로 받나요?",
    answer:
      "고해상도 JPG 파일로 제공됩니다. PNG 또는 TIFF 형식이 필요하신 경우 미리 말씀해주세요.",
  },
]

export function FaqSummary() {
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
    <section ref={sectionRef} id="faq" className="px-6 py-20">
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
            {faqs.map((faq, i) => (
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
