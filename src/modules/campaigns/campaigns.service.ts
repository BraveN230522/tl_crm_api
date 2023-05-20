import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignsRepository } from './campaigns.repository';
import { Campaign } from '../../entities/campaigns.entity';
import { ErrorHelper } from '../../helpers';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(CampaignsRepository) private campaignsRepository: CampaignsRepository,
  ) {}

  async readOne(id: string | number): Promise<Campaign> {
    const found = this.campaignsRepository.findOne({ id }, { relations: ['category'] });

    if (!found) ErrorHelper.NotFoundException(`This product with ${id} was not found`);

    return found;
  }
}
