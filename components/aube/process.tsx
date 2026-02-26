"use client"

import { useEffect, useRef } from "react"
import { ClipboardList, ImageUp, Cpu, Send } from "lucide-react"

const steps = [
  {
    icon: <ClipboardList className="h-6 w-6" />,
    step: "01",
    title: "주문서 작성",
    description: "웹에서 주문서를 작성하고 카카오톡으로 보내주세요",
  },
  {
    icon: <ImageUp className="h-6 w-6" />,
    step: "02",
    title: "사진 전달",
    description: "카카오톡으로 원하시는 사진을 보내주세요",
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    step: "03",
    title: "AI 생성",
    description: "AI가 프리미엄 퀄리티로 작업물을 완성합니다",
  },
  {
    icon: <Send className="h-6 w-6" />,
    step: "04",
    title: "작업물 전달",
    description: "완성된 고해상도 파일을 카카오톡으로 전달해드려요",
  },
]

export function Process() {
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
    <section ref={sectionRef} className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p
            data-animate
            className="fade-up mb-3 text-sm font-medium tracking-widest text-gold"
          >
            PROCESS
          </p>
          <h2
            data-animate
            className="fade-up font-serif text-3xl font-bold text-foreground delay-100 md:text-4xl"
          >
            How It <span className="italic">Works</span>
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.step}
              data-animate
              className={`fade-up relative flex flex-col items-center text-center delay-${(i + 1) * 100}`}
            >
              {/* Connector line (desktop only) */}
              {i < steps.length - 1 && (
                <div className="absolute top-6 left-[calc(50%+28px)] hidden h-px w-[calc(100%-56px)] bg-border lg:block" />
              )}

              <div className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                {step.icon}
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white">
                  {step.step.replace("0", "")}
                </span>
              </div>
              <h3 className="mb-1.5 text-base font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
