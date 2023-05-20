import { Campaign } from "../entities/campaigns.entity";

export interface ICampaignResponse extends Omit<Campaign, 'product'> {
  campaigns: Campaign[];
}