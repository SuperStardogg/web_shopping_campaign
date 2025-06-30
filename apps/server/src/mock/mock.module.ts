import { Module } from '@nestjs/common';
import { ProductRepository } from './repositories/product.repository';
import { CampaignRepository } from './repositories/campaign.repository';

@Module({
  providers: [ProductRepository, CampaignRepository],
  exports: [ProductRepository, CampaignRepository],
})
export class MockModule {}
