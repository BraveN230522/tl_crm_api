import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampaignsRepository } from './campaigns.repository';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectRepository(CampaignsRepository) private usersRepository: CampaignsRepository,
  ) {}
}
