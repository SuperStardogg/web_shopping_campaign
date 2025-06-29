import { DiscountItem } from './campaign'

export interface PriceCalculation {
  subtotal: number
  totalDiscount: number
  finalTotal: number
  appliedDiscounts: DiscountItem[]
}


