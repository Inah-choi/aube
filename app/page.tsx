import { Navbar } from "@/components/aube/navbar"
import { Hero } from "@/components/aube/hero"
import { TrustBadges } from "@/components/aube/trust-badges"
import { BeforeAfter } from "@/components/aube/before-after"
import { ProductGrid } from "@/components/aube/product-grid"
import { Process } from "@/components/aube/process"
import { Reviews } from "@/components/aube/reviews"
import { FaqSummary } from "@/components/aube/faq-summary"
import { CtaBanner } from "@/components/aube/cta-banner"
import { Footer } from "@/components/aube/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <BeforeAfter />
        <ProductGrid />
        <Process />
        <Reviews />
        <FaqSummary />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
