import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { CampaignSubType, CampaignType } from '../constants/campaign-type.enum';

export class CampaignDto {
  @IsEnum(CampaignType, { message: 'Campaign type is required' })
  type: CampaignType;

  @IsNumber({}, { message: 'priority type is require' })
  priority: number;

  @IsOptional()
  @IsNumber({}, { message: 'Percentage must be a number' })
  percentage?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Amount must be a number' })
  amount?: number;

  @IsOptional()
  @IsString({ message: 'Category must be a string' })
  category?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Points must be a number' })
  points?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Every must be a number' })
  every?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Discount must be a number' })
  discount?: number;

  @IsOptional()
  @IsEnum(CampaignSubType)
  subType: CampaignSubType;
}
