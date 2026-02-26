"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, ChevronRight, ShoppingBag, User, Palette, FileText } from "lucide-react"
import { getProductBySlug } from "@/lib/products"
import type { PricingTier } from "@/lib/products"
import { getProductIcon } from "@/lib/product-icons"
import {
  orderSchema,
  productSlugs,
  tierNames,
  conceptOptions,
  type OrderFormData,
  type ProductSlug,
  type TierName,
} from "@/lib/order-schema"
import { buildOrderMessage } from "@/lib/order-message"
import { OrderSummaryDialog } from "./order-summary-dialog"

/* ── product data for rendering ── */
const allProducts = productSlugs.map((slug) => getProductBySlug(slug)!)

interface OrderFormProps {
  defaultProduct?: string
  defaultTier?: string
}

const steps = [
  { id: 1, label: "상품 선택", icon: ShoppingBag },
  { id: 2, label: "고객 정보", icon: User },
  { id: 3, label: "컨셉 선택", icon: Palette },
  { id: 4, label: "추가 요청", icon: FileText },
]

export function OrderForm({ defaultProduct, defaultTier }: OrderFormProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [orderMessage, setOrderMessage] = useState("")
  const [activeStep, setActiveStep] = useState(1)

  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const setSectionRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      sectionRefs.current[index] = el
    },
    [],
  )

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      product: isValidProduct(defaultProduct) ? defaultProduct : undefined,
      tier: isValidTier(defaultTier) ? defaultTier : undefined,
      name: "",
      phone: "",
      email: "",
      kakaoId: "",
      concepts: [],
      customConcept: "",
      notes: "",
    },
  })

  const selectedProduct = watch("product")
  const selectedTier = watch("tier")
  const selectedConcepts = watch("concepts")
  const currentProduct = selectedProduct
    ? getProductBySlug(selectedProduct)
    : undefined

  // Track active step based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionRefs.current.indexOf(entry.target as HTMLElement)
            if (idx !== -1) setActiveStep(idx + 1)
          }
        })
      },
      { threshold: 0.3 },
    )

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Reset tier when product changes
  useEffect(() => {
    if (selectedProduct && selectedTier) {
      const product = getProductBySlug(selectedProduct)
      const tierExists = product?.pricing.some((t) => t.name === selectedTier)
      if (!tierExists) {
        setValue("tier", undefined as unknown as TierName)
      }
    }
  }, [selectedProduct, selectedTier, setValue])

  function scrollToStep(step: number) {
    sectionRefs.current[step - 1]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  function onError() {
    const firstError = document.querySelector("[data-error]")
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  function onSubmit(data: OrderFormData) {
    const message = buildOrderMessage(data)
    setOrderMessage(message)
    setDialogOpen(true)
  }

  return (
    <>
      {/* ── Sticky Step Progress ── */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isActive = activeStep === step.id
            const isDone = activeStep > step.id
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => scrollToStep(step.id)}
                className="flex items-center gap-1.5"
              >
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all sm:h-8 sm:w-8 ${
                    isActive
                      ? "bg-accent text-white shadow-md shadow-accent/20"
                      : isDone
                        ? "bg-accent/10 text-accent"
                        : "bg-surface text-muted-foreground"
                  }`}
                >
                  {isDone ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Icon className="h-3.5 w-3.5" />
                  )}
                </div>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    isActive
                      ? "text-foreground"
                      : isDone
                        ? "text-accent"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <ChevronRight className="mx-1 h-3 w-3 text-border sm:mx-2" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        {/* ── Section 1: Product + Plan ── */}
        <section
          ref={setSectionRef(0)}
          className="scroll-mt-28 bg-surface px-6 py-16"
        >
          <div className="mx-auto max-w-4xl">
            <StepHeader step={1} title="상품 & 플랜" titleItalic="선택" />

            {/* Product cards */}
            <fieldset className="mb-10">
              <legend className="mb-4 text-sm font-medium text-foreground">
                상품 선택 <span className="text-accent">*</span>
              </legend>
              <Controller
                name="product"
                control={control}
                render={({ field }) => (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {allProducts.map((p) => {
                      const Icon = getProductIcon(p.iconName)
                      const selected = field.value === p.slug
                      return (
                        <label
                          key={p.slug}
                          className={`group relative flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition-all duration-200 ${
                            selected
                              ? "border-accent bg-accent/5 ring-2 ring-accent/20"
                              : "border-border bg-background hover:border-gold/50 hover:shadow-sm"
                          }`}
                        >
                          <input
                            type="radio"
                            className="sr-only"
                            value={p.slug}
                            checked={selected}
                            onChange={() => field.onChange(p.slug)}
                          />
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                              selected ? "bg-accent/10" : "bg-gold/10"
                            }`}
                          >
                            <Icon
                              className={`h-5 w-5 ${
                                selected ? "text-accent" : "text-gold"
                              }`}
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-foreground">
                              {p.title}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {p.price}
                            </p>
                          </div>
                          {selected && (
                            <Check className="absolute top-3 right-3 h-4 w-4 text-accent" />
                          )}
                        </label>
                      )
                    })}
                  </div>
                )}
              />
              {errors.product && (
                <p data-error className="mt-2 text-sm text-accent">
                  {errors.product.message}
                </p>
              )}
            </fieldset>

            {/* Tier cards — always visible */}
            <fieldset>
              <legend className="mb-4 text-sm font-medium text-foreground">
                플랜 선택 <span className="text-accent">*</span>
              </legend>
              <Controller
                name="tier"
                control={control}
                render={({ field }) => {
                  const tiers = currentProduct?.pricing ?? defaultTiers
                  return (
                    <div className="grid gap-4 sm:grid-cols-3">
                      {tiers.map((tier) => {
                        const selected = field.value === tier.name
                        const hasFeatures = tier.features.length > 0
                        return (
                          <label
                            key={`${selectedProduct ?? "default"}-${tier.name}`}
                            className={`relative flex cursor-pointer flex-col rounded-xl border p-5 transition-all duration-200 ${
                              selected
                                ? "border-accent ring-2 ring-accent/20"
                                : tier.popular
                                  ? "border-gold/50 bg-background hover:shadow-sm"
                                  : "border-border bg-background hover:border-gold/30 hover:shadow-sm"
                            }`}
                          >
                            <input
                              type="radio"
                              className="sr-only"
                              value={tier.name}
                              checked={selected}
                              onChange={() => field.onChange(tier.name)}
                            />
                            {tier.popular && (
                              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-0.5 text-[10px] font-bold text-white">
                                인기
                              </span>
                            )}
                            <h3 className="mb-1 text-base font-bold text-foreground">
                              {tier.name}
                            </h3>
                            <p
                              className={`mb-3 text-2xl font-bold ${hasFeatures ? "text-accent" : "text-muted-foreground text-base"}`}
                            >
                              {tier.price}
                            </p>
                            {hasFeatures ? (
                              <ul className="flex-1 space-y-1.5">
                                {tier.features.map((f) => (
                                  <li
                                    key={f}
                                    className="flex items-start gap-1.5 text-xs text-muted-foreground"
                                  >
                                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="flex-1 text-xs text-muted-foreground/50">
                                상품을 선택하면 상세 내용이 표시됩니다
                              </p>
                            )}
                            {selected && (
                              <div className="mt-3 rounded-full bg-accent/10 py-1 text-center text-xs font-medium text-accent">
                                선택됨
                              </div>
                            )}
                          </label>
                        )
                      })}
                    </div>
                  )
                }}
              />
              {errors.tier && (
                <p data-error className="mt-2 text-sm text-accent">
                  {errors.tier.message}
                </p>
              )}
            </fieldset>

            {/* Selected summary */}
            {currentProduct && selectedTier && (
              <div className="mt-8 rounded-xl border border-accent/20 bg-accent/[0.03] px-5 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                      {(() => {
                        const Icon = getProductIcon(currentProduct.iconName)
                        return <Icon className="h-4 w-4 text-accent" />
                      })()}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">
                        {currentProduct.title} · {selectedTier}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {currentProduct.pricing.find((t) => t.name === selectedTier)?.price}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollToStep(2)}
                    className="flex items-center gap-1 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-rose-dark"
                  >
                    다음 <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── Section 2: Customer Info ── */}
        <section
          ref={setSectionRef(1)}
          className="scroll-mt-28 px-6 py-16"
        >
          <div className="mx-auto max-w-4xl">
            <StepHeader step={2} title="고객" titleItalic="정보" />

            <div className="mx-auto max-w-md space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  이름 <span className="text-accent">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  className={inputClass(!!errors.name)}
                  {...register("name")}
                />
                {errors.name && (
                  <p data-error className="mt-1 text-sm text-accent">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  연락처 <span className="text-accent">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="010-1234-5678"
                  className={inputClass(!!errors.phone)}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p data-error className="mt-1 text-sm text-accent">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  이메일 <span className="text-accent">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  className={inputClass(!!errors.email)}
                  {...register("email")}
                />
                {errors.email && (
                  <p data-error className="mt-1 text-sm text-accent">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Kakao ID */}
              <div>
                <label
                  htmlFor="kakaoId"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  카카오톡 ID{" "}
                  <span className="text-xs text-muted-foreground">(선택)</span>
                </label>
                <input
                  id="kakaoId"
                  type="text"
                  placeholder="kakao_id"
                  className={inputClass(!!errors.kakaoId)}
                  {...register("kakaoId")}
                />
                {errors.kakaoId && (
                  <p data-error className="mt-1 text-sm text-accent">
                    {errors.kakaoId.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Concept Selection ── */}
        <section
          ref={setSectionRef(2)}
          className="scroll-mt-28 bg-surface px-6 py-16"
        >
          <div className="mx-auto max-w-4xl">
            <StepHeader step={3} title="배경 &" titleItalic="컨셉" />

            <fieldset className="mx-auto max-w-md">
              <legend className="mb-4 text-sm font-medium text-foreground">
                원하시는 컨셉을 선택해주세요 (복수 선택 가능){" "}
                <span className="text-accent">*</span>
              </legend>
              <Controller
                name="concepts"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-2 gap-3">
                    {conceptOptions.map((concept) => {
                      const checked = field.value.includes(concept)
                      return (
                        <label
                          key={concept}
                          className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-4 py-3 text-sm transition-all duration-200 ${
                            checked
                              ? "border-accent bg-accent/5 text-foreground"
                              : "border-border bg-background text-muted-foreground hover:border-gold/50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={checked}
                            onChange={() => {
                              const next = checked
                                ? field.value.filter((c) => c !== concept)
                                : [...field.value, concept]
                              field.onChange(next)
                            }}
                          />
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                              checked
                                ? "border-accent bg-accent text-white"
                                : "border-border"
                            }`}
                          >
                            {checked && <Check className="h-3 w-3" />}
                          </span>
                          {concept}
                        </label>
                      )
                    })}
                  </div>
                )}
              />
              {errors.concepts && (
                <p data-error className="mt-2 text-sm text-accent">
                  {errors.concepts.message}
                </p>
              )}

              {/* Custom concept input */}
              {selectedConcepts?.includes("기타") && (
                <div className="mt-4">
                  <label
                    htmlFor="customConcept"
                    className="mb-1.5 block text-sm font-medium text-foreground"
                  >
                    원하시는 컨셉을 알려주세요
                  </label>
                  <input
                    id="customConcept"
                    type="text"
                    placeholder="예: 유럽풍 고성 배경, 제주 바다 배경 등"
                    className={inputClass(!!errors.customConcept)}
                    {...register("customConcept")}
                  />
                  {errors.customConcept && (
                    <p data-error className="mt-1 text-sm text-accent">
                      {errors.customConcept.message}
                    </p>
                  )}
                </div>
              )}
            </fieldset>
          </div>
        </section>

        {/* ── Section 4: Additional Notes ── */}
        <section
          ref={setSectionRef(3)}
          className="scroll-mt-28 px-6 py-16"
        >
          <div className="mx-auto max-w-4xl">
            <StepHeader step={4} title="추가" titleItalic="요청사항" />

            <div className="mx-auto max-w-md">
              <label
                htmlFor="notes"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                추가 요청사항{" "}
                <span className="text-xs text-muted-foreground">(선택)</span>
              </label>
              <textarea
                id="notes"
                rows={4}
                placeholder="참고할 레퍼런스 이미지, 특별한 요청사항 등을 자유롭게 적어주세요"
                className={`${inputClass(!!errors.notes)} resize-none`}
                {...register("notes")}
              />
              {errors.notes && (
                <p data-error className="mt-1 text-sm text-accent">
                  {errors.notes.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="mt-12 text-center">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-10 py-4 text-base font-bold text-white transition-all hover:bg-rose-dark hover:shadow-lg"
              >
                주문서 생성하기
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                주문서를 생성한 후 카카오톡으로 보내주시면 상담이 시작됩니다
              </p>
            </div>
          </div>
        </section>
      </form>

      <OrderSummaryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        message={orderMessage}
      />
    </>
  )
}

/* ── Sub-components ── */

function StepHeader({
  step,
  title,
  titleItalic,
}: {
  step: number
  title: string
  titleItalic: string
}) {
  return (
    <div className="mb-10 text-center">
      <p className="mb-3 text-sm font-medium tracking-widest text-gold">
        STEP {step}
      </p>
      <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
        {title} <span className="italic">{titleItalic}</span>
      </h2>
    </div>
  )
}

/* ── Helpers ── */

function inputClass(hasError: boolean) {
  return `w-full rounded-xl border ${
    hasError ? "border-accent" : "border-border"
  } bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/20`
}

function isValidProduct(value?: string): value is ProductSlug {
  return !!value && (productSlugs as readonly string[]).includes(value)
}

function isValidTier(value?: string): value is TierName {
  return !!value && (tierNames as readonly string[]).includes(value)
}

const defaultTiers: PricingTier[] = [
  { name: "베이직", price: "상품을 선택하세요", features: [] },
  {
    name: "스탠다드",
    price: "상품을 선택하세요",
    features: [],
    popular: true,
  },
  { name: "프리미엄", price: "상품을 선택하세요", features: [] },
]
