import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chance } from '../../entities/chances.entity';

@Injectable()
export class ChancesRepository extends Repository<Chance> {
  constructor(
    @InjectRepository(Chance)
    repository: Repository<Chance>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
