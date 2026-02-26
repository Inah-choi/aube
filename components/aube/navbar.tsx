"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { getAllProducts } from "@/lib/products"
import { getProductIcon } from "@/lib/product-icons"
import { ChevronDown } from "lucide-react"

const productItems = getAllProducts()

const navLinks = [
  { label: "포트폴리오", href: "/#before-after" },
  { label: "주문하기", href: "/order" },
  { label: "FAQ", href: "/#faq" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  function openDropdown() {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current)
    setDropdownOpen(true)
  }

  function closeDropdown() {
    dropdownTimeout.current = setTimeout(() => setDropdownOpen(false), 150)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="/"
          className="font-serif text-2xl font-bold tracking-wide text-foreground"
        >
          aube
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {/* 상품안내 with dropdown */}
          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
          >
            <a
              href="/#products"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              상품안내
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </a>

            {/* Dropdown */}
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                dropdownOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              <div className="w-56 overflow-hidden rounded-xl border border-border bg-background/95 p-2 shadow-lg backdrop-blur-xl">
                {productItems.map((p) => {
                  const Icon = getProductIcon(p.iconName)
                  return (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    >
                      <Icon className="h-4 w-4 text-gold" />
                      {p.title}
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="http://pf.kakao.com/_IxaZqX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-all hover:bg-rose-dark"
          >
            문의하기
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴 열기/닫기"
        >
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-b-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 pb-6">
          {/* 상품안내 accordion for mobile */}
          <button
            className="flex items-center justify-between py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            상품안내
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                mobileProductsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              mobileProductsOpen ? "max-h-80" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-0.5 pb-2 pl-2">
              {productItems.map((p) => {
                const Icon = getProductIcon(p.iconName)
                return (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Icon className="h-4 w-4 text-gold" />
                    {p.title}
                  </Link>
                )
              })}
            </div>
          </div>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="http://pf.kakao.com/_IxaZqX/chat"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 w-fit rounded-full bg-accent px-5 py-2 text-sm font-medium text-white transition-all hover:bg-rose-dark"
            onClick={() => setMobileOpen(false)}
          >
            문의하기
          </a>
        </div>
      </div>
    </nav>
  )
}
