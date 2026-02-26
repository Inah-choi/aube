import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Navbar } from "@/components/aube/navbar"
import { Footer } from "@/components/aube/footer"
import { ProductHero } from "@/components/product-detail/product-hero"
import { PricingTable } from "@/components/product-detail/pricing-table"
import { SampleGallery } from "@/components/product-detail/sample-gallery"
import { ProductProcess } from "@/components/product-detail/product-process"
import { ProductFaq } from "@/components/product-detail/product-faq"
import { RelatedProducts } from "@/components/product-detail/related-products"
import { ProductCta } from "@/components/product-detail/product-cta"
import {
  getProductBySlug,
  getAllSlugs,
  getRelatedProducts,
} from "@/lib/products"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}

  return {
    title: `${product.title} | aube`,
    description: product.longDescription,
    openGraph: {
      title: `${product.title} | aube`,
      description: product.longDescription,
      url: `https://aube.ai.kr/products/${slug}`,
      siteName: "aube",
      locale: "ko_KR",
      type: "website",
    },
    alternates: {
      canonical: `https://aube.ai.kr/products/${slug}`,
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.relatedSlugs)

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main className="pt-16">
        <ProductHero product={product} />
        <PricingTable tiers={product.pricing} productSlug={product.slug} />
        <SampleGallery samples={product.samples} showBeforeAfter={slug === "ai-retouch"} />
        <ProductProcess steps={product.process} />
        <ProductFaq items={product.faq} />
        <RelatedProducts products={related} />
        <ProductCta title={product.title} productSlug={product.slug} />
      </main>
      <Footer />
    </div>
  )
}
