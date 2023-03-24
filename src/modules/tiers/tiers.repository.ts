import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Tier } from '../../entities/tiers.entity';

@Injectable()
export class TiersRepository extends BaseRepository<Tier> {
  constructor(
    @InjectRepository(Tier)
    repository: Repository<Tier>,
  ) {
    super(repository);
  }
}
