import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { Chance } from '../../entities/chances.entity';

@Injectable()
export class ChancesRepository extends BaseRepository<Chance> {
  constructor(
    @InjectRepository(Chance)
    repository: Repository<Chance>,
  ) {
    super(repository);
  }
}
