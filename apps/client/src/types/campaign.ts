import { CampaignType } from '../infrastructure/api/campaign/type'
export interface DiscountCampaign {
  id: number
  name: string
  type: 'fixed' | 'percentage' | 'category' | 'points' | 'special'
  value: number
  category?: string
  minQuantity?: number
  minAmount?: number
  priority: number
  active: boolean
  description: string
  pointsRequired?: number
  maxDiscountPercent?: number // for points campaigns (20% cap)
  specialThreshold?: number // for special campaigns (every X THB)
  specialDiscount?: number // for special campaigns (discount Y THB)
}

export interface DiscountItem {
  campaignId: string
  campaignName: string
  itemId: string
  originalPrice: number
  discountAmount: number
  finalPrice: number
}

export interface UserPoints {
  available: number
  used: number
}

export type Campaign =
  | { type: CampaignType.FIXED; amount: number }
  | { type: CampaignType.PERCENTAGE; percentage: number }
  | {
      type: CampaignType.CATEGORY_PERCENTAGE
      category: string
      percentage: number
    }
  | { type: CampaignType.POINT; points: number }
  | { type: CampaignType.SEASONAL; every: number; discount: number }

export interface CartItem {
  name: string
  price: number
  category: string
}
