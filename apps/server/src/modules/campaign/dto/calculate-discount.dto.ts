import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartItemDto } from './cart-item.dto';
import { CampaignDto } from './campaign.dto';

export class CalculateCampaignDto {
  @IsArray({ message: 'Items must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];

  @IsArray({ message: 'Campaigns must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CampaignDto)
  campaigns: CampaignDto[];
}
