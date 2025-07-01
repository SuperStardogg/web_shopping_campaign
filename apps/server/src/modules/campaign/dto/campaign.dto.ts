import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CampaignDto {
  @IsString()
  type: string;

  @IsNumber()
  priority: number;

  @IsOptional()
  @IsNumber()
  percentage?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  points?: number;

  @IsOptional()
  @IsNumber()
  every?: number;

  @IsOptional()
  @IsNumber()
  discount?: number;
}
