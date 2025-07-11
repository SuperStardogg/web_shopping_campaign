import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { MockModule } from '../../mock/mock.module';

@Module({
  imports: [MockModule],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
