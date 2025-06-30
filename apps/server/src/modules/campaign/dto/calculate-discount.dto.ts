import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartItemDto } from './cart-item.dto';
import { CampaignDto } from './campaign.dto';

export class CalculateCampaignDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CampaignDto)
  campaigns: CampaignDto[];
}
