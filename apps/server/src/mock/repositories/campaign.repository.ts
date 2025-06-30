import { Injectable } from '@nestjs/common';
import { campaigns as mockCampaigns } from '../db/campaign.mock';

@Injectable()
export class CampaignRepository {
  private campaigns = [...mockCampaigns];

  findAll() {
    return this.campaigns;
  }
}
