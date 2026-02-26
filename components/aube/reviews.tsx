"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

const reviews = [
  {
    name: "김○○",
    product: "웨딩 스냅",
    rating: 5,
    text: "셀카 한 장으로 이렇게 자연스러운 웨딩 사진이 나올 줄 몰랐어요. 주변에서 실제 스튜디오에서 찍은 줄 알았어요!",
  },
  {
    name: "이○○",
    product: "돌잔치 보정",
    rating: 5,
    text: "아이 돌잔치 사진을 보정받았는데, 색감이 정말 예쁘게 나왔어요. 납품도 빨라서 만족합니다.",
  },
  {
    name: "박○○",
    product: "가족사진",
    rating: 5,
    text: "온 가족이 함께 찍은 사진인데, 한 명 한 명 다 예쁘게 보정해주셨어요. 액자로 걸어놓기 딱 좋아요.",
  },
  {
    name: "최○○",
    product: "커플 스냅",
    rating: 4,
    text: "여행 가서 찍은 사진을 보정받았는데, 마치 화보 같은 느낌이에요. 다음에 또 맡기려고요!",
  },
  {
    name: "정○○",
    product: "AI 보정",
    rating: 5,
    text: "단순 보정인데도 퀄리티가 남다르네요. 가격 대비 만족도가 정말 높아요. 강력 추천합니다.",
  },
]

export function Reviews() {
  const sectionRef = useRef<HTMLElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev())
      setCanScrollNext(emblaApi.canScrollNext())
    }
    emblaApi.on("select", onSelect)
    onSelect()
    return () => {
      emblaApi.off("select", onSelect)
    }
  }, [emblaApi])

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
    <section ref={sectionRef} className="bg-surface px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p
              data-animate
              className="fade-up mb-3 text-sm font-medium tracking-widest text-gold"
            >
              REVIEWS
            </p>
            <h2
              data-animate
              className="fade-up font-serif text-3xl font-bold text-foreground delay-100 md:text-4xl"
            >
              Client <span className="italic">Stories</span>
            </h2>
          </div>
          <div data-animate className="fade-up hidden gap-2 delay-200 sm:flex">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-secondary disabled:opacity-40"
              aria-label="이전 후기"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-secondary disabled:opacity-40"
              aria-label="다음 후기"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div data-animate className="fade-up delay-300">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-5">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="min-w-0 flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%]"
                >
                  <div className="h-full rounded-xl border border-border bg-background p-6">
                    <div className="mb-3 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`h-4 w-4 ${
                            j < review.rating
                              ? "fill-gold text-gold"
                              : "text-border"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-foreground">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="mt-auto">
                      <p className="text-sm font-semibold text-foreground">
                        {review.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {review.product}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
