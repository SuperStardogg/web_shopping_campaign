import { IsString, IsNumber } from 'class-validator';

export class CartItemDto {
  @IsString({ message: 'Item name must be a string' })
  name: string;

  @IsNumber({}, { message: 'Item price must be a number' })
  price: number;

  @IsString({ message: 'Item category must be a string' })
  category: string;
}
