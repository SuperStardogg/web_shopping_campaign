import { Module } from '@nestjs/common';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { MockModule } from '../../mock/mock.module';

@Module({
  imports: [MockModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
