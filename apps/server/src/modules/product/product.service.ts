import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../mock/repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  findAll() {
    return this.productRepository.findAll();
  }
}
