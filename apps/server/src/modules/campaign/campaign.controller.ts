import { Controller, Post, Body } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CalculateCampaignDto } from './dto/calculate-discount.dto';

@Controller('api/v1/campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post('discount')
  calculate(@Body() payload: CalculateCampaignDto) {
    return {
      finalPrice: this.campaignService.calculateFinalPrice(
        payload.items,
        payload.campaigns,
      ),
    };
  }
}
