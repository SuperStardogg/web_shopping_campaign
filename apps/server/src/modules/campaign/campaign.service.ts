import { Injectable } from '@nestjs/common';
import { CartItem } from './dto/interfaces/cart-item.interface';
import { Campaign } from './dto/interfaces/campaign.interface';

@Injectable()
export class CampaignService {
  calculateFinalPrice(items: CartItem[], campaigns: Campaign[]): number {
    let total = items.reduce((acc, item) => acc + item.price, 0);
    const categoryTotals = this.calculateCategoryTotals(items);

    const grouped = {
      coupon: campaigns.find(
        (c) => c.type === 'fixed' || c.type === 'percentage',
      ),
      onTop: campaigns.find(
        (c) => c.type === 'category_percentage' || c.type === 'point',
      ),
      seasonal: campaigns.find((c) => c.type === 'seasonal'),
    };

    // 1. Coupon 🏷
    if (grouped.coupon) {
      if (grouped.coupon.type === 'fixed') total -= grouped.coupon.amount;
      else if (grouped.coupon.type === 'percentage')
        total *= 1 - Math.round(grouped.coupon.percentage / 100);
    }

    // 2. On Top %
    if (grouped.onTop) {
      if (grouped.onTop.type === 'category_percentage') {
        const categoryAmount = categoryTotals[grouped.onTop.category] || 0;
        total -= categoryAmount * Math.round(grouped.onTop.percentage / 100);
      }
      if (grouped.onTop.type === 'point') {
        const maxDiscount = Math.round(total * 0.2); // point up to 20%
        const pointValue = Math.min(grouped.onTop.points, maxDiscount);
        total -= pointValue;
      }
    }

    // 3. Seasonal 🔥
    if (grouped.seasonal) {
      const chunks = Math.round(total / grouped.seasonal.every);
      total -= chunks * grouped.seasonal.discount;
    }

    return parseFloat(total.toFixed(2));
  }

  private calculateCategoryTotals(items: CartItem[]) {
    const totals: { [category: string]: number } = {};
    for (const item of items) {
      totals[item.category] = (totals[item.category] || 0) + item.price;
    }
    return totals;
  }
}
