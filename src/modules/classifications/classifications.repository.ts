import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '../../base/base.repository';
import { Classification } from '../../entities/classifications.entity';

@Injectable()
export class ClassificationsRepository extends BaseRepository<Classification> {
  constructor(
    @InjectRepository(Classification)
    repository: Repository<Classification>,
  ) {
    super(repository);
  }
}
