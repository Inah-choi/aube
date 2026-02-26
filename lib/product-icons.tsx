import { Camera, Baby, Users, Heart, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ProductIconName } from "./products"

const iconMap: Record<ProductIconName, LucideIcon> = {
  Camera,
  Baby,
  Users,
  Heart,
  Sparkles,
}

export function getProductIcon(name: ProductIconName): LucideIcon {
  return iconMap[name]
}
