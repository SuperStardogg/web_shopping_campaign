import { Injectable } from '@nestjs/common';
import { products as mockProducts } from '../db/product.mock';

@Injectable()
export class ProductRepository {
  private products = [...mockProducts];

  findAll() {
    return this.products;
  }

  findById(id: number) {
    return this.products.find((product) => product.id === id);
  }

  create(product: any) {
    const newProduct = { id: Date.now(), ...product };
    this.products.push(newProduct);
    return newProduct;
  }
}
