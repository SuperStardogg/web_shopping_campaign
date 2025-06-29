import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './product.service';

@Controller('api/v1/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }
}
