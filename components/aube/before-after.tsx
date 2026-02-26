"use client"

import { useEffect, useRef, useState } from "react"
import { Sparkles } from "lucide-react"

/* ── Tab / Card data ── */

interface BeforePhoto {
  emoji: string
  label: string
  sublabel?: string
  bg: string
  small?: boolean
}

interface CardData {
  id: string
  tab: string
  badge: string
  subtitle: string
  before: BeforePhoto[]
  /** optional secondary row (e.g. parents in doljanchi) */
  beforeSecondary?: BeforePhoto[]
  afterEmoji: string
  afterText: string
  afterSub: string
  features: string[]
  layout: "wedding" | "single" | "family"
}

const cards: CardData[] = [
  {
    id: "wedding",
    tab: "웨딩 스냅",
    badge: "Wedding",
    subtitle: "증명사진 2장이면 충분합니다",
    before: [
      { emoji: "\uD83D\uDC70", label: "신부 증명사진", sublabel: "신부 사진", bg: "bg-blue-100" },
      { emoji: "\uD83E\uDD35", label: "신랑 증명사진", sublabel: "신랑 사진", bg: "bg-blue-100" },
    ],
    afterEmoji: "\u2728",
    afterText: "AI 생성 웨딩 스냅",
    afterSub: "야외 로맨틱 / 스튜디오 / 한복",
    features: ["얼굴 합성", "의상 생성", "배경 생성", "포즈 생성"],
    layout: "wedding",
  },
  {
    id: "doljanchi",
    tab: "돌잔치 스냅",
    badge: "Doljanchi",
    subtitle: "아기 사진 1장이면 충분합니다",
    before: [
      { emoji: "\uD83D\uDC76", label: "아기 일상 사진", sublabel: "아기 사진", bg: "bg-pink-100" },
    ],
    beforeSecondary: [
      { emoji: "\uD83D\uDC69", label: "엄마 (선택)", bg: "bg-amber-50", small: true },
      { emoji: "\uD83D\uDC68", label: "아빠 (선택)", bg: "bg-amber-50", small: true },
    ],
    afterEmoji: "\uD83C\uDF82",
    afterText: "AI 생성 돌잔치 스냅",
    afterSub: "한복 / 양장 / 파티 테마",
    features: ["얼굴 합성", "한복/양장 생성", "돌상 배경", "가족 합성"],
    layout: "single",
  },
  {
    id: "family",
    tab: "가족사진 스냅",
    badge: "Family",
    subtitle: "가족 사진 각 1장씩이면 충분합니다",
    before: [
      { emoji: "\uD83D\uDC74", label: "할아버지", bg: "bg-purple-100", small: true },
      { emoji: "\uD83D\uDC75", label: "할머니", bg: "bg-pink-100", small: true },
      { emoji: "\uD83D\uDC68", label: "아빠", bg: "bg-emerald-100", small: true },
      { emoji: "\uD83D\uDC69", label: "엄마", bg: "bg-amber-50", small: true },
    ],
    afterEmoji: "\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66",
    afterText: "AI 생성 가족 화보",
    afterSub: "스튜디오 / 정장 / 한복 / 캐주얼",
    features: ["다인원 합성", "의상 통일", "배경 생성", "최대 10인"],
    layout: "family",
  },
]

/* ── Component ── */

export function BeforeAfter() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState("wedding")

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
      { threshold: 0.1 },
    )

    const elements = section.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const card = cards.find((c) => c.id === active)!

  return (
    <section ref={sectionRef} id="before-after" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            data-animate
            className="fade-up mb-3 text-sm font-medium tracking-widest text-gold"
          >
            PORTFOLIO
          </p>
          <h2
            data-animate
            className="fade-up font-serif text-3xl font-bold text-foreground delay-100 md:text-4xl"
          >
            Before &amp; <span className="italic">After</span>
          </h2>
          <p
            data-animate
            className="fade-up mt-3 text-sm text-muted-foreground delay-200"
          >
            AI Snap 프로모션 이미지 템플릿
          </p>
        </div>

        {/* Tabs */}
        <div
          data-animate
          className="fade-up mb-10 flex flex-wrap justify-center gap-2 delay-200"
        >
          {cards.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-all ${
                active === c.id
                  ? "border-gold bg-gold text-white"
                  : "border-border text-muted-foreground hover:border-gold/60 hover:text-gold-dark"
              }`}
            >
              {c.tab}
            </button>
          ))}
        </div>

        {/* Card */}
        <div
          data-animate
          className="fade-up mx-auto w-full max-w-[780px] delay-300"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-12">
            {/* Background pattern */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 20% 50%, rgba(212,165,116,0.06) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(233,69,96,0.03) 0%, transparent 40%)",
              }}
            />

            {/* Decorative border */}
            <div className="pointer-events-none absolute inset-5 rounded-lg border border-gold/20" />

            {/* Corner accents */}
            <Corner pos="top-4 left-4" borders="border-t-2 border-l-2" />
            <Corner pos="top-4 right-4" borders="border-t-2 border-r-2" />
            <Corner pos="bottom-4 left-4" borders="border-b-2 border-l-2" />
            <Corner pos="bottom-4 right-4" borders="border-b-2 border-r-2" />

            {/* Category badge */}
            <span className="absolute top-6 right-8 z-10 font-serif text-xs tracking-widest text-gold/50 sm:text-sm">
              {card.badge.toUpperCase()}
            </span>

            {/* Header */}
            <div className="relative z-10 mb-8 text-center sm:mb-10">
              <h3 className="mb-1 font-serif text-2xl font-semibold tracking-[8px] text-foreground sm:text-3xl md:text-4xl">
                BEFORE <span className="font-normal text-gold">&rarr;</span> AFTER
              </h3>
              <p className="text-xs text-muted-foreground sm:text-sm md:text-base">
                {card.subtitle}
              </p>
            </div>

            {/* Content: Before → AI → After */}
            <div className="relative z-10 mb-8 flex items-center justify-center gap-3 sm:mb-10 sm:gap-5 md:gap-7">
              {/* Before section */}
              <BeforeSection card={card} />

              {/* AI Center */}
              <div className="flex shrink-0 flex-col items-center gap-2">
                <span className="font-serif text-xs tracking-widest text-gold sm:text-sm">
                  AI
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-accent to-rose-dark shadow-[0_4px_20px_rgba(233,69,96,0.2)] sm:h-14 sm:w-14">
                  <Sparkles className="h-5 w-5 text-white sm:h-6 sm:w-6" />
                </div>
                <span className="hidden text-base tracking-widest text-gold sm:block">
                  &rarr;
                </span>
              </div>

              {/* After section */}
              <div className="min-w-0 flex-1">
                <div className="flex aspect-[4/5] max-h-[280px] w-full flex-col items-center justify-center rounded-xl border-2 border-accent/25 bg-accent/[0.02] shadow-[0_4px_30px_rgba(233,69,96,0.06)] sm:max-h-[320px]">
                  <span className="text-3xl sm:text-4xl">{card.afterEmoji}</span>
                  <p className="mt-3 text-center text-sm font-normal text-accent sm:text-base">
                    {card.afterText}
                  </p>
                  <p className="mt-1 text-center text-[10px] text-accent/60 sm:text-xs">
                    {card.afterSub}
                  </p>
                </div>
              </div>
            </div>

            {/* Feature tags */}
            <div className="relative z-10 flex flex-wrap justify-center gap-1.5 sm:gap-3">
              {card.features.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-border bg-white/60 px-3 py-1.5 text-[11px] font-normal text-muted-foreground backdrop-blur-sm sm:px-5 sm:py-2 sm:text-sm"
                >
                  <span className="mr-1 font-semibold text-accent">&check;</span>
                  {f}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Sub-components ── */

function Corner({ pos, borders }: { pos: string; borders: string }) {
  return (
    <div className={`absolute z-10 h-5 w-5 border-gold ${borders} ${pos}`} />
  )
}

function BeforeSection({ card }: { card: CardData }) {
  if (card.layout === "wedding") {
    return (
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:gap-3">
        {card.before.map((b) => (
          <div key={b.label} className="flex flex-col items-center">
            <PhotoBox {...b} />
            <span className="mt-1.5 text-[10px] text-muted-foreground sm:text-xs">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  if (card.layout === "single") {
    return (
      <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
        {/* Main baby photo */}
        <div className="flex flex-col items-center">
          <PhotoBox {...card.before[0]} size="large" />
          <span className="mt-1.5 text-[10px] text-muted-foreground sm:text-xs">
            {card.before[0].label}
          </span>
        </div>
        {/* Secondary parents */}
        {card.beforeSecondary && (
          <div className="flex gap-2">
            {card.beforeSecondary.map((b) => (
              <div key={b.label} className="flex flex-col items-center">
                <PhotoBox {...b} size="tiny" />
                <span className="mt-1 text-[9px] text-muted-foreground sm:text-[11px]">
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // family layout — 2x2 grid
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-1">
      <div className="grid grid-cols-2 gap-2">
        {card.before.map((b) => (
          <div key={b.label} className="flex flex-col items-center">
            <PhotoBox {...b} size="small" />
            <span className="mt-1 text-[9px] text-muted-foreground sm:text-[11px]">
              {b.label}
            </span>
          </div>
        ))}
      </div>
      <span className="mt-1 text-[10px] text-muted-foreground sm:text-xs">
        + 추가 가족 구성원
      </span>
    </div>
  )
}

function PhotoBox({
  emoji,
  sublabel,
  bg,
  size,
}: BeforePhoto & { size?: "large" | "small" | "tiny" }) {
  const sizeClass =
    size === "large"
      ? "w-28 h-36 sm:w-36 sm:h-44"
      : size === "small"
        ? "w-16 h-20 sm:w-20 sm:h-24"
        : size === "tiny"
          ? "w-14 h-16 sm:w-16 sm:h-20"
          : "w-20 h-24 sm:w-28 sm:h-32"

  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border border-border ${bg} ${sizeClass}`}
    >
      <span className={`${size === "tiny" || size === "small" ? "text-base" : "text-2xl"}`}>
        {emoji}
      </span>
      {sublabel && (
        <span className="text-[10px] text-foreground/35 sm:text-xs">
          {sublabel}
        </span>
      )}
    </div>
  )
}
