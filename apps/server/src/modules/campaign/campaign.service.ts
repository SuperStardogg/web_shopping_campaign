import { Injectable } from '@nestjs/common';
import { CartItemDto } from './dto/cart-item.dto';
import { CampaignDto } from './dto/campaign.dto';
import { CampaignRepository } from './../../mock/repositories/campaign.repository';

@Injectable()
export class CampaignService {
  constructor(private readonly campaignRepository: CampaignRepository) {}

  findAll() {
    return this.campaignRepository.findAll();
  }

  calculateFinalPrice(items: CartItemDto[], campaigns: CampaignDto[]) {
    let totalPrice = items.reduce((acc, item) => acc + item.price, 0);
    if (campaigns.length) {
      const prioritizedCampaign = campaigns.sort(
        (a, b) => a.priority - b.priority,
      );
      for (const campaign of prioritizedCampaign) {
        switch (campaign.type) {
          case 'fixed':
            totalPrice = this._getDiscount(totalPrice, campaign.amount);
            break;
          case 'percentage':
            totalPrice = this._getPercentDiscount(
              totalPrice,
              campaign.percentage,
            );
            break;
          case 'category_percentage':
            totalPrice = this._getDiscountOnTop(
              totalPrice,
              campaign.percentage,
            );
            break;
          case 'point':
            totalPrice = this._getDiscountPoints(totalPrice, campaign.points);
            break;
          case 'seasonal':
            totalPrice = this._getDiscountSeasonal(
              totalPrice,
              campaign.discount,
              campaign.every,
            );
            break;
        }
      }
    }
    return parseFloat(totalPrice.toFixed(2));
  }

  calculateCategoryTotals(items: CartItemDto[]) {
    const totals: { [category: string]: number } = {};
    for (const item of items) {
      totals[item.category] = (totals[item.category] || 0) + item.price;
    }
    return totals;
  }

  //   Discounts the entire cart by subtracting an amount from the total price
  private _getDiscount(totalPrice: number, amount = 0): number {
    const discount = totalPrice - amount;
    return Math.round(discount) || 0;
  }

  //   Discounts the entire cart by subtracting a percentage from the total price
  private _getPercentDiscount(totalPrice: number, percentage = 0): number {
    const percentageAmount = totalPrice * (percentage / 100);
    return this._getDiscount(totalPrice, percentageAmount);
  }

  //   Discount the entire amount of a specific category of items in cart
  private _getDiscountOnTop(totalPrice: number, percentage = 0): number {
    const onTop = this._getPercentDiscount(totalPrice, percentage);
    return this._getDiscount(totalPrice - onTop);
  }

  //   Users spent points for a fixed amount of discount (1 point = 1 THB). The amount will be capped at 20% of total price
  private _getDiscountPoints(totalPrice: number, point = 0): number {
    const maxDiscount = Math.round(totalPrice * 0.2); // point up to 20%
    const pointValue = Math.min(point, maxDiscount);
    return this._getDiscount(totalPrice, pointValue);
  }

  //   From the total price, at every X THB, subtracting a fixed amount Y THB
  private _getDiscountSeasonal(
    totalPrice: number,
    discount = 0,
    every = 1,
  ): number {
    const chunks = Math.round(totalPrice / every);
    return this._getDiscount(totalPrice, Math.round(chunks * discount));
  }
}
