import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tier } from '../../entities/tiers.entity';

@Injectable()
export class TiersRepository extends Repository<Tier> {
  constructor(
    @InjectRepository(Tier)
    repository: Repository<Tier>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
