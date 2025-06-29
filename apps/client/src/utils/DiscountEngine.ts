import {
  CartItem,
  DiscountCampaign,
  PriceCalculation,
  DiscountItem,
  UserPoints,
} from '../types'

export class DiscountEngine {

  static calculateFinalPrice(
    cartItems: CartItem[],
    campaigns: DiscountCampaign[],
    userPoints: UserPoints = { available: 0, used: 0 }
  ): PriceCalculation {
    const activeCampaigns = campaigns
      .filter((campaign) => campaign.active)
      .sort((a, b) => a.priority - b.priority)

    let appliedDiscounts: DiscountItem[] = []
    let itemPrices = new Map<string, number>()

    cartItems.forEach((item) => {
      itemPrices.set(item.id, item.price * item.quantity)
    })

    activeCampaigns.forEach((campaign) => {
      const discounts = this.applyCampaign(
        cartItems,
        campaign,
        itemPrices,
        userPoints
      )
      appliedDiscounts.push(...discounts)
    })

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    const totalDiscount = appliedDiscounts.reduce(
      (sum, discount) => sum + discount.discountAmount,
      0
    )
    const finalTotal = Math.max(0, subtotal - totalDiscount)

    return {
      subtotal,
      totalDiscount,
      finalTotal,
      appliedDiscounts,
    }
  }

  private static applyCampaign(
    cartItems: CartItem[],
    campaign: DiscountCampaign,
    itemPrices: Map<string, number>,
    userPoints: UserPoints
  ): DiscountItem[] {
    const discounts: DiscountItem[] = []

    switch (campaign.type) {
      case 'fixed':
        const orderTotal = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        if (orderTotal >= (campaign.minAmount || 0)) {
          const discountAmount = Math.min(campaign.value, orderTotal)
          // Apply proportionally to all items
          cartItems.forEach((item) => {
            const itemTotal = item.price * item.quantity
            const proportion = itemTotal / orderTotal
            const itemDiscount = discountAmount * proportion
            discounts.push({
              campaignId: campaign.id,
              campaignName: campaign.name,
              itemId: item.id,
              originalPrice: itemTotal,
              discountAmount: itemDiscount,
              finalPrice: itemTotal - itemDiscount,
            })
          })
        }
        break

      case 'percentage':
        const totalAmount = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        if (totalAmount >= (campaign.minAmount || 0)) {
          const totalDiscountAmount = totalAmount * (campaign.value / 100)
          cartItems.forEach((item) => {
            const itemTotal = item.price * item.quantity
            const proportion = itemTotal / totalAmount
            const itemDiscount = totalDiscountAmount * proportion
            discounts.push({
              campaignId: campaign.id,
              campaignName: campaign.name,
              itemId: item.id,
              originalPrice: itemTotal,
              discountAmount: itemDiscount,
              finalPrice: itemTotal - itemDiscount,
            })
          })
        }
        break

      case 'category':
        cartItems
          .filter((item) => item.category === campaign.category)
          .forEach((item) => {
            const originalPrice = item.price * item.quantity
            const discountAmount = originalPrice * (campaign.value / 100)
            discounts.push({
              campaignId: campaign.id,
              campaignName: campaign.name,
              itemId: item.id,
              originalPrice,
              discountAmount,
              finalPrice: originalPrice - discountAmount,
            })
          })
        break

      case 'points':
        const pointsOrderTotal = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        const maxDiscountFromPoints =
          pointsOrderTotal * ((campaign.maxDiscountPercent || 20) / 100)
        const pointsToUse = Math.min(
          userPoints.available,
          campaign.pointsRequired || 0,
          maxDiscountFromPoints
        )

        if (pointsToUse > 0) {
          cartItems.forEach((item) => {
            const itemTotal = item.price * item.quantity
            const proportion = itemTotal / pointsOrderTotal
            const itemDiscount = pointsToUse * proportion
            discounts.push({
              campaignId: campaign.id,
              campaignName: campaign.name,
              itemId: item.id,
              originalPrice: itemTotal,
              discountAmount: itemDiscount,
              finalPrice: itemTotal - itemDiscount,
            })
          })
        }
        break

      case 'special':
        const specialOrderTotal = cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )
        const threshold = campaign.specialThreshold || 0
        const discountPerThreshold = campaign.specialDiscount || 0

        if (threshold > 0 && specialOrderTotal >= threshold) {
          const numberOfDiscounts = Math.floor(specialOrderTotal / threshold)
          const totalSpecialDiscount = numberOfDiscounts * discountPerThreshold

          cartItems.forEach((item) => {
            const itemTotal = item.price * item.quantity
            const proportion = itemTotal / specialOrderTotal
            const itemDiscount = totalSpecialDiscount * proportion
            discounts.push({
              campaignId: campaign.id,
              campaignName: campaign.name,
              itemId: item.id,
              originalPrice: itemTotal,
              discountAmount: itemDiscount,
              finalPrice: itemTotal - itemDiscount,
            })
          })
        }
        break
    }

    return discounts
  }
}
