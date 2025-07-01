import { CartItem, Campaign } from '../../../types/campaign'

export interface Campaigns {
  id: number
  priority: number
  description: string
  name: string
  type: CampaignType
  percentage?: number
  amount?: number
  price?: number
  every?: number
  discount?: number
  active?: boolean
  subType?: CampaignSubType;
}

export enum CampaignSubType {
  COUPON = 'coupon',
  ON_TOP = 'onTop',
  SPECIAL = 'special',
}

export enum CampaignType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  CATEGORY_PERCENTAGE = 'category_percentage',
  POINT = 'point',
  SEASONAL = 'seasonal',
}

export interface CampaignsRequestBody {
  items: CartItem[]
  campaigns: Campaign[]
}

interface CategoryPrice {
  Accessories?: number
  Clothing?: number
  Electronics?: number
}

export interface CampaignsCalculationResponse {
  categoryPrice: CategoryPrice
  finalPrice: number
}
