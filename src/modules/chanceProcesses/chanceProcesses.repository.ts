import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base';
import { ChanceProcess } from '../../entities/chanceProcesses.entity';

@Injectable()
export class ChanceProcessesRepository extends BaseRepository<ChanceProcess> {
  constructor(
    @InjectRepository(ChanceProcess)
    repository: Repository<ChanceProcess>,
  ) {
    super(repository);
  }
}
