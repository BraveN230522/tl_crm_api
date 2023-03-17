import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Campaign } from '../../entities/campaigns.entity';

@Injectable()
export class CampaignsRepository extends Repository<Campaign> {
  constructor(
    @InjectRepository(Campaign)
    repository: Repository<Campaign>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
