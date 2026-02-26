"use client"

import { useEffect, useRef } from "react"

export function Hero() {
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
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, hsl(30 20% 94%) 0%, hsl(40 20% 98%) 50%, hsl(30 15% 93%) 100%)",
        }}
      />

      {/* Decorative soft shapes */}
      <div className="absolute top-20 left-1/4 -z-10 h-64 w-64 rounded-full bg-rose/5 blur-3xl" />
      <div className="absolute bottom-32 right-1/4 -z-10 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />

      <div className="mx-auto max-w-3xl">
        <p
          data-animate
          className="fade-up mb-4 text-sm font-medium tracking-widest text-gold"
        >
          AI WEDDING SNAP STUDIO
        </p>
        <h1
          data-animate
          className="fade-up font-serif text-4xl font-bold leading-tight text-foreground delay-100 md:text-6xl lg:text-7xl"
        >
          One Selfie,
          <br />
          Your <span className="italic text-accent">Wedding</span> Story
        </h1>
        <p
          data-animate
          className="fade-up mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground delay-200 md:text-lg"
        >
          셀카 한 장이 웨딩 스냅이 됩니다.
          <br className="hidden sm:block" />
          AI가 만드는 프리미엄 웨딩 보정 서비스.
        </p>
        <div
          data-animate
          className="fade-up mt-8 flex flex-col items-center justify-center gap-3 delay-300 sm:flex-row sm:gap-4"
        >
          <a
            href="#products"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-rose-dark hover:shadow-lg"
          >
            상품 둘러보기
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="http://pf.kakao.com/_IxaZqX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold bg-transparent px-8 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-gold/10"
          >
            카톡 상담하기
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Scroll
          </span>
          <div className="relative h-10 w-px overflow-hidden bg-border">
            <div className="animate-scroll-line absolute inset-x-0 h-full bg-gold" />
          </div>
        </div>
      </div>
    </section>
  )
}
