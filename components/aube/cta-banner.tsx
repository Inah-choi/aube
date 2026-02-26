"use client"

import { useEffect, useRef } from "react"

export function CtaBanner() {
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
      { threshold: 0.2 }
    )

    const elements = section.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-accent px-6 py-16 text-center text-white md:py-20"
    >
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 h-40 w-40 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/5 translate-x-1/3 translate-y-1/3" />

      <div className="relative mx-auto max-w-2xl">
        <h2
          data-animate
          className="fade-up font-serif text-3xl font-bold md:text-4xl"
        >
          Begin Your <span className="italic">Story</span>
        </h2>
        <p
          data-animate
          className="fade-up mt-4 text-sm leading-relaxed text-white/80 delay-100 md:text-base"
        >
          카카오톡으로 간편하게 상담받고,
          <br className="sm:hidden" />
          나만의 웨딩 스냅을 완성하세요.
        </p>
        <div
          data-animate
          className="fade-up mt-8 flex flex-col items-center justify-center gap-3 delay-200 sm:flex-row sm:gap-4"
        >
          <a
            href="http://pf.kakao.com/_IxaZqX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-accent transition-all hover:bg-white/90 hover:shadow-lg"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.54-.96 3.47-.99 3.7 0 0-.02.17.09.23.11.07.24.01.24.01.32-.04 3.7-2.44 4.28-2.86.55.08 1.13.12 1.72.12 5.52 0 10-3.58 10-7.94C22 6.58 17.52 3 12 3z" />
            </svg>
            카카오톡 상담하기
          </a>
          <a
            href="#products"
            className="inline-flex items-center rounded-full border border-white/40 px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10"
          >
            상품 둘러보기
          </a>
        </div>
      </div>
    </section>
  )
}
