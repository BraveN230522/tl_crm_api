import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChanceProcess } from '../../entities/chanceProcesses.entity';

@Injectable()
export class ChanceProcessesRepository extends Repository<ChanceProcess> {
  constructor(
    @InjectRepository(ChanceProcess)
    repository: Repository<ChanceProcess>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
