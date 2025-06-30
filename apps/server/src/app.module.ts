import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/product/product.module';
import { CampaignModule } from './modules/campaign/campaign.module';

@Module({
  imports: [ProductsModule, CampaignModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
