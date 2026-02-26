"use client"

import { useEffect, useRef } from "react"
import { Star, Clock, ImageIcon } from "lucide-react"

const badges = [
  {
    icon: <ImageIcon className="h-6 w-6" />,
    value: "2,400+",
    label: "누적 작업물",
  },
  {
    icon: <Star className="h-6 w-6" />,
    value: "4.9",
    label: "평균 만족도",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    value: "48시간",
    label: "평균 납품일",
  },
]

export function TrustBadges() {
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
    <section ref={sectionRef} className="px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="grid grid-cols-3 gap-4 md:gap-8">
          {badges.map((badge, i) => (
            <div
              key={badge.label}
              data-animate
              className={`fade-up flex flex-col items-center gap-2 text-center delay-${(i + 1) * 100}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                {badge.icon}
              </div>
              <p className="text-2xl font-bold text-foreground md:text-3xl">
                {badge.value}
              </p>
              <p className="text-xs text-muted-foreground md:text-sm">
                {badge.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
