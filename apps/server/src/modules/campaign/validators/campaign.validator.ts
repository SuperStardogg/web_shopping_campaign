import { BadRequestException } from '@nestjs/common';
import { CartItemDto } from '../dto/cart-item.dto';
import { CampaignDto } from '../dto/campaign.dto';

export class CampaignDiscountValidator {
  static validate(items: CartItemDto[], campaigns: CampaignDto[]): void {
    const cartTotal = items.reduce((sum, item) => sum + item.price, 0);

    // 1. Only one coupon campaign
    const couponTypes = ['fixed', 'percentage'];
    const couponCampaigns = campaigns.filter((c) =>
      couponTypes.includes(c.type),
    );
    if (couponCampaigns.length > 1) {
      throw new BadRequestException(
        'Only one coupon campaign (fixed or percentage) can be applied.',
      );
    }

    // 2. Unique categories in category_percentage
    const categoryDiscounts = campaigns.filter(
      (c) => c.type === 'category_percentage',
    );
    const seen = new Set();
    for (const c of categoryDiscounts) {
      if (!c.category) {
        throw new BadRequestException(
          'Category percentage discount must include a "category" field.',
        );
      }
      if (seen.has(c.category)) {
        throw new BadRequestException(
          `Duplicate category "${c.category}" in On Top discounts.`,
        );
      }
      seen.add(c.category);
    }

    // 3. Points rule: point should be more than 0
    const pointCampaign = campaigns.find((c) => c.type === 'point');
    if (pointCampaign) {
      if (!pointCampaign.points || pointCampaign.points <= 0) {
        throw new BadRequestException('Points must be greater than 0.');
      }
    }

    // 4. Seasonal discount only if threshold met
    const seasonal = campaigns.find((c) => c.type === 'seasonal');
    if (seasonal) {
      if (
        typeof seasonal.every !== 'number' ||
        typeof seasonal.discount !== 'number'
      ) {
        throw new BadRequestException(
          'Seasonal campaign must include valid "every" and "discount" values.',
        );
      }
      if (cartTotal < seasonal.every) {
        throw new BadRequestException(
          `Seasonal discount applies only if cart total ≥ ${seasonal.every} THB.`,
        );
      }
    }
  }
}
