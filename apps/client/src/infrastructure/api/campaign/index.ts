import http from '../../../utils/Http'
import { Campaigns, CampaignsCalculationResponse, CampaignsRequestBody } from './type'

enum Api {
  Campaign = '/api/v1/campaign',
  Discount = '/discount',
}

export const getAllCampaignsApi = () => {
  return http.get<Campaigns[]>(`${Api.Campaign}`)
}

export const calculateDiscountCampaignApi = (data: CampaignsRequestBody) => {
  return http.post<CampaignsCalculationResponse>(`${Api.Campaign}${Api.Discount}`, data)
}
