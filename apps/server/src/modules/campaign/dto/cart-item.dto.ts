import { IsString, IsNumber } from 'class-validator';

export class CartItemDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;
}
