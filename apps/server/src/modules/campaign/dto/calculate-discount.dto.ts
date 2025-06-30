import { CartItem } from '../../campaign/dto/interfaces/cart-item.interface';
import { Campaign } from '../../campaign/dto/interfaces/campaign.interface';

export class CalculateCampaignDto {
  items: CartItem[];
  campaigns: Campaign[];
}
