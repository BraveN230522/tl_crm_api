import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Campaign } from '../../entities/campaigns.entity';

@Injectable()
export class CampaignsRepository extends BaseRepository<Campaign> {
  constructor(
    @InjectRepository(Campaign)
    repository: Repository<Campaign>,
  ) {
    super(repository);
  }
}
